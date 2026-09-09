import {transportDefaults,transportState,transportAt,transportResult,surfaceFrame,dot,add,scale,unit,cross} from './parallel-transport-model.js';
import {createTransportScene} from './parallel-transport-scene.js';
const fmt=(n,d=2)=>(Math.abs(n)<.5*10**-d?0:n).toFixed(d);
const eye=unit([5,-6,4]),right=unit(cross([0,0,1],eye)),up=cross(eye,right);
const project=p=>[310+94*dot(p,right),236-94*dot(p,up)];
const path=points=>points.map((p,i)=>`${i?'L':'M'}${p.map(x=>fmt(x,3)).join(',')}`).join(' ');
const arrow=(p,v,cls)=>{
 const a=project(p),b=project(add(p,scale(v,.52))),dx=b[0]-a[0],dy=b[1]-a[1],L=Math.hypot(dx,dy);if(L<1e-5)return '';
 const x=dx/L,y=dy/L;
 return `<path class="tp-svg-arrow ${cls}" d="${path([a,b,[b[0]-9*x+4*y,b[1]-9*y-4*x],b,[b[0]-9*x-4*y,b[1]-9*y+4*x]])}"/>`;
};
export function transportFallback(value=transportDefaults){
 const s=transportState(value),current=transportAt(s),facets=[],rows=22,cols=40;
 const frame=(i,j)=>surfaceFrame(s.surface,s.surface==='sphere'?2*Math.PI*i/cols:-1.6+3.2*i/cols,s.surface==='sphere'?-Math.PI/2+Math.PI*j/rows:-1.6+3.2*j/rows,s.radius);
 for(let j=0;j<rows;j++)for(let i=0;i<cols;i++){
  const f=[frame(i,j),frame(i+1,j),frame(i+1,j+1),frame(i,j+1)],normal=frame(i+.5,j+.5).normal;
  if(dot(normal,eye)<0)continue;
  const mid=f.reduce((a,f)=>add(a,scale(f.point,.25)),[0,0,0]);
  facets.push({depth:dot(mid,eye),svg:`<path class="tp-facet" d="${path(f.map(f=>project(f.point)))}Z" style="--tp-shade:${fmt(.32+.5*Math.max(0,dot(normal,unit([-3,-5,7]))))}"/>`});
 }
 const runs=[];let run;
 for(let i=0;i<210;i++){const p=transportAt({...s,progress:i/210}),q=transportAt({...s,progress:(i+1)/210}),hidden=dot(p.normal,eye)<0;if(!run||run.hidden!==hidden){run={hidden,points:[project(p.point)]};runs.push(run)}run.points.push(project(q.point))}
 const route=runs.map(run=>`<path class="${run.hidden?'tp-route-hidden':'tp-route'}" d="${path(run.points)}"/>`).join('');
 let labels='';for(let i=0;i<3;i++){const f=transportAt({...s,progress:current.corners[i]}),[x,y]=project(f.point);labels+=`<circle class="tp-vertex" cx="${x}" cy="${y}" r="3"/><text class="tp-svg-label" x="${x+9}" y="${y-10}">${(s.reverse?'ACB':'ABC')[i]}</text>`}
 const [x,y]=project(current.point),n=current.normal,V=current.vector,W=cross(n,V),corners=[[-1,-1],[1,-1],[1,1],[-1,1]].map(([a,b])=>project(add(add(current.point,scale(V,.36*a)),scale(W,.36*b))));
 return `<svg viewBox="0 0 620 440" class="tp-fallback-svg" role="img" aria-label="${s.surface}. A direction is carried around the triangle A, B, C. At ${fmt(100*s.progress,0)} percent of the loop it has unit length and is tangent to the surface. Dashed paths and arrows lie on the far side.">${facets.sort((a,b)=>a.depth-b.depth).map(f=>f.svg).join('')}${route}<path class="tp-tangent" d="${path(corners)}Z"/>${arrow(current.startPoint,current.startVector,'tp-initial'+(dot(current.startNormal,eye)<0?' tp-far':''))}${arrow(current.point,current.vector,'tp-carried'+(dot(current.normal,eye)<0?' tp-far':''))}${labels}<circle class="tp-current" cx="${x}" cy="${y}" r="4"/></svg>`;
}
export function transportInsight(value=transportDefaults){
 const s=transportState(value),r=transportResult(s),end=s.progress>1-1e-8;
 if(s.surface==='plane')return end?'The arrow is back at A with its original direction. Turning the path at B or C did not turn the arrow.':'Keep the arrow pointing in the same direction while its base follows the path. At a corner, the path turns; the arrow need not turn with it.';
 if(s.surface==='cylinder')return end?'The arrow returns with no rotation. Unroll the cylinder and this is the same experiment as on the plane. Bending the sheet has not changed its intrinsic geometry.':'The arrow changes its direction in the surrounding room so it can stay tangent to the sheet. Unroll the sheet and its direction stays fixed. There is no turning within the local tangent plane.';
 return end?`At A again, the arrow is rotated by ${fmt(r.angle*180/Math.PI,1)}°. It stayed tangent and never twisted within the surface along any leg. The complete loop reveals the sphere’s curvature.`:'The arrow stays tangent as it moves. Along each great-circle arc, the tangent plane and the arrow rotate together. Carry it all the way back to A to compare directions in the same tangent plane.';
}
export function transportSource(value=transportDefaults){const s=transportState(value),v=transportAt(s),r=transportResult(s);return `Parallel transport on a ${s.surface}. A unit direction is carried around a triangle, ${s.reverse?'in reverse order':'from A to B to C to A'}. It has completed ${fmt(100*s.progress,0)} percent of the path. Its length is ${fmt(v.length,3)} and its normal component is ${fmt(v.normalComponent,3)}. On return, its signed rotation will be ${fmt(r.angle*180/Math.PI,1)} degrees; the enclosed area is ${fmt(r.area,3)} square metres. ${transportInsight(s)}`;}
export function transportReadout(value=transportDefaults){const v=transportAt(value),r=transportResult(value);return `<div><span>Carried vector length</span><strong>${fmt(v.length,3)}</strong></div><div><span>Rotation on return to A</span><strong class="tp-angle">${fmt(r.angle*180/Math.PI,1)}°</strong></div><div><span>Enclosed surface area</span><strong>${fmt(r.area,3)} <small>m²</small></strong></div>`;}

