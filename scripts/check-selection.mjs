import fs from 'node:fs';
import assert from 'node:assert/strict';
import {chromium} from 'playwright';

const base=process.env.BOOK_URL||'http://localhost:4173/';
const chrome='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const browser=await chromium.launch({headless:true,...(fs.existsSync(chrome)?{executablePath:chrome}:{}),args:['--autoplay-policy=no-user-gesture-required','--enable-unsafe-swiftshader']});
const page=await browser.newPage({viewport:{width:1440,height:1000}});
const requests=[],errors=[];page.on('pageerror',e=>errors.push(e.message));
const samples=24000*4,wav=Buffer.alloc(44+samples*2);wav.write('RIFF');wav.writeUInt32LE(wav.length-8,4);wav.write('WAVEfmt ',8);wav.writeUInt32LE(16,16);wav.writeUInt16LE(1,20);wav.writeUInt16LE(1,22);wav.writeUInt32LE(24000,24);wav.writeUInt32LE(48000,28);wav.writeUInt16LE(2,32);wav.writeUInt16LE(16,34);wav.write('data',36);wav.writeUInt32LE(samples*2,40);
await page.addInitScript(()=>{
 sessionStorage.setItem('gr-study-settings',JSON.stringify({openaiKey:'sk-selection-test',elevenKey:'selection-test',voiceId:'selection-test',model:'gpt-5.6-terra',ttsModel:'eleven_flash_v2_5'}));
});
await page.route('https://api.openai.com/**',route=>{
 requests.push({provider:'openai',body:route.request().postDataJSON()});
 return route.fulfill({json:{choices:[{finish_reason:'stop',message:{role:'assistant',content:'This is the explanation of your selected excerpt.'}}]}});
});
await page.route('https://api.elevenlabs.io/**',route=>{
 const body=route.request().postDataJSON();requests.push({provider:'eleven',body});
 const characters=Array.from(body.text);
 return route.fulfill({json:{audio_base64:wav.toString('base64'),alignment:{characters,character_start_times_seconds:characters.map((_,i)=>i*4/characters.length),character_end_times_seconds:characters.map((_,i)=>(i+1)*4/characters.length)}}});
});

async function excerpt({repeat=false,multi=false}={}){
 // Use real course prose and native Ranges, including a repeated word whose
 // selected occurrence must survive the handoff to the narrator.
 const value=await page.evaluate(({repeat,multi})=>{
  const paragraphs=[...document.querySelectorAll('#main p[data-passage]')].filter(p=>!p.closest('.spacetime-lab')&&!p.querySelector('.katex'));
  for(const paragraph of paragraphs){
   const walker=document.createTreeWalker(paragraph,NodeFilter.SHOW_TEXT);let node;
   while((node=walker.nextNode())){
    if(node.parentElement.closest('[hidden],button')||node.textContent.length<65)continue;
    const words=[...node.textContent.matchAll(/\b[A-Za-z]+\b/g)];if(words.length<10)continue;
    let start,end;
    if(repeat){const prior=new Map();const duplicate=words.find(w=>{if(prior.has(w[0].toLowerCase()))return true;prior.set(w[0].toLowerCase(),true)});if(!duplicate)continue;start=duplicate.index;end=start+duplicate[0].length;}
    else{start=words[2].index;end=multi?words.at(-1).index+words.at(-1)[0].length:words[7].index+words[7][0].length;}
    paragraph.scrollIntoView({behavior:'instant',block:'center'});
    window.__selectionTarget={node,start,end,id:paragraph.id};return {text:node.textContent.slice(start,end),start,end,id:paragraph.id};
   }
  }
  throw Error('No suitable source prose found');
 },{repeat,multi});
 await page.waitForTimeout(60);
 await page.evaluate(()=>{const {node,start,end}=window.__selectionTarget;const range=new Range();range.setStart(node,start);range.setEnd(node,end);const selection=getSelection();selection.removeAllRanges();selection.addRange(range)});
 await page.locator('.selection-study').waitFor();return value;
}
async function absent(){await page.waitForFunction(()=>!document.querySelector('.selection-study'))}

