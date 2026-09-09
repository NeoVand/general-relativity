import fs from 'node:fs';
import assert from 'node:assert/strict';
import {parseHTML} from 'linkedom';
import {chromium} from 'playwright';
import {math,semanticTex} from './math-system.mjs';
import {entries} from '../web/symbols.js';

const classified=(tex,chapter)=>[...new Set([...math(tex,false,chapter).matchAll(/\bsymbol-([a-z-]+)/g)].map(m=>m[1]))];
const examples=[
 [String.raw`R`,9,['scalar-curvature']],
 [String.raw`R_{\mu\nu}`,9,['ricci']],
 [String.raw`R^\rho{}_{\sigma\mu\nu}`,9,['riemann']],
 [String.raw`R^\rho{}_{\mu}`,9,['ricci']],
 [String.raw`R^\theta{}_{\varphi\theta\varphi}`,8,['riemann']],
 [String.raw`R_{abcd}`,8,['riemann']],
 [String.raw`G_{\mu\nu}`,9,['einstein']],
 [String.raw`C^\rho{}_{\sigma\mu\nu}`,9,['weyl']],
 [String.raw`g(X,Y)`,4,['metric']],
 [String.raw`\sqrt{-g}`,4,['metric-determinant']],
 [String.raw`\sqrt{|g|}`,4,['metric-determinant']],
 [String.raw`u^\mu`,11,['four-velocity']],
 [String.raw`\nabla_\mu`,6,['covariant-derivative']],
 [String.raw`T_{\mu\nu}`,11,['stress-energy']],
 [String.raw`\tau_{\rm home}`,3,['proper-time']],
 [String.raw`\Lambda`,12,['cosmological-constant']],
 // These are intentionally unidentified; a missing tooltip is better than a
 // confident explanation of the wrong mathematical object.
 [String.raw`u^2+v^2`,4,[]],
 [String.raw`u_0`,16,[]],
 [String.raw`u^i`,2,[]],
 [String.raw`g(p)`,4,[]],
 [String.raw`g`,4,[]],
 [String.raw`R^2`,8,[]],
 [String.raw`R(t)`,9,[]],
 [String.raw`R`,4,[]],
 [String.raw`\nabla^2`,18,[]],
 [String.raw`\boldsymbol\nabla`,12,[]],
 [String.raw`\Lambda`,23,[]],
 [String.raw`\Lambda_{\mathrm{cutoff}}`,12,[]],
 [String.raw`T^{\alpha\beta}{}_{\gamma}`,6,[]],
 [String.raw`T_{\mu\nu}`,6,[]],
 [String.raw`T^\rho{}_{\mu\nu}`,21,[]],
 [String.raw`\tau_E`,22,['euclidean-time']],
 [String.raw`\tau_{\rm plot}`,17,['plot-time']],
 [String.raw`\tau_{\mathrm{plot}}`,17,['plot-time']],
 [String.raw`\tau_{\rm plot}`,3,[]],
 [String.raw`\tau_{unknown}`,17,[]],
 [String.raw`\tau`,3,['proper-time']],
 [String.raw`\tau`,2,[]],
];
for(const [tex,chapter,expected] of examples)assert.deepEqual(classified(tex,chapter),expected,`${tex} in Chapter ${chapter}`);

const source=String.raw`R_{\mu\nu}-\frac12 Rg_{\mu\nu}<T_{\mu\nu}`;
const sourceDocument=parseHTML(math(source,true,12)).document;
assert.equal(sourceDocument.querySelector('annotation[encoding="application/x-tex"]').textContent,source,'Copied and spoken LaTeX remains exactly the authored source');
assert.match(sourceDocument.querySelector('.katex-html').innerHTML,/symbol-ricci/,'Inspection metadata is present in the rendered view');
assert.equal(semanticTex(source,12,true).replace(/ symbol-[a-z-]+/g,''),semanticTex(source,12,false),'Inspection does not change existing color identities');

for(const [key,entry] of Object.entries(entries)){
 const [file,anchor]=entry.at(-1).split('#');
 assert.ok(!file.includes('..')&&file.endsWith('.html')&&anchor,`Local lesson target for ${key}`);
 const {document}=parseHTML(fs.readFileSync(`site/${file}`,'utf8'));
 assert.ok(document.getElementById(anchor),`Existing lesson target for ${key}: ${entry.at(-1)}`);
}

