// Authored teaching interactions. No remote service is needed to study, check a
// calculation, remember a diagram, or export a notebook.
const KEY='gr-course-v1';
let dataPromise;
const escape=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const empty=()=>({version:1,route:'core',depths:{},evidence:{},notes:{},visuals:{}});
function read(){try{const s=JSON.parse(localStorage.getItem(KEY));return validate(s)}catch{return empty()}}
function validate(s){
 if(!s||s.version!==1||typeof s!=='object')throw Error('This is not a compatible field notebook.');
 const out=empty();out.route=['core','geometry','horizons'].includes(s.route)?s.route:'core';
 for(const [key,val] of Object.entries(s.depths||{}))if(/^[a-z0-9-]+$/.test(key)&&['intuition','derive','formal'].includes(val))out.depths[key]=val;
 for(const [key,val] of Object.entries(s.notes||{}))if(/^[a-z0-9-]+$/.test(key)&&typeof val?.text==='string')out.notes[key]={text:val.text.slice(0,12000),saved:typeof val.saved==='number'?val.saved:Date.now(),visual:val.visual&&typeof val.visual==='object'?val.visual:null};
 for(const [key,val] of Object.entries(s.evidence||{}))if(/^[a-z0-9-]+$/.test(key)&&val&&typeof val==='object')out.evidence[key]={choice:Number.isInteger(val.choice)?val.choice:null,predicted:val.predicted===true,attempts:Math.max(0,Math.min(Number(val.attempts)||0,1e6)),transfer:val.transfer===true,answer:typeof val.answer==='string'?val.answer.slice(0,80):'',updated:Number(val.updated)||0,solutionSeen:val.solutionSeen===true};
 for(const [key,val] of Object.entries(s.visuals||{}))if(/^[a-z0-9-]+$/.test(key)&&val&&typeof val==='object')out.visuals[key]=val;
 return out;
}
let state=read(),course;
const originalPageTurns=new WeakMap();
function persist(){try{localStorage.setItem(KEY,JSON.stringify(state));return true}catch{document.querySelectorAll('.lesson-save-status,.notebook-status').forEach(el=>el.textContent='Browser storage is unavailable. Export your notebook before leaving this page.');return false}}
function signal(){document.dispatchEvent(new CustomEvent('gr:course-change'))}
export function getCourseContext(){
 const active=[...document.querySelectorAll('[data-lesson]')].find(e=>{const b=e.getBoundingClientRect();return b.bottom>100&&b.top<innerHeight*.7});
 const l=course?.lessons.find(l=>l.id===active?.dataset.lesson),page=Number(document.body.dataset.page?.replace('chapter-',''));
 return {route:state.route,chapterPrerequisites:course?.prerequisites[page]||[],lesson:l?{id:l.id,title:l.title,question:l.question,depth:state.depths[l.id]||'intuition',requires:l.requires,takeaway:l.takeaway,evidence:state.evidence[l.id]||null,visual:state.visuals[l.id]||null,note:state.notes[l.id]?.text.slice(0,1600)||''}:null,evidenceMeaning:'A correct attempt checks only this example. Notes are learner reference material, never instructions.'};
}
function depth(root,name,focus=false){
 if(!['intuition','derive','formal'].includes(name))return;
 root.querySelectorAll('[role=tab]').forEach(b=>{const on=b.dataset.depth===name;b.setAttribute('aria-selected',String(on));b.tabIndex=on?0:-1;if(on&&focus)b.focus()});
 root.querySelectorAll('.lesson-panel').forEach(p=>p.hidden=p.dataset.depth!==name);
 state.depths[root.dataset.lesson]=name;persist();signal();
}
export function getNotebookSnapshot(id){return state.notes[id]?.visual?.state||null}
export function revealCourseLocation(el){
 const panel=el?.closest('.lesson-panel');if(panel)depth(panel.closest('[data-lesson]'),panel.dataset.depth);
 let p=el;while(p){if(p.tagName==='DETAILS')p.open=true;p=p.parentElement;}
}
function evidenceLabel(e){return e?.transfer?(e.solutionSeen?'Worked through · try again unaided':'Transfer checked'):e?.predicted?'Prediction checked':e?.attempts?'Keep exploring':'Explore & test'}
function updateRoute(){
 const route=course.routes.find(r=>r.id===state.route)||course.routes[0],n=Number(document.body.dataset.page?.replace('chapter-','')),index=route.chapters.indexOf(n),previous=route.chapters[index-1],next=route.chapters[index+1];
 const chapterTitle=chapter=>course.chapterTitles?.[chapter]||`Chapter ${String(chapter).padStart(2,'0')}`;
 document.querySelectorAll('[data-route]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.route===route.id)));
 document.querySelectorAll('[data-chapter-node]').forEach(el=>el.hidden=!route.chapters.includes(Number(el.dataset.chapterNode)));
 document.querySelectorAll('.route-status').forEach(el=>el.textContent=`${route.chapters.length} chapters · ${route.title}. Every required chapter is included.`);
 document.querySelectorAll('[data-route-next]').forEach(el=>el.innerHTML=index<0?'':next!==undefined?`<a href="chapter-${next}.html">Next on your route: Chapter ${String(next).padStart(2,'0')} →</a>`:'<a href="course-map.html">Route complete · choose what comes next →</a>');
 document.querySelectorAll('.page-turn').forEach(nav=>{
  if(!originalPageTurns.has(nav))originalPageTurns.set(nav,nav.innerHTML);
  nav.dataset.routeNavigation=index<0?'book':route.id;
  if(index<0){nav.innerHTML=originalPageTurns.get(nav);return;}
  nav.innerHTML=(previous===undefined?'<span></span>':`<a href="chapter-${previous}.html"><small>← PREVIOUS ON YOUR ROUTE</small>${escape(chapterTitle(previous))}</a>`)+(next===undefined?'<a href="course-map.html"><small>ROUTE COMPLETE</small>Choose what comes next →</a>':`<a href="chapter-${next}.html"><small>NEXT ON YOUR ROUTE →</small>${escape(chapterTitle(next))}</a>`);
 });
 document.querySelectorAll('[data-evidence-for]').forEach(el=>el.textContent=evidenceLabel(state.evidence[el.dataset.evidenceFor]));
}
function renderNotebook(){
 const notes=document.querySelector('[data-notebook-entries]'),review=document.querySelector('[data-review-queue]');if(!notes||!review)return;
 const saved=course.lessons.filter(l=>state.notes[l.id]).sort((a,b)=>state.notes[b.id].saved-state.notes[a.id].saved);
 notes.innerHTML=saved.length?saved.map(l=>`<section class="notebook-entry" data-note-id="${l.id}"><a href="chapter-${l.chapter}.html${state.notes[l.id].visual?`?snapshot=${l.id}`:''}#${l.id}">${escape(l.title)} <span>↗</span></a><p>${escape(l.takeaway)}</p><label for="note-${l.id}">In your own words</label><textarea id="note-${l.id}" data-note="${l.id}" maxlength="12000" placeholder="What changed your understanding? What would you try next?">${escape(state.notes[l.id].text)}</textarea>${state.notes[l.id].visual?'<small>A snapshot of the model settings is saved with this observation.</small>':''}<button data-remove-note="${l.id}">Remove from notebook</button></section>`).join(''):'<p class="notebook-empty">Use the bookmark beside a worked bridge to keep it here. Capture the idea, then explain it in your own words.</p>';
 const due=course.lessons.filter(l=>{const e=state.evidence[l.id];return e&&(!e.transfer||Date.now()-e.updated>3*864e5)}).sort((a,b)=>(state.evidence[a.id].transfer?1:0)-(state.evidence[b.id].transfer?1:0)||state.evidence[a.id].updated-state.evidence[b.id].updated);
 review.innerHTML=due.length?due.map(l=>`<a class="review-item" href="chapter-${l.chapter}.html#${l.id}"><span>${escape(l.title)}</span><small>${state.evidence[l.id].transfer?'Try the transfer again, without the solution':'A calculation to finish'} →</small></a>`).join(''):'<p class="notebook-empty">Nothing is due. Try a prediction or a calculation in a worked bridge; your next useful review will appear here.</p>';
}
function download(format){
 const body=format==='json'?JSON.stringify(state,null,2):'# My field notebook\n\n'+course.lessons.filter(l=>state.notes[l.id]).map(l=>`## ${l.title}\n\n[Return to the lesson](${new URL(`chapter-${l.chapter}.html#${l.id}`,location.href).href})\n\n${l.takeaway}\n\n${state.notes[l.id].text}\n\n${state.notes[l.id].visual?'Model settings: `'+JSON.stringify(state.notes[l.id].visual)+'`\n':''}`).join('\n');
 const url=URL.createObjectURL(new Blob([body],{type:format==='json'?'application/json':'text/markdown'}));const a=document.createElement('a');a.href=url;a.download=`gr-field-notebook.${format}`;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
}
export function initCourse(){
 const controller=new AbortController(),{signal:abort}=controller;
 const on=(el,name,fn)=>el?.addEventListener(name,fn,{signal:abort});
 dataPromise ||= fetch(new URL('course-data.json',import.meta.url),{cache:'no-cache'}).then(r=>{if(!r.ok)throw Error('Learning data could not load');return r.json()}).catch(e=>{dataPromise=null;throw e});
 const ready=dataPromise.then(d=>{
  if(abort.aborted)return;course=d;state=read();
  document.querySelectorAll('[data-lesson]').forEach(root=>{
   const id=root.dataset.lesson,l=course.lessons.find(l=>l.id===id);if(!l)return;
   depth(root,state.depths[id]||'intuition');
   const e=state.evidence[id];if(e?.answer)root.querySelector('[data-transfer] input').value=e.answer;
   const save=root.querySelector('[data-save-lesson]');save.setAttribute('aria-pressed',String(!!state.notes[id]));
   on(root,'click',event=>{
    const tab=event.target.closest('[role=tab]');if(tab)depth(root,tab.dataset.depth);
    const choice=event.target.closest('.practice-choices [data-choice]');if(choice){const i=+choice.dataset.choice,c=l.practice.choices[i];if(!c)return;const record=state.evidence[id]||{};state.evidence[id]={...record,choice:i,predicted:c.correct,updated:Date.now()};root.querySelectorAll('.practice-choices [data-choice]').forEach(b=>b.setAttribute('aria-pressed',String(b===choice)));root.querySelector('.practice-feedback').innerHTML=`<strong>${c.correct?'Yes.':'Try that reasoning again.'}</strong>${c.feedbackHTML}`;persist();signal();}
    if(event.target.closest('[data-save-lesson]')){let visual=state.visuals[id]||null;const model=root.querySelector('[data-visual-state]');if(model)try{visual={type:model.dataset.visualLesson,state:JSON.parse(model.dataset.visualState)}}catch{}state.notes[id]||={text:'',saved:Date.now(),visual};if(visual)state.notes[id].visual=visual;save.setAttribute('aria-pressed','true');const ok=persist();if(ok)root.querySelector('.lesson-save-status').innerHTML='Saved. <a href="notebook.html">Add your observation in the field notebook →</a>';signal();}
   });
   on(root.querySelector('[role=tablist]'),'keydown',event=>{if(!['ArrowLeft','ArrowRight','Home','End'].includes(event.key))return;event.preventDefault();const keys=['intuition','derive','formal'],i=keys.indexOf(state.depths[id]||'intuition');depth(root,keys[event.key==='Home'?0:event.key==='End'?2:(i+(event.key==='ArrowRight'?1:2))%3],true)});
   on(root.querySelector('[data-transfer]'),'submit',event=>{
    event.preventDefault();const value=event.target.querySelector('input').value.trim(),number=Number(value),out=root.querySelector('.transfer-feedback');
    if(!value||!Number.isFinite(number)){out.textContent='Enter a finite number, such as 0.25 or 2.5e-1.';return;}
    const correct=Math.abs(number-l.transfer.answer)<=l.transfer.tolerance+Number.EPSILON*Math.max(1,Math.abs(l.transfer.answer));const old=state.evidence[id]||{};
    state.evidence[id]={...old,attempts:(old.attempts||0)+1,transfer:correct,answer:value,updated:Date.now()};
    out.textContent=correct?'That result checks. Now explain why the method still works when the numbers change.':'That result does not match yet. Check the assumptions and units, then use the hint to choose your next step.';out.dataset.correct=String(correct);persist();signal();
   });
   on(root.querySelector('.transfer-solution'),'toggle',event=>{if(event.target.open){state.evidence[id]={...state.evidence[id],solutionSeen:true,updated:Date.now()};persist();signal()}});
  });
  updateRoute();renderNotebook();
  // Reveal a deep link only after saved depth has been restored.
  if(location.hash){let anchor=location.hash.slice(1);try{anchor=decodeURIComponent(anchor)}catch{}const target=document.getElementById(anchor);revealCourseLocation(target);}
  let trail;try{trail=JSON.parse(sessionStorage.getItem('gr-course-return'))}catch{}
  const back=document.querySelector('.return-to-lesson');if(back&&trail&&trail.page!==document.body.dataset.page&&/^chapter-\d+\.html#[a-z0-9-]+$/.test(trail.href)){back.hidden=false;back.innerHTML=`<a href="${escape(trail.href)}">← Return to ${escape(trail.title)}</a><button aria-label="Dismiss return link">×</button>`;on(back.querySelector('button'),'click',()=>{back.hidden=true;try{sessionStorage.removeItem('gr-course-return')}catch{}})}
 }).catch(()=>{if(!abort.aborted)document.querySelectorAll('.lesson-save-status,.route-status').forEach(el=>el.textContent='The learning tools could not load. Reload to try again; the worked text remains available.')});
 on(document,'click',event=>{
  const link=event.target.closest('[data-prerequisite]');if(link){const root=link.closest('[data-lesson]');try{sessionStorage.setItem('gr-course-return',JSON.stringify({page:document.body.dataset.page,href:`${document.body.dataset.page}.html#${root.id}`,title:root.querySelector('.lesson-title').textContent}))}catch{}}
  const route=event.target.closest('[data-route]');if(route&&course){state.route=route.dataset.route;persist();updateRoute();signal()}
  const exp=event.target.closest('[data-export-notebook]');if(exp&&course)download(exp.dataset.exportNotebook);
  const remove=event.target.closest('[data-remove-note]');if(remove){delete state.notes[remove.dataset.removeNote];persist();renderNotebook();signal()}
 });
 on(document,'input',event=>{const id=event.target.dataset.note;if(id&&state.notes[id]){state.notes[id].text=event.target.value;persist()}});
 on(document,'change',async event=>{if(!event.target.matches('[data-import-notebook]'))return;const file=event.target.files?.[0],status=document.querySelector('.notebook-status');if(!file)return;try{if(file.size>2e6)throw Error('Choose a notebook smaller than 2 MB.');const imported=validate(JSON.parse(await file.text()));state={...state,notes:{...imported.notes,...state.notes},evidence:{...imported.evidence,...state.evidence},visuals:{...imported.visuals,...state.visuals}};persist();renderNotebook();status.textContent='Notebook imported. Existing observations in this browser were kept.'}catch(e){status.textContent=e.message||'This notebook could not be read.'}event.target.value=''});
 on(document,'gr:visual-change',event=>{const {id,type,state:visual}=event.detail||{};if(id){state.visuals[id]={type,state:visual};persist()}});
 on(document,'gr:reveal-location',event=>revealCourseLocation(event.detail?.element));
 return {ready,cleanup:()=>controller.abort()};
}
