const $=s=>document.querySelector(s);
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
function updateClock(){const b=Number($('#speed').value),tau=10*Math.sqrt(1-b*b);$('#speed-value').textContent=b.toFixed(2)+' c';$('#traveller-bar').style.width=(tau*10)+'%';$('#traveller-bar').textContent=tau.toFixed(2)+' years';$('#clock-result').textContent=`The traveller records ${tau.toFixed(2)} years, ${(10-tau).toFixed(2)} fewer than the home clock.`}
if($('#speed')){$('#speed').addEventListener('input',updateClock);updateClock()}
function updateGPS(){const h=Number($('#altitude').value),R=6371000,r=R+h*1000,GM=3.986004418e14,c=299792458;const gr=GM/c**2*(1/R-1/r)*86400*1e6,sr=-GM/(2*r*c*c)*86400*1e6;const format=n=>(n>=0?'+':'−')+Math.abs(n).toFixed(2)+' μs/day';$('#altitude-value').textContent=h.toLocaleString('en-US')+' km';$('#gps-gr').textContent=format(gr);$('#gps-sr').textContent=format(sr);$('#gps-net').textContent=format(gr+sr);$('#gps-reading').textContent=`At this altitude the orbiting clock ${gr+sr>=0?'gains':'loses'} ${Math.abs(gr+sr).toFixed(2)} microseconds per day relative to the surface clock.`}
if($('#altitude')){$('#altitude').addEventListener('input',updateGPS);updateGPS()}
function updateWave(){const phase=Number($('#wave-phase').value)/100*Math.PI,h=.35*Math.sin(phase);$('#phase-value').textContent=(phase/Math.PI).toFixed(2)+' π';document.querySelectorAll('.wave-dot').forEach(dot=>{const a=Number(dot.dataset.angle);dot.setAttribute('cx',240+90*Math.cos(a)*(1+h/2));dot.setAttribute('cy',130+90*Math.sin(a)*(1-h/2))})}
if($('#wave-phase')){$('#wave-phase').addEventListener('input',updateWave);updateWave()}
