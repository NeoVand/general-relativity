import assert from 'node:assert/strict';
import fs from 'node:fs';
import {chromium} from 'playwright';
import {flowOrderDefaults,flowOrderState,flowOrderMeasurements,flowOrderView} from '../web/flow-order-experience.js';
const near=(a,b,t=1e-10)=>assert.ok(Math.abs(a-b)<t,`${a} != ${b}`);
for(const step of [.05,.2,.6,1]){
 const end=flowOrderMeasurements({step,progress:2});near(end.endXY[0],end.endYX[0]);near(end.endXY[1]-end.endYX[1],step**2);
 near((end.endXY[1]-end.endYX[1])/step**2,1);
 // Integrate the two prescribed fields, rather than using the endpoint formula.
 const follow=(p,field)=>{let q=[...p];for(let i=0;i<256;i++){const v=field==='x'?[1,0]:[0,q[0]];q=q.map((x,j)=>x+step*v[j]/256)}return q};
 const xy=follow(follow([1,0],'x'),'y'),yx=follow(follow([1,0],'y'),'x');
 xy.forEach((x,i)=>near(x,end.endXY[i]));yx.forEach((x,i)=>near(x,end.endYX[i]));
 for(const progress of [0,.25,1,1.6,2])assert(!/NaN|Infinity/.test(flowOrderView({step,progress})));
 const middle=flowOrderMeasurements({step,progress:1});assert.deepEqual(middle.currentXY,middle.firstXY);assert.deepEqual(middle.currentYX,middle.firstYX);
}
assert.deepEqual(flowOrderState({step:NaN,progress:Infinity}),flowOrderDefaults);
console.log('Flow order: independently integrated endpoints, step-squared gap, normalization, and stage continuity verified.');
if(process.argv.includes('--models'))process.exit(0);
const executablePath='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const browser=await chromium.launch({headless:true,...(fs.existsSync(executablePath)?{executablePath}:{})});
const base=process.env.BOOK_URL||'http://localhost:4173/';fs.mkdirSync('qa',{recursive:true});
try{
 for(const width of [1440,390]){
  const page=await browser.newPage({viewport:{width,height:1000},reducedMotion:'reduce'}),errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto(`${base}chapter-6.html#flow-order`);
  const root=page.locator('#flow-order[data-flow-order-ready]');await root.waitFor();const state=()=>root.evaluate(el=>JSON.parse(el.dataset.scientificContext));
  await root.locator('[data-fo-next]').click();near((await state()).parameters.progress,0);
  await root.locator('[data-fo-next]').click();near((await state()).parameters.progress,1);
  await root.locator('[data-fo-next]').click();near((await state()).parameters.progress,2);
  for(const step of [.05,.6,1]){
   await root.locator('[data-fo-parameter="step"]').evaluate((el,step)=>{el.value=step;el.dispatchEvent(new Event('input',{bubbles:true}))},step);
   near((await state()).readouts.gap,step**2);
   await page.setViewportSize({width,height:Math.ceil((await root.boundingBox()).height)+320});
   for(const theme of ['light','dark']){
    await page.evaluate(theme=>document.documentElement.dataset.theme=theme,theme);
    const bounds=await root.boundingBox();assert(bounds.x>=0&&bounds.x+bounds.width<=width+1);
    const outside=await root.locator('.fo-plot text').evaluateAll(nodes=>nodes.filter(el=>{const b=el.getBoundingClientRect(),p=el.ownerSVGElement.getBoundingClientRect();return b.left<p.left-1||b.right>p.right+1||b.top<p.top-1||b.bottom>p.bottom+1}).map(el=>el.textContent));assert.deepEqual(outside,[]);
    if(step===.6)await root.screenshot({path:`qa/flow-order-${width}-${theme}.png`,style:'.topbar,.study-launcher,.reading-progress,.skip-link{visibility:hidden!important}'});
   }
  }
  await root.locator('[data-fo-parameter="step"]').focus();await page.keyboard.press('ArrowLeft');near((await state()).parameters.step,.99);
  assert.equal(await root.locator('[data-fo-play]').evaluate(el=>getComputedStyle(el).borderTopWidth),'0px','Play uses the shared lab button reset');
  if(width===390){const a=await root.locator('[data-fo-parameter="step"]').boundingBox(),b=await root.locator('[data-fo-parameter="progress"]').boundingBox();near(a.y,b.y,1);}
  await root.locator('[data-fo-play]').click();await page.waitForFunction(()=>JSON.parse(document.getElementById('flow-order').dataset.visualState).progress>.05);await root.locator('[data-fo-play]').click();
  const saved=(await state()).parameters;await page.reload();await root.waitFor();assert.deepEqual((await state()).parameters,saved);
  await root.locator('.gf-method>summary').click();assert(await root.locator('.gf-method>div').isVisible());
  await root.locator('[data-fo-reset]').click();assert.deepEqual((await state()).parameters,flowOrderDefaults);
  assert.deepEqual(errors,[]);await page.close();
 }
 const page=await browser.newPage({javaScriptEnabled:false,reducedMotion:'reduce'});await page.goto(`${base}chapter-6.html#flow-order`);assert(await page.locator('#flow-order .fo-plot').isVisible());assert(!(await page.locator('[data-fo-play]').isVisible()));
 console.log('Flow-order scene: both themes/sizes, endpoint labels, small and large steps, keyboard, playback, saved state and static diagram verified.');
}finally{await browser.close()}
