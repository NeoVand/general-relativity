// response.done ends generation, not WebRTC playback. A spoken response must
// also drain output_audio_buffer before its tools may change the reader.
export function voiceToolQueue(execute, onError = () => {}) {
 const responses = new Map(), seen = new Set();
 let turn = 0, controller = new AbortController(), tail = Promise.resolve();
 const current = state => state.turn === turn && !state.cancelled;
 function drain() {
  if ([...responses.values()].some(s => current(s) && s.audio && !s.stopped)) return;
  for (const state of responses.values()) {
   if (!current(state) || !state.done || state.dispatched) continue;
   state.dispatched = true;
   const calls = state.calls.filter(c => c.call_id && !seen.has(c.call_id));
   calls.forEach(c => seen.add(c.call_id));
   if (!calls.length) continue;
   const signal = controller.signal;
   tail = tail.then(() => {
    if (!signal.aborted && current(state)) return execute(calls, signal);
   }).catch(onError);
  }
 }
 return {
  metadata: () => ({study_turn: String(turn)}),
  interrupt() {
   turn++; controller.abort(); controller = new AbortController();
   // Do not let an uncooperative old network request block the new turn.
   tail = Promise.resolve();
  },
  accepts(event) {
   const id = event.response?.id || event.response_id, state = responses.get(id);
   const stamped = event.response?.metadata?.study_turn;
   return (stamped === undefined || stamped === String(turn)) && (!state || current(state));
  },
  handle(event) {
   const id = event.response?.id || event.response_id;
   if (!id || !this.accepts(event)) return;
   let state = responses.get(id);
   if (!state) {
    state = {turn, audio: false, stopped: false, done: false, calls: [], cancelled: false, dispatched: false};
    responses.set(id, state);
   }
   if (event.type === 'output_audio_buffer.started' || event.type === 'response.output_audio_transcript.delta' || event.type === 'response.output_audio.delta') state.audio = true;
   if (event.type === 'output_audio_buffer.stopped') state.stopped = true;
   if (event.type === 'output_audio_buffer.cleared') { state.stopped = true; state.cancelled = true; }
   if (event.type === 'response.done') {
    state.done = true;
    if (event.response.status !== 'completed') { state.cancelled = true; state.stopped = true; }
    else {
     const output = event.response.output || [];
     state.audio ||= output.some(item => item.content?.some(part => part.type === 'audio' || part.type === 'output_audio'));
     state.calls = output.filter(item => item.type === 'function_call');
    }
   }
   drain();
  }
 };
}

// A narrow guard for explicit navigation commands, not a general intent parser.
// Other wording is handled by the tutor's separate navigation/playback tools.
export function navigationOnlyRequest(text = '') {
 return /\b(?:take me|bring me|go to|navigate to|open|show me|jump to)\b/i.test(text)
  && !/\b(?:read|reading|listen|listening|narrate|narration|play|playback|resume)\b/i.test(text);
}
