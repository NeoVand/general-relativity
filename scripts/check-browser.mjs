import fs from 'node:fs';
import assert from 'node:assert/strict';
import {chromium} from 'playwright';
const base=process.env.BOOK_URL||'http://localhost:4173/';
const chrome='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const browser=await chromium.launch({headless:true,...(fs.existsSync(chrome)?{executablePath:chrome}:{})});
const page=await browser.newPage({viewport:{width:1440,height:1000},deviceScaleFactor:1});
const errors=[];page.on('pageerror',e=>errors.push(e.message));
fs.mkdirSync('qa',{recursive:true});
const files=fs.readdirSync('site').filter(f=>f.endsWith('.html'));
const checks=[];
try{
 for(const width of [1440,390]){
  await page.setViewportSize({width,height:width===390?844:1000});
  for(const file of files){
   const response=await page.goto(new URL(file,base).href);assert.equal(response.status(),200,file);
   await page.evaluate(()=>document.fonts.ready);
   const result=await page.evaluate(()=>({width:document.documentElement.clientWidth,scroll:document.documentElement.scrollWidth,brokenImages:[...document.images].filter(i=>!i.complete||!i.naturalWidth).map(i=>i.src),mathErrors:document.querySelectorAll('.math-error').length}));
   // Lazy images are intentionally not loaded until approached; force them before evaluating.
   await page.evaluate(async()=>{await Promise.all([...document.images].map(i=>{i.loading='eager';return i.decode().catch(()=>{})}))});
   Object.assign(result,await page.evaluate(()=>({width:document.documentElement.clientWidth,scroll:document.documentElement.scrollWidth,brokenImages:[...document.images].filter(i=>!i.complete||!i.naturalWidth).map(i=>i.src)})));
   if(result.scroll>result.width+1){
    console.log(await page.evaluate(()=>[...document.querySelectorAll('body *')].filter(e=>e.getBoundingClientRect().right>innerWidth&&!e.closest('.katex-mathml,.equation,.table-wrap,.sidebar,dialog')).map(e=>({tag:e.tagName,cls:e.className,text:e.textContent.slice(0,180),box:e.getBoundingClientRect().toJSON()}))));
    await page.screenshot({path:'qa/overflow.png',fullPage:true});
   }
   assert.ok(result.scroll<=result.width+1,`${file} overflows at ${width}: ${result.scroll}`);
   assert.deepEqual(result.brokenImages,[],`${file} images`);assert.equal(result.mathErrors,0);
   checks.push({file,width,...result});
   if(['index.html','chapter-0.html','chapter-8.html','chapter-11.html','chapter-14.html','chapter-16.html','chapter-22.html'].includes(file))await page.screenshot({path:`qa/${file.replace('.html','')}-${width}.png`});
  }
 }
 await page.goto(new URL('chapter-16.html#16-7-gps-calculate-the-competing-clock-effects',base).href);
 await page.waitForFunction(()=>Math.abs(document.getElementById('16-7-gps-calculate-the-competing-clock-effects').getBoundingClientRect().top-90)<15);
 await page.screenshot({path:'qa/section-link-mobile.png'});
 await page.locator('#altitude').fill('20200');await page.locator('#altitude').dispatchEvent('input');
 assert.match(await page.locator('#gps-net').innerText(),/\+38\.51/);
 await page.locator('#altitude').fill('400');await page.locator('#altitude').dispatchEvent('input');
 assert.match(await page.locator('#gps-net').innerText(),/−/);
 await page.goto(new URL('chapter-3.html',base).href);
 await page.locator('#speed').fill('0.6');await page.locator('#speed').dispatchEvent('input');
 assert.match(await page.locator('#clock-result').innerText(),/8\.00 years/);
 await page.locator('#speed').fill('0');await page.locator('#speed').dispatchEvent('input');
 assert.match(await page.locator('#clock-result').innerText(),/10\.00 years/);
 await page.goto(new URL('chapter-18.html',base).href);
 await page.locator('#wave-phase').fill('50');await page.locator('#wave-phase').dispatchEvent('input');
 assert.ok(Number(await page.locator('.wave-dot').first().getAttribute('cx'))>330);
 await page.locator('#search-button').click();await page.locator('#search-input').fill('GPS');
 await page.waitForFunction(()=>document.querySelectorAll('#search-results a').length>0);
 assert.ok((await page.locator('#search-results').innerText()).includes('Clocks, light, and Mercury'));
 await page.keyboard.press('Escape');await page.locator('#search-dialog').waitFor({state:'hidden'});
 await page.locator('#theme-button').click();assert.equal(await page.locator('html').getAttribute('data-theme'),'dark');
 await page.locator('#type-button').click();assert.match(await page.locator('html').getAttribute('class'),/large-type/);
 assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
 await page.screenshot({path:'qa/dark-large-mobile.png'});
 await page.locator('#menu-button').click();assert.equal(await page.locator('#menu-button').getAttribute('aria-expanded'),'true');
 await page.keyboard.press('Escape');assert.equal(await page.locator('#menu-button').getAttribute('aria-expanded'),'false');
 await page.goto(new URL('chapter-0.html',base).href);await page.locator('.checkpoint summary').first().click();assert.equal(await page.locator('.checkpoint').first().getAttribute('open'),'');
 assert.deepEqual(errors,[]);
 fs.writeFileSync('qa/browser-report.json',JSON.stringify({checks,interactionChecks:'passed',errors},null,2));
 console.log(`Browser checks passed: ${checks.length} page/viewport combinations, links to sections, images, search, controls, checkpoints, and all three experiments.`);
}finally{await browser.close()}
