import type { Word } from '../types';
interface VisibleWord {
  text: string;
  node: Text;
  start: number;
  end: number;
}
type Highlights = { set(name: string, value: unknown): void; delete(name: string): void };
const normalize = (word: string) => word.toLocaleLowerCase().replace(/’/g, "'");
export function sourceHighlighter(
  element: HTMLElement | null,
  words: Word[],
  start: number,
  end: number
) {
  const css = globalThis.CSS as typeof CSS & { highlights?: Highlights };
  const HighlightConstructor = (
    globalThis as unknown as { Highlight?: new (...ranges: Range[]) => unknown }
  ).Highlight;
  const clear = () => css?.highlights?.delete('spoken-word');
  if (!element || !HighlightConstructor || !css?.highlights)
    return { clear, show: (_: number) => clear() };
  const visible: VisibleWord[] = [];
  const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, {
    acceptNode: (node) =>
      node.parentElement?.closest('.katex,svg,button,[hidden],.heading-link,.passage-tools')
        ? NodeFilter.FILTER_REJECT
        : NodeFilter.FILTER_ACCEPT
  });
  let node: Node | null;
  while ((node = walker.nextNode())) {
    for (const match of (node.textContent || '').matchAll(/[\p{L}\p{N}]+(?:['’-][\p{L}\p{N}]+)*/gu))
      visible.push({
        text: normalize(match[0]),
        node: node as Text,
        start: match.index,
        end: match.index + match[0].length
      });
  }
  const spoken = words
    .map((word, index) => ({ ...word, index }))
    .filter((word) => word.start >= start && word.start < end);
  const rows = Array.from({ length: spoken.length + 1 }, () => new Uint16Array(visible.length + 1));
  for (let i = spoken.length - 1; i >= 0; i--)
    for (let j = visible.length - 1; j >= 0; j--) {
      rows[i][j] =
        normalize(spoken[i].text) === visible[j].text
          ? 1 + rows[i + 1][j + 1]
          : Math.max(rows[i + 1][j], rows[i][j + 1]);
    }
  const map = new Map<number, VisibleWord>();
  let i = 0,
    j = 0,
    previous = -1;
  while (i < spoken.length && j < visible.length) {
    if (normalize(spoken[i].text) === visible[j].text) {
      map.set(spoken[i].index, visible[j]);
      i++;
      j++;
    } else if (rows[i + 1][j] >= rows[i][j + 1]) i++;
    else j++;
  }
  return {
    clear,
    show(index: number) {
      if (index === previous) return;
      previous = index;
      clear();
      const word = map.get(index);
      if (!word) return;
      const range = new Range();
      range.setStart(word.node, word.start);
      range.setEnd(word.node, word.end);
      css.highlights!.set('spoken-word', new HighlightConstructor(range));
    }
  };
}
