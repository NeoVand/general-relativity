// Keep native text selection intact. Math is one semantic unit: its LaTeX
// source replaces KaTeX's duplicate visual/accessibility trees.
const ignored='script,button,svg,.heading-link,.narration-script,.passage-tools,[hidden],.scene-fallback';
const clean=text=>text.replace(/\s+/g,' ').trim();

function selectedSource(element,range){
 const pieces=[],latex=[];
 function visit(node){
  if(!range.intersectsNode(node))return;
  if(node.nodeType===Node.TEXT_NODE){
   const start=node===range.startContainer?range.startOffset:0;
   const end=node===range.endContainer?range.endOffset:node.textContent.length;
   pieces.push(node.textContent.slice(start,end));return;
  }
  if(node.nodeType!==Node.ELEMENT_NODE||node.matches(ignored))return;
  if(node.matches('.katex')){
   const source=node.querySelector('annotation[encoding="application/x-tex"]')?.textContent;
   if(source){pieces.push(` $${source}$ `);latex.push(source)}return;
  }
  for(const child of node.childNodes)visit(child);
  if(node.matches('p,li,th,td,tr,br'))pieces.push(' ');
 }
 visit(element);return {text:clean(pieces.join('')),latex};
}

export function readingSelection(page,range){
 const main=document.querySelector('#main');
 if(!range||range.collapsed||!main?.contains(range.commonAncestorContainer))return null;
 const segments=[];
 for(const original of page.segments){
  const element=document.getElementById(original.id);
  if(!element||!range.intersectsNode(element))continue;
  const source=selectedSource(element,range);if(!source.text)continue;
  const partial=source.text!==clean(original.text);
  segments.push({...original,...source,kind:'text',description:'',narration:undefined,
   hash:partial?`${original.hash}:selection:${source.text}`:original.hash,
   sourceHash:original.hash,partial,selectionRange:range.cloneRange()});
 }
 if(!segments.length)return null;
 return {page:page.id,start:segments[0].id,end:segments.at(-1).id,text:segments.map(s=>s.text).join('\n'),segments,
  element:document.getElementById(segments[0].id)};
}

export function selectionPosition(range,{width=88,height=42,gap=9,margin=12,touch=false}={}){
 const viewport=window.visualViewport;
 const leftEdge=(viewport?.offsetLeft||0)+margin,rightEdge=(viewport?.offsetLeft||0)+(viewport?.width||innerWidth)-margin;
 const topEdge=Math.max((viewport?.offsetTop||0)+margin,(document.querySelector('.topbar')?.getBoundingClientRect().bottom||0)+gap);
 const bottomEdge=(viewport?.offsetTop||0)+(viewport?.height||innerHeight)-margin;
 const rects=[...range.getClientRects()].filter(r=>r.width>0&&r.height>0&&r.bottom>topEdge&&r.top<bottomEdge);
 if(!rects.length)return null;
 // Anchor to the first selected line, not the center of a multi-paragraph box.
 const first=rects[0],last=rects.at(-1);
 const above=!touch&&first.top-gap-height>=topEdge;
 const anchor=above?first:last;
 const top=above?anchor.top-gap-height:anchor.bottom+gap;
 return {left:Math.max(leftEdge,Math.min(rightEdge-width,anchor.left+anchor.width/2-width/2)),
  top:Math.max(topEdge,Math.min(bottomEdge-height,top)),placement:above?'above':'below'};
}
