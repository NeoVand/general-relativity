import assert from 'node:assert/strict';
import fs from 'node:fs';
import {chromium} from 'playwright';
import {chartCoordinates,polarMeasurements,polarBasis,transportedFrame,radialNullDirections} from '../web/visual-lessons.js';

// Test the geometric claims, independently of what is printed in the readouts.
const near=(a,b,tol=1e-10)=>assert.ok(Math.abs(a-b)<tol,`${a} ≠ ${b}`);
const dot=(a,b)=>a.reduce((s,x,i)=>s+x*b[i],0);
const norm=a=>Math.hypot(...a);
assert.deepEqual(chartCoordinates([.8,0,.6]),{north:[2,0],south:[.5,0]});
const oblique=chartCoordinates([2/3,1/3,2/3]);near(oblique.north[0],2);near(oblique.north[1],1);near(oblique.south[0],.4);near(oblique.south[1],.2);
assert.equal(chartCoordinates([0,0,1]).north,null);
assert.equal(chartCoordinates([0,0,-1]).south,null);
for(const [u,v] of [[.2,-.7],[2,0],[0,2],[-3,4]]){
 const s=u*u+v*v,p=[2*u/(1+s),2*v/(1+s),(s-1)/(1+s)],c=chartCoordinates(p);
 near(norm(p),1);near(c.north[0],u);near(c.north[1],v);near(c.south[0],u/s);near(c.south[1],v/s);
}
const metric=polarMeasurements(3,.03,.01);near(metric.tangent,Math.hypot(.03,.03));
near(metric.chord,Math.hypot(3.03*Math.cos(.01)-3,3.03*Math.sin(.01)));
let lastError=Infinity;
for(const t of [30,10,1]){const m=polarMeasurements(3,.03*t,.01*t),error=Math.abs(m.chord-m.tangent)/m.chord;assert.ok(error<lastError);lastError=error;}
for(let i=0;i<=72;i++){
 const m=polarBasis(i*Math.PI/36);near(norm(m.er),1);near(norm(m.et),1);near(dot(m.er,m.et),0);near(m.vector[0],1);near(m.vector[1],0);
 near(m.componentDerivative[0]+m.basisDerivative[0],0);near(m.componentDerivative[1]+m.basisDerivative[1],0);
}
for(let segment=0;segment<3;segment++)for(const t of [.15,.5,.85]){
 const s=segment+t,frame=transportedFrame(s);near(norm(frame.point),1);near(norm(frame.vector),1);near(dot(frame.point,frame.vector),0);
 const h=1e-5,a=transportedFrame(s-h),b=transportedFrame(s+h),d=b.vector.map((v,i)=>(v-a.vector[i])/(2*h));
 const tangential=d.map((v,i)=>v-dot(d,frame.point)*frame.point[i]);assert.ok(norm(tangential)<1e-8,'The derivative must have no tangential component');
}
const start=transportedFrame(0),end=transportedFrame(3);near(norm(end.point.map((x,i)=>x-start.point[i])),0);near(dot(start.vector,end.vector),0);near(end.vector[1],1);
for(const rho of [.1,.5,1,3,10]){const directions=radialNullDirections(rho);for(const slope of Object.values(directions))near(-(1-1/rho)+2*slope/rho+(1+1/rho)*slope*slope,0);assert.ok(directions.outgoing>directions.ingoing);if(rho<1)assert.ok(directions.outgoing<0);}
near(radialNullDirections(3).outgoing,.5);near(radialNullDirections(1).outgoing,0);near(radialNullDirections(.5).outgoing,-1/3);
console.log('Visual lesson geometry: charts, metric limits, changing bases, transport, and null directions verified.');
if(process.env.VISUAL_GEOMETRY_ONLY==='1')process.exit(0);

