import {polarDefaults,polarState,polarMeasurements,polarFromPoint} from './geometry-foundations-model.js';
import {initVectorFields} from './vector-field-experience.js';
import {initParallelTransport} from './parallel-transport-experience.js';
import {initFlowOrder} from './flow-order-experience.js';

const fmt=(n,d=2)=>(Math.abs(n)<.5*10**-d?0:n).toFixed(d);
const path=points=>points.map((p,i)=>`${i?'L':'M'}${p.map(x=>fmt(x,3)).join(',')}`).join(' ');
const line=(a,b,cls)=>`<path class="${cls}" d="M${a}L${b}"/>`;
const circle=(p,r,cls)=>`<circle class="${cls}" cx="${p[0]}" cy="${p[1]}" r="${r}"/>`;
const label=(p,text,cls='',anchor='middle')=>`<text class="gf-label ${cls}" x="${p[0]}" y="${p[1]}" text-anchor="${anchor}">${text}</text>`;
const to=([x,y])=>[260+72*x,240-72*y];
const arc=(r,start,end)=>path(Array.from({length:101},(_,i)=>to([r*Math.cos(start+(end-start)*i/100),r*Math.sin(start+(end-start)*i/100)])));

export function polarView(value=polarDefaults) {
  const s=polarState(value),v=polarMeasurements(s),P=to(v.point),Q=to(v.next),O=to([0,0]),step=s.view==='step';
  let grid='';
  for(let k=-3;k<=3;k++)grid+=line(to([k,-3]),to([k,3]),'gf-square-grid')+line(to([-3,k]),to([3,k]),'gf-square-grid');
  for(let k=1;k<=3;k++)grid+=circle(O,72*k,'gf-polar-grid');
  for(let k=0;k<12;k++)grid+=line(O,to([3*Math.cos(k*Math.PI/6),3*Math.sin(k*Math.PI/6)]),'gf-polar-grid');
  const rx=to([s.radius*.55*Math.cos(s.angle),s.radius*.55*Math.sin(s.angle)]),rlabel=[rx[0]+18*Math.sin(s.angle),rx[1]+18*Math.cos(s.angle)];
  const plabel=[P[0]+17*Math.cos(s.angle),P[1]-17*Math.sin(s.angle)+5];
  let drawing='';
  if(v.angleDefined){
    drawing+=line(O,P,'gf-radius')+label(rlabel,'r','gf-teal');
    if(!step){drawing+=`<path class="gf-angle" d="${arc(.47,0,s.angle)}"/>`+label(to([.7*Math.cos(s.angle/2),.7*Math.sin(s.angle/2)]),'θ','gf-gold');
      drawing+=`<path class="gf-projection" d="M260 ${P[1]}H${P[0]}V240"/>`;
    }else{
      const mid=s.angle+s.step/2;
      drawing+=`<path class="gf-swept-area" d="M${O}L${P}${arc(s.radius,s.angle,s.angle+s.step).replace(/^M[^L]+/,'')}Z"/>`;
      drawing+=line(O,Q,'gf-next-radius')+line(P,Q,'gf-chord')+`<path class="gf-arc" d="${arc(s.radius,s.angle,s.angle+s.step)}"/>`;
      drawing+=`<path class="gf-angle" d="${arc(.47,s.angle,s.angle+s.step)}"/>`+label(to([.85*Math.cos(mid),.85*Math.sin(mid)]),'Δθ','gf-gold');
      drawing+=circle(Q,5,'gf-next-point')+label([Q[0]+18*Math.cos(s.angle+s.step),Q[1]-18*Math.sin(s.angle+s.step)+5],'Q','gf-blue');
    }
  }
  return `<svg viewBox="0 0 520 490" class="gf-polar" role="img" aria-label="Polar coordinates on a flat plane. P is at x ${fmt(v.point[0])}, y ${fmt(v.point[1])} metres. ${v.angleDefined?`Radius ${fmt(s.radius)} metres, angle ${fmt(s.angle)} radians.`:'P is at the origin; its angle is undefined.'} ${step?`An angular step of ${fmt(s.step)} radians gives an arc of ${fmt(v.arc,3)} metres and a chord of ${fmt(v.chord,3)} metres.`:''}">
    ${grid}<path class="gf-axis" d="M30 240H492M260 468V12"/>
    ${label([504,246],'x [m]','','end')}${label([273,27],'y [m]','','start')}
    ${[-2,-1,1,2].map(k=>label([260+72*k,260],String(k),'gf-tick')+label([249,245-72*k],String(k),'gf-tick','end')).join('')}
    ${drawing}${circle(O,3,'gf-origin')}${label([247,229],'O','gf-muted')}
    ${circle(P,7,'gf-point')}${label(v.angleDefined?plabel:[284,247],'P','gf-rose')}
    ${step?'':label([260,486],'Square grid: x and y · circles and spokes: r and θ','gf-key')}
  </svg>`;
}

