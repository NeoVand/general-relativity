import { connectRealtime, mintRealtimeSecret, type RealtimeChannel } from './realtime';
import { issueFor, isCancelled, type ToolDefinition } from '../providers';
import type { Issue, Settings } from '../types';
import type { ExecuteTool, Tutor } from './tutor.svelte';
import { voiceTeachingInstructions } from './prompts';

interface VoiceEvent {
  type: string;
  item_id?: string;
  response_id?: string;
  delta?: string;
  transcript?: string;
  error?: { code?: string; message?: string };
  session?: { audio?: { input?: { turn_detection?: unknown } } };
  response?: {
    id?: string;
    status?: string;
    metadata?: { turn?: string };
    status_details?: { error?: { message?: string } };
    output?: { type: string; name: string; arguments: string; call_id: string }[];
  };
}
export class Voice {
  status = $state<'idle' | 'connecting' | 'listening' | 'thinking' | 'speaking' | 'reading'>(
    'idle'
  );
  held = $state(false);
  handsFree = $state(false);
  muted = $state(true);
  issue = $state<Issue | null>(null);
  private channel?: RealtimeChannel;
  private stream?: MediaStream;
  private audio?: HTMLAudioElement;
  private controller?: AbortController;
  private toolController?: AbortController;
  private generation = 0;
  private ready = false;
  private captureAt = 0;
  private request = '';
  private responseActive = false;
  private toolsPending: NonNullable<NonNullable<VoiceEvent['response']>['output']> = [];
  private outputPlaying = false;
  private turn = 0;
  private itemTurns = new Map<string, number>();
  private responseTurns = new Map<string, number>();
  private pendingCommits: number[] = [];
  constructor(
    private settings: () => Settings,
    private context: () => Promise<string>,
    private tools: ToolDefinition[],
    private execute: ExecuteTool,
    private tutor: Tutor,
    private interruptReading: () => void
  ) {}
  get active() {
    return this.status !== 'idle';
  }
  async start(handsFree = false) {
    if (this.active) {
      this.handsFree = handsFree;
      this.configure();
      return;
    }
    this.interruptReading();
    this.issue = null;
    this.handsFree = handsFree;
    this.status = 'connecting';
    const generation = ++this.generation;
    const controller = (this.controller = new AbortController());
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true }
      });
      if (generation !== this.generation) {
        stream.getTracks().forEach((track) => track.stop());
        return;
      }
      this.stream = stream;
      this.setMic(false);
      const settings = this.settings();
      this.audio = new Audio();
      this.audio.autoplay = true;
      const secret = await mintRealtimeSecret(
        settings.openaiKey,
        {
          model: settings.realtimeModel,
          voice: settings.realtimeVoice,
          instructions: (await this.context()) + '\n' + voiceTeachingInstructions,
          tools: this.tools
        },
        controller.signal
      );
      const channel = await connectRealtime({
        secret,
        model: settings.realtimeModel,
        microphone: stream,
        audio: this.audio,
        signal: controller.signal,
        onEvent: (event) => {
          if (generation === this.generation)
            void this.event(event as unknown as VoiceEvent).catch((error) => {
              if (!isCancelled(error) && generation === this.generation)
                this.issue = issueFor(error);
            });
        },
        onClosed: () => {
          if (generation === this.generation) {
            this.end();
            this.issue = { message: 'The voice connection ended. Reconnect when you’re ready.' };
          }
        }
      });
      if (generation !== this.generation) {
        channel.close();
        return;
      }
      this.channel = channel;
      this.status = 'listening';
      this.configure();
      this.audio.play().catch(() => {
        if (generation === this.generation)
          this.issue = {
            message: 'Your browser paused voice audio. Press Hear companion to continue.'
          };
      });
    } catch (error) {
      if (generation === this.generation) {
        this.end();
        if (!isCancelled(error)) this.issue = issueFor(error);
      }
    }
  }
  private setMic(enabled: boolean) {
    this.muted = !enabled;
    this.stream?.getAudioTracks().forEach((track) => (track.enabled = enabled));
  }
  private configure() {
    this.ready = false;
    this.channel?.send({
      type: 'session.update',
      session: {
        type: 'realtime',
        audio: {
          input: {
            transcription: { model: 'gpt-4o-mini-transcribe' },
            turn_detection: this.handsFree
              ? { type: 'server_vad', create_response: false, interrupt_response: true }
              : null
          }
        }
      }
    });
  }
  async hold() {
    if (this.held) return;
    this.held = true;
    this.interruptReading();
    this.interrupt();
    this.handsFree = false;
    if (!this.active) await this.start(false);
    else {
      if (this.audio) this.audio.muted = false;
      this.configure();
    }
    this.capture();
  }
  private capture() {
    if (!this.held || !this.ready || this.captureAt) return;
    this.channel?.send({ type: 'input_audio_buffer.clear' });
    this.captureAt = performance.now();
    this.setMic(true);
    this.status = 'listening';
  }
  release(discard = false) {
    if (!this.held) return;
    this.held = false;
    this.setMic(false);
    if (this.captureAt && !discard && performance.now() - this.captureAt >= 120) {
      this.pendingCommits.push(this.turn);
      this.channel?.send({ type: 'input_audio_buffer.commit' });
      this.status = 'thinking';
    } else this.channel?.send({ type: 'input_audio_buffer.clear' });
    this.captureAt = 0;
  }
  interrupt() {
    this.turn++;
    this.toolController?.abort();
    this.toolsPending = [];
    if (this.responseActive) this.channel?.send({ type: 'response.cancel' });
    this.channel?.send({ type: 'output_audio_buffer.clear' });
    this.responseActive = false;
    this.outputPlaying = false;
  }
  takeNarration() {
    if (!this.active) return;
    this.release(true);
    this.interrupt();
    this.setMic(false);
    if (this.audio) this.audio.muted = true;
    this.status = 'reading';
  }
  toggleMic() {
    if (!this.active) {
      void this.start(true);
      return;
    }
    this.interruptReading();
    if (this.audio) this.audio.muted = false;
    this.handsFree = !this.handsFree;
    this.configure();
    this.status = 'listening';
  }
  async hear() {
    await this.audio?.play();
    this.issue = null;
  }
  private respond() {
    this.channel?.send({
      type: 'response.create',
      response: { metadata: { turn: String(this.turn) } }
    });
    this.responseActive = true;
  }
  private async event(event: VoiceEvent) {
    if (event.type === 'response.created' && event.response?.id) {
      this.responseTurns.set(event.response.id, Number(event.response.metadata?.turn ?? this.turn));
    }
    const responseId = event.response_id || event.response?.id;
    const responseTurn =
      event.response?.metadata?.turn !== undefined
        ? Number(event.response.metadata.turn)
        : responseId
          ? this.responseTurns.get(responseId)
          : undefined;
    if (responseTurn !== undefined && responseTurn !== this.turn) return;
    if (
      event.type === 'session.updated' &&
      event.session?.audio?.input &&
      (this.handsFree || event.session.audio.input.turn_detection === null)
    ) {
      this.ready = true;
      if (this.handsFree && this.status !== 'reading') this.setMic(true);
      else this.capture();
    }
    if (event.type === 'input_audio_buffer.committed' && event.item_id)
      this.itemTurns.set(event.item_id, this.pendingCommits.shift() ?? this.turn);
    if (
      event.type === 'input_audio_buffer.speech_started' &&
      this.handsFree &&
      this.status !== 'reading'
    ) {
      this.interruptReading();
      this.interrupt();
      this.status = 'listening';
      if (event.item_id) this.itemTurns.set(event.item_id, this.turn);
    }
    if (
      event.type === 'conversation.item.input_audio_transcription.completed' &&
      event.transcript?.trim() &&
      this.status !== 'reading'
    ) {
      if (
        event.item_id &&
        this.itemTurns.has(event.item_id) &&
        this.itemTurns.get(event.item_id) !== this.turn
      )
        return;
      const turn = this.turn;
      this.request = event.transcript;
      this.tutor.transcript(event.item_id || crypto.randomUUID(), 'user', event.transcript);
      this.status = 'thinking';
      const instructions = await this.context();
      if (turn !== this.turn || !this.active) return;
      this.channel?.send({
        type: 'session.update',
        session: { type: 'realtime', instructions: instructions + '\n' + voiceTeachingInstructions }
      });
      this.respond();
    }
    if (event.type === 'response.output_audio_transcript.delta' && this.status !== 'reading')
      this.tutor.transcript(
        event.item_id || event.response_id || 'voice-response',
        'assistant',
        event.delta || '',
        true
      );
    if (event.type === 'output_audio_buffer.started' && this.status !== 'reading') {
      this.outputPlaying = true;
      this.status = 'speaking';
    }
    if (
      event.type === 'output_audio_buffer.stopped' ||
      event.type === 'output_audio_buffer.cleared'
    ) {
      this.outputPlaying = false;
      if (this.toolsPending.length) await this.runTools();
      else if (this.status !== 'reading') this.status = 'listening';
    }
    if (event.type === 'response.done') {
      this.responseActive = false;
      if (event.response?.status === 'failed') {
        this.issue = {
          message: 'The voice answer could not finish. Try asking again.',
          detail: event.response.status_details?.error?.message
        };
        this.status = 'listening';
      } else if (event.response?.status !== 'cancelled') {
        this.toolsPending.push(
          ...(event.response?.output || []).filter((item) => item.type === 'function_call')
        );
        if (!this.outputPlaying) await this.runTools();
      }
    }
    if (event.type === 'error' && !/cancel|empty/.test(event.error?.code || '')) {
      this.issue = {
        message: 'That voice action could not finish. You can try again.',
        detail: event.error?.message
      };
    }
  }
  private async runTools() {
    const calls = this.toolsPending.splice(0);
    if (!calls.length) {
      if (this.status !== 'reading') this.status = 'listening';
      return;
    }
    const turn = this.turn;
    const controller = (this.toolController = new AbortController());
    let handedOff = false;
    for (const call of calls) {
      if (controller.signal.aborted || turn !== this.turn) return;
      let output: unknown;
      try {
        output = await this.execute(
          call.name,
          JSON.parse(call.arguments),
          controller.signal,
          this.request
        );
      } catch (error) {
        if (isCancelled(error)) return;
        output = { error: issueFor(error).message };
      }
      if ((output as { playback?: string })?.playback === 'started') handedOff = true;
      this.channel?.send({
        type: 'conversation.item.create',
        item: {
          type: 'function_call_output',
          call_id: call.call_id,
          output: JSON.stringify(output)
        }
      });
    }
    if (!handedOff && !controller.signal.aborted && turn === this.turn) this.respond();
  }
  end() {
    this.generation++;
    this.release(true);
    this.interrupt();
    this.controller?.abort();
    this.channel?.close();
    this.channel = undefined;
    this.stream?.getTracks().forEach((track) => track.stop());
    this.stream = undefined;
    this.audio?.pause();
    if (this.audio) this.audio.srcObject = null;
    this.status = 'idle';
    this.ready = false;
    this.handsFree = false;
    this.setMic(false);
    this.pendingCommits = [];
    this.itemTurns.clear();
    this.responseTurns.clear();
  }
}
