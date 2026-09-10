import fs from 'node:fs';
import assert from 'node:assert/strict';
import {chromium} from 'playwright';
import {parseHTML} from 'linkedom';
import {splitSpeech} from '../src/lib/narration.js';
const longSpeech=('At 1.5 times the initial radius, the ratio is 0.75. A clock records 3.14159 seconds. ').repeat(80);
const speechParts=splitSpeech(longSpeech);assert.ok(speechParts.every(s=>s.length<=2500));assert.equal(speechParts.join(' '),longSpeech.trim());
const base=process.env.BOOK_URL||'http://localhost:4173/';
const chrome='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const browser=await chromium.launch({headless:true,...(fs.existsSync(chrome)?{executablePath:chrome}:{}),args:['--autoplay-policy=no-user-gesture-required','--enable-unsafe-swiftshader']});
const page=await browser.newPage({viewport:{width:1440,height:1000}});
const errors=[];page.on('pageerror',e=>errors.push(e.message));
const requests=[];
const index=JSON.parse(fs.readFileSync('site/reading-index.json'));
const destination=index.find(p=>p.id==='chapter-3');
const target=destination.segments.find(s=>s.kind==='equation');
let mode='normal',turn=0,delay=0,connectionDelay=0;
const speech='Proper time is the elapsed time recorded by the clock that follows this path. Add the small time increments along the path, weighted by the clock rate. The result depends on the path, not just its endpoints.';
const samples=24000*4,wav=Buffer.alloc(44+samples*2);wav.write('RIFF');wav.writeUInt32LE(wav.length-8,4);wav.write('WAVEfmt ',8);wav.writeUInt32LE(16,16);wav.writeUInt16LE(1,20);wav.writeUInt16LE(1,22);wav.writeUInt32LE(24000,24);wav.writeUInt32LE(48000,28);wav.writeUInt16LE(2,32);wav.writeUInt16LE(16,34);wav.write('data',36);wav.writeUInt32LE(samples*2,40);
await page.route('https://api.openai.com/**',async route=>{
 const req=route.request(),body=req.url().includes('/realtime/calls')?req.postData():req.postDataJSON();requests.push({url:req.url(),body});
 if(req.url().includes('client_secrets')){if(connectionDelay)await new Promise(r=>setTimeout(r,connectionDelay));return route.fulfill({json:{value:'ephemeral-test-secret'}});}
 if(req.url().includes('/realtime/calls'))return route.fulfill({body:'mock-sdp-answer'});
 if(mode==='unauthorized')return route.fulfill({status:401,json:{error:{message:'Unauthorized'}}});
 if(delay)await new Promise(r=>setTimeout(r,delay));
 let message;
 if(!body.tools)message={role:'assistant',content:speech};
 else if(mode==='navigate'&&turn++===0)message={role:'assistant',content:null,tool_calls:[{id:'show-1',type:'function',function:{name:'show_passage',arguments:JSON.stringify({page:destination.id,passage:target.id})}}]};
 else if(mode==='invalid'&&turn++===0)message={role:'assistant',content:null,tool_calls:[{id:'bad-1',type:'function',function:{name:'show_passage',arguments:JSON.stringify({page:'https://evil.invalid',passage:'made-up'})}}]};
 else message={role:'assistant',content:'The metric $g_{\\mu\\nu}$ tells us how to measure. <img src=x onerror="window.injected=true">'};
 await route.fulfill({json:{choices:[{finish_reason:'stop',message}]}});
});
await page.route('https://api.elevenlabs.io/**',async route=>{
 requests.push({url:route.request().url(),body:route.request().postDataJSON()});
 if(route.request().url().endsWith('/voices'))return route.fulfill({json:{voices:[{voice_id:'test-voice',name:'Test narrator'}]}});
 const text=route.request().postDataJSON().text;const characters=Array.from(text);await route.fulfill({json:{audio_base64:wav.toString('base64'),alignment:{characters,character_start_times_seconds:characters.map((_,i)=>i*4/characters.length),character_end_times_seconds:characters.map((_,i)=>(i+1)*4/characters.length)}}});
});
await page.addInitScript(()=>{
 const NativeAudio=window.Audio;window.__audio=[];window.Audio=function(...args){const audio=new NativeAudio(...args);window.__audio.push(audio);return audio};
 window.__lifecycle={stopped:0,closed:0,sent:[],trackEnabled:true};
 const track={kind:'audio',stop(){window.__lifecycle.stopped++},get enabled(){return window.__lifecycle.trackEnabled},set enabled(v){window.__lifecycle.trackEnabled=v}};
 Object.defineProperty(navigator.mediaDevices,'getUserMedia',{value:async()=>({getTracks:()=>[track],getAudioTracks:()=>[track]})});
 class MockPeer{
  connectionState='connected';addTrack(){}addTransceiver(){}
  createDataChannel(){const channel={readyState:'connecting',send(e){const event=JSON.parse(e);window.__lifecycle.sent.push(event);if(event.type==='session.update'&&event.session.audio?.input)queueMicrotask(()=>window.__emit({type:'session.updated',session:{audio:{input:event.session.audio.input}}}));if(event.type==='input_audio_buffer.commit'){window.__lastCommitted=crypto.randomUUID();queueMicrotask(()=>window.__emit({type:'input_audio_buffer.committed',item_id:window.__lastCommitted}));}},close(){this.readyState='closed'}};this.channel=channel;window.__channel=channel;return channel}
  async createOffer(){return {sdp:'mock-sdp-offer'}}async setLocalDescription(){}
  async setRemoteDescription(){setTimeout(()=>{this.channel.readyState='open';this.channel.onopen?.()},1)}
  close(){window.__lifecycle.closed++}
 }
 window.RTCPeerConnection=MockPeer;
 window.__emit=event=>window.__channel.onmessage({data:JSON.stringify(event)});
 window.__response=(id,output,{spoken=false,finish=true,status='completed'}={})=>{
  const metadata=window.__lifecycle.sent.filter(e=>e.type==='response.create').at(-1)?.response?.metadata;
  window.__emit({type:'response.created',response:{id,metadata}});
  if(spoken){window.__emit({type:'output_audio_buffer.started',response_id:id});window.__emit({type:'response.output_audio_transcript.delta',response_id:id,item_id:id+'-text',delta:'I’ll open that chapter.'});}
  window.__emit({type:'response.done',response:{id,metadata,status,output:spoken?[{type:'message',content:[{type:'audio',transcript:'I’ll open that chapter.'}]},...output]:output}});
  if(spoken&&finish)window.__emit({type:'output_audio_buffer.stopped',response_id:id});
 };
});
async function say(transcript){
 const count=await page.evaluate(()=>window.__lifecycle.sent.filter(e=>e.type==='response.create').length);
 await page.evaluate(transcript=>{const item_id=crypto.randomUUID();window.__emit({type:'input_audio_buffer.speech_started',item_id});window.__emit({type:'conversation.item.input_audio_transcription.completed',item_id,transcript});},transcript);
 await page.waitForFunction(count=>window.__lifecycle.sent.filter(e=>e.type==='response.create').length>count,count);
}
try{
 const home=parseHTML(fs.readFileSync('site/index.html','utf8')).document;
 for(const chapter of [6,10])assert.ok(home.querySelector(`.chapter-card[href="chapter-${chapter}.html"] .math-geometry`));
 for(const chapter of [11,12,13,15])assert.ok(home.querySelector(`.chapter-card[href="chapter-${chapter}.html"] .math-curvature`));
 // Every displayed equation, figure and visualization has a narration anchor.
 for(const name of fs.readdirSync('site').filter(f=>f.endsWith('.html'))){
  const {document}=parseHTML(fs.readFileSync('site/'+name,'utf8'));
  for(const el of document.querySelectorAll('.equation,figure,.scene-stage'))assert.ok(el.closest('[data-passage]'),`${name}: missing narration coverage`);
  const data=JSON.parse(document.querySelector('#reading-data').textContent);
  for(const s of data.segments){assert.ok(s.text||s.latex.length);assert.ok(document.getElementById(s.id));}
 }
 await page.goto(new URL('chapter-0.html',base).href);await page.locator('.study-launcher').waitFor();
 await page.getByRole('button',{name:'Listen',exact:true}).click();
 await page.getByRole('button',{name:'Listen to this chapter',exact:true}).click();
 await page.getByRole('tabpanel',{name:'Connections'}).waitFor();assert.equal(requests.length,0);
 await page.getByLabel('OpenAI API key',{exact:true}).fill('sk-test-placeholder');
 await page.getByLabel('ElevenLabs API key',{exact:true}).fill('test-eleven-placeholder');
 await page.getByRole('button',{name:'Find voices',exact:true}).click();
 await page.getByLabel('Your available voices').selectOption('test-voice');
 await page.getByRole('button',{name:'Save connections',exact:true}).click();
 assert.equal(await page.evaluate(()=>localStorage.getItem('gr-study-settings')),null);
 assert.ok(await page.evaluate(()=>JSON.parse(sessionStorage.getItem('gr-study-settings')).openaiKey));
 await page.getByRole('button',{name:'Close study panel',exact:true}).click();
 await page.locator('.equation [data-study-action="listen"]').first().click();await page.getByRole('button',{name:'Open narration controls',exact:true}).click();
 await page.waitForFunction(()=>document.querySelector('.listening-bar')&&document.querySelector('.reading-now .study-eyebrow')?.textContent==='NOW READING');
 assert.ok(requests.some(r=>r.body?.model==='gpt-5.6-terra'&&r.body.reasoning_effort==='none'));
 const tts=requests.find(r=>r.url.includes('text-to-speech'));assert.equal(tts.body.text,speech);assert.equal(tts.body.model_id,'eleven_flash_v2_5');assert.ok(tts.url.includes('/with-timestamps'));await page.locator('.panel-spoken-words .spoken-current').waitFor();
 await page.getByRole('button',{name:'Pause narration',exact:true}).click();await page.getByRole('button',{name:'Resume narration',exact:true}).waitFor();
 await page.getByRole('button',{name:'Show spoken explanation',exact:true}).click();assert.equal(await page.getByLabel('Spoken explanation',{exact:true}).inputValue(),speech);
 await page.getByRole('button',{name:'Stop narration',exact:true}).click();
 const before=requests.length;
 await page.getByRole('button',{name:'Close study panel',exact:true}).click();
 await page.locator('.equation [data-study-action="listen"]').first().click();await page.getByRole('button',{name:'Open narration controls',exact:true}).click();await page.waitForFunction(()=>document.querySelector('.reading-now .study-eyebrow')?.textContent==='NOW READING');assert.equal(requests.length,before,'script and audio cache prevent repeat billing');
 await page.getByRole('button',{name:'Stop narration',exact:true}).click();
 // Continuous chapter narration advances on audio completion and supports skipping.
 await page.getByRole('button',{name:'Listen to this chapter',exact:true}).click();
 await page.waitForFunction(()=>document.querySelector('.reading-now .study-eyebrow')?.textContent==='NOW READING');
 await page.evaluate(()=>window.__audio[0].dispatchEvent(new Event('ended')));
 await page.waitForFunction(()=>document.querySelector('.player-title small')?.textContent.startsWith('Passage 2 '));await page.waitForFunction(()=>CSS.highlights?.get('spoken-word')?.size>0);await page.screenshot({path:'qa/study-word-highlighting.png'});
 await page.getByRole('button',{name:'Next passage',exact:true}).click();
 await page.waitForFunction(()=>document.querySelector('.player-title small')?.textContent.startsWith('Passage 3 '));
 await page.getByRole('button',{name:'Stop narration',exact:true}).click();
 // The text tutor navigates without replacing the Svelte app or conversation.
 await page.getByRole('tab',{name:'Ask',exact:true}).click();mode='navigate';turn=0;
 await page.getByLabel('Ask a question',{exact:true}).fill('Show me the proper-time equation.');await page.getByRole('button',{name:'Send question',exact:true}).click();
 await page.waitForURL('**/chapter-3.html#'+target.id);await page.locator('.chat-message.assistant .katex').waitFor();
 assert.equal(await page.locator('.assistant-focus').getAttribute('id'),target.id);
 assert.equal(await page.locator('.chat-message.user').count(),1);assert.equal(await page.evaluate(()=>window.injected),undefined);
 assert.ok(await page.locator('.chat-message.assistant .math-geometry').count());
 const navAnswer=requests.find(r=>r.body?.messages?.some(m=>m.role==='tool'&&m.content.includes('"shown":true')));assert.ok(navAnswer);
 mode='invalid';turn=0;await page.getByLabel('Ask a question',{exact:true}).fill('Show an invalid target');await page.getByRole('button',{name:'Send question',exact:true}).click();await page.waitForFunction(()=>document.querySelectorAll('.chat-message.assistant').length===2);
 assert.ok(page.url().includes('chapter-3.html'));assert.ok(requests.some(r=>r.body?.messages?.some(m=>m.role==='tool'&&m.content.includes('Unknown chapter'))));
 // Cancelling a pending answer must leave no late response or navigation.
 mode='normal';delay=1200;const answersBefore=await page.locator('.chat-message.assistant').count();
 await page.getByLabel('Ask a question',{exact:true}).fill('A slow question');await page.getByRole('button',{name:'Send question',exact:true}).click();await page.getByRole('button',{name:'Stop',exact:true}).click();
 await page.waitForTimeout(1400);assert.equal(await page.locator('.chat-message.assistant').count(),answersBefore);delay=0;
 // Realtime model, ephemeral authentication, tool outputs, navigation, and teardown.
 mode='normal';await page.getByRole('button',{name:'Talk about this page',exact:true}).click();await page.getByRole('button',{name:'Mute',exact:true}).waitFor();
 const secret=requests.find(r=>r.url.includes('client_secrets'));assert.equal(secret.body.session.model,'gpt-realtime-2.1');for(const name of ['play_section','control_narration','get_book_outline','consult_text_tutor'])assert.ok(secret.body.session.tools.some(t=>t.name===name));assert.ok(secret.body.session.instructions.includes('CURRENT CHAPTER OUTLINE'));assert.ok(secret.body.session.instructions.includes('LISTENING HISTORY'));assert.ok(secret.body.session.instructions.length<65000);
 await page.getByRole('button',{name:'Mute',exact:true}).click();assert.equal(await page.evaluate(()=>window.__lifecycle.trackEnabled),false);
 await page.getByRole('button',{name:'Unmute',exact:true}).click();
 const other=index.find(p=>p.id==='chapter-8'),otherTarget=other.segments.find(s=>s.kind==='visualization');
 // A navigation request stays silent and waits for actual audio playout.
 const ttsBeforeNavigation=requests.filter(r=>r.url.includes('text-to-speech')).length;
 const urlBeforeNavigation=page.url();
 await say('Take me to chapter 7.');
 await page.evaluate(()=>window.__response('voice-open',[{type:'function_call',call_id:'voice-open',name:'show_chapter',arguments:'{"page":"chapter-7"}'}],{spoken:true,finish:false}));
 await page.waitForTimeout(150);assert.equal(page.url(),urlBeforeNavigation);assert.equal(await page.evaluate(()=>window.__audio[1].muted),false);
 await page.evaluate(()=>window.__emit({type:'output_audio_buffer.stopped',response_id:'voice-open'}));
 await page.waitForURL('**/chapter-7.html');await page.waitForFunction(()=>window.__lifecycle.sent.some(e=>e.item?.call_id==='voice-open'));
 assert.equal(requests.filter(r=>r.url.includes('text-to-speech')).length,ttsBeforeNavigation);assert.equal(await page.evaluate(()=>window.__lifecycle.trackEnabled),true);
 // Even an incorrect narration tool choice cannot turn "take me to" into reading.
 await page.evaluate(({other,otherTarget})=>window.__response('unrequested-reading',[{type:'function_call',call_id:'unrequested-reading',name:'play_section',arguments:JSON.stringify({page:other.id,passage:otherTarget.id})}]),{other,otherTarget});
 await page.waitForFunction(()=>window.__lifecycle.sent.some(e=>e.item?.call_id==='unrequested-reading'));
 assert.ok(await page.evaluate(()=>window.__lifecycle.sent.find(e=>e.item?.call_id==='unrequested-reading').item.output.includes('navigation only')));
 assert.equal(await page.locator('.listening-bar[aria-label="Narration player"]').count(),0);
 // Interrupted speech discards the action waiting behind it.
 await page.evaluate(()=>window.__response('interrupted-navigation',[{type:'function_call',call_id:'interrupted-navigation',name:'show_chapter',arguments:'{"page":"chapter-12"}'}],{spoken:true,finish:false}));
 await page.evaluate(()=>{window.__emit({type:'input_audio_buffer.speech_started',item_id:'interrupt'});window.__emit({type:'output_audio_buffer.stopped',response_id:'interrupted-navigation'});});
 await page.waitForTimeout(150);assert.ok(page.url().endsWith('/chapter-7.html'));

 await say('Show me the transport visualization in chapter 8.');
 await page.evaluate(({other,otherTarget})=>window.__response('voice-show',[{type:'function_call',call_id:'voice-show',name:'show_passage',arguments:JSON.stringify({page:other.id,passage:otherTarget.id})}]),{other,otherTarget});
 await page.waitForURL('**/chapter-8.html#'+otherTarget.id);await page.waitForFunction(()=>window.__lifecycle.sent.some(e=>e.item?.call_id==='voice-show'));
 assert.equal(await page.getByRole('button',{name:'End call',exact:true}).count(),1);assert.equal(await page.evaluate(()=>window.__lifecycle.stopped),0);
 // Voice hands an exact range to ElevenLabs without another spoken response.
 await say('Read this visualization aloud.');
 await page.getByRole('button',{name:'Minimize study companion',exact:true}).click();
 assert.equal(await page.locator('.study-panel').count(),0);
 const beforeHandoff=await page.evaluate(()=>window.__lifecycle.sent.filter(e=>['response.cancel','output_audio_buffer.clear'].includes(e.type)).length);

 const responseCount=await page.evaluate(()=>window.__lifecycle.sent.filter(e=>e.type==='response.create').length);
 await page.evaluate(({other,otherTarget})=>window.__response('voice-play',[{type:'function_call',call_id:'voice-play',name:'play_section',arguments:JSON.stringify({page:other.id,passage:otherTarget.id,end:otherTarget.id})}],{spoken:true,finish:false}),{other,otherTarget});
 await page.waitForTimeout(150);assert.equal(await page.evaluate(()=>window.__audio[1].muted),false);assert.equal(await page.locator('[aria-label="Narration player"]').count(),0);
 await page.evaluate(()=>window.__emit({type:'output_audio_buffer.stopped',response_id:'voice-play'}));
 await page.waitForFunction(()=>window.__lifecycle.sent.some(e=>e.item?.call_id==='voice-play'));
 await page.waitForFunction(()=>window.__audio[0].src&&!window.__audio[0].paused);
 assert.equal(await page.evaluate(()=>window.__lifecycle.sent.filter(e=>e.type==='response.create').length),responseCount,'No voice follow-up over ElevenLabs');
 assert.equal(await page.evaluate(()=>window.__lifecycle.sent.filter(e=>['response.cancel','output_audio_buffer.clear'].includes(e.type)).length),beforeHandoff,'A completed handoff must not cancel or clear speech');
 assert.equal(await page.locator('.study-panel').count(),0,'Narration respects the minimized layout');
 assert.equal(await page.locator('.listening-caption').count(),0,'Captions are optional');
 await page.getByRole('button',{name:'Show captions',exact:true}).click();await page.locator('.listening-caption').waitFor();
 await page.getByRole('button',{name:'Show captions',exact:true}).click();
 assert.equal(await page.evaluate(()=>window.__lifecycle.trackEnabled),false,'Narrator cannot feed back into the microphone');
 assert.equal(await page.evaluate(()=>window.__lifecycle.stopped),0,'Keep the conversation connected');await page.screenshot({path:'qa/study-narration-handoff.png'});
 await page.evaluate(()=>{window.__audio[0].currentTime=1.2;window.__audio[0].dispatchEvent(new Event('timeupdate'))});
 await page.getByRole('button',{name:'Pause narration',exact:true}).click();
 for(const width of [1440,1100,901,800,390,320])for(const theme of ['light','dark']){
  await page.setViewportSize({width,height:900});await page.evaluate(theme=>document.documentElement.dataset.theme=theme,theme);
  const dock=await page.locator('.companion-dock').boundingBox();assert.ok(dock.x>=0&&dock.x+dock.width<=width+1,`${width}: compact player fits`);assert.ok(dock.height<110,'Minimized playback remains compact');
  if(width>900){assert.equal(dock.y,56,'Desktop controls live below the first navbar row');assert.equal(await page.evaluate(()=>getComputedStyle(document.querySelector('.page')).paddingTop),'108px','Reading reserves both navbar rows');const launch=await page.locator('.study-launcher').boundingBox();assert.ok(launch.y<56,'Ask and Listen are in the navbar');}
  for(const button of await page.locator('.companion-dock button').all()){const b=await button.boundingBox();assert.ok(b.x>=dock.x&&b.x+b.width<=dock.x+dock.width+1,`${width}: player control is inside the dock`);}
  await page.screenshot({path:`qa/companion-compact-${theme}-${width}.png`});
 }
 await page.setViewportSize({width:1440,height:1000});

 await page.getByRole('button',{name:'Ask about this reading',exact:true}).click();
 assert.equal(await page.evaluate(()=>window.__audio[0].paused),true);assert.equal(await page.evaluate(()=>window.__lifecycle.trackEnabled),true);
 const pausedTime=await page.evaluate(()=>window.__audio[0].currentTime);
 await say('What does the part I just heard mean?');
 await page.waitForFunction(()=>window.__lifecycle.sent.some(e=>e.type==='session.update'&&e.session.instructions?.includes('LISTENING HISTORY')));
 const state=await page.evaluate(()=>window.__lifecycle.sent.filter(e=>e.session?.instructions).at(-1).session.instructions);assert.ok(state.includes('"status":"paused"'));assert.ok(state.includes(otherTarget.id));
 await page.evaluate(()=>window.__response('voice-consult',[{type:'function_call',call_id:'voice-consult',name:'consult_text_tutor',arguments:JSON.stringify({question:'Explain this geometric idea.'})}]));
 await page.waitForFunction(()=>window.__lifecycle.sent.some(e=>e.item?.call_id==='voice-consult'));assert.ok(requests.some(r=>r.body?.messages?.some(m=>m.content?.includes('supplying the voice tutor'))&&r.body.model==='gpt-5.6-terra'));
 await page.evaluate(()=>window.__response('voice-resume',[{type:'function_call',call_id:'voice-resume',name:'control_narration',arguments:JSON.stringify({action:'resume'})}]));
 await page.waitForFunction(()=>window.__lifecycle.sent.some(e=>e.item?.call_id==='voice-resume'));assert.ok(await page.evaluate(()=>window.__audio[0].currentTime)>=pausedTime,'Resume the same audio position');
 // Holding the shortcut pauses the exact audio, opens the microphone only
 // after manual mode is acknowledged, then commits one question on release.
 const modifier=await page.evaluate(()=>/Mac|iPhone|iPad/.test(navigator.platform)?'Meta':'Control');
 await page.evaluate(()=>{window.__audio[0].currentTime=1.8;window.__audio[0].dispatchEvent(new Event('timeupdate'));});
 const requestsBeforeHold=await page.evaluate(()=>window.__lifecycle.sent.filter(e=>e.type==='response.create').length);
 await page.keyboard.down(modifier);await page.keyboard.down('Shift');await page.keyboard.down('Space');
 await page.waitForFunction(()=>window.__lifecycle.trackEnabled);
 assert.equal(await page.evaluate(()=>window.__audio[0].paused),true);
 const heldAt=await page.evaluate(()=>window.__audio[0].currentTime);assert.ok(Math.abs(heldAt-1.8)<.25);
 await page.waitForTimeout(140);assert.equal(await page.evaluate(()=>window.__lifecycle.sent.filter(e=>e.type==='response.create').length),requestsBeforeHold,'No answer while the talk key is held');
 await page.keyboard.up('Space');await page.keyboard.up('Shift');await page.keyboard.up(modifier);
 assert.equal(await page.evaluate(()=>window.__lifecycle.trackEnabled),false,'Release always closes the microphone');
 await page.waitForFunction(()=>!!window.__lastCommitted);
 await page.evaluate(()=>window.__emit({type:'conversation.item.input_audio_transcription.completed',item_id:window.__lastCommitted,transcript:'Explain what I just heard.'}));
 await page.waitForFunction(count=>window.__lifecycle.sent.filter(e=>e.type==='response.create').length>count,requestsBeforeHold);
 const heldContext=await page.evaluate(()=>window.__lifecycle.sent.filter(e=>e.session?.instructions).at(-1).session.instructions);
 assert.ok(Buffer.byteLength(heldContext)<64000,'Paused reading and live lab context fit a conservative Realtime data-channel message');
 const heldFocus=JSON.parse(heldContext.split('CURRENT READER STATE AND EXACT NEARBY SOURCE:\n')[1].split('\nLISTENING HISTORY')[0]);
 assert.equal(heldFocus.interruptedReading.passage.id,otherTarget.id,'The captured source follows the audio, not an old hovered passage');assert.equal(heldFocus.interruptedReading.playhead.passage,otherTarget.id);assert.equal(heldFocus.interruptedReading.playhead.seconds,heldAt);assert.equal(heldFocus.interruptedReading.playhead.status,'paused');
 // Losing window focus cannot leave the microphone hot or submit a fragment.
 const commitsBeforeBlur=await page.evaluate(()=>window.__lifecycle.sent.filter(e=>e.type==='input_audio_buffer.commit').length);
 await page.keyboard.down(modifier);await page.keyboard.down('Shift');await page.keyboard.down('Space');await page.waitForFunction(()=>window.__lifecycle.trackEnabled);
 await page.evaluate(()=>window.dispatchEvent(new Event('blur')));await page.keyboard.up('Space');await page.keyboard.up('Shift');await page.keyboard.up(modifier);
 assert.equal(await page.evaluate(()=>window.__lifecycle.trackEnabled),false);assert.equal(await page.evaluate(()=>window.__lifecycle.sent.filter(e=>e.type==='input_audio_buffer.commit').length),commitsBeforeBlur);
 await page.keyboard.down(modifier);await page.keyboard.down('Shift');await page.keyboard.down('Space');await page.waitForFunction(()=>window.__lifecycle.trackEnabled);await page.waitForTimeout(140);
 await page.keyboard.up('Space');await page.keyboard.up('Shift');await page.keyboard.up(modifier);
 const pttResponseCount=await page.evaluate(()=>window.__lifecycle.sent.filter(e=>e.type==='response.create').length);
 await page.evaluate(()=>window.__emit({type:'conversation.item.input_audio_transcription.completed',item_id:window.__lastCommitted,transcript:'Continue reading.'}));
 await page.waitForFunction(count=>window.__lifecycle.sent.filter(e=>e.type==='response.create').length>count,pttResponseCount);
 await page.evaluate(()=>window.__response('ptt-resume',[{type:'function_call',call_id:'ptt-resume',name:'control_narration',arguments:'{"action":"resume"}'}]));
 await page.waitForFunction(()=>window.__lifecycle.sent.some(e=>e.item?.call_id==='ptt-resume'));
 assert.ok(await page.evaluate(()=>window.__audio[0].currentTime)>=heldAt);assert.equal(await page.evaluate(()=>window.__audio[0].paused),false,'Voice can resume from the held position');
 await page.getByRole('button',{name:'Stop narration',exact:true}).click();
 assert.equal(await page.evaluate(()=>window.__lifecycle.trackEnabled),false,'Push-to-talk remains muted after stopping narration');
 await page.getByRole('button',{name:'Open voice conversation',exact:true}).click();
 await page.getByRole('button',{name:'Unmute',exact:true}).click();
 await say('Open chapter 12.');
 await page.evaluate(()=>window.__response('end-call-pending',[{type:'function_call',call_id:'end-call-pending',name:'show_chapter',arguments:'{"page":"chapter-12"}'}],{spoken:true,finish:false}));
 const beforeEndURL=page.url();
 await page.getByRole('button',{name:'End call',exact:true}).click();
 await page.evaluate(()=>window.__emit({type:'output_audio_buffer.stopped',response_id:'end-call-pending'}));
 await page.waitForTimeout(100);assert.equal(page.url(),beforeEndURL,'Ending a call discards pending navigation');assert.equal(await page.evaluate(()=>window.__lifecycle.stopped),1);assert.ok(await page.evaluate(()=>window.__lifecycle.closed)>0);
 assert.equal(await page.locator('.companion-dock').count(),0);
 // Releasing during a cold connection must never open the mic later.
 connectionDelay=300;await page.getByRole('button',{name:'Close study panel',exact:true}).click();
 await page.keyboard.down(modifier);await page.keyboard.down('Shift');await page.keyboard.down('Space');
 await page.waitForFunction(()=>document.querySelector('.voice-bar .player-title span')?.textContent==='Connecting…');
 await page.keyboard.up('Space');await page.keyboard.up('Shift');await page.keyboard.up(modifier);
 await page.waitForFunction(()=>document.querySelector('.voice-bar .player-title span')?.textContent==='Hold to ask');
 assert.equal(await page.evaluate(()=>window.__lifecycle.trackEnabled),false,'A released shortcut cannot enable the microphone after connection');connectionDelay=0;
 await page.keyboard.down(modifier);await page.keyboard.down('Shift');await page.keyboard.down('Space');await page.waitForFunction(()=>window.__lifecycle.trackEnabled);await page.waitForTimeout(140);
 await page.keyboard.up('Space');await page.keyboard.up('Shift');await page.keyboard.up(modifier);
 await page.evaluate(()=>window.__emit({type:'conversation.item.input_audio_transcription.completed',item_id:window.__lastCommitted,transcript:''}));
 await page.waitForFunction(()=>document.querySelector('.voice-bar .player-title span')?.textContent==='Hold to ask');

 await page.getByRole('button',{name:'Open voice conversation',exact:true}).click();await page.getByRole('button',{name:'End call',exact:true}).click();

 await page.getByRole('tab',{name:'Connections',exact:true}).click();
 await page.getByRole('button',{name:'Change voice shortcut',exact:true}).click();await page.keyboard.press('Alt+Shift+H');
 assert.equal(await page.evaluate(()=>JSON.parse(localStorage.getItem('gr-voice-shortcut')).code),'KeyH');
 assert.ok((await page.getByRole('button',{name:'Change voice shortcut',exact:true}).textContent()).includes('Alt + Shift + H'));
 await page.getByRole('button',{name:'Reset shortcut',exact:true}).click();
 // Keys can be removed and failures remain actionable without losing the book.
 await page.getByRole('tab',{name:'Connections',exact:true}).click();await page.getByLabel('Text tutor & spoken explanations').selectOption('gpt-5.6-sol');await page.getByRole('button',{name:'Save connections',exact:true}).click();
 await page.getByRole('tab',{name:'Ask',exact:true}).click();mode='unauthorized';await page.getByLabel('Ask a question',{exact:true}).fill('Help me');await page.getByRole('button',{name:'Send question',exact:true}).click();await page.getByRole('alert').filter({hasText:'rejected'}).waitFor();assert.ok(requests.some(r=>r.body?.model==='gpt-5.6-sol'));
 await page.getByRole('tab',{name:'Connections',exact:true}).click();await page.getByRole('button',{name:'Forget keys',exact:true}).click();assert.equal(await page.evaluate(()=>sessionStorage.getItem('gr-study-settings')),null);
 // Inspect both themes and mobile; the companion never creates page overflow.
 fs.mkdirSync('qa',{recursive:true});
 for(const width of [1440,390])for(const theme of ['light','dark']){
  await page.setViewportSize({width,height:900});await page.evaluate(theme=>document.documentElement.dataset.theme=theme,theme);
  for(const mode of ['Listen','Ask','Connections']){await page.getByRole('tab',{name:mode,exact:true}).click();await page.screenshot({path:`qa/study-${mode.toLowerCase()}-${theme}-${width}.png`});const box=await page.locator('.study-panel').boundingBox();assert.ok(box.x>=0&&box.x+box.width<=width+1);assert.ok(box.y>=56&&box.y+box.height<=900);}
 }
 assert.deepEqual(errors,[]);
 console.log('Verified narration coverage, BYOK storage, model selection, spoken rewriting, audio playback/cache, tutor tools, persistent navigation, Realtime playback ordering, interruption/call-end cancellation, navigation-only intent, microphone handoff, hold-to-talk capture/release/blur/cold-start, custom shortcuts, and navbar/compact/expanded layouts in both themes.');
}catch(error){await page.screenshot({path:'qa/study-failure.png'});console.error(await page.locator('.study-error,.dock-notice').allTextContents());throw error;}finally{await browser.close()}
