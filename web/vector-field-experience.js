import {fieldDefaults,fieldState,fieldNames,fieldMeasurements,fieldVelocity,polarUnitFrame} from './geometry-foundations-model.js';
const fmt=(n,d=2)=>(Math.abs(n)<.5*10**-d?0:n).toFixed(d);
const pair=v=>`(${v.map(x=>fmt(x)).join(', ')})`;
const point=(p,r,cls)=>`<circle class="${cls}" cx="${p[0]}" cy="${p[1]}" r="${r}"/>`;
const text=(x,y,s,cls='',anchor='middle')=>`<text x="${x}" y="${y}" text-anchor="${anchor}" class="gf-label ${cls}">${s}</text>`;
const line=(a,b,cls)=>`<path class="${cls}" d="M${a}L${b}"/>`;
const arrow=(p,v,scale,cls)=>{
 const dx=v[0]*scale,dy=-v[1]*scale,L=Math.hypot(dx,dy);if(L<1e-9)return '';
 const h=Math.min(7,L*.38),ux=dx/L,uy=dy/L,x=p[0]+dx,y=p[1]+dy;
 return `<path class="gf-vector ${cls}" d="M${p}L${x},${y}M${x-h*ux-h*.45*uy},${y-h*uy+h*.45*ux}L${x},${y}L${x-h*ux+h*.45*uy},${y-h*uy-h*.45*ux}"/>`;
};
export function fieldView(value=fieldDefaults) {
 const s=fieldState(value),v=fieldMeasurements(s),to=([x,y])=>[240+60*x,225-60*y],P=to(v.P),Q=to(v.Q);
 let grid='';
 for(let k=-3;k<=3;k++)grid+=line(to([k,-3.3]),to([k,3.3]),'gf-square-grid')+line(to([-3.3,k]),to([3.3,k]),'gf-square-grid');
 let field='';
 for(let x=-2.8;x<=2.8;x+=.7)for(let y=-2.8;y<=2.8;y+=.7)field+=arrow(to([x,y]),fieldVelocity(s.field,[x,y]),30,'vf-sample');
 const frames=[s.angle,s.angle+s.separation].map((t,i)=>{
  const p=i?Q:P,B=polarUnitFrame(t);
  return B.map(e=>arrow(p,e,26,'vf-frame')).join('')+(i?'':text(p[0]+37*B[0][0],p[1]-37*B[0][1]+4,'eᵣ','gf-gold')+text(p[0]+38*B[1][0],p[1]-38*B[1][1]+4,'eθ','gf-gold'));
 }).join('');
 const path=Array.from({length:60},(_,i)=>to([1.8*Math.cos(s.angle+s.separation*i/59),1.8*Math.sin(s.angle+s.separation*i/59)])).map((p,i)=>`${i?'L':'M'}${p}`).join(' ');
 return `<svg class="vf-field" viewBox="0 0 480 455" role="img" aria-label="${fieldNames[s.field]}. Each arrow is the velocity at its tail. Points P and Q are on a circle of radius 1.8 metres, separated by ${fmt(s.separation)} radians. Thin gold arrows show local radial and tangential unit directions.">
  ${grid}<path class="gf-axis" d="M29 225H449M240 428V22"/>
  ${point([240,225],108,'vf-circle')}${field}<path class="vf-route" d="${path}"/>
  ${frames}${arrow(P,v.atP,30,'vf-at-p')}${arrow(Q,v.atQ,30,'vf-at-q')}
  ${point(P,4,'gf-point')}${point(Q,4,'gf-next-point')}
  ${text(P[0]-17*Math.cos(s.angle),P[1]+17*Math.sin(s.angle)+5,'P','gf-rose')}
  ${text(Q[0]+19*Math.cos(s.angle+s.separation),Q[1]-19*Math.sin(s.angle+s.separation)+5,'Q','gf-blue')}
  ${text(227,245,'O','gf-muted')}${text(448,245,'x [m]','gf-muted')}${text(253,27,'y [m]','gf-muted','start')}
  ${[-2,2].map(k=>text(240+k*60,246,String(k),'gf-tick')+text(228,230-k*60,String(k),'gf-tick','end')).join('')}
 </svg>`;
}
export function fieldComparison(value=fieldDefaults,product=false) {
 const v=fieldMeasurements(value),O=[155,160],scale=90,at=a=>[O[0]+scale*a[0],O[1]-scale*a[1]];
 const first=product?v.components:v.atP,second=product?v.basis:v.atQ;
 const title=product?'Component change plus basis change':'Velocities translated to a common origin';
 return `<svg class="vf-comparison" viewBox="0 0 310 320" role="img" aria-label="${title}. ${product?`Change from components ${pair(v.components)} plus change from basis ${pair(v.basis)} equals the actual change ${pair(v.difference)} metres per second.`:`Velocity at P ${pair(v.atP)}, at Q ${pair(v.atQ)} metres per second. Their difference is ${pair(v.difference)}.`}">
  <path class="gf-square-grid" d="M65 55V264M245 55V264M45 70H265M45 250H265"/>
  <path class="gf-axis" d="M38 160H272M155 47V274"/>
  ${text(269,183,'x','gf-muted')}${text(170,53,'y','gf-muted')}
  ${product?arrow(O,first,scale,'vf-component-change')+arrow(at(first),second,scale,'vf-basis-change')+arrow(O,v.difference,scale,'vf-difference'):arrow(O,first,scale,'vf-at-p')+arrow(O,second,scale,'vf-at-q')+arrow(at(first),v.difference,scale,'vf-difference')}
  ${point(O,3,'gf-origin')}${text(143,181,'0','gf-muted')}
  ${text(65,180,'−1','gf-tick')}${text(245,180,'1','gf-tick')}
  ${text(141,76,'1','gf-tick','end')}${text(141,256,'−1','gf-tick','end')}
  ${text(155,307,'Velocity components [m/s]','gf-key')}
 </svg>`;
}
export function fieldReadout(value=fieldDefaults) {
 const v=fieldMeasurements(value);
 return `<div><span>At P · radial, tangential</span><strong class="gf-rose">${pair(v.c0)} <small>m/s</small></strong></div><div><span>At Q · radial, tangential</span><strong class="gf-blue">${pair(v.c1)} <small>m/s</small></strong></div>`;
}
export function fieldInsight(value=fieldDefaults){
 const s=fieldState(value),v=fieldMeasurements(s);
 return s.field==='uniform'?'The pink and blue velocity arrows coincide when brought to one origin. The field is unchanged. The two pairs of polar components differ because “outward” and “around” point in different directions at P and Q.':s.field==='rotation'?'Here the physical arrow turns from P to Q. Its polar components stay the same: all the velocity is tangential at a fixed radius. Constant components can describe a changing vector.':s.field==='expansion'?'At this fixed radius, every arrow points outward with the same speed. The polar components stay the same, while the physical direction changes around the circle.':`The horizontal speed depends on height. P and Q generally have different velocities. Their actual difference is ${pair(v.difference)} m/s in the fixed x and y directions.`;
}
export function fieldSource(value=fieldDefaults){const s=fieldState(value),v=fieldMeasurements(s);return `${fieldNames[s.field]} on a flat plane. The arrows show velocity at each position, not individual particles. At P the Cartesian velocity is ${pair(v.atP)} metres per second and its radial and tangential components are ${pair(v.c0)}. At Q these are ${pair(v.atQ)} and ${pair(v.c1)}. The actual velocity change in Cartesian directions is ${pair(v.difference)}. ${fieldInsight(s)}`;}
export function fieldProductReadout(value=fieldDefaults){const v=fieldMeasurements(value);return `${pair(v.components)} + ${pair(v.basis)} = ${pair(v.difference)} m/s`;}

