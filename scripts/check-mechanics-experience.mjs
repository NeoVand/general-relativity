import assert from 'node:assert/strict';
import fs from 'node:fs';
import {chromium} from 'playwright';
import {mechanicsDefaults,oscillator,hamiltonian,hamiltonianFlow} from '../web/mechanics-model.js';
import {energyView} from '../web/mechanics-experience.js';
import {rk4Step} from '../web/relativity-models.js';

const near=(a,b,tol=1e-10)=>assert.ok(Math.abs(a-b)<tol,`${a} should equal ${b} within ${tol}`);
const quarter=oscillator({...mechanicsDefaults,time:Math.PI/2});near(quarter.q,0);near(quarter.p,-1);near(quarter.kinetic,.5);
const half=oscillator({...mechanicsDefaults,time:Math.PI});near(half.q,-1);near(half.p,0);near(half.force,1);
for(const mass of [.5,1.3,2])for(const stiffness of [.5,1.7,2])for(const position of [-1.25,0,1.25])for(const momentum of [-1,0,1]){
  const state={mass,stiffness,position,momentum,time:0},T=oscillator(state).period;
  for(const fraction of [0,.17,.25,.54,.83,1]){const v=oscillator({...state,time:T*fraction});near(v.energy,v.initialEnergy,2e-14);assert(v.kinetic>=0&&v.potential>=0);}
  const end=oscillator({...state,time:T});near(end.q,position);near(end.p,momentum);
}
// Independently integrate Newton's first-order equations, with no trig solution.
const sample={mass:1.3,stiffness:.7,position:.6,momentum:.4,time:2.7};
let numerical=[sample.position,sample.momentum];const step=sample.time/1024;
for(let i=0;i<1024;i++)numerical=rk4Step((_,[q,p])=>[p/sample.mass,-sample.stiffness*q],i*step,numerical,step);
const exact=oscillator(sample);near(numerical[0],exact.q,1e-11);near(numerical[1],exact.p,1e-11);
const h=1e-5,[dq,dp]=hamiltonianFlow(.7,-.4,sample);
near((hamiltonian(.7,-.4+h,sample)-hamiltonian(.7,-.4-h,sample))/(2*h),dq);
near(-(hamiltonian(.7+h,-.4,sample)-hamiltonian(.7-h,-.4,sample))/(2*h),dp);
const qplus=oscillator({...sample,position:sample.position+h}),qminus=oscillator({...sample,position:sample.position-h});
const pplus=oscillator({...sample,momentum:sample.momentum+h}),pminus=oscillator({...sample,momentum:sample.momentum-h});
near(((qplus.q-qminus.q)*(pplus.p-pminus.p)-(pplus.q-pminus.q)*(qplus.p-qminus.p))/(4*h*h),1,1e-10);
assert(!/NaN|Infinity/.test(energyView({...mechanicsDefaults,position:0,momentum:0})));
console.log('Oscillator energy and period, turning-point force, independent Newton integration, Hamiltonian derivatives, and phase-area preservation verified.');
if(process.argv.includes('--models'))process.exit(0);

