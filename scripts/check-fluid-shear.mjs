import assert from 'node:assert/strict';
import fs from 'node:fs';
import {chromium} from 'playwright';
import {fluidDefaults,fluidState,fluidAt,fluidGeometry,dyePosition} from '../web/fluid-shear-model.js';
const near=(a,b,t=1e-9)=>assert(Math.abs(a-b)<t,`${a} != ${b}`),H=fluidGeometry.height;
for(const mode of ['plate','pressure'])for(const drive of [-1.2,0,.6,1.2])for(const gradient of [-1200,0,600,1200])for(const viscosity of [.04,.12,.3]){
 const s={mode,drive,gradient,viscosity},U=mode==='plate'?drive:0,G=mode==='pressure'?gradient:0,n=120,h=H/n;
 // Independently solve μu''+G=0 by a tridiagonal finite-difference system.
 const diagonal=Array(n-1).fill(-2),rhs=Array(n-1).fill(-G*h*h/viscosity);rhs[n-2]-=U;
 for(let i=1;i<n-1;i++){const factor=1/diagonal[i-1];diagonal[i]-=factor;rhs[i]-=factor*rhs[i-1];}
 const numerical=Array(n+1).fill(0);numerical[n]=U;numerical[n-1]=rhs[n-2]/diagonal[n-2];for(let i=n-3;i>=0;i--)numerical[i+1]=(rhs[i]-numerical[i+2])/diagonal[i];
 for(let i=0;i<=n;i++){const f=fluidAt(s,i*h);near(f.velocity,numerical[i],1e-10);near(f.momentumFlux,-f.shear);near(G+viscosity*f.curvature,0);}
 let Q=0,dissipation=0;for(let i=0;i<=n;i++){const f=fluidAt(s,i*h),weight=i===0||i===n?1:i%2?4:2;Q+=weight*f.velocity;dissipation+=weight*viscosity*f.slope*f.slope;}Q*=h/3;dissipation*=h/3;
 near(Q,fluidAt(s).volumeFlow);near(dissipation,fluidAt(s).dissipation);near(dissipation,mode==='plate'?U*fluidAt(s,H).shear:G*Q);assert(dissipation>=-1e-12);
 near(fluidAt(s,0).velocity,0);near(fluidAt(s,H).velocity,U);near(fluidAt(s,.01,.01).pressure-fluidAt(s,.01,.11).pressure,G*.1);
}
near(fluidAt({mode:'pressure',probe:.5}).shear,0);assert(fluidAt({mode:'pressure',probe:.2}).shear>0);assert(fluidAt({mode:'pressure',probe:.8}).shear<0);
near(fluidAt({viscosity:.04}).velocity,fluidAt({viscosity:.3}).velocity);assert(fluidAt({viscosity:.3}).shear>fluidAt({viscosity:.04}).shear);
near(fluidAt({mode:'pressure',viscosity:.04}).shear,fluidAt({mode:'pressure',viscosity:.3}).shear);assert(fluidAt({mode:'pressure',viscosity:.04}).velocity>fluidAt({mode:'pressure',viscosity:.3}).velocity);
for(const time of [0,.12,.8])for(let row=0;row<10;row++)for(let col=0;col<9;col++){const d=dyePosition({time},row,col);assert(d.x>=0&&d.x<fluidGeometry.length);near(d.y,(row+.5)*H/10);near(d.velocity,fluidAt({},d.y).velocity);}
assert.deepEqual(fluidState({viscosity:NaN,mode:'unknown'}),fluidDefaults);
console.log('Fluid: independent finite-difference force balance, wall velocities, pressure gradient, viscosity response, shear signs, dye trajectories and work/dissipation balance verified.');
if(process.argv.includes('--models'))process.exit(0);
const executablePath='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',browser=await chromium.launch({headless:true,...(fs.existsSync(executablePath)?{executablePath}:{})}),base=process.env.BOOK_URL||'http://localhost:4173/';fs.mkdirSync('qa',{recursive:true});
try{
 for(const width of [1440,390]){
  const page=await browser.newPage({viewport:{width,height:1100},reducedMotion:'reduce'}),errors=[];page.on('pageerror',e=>errors.push(e.message));await page.goto(`${base}chapter-11.html#fluid-shear-lab`);const root=page.locator('#fluid-shear-lab[data-fluid-ready]');await root.waitFor();await root.scrollIntoViewIfNeeded();const context=()=>root.evaluate(el=>JSON.parse(el.dataset.scientificContext));
  for(const mode of ['plate','pressure']){
   await root.locator(`[data-fl-mode="${mode}"]`).click();assert((await root.locator('[data-fl-intro]').textContent()).startsWith(mode==='plate'?'Move the upper plate':'Hold both plates still'));
   for(const text of await root.locator('.fl-flow text').all()){const b=await text.evaluate(el=>{const b=el.getBBox();return {x:b.x,y:b.y,width:b.width,height:b.height}});assert(b.x>=0&&b.y>=0&&b.x+b.width<=680&&b.y+b.height<=405,JSON.stringify(b));}
   const sliders=await root.locator('[data-fl-parameter]').evaluateAll(inputs=>inputs.filter(el=>el.getBoundingClientRect().width>0).map(el=>({key:el.dataset.flParameter,y:el.getBoundingClientRect().y})));const driver=sliders.find(x=>x.key===(mode==='plate'?'drive':'gradient')),viscosity=sliders.find(x=>x.key==='viscosity');near(driver.y,viscosity.y,1);
   await page.setViewportSize({width,height:Math.ceil((await root.boundingBox()).height)+320});
   for(const theme of ['light','dark']){await page.evaluate(t=>document.documentElement.dataset.theme=t,theme);await root.screenshot({path:`qa/fluid-${mode}-${width}-${theme}.png`,style:'.topbar,.study-launcher,.reading-progress,.skip-link{visibility:hidden!important}'});}
  }
  for(const probe of [.2,.5,.8]){await root.locator('[data-fl-parameter="probe"]').evaluate((el,p)=>{el.value=p;el.dispatchEvent(new Event('input',{bubbles:true}))},probe);const c=await context();near(c.readouts.shear,600*.02*(1-2*probe)/2);}
  const initial=await root.locator('[data-fl-plot]').innerHTML();await root.locator('[data-fl-parameter="viscosity"]').focus();await page.keyboard.press('ArrowRight');assert.notEqual(await root.locator('[data-fl-plot]').innerHTML(),initial);
  await root.locator('[data-fl-play]').click();const start=(await context()).parameters.time;await page.waitForFunction(t=>JSON.parse(document.getElementById('fluid-shear-lab').dataset.visualState).time>t+.005,start);await root.locator('[data-fl-play]').click();const saved=(await context()).parameters;await page.reload();await root.waitFor();assert.deepEqual((await context()).parameters,saved);await root.locator('[data-fl-reset]').click();assert.deepEqual((await context()).parameters,fluidDefaults);
  for(const details of await root.locator('.gf-method').all()){await details.locator('summary').click();assert(await details.locator(':scope > div').isVisible());assert.equal(await details.locator('.katex-error').count(),0);}
  const bounds=await root.boundingBox();assert(bounds.x>=0&&bounds.x+bounds.width<=width+1);assert.deepEqual(errors,[]);await page.close();
 }
 const page=await browser.newPage({javaScriptEnabled:false,reducedMotion:'reduce'});await page.goto(`${base}chapter-11.html#fluid-shear-lab`);assert(await page.locator('.fl-flow').isVisible());assert(!(await page.locator('[data-fl-play]').isVisible()));await page.locator('.fluid-shear-experience .gf-method').nth(1).locator('summary').click();assert(await page.locator('.fluid-shear-experience .gf-method').nth(1).locator(':scope > div').isVisible());
 console.log('Fluid UI: both modes/themes at phone/desktop widths, cut crossing the zero-shear point, live viscosity response, playback, restore/reset, derivations and no-JavaScript presentation verified.');
}finally{await browser.close()}
