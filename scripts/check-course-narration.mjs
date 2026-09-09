import fs from 'node:fs';
import assert from 'node:assert/strict';
import {parseHTML} from 'linkedom';
import {extractPassageText,withNarrationContext,isReadingVisible,readingNeighborhood,explicitNarrationRange} from '../src/lib/reading-context.js';

const {document}=parseHTML(`<main><section data-lesson="example"><h4 id="title">A bridge</h4><div class="lesson-panel" data-depth="intuition"><p id="intuition">An intuitive introduction.</p></div><div class="lesson-panel" data-depth="derive" hidden><ol><li id="derive"><div class="step-number">01</div><div><strong>Build a map</strong><p>Write the point.</p><p class="step-reason"><span>Why this step works</span> The maps agree.</p></div></li></ol></div><div class="lesson-panel" data-depth="formal" hidden><p id="formal">A deeper theorem.</p></div><div id="visual">The live model.</div><details data-no-narration><summary id="practice">Test the idea</summary><p id="solution">A hidden answer.</p></details><p id="takeaway">Keep the measurement.</p></section></main>`);
const segments=['title','intuition','derive','formal','visual','practice','solution','takeaway'].map((id,index)=>({id,index,text:document.getElementById(id).textContent,hash:`source-${id}`,latex:[],lesson:'example',depth:['intuition','derive','formal'].includes(id)?id:undefined,noNarration:['practice','solution'].includes(id)}));
assert.equal(extractPassageText(document.getElementById('derive')),'Build a map Write the point. The maps agree.','block boundaries separate step title/body and decorative labels are absent');
const visible=segments.filter(s=>isReadingVisible(s,document));
assert.deepEqual(visible.map(s=>s.id),['title','intuition','visual','takeaway']);
const queue=withNarrationContext(visible.map(s=>s.id==='visual'?{...s,text:'The selected diagram.',narration:'An authored script.'}:s));
const scene=queue.find(s=>s.id==='visual');
assert(!scene.context.includes('deeper theorem'));assert(!scene.context.includes('hidden answer'));assert(!scene.context.includes('Test the idea'));
assert(scene.before.includes('intuitive introduction'));assert.equal(scene.narration,'An authored script.');assert.equal(scene.sourceHash,'source-visual');
assert.notEqual(scene.hash,withNarrationContext(visible)[2].hash,'resolved model content changes the script cache key');
assert.notEqual(scene.hash,withNarrationContext([visible[2]])[0].hash,'the actual narrated range changes the script cache key');
assert.equal(scene.hash,withNarrationContext(queue)[2].hash,'context resolution is idempotent');
const visibleIds=new Set(visible.map(s=>s.id));
assert(readingNeighborhood(segments,'visual',{visibleIds}).every(s=>visibleIds.has(s.id)),'visible source neighbors cannot contain inactive panels');
assert.deepEqual(readingNeighborhood(segments,'formal',{visibleIds}).map(s=>s.id),['formal'],'explicit hidden source retrieval stays in the requested depth');
assert.deepEqual(readingNeighborhood(segments,'solution',{visibleIds}).map(s=>s.id),['solution'],'explicit exercise retrieval does not leak unrelated answers');
assert.deepEqual(explicitNarrationRange(segments,'practice','solution').map(s=>s.id),['practice','solution'],'an explicit practice range can be narrated');
assert.deepEqual(explicitNarrationRange(segments,'practice').map(s=>s.id),['practice'],'an explicit practice passage does not automatically read its solution');
assert.equal(explicitNarrationRange(segments,'intuition'),null,'ordinary chapter listening still follows the visible queue');
assert(readingNeighborhood(segments,'visual').every(s=>!s.noNarration&&(!s.depth||s.depth==='intuition')),'off-page retrieval defaults to coherent introductory context');
document.querySelector('[data-depth="intuition"]').hidden=true;document.querySelector('[data-depth="derive"]').hidden=false;
const derived=withNarrationContext(segments.filter(s=>isReadingVisible(s,document)));
assert(derived.find(s=>s.id==='visual').before.includes('Build a map'));assert(!derived.find(s=>s.id==='visual').before.includes('intuitive introduction'));

const proofSegments=[...segments,...Array.from({length:8},(_,i)=>({id:`proof-${i}`,index:segments.length+i,text:`Proof step ${i}`,hash:`proof-${i}`,noNarration:true,supplement:i<7?'proof-a':'proof-b'}))];
const proofContext=readingNeighborhood(proofSegments,'proof-3',{visibleIds});
assert.deepEqual(proofContext.map(s=>s.id),Array.from({length:7},(_,i)=>`proof-${i}`),'an optional proof retains three preceding and following steps');
assert.equal(withNarrationContext(proofContext)[3].before,'Proof step 0\nProof step 1\nProof step 2');
assert.deepEqual(readingNeighborhood(proofSegments,'solution').map(s=>s.id),['solution'],'proof grouping does not change exercise answer isolation');
assert(readingNeighborhood(proofSegments,'visual',{visibleIds}).every(s=>!s.supplement),'optional proofs do not enter ordinary reading context');

if(!process.argv.includes('--unit-only')){
 const catalog=JSON.parse(fs.readFileSync('site/reading-index.json','utf8'));
 for(const chapter of catalog){
  const {document}=parseHTML(fs.readFileSync(`site/${chapter.id}.html`,'utf8'));
  const data=JSON.parse(document.querySelector('#reading-data').textContent),indexed=catalog.find(p=>p.id===data.id);
  for(const segment of data.segments){const node=document.getElementById(segment.id),listed=indexed.segments.find(s=>s.id===segment.id);assert.equal(listed.depth,segment.depth);assert.equal(listed.lesson,segment.lesson);assert.equal(listed.supplement,segment.supplement);assert.equal(segment.supplement,node.closest('[data-reading-supplement]')?.dataset.readingSupplement);assert.equal(!!listed.noNarration,!!node.closest('[data-no-narration]'));if(node.matches('.derivation-steps>li')){assert(!/^\d{2}/.test(segment.text));assert(!segment.text.includes('Why this step works'));}}
  for(const section of data.outline){const first=data.segments[section.start];if(first.lesson&&section.level===4){assert.equal(data.segments[section.end].lesson,first.lesson,'a bridge playback range stops at the bridge');assert(data.segments.slice(section.start,section.end+1).every(s=>s.lesson===first.lesson));}}
  for(const segment of data.segments.filter(s=>s.kind==='visualization'&&s.lesson)){assert(!segment.context.includes('FIRST, PREDICT'));assert(!segment.context.includes('Work through the solution'));}
  for(const segment of data.segments.filter(s=>s.supplement)){
   const neighbors=readingNeighborhood(data.segments,segment.id),context=withNarrationContext(neighbors).find(s=>s.id===segment.id);
   assert.equal(segment.context,context.context,'built and runtime proof context agree');
   assert(neighbors.every(s=>s.supplement===segment.supplement));
  }
 }
 const {document:notebook}=parseHTML(fs.readFileSync('site/notebook.html','utf8'));
 assert(!notebook.querySelector('.chapter-study-actions'),'the dynamically populated notebook must not offer stale built narration');
 const {document:map}=parseHTML(fs.readFileSync('site/course-map.html','utf8'));
 assert.equal(map.querySelector('[data-study-action="chapter"]').textContent,'Listen to page');
}
console.log('Verified semantic block boundaries, coherent visible/depth-specific source, context cache invalidation, editorial narration, bounded bridge ranges, and metadata.');