const chrome='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const browser=await chromium.launch({headless:true,...(fs.existsSync(chrome)?{executablePath:chrome}:{})});
const page=await browser.newPage({viewport:{width:1440,height:1000}});
const base=process.env.BOOK_URL||'http://localhost:4173/';
const errors=[],providerRequests=[];
page.on('pageerror',error=>errors.push(error.message));
page.on('request',request=>{if(/(?:openai|elevenlabs)\.(?:com|io)/i.test(new URL(request.url()).hostname))providerRequests.push(request.url())});
fs.mkdirSync('qa',{recursive:true});
try{
 await page.goto(new URL('chapter-17.html#horizon-directions-step-3',base).href);
 await page.waitForFunction(()=>document.body.dataset.readingReady==='true');
 const plotting=page.locator('#horizon-directions-step-3 .symbol-plot-time').first();
 await plotting.scrollIntoViewIfNeeded();
 await plotting.click();
 assert.equal(await page.locator('#symbol-card').getAttribute('aria-label'),'Dimensionless plotting time');
 assert.match(await page.locator('#symbol-card').innerText(),/not the elapsed time/);
 assert.equal(await page.locator('#horizon-directions .symbol-proper-time').count(),0);
 for(const [width,height] of [[1440,1000],[390,844]]){
  await page.setViewportSize({width,height});
  await page.goto(new URL('chapter-9.html',base).href);
  await page.waitForFunction(()=>document.body.dataset.readingReady==='true');
  await page.evaluate(()=>document.fonts.ready);
  const equation=page.locator('.prose .equation:has(.symbol-einstein):has(.symbol-scalar-curvature)').first();
  await equation.scrollIntoViewIfNeeded();
  const bounds=()=>equation.evaluate(el=>{const r=el.getBoundingClientRect(),k=el.querySelector('.katex').getBoundingClientRect();return [r.width,r.height,k.width,k.height]});
  const before=await bounds();
  await equation.locator('.katex-html .symbol-einstein').first().click();
  const card=page.locator('#symbol-card');
  assert.equal(await card.isVisible(),true);
  assert.equal(await card.getAttribute('aria-label'),'Einstein tensor');
  const keys=await card.locator('option').evaluateAll(options=>options.map(o=>o.value));
  for(const key of ['einstein','ricci','metric','scalar-curvature'])assert.ok(keys.includes(key),`Equation offers ${key}`);
  await card.getByRole('combobox').selectOption('scalar-curvature');
  assert.equal(await card.getAttribute('aria-label'),'Ricci scalar');
  assert.equal(await equation.locator('.katex-html .symbol-selected').first().evaluate(el=>el.classList.contains('symbol-scalar-curvature')),true,'Changing the definition moves the source highlight to that symbol');
  assert.match(await card.locator('p').innerText(),/zero Ricci scalar alone does not imply/);
  const cardBounds=await card.boundingBox(),header=await page.locator('.topbar').boundingBox();
  assert.ok(cardBounds.x>=11&&cardBounds.x+cardBounds.width<=width-11,'Symbol explanation stays within the viewport horizontally');
  assert.ok(cardBounds.y>=header.y+header.height+11&&cardBounds.y+cardBounds.height<=height-11,'Symbol explanation clears the header and bottom edge');
  const after=await bounds();
  before.forEach((n,i)=>assert.ok(Math.abs(n-after[i])<.05,'Opening inspection does not resize the equation or its mathematics'));
  await page.screenshot({path:`qa/symbol-inspector-${width}.png`,animations:'disabled'});
  await page.mouse.click(width-4,header.height+4);
  assert.equal(await card.isVisible(),false,'Outside click dismisses the explanation');
  await equation.focus();await page.keyboard.press('Enter');
  assert.equal(await card.isVisible(),true,'An equation can be inspected with the keyboard');
  assert.equal(await page.evaluate(()=>document.activeElement?.classList.contains('symbol-close')),true,'Keyboard inspection moves focus into the card');
  await page.keyboard.press('Escape');
  assert.equal(await card.isVisible(),false);
  assert.equal(await equation.evaluate(el=>document.activeElement===el),true,'Escape restores the equation focus');
  await page.keyboard.press('Space');
  assert.equal(await card.isVisible(),true,'Space also opens inspection');
  await card.getByRole('button',{name:'Close symbol explanation'}).click();
  assert.equal(await card.isVisible(),false);
  await equation.locator('.katex-html .symbol-einstein').first().click();
  await page.mouse.wheel(0,120);
  await page.waitForFunction(()=>document.querySelector('#symbol-card').hidden);
  await equation.locator('.katex-html .symbol-einstein').first().click();
  const lesson=card.locator('.symbol-lesson'),target=new URL(await lesson.getAttribute('href'),base);
  // Check synchronous dismissal, without relying on a subsequent scroll event.
  assert.equal(await lesson.evaluate(el=>{const popup=document.querySelector('#symbol-card');el.click();return popup.hidden||!popup.isConnected}),true,'The lesson link dismisses the card immediately');
  await page.waitForFunction(hash=>location.hash===hash,target.hash);
  assert.equal(new URL(page.url()).pathname,target.pathname,'The lesson link reaches its actual chapter');
 }
 assert.deepEqual(errors,[]);
 assert.deepEqual(providerRequests,[],'Authored symbol explanations make no provider requests');
 console.log(`Symbol checks passed: ${examples.length} classification cases, source preservation, ${Object.keys(entries).length} lesson anchors, desktop/mobile placement, equation geometry, dismissal and keyboard access.`);
}finally{await browser.close()}
