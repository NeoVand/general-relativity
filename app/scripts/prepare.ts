import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';
import { parseHTML } from 'linkedom';
import { build } from 'esbuild';

// The manuscript and calibrated laboratories stay canonical. Only their
// content is imported: the previous router, header and companion never run.
const root = fileURLToPath(new URL('../../', import.meta.url));
const app = path.join(root, 'app');
const source = path.join(app, '.book-build');
for (const script of ['build-site.mjs', 'build-reading.mjs']) {
  execFileSync(process.execPath, [path.join(root, 'scripts', script)], {
    cwd: root,
    stdio: 'inherit',
    env: { ...process.env, BOOK_OUTPUT: source }
  });
}
const output = path.join(app, 'static/book');
fs.rmSync(output, { recursive: true, force: true });
fs.mkdirSync(output, { recursive: true });
fs.cpSync(path.join(source, 'assets'), path.join(output, 'assets'), { recursive: true });
for (const name of ['course-data.json', 'reading-index.json', 'book-map.json']) {
  fs.copyFileSync(path.join(source, name), path.join(output, name));
}
const pages: Record<string, unknown> = {};
const styles = new Set<string>();
for (const file of fs.readdirSync(source).filter((name) => name.endsWith('.html'))) {
  const { document } = parseHTML(fs.readFileSync(path.join(source, file), 'utf8'));
  const data = JSON.parse(document.querySelector('#reading-data')!.textContent!);
  const main = document.querySelector('main')!;
  main.querySelectorAll('script,.chapter-study-actions').forEach((node) => node.remove());
  // Relative document links preserve published chapter URLs and anchors.
  main.querySelectorAll('[src],[href]').forEach((element) => {
    for (const attribute of ['src', 'href']) {
      const value = element.getAttribute(attribute);
      if (value?.startsWith('assets/')) element.setAttribute(attribute, `book/${value}`);
    }
  });
  document.querySelectorAll('link[rel=stylesheet]').forEach((link) => {
    const href = link.getAttribute('href')!;
    if (!href.includes('katex') && !href.startsWith('reader/')) styles.add(href);
  });
  pages[data.id] = {
    id: data.id,
    title: data.title,
    description: document.querySelector('meta[name=description]')?.getAttribute('content') || '',
    html: main.innerHTML,
    segments: data.segments,
    outline: data.outline
  };
}
const generated = path.join(app, 'src/lib/server/generated');
fs.mkdirSync(generated, { recursive: true });
fs.writeFileSync(path.join(generated, 'pages.json'), JSON.stringify(pages));
fs.copyFileSync(path.join(source, 'book-map.json'), path.join(generated, 'map.json'));
const css = [...styles]
  .map((name) => fs.readFileSync(path.join(source, name), 'utf8'))
  .join('\n')
  .replace(/\.skill-preparation span\{/g, '.skill-preparation > li > span{');
fs.writeFileSync(path.join(output, 'content.css'), `@layer book {\n${css}\n}`);
const modules = {
  'course.js': ['initCourse', 'getCourseContext', 'revealCourseLocation', 'getNotebookSnapshot'],
  'scenes.js': ['initScenes'],
  'visual-lessons.js': ['initVisualLessons', 'restoreVisualLessonState'],
  'geometry-experiences.js': ['initGeometryExperiences'],
  'curvature-experiences.js': ['initCurvatureExperiences'],
  'symbols.js': ['initSymbolInspector']
};
const entry = Object.entries(modules)
  .map(
    ([file, names]) =>
      `export {${names.join(',')}} from ${JSON.stringify(path.join(source, file))};`
  )
  .join('\n');
await build({
  stdin: { contents: entry, resolveDir: root },
  bundle: true,
  format: 'esm',
  splitting: true,
  outdir: output,
  entryNames: 'experiments',
  chunkNames: 'chunks/[name]-[hash]',
  minify: true,
  target: 'es2022',
  logLevel: 'warning'
});
console.log(`Prepared ${Object.keys(pages).length} pages for the SvelteKit reader.`);
