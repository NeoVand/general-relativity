import fs from 'node:fs';
import assert from 'node:assert/strict';
import {chromium} from 'playwright';
import {labRecords} from '../web/lab-records.js';
const base=process.env.BOOK_URL||'http://localhost:4173/';
const executablePath='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const browser=await chromium.launch({headless:true,...(fs.existsSync(executablePath)?{executablePath}:{})});
const note='My prediction changed when I halved the step.';
try{
 for(const width of [1440,390]){
  const page=await browser.newPage({viewport:{width,height:1000},acceptDownloads:true,reducedMotion:'reduce'}),errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  for(const [id,record] of Object.entries(labRecords)){
   await page.goto(new URL(`chapter-${record.chapter}.html#lab-${id}`,base).href);
   const root=page.locator(`[data-relativity-lab="${id}"][data-lab-ready]`);await root.waitFor();
   assert.equal(await root.locator('.lab-readouts strong').count(),4);assert.equal(await root.locator('.lab-chart:visible .lab-series').count(),id==='star'||id==='distances'?3:2);
   for(const p of record.parameters){const control=root.locator(`[name="parameter-${p.id}"]`);if(p.options){await control.selectOption(String(p.options.at(-1)))}else await control.evaluate((input,value)=>{input.value=value;input.dispatchEvent(new Event('input',{bubbles:true}))},p.max);}
   assert.equal(await root.locator('[data-lab-status]').innerText(),'');
   await root.locator('[data-lab-observation]').fill(note);
   const context=JSON.parse(await root.getAttribute('data-scientific-context'));assert.equal(context.id,id);assert.equal(context.source.url,record.source.url);assert.equal(context.readouts.length,4);
   const saved=await page.evaluate(({id})=>JSON.parse(localStorage.getItem('gr-course-v1')).experiments[id],{id});assert.equal(saved.note,note);assert.deepEqual(saved.parameters,context.parameters);
   const download=page.waitForEvent('download');await root.locator('[data-lab-export]').click();const file=await download;
   const csv=fs.readFileSync(await file.path(),'utf8');assert(csv.startsWith('# {'));assert(csv.includes(record.source.url));assert(csv.split('\n').length>5);assert(!csv.includes('NaN'));
   await root.locator('[data-lab-reset]').click();await root.locator('.lab-data>summary').click();assert(await root.locator('table').isVisible());await root.locator('.lab-data>summary').click();
   const bounds=await root.boundingBox();assert(bounds.x>=-1&&bounds.x+bounds.width<=width+1,`${id} fits ${width}`);
   await root.screenshot({path:`qa/lab-${id}-${width}.png`,animations:'disabled',style:'.topbar,.study-launcher,.reading-progress,.skip-link{visibility:hidden!important}'});
  }
  await page.goto(new URL('notebook.html',base).href);await page.locator('[data-notebook-experiments] a').first().waitFor();
  assert.equal(await page.locator('[data-notebook-experiments] a').count(),4);await page.locator('[data-journal]').fill('How do the assumptions change this result?');
  const download=page.waitForEvent('download');await page.locator('[data-export-notebook="json"]').click();const file=await download;const backup=JSON.parse(fs.readFileSync(await file.path(),'utf8'));assert.equal(Object.keys(backup.experiments).length,4);assert.match(backup.journal.text,/assumptions/);
  const restored=await browser.newPage();await restored.goto(new URL('notebook.html',base).href);await restored.waitForFunction(()=>document.body.dataset.readingReady==='true');await restored.locator('[data-import-notebook]').setInputFiles({name:'experiments.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(backup))});await restored.locator('[data-apply-import]').click();
  await restored.goto(new URL('chapter-17.html#lab-star',base).href);await restored.locator('[data-relativity-lab="star"][data-lab-ready]').waitFor();assert.equal(await restored.locator('#lab-star [data-lab-observation]').inputValue(),note);
  assert.deepEqual(errors,[]);await restored.close();await page.close();
 }
 const context=await browser.newContext({javaScriptEnabled:false,reducedMotion:'reduce'}),page=await context.newPage();
 for(const [id,record] of Object.entries(labRecords)){
  await page.goto(new URL(`chapter-${record.chapter}.html#lab-${id}`,base).href);const root=page.locator(`[data-relativity-lab="${id}"]`);
  assert.equal(await root.locator('.lab-readouts strong').count(),4);assert(!(await root.locator('form').isVisible()));await root.locator('.lab-data>summary').click();assert(await root.locator('table').isVisible());await root.locator('.lab-method>summary').click();assert(await root.locator('[data-scientific-equation]').first().isVisible());
 }
 console.log('Four laboratories verified on desktop/mobile: every control, calculated plots/tables, complete CSV provenance, observation/context persistence, notebook restore, and no-JavaScript equivalents.');
}finally{await browser.close()}
