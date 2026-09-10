import assert from 'node:assert/strict';
import {defaultShortcut,shortcutFromEvent,matchesShortcut,releasesShortcut,shortcutLabel} from '../src/lib/voice-shortcut.js';
import {voiceToolQueue, navigationOnlyRequest} from '../src/lib/voice-tools.js';

const executed = [], errors = [];
const queue = voiceToolQueue(async (calls, signal) => executed.push({calls: calls.map(c => c.call_id), signal}), e => errors.push(e));
const settle = () => new Promise(resolve => setImmediate(resolve));
const tool = id => ({type:'function_call', call_id:id, name:'show_chapter', arguments:'{"page":"chapter-7"}'});
const audio = {type:'message', content:[{type:'audio', transcript:'Opening chapter seven.'}]};
function created(id) { const metadata = queue.metadata(); queue.handle({type:'response.created',response:{id,metadata}}); return metadata; }
function done(id, output, status='completed', metadata=queue.metadata()) { queue.handle({type:'response.done',response:{id,status,metadata,output}}); }
function buffer(type,id) { queue.handle({type:`output_audio_buffer.${type}`,response_id:id}); }

created('spoken'); buffer('started','spoken'); done('spoken',[audio,tool('navigate')]);
await settle(); assert.equal(executed.length,0,'Generation completion must not interrupt speech');
buffer('stopped','unrelated'); await settle(); assert.equal(executed.length,0,'Only the matching playback can release tools');
buffer('stopped','spoken'); await settle(); assert.deepEqual(executed.at(-1).calls,['navigate']);
done('spoken',[audio,tool('navigate')]); buffer('stopped','spoken'); await settle(); assert.equal(executed.length,1,'Duplicate events are harmless');

// The final response itself identifies speech, even if playback starts later.
created('late-start'); done('late-start',[audio,tool('narrate')]); await settle(); assert.equal(executed.length,1);
buffer('started','late-start'); buffer('stopped','late-start'); await settle(); assert.equal(executed.length,2);
created('early-stop'); buffer('started','early-stop'); buffer('stopped','early-stop'); done('early-stop',[audio,tool('early')]);
await settle(); assert.equal(executed.length,3);
created('silent'); done('silent',[tool('lookup')]); await settle(); assert.equal(executed.length,4,'A function-only response does not wait for nonexistent audio');

const old = created('interrupted'); buffer('started','interrupted'); done('interrupted',[audio,tool('must-not-play')]);
queue.interrupt(); buffer('stopped','interrupted'); done('late-old-response',[tool('late')],'completed',old);
await settle(); assert.equal(executed.length,4,'An interrupted turn cannot act later');
assert.equal(executed[0].signal.aborted,true,'Interruption also aborts in-flight work');
created('cleared'); buffer('started','cleared'); done('cleared',[audio,tool('cleared')]); buffer('cleared','cleared'); buffer('stopped','cleared');
for(const status of ['cancelled','failed','incomplete']){created(status);done(status,[tool(status)],status);}
await settle(); assert.equal(executed.length,4,'Clearing audio is cancellation, not permission to run its tools');
created('new'); done('new',[tool('after-interruption')]); await settle(); assert.equal(executed.length,5);
assert.deepEqual(errors,[]);

for(const text of ['Take me to chapter 7','Open chapter eight','Show me the geodesic equation','Please go to section 4.2']) assert.equal(navigationOnlyRequest(text),true,text);
for(const text of ['Read chapter 7 aloud','Go to chapter 7 and read it to me','Open chapter 7 and start narration','Resume reading','Explain the interval']) assert.equal(navigationOnlyRequest(text),false,text);
console.log('Verified voice tool scheduling: completed playback, both event orders, silent calls, deduplication, interruptions, stale turns, cancellation, and navigation-only commands.');

const shortcut=defaultShortcut('MacIntel');
const press={code:'Space',key:' ',metaKey:true,shiftKey:true,ctrlKey:false,altKey:false,repeat:false};
assert(matchesShortcut(press,shortcut));assert(!matchesShortcut({...press,repeat:true},shortcut));
assert(releasesShortcut({...press,code:'MetaLeft',metaKey:false},shortcut));
assert(!releasesShortcut({...press,code:'KeyA'},shortcut));
assert.equal(shortcutFromEvent({code:'KeyA',key:'a'}),null,'Unmodified typing is not a shortcut');
const modifiers=shortcutFromEvent({...press,key:'Shift',code:'ShiftLeft'});assert.equal(modifiers.code,null);assert(matchesShortcut({...press,code:'MetaLeft'},modifiers));
assert.equal(shortcutLabel(shortcut),'⌘ + Shift + Space');assert.equal(defaultShortcut('Linux').ctrl,true);
console.log('Verified configurable hold-to-talk combinations, modifier-only bindings, release detection, and ordinary typing exclusion.');
