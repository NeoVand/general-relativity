import fs from 'node:fs';
import assert from 'node:assert/strict';
import {chromium} from 'playwright';
const executablePath='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const browser=await chromium.launch({headless:true,...(fs.existsSync(executablePath)?{executablePath}:{})});
const base=process.env.BOOK_URL||'http://localhost:4173/';
try{
 for(const width of [1440,390]){
  const page=await browser.newPage({viewport:{width,height:960},reducedMotion:'reduce'});
  await page.goto(new URL('chapter-4.html',base).href);
  await page.locator('[data-lesson][data-enhanced]').first().waitFor();await page.evaluate(()=>document.fonts.ready);
  await page.evaluate(()=>scrollTo({top:4200,behavior:'instant'}));
  await page.waitForFunction(()=>history.state?.reading?.y>4000);
  const before=await page.evaluate(()=>({y:scrollY,snapshot:history.state.reading}));
  // Programmatic activation of a real course link avoids Playwright's own
  // scroll-into-view changing the reading position we are trying to preserve.
  await page.locator('a[href="course-map.html"]').first().evaluate(el=>el.click());
  await page.waitForFunction(()=>document.body.dataset.page==='course-map'&&history.state?.reading);
  await page.evaluate(()=>scrollTo({top:1000,behavior:'instant'}));
  await page.waitForFunction(()=>history.state?.reading?.y>500);
  const mapY=await page.evaluate(()=>scrollY);
  await page.goBack();
  await page.waitForFunction(()=>document.body.dataset.page==='chapter-4'&&document.body.dataset.readerNavigating==='false');
  assert.ok(Math.abs(await page.evaluate(()=>scrollY)-before.y)<5,`${width}: Back restores the unhashed reading position`);
  assert.equal(await page.evaluate(()=>document.activeElement?.id),before.snapshot.anchor,`${width}: reading focus follows the restored anchor`);
  await page.goForward();await page.waitForFunction(()=>document.body.dataset.page==='course-map'&&document.body.dataset.readerNavigating==='false');
  assert.ok(Math.abs(await page.evaluate(()=>scrollY)-mapY)<5,`${width}: Forward restores its own position`);
  await page.reload();await page.waitForFunction(()=>document.body.dataset.readingReady==='true'&&scrollY>500);
  assert.ok(Math.abs(await page.evaluate(()=>scrollY)-mapY)<5,`${width}: reload restores the saved position`);
  await page.close();
 }
 console.log('Back, Forward, reload and reading focus preserve independent desktop/mobile positions.');
}finally{await browser.close()}
