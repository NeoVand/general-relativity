// One semantic text path for built passages and live visual models.
const clean=text=>text.replace(/\s+/g,' ').trim();
export function extractPassageText(element,{live=false}={}){
 const copy=element.cloneNode(true);
 copy.querySelectorAll('script,button,.heading-link,.narration-script,.passage-tools,.step-number,.step-reason>span,.vl-controls,.vl-kicker,.vl-spatial-hint,[data-experience-controls],.gx-reference,.cx-reference,svg,canvas').forEach(node=>node.remove());
 if(live)copy.querySelectorAll('[hidden],[aria-hidden="true"]').forEach(node=>node.remove());
 copy.querySelectorAll('.katex').forEach(node=>node.replaceWith(` $${node.querySelector('annotation')?.textContent||''}$ `));
 if(copy.matches('table'))return [...copy.querySelectorAll('tr')].map(row=>[...row.querySelectorAll('th,td')].map(cell=>clean(cell.textContent)).join(' | ')).join('\n');
 // textContent does not insert boundaries for block elements. Without these,
 // a step title and paragraph become "Project from a poleWrite the sphere".
 copy.querySelectorAll('p,div,li,h1,h2,h3,h4,h5,h6,br,strong,small').forEach(node=>{node.before(' ');node.after(' ')});
 return clean(copy.textContent);
}

function fingerprint(text){let hash=2166136261;for(let i=0;i<text.length;i++){hash^=text.charCodeAt(i);hash=Math.imul(hash,16777619);}return (hash>>>0).toString(16).padStart(8,'0');}
export function withNarrationContext(segments){
 return segments.map((segment,index)=>{
  const before=segments.slice(Math.max(0,index-3),index).map(s=>s.text).join('\n').slice(-3000);
  const after=segments.slice(index+1,index+4).map(s=>s.text).join('\n').slice(0,3000);
  const context=[before,'[NARRATION SLOT]',after].join('\n');
  const contentHash=segment.contentHash||segment.hash;
  return {...segment,before,after,context,contentHash,sourceHash:segment.sourceHash||segment.hash,hash:`${contentHash}:context-v1:${fingerprint(JSON.stringify([segment.text,segment.latex,segment.description,context]))}`};
 });
}

export function isReadingVisible(segment,document,{includeNoNarration=false}={}){
 const element=document.getElementById(segment.id);
 if(!element||element.closest('[hidden]')||(!includeNoNarration&&(segment.noNarration||element.closest('[data-no-narration]'))))return false;
 return !(element.closest('.scene-equation,.scene-note,.scene-explanation')&&element.closest('[data-scene]')?.dataset.activeView==='diagram');
}

// A request for a hidden depth is legitimate source retrieval, but its nearby
// source must stay in that same panel. Optional proofs retain their neighboring
// steps; an explicitly requested exercise stays alone to avoid revealing answers.
export function readingNeighborhood(segments,id,{visibleIds}={}){
 const requested=segments.find(s=>s.id===id);if(!requested)return [];
 let candidates;
 if(requested.supplement)candidates=segments.filter(s=>s.supplement===requested.supplement);
 else if(visibleIds?.has(id))candidates=segments.filter(s=>visibleIds.has(s.id));
 else if(requested.noNarration)candidates=[requested];
 else if(requested.depth)candidates=segments.filter(s=>!s.noNarration&&s.lesson===requested.lesson&&s.depth===requested.depth);
 else candidates=segments.filter(s=>!s.noNarration&&(!s.depth||s.depth==='intuition'));
 const index=candidates.findIndex(s=>s.id===id);
 return requested.supplement?candidates.slice(Math.max(0,index-3),index+4):candidates.slice(Math.max(0,index-1),index+3);
}

export function explicitNarrationRange(segments,startId,endId=startId,{isVisible=()=>true}={}){
 const start=segments.findIndex(s=>s.id===startId);
 if(start<0||!segments[start].noNarration)return null;
 const end=segments.findIndex(s=>s.id===endId);
 return end<start?[]:segments.slice(start,end+1).filter(isVisible);
}
