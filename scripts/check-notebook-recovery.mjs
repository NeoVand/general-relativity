import fs from 'node:fs';
import assert from 'node:assert/strict';
import {chromium} from 'playwright';
const base=process.env.BOOK_URL||'http://localhost:4173/';
const executablePath='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const browser=await chromium.launch({headless:true,...(fs.existsSync(executablePath)?{executablePath}:{})});
const key='gr-course-v1',id='a-metric-converts-labels-into-lengths';
const backup={version:1,route:'horizons',depths:{[id]:'formal'},notes:{[id]:{text:'Clock and ruler',saved:5}},evidence:{[id]:{attempts:4,transfer:true,answer:'5',updated:6}},visuals:{[id]:{type:'metric',state:{radius:6,scale:1}}}};
try{
 const page=await browser.newPage();
 await page.goto(new URL('notebook.html',base).href);
 await page.waitForFunction(()=>document.body.dataset.readingReady==='true');
 await page.locator('[data-import-notebook]').setInputFiles({name:'backup.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(backup))});
 await page.locator('.notebook-import-preview').waitFor();
 assert.equal(await page.evaluate(key=>JSON.parse(localStorage.getItem(key))?.notes?.['a-metric-converts-labels-into-lengths'],key),undefined,'preview does not write to the notebook');
 await page.locator('[data-cancel-import]').click();
 assert.match(await page.locator('.notebook-status').innerText(),/canceled/);
 await page.locator('[data-import-notebook]').setInputFiles({name:'backup.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(backup))});
 await page.locator('[data-apply-import]').click();
 const restored=await page.evaluate(key=>JSON.parse(localStorage.getItem(key)),key);
 assert.equal(restored.route,'horizons');assert.equal(restored.depths[id],'formal');assert.equal(restored.notes[id].text,'Clock and ruler');assert.equal(restored.evidence[id].attempts,4);assert.equal(restored.evidence[id].independent,false);assert.deepEqual(restored.visuals,backup.visuals);
 await page.goto(new URL('chapter-4.html#'+id,base).href);
 await page.locator(`[data-lesson="${id}"][data-enhanced]`).waitFor();
 assert.equal(await page.locator(`[data-lesson="${id}"] [role=tab][aria-selected=true]`).getAttribute('data-depth'),'formal');
 await page.evaluate(({key,backup})=>localStorage.setItem(key,JSON.stringify(backup)),{key,backup});
 await page.reload();await page.locator(`[data-lesson="${id}"][data-enhanced]`).waitFor();
 assert.deepEqual(await page.evaluate(key=>JSON.parse(localStorage.getItem(key+'-backup')),key),backup,'automatic migration preserves the original JSON');
 console.log('Browser recovery verified: preview, cancel, legacy migration backup, route/depth/notes/visuals restoration, and conservative evidence.');
}finally{await browser.close()}
