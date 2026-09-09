import {geometryLessons} from './geometry-lessons.mjs';
import {bridgeLessons} from './bridge-lessons.mjs';
import {foundationLessons} from './foundation-lessons.mjs';
import {prerequisites,routes,skills,requirementsFor,validateCurriculum} from './curriculum.mjs';
export {prerequisites,routes,skills,requirementsFor};
import {prepareLesson} from './practice-variants.mjs';
export const lessons=[...geometryLessons,...bridgeLessons,...foundationLessons].map(prepareLesson);
export function courseFor(chapter){const n=Number(chapter);return {chapter:Number.isInteger(n)?n:null,requires:prerequisites[n]||[],skills:requirementsFor(n),lessons:lessons.filter(l=>l.chapter===n).map(l=>({id:l.id,title:l.title,question:l.question,requires:l.requires,takeaway:l.takeaway}))};}
export function validateCourse(){
 validateCurriculum(lessons);
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
