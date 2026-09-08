import fs from 'node:fs';
import assert from 'node:assert/strict';
import {chromium} from 'playwright';
import {scenes} from './scenes.mjs';
import {rainRadius, FALL_TIME, ENTRY_HALF_SIZE, VIEW_RADIUS, INJECTION_INTERVAL, COHORTS, INITIAL_PHASE, cohortRadius, EARTH_GM, EARTH_RADIUS} from '../web/earth-flow.js';
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
   const range=el.locator('input');
   if(s.id==='earth')await el.getByRole('button',{name:'Pause free fall',exact:true}).click();
   else {await range.fill(String(s.max));await range.dispatchEvent('input');}
   const data=await el.evaluate(e=>({...e.dataset}));
   if(s.id==='earth'){
    assert.equal(await range.count(),0,'The continuous Earth scene must not have a slider');
    assert.ok(+data.phase>=0 && +data.phase<INJECTION_INTERVAL);
    assert.equal(data.playing,'false');
    await page.waitForFunction(()=>document.querySelector('[data-scene=earth]').dataset.texture==='ready');
   }else if(s.id==='sphere'){
    const v=JSON.parse(data.vector),p=JSON.parse(data.position);assert.ok(Math.abs(v[2]-1)<1e-12);assert.ok(Math.abs(p[1]-1)<1e-12);assert.ok(Math.abs(v.reduce((sum,x,i)=>sum+x*p[i],0))<1e-12);
   }else if(s.id==='tides')assert.deepEqual(JSON.parse(data.scales),[1.3,.85,.85]);
   else if(s.id==='embedding')assert.equal(+data.measurement,4);
   else if(s.id==='covector')assert.equal(+data.measurement,3);
   else if(s.id==='cone')assert.equal(+data.measurement,.95);
   else if(s.id==='expansion')assert.equal(+data.measurement,1.5);
   else if(s.id==='wave')assert.ok(Math.abs(+data.phase-2*Math.PI)<1e-12);
   else if(s.id==='slices')assert.equal(+data.measurement,1.2);
   // Inspect a representative intermediate state as well as the endpoint.
   if(s.id!=='earth'){await range.fill(String(s.id==='sphere'?180:s.value));await range.dispatchEvent('input');}
   await el.locator('[data-view=left]').click();await el.locator('[data-view=reset]').click();
   const result=await el.evaluate(e=>{
    const stage=e.querySelector('.scene-stage'),rect=stage.getBoundingClientRect();
    const labels=[...e.querySelectorAll('.scene-label')].map(n=>{const r=n.getBoundingClientRect();return {text:n.textContent,x:r.left-rect.left,y:r.top-rect.top,w:r.width,h:r.height}});
    const clipped=labels.filter(r=>r.x<0||r.y<0||r.x+r.w>rect.width||r.y+r.h>rect.height);
    const overlaps=[];for(let i=0;i<labels.length;i++)for(let j=i+1;j<labels.length;j++){const a=labels[i],b=labels[j];if(Math.min(a.x+a.w,b.x+b.w)-Math.max(a.x,b.x)>3&&Math.min(a.y+a.h,b.y+b.h)-Math.max(a.y,b.y)>3)overlaps.push([a.text,b.text]);}
    const eq=e.querySelector('.scene-equation');
    return {clipped,overlaps,width:rect.width,height:rect.height,theme:document.documentElement.dataset.theme,canvas:!!e.querySelector('canvas'),scroll:document.documentElement.scrollWidth,equationOverflow:eq.scrollWidth-eq.clientWidth};
   });
   assert.equal(result.theme,theme);assert.ok(result.canvas);assert.ok(result.scroll<=width+1);
   assert.ok(result.equationOverflow<=1,`${s.id}: lab equation must fit the reading width`);
   if(result.clipped.length||result.overlaps.length)labelIssues.push({scene:s.id,width,theme,...result});
   checks.push({scene:s.id,width,theme});
   await el.screenshot({path:`qa/lab-${s.id}-${width}-${theme}.png`});
  }
 }
 // Check the actual falling-grid controls, reduced motion, and invisible-scene suspension.
 await page.goto(new URL('index.html',base).href);
 const earth=page.locator('[data-scene=earth]');
 await page.waitForFunction(()=>document.querySelector('[data-scene=earth]').dataset.ready==='true');
 await earth.getByRole('button',{name:'Pause free fall',exact:true}).click();
 assert.equal(await earth.locator('input').count(),0);
 const paused=+(await earth.getAttribute('data-time'));
 assert.ok(paused>=0);
 await earth.getByRole('button',{name:'Play free fall',exact:true}).click();
 const before=+(await earth.getAttribute('data-frames'));
 await page.waitForFunction(n=>+document.querySelector('[data-scene=earth]').dataset.frames>n+2,before);
 // Follow more than two injections: time must keep increasing across recycling.
 await page.waitForFunction(t=>+document.querySelector('[data-scene=earth]').dataset.time>t+1.5,paused,{timeout:20000});
 assert.equal(await earth.locator('[data-flow-status]').innerText(),'Continuous free fall');
 await earth.getByRole('button',{name:'Pause free fall',exact:true}).click();
 const stopped=await earth.getAttribute('data-frames');
 await page.waitForTimeout(150);
 assert.equal(await earth.getAttribute('data-frames'),stopped,'Paused scene must stop updating');
 await earth.getByRole('button',{name:'Play free fall',exact:true}).click();
 await page.locator('.site-footer').scrollIntoViewIfNeeded();
 await page.waitForTimeout(200);
 const hiddenFrames=await earth.getAttribute('data-frames');
 await page.waitForTimeout(200);
 assert.equal(await earth.getAttribute('data-frames'),hiddenFrames,'Offscreen scene must stop updating');
 await page.emulateMedia({reducedMotion:'reduce'});
 await page.goto(new URL('figure-atlas.html',base).href);
 await page.locator('[data-scene=earth]').scrollIntoViewIfNeeded();
 await page.waitForFunction(()=>document.querySelector('[data-scene=earth]').dataset.ready==='true');
 assert.equal(await page.locator('[data-scene=earth]').getAttribute('data-playing'),'false');
 await page.locator('.flow-explanation summary').click();
 assert.equal(await page.locator('.flow-explanation .katex-error').count(),0);
 const explanationOverflow=await page.locator('.flow-explanation .equation').evaluateAll(ns=>ns.map(n=>n.scrollWidth-n.clientWidth));
 assert.ok(explanationOverflow.every(x=>x<=1),`Earth explanation equations overflow: ${explanationOverflow}`);
 await page.screenshot({path:'qa/earth-explanation-mobile.png',fullPage:false});
 await page.emulateMedia({reducedMotion:'no-preference'});
 const fallbackContext=await browser.newContext();
 await fallbackContext.addInitScript(()=>{const get=HTMLCanvasElement.prototype.getContext;HTMLCanvasElement.prototype.getContext=function(type,...args){return /webgl/.test(type)?null:get.call(this,type,...args)};});
 const fallbackPage=await fallbackContext.newPage();
 await fallbackPage.goto(new URL('index.html',base).href);
 await fallbackPage.waitForFunction(()=>document.querySelector('[data-scene=earth]').dataset.ready==='fallback');
 assert.ok(await fallbackPage.locator('[data-scene=earth] .scene-fallback svg').isVisible());
 await fallbackContext.close();
 // Recycling continuity: every retained surface at the phase boundary has an
 // identical successor. Only a hidden outer surface and an absorbed inner one change.
 const eps=1e-7,wrap=INJECTION_INTERVAL-INITIAL_PHASE;
 for(const r0 of [ENTRY_HALF_SIZE,ENTRY_HALF_SIZE*Math.sqrt(1.25),ENTRY_HALF_SIZE*Math.sqrt(3)]){
  assert.ok(cohortRadius(r0,0,wrap+eps)>VIEW_RADIUS,'New reference lines enter outside the view');
  assert.ok(cohortRadius(r0,COHORTS-1,wrap-eps)<1,'Recycled surfaces have completely crossed Earth');
  for(let j=0;j<COHORTS-1;j++)assert.ok(Math.abs(cohortRadius(r0,j,wrap-eps)-cohortRadius(r0,j+1,wrap+eps))<1e-4,'Injection must preserve the visible grid');
  for(const t of [0,.2,2.4,10,1000])assert.ok(Array.from({length:COHORTS},(_,j)=>cohortRadius(r0,j,t)).filter(r=>r>1.01&&r<VIEW_RADIUS).length>=4,'The grid must stay populated at all times');
 }
 // A visible reference line is already bowed toward Earth at startup.
 const age=8*INJECTION_INTERVAL+INITIAL_PHASE,center=rainRadius(ENTRY_HALF_SIZE,age);
 const sideR0=ENTRY_HALF_SIZE*Math.sqrt(1.25),sideX=rainRadius(sideR0,age)/Math.sqrt(1.25);
 assert.ok(center>1 && sideX<VIEW_RADIUS && sideX-center>.1,'Initial visible lines must already be deformed');
 // Independent physical identities, not just a duplicate endpoint calculation.
 for(const r0 of [2,3,5])for(const t of [0,.3,.7]){
  const h=1e-4,r=rainRadius(r0,t),dr=(rainRadius(r0,t+h)-rainRadius(r0,t-h))/(2*h);
  const ddr=(rainRadius(r0,t+h)-2*r+rainRadius(r0,t-h))/(h*h);
  assert.ok(Math.abs(dr+1/Math.sqrt(r))<1e-7,'Rain velocity must solve the first-order ODE');
  assert.ok(Math.abs(ddr+.5/(r*r))<1e-6,'Geodesic coordinate acceleration must give -GM/r²');
  const radialStretch=(rainRadius(r0+h,t)-rainRadius(r0-h,t))/(2*h);
  if(t>0){assert.ok(radialStretch>1);assert.ok(r/r0<1);}
  const physicalV=dr*EARTH_RADIUS/FALL_TIME;
  const shift=Math.sqrt(2*EARTH_GM/(r*EARTH_RADIUS));
  assert.ok(Math.abs(physicalV+shift)<.001,'PG shift cancels rain velocity, giving ds²=-c²dt²');
 }
 assert.ok(Math.abs(Math.sqrt(2*EARTH_GM/EARTH_RADIUS)-11186)<2);
 // Atlas filters, theme-aware SVG, and figure dialog ID isolation.
 await page.goto(new URL('figure-atlas.html',base).href);await page.locator('[data-filter=foundations]').click();assert.equal(await page.locator('.atlas-item:visible').count(),10);
 const figure=page.locator('.atlas-item:visible').first();await figure.locator('[data-figure]').click();await page.locator('#figure-dialog').waitFor({state:'visible'});
 assert.ok(await page.locator('#figure-detail .figure-math').count()>0);
 assert.equal(await page.evaluate(()=>{const ids=[...document.querySelectorAll('[id]')].map(e=>e.id);return ids.length-new Set(ids).size}),0);
 await page.keyboard.press('Escape');await page.locator('#figure-dialog').waitFor({state:'hidden'});
 assert.deepEqual(errors,[]);
 fs.writeFileSync('qa/experience-report.json',JSON.stringify({checks,errors,labelIssues},null,2));
 assert.deepEqual(labelIssues,[],'Default 3D labels overlap or clip; inspect experience-report.json.');
 for(const [tex,context] of [[String.raw`d\Omega^2`,1],[String.raw`\Omega^2g_{\mu\nu}`,9],[String.raw`\Omega_H`,22]])assert.ok(!semanticTex(tex,context).includes('math-curvature'));
 assert.ok(semanticTex(String.raw`\Omega^1{}_2`,21).includes('math-curvature'));
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
