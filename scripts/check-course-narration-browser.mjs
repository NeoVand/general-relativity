import fs from 'node:fs';
import assert from 'node:assert/strict';
import {chromium} from 'playwright';

const base=process.env.BOOK_URL||'http://localhost:4173/';
const chrome='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const browser=await chromium.launch({headless:true,...(fs.existsSync(chrome)?{executablePath:chrome}:{}),args:['--autoplay-policy=no-user-gesture-required','--enable-unsafe-swiftshader']});
const page=await browser.newPage({viewport:{width:1440,height:1000}});
const requests=[],errors=[];let command,serial=0;
page.on('pageerror',error=>errors.push(error.message));
const samples=24000*8,wav=Buffer.alloc(44+samples*2);wav.write('RIFF');wav.writeUInt32LE(wav.length-8,4);wav.write('WAVEfmt ',8);wav.writeUInt32LE(16,16);wav.writeUInt16LE(1,20);wav.writeUInt16LE(1,22);wav.writeUInt32LE(24000,24);wav.writeUInt32LE(48000,28);wav.writeUInt16LE(2,32);wav.writeUInt16LE(16,34);wav.write('data',36);wav.writeUInt32LE(samples*2,40);
await page.addInitScript(()=>sessionStorage.setItem('gr-study-settings',JSON.stringify({openaiKey:'sk-course-test',elevenKey:'course-test',voiceId:'course-test',model:'gpt-5.6-terra',ttsModel:'eleven_flash_v2_5'})));
await page.route('https://api.openai.com/**',route=>{
 const body=route.request().postDataJSON();requests.push({provider:'openai',body});
 let message={role:'assistant',content:'The current coordinate map describes the same smooth sphere.'};
 if(body.tools&&command){const current=command;command=null;message={role:'assistant',content:null,tool_calls:[{id:`course-tool-${++serial}`,type:'function',function:{name:current.name,arguments:JSON.stringify(current.args)}}]};}
 return route.fulfill({json:{choices:[{finish_reason:'stop',message}]}});
});
await page.route('https://api.elevenlabs.io/**',route=>{
 const body=route.request().postDataJSON();requests.push({provider:'eleven',body});const characters=Array.from(body.text);
 return route.fulfill({json:{audio_base64:wav.toString('base64'),alignment:{characters,character_start_times_seconds:characters.map((_,i)=>i*8/characters.length),character_end_times_seconds:characters.map((_,i)=>(i+1)*8/characters.length)}}});
});
const ready=()=>page.waitForFunction(()=>document.querySelector('.reading-now .study-eyebrow')?.textContent==='NOW READING');
async function close(){const button=page.getByRole('button',{name:'Close study panel',exact:true});if(await button.count())await button.click();}
async function stop(){const button=page.getByRole('button',{name:'Stop narration',exact:true});if(await button.count())await button.click();await close();}
async function askTool(name,args,{play=false}={}){
 await page.getByRole('button',{name:'Ask',exact:true}).click();command={name,args};
 const before=requests.length;
 await page.getByLabel('Ask a question',{exact:true}).fill(`Run the requested book action ${serial+1}.`);await page.getByRole('button',{name:'Send question',exact:true}).click();
 if(play){await ready();return;}
 await page.getByRole('button',{name:'Send question',exact:true}).waitFor();
 const result=requests.slice(before).flatMap(r=>r.body.messages||[]).filter(m=>m.role==='tool').at(-1);
 assert(result,'the tutor received a tool result');return JSON.parse(result.content);
}
function narratorRequests(){return requests.filter(r=>r.provider==='openai'&&!r.body.tools).map(r=>JSON.parse(r.body.messages.at(-1).content));}
try{
 await page.goto(new URL('chapter-4.html',base).href);await page.locator('.study-launcher').waitFor();await page.waitForFunction(()=>document.body.dataset.readingReady==='true'&&document.querySelector('.visual-lesson svg'));
 const data=await page.evaluate(()=>JSON.parse(document.querySelector('#reading-data').textContent));
 const lesson='two-maps-one-sphere',items=data.segments.filter(s=>s.lesson===lesson),visual=items.find(s=>s.kind==='visualization'),formal=items.find(s=>s.depth==='formal'),practice=items.find(s=>s.noNarration&&s.kind==='text'&&s.text.length>50);
 assert(visual&&formal&&practice);
 const visibleIds=await page.evaluate(()=>JSON.parse(document.querySelector('#reading-data').textContent).segments.filter(s=>{const el=document.getElementById(s.id);return el&&!s.noNarration&&!el.closest('[hidden],[data-no-narration]')}).map(s=>s.id));
 let result=await askTool('read_passage',{page:data.id,passage:visual.id});assert(result.passages.every(s=>visibleIds.includes(s.id)&&s.visibility==='visible'));
 result=await askTool('read_passage',{page:data.id,passage:formal.id});assert(result.passages.every(s=>s.lesson===lesson&&s.depth==='formal'&&s.visibility==='hidden'));
 assert(await page.locator(`#${lesson}-formal`).evaluate(el=>el.hidden),'retrieving a hidden source does not change the reader’s chosen depth');
 await close();
 const visualElement=page.locator('#'+visual.id);await visualElement.scrollIntoViewIfNeeded();await visualElement.locator('[data-study-action="listen"]').click();await ready();
 const initial=narratorRequests().at(-1);assert.equal(initial.mode,'standalone');assert(initial.context.includes('chart'));assert(!initial.context.includes(formal.text));assert(!initial.source.includes('Why this step works'));assert(!initial.source.includes('Listen to this visualization'));await stop();
 await page.locator(`#${lesson}-tab-derive`).click();await visualElement.locator('[data-study-action="listen"]').click();await ready();
 const derived=narratorRequests().at(-1);assert.notEqual(derived.context,initial.context,'changing depth changes narration context and cache identity');assert(!derived.context.includes(formal.text));await stop();
 // The h4 bridge title is an exact, bounded playback target.
 const title=items.find(s=>s.kind==='heading');
 await askTool('play_section',{page:data.id,passage:title.id},{play:true});
 const expected=await page.evaluate(id=>JSON.parse(document.querySelector('#reading-data').textContent).segments.filter(s=>{const el=document.getElementById(s.id);return s.lesson===id&&!s.noNarration&&el&&!el.closest('[hidden],[data-no-narration]')}).length,lesson);
 assert((await page.locator('.player-title small').textContent()).includes(`of ${expected} ·`),'bridge reading ends before the original section exposition');await stop();
 // An explicit practice passage is allowed, but does not pull in its solution.
 await askTool('play_section',{page:data.id,passage:practice.id},{play:true});
 assert((await page.locator('.player-title small').textContent()).includes('of 1 ·'));assert(await page.locator(`#${lesson} .lesson-practice`).evaluate(el=>el.open));await stop();
 const end=items.find(s=>s.index>practice.index&&s.noNarration);
 await askTool('play_section',{page:data.id,passage:practice.id,end:end.id},{play:true});
 assert((await page.locator('.player-title small').textContent()).includes(`of ${end.index-practice.index+1} ·`),'explicit exercise range honors its inclusive bound');await stop();
 // A hidden derivation/formal passage requested by the tutor reveals that panel.
 await askTool('play_section',{page:data.id,passage:formal.id,end:formal.id},{play:true});
 assert.equal(await page.locator(`#${lesson}-formal`).evaluate(el=>el.hidden),false);await stop();
 await page.locator('[data-study-action="chapter"]').click();await ready();
 const chapterCount=await page.evaluate(()=>JSON.parse(document.querySelector('#reading-data').textContent).segments.filter(s=>{const el=document.getElementById(s.id);return el&&!s.noNarration&&!el.closest('[hidden],[data-no-narration]')&&!(el.closest('.scene-equation,.scene-note,.scene-explanation')&&el.closest('[data-scene]')?.dataset.activeView==='diagram')}).length);
 assert((await page.locator('.player-title small').textContent()).includes(`of ${chapterCount} ·`),'continuous chapter listening still excludes practice and inactive depths');await stop();
 const other=JSON.parse(fs.readFileSync('site/reading-index.json','utf8')).find(p=>p.id==='chapter-16'),offpage=other.segments.find(s=>s.depth==='formal');
 result=await askTool('read_passage',{page:other.id,passage:offpage.id});assert(result.passages.every(s=>s.lesson===offpage.lesson&&s.depth==='formal'&&s.visibility==='reference'));
 result=await askTool('play_section',{page:data.id,passage:practice.id,end:title.id});assert(result.error?.includes('end'));
 assert.deepEqual(errors,[]);
 console.log('Verified live source neighborhoods, hidden/off-page depth retrieval, narration context cache changes, bounded bridge playback, explicit exercise ranges, hidden-panel reveal, and chapter practice exclusion with mocked providers.');
}finally{await browser.close()}
