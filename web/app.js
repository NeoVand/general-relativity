export function initReading(){
const listeners=[];
const listen=(el,...args)=>{el.addEventListener(...args);listeners.push(()=>el.removeEventListener(...args))};
const $=s=>document.querySelector(s);
const outputMath=(el,tex)=>{el.innerHTML=window.katex.renderToString(tex,{throwOnError:true})};
const storage={get:k=>{try{return localStorage.getItem(k)}catch{return null}},set:(k,v)=>{try{localStorage.setItem(k,v)}catch{}}};
if(storage.get('gr-theme'))document.documentElement.dataset.theme=storage.get('gr-theme');
if(storage.get('gr-type')==='large')document.documentElement.classList.add('large-type');
function themeLabel(){$('#theme-button')?.setAttribute('aria-label',`Switch to ${document.documentElement.dataset.theme==='dark'?'light':'dark'} appearance`)}themeLabel();
$('#theme-button')?.addEventListener('click',()=>{const dark=document.documentElement.dataset.theme!=='dark';document.documentElement.dataset.theme=dark?'dark':'light';storage.set('gr-theme',dark?'dark':'light');themeLabel()});
$('#type-button')?.setAttribute('aria-pressed',String(document.documentElement.classList.contains('large-type')));
$('#type-button')?.addEventListener('click',()=>{const large=document.documentElement.classList.toggle('large-type');storage.set('gr-type',large?'large':'normal');$('#type-button').setAttribute('aria-pressed',String(large))});
const sidebar=$('#book-navigation'),menu=$('#menu-button'),mobileMenu=$('#mobile-menu-button'),navScroll=$('.nav-scroll'),preview=$('.nav-preview'),scrim=$('.nav-scrim');
const narrowNavigation=matchMedia('(max-width:800px)');
const navPage=document.body.dataset.page||'index';
let groupPrefs={};try{groupPrefs=JSON.parse(storage.get('gr-nav-groups')||'{}')||{}}catch{}
if(typeof groupPrefs!=='object'||Array.isArray(groupPrefs))groupPrefs={};
const navGroups=[...sidebar.querySelectorAll('[data-nav-group]')];
const changedChapter=storage.get('gr-nav-page')!==navPage;
for(const [i,group] of navGroups.entries()){
 const id=group.dataset.navGroup;
 const current=group.classList.contains('contains-current');
 const expanded=current&&changedChapter?true:typeof groupPrefs[id]==='boolean'?groupPrefs[id]:current||(navPage==='index'&&i===0);
 group.querySelector('.nav-children').classList.toggle('is-expanded',expanded);
}
storage.set('gr-nav-page',navPage);
const sectionToggle=$('.nav-section-toggle'),sectionList=$('.nav-sections');
if(sectionList&&storage.get(`gr-nav-sections-${navPage}`)==='open')sectionList.classList.add('is-expanded');
const navigationOpen=()=>narrowNavigation.matches?sidebar.classList.contains('open'):document.documentElement.dataset.sidebar!=='collapsed';
let previewTimer;
function hidePreview(){clearTimeout(previewTimer);preview.hidden=true;preview.replaceChildren()}
function syncNavigation(){
 const open=navigationOpen();
 for(const toggle of [menu,mobileMenu]){toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'Collapse contents':'Expand contents')}
 $('.nav-home-link').inert=!open;
 sidebar.inert=narrowNavigation.matches&&!open;scrim.hidden=!(narrowNavigation.matches&&open);
 for(const group of navGroups){const list=group.querySelector('.nav-children'),expanded=open&&list.classList.contains('is-expanded');list.inert=!expanded;group.querySelector('.nav-group-toggle').setAttribute('aria-expanded',String(expanded))}
 if(sectionList){const expanded=sectionList.classList.contains('is-expanded');sectionList.inert=!expanded;sectionToggle.setAttribute('aria-expanded',String(expanded));sectionToggle.setAttribute('aria-label',`${expanded?'Hide':'Show'} sections in this chapter`)}
 // Clipped labels must never make native focus scrolling slide the icon column.
 navScroll.scrollLeft=0;sidebar.scrollLeft=0;
 hidePreview();
}
function setNavigation(open){
 if(narrowNavigation.matches)sidebar.classList.toggle('open',open);
 else{document.documentElement.dataset.sidebar=open?'expanded':'collapsed';storage.set('gr-sidebar',open?'expanded':'collapsed')}
 syncNavigation();
}
function closeMenu(){if(narrowNavigation.matches&&navigationOpen()){setNavigation(false);if(sidebar.contains(document.activeElement))mobileMenu.focus()}}
function keepNavVisible(element){if(!navScroll.contains(element))return;const rect=element.getBoundingClientRect(),frame=navScroll.getBoundingClientRect();if(rect.top<frame.top)navScroll.scrollTop+=rect.top-frame.top-8;else if(rect.bottom>frame.bottom)navScroll.scrollTop+=rect.bottom-frame.bottom+8}
menu.addEventListener('click',()=>{setNavigation(!navigationOpen());if(narrowNavigation.matches&&!navigationOpen())mobileMenu.focus()});
 mobileMenu.addEventListener('click',()=>{setNavigation(!navigationOpen());if(navigationOpen())menu.focus()});
