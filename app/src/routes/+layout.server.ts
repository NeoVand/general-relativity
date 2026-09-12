import { contents } from '$lib/server/book';
export const prerender = true;
export const load = () => ({ contents });
