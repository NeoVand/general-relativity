import fs from 'node:fs';
import assert from 'node:assert/strict';
import {chromium} from 'playwright';
import {scenes} from './scenes.mjs';
import {rainRadius, FALL_TIME, ENTRY_HALF_SIZE, VIEW_RADIUS, INJECTION_INTERVAL, COHORTS, INITIAL_PHASE, cohortRadius, EARTH_GM, EARTH_RADIUS} from '../web/earth-flow.js';
import {math,semanticTex} from './math-system.mjs';
import {covectorCrossings,coneNearSide,embeddingHeight,radialProperLength,waveStrain,waveDisplacement} from '../web/scene-models.js';
// Independent physical checks: induced geometry, quadrature, polarization symmetry,
// and wave propagation constrain the model beyond its own displayed endpoints.
for(const c of [.05,.25,.65]){
 const n=1000,a=.75,b=1,step=(b-a)/n,f=r=>1/Math.sqrt(1-c/r);
 let sum=f(a)+f(b);for(let i=1;i<n;i++)sum+=(i%2?4:2)*f(a+i*step);
 assert.ok(Math.abs(radialProperLength(a,b,c)-sum*step/3)<1e-10,'The ruler must equal the Schwarzschild radial metric integral');
 for(const r of [.72,.85,1]){const eps=1e-5,dz=(embeddingHeight(r+eps,c)-embeddingHeight(r-eps,c))/(2*eps);assert.ok(Math.abs(1+dz*dz-1/(1-c/r))<1e-6,'The Euclidean embedding must induce the spatial metric');}
}
assert.equal(radialProperLength(.75,1,0),.25);
assert.ok(radialProperLength(.75,1,.65)>radialProperLength(.75,1,.25));
assert.throws(()=>radialProperLength(.5,1,.65),RangeError);
assert.deepEqual(covectorCrossings(.2),[]);assert.deepEqual(covectorCrossings(.5),[[1,2/3,1/3]]);
for(const [x,y,z] of covectorCrossings(1)){assert.equal(y/x,2/3);assert.equal(z/x,1/3);assert.ok(Number.isInteger(x));}
for(const a of [.2,1,2,3])assert.notEqual(coneNearSide(Math.cos(a),Math.sin(a),2,3),coneNearSide(Math.cos(a),Math.sin(a),-2,-3));
for(const h of [-.35,0,.25]){
 const ex=waveDisplacement(1,0,h,'cross'),ey=waveDisplacement(0,1,h,'cross');
 assert.ok(Math.abs(ex[0]+ey[1]-2)<1e-12,'The linear displacement perturbation is traceless');
 assert.ok(Math.abs(ex[0]*ey[1]-ex[1]*ey[0]-(1-h*h/4))<1e-12,'Area changes vanish to first order');
 const [x,y]=[.6,.8],q=Math.SQRT1_2,rotated=waveDisplacement(q*(x+y),q*(-x+y),h,'plus'),back=[q*(rotated[0]-rotated[1]),q*(rotated[0]+rotated[1])],cross=waveDisplacement(x,y,h,'cross');
 assert.ok(back.every((v,i)=>Math.abs(v-cross[i])<1e-12),'Cross polarization is the plus tensor rotated forty-five degrees');
}
for(const frequency of [.75,1.5,2.5]){
 const z=.7,phase=.8,dt=.31;
 assert.ok(Math.abs(waveStrain(z+dt,phase+frequency*dt,.25,frequency)-waveStrain(z,phase,.25,frequency))<1e-12,'A fixed phase must travel at c for every frequency');
}
const chrome='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const browser=await chromium.launch({headless:true,args:['--enable-unsafe-swiftshader'],...(fs.existsSync(chrome)?{executablePath:chrome}:{})});
const page=await browser.newPage();const base=process.env.BOOK_URL||'http://localhost:4173/';
const errors=[],checks=[],labelIssues=[];page.on('pageerror',e=>errors.push(e.message));fs.mkdirSync('qa',{recursive:true});
async function assertRulerLabelClear(element){
 const overlap=await element.evaluate(e=>{const stage=e.querySelector('.scene-stage').getBoundingClientRect(),label=e.querySelector('.scene-label.math-observer').getBoundingClientRect();return JSON.parse(e.dataset.rulerScreen).some(([x,y])=>{x=stage.x+x*stage.width;y=stage.y+y*stage.height;return x>label.left-2&&x<label.right+2&&y>label.top-2&&y<label.bottom+2});});
 assert.equal(overlap,false,'The length label must not cover its measured ruler');
}
// A scroll request is not proof that an animated stage left the viewport.
// Observe the same stage as the runtime and let both observers settle first.
async function scrollSceneVisibility(element,visible){return element.evaluate((e,wanted)=>new Promise((resolve,reject)=>{
 const stage=e.querySelector('.scene-stage');let frame=0;
 const snapshot=()=>{const r=stage.getBoundingClientRect();return {frames:e.dataset.frames,phase:e.dataset.phase,time:e.dataset.time,detectorMatrix:e.dataset.detectorMatrix,playing:e.dataset.playing,animating:e.dataset.animating,top:r.top,bottom:r.bottom,viewport:innerHeight};};
 const timeout=setTimeout(()=>{observer.disconnect();cancelAnimationFrame(frame);reject(Error(`${e.dataset.scene} did not become ${wanted?'visible':'offscreen'}`));},5000);
 const observer=new IntersectionObserver(entries=>{
  if(entries.at(-1).isIntersecting!==wanted)return;
  observer.disconnect();
  frame=requestAnimationFrame(()=>{frame=requestAnimationFrame(()=>{clearTimeout(timeout);resolve(snapshot());});});
 });observer.observe(stage);
 if(wanted)stage.scrollIntoView({block:'center',behavior:'instant'});
 else scrollTo({top:document.documentElement.scrollHeight,left:0,behavior:'instant'});
}),visible);}
// Chrome's beyond-viewport element capture can temporarily reflow the page and
// clip a tall section's left edge. Give the capture its full height explicitly;
// all layout/label assertions still run at the original requested viewport.
async function captureScene(element,path){
 const viewport=page.viewportSize(),height=Math.ceil((await element.boundingBox()).height)+160;
 if(height>viewport.height)await page.setViewportSize({...viewport,height});
 try{await element.scrollIntoViewIfNeeded();await element.screenshot({path});}
 finally{if(height>viewport.height)await page.setViewportSize(viewport);}
}
try{
 for(const width of [1440,390])for(const theme of ['light','dark']){
  await page.setViewportSize({width,height:width===390?844:1100});
  await page.goto(new URL('index.html',base).href);await page.evaluate(t=>localStorage.setItem('gr-theme',t),theme);
  for(const s of scenes){
   await page.goto(new URL(`${s.id==='sphere'?'figure-atlas.html':`chapter-${s.chapter}.html`}#scene-${s.id}`,base).href);
   const el=page.locator(`#scene-${s.id}`);await el.scrollIntoViewIfNeeded();await page.waitForFunction(id=>document.getElementById(id).dataset.ready==='true',`scene-${s.id}`);
   await page.evaluate(()=>document.fonts.ready);
   const range=el.locator(`#scene-${s.id}-parameter`);
   if(s.id==='wave'&&await el.getAttribute('data-playing')==='true')await el.locator('[data-wave-play]').click();
   if(s.id==='earth')await el.locator('.scene-stage').press('Space');
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
   else if(s.id==='embedding'){assert.ok(Math.abs(+data.measurement-radialProperLength(.75,1,.65))<1e-12);assert.equal(+data.compactness,.65);}
   else if(s.id==='covector'){assert.equal(+data.measurement,3);assert.deepEqual(JSON.parse(data.crossings),[[1,2/3,1/3],[2,4/3,2/3],[3,2,1]]);}
   else if(s.id==='cone'){assert.equal(+data.measurement,.95);const depth=JSON.parse(data.coneDepth);assert.ok(depth.near>100&&depth.far>100);}
   else if(s.id==='expansion')assert.equal(+data.measurement,1.5);
   else if(s.id==='wave')assert.ok(Math.abs(+data.phase-2*Math.PI)<1e-12);
   else if(s.id==='slices')assert.equal(+data.measurement,1.2);
   if(s.id!=='earth'){
    const cropped=await el.evaluate(e=>{const b=e.querySelector('.scene-stage').getBoundingClientRect();return [...e.querySelectorAll('.scene-label')].filter(n=>{const r=n.getBoundingClientRect();return r.left<b.left||r.top<b.top||r.right>b.right||r.bottom>b.bottom}).map(n=>n.textContent);});
    assert.deepEqual(cropped,[],`${s.id}: labels must fit at the control maximum`);
   }
   if(s.id==='embedding')await assertRulerLabelClear(el);
   // Inspect a representative intermediate state as well as the endpoint.
   if(s.id!=='earth'){await range.fill(String(s.id==='sphere'?180:s.value));await range.dispatchEvent('input');}
   if(s.id==='embedding')await assertRulerLabelClear(el);
   if(s.id!=='earth'){await el.locator('.scene-stage').press('ArrowLeft');await el.locator('.scene-stage').press('Home');}
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
   if(s.id!=='earth'){
    assert.equal(await el.locator('.scene-actions>.passage-tools').count(),1,'Listening and explaining share the scene toolbar');
    assert.equal(await el.locator('.scene-stage>.passage-tools').count(),0,'No floating actions across the drawing');
    const diagram=el.locator('.scene-diagram');
    assert.equal(await diagram.count(),1,`${s.id}: companion diagram must belong to the same illustration`);
    assert.equal(await diagram.isVisible(),false);
    await el.locator('[data-scene-mode=diagram]').click();
    assert.equal(await diagram.isVisible(),true);
    assert.equal(await el.locator('canvas').isVisible(),false);
    assert.equal(await el.locator('.scene-controls').isVisible(),false);
    assert.equal(await el.locator('.scene-stage').getAttribute('tabindex'),null,'A static diagram does not add a keyboard stop');
    assert.ok((await el.locator('.scene-stage').getAttribute('aria-label')).includes('Static diagram'),'The accessible description follows the selected view');
    assert.equal(await el.locator('.scene-diagram [data-passage]').count(),0,'The alternate diagram must not repeat the narration');
    await captureScene(el,`qa/lab-${s.id}-diagram-${width}-${theme}.png`);
    await el.locator('[data-scene-mode="3d"]').click();
    assert.equal(await el.locator('canvas').isVisible(),true);
    assert.ok(await range.evaluate(input=>input.getAttribute('aria-valuetext')),'Slider should expose its formatted value');
   }
   checks.push({scene:s.id,width,theme});
   await captureScene(el,`qa/lab-${s.id}-${width}-${theme}.png`);
  }
 }
 // Wave controls represent distinct physics; phase scrubbing pauses playback.
 await page.goto(new URL('chapter-18.html#scene-wave',base).href);
 const wave=page.locator('#scene-wave');await wave.scrollIntoViewIfNeeded();
 await page.waitForFunction(()=>document.querySelector('#scene-wave').dataset.ready==='true');
 if(await wave.getAttribute('data-playing')==='true')await wave.locator('[data-wave-play]').click();
 await wave.locator('#scene-wave-parameter').fill('50');await wave.locator('#scene-wave-parameter').dispatchEvent('input');
 await wave.locator('[data-wave-amplitude]').fill('25');await wave.locator('[data-wave-amplitude]').dispatchEvent('input');
 await wave.locator('[data-wave-polarization=cross]').click();
 assert.equal(await wave.getAttribute('data-polarization'),'cross');
 const crossMatrix=JSON.parse(await wave.getAttribute('data-detector-matrix'));
 assert.ok(crossMatrix.every((v,i)=>Math.abs(v-[1,-.125,-.125,1][i])<1e-12));
 assert.ok((await wave.locator('[data-wave-equation] annotation').textContent()).includes('h}_\\times'));
 assert.ok((await wave.getAttribute('data-narration-source')).includes('Cross polarization'));
 await wave.locator('[data-wave-amplitude]').fill('0');await wave.locator('[data-wave-amplitude]').dispatchEvent('input');
 assert.deepEqual(JSON.parse(await wave.getAttribute('data-detector-matrix')),[1,0,0,1]);
 await wave.locator('[data-wave-amplitude]').fill('35');await wave.locator('[data-wave-amplitude]').dispatchEvent('input');
 await wave.locator('[data-wave-frequency]').fill('250');await wave.locator('[data-wave-frequency]').dispatchEvent('input');
 assert.equal(+(await wave.getAttribute('data-frequency')),2.5);
 await captureScene(wave,'qa/lab-wave-controls-cross-mobile.png');
 await wave.locator('[data-wave-play]').click();
 const initialWaveFrames=+(await wave.getAttribute('data-frames')||0);
 await page.waitForFunction(n=>+document.querySelector('#scene-wave').dataset.frames>n+4,initialWaveFrames);
 await wave.locator('[data-wave-play]').click();
 const pausedWave=await wave.getAttribute('data-phase');await page.waitForTimeout(180);
 assert.equal(await wave.getAttribute('data-phase'),pausedWave,'Paused wave must hold its phase');
 await wave.locator('[data-wave-play]').click();
 await wave.locator('[data-scene-mode=diagram]').click();await page.waitForTimeout(100);
 const diagramFrames=await wave.getAttribute('data-frames');await page.waitForTimeout(160);
 assert.equal(await wave.getAttribute('data-frames'),diagramFrames,'The alternate diagram must suspend wave animation');
 await wave.locator('[data-scene-mode="3d"]').click();
 await page.waitForFunction(n=>+document.querySelector('#scene-wave').dataset.frames>n+2,+diagramFrames);
 const hiddenWave=await scrollSceneVisibility(wave,false);
 assert.ok(hiddenWave.bottom<=0||hiddenWave.top>=hiddenWave.viewport,'The wave stage must actually be outside the viewport');
 assert.equal(hiddenWave.playing,'true','Offscreen suspension preserves play intent');
 assert.equal(hiddenWave.animating,'false','The offscreen wave has canceled its animation loop');
 await page.waitForTimeout(350);
 assert.equal(await wave.getAttribute('data-frames'),hiddenWave.frames,'Offscreen wave must stop rendering frames');
 assert.equal(await wave.getAttribute('data-phase'),hiddenWave.phase,'Offscreen wave must hold its internal phase');
 assert.equal(await wave.getAttribute('data-detector-matrix'),hiddenWave.detectorMatrix,'Offscreen detector geometry must remain unchanged');
 const resumedWave=await scrollSceneVisibility(wave,true);
 assert.equal(resumedWave.playing,'true');assert.equal(resumedWave.animating,'true');
 await page.waitForFunction(n=>+document.querySelector('#scene-wave').dataset.frames>n+2,+hiddenWave.frames,{timeout:5000});
 await page.emulateMedia({reducedMotion:'reduce'});
 await page.waitForFunction(()=>document.querySelector('#scene-wave').dataset.playing==='false',null,{timeout:5000});
 assert.equal(await wave.getAttribute('data-playing'),'false','Enabling reduced motion pauses an existing animation');
 await page.reload();await wave.scrollIntoViewIfNeeded();await page.waitForFunction(()=>document.querySelector('#scene-wave').dataset.ready==='true');
 assert.equal(await wave.getAttribute('data-playing'),'false','Reduced motion disables autoplay');
 await page.emulateMedia({reducedMotion:'no-preference'});
 // The two fixed ruler endpoints remain outside the horizon across all masses.
 await page.goto(new URL('chapter-17.html#scene-embedding',base).href);
 const embedding=page.locator('#scene-embedding');await embedding.scrollIntoViewIfNeeded();await page.waitForFunction(()=>document.querySelector('#scene-embedding').dataset.ready==='true');
 let previousLength=0;
 for(const value of ['5','25','65']){
  await embedding.locator('input').fill(value);await embedding.locator('input').dispatchEvent('input');
  await assertRulerLabelClear(embedding);
  const ruler=JSON.parse(await embedding.getAttribute('data-ruler'));assert.equal(ruler.from,.75);assert.equal(ruler.to,1);assert.equal(ruler.coordinate,.25);assert.ok(ruler.proper>previousLength);previousLength=ruler.proper;
 }
 await captureScene(embedding,'qa/lab-embedding-high-mass-mobile.png');
 // Near/far cues must follow the camera, not a fixed convention in the model.
 await page.goto(new URL('chapter-3.html#scene-cone',base).href);
 const cone=page.locator('#scene-cone');await cone.scrollIntoViewIfNeeded();await page.waitForFunction(()=>document.querySelector('#scene-cone').dataset.ready==='true');
 const firstDepth=JSON.parse(await cone.getAttribute('data-cone-depth'));
 await cone.locator('.scene-stage').press('ArrowLeft');
 assert.notEqual(JSON.parse(await cone.getAttribute('data-cone-depth')).angle,firstDepth.angle);
 // Check the actual falling-grid controls, reduced motion, and invisible-scene suspension.
 await page.goto(new URL('index.html',base).href);
 const earth=page.locator('[data-scene=earth]');
 await page.waitForFunction(()=>document.querySelector('[data-scene=earth]').dataset.ready==='true');
 await earth.locator('.scene-stage').press('Space');
 assert.equal(await earth.locator('input').count(),0);
 const paused=+(await earth.getAttribute('data-time'));
 assert.ok(paused>=0);
 await earth.locator('.scene-stage').press('Space');
 const before=+(await earth.getAttribute('data-frames'));
 await page.waitForFunction(n=>+document.querySelector('[data-scene=earth]').dataset.frames>n+2,before);
 // Follow more than two injections: time must keep increasing across recycling.
 await page.waitForFunction(t=>+document.querySelector('[data-scene=earth]').dataset.time>t+1.5,paused,{timeout:20000});
 assert.equal(await earth.locator('button,input,.flow-playback,.scene-toolbar,.scene-heading,.flow-key').count(),0,'The cover must contain only the animation');
 const framing=await earth.locator('.scene-stage').evaluate(e=>{const r=e.getBoundingClientRect();return {width:r.width,height:r.height,mask:getComputedStyle(e.querySelector('canvas')).maskImage};});
 assert.ok(Math.abs(framing.width-framing.height)<1,'Earth needs a square frame with equal clearance');
 assert.ok(framing.mask.includes('radial-gradient')&&framing.mask.includes('100%'),'The canvas must fade fully at every boundary');
 await earth.locator('.scene-stage').press('Space');
 const stopped=await earth.getAttribute('data-frames');
 await page.waitForTimeout(150);
 assert.equal(await earth.getAttribute('data-frames'),stopped,'Paused scene must stop updating');
 await earth.locator('.scene-stage').press('Space');
 const hiddenEarth=await scrollSceneVisibility(earth,false);
 assert.ok(hiddenEarth.bottom<=0||hiddenEarth.top>=hiddenEarth.viewport,'Earth must actually be outside the viewport');
 assert.equal(hiddenEarth.playing,'true','Offscreen suspension preserves Earth play intent');
 await page.waitForTimeout(350);
 assert.equal(await earth.getAttribute('data-frames'),hiddenEarth.frames,'Offscreen Earth must stop rendering frames');
 assert.equal(await earth.getAttribute('data-time'),hiddenEarth.time,'Offscreen Earth must hold its internal time');
 assert.equal(await earth.getAttribute('data-phase'),hiddenEarth.phase,'Offscreen Earth must hold its grid phase');
 const resumedEarth=await scrollSceneVisibility(earth,true);assert.equal(resumedEarth.playing,'true');
 await page.waitForFunction(n=>+document.querySelector('[data-scene=earth]').dataset.frames>n+2,+hiddenEarth.frames,{timeout:5000});
 await page.waitForFunction(t=>+document.querySelector('[data-scene=earth]').dataset.time>t,+hiddenEarth.time,{timeout:5000});
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
 await fallbackPage.goto(new URL('chapter-2.html#scene-covector',base).href);
 await fallbackPage.locator('#scene-covector').scrollIntoViewIfNeeded();
 await fallbackPage.waitForFunction(()=>document.querySelector('#scene-covector').dataset.ready==='fallback');
 assert.ok(await fallbackPage.locator('#scene-covector .scene-diagram').isVisible(),'WebGL failure selects the readable companion diagram');
 assert.equal(await fallbackPage.locator('#scene-covector [data-scene-mode="3d"]').isDisabled(),true);
 assert.equal(await fallbackPage.locator('#scene-covector .scene-controls').isVisible(),false);
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
 // A canonical figure link must reveal its now-paired diagram before scrolling.
 await page.goto(new URL('chapter-2.html#figure-vector-covector',base).href);
 await page.waitForFunction(()=>document.querySelector('#scene-covector')?.dataset.activeView==='diagram');
 assert.ok(await page.locator('#figure-vector-covector').isVisible());
 assert.equal(await page.locator('#scene-covector .scene-controls').isVisible(),false);
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