try{
 await page.goto(new URL('chapter-4.html',base).href);await page.locator('.study-launcher').waitFor();
 await page.waitForFunction(()=>document.body.dataset.readingReady==='true');
 await excerpt();
 let position=await page.evaluate(()=>{const p=document.querySelector('.selection-study').getBoundingClientRect(),s=getSelection().getRangeAt(0).getClientRects()[0];return {top:p.top,bottom:p.bottom,left:p.left,right:p.right,sourceTop:s.top,sourceBottom:s.bottom}});
 assert.ok(position.bottom<=position.sourceTop&&position.sourceTop-position.bottom<20,'toolbar is adjacent to the selected line');
 assert.equal(await page.locator('.selection-study button').count(),2,'no permanent close control or duplicate labels');
 await page.evaluate(()=>getSelection().removeAllRanges());await absent();
 await excerpt();await page.mouse.click(1100,970);await absent();
 await excerpt();await page.keyboard.press('Escape');await absent();
 await excerpt();await page.evaluate(()=>scrollBy(0,25));await absent();
 const chosen=await excerpt();await page.getByRole('button',{name:'Explain selected text',exact:true}).click();
 await page.waitForFunction(()=>document.querySelector('.chat-message.assistant'));
 const request=requests.find(r=>r.provider==='openai').body;
 assert.ok(request.messages[0].content.includes(JSON.stringify(chosen.text)),'explanation retains exactly the selected excerpt');
 assert.ok(!request.messages.at(-1).content.startsWith('Explain this text step by step'),'does not replace selection with full paragraph');
 await absent();await page.getByRole('button',{name:'Close study panel',exact:true}).click();await absent();
 // A rendered equation has duplicate MathML/HTML trees; its selected source
 // must reach the tutor exactly once as LaTeX, with no toolbar labels.
 const equation=page.locator('#main .equation:visible').first();await equation.scrollIntoViewIfNeeded();await page.waitForTimeout(100);
 const latex=await equation.evaluate(el=>{const r=new Range();r.selectNodeContents(el);const s=getSelection();s.removeAllRanges();s.addRange(r);return el.querySelector('annotation').textContent});
 await page.locator('.selection-study').waitFor();await page.getByRole('button',{name:'Explain selected text',exact:true}).click();
 await page.waitForFunction(()=>document.querySelectorAll('.chat-message.assistant').length===2);
 const equationPrompt=requests.filter(r=>r.provider==='openai').at(-1).body.messages[0].content;
 const focus=JSON.parse(equationPrompt.split('CURRENT READER STATE AND EXACT NEARBY SOURCE:\n')[1].split('\nLISTENING HISTORY')[0]);
 assert.equal(focus.selection,`$${latex}$`,'typeset equation selection is one semantic LaTeX source');
 await page.getByRole('button',{name:'Close study panel',exact:true}).click();

 const listened=await excerpt({repeat:true});
 await page.getByRole('button',{name:'Listen to selected text',exact:true}).click();
 await page.waitForFunction(()=>CSS.highlights?.get('spoken-word')?.size>0);
 assert.equal(requests.filter(r=>r.provider==='eleven').at(-1).body.text,listened.text,'ElevenLabs reads only the selected words');
 const highlighted=await page.evaluate(()=>{const r=[...CSS.highlights.get('spoken-word')][0];return {text:r.toString(),start:r.startOffset,node:r.startContainer===window.__selectionTarget.node}});
 assert.equal(highlighted.text,listened.text);assert.equal(highlighted.start,listened.start);assert.ok(highlighted.node,'highlight follows selected occurrence, not an earlier repeated word');
 await page.getByRole('button',{name:'Stop narration',exact:true}).click();await page.getByRole('button',{name:'Close study panel',exact:true}).click();await page.waitForTimeout(100);assert.equal(await page.locator('.listening-bar').count(),0,'stopping pending playback cannot reopen a paused player');

 for(const width of [390,768,1440])for(const theme of ['light','dark']){
  await page.setViewportSize({width,height:900});await page.evaluate(t=>document.documentElement.dataset.theme=t,theme);
  await excerpt({multi:true});
  position=await page.locator('.selection-study').boundingBox();
  if(width<=600){assert.ok((await page.locator('.study-launcher').boundingBox()).width<=94);assert.ok(await page.getByRole('button',{name:'Listen',exact:true}).isVisible());assert.ok(await page.getByRole('button',{name:'Ask',exact:true}).isVisible());}
  assert.ok(position.x>=10&&position.x+position.width<=width-10,`${width}/${theme}: horizontal fit`);
  assert.ok(position.y>=0&&position.y+position.height<=900,`${width}/${theme}: vertical fit`);
  await page.screenshot({path:`qa/selection-${width}-${theme}.png`,animations:'disabled'});
  await page.keyboard.press('Escape');await absent();
 }
 // The shared figure toolbar must explain/read the selected view, not a
 // three-dimensional scene hidden behind the diagram.
 await page.goto(new URL('chapter-2.html',base).href);await page.locator('.study-launcher').waitFor();await page.waitForFunction(()=>document.body.dataset.readingReady==='true');
 const scene=page.locator('[data-scene="covector"]');await scene.scrollIntoViewIfNeeded();
 await scene.locator('[data-scene-mode="diagram"]').click();
 const diagram=await page.evaluate(()=>JSON.parse(document.querySelector('#reading-data').textContent).segments.find(s=>s.id==='scene-covector-stage').views.diagram);
 await scene.locator('.scene-actions [data-study-action="explain"]').click();await page.locator('.chat-message.assistant').waitFor();
 const diagramContext=requests.filter(r=>r.provider==='openai').at(-1).body.messages[0].content;
 const diagramFocus=JSON.parse(diagramContext.split('CURRENT READER STATE AND EXACT NEARBY SOURCE:\n')[1].split('\nLISTENING HISTORY')[0]);
 assert.equal(diagramFocus.selection,diagram.text);assert.equal(diagramFocus.passage.kind,'figure');assert.deepEqual(diagramFocus.passage.latex,diagram.latex);
 await page.getByRole('button',{name:'Close study panel',exact:true}).click();
 const beforeDiagram=requests.filter(r=>r.provider==='openai').length;
 await scene.locator('.scene-actions [data-study-action="listen"]').click();await page.waitForFunction(()=>document.querySelector('.reading-now .study-eyebrow')?.textContent==='NOW READING');
 assert.ok(requests.filter(r=>r.provider==='openai').length>beforeDiagram);
 let narrationRequest=requests.filter(r=>r.provider==='openai').at(-1).body;
 assert.equal(JSON.parse(narrationRequest.messages.at(-1).content).source,diagram.text,'diagram narration uses diagram content');
 await page.getByRole('button',{name:'Stop narration',exact:true}).click();await page.getByRole('button',{name:'Close study panel',exact:true}).click();
 await scene.locator('[data-scene-mode="3d"]').click();
 const before3D=requests.filter(r=>r.provider==='openai').length;
 await scene.locator('.scene-actions [data-study-action="listen"]').click();await page.waitForFunction(()=>document.querySelector('.reading-now .study-eyebrow')?.textContent==='NOW READING');
 assert.ok(requests.filter(r=>r.provider==='openai').length>before3D,'3D and diagram use separate narration caches');
 narrationRequest=requests.filter(r=>r.provider==='openai').at(-1).body;
 assert.notEqual(JSON.parse(narrationRequest.messages.at(-1).content).source,diagram.text);
 await page.getByRole('button',{name:'Stop narration',exact:true}).click();await page.getByRole('button',{name:'Close study panel',exact:true}).click();
 await scene.locator('[data-scene-mode="diagram"]').click();
 const chapterCount=await page.evaluate(()=>JSON.parse(document.querySelector('#reading-data').textContent).segments.filter(s=>{const el=document.getElementById(s.id);if(!el||s.noNarration||el.closest('[hidden],[data-no-narration]'))return false;return !(el?.closest('.scene-equation,.scene-note,.scene-explanation')&&el.closest('[data-scene]')?.dataset.activeView==='diagram')}).length);
 await page.locator('[data-study-action="chapter"]').click();await page.waitForFunction(()=>document.querySelector('.reading-now .study-eyebrow')?.textContent==='NOW READING');
 assert.ok((await page.locator('.player-title small').textContent()).includes(`of ${chapterCount} ·`),'chapter queue omits hidden 3D equations and notes');
 assert.deepEqual(errors,[]);
 console.log('Verified selection placement, native collapse/outside/scroll/Escape dismissal, exact tutor and narration excerpts, repeated-word highlight, six responsive theme states, and separate diagram/3D narration sources.');
}finally{await browser.close()}
