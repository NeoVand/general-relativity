const escapePattern=value=>value.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
export function insertLessons(html,lessons,renderHeading,renderLesson){
 for(const heading of new Set(lessons.map(l=>l.after))){
  const pattern=new RegExp(`(<h3\\b[^>]*>${escapePattern(renderHeading(heading))}[\\s\\S]*?<\\/h3>)([\\s\\S]*?)(?=<h[23]\\b|$)`);
  if(!pattern.test(html))throw Error(`Missing lesson section: ${heading}`);
  const group=lessons.filter(l=>l.after===heading);
  for(const l of group)if(!['section-start','section-end'].includes(l.placement))throw Error(`Unreviewed placement: ${l.id}`);
  const before=group.filter(l=>l.placement==='section-start').map(renderLesson).join('');
  const after=group.filter(l=>l.placement==='section-end').map(renderLesson).join('');
  html=html.replace(pattern,(_,title,body)=>title+before+body+after);
 }
 return html;
}

// Work only with the manuscript's top-level sections: a lab's own h2 or h3
// must not accidentally split the surrounding chapter.
export function insertSectionIllustrations(html,illustrations){
 const {document}=parseHTML(`<div id="manuscript">${html}</div>`);
 const root=document.getElementById('manuscript');
 for(const {section,html:illustration,inside} of illustrations){
  const heading=[...root.children].find(el=>el.tagName==='H3'&&el.textContent.startsWith(section+' '));
  if(!heading)throw Error(`Missing illustration preparation: ${section}`);
  if(inside){
   let container=heading.nextElementSibling;
   while(container&&!container.matches(inside)&&!container.matches('h2,h3'))container=container.nextElementSibling;
   if(!container?.matches(inside))throw Error(`Missing illustration container: ${section} ${inside}`);
   container.insertAdjacentHTML('beforeend',illustration);continue;
  }
  let next=heading.nextElementSibling;
  while(next&&!next.matches('h2,h3,.guided-lesson:not([data-sequential="true"])'))next=next.nextElementSibling;
  if(next)next.insertAdjacentHTML('beforebegin',illustration);else root.insertAdjacentHTML('beforeend',illustration);
 }
 return root.innerHTML;
}
import {parseHTML} from 'linkedom';
