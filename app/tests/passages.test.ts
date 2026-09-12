import { describe, it, expect } from 'vitest';
import { groupPassages, splitPrepared } from '../src/lib/audio/passages';
import type { Passage } from '../src/lib/types';
const passage = (id: string, text: string, kind: Passage['kind'] = 'text'): Passage => ({
  id,
  text,
  kind,
  index: 0,
  heading: 'Motion',
  latex: [],
  hash: id
});
describe('continuous narration', () => {
  it('combines headings and short prose instead of making one clip per DOM fragment', () => {
    const source = [
      passage('h', 'Motion', 'heading'),
      ...Array.from({ length: 8 }, (_, i) =>
        passage('p' + i, 'The cart moves with a constant velocity.')
      )
    ];
    const blocks = groupPassages(source);
    expect(blocks).toHaveLength(1);
    expect(blocks[0].passages).toEqual(source);
  });
  it('preserves order and every source passage across longer sections', () => {
    const source = Array.from({ length: 20 }, (_, i) =>
      passage('p' + i, 'One complete sentence. '.repeat(20))
    );
    expect(groupPassages(source).flatMap((b) => b.passages)).toEqual(source);
  });
  it('never loses the passage boundary map when generated speech exceeds a provider limit', () => {
    const first = 'This equation relates a force to acceleration. '.repeat(100);
    const second = 'The mass is held constant. '.repeat(100);
    const text = first + second;
    const parts = [
      { passage: passage('a', first), text: first, start: 0, end: first.length },
      { passage: passage('b', second), text: second, start: first.length, end: text.length }
    ];
    const result = splitPrepared({ text, parts });
    expect(result.every((p) => p.text.length <= 2400)).toBe(true);
    expect(
      result
        .map((p) => p.text)
        .join(' ')
        .replace(/\s+/g, ' ')
        .trim()
    ).toBe(text.replace(/\s+/g, ' ').trim());
    expect(new Set(result.flatMap((p) => p.parts.map((part) => part.passage.id)))).toEqual(
      new Set(['a', 'b'])
    );
    for (const block of result)
      for (const part of block.parts)
        expect(block.text.slice(part.start, part.end)).toBe(part.text);
  });
  it('handles long unbroken tokens without looping or dropping characters', () => {
    const text = 'x'.repeat(6000);
    const p = passage('a', text);
    expect(
      splitPrepared({ text, parts: [{ passage: p, text, start: 0, end: text.length }] })
        .map((p) => p.text)
        .join('')
    ).toBe(text);
  });
});
