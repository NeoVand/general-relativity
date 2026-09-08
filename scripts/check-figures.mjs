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
 for(const f of figures){
  await page.setViewportSize({width:f.width,height:f.height});
  await page.goto(new URL(`assets/figures/${f.id}.svg`,process.env.BOOK_URL||'http://localhost:4173/').href);
  await page.evaluate(()=>document.fonts.ready);
  const result=await page.evaluate(()=>{
   const W=innerWidth,H=innerHeight;
   const text=[...document.querySelectorAll('text')].filter(e=>e.textContent).map(e=>{const r=e.getBoundingClientRect();return {text:e.textContent,x:r.x,y:r.y,w:r.width,h:r.height}});
   const clipped=text.filter(t=>t.x<-.5||t.x+t.w>W+.5||t.y<-.5||t.y+t.h>H+.5);
   const overlaps=[];
   for(let i=0;i<text.length;i++)for(let j=i+1;j<text.length;j++){
    const a=text[i],b=text[j];
    if(Math.min(a.x+a.w,b.x+b.w)-Math.max(a.x,b.x)>3&&Math.min(a.y+a.h,b.y+b.h)-Math.max(a.y,b.y)>3)overlaps.push([a.text,b.text]);
   }
   return {clipped,overlaps};
  });
  if(result.clipped.length||result.overlaps.length)issues.push({id:f.id,...result});
  await page.screenshot({path:`qa/figure-${f.id}.png`});
 }
 fs.writeFileSync('qa/figure-geometry-report.json',JSON.stringify({checked:figures.length,issues},null,2));
 assert.deepEqual(issues,[],'Figure labels overlap or exceed the SVG viewBox; inspect qa/figure-geometry-report.json');
 console.log(`Checked all ${figures.length} SVGs: no clipped or overlapping text labels.`);
}finally{await browser.close()}
