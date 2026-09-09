import fs from 'node:fs';
import assert from 'node:assert/strict';
import {chromium} from 'playwright';
const chrome='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const browser=await chromium.launch({headless:true,...(fs.existsSync(chrome)?{executablePath:chrome}:{})});
const page=await browser.newPage({viewport:{width:1440,height:1000}});
const base=process.env.BOOK_URL||'http://localhost:4173/';
const navToggle=()=>page.locator(page.viewportSize().width<=800?'#mobile-menu-button':'#menu-button');
const errors=[];page.on('pageerror',e=>errors.push(e.message));
const go=async(path)=>{await page.goto(new URL(path,base).href);await page.waitForFunction(()=>document.body.dataset.readingReady==='true');await page.evaluate(()=>document.fonts.ready)};
const width=async(n)=>page.waitForFunction(n=>Math.abs(document.querySelector('.sidebar').getBoundingClientRect().width-n)<.5,n);
const group=id=>page.locator(`[data-nav-group="${id}"]`);
try{
 await go('chapter-2.html');
 await width(292);
 assert.equal(await page.locator('.topbar #menu-button').count(),0);
 assert.equal(await page.locator('.nav-home #menu-button').count(),1);
 assert.equal(await page.locator('.desktop-logo').getAttribute('href'),'index.html');
 assert.equal(await page.locator('.desktop-logo').evaluate(e=>{const r=e.getBoundingClientRect();return r.x+r.width/2}),32);
 assert.equal(await group('part-0').locator('button').first().getAttribute('aria-expanded'),'true');
 assert.equal(await group('part-1').locator('button').first().getAttribute('aria-expanded'),'false');
 assert.equal(await page.locator('.nav-chapter-row a[aria-current=page]').count(),1);
 const original=await group('part-0').locator('button').first().elementHandle();
 const glyph=()=>group('part-0').locator('.nav-glyph').evaluate(e=>{const r=e.getBoundingClientRect();return r.x+r.width/2});
 assert.equal(await glyph(),32);
 await navToggle().click();
 const samples=await page.evaluate(async()=>{const out=[];for(let i=0;i<18;i++){await new Promise(requestAnimationFrame);const r=document.querySelector('.nav-group .nav-glyph').getBoundingClientRect();out.push(r.x+r.width/2)}return out});
 assert.ok(samples.every(x=>Math.abs(x-32)<.1),'Glyph is anchored throughout collapse');
 await width(64);
 assert.equal(await original.evaluate(e=>e===document.querySelector('.nav-group-toggle')),true,'Morph preserves the same navigation node');
 assert.ok(await page.locator('.nav-children').evaluateAll(es=>es.every(e=>e.inert)));
 assert.equal(await page.locator('.sidebar').evaluate(e=>e.inert),false);
 await group('part-1').locator('button').first().hover();
 await page.waitForFunction(()=>!document.querySelector('.nav-preview').hidden);
 assert.match(await page.locator('.nav-preview').innerText(),/Differential geometry/);
 assert.equal(await page.locator('.nav-preview a').count(),5,'Collapsed navigation offers real chapter links');
 // Cross the gap slowly, then pause to read before clicking. A direct hover
 // would miss the disappearing-popup regression reported by a reader.
 const trigger=await group('part-1').locator('button').first().boundingBox();
 const chapter=page.locator('.nav-preview a[href="chapter-6.html"]');
 const destination=await chapter.boundingBox();
 await page.mouse.move(64,trigger.y+trigger.height/2,{steps:8});
 await page.waitForTimeout(120);
 await page.mouse.move(destination.x+25,destination.y+destination.height/2,{steps:12});
 await page.waitForTimeout(400);
 assert.ok(await chapter.isVisible(),'Flyout stays open while moving to and reading its links');
 await page.screenshot({path:'qa/navigation-rail-preview.png',animations:'disabled'});
 await page.keyboard.press('Escape');
 assert.ok(await page.locator('.nav-preview').evaluate(e=>e.hidden));
 await group('part-1').locator('button').first().hover();
 await chapter.click();
 await page.waitForFunction(()=>location.pathname.endsWith('/chapter-6.html')&&document.body.dataset.readingReady==='true');
 await width(64);
 // Tab enters the flyout; Escape returns to its trigger without reopening it.
 await group('part-1').locator('button').first().focus();
 await page.keyboard.press('Tab');
 assert.equal(await page.evaluate(()=>document.activeElement.getAttribute('href')),'chapter-6.html');
 await page.keyboard.press('Escape');
 assert.ok(await page.locator('.nav-preview').evaluate(e=>e.hidden));
 assert.equal(await page.evaluate(()=>document.activeElement.closest('[data-nav-group]')?.dataset.navGroup),'part-1');
 await page.keyboard.press('ArrowRight');
 await page.keyboard.press('Shift+Tab');
 assert.equal(await page.evaluate(()=>document.activeElement.closest('[data-nav-group]')?.dataset.navGroup),'part-1');
 await page.keyboard.press('ArrowRight');
 for(let n=0;n<5;n++)await page.keyboard.press('Tab');
 assert.equal(await page.evaluate(()=>document.activeElement.closest('[data-nav-group]')?.dataset.navGroup),'part-2','Tab leaves the last link for the next rail group');
 await page.keyboard.press('Escape');
 // Keyboard commits the preview by opening the single, real chapter tree.
 await group('part-1').locator('button').first().focus();await page.keyboard.press('Enter');await width(292);
 assert.equal(await group('part-1').locator('button').first().getAttribute('aria-expanded'),'true');
 await group('part-1').locator('button').first().click();
 await go('chapter-2.html');
 assert.equal(await group('part-1').locator('button').first().getAttribute('aria-expanded'),'false','Explicit group closure persists');
 await page.locator('.nav-section-toggle').click();
 assert.equal(await page.locator('.nav-section-toggle').getAttribute('aria-expanded'),'true');
 const target=await page.locator('.nav-sections a').nth(1).getAttribute('href');
 await page.locator('.nav-sections a').nth(1).click();
 await page.waitForFunction(hash=>location.hash===hash,new URL(target,base).hash);
 await page.waitForFunction(hash=>Math.abs(document.getElementById(hash.slice(1)).getBoundingClientRect().top-90)<16,new URL(target,base).hash);
 await page.waitForFunction(()=>document.querySelector('.nav-sections a.current'));
 await go('chapter-2.html');
 assert.equal(await page.locator('.nav-section-toggle').getAttribute('aria-expanded'),'true','Section disclosure survives navigation');
 await page.locator('.nav-section-toggle').click();
 // A chapter in another part reveals its parent, even if it was closed earlier.
 await group('part-2').locator('button').first().click();
 await group('part-2').locator('button').first().click();
 await go('chapter-11.html');
 assert.equal(await group('part-2').locator('button').first().getAttribute('aria-expanded'),'true');
 assert.equal(await group('part-2').locator('.nav-chapter-row a[aria-current]').getAttribute('href'),'chapter-11.html');
 const curriculum=[[0,5],[6,10],[11,15],[16,19],[20,23],[24,24]];
 assert.equal(await page.locator('[data-nav-group^="part-"]').count(),curriculum.length);
 for(const [i,[first,last]] of curriculum.entries()){
  assert.deepEqual(await group(`part-${i}`).locator('.nav-chapter-row>a').evaluateAll(links=>links.map(a=>a.getAttribute('href'))),Array.from({length:last-first+1},(_,n)=>`chapter-${first+n}.html`));
 }
 assert.doesNotMatch(await group('part-5').innerText(),/optional/i,'Synthesis is part of the main course');
 for(const theme of ['light','dark']){
  await page.evaluate(theme=>document.documentElement.dataset.theme=theme,theme);
  for(const w of [1440,1024,801,800,390,320]){
   await page.setViewportSize({width:w,height:w<801?844:1000});
   if(w<801&&await page.locator('#menu-button').getAttribute('aria-expanded')==='false')await navToggle().click();
   await page.screenshot({path:`qa/navigation-${theme}-${w}.png`,animations:'disabled'});
   const geometry=await page.evaluate(()=>{const nav=document.querySelector('.sidebar'),header=document.querySelector('.topbar'),scroll=document.querySelector('.nav-scroll');return {right:nav.getBoundingClientRect().right,top:nav.getBoundingClientRect().top,bottom:header.getBoundingClientRect().bottom,navScroll:nav.scrollLeft,innerScroll:scroll.scrollLeft,page:document.documentElement.scrollWidth,viewport:innerWidth}});
   assert.ok(geometry.right<=w&&geometry.page<=w+1,JSON.stringify(geometry));
   assert.equal(geometry.top,geometry.bottom);
   assert.equal(geometry.navScroll,0);assert.equal(geometry.innerScroll,0);
  }
 }
 // Mobile stays above an existing tutor panel without destroying its state.
 await page.setViewportSize({width:390,height:844});
 await page.keyboard.press('Escape');
 await page.locator('.study-launcher button').last().click();
 await navToggle().click();
 await page.waitForFunction(()=>Math.abs(document.querySelector('.sidebar').getBoundingClientRect().left)<.1);
 assert.ok(await page.evaluate(()=>document.elementFromPoint(260,805).closest('.sidebar')),'Drawer covers the floating study controls');
 // Focus cannot disappear behind the mobile overlay.
 await page.locator('.nav-utilities a').last().focus();await page.keyboard.press('Tab');
 assert.equal(await page.evaluate(()=>document.activeElement.id),'menu-button');
 await page.keyboard.press('Shift+Tab');
 assert.equal(await page.evaluate(()=>document.activeElement.getAttribute('href')),'credits.html');
 await page.keyboard.press('Escape');
 assert.equal(await page.locator('#menu-button').getAttribute('aria-expanded'),'false');
 assert.ok(await page.locator('.sidebar').evaluate(e=>e.inert));
 assert.equal(await page.evaluate(()=>document.activeElement.id),'mobile-menu-button');
 assert.ok(await page.locator('.study-panel').isVisible(),'Dismissing navigation preserves the tutor panel');
 await navToggle().click();
 await page.locator('.nav-scrim').click({position:{x:370,y:300}});
 assert.equal(await page.locator('#menu-button').getAttribute('aria-expanded'),'false');
 await navToggle().click();
 await page.locator('.nav-chapter-row a[aria-current]').click();
 await page.waitForFunction(()=>document.body.dataset.readingReady==='true');
 assert.equal(await page.locator('#menu-button').getAttribute('aria-expanded'),'false');
 // Respect OS motion preferences at both widths, with no delayed visibility.
 await page.emulateMedia({reducedMotion:'reduce'});await page.setViewportSize({width:1440,height:1000});
 await navToggle().click();
 assert.equal(await page.locator('.sidebar').evaluate(e=>getComputedStyle(e).transitionDuration),'0s');
 await page.locator('.desktop-logo').click();
 await page.waitForFunction(()=>location.pathname.endsWith('/index.html')&&document.body.dataset.readingReady==='true');
 assert.equal(await page.locator('.cover').count(),1,'App logo returns to the landing page');
 assert.equal(await page.locator('.nav-home-link').getAttribute('aria-current'),'page');
 await page.locator('#menu-button').focus();
 await page.setViewportSize({width:390,height:844});
 await page.waitForFunction(()=>document.activeElement.id==='mobile-menu-button');
 await page.setViewportSize({width:1440,height:1000});
 await page.waitForFunction(()=>document.activeElement.id==='menu-button');
 assert.deepEqual(errors,[]);
 console.log('Sidebar checks passed: anchored morph, clickable flyouts, pointer travel, keyboard traversal, saved disclosure, section tracking, mobile dismissal, 12 visual states, and reduced motion.');
}finally{await browser.close()}
