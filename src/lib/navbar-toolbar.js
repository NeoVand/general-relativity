import {tick} from 'svelte';

// Study survives chapter navigation, while the book's static header is replaced.
// Move the same controls into each new header without restarting the audio session.
export function navbarToolbar(node) {
 const home=document.createComment('Study toolbar');
 node.before(home);
 const desktop=window.matchMedia('(min-width: 901px)');
 let revision=0;
 async function place() {
  const current=++revision;
  await tick();
  if(current!==revision)return;
  const search=desktop.matches&&document.querySelector('.topbar .book-search');
  if(search)search.before(node);
  else home.after(node);
 }
 desktop.addEventListener('change',place);
 place();
 return {
  update:place,
  destroy(){revision++;desktop.removeEventListener('change',place);home.replaceWith(node);}
 };
}
