export const flowOrderDefaults=Object.freeze({step:.6,progress:2});
const bounded=(x,a,b,f)=>Number.isFinite(x)?Math.max(a,Math.min(b,x)):f;
export function flowOrderState(s={}){return {step:bounded(s.step,.05,1,.6),progress:bounded(s.progress,0,2,2)};}
export function flowOrderMeasurements(value=flowOrderDefaults){
 const {step:h,progress:t}=flowOrderState(value);
 return {start:[1,0],firstXY:[1+h,0],firstYX:[1,h],endXY:[1+h,h*(1+h)],endYX:[1+h,h],currentXY:t<=1?[1+h*t,0]:[1+h,h*(1+h)*(t-1)],currentYX:t<=1?[1,h*t]:[1+h*(t-1),h],gap:h*h,normalizedGap:1};
}
const fmt=(n,d=2)=>(Math.abs(n)<.5*10**-d?0:n).toFixed(d);
const to=([x,y])=>[65+145*x,354-145*y];
const path=points=>points.map((p,i)=>`${i?'L':'M'}${p.map(x=>fmt(x,3)).join(',')}`).join(' ');
const dot=(p,cls,r=5)=>{const q=to(p);return `<circle class="${cls}" cx="${q[0]}" cy="${q[1]}" r="${r}"/>`};
const arrow=(p,dx,dy,cls)=>{const a=to(p),b=[a[0]+145*dx,a[1]-145*dy],length=Math.hypot(b[0]-a[0],b[1]-a[1]);if(length<1)return '';const x=(b[0]-a[0])/length,y=(b[1]-a[1])/length,h=Math.min(5,length*.4);return `<path class="fo-arrow ${cls}" d="${path([a,b,[b[0]-h*x+2*y,b[1]-h*y-2*x],b,[b[0]-h*x-2*y,b[1]-h*y+2*x]])}"/>`};
export function flowOrderView(value=flowOrderDefaults){
 const s=flowOrderState(value),v=flowOrderMeasurements(s),A=to(v.endXY),B=to(v.endYX);
 let field='';for(let x=.5;x<=2.5;x+=.5)for(let y=.2;y<1.9;y+=.4)field+=arrow([x,y],0,.14*x,'fo-field');
 let grid='';for(let x=0;x<=2.5;x+=.5)grid+=`<path class="gf-square-grid" d="${path([to([x,0]),to([x,2.1])])}"/>`;for(let y=0;y<=2;y+=.5)grid+=`<path class="gf-square-grid" d="${path([to([0,y]),to([2.55,y])])}"/>`;
 const track=(points,cls)=>`<path class="fo-route ${cls}" d="${path(points.map(to))}"/>`;
 const traceA=s.progress<=1?[v.start,v.currentXY]:[v.start,v.firstXY,v.currentXY],traceB=s.progress<=1?[v.start,v.currentYX]:[v.start,v.firstYX,v.currentYX];
 return `<svg class="fo-plot" viewBox="0 0 520 418" role="img" aria-label="Two flow orders from P equals 1,0. Move right then upward: endpoint A equals ${v.endXY.map(x=>fmt(x)).join(',')}. Upward then right: endpoint B equals ${v.endYX.map(x=>fmt(x)).join(',')}. Final vertical gap ${fmt(v.gap,4)}, equal to the step squared. The faint upward field grows with x.">
  ${grid}${field}<path class="gf-axis" d="M50 354H472M65 370V35"/>
  <text class="gf-label" x="483" y="360">x</text><text class="gf-label" x="55" y="25">y</text>
  ${[0,1,2].map(x=>`<text class="gf-label gf-tick" text-anchor="middle" x="${65+145*x}" y="379">${x}</text>`).join('')}
  ${[1,2].map(y=>`<text class="gf-label gf-tick" text-anchor="end" x="51" y="${360-145*y}">${y}</text>`).join('')}
  ${track([v.start,v.firstXY,v.endXY],'fo-xy fo-planned')}${track([v.start,v.firstYX,v.endYX],'fo-yx fo-planned')}
  ${track(traceA,'fo-xy')}${track(traceB,'fo-yx')}${dot(v.start,'gf-origin',4)}${dot(v.currentXY,'fo-dot-xy',6)}${dot(v.currentYX,'fo-dot-yx',4)}
  ${dot(v.endXY,'fo-end-xy',4)}${dot(v.endYX,'fo-end-yx',4)}
  <text class="gf-label gf-rose" x="${A[0]+12}" y="${A[1]-12}">A</text><text class="gf-label gf-blue" x="${B[0]+12}" y="${B[1]+20}">B</text>
  <path class="fo-gap" d="M${A[0]+28} ${A[1]}h8M${A[0]+32} ${A[1]}V${B[1]}M${B[0]+28} ${B[1]}h8"/>
  <text class="gf-label gf-teal" x="${A[0]+44}" y="${(A[1]+B[1])/2+5}">h²</text>
  <text class="gf-label" x="193" y="405" text-anchor="middle">P = (1, 0)</text>
 </svg>`;
}
export function flowOrderReadout(value=flowOrderDefaults){const v=flowOrderMeasurements(value);return `<div><span>Final vertical gap · h²</span><strong class="gf-teal">${fmt(v.gap,4)}</strong></div><div><span>Gap divided by h²</span><strong>1.0000</strong></div>`;}
export function flowOrderSource(value=flowOrderDefaults){const s=flowOrderState(value),v=flowOrderMeasurements(s);return `Compare two flows on a flat plane. X increases x at unit rate; Y increases y at rate x. Both start at P equals 1,0. The step is ${fmt(s.step)}. X then Y ends at ${v.endXY.map(x=>fmt(x)).join(',')}; Y then X ends at ${v.endYX.map(x=>fmt(x)).join(',')}. Their vertical gap is ${fmt(v.gap,4)}, equal to h squared. This mismatch comes from the position-dependent flow instructions, not curvature. Coordinates and the flow parameter are dimensionless.`;}
export function initFlowOrder(){
 const cleanup=[];
 for(const root of document.querySelectorAll('[data-flow-order]')){
  let state={...flowOrderDefaults},playing=false,visible=false,raf=0,previous=0;try{state=flowOrderState(JSON.parse(localStorage.getItem('gr-course-v1'))?.visuals?.[root.id]?.state)}catch{}
  const abort=new AbortController(),on=(el,name,fn)=>el.addEventListener(name,fn,{signal:abort.signal});
  function draw(user=false){
   const v=flowOrderMeasurements(state);root.querySelector('[data-fo-plot]').innerHTML=flowOrderView(state);root.querySelector('[data-fo-readout]').innerHTML=flowOrderReadout(state);
   for(const input of root.querySelectorAll('[data-fo-parameter]')){const key=input.dataset.foParameter;input.value=state[key];input.style.setProperty('--range-fill',`${100*(input.value-input.min)/(input.max-input.min)}%`);root.querySelector(`[data-fo-value="${key}"]`).textContent=key==='step'?fmt(state.step):`${fmt(state.progress,1)} / 2`;if(key==='progress')input.setAttribute('aria-valuetext',state.progress===2?'Both moves complete':state.progress<1?'Following the first move':'Following the second move');}
   const play=root.querySelector('[data-fo-play]');play.textContent=playing?'Pause':state.progress===2?'Replay':'Play';play.setAttribute('aria-pressed',String(playing));
   root.dataset.visualState=JSON.stringify(state);root.dataset.narrationSource=flowOrderSource(state);root.dataset.scientificContext=JSON.stringify({id:root.id,version:1,model:'Exact flows X=(1,0), Y=(0,x) in a flat dimensionless plane',parameters:state,readouts:v,assumptions:['Flow parameter is not physical time','Both orders use the same step for each field','Endpoints compared after both complete flows'],equations:['XY endpoint=(1+h,h(1+h))','YX endpoint=(1+h,h)','[X,Y]=(0,1)']});
   if(user){document.dispatchEvent(new CustomEvent('gr:visual-change',{detail:{id:root.id,type:'flow-order',state:{...state}}}));root.querySelector('[data-fo-status]').textContent=`Step ${fmt(state.step)}; final gap ${fmt(v.gap,4)}.`;}
  }
  function stop(){cancelAnimationFrame(raf);raf=0;previous=0}
  function tick(time){raf=0;if(!playing||!visible||document.hidden)return;if(previous)state.progress=Math.min(2,state.progress+Math.min(.06,(time-previous)/1000)/2);previous=time;if(state.progress===2)playing=false;draw(state.progress===2);if(playing)raf=requestAnimationFrame(tick)}
  function schedule(){stop();if(playing&&visible&&!document.hidden)raf=requestAnimationFrame(tick)}
  on(root.querySelector('[data-fo-play]'),'click',()=>{playing=!playing;if(playing&&state.progress===2)state.progress=0;draw(true);schedule()});
  on(root.querySelector('[data-fo-next]'),'click',()=>{playing=false;state.progress=state.progress>=2?0:Math.floor(state.progress)+1;draw(true);schedule()});
  on(root.querySelector('[data-fo-reset]'),'click',()=>{state={...flowOrderDefaults};playing=false;draw(true);schedule()});
  for(const input of root.querySelectorAll('[data-fo-parameter]'))on(input,'input',()=>{state=flowOrderState({...state,[input.dataset.foParameter]:+input.value});playing=false;draw(true);schedule()});
  on(document,'visibilitychange',schedule);const reduced=matchMedia('(prefers-reduced-motion: reduce)');on(reduced,'change',()=>{if(reduced.matches){playing=false;draw();schedule()}});
  const observer=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;schedule()});observer.observe(root);
  for(const el of root.querySelectorAll('[data-fo-controls]'))el.hidden=false;draw();root.dataset.flowOrderReady='true';
  cleanup.push(()=>{stop();abort.abort();observer.disconnect()});
 }
 return ()=>cleanup.forEach(fn=>fn());
}
