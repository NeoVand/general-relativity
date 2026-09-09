import assert from 'node:assert/strict';
import fs from 'node:fs';
import {chromium} from 'playwright';
import {parseHTML} from 'linkedom';
import {canonicalCurvature,curvatureEntry,curvaturePairs,tidalCloud,projectCloud,curvatureExperienceSource} from '../web/curvature-experiences.js';
import {curvatureExperienceHTML} from './curvature-experiences.mjs';
const near=(a,b,tol=1e-8)=>assert(Math.abs(a-b)<tol,`${a} differs from ${b}`);
const matrix=Array.from({length:6},(_,i)=>Array.from({length:6},(_,j)=>Math.min(i,j)*7+Math.max(i,j)+.25));
matrix[2][3]=matrix[3][2]=matrix[1][4]-matrix[0][5];
const R=(a,b,c,d)=>{const v=canonicalCurvature(a,b,c,d);return v.zero?0:v.sign*matrix[v.row][v.col]};
const labels=new Set();let slots=0;
for(let a=0;a<4;a++)for(let b=0;b<4;b++)for(let c=0;c<4;c++)for(let d=0;d<4;d++){
 near(R(a,b,c,d),-R(b,a,c,d));near(R(a,b,c,d),-R(a,b,d,c));near(R(a,b,c,d),R(c,d,a,b));near(R(a,b,c,d)+R(a,c,d,b)+R(a,d,b,c),0);
 if(a<b&&c<d){slots++;const v=canonicalCurvature(a,b,c,d);labels.add(`${v.row},${v.col}`);}
}
assert.equal(slots,36);assert.equal(labels.size,21);assert.equal(curvaturePairs.length,6);
assert.equal(curvatureEntry(0,5).tex,'R_{0123}');assert.equal(curvatureEntry(0,5).lastSwap,'R_{0132}');assert.equal(curvatureEntry(1,4).tex,'R_{0213}');
for(const mode of ['isotropic','tracefree']){
 const zero=tidalCloud(mode,0);assert.deepEqual(zero.axes,[1,1,1]);near(zero.volume,1);near(zero.volumeRate,0);
 const h=.0001,atH=tidalCloud(mode,h);near(2*(atH.volume-1)/(h*h),zero.initialVolumeAcceleration,1e-6);
 for(const t of [.2,.5,.85]){const c=tidalCloud(mode,t),a=tidalCloud(mode,t-h),b=tidalCloud(mode,t+h);for(let i=0;i<3;i++)near((b.axes[i]-2*c.axes[i]+a.axes[i])/(h*h),c.eigenvalues[i]*c.axes[i],1e-6);near(c.volume,c.axes[0]*c.axes[1]*c.axes[2]);near((b.volume-a.volume)/(2*h),c.volumeRate,1e-6);}
}
near((tidalCloud('tracefree',.02).volume-1)/(.02**4),-.5,1e-4);assert(tidalCloud('tracefree',.9).volume<.8);assert(tidalCloud('tracefree',.9).aspect>3);near(tidalCloud('isotropic',.9).aspect,1);
for(const yaw of [-2,0,.7,3])for(const pitch of [-.9,0,.9]){const p=[.8,-1.4,.5],q=projectCloud(p,yaw,pitch);near(q.x*q.x+q.y*q.y+q.depth*q.depth,p.reduce((s,x)=>s+x*x,0));}
for(const type of ['pairs','cloud']){const {document}=parseHTML(curvatureExperienceHTML(type));assert.equal(document.querySelectorAll('.katex-error').length,0);assert(document.querySelectorAll('.katex').length>10);assert(document.querySelector('[data-narration-source]').dataset.narrationSource.length>100);assert.equal(document.querySelectorAll('svg text').length,0);}
console.log('Verified all 256 curvature symmetries and Bianchi components; exact Jacobi equations, initial volume acceleration, finite volume change, 3D projection, and SSR LaTeX.');
if(process.argv.includes('--unit-only'))process.exit(0);
const root=process.cwd(),chrome='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const browser=await chromium.launch({headless:true,...(fs.existsSync(chrome)?{executablePath:chrome}:{})});
const page=await browser.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
const variables=`:root{--ink:#20262c;--muted:#626971;--geometry:#007c78;--curvature:#7951bb;--transport:#275dc5;--observer:#bb365d;--paper:#fffefa;--sans:Manrope,Arial,sans-serif}html[data-theme=dark]{--ink:#ebedf0;--muted:#a8b0bf;--geometry:#64d9c9;--curvature:#bd9cff;--transport:#8bb5ff;--observer:#ff99b4;--paper:#141b29}body{margin:0;background:var(--paper);font-family:var(--sans)}main{max-width:1100px;margin:auto;padding:24px 30px 100px}@font-face{font-family:Manrope;src:url('/manrope.woff2');font-weight:200 800}@media(max-width:600px){main{padding:20px}}`;
const html=`<!doctype html><html><head><link rel="stylesheet" href="/katex.css"><link rel="stylesheet" href="/book.css"><link rel="stylesheet" href="/experience.css"><style>${variables}</style><script src="/katex.js"></script></head><body><main class="prose">${curvatureExperienceHTML('pairs',{reference:'<p class="test-reference">Optional source diagram</p>'})}${curvatureExperienceHTML('cloud',{reference:'<p class="test-reference">Optional source diagram</p>'})}</main><script type="module">import*as cx from '/experience.js';window.__cx=cx;window.__cleanup=cx.initCurvatureExperiences();</script></body></html>`;
await page.route('http://curvature.test/**',route=>{const path=new URL(route.request().url()).pathname;if(path==='/')return route.fulfill({contentType:'text/html',body:html});const files={'/book.css':['web/styles.css','text/css'],'/experience.js':['web/curvature-experiences.js','text/javascript'],'/experience.css':['web/curvature-experiences.css','text/css'],'/katex.js':['node_modules/katex/dist/katex.min.js','text/javascript'],'/katex.css':['node_modules/katex/dist/katex.min.css','text/css'],'/manrope.woff2':['site/assets/fonts/manrope-latin-wght-normal.woff2','font/woff2']};let file=files[path];if(path.startsWith('/assets/fonts/'))file=['site'+path,'font/woff2'];if(path.startsWith('/fonts/'))file=['node_modules/katex/dist'+path,'font/woff2'];return file?route.fulfill({contentType:file[1],body:fs.readFileSync(root+'/'+file[0])}):route.fulfill({status:404,body:''});});
fs.mkdirSync('qa',{recursive:true});
async function layout(el,width){const metrics=await el.evaluate(e=>{const r=e.getBoundingClientRect();const visible=[...e.querySelectorAll('.cx-math')].filter(n=>n.checkVisibility());return {overflow:e.scrollWidth-e.clientWidth,doc:document.documentElement.scrollWidth,clipped:visible.map(n=>({tex:n.querySelector('annotation')?.textContent,...(()=>{const b=n.getBoundingClientRect();return {left:b.left,right:b.right}})()})).filter(b=>b.left<r.left-1||b.right>r.right+1),errors:e.querySelectorAll('.katex-error').length}});assert(metrics.overflow<=1,JSON.stringify(metrics));assert(metrics.doc<=width+1);assert.deepEqual(metrics.clipped,[]);assert.equal(metrics.errors,0);}
async function scrollCloudVisibility(cloud,visible){return cloud.evaluate((e,wanted)=>new Promise((resolve,reject)=>{
 const snapshot=()=>({actual:window.__cx.getCurvatureExperienceState().find(item=>item.id===e.id).state,published:JSON.parse(e.dataset.visualState),top:e.getBoundingClientRect().top,viewport:innerHeight,scrollY});
 let frame=0;
 const timeout=setTimeout(()=>{observer.disconnect();cancelAnimationFrame(frame);reject(Error(`Cloud did not become ${wanted?'visible':'offscreen'}`));},5000);
 const observer=new IntersectionObserver(entries=>{
  if(entries.at(-1).isIntersecting!==wanted)return;
  observer.disconnect();
  // Let the application's own observer cancel or schedule its frame first.
  frame=requestAnimationFrame(()=>{frame=requestAnimationFrame(()=>{clearTimeout(timeout);resolve(snapshot());});});
 });observer.observe(e);
 // The real book has smooth scrolling; a fixed delay does not establish visibility.
 if(wanted)e.scrollIntoView({block:'center',behavior:'instant'});
 else scrollTo({top:0,left:0,behavior:'instant'});
}),visible);}
try{
 for(const width of [1200,768,390])for(const theme of ['light','dark']){
  await page.setViewportSize({width,height:1000});await page.goto('http://curvature.test/');await page.evaluate(t=>document.documentElement.dataset.theme=t,theme);await page.waitForFunction(()=>document.querySelectorAll('[data-curvature-ready=true]').length===2);await page.evaluate(()=>document.fonts.ready);
  const pairs=page.locator('[data-curvature-experience=pairs]'),cloud=page.locator('[data-curvature-experience=cloud]');
  for(const step of [0,1,2]){await pairs.locator(`[data-cx-phase="${step}"]`).click();await layout(pairs,width);assert.equal(await pairs.locator('.test-reference').count(),1,'Optional source survives phase changes');assert.equal(await pairs.locator('[data-cx-cell]').count(),36);assert(await pairs.locator('[data-cx-cell]').evaluateAll(buttons=>buttons.every(b=>b.querySelector('annotation')?.textContent.trim())),'Every matrix tile has an actual LaTeX component label');await pairs.locator('[data-cx-cell="1,4"]').click();assert((await pairs.getAttribute('data-narration-source')).includes('R_{0213}'));assert.equal(await pairs.locator('[data-cx-cell="4,1"]').getAttribute('class').then(c=>c.includes('is-mirror')),true);}
  await pairs.locator('[data-cx-cell="1,4"]').press('ArrowRight');assert.equal(JSON.parse(await pairs.getAttribute('data-visual-state')).col,5);await pairs.screenshot({path:`qa/curvature-pairs-${width}-${theme}.png`});
  for(const mode of ['isotropic','tracefree']){await cloud.locator(`[data-cx-mode="${mode}"]`).click();for(const time of [0,.3,.6,.9]){await cloud.locator(`button[data-cx-time="${time}"]`).click();await layout(cloud,width);assert.equal(await cloud.locator('.test-reference').count(),1,'Optional source survives mode changes');const source=await cloud.getAttribute('data-narration-source');assert(source.includes('three-dimensional volume'));assert(!source.includes('Release the cloud'));assert.equal(await cloud.locator('.cx-particles circle').count(),112);}}
  await cloud.screenshot({path:`qa/curvature-cloud-${width}-${theme}.png`});
 }
 const cloud=page.locator('[data-curvature-experience=cloud]');await cloud.locator('[data-cx-restart]').click();await cloud.locator('[data-cx-play]').click();await page.waitForTimeout(550);let s=JSON.parse(await cloud.getAttribute('data-visual-state'));assert(s.time>0&&s.playing);await cloud.locator('[data-cx-play]').click();s=JSON.parse(await cloud.getAttribute('data-visual-state'));await page.waitForTimeout(250);near(JSON.parse(await cloud.getAttribute('data-visual-state')).time,s.time);
 await cloud.locator('[data-cx-play]').click();
 await page.waitForFunction(time=>window.__cx.getCurvatureExperienceState().find(item=>item.type==='cloud').state.time>time+.005,s.time);
 const hidden=await scrollCloudVisibility(cloud,false);assert.equal(hidden.scrollY,0);assert(hidden.top>=hidden.viewport,'The whole experience has left the viewport');assert(hidden.actual.playing,'Offscreen suspension preserves play intent');
 await page.waitForTimeout(350);
 const suspended=await cloud.evaluate(e=>({actual:window.__cx.getCurvatureExperienceState().find(item=>item.id===e.id).state,published:JSON.parse(e.dataset.visualState)}));
 near(suspended.actual.time,hidden.actual.time);near(suspended.published.time,hidden.published.time);
 const resumed=await scrollCloudVisibility(cloud,true);
 assert(resumed.actual.time>=hidden.actual.time);assert(resumed.actual.time-hidden.actual.time<=.00600001,'The first resumed frames must not integrate hidden wall time');
 await page.waitForFunction(time=>window.__cx.getCurvatureExperienceState().find(item=>item.type==='cloud').state.time>time+.005,hidden.actual.time);
 await page.waitForFunction(time=>JSON.parse(document.querySelector('[data-curvature-experience=cloud]').dataset.visualState).time>time,hidden.published.time);
 await page.emulateMedia({reducedMotion:'reduce'});await page.waitForTimeout(200);assert.equal(JSON.parse(await cloud.getAttribute('data-visual-state')).playing,false);
 const stage=cloud.locator('.cx-cloud-stage');await stage.focus();await stage.press('ArrowRight');const changed=JSON.parse(await cloud.getAttribute('data-visual-state'));assert.notEqual(changed.yaw,1.1);await stage.press('Home');near(JSON.parse(await cloud.getAttribute('data-visual-state')).yaw,1.1);
 await page.evaluate(()=>window.__cx.restoreCurvatureExperienceState('curvature-cloud-explorer',{mode:'isotropic',time:.6,yaw:.2,pitch:.1}));assert.equal(JSON.parse(await cloud.getAttribute('data-visual-state')).mode,'isotropic');assert((await cloud.getAttribute('data-narration-source')).includes('isotropic focusing'));
 await page.evaluate(()=>window.__cleanup());assert.equal(await page.locator('[data-curvature-ready]').count(),0);assert.deepEqual(await page.evaluate(()=>window.__cx.getCurvatureExperienceState()),[]);
 if(process.argv.includes('--integrated')){
  await page.unrouteAll();
  const base=process.env.BOOK_URL||'http://localhost:4173/';
  for(const width of [1440,390])for(const theme of ['light','dark'])for(const [chapter,type]of [[8,'pairs'],[9,'cloud']]){
   await page.setViewportSize({width,height:1000});await page.goto(new URL(`chapter-${chapter}.html`,base).href);
   await page.waitForFunction(()=>document.body.dataset.readingReady==='true'&&document.querySelector('[data-curvature-ready=true]'));
   await page.evaluate(t=>document.documentElement.dataset.theme=t,theme);await page.evaluate(()=>document.fonts.ready);
   const experience=page.locator(`[data-curvature-experience=${type}]`);
   const scripts=await experience.locator(':scope>.narration-script').count();
   assert.equal(await experience.locator('.passage-tools').count(),1,'One integrated narration toolbar');
   assert.equal(await experience.locator(':scope>.cx-reference').count(),1,'Optional reference remains available');
   if(type==='pairs'){
    for(const step of [0,1,2]){await experience.locator(`[data-cx-phase="${step}"]`).click();await layout(experience,width);}
    await experience.locator('[data-cx-cell="1,4"]').click();assert((await experience.getAttribute('data-narration-source')).includes('R_{0213}'));
   }else{
    for(const mode of ['isotropic','tracefree']){await experience.locator(`[data-cx-mode="${mode}"]`).click();await experience.locator('[data-cx-time="0.9"]').click();await layout(experience,width);assert((await experience.getAttribute('data-narration-source')).includes(mode==='isotropic'?'isotropic focusing':'trace-free tidal'));}
   }
   assert.equal(await experience.locator(':scope>.narration-script').count(),scripts,'Editorial script survives rendering');
   assert.equal(await experience.locator('.passage-tools').count(),1,'Narration actions survive changes');
   assert.equal(await experience.locator(':scope>.cx-reference').count(),1);
   const typography=await experience.evaluate(e=>({title:getComputedStyle(e.querySelector('.cx-title')).fontFamily,control:getComputedStyle(e.querySelector('button')).fontFamily,math:[...e.querySelectorAll('.cx-count .katex,.cx-measure .katex,.cx-pair-table button .katex')].map(n=>parseFloat(getComputedStyle(n).fontSize))}));
   assert.match(typography.title,/Manrope/);assert.match(typography.control,/Manrope/);assert(typography.math.every(size=>size>=18),JSON.stringify(typography));
   // A locator taller than the viewport can be captured during Chrome's temporary
   // screenshot reflow; give it real room, keeping fixed reader chrome outside it.
   const box=await experience.boundingBox();await page.setViewportSize({width,height:Math.ceil(box.height+240)});
   await experience.evaluate(e=>scrollTo(0,e.getBoundingClientRect().top+scrollY-110));
   await experience.screenshot({path:`qa/curvature-integrated-${type}-${width}-${theme}.png`});
  }
  console.log('Verified built chapters 8 and 9 in desktop/mobile and both themes: no overflow, readable LaTeX, current-state source, preserved narration tools and optional references.');
 }
 assert.deepEqual(errors,[]);console.log('Verified both experiences across six width/theme combinations; controls, signed entries, state-aware narration, motion/pause, offscreen suspension, reduced motion, orbit, restoration, and cleanup.');
}finally{await browser.close();}
