import assert from 'node:assert/strict';
import fs from 'node:fs';
import {chromium} from 'playwright';
import {particleFlowDefaults,particleFlowState,prepareParticles,particlePosition,particleTensor,crossingCount,particleFlowMeasurements} from '../web/particle-flow-model.js';
const near=(a,b,tol=1e-9)=>assert(Math.abs(a-b)<tol,`${a} != ${b}`);
for(const preset of ['stream','balanced','slanted'])for(const speed of [.1,.55,.85])for(const angle of [-.7,0,.7]){
 const state={preset,speed,angle},particles=prepareParticles(state),T=particleTensor(particles),gamma=1/Math.sqrt(1-speed*speed);
 near(T[0][0],96*gamma);near(-T[0][0]+T[1][1]+T[2][2]+T[3][3],-96/gamma);
 for(let i=0;i<4;i++)for(let j=0;j<4;j++)near(T[i][j],T[j][i]);
 for(const p of particles){near(p.momentum[0]**2-p.momentum.slice(1).reduce((sum,x)=>sum+x*x,0),1);assert(particlePosition(p,28.2).every(x=>x>=0&&x<1));}
 if(preset==='balanced'){for(let i=1;i<4;i++){near(T[0][i],0);near(T[i][i],96*gamma*speed*speed/3);for(let j=1;j<4;j++)if(i!==j)near(T[i][j],0)}}
 if(preset==='slanted'){near(T[1][2],96*gamma*speed**2*Math.cos(angle)*Math.sin(angle));for(let j=1;j<4;j++)near(T[0][j],0)}
 for(let axis=0;axis<3;axis++)for(const plane of [.15,.5,.85]){
  const duration=7.123;
  for(const p of particles){
   // Independent event construction: intersect the unwrapped straight worldline
   // with translated detector planes, solving for the time of each crossing.
   let expected=0;if(p.velocity[axis]!==0)for(let k=-30;k<=30;k++){const t=(plane+k-p.initial[axis])/p.velocity[axis];if(t>0&&t<=duration)expected+=Math.sign(p.velocity[axis]);}
   assert.equal(crossingCount(p,axis,plane,duration),expected);
  }
  for(let column=0;column<4;column++){
   const m=particleFlowMeasurements({...state,row:axis+1,column,plane,time:duration}),bound=particles.reduce((sum,p)=>sum+Math.abs(p.momentum[column]),0)/duration;
   assert(Math.abs(m.measured-T[axis+1][column])<=bound+1e-9);
   const longTime=10000,estimate=particles.reduce((sum,p)=>sum+crossingCount(p,axis,plane,longTime)*p.momentum[column],0)/longTime;
   near(estimate,T[axis+1][column],96*gamma/longTime+.00001);
   for(const e of m.events){const p=particles[e.id],unwrapped=p.initial[axis]+p.velocity[axis]*e.time;near(unwrapped-plane,Math.round(unwrapped-plane));near(e.point[axis],plane);near(e.contribution,e.direction*p.momentum[column]);}
  }
 }
}
assert.equal(crossingCount({initial:[.8,0,0],velocity:[-.5,0,0]},0,.3,1),-1);
assert.equal(crossingCount({initial:[.3,0,0],velocity:[-.5,0,0]},0,.3,0),0);
assert.equal(particleFlowMeasurements({time:0}).measured,null);
near(particleFlowMeasurements({row:0,time:0,column:0}).measured,96/Math.sqrt(1-.55**2));
assert.deepEqual(particleFlowState({speed:NaN,row:Infinity,preset:'unknown'}),particleFlowDefaults);
console.log('Particles: mass shell, energy and momentum moments, symmetry and trace, pressure without bulk flow, off-diagonal signs, exact crossing events and long-time convergence verified.');
if(process.argv.includes('--models'))process.exit(0);
const executablePath='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';const browser=await chromium.launch({headless:true,...(fs.existsSync(executablePath)?{executablePath}:{})});
const base=process.env.BOOK_URL||'http://localhost:4173/';fs.mkdirSync('qa',{recursive:true});
try{
 for(const width of [1440,390]){
  const page=await browser.newPage({viewport:{width,height:1100},reducedMotion:'reduce'}),errors=[];page.on('pageerror',e=>errors.push(e.message));await page.goto(`${base}chapter-11.html#particle-momentum-lab`);
  const root=page.locator('#particle-momentum-lab[data-particle-flow-ready]');await root.waitFor();await root.scrollIntoViewIfNeeded();
  const context=()=>root.evaluate(el=>JSON.parse(el.dataset.scientificContext));near((await context()).readouts.particleCount,96);assert.equal(await root.locator('.pf-particle').count(),96);
  const palette=await root.locator('.pf-legend').evaluate(el=>['positive','negative','detector'].map(key=>getComputedStyle(el.querySelector('.pf-key-'+key),'::before').backgroundColor));assert.equal(new Set(palette).size,3);
  for(const label of await root.locator('.pf-cube text').all()){const b=await label.evaluate(el=>{const b=el.getBBox();return {x:b.x,y:b.y,width:b.width,height:b.height}});assert(b.x>=0&&b.y>=0&&b.x+b.width<=540&&b.y+b.height<=490,JSON.stringify(b));}

  const initial=await root.locator('[data-pf-plot]').innerHTML();await root.locator('[data-pf-parameter="speed"]').focus();await page.keyboard.press('ArrowRight');assert.notEqual(await root.locator('[data-pf-plot]').innerHTML(),initial);assert((await context()).parameters.speed>.55);
  for(const preset of ['stream','balanced','slanted']){
   await root.locator(`[data-pf-preset="${preset}"]`).click();await page.setViewportSize({width,height:Math.ceil((await root.boundingBox()).height)+320});
   for(const theme of ['light','dark']){await page.evaluate(t=>document.documentElement.dataset.theme=t,theme);const b=await root.boundingBox();assert(b.x>=0&&b.x+b.width<=width+1);await root.screenshot({path:`qa/particles-${preset}-${width}-${theme}.png`,style:'.topbar,.study-launcher,.reading-progress,.skip-link{visibility:hidden!important}'});}
  }
  for(let row=0;row<4;row++)for(let column=0;column<4;column++){await root.locator(`[data-pf-row="${row}"]`).click();await root.locator(`[data-pf-column="${column}"]`).click();const c=await context();near(c.parameters.row,row);near(c.parameters.column,column);near(c.readouts.expected,c.readouts.tensor[row][column]);assert.equal(await root.locator('.pf-selected').count(),1);}
  await root.locator('[data-pf-preset="balanced"]').click();await root.locator('[data-pf-row="1"]').click();await root.locator('[data-pf-column="1"]').click();const c=await context();c.readouts.meanVelocity.forEach(x=>near(x,0));assert(c.readouts.measured>0);
  await root.locator('[data-pf-parameter="plane"]').evaluate(el=>{el.value=.8;el.dispatchEvent(new Event('input',{bubbles:true}))});near((await context()).parameters.plane,.8);
  await root.locator('[data-pf-play]').click();const before=(await context()).parameters.time;await page.waitForFunction(t=>JSON.parse(document.getElementById('particle-momentum-lab').dataset.visualState).time>t+.05,before);await root.locator('[data-pf-play]').click();
  const saved=(await context()).parameters;await page.reload();await root.waitFor();assert.deepEqual((await context()).parameters,saved);
  await root.locator('[data-pf-reset]').click();assert.deepEqual((await context()).parameters,particleFlowDefaults);
  await root.locator('.gf-method').nth(1).locator('summary').click();assert(await root.locator('.pf-matrix').isVisible());const matrix=await root.locator('.pf-matrix').boundingBox();assert(matrix.x>=0&&matrix.x+matrix.width<=width);assert.equal(await root.locator('.katex-error').count(),0);
  assert.deepEqual(errors,[]);await page.close();
 }
 const page=await browser.newPage({javaScriptEnabled:false,reducedMotion:'reduce'});await page.goto(`${base}chapter-11.html#particle-momentum-lab`);assert(await page.locator('.pf-cube').isVisible());assert(!(await page.locator('[data-pf-play]').isVisible()));await page.locator('.particle-flow-experience .gf-method').nth(1).locator('summary').click();assert(await page.locator('.pf-matrix').isVisible());
 console.log('Particle UI: three preparations, all 16 tensor selections, live keyboard/slider changes, time playback, reset/restore, phone/desktop themes, matrix disclosure and no-JavaScript explanation verified.');
}finally{await browser.close()}
