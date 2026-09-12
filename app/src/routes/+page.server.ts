import { books } from '$lib/server/book';
export const load = () => ({ book: books.index });
