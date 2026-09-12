import type { Issue, Passage, Settings } from '../types';
import { issueFor, isCancelled } from '../providers';
import {
  groupPassages,
  prepareSpeech,
  prepareClip,
  splitPrepared,
  type PreparedClip
} from './passages';
import { readLocal, writeLocal } from '../storage';
import { sourceHighlighter } from './highlight';

interface Track {
  prepared: PreparedClip;
  buffer: AudioBuffer;
  start: number;
}
export class Narrator {
  status = $state<'idle' | 'preparing' | 'playing' | 'paused' | 'error'>('idle');
  issue = $state<Issue | null>(null);
  title = $state('');
  pageId = $state('');
  passageId = $state('');
  caption = $state('');
  word = $state('');
  rate = $state(1);
  follow = $state(true);
  captions = $state(false);
  seconds = $state(0);
  script = $state('');
  passageScript = $state('');
  sourcePassage = $state.raw<Passage | null>(null);
  private context?: AudioContext;
  private controller?: AbortController;
  private tracks: Track[] = [];
  private sources = new Set<AudioBufferSourceNode>();
  private origin = 0;
  private offset = 0;
  private frame = 0;
  private generation = 0;
  private finished = false;
  private lastSaved = 0;
  private onTakeAudio: () => void;
  private queue: Passage[] = [];
  private settings?: Settings;
  private lastHighlight?: HTMLElement;
  private highlighter?: ReturnType<typeof sourceHighlighter>;
  private highlightedPart = '';
  constructor(onTakeAudio: () => void = () => {}) {
    this.onTakeAudio = onTakeAudio;
  }
  get active() {
    return this.status !== 'idle';
  }
  get duration() {
    const last = this.tracks.at(-1);
    return last ? last.start + last.buffer.duration : 0;
  }
  async start(pageId: string, title: string, passages: Passage[], settings: Settings) {
    if (!passages.length) return;
    this.stop();
    this.onTakeAudio();
    const generation = this.generation;
    this.context ??= new AudioContext();
    await this.context.resume();
    if (generation !== this.generation) return;
    this.pageId = pageId;
    this.title = title;
    this.queue = passages;
    this.settings = { ...settings };
    this.status = 'preparing';
    this.controller = new AbortController();
    void this.fill(generation, this.controller.signal);
  }
  private async fill(generation: number, signal: AbortSignal) {
    const blocks = groupPassages(this.queue);
    let previous = '';
    try {
      for (const block of blocks) {
        signal.throwIfAborted();
        const speech = await prepareSpeech(this.settings!, block, signal);
        for (const part of splitPrepared(speech)) {
          signal.throwIfAborted();
          // Keep at most about two minutes ahead. A paused reader incurs no
          // unbounded background generation or chapter-wide audio charges.
          while (this.duration - this.currentTime() > 120 && !signal.aborted) {
            await new Promise<void>((resolve) => setTimeout(resolve, 250));
          }
          signal.throwIfAborted();
          const prepared = await prepareClip(this.settings!, part, previous, signal);
          const buffer = await this.context!.decodeAudioData(
            await prepared.clip.blob.arrayBuffer()
          );
          if (generation !== this.generation) return;
          const track = { prepared, buffer, start: this.duration };
          this.tracks.push(track);
          previous = part.text;
          if (this.status === 'playing' && this.currentTime() > track.start) {
            this.offset = track.start;
            this.silence();
            this.begin();
          } else if (this.status === 'preparing') this.begin();
          else if (this.status === 'playing') this.schedule(track);
        }
      }
      if (generation === this.generation) this.finished = true;
    } catch (error) {
      if (generation !== this.generation || isCancelled(error)) return;
      this.issue = issueFor(error);
      // Already buffered audio can continue; an unavailable future passage
      // is reported inline when playback reaches it.
      if (!this.tracks.length || this.currentTime() >= this.duration) this.status = 'error';
    }
  }
  private begin() {
    if (!this.context) return;
    this.origin = this.context.currentTime + 0.04;
    this.status = 'playing';
    for (const track of this.tracks) this.schedule(track);
    this.tick();
  }
  private schedule(track: Track) {
    if (!this.context || track.start + track.buffer.duration <= this.offset) return;
    const source = this.context.createBufferSource();
    source.buffer = track.buffer;
    source.playbackRate.value = this.rate;
    source.connect(this.context.destination);
    const skip = Math.max(0, this.offset - track.start);
    const when = this.origin + Math.max(0, track.start - this.offset) / this.rate;
    source.start(Math.max(this.context.currentTime, when), skip);
    this.sources.add(source);
    source.onended = () => {
      this.sources.delete(source);
      source.disconnect();
    };
  }
  currentTime() {
    return this.status === 'playing' && this.context
      ? this.offset + Math.max(0, this.context.currentTime - this.origin) * this.rate
      : this.offset;
  }
  private tick = () => {
    if (this.status !== 'playing') return;
    this.seconds = Math.min(this.currentTime(), this.duration);
    const track = this.tracks.find(
      (t) => this.seconds >= t.start && this.seconds < t.start + t.buffer.duration
    );
    if (track) {
      this.script = track.prepared.text;
      const time = this.seconds - track.start;
      const spoken = track.prepared.clip.words.find(
        (w) => time >= w.startTime && time <= w.endTime + 0.1
      );
      this.word = spoken?.text || '';
      const at =
        spoken?.start ?? Math.floor((track.prepared.text.length * time) / track.buffer.duration);
      const part =
        track.prepared.parts.find((p) => at >= p.start && at < p.end) || track.prepared.parts[0];
      if (part) {
        this.caption = part.text;
        this.passageScript = part.text;
        this.sourcePassage = part.passage;
        if (this.passageId !== part.passage.id) {
          this.passageId = part.passage.id;
          this.emphasize(part.passage.id);
        }
        const key = `${track.start}:${part.passage.id}:${document.body.dataset.page}`;
        if (this.highlightedPart !== key) {
          this.highlighter?.clear();
          this.highlightedPart = key;
          this.highlighter = sourceHighlighter(
            document.body.dataset.page === this.pageId &&
              ['text', 'heading'].includes(part.passage.kind)
              ? document.getElementById(part.passage.id)
              : null,
            track.prepared.clip.words,
            part.start,
            part.end
          );
        }
        this.highlighter?.show(spoken ? track.prepared.clip.words.indexOf(spoken) : -1);
      }
    }
    if (Date.now() - this.lastSaved > 1500) {
      this.remember();
      this.lastSaved = Date.now();
      // Retain a minute for skipping back, while releasing decoded audio from
      // earlier in a long chapter. Disk cache still supports replaying it.
      while (
        this.tracks.length > 1 &&
        this.tracks[0].start + this.tracks[0].buffer.duration < this.seconds - 60
      )
        this.tracks.shift();
    }
    if (this.seconds >= this.duration - 0.015 && this.sources.size === 0) {
      this.offset = this.duration;
      if (this.finished) {
        this.remember(true);
        this.stop();
        return;
      }
      this.status = this.issue ? 'error' : 'preparing';
      return;
    }
    this.frame = requestAnimationFrame(this.tick);
  };
  private emphasize(id: string) {
    this.lastHighlight?.classList.remove('narration-active');
    if (document.body.dataset.page !== this.pageId) return;
    const element = document.getElementById(id);
    if (!element) return;
    this.lastHighlight = element;
    element.classList.add('narration-active');
    if (this.follow) {
      document.dispatchEvent(new CustomEvent('gr:reveal-location', { detail: { element } }));
      for (let parent = element.parentElement; parent; parent = parent.parentElement)
        if (parent instanceof HTMLDetailsElement) parent.open = true;
      const rect = element.getBoundingClientRect();
      if (rect.top < 100 || rect.bottom > innerHeight - 120)
        element.scrollIntoView({ block: 'center', behavior: 'smooth' });
    }
  }
  pause() {
    if (!this.active) return;
    this.offset = Math.min(this.currentTime(), this.duration);
    this.silence();
    this.status = 'paused';
    this.remember();
  }
  async resume() {
    if (!this.context) return;
    const generation = this.generation;
    this.onTakeAudio();
    await this.context.resume();
    if (generation !== this.generation) return;
    if (this.issue && this.offset >= this.duration) {
      await this.retry();
      return;
    }
    if (this.offset < this.duration) this.begin();
    else this.status = 'preparing';
  }
  async retry() {
    const page = this.pageId,
      title = this.title,
      settings = this.settings;
    const index = this.queue.findIndex((p) => p.id === this.passageId);
    if (settings) await this.start(page, title, this.queue.slice(Math.max(0, index)), settings);
  }
  seek(delta: number) {
    const playing = this.status === 'playing';
    this.offset = Math.max(
      this.tracks[0]?.start || 0,
      Math.min(this.duration - 0.01, this.currentTime() + delta)
    );
    this.silence();
    this.seconds = this.offset;
    if (playing) this.begin();
  }
  setRate(value: number) {
    const playing = this.status === 'playing';
    this.offset = Math.min(this.currentTime(), this.duration);
    this.silence();
    this.rate = value;
    if (playing) this.begin();
  }
  private silence() {
    cancelAnimationFrame(this.frame);
    for (const source of this.sources) {
      source.onended = null;
      try {
        source.stop();
      } catch {}
      source.disconnect();
    }
    this.sources.clear();
  }
  private remember(completed = false) {
    if (!this.pageId || !this.passageId) return;
    type History = Record<string, { heard: Record<string, unknown>; last?: unknown }>;
    const history = readLocal<History>('gr-listening-history-v1', {});
    const chapter = (history[this.pageId] ||= { heard: {} });
    chapter.last = {
      passage: this.passageId,
      heading: this.title,
      seconds: this.seconds,
      excerpt: this.caption.slice(0, 350),
      at: Date.now()
    };
    for (const track of this.tracks) {
      if (track.start + track.buffer.duration > this.seconds + (completed ? 0.1 : 0)) continue;
      for (const part of track.prepared.parts)
        chapter.heard[part.passage.id] = {
          hash: part.passage.hash,
          completed: true,
          word: 0,
          seconds: 0
        };
    }
    writeLocal('gr-listening-history-v1', history);
  }
  stop() {
    this.remember();
    this.generation++;
    this.controller?.abort();
    this.silence();
    this.tracks = [];
    this.offset = 0;
    this.seconds = 0;
    this.finished = false;
    this.status = 'idle';
    this.issue = null;
    this.passageId = '';
    this.caption = '';
    this.word = '';
    this.script = '';
    this.passageScript = '';
    this.sourcePassage = null;
    this.lastHighlight?.classList.remove('narration-active');
    this.highlighter?.clear();
    this.highlightedPart = '';
  }
  dispose() {
    this.stop();
    void this.context?.close();
  }
}
