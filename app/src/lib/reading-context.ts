import type { Passage } from './types';

// Optional proofs may need several adjacent steps. An exercise request must
// never silently add the solution or a hidden depth to the tutor's context.
export function readingNeighborhood(segments: Passage[], id: string, visibleIds?: Set<string>) {
  const requested = segments.find((segment) => segment.id === id);
  if (!requested) return [];
  let candidates: Passage[];
  if (requested.supplement)
    candidates = segments.filter((s) => s.supplement === requested.supplement);
  else if (requested.noNarration) candidates = [requested];
  else if (visibleIds?.has(id))
    candidates = segments.filter((s) => visibleIds.has(s.id) && !s.noNarration);
  else if (requested.depth)
    candidates = segments.filter(
      (s) => !s.noNarration && s.lesson === requested.lesson && s.depth === requested.depth
    );
  else candidates = segments.filter((s) => !s.noNarration && (!s.depth || s.depth === 'intuition'));
  const index = candidates.findIndex((s) => s.id === id);
  return requested.supplement
    ? candidates.slice(Math.max(0, index - 3), index + 4)
    : candidates.slice(Math.max(0, index - 1), index + 3);
}

export function extractPassageText(element: Element) {
  const copy = element.cloneNode(true) as Element;
  copy
    .querySelectorAll(
      'script,button,.heading-link,.narration-script,.passage-tools,.step-number,.step-reason>span,.vl-controls,.vl-kicker,.vl-spatial-hint,[data-experience-controls],.gx-reference,.cx-reference,svg,canvas,[hidden],[aria-hidden="true"]'
    )
    .forEach((node) => node.remove());
  copy
    .querySelectorAll('.katex')
    .forEach((node) =>
      node.replaceWith(` $${node.querySelector('annotation')?.textContent || ''}$ `)
    );
  copy.querySelectorAll('p,div,li,h1,h2,h3,h4,h5,h6,br,strong,small').forEach((node) => {
    node.before(' ');
    node.after(' ');
  });
  return copy.textContent?.replace(/\s+/g, ' ').trim() || '';
}
