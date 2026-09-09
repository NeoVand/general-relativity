import assert from 'node:assert/strict';
import fs from 'node:fs';
import {chromium} from 'playwright';
import {polarDefaults,polarState,polarMeasurements,polarFromPoint} from '../web/geometry-foundations-model.js';
import {polarView} from '../web/geometry-foundations.js';

const near=(a,b,tol=1e-10)=>assert.ok(Math.abs(a-b)<tol,`${a} != ${b}`);
for(const radius of [0,.02,.5,1.8,2.6])for(const angle of [0,.65,Math.PI/2,Math.PI,5.9,2*Math.PI])for(const step of [.02,.4,.8]){
 const v=polarMeasurements({radius,angle,step});near(Math.hypot(...v.point),radius);
 near(Math.hypot(v.point[0]-v.next[0],v.point[1]-v.next[1]),v.chord);
 assert(v.arc>=v.chord);assert.equal(v.angleDefined,radius>0);
 const back=polarFromPoint(...v.point);near(back.radius,radius);
 near(back.radius*Math.cos(back.angle),v.point[0]);near(back.radius*Math.sin(back.angle),v.point[1]);
 assert(!/NaN|Infinity/.test(polarView({radius,angle,step,view:'step'})));
}
const ratio=h=>polarMeasurements({...polarDefaults,step:h}).chord/polarMeasurements({...polarDefaults,step:h}).arc;
assert(ratio(.02)>ratio(.4));near(ratio(.02),1,2e-5);
assert.deepEqual(polarState({radius:NaN,angle:Infinity}),polarDefaults);
console.log('Polar coordinate round trips, origin, chord distances, and small-angle limit verified.');
if(process.argv.includes('--models'))process.exit(0);
const executablePath='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const browser=await chromium.launch({headless:true,...(fs.existsSync(executablePath)?{executablePath}:{})});
const base=process.env.BOOK_URL||'http://localhost:4173/';fs.mkdirSync('qa',{recursive:true});
try{
 for(const width of [1440,390]){
  const page=await browser.newPage({viewport:{width,height:1000},reducedMotion:'reduce'}),errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto(`${base}chapter-4.html#polar-coordinates`);
  const root=page.locator('#polar-coordinates[data-polar-ready]');await root.waitFor();
  const state=()=>root.evaluate(el=>JSON.parse(el.dataset.scientificContext));
  const input=key=>root.locator(`[data-gf-parameter="${key}"]`);
  await input('radius').focus();await page.keyboard.press('ArrowRight');near((await state()).parameters.radius,1.82);
  await root.locator('[data-gf-view="step"]').click();
  await input('radius').evaluate(el=>{el.value=2.6;el.dispatchEvent(new Event('input',{bubbles:true}))});
  near((await state()).readouts.arc,1.04);
  await input('step').evaluate(el=>{el.value=.8;el.dispatchEvent(new Event('input',{bubbles:true}))});
  near((await state()).readouts.arc,2.08);
  // Drag through the SVG's screen transform, keeping the same plot coordinates at both sizes.
  const target=await root.locator('svg.gf-polar').evaluate(el=>{const p=new DOMPoint(332,168).matrixTransform(el.getScreenCTM());return {x:p.x,y:p.y}});
  await page.mouse.move(target.x,target.y);await page.mouse.down();await page.mouse.move(target.x+1,target.y);await page.mouse.up();
  near((await state()).readouts.point[1],1,1e-5);
  for(const view of ['coordinates','step']){
   await root.locator(`[data-gf-view="${view}"]`).click();
   await page.setViewportSize({width,height:Math.ceil((await root.boundingBox()).height)+320});
   for(const theme of ['light','dark']){
    await page.evaluate(theme=>document.documentElement.dataset.theme=theme,theme);
    const b=await root.boundingBox();assert(b.x>=0&&b.x+b.width<=width+1);
    const outside=await root.locator('svg text').evaluateAll(nodes=>nodes.filter(el=>{const b=el.getBoundingClientRect(),p=el.ownerSVGElement.getBoundingClientRect();return b.left<p.left-1||b.right>p.right+1||b.top<p.top-1||b.bottom>p.bottom+1}).map(el=>el.textContent));
    assert.deepEqual(outside,[],'All annotations fit');
    await root.screenshot({path:`qa/polar-${view}-${width}-${theme}.png`,style:'.topbar,.study-launcher,.reading-progress,.skip-link{visibility:hidden!important}'});
   }
  }
  const before=(await state()).parameters;await page.reload();await root.waitFor();assert.deepEqual((await state()).parameters,before);
  await input('radius').evaluate(el=>{el.value=0;el.dispatchEvent(new Event('input',{bubbles:true}))});
  assert(await input('angle').isDisabled());assert.match(await root.locator('[data-gf-insight]').innerText(),/no single angle/);
  await root.locator('.gf-method>summary').click();assert(await root.locator('.gf-method>div').isVisible());
  await root.locator('[data-gf-reset]').click();assert.deepEqual((await state()).parameters,polarDefaults);
  assert.deepEqual(errors,[]);await page.close();
 }
 const page=await browser.newPage({javaScriptEnabled:false,reducedMotion:'reduce'});await page.goto(`${base}chapter-4.html#polar-coordinates`);
 assert(await page.locator('#polar-coordinates svg.gf-polar').isVisible());assert(!(await page.locator('[data-gf-controls]').isVisible()));
 await page.locator('#polar-coordinates .gf-method>summary').click();assert(await page.locator('#polar-coordinates .gf-method>div').isVisible());
 console.log('Polar experiment: drag, keyboard, origin, both views/themes/sizes, saved state, and no-JavaScript explanation verified.');
}finally{await browser.close()}
