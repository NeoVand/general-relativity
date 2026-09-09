import {insertLessons,insertSectionIllustrations} from './lesson-placement.mjs';
import fs from 'node:fs';
import path from 'node:path';
import {createHash} from 'node:crypto';
import MarkdownIt from 'markdown-it';
import katex from 'katex';
import {math as typeset, inline, legend} from './math-system.mjs';
import {scenes, scenePanel, icon} from './scenes.mjs';
import {lessons,validateCourse} from '../content/course.mjs';
import {labRecords} from '../web/lab-records.js';
import {relativityLabHTML} from './relativity-labs.mjs';
import {mechanicsExperienceHTML} from './mechanics-experience.mjs';
import {polarExperienceHTML,vectorFieldExperienceHTML} from './geometry-foundations.mjs';
import {parallelTransportHTML} from './parallel-transport-experience.mjs';
import {flowOrderHTML} from './flow-order-experience.mjs';
import {particleFlowHTML} from './particle-flow-experience.mjs';
import {fluidShearHTML} from './fluid-shear-experience.mjs';
import {lessonHTML,compassHTML,courseMapHTML,preparationHTML,notebookHTML,publicCourseData} from './course-content.mjs';
import {geometryExperienceHTML} from './geometry-experiences.mjs';
import {curvatureExperienceHTML} from './curvature-experiences.mjs';
import {mathPaletteCSS} from './math-palette.mjs';
validateCourse();

