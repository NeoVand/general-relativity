import fs from 'node:fs';
import {createHash} from 'node:crypto';
import {parseHTML} from 'linkedom';
import {narrationNote} from './narration-notes.mjs';
import {scenes,icon} from './scenes.mjs';
import {lessons,courseFor} from '../content/course.mjs';
import {extractPassageText} from '../src/lib/reading-context.js';
fs.mkdirSync('site/assets/licenses',{recursive:true});
fs.copyFileSync('vendor/voicebook/LICENSE','site/assets/licenses/voicebook.txt');
const catalog=[],bookMap=[];
const clean=s=>s.replace(/\s+/g,' ').trim();
function uniqueSentences(text){
 const seen=new Set();return text.split(/(?<=[.!?])\s+/).filter(s=>{const key=s.toLowerCase().replace(/[^\p{L}\p{N}]/gu,'');if(seen.has(key))return false;seen.add(key);return true}).join(' ');
}
const source=extractPassageText;
for(const file of fs.readdirSync('site').filter(f=>f.endsWith('.html'))){
 const {document}=parseHTML(fs.readFileSync(`site/${file}`,'utf8'));
 const id=file.replace('.html','');
 const main=document.querySelector('main');
 // Optional explanations need their own source neighborhood. Exercises stay
 // ungrouped so explicitly retrieving a question cannot reveal its answer.
 for(const el of main.querySelectorAll('details.history-note[data-no-narration]')){
  el.dataset.readingSupplement=el.id||`supplement-${createHash('sha256').update(source(el.querySelector('summary'))).digest('hex').slice(0,12)}`;
 }
 const experienceSelector='.visual-lesson,.geometry-experience,.curvature-experience,.mechanics-experience';
 const candidates=[...main.querySelectorAll('h1,h2,h3,h4,p,li,summary,.equation,.equation-piece,figure,.scene-stage,.visual-lesson,.geometry-experience,.curvature-experience,.mechanics-experience,table')].filter(el=>{
  if(el.closest('nav,.contents-group,.chapter-preparation,.chapter-meta,.scene-heading,.scene-fallback,.scene-controls,.lab-directory,.hero-equation-key,.color-key'))return false;
  if(el.closest(experienceSelector)&&!el.matches(experienceSelector))return false;
  if(el.closest('.lesson-prerequisites,.lesson-sources,.course-compass,.chapter-bridges,.course-route-picker,.course-node-requires,.lesson-topline,.return-to-lesson'))return false;
  if(el.closest('figure')!==null&&!el.matches('figure'))return false;
  if(el.closest('.scene-stage')!==null&&!el.matches('.scene-stage'))return false;
  if(el.parentElement.closest('li,.equation,.equation-piece,table'))return false;
  return true;
 });
 let heading=document.querySelector('h1')?.textContent||id,sectionHeading=heading;
 const segments=[];
 for(const el of candidates){
  const kind=el.matches('figure')?'figure':el.matches('.scene-stage,'+experienceSelector)?'visualization':el.matches('.equation,.equation-piece')?'equation':el.matches('table')?'table':/^H[1-4]$/.test(el.tagName)?'heading':'text';
  const lesson=el.closest('[data-lesson]');
  if(kind==='heading'){heading=source(el);if(!lesson)sectionHeading=heading;}
  else if(!lesson)heading=sectionHeading;
  const scene=el.closest('[data-scene]');
  const spec=scene&&scenes.find(s=>s.id===scene.dataset.scene);
  const latex=[...el.querySelectorAll('annotation[encoding="application/x-tex"]')].map(n=>n.textContent);
  latex.push(...[...el.querySelectorAll('[data-tex]')].map(n=>n.dataset.tex));
  let text=source(el),description='';
  if(kind==='figure'){
   description=uniqueSentences(clean([el.querySelector('svg desc')?.textContent,el.querySelector('figcaption')&&source(el.querySelector('figcaption')).replace(el.querySelector('figcaption strong')?.textContent||'', '').replace(/^\d+\s*\/\s*/, '')].filter(Boolean).join(' ')));
   text=description;
  }
  if(kind==='visualization'&&spec){text=`${spec.title}. ${spec.deck} ${spec.note}`;description=text;latex.length=0;latex.push(spec.equation);}
  if(el.matches('.visual-lesson')){const lesson=lessons.find(l=>l.id===el.dataset.lessonId);text=lesson.title+'. '+lesson.question+' '+lesson.takeaway;description=text;el.id='visual-'+lesson.id;}
  if(el.matches('.geometry-experience,.curvature-experience,.mechanics-experience')){text=el.dataset.narrationSource||el.querySelector('.narration-script')?.textContent||text;description=text;latex.length=0;latex.push(...[...text.matchAll(/\$([^$]+)\$/g)].map(m=>m[1]));}
  if(!text&&!latex.length)continue;
  const anchor=el.id||`passage-${segments.length+1}`;el.id=anchor;el.dataset.passage=String(segments.length);
  const hash=createHash('sha256').update(text+latex.join(' ')).digest('hex').slice(0,16);
  const entry={id:anchor,index:segments.length,kind,heading,text,latex:[...new Set(latex)],description,hash,level:kind==='heading'?Number(el.tagName.slice(1)):undefined};
  entry.narration=narrationNote(el,kind);
  const panel=el.closest('.lesson-panel');if(panel)entry.depth=panel.dataset.depth;
  if(lesson)entry.lesson=lesson.dataset.lesson;
  if(el.closest('[data-no-narration]'))entry.noNarration=true;
  const supplement=el.closest('[data-reading-supplement]');if(supplement)entry.supplement=supplement.dataset.readingSupplement;
  // The visual narrator already explains its equation and model limitations.
  // Keep these exact sources available for explicit requests, but do not repeat
  // them immediately after the same scene during continuous chapter playback.
  if(el.closest('.scene-equation,.scene-note,.scene-explanation')){entry.noNarration=true;el.setAttribute('data-no-narration','');}
  if(el.matches('.visual-lesson'))entry.narration=text;
  const diagram=kind==='visualization'&&el.querySelector('.scene-diagram figure');
  if(diagram){
   const description=uniqueSentences(clean([diagram.querySelector('svg desc')?.textContent,source(diagram.querySelector('figcaption')).replace(diagram.querySelector('figcaption strong')?.textContent||'','').replace(/^\d+\s*\/\s*/,'')].filter(Boolean).join(' ')));
   const latex=[...new Set([...diagram.querySelectorAll('annotation[encoding="application/x-tex"],[data-tex]')].map(n=>n.dataset.tex||n.textContent))];
   entry.views={diagram:{kind:'figure',text:description,description,latex,narration:narrationNote(diagram,'figure')}};
  }
  segments.push(entry);
  // A semantic transcript slot is separate from visible mathematical notation.
  // Exact prose is available immediately; constructs are rewritten before speech.
  const script=document.createElement('span');script.className='narration-script';script.hidden=true;script.dataset.for=anchor;
  script.textContent=entry.narration||(latex.length?'':text);
  el.append(script);
  if(['equation','figure','visualization'].includes(kind)&&!el.matches('a')&&!el.closest('.hero-scene')){
   const tools=document.createElement('div');tools.className='passage-tools';
   for(const [action,label] of [['listen','Listen'],['explain','Explain']]){const button=document.createElement('button');button.type='button';button.dataset.studyAction=action;button.dataset.readTarget=anchor;button.innerHTML=icon(action==='listen'?'HeadphonesIcon':'Chat01Icon');const description=`${label}${action==='listen'?' to':''} this ${kind}`;button.setAttribute('aria-label',description);button.title=description;tools.append(button);}
   if(kind==='visualization'&&(scene||el).querySelector('.scene-actions'))(scene||el).querySelector('.scene-actions').append(tools);else el.append(tools);
  }
 }
 segments.forEach((s,i)=>{const neighbors=segments.filter(t=>s.supplement?t.supplement===s.supplement:!t.noNarration&&(!t.depth||t.depth===(t.lesson===s.lesson?s.depth||'intuition':'intuition')));s.before=neighbors.filter(t=>t.index<i).slice(-3).map(t=>t.text).join('\n').slice(-3000);s.after=neighbors.filter(t=>t.index>i).slice(0,3).map(t=>t.text).join('\n').slice(0,3000);s.context=[s.before,'[NARRATION SLOT]',s.after].join('\n');s.hash=createHash('sha256').update(id+s.kind+s.heading+s.text+s.latex.join(' ')+s.context+(s.narration||'')).digest('hex').slice(0,16)});
 // An alternate diagram can depict a different worked example. Give its
 // narrator only its own source and the surrounding lesson, not the 3D note.
 for(const s of segments){if(!s.views?.diagram)continue;const v=s.views.diagram,scene=document.getElementById(s.id).closest('[data-scene]');const outside=segments.filter(t=>!scene.contains(document.getElementById(t.id)));v.before=outside.filter(t=>t.index<s.index).slice(-3).map(t=>t.text).join('\n').slice(-3000);v.after=outside.filter(t=>t.index>s.index).slice(0,3).map(t=>t.text).join('\n').slice(0,3000);v.context=[v.before,'[NARRATION SLOT]',v.after].join('\n');v.hash=createHash('sha256').update(id+'diagram'+s.heading+v.text+v.latex.join(' ')+v.context+(v.narration||'')).digest('hex').slice(0,16);}
 const chapterHeader=document.querySelector('.chapter-header');
 if(chapterHeader&&id!=='notebook'){const actions=document.createElement('div');actions.className='chapter-study-actions';actions.innerHTML=`<button type="button" data-study-action="chapter">Listen to ${id.startsWith('chapter-')?'chapter':'page'}</button><button type="button" data-study-action="ask">Ask about this page</button>`;chapterHeader.append(actions)}
 const outline=segments.filter(s=>s.kind==='heading').map(s=>({id:s.id,title:s.text,level:s.level,start:s.index,end:segments.find(t=>t.index>s.index&&t.kind==='heading'&&t.level<=s.level)?.index-1}));
 for(const section of outline){const first=segments[section.start];if(first.lesson&&section.level===4)section.end=segments.filter(s=>s.lesson===first.lesson).at(-1).index;if(!Number.isFinite(section.end))section.end=segments.length-1;section.endPassage=segments[section.end].id;section.summary=segments.slice(section.start+1,section.end+1).find(s=>s.kind==='text'&&!s.noNarration&&(!s.depth||s.depth==='intuition'))?.text.slice(0,230)||'';}
 const entry={id,title:document.title.replace(' · General Relativity',''),segments,outline};
 bookMap.push({id,title:entry.title,summary:document.querySelector('.chapter-deck')?.textContent||segments.find(s=>s.kind==='text')?.text.slice(0,220)||'',outline});
 catalog.push({id,title:entry.title,segments:segments.map(({id,index,kind,heading,text,latex,hash,views,depth,lesson,noNarration,supplement})=>({id,index,kind,heading,text,latex,hash,views,depth,lesson,noNarration,supplement}))});
 document.querySelectorAll('script[src]').forEach(s=>{if(!s.src.includes('katex'))s.remove()});
 const entryNames={reading:'app',scenes:'scenes',course:'course',visualLessons:'visual-lessons',geometryExperiences:'geometry-experiences',curvatureExperiences:'curvature-experiences'};
 const assets=Object.fromEntries(Object.entries(entryNames).map(([key,name])=>[key,fs.readdirSync('site').find(f=>new RegExp(`^${name}-[\\da-f]+\\.js$`).test(f))]));
 const wrapper=document.createElement('div');wrapper.id='book-shell';
 while(document.body.firstChild)wrapper.append(document.body.firstChild);
 document.body.append(wrapper);
 const data=document.createElement('script');data.type='application/json';data.id='reading-data';data.textContent=JSON.stringify({...entry,assets,course:courseFor(id.startsWith('chapter-')?Number(id.slice(8)):undefined)}).replace(/</g,'\\u003c');document.body.append(data);
 fs.writeFileSync(`site/${file}`,document.toString());
}
fs.writeFileSync('site/book-map.json',JSON.stringify(bookMap));
fs.writeFileSync('site/reading-index.json',JSON.stringify(catalog));
fs.writeFileSync('site/reading-report.json',JSON.stringify({pages:catalog.length,segments:catalog.reduce((n,p)=>n+p.segments.length,0)}));
console.log('Prepared semantic reading passages for',catalog.length,'pages.');
