import { error } from '@sveltejs/kit';
import { books } from '$lib/server/book';
import type { PageServerLoad, EntryGenerator } from './$types';

export const entries: EntryGenerator = () =>
  Object.keys(books).map((id) => ({ document: `${id}.html` }));
export const load: PageServerLoad = ({ params }) => {
  const id = params.document.replace(/\.html$/, '');
  if (!params.document.endsWith('.html') || !Object.hasOwn(books, id))
    error(404, 'This page is not in the book.');
  return { book: books[id] };
};