const out='site';
fs.mkdirSync(out,{recursive:true});
for(const name of fs.readdirSync(out)) fs.rmSync(path.join(out,name),{recursive:true,force:true});
fs.cpSync('web',out,{recursive:true});
// Content-addressed entry files prevent mixed old/new interfaces after a Pages
// deployment, while fonts and versioned third-party modules remain cacheable.
const clientAssets={};
const assetSources=new Map(fs.readdirSync('web').filter(name=>/\.(js|css)$/.test(name)).map(name=>[name,fs.readFileSync(`web/${name}`,'utf8')]));
assetSources.set('math-colors.css',mathPaletteCSS());
const hashing=new Set();
function hashAsset(name){
 if(clientAssets[name])return clientAssets[name];
 if(hashing.has(name))throw Error(`Cyclic browser entry dependency: ${name}`);
 hashing.add(name);
 const source=assetSources.get(name).replace(/(['"])\.\/([\w.-]+\.js)\1/g,(all,quote,dependency)=>assetSources.has(dependency)?`${quote}./${hashAsset(dependency)}${quote}`:all);
 const hash=createHash('sha256').update(source).digest('hex').slice(0,12);
 const ext=path.extname(name),file=`${path.basename(name,ext)}-${hash}${ext}`;
 fs.writeFileSync(`${out}/${file}`,source);clientAssets[name]=file;
 hashing.delete(name);return file;
}
for(const name of assetSources.keys())hashAsset(name);
fs.cpSync('assets',`${out}/assets`,{recursive:true});
fs.cpSync('node_modules/katex/dist',`${out}/assets/katex`,{recursive:true});
fs.mkdirSync(`${out}/assets/three`,{recursive:true});
for(const name of ['three.module.js','three.core.js'])fs.copyFileSync(`node_modules/three/build/${name}`,`${out}/assets/three/${name}`);
for(const [dir,name] of [['controls','OrbitControls'],['renderers','CSS2DRenderer']])fs.copyFileSync(`node_modules/three/examples/jsm/${dir}/${name}.js`,`${out}/assets/three/${name}.js`);
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const slug=s=>s.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
const md=new MarkdownIt({html:true,typographer:true});
let equationCount=0;
const errors=[];
const figureData=JSON.parse(fs.readFileSync('assets/figures/manifest.json','utf8'));
const guides=JSON.parse(fs.readFileSync('content/guides.json','utf8'));
// Titles can improve without breaking saved section links or lesson references.
const sectionIds=JSON.parse(fs.readFileSync('content/section-ids.json','utf8'));
let manuscript=fs.readFileSync('book.md','utf8');
const labPlacements=[...manuscript.matchAll(/<div data-lab-insert="([a-z-]+)"><\/div>/g)].map(match=>match[1]);
for(const id of new Set([...Object.keys(labRecords),...labPlacements]))if(!labRecords[id]||labPlacements.filter(value=>value===id).length!==1)throw Error(`Missing, duplicate, or unknown laboratory placement: ${id}`);
if(/[\u0000-\u0008\u000b\u000c\u000e-\u001f]|\r(?!\n)/.test(manuscript))throw new Error('The manuscript contains an unexpected control character; check escaped mathematical commands.');
manuscript=manuscript.replace(/<a id="[^"]+"><\/a>/g,'');
const sections=manuscript.split(/^## /m);
const pages=sections.slice(1).filter(s=>/^\d+\.|^Appendix /.test(s)).map(s=>{
 const [title,...lines]=s.split('\n');
 const chapter=title.match(/^(\d+)\./)?.[1];
 const appendix=title.match(/^Appendix ([A-Z])\./)?.[1];
 const id=chapter!==undefined?`chapter-${chapter}`:`appendix-${appendix.toLowerCase()}`;
 return {id,title,chapter,appendix,source:lines.join('\n').trim()};
});
if(!pages.some(p=>p.id==='chapter-0'))throw new Error('The canonical manuscript is missing Chapter 0.');
const preface=sections.slice(1).filter(s=>!/^(\d+\.|Appendix |Contents)/.test(s)).map(s=>'## '+s).join('\n');
pages.push({id:'reading-guide',title:'Reading guide & conventions',source:preface});
const short=p=>guides[p.chapter]?.title||p.title.replace(/^\d+\. |^Appendix [A-Z]\. /,'');
const rewriteLinks=html=>html.replace(/href="#(chapter-\d+|appendix-[a-z])"/g,(_,id)=>`href="${id}.html"`);
function render(source,page){
 const math=[];
 let masked=source.replace(/\$\$([\s\S]+?)\$\$/g,(_,tex)=>stash(tex,true));
 masked=masked.replace(/(?<!\\)\$([^$\n]+?)\$/g,(_,tex)=>stash(tex,false));
 if(/(?<!\\)\$/.test(masked))throw new Error(`${page.id}: unmatched math delimiter; use $$ for a displayed equation spanning lines.`);
 function stash(tex,display){
   const key=`GRMATHTOKEN${math.length}END`;
   try{math.push(typeset(tex.trim(),display,page.chapter));}
   catch(e){errors.push({page:page.id,tex,message:e.message});math.push(`<code class="math-error">${esc(tex)}</code>`);}
   if(display)equationCount++;
   return display?`\n\n<div class="equation" tabindex="0" role="region" aria-label="Equation; scroll horizontally if needed">${key}</div>\n\n`:key;
 }
 let html=md.render(masked).replace(/GRMATHTOKEN(\d+)END/g,(_,n)=>math[+n]);
 const used=new Map();
 const headings=[];
 html=html.replace(/<h([234])>([\s\S]*?)<\/h\1>/g,(_,level,inner)=>{
  const plain=inner.replace(/<[^>]*>/g,'').replace(/&[^;]+;/g,' ').trim();
  let id=(level==='3'&&sectionIds[plain.match(/^((?:\d+|[A-Z])\.\d+)\s/)?.[1]])||slug(plain);const count=used.get(id)||0;used.set(id,count+1);if(count)id+=`-${count}`;
  if(level==='3'||page.id==='reading-guide')headings.push({id,label:plain});
  return `<h${level} id="${id}">${inner}<a class="heading-link" href="#${id}" aria-label="Link to this section">#</a></h${level}>`;
 });
 html=rewriteLinks(html);
 // Tables remain native tables, with a bounded scroll region on narrow screens.
 html=html.replace(/<table>/g,'<div class="table-wrap" tabindex="0" role="region" aria-label="Table; scroll horizontally if needed"><table>').replace(/<\/table>/g,'</table></div>');
 return {html,headings};
}
const chapterIcons=['Calculator01Icon','Globe02Icon','ArrowUpDownIcon','Clock01Icon','RulerIcon','Route01Icon','Compass01Icon','Route01Icon','Orbit01Icon','Layers01Icon','ShapeCollectionIcon','Atom01Icon','GridIcon','FunctionIcon','ChartLineData01Icon','ArrowRight01Icon','Satellite01Icon','Orbit01Icon','WaveIcon','GalaxyIcon','Layers01Icon','MatrixIcon','Infinity01Icon','Atom01Icon','BookOpen01Icon'];
const chapterRole=n=>n<=5?'observer':n<=10?'geometry':n<=15?'curvature':n<=19?'matter':n<=23?'transport':'geometry';
const groups=[['FOUNDATIONS','0','5'],['DIFFERENTIAL GEOMETRY','6','10'],["MATTER AND EINSTEIN'S EQUATION",'11','15'],['PREDICTIONS AND APPLICATIONS','16','19'],['FURTHER PATHS','20','23'],['SYNTHESIS','24','24']];
// One navigation tree: the same group icons anchor the rail and open panel.
const navParts=[
 ['Foundations','Clocks, rulers & motion','RulerIcon'],
 ['Differential geometry','Connections, curvature & tides','Cone01Icon'],
 ['Matter & field equations','Sources, action & symmetry','FunctionIcon'],
 ['Applications','Orbits, black holes & cosmology','GalaxyIcon'],
 ['Further paths','Optional advanced introductions','Layers01Icon'],
 ['Synthesis','The main course comes together','BookOpen01Icon'],
];
function nav(active,headings=[]){
 const chapterLink=p=>`<div class="nav-chapter${p.id===active?' is-current':''}"><div class="nav-chapter-row"><a href="${p.id}.html" ${p.id===active?'aria-current="page"':''}><span class="nav-number">${p.appendix||String(p.chapter).padStart(2,'0')}</span><span>${esc(short(p))}</span></a>${p.id===active&&headings.length?`<button class="nav-section-toggle" aria-label="Show sections in this chapter" aria-expanded="false" aria-controls="nav-current-sections">${icon('ArrowDown01Icon')}</button>`:''}</div>${p.id===active&&headings.length?`<div class="nav-sections" id="nav-current-sections" inert><div><nav aria-label="Sections in this chapter">${headings.map(h=>`<a href="${p.id}.html#${h.id}">${esc(h.label.replace(/^\d+[.\d]*\s*/,''))}</a>`).join('')}</nav></div></div>`:''}</div>`;
 const group=(id,title,detail,glyph,role,items,range)=>{
  const current=items.some(p=>p.id===active);
  return `<section class="nav-group${current?' contains-current':''}" data-nav-group="${id}" style="--nav-accent:var(--${role})"><button class="nav-group-toggle" aria-label="${title}${range?`, chapter${range.includes('–')?'s':''} ${range}`:''}" aria-expanded="${current}" aria-controls="nav-group-${id}"><span class="nav-glyph">${icon(glyph)}</span><span class="nav-copy"><span>${title}</span><small>${detail}</small></span>${icon('ArrowDown01Icon','nav-caret')}</button><div class="nav-children${current?' is-expanded':''}" id="nav-group-${id}" ${current?'':'inert'}><div>${items.map(chapterLink).join('')}</div></div></section>`;
 };
 const link=(href,label,glyph)=>`<a class="nav-destination" href="${href}.html" aria-label="${label}" ${active===href?'aria-current="page"':''}><span class="nav-glyph">${icon(glyph)}</span><span class="nav-copy">${label}</span></a>`;
 return `<div class="nav-inner"><div class="nav-home"><button id="menu-button" class="icon-button" aria-expanded="false" aria-controls="book-navigation">${icon('SidebarLeftIcon')} <span>Contents</span></button><a class="nav-home-link nav-copy" href="index.html" ${active==='index'?'aria-current="page"':''}>General relativity</a></div><nav class="nav-scroll" aria-label="Book chapters">${groups.map(([,a,b],i)=>group(`part-${i}`,navParts[i][0],navParts[i][1],navParts[i][2],chapterRole(+a),pages.filter(p=>p.chapter!==undefined&&+p.chapter>=+a&&+p.chapter<=+b),a===b?a:`${a}–${b}`)).join('')}${group('notebook','Reference','Appendices & conventions','Notebook01Icon','geometry',pages.filter(p=>p.appendix),'')}</nav><nav class="nav-utilities" aria-label="Book resources">${link('figure-atlas','Visual atlas','CubeIcon')}${link('course-map','Learning path','Route01Icon')}${link('notebook','Field notebook','Notebook01Icon')}${link('credits','Edition notes','InformationCircleIcon')}</nav></div>`;
}
function layout(title,body,{active='',rail='',headings=[],description='A visual, step-by-step general relativity textbook, beginning with basic calculus and linear algebra.'}={}){
 return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="description" content="${esc(description)}"><meta name="theme-color" content="#102b3b"><title>${esc(title)} · General Relativity</title><link rel="icon" href="assets/favicon.svg" type="image/svg+xml"><script>try{document.documentElement.dataset.theme=localStorage.getItem("gr-theme")||(matchMedia("(prefers-color-scheme:dark)").matches?"dark":"light");if(localStorage.getItem("gr-sidebar")==="collapsed")document.documentElement.dataset.sidebar="collapsed";if(localStorage.getItem("gr-type")==="large")document.documentElement.classList.add("large-type")}catch{}</script><link rel="preload" href="assets/fonts/manrope-latin-wght-normal.woff2" as="font" type="font/woff2" crossorigin><link rel="preload" href="assets/fonts/newsreader-latin-wght-normal.woff2" as="font" type="font/woff2" crossorigin><link rel="stylesheet" href="assets/katex/katex.min.css"><link rel="stylesheet" href="${clientAssets['styles.css']}"><link rel="stylesheet" href="${clientAssets['course.css']}"><link rel="stylesheet" href="${clientAssets['visual-lessons.css']}">${['scene-controls.css','relativity-labs.css','mechanics-experience.css','geometry-foundations.css','parallel-transport-experience.css','particle-flow-experience.css','fluid-shear-experience.css','geometry-experiences.css','curvature-experiences.css','math-colors.css'].map(name=>`<link rel="stylesheet" href="${clientAssets[name]}">`).join('')}<script src="assets/katex/katex.min.js" defer></script><script src="${clientAssets['app.js']}" defer></script><script type="importmap">{"imports":{"three":"./assets/three/three.module.js"}}</script>${body.includes('data-scene=')?`<script type="module" src="${clientAssets['scenes.js']}"></script>`:''}</head><body data-page="${active}"><a class="skip-link" href="#main">Skip to reading</a><aside class="sidebar" id="book-navigation">${nav(active,headings)}</aside><button class="nav-scrim" aria-label="Close contents" tabindex="-1" hidden></button><nav class="nav-preview" id="nav-flyout" aria-label="Chapter shortcuts" hidden></nav><div class="reading-progress" aria-hidden="true"></div><div class="page"><header class="topbar"><div class="app-brand"><a href="index.html" class="app-logo desktop-logo" aria-label="General Relativity home">${icon('BlackHoleIcon')}</a><button id="mobile-menu-button" class="app-logo mobile-logo" aria-label="Expand contents" aria-expanded="false" aria-controls="book-navigation">${icon('BlackHoleIcon')}</button><a href="index.html" class="top-title">A FIELD GUIDE TO SPACETIME</a></div><div class="reading-tools"><div class="book-search" role="search"><div class="search-field"><button id="search-button" class="text-button" aria-label="Search the book" aria-expanded="false" aria-controls="search-popover">${icon('Search01Icon')}<span>Search</span></button><input id="search-input" type="search" role="combobox" aria-label="Search the book" aria-autocomplete="list" aria-expanded="false" aria-controls="search-results" placeholder="Find an idea…" autocomplete="off" hidden><button id="search-close" class="text-button" aria-label="Close search" hidden>${icon('Cancel01Icon')}</button></div><div id="search-popover" hidden><div class="search-caption"><span>EXPLORE THE BOOK</span>${icon('Orbit01Icon')}</div><p id="search-status" role="status"></p><div id="search-suggestions">${['Proper time','Geodesics','Curvature','Black holes'].map(q=>`<button type="button" data-search-query="${q}">${q}</button>`).join('')}</div><div id="search-results" role="listbox" aria-label="Matching chapters"></div><div class="search-hint"><span>↑ ↓ to explore · Enter to open</span><span>Esc to close</span></div></div></div><button id="type-button" class="text-button" aria-label="Increase reading text size" aria-pressed="false">${icon('TextFontIcon')}</button><button id="theme-button" class="text-button" aria-label="Switch to dark appearance">${icon('Moon02Icon','theme-moon')}${icon('Sun03Icon','theme-sun')}</button></div></header><div class="reading-layout"><main id="main">${body}</main>${rail?`<aside class="section-rail" aria-label="On this page">${rail}</aside>`:''}</div></div><dialog id="figure-dialog" aria-labelledby="figure-dialog-title"><div class="search-header"><h2 id="figure-dialog-title">Figure detail</h2><button id="figure-close" class="text-button">${icon('Cancel01Icon')}<span>Close</span></button></div><p class="figure-instruction">Scroll to explore at full resolution. Colors follow your reading theme.</p><div id="figure-detail"></div></dialog></body></html>`;
}
function figure(f){const svg=fs.readFileSync(`assets/figures/${f.id}.svg`,'utf8').replace('class="gr-figure"','class="gr-figure embedded"');return `<figure class="diagram" id="figure-${f.id}"><div class="figure-surface">${svg}<button class="figure-zoom" data-figure="${f.id}" aria-label="Enlarge figure: ${esc(f.title)}">${icon('ArrowExpand01Icon')}</button></div><figcaption><span class="figure-number">${String(f.number).padStart(2,'0')} /</span><div><strong>${esc(f.title)}.</strong> ${caption(f.caption,f.chapter)}</div></figcaption></figure>`;}
function chapterFigure(f){
 if(f.id==='perihelion-precession')return geometryExperienceHTML('precession',{reference:figure(f)});
 if(f.id==='curvature-count')return curvatureExperienceHTML('pairs',{reference:figure(f)});
 if(f.id==='ricci-weyl')return curvatureExperienceHTML('cloud',{reference:figure(f)});
 return figure(f);
}
const captionMath=JSON.parse(fs.readFileSync('content/caption-math.json','utf8'));
function caption(s,ch=''){
 const equations=[];let source=s;
 for(const [plain,tex] of Object.entries(captionMath).sort((a,b)=>b[0].length-a[0].length)){if(source.includes(plain)){source=source.replaceAll(plain,`CAPTIONMATH${equations.length}END`);equations.push(typeset(tex,false,ch));}}
 // Standalone symbols in captions are explicitly bounded by word separators.
 source=source.replace(/(?<![a-zA-Z])([πσθ]|S(?= is energy flux)|r(?=\.)|dr(?=\.))(?![a-zA-Z])/g,token=>{const tex=({π:'\\pi',σ:'\\sigma',θ:'\\theta'})[token]||token;return `CAPTIONMATH${equations.push(typeset(tex,false,ch))-1}END`;});
 return esc(source).replace(/CAPTIONMATH(\d+)END/g,(_,i)=>equations[+i]);
}
function lab(ch){
 if(ch==='3')return `<section class="lab" aria-labelledby="lab-title"><span class="eyebrow">TRY THE EQUATION</span><h3 id="lab-title">Two routes. One reunion.</h3><p>A traveller moves out and back at equal speed. The home clock records 10 years. We idealize the turnaround as instantaneous.</p><label for="speed">Speed as a fraction of light speed <output id="speed-value">0.60 c</output></label><input id="speed" type="range" min="0" max="0.99" step="0.01" value="0.6"><div class="clock-bars"><div><span>Home clock</span><div class="bar home" style="width:100%">10.00 years</div></div><div><span>Traveller’s clock</span><div class="bar travel" id="traveller-bar" style="width:80%">8.00 years</div></div></div><p id="clock-result" aria-live="polite">The traveller records 8.00 years, 2.00 fewer than the home clock.</p><p class="lab-note">${typeset(String.raw`\tau=10\sqrt{1-v^2/c^2}\;\mathrm{yr}`)}. This compares complete worldlines in flat spacetime.</p></section>`;
 if(ch==='16')return `<section class="lab" aria-labelledby="lab-title"><span class="eyebrow">TRY THE EQUATION</span><h3 id="lab-title">When does an orbiting clock gain time?</h3><p>Compare a circular-orbit clock with a stationary clock at Earth’s surface. This model neglects Earth’s rotation and multipoles.</p><label for="altitude">Altitude <output id="altitude-value">20,200 km</output></label><input id="altitude" type="range" min="200" max="36000" step="100" value="20200"><div class="lab-results"><div><small>Altitude contribution</small><strong id="gps-gr">+45.72 μs/day</strong></div><div><small>Motion contribution</small><strong id="gps-sr">−7.21 μs/day</strong></div><div><small>Net clock gain</small><strong id="gps-net">+38.51 μs/day</strong></div></div><p id="gps-reading" aria-live="polite"></p><p class="lab-note">${typeset(String.raw`\Delta\tau=\frac{GM}{c^2}\left(\frac1R-\frac{3}{2r}\right)(86{,}400\,\mathrm{s})`)}. The crossover altitude is ${typeset(String.raw`R/2\approx3{,}186\;\mathrm{km}`)}.</p></section>`;
 return '';
}
const search=[];let wordCount=0;
for(let i=0;i<pages.length;i++){
 const p=pages[i];const g=guides[p.chapter];const r=render(p.source,p);let html=r.html;
 wordCount+=p.source.split(/\s+/).length;
 const figures=figureData.filter(f=>String(f.chapter)===p.chapter);
 const chapterLessons=lessons.filter(l=>String(l.chapter)===p.chapter);
 const chapterScenes=scenes.filter(s=>String(s.chapter)===p.chapter&&s.id!=='sphere');
 const referenceByLesson={'a-metric-converts-labels-into-lengths':'polar-metric','differentiate-the-arrow-not-its-address':'moving-basis','carry-a-direction-without-turning-it':'sphere-holonomy','horizon-directions':'horizon-cones'};
 const references=new Set(chapterLessons.map(l=>referenceByLesson[l.id]).filter(Boolean));
 const paired=new Set(chapterScenes.filter(s=>s.id!=='earth').map(s=>s.figure));
 // Place prerequisites and worked practice on their reviewed sides of the exposition.
 html=insertLessons(html,chapterLessons,h=>md.renderInline(h),l=>lessonHTML(l,render,referenceByLesson[l.id]?figure(figures.find(f=>f.id===referenceByLesson[l.id])):''));
 if(p.chapter==='0')html+='<aside id="dimensions-before-symbols" class="relocated-lesson" data-no-narration><p>The lesson “Units belong to coordinates, too” now follows its preparation in Chapter 4. <a href="chapter-4.html#dimensions-before-symbols">Continue to the relocated lesson →</a></p></aside>';
 for(const id of Object.keys(labRecords)){
  const marker=`<div data-lab-insert="${id}"></div>`;
  if(html.includes(marker)){
   if(Number(p.chapter)!==labRecords[id].chapter)throw Error(`Laboratory ${id} is in the wrong chapter`);
   html=html.replace(marker,relativityLabHTML(id,render));
  }
 }
 for(const type of ['energy','phase'])html=html.replace(`<div data-mechanics-insert="${type}"></div>`,()=>mechanicsExperienceHTML(type));
 html=html.replace('<div data-foundation-insert="polar"></div>',()=>polarExperienceHTML());
 html=html.replace('<div data-foundation-insert="vector-field"></div>',()=>vectorFieldExperienceHTML());
 html=html.replace('<div data-foundation-insert="transport"></div>',()=>parallelTransportHTML());
 html=html.replace('<div data-foundation-insert="transport-routes"></div>',()=>parallelTransportHTML(true));
 html=html.replace('<div data-foundation-insert="flow-order"></div>',()=>flowOrderHTML());
 html=html.replace('<div data-foundation-insert="particle-flow"></div>',()=>particleFlowHTML());
 html=html.replace('<div data-foundation-insert="fluid-shear"></div>',()=>fluidShearHTML());
 if(p.chapter==='8')html=html.replace('<section class="guided-lesson" id="carry-a-direction-without-turning-it"','<span id="scene-sphere"></span><section class="guided-lesson" id="carry-a-direction-without-turning-it"');
 if(p.chapter==='4')html=html.replace('<section class="guided-lesson" id="two-maps-one-sphere"',geometryExperienceHTML('manifold')+'<section class="guided-lesson" id="two-maps-one-sphere"');
 // A picture follows the explanation of its quantities, including on first load.
 const sceneSections={earth:'1.10',covector:'2.4',cone:'3.3',tides:'10.5',embedding:'17.2',wave:'18.4',expansion:'19.1',slices:'20.2'};
 const openingSections={
  'local-prediction':'0.1','free-fall-comparison':'1.1',
  'rindler-worldlines':'5.3','connection-cancellation':'7.5',
  'ricci-weyl':'9.3','stress-energy':'11.1','einstein-anatomy':'12.1',
  'action-variation':'13.1','action-product-rule':'14.7','killing-energy':'15.4',
  'cartan-comparison':'21.5','focusing-caustic':'22.5','effective-theory':'23.2','calculation-map':'24.1',
 };
 for(const f of figures)if(!f.after&&!paired.has(f.id)&&!references.has(f.id)&&!openingSections[f.id])throw Error(`Unreviewed opening figure: ${f.id}`);
 const illustrations=figures.filter(f=>!paired.has(f.id)&&!references.has(f.id)).map(f=>({
  section:f.after||openingSections[f.id],html:chapterFigure(f),inside:f.id==='historical-timeline'?'details.history-note':undefined,
 }));
 for(const scene of chapterScenes){
  if(!sceneSections[scene.id])throw Error(`Unreviewed scene placement: ${scene.id}`);
  illustrations.push({section:sceneSections[scene.id],html:scenePanel(scene,{diagram:paired.has(scene.figure)?figure(figures.find(f=>f.id===scene.figure)):''})});
 }
 html=insertSectionIllustrations(html,illustrations);
 const guide=g?`<details class="chapter-preparation"><summary>Before you begin</summary><div class="chapter-guide"><div><span class="eyebrow">THE QUESTION</span><p>${inline(g.question,p.chapter)}</p></div><div><span class="eyebrow">BRING WITH YOU</span>${preparationHTML(p.chapter,render)}</div><p class="chapter-payoff"><strong>By the end:</strong> ${inline(g.payoff,p.chapter)}</p></div></details>`:'';
 const check=g?`<section class="takeaway"><h2>The idea to keep</h2><p>${inline(g.takeaway,p.chapter)}</p><details class="checkpoint"><summary>${inline(g.check,p.chapter)}</summary><p>${inline(g.answer,p.chapter)}</p></details></section>`:'';
 const label=p.chapter!==undefined?`CHAPTER ${String(p.chapter).padStart(2,'0')} ${+p.chapter>=20&&+p.chapter<=23?'· OPTIONAL DEEPER TRAIL':''}`:p.appendix?`APPENDIX ${p.appendix}`:'THE READING GUIDE';
 const heading=p.title.replace(/^\d+\. |^Appendix [A-Z]\. /,'');
 const prev=pages[i-1],next=pages[i+1];
 const body=`<article><header class="chapter-header"><a class="breadcrumb" href="index.html">The book / ${esc(label.toLowerCase())}</a><div class="eyebrow">${label}</div><h1>${esc(g?.title||heading)}</h1>${g?`<p class="chapter-deck">${inline(g.deck,p.chapter)}</p>`:''}</header><div class="chapter-tools">${compassHTML(p.chapter,guides)}${guide}</div><div class="prose">${html}</div>${lab(p.chapter)}${check}<nav class="page-turn" aria-label="Chapter navigation">${prev?`<a href="${prev.id}.html"><small>← PREVIOUS</small>${esc(short(prev))}</a>`:'<span></span>'}${next?`<a href="${next.id}.html"><small>NEXT →</small>${esc(short(next))}</a>`:''}</nav></article>`;
 const rail=`<div class="eyebrow">IN THIS CHAPTER</div><nav>${r.headings.map(h=>`<a href="#${h.id}">${esc(h.label)}</a>`).join('')}</nav><a class="rail-top" href="#main">Back to top ↑</a>`;
 fs.writeFileSync(`${out}/${p.id}.html`,layout(g?.title||heading,body,{active:p.id,rail,headings:r.headings}));
 search.push({title:g?.title||heading,url:`${p.id}.html`,summary:g?.deck||'',text:(p.source+'\n'+chapterLessons.map(l=>l.title+' '+l.question+' '+l.intuition+' '+l.formal).join('\n')).replace(/\$\$[\s\S]*?\$\$/g,' ').replace(/(?<!\\)\$([^$\n]+?)\$/g,' ').replace(/<[^>]+>/g,'')});
}
const heroMath=typeset(String.raw`R_{\mu\nu}-\tfrac12 Rg_{\mu\nu}+\Lambda g_{\mu\nu}=\frac{8\pi G_N}{c^4}T_{\mu\nu}`,true,12);
const heroCompact=typeset(String.raw`\begin{gathered}R_{\mu\nu}-\tfrac12 Rg_{\mu\nu}+\Lambda g_{\mu\nu}\\=\frac{8\pi G_N}{c^4}T_{\mu\nu}\end{gathered}`,true,12);
const equationPieces=[
 [String.raw`R_{\mu\nu}`,'Ricci tensor','9','curvature'],
 ['R','Ricci scalar','9','curvature'],
 [String.raw`g_{\mu\nu}`,'Metric tensor','4','geometry'],
 [String.raw`\Lambda`,'Cosmological constant','12','neutral'],
 [String.raw`\dfrac{8\pi G_N}{c^4}`,'Einstein constant','12','neutral'],
 [String.raw`T_{\mu\nu}`,'Stress–energy tensor','11','matter'],
];
const equationKey=`<div class="equation-pieces">${equationPieces.map(([tex,label,ch,role])=>`<a class="equation-piece math-${role}" href="chapter-${ch}.html"><span class="piece-symbol">${typeset(tex,false,12)}</span><span class="piece-label">${label}</span></a>`).join('')}</div>`;
const contents=groups.map(([name,a,b])=>`<section class="contents-group"><div class="eyebrow">${name}</div>${pages.filter(p=>p.chapter!==undefined&&+p.chapter>=+a&&+p.chapter<=+b).map(p=>`<a class="chapter-card" href="${p.id}.html"><span class="chapter-visual math-${chapterRole(+p.chapter)}" aria-hidden="true">${icon(chapterIcons[+p.chapter])}<span class="card-number">${String(p.chapter).padStart(2,'0')}</span></span><div><h3>${esc(short(p))}</h3><p>${esc(guides[p.chapter]?.question||'')}</p></div><span class="card-arrow">${icon('ArrowUpRight01Icon')}</span></a>`).join('')}</section>`).join('');
const home=`<section class="cover"><div class="cover-copy"><div class="eyebrow">AN EXPLORABLE BOOK / 25 CHAPTERS</div><h1>Gravity is<br><em>geometry.</em></h1><p class="cover-subtitle">General relativity,<br>from the inside out.</p><p class="cover-intro">Begin with a clock and a falling object.<br>Build your way to the shape of spacetime.</p><a href="chapter-0.html" class="start-link" id="continue-link">Start the journey ${icon('ArrowRight01Icon')}</a><p class="cover-prereq">Basic calculus. Linear algebra. Curiosity.</p></div><div class="cover-model">${scenePanel(scenes.find(s=>s.id==='earth'),{hero:true})}</div><details class="cover-equation" data-no-narration><summary>Already know some relativity? Explore Einstein’s equation</summary><span class="eyebrow">EINSTEIN’S FIELD EQUATION</span><div class="cover-math-wide">${heroMath}</div><div class="cover-math-compact">${heroCompact}</div>${equationKey}</details></section><section id="contents" class="book-contents"><div class="section-heading"><div><h2>Contents</h2><a class="contents-path" href="course-map.html">Choose a learning path →</a></div>${icon('BookOpen01Icon')}</div>${contents}<div class="appendix-links">${pages.filter(p=>p.appendix).map(p=>`<a href="${p.id}.html">${icon('BookOpen01Icon')}<span>${esc(p.title)}</span></a>`).join('')}</div></section>`;
fs.writeFileSync(`${out}/index.html`,layout('From the Inside Out',home,{active:'index'}));
const atlas=`<article class="atlas"><header class="chapter-header"><div class="eyebrow">THE VISUAL ATLAS / AN EXPLORABLE COLLECTION</div><h1>Give the symbols<br><em>some space.</em></h1><p class="chapter-deck">Turn a surface. Follow a worldline. Watch a direction change. Geometry becomes clearer when you can move around it.</p></header>${scenePanel(scenes.find(s=>s.id==='earth'))}<section class="atlas-labs"><div class="section-heading"><div><span class="eyebrow">SURFACES, ORBITS, WAVES & CURVATURE</span><h2>Enter the spacetime labs</h2></div>${icon('CubeIcon')}</div><div class="lab-directory">${Object.values(labRecords).map(l=>`<a href="chapter-${l.chapter}.html#lab-${l.id}"><span class="lab-card-top"><span>CALCULATE & COMPARE</span>${icon('ArrowUpRight01Icon')}</span><h3>${esc(l.title)}</h3><p>${esc(l.question)}</p><span class="lab-card-bottom">Chapter ${l.chapter} · Numerical experiment</span></a>`).join('')}${[[4,'manifold-chart-experience','A curved world. A flat address.','Link a smooth surface to two overlapping coordinate charts.'],[8,'curvature-pair-explorer','Twenty ways to curve','Follow the symmetries that turn 256 slots into 20 independent components.'],[9,'curvature-cloud-explorer','Volume and shape','Compare all three tidal directions in a freely falling cloud.'],[16,'orbital-precession-experience','Mercury remembers','Watch the closest approach advance from orbit to orbit.']].map(([ch,id,title,deck])=>`<a href="chapter-${ch}.html#${id}"><span class="lab-card-top"><span>EXPLORE</span>${icon('ArrowUpRight01Icon')}</span><h3>${title}</h3><p>${deck}</p><span class="lab-card-bottom">${icon('CubeIcon')} Chapter ${ch} · Interactive model</span></a>`).join('')}${scenes.map((s,i)=>`<a href="${s.id==='sphere'?'figure-atlas.html':`chapter-${s.chapter}.html`}#scene-${s.id}"><span class="lab-card-top"><span>LAB ${String(i+1).padStart(2,'0')}</span>${icon('ArrowUpRight01Icon')}</span><h3>${s.title}</h3><p>${esc(s.deck)}</p><span class="lab-card-bottom">${icon('CubeIcon')} Chapter ${String(s.chapter).padStart(2,'0')} · Interactive 3D</span></a>`).join('')}</div></section>${scenePanel(scenes.find(s=>s.id==='sphere'),{diagram:figure(figureData.find(f=>f.id==='sphere-holonomy')).replaceAll('sphere-holonomy','reference-sphere-holonomy')})}<section class="atlas-vectors"><div class="section-heading"><div><span class="eyebrow">40 STUDIES IN GEOMETRY & PHYSICS</span><h2>The vector collection</h2></div><span>LaTeX throughout</span></div><div class="atlas-filters" role="group" aria-label="Filter figures"><button class="active" data-filter="all" aria-pressed="true">All figures</button><button data-filter="foundations" aria-pressed="false">Foundations · 0–5</button><button data-filter="geometry" aria-pressed="false">Geometry · 6–15</button><button data-filter="universe" aria-pressed="false">The universe · 16–24</button></div><p class="atlas-count" role="status">40 figures</p><div class="atlas-grid">${figureData.map(f=>`<section class="atlas-item" data-category="${f.chapter<=5?'foundations':f.chapter<=15?'geometry':'universe'}">${figure(f)}<a class="atlas-back" href="chapter-${f.chapter}.html#figure-${f.id}">Read Chapter ${f.chapter} ${icon('ArrowRight01Icon')}</a></section>`).join('')}</div></section></article>`;
fs.writeFileSync(`${out}/figure-atlas.html`,layout('The visual atlas',atlas,{active:'figure-atlas'}));
const design=`<article><header class="chapter-header"><div class="eyebrow">THE DESIGN CONVENTIONS</div><h1>A language<br><em>you can see.</em></h1><p class="chapter-deck">Color is another explanation. It should help you follow an idea across the page, through an equation, and into a figure.</p></header>${legend()}<div class="prose"><h2>Identity before decoration</h2><p>The metric, connection, curvature, stress–energy, and observer each have a persistent identity. We color identified symbols—not whole equations. Operations and indices keep their quiet ink so you can follow what changes and what contracts.</p><div class="equation">${heroMath}</div><p>Read from left to right: violet curvature, a teal metric, and amber stress–energy. The cosmological constant stays neutral; multiplying a metric does not make it a new kind of metric. The coupling constant is neutral too.</p><h2>Related objects, distinct shades</h2><p>Curvature has a violet family, with distinguishable shades for the full Riemann tensor, its Ricci contraction, its scalar trace, and its Weyl part. The volume measure stays close to metric green; the connection stays blue; density and pressure use different warm shades. A four-velocity has the observer’s rose. These refinements follow mathematical roles, so the same letter can remain neutral when its meaning is ambiguous.</p><p>${typeset(String.raw`R_{\alpha\beta\mu\nu}\quad R_{\mu\nu}\quad R\quad C_{\alpha\beta\mu\nu}`,false,9)}</p><h2>Context matters more than a letter</h2><p>The scalar ${typeset('R',false,12)} is violet in curvature derivations. Earth’s radius ${typeset('R')} is neutral in the clock experiment. An unindexed ${typeset('T')} might mean a time interval or a trace, so automatic coloring leaves it neutral. The indexed stress–energy tensor ${typeset(String.raw`T_{\mu\nu}`,false,11)} is amber. A superscript does not by itself make an object a tensor.</p><h2>Color cannot do the work alone</h2><p>Each diagram also uses names, arrowheads, distinct positions, solid and dashed paths, and explanatory captions. Equations retain their original notation and accessible MathML. Both reading themes use their own contrast-conscious palette. Mathematical labels in vector figures are generated from explicit LaTeX into scalable glyph paths; labels in 3D scenes use the same KaTeX typography as the book.</p><h2>Three dimensions need an honest caption</h2><p>We use depth where it reveals a missing direction: a light cone with two space axes, a sphere’s tangent plane, two independent tidal squeezes, or a family of spatial slices. Every model states what has been suppressed or exaggerated. A black-hole embedding diagram reproduces spatial distances on one slice; its height is neither time nor a gravitational force.</p><h2>Make the experiment yours</h2><p>Drag to orbit or pinch to zoom. The other labs also provide rotation and reset buttons. Sliders work with the keyboard. The Earth grid moves automatically. Focus the scene and press Space to pause or resume it. It respects reduced-motion preferences and stops rendering when out of view. The already-deformed grid flows continuously, with fresh reference lines arriving from beyond the view. Mercury and the wave have explicit play and pause controls. Their animations stop when out of view; reduced-motion preferences start them paused. If WebGL is unavailable, the corresponding vector figure remains available. Enlarge any vector figure to inspect its labels without shrinking its mathematics.</p></div></article>`;
fs.writeFileSync(`${out}/visual-language.html`,layout('The language of color',design,{active:'visual-language'}));
let creditHtml=render(fs.readFileSync('content/credits.md','utf8'),{id:'credits'}).html;
fs.writeFileSync(`${out}/credits.html`,layout('Images & edition notes',`<article><header class="chapter-header"><div class="eyebrow">PROVENANCE & CRAFT</div><h1>Images & edition notes</h1></header><div class="prose">${creditHtml}</div></article>`));
for(const [id,title,body] of [['course-map','Learning path',courseMapHTML(guides,render)],['notebook','Field notebook',notebookHTML()]]){fs.writeFileSync(`${out}/${id}.html`,layout(title,body,{active:id}));search.push({title,url:`${id}.html`,summary:title==='Learning path'?'Choose a route with explicit prerequisites':'Your observations and review queue',text:title});}
fs.writeFileSync(`${out}/course-data.json`,JSON.stringify(publicCourseData(render,guides)));
fs.writeFileSync(`${out}/search-index.json`,JSON.stringify(search));
fs.writeFileSync(`${out}/.nojekyll`,'');
fs.writeFileSync(`${out}/build-report.json`,JSON.stringify({pages:pages.length,chapters:pages.filter(p=>p.chapter!==undefined).length,figures:figureData.length,displayEquations:equationCount,interactiveScenes:scenes.length,visualLessons:lessons.filter(l=>l.visual).length,geometryExperiences:2,curvatureExperiences:2,workedBridges:lessons.length,words:wordCount,mathErrors:errors},null,2));
if(errors.length){console.error(JSON.stringify(errors,null,2));process.exit(1);}
console.log(`Built ${pages.length} reading pages, ${figureData.length} figures, ${equationCount} displayed equations; no math errors.`);
