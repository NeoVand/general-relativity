import fs from 'node:fs';
import path from 'node:path';
import MarkdownIt from 'markdown-it';
import katex from 'katex';

const out='site';
fs.mkdirSync(out,{recursive:true});
for(const name of fs.readdirSync(out)) fs.rmSync(path.join(out,name),{recursive:true,force:true});
fs.cpSync('web',out,{recursive:true});
fs.cpSync('assets',`${out}/assets`,{recursive:true});
fs.cpSync('node_modules/katex/dist',`${out}/assets/katex`,{recursive:true});
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
   try{math.push(katex.renderToString(tex.trim(),{displayMode:display,throwOnError:true,strict:'ignore',output:'htmlAndMathml',trust:false}));}
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
const nav=active=>`<a class="brand" href="index.html"><span class="brand-mark">g<span>μν</span></span><span>GENERAL RELATIVITY<small>From the Inside Out</small></span></a><div class="nav-label">THE READING ROOM</div><a class="nav-special" href="reading-guide.html">How to read · Conventions</a><nav aria-label="Book chapters">${pages.filter(p=>p.chapter!==undefined).map(p=>`<a href="${p.id}.html" ${p.id===active?'aria-current="page"':''}><span class="chapter-index">${String(p.chapter).padStart(2,'0')}</span><span>${esc(short(p))}</span></a>`).join('')}<div class="nav-label">KEEP BESIDE YOUR NOTEBOOK</div>${pages.filter(p=>p.appendix).map(p=>`<a href="${p.id}.html" ${p.id===active?'aria-current="page"':''}><span class="chapter-index">${p.appendix}</span><span>${esc(short(p))}</span></a>`).join('')}</nav><a class="nav-special" href="figure-atlas.html">The visual atlas</a><a class="nav-special" href="credits.html">Images & edition notes</a><a class="repo-link" href="https://github.com/NeoVand/general-relativity">Source on GitHub ↗</a>`;
function layout(title,body,{active='',rail='',description='A visual, step-by-step general relativity textbook, beginning with basic calculus and linear algebra.'}={}){
 return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="description" content="${esc(description)}"><meta name="theme-color" content="#102b3b"><title>${esc(title)} · General Relativity</title><link rel="icon" href="assets/favicon.svg" type="image/svg+xml"><link rel="stylesheet" href="assets/katex/katex.min.css"><link rel="stylesheet" href="styles.css"><script src="app.js" defer></script></head><body data-page="${active}"><a class="skip-link" href="#main">Skip to reading</a><aside class="sidebar" id="book-navigation">${nav(active)}</aside><div class="page"><header class="topbar"><button id="menu-button" class="icon-button" aria-expanded="false" aria-controls="book-navigation">☰ <span>Contents</span></button><a href="index.html" class="top-title">A FIELD GUIDE TO SPACETIME</a><div class="reading-tools"><button id="search-button" class="text-button" aria-haspopup="dialog">Search</button><button id="type-button" class="text-button" aria-label="Increase reading text size" aria-pressed="false">Aa</button><button id="theme-button" class="text-button" aria-label="Switch to dark appearance">◐</button></div></header><div class="reading-layout"><main id="main">${body}</main>${rail?`<aside class="section-rail" aria-label="On this page">${rail}</aside>`:''}</div><footer class="site-footer"><span>General Relativity, From the Inside Out</span><a href="credits.html">Sources & image credits</a><span>Built to be read, questioned, and understood.</span></footer></div><dialog id="search-dialog" aria-labelledby="search-heading"><div class="search-header"><h2 id="search-heading">Find an idea</h2><button id="search-close" class="text-button">Close</button></div><label for="search-input">Search the book</label><input id="search-input" type="search" placeholder="Try proper time, pressure, or a section number" autocomplete="off"><p id="search-status" role="status"></p><div id="search-results"></div></dialog></body></html>`;
}
function figure(f){return `<figure class="diagram" id="figure-${f.id}"><a href="assets/figures/${f.id}.svg" aria-label="Open full-size diagram: ${esc(f.title)}"><img src="assets/figures/${f.id}.svg" width="${f.width}" height="${f.height}" alt="${esc(f.alt)}" loading="lazy" decoding="async"></a><figcaption><a class="figure-open" href="assets/figures/${f.id}.svg">Open full size ↗</a><span class="figure-number">FIGURE ${f.number}</span> <strong>${esc(f.title)}.</strong> ${esc(f.caption)}</figcaption></figure>`;}
function lab(ch){
 if(ch==='3')return `<section class="lab" aria-labelledby="lab-title"><span class="eyebrow">TRY THE EQUATION</span><h3 id="lab-title">Two routes. One reunion.</h3><p>A traveller moves out and back at equal speed. The home clock records 10 years. We idealize the turnaround as instantaneous.</p><label for="speed">Speed as a fraction of light speed <output id="speed-value">0.60 c</output></label><input id="speed" type="range" min="0" max="0.99" step="0.01" value="0.6"><div class="clock-bars"><div><span>Home clock</span><div class="bar home" style="width:100%">10.00 years</div></div><div><span>Traveller’s clock</span><div class="bar travel" id="traveller-bar" style="width:80%">8.00 years</div></div></div><p id="clock-result" aria-live="polite">The traveller records 8.00 years, 2.00 fewer than the home clock.</p><p class="lab-note">τ = 10√(1 − v²/c²) years. This compares complete worldlines in flat spacetime.</p></section>`;
 if(ch==='16')return `<section class="lab" aria-labelledby="lab-title"><span class="eyebrow">TRY THE EQUATION</span><h3 id="lab-title">When does an orbiting clock gain time?</h3><p>Compare a circular-orbit clock with a stationary clock at Earth’s surface. This model neglects Earth’s rotation and multipoles.</p><label for="altitude">Altitude <output id="altitude-value">20,200 km</output></label><input id="altitude" type="range" min="200" max="36000" step="100" value="20200"><div class="lab-results"><div><small>Altitude contribution</small><strong id="gps-gr">+45.72 μs/day</strong></div><div><small>Motion contribution</small><strong id="gps-sr">−7.21 μs/day</strong></div><div><small>Net clock gain</small><strong id="gps-net">+38.51 μs/day</strong></div></div><p id="gps-reading" aria-live="polite"></p><p class="lab-note">Δτ/day = (GM/c²)(1/R − 3/2r) × 86,400 s. The crossover is at altitude R/2 ≈ 3,186 km.</p></section>`;
 if(ch==='18')return `<section class="lab" aria-labelledby="lab-title"><span class="eyebrow">TRY THE GEOMETRY</span><h3 id="lab-title">A wave changes separation</h3><p>Move through one cycle of a pure plus-polarized wave. Dots represent freely falling test particles; distances are shown in a local detector frame.</p><label for="wave-phase">Phase <output id="phase-value">0.00 π</output></label><input id="wave-phase" type="range" min="0" max="200" step="1" value="0"><svg id="wave-ring" viewBox="0 0 480 260" role="img" aria-label="A ring of test particles changing into alternating horizontal and vertical ellipses"><circle cx="240" cy="130" r="90" fill="none" stroke="#869ba4" stroke-dasharray="4 5"/>${Array.from({length:16},(_,i)=>`<circle class="wave-dot" data-angle="${i*2*Math.PI/16}" cx="${240+90*Math.cos(i*2*Math.PI/16)}" cy="${130+90*Math.sin(i*2*Math.PI/16)}" r="5" fill="#087f8c"/>`).join('')}</svg><p class="lab-note">x = x₀(1 + h₊/2), y = y₀(1 − h₊/2). Strain is exaggerated to 0.35 for visibility; this is a first-order model. Area is unchanged only to first order.</p></section>`;
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
 const guide=g?`<section class="chapter-guide"><div><span class="eyebrow">THE QUESTION</span><p>${esc(g.question)}</p></div><div><span class="eyebrow">BRING WITH YOU</span><p>${esc(g.needs)}</p></div><p class="chapter-payoff"><strong>By the end:</strong> ${esc(g.payoff)}</p></section>`:'';
 const check=g?`<section class="takeaway"><span class="eyebrow">PAUSE BEFORE YOU TURN THE PAGE</span><h2>The idea to keep</h2><p>${esc(g.takeaway)}</p><details class="checkpoint"><summary>${esc(g.check)}</summary><p>${esc(g.answer)}</p></details></section>`:'';
 const label=p.chapter!==undefined?`CHAPTER ${String(p.chapter).padStart(2,'0')} ${+p.chapter>=20&&+p.chapter<=23?'· OPTIONAL DEEPER TRAIL':''}`:p.appendix?`APPENDIX ${p.appendix}`:'THE READING GUIDE';
 const heading=p.title.replace(/^\d+\. |^Appendix [A-Z]\. /,'');
 const prev=pages[i-1],next=pages[i+1];
 const body=`<article><header class="chapter-header"><a class="breadcrumb" href="index.html">The book / ${esc(label.toLowerCase())}</a><div class="eyebrow">${label}</div><h1>${esc(g?.title||heading)}</h1>${g?`<p class="chapter-deck">${esc(g.deck)}</p>`:''}<div class="chapter-meta">${Math.max(1,Math.ceil(p.source.split(/\s+/).length/180))} min reading · Work at your own pace</div></header>${guide}${opening}<div class="prose">${html}</div>${lab(p.chapter)}${check}<nav class="page-turn" aria-label="Chapter navigation">${prev?`<a href="${prev.id}.html"><small>← PREVIOUS</small>${esc(short(prev))}</a>`:'<span></span>'}${next?`<a href="${next.id}.html"><small>NEXT →</small>${esc(short(next))}</a>`:''}</nav></article>`;
 const rail=`<div class="eyebrow">IN THIS CHAPTER</div><nav>${r.headings.map(h=>`<a href="#${h.id}">${esc(h.label)}</a>`).join('')}</nav><a class="rail-top" href="#main">Back to top ↑</a>`;
 fs.writeFileSync(`${out}/${p.id}.html`,layout(g?.title||heading,body,{active:p.id,rail}));
 search.push({title:g?.title||heading,url:`${p.id}.html`,text:p.source.replace(/<[^>]+>/g,'').replace(/\$[^$]*\$/g,'')});
}
const heroMath=katex.renderToString(String.raw`\underbrace{\color{#66d9da}{R_{\mu\nu}-\tfrac12 Rg_{\mu\nu}}}_{\text{geometry}}+\underbrace{\color{#f2c26e}{\Lambda g_{\mu\nu}}}_{\text{vacuum}}=\frac{8\pi G_N}{c^4}\underbrace{\color{#ffb59c}{T_{\mu\nu}}}_{\text{matter and energy}}`,{displayMode:true,throwOnError:true});
const groups=[['BEGIN WITH MEASUREMENTS','0','5'],['BUILD THE LANGUAGE OF CURVATURE','6','12'],['ASK WHY THIS EQUATION','13','15'],['PUT SPACETIME TO WORK','16','19'],['FOLLOW THE DEEPER TRAILS','20','24']];
const contents=groups.map(([name,a,b])=>`<section class="contents-group"><div class="eyebrow">${name}</div>${pages.filter(p=>p.chapter!==undefined&&+p.chapter>=+a&&+p.chapter<=+b).map(p=>`<a class="chapter-card" href="${p.id}.html"><span class="card-number">${String(p.chapter).padStart(2,'0')}</span><div><h3>${esc(short(p))}</h3><p>${esc(guides[p.chapter]?.question||'')}</p></div><span class="card-arrow">↗</span></a>`).join('')}</section>`).join('');
const home=`<section class="cover"><div class="eyebrow">A VISUAL BOOK · FROM FIRST PRINCIPLES</div><h1>General<br>Relativity<span>from the inside out.</span></h1><p class="cover-intro">A clock. Two falling objects. One extraordinary idea.<br>Build the geometry of gravity from things you can understand.</p><div class="cover-equation">${heroMath}</div><div class="cover-bottom"><a href="chapter-0.html" class="start-link" id="continue-link">Begin with the basics <span>→</span></a><span>Basic calculus + linear algebra<br>Everything else, built along the way.</span></div></section><section class="welcome"><span class="eyebrow">YOU CAN LEARN THIS</span><h2>Start with what a clock measures.<br>Finish with what spacetime means.</h2><p>This is a complete book, with the difficult steps left in and explained. Read the main path in order, try the worked calculations, and use the visual atlas whenever the symbols need a picture.</p><div class="book-facts"><span><strong>25</strong> guided chapters</span><span><strong>${figureData.length}</strong> original diagrams</span><span><strong>30+</strong> solved problems</span></div><div class="route-note"><strong>Your first route:</strong> Chapters 0–5 build the foundation. Chapters 6–12 take you to Einstein’s equation. Chapters 20–23 are optional deeper trails; their prerequisites are introduced along the way.</div></section><section id="contents" class="book-contents"><h2>The whole journey</h2>${contents}<div class="appendix-links">${pages.filter(p=>p.appendix).map(p=>`<a href="${p.id}.html">${esc(p.title)}</a>`).join('')}</div></section>`;
fs.writeFileSync(`${out}/index.html`,layout('From the Inside Out',home));
fs.writeFileSync(`${out}/figure-atlas.html`,layout('The visual atlas',`<article><header class="chapter-header"><div class="eyebrow">THE GEOMETRY, MADE VISIBLE</div><h1>The visual atlas</h1><p class="chapter-deck">Every diagram has a job: reveal a relationship, explain a calculation, or expose a tempting mistake. Open any figure at full resolution.</p></header>${figureData.map(f=>`${figure(f)}<p class="atlas-back"><a href="chapter-${f.chapter}.html#figure-${f.id}">Read it in Chapter ${f.chapter} →</a></p>`).join('')}</article>`));
let creditHtml=render(fs.readFileSync('content/credits.md','utf8'),{id:'credits'}).html;
fs.writeFileSync(`${out}/credits.html`,layout('Images & edition notes',`<article><header class="chapter-header"><div class="eyebrow">PROVENANCE & CRAFT</div><h1>Images & edition notes</h1></header><div class="prose">${creditHtml}</div></article>`));
fs.writeFileSync(`${out}/search-index.json`,JSON.stringify(search));
fs.writeFileSync(`${out}/.nojekyll`,'');
fs.writeFileSync(`${out}/build-report.json`,JSON.stringify({pages:pages.length,chapters:pages.filter(p=>p.chapter!==undefined).length,figures:figureData.length,displayEquations:equationCount,words:wordCount,mathErrors:errors},null,2));
if(errors.length){console.error(JSON.stringify(errors,null,2));process.exit(1);}
console.log(`Built ${pages.length} reading pages, ${figureData.length} figures, ${equationCount} displayed equations; no math errors.`);
