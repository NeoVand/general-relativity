import { base } from '$app/paths';
import katex from 'katex';

export interface Experiments {
  initScenes(): () => void;
  initCourse(): { ready: Promise<void>; cleanup(): void };
  initVisualLessons(): () => void;
  initGeometryExperiences(): () => void;
  initCurvatureExperiences(): () => void;
  initSymbolInspector(): () => void;
  getCourseContext(): unknown;
  revealCourseLocation(element: Element): void;
  getNotebookSnapshot(id: string): unknown;
  restoreVisualLessonState(id: string, snapshot: unknown): void;
}
let loaded: Promise<Experiments> | undefined;
export function experiments() {
  loaded ??= import(/* @vite-ignore */ `${base}/book/experiments.js`).catch((error) => {
    loaded = undefined;
    throw error;
  });
  return loaded!;
}
export async function mountExperiments(signal: AbortSignal) {
  (window as Window & { katex?: typeof katex }).katex = katex;
  const runtime = await experiments();
  if (signal.aborted) return;
  const cleanups: (() => void)[] = [];
  const cleanup = () => {
    for (const dispose of cleanups.reverse()) dispose();
    cleanups.length = 0;
  };
  signal.addEventListener('abort', cleanup, { once: true });
  try {
    cleanups.push(
      runtime.initSymbolInspector(),
      runtime.initScenes(),
      runtime.initVisualLessons(),
      runtime.initGeometryExperiences(),
      runtime.initCurvatureExperiences()
    );
    const course = runtime.initCourse();
    cleanups.push(course.cleanup);
    await course.ready;
    if (signal.aborted) return;
    const snapshot = new URL(location.href).searchParams.get('snapshot');
    if (snapshot) runtime.restoreVisualLessonState(snapshot, runtime.getNotebookSnapshot(snapshot));
    if (location.hash) {
      const element = document.getElementById(decodeURIComponent(location.hash.slice(1)));
      if (element) {
        runtime.revealCourseLocation(element);
        element.scrollIntoView({ block: 'start' });
      }
    }
    document.body.dataset.readingReady = 'true';
  } catch (error) {
    cleanup();
    throw error;
  }
}
export function figureLayouts(root: HTMLElement) {
  const observer = new ResizeObserver((entries) => {
    for (const entry of entries) {
      const svg = entry.target.querySelector<SVGSVGElement>('svg[data-mobile-viewbox]');
      if (!svg || !entry.contentRect.width) continue;
      svg.dataset.desktopViewbox ||= svg.getAttribute('viewBox') || '';
      const compact = entry.contentRect.width < 600;
      const viewBox = compact ? svg.dataset.mobileViewbox! : svg.dataset.desktopViewbox;
      svg.setAttribute('viewBox', viewBox);
      const [, , width, height] = viewBox.split(/\s+/);
      svg.setAttribute('width', width);
      svg.setAttribute('height', height);
      for (const panel of svg.querySelectorAll<SVGElement>('[data-mobile-transform]')) {
        panel.dataset.desktopTransform ??= panel.getAttribute('transform') || '';
        panel.setAttribute(
          'transform',
          compact ? panel.dataset.mobileTransform! : panel.dataset.desktopTransform
        );
      }
    }
  });
  root.querySelectorAll('.figure-surface:has(>svg[data-mobile-viewbox])').forEach((element) => {
    if (!element.closest('.atlas-item')) observer.observe(element);
  });
  return () => observer.disconnect();
}
