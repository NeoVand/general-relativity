import fs from 'node:fs';
import assert from 'node:assert/strict';
import {chromium} from 'playwright';
import {parseHTML} from 'linkedom';
import {lessons, prerequisites, routes, validateCourse} from '../content/course.mjs';

const base=process.env.BOOK_URL||'http://localhost:4173/';
const key='gr-course-v1';
const navigationOnly=process.env.COURSE_NAVIGATION_ONLY==='1';
const chrome='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
fs.mkdirSync('qa',{recursive:true});
const publishedCourse=JSON.parse(fs.readFileSync('site/course-data.json','utf8'));

// Test the published contract as well as the source: a valid dependency graph
// is not useful when its links or authored explanation layers were not built.
validateCourse();
assert.equal(lessons.length,13,'the reviewed first course has thirteen complete bridges');
assert.equal(prerequisites.length,25);
const documents=new Map();
function documentFor(file){
 if(!documents.has(file))documents.set(file,parseHTML(fs.readFileSync(`site/${file}`,'utf8')).document);
 return documents.get(file);
}
function targetExists(href){
 const [file,fragment]=href.split('#');
 assert.ok(fs.existsSync(`site/${file}`),`published prerequisite page: ${href}`);
 if(fragment)assert.ok(documentFor(file).getElementById(fragment),`published prerequisite anchor: ${href}`);
}
for(const route of routes){
 assert.equal(new Set(route.chapters).size,route.chapters.length,`${route.id}: chapters are not repeated`);
 const prior=new Set();
 for(const chapter of route.chapters){
  assert.ok(chapter>=0&&chapter<25,`${route.id}: real chapter`);
  for(const dependency of prerequisites[chapter])assert.ok(prior.has(dependency),`${route.id}: ${dependency} precedes ${chapter}`);
  targetExists(`chapter-${chapter}.html`);prior.add(chapter);
 }
}
for(const lesson of lessons){
 const root=documentFor(`chapter-${lesson.chapter}.html`).getElementById(lesson.id);
 assert.ok(root,`published lesson: ${lesson.id}`);
 assert.equal(root.querySelectorAll('.lesson-panel').length,3,`${lesson.id}: all explanation depths published`);
 assert.equal(root.querySelectorAll('.derivation-steps>li').length,lesson.steps.length,`${lesson.id}: every reasoned step published`);
 assert.equal(root.querySelectorAll('.practice-choices [data-choice]').length,lesson.practice.choices.length);
 assert.ok(!root.querySelector('.katex-error'),`${lesson.id}: valid rendered mathematics`);
 assert.equal(lesson.practice.choices.filter(choice=>choice.correct).length,1);
 for(const choice of lesson.practice.choices)assert.ok(choice.feedback.trim().length>20,`${lesson.id}: explanatory feedback`);
 for(const required of lesson.requires)targetExists(required.href);
 for(const source of lesson.sources)assert.equal(new URL(source.url).protocol,'https:',`${lesson.id}: secure source URL`);
}

