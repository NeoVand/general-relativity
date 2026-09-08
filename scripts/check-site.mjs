import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
const root=path.resolve('site');
const files=fs.readdirSync(root).filter(f=>f.endsWith('.html'));
const report=JSON.parse(fs.readFileSync('site/build-report.json'));
assert.equal(report.chapters,25);assert.equal(report.mathErrors.length,0);
assert.ok(report.displayEquations>=690);
const cache=new Map(files.map(f=>[f,fs.readFileSync(path.join(root,f),'utf8')]));
let links=0;
for(const [file,html]of cache){
 assert.ok(html.includes('<html lang="en">'),file);
 assert.ok(!html.includes('GRMATHTOKEN'),`Unresolved math in ${file}`);
 assert.ok(!html.includes('class="math-error"'),`Invalid math in ${file}`);
 const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
 assert.equal(ids.length,new Set(ids).size,`Duplicate IDs in ${file}`);
 for(const match of html.matchAll(/\b(?:href|src)="([^"]+)"/g)){
  const raw=match[1];if(/^(https?:|data:|mailto:)/.test(raw))continue;
  const [url,fragment]=raw.split('#');const target=url?decodeURIComponent(url):file;
  assert.ok(fs.existsSync(path.join(root,target)),`${file}: missing ${raw}`);
  if(fragment&&target.endsWith('.html'))assert.ok(cache.get(target)?.includes(`id="${fragment}"`),`${file}: missing anchor ${raw}`);
  links++;
 }
}
const figs=JSON.parse(fs.readFileSync('assets/figures/manifest.json'));
for(const f of figs){
 assert.ok(cache.get(`chapter-${f.chapter}.html`).includes(`id="figure-${f.id}"`),`${f.id} not placed in its chapter`);
 const svg=fs.readFileSync(`site/assets/figures/${f.id}.svg`,'utf8');
 assert.ok(svg.includes('<title')&&svg.includes('<desc'),`Missing accessible description: ${f.id}`);
 assert.ok(!/NaN|undefined/.test(svg),`Invalid SVG coordinates: ${f.id}`);
}
// Independent numerical calibrations of the new worked examples.
const GM=3.986004418e14,R=6371000,c=299792458,r=R+20200000;
const grav=GM/c**2*(1/R-1/r)*86400*1e6,kin=-GM/(2*r*c**2)*86400*1e6;
assert.ok(Math.abs(grav-45.724)<.002);assert.ok(Math.abs(kin+7.211)<.002);
assert.ok(Math.abs(GM/c**2*(1/R-1.5/(1.5*R)))<1e-24);
assert.ok(Math.abs(2*GM/(c**2*R**3)-3.43e-23)<.01e-23);
assert.ok(Math.abs(9.81**2/(24*c**2)*1e18-44.615)<.02);
assert.equal(10*Math.sqrt(1-.6**2),8);
assert.ok(Math.abs((1-1/Math.sqrt(2))*100-29.289)<.001);
// The explicit spherical connection gives curvature +sin(theta), and scalar 2/a².
for(const theta of [.3,.8,1.5,2.6]){const h=1e-5;const curvature=(-Math.cos(theta+h)+Math.cos(theta-h))/(2*h);assert.ok(Math.abs(curvature-Math.sin(theta))<1e-9)}
console.log(`Verified ${files.length} HTML pages, ${links} local links/assets, ${figs.length} figure placements, and numerical calibrations.`);
