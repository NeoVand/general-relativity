// Opening an authored definition never invokes a model.
import {symbolEntries as entries} from './scientific-symbols.js';
export {entries};
const keyFor=el=>[...el.classList].find(c=>c.startsWith('symbol-')&&entries[c.slice(7)])?.slice(7);
export function initSymbolInspector(){
 const main=document.querySelector('#main');if(!main)return ()=>{};
 const card=document.createElement('section');card.className='symbol-card';card.id='symbol-card';card.hidden=true;card.tabIndex=-1;card.setAttribute('role','dialog');card.setAttribute('aria-label','Symbol explanation');
 const heading=document.createElement('div');heading.className='symbol-card-heading';
 const chooser=document.createElement('select');chooser.setAttribute('aria-label','Symbols in this equation');
 const close=document.createElement('button');close.type='button';close.className='symbol-close';close.setAttribute('aria-label','Close symbol explanation');const glyph=document.querySelector('#search-close svg');if(glyph)close.append(glyph.cloneNode(true));else close.textContent='×';
 heading.append(chooser,close);
 const example=document.createElement('div');example.className='symbol-example';
 const type=document.createElement('span');type.className='symbol-type';
 const prose=document.createElement('p');const link=document.createElement('a');link.className='symbol-lesson';link.textContent='Read the explanation →';card.append(heading,example,type,prose,link);document.body.append(card);
 let anchor,origin,formula;
 function hide(restore=false){if(card.hidden)return;card.hidden=true;anchor?.classList.remove('symbol-selected');if(restore&&origin?.isConnected)origin.focus({preventScroll:true});}
 function position(){const r=anchor.getBoundingClientRect(),margin=12,top=document.querySelector('.topbar').getBoundingClientRect().bottom+margin;const box=card.getBoundingClientRect();card.style.left=Math.max(margin,Math.min(innerWidth-box.width-margin,r.left+r.width/2-box.width/2))+'px';card.style.top=Math.max(top,Math.min(innerHeight-box.height-margin,r.bottom+10+box.height<innerHeight?r.bottom+10:r.top-box.height-10))+'px';}
 function show(key){
  // The definition and its visible source must always point to the same object.
  // Keep the clicked occurrence when its kind has not changed.
  if(keyFor(anchor)!==key){const next=formula.querySelector(`.symbol-${key}`);if(next){anchor.classList.remove('symbol-selected');anchor=next;anchor.classList.add('symbol-selected')}}
  const [name,base,suffix,role,kind,text,href]=entries[key];chooser.value=key;type.textContent=kind;prose.textContent=text;link.href=href;card.setAttribute('aria-label',name);example.innerHTML=window.katex.renderToString(`\\htmlClass{math-${role}}{${base}}${suffix}`,{throwOnError:true,trust:c=>c.command==='\\htmlClass'});position();
 }
 function open(target,{keyboard=false}={}){
  const key=keyFor(target);if(!key)return;
  hide();anchor=target;origin=target.closest('.equation')||document.activeElement;formula=target.closest('.katex-html')||target;
  const keys=[...new Set([...formula.querySelectorAll('[class*="symbol-"]')].map(keyFor).filter(Boolean))];if(!keys.includes(key))keys.unshift(key);
  chooser.replaceChildren(...keys.map(k=>{const option=document.createElement('option');option.value=k;option.textContent=entries[k][0];return option}));
  chooser.disabled=keys.length===1;card.hidden=false;target.classList.add('symbol-selected');show(key);document.dispatchEvent(new CustomEvent('gr:context-open',{detail:{kind:'symbol'}}));if(keyboard)close.focus({preventScroll:true});
 }
 const click=e=>{const target=e.target.closest('#main .katex-html [class*="symbol-"]');if(!target||target.closest('a,button,.scene-label'))return;if(e.detail>1){hide();return}e.preventDefault();open(target)};
 const down=e=>{if(!card.contains(e.target)&&!e.target.closest('#main .katex-html [class*="symbol-"]'))hide()};
 const key=e=>{if(e.key==='Escape'&&!card.hidden){e.preventDefault();e.stopImmediatePropagation();hide(true);return}if((e.key==='Enter'||e.key===' ')&&e.target.matches('#main .equation')){const target=e.target.querySelector('.katex-html [class*="symbol-"]');if(target){e.preventDefault();open(target,{keyboard:true})}}};
 const context=e=>{if(e.detail?.kind!=='symbol')hide()};
 const scroll=e=>{if(!card.contains(e.target))hide()};
 const resize=()=>hide();
 main.querySelectorAll('.equation:has([class*="symbol-"])').forEach(el=>el.setAttribute('aria-description','Press Enter to inspect the identified physical symbols.'));
 close.addEventListener('click',()=>hide(true));link.addEventListener('click',()=>hide());chooser.addEventListener('change',()=>show(chooser.value));document.addEventListener('click',click);document.addEventListener('pointerdown',down);document.addEventListener('keydown',key,true);document.addEventListener('gr:context-open',context);document.addEventListener('scroll',scroll,true);window.addEventListener('resize',resize);
 return ()=>{document.removeEventListener('click',click);document.removeEventListener('pointerdown',down);document.removeEventListener('keydown',key,true);document.removeEventListener('gr:context-open',context);document.removeEventListener('scroll',scroll,true);window.removeEventListener('resize',resize);card.remove()};
}