const browser=await chromium.launch({headless:true,...(fs.existsSync(chrome)?{executablePath:chrome}:{}),args:['--enable-unsafe-swiftshader']});
const errors=[];
let interactions=0;
async function settled(page,lesson){
 await page.locator(`[data-lesson="${lesson.id}"] [data-save-lesson][aria-pressed]`).waitFor();
}
async function visit(page,path){
 await page.goto(new URL(path,base).href);
 await page.waitForFunction(()=>document.body.dataset.readingReady==='true');
}
async function assertDepth(root,name){
 assert.equal(await root.locator('[role=tab][aria-selected="true"]').getAttribute('data-depth'),name);
 assert.equal(await root.locator('[role=tab][tabindex="0"]').count(),1,'one roving keyboard tab stop');
 for(const depth of ['intuition','derive','formal']){
  const panel=root.locator(`.lesson-panel[data-depth="${depth}"]`);
  assert.equal(await panel.isVisible(),depth===name,`only ${name} is visible`);
  const tab=root.locator(`[role=tab][data-depth="${depth}"]`);
  assert.equal(await tab.getAttribute('aria-controls'),await panel.getAttribute('id'));
  assert.equal(await panel.getAttribute('aria-labelledby'),await tab.getAttribute('id'));
 }
}
async function stored(page){return page.evaluate(k=>JSON.parse(localStorage.getItem(k)),key)}
async function importFile(page,name,value){
 await page.locator('[data-import-notebook]').setInputFiles({name,mimeType:'application/json',buffer:Buffer.from(value)});
 await page.waitForFunction(()=>document.querySelector('[data-import-notebook]').value==='');
}
async function verifyRouteNavigation(page,width){
 const cases=[
  {route:'core',chapter:19,previous:18,next:24},
  {route:'core',chapter:24,previous:19,next:'course-map'},
  {route:'geometry',chapter:10,previous:9,next:'course-map'},
  {route:'horizons',chapter:22,previous:21,next:'course-map'},
  {route:'geometry',chapter:12,previous:11,next:13,outside:true}
 ];
 for(const item of cases){
  await visit(page,'course-map.html');await page.locator('.route-status').filter({hasText:'Every required chapter is included'}).waitFor();
  await page.locator(`[data-route="${item.route}"]`).click();
  await visit(page,`chapter-${item.chapter}.html`);
  const turn=page.locator(`.page-turn[data-route-navigation="${item.outside?'book':item.route}"]`);await turn.waitFor();
  const href=chapter=>typeof chapter==='number'?`chapter-${chapter}.html`:`${chapter}.html`;
  const links=turn.locator('a');
  assert.equal(await links.first().getAttribute('href'),href(item.previous),`${width}/${item.route}/${item.chapter}: previous follows route`);
  assert.equal(await links.last().getAttribute('href'),href(item.next),`${width}/${item.route}/${item.chapter}: next follows route`);
  if(item.next==='course-map')assert.match(await links.last().innerText(),/ROUTE COMPLETE\s+Choose what comes next/);
  if(!item.outside){
   assert.ok((await links.first().innerText()).includes(publishedCourse.chapterTitles[item.previous]),'route navigation uses the chapter title');
   assert.equal(await page.locator('[data-route-next] a').getAttribute('href'),href(item.next),'primary footer and compass agree');
  }else assert.equal(await page.locator('[data-route-next] a').count(),0,'an off-route chapter keeps normal book navigation');
  if(item.route==='core'&&item.chapter===19){
   await links.last().click();await page.waitForURL('**/chapter-24.html');
   const previous=page.locator('.page-turn[data-route-navigation="core"] a').first();await previous.waitFor();
   assert.equal(await previous.getAttribute('href'),'chapter-19.html','the new route persists through actual SPA navigation');
   await previous.click();await page.waitForURL('**/chapter-19.html');
  }
 }
}

