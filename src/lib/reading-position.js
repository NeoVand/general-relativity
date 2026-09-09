// Store a nearby semantic anchor plus its viewport offset. Absolute scroll is
// only a fallback when the chapter has changed since the entry was saved.
export function readingPosition() {
 const candidates=[...document.querySelectorAll('#main [id]')].filter(el=>{
  const rect=el.getBoundingClientRect();return rect.height>0&&rect.bottom>80&&rect.top<innerHeight;
 });
 const anchor=candidates.sort((a,b)=>Math.abs(a.getBoundingClientRect().top-100)-Math.abs(b.getBoundingClientRect().top-100))[0];
 return {anchor:anchor?.id||null,offset:anchor?.getBoundingClientRect().top||0,x:scrollX,y:scrollY,focus:document.activeElement?.id||null};
}
export function focusReadingTarget(target) {
 if(!target)return;
 if(!target.matches('a,button,input,select,textarea,[tabindex]'))target.setAttribute('tabindex','-1');
 target.focus({preventScroll:true});
}
export function restoreReadingPosition(position,reveal) {
 if(!position)return false;
 const target=position.anchor?reveal(document.getElementById(position.anchor)):null;
 if(target){
  let parent=target.parentElement;while(parent){if(parent.tagName==='DETAILS')parent.open=true;parent=parent.parentElement;}
  window.scrollTo({left:position.x||0,top:scrollY+target.getBoundingClientRect().top-position.offset,behavior:'instant'});
 }else window.scrollTo({left:position.x||0,top:position.y||0,behavior:'instant'});
 focusReadingTarget(document.getElementById(position.focus)||target||document.querySelector('#main h1'));
 return true;
}
