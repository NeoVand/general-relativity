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
let mode='normal',turn=0,delay=0;
const speech='Proper time is the elapsed time recorded by the clock that follows this path. Add the small time increments along the path, weighted by the clock rate. The result depends on the path, not just its endpoints.';
const samples=24000*4,wav=Buffer.alloc(44+samples*2);wav.write('RIFF');wav.writeUInt32LE(wav.length-8,4);wav.write('WAVEfmt ',8);wav.writeUInt32LE(16,16);wav.writeUInt16LE(1,20);wav.writeUInt16LE(1,22);wav.writeUInt32LE(24000,24);wav.writeUInt32LE(48000,28);wav.writeUInt16LE(2,32);wav.writeUInt16LE(16,34);wav.write('data',36);wav.writeUInt32LE(samples*2,40);
await page.route('https://api.openai.com/**',async route=>{
 const req=route.request(),body=req.url().includes('/realtime/calls')?req.postData():req.postDataJSON();requests.push({url:req.url(),body});
 if(req.url().includes('client_secrets'))return route.fulfill({json:{value:'ephemeral-test-secret'}});
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
 await route.fulfill({contentType:'audio/wav',body:wav});
});
await page.addInitScript(()=>{
 const NativeAudio=window.Audio;window.__audio=[];window.Audio=function(...args){const audio=new NativeAudio(...args);window.__audio.push(audio);return audio};
 window.__lifecycle={stopped:0,closed:0,sent:[],trackEnabled:true};
 const track={kind:'audio',stop(){window.__lifecycle.stopped++},get enabled(){return window.__lifecycle.trackEnabled},set enabled(v){window.__lifecycle.trackEnabled=v}};
 Object.defineProperty(navigator.mediaDevices,'getUserMedia',{value:async()=>({getTracks:()=>[track],getAudioTracks:()=>[track]})});
 class MockPeer{
  connectionState='connected';addTrack(){}addTransceiver(){}
  createDataChannel(){const channel={readyState:'connecting',send(e){window.__lifecycle.sent.push(JSON.parse(e))},close(){this.readyState='closed'}};this.channel=channel;window.__channel=channel;return channel}
  async createOffer(){return {sdp:'mock-sdp-offer'}}async setLocalDescription(){}
  async setRemoteDescription(){setTimeout(()=>{this.channel.readyState='open';this.channel.onopen?.()},1)}
  close(){window.__lifecycle.closed++}
 }
 window.RTCPeerConnection=MockPeer;
 window.__emit=event=>window.__channel.onmessage({data:JSON.stringify(event)});
});
try{
 const home=parseHTML(fs.readFileSync('site/index.html','utf8')).document;
 for(const chapter of [11,12])assert.ok(home.querySelector(`.chapter-card[href="chapter-${chapter}.html"] .math-geometry`));
 assert.ok(home.querySelector('.chapter-card[href="chapter-13.html"] .math-curvature'));
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
 await page.locator('.equation [data-study-action="listen"]').first().click();
 await page.waitForFunction(()=>document.querySelector('.listening-bar')&&document.querySelector('.reading-now .study-eyebrow')?.textContent==='NOW READING');
 assert.ok(requests.some(r=>r.body?.model==='gpt-5.6-terra'&&r.body.reasoning_effort==='none'));
 const tts=requests.find(r=>r.url.includes('text-to-speech'));assert.equal(tts.body.text,speech);assert.equal(tts.body.model_id,'eleven_flash_v2_5');
 await page.getByRole('button',{name:'Pause narration',exact:true}).click();await page.getByRole('button',{name:'Resume narration',exact:true}).waitFor();
 await page.getByRole('button',{name:'Show spoken explanation',exact:true}).click();assert.equal(await page.getByLabel('Spoken explanation',{exact:true}).inputValue(),speech);
 await page.getByRole('button',{name:'Stop narration',exact:true}).click();
 const before=requests.length;
 await page.getByRole('button',{name:'Close study panel',exact:true}).click();
 await page.locator('.equation [data-study-action="listen"]').first().click();await page.waitForFunction(()=>document.querySelector('.reading-now .study-eyebrow')?.textContent==='NOW READING');assert.equal(requests.length,before,'script and audio cache prevent repeat billing');
 await page.getByRole('button',{name:'Stop narration',exact:true}).click();
 // Continuous chapter narration advances on audio completion and supports skipping.
 await page.getByRole('button',{name:'Listen to this chapter',exact:true}).click();
 await page.waitForFunction(()=>document.querySelector('.reading-now .study-eyebrow')?.textContent==='NOW READING');
 await page.evaluate(()=>window.__audio[0].dispatchEvent(new Event('ended')));
 await page.waitForFunction(()=>document.querySelector('.player-title small')?.textContent.startsWith('Passage 2 '));
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
 const secret=requests.find(r=>r.url.includes('client_secrets'));assert.equal(secret.body.session.model,'gpt-realtime-2.1');assert.equal(secret.body.session.tools.length,4);
 await page.getByRole('button',{name:'Mute',exact:true}).click();assert.equal(await page.evaluate(()=>window.__lifecycle.trackEnabled),false);
 await page.getByRole('button',{name:'Unmute',exact:true}).click();
 const other=index.find(p=>p.id==='chapter-8'),otherTarget=other.segments.find(s=>s.kind==='visualization');
 await page.evaluate(({other,otherTarget})=>window.__emit({type:'response.done',response:{status:'completed',output:[{type:'function_call',call_id:'voice-show',name:'show_passage',arguments:JSON.stringify({page:other.id,passage:otherTarget.id})}]}}),{other,otherTarget});
 await page.waitForURL('**/chapter-8.html#'+otherTarget.id);await page.waitForFunction(()=>window.__lifecycle.sent.some(e=>e.item?.call_id==='voice-show'));
 assert.equal(await page.getByRole('button',{name:'End call',exact:true}).count(),1);assert.equal(await page.evaluate(()=>window.__lifecycle.stopped),0);
 await page.getByRole('button',{name:'End call',exact:true}).click();assert.equal(await page.evaluate(()=>window.__lifecycle.stopped),1);assert.ok(await page.evaluate(()=>window.__lifecycle.closed)>0);
 // Keys can be removed and failures remain actionable without losing the book.
 await page.getByRole('tab',{name:'Connections',exact:true}).click();await page.getByLabel('Text tutor & spoken explanations').selectOption('gpt-5.6-sol');await page.getByRole('button',{name:'Save connections',exact:true}).click();
 await page.getByRole('tab',{name:'Ask',exact:true}).click();mode='unauthorized';await page.getByLabel('Ask a question',{exact:true}).fill('Help me');await page.getByRole('button',{name:'Send question',exact:true}).click();await page.getByRole('alert').filter({hasText:'rejected'}).waitFor();assert.ok(requests.some(r=>r.body?.model==='gpt-5.6-sol'));
 await page.getByRole('tab',{name:'Connections',exact:true}).click();await page.getByRole('button',{name:'Forget keys',exact:true}).click();assert.equal(await page.evaluate(()=>sessionStorage.getItem('gr-study-settings')),null);
 // Inspect both themes and mobile; the companion never creates page overflow.
 fs.mkdirSync('qa',{recursive:true});
 for(const width of [1440,390])for(const theme of ['light','dark']){
  await page.setViewportSize({width,height:900});await page.evaluate(theme=>document.documentElement.dataset.theme=theme,theme);
  for(const mode of ['Listen','Ask','Connections']){await page.getByRole('tab',{name:mode,exact:true}).click();await page.screenshot({path:`qa/study-${mode.toLowerCase()}-${theme}-${width}.png`});const box=await page.locator('.study-panel').boundingBox();assert.ok(box.x>=0&&box.x+box.width<=width+1);assert.ok(box.y>=75&&box.y+box.height<=900);}
 }
 assert.deepEqual(errors,[]);
 console.log('Verified narration coverage, BYOK storage, model selection, spoken rewriting, audio playback/cache, tutor tools, persistent navigation, Realtime lifecycle, and 12 visual states.');
}finally{await browser.close()}