try{
 for(const width of [1440,390]){
  const context=await browser.newContext({viewport:{width,height:960},acceptDownloads:true,reducedMotion:'reduce'});
  const page=await context.newPage();page.on('pageerror',error=>errors.push(`${width}: ${error.message}`));
  if(navigationOnly){await verifyRouteNavigation(page,width);await context.close();continue;}
  // Every bridge gets real user-facing interaction coverage, including the
  // distractors: correct-answer-only tests miss broken feedback indexing.
  for(const chapter of [...new Set(lessons.map(lesson=>lesson.chapter))]){
   await visit(page,`chapter-${chapter}.html`);
   for(const lesson of lessons.filter(lesson=>lesson.chapter===chapter)){
    await settled(page,lesson);const root=page.locator(`[data-lesson="${lesson.id}"]`);
    for(const name of ['intuition','derive','formal']){
     await root.locator(`[role=tab][data-depth="${name}"]`).click();await assertDepth(root,name);interactions++;
    }
    const formal=root.locator('[role=tab][data-depth="formal"]');await formal.focus();
    await page.keyboard.press('Home');await assertDepth(root,'intuition');
    assert.equal(await page.locator(':focus').getAttribute('data-depth'),'intuition');
    await page.keyboard.press('ArrowRight');await assertDepth(root,'derive');
    await page.keyboard.press('End');await assertDepth(root,'formal');
    await page.keyboard.press('ArrowRight');await assertDepth(root,'intuition');
    await page.keyboard.press('ArrowLeft');await assertDepth(root,'formal');
    await root.locator('.lesson-practice>summary').click();
    for(const [index,choice] of lesson.practice.choices.entries()){
     await root.locator(`.practice-choices [data-choice="${index}"]`).click();
     const feedback=await root.locator('.practice-feedback').innerText();
     assert.ok(feedback.startsWith(choice.correct?'Yes.':'Try that reasoning again.'),`${lesson.id}: correct feedback branch`);
     assert.ok(feedback.length>35,`${lesson.id}: feedback includes authored explanation`);
     const expectedHTML=publishedCourse.lessons.find(item=>item.id===lesson.id).practice.choices[index].feedbackHTML;
     const expectedText=await page.evaluate(html=>{const div=document.createElement('div');div.innerHTML=html;return div.textContent},expectedHTML);
     const actualText=await root.locator('.practice-feedback').evaluate(element=>{const copy=element.cloneNode(true);copy.querySelector('strong').remove();return copy.textContent});
     assert.equal(actualText,expectedText,`${lesson.id}: the explanation belongs to the selected choice`);
     assert.equal(await root.locator('.practice-choices [aria-pressed="true"]').getAttribute('data-choice'),String(index));
     const record=(await stored(page)).evidence[lesson.id];assert.equal(record.choice,index);assert.equal(record.predicted,choice.correct);interactions++;
    }
    const input=root.locator('[data-transfer] input'),submit=root.locator('[data-transfer] button');
    const wrong=lesson.transfer.answer+Math.max(1,lesson.transfer.tolerance*10+1);
    await input.fill(String(wrong));await submit.click();
    assert.equal(await root.locator('.transfer-feedback').getAttribute('data-correct'),'false',`${lesson.id}: incorrect number is rejected`);
    await input.fill(String(lesson.transfer.answer));await submit.click();
    assert.equal(await root.locator('.transfer-feedback').getAttribute('data-correct'),'true',`${lesson.id}: authored result accepted`);
    let evidence=(await stored(page)).evidence[lesson.id];assert.equal(evidence.transfer,true);assert.equal(evidence.attempts,2);
    const attempts=evidence.attempts;await input.fill('Infinity');await submit.click();
    assert.match(await root.locator('.transfer-feedback').innerText(),/finite number/);
    assert.equal((await stored(page)).evidence[lesson.id].attempts,attempts,'invalid numeric input is not a graded attempt');
    await root.locator('.transfer-solution>summary').click();
    await page.waitForFunction(({key,id})=>JSON.parse(localStorage.getItem(key)).evidence[id].solutionSeen,{key,id:lesson.id});
    evidence=(await stored(page)).evidence[lesson.id];assert.equal(evidence.solutionSeen,true,'viewed solutions are distinguished from unaided work');
    // Explicitly save one bridge in each chapter. A clicked bookmark must not
    // silently depend on an API provider or a separately mounted chat panel.
    await root.locator('[data-save-lesson]').click();assert.equal(await root.locator('[data-save-lesson]').getAttribute('aria-pressed'),'true');
    assert.ok((await stored(page)).notes[lesson.id]);
    if(lesson.visual){
     const model=root.locator('[data-visual-state]');await model.waitFor();
     assert.deepEqual((await stored(page)).notes[lesson.id].visual?.state,JSON.parse(await model.getAttribute('data-visual-state')),`${lesson.id}: bookmarking captures current model settings, including defaults`);
    }
    await root.locator('.lesson-practice>summary').click();
    await root.locator('[role=tab][data-depth="derive"]').click();
    const bounds=await root.boundingBox();assert.ok(bounds.x>=-1&&bounds.x+bounds.width<=width+1,`${lesson.id}/${width}: bridge fits page`);
    interactions+=4;
   }
  }

  // Persistence is checked by a fresh navigation, not by inspecting the same
  // in-memory object that just handled the click.
  const anchor=lessons.find(lesson=>lesson.id==='a-metric-converts-labels-into-lengths');
  await visit(page,`chapter-${anchor.chapter}.html#${anchor.id}`);await settled(page,anchor);
  let root=page.locator(`[data-lesson="${anchor.id}"]`);await assertDepth(root,'derive');
  assert.equal(await root.locator('[data-transfer] input').inputValue(),String(anchor.transfer.answer));
  assert.equal(await root.locator('[data-save-lesson]').getAttribute('aria-pressed'),'true');
  await root.locator('[role=tab][data-depth="intuition"]').click();
  await visit(page,`chapter-${anchor.chapter}.html#${anchor.id}-step-2`);await settled(page,anchor);
  await assertDepth(page.locator(`[data-lesson="${anchor.id}"]`),'derive');
  assert.ok(await page.locator(`#${anchor.id}-step-2`).isVisible(),'a deep link reveals its hidden explanation layer');

  // Use the real prerequisite anchor and the real return link, through the
  // app router, so history/URL mistakes cannot hide behind page.goto.
  root=page.locator(`[data-lesson="${anchor.id}"]`);
  const prerequisite=anchor.requires.find(ref=>!ref.href.startsWith(`chapter-${anchor.chapter}.html`));
  await root.locator(`[data-prerequisite][href="${prerequisite.href}"]`).click();
  await page.waitForURL(`**/${prerequisite.href}`);
  const back=page.locator('.return-to-lesson a');await back.waitFor();
  assert.equal(await back.getAttribute('href'),`chapter-${anchor.chapter}.html#${anchor.id}`);
  await back.click();await page.waitForURL(`**/chapter-${anchor.chapter}.html#${anchor.id}`);await settled(page,anchor);

  // The notebook records a chosen experimental state, independently of the
  // reader's most recent state. Exercise both SPA navigation and a cold URL.
  root=page.locator(`[data-lesson="${anchor.id}"]`);
  let model=root.locator('[data-visual-lesson="metric"][data-visual-ready="true"]');await model.waitFor();
  await model.locator('[data-vl-choice="radius"][data-value="6"]').click();
  await model.locator('[data-vl-choice="scale"][data-value="30"]').click();
  await root.locator('[data-save-lesson]').click();
  const snapshot={radius:6,scale:30};assert.deepEqual((await stored(page)).notes[anchor.id].visual.state,snapshot);
  await model.locator('[data-vl-choice="radius"][data-value="1"]').click();
  await model.locator('[data-vl-choice="scale"][data-value="1"]').click();
  assert.deepEqual((await stored(page)).notes[anchor.id].visual.state,snapshot,'continuing an experiment does not overwrite the saved observation');
  await page.locator('.course-compass a[href="notebook.html"]').click();
  const snapshotLink=page.locator(`[data-note-id="${anchor.id}"]>a`);await snapshotLink.waitFor();
  assert.equal(await snapshotLink.getAttribute('href'),`chapter-${anchor.chapter}.html?snapshot=${anchor.id}#${anchor.id}`);
  await snapshotLink.click();await page.waitForURL(`**/chapter-${anchor.chapter}.html?snapshot=${anchor.id}#${anchor.id}`);await settled(page,anchor);
  model=page.locator(`[data-lesson="${anchor.id}"] [data-visual-state]`);
  await page.waitForFunction(({id,snapshot})=>document.querySelector(`[data-lesson="${id}"] [data-visual-state]`)?.dataset.visualState===JSON.stringify(snapshot),{id:anchor.id,snapshot});
  assert.deepEqual(JSON.parse(await model.getAttribute('data-visual-state')),snapshot,'notebook navigation restores the saved model');
  await page.evaluate(id=>{const key='gr-visual-lessons:v1',all=JSON.parse(localStorage.getItem(key));all[id].state={radius:1,scale:1};localStorage.setItem(key,JSON.stringify(all))},anchor.id);
  await page.reload();await settled(page,anchor);
  await page.waitForFunction(({id,snapshot})=>document.querySelector(`[data-lesson="${id}"] [data-visual-state]`)?.dataset.visualState===JSON.stringify(snapshot),{id:anchor.id,snapshot});

  await visit(page,'course-map.html');await page.locator('.route-status').filter({hasText:'Every required chapter is included'}).waitFor();
  for(const route of routes){
   await page.locator(`[data-route="${route.id}"]`).click();
   const shown=await page.locator('[data-chapter-node]:visible').evaluateAll(nodes=>nodes.map(node=>+node.dataset.chapterNode));
   assert.deepEqual(shown,route.chapters,`${width}/${route.id}: map follows the selected dependency-complete route`);
   assert.equal(await page.locator('[data-route][aria-pressed="true"]').getAttribute('data-route'),route.id);
  }
  await page.screenshot({path:`qa/course-map-${width}.png`,animations:'disabled'});
  await visit(page,'course-map.html');await page.locator('[data-route="horizons"][aria-pressed="true"]').waitFor();
  assert.match(await page.locator(`[data-evidence-for="${anchor.id}"]`).innerText(),/Worked through/,'viewing the solution does not imply an unaided transfer');

  await visit(page,'notebook.html');await page.locator(`[data-note="${anchor.id}"]`).waitFor();
  const note='I must convert the angular rate into a length rate before combining it with radial speed. <b>This is literal note text.</b>';
  await page.locator(`[data-note="${anchor.id}"]`).fill(note);
  await visit(page,'notebook.html');await page.locator(`[data-note="${anchor.id}"]`).waitFor();
  assert.equal(await page.locator(`[data-note="${anchor.id}"]`).inputValue(),note);
  const jsonDownload=page.waitForEvent('download');await page.locator('[data-export-notebook="json"]').click();
  const json=await jsonDownload;assert.equal(json.suggestedFilename(),'gr-field-notebook.json');
  const exported=JSON.parse(fs.readFileSync(await json.path(),'utf8'));assert.equal(exported.version,1);assert.equal(exported.notes[anchor.id].text,note);assert.equal(exported.evidence[anchor.id].transfer,true);
  const mdDownload=page.waitForEvent('download');await page.locator('[data-export-notebook="md"]').click();
  const markdown=fs.readFileSync(await (await mdDownload).path(),'utf8');assert.ok(markdown.includes(note));assert.ok(markdown.includes(`chapter-${anchor.chapter}.html#${anchor.id}`));

  const beforeInvalid=(await stored(page)).notes;
  for(const [name,payload,message] of [['wrong-version.json',JSON.stringify({version:99,notes:{}}),/compatible field notebook/],['broken.json','{',/JSON|property|Unexpected|Expected/i],['large.json',' '.repeat(2e6+1),/smaller than 2 MB/]]){
   await importFile(page,name,payload);assert.match(await page.locator('.notebook-status').innerText(),message);assert.deepEqual((await stored(page)).notes,beforeInvalid,'invalid import does not replace saved work');
  }
  // Import a deliberately adversarial note: it remains text in the editor,
  // including when the notebook rebuilds its HTML after merging the file.
  const importedLesson=lessons[0],literal='</textarea><img id="course-injected" src="x" onerror="window.courseInjected=true">';
  await page.locator(`[data-remove-note="${importedLesson.id}"]`).click();
  const valid={version:1,route:'geometry',depths:{},notes:{[anchor.id]:{text:'A conflicting imported note',saved:1},[importedLesson.id]:{text:literal,saved:2}},evidence:{},visuals:{}};
  await importFile(page,'valid.json',JSON.stringify(valid));assert.match(await page.locator('.notebook-status').innerText(),/Notebook imported/);
  assert.equal(await page.locator(`[data-note="${anchor.id}"]`).inputValue(),note,'existing local observations win import conflicts');
  assert.equal(await page.locator(`[data-note="${importedLesson.id}"]`).inputValue(),literal);
  assert.equal(await page.locator('#course-injected').count(),0,'imported text cannot create HTML elements');
  assert.equal(await page.evaluate(()=>window.courseInjected),undefined);
  await page.screenshot({path:`qa/course-notebook-${width}.png`,animations:'disabled'});
  await verifyRouteNavigation(page,width);
  await context.close();
 }
 assert.deepEqual(errors,[],'course interactions produce no browser errors');
 console.log(navigationOnly?'Verified route-aware primary navigation, completion links, chapter titles, off-route navigation, and actual SPA round trips at desktop and mobile widths.':`Verified 13 published lessons, 3 prerequisite-complete routes, ${interactions} learning interactions, keyboard/deep-link behavior, route-aware page turns, and notebook persistence/export/import at desktop and mobile widths.`);
}finally{await browser.close()}