export function initVectorFields(){
 const cleanups=[];
 for(const root of document.querySelectorAll('[data-vector-field-experience]')){
  let state={...fieldDefaults};try{state=fieldState(JSON.parse(localStorage.getItem('gr-course-v1'))?.visuals?.[root.id]?.state)}catch{}
  const abort=new AbortController(),on=(el,event,fn)=>el.addEventListener(event,fn,{signal:abort.signal});
  function draw(user=false){
   const v=fieldMeasurements(state);
   root.querySelector('[data-vf-field]').innerHTML=fieldView(state);
   root.querySelector('[data-vf-comparison]').innerHTML=fieldComparison(state);
   root.querySelector('[data-vf-product]').innerHTML=fieldComparison(state,true);
   root.querySelector('[data-vf-readout]').innerHTML=fieldReadout(state);
   root.querySelector('[data-vf-insight]').textContent=fieldInsight(state);
   root.querySelector('[data-vf-change]').textContent=`Actual change: ${pair(v.difference)} m/s`;
   root.querySelector('[data-vf-product-values]').textContent=fieldProductReadout(state);
   for(const button of root.querySelectorAll('[data-vf-choice]'))button.setAttribute('aria-pressed',String(state.field===button.dataset.vfChoice));
   for(const input of root.querySelectorAll('[data-vf-parameter]')){const key=input.dataset.vfParameter;input.value=state[key];input.style.setProperty('--range-fill',`${100*(input.value-input.min)/(input.max-input.min)}%`);root.querySelector(`[data-vf-value="${key}"]`).textContent=`${fmt(state[key])} rad`;}
   root.dataset.visualState=JSON.stringify(state);root.dataset.narrationSource=fieldSource(state);
   root.dataset.scientificContext=JSON.stringify({id:root.id,version:1,model:'Exact Euclidean velocity fields and polar unit frames',parameters:state,readouts:v,units:'Position m; velocity m/s; angle rad; expansion, rotation and shear rate 0.4/s',assumptions:['Flat plane, standard translation for comparing arrows','Unit polar frames; not the polar coordinate basis','Samples show velocity at a position, not individual particles'],equations:['V=B c','ΔV=B₀(c₁−c₀)+(B₁−B₀)c₁']});
   if(user){document.dispatchEvent(new CustomEvent('gr:visual-change',{detail:{id:root.id,type:'vector-field',state:{...state}}}));root.querySelector('[data-vf-status]').textContent=`${fieldNames[state.field]}. Actual velocity change ${pair(v.difference)} metres per second.`;}
  }
  for(const button of root.querySelectorAll('[data-vf-choice]'))on(button,'click',()=>{state.field=button.dataset.vfChoice;draw(true)});
  for(const input of root.querySelectorAll('[data-vf-parameter]'))on(input,'input',()=>{state=fieldState({...state,[input.dataset.vfParameter]:+input.value});draw(true)});
  on(root.querySelector('[data-vf-reset]'),'click',()=>{state={...fieldDefaults};draw(true)});
  for(const el of root.querySelectorAll('[data-vf-controls]'))el.hidden=false;
  draw();root.dataset.vectorFieldReady='true';cleanups.push(()=>abort.abort());
 }
 return ()=>cleanups.forEach(fn=>fn());
}
