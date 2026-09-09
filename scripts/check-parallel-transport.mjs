import assert from 'node:assert/strict';
import fs from 'node:fs';
import {chromium} from 'playwright';
import {transportDefaults,transportState,transportAt,transportResult,transportLoop,unit,dot,add,scale,surfaceFrame} from '../web/parallel-transport-model.js';
const near=(a,b,t=1e-10)=>assert.ok(Math.abs(a-b)<t,`${a} != ${b}`);
function integrateLeg(surface,A,B,R,initial){
 const difference=B.map((b,i)=>b-A[i]);
 // A normalized straight chord parametrizes the same spherical great-circle
 // arc, at a different speed from the renderer's exact rotation.
 function derivative(t,V){
  let n,dn;
  if(surface==='sphere'){
   const chord=A.map((a,i)=>a+t*difference[i]),length=Math.hypot(...chord);n=unit(chord);
   dn=scale(add(difference,scale(n,-dot(n,difference))),1/length);
  }else{const f=surfaceFrame(surface,A[0]+t*difference[0],A[1]+t*difference[1],R);n=f.normal;dn=surface==='plane'?[0,0,0]:scale(f.e1,-difference[0]/R);}
  return scale(n,-dot(V,dn));
 }
 let V=[...initial];const count=512,h=1/count;
 for(let i=0;i<count;i++){
  const t=i*h,k1=derivative(t,V),k2=derivative(t+h/2,add(V,scale(k1,h/2))),k3=derivative(t+h/2,add(V,scale(k2,h/2))),k4=derivative(t+h,add(V,scale(k3,h)));
  V=V.map((x,j)=>x+h*(k1[j]+2*k2[j]+2*k3[j]+k4[j])/6);
 }
 return V;
}
for(const surface of ['plane','cylinder','sphere'])for(const radius of [.8,1,1.6])for(const size of [.15,.45,1])for(const reverse of [false,true]){
 const state={surface,radius,size,reverse,progress:0},loop=transportLoop(state),result=transportResult(state),start=transportAt(state),end=transportAt({...state,progress:1});
 for(let i=0;i<=40;i++){const f=transportAt({...state,progress:i/40});near(f.length,1);near(f.normalComponent,0);}
 for(let j=0;j<3;j++)near(end.point[j],start.point[j]);
 near(result.angle,result.signedArea*result.curvature);
 if(surface==='sphere'){
  const alpha=size*Math.PI/2,c=Math.cos(alpha),corner=Math.acos(c/Math.sqrt(1+c*c));
  near(result.area,radius**2*(2*corner-Math.PI/2));
  if(size===1)near(Math.abs(result.angle),Math.PI/2);
 }else near(result.angle,0);
 let numerical=start.vector;
 for(let leg=0;leg<3;leg++)numerical=integrateLeg(surface,loop.vertices[leg],loop.vertices[leg+1],radius,numerical);
 for(let j=0;j<3;j++)near(numerical[j],end.vector[j],4e-10);
 // Return over the identical segments in reverse, without resetting the vector.
 for(let leg=2;leg>=0;leg--)numerical=integrateLeg(surface,loop.vertices[leg+1],loop.vertices[leg],radius,numerical);
 for(let j=0;j<3;j++)near(numerical[j],start.vector[j],6e-10);
}
near(transportResult({surface:'sphere',radius:1.6}).area/transportResult({surface:'sphere',radius:.8}).area,4);
assert.deepEqual(transportState({surface:'unknown',size:NaN,radius:Infinity}),transportDefaults);
console.log('Transport: tangency, length, exact octant holonomy, spherical excess, radius scaling, independent ODE integration and path reversal verified.');
if(process.argv.includes('--models'))process.exit(0);
const executablePath='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const browser=await chromium.launch({headless:true,...(fs.existsSync(executablePath)?{executablePath}:{})});
const base=process.env.BOOK_URL||'http://localhost:4173/';fs.mkdirSync('qa',{recursive:true});
try{
 for(const width of [1440,390]){
  const page=await browser.newPage({viewport:{width,height:1000},reducedMotion:'reduce'}),errors=[];
  page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error'&&!m.text().includes('favicon'))errors.push(m.text())});
  await page.goto(`${base}chapter-7.html#parallel-transport-lab`);
  const root=page.locator('#parallel-transport-lab[data-transport-ready]');await root.waitFor();await root.scrollIntoViewIfNeeded();
  await page.waitForFunction(()=>document.getElementById('parallel-transport-lab').dataset.transportSpatial==='ready');
  const context=()=>root.evaluate(el=>JSON.parse(el.dataset.scientificContext));
  for(const surface of ['plane','cylinder','sphere']){
   await root.locator(`[data-tp-surface="${surface}"]`).click();
   for(let i=0;i<3;i++)await root.locator('[data-tp-corner]').click();near((await context()).parameters.progress,1);
   near(Math.abs((await context()).readouts.angle),surface==='sphere'?Math.PI/2:0);
   await page.setViewportSize({width,height:Math.ceil((await root.boundingBox()).height)+320});
   for(const theme of ['light','dark']){
    await page.evaluate(theme=>document.documentElement.dataset.theme=theme,theme);
    const b=await root.boundingBox();assert(b.x>=0&&b.x+b.width<=width+1);
    await root.screenshot({path:`qa/transport-${surface}-${width}-${theme}.png`,style:'.topbar,.study-launcher,.reading-progress,.skip-link{visibility:hidden!important}'});
   }
  }
  const stage=root.locator('.tp-spatial');
  await root.locator('[data-tp-face]').click();
  const projected=await stage.evaluate(el=>JSON.parse(el.dataset.projection)),size=await stage.boundingBox();
  const initial=[(projected.initialTip[0]-projected.start[0])*size.width,(projected.initialTip[1]-projected.start[1])*size.height],final=[(projected.tip[0]-projected.point[0])*size.width,(projected.tip[1]-projected.point[1])*size.height];
  near(initial[0]*final[0]+initial[1]*final[1],0,1e-7);
  await root.screenshot({path:`qa/transport-face-on-${width}.png`,style:'.topbar,.study-launcher,.reading-progress,.skip-link{visibility:hidden!important}'});
  const frustum=projected.frustum;await stage.focus();for(let i=0;i<8;i++)await page.keyboard.press('ArrowLeft');assert.deepEqual(await stage.evaluate(el=>JSON.parse(el.dataset.projection).frustum),frustum);await page.keyboard.press('Home');
  await root.locator('[data-tp-reverse]').click();near((await context()).parameters.progress,0);near((await context()).readouts.angle,Math.PI/2);
  await root.locator('[data-tp-parameter="radius"]').evaluate(el=>{el.value=1.6;el.dispatchEvent(new Event('input',{bubbles:true}))});near((await context()).readouts.area,1.6**2*Math.PI/2);
  await root.locator('[data-tp-parameter="size"]').focus();await page.keyboard.press('ArrowLeft');assert((await context()).parameters.size<1);
  await root.locator('[data-tp-play]').click();await page.waitForFunction(()=>JSON.parse(document.getElementById('parallel-transport-lab').dataset.visualState).progress>.02);
  await page.evaluate(()=>window.scrollTo(0,document.documentElement.scrollHeight));await page.waitForTimeout(180);const stopped=(await context()).parameters.progress;await page.waitForTimeout(180);near((await context()).parameters.progress,stopped);
  await root.locator('[data-tp-play]').scrollIntoViewIfNeeded();await page.waitForFunction(p=>JSON.parse(document.getElementById('parallel-transport-lab').dataset.visualState).progress>p+.01,stopped);await root.locator('[data-tp-play]').click();
  const saved=(await context()).parameters;await page.reload();await root.waitFor();assert.deepEqual((await context()).parameters,saved);
  await root.scrollIntoViewIfNeeded();await page.waitForFunction(()=>document.getElementById('parallel-transport-lab').dataset.transportSpatial==='ready').catch(async error=>{console.error({errors,dataset:await root.evaluate(el=>({...el.dataset})),bounds:await root.boundingBox()});throw error});
  // Context loss preserves the complete SVG explanation and live model controls.
  await root.locator('canvas').evaluate(canvas=>canvas.dispatchEvent(new Event('webglcontextlost',{cancelable:true})));
  await root.locator('[data-tp-corner]').click();assert(await root.locator('[data-tp-fallback] svg').isVisible());
  assert(await root.locator('[data-tp-face]').isDisabled());assert(await root.locator('[data-tp-camera]').isDisabled());
  await root.locator('[data-tp-reset]').click();assert.deepEqual((await context()).parameters,transportDefaults);
  assert.deepEqual(errors,[]);await page.close();
 }
 const page=await browser.newPage({javaScriptEnabled:false,reducedMotion:'reduce'});await page.goto(`${base}chapter-7.html#parallel-transport-lab`);
 assert(await page.locator('#parallel-transport-lab .tp-fallback-svg').isVisible());assert(!(await page.locator('[data-tp-play]').isVisible()));
 await page.locator('#parallel-transport-lab .gf-method').nth(0).locator('summary').click();assert(await page.locator('#parallel-transport-lab .gf-method').nth(0).locator(':scope > div').isVisible());
 console.log('3D transport: all surfaces, theme/size, corner and reverse controls, radius/loop size, orbit keyboard, playback/visibility, recovery, context loss, and static explanation verified.');
}finally{await browser.close()}
