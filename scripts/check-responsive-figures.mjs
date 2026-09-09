import fs from 'node:fs';
import assert from 'node:assert/strict';
import {chromium} from 'playwright';
const chrome='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const browser=await chromium.launch({headless:true,...(fs.existsSync(chrome)?{executablePath:chrome}:{})});
const page=await browser.newPage();
const base=process.env.BOOK_URL||'http://localhost:4173/';
const figures=JSON.parse(fs.readFileSync('assets/figures/manifest.json')).filter(f=>fs.readFileSync(`assets/figures/${f.id}.svg`,'utf8').includes('data-mobile-viewbox'));
const errors=[];page.on('pageerror',e=>errors.push(e.message));
fs.mkdirSync('qa',{recursive:true});
const results=[];
try{
 for(const theme of ['light','dark'])for(const width of [1440,390,320])for(const f of figures){
  await page.setViewportSize({width,height:1000});
  await page.goto(new URL(`chapter-${f.chapter}.html`,base).href);
  await page.waitForFunction(()=>document.body.dataset.readingReady==='true');
  await page.evaluate(theme=>{document.documentElement.dataset.theme=theme;return document.fonts.ready},theme);
  const figure=page.locator(`#figure-${f.id}`),svg=figure.locator('svg.gr-figure');
  await figure.scrollIntoViewIfNeeded();
  await page.waitForFunction(id=>{const e=document.querySelector(`#figure-${id} svg.gr-figure`);return e.classList.contains('is-compact')===(e.parentElement.clientWidth<600)},f.id);
  const count=await svg.locator('.figure-math').count();
  const geometry=await svg.evaluate(e=>{
   const r=e.getBoundingClientRect(),labels=[...e.querySelectorAll('text,.figure-math')].filter(t=>t.getClientRects().length).map(t=>{const b=t.getBoundingClientRect();return {text:t.getAttribute('data-tex')||t.textContent,x:b.x,y:b.y,w:b.width,h:b.height}});
   const clipped=labels.filter(b=>b.x<r.x-1||b.y<r.y-1||b.x+b.w>r.right+1||b.y+b.h>r.bottom+1);
   const overlaps=[];
   for(let i=0;i<labels.length;i++)for(let j=i+1;j<labels.length;j++){const a=labels[i],b=labels[j];if(Math.min(a.x+a.w,b.x+b.w)-Math.max(a.x,b.x)>2&&Math.min(a.y+a.h,b.y+b.h)-Math.max(a.y,b.y)>2)overlaps.push([a.text,b.text]);}
   return {clipped,overlaps,compact:e.classList.contains('is-compact'),pageWidth:document.documentElement.scrollWidth,viewport:innerWidth,mathHeight:Math.min(...labels.filter(t=>t.text.includes('\\')).map(t=>t.h))};
  });
  assert.deepEqual(geometry.clipped,[],`${f.id}/${width}/${theme}: clipped labels`);
  assert.deepEqual(geometry.overlaps,[],`${f.id}/${width}/${theme}: overlapping labels`);
  assert.ok(geometry.pageWidth<=width+1,`${f.id}: page overflow`);
  assert.ok(geometry.mathHeight>=11,`${f.id}: mathematical labels became miniatures`);
  await figure.screenshot({path:`qa/responsive-${f.id}-${width}-${theme}.png`});
  // Enlargement must restore the complete original composition, while the
  // chapter keeps its compact layout and the SVG stays semantically singular.
  await figure.locator('.figure-zoom').click();
  const detail=page.locator('#figure-detail>.gr-figure');
  assert.equal(await detail.getAttribute('viewBox'),`0 0 ${f.width} ${f.height}`);
  assert.equal(await detail.locator('.figure-math').count(),count);
  assert.equal(await detail.evaluate(e=>e.classList.contains('is-compact')),false);
  await page.locator('#figure-close').click();
  await page.setViewportSize({width:1440,height:1000});
  await page.waitForFunction(id=>!document.querySelector(`#figure-${id} svg.gr-figure`).classList.contains('is-compact'),f.id);
  assert.equal(await svg.getAttribute('viewBox'),`0 0 ${f.width} ${f.height}`);
  assert.equal(await svg.locator('.figure-math').count(),count);
  const ids=await page.locator('[id]').evaluateAll(es=>es.map(e=>e.id));assert.equal(ids.length,new Set(ids).size);
  results.push({figure:f.id,width,theme,...geometry});
 }
 // Atlas thumbnails keep the same wide composition as the other illustrations.
 await page.goto(new URL('figure-atlas.html',base).href);
 await page.waitForFunction(()=>document.body.dataset.readingReady==='true');
 await page.setViewportSize({width:390,height:1000});
 for(const f of figures){const thumb=page.locator(`.atlas-item #figure-${f.id} svg.gr-figure`);assert.equal(await thumb.getAttribute('viewBox'),`0 0 ${f.width} ${f.height}`);assert.equal(await thumb.evaluate(e=>e.classList.contains('is-compact')),false);}
 assert.deepEqual(errors,[]);
 fs.writeFileSync('qa/responsive-figures-report.json',JSON.stringify(results,null,2));
 console.log(`Verified ${results.length} responsive figure/theme/width compositions, readable math, enlargement, and reversible reflow.`);
}finally{await browser.close()}
