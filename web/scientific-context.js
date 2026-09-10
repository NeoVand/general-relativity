// Both tutoring entry points consume the live model and teaching copy beside a
// visible lab. Older scenes publish narrationSource rather than scientificContext.
export function visibleExperiments(){
 const candidates=[...document.querySelectorAll('[data-scientific-context],[data-narration-source]')];
 const roots=candidates.filter(root=>!candidates.some(parent=>parent!==root&&parent.contains(root)));
 const parse=value=>{try{return JSON.parse(value||'null')}catch{return null}};
 return roots.filter(root=>{const box=root.getBoundingClientRect();return box.height>0&&box.bottom>90&&box.top<innerHeight*.85&&!root.closest('[hidden]')}).slice(0,2).map(root=>({
  ...parse(root.dataset.scientificContext),
  id:root.id||root.closest('[id]')?.id,
  title:root.querySelector('h2,h3,h4')?.textContent?.trim(),
  description:root.dataset.narrationSource||'',
  currentView:root.dataset.activeView||null,
  state:parse(root.dataset.visualState),
  teaching: [...root.querySelectorAll('p,li,output')].filter(el=>el.getClientRects().length&&!el.closest('[hidden]')).map(el=>el.innerText.trim()).filter(Boolean).join('\n').slice(0,6000),
  controls:[...root.querySelectorAll('input[type=range],select,button[aria-pressed],button[role=tab]')].filter(el=>el.getClientRects().length&&!el.closest('[hidden]')).map(el=>({label:el.getAttribute('aria-label')||el.labels?.[0]?.textContent?.trim()||el.textContent?.trim()||el.id,value:el.value??el.getAttribute('aria-pressed')??el.getAttribute('aria-selected')})),
  learnerObservation:root.querySelector('[data-lab-observation]')?.value?.slice(0,1600)||''
 }));
}
