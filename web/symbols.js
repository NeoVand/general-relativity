// Definitions are authored book content. Opening one never invokes a model.
export const entries={
 metric:['Metric tensor','g','_{\\mu\\nu}','geometry','Bilinear form','With both indices downstairs, the metric pairs tangent vectors to give an inner product or interval. With both upstairs, the inverse metric pairs covectors and raises indices. One raised index gives the identity map. Its components depend on the coordinates.','chapter-4.html#4-4-the-metric-is-a-local-measuring-operation'],
 'metric-determinant':['Metric determinant','g','','geometry','Scalar density ingredient','An unindexed g denotes the determinant of the metric matrix here. Its magnitude supplies the volume factor used in integration.','chapter-4.html#4-7-determinants-tell-integration-how-much-room-there-is'],
 minkowski:['Minkowski metric','\\eta','_{\\mu\\nu}','geometry','Flat-spacetime metric','In an orthonormal frame this matrix has entries minus one, one, one, one on its diagonal. It distinguishes time from space in the interval.','chapter-3.html#3-3-the-interval-the-quantity-that-refuses-to-change'],
 'scale-factor':['Scale factor','a','(t)','geometry','Cosmological scale','The scale factor converts a fixed comoving separation into a physical distance. Ratios of scale factors matter; its normalization is a convention.','chapter-19.html#19-1-flrw-geometry-with-the-units-declared-before-the-equations-multiply'],
 perturbation:['Metric perturbation','h','_{\\mu\\nu}','geometry','Small change to a metric','This describes a small departure from a chosen background metric. In gravitational-wave calculations the transverse components encode strain.','chapter-18.html#18-1-linearization-is-a-controlled-approximation-not-a-different-theory'],
 'spatial-metric':['Spatial metric','\\gamma','_{ij}','geometry','Geometry of a spatial slice','The spatial metric measures distances within one spacelike slice. It is part of the decomposition used to evolve spacetime.','chapter-20.html#20-2-slicing-spacetime-without-claiming-that-nature-has-a-preferred-slicer'],
 connection:['Connection coefficients','\\Gamma','^{\\rho}_{\\mu\\nu}','transport','Coordinate coefficients','These coefficients account for how the coordinate basis changes between neighboring events. They enter covariant derivatives and the geodesic equation; they are not tensor components.','chapter-7.html#7-3-deriving-the-christoffel-symbols-instead-of-receiving-them-as-a-curse'],
 'covariant-derivative':['Covariant derivative','\\nabla','','transport','Geometric differentiation','This derivative compares nearby tensor fields while accounting for changing bases. For a scalar, one covariant derivative agrees with an ordinary partial derivative.','chapter-6.html#6-2-what-a-derivative-must-be-able-to-compare'],
 'spin-connection':['Spin connection','\\omega','^a{}_b','transport','Connection one-form','The spin connection compares local orthonormal frames. It packages the rotation or Lorentz transformation of those frames along a displacement.','chapter-21.html#21-3-why-an-orthonormal-frame-needs-a-spin-connection'],
 riemann:['Riemann curvature tensor','R','^{\\rho}{}_{\\sigma\\mu\\nu}','curvature','Curvature operator','This tensor describes the mismatch produced by comparing directions around a small loop. It also governs relative acceleration between neighboring freely falling trajectories.','chapter-8.html#8-2-curvature-as-a-machine-with-three-vector-inputs'],
 ricci:['Ricci tensor','R','_{\\mu\\nu}','curvature','Contraction of curvature','Ricci curvature combines selected components of the Riemann tensor. It retains the contraction that appears in Einstein’s equation, but not all curvature information.','chapter-9.html#9-2-ricci-curvature-as-a-directional-average-of-tidal-effects'],
 'scalar-curvature':['Ricci scalar','R','','curvature','Trace of the Ricci tensor','Contracting the Ricci tensor with the inverse metric produces this scalar. A zero Ricci scalar alone does not imply that spacetime is flat.','chapter-9.html#9-1-a-contraction-is-a-deliberate-loss-of-information'],
 einstein:['Einstein tensor','G','_{\\mu\\nu}','curvature','Divergence-free curvature combination','The Einstein tensor is the Ricci tensor minus one half the metric times the Ricci scalar. Its covariant divergence vanishes by a geometric identity.','chapter-9.html#9-5-contracting-bianchi-until-einstein-s-tensor-appears'],
 weyl:['Weyl tensor','C','^{\\rho}{}_{\\sigma\\mu\\nu}','curvature','Trace-free curvature','Weyl curvature is the part of the Riemann tensor left after removing its Ricci traces. It can be nonzero in vacuum, including outside a spherical mass.','chapter-9.html#9-3-extracting-the-trace-free-remainder-the-weyl-tensor'],
 'curvature-form':['Curvature two-form','\\Omega','^a{}_b','curvature','Curvature in a local frame','This packages curvature using differential forms and an orthonormal frame. It describes how the connection fails to be path independent.','chapter-21.html#21-4-cartan-s-equations-package-geometry-into-two-lines'],
 'stress-energy':['Stress–energy tensor','T','_{\\mu\\nu}','matter','Energy, momentum, and stress','Its components describe energy density, momentum flow, and stresses relative to a chosen frame. Together they supply the matter side of Einstein’s equation.','chapter-11.html#11-1-a-tensor-is-a-shipping-manifest-for-energy-and-momentum'],
 density:['Density','\\rho','','matter','Local matter quantity','The surrounding definition specifies whether this is mass density or energy density. Density alone is only one part of the full stress–energy description.','chapter-11.html#11-4-perfect-fluids-derived-from-isotropy'],
 'proper-time':['Proper time','\\tau','','observer','Time recorded by a clock','Proper time is the elapsed time recorded by an ideal clock along its timelike worldline. Different journeys between shared events can accumulate different readings.','chapter-3.html#3-4-proper-time-your-life-is-a-line-integral'],
 'four-velocity':['Four-velocity','u','^\\mu','observer','Tangent to a timelike worldline','Four-velocity differentiates an observer’s coordinates with respect to their proper time. Its components depend on the coordinates; the vector describes the observer’s motion.','chapter-3.html#3-6-four-velocity-and-four-momentum'],
 'cosmological-constant':['Cosmological constant','\\Lambda','','neutral','Constant geometric term','This constant multiplies the metric in Einstein’s equation. It may equivalently be placed on the matter side as a vacuum stress–energy contribution.','chapter-15.html#15-6-the-cosmological-constant-as-vacuum-stress-energy']
};
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
