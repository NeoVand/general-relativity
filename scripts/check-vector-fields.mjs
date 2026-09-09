import assert from 'node:assert/strict';
import fs from 'node:fs';
import {chromium} from 'playwright';
import {fieldDefaults,fieldState,fieldMeasurements,polarUnitFrame} from '../web/geometry-foundations-model.js';
const near=(a,b,t=1e-10)=>assert.ok(Math.abs(a-b)<t,`${a} != ${b}`);
for(const field of ['uniform','expansion','rotation','shear'])for(const angle of [0,.6,Math.PI/2,Math.PI,5.5,2*Math.PI])for(const separation of [.04,.6,1.2]){
 const v=fieldMeasurements({field,angle,separation}),B=polarUnitFrame(angle);
 near(B[0][0]*B[1][0]+B[0][1]*B[1][1],0);near(Math.hypot(...B[0]),1);near(Math.hypot(...B[1]),1);
 for(let i=0;i<2;i++)near(v.components[i]+v.basis[i],v.difference[i]);
 if(field==='uniform'){near(v.difference[0],0);near(v.difference[1],0);near(v.c0[0],Math.cos(angle));near(v.c0[1],-Math.sin(angle));}
 if(field==='expansion'){near(v.c0[0],.72);near(v.c0[1],0);near(Math.hypot(...v.components),0);}
 if(field==='rotation'){near(v.c0[0],0);near(v.c0[1],.72);near(Math.hypot(...v.components),0);}
 if(field==='shear'){near(v.c0[0],.72*Math.sin(angle)*Math.cos(angle));near(v.c0[1],-.72*Math.sin(angle)**2);}
 // Independently differentiate the four analytic fields along a circle and
 // integrate the derivative by composite Simpson quadrature.
 const derivative=t=>field==='uniform'?[0,0]:field==='expansion'?[-.72*Math.sin(t),.72*Math.cos(t)]:field==='rotation'?[-.72*Math.cos(t),-.72*Math.sin(t)]:[.72*Math.cos(t),0];
 const n=128,h=separation/n,sum=[0,0];
 for(let j=0;j<=n;j++){const w=j===0||j===n?1:j%2?4:2,d=derivative(angle+j*h);sum[0]+=w*d[0]*h/3;sum[1]+=w*d[1]*h/3;}
 near(v.difference[0],sum[0]);near(v.difference[1],sum[1]);
}
assert.deepEqual(fieldState({field:'<script>',angle:NaN,separation:Infinity}),fieldDefaults);
console.log('Vector fields: exact finite product rule, moving-frame cancellation, analytic polar components, and independently integrated derivatives verified.');
if(process.argv.includes('--models'))process.exit(0);
const executablePath='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const browser=await chromium.launch({headless:true,...(fs.existsSync(executablePath)?{executablePath}:{})});
const base=process.env.BOOK_URL||'http://localhost:4173/';fs.mkdirSync('qa',{recursive:true});
try{
 for(const width of [1440,390]){
  const page=await browser.newPage({viewport:{width,height:1000},reducedMotion:'reduce'}),errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto(`${base}chapter-6.html#vector-field-comparison`);
  const root=page.locator('#vector-field-comparison[data-vector-field-ready]');await root.waitFor();
  const context=()=>root.evaluate(el=>JSON.parse(el.dataset.scientificContext));
  for(const field of ['uniform','expansion','rotation','shear']){
   await root.locator(`[data-vf-choice="${field}"]`).click();assert.equal((await context()).parameters.field,field);
   for(const key of ['angle','separation']){
    const input=root.locator(`[data-vf-parameter="${key}"]`);await input.focus();const before=(await context()).parameters[key];await page.keyboard.press('ArrowRight');assert((await context()).parameters[key]>before);
   }
   for(const el of await root.locator('[data-vf-parameter]').all())await el.evaluate(input=>{input.value=input.max;input.dispatchEvent(new Event('input',{bubbles:true}))});
   for(const [key,value] of [['angle',.55],['separation',.6]])await root.locator(`[data-vf-parameter="${key}"]`).evaluate((input,value)=>{input.value=value;input.dispatchEvent(new Event('input',{bubbles:true}))},value);
   await page.setViewportSize({width,height:Math.ceil((await root.boundingBox()).height)+320});
   for(const theme of ['light','dark']){
    await page.evaluate(theme=>document.documentElement.dataset.theme=theme,theme);
    const b=await root.boundingBox();assert(b.x>=0&&b.x+b.width<=width+1);
    const outside=await root.locator('.vf-workbench svg text').evaluateAll(nodes=>nodes.filter(el=>{const b=el.getBoundingClientRect(),p=el.ownerSVGElement.getBoundingClientRect();return b.left<p.left-1||b.right>p.right+1||b.top<p.top-1||b.bottom>p.bottom+1}).map(el=>el.textContent));
    assert.deepEqual(outside,[],'Field and comparison annotations fit');
    await root.screenshot({path:`qa/field-${field}-${width}-${theme}.png`,style:'.topbar,.study-launcher,.reading-progress,.skip-link{visibility:hidden!important}'});
   }
  }
  await root.locator('[data-vf-choice="uniform"]').click();await root.locator('.vf-product>summary').click();
  assert(await root.locator('[data-vf-product] svg').isVisible());assert.match(await root.locator('[data-vf-product-values]').innerText(),/= \(0.00, 0.00\)/);
  await page.setViewportSize({width,height:Math.ceil((await root.boundingBox()).height)+320});
  await root.screenshot({path:`qa/field-product-${width}.png`,style:'.topbar,.study-launcher,.reading-progress,.skip-link{visibility:hidden!important}'});
  await root.locator('[data-vf-choice="rotation"]').click();const saved=(await context()).parameters;
  await page.reload();await root.waitFor();assert.deepEqual((await context()).parameters,saved);
  await root.locator('[data-vf-reset]').click();assert.deepEqual((await context()).parameters,fieldDefaults);
  assert.deepEqual(errors,[]);await page.close();
 }
 const page=await browser.newPage({javaScriptEnabled:false,reducedMotion:'reduce'});await page.goto(`${base}chapter-6.html#vector-field-comparison`);
 assert(await page.locator('#vector-field-comparison svg.vf-field').isVisible());assert(!(await page.locator('#vector-field-comparison [data-vf-controls]').first().isVisible()));
 await page.locator('#vector-field-comparison .vf-product>summary').click();assert(await page.locator('[data-vf-product] svg').isVisible());
 console.log('Vector fields: all fields and controls, two layouts/themes, finite decomposition, saved-state recovery and static explanation verified.');
}finally{await browser.close()}
