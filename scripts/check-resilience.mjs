import assert from 'node:assert/strict';
import fs from 'node:fs';
import {chromium} from 'playwright';
import {lessons} from '../content/course.mjs';

const chrome='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const browser=await chromium.launch({headless:true,...(fs.existsSync(chrome)?{executablePath:chrome}:{})});
const base=process.env.BOOK_URL||'http://localhost:4173/';
try {
 for (const failure of ['javascript-disabled','reader-unavailable','course-data-unavailable']) {
  const context=await browser.newContext({javaScriptEnabled:failure!=='javascript-disabled',viewport:{width:390,height:844}});
  if(failure==='reader-unavailable')await context.route('**/reader/*.js',route=>route.abort());
  if(failure==='course-data-unavailable')await context.route('**/course-data.json',route=>route.fulfill({status:503,body:'Unavailable'}));
  const page=await context.newPage();
  for (const chapter of [...new Set(lessons.map(l=>l.chapter))]) {
   await page.goto(new URL(`chapter-${chapter}.html`,base).href);
   if(failure==='course-data-unavailable')await page.locator('.lesson-save-status').first().filter({hasText:'could not load'}).waitFor();
   for (const lesson of lessons.filter(l=>l.chapter===chapter)) {
    const root=page.locator(`[data-lesson="${lesson.id}"]`);
    for(const depth of ['intuition','derive','formal'])assert(await root.locator(`.lesson-panel[data-depth="${depth}"]`).isVisible(),`${failure}/${lesson.id}: ${depth} remains readable`);
    assert(!(await root.locator('.lesson-depths').isVisible()));
    assert(await root.locator('[data-save-lesson]').isDisabled());
    await root.locator('.lesson-practice>summary').click();
    await root.locator('.practice-static>summary').click();
    assert.match(await root.locator('.practice-static').innerText(),/Compare the reasoning/);
    await root.locator('.transfer-solution>summary').click();
    assert(await root.locator('.transfer-solution p').first().isVisible());
    assert(!(await root.locator('[data-transfer]').isVisible()));
    if(lesson.visual&&failure!=='course-data-unavailable') {
     assert(await root.locator('.visual-summary').isVisible());
     assert(await root.locator('.visual-summary .katex').count()>0);
     assert.doesNotMatch(await root.innerText(),/model is loading/);
    }
   }
  }
  await context.close();
 }
 console.log('All bridge derivations, qualifications, solutions and static model measurements survive disabled JavaScript, a blocked reader, and unavailable learning data.');
} finally {await browser.close();}