scrim.addEventListener('click',closeMenu);
sectionToggle?.addEventListener('click',()=>{sectionList.classList.toggle('is-expanded');storage.set(`gr-nav-sections-${navPage}`,sectionList.classList.contains('is-expanded')?'open':'closed');syncNavigation()});
for(const group of navGroups){
 const button=group.querySelector('.nav-group-toggle'),list=group.querySelector('.nav-children');
 button.addEventListener('click',()=>{
  const wasOpen=navigationOpen();
  list.classList.toggle('is-expanded',!wasOpen||!list.classList.contains('is-expanded'));
  groupPrefs[group.dataset.navGroup]=list.classList.contains('is-expanded');storage.set('gr-nav-groups',JSON.stringify(groupPrefs));
  if(!wasOpen)setNavigation(true);else syncNavigation();
 });
}
// Rail previews are a noninteractive reading surface. Enter unfolds the actual
// navigation tree, so links never exist twice in the keyboard/accessibility tree.
for(const item of sidebar.querySelectorAll('.nav-group-toggle,.nav-destination')){
 const show=()=>{
  if(navigationOpen()||narrowNavigation.matches)return;
  hidePreview();
  const title=document.createElement('strong');title.textContent=item.querySelector('.nav-copy>span')?.textContent||item.querySelector('.nav-copy').textContent;preview.append(title);
  const group=item.closest('.nav-group');
  if(group){
   const detail=document.createElement('p');detail.textContent=item.querySelector('small').textContent;preview.append(detail);
   const list=document.createElement('ol');
   group.querySelectorAll('.nav-chapter-row>a').forEach(link=>{const li=document.createElement('li'),n=document.createElement('span');n.textContent=link.querySelector('.nav-number').textContent;li.append(n,document.createTextNode(link.lastElementChild.textContent));if(link.hasAttribute('aria-current'))li.className='is-current';list.append(li)});preview.append(list);
   const hint=document.createElement('small');hint.textContent='Click to explore · Enter to open';preview.append(hint);
  }
  preview.hidden=false;
  preview.style.top=Math.max(84,Math.min(item.getBoundingClientRect().top,innerHeight-preview.offsetHeight-16))+'px';
 };
 item.addEventListener('pointerenter',()=>{clearTimeout(previewTimer);previewTimer=setTimeout(show,160)});
 item.addEventListener('pointerleave',hidePreview);
 item.addEventListener('focus',()=>{keepNavVisible(item);show()});
 item.addEventListener('blur',hidePreview);
}
// CSS may blur a newly hidden control before the media-query event arrives.
let navigationFocus=null;
listen(document,'focusin',e=>{if(e.target!==document.body)navigationFocus=sidebar.contains(e.target)||e.target===mobileMenu?e.target:null});
listen(document,'pointerdown',e=>{if(!sidebar.contains(e.target)&&!mobileMenu.contains(e.target))navigationFocus=null});
listen(narrowNavigation,'change',()=>{const focused=document.activeElement===document.body?navigationFocus:document.activeElement;sidebar.classList.remove('open');syncNavigation();if(narrowNavigation.matches&&sidebar.contains(focused))mobileMenu.focus();else if(!narrowNavigation.matches&&focused===mobileMenu)menu.focus()});syncNavigation();
listen(window,'resize',hidePreview);navScroll.addEventListener('scroll',hidePreview,{passive:true});
listen(document,'keydown',e=>{
 if(e.key==='Escape'){
  if(!preview.hidden){e.preventDefault();e.stopImmediatePropagation();hidePreview();return}
  if(narrowNavigation.matches&&navigationOpen()){e.preventDefault();e.stopImmediatePropagation();closeMenu();mobileMenu.focus()}
 }
 if(e.key==='Tab'&&narrowNavigation.matches&&navigationOpen()){
  const links=[...sidebar.querySelectorAll('a,button')].filter(el=>!el.closest('[inert]')&&el.getClientRects().length);
  const at=links.indexOf(document.activeElement);
  if(e.shiftKey&&(at<=0)){e.preventDefault();links.at(-1).focus()}
  else if(!e.shiftKey&&(at===links.length-1||at===-1)){e.preventDefault();menu.focus()}
 }
},true);
listen(document,'click',e=>{if(!sidebar.contains(e.target)&&!mobileMenu.contains(e.target))closeMenu()});
sidebar.addEventListener('click',e=>{if(e.target.closest('a[href]'))closeMenu()});
const page=document.body.dataset.page;
if(/^chapter-\d+$/.test(page))storage.set('gr-last-chapter',page);
const last=storage.get('gr-last-chapter');
if(last&&/^chapter-\d+$/.test(last)&&$('#continue-link')){$('#continue-link').href=`${last}.html`;$('#continue-link').textContent=`Continue Chapter ${Number(last.split('-')[1])} →`}
const current=sidebar.querySelector('[aria-current]');if(current&&navigationOpen())keepNavVisible(current);
const observer=new IntersectionObserver(entries=>{for(const e of entries)if(e.isIntersecting){document.querySelectorAll('.section-rail a,.nav-sections a').forEach(a=>a.classList.toggle('current',a.hash===`#${e.target.id}`))}},{rootMargin:'-90px 0px -65% 0px'});
document.querySelectorAll('.prose h3[id]').forEach(h=>observer.observe(h));
let index, indexRequest, activeResult=-1;
const search=$('.book-search'), searchInput=$('#search-input'), searchResults=$('#search-results');
async function openSearch(){
 search.classList.add('open');$('.topbar').classList.add('search-open');
 for(const id of ['search-input','search-close','search-popover'])$('#'+id).hidden=false;
 $('#search-button').setAttribute('aria-expanded','true');searchInput.setAttribute('aria-expanded','true');searchInput.focus();
 if(index){runSearch();return}
 $('#search-status').textContent='Finding your next idea…';
 try{
  indexRequest ||= fetch('search-index.json').then(r=>{if(!r.ok)throw Error();return r.json()});
  index=await indexRequest;runSearch();
 }catch{indexRequest=null;$('#search-status').textContent='Search could not load. Please try again.'}
}
function closeSearch(restoreFocus=false){
 search.classList.remove('open');$('.topbar').classList.remove('search-open');
 for(const id of ['search-input','search-close','search-popover'])$('#'+id).hidden=true;
 $('#search-button').setAttribute('aria-expanded','false');searchInput.setAttribute('aria-expanded','false');
 if(restoreFocus)$('#search-button').focus();
}
function highlight(target,text,words){
 // Build text nodes, keeping manuscript content and typed queries out of HTML.
 const pattern=new RegExp('('+words.map(w=>w.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')).join('|')+')','gi');
 for(const part of text.split(pattern)){
  if(words.includes(part.toLowerCase())){const mark=document.createElement('mark');mark.textContent=part;target.append(mark)}
  else target.append(document.createTextNode(part));
 }
}
function selectResult(n){
 const options=[...searchResults.children];activeResult=n;
 options.forEach((a,i)=>a.setAttribute('aria-selected',String(i===n)));
 if(options[n]){searchInput.setAttribute('aria-activedescendant',options[n].id);options[n].scrollIntoView({block:'nearest'})}
 else searchInput.removeAttribute('aria-activedescendant');
}
function runSearch(){
 if(!index)return;
 const query=searchInput.value.trim().toLowerCase();searchResults.replaceChildren();selectResult(-1);
 $('#search-suggestions').hidden=query.length>=2;
 if(query.length<2){$('#search-status').textContent=query?'Keep typing to find an idea.':'Follow a thread of curiosity.';return}
 const words=query.split(/\s+/);
 const hits=index.filter(p=>words.every(w=>(p.title+' '+p.text).toLowerCase().includes(w))).sort((a,b)=>Number(b.title.toLowerCase().includes(query))-Number(a.title.toLowerCase().includes(query)));
 $('#search-status').textContent=hits.length?`${hits.length} matching chapter${hits.length===1?'':'s'}${hits.length>6?' · Top 6 shown':''}`:'No matches yet. Try a broader idea.';
 for(const [i,p] of hits.slice(0,6).entries()){
  const a=document.createElement('a');a.href=p.url;a.id=`search-result-${i}`;a.setAttribute('role','option');a.setAttribute('aria-selected','false');
  const eyebrow=document.createElement('span');eyebrow.className='search-chapter';
  const chapter=p.url.match(/chapter-(\d+)/);eyebrow.textContent=chapter?`CHAPTER ${chapter[1].padStart(2,'0')}`:'KEEP BESIDE YOUR NOTEBOOK';
  const title=document.createElement('strong');highlight(title,p.title,words);
  const small=document.createElement('small');
  const useSummary=p.summary&&p.title.toLowerCase().includes(query);
  const text=(useSummary?p.summary:p.text).replace(/\$\$[\s\S]*?\$\$/g,' ').replace(/\$[^$]*\$/g,' ').replace(/\[([^\]]+)\]\([^)]*\)/g,'$1').replace(/[#*_>]/g,'').replace(/\s+/g,' ').trim();
  let start=useSummary?0:Math.max(0,text.toLowerCase().indexOf(words[0])-45);
  if(start)start=text.indexOf(' ',start)+1;
  const end=text.length>start+150?text.lastIndexOf(' ',start+150):text.length;
  highlight(small,(start?'… ':'')+text.slice(start,end)+(end<text.length?'…':''),words);
  a.append(eyebrow,title,small);searchResults.append(a);
 }
}
$('#search-button')?.addEventListener('click',openSearch);
$('#search-close')?.addEventListener('click',()=>closeSearch(true));
searchInput?.addEventListener('input',runSearch);
search?.addEventListener('keydown',e=>{
 if(e.key==='Escape'){e.preventDefault();closeSearch(true)}
 if(e.target!==searchInput)return;
 const count=searchResults.children.length;
 if((e.key==='ArrowDown'||e.key==='ArrowUp')&&count){e.preventDefault();selectResult((activeResult+(e.key==='ArrowDown'?1:activeResult<0?0:-1)+count)%count)}
 if(e.key==='Enter'&&count){e.preventDefault();searchResults.children[Math.max(0,activeResult)].click()}
});
search?.addEventListener('focusout',e=>{if(e.relatedTarget&&!search.contains(e.relatedTarget))closeSearch()});
listen(document,'pointerdown',e=>{if(!search?.contains(e.target))closeSearch()});
document.querySelectorAll('[data-search-query]').forEach(button=>button.addEventListener('click',()=>{searchInput.value=button.dataset.searchQuery;runSearch();searchInput.focus()}));
function updateClock(){const b=Number($('#speed').value),tau=10*Math.sqrt(1-b*b);outputMath($('#speed-value'),b.toFixed(2)+String.raw`\,c`);$('#traveller-bar').style.width=(tau*10)+'%';$('#traveller-bar').textContent=tau.toFixed(2)+' years';$('#clock-result').textContent=`The traveller records ${tau.toFixed(2)} years, ${(10-tau).toFixed(2)} fewer than the home clock.`}
if($('#speed')){$('#speed').addEventListener('input',updateClock);updateClock()}
function updateGPS(){const h=Number($('#altitude').value),R=6371000,r=R+h*1000,GM=3.986004418e14,c=299792458;const gr=GM/c**2*(1/R-1/r)*86400*1e6,sr=-GM/(2*r*c*c)*86400*1e6;const format=n=>(n>=0?'+':'−')+Math.abs(n).toFixed(2)+' μs/day';outputMath($('#altitude-value'),h.toLocaleString('en-US').replace(',','{,}')+String.raw`\;\mathrm{km}`);for(const [id,n] of [['gps-gr',gr],['gps-sr',sr],['gps-net',gr+sr]])outputMath($('#'+id),(n>=0?'+':'-')+Math.abs(n).toFixed(2)+String.raw`\;\mathrm{\mu s/day}`);$('#gps-reading').textContent=`At this altitude the orbiting clock ${gr+sr>=0?'gains':'loses'} ${Math.abs(gr+sr).toFixed(2)} microseconds per day relative to the surface clock.`}
if($('#altitude')){$('#altitude').addEventListener('input',updateGPS);updateGPS()}
function updateWave(){const phase=Number($('#wave-phase').value)/100*Math.PI,h=.35*Math.sin(phase);outputMath($('#phase-value'),(phase/Math.PI).toFixed(2)+String.raw`\pi`);document.querySelectorAll('.wave-dot').forEach(dot=>{const a=Number(dot.dataset.angle);dot.setAttribute('cx',240+90*Math.cos(a)*(1+h/2));dot.setAttribute('cy',130+90*Math.sin(a)*(1-h/2))})}
if($('#wave-phase')){$('#wave-phase').addEventListener('input',updateWave);updateWave()}
// Native, keyboard-accessible figure inspection keeps the surrounding page quiet.
const figureDialog=$('#figure-dialog');
document.querySelectorAll('[data-figure]').forEach(button=>button.addEventListener('click',()=>{
 const figure=button.closest('figure'),svg=figure.querySelector('.gr-figure').cloneNode(true);
 const ids=new Map([...svg.querySelectorAll('[id]')].map(e=>[e.id,'detail-'+e.id]));
 svg.querySelectorAll('*').forEach(el=>{for(const attr of [...el.attributes]){let value=attr.value;if(attr.name==='id')value=ids.get(value)||value;else if(attr.name==='aria-labelledby')value=value.split(' ').map(x=>ids.get(x)||x).join(' ');else value=value.replace(/url\(#([^\)]+)\)/g,(_,id)=>`url(#${ids.get(id)||id})`);el.setAttribute(attr.name,value);}});
 svg.setAttribute('aria-labelledby',svg.getAttribute('aria-labelledby').split(' ').map(x=>ids.get(x)||x).join(' '));
 $('#figure-detail').replaceChildren(svg);$('#figure-dialog-title').textContent=figure.querySelector('figcaption strong').textContent.replace(/\.$/,'');figureDialog.showModal();
}));
$('#figure-close')?.addEventListener('click',()=>figureDialog.close());
figureDialog?.addEventListener('click',e=>{if(e.target===figureDialog){const r=figureDialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)figureDialog.close()}});
document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{document.querySelectorAll('[data-filter]').forEach(b=>{const active=b===button;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active))});let count=0;document.querySelectorAll('.atlas-item').forEach(item=>{item.hidden=button.dataset.filter!=='all'&&item.dataset.category!==button.dataset.filter;if(!item.hidden)count++});$('.atlas-count').textContent=`${count} figures`;}));
let frame;
function readingProgress(){if(frame)return;frame=requestAnimationFrame(()=>{const extent=document.documentElement.scrollHeight-innerHeight;document.documentElement.style.setProperty('--progress',extent>0?Math.min(1,scrollY/extent):0);frame=null;});}
listen(window,'scroll',readingProgress,{passive:true});listen(window,'resize',readingProgress);readingProgress();

document.body.dataset.readingReady='true';
return ()=>{delete document.body.dataset.readingReady;listeners.forEach(off=>off());hidePreview();observer.disconnect();cancelAnimationFrame(frame)};
}
