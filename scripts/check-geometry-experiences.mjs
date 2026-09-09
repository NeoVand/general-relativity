import assert from 'node:assert/strict';
import fs from 'node:fs';
import {chromium} from 'playwright';
import {surfaceHeight,surfacePoint,surfaceDerivatives,chartToSurface,surfaceToChart,inChart,domainLayout,SURFACE_CHART_RADIUS,MERCURY,perihelionAdvance,orbitAt,orbitCurve} from '../web/geometry-experiences.js';
import {geometryExperienceHTML} from './geometry-experiences.mjs';
const near=(a,b,tolerance=1e-9)=>assert.ok(Math.abs(a-b)<tolerance,`${a} differs from ${b}`);
near(domainLayout('a').scale,domainLayout('b').scale);
for(const chart of ['a','b']){
 const {to,from,otherOrigin}=domainLayout(chart);
 for(const center of [[0,0],otherOrigin])for(let i=0;i<360;i++){
  const angle=i*Math.PI/180,q=[center[0]+SURFACE_CHART_RADIUS*Math.cos(angle),center[1]+SURFACE_CHART_RADIUS*Math.sin(angle)],pixel=to(q);
  assert.ok(pixel.every(x=>x>12&&x<288),'Both complete rims fit inside the map with a margin');
  from(pixel).forEach((x,j)=>near(x,q[j]));
 }
}
for(const chart of ['a','b'])for(const [u,v]of [[0,0],[.2,-.7],[-.85,.4],[.1,1.1]]){
 const p=chartToSurface(u,v,chart),q=surfaceToChart(p,chart);near(q[0],u);near(q[1],v);near(p[2],surfaceHeight(p[0],p[1]));assert.equal(inChart(p,chart),Math.hypot(u,v)<SURFACE_CHART_RADIUS);
 const h=1e-5,pu=chartToSurface(u+h,v,chart),mu=chartToSurface(u-h,v,chart),pv=chartToSurface(u,v+h,chart),mv=chartToSurface(u,v-h,chart),du=pu.map((x,i)=>(x-mu[i])/(2*h)),dv=pv.map((x,i)=>(x-mv[i])/(2*h));
 near(du[0]*dv[1]-du[1]*dv[0],1,1e-8); // full-rank tangent map, independently differentiated
 const [hx,hy]=surfaceDerivatives(p[0],p[1]);near(du[2],hx*du[0]+hy*du[1],1e-8);near(dv[2],hx*dv[0]+hy*dv[1],1e-8);
}
for(const [x,y]of [[-.7,.3],[.2,1],[-1.2,-.8]]){const [hx,hy]=surfaceDerivatives(x,y),h=1e-5;near(hx,(surfaceHeight(x+h,y)-surfaceHeight(x-h,y))/(2*h),1e-8);near(hy,(surfaceHeight(x,y+h)-surfaceHeight(x,y-h))/(2*h),1e-8);}
const P=surfacePoint(.12,.28);assert.ok(inChart(P,'a')&&inChart(P,'b'));const qa=surfaceToChart(P,'a'),qb=surfaceToChart(P,'b'),c=Math.cos(Math.PI/5),s=Math.sin(Math.PI/5);near(qb[0],c*(qa[0]-1.1)+s*(qa[1]-.15));near(qb[1],-s*(qa[0]-1.1)+c*(qa[1]-.15));
assert.ok(!inChart(chartToSurface(-1.1,0,'a'),'b'));assert.ok(!inChart(chartToSurface(1.1,0,'b'),'a'));
const physicalArc=perihelionAdvance()*180/Math.PI*3600;assert.ok(physicalArc>.103&&physicalArc<.104);near(physicalArc*36525/MERCURY.periodDays,42.98,.1);
for(const e of [.05,.2056,.7])for(const factor of [0,1,300000]){
 const per=orbitAt(0,e,factor),apo=orbitAt(.5,e,factor),next=orbitAt(1,e,factor);near(per.radius,1-e);near(apo.radius,1+e);near(next.radius,per.radius);near(next.angle-per.angle,2*Math.PI+factor*perihelionAdvance(e));
 for(const t of [.03,.2,.49,.78,1.25,3.9]){const f=orbitAt(t,e,factor),curve=orbitCurve(f.anomaly,e,factor);near(Math.hypot(...f.newton),f.radius);near(Math.hypot(...f.relativistic),f.radius);curve.forEach((x,i)=>near(x,f.relativistic[i]));const x=f.newton[0],y=f.newton[1];near((x+e)**2+y*y/(1-e*e),1,1e-8);}
 // Equal areas in equal Newtonian times: numerically differentiate the position.
 for(const t of [.07,.21,.53,.88]){const h=1e-6,l=orbitAt(t-h,e,0),r=orbitAt(t+h,e,0),p=orbitAt(t,e,0),dx=(r.newton[0]-l.newton[0])/(2*h),dy=(r.newton[1]-l.newton[1])/(2*h);near(p.newton[0]*dy-p.newton[1]*dx,2*Math.PI*Math.sqrt(1-e*e),2e-7);}
}
for(const type of ['manifold','precession']){const html=geometryExperienceHTML(type);assert.ok(html.includes('narration-script'));assert.ok(html.includes('data-experience-controls'));assert.ok(!html.includes('katex-error'));assert.ok(html.includes('gx-fallback'));}
console.log('Geometry experiments: full-rank charts, overlap, tangent derivatives, Kepler area law and leading Mercury precession verified.');
if(process.env.GEOMETRY_NUMERICAL_ONLY==='1')process.exit(0);
const base=process.env.BOOK_URL||'http://localhost:4173/',chrome='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const browser=await chromium.launch({headless:true,...(fs.existsSync(chrome)?{executablePath:chrome}:{}),args:['--enable-unsafe-swiftshader']});const errors=[],checks=[];fs.mkdirSync('qa',{recursive:true});
try{
 for(const width of [1440,390])for(const theme of ['light','dark']){
  const page=await browser.newPage({viewport:{width,height:width===390?844:1100},reducedMotion:'reduce'});page.on('pageerror',e=>errors.push(e.message));page.on('console',msg=>{if(msg.type()==='error'&&/WebGL|Shader|GLSL/i.test(msg.text()))errors.push(msg.text());});
  for(const [type,chapter]of [['manifold',4],['precession',16]]){
   await page.goto(new URL(`chapter-${chapter}.html`,base).href);await page.evaluate(t=>document.documentElement.dataset.theme=t,theme);const el=page.locator(`[data-geometry-experience=${type}]`);await el.scrollIntoViewIfNeeded();await page.waitForFunction(t=>document.querySelector(`[data-geometry-experience=${t}]`)?.dataset.spatialReady==='true',type);await page.evaluate(()=>document.fonts.ready);
   const state=async()=>JSON.parse(await el.getAttribute('data-experience-state'));
   const layout=async()=>{const info=await el.evaluate(e=>{const r=e.getBoundingClientRect(),label=e.querySelector('.gx-space-label'),l=label?.getBoundingClientRect(),s=e.querySelector('.gx-stage').getBoundingClientRect();return {overflow:e.scrollWidth-e.clientWidth,doc:document.documentElement.scrollWidth,svgTexts:e.querySelectorAll('.gx-stage svg text,.gx-domain svg text').length,errors:e.querySelectorAll('.katex-error').length,source:e.dataset.narrationSource,readoutClip:[...e.querySelectorAll('.gx-readout .katex-html')].map(n=>n.getBoundingClientRect()).filter(b=>b.left<r.left-1||b.right>r.right+1).length,math:e.querySelectorAll('.katex').length,label:l?{inside:l.left>=s.left-1&&l.right<=s.right+1&&l.top>=s.top-1&&l.bottom<=s.bottom+1}:null};});assert.ok(info.overflow<=1);assert.ok(info.doc<=width+1);assert.equal(info.svgTexts,0);assert.equal(info.errors,0);assert.ok(info.math>5);assert.equal(info.readoutClip,0,'Readout math stays inside the actual experience bounds');assert.ok(info.source.length>250);assert.ok(info.label?.inside);assert.equal(await el.locator('.gx-topline>.passage-tools').count(),1);assert.equal(await el.locator(':scope>.passage-tools').count(),0);};
   if(type==='manifold'){
    const original=(await state()).point;await el.locator('[data-gx-chart=b]').click();assert.deepEqual((await state()).point,original);assert.equal((await state()).chart,'b');assert.equal(await el.locator('.gx-panel-heading annotation').textContent(),"(u',v')");assert.ok((await el.getAttribute('data-narration-source')).includes("Chart B assigns $(u',v')"));await el.locator('[data-gx-point=only]').click();assert.ok((await el.locator('.gx-insight').textContent()).includes('other chart does not'));await el.locator('[data-gx-chart=a]').click();assert.ok((await el.locator('.gx-insight').textContent()).includes('does not cover'));await el.locator('[data-gx-point=overlap]').click();await el.locator('[data-gx-tangent]').click();assert.equal((await state()).tangent,true);
    const domain=el.locator('.gx-domain');await domain.focus();await domain.press('ArrowRight');assert.notDeepEqual((await state()).point,original);await domain.press('Home');assert.deepEqual((await state()).point,original);await layout();
    for(const chart of ['a','b']){
     await el.locator(`[data-gx-chart=${chart}]`).click();await domain.scrollIntoViewIfNeeded();
     const map=await domain.evaluate(e=>{
      const box=e.getBoundingClientRect(),svg=e.querySelector('svg'),matrix=svg.getScreenCTM(),rim=e.querySelector('.gx-domain-rim');
      const circleBounds=[...e.querySelectorAll('.gx-domain-rim,.gx-domain-other')].map(c=>c.getBoundingClientRect());
      const target=new DOMPoint(rim.cx.baseVal.value+rim.r.baseVal.value*.42/1.35,rim.cy.baseVal.value+rim.r.baseVal.value*.33/1.35).matrixTransform(matrix);
      return {inside:circleBounds.every(b=>b.left>box.left+4&&b.right<box.right-4&&b.top>box.top+4&&b.bottom<box.bottom-4),roundness:parseFloat(getComputedStyle(e).borderRadius)/box.width,target:{x:target.x,y:target.y}};
     });
     assert.ok(map.inside,'Both chart rims fit their actual container');assert.ok(map.roundness<.1,'The map does not have a circular crop');
     await page.mouse.click(map.target.x,map.target.y);
     (await state()).point.forEach((x,i)=>near(x,chartToSurface(.42,-.33,chart)[i],2e-6));
     const pointBox=await domain.locator('.gx-point').boundingBox();near(pointBox.x+pointBox.width/2,map.target.x,.02);near(pointBox.y+pointBox.height/2,map.target.y,.02);
     await domain.press('Home');assert.deepEqual((await state()).point,original);
    }
    const spatial=el.locator('.gx-spatial');await spatial.scrollIntoViewIfNeeded();
    const distance=async()=>Number(await spatial.getAttribute('data-camera-distance')),radius=await distance();
    await spatial.focus();
    for(const direction of ['ArrowRight','ArrowUp','ArrowLeft','ArrowDown'])for(let i=0;i<10;i++){await spatial.press(direction);near(await distance(),radius,1e-7);}
    const canvasBox=await spatial.locator('canvas').boundingBox();
    await page.mouse.move(canvasBox.x+canvasBox.width*.45,canvasBox.y+canvasBox.height*.45);await page.mouse.down();
    await page.mouse.move(canvasBox.x+canvasBox.width*.7,canvasBox.y+canvasBox.height*.6,{steps:12});await page.mouse.up();near(await distance(),radius,1e-7);
    await spatial.press('Home');near(await distance(),radius,1e-7);await layout();
    if(width===1440&&theme==='dark'){
     // Almost a full turn, with evidence at quarter turns. Reframing by the
     // current silhouette used to change the apparent scale throughout this.
     for(let i=1;i<=52;i++){
      await spatial.press('ArrowRight');near(await distance(),radius,1e-7);
      if(i%13===0)await spatial.screenshot({path:`qa/manifold-orbit-${i/13}.png`});
     }
     await spatial.press('Home');
     for(let i=0;i<5;i++)await spatial.press('ArrowDown');
     await spatial.screenshot({path:'qa/manifold-grazing.png'});near(await distance(),radius,1e-7);
     for(let i=0;i<7;i++)await spatial.press('ArrowDown');
     await spatial.screenshot({path:'qa/manifold-underside.png'});near(await distance(),radius,1e-7);
     await spatial.press('Home');
    }
   }else{
    assert.equal((await state()).playing,false);const start=(await state()).cycles;await page.waitForTimeout(250);near((await state()).cycles,start);for(let i=0;i<4;i++)await el.locator('[data-gx-step]').click();assert.equal((await state()).cycles,4);await el.locator('[data-gx-e]').fill('0.6');assert.equal((await state()).eccentricity,.6);await el.locator('[data-gx-scale="1"]').click();assert.equal((await state()).magnification,1);await el.locator('[data-gx-scale="300000"]').click();await el.locator('[data-gx-mercury]').click();assert.equal((await state()).eccentricity,.2056);await el.locator('[data-gx-play]').click();const a=(await state()).cycles;await page.waitForTimeout(450);assert.ok((await state()).cycles>a,'Explicit play works even with reduced-motion preference');await el.locator('[data-gx-play]').click();const paused=(await state()).cycles;await page.waitForTimeout(250);near((await state()).cycles,paused);for(let i=0;i<4;i++)await el.locator('[data-gx-step]').click();await layout();
   }
   await page.evaluate(()=>document.activeElement?.blur());const captureHeight=Math.max(width===390?844:1100,Math.ceil((await el.boundingBox()).height+120));await page.setViewportSize({width,height:captureHeight});await el.scrollIntoViewIfNeeded();await el.screenshot({path:`qa/geometry-experience-${type}-${width}-${theme}.png`,style:'.topbar,.study-launcher,.skip-link{visibility:hidden!important}'});checks.push({type,width,theme,state:await state()});await page.setViewportSize({width,height:width===390?844:1100});
  }await page.close();
 }
 // Reduced motion is not the offscreen pause mechanism; this check explicitly plays.
 const page=await browser.newPage();await page.goto(new URL('chapter-16.html',base).href);const orbit=page.locator('[data-geometry-experience=precession]');await orbit.scrollIntoViewIfNeeded();await page.waitForFunction(()=>document.querySelector('[data-geometry-experience=precession]')?.dataset.spatialReady==='true');
 await page.evaluate(async()=>{const data=JSON.parse(document.getElementById('reading-data').textContent);window.__geometryQA=await import(new URL(data.assets.geometryExperiences,location.href).href);});
 const orbitState=()=>page.evaluate(()=>window.__geometryQA.getGeometryExperienceState().find(x=>x.type==='precession').state);
 const initialCycles=(await orbitState()).cycles;await orbit.locator('[data-gx-play]').click();
 await page.waitForFunction(initial=>window.__geometryQA.getGeometryExperienceState().find(x=>x.type==='precession').state.cycles>initial,initialCycles);
 // Smooth scrolling can still leave the experiment visible after a fixed delay.
 // Wait for actual nonintersection, then sample the live simulation, not its
 // intentionally throttled readout (which can hide continued motion).
 await orbit.evaluate(e=>new Promise((resolve,reject)=>{const timer=setTimeout(()=>{observer.disconnect();reject(new Error('Orbit did not leave the viewport'));},5000);const observer=new IntersectionObserver(entries=>{if(!entries[0].isIntersecting){observer.disconnect();clearTimeout(timer);requestAnimationFrame(()=>requestAnimationFrame(resolve));}});observer.observe(e);window.scrollTo({top:0,behavior:'instant'});}));
 const stopped=(await orbitState()).cycles;await page.waitForTimeout(350);near((await orbitState()).cycles,stopped);
 await orbit.scrollIntoViewIfNeeded();await page.waitForFunction(previous=>window.__geometryQA.getGeometryExperienceState().find(x=>x.type==='precession').state.cycles>previous,stopped);
 await page.close();
 const fallback=await browser.newPage();await fallback.addInitScript(()=>{const get=HTMLCanvasElement.prototype.getContext;HTMLCanvasElement.prototype.getContext=function(kind,...args){return /^webgl/.test(kind)?null:get.call(this,kind,...args);};});
 for(const [type,chapter]of [['manifold',4],['precession',16]]){await fallback.goto(new URL(`chapter-${chapter}.html`,base).href);const el=fallback.locator(`[data-geometry-experience=${type}]`);await el.scrollIntoViewIfNeeded();await fallback.waitForFunction(t=>document.querySelector(`[data-geometry-experience=${t}]`)?.dataset.spatialReady==='fallback',type);assert.equal(await el.locator('.gx-fallback').isVisible(),true);await el.locator(type==='manifold'?'[data-gx-chart=b]':'[data-gx-step]').click();assert.ok(await el.locator('.gx-fallback svg path').count()>3);}
 await fallback.close();assert.deepEqual(errors,[]);fs.writeFileSync('qa/geometry-experiences-report.json',JSON.stringify({checks,errors},null,2));console.log(`Geometry experiences: ${checks.length} viewport/theme combinations, controls, mathematical readouts, animation, offscreen pause and SVG fallbacks passed.`);
}finally{await browser.close();}
