<script>
 import {onMount,tick,untrack} from 'svelte';
 import Study from './Study.svelte';
 import SafeHTML from './SafeHTML.svelte';
 import {base} from './lib/book.js';
 let {initial}=$props();
 let page=$state(untrack(()=>initial));
 let navigationError=$state('');
 let cleanup=()=>{};
 let readingModule,sceneModule,courseModule,visualModule,geometryModule,curvatureModule,routeToken=0;
 async function activate(){
  readingModule ||= await import(/* @vite-ignore */new URL(initial.assets.reading,base).href);
  sceneModule ||= await import(/* @vite-ignore */new URL(initial.assets.scenes,base).href);
  courseModule ||= await import(/* @vite-ignore */new URL(initial.assets.course,base).href);
  visualModule ||= await import(/* @vite-ignore */new URL(initial.assets.visualLessons,base).href);
  geometryModule ||= await import(/* @vite-ignore */new URL(initial.assets.geometryExperiences,base).href);
  curvatureModule ||= await import(/* @vite-ignore */new URL(initial.assets.curvatureExperiences,base).href);
  const offReading=readingModule.initReading(),offScenes=sceneModule.initScenes();
  const course=courseModule.initCourse(),offVisuals=visualModule.initVisualLessons();
  const offGeometry=geometryModule.initGeometryExperiences(),offCurvature=curvatureModule.initCurvatureExperiences();
  cleanup=()=>{offCurvature();offGeometry();offVisuals();course.cleanup();offScenes();offReading()};
  await course.ready;
 }
 function restoreSnapshot(url){const id=url.searchParams.get('snapshot');if(id)visualModule?.restoreVisualLessonState(id,courseModule?.getNotebookSnapshot(id));}
 function hashId(hash){try{return decodeURIComponent(hash.slice(1))}catch{return hash.slice(1)}}
 function revealLocation(el){courseModule?.revealCourseLocation(el);const diagram=el?.closest('.scene-diagram');if(diagram)diagram.closest('[data-scene]')?.querySelector('[data-scene-mode="diagram"]')?.click();return el;}
 async function navigate(target,{pop=false,highlight=false,signal}={}){
  const url=new URL(target,base);
  if(url.origin!==base.origin||!url.pathname.startsWith(base.pathname))throw Error('Only book pages can be opened.');
  const file=url.pathname.slice(base.pathname.length)||'index.html';
  if(!/^(index|chapter-\d+|appendix-[a-e]|reading-guide|figure-atlas|visual-language|course-map|notebook|credits)\.html$/.test(file))throw Error('This is not a book page.');
  const token=++routeToken;
  if(file!==`${page.id}.html`){
   const response=await fetch(new URL(file,base),{signal});if(!response.ok)throw Error('That chapter could not load. Please retry.');
   const doc=new DOMParser().parseFromString(await response.text(),'text/html');
   const data=JSON.parse(doc.querySelector('#reading-data').textContent);
   if(token!==routeToken||signal?.aborted)return;
   cleanup();page={...data,html:doc.querySelector('#book-shell').innerHTML};
   document.title=doc.title;document.body.dataset.page=data.id;
   document.querySelector('meta[name="description"]').content=doc.querySelector('meta[name="description"]').content;
   await tick();await activate();
  }
  if(token!==routeToken||signal?.aborted)return;
  navigationError='';
  if(!pop)history.pushState({},'',url);
  restoreSnapshot(url);
  if(url.hash){const el=revealLocation(document.getElementById(hashId(url.hash)));if(el){let p=el.parentElement;while(p){if(p.tagName==='DETAILS')p.open=true;p=p.parentElement;}el.scrollIntoView({block:highlight?'center':'start'});}}
  else window.scrollTo(0,0);
 }
 onMount(()=>{
  let alive=true;
  activate().then(async()=>{await document.fonts.ready;if(alive&&routeToken===0){restoreSnapshot(new URL(location.href));if(location.hash)revealLocation(document.getElementById(hashId(location.hash)))?.scrollIntoView({block:'start'});}}).catch(()=>{if(alive)navigationError='The interactive reader could not start. Reload to try again.'});
  const click=e=>{
   const link=e.target.closest('a[href]');
   if(!link||e.defaultPrevented||e.button!==0||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||link.target||link.hasAttribute('download'))return;
   const url=new URL(link.href);
   if(url.origin!==base.origin||!url.pathname.startsWith(base.pathname))return;
   if(!/^(index|chapter-\d+|appendix-[a-e]|reading-guide|figure-atlas|visual-language|course-map|notebook|credits)\.html$/.test(url.pathname.slice(base.pathname.length)))return;
   e.preventDefault();navigate(url).catch(e=>navigationError=e.message);
  };
  const pop=()=>navigate(location.href,{pop:true}).catch(e=>navigationError=e.message);
  document.addEventListener('click',click);window.addEventListener('popstate',pop);
  return ()=>{alive=false;routeToken++;cleanup();document.removeEventListener('click',click);window.removeEventListener('popstate',pop)};
 });
</script>
{#key page.id}
 <SafeHTML html={page.html}/>
{/key}
<Study {page} {navigate}/>
{#if navigationError}<div class="reader-error" role="alert">{navigationError}<button onclick={()=>navigationError=''} aria-label="Dismiss navigation error">×</button></div>{/if}
