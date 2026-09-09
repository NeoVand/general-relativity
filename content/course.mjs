import {geometryLessons} from './geometry-lessons.mjs';
import {bridgeLessons} from './bridge-lessons.mjs';
import {prepareLesson} from './practice-variants.mjs';
export const lessons=[...geometryLessons,...bridgeLessons].map(prepareLesson);
// Edges name direct dependencies, not every earlier chapter. Optional paths are
// deliberately separate from the route to the first complete physical picture.
export const prerequisites=[[],[0],[0],[0,1,2],[2,3],[4],[2,4],[5,6],[6,7],[8],[7,9],[2,3,7],[9,10,11],[5,11,12],[12,13],[7,12,14],[3,7,15],[3,7,12,16],[3,9,12],[11,12,15],[15,18,19],[7,8,14,15,20],[17,18,21],[12,19,22],[10,16,17,18,19]];
export const routes=[
 {id:'core',title:'Build the complete picture',description:'From calculus to spacetime, geometry, Einstein’s equation, and its observable consequences. Then bring it together.',chapters:[...Array.from({length:20},(_,i)=>i),24]},
 {id:'geometry',title:'Build the geometry of spacetime',description:'An introductory geometry route: clocks, tensors, manifolds, metrics, transport, and curvature. Continue through the core course before taking the advanced chapters on evolving geometry and frames.',chapters:Array.from({length:11},(_,i)=>i)},
 {id:'horizons',title:'Follow a light ray into a black hole',description:'A route through the core prerequisites, Schwarzschild spacetime, global causal structure, and the assumptions behind black-hole thermodynamics. Cosmology prepares the initial-data example used by the advanced chapters.',chapters:Array.from({length:23},(_,i)=>i)},
];
export function courseFor(chapter){const n=Number(chapter);return {chapter:Number.isInteger(n)?n:null,requires:prerequisites[n]||[],lessons:lessons.filter(l=>l.chapter===n).map(l=>({id:l.id,title:l.title,question:l.question,requires:l.requires,takeaway:l.takeaway}))};}
export function validateCourse(){
 const ids=new Set();
 for(const l of lessons){
  if(ids.has(l.id))throw Error(`Duplicate lesson ${l.id}`);ids.add(l.id);
  if(!l.after||!l.intuition||!l.formal||!l.steps?.length||!l.sources?.length)throw Error(`Incomplete lesson ${l.id}`);
  if(l.practice.choices.filter(c=>c.correct).length!==1)throw Error(`Ambiguous check ${l.id}`);
  if(new Set(l.practice.choices.map(c=>c.id)).size!==l.practice.choices.length)throw Error(`Duplicate choice identity ${l.id}`);
  for(const variant of l.variants)if(!variant.prompt||!variant.hint||!variant.solution||!Number.isFinite(variant.answer))throw Error(`Incomplete variant ${l.id}/${variant.id}`);
  if(!Number.isFinite(l.transfer.answer)||!Number.isFinite(l.transfer.tolerance)||l.transfer.tolerance<0)throw Error(`Invalid transfer ${l.id}`);
 }
 prerequisites.forEach((edges,n)=>edges.forEach(p=>{if(!Number.isInteger(p)||p<0||p>=n)throw Error(`Cyclic or invalid prerequisite ${n} → ${p}`)}));
 for(const r of routes){const seen=new Set();for(const n of r.chapters){for(const p of prerequisites[n])if(!seen.has(p))throw Error(`Route ${r.id} skips chapter ${p}, needed by ${n}`);seen.add(n);}}
}
