import fs from 'node:fs';
import assert from 'node:assert/strict';
import {chromium} from 'playwright';
import {foundationLessons} from '../content/foundation-lessons.mjs';
const base=process.env.BOOK_URL||'http://localhost:4173/';
const executablePath='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const browser=await chromium.launch({headless:true,...(fs.existsSync(executablePath)?{executablePath}:{})});
try{
 for(const width of [1440,390]){
  const page=await browser.newPage({viewport:{width,height:960},reducedMotion:'reduce'});
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto(new URL('course-map.html',base).href);
  await page.locator('[data-diagnostic-form]:not([hidden])').first().waitFor({state:'attached'});
  for(const lesson of foundationLessons){
   const root=page.locator(`[data-diagnostic="${lesson.id}"]`);await root.locator(':scope>summary').click();
   await root.locator('input').fill(String(lesson.transfer.answer+100));await root.locator('button').click();
   assert.match(await root.locator('[role=status]').innerText(),/another look/);
   await root.locator('input').fill(String(lesson.transfer.answer));await root.locator('button').click();
   assert.match(await root.locator('[role=status]').innerText(),/example checks/);
   assert.equal(await root.locator('.diagnostic-return').getAttribute('href'),`chapter-${lesson.chapter}.html#${lesson.id}`);
   const bounds=await root.boundingBox();assert.ok(bounds.x>=-1&&bounds.x+bounds.width<=width+1);
   await root.locator(':scope>summary').click();
  }
  await page.screenshot({path:`qa/diagnostics-${width}.png`,fullPage:false});
  assert.equal(await page.locator('.katex-error').count(),0);assert.deepEqual(errors,[]);
  await page.close();
 }
 const context=await browser.newContext({javaScriptEnabled:false});const page=await context.newPage();
 await page.goto(new URL('course-map.html',base).href);
 for(const lesson of foundationLessons){const root=page.locator(`[data-diagnostic="${lesson.id}"]`);await root.locator(':scope>summary').click();await root.locator('details>summary').click();assert(await root.locator('details p').isVisible());assert(!(await root.locator('form').isVisible()));}
 console.log('Twelve readiness checks verified at desktop/mobile widths, with correct/wrong feedback, teaching links and complete no-JavaScript reasoning.');
}finally{await browser.close()}