export function polarReadout(value=polarDefaults) {
  const s=polarState(value),v=polarMeasurements(s);
  return s.view==='step'?`<div><span>Along the circle · r Δθ</span><strong class="gf-teal">${fmt(v.arc,3)} m</strong></div><div><span>Straight from P to Q</span><strong class="gf-blue">${fmt(v.chord,3)} m</strong></div>`:`<div><span>Horizontal position x</span><strong>${fmt(v.point[0])} m</strong></div><div><span>Vertical position y</span><strong>${fmt(v.point[1])} m</strong></div>`;
}
export function polarInsight(value=polarDefaults) {
  const s=polarState(value),v=polarMeasurements(s);
  if(!v.angleDefined)return 'P is at the origin. Every spoke meets here, so there is no single angle to assign. The plane itself is perfectly ordinary at this point.';
  return s.view==='step'?'Keep the angular step fixed and increase r. The arc grows: the same turn takes you farther around a larger circle. Shrink Δθ to see the arc and the straight chord approach the same length.':'Move P, or use the sliders. The square grid and the polar grid give two addresses for the same point. A full turn is 2π radians; it brings P back to the same place.';
}
export function polarSource(value=polarDefaults) {
  const s=polarState(value),v=polarMeasurements(s);
  return `The square and polar grids describe the same flat plane. The selected point has horizontal position ${fmt(v.point[0])} and vertical position ${fmt(v.point[1])} metres. Its radius is ${fmt(s.radius)} metres. ${v.angleDefined?`Its angle is ${fmt(s.angle)} radians, measured counterclockwise from the positive horizontal axis.`:'At the origin no unique angle exists.'} ${s.view==='step'?`The angular step is ${fmt(s.step)} radians. The arc length is ${fmt(v.arc,3)} metres and the straight chord is ${fmt(v.chord,3)} metres. The arc length equals radius times angular step.`:''} ${polarInsight(s)}`;
}

export function initGeometryFoundations() {
  const cleanups=[initVectorFields(),initParallelTransport(),initFlowOrder()];
  for(const root of document.querySelectorAll('[data-polar-experience]')){
    let state={...polarDefaults},dragging=false;
    try{state=polarState(JSON.parse(localStorage.getItem('gr-course-v1'))?.visuals?.[root.id]?.state);}catch{}
    const controller=new AbortController(),on=(target,event,fn)=>target.addEventListener(event,fn,{signal:controller.signal});
    const plot=root.querySelector('[data-gf-plot]'),status=root.querySelector('[data-gf-status]');
    function draw(user=false){
      const v=polarMeasurements(state);
      plot.innerHTML=polarView(state);root.querySelector('[data-gf-readout]').innerHTML=polarReadout(state);
      root.querySelector('[data-gf-insight]').textContent=polarInsight(state);
      for(const input of root.querySelectorAll('[data-gf-parameter]')){
        const key=input.dataset.gfParameter;input.value=state[key];input.style.setProperty('--range-fill',`${100*(input.value-input.min)/(input.max-input.min)}%`);
        root.querySelector(`[data-gf-value="${key}"]`).textContent=key==='angle'&&!v.angleDefined?'Undefined':`${fmt(state[key])} ${key==='radius'?'m':'rad'}`;
        input.disabled=key==='angle'&&!v.angleDefined;
      }
      for(const button of root.querySelectorAll('[data-gf-view]'))button.setAttribute('aria-pressed',String(button.dataset.gfView===state.view));
      root.querySelector('[data-gf-step]').hidden=state.view!=='step';
      root.dataset.visualState=JSON.stringify(state);root.dataset.narrationSource=polarSource(state);
      root.dataset.scientificContext=JSON.stringify({id:root.id,version:1,model:'Euclidean plane in Cartesian and polar coordinates',parameters:state,readouts:v,units:'Lengths in metres; angles in radians',assumptions:['Flat two-dimensional plane','Counterclockwise angles from positive x','Arc length and straight chord are distinct finite distances'],equations:['x=r cos θ','y=r sin θ','arc=r Δθ','chord=2r sin(Δθ/2)']});
      if(user){document.dispatchEvent(new CustomEvent('gr:visual-change',{detail:{id:root.id,type:'polar',state:{...state}}}));status.textContent=`Radius ${fmt(state.radius)} metres. ${v.angleDefined?`Angle ${fmt(state.angle)} radians.`:'Angle undefined at the origin.'}`;}
    }
    for(const input of root.querySelectorAll('[data-gf-parameter]'))on(input,'input',()=>{state=polarState({...state,[input.dataset.gfParameter]:+input.value});draw(true)});
    for(const button of root.querySelectorAll('[data-gf-view]'))on(button,'click',()=>{state.view=button.dataset.gfView;draw(true)});
    on(root.querySelector('[data-gf-reset]'),'click',()=>{state={...polarDefaults};draw(true)});
    function move(event){const svg=plot.querySelector('svg'),p=new DOMPoint(event.clientX,event.clientY).matrixTransform(svg.getScreenCTM().inverse());state=polarState({...state,...polarFromPoint((p.x-260)/72,(240-p.y)/72)});draw(true)}
    on(plot,'pointerdown',event=>{if(event.button!==0)return;dragging=true;plot.setPointerCapture(event.pointerId);move(event)});
    on(plot,'pointermove',event=>{if(dragging)move(event)});
    on(plot,'pointerup',()=>{dragging=false});on(plot,'pointercancel',()=>{dragging=false});on(plot,'lostpointercapture',()=>{dragging=false});
    root.querySelector('[data-gf-controls]').hidden=false;root.querySelector('[data-gf-viewbar]').hidden=false;
    draw();root.dataset.polarReady='true';cleanups.push(()=>controller.abort());
  }
  return ()=>cleanups.forEach(fn=>fn());
}
