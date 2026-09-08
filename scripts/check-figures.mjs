import fs from 'node:fs';
import assert from 'node:assert/strict';
import {chromium} from 'playwright';
const chrome='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const browser=await chromium.launch({headless:true,...(fs.existsSync(chrome)?{executablePath:chrome}:{})});
const page=await browser.newPage();
const figures=JSON.parse(fs.readFileSync('assets/figures/manifest.json'));
const issues=[];
fs.mkdirSync('qa',{recursive:true});
try{
 for(const theme of ['light','dark'])for(const f of figures){
  await page.emulateMedia({colorScheme:theme});
  await page.setViewportSize({width:f.width,height:f.height});
  await page.goto(new URL(`assets/figures/${f.id}.svg`,process.env.BOOK_URL||'http://localhost:4173/').href);
  await page.evaluate(async base=>{const style=document.createElementNS('http://www.w3.org/2000/svg','style');style.textContent=`@font-face{font-family:Manrope;src:url('${base}assets/fonts/manrope-latin-wght-normal.woff2');font-weight:200 800}`;document.documentElement.append(style);await document.fonts.load('20px Manrope');await document.fonts.ready},process.env.BOOK_URL||'http://localhost:4173/');
  const result=await page.evaluate(()=>{
   const W=innerWidth,H=innerHeight;
   const textElements=[...document.querySelectorAll('text,svg.figure-math')].filter(e=>e.textContent||e.hasAttribute('data-tex'));
   const text=textElements.map(e=>{const r=e.getBoundingClientRect();return {text:e.getAttribute('data-tex')||e.textContent,x:r.x,y:r.y,w:r.width,h:r.height}});
   const clipped=text.filter(t=>t.x<-.5||t.x+t.w>W+.5||t.y<-.5||t.y+t.h>H+.5);
   const overlaps=[];
   for(let i=0;i<text.length;i++)for(let j=i+1;j<text.length;j++){
    const a=text[i],b=text[j];
    if(Math.min(a.x+a.w,b.x+b.w)-Math.max(a.x,b.x)>3&&Math.min(a.y+a.h,b.y+b.h)-Math.max(a.y,b.y)>3)overlaps.push([a.text,b.text]);
   }
   // Text/text checks miss labels cut through by the plotted curve itself.
   // Sample rendered stroke centerlines in screen coordinates, excluding TeX
   // glyph outlines and marker definitions. Filled regions may contain labels;
   // their boundary strokes still need to stay clear of the lettering.
   const shapes=[...document.querySelectorAll('path,line,polyline,polygon,circle,ellipse,rect')].filter(e=>!e.closest('defs,svg.figure-math'));
   const strokes=shapes.filter(e=>getComputedStyle(e).stroke!=='none'&&+getComputedStyle(e).strokeOpacity>0);
   const lineOverlaps=[];
   for(const e of strokes){
    const length=e.getTotalLength(),matrix=e.getScreenCTM();
    const pad=1+parseFloat(getComputedStyle(e).strokeWidth)/2;
    const hits=new Set();
    for(let d=0;d<=Math.ceil(length/2);d++){
     const p=e.getPointAtLength(Math.min(length,d*2)).matrixTransform(matrix);
     text.forEach((t,i)=>{if(p.x>t.x-pad&&p.x<t.x+t.w+pad&&p.y>t.y-pad&&p.y<t.y+t.h+pad)hits.add(i)});
    }
    for(const i of hits)lineOverlaps.push({text:text[i].text,stroke:e.outerHTML.slice(0,180)});
   }
   const coveredLabels=[];
   for(const e of shapes.filter(e=>getComputedStyle(e).fill!=='none'&&+getComputedStyle(e).fillOpacity>.8)){
    const inverse=e.getScreenCTM().inverse();
    text.forEach((t,i)=>{
     if(!(textElements[i].compareDocumentPosition(e)&Node.DOCUMENT_POSITION_FOLLOWING))return;
     const covered=[.2,.5,.8].some(x=>[.2,.5,.8].some(y=>e.isPointInFill(new DOMPoint(t.x+x*t.w,t.y+y*t.h).matrixTransform(inverse))));
     if(covered)coveredLabels.push(t.text);
    });
   }
   return {clipped,overlaps,lineOverlaps,coveredLabels};
  });
  if(result.clipped.length||result.overlaps.length||result.lineOverlaps.length||result.coveredLabels.length)issues.push({id:f.id,theme,...result});
  await page.screenshot({path:`qa/figure-${f.id}-${theme}.png`});
 }
 fs.writeFileSync('qa/figure-geometry-report.json',JSON.stringify({checked:figures.length*2,issues},null,2));
 assert.deepEqual(issues,[],'Figure labels are clipped, overlapping, or obscured; inspect qa/figure-geometry-report.json');
 console.log(`Checked all ${figures.length} SVGs in both themes: labels clear of clipping, other labels, strokes, and overpainted fills.`);
}finally{await browser.close()}
