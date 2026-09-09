import fs from 'node:fs';
import path from 'node:path';
import {createHash} from 'node:crypto';
import MarkdownIt from 'markdown-it';
import katex from 'katex';
import {math as typeset, inline, legend} from './math-system.mjs';
import {scenes, scenePanel, icon} from './scenes.mjs';

const out='site';
fs.mkdirSync(out,{recursive:true});
for(const name of fs.readdirSync(out)) fs.rmSync(path.join(out,name),{recursive:true,force:true});
fs.cpSync('web',out,{recursive:true});
// Content-addressed entry files prevent mixed old/new interfaces after a Pages
// deployment, while fonts and versioned third-party modules remain cacheable.
const clientAssets={};
for(const name of ['styles.css','app.js','earth-flow.js','scenes.js']){
 const source=Buffer.from(fs.readFileSync(`web/${name}`,'utf8').replace("'./earth-flow.js'",`'./${clientAssets['earth-flow.js']||'earth-flow.js'}'`)),hash=createHash('sha256').update(source).digest('hex').slice(0,12);
 const ext=path.extname(name),file=`${path.basename(name,ext)}-${hash}${ext}`;
 fs.writeFileSync(`${out}/${file}`,source);clientAssets[name]=file;
}
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
let manuscript=fs.readFileSync('book.md','utf8');
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
  let id=slug(plain);const count=used.get(id)||0;used.set(id,count+1);if(count)id+=`-${count}`;
  if(level==='3'||page.id==='reading-guide')headings.push({id,label:plain});
  return `<h${level} id="${id}">${inner}<a class="heading-link" href="#${id}" aria-label="Link to this section">#</a></h${level}>`;
 });
 html=rewriteLinks(html);
 // Tables remain native tables, with a bounded scroll region on narrow screens.
 html=html.replace(/<table>/g,'<div class="table-wrap" tabindex="0" role="region" aria-label="Table; scroll horizontally if needed"><table>').replace(/<\/table>/g,'</table></div>');
 return {html,headings};
}
const chapterIcons=['Calculator01Icon','Globe02Icon','ArrowUpDownIcon','Clock01Icon','RulerIcon','Route01Icon','Compass01Icon','Route01Icon','Orbit01Icon','Layers01Icon','ShapeCollectionIcon','Atom01Icon','GridIcon','FunctionIcon','ChartLineData01Icon','ArrowRight01Icon','Satellite01Icon','Orbit01Icon','WaveIcon','GalaxyIcon','Layers01Icon','MatrixIcon','Infinity01Icon','Atom01Icon','BookOpen01Icon'];
const chapterRole=n=>n<=5?'observer':n<=12?'geometry':n<=15?'curvature':n<=19?'matter':'transport';
const groups=[['BEGIN WITH MEASUREMENTS','0','5'],['BUILD THE LANGUAGE OF CURVATURE','6','12'],['ASK WHY THIS EQUATION','13','15'],['PUT SPACETIME TO WORK','16','19'],['FOLLOW THE DEEPER TRAILS','20','24']];
// One navigation tree: the same group icons anchor the rail and open panel.
const navParts=[
 ['Measurements','Clocks, rulers & motion','RulerIcon'],
 ['Curvature','The language of geometry','Orbit01Icon'],
 ['The field equation','Why this equation?','FunctionIcon'],
 ['The universe','Spacetime at work','GalaxyIcon'],
 ['Deeper trails','Optional explorations','Layers01Icon'],
];
function nav(active,headings=[]){
 const chapterLink=p=>`<div class="nav-chapter${p.id===active?' is-current':''}"><div class="nav-chapter-row"><a href="${p.id}.html" ${p.id===active?'aria-current="page"':''}><span class="nav-number">${p.appendix||String(p.chapter).padStart(2,'0')}</span><span>${esc(short(p))}</span></a>${p.id===active&&headings.length?`<button class="nav-section-toggle" aria-label="Show sections in this chapter" aria-expanded="false" aria-controls="nav-current-sections">${icon('ArrowDown01Icon')}</button>`:''}</div>${p.id===active&&headings.length?`<div class="nav-sections" id="nav-current-sections" inert><div><nav aria-label="Sections in this chapter">${headings.map(h=>`<a href="${p.id}.html#${h.id}">${esc(h.label.replace(/^\d+[.\d]*\s*/,''))}</a>`).join('')}</nav></div></div>`:''}</div>`;
 const group=(id,title,detail,glyph,role,items,range)=>{
  const current=items.some(p=>p.id===active);
  return `<section class="nav-group${current?' contains-current':''}" data-nav-group="${id}" style="--nav-accent:var(--${role})"><button class="nav-group-toggle" aria-label="${title}${range?`, chapters ${range}`:''}" aria-expanded="${current}" aria-controls="nav-group-${id}"><span class="nav-glyph">${icon(glyph)}</span><span class="nav-copy"><span>${title}</span><small>${detail}</small></span>${icon('ArrowDown01Icon','nav-caret')}</button><div class="nav-children${current?' is-expanded':''}" id="nav-group-${id}" ${current?'':'inert'}><div>${items.map(chapterLink).join('')}</div></div></section>`;
 };
 const link=(href,label,glyph)=>`<a class="nav-destination" href="${href}.html" aria-label="${label}" ${active===href?'aria-current="page"':''}><span class="nav-glyph">${icon(glyph)}</span><span class="nav-copy">${label}</span></a>`;
 return `<div class="nav-inner"><div class="nav-home">${link('index','General relativity','BookOpen01Icon')}</div><nav class="nav-scroll" aria-label="Book chapters">${groups.map(([,a,b],i)=>group(`part-${i}`,navParts[i][0],navParts[i][1],navParts[i][2],chapterRole(+a),pages.filter(p=>p.chapter!==undefined&&+p.chapter>=+a&&+p.chapter<=+b),`${a}–${b}`)).join('')}${group('notebook','Notebook','Appendices & reference','Notebook01Icon','geometry',pages.filter(p=>p.appendix),'')}</nav><nav class="nav-utilities" aria-label="Book resources">${link('figure-atlas','Visual atlas','CubeIcon')}${link('reading-guide','Reading guide','Compass01Icon')}${link('visual-language','Color & notation','ColorsIcon')}${link('credits','Edition notes','InformationCircleIcon')}</nav></div>`;
}
function layout(title,body,{active='',rail='',headings=[],description='A visual, step-by-step general relativity textbook, beginning with basic calculus and linear algebra.'}={}){
 return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="description" content="${esc(description)}"><meta name="theme-color" content="#102b3b"><title>${esc(title)} · General Relativity</title><link rel="icon" href="assets/favicon.svg" type="image/svg+xml"><script>try{document.documentElement.dataset.theme=localStorage.getItem("gr-theme")||(matchMedia("(prefers-color-scheme:dark)").matches?"dark":"light");if(localStorage.getItem("gr-sidebar")==="collapsed")document.documentElement.dataset.sidebar="collapsed";if(localStorage.getItem("gr-type")==="large")document.documentElement.classList.add("large-type")}catch{}</script><link rel="preload" href="assets/fonts/manrope-latin-wght-normal.woff2" as="font" type="font/woff2" crossorigin><link rel="preload" href="assets/fonts/newsreader-latin-wght-normal.woff2" as="font" type="font/woff2" crossorigin><link rel="stylesheet" href="assets/katex/katex.min.css"><link rel="stylesheet" href="${clientAssets['styles.css']}"><script src="assets/katex/katex.min.js" defer></script><script src="${clientAssets['app.js']}" defer></script><script type="importmap">{"imports":{"three":"./assets/three/three.module.js"}}</script>${body.includes('data-scene=')?`<script type="module" src="${clientAssets['scenes.js']}"></script>`:''}</head><body data-page="${active}"><a class="skip-link" href="#main">Skip to reading</a><aside class="sidebar" id="book-navigation">${nav(active,headings)}</aside><button class="nav-scrim" aria-label="Close contents" tabindex="-1" hidden></button><div class="nav-preview" aria-hidden="true" hidden></div><div class="reading-progress" aria-hidden="true"></div><div class="page"><header class="topbar"><button id="menu-button" class="icon-button" aria-expanded="false" aria-controls="book-navigation">${icon('SidebarLeftIcon')} <span>Contents</span></button><a href="index.html" class="top-title">A FIELD GUIDE TO SPACETIME</a><div class="reading-tools"><div class="book-search" role="search"><div class="search-field"><button id="search-button" class="text-button" aria-label="Search the book" aria-expanded="false" aria-controls="search-popover">${icon('Search01Icon')}<span>Search</span></button><input id="search-input" type="search" role="combobox" aria-label="Search the book" aria-autocomplete="list" aria-expanded="false" aria-controls="search-results" placeholder="Find an idea…" autocomplete="off" hidden><button id="search-close" class="text-button" aria-label="Close search" hidden>${icon('Cancel01Icon')}</button></div><div id="search-popover" hidden><div class="search-caption"><span>EXPLORE THE BOOK</span>${icon('Orbit01Icon')}</div><p id="search-status" role="status"></p><div id="search-suggestions">${['Proper time','Geodesics','Curvature','Black holes'].map(q=>`<button type="button" data-search-query="${q}">${q}</button>`).join('')}</div><div id="search-results" role="listbox" aria-label="Matching chapters"></div><div class="search-hint"><span>↑ ↓ to explore · Enter to open</span><span>Esc to close</span></div></div></div><button id="type-button" class="text-button" aria-label="Increase reading text size" aria-pressed="false">${icon('TextFontIcon')}</button><button id="theme-button" class="text-button" aria-label="Switch to dark appearance">${icon('Moon02Icon','theme-moon')}${icon('Sun03Icon','theme-sun')}</button></div></header><div class="reading-layout"><main id="main">${body}</main>${rail?`<aside class="section-rail" aria-label="On this page">${rail}</aside>`:''}</div></div><dialog id="figure-dialog" aria-labelledby="figure-dialog-title"><div class="search-header"><h2 id="figure-dialog-title">Figure detail</h2><button id="figure-close" class="text-button">${icon('Cancel01Icon')}<span>Close</span></button></div><p class="figure-instruction">Scroll to explore at full resolution. Colors follow your reading theme.</p><div id="figure-detail"></div></dialog></body></html>`;
}
function figure(f){const svg=fs.readFileSync(`assets/figures/${f.id}.svg`,'utf8').replace('class="gr-figure"','class="gr-figure embedded"');return `<figure class="diagram" id="figure-${f.id}"><div class="figure-surface">${svg}<button class="figure-zoom" data-figure="${f.id}" aria-label="Enlarge figure: ${esc(f.title)}">${icon('ArrowExpand01Icon')}</button></div><figcaption><span class="figure-number">${String(f.number).padStart(2,'0')} /</span><div><strong>${esc(f.title)}.</strong> ${caption(f.caption,f.chapter)}</div></figcaption></figure>`;}
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
 if(ch==='18')return `<section class="lab" aria-labelledby="lab-title"><span class="eyebrow">TRY THE GEOMETRY</span><h3 id="lab-title">A wave changes separation</h3><p>Move through one cycle of a pure plus-polarized wave. Dots represent freely falling test particles; distances are shown in a local detector frame.</p><label for="wave-phase">Phase <output id="phase-value">0.00 π</output></label><input id="wave-phase" type="range" min="0" max="200" step="1" value="0"><svg id="wave-ring" viewBox="0 0 480 260" role="img" aria-label="A ring of test particles changing into alternating horizontal and vertical ellipses"><circle cx="240" cy="130" r="90" fill="none" stroke="#869ba4" stroke-dasharray="4 5"/>${Array.from({length:16},(_,i)=>`<circle class="wave-dot" data-angle="${i*2*Math.PI/16}" cx="${240+90*Math.cos(i*2*Math.PI/16)}" cy="${130+90*Math.sin(i*2*Math.PI/16)}" r="5" fill="var(--observer)"/>`).join('')}</svg><p class="lab-note">${typeset(String.raw`x=x_0(1+h_+/2),\quad y=y_0(1-h_+/2)`)}. Strain is exaggerated to 0.35 for visibility; this is a first-order model. Area is unchanged only to first order.</p></section>`;
 return '';
}
const search=[];let wordCount=0;
for(let i=0;i<pages.length;i++){
 const p=pages[i];const g=guides[p.chapter];const r=render(p.source,p);let html=r.html;
 wordCount+=p.source.split(/\s+/).length;
 const figures=figureData.filter(f=>String(f.chapter)===p.chapter);
 for(const f of figures){
  if(f.after){const anchor=new RegExp(`(<h3[^>]*>${f.after.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')}[\\s\\S]*?<\\/h3>)`);html=html.replace(anchor,`$1${figure(f)}`);}
 }
 const opening=figures.filter(f=>!f.after).map(figure).join('');
 const guide=g?`<details class="chapter-preparation"><summary>Before you begin</summary><div class="chapter-guide"><div><span class="eyebrow">THE QUESTION</span><p>${inline(g.question,p.chapter)}</p></div><div><span class="eyebrow">BRING WITH YOU</span><p>${inline(g.needs,p.chapter)}</p></div><p class="chapter-payoff"><strong>By the end:</strong> ${inline(g.payoff,p.chapter)}</p></div></details>`:'';
 const check=g?`<section class="takeaway"><h2>The idea to keep</h2><p>${inline(g.takeaway,p.chapter)}</p><details class="checkpoint"><summary>${inline(g.check,p.chapter)}</summary><p>${inline(g.answer,p.chapter)}</p></details></section>`:'';
 const label=p.chapter!==undefined?`CHAPTER ${String(p.chapter).padStart(2,'0')} ${+p.chapter>=20&&+p.chapter<=23?'· OPTIONAL DEEPER TRAIL':''}`:p.appendix?`APPENDIX ${p.appendix}`:'THE READING GUIDE';
 const heading=p.title.replace(/^\d+\. |^Appendix [A-Z]\. /,'');
 const prev=pages[i-1],next=pages[i+1];
 const body=`<article><header class="chapter-header"><a class="breadcrumb" href="index.html">The book / ${esc(label.toLowerCase())}</a><div class="eyebrow">${label}</div><h1>${esc(g?.title||heading)}</h1>${g?`<p class="chapter-deck">${inline(g.deck,p.chapter)}</p>`:''}<div class="chapter-meta">${Math.max(1,Math.ceil(p.source.split(/\s+/).length/180))} min reading</div></header>${guide}${scenes.filter(s=>String(s.chapter)===p.chapter).map(s=>scenePanel(s)).join('')}${opening}<div class="prose">${html}</div>${lab(p.chapter)}${check}<nav class="page-turn" aria-label="Chapter navigation">${prev?`<a href="${prev.id}.html"><small>← PREVIOUS</small>${esc(short(prev))}</a>`:'<span></span>'}${next?`<a href="${next.id}.html"><small>NEXT →</small>${esc(short(next))}</a>`:''}</nav></article>`;
 const rail=`<div class="eyebrow">IN THIS CHAPTER</div><nav>${r.headings.map(h=>`<a href="#${h.id}">${esc(h.label)}</a>`).join('')}</nav><a class="rail-top" href="#main">Back to top ↑</a>`;
 fs.writeFileSync(`${out}/${p.id}.html`,layout(g?.title||heading,body,{active:p.id,rail,headings:r.headings}));
 search.push({title:g?.title||heading,url:`${p.id}.html`,summary:g?.deck||'',text:p.source.replace(/\$\$[\s\S]*?\$\$/g,' ').replace(/(?<!\\)\$([^$\n]+?)\$/g,' ').replace(/<[^>]+>/g,'')});
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
const home=`<section class="cover"><div class="cover-copy"><div class="eyebrow">AN EXPLORABLE BOOK / 25 CHAPTERS</div><h1>Gravity is<br><em>geometry.</em></h1><p class="cover-subtitle">General relativity,<br>from the inside out.</p><p class="cover-intro">Begin with a clock and a falling object.<br>Build your way to the shape of spacetime.</p><a href="chapter-0.html" class="start-link" id="continue-link">Start the journey ${icon('ArrowRight01Icon')}</a><p class="cover-prereq">Basic calculus. Linear algebra. Curiosity.</p></div><div class="cover-model">${scenePanel(scenes.find(s=>s.id==='earth'),{hero:true})}</div><div class="cover-equation"><span class="eyebrow">EINSTEIN’S FIELD EQUATION</span><div class="cover-math-wide">${heroMath}</div><div class="cover-math-compact">${heroCompact}</div>${equationKey}</div></section><section id="contents" class="book-contents"><div class="section-heading"><div><h2>Contents</h2></div>${icon('BookOpen01Icon')}</div>${contents}<div class="appendix-links">${pages.filter(p=>p.appendix).map(p=>`<a href="${p.id}.html">${icon('BookOpen01Icon')}<span>${esc(p.title)}</span></a>`).join('')}</div></section>`;
fs.writeFileSync(`${out}/index.html`,layout('From the Inside Out',home));
const atlas=`<article class="atlas"><header class="chapter-header"><div class="eyebrow">THE VISUAL ATLAS / AN EXPLORABLE COLLECTION</div><h1>Give the symbols<br><em>some space.</em></h1><p class="chapter-deck">Turn a surface. Follow a worldline. Watch a direction change. Geometry becomes clearer when you can move around it.</p></header>${scenePanel(scenes.find(s=>s.id==='earth'))}<section class="atlas-labs"><div class="section-heading"><div><span class="eyebrow">NINE WAYS TO SEE IT</span><h2>Enter the spacetime labs</h2></div>${icon('CubeIcon')}</div><div class="lab-directory">${scenes.map((s,i)=>`<a href="chapter-${s.chapter}.html#scene-${s.id}"><span class="lab-card-top"><span>LAB ${String(i+1).padStart(2,'0')}</span>${icon('ArrowUpRight01Icon')}</span><h3>${s.title}</h3><p>${esc(s.deck)}</p><span class="lab-card-bottom">${icon('CubeIcon')} Chapter ${String(s.chapter).padStart(2,'0')} · Interactive 3D</span></a>`).join('')}</div></section><section class="atlas-vectors"><div class="section-heading"><div><span class="eyebrow">40 STUDIES IN GEOMETRY & PHYSICS</span><h2>The vector collection</h2></div><span>LaTeX throughout</span></div><div class="atlas-filters" role="group" aria-label="Filter figures"><button class="active" data-filter="all" aria-pressed="true">All figures</button><button data-filter="foundations" aria-pressed="false">Foundations · 0–5</button><button data-filter="geometry" aria-pressed="false">Geometry · 6–15</button><button data-filter="universe" aria-pressed="false">The universe · 16–24</button></div><p class="atlas-count" role="status">40 figures</p><div class="atlas-grid">${figureData.map(f=>`<section class="atlas-item" data-category="${f.chapter<=5?'foundations':f.chapter<=15?'geometry':'universe'}">${figure(f)}<a class="atlas-back" href="chapter-${f.chapter}.html#figure-${f.id}">Read Chapter ${f.chapter} ${icon('ArrowRight01Icon')}</a></section>`).join('')}</div></section></article>`;
fs.writeFileSync(`${out}/figure-atlas.html`,layout('The visual atlas',atlas,{active:'figure-atlas'}));
const design=`<article><header class="chapter-header"><div class="eyebrow">THE DESIGN CONVENTIONS</div><h1>A language<br><em>you can see.</em></h1><p class="chapter-deck">Color is another explanation. It should help you follow an idea across the page, through an equation, and into a figure.</p></header>${legend()}<div class="prose"><h2>Identity before decoration</h2><p>The metric, connection, curvature, stress–energy, and observer each have a persistent identity. We color identified symbols—not whole equations. Operations and indices keep their quiet ink so you can follow what changes and what contracts.</p><div class="equation">${heroMath}</div><p>Read from left to right: violet curvature, a teal metric, and amber stress–energy. The cosmological constant stays neutral; multiplying a metric does not make it a new kind of metric. The coupling constant is neutral too.</p><h2>Context matters more than a letter</h2><p>The scalar ${typeset('R',false,12)} is violet in curvature derivations. Earth’s radius ${typeset('R')} is neutral in the clock experiment. An unindexed ${typeset('T')} might mean a time interval or a trace, so automatic coloring leaves it neutral. The indexed stress–energy tensor ${typeset(String.raw`T_{\mu\nu}`)} is amber. A superscript does not by itself make an object a tensor.</p><h2>Color cannot do the work alone</h2><p>Each diagram also uses names, arrowheads, distinct positions, solid and dashed paths, and explanatory captions. Equations retain their original notation and accessible MathML. Both reading themes use their own contrast-conscious palette. Mathematical labels in vector figures are generated from explicit LaTeX into scalable glyph paths; labels in 3D scenes use the same KaTeX typography as the book.</p><h2>Three dimensions need an honest caption</h2><p>We use depth where it reveals a missing direction: a light cone with two space axes, a sphere’s tangent plane, two independent tidal squeezes, or a family of spatial slices. Every model states what has been suppressed or exaggerated. A black-hole embedding diagram reproduces spatial distances on one slice; its height is neither time nor a gravitational force.</p><h2>Make the experiment yours</h2><p>Drag to orbit or pinch to zoom. The other labs also provide rotation and reset buttons. Sliders work with the keyboard. The Earth grid moves automatically. Focus the scene and press Space to pause or resume it. It respects reduced-motion preferences and stops rendering when out of view. The already-deformed grid flows continuously, with fresh reference lines arriving from beyond the view. The other labs move only when you interact with them. If WebGL is unavailable, the corresponding vector figure remains available. Enlarge any vector figure to inspect its labels without shrinking its mathematics.</p></div></article>`;
fs.writeFileSync(`${out}/visual-language.html`,layout('The language of color',design,{active:'visual-language'}));
let creditHtml=render(fs.readFileSync('content/credits.md','utf8'),{id:'credits'}).html;
fs.writeFileSync(`${out}/credits.html`,layout('Images & edition notes',`<article><header class="chapter-header"><div class="eyebrow">PROVENANCE & CRAFT</div><h1>Images & edition notes</h1></header><div class="prose">${creditHtml}</div></article>`));
fs.writeFileSync(`${out}/search-index.json`,JSON.stringify(search));
fs.writeFileSync(`${out}/.nojekyll`,'');
fs.writeFileSync(`${out}/build-report.json`,JSON.stringify({pages:pages.length,chapters:pages.filter(p=>p.chapter!==undefined).length,figures:figureData.length,displayEquations:equationCount,interactiveScenes:scenes.length,words:wordCount,mathErrors:errors},null,2));
if(errors.length){console.error(JSON.stringify(errors,null,2));process.exit(1);}
console.log(`Built ${pages.length} reading pages, ${figureData.length} figures, ${equationCount} displayed equations; no math errors.`);
