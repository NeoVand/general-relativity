import fs from 'node:fs';
import {mathjax} from 'mathjax-full/js/mathjax.js';
import {TeX} from 'mathjax-full/js/input/tex.js';
import {SVG} from 'mathjax-full/js/output/svg.js';
import {liteAdaptor} from 'mathjax-full/js/adaptors/liteAdaptor.js';
import {RegisterHTMLHandler} from 'mathjax-full/js/handlers/html.js';
import {AllPackages} from 'mathjax-full/js/input/tex/AllPackages.js';
import {semanticTex} from './math-system.mjs';
import {mathPaletteCSS} from './math-palette.mjs';
const adaptor=liteAdaptor();RegisterHTMLHandler(adaptor);
const doc=mathjax.document('',{InputJax:new TeX({packages:AllPackages}),OutputJax:new SVG({fontCache:'none'})});
const mapping=JSON.parse(fs.readFileSync('content/figure-math.json'));
const manifest=JSON.parse(fs.readFileSync('assets/figures/manifest.json'));
const decode=s=>s.replace(/&amp;/g,'&').replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&quot;/g,'"').replace(/&#x27;|&#39;/g,"'");
const esc=s=>s.replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;');
const colors={'#183746':'var(--ink,#20262c)','#526e7b':'var(--muted,#626971)','#087f8c':'var(--geometry,#007c78)','#b95730':'var(--observer,#bb365d)','#4267a1':'var(--transport,#275dc5)','#b18225':'var(--matter,#a25e00)','#d5e2e7':'var(--line,#d9dddf)','#f6f9fa':'var(--figure-bg,#f3f4f2)','#fff':'var(--paper,#fffefa)','#ffffff':'var(--paper,#fffefa)'};
colors['#7951bb']='var(--curvature,#7951bb)';colors['#a25e00']='var(--matter,#a25e00)';
const figureRoles={
 'sphere-holonomy':{'#087f8c':'transport'},
 'einstein-anatomy':{},
 'newtonian-calibration':{'#087f8c':'curvature','#b95730':'matter'},
 'connection-cancellation':{'#087f8c':'transport','#b95730':'transport'},
 'tidal-eigenvalues':{'#087f8c':'curvature','#b95730':'curvature'},
 'action-product-rule':{'#087f8c':'curvature','#b95730':'geometry'},
 'light-bending':{'#b95730':'matter'},
 'twin-worldlines':{'#087f8c':'observer','#b95730':'observer'},
 'gps-clocks':{'#087f8c':'observer'},
 'tossed-clock':{'#087f8c':'observer'},
 'wave-polarizations':{'#087f8c':'observer'},
 'adm-slicing':{'#087f8c':'observer','#b95730':'transport','#4267a1':'ink'},
 'cartan-comparison':{'#b95730':'curvature'},
 'curvature-count':{'#087f8c':'curvature'},
 'horizon-area':{'#087f8c':'geometry','#b95730':'geometry'},
};
const styles=`.gr-figure [data-compact-only]{display:none}.gr-figure.is-compact [data-compact-only]{display:inline}.gr-figure text{font-family:Manrope,Arial,sans-serif}.gr-figure .math-geometry{color:var(--geometry,#007c78)}.gr-figure .math-curvature{color:var(--curvature,#7951bb)}.gr-figure .math-transport{color:var(--transport,#275dc5)}.gr-figure .math-matter{color:var(--matter,#a25e00)}.gr-figure .math-observer{color:var(--observer,#bb365d)}@media(prefers-color-scheme:dark){svg.gr-figure:not(.embedded){--ink:#ebedf0;--muted:#a8b0bf;--geometry:#64d9c9;--curvature:#bd9cff;--transport:#8bb5ff;--matter:#f3c16e;--observer:#ff99b4;--line:#343e4f;--paper:#141b29;--figure-bg:#192231;--figure-tint:#243549}}`;
let count=0;
for(const f of manifest){
 let source=fs.readFileSync(`assets/figures/${f.id}.svg`,'utf8');
 source=source.replace('<svg ','<svg class="gr-figure" ').replace('<defs>',`<style>${styles}${mathPaletteCSS({svg:true})}</style><defs>`);
 // Isolate all marker resources when several inline SVGs share a document.
 source=source.replace(/id="([^"]+)"/g,(_,id)=>`id="${f.id}-${id}"`).replace(/url\(#([^\)]+)\)/g,(_,id)=>`url(#${f.id}-${id})`).replace('aria-labelledby="title desc"',`aria-labelledby="${f.id}-title ${f.id}-desc"`);
 source=source.replace(/<text ([^>]+)>([^<]*)<\/text>/g,(full,attrs,encoded)=>{
  const label=decode(encoded),tex=mapping[label];if(!tex)return full;
  const attr=k=>attrs.match(new RegExp(`(?:^| )${k}="([^"]*)"`))?.[1];
  const size=+attr('font-size'),x=+attr('x'),y=+attr('y'),anchor=attr('text-anchor');
  const node=doc.convert(semanticTex(tex,String(f.chapter)).replaceAll('\\htmlClass','\\class'),{display:false});
  const rendered=adaptor.outerHTML(node);if(/data-mjx-error/.test(rendered))throw Error(`Invalid figure TeX: ${label}`);
  const svg=rendered.match(/<svg[^>]*viewBox="([^"]+)"[^>]*>([\s\S]*)<\/svg>/);if(!svg)throw Error(label);
  const [vx,vy,w,h]=svg[1].split(' ').map(Number),scale=size/1000,width=w*scale,height=h*scale;
  const left=x-(anchor==='middle'?width/2:anchor==='end'?width:0);
  count++;
  return `<svg class="figure-math" data-tex="${esc(tex)}" aria-label="${esc(label)}" role="img" x="${left}" y="${y+vy*scale}" width="${width}" height="${height}" viewBox="${svg[1]}" style="color:${attr('fill')};overflow:visible">${svg[2]}</svg>`;
 });
 if(f.id==='stress-energy')source=source.replaceAll('fill="#d9eeee"','fill="color-mix(in srgb,var(--matter,#a25e00) 24%,var(--paper,#fffefa))"').replaceAll('fill="#f6e8de"','fill="color-mix(in srgb,var(--matter,#a25e00) 12%,var(--paper,#fffefa))"').replaceAll('fill="#e3eaf5"','fill="color-mix(in srgb,var(--matter,#a25e00) 5%,var(--paper,#fffefa))"');
 source=source.replace(/(fill|stroke|color)([=:])("?)(#[a-fA-F0-9]{3,6})/g,(all,prop,sep,q,col)=>`${prop}${sep}${q}${(figureRoles[f.id]?.[col.toLowerCase()]?`var(--${figureRoles[f.id][col.toLowerCase()]},${({geometry:'#007c78',curvature:'#7951bb',transport:'#275dc5',matter:'#a25e00',observer:'#bb365d',ink:'#242931'})[figureRoles[f.id][col.toLowerCase()]]})`:colors[col.toLowerCase()])||(prop==='fill'?'var(--figure-tint,#e6ece9)':col)}`);
 fs.writeFileSync(`assets/figures/${f.id}.svg`,source);
}
console.log(`Typeset ${count} figure labels from explicit LaTeX; ${manifest.length} theme-aware SVGs.`);