const base=process.env.BOOK_URL||'http://localhost:4173/';
const cases=[{type:'charts',chapter:4,choices:{point:['example','oblique','equator','south','pole'],chart:['north','south']}},{type:'metric',chapter:4,choices:{radius:[1,3,6],scale:[30,10,1]}},{type:'basis',chapter:6,choices:{angle:[0,45,90,180]}},{type:'transport',chapter:8,choices:{step:[0,1,2,3]}},{type:'horizon',chapter:17,choices:{rho:[3,1,.5]}}];
const chrome='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const browser=await chromium.launch({headless:true,...(fs.existsSync(chrome)?{executablePath:chrome}:{}),args:['--enable-unsafe-swiftshader']});
const page=await browser.newPage();const errors=[],checks=[];page.on('pageerror',e=>errors.push(e.message));fs.mkdirSync('qa',{recursive:true});
try{
 for(const width of [1440,390])for(const theme of ['light','dark']){
  await page.setViewportSize({width,height:width===390?844:1100});
  for(const item of cases){
   await page.goto(new URL(`chapter-${item.chapter}.html`,base).href);await page.evaluate(t=>{document.documentElement.dataset.theme=t;localStorage.setItem('gr-theme',t);},theme);
   const el=page.locator(`[data-visual-lesson=${item.type}]`);await el.scrollIntoViewIfNeeded();await page.waitForFunction(type=>document.querySelector(`[data-visual-lesson=${type}]`)?.dataset.visualReady==='true',item.type);
   if(['charts','transport'].includes(item.type))await page.waitForFunction(type=>document.querySelector(`[data-visual-lesson=${type}]`)?.dataset.spatialReady==='true',item.type);
   await page.evaluate(()=>document.fonts.ready);
   async function layout(){const result=await el.evaluate(e=>{const r=e.getBoundingClientRect(),stage=e.querySelector('.vl-drawing').getBoundingClientRect();const labels=[...e.querySelectorAll('.vl-label')].filter(n=>n.checkVisibility()).map(n=>{const b=n.getBoundingClientRect();return {text:n.querySelector('annotation')?.textContent,x:b.left,y:b.top,right:b.right,bottom:b.bottom};});return {scroll:e.scrollWidth-e.clientWidth,doc:document.documentElement.scrollWidth,clipped:labels.filter(b=>b.x<stage.left-1||b.y<stage.top-1||b.right>stage.right+1||b.bottom>stage.bottom+1),overlaps:labels.flatMap((a,i)=>labels.slice(i+1).filter(b=>Math.min(a.right,b.right)-Math.max(a.x,b.x)>3&&Math.min(a.bottom,b.bottom)-Math.max(a.y,b.y)>3).map(b=>[a.text,b.text])),svgText:e.querySelectorAll('svg text').length,katexErrors:e.querySelectorAll('.katex-error').length,math:e.querySelectorAll('.katex').length,tools:e.querySelectorAll('.vl-topline>.passage-tools').length,narration:e.querySelector('.narration-script')?.textContent?.length||0};});assert.ok(result.scroll<=1,`${item.type}: horizontal overflow`);assert.ok(result.doc<=width+1);assert.deepEqual(result.clipped,[],`${item.type}: clipped math labels`);assert.deepEqual(result.overlaps,[],`${item.type}: overlapping math labels`);assert.equal(result.svgText,0);assert.equal(result.katexErrors,0);assert.ok(result.math>3);assert.equal(result.tools,1,'Listening actions remain in the aligned toolbar');assert.ok(result.narration>20,'Authored narration survives mounting');}
   for(const [key,values]of Object.entries(item.choices))for(const value of values){await el.locator(`[data-vl-choice=${key}][data-value="${value}"]`).click();assert.equal(JSON.parse(await el.getAttribute('data-visual-state'))[key],value);await layout();}
   if(item.type==='basis'){await el.locator('input[type=range]').fill('273');await el.locator('input[type=range]').dispatchEvent('input');assert.equal(await el.locator('input').getAttribute('aria-valuetext'),'273 degrees');assert.equal(await el.locator('[data-vl-choice=angle][aria-pressed=true]').count(),0);await layout();}
   const id=await el.getAttribute('data-lesson-id'),state=JSON.parse(await el.getAttribute('data-visual-state'));
   const stored=await page.evaluate(id=>JSON.parse(localStorage.getItem('gr-visual-lessons:v1'))[id].state,id);assert.deepEqual(stored,state);
   await el.screenshot({path:`qa/visual-lesson-${item.type}-${width}-${theme}.png`,style:'.topbar,.study-launcher{visibility:hidden!important}'});checks.push({type:item.type,width,theme,state});
  }
 }
 // A context lost after a successful render must reveal the same usable diagram.
 await page.goto(new URL('chapter-4.html',base).href);const lost=page.locator('[data-visual-lesson=charts]');await lost.scrollIntoViewIfNeeded();await page.waitForFunction(()=>document.querySelector('[data-visual-lesson=charts]')?.dataset.spatialReady==='true');await lost.locator('[data-vl-choice=point][data-value=oblique]').click();
 const contextLost=await lost.locator('canvas').evaluate(canvas=>{const extension=canvas.getContext('webgl2')?.getExtension('WEBGL_lose_context');extension?.loseContext();return !!extension;});assert.ok(contextLost);await page.waitForFunction(()=>document.querySelector('[data-visual-lesson=charts]')?.dataset.spatialReady==='fallback');assert.equal(await lost.locator('.vl-static').isVisible(),true);await lost.locator('[data-vl-choice=chart][data-value=south]').click();assert.equal(JSON.parse(await lost.getAttribute('data-visual-state')).chart,'south');
 // A WebGL-disabled browser still provides the entire argument and working controls.
 const fallback=await browser.newPage();await fallback.addInitScript(()=>{const original=HTMLCanvasElement.prototype.getContext;HTMLCanvasElement.prototype.getContext=function(kind,...args){return /^webgl/.test(kind)?null:original.call(this,kind,...args);};});
 for(const [chapter,type]of [[4,'charts'],[8,'transport']]){await fallback.goto(new URL(`chapter-${chapter}.html`,base).href);const el=fallback.locator(`[data-visual-lesson=${type}]`);await el.scrollIntoViewIfNeeded();await fallback.waitForFunction(type=>document.querySelector(`[data-visual-lesson=${type}]`)?.dataset.visualReady==='true',type);await fallback.waitForFunction(type=>document.querySelector(`[data-visual-lesson=${type}]`)?.dataset.spatialReady==='fallback',type);assert.equal(await el.locator('.vl-static').isVisible(),true);if(type==='charts')await el.locator('[data-vl-choice=point][data-value=oblique]').click();await el.locator('[data-vl-choice]').last().click();assert.ok(await el.locator('.vl-static svg').count());}
 await fallback.close();assert.deepEqual(errors,[]);fs.writeFileSync('qa/visual-lessons-report.json',JSON.stringify({checks,errors},null,2));console.log(`Visual lessons: ${checks.length} responsive/theme combinations, control states, narration, storage, and no-WebGL fallback passed.`);
}finally{await browser.close();}
