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