export function initParallelTransport(){
 const cleanups=[];
 for(const root of document.querySelectorAll('[data-parallel-transport]')){
  let state={...transportDefaults};try{state=transportState(JSON.parse(localStorage.getItem('gr-course-v1'))?.visuals?.[root.id]?.state)}catch{}
  let playing=false,visible=false,disposed=false,previous=0,raf=0,spatial=null,requested=false;
  const controller=new AbortController(),on=(el,event,fn)=>el.addEventListener(event,fn,{signal:controller.signal});
  const play=root.querySelector('[data-tp-play]'),fallback=root.querySelector('[data-tp-fallback]');
  function draw(user=false){
   const v=transportAt(state),result=transportResult(state);
   if(!spatial||root.dataset.transportSpatial==='fallback')fallback.innerHTML=transportFallback(state);
   spatial?.update();root.querySelector('[data-tp-readout]').innerHTML=transportReadout(state);root.querySelector('[data-tp-insight]').textContent=transportInsight(state);
   for(const button of root.querySelectorAll('[data-tp-face],[data-tp-camera]'))button.disabled=!spatial||root.dataset.transportSpatial==='fallback';
   for(const input of root.querySelectorAll('[data-tp-parameter]')){const key=input.dataset.tpParameter;input.value=state[key];input.style.setProperty('--range-fill',`${100*(input.value-input.min)/(input.max-input.min)}%`);root.querySelector(`[data-tp-value="${key}"]`).textContent=key==='progress'?`${fmt(100*state[key],0)}%`:key==='size'?`${fmt(100*state[key],0)}%`:`${fmt(state[key])} m`;}
   root.querySelector('[data-tp-radius]').hidden=state.surface==='plane';
   for(const button of root.querySelectorAll('[data-tp-surface]'))button.setAttribute('aria-pressed',String(state.surface===button.dataset.tpSurface));
   root.querySelector('[data-tp-reverse]').setAttribute('aria-pressed',String(state.reverse));play.setAttribute('aria-pressed',String(playing));play.textContent=playing?'Pause':state.progress===1?'Replay':'Play';
   root.dataset.visualState=JSON.stringify(state);root.dataset.narrationSource=transportSource(state);
   root.dataset.scientificContext=JSON.stringify({id:root.id,version:1,model:'Exact Levi-Civita transport on a plane, cylinder, or spherical great-circle triangle',parameters:state,readouts:{...v,...result},units:'Surface distances m; unit direction vector; signed angles rad',assumptions:['Induced Euclidean surface metric','Exact great-circle rotation on the sphere','Constant components in the unrolled cylinder frame','Positive return angle follows the outward-normal right-hand rule'],equations:['dV/ds=−(V·dn/ds)n','Δangle=K×signed area for these constant-curvature loops']});
   if(user){document.dispatchEvent(new CustomEvent('gr:visual-change',{detail:{id:root.id,type:'parallel-transport',state:{...state}}}));root.querySelector('[data-tp-status]').textContent=`${fmt(state.progress*100,0)} percent around the ${state.surface} loop. Rotation on return ${fmt(result.angle*180/Math.PI,1)} degrees.`;}
  }
  function stop(){cancelAnimationFrame(raf);raf=0;previous=0}
  function tick(time){raf=0;if(disposed||!visible||!playing||document.hidden)return;if(previous)state.progress=Math.min(1,state.progress+Math.min(.06,(time-previous)/1000)/9);previous=time;if(state.progress===1)playing=false;draw(state.progress===1);if(playing)raf=requestAnimationFrame(tick)}
  function schedule(){stop();if(playing&&visible&&!document.hidden)raf=requestAnimationFrame(tick)}
  on(play,'click',()=>{playing=!playing;if(playing&&state.progress===1)state.progress=0;draw(true);schedule()});
  on(root.querySelector('[data-tp-corner]'),'click',()=>{playing=false;state.progress=transportAt(state).corners.find(x=>x>state.progress+1e-7)??0;draw(true);schedule()});
  on(root.querySelector('[data-tp-reset]'),'click',()=>{state={...transportDefaults};playing=false;spatial?.reset();draw(true);schedule()});
  on(root.querySelector('[data-tp-camera]'),'click',()=>spatial?.reset());
  on(root.querySelector('[data-tp-face]'),'click',()=>spatial?.faceStart());
  on(root.querySelector('[data-tp-reverse]'),'click',()=>{state.reverse=!state.reverse;state.progress=0;playing=false;draw(true);schedule()});
  for(const button of root.querySelectorAll('[data-tp-surface]'))on(button,'click',()=>{state.surface=button.dataset.tpSurface;state.progress=0;playing=false;draw(true);schedule()});
  for(const input of root.querySelectorAll('[data-tp-parameter]'))on(input,'input',()=>{state=transportState({...state,[input.dataset.tpParameter]:+input.value});playing=false;draw(true);schedule()});
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');on(reduced,'change',()=>{if(reduced.matches){playing=false;draw();schedule()}});on(document,'visibilitychange',schedule);
  const observer=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;if(visible&&!requested){requested=true;createTransportScene(root,()=>state).then(scene=>{if(disposed)scene?.dispose();else{spatial=scene;if(!scene)root.dataset.transportSpatial='fallback';draw()}}).catch(error=>{root.dataset.transportSpatial='fallback';root.dataset.transportError=error.message;draw()})}schedule()});observer.observe(root);
  for(const el of root.querySelectorAll('[data-tp-controls]'))el.hidden=false;draw();root.dataset.transportReady='true';
  cleanups.push(()=>{disposed=true;stop();observer.disconnect();controller.abort();spatial?.dispose()});
 }
 return ()=>cleanups.forEach(fn=>fn());
}
