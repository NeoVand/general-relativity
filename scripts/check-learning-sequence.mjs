import fs from 'node:fs';
import assert from 'node:assert/strict';
import {parseHTML} from 'linkedom';
import {chromium} from 'playwright';
import {lessons} from '../content/course.mjs';
import {lessonSequence} from '../content/lesson-sequence.mjs';

// This guards concrete, editorially reviewed failures. It does not infer that
// every term is explained, or treat a passing build as a learner study.
const docs=new Map();
function doc(chapter){if(!docs.has(chapter))docs.set(chapter,parseHTML(fs.readFileSync(`site/chapter-${chapter}.html`,'utf8')).document);return docs.get(chapter);}
assert.deepEqual(new Set(Object.keys(lessonSequence)),new Set(lessons.map(l=>l.id)),'every lesson has a placement review, with no stale records');
for(const lesson of lessons){
 const d=doc(lesson.chapter),root=d.getElementById(lesson.id);
 assert.ok(root,`${lesson.id} exists at its new reading location`);
 const nodes=[...d.querySelectorAll('*')],at=el=>nodes.indexOf(el);
 const heading=[...root.parentElement.children].find(el=>el.tagName==='H3'&&el.textContent.replace(/’/g,"'").startsWith(lesson.after.replace(/’/g,"'")));
 assert.ok(heading,`${lesson.id}: exact section heading exists`);
 const exposition=[];
 for(let el=heading.nextElementSibling;el&&!/^H[23]$/.test(el.tagName);el=el.nextElementSibling){
  if(el.matches('p,ol,ul,table,.equation,.table-wrap,details.checkpoint'))exposition.push(el);
 }
 assert.ok(exposition.length,`${lesson.id}: has actual section explanation, not just a heading`);
 for(const el of exposition)assert.ok(lesson.placement==='section-end'?at(el)<at(root):at(root)<at(el),`${lesson.id}: ${lesson.placement} respects the full explanation`);
 for(const dependency of lesson.requires){
  const [,chapter,fragment]=dependency.href.match(/^chapter-(\d+)\.html(?:#(.+))?$/)||[];
  assert.ok(chapter!==undefined,`${lesson.id}: prerequisite is a teaching destination`);
  assert.ok(Number(chapter)<=lesson.chapter,`${lesson.id}: prerequisite chapter is available`);
  if(Number(chapter)===lesson.chapter&&fragment){const target=d.getElementById(fragment);assert.ok(target&&at(target)<at(root),`${lesson.id}: ${fragment} really appears earlier`);}
 }
 assert.equal(root.querySelectorAll('.lesson-prerequisites').length,lesson.requires.length?1:0,'no empty Builds on list');
}
const first=doc(0).querySelector('.prose').cloneNode(true);
first.querySelectorAll('.relocated-lesson').forEach(el=>el.remove());
assert.doesNotMatch(first.textContent,/\bmetric\b|spacetime interval|connection coefficient|Riemann|Lorentz|proper time/i,'Chapter 0 does not smuggle relativity vocabulary into the mathematics refresher');
assert.match(first.textContent,/Watch a small cart/);
assert.equal(first.querySelector('[data-lesson]').id,'measurements-and-units');
assert.equal(doc(4).querySelector('[data-lesson="dimensions-before-symbols"]')?.id,'dimensions-before-symbols');
const guide=parseHTML(fs.readFileSync('site/reading-guide.html','utf8')).document;
assert.match(guide.querySelector('.prose').textContent,/Begin with a ruler, a clock/,'the entry invitation survives manuscript-to-page splitting');
const conventions=guide.querySelector('details.course-conventions');
assert.ok(conventions&&!conventions.hasAttribute('open')&&conventions.hasAttribute('data-no-narration'),'the returning-reader reference is closed and excluded from default narration');
assert.ok(conventions.querySelectorAll('.katex').length>10,'the reference still contains its equations');
const gravity=doc(1).querySelector('.prose').textContent;
assert.doesNotMatch(gravity,/\bmetric\b|connection coefficients|Ricci|Weyl|g_\{\\mu/,'motivation does not require later tensor machinery');
const interval=doc(3).getElementById('3-3-the-interval-the-quantity-that-refuses-to-change');
let intervalText='';for(let el=interval.nextElementSibling;el&&el.tagName!=='H3';el=el.nextElementSibling)intervalText+=el.textContent;
assert.ok(intervalText.indexOf('Choose two events')<intervalText.indexOf('spacetime interval'));
assert.ok(intervalText.indexOf('For a concrete example')<intervalText.indexOf('For small displacements'));
// Independent numerical checks for the replacement explanations.
const beta=.6,gamma=1/Math.sqrt(1-beta*beta),dt=5,dx=3;
assert.ok(Math.abs(gamma*(dt-beta*dx)-4)<1e-12);
assert.ok(Math.abs(gamma*(dx-beta*dt))<1e-12);
assert.equal(-dt*dt+dx*dx,-16);
assert.ok(Math.abs(3*(2.1**2-2**2)-1.23)<1e-12);
assert.equal(2*(30/100),.6);
assert.equal((.5*100)**2,2500);

const chrome='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const browser=await chromium.launch({headless:true,...(fs.existsSync(chrome)?{executablePath:chrome}:{})});
const base=process.env.BOOK_URL||'http://localhost:4173/';fs.mkdirSync('qa',{recursive:true});
try{
 for(const width of [1440,390]){
  const page=await browser.newPage({viewport:{width,height:960},reducedMotion:'reduce'});
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto(new URL('chapter-0.html',base).href);
  await page.locator('[data-lesson="measurements-and-units"][data-enhanced]').waitFor();
  assert.equal(await page.locator('.relocated-lesson').isVisible(),false);
  const table=page.locator('.prose .table-wrap').first();assert(await table.evaluate(el=>el.scrollWidth<=el.clientWidth+1),'both measurement columns fit without sideways scrolling');
  for(const name of ['intuition','derive','formal']){
   const root=page.locator('[data-lesson="measurements-and-units"]');await root.locator(`[role=tab][data-depth="${name}"]`).click();
   assert(await root.locator(`.lesson-panel[data-depth="${name}"]`).isVisible());
  }
  await page.locator('[id="0-1-a-derivative-is-a-local-prediction"]').scrollIntoViewIfNeeded();
  await page.screenshot({path:`qa/novice-opening-${width}.png`,fullPage:false});
  await page.goto(new URL('chapter-0.html#dimensions-before-symbols',base).href);
  await page.waitForFunction(()=>document.body.dataset.readingReady==='true');
  const redirect=page.locator('.relocated-lesson');assert(await redirect.isVisible());
  await redirect.locator('a').click();
  await page.locator('[data-lesson="dimensions-before-symbols"][data-enhanced]').waitFor();
  assert.match(page.url(),/chapter-4\.html#dimensions-before-symbols$/);
  for(const chapter of [7,22]){
   await page.goto(new URL(`chapter-${chapter}.html`,base).href);
   for(const l of lessons.filter(l=>l.chapter===chapter&&l.placement==='section-start')){
    const root=page.locator(`[data-lesson="${l.id}"][data-enhanced]`);await root.waitFor();
    assert.equal(await root.locator('[role=tablist]').isVisible(),false);
    for(const panel of ['intuition','derive','formal'])assert(await root.locator(`.lesson-panel[data-depth="${panel}"]`).isVisible(),`${l.id}: ${panel} is in the reading flow`);
   }
  }
  assert.deepEqual(errors,[]);await page.close();
 }
 // The old bookmark also has a useful native destination without JavaScript.
 const page=await browser.newPage({javaScriptEnabled:false,reducedMotion:'reduce'});
 await page.goto(new URL('chapter-0.html#dimensions-before-symbols',base).href);
 assert(await page.locator('.relocated-lesson').isVisible());
 await page.locator('.relocated-lesson a').click();assert(await page.locator('[data-lesson="dimensions-before-symbols"]').isVisible());
 console.log(`Verified ${lessons.length} explicit placements and prerequisite order, an entry refresher without premature relativity notation, numerical opening examples, visible preparation, and relocated links at desktop/mobile widths and without JavaScript.`);
}finally{await browser.close()}
