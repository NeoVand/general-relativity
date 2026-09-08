import fs from 'node:fs';
import assert from 'node:assert/strict';
import {chromium} from 'playwright';
import {scenes} from './scenes.mjs';
import {math,semanticTex} from './math-system.mjs';
const chrome='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const browser=await chromium.launch({headless:true,args:['--enable-unsafe-swiftshader'],...(fs.existsSync(chrome)?{executablePath:chrome}:{})});
const page=await browser.newPage();const base=process.env.BOOK_URL||'http://localhost:4173/';
const errors=[],checks=[],labelIssues=[];page.on('pageerror',e=>errors.push(e.message));fs.mkdirSync('qa',{recursive:true});
try{
 for(const width of [1440,390])for(const theme of ['light','dark']){
  await page.setViewportSize({width,height:width===390?844:1100});
  await page.goto(new URL('index.html',base).href);await page.evaluate(t=>localStorage.setItem('gr-theme',t),theme);
  for(const s of scenes){
   await page.goto(new URL(`chapter-${s.chapter}.html#scene-${s.id}`,base).href);
   const el=page.locator(`#scene-${s.id}`);await el.scrollIntoViewIfNeeded();await page.waitForFunction(id=>document.getElementById(id).dataset.ready==='true',`scene-${s.id}`);
   await page.evaluate(()=>document.fonts.ready);
   const range=el.locator('input');await range.fill(String(s.max));await range.dispatchEvent('input');
   const data=await el.evaluate(e=>({...e.dataset}));
   if(s.id==='sphere'){
    const v=JSON.parse(data.vector),p=JSON.parse(data.position);assert.ok(Math.abs(v[2]-1)<1e-12);assert.ok(Math.abs(p[1]-1)<1e-12);assert.ok(Math.abs(v.reduce((sum,x,i)=>sum+x*p[i],0))<1e-12);
   }else if(s.id==='tides')assert.deepEqual(JSON.parse(data.scales),[1.3,.85,.85]);
   else if(s.id==='embedding')assert.equal(+data.measurement,4);
   else if(s.id==='covector')assert.equal(+data.measurement,3);
   else if(s.id==='cone')assert.equal(+data.measurement,.95);
   else if(s.id==='expansion')assert.equal(+data.measurement,1.5);
   else if(s.id==='wave')assert.ok(Math.abs(+data.phase-2*Math.PI)<1e-12);
   else if(s.id==='slices')assert.equal(+data.measurement,1.2);
   // Inspect a representative intermediate state as well as the endpoint.
   await range.fill(String(s.id==='sphere'?180:s.value));await range.dispatchEvent('input');
   await el.locator('[data-view=left]').click();await el.locator('[data-view=reset]').click();
   const result=await el.evaluate(e=>{
    const stage=e.querySelector('.scene-stage'),rect=stage.getBoundingClientRect();
    const labels=[...e.querySelectorAll('.scene-label')].map(n=>{const r=n.getBoundingClientRect();return {text:n.textContent,x:r.left-rect.left,y:r.top-rect.top,w:r.width,h:r.height}});
    const clipped=labels.filter(r=>r.x<0||r.y<0||r.x+r.w>rect.width||r.y+r.h>rect.height);
    const overlaps=[];for(let i=0;i<labels.length;i++)for(let j=i+1;j<labels.length;j++){const a=labels[i],b=labels[j];if(Math.min(a.x+a.w,b.x+b.w)-Math.max(a.x,b.x)>3&&Math.min(a.y+a.h,b.y+b.h)-Math.max(a.y,b.y)>3)overlaps.push([a.text,b.text]);}
    return {clipped,overlaps,width:rect.width,height:rect.height,theme:document.documentElement.dataset.theme,canvas:!!e.querySelector('canvas'),scroll:document.documentElement.scrollWidth};
   });
   assert.equal(result.theme,theme);assert.ok(result.canvas);assert.ok(result.scroll<=width+1);
   if(result.clipped.length||result.overlaps.length)labelIssues.push({scene:s.id,width,theme,...result});
   checks.push({scene:s.id,width,theme});
   await el.screenshot({path:`qa/lab-${s.id}-${width}-${theme}.png`});
  }
 }
 // Atlas filters, theme-aware SVG, and figure dialog ID isolation.
 await page.goto(new URL('figure-atlas.html',base).href);await page.locator('[data-filter=foundations]').click();assert.equal(await page.locator('.atlas-item:visible').count(),10);
 const figure=page.locator('.atlas-item:visible').first();await figure.locator('[data-figure]').click();await page.locator('#figure-dialog').waitFor({state:'visible'});
 assert.ok(await page.locator('#figure-detail .figure-math').count()>0);
 assert.equal(await page.evaluate(()=>{const ids=[...document.querySelectorAll('[id]')].map(e=>e.id);return ids.length-new Set(ids).size}),0);
 await page.keyboard.press('Escape');await page.locator('#figure-dialog').waitFor({state:'hidden'});
 assert.deepEqual(errors,[]);
 fs.writeFileSync('qa/experience-report.json',JSON.stringify({checks,errors,labelIssues},null,2));
 assert.deepEqual(labelIssues,[],'Default 3D labels overlap or clip; inspect experience-report.json.');
 // Conservative semantic classification must not confuse coordinates and indices.
 assert.ok(!semanticTex(String.raw`R^2`,16).includes('math-curvature'));
 assert.ok(!semanticTex(String.raw`\eta^\rho`,5).includes('math-geometry'));
 assert.ok(!semanticTex(String.raw`\Gamma^\rho_{\mu\nu}`,7).includes('math-matter'));
 assert.ok(!semanticTex(String.raw`\mathcal T^a`,21).includes('math-matter'));
 assert.ok(!semanticTex(String.raw`C^\mu{}_\nu v^\nu`,2).includes('math-curvature'));
 assert.ok(semanticTex(String.raw`C^\rho{}_{\sigma\mu\nu}`,9).includes('math-curvature'));
 for(const tex of [String.raw`\boldsymbol\nabla\Phi`,String.raw`\dot g`,String.raw`\mathbb R^n`])assert.ok(math(tex,true,12).includes('katex'));
 console.log(`Checked ${checks.length} 3D scene/theme/viewport combinations, model endpoints, keyboard controls, semantic math, and atlas inspection.`);
}finally{await browser.close()}
