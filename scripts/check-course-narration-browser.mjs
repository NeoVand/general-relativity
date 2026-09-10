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
const ready=()=>page.waitForFunction(()=>document.querySelector('.companion-dock')?.dataset.playback==='playing');
async function close(){const button=page.getByRole('button',{name:/^(Close study panel|Minimize study companion)$/});if(await button.count())await button.click();}
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
 // Optional proofs are available to the tutor without losing their setup or
 // silently joining continuous playback. Test catalog retrieval, then the
 // actual equation buttons (including keyboard activation) on the live page.
 const proofPage=JSON.parse(fs.readFileSync('site/reading-index.json','utf8')).find(p=>p.id==='chapter-17');
 const proof=proofPage.segments.find(s=>s.supplement&&s.kind==='equation'&&s.latex.some(t=>t.includes('R_{tr}=')));
 assert(proof,'the spherical time-dependence calculation is indexed');
 const proofIds=proofPage.segments.filter(s=>s.supplement===proof.supplement).map(s=>s.id);
 result=await askTool('read_passage',{page:proofPage.id,passage:proof.id});
 assert(result.passages.length>1&&result.passages.every(s=>proofIds.includes(s.id)&&s.visibility==='reference'));
 assert(result.passages.some(s=>s.text.includes('areal radius')),'off-page retrieval includes the chart assumptions');
 await close();await page.goto(new URL('chapter-17.html',base).href);await page.waitForFunction(()=>document.body.dataset.readingReady==='true');
 const proofElement=page.locator(`[data-reading-supplement="${proof.supplement}"]`);
 result=await askTool('read_passage',{page:proofPage.id,passage:proof.id});
 assert(result.passages.every(s=>proofIds.includes(s.id)));
 assert.equal(await proofElement.evaluate(el=>el.open),false,'source retrieval leaves the optional proof closed');
 await askTool('play_section',{page:proofPage.id,passage:proof.id},{play:true});
 assert.equal(await proofElement.evaluate(el=>el.open),true,'explicit narration reveals its optional proof');
 assert(narratorRequests().at(-1).context.includes('areal radius'),'tutor-requested equation playback retains the proof setup');
 assert((await page.locator('.player-title small').textContent()).includes('of 1 ·'));await stop();
 await page.locator(`#${proof.id} [data-study-action="listen"]`).click();await ready();
 assert(narratorRequests().at(-1).context.includes('areal radius'),'equation narration retains the proof setup');
 assert((await page.locator('.player-title small').textContent()).includes('of 1 ·'));await stop();
 const beforeExplain=requests.length,explain=page.locator(`#${proof.id} [data-study-action="explain"]`);
 await explain.focus();await explain.press('Enter');await page.getByRole('button',{name:'Send question',exact:true}).waitFor();
 const explanation=requests.slice(beforeExplain).find(r=>r.provider==='openai'&&r.body.tools);
 assert(explanation,'the equation Explain button sends a tutor request');
 const instructions=explanation.body.messages.find(m=>m.role==='system').content;
 const focus=JSON.parse(instructions.split('CURRENT READER STATE AND EXACT NEARBY SOURCE:\n')[1].split('\nLISTENING HISTORY')[0]);
 assert.equal(focus.passage.id,proof.id);
 assert(focus.nearby.length>1&&focus.nearby.every(s=>proofIds.includes(s.id)),'Explain receives the same proof, not the chapter opening');
 assert(focus.nearby.some(s=>s.text.includes('areal radius')));
 // Each integrated experiment is one listening unit. Its current parameters,
 // not its hidden reference diagram or every control label, inform the narrator.
 for(const [chapter,id,control] of [[4,'manifold-chart-experience','[data-gx-chart="b"]'],[8,'curvature-pair-explorer','[data-cx-phase="2"]'],[9,'curvature-cloud-explorer','[data-cx-mode="isotropic"]'],[16,'orbital-precession-experience','[data-gx-scale="1"]']]){
  await close();await page.goto(new URL(`chapter-${chapter}.html`,base).href);await page.waitForFunction(id=>!!document.getElementById(id)?.dataset.narrationSource,id);
  const model=page.locator('#'+id);await model.scrollIntoViewIfNeeded();
  const before=await model.getAttribute('data-narration-source');await model.locator(control).click();
  const after=await model.getAttribute('data-narration-source');assert.notEqual(after,before,'Changing the experiment updates the spoken source');
  const items=await page.evaluate(id=>{const model=document.getElementById(id);return JSON.parse(document.querySelector('#reading-data').textContent).segments.filter(s=>model.contains(document.getElementById(s.id)))},id);
  assert.equal(items.length,1,'An experiment does not repeat its equations, controls, and reference as separate narration');
  const focus=await askTool('get_reader_focus',{});
  const experiment=focus.course.experiments.find(e=>e.id===id);
  assert(experiment,`${id}: the tutor sees the visible experiment`);
  assert.equal(experiment.description,after,'Tutor and narrator share the live model description');
  assert(experiment.controls.length>0&&experiment.teaching.length>0,'Tutor receives available controls and what to notice');
  await close();
  await model.locator('[data-study-action="listen"]').click();await ready();assert.equal(narratorRequests().at(-1).source,after,'The narrator receives the current mathematical model');await stop();
 }
 assert.deepEqual(errors,[]);
 console.log('Verified live and off-page source neighborhoods, optional-proof Listen/Explain context, narration cache changes, bounded bridge playback, explicit exercise ranges, hidden-panel reveal, and chapter practice exclusion with mocked providers.');
}finally{await browser.close()}
