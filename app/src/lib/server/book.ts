import pages from './generated/pages.json';
import map from './generated/map.json';
import type { BookPage, BookEntry } from '../types';

export const books = pages as Record<string, BookPage>;
export const contents = map as BookEntry[];
