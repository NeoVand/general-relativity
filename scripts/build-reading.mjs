import fs from 'node:fs';
import {createHash} from 'node:crypto';
import {parseHTML} from 'linkedom';
import {scenes,icon} from './scenes.mjs';
fs.mkdirSync('site/assets/licenses',{recursive:true});
fs.copyFileSync('vendor/voicebook/LICENSE','site/assets/licenses/voicebook.txt');
const catalog=[];
const clean=s=>s.replace(/\s+/g,' ').trim();
function source(el){
 const copy=el.cloneNode(true);
 copy.querySelectorAll('script,button,.heading-link,.narration-script,.passage-tools,svg').forEach(n=>n.remove());
 copy.querySelectorAll('.katex').forEach(n=>n.replaceWith(` $${n.querySelector('annotation')?.textContent||''}$ `));
 return clean(copy.textContent);
}
for(const file of fs.readdirSync('site').filter(f=>f.endsWith('.html'))){
 const {document}=parseHTML(fs.readFileSync(`site/${file}`,'utf8'));
 const id=file.replace('.html','');
 const main=document.querySelector('main');
 const candidates=[...main.querySelectorAll('h1,h2,h3,h4,p,li,summary,.equation,.equation-piece,figure,.scene-stage,table')].filter(el=>{
  if(el.closest('nav,.contents-group,.chapter-preparation,.chapter-meta,.scene-fallback,.scene-controls,.lab-directory,.hero-equation-key,.color-key'))return false;
  if(el.closest('figure')!==null&&!el.matches('figure'))return false;
  if(el.closest('.scene-stage')!==null&&!el.matches('.scene-stage'))return false;
  if(el.parentElement.closest('li,.equation,.equation-piece,table'))return false;
  return true;
 });
 let heading=document.querySelector('h1')?.textContent||id;
 const segments=[];
 for(const el of candidates){
  const kind=el.matches('figure')?'figure':el.matches('.scene-stage')?'visualization':el.matches('.equation,.equation-piece')?'equation':el.matches('table')?'table':/^H[1-4]$/.test(el.tagName)?'heading':'text';
  if(kind==='heading')heading=source(el);
  const scene=el.closest('[data-scene]');
  const spec=scene&&scenes.find(s=>s.id===scene.dataset.scene);
  const latex=[...el.querySelectorAll('annotation[encoding="application/x-tex"]')].map(n=>n.textContent);
  latex.push(...[...el.querySelectorAll('[data-tex]')].map(n=>n.dataset.tex));
  let text=source(el),description='';
  if(kind==='figure'){
   description=clean([el.querySelector('svg desc')?.textContent,el.querySelector('figcaption')&&source(el.querySelector('figcaption'))].filter(Boolean).join(' '));
   text=description;
  }
  if(kind==='visualization'&&spec){text=`${spec.title}. ${spec.deck} ${spec.note}`;description=text;latex.push(spec.equation);}
  if(!text&&!latex.length)continue;
  const anchor=el.id||`passage-${segments.length+1}`;el.id=anchor;el.dataset.passage=String(segments.length);
  const hash=createHash('sha256').update(text+latex.join(' ')).digest('hex').slice(0,16);
  const entry={id:anchor,index:segments.length,kind,heading,text,latex,description,hash};
  segments.push(entry);
  // A semantic transcript slot is separate from visible mathematical notation.
  // Exact prose is available immediately; constructs are rewritten before speech.
  const script=document.createElement('span');script.className='narration-script';script.hidden=true;script.dataset.for=anchor;
  script.textContent=latex.length?'':text;
  el.append(script);
  if(['equation','figure','visualization'].includes(kind)&&!el.matches('a')&&!el.closest('.hero-scene')){
   const tools=document.createElement('div');tools.className='passage-tools';
   for(const [action,label] of [['listen','Listen'],['explain','Explain']]){const button=document.createElement('button');button.type='button';button.dataset.studyAction=action;button.dataset.readTarget=anchor;button.innerHTML=icon(action==='listen'?'HeadphonesIcon':'Chat01Icon');const description=`${label}${action==='listen'?' to':''} this ${kind}`;button.setAttribute('aria-label',description);button.title=description;tools.append(button);}
   el.append(tools);
  }
 }
 segments.forEach((s,i)=>{s.context=segments.slice(Math.max(0,i-2),i+3).filter(t=>t!==s).map(t=>t.text).join('\n').slice(0,4500);s.hash=createHash('sha256').update(id+s.kind+s.heading+s.text+s.latex.join(' ')+s.context).digest('hex').slice(0,16)});
 const chapterHeader=document.querySelector('.chapter-header');
 if(chapterHeader){const actions=document.createElement('div');actions.className='chapter-study-actions';actions.innerHTML='<button type="button" data-study-action="chapter">Listen to chapter</button><button type="button" data-study-action="ask">Ask about this page</button>';chapterHeader.append(actions)}
 const entry={id,title:document.title.replace(' · General Relativity',''),segments};
 catalog.push({id,title:entry.title,segments:segments.map(({id,index,kind,heading,text})=>({id,index,kind,heading,text}))});
 document.querySelectorAll('script[src]').forEach(s=>{if(!s.src.includes('katex'))s.remove()});
 const assets={reading:fs.readdirSync('site').find(f=>/^app-[\da-f]+\.js$/.test(f)),scenes:fs.readdirSync('site').find(f=>/^scenes-[\da-f]+\.js$/.test(f))};
 const wrapper=document.createElement('div');wrapper.id='book-shell';
 while(document.body.firstChild)wrapper.append(document.body.firstChild);
 document.body.append(wrapper);
 const data=document.createElement('script');data.type='application/json';data.id='reading-data';data.textContent=JSON.stringify({...entry,assets}).replace(/</g,'\\u003c');document.body.append(data);
 fs.writeFileSync(`site/${file}`,document.toString());
}
fs.writeFileSync('site/reading-index.json',JSON.stringify(catalog));
fs.writeFileSync('site/reading-report.json',JSON.stringify({pages:catalog.length,segments:catalog.reduce((n,p)=>n+p.segments.length,0)}));
console.log('Prepared semantic reading passages for',catalog.length,'pages.');