const executablePath='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const browser=await chromium.launch({headless:true,...(fs.existsSync(executablePath)?{executablePath}:{})});
const base=process.env.BOOK_URL||'http://localhost:4173/';
const experiments=[[0,'spring-energy-exchange'],[13,'hamiltonian-phase-space']];
fs.mkdirSync('qa',{recursive:true});
try{
 for(const width of [1440,390]){
  const page=await browser.newPage({viewport:{width,height:950},reducedMotion:'reduce'}),errors=[];page.on('pageerror',error=>errors.push(error.message));
  for(const [chapter,id] of experiments){
   await page.goto(`${base}chapter-${chapter}.html#${id}`);
   const root=page.locator(`#${id}[data-mechanics-ready]`);await root.waitFor();
   const model=()=>root.evaluate(el=>JSON.parse(el.dataset.scientificContext));
   near((await model()).readouts.p,0);
   await root.locator('[data-mx-quarter]').click();near((await model()).readouts.q,0);near((await model()).readouts.p,-1);
   assert.match(await root.locator('[data-mx-direction]').innerText(),/left/);
   await root.locator('[data-mx-quarter]').click();near((await model()).readouts.q,-1);near((await model()).readouts.p,0);
   await root.locator('[data-mx-play]').click();const start=(await model()).parameters.time;
   await page.waitForFunction(({id,start})=>JSON.parse(document.getElementById(id).dataset.visualState).time>start+.1,{id,start});
   await page.evaluate(()=>window.scrollTo(0,0));await page.waitForTimeout(150);
   const offscreen=(await model()).parameters.time;await page.waitForTimeout(180);near((await model()).parameters.time,offscreen);
   await root.locator('[data-mx-play]').scrollIntoViewIfNeeded();
   await page.waitForFunction(({id,offscreen})=>JSON.parse(document.getElementById(id).dataset.visualState).time>offscreen+.05,{id,offscreen});
   await root.locator('[data-mx-play]').click();
   await root.locator('[data-mx-setup]>summary').click();
   for(const input of await root.locator('[data-mx-parameter]').all())await input.evaluate(el=>{el.value=el.max;el.dispatchEvent(new Event('input',{bubbles:true}))});
   const changed=await model();near(changed.parameters.mass,2);near(changed.parameters.stiffness,2);near(changed.parameters.time,0);
   await root.locator('[data-mx-parameter="position"]').evaluate(el=>{el.value=0;el.dispatchEvent(new Event('input',{bubbles:true}))});
   await root.locator('[data-mx-parameter="momentum"]').evaluate(el=>{el.value=0;el.dispatchEvent(new Event('input',{bubbles:true}))});
   near((await model()).readouts.energy,0);assert.match(await root.locator('[data-mx-insight]').innerText(),/stays there/);
   await root.locator('[data-mx-reset]').click();await root.locator('[data-mx-setup]>summary').click();
   await root.locator('[data-mx-quarter]').click();
   const saved=await page.evaluate(id=>JSON.parse(localStorage.getItem('gr-course-v1')).visuals[id].state,id);near(saved.time,Math.PI/2);
   await page.setViewportSize({width,height:Math.ceil((await root.boundingBox()).height)+320});
   for(const theme of ['light','dark']){
    await page.evaluate(theme=>document.documentElement.dataset.theme=theme,theme);
    const bounds=await root.boundingBox();assert(bounds.x>=-1&&bounds.x+bounds.width<=width+1);
    const labels=await root.locator('svg text').evaluateAll(nodes=>nodes.map(el=>{const b=el.getBoundingClientRect(),svg=el.ownerSVGElement.getBoundingClientRect();return {text:el.textContent,left:b.left-svg.left,right:b.right-svg.right,top:b.top-svg.top,bottom:b.bottom-svg.bottom}}));
    assert.deepEqual(labels.filter(l=>l.left<-1||l.right>1||l.top<-1||l.bottom>1),[],'Required plot labels remain inside their frames');
    await root.screenshot({path:`qa/mechanics-${chapter}-${width}-${theme}.png`,animations:'disabled',style:'.topbar,.study-launcher,.reading-progress,.skip-link{visibility:hidden!important}'});
   }
   await page.setViewportSize({width,height:950});
   await page.reload();await root.waitFor();near((await model()).parameters.time,Math.PI/2);
   await root.locator('[data-mx-reset]').click();
  }
  assert.deepEqual(errors,[]);await page.close();
 }
 const page=await browser.newPage({javaScriptEnabled:false,reducedMotion:'reduce',viewport:{width:390,height:950}});
 for(const [chapter,id] of experiments){await page.goto(`${base}chapter-${chapter}.html#${id}`);const root=page.locator(`#${id}`);assert(await root.locator('svg').first().isVisible());assert(!(await root.locator('[data-mx-controls]').isVisible()));await root.locator('.mx-model>summary').click();assert(await root.locator('.mx-model>div').isVisible());}
 await page.close();
 console.log('Mechanics and phase-space scenes verified in two sizes and themes: controls, labels, animation, equilibrium, saved state, and static fallback.');
}finally{await browser.close()}
