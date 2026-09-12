import { describe, it, expect } from 'vitest';
import { readingNeighborhood } from '../src/lib/reading-context';
import type { Passage } from '../src/lib/types';
const passage = (id: string, extra: Partial<Passage> = {}): Passage => ({
  id,
  kind: 'text',
  index: 0,
  text: id,
  hash: id,
  heading: 'Motion',
  latex: [],
  ...extra
});
describe('source boundaries', () => {
  it('keeps explicitly requested exercises separate from their solutions even when visible', () => {
    const sources = [
      passage('intro'),
      passage('exercise', { noNarration: true }),
      passage('answer', { noNarration: true }),
      passage('next')
    ];
    expect(readingNeighborhood(sources, 'exercise', new Set(sources.map((p) => p.id)))).toEqual([
      sources[1]
    ]);
    expect(readingNeighborhood(sources, 'intro').map((p) => p.id)).toEqual(['intro', 'next']);
  });
  it('retrieves the requested depth without mixing neighboring hidden panels', () => {
    const sources = [
      passage('intuitive', { lesson: 'motion', depth: 'intuition' }),
      passage('formal', { lesson: 'motion', depth: 'formal' }),
      passage('formal-step', { lesson: 'motion', depth: 'formal' }),
      passage('practice', { lesson: 'motion', depth: 'practice' })
    ];
    expect(readingNeighborhood(sources, 'formal').map((p) => p.id)).toEqual([
      'formal',
      'formal-step'
    ]);
    expect(readingNeighborhood(sources, 'intuitive').map((p) => p.id)).toEqual(['intuitive']);
  });
  it('retains adjacent steps of an optional proof', () => {
    const proof = [
      passage('first', { supplement: 'proof', noNarration: true }),
      passage('second', { supplement: 'proof', noNarration: true })
    ];
    expect(readingNeighborhood([passage('outside'), ...proof], 'second')).toEqual(proof);
  });
});
