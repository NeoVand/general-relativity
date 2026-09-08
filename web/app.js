const $=s=>document.querySelector(s);
const outputMath=(el,tex)=>{el.innerHTML=window.katex.renderToString(tex,{throwOnError:true})};
const storage={get:k=>{try{return localStorage.getItem(k)}catch{return null}},set:(k,v)=>{try{localStorage.setItem(k,v)}catch{}}};
if(storage.get('gr-theme'))document.documentElement.dataset.theme=storage.get('gr-theme');
if(storage.get('gr-type')==='large')document.documentElement.classList.add('large-type');
function themeLabel(){$('#theme-button')?.setAttribute('aria-label',`Switch to ${document.documentElement.dataset.theme==='dark'?'light':'dark'} appearance`)}themeLabel();
$('#theme-button')?.addEventListener('click',()=>{const dark=document.documentElement.dataset.theme!=='dark';document.documentElement.dataset.theme=dark?'dark':'light';storage.set('gr-theme',dark?'dark':'light');themeLabel()});
$('#type-button')?.setAttribute('aria-pressed',String(document.documentElement.classList.contains('large-type')));
$('#type-button')?.addEventListener('click',()=>{const large=document.documentElement.classList.toggle('large-type');storage.set('gr-type',large?'large':'normal');$('#type-button').setAttribute('aria-pressed',String(large))});
const sidebar=$('#book-navigation'),menu=$('#menu-button');
function closeMenu(){sidebar?.classList.remove('open');menu?.setAttribute('aria-expanded','false')}
menu?.addEventListener('click',()=>{const open=sidebar.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));if(open)sidebar.querySelector('a').focus()});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&sidebar?.classList.contains('open')){closeMenu();menu?.focus()}});
document.addEventListener('click',e=>{if(!sidebar?.contains(e.target)&&!menu?.contains(e.target))closeMenu()});
const page=document.body.dataset.page;
if(/^chapter-\d+$/.test(page))storage.set('gr-last-chapter',page);
const last=storage.get('gr-last-chapter');
if(last&&/^chapter-\d+$/.test(last)&&$('#continue-link')){$('#continue-link').href=`${last}.html`;$('#continue-link').textContent=`Continue Chapter ${Number(last.split('-')[1])} →`}
const current=sidebar?.querySelector('[aria-current]');if(current)sidebar.scrollTop=Math.max(0,current.offsetTop-sidebar.clientHeight*.45);
const observer=new IntersectionObserver(entries=>{for(const e of entries)if(e.isIntersecting){document.querySelectorAll('.section-rail a').forEach(a=>a.classList.toggle('current',a.hash===`#${e.target.id}`))}},{rootMargin:'-90px 0px -65% 0px'});
document.querySelectorAll('.prose h3[id]').forEach(h=>observer.observe(h));
let index;
const dialog=$('#search-dialog');
$('#search-button')?.addEventListener('click',async()=>{dialog.showModal();$('#search-input').focus();if(!index){$('#search-status').textContent='Loading the book index…';try{index=await fetch('search-index.json').then(r=>{if(!r.ok)throw Error();return r.json()});$('#search-status').textContent='Type two or more characters.';runSearch()}catch{$('#search-status').textContent='Search could not load. Chapter navigation is still available.'}}});
$('#search-close')?.addEventListener('click',()=>dialog.close());
dialog?.addEventListener('keydown',e=>{if(e.key==='Escape'){e.preventDefault();dialog.close()}});
dialog?.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close()}});
function runSearch(){if(!index)return;const query=$('#search-input').value.trim().toLowerCase();const target=$('#search-results');target.replaceChildren();if(query.length<2){$('#search-status').textContent='Type two or more characters.';return}const words=query.split(/\s+/);const hits=index.filter(p=>words.every(w=>(p.title+' '+p.text).toLowerCase().includes(w))).sort((a,b)=>Number(b.title.toLowerCase().includes(query))-Number(a.title.toLowerCase().includes(query)));$('#search-status').textContent=hits.length?`${hits.length} matching chapters`:'No matching chapters. Try another word.';for(const p of hits){const a=document.createElement('a');a.href=p.url;const title=document.createElement('strong');title.textContent=p.title;a.append(title);const small=document.createElement('small');let i=p.text.toLowerCase().indexOf(words[0]);i=Math.max(0,i-65);small.textContent=(i?'…':'')+p.text.slice(i,i+220).replace(/[#*_]/g,'')+'…';a.append(small);target.append(a)}}
$('#search-input')?.addEventListener('input',runSearch);
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
addEventListener('scroll',readingProgress,{passive:true});addEventListener('resize',readingProgress);readingProgress();
