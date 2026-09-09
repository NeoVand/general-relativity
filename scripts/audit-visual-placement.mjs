// Read-only inventory of the default manuscript path in a generated site.
// This is evidence for editorial review, not a score of teaching quality.
// Usage: node scripts/audit-visual-placement.mjs [output.json]
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {parseHTML} from 'linkedom';

const skip = 'script,style,header,nav,button,.katex,annotation,.passage-tools,.heading-link,.narration-script,.lesson-tabs,.lesson-prereqs,[data-no-narration],[hidden]';
const visual = '[data-scene],[data-visual-lesson],[data-geometry-experience],[data-curvature-experience],[data-relativity-lab],[data-mechanics-experience],[data-polar-experience],[data-vector-field-experience],[data-parallel-transport],[data-flow-order], [data-particle-flow],figure.diagram';
const clean = element => {
  const copy = element.cloneNode(true);
  copy.querySelectorAll(skip).forEach(node => node.remove());
  return copy.textContent.replace(/\s+/g, ' ').trim();
};
const chapters = [];
const inputHash = crypto.createHash('sha256');
for (let chapter = 0; chapter <= 24; chapter++) {
  const source = fs.readFileSync(`site/chapter-${chapter}.html`, 'utf8');
  inputHash.update(source);
  const {document} = parseHTML(source);
  const main = document.querySelector('main');
  if (!main) throw Error(`Missing manuscript in chapter ${chapter}`);
  const row = {chapter, title: clean(main.querySelector('h1')), proseWords: 0, displayEquations: 0, visuals: [], otherLabs: []};
  let section = 'Chapter opening';
  function walk(node) {
    if (node.nodeType === 3) {
      row.proseWords += (node.textContent.match(/[\p{L}\p{N}]+(?:[’'-][\p{L}\p{N}]+)*/gu) || []).length;
      return;
    }
    if (node.nodeType !== 1 || node.matches(skip)) return;
    if (node.matches('details:not([open])')) return;
    if (node.matches('h3') && /^\d+\.\d+\s/.test(clean(node))) section = clean(node);
    if (node.matches(visual)) {
      row.visuals.push({
        id: node.id,
        type: node.matches('figure.diagram') ? 'static' : 'interactive',
        section,
        proseWordsBefore: row.proseWords,
        displayEquationsBefore: row.displayEquations,
      });
      return; // Do not count a widget's fallback figure or its internal equations again.
    }
    if (node.matches('.lab')) {
      row.otherLabs.push({
        title: clean(node.querySelector('h2,h3')),
        section,
        proseWordsBefore: row.proseWords,
        displayEquationsBefore: row.displayEquations,
      });
      return;
    }
    if (node.matches('.equation')) { row.displayEquations++; return; }
    for (const child of node.childNodes) walk(child);
  }
  walk(main);
  chapters.push(row);
}
const report = {
  scope: 'Chapters 0–24; generated HTML in site/, before browser interaction.',
  method: 'Count displayed equation wrappers and approximate prose words before each outermost visual in document order. Exclude headers, controls, narration duplicates, mathematical glyphs, explicitly hidden content, closed disclosures, and visual internals. Record legacy .lab calculators separately. CSS-only visibility and runtime-inserted content are not simulated. Counts measure placement, not prerequisite difficulty or visual quality.',
  inputSha256: inputHash.digest('hex'),
  chapters,
};
const output = process.argv[2];
if (output) {
  fs.mkdirSync(path.dirname(output), {recursive: true});
  fs.writeFileSync(output, JSON.stringify(report, null, 2) + '\n');
}
console.table(chapters.map(row => ({
  chapter: row.chapter,
  interactive: row.visuals.filter(v => v.type === 'interactive').length,
  static: row.visuals.filter(v => v.type === 'static').length,
  otherLabs: row.otherLabs.length,
  firstSection: row.visuals[0]?.section.split(' ')[0] || 'none',
  equationsBeforeFirst: row.visuals[0]?.displayEquationsBefore ?? 'none',
})));
