import fs from 'node:fs';
import assert from 'node:assert/strict';
import {chromium} from 'playwright';
const base=process.env.BOOK_URL||'http://localhost:4173/';
const chrome='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const browser=await chromium.launch({headless:true,...(fs.existsSync(chrome)?{executablePath:chrome}:{})});
const page=await browser.newPage({viewport:{width:1440,height:1000},deviceScaleFactor:1});
async function go(url){const response=await page.goto(url);await page.waitForFunction(()=>document.body.dataset.readingReady==='true');return response;}
const navToggle=()=>page.locator(page.viewportSize().width<=800?'#mobile-menu-button':'#menu-button');
const errors=[];page.on('pageerror',e=>errors.push(e.message));
fs.mkdirSync('qa',{recursive:true});
const files=fs.readdirSync('site').filter(f=>f.endsWith('.html'));
const checks=[];
try{
 for(const width of [1440,390]){
  await page.setViewportSize({width,height:width===390?844:1000});
  for(const file of files){
   const response=await go(new URL(file,base).href);assert.equal(response.status(),200,file);
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
   const tableSizes=await page.locator('.table-wrap').evaluateAll(tables=>tables.map(table=>({text:parseFloat(getComputedStyle(table).fontSize),math:[...table.querySelectorAll('td>.katex,td .katex')].map(el=>parseFloat(getComputedStyle(el).fontSize))})));
   for(const table of tableSizes){assert.ok(table.text>=15,`${file}: readable table prose`);assert.ok(table.math.every(size=>size>=18),`${file}: readable table mathematics`);}
   checks.push({file,width,...result});
   if(['index.html','chapter-0.html','chapter-8.html','chapter-11.html','chapter-14.html','chapter-16.html','chapter-22.html'].includes(file))await page.screenshot({path:`qa/${file.replace('.html','')}-${width}.png`});
  }
 }
 // The opening goes straight from the equation to the contents, and reading
 // chrome can be put away without losing navigation or the saved preference.
 await page.setViewportSize({width:1440,height:1000});
 await go(new URL('index.html',base).href);
 assert.equal(await page.locator('.welcome,.book-facts,main>.color-key,.site-footer').count(),0);
 assert.equal(await page.locator('.cover + #contents').count(),1);
 assert.equal(await page.locator('.equation-piece').count(),6);
 assert.equal(await page.locator('.chapter-card .chapter-visual svg').count(),25);
 for(const label of ['Ricci scalar','Ricci tensor','Metric tensor','Cosmological constant','Einstein constant','Stress–energy tensor'])assert.ok((await page.locator('.equation-pieces').innerText()).includes(label));
 await page.locator('.cover-equation').screenshot({path:'qa/opening-equation-desktop.png'});
 await navToggle().click();
 assert.equal(await page.locator('#menu-button').getAttribute('aria-expanded'),'false');
 assert.equal(await page.locator('#book-navigation').evaluate(e=>e.inert),false,'Collapsed desktop rail remains usable');
 assert.ok(await page.locator('.nav-children').evaluateAll(items=>items.every(e=>e.inert)));
 await go(new URL('chapter-6.html',base).href);
 assert.equal(await page.locator('#menu-button').getAttribute('aria-expanded'),'false');
 assert.equal(await page.locator('main .color-key').count(),0);
 assert.equal(await page.locator('.chapter-preparation').getAttribute('open'),null);
 const boxed=page.locator('.equation:has(.fbox)').first();
 assert.equal(await boxed.locator('.fbox').first().evaluate(e=>getComputedStyle(e).borderTopWidth),'0px');
 assert.equal(await boxed.evaluate(e=>getComputedStyle(e).borderTopWidth),'1px');
 await boxed.screenshot({path:'qa/equation-container-border.png'});
 await navToggle().click();
 assert.equal(await page.locator('#menu-button').getAttribute('aria-expanded'),'true');
 await page.setViewportSize({width:390,height:844});
 await go(new URL('index.html',base).href);
 await page.locator('.cover-equation').screenshot({path:'qa/opening-equation-mobile.png'});
 await go(new URL('chapter-16.html#16-7-gps-calculate-the-competing-clock-effects',base).href);
 await page.waitForFunction(()=>Math.abs(document.getElementById('16-7-gps-calculate-the-competing-clock-effects').getBoundingClientRect().top-90)<15);
 await page.screenshot({path:'qa/section-link-mobile.png'});
 await page.locator('#altitude').fill('20200');await page.locator('#altitude').dispatchEvent('input');
 assert.match(await page.locator('#gps-net').innerText(),/\+38\.51/);
 await page.locator('#altitude').fill('400');await page.locator('#altitude').dispatchEvent('input');
 assert.match(await page.locator('#gps-net').innerText(),/−/);
 await go(new URL('chapter-3.html',base).href);
 await page.locator('#speed').fill('0.6');await page.locator('#speed').dispatchEvent('input');
 assert.match(await page.locator('#clock-result').innerText(),/8\.00 years/);
 await page.locator('#speed').fill('0');await page.locator('#speed').dispatchEvent('input');
 assert.match(await page.locator('#clock-result').innerText(),/10\.00 years/);
 await go(new URL('chapter-18.html',base).href);
 assert.equal(await page.locator('#wave-phase,#wave-ring').count(),0,'The wave lesson has one coordinated visual stage');
 assert.equal(await page.locator('#scene-wave .scene-diagram').count(),1);
 for(const width of [1440,390])for(const theme of ['light','dark']){
  await page.setViewportSize({width,height:844});
  await page.evaluate(t=>document.documentElement.dataset.theme=t,theme);
  await page.waitForFunction(()=>getComputedStyle(document.querySelector('.search-field')).borderTopColor==='rgba(0, 0, 0, 0)');
  const chrome=await page.evaluate(()=>{const field=getComputedStyle(document.querySelector('.search-field')),header=document.querySelector('.topbar');return {height:header.getBoundingClientRect().height,border:field.borderTopColor,background:field.backgroundColor,blur:getComputedStyle(header).backdropFilter}});
  assert.equal(chrome.height,width<800?48:56,'The header leaves room for reading');
  assert.equal(chrome.border,'rgba(0, 0, 0, 0)','Idle search has no visible border');
  assert.equal(chrome.background,'rgba(0, 0, 0, 0)','Idle search has no filled container');
  assert.ok(chrome.blur.includes('blur'),'Content remains visible through the header');
  await page.locator('#search-button').click();await page.locator('#search-input').fill('GPS');
  await page.waitForFunction(()=>document.querySelectorAll('#search-results a').length>0);
  await page.locator('.book-search').evaluate(async e=>{await Promise.all(e.getAnimations({subtree:true}).map(a=>a.finished));});
  assert.ok((await page.locator('#search-results').innerText()).includes('Clocks, light, and Mercury'));
  assert.equal(await page.locator('dialog[open]').count(),0,'Search must not open a modal');
  const dimensions=await page.evaluate(()=>{const field=document.querySelector('.search-field').getBoundingClientRect(),popover=document.querySelector('#search-popover').getBoundingClientRect(),header=document.querySelector('.topbar').getBoundingClientRect(),sidebar=document.querySelector('.sidebar').getBoundingClientRect();return {widthDifference:Math.abs(field.width-popover.width),headerLeft:header.left,headerWidth:header.width,sidebarTop:sidebar.top,headerBottom:header.bottom}});assert.ok(dimensions.widthDifference<1,'Search suggestions match the field width');assert.equal(dimensions.headerLeft,0);assert.equal(dimensions.headerWidth,width);assert.ok(Math.abs(dimensions.sidebarTop-dimensions.headerBottom)<1,'Sidebar begins below the complete header');
  const box=await page.locator('#search-popover').boundingBox();
  assert.ok(box.x>=0&&box.x+box.width<=width+1&&box.height<600,'Suggestions stay compact and inside the viewport');
  await page.keyboard.press('ArrowDown');
  assert.equal(await page.locator('#search-input').getAttribute('aria-activedescendant'),'search-result-0');
  await page.screenshot({path:`qa/search-${width}-${theme}.png`});
  await page.keyboard.press('Escape');await page.locator('#search-popover').waitFor({state:'hidden'});
  assert.equal(await page.locator('#search-button').getAttribute('aria-expanded'),'false');
  await page.locator('#search-button').click();await page.locator('#search-input').fill('zzzz-no-such-idea');
  assert.equal(await page.locator('#search-results a').count(),0);
  await page.locator('#search-input').fill('');await page.locator('[data-search-query="Proper time"]').click();
  assert.ok(await page.locator('#search-results a').count()>0);
  await page.mouse.click(width-5,700);await page.locator('#search-popover').waitFor({state:'hidden'});
 }
 await page.locator('#search-button').click();await page.locator('#search-input').fill('GPS');
 await page.keyboard.press('ArrowDown');await page.keyboard.press('Enter');
 await page.waitForURL('**/chapter-16.html');
 await page.evaluate(()=>document.documentElement.dataset.theme='light');
 await page.locator('#theme-button').click();assert.equal(await page.locator('html').getAttribute('data-theme'),'dark');
 assert.ok(await page.locator('#theme-button .theme-sun').isVisible());
 assert.ok(!await page.locator('#theme-button .theme-moon').isVisible());
 await page.locator('#theme-button').click();
 assert.ok(await page.locator('#theme-button .theme-moon').isVisible());
 await page.locator('#theme-button').click();
 await page.locator('#type-button').click();assert.match(await page.locator('html').getAttribute('class'),/large-type/);
 assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
 await page.screenshot({path:'qa/dark-large-mobile.png'});
 await navToggle().click();assert.equal(await page.locator('#menu-button').getAttribute('aria-expanded'),'true');
 await page.keyboard.press('Escape');assert.equal(await page.locator('#menu-button').getAttribute('aria-expanded'),'false');
 await go(new URL('chapter-0.html',base).href);await page.locator('.checkpoint summary').first().click();assert.equal(await page.locator('.checkpoint').first().getAttribute('open'),'');
 assert.deepEqual(errors,[]);
 fs.writeFileSync('qa/browser-report.json',JSON.stringify({checks,interactionChecks:'passed',errors},null,2));
 console.log(`Browser checks passed: ${checks.length} page/viewport combinations, links to sections, images, compact header, search, controls, checkpoints, clock and GPS experiments.`);
}finally{await browser.close()}
