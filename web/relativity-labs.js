import {labRecords,defaultsFor,validateLabState} from './lab-records.js';
import {starProfile,cosmicDistances,photonExchange,evolveDust} from './relativity-models.js';
const escape=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const format=value=>Math.abs(value)!==0&&(Math.abs(value)<.001||Math.abs(value)>=1e6)?value.toExponential(3):Number(value.toPrecision(5)).toString();
export function calculateLab(id,params=defaultsFor(id)){
 if(id==='star'){
  const value=starProfile(params),fine=starProfile({...params,step:params.step/2});
  return {value,columns:['r','m','rho','p'],rows:value.rows,readouts:[['Surface radius R',value.radius],['Gravitating mass M',value.mass],['Compactness 2M/R',value.compactness],['Change in R when step is halved',fine.radius-value.radius]],xLabel:'radius / surface radius',yLabel:'normalized profile',series:[['Pressure / central pressure',value.rows.map(r=>[r.r/value.radius,r.p/(params.central**2)])],['Density / central density',value.rows.map(r=>[r.r/value.radius,r.rho/params.central])],['Enclosed mass / total mass',value.rows.map(r=>[r.r/value.radius,r.m/value.mass])]]};
 }
 if(id==='distances'){
  const value=cosmicDistances(params),rows=Array.from({length:61},(_,i)=>cosmicDistances({...params,z:params.z*i/60}));
  return {value,columns:['z','H','comoving','angular','luminosity'],rows,readouts:[['Comoving radial distance · Mpc',value.comoving],['Angular-diameter distance · Mpc',value.angular],['Luminosity distance · Mpc',value.luminosity],['Curvature fraction Ωₖ',value.curvature]],xLabel:'redshift z',yLabel:'distance · Gpc',series:[['Comoving radial',rows.map(r=>[r.z,r.comoving/1000])],['Angular-diameter',rows.map(r=>[r.z,r.angular/1000])],['Luminosity',rows.map(r=>[r.z,r.luminosity/1000])]]};
 }
 if(id==='photon'){
  const value=photonExchange(params),rows=Array.from({length:61},(_,i)=>{const r=params.emitter+(params.receiver-params.emitter)*i/60;return {radius:r,...photonExchange({...params,receiver:r+(i===0?value.direction*1e-12:0)})}});
  return {value,columns:['radius','frequencyRatio','gravity','motion','receiverCoordinateSpeed','localLightSpeed'],rows,readouts:[['Received / emitted frequency',value.frequencyRatio],['Gravitational factor',value.gravity],['Motion factor',value.motion],['Locally measured light speed / c',value.localLightSpeed]],xLabel:'receiving radius / rₛ',yLabel:'frequency / emitted frequency',series:[['Specified receiving observers',rows.map(r=>[r.radius,r.frequencyRatio])],['Both observers static',rows.map(r=>[r.radius,r.gravity])]]};
 }
 const value=evolveDust(params),fine=evolveDust({...params,step:params.step/2});
 return {value,columns:['t','scale','exact','error','constraint'],rows:value.rows,readouts:[['Final scale factor A',value.scale],['Error against the exact solution',value.error],['Friedmann constraint residual',value.constraint],['Change in A when step is halved',fine.scale-value.scale]],xLabel:'dimensionless time',yLabel:params.view==='constraint'?'constraint residual':'scale factor A',series:params.view==='constraint'?[['Numerical constraint',value.rows.map(r=>[r.t,r.constraint])],['Exact constraint',value.rows.map(r=>[r.t,0])]]:[['Numerical scale factor',value.rows.map(r=>[r.t,r.scale])],['Exact scale factor',value.rows.map(r=>[r.t,r.exact])]]};
}
function chart(id,result){
 const points=result.series.flatMap(s=>s[1]),xs=points.map(p=>p[0]),ys=points.map(p=>p[1]);
 let xmin=Math.min(...xs),xmax=Math.max(...xs),ymin=Math.min(0,...ys),ymax=Math.max(...ys);
 if(xmax-xmin<1e-10){xmin-=.5;xmax+=.5;}if(ymax-ymin<1e-12){ymin-=.5;ymax+=.5;}
 const padding=(ymax-ymin)*.08;if(ymin<0)ymin-=padding;ymax+=padding;
 const tick=value=>Number(value.toPrecision(3)).toString();
 function plot(width,compact){
  const left=compact?78:82,right=width-22,bottom=264,top=48;
  const x=v=>left+(right-left)*(v-xmin)/(xmax-xmin),y=v=>bottom-(bottom-top)*(v-ymin)/(ymax-ymin);
  const count=compact?3:5,key=`${id}-${width}`;
  const ticks=Array.from({length:count},(_,i)=>{const xv=xmin+(xmax-xmin)*i/(count-1),yv=ymin+(ymax-ymin)*i/(count-1);return `<path class="lab-gridline" d="M${left} ${y(yv)}H${right}"/><text x="${left-10}" y="${y(yv)+5}" text-anchor="end">${tick(yv)}</text><text x="${x(xv)}" y="289" text-anchor="middle">${tick(xv)}</text>`}).join('');
  return `<svg class="lab-chart lab-chart--${compact?'compact':'wide'}" viewBox="0 0 ${width} 332" role="img" aria-labelledby="${key}-title ${key}-desc"><title id="${key}-title">${escape(labRecords[id].title)}</title><desc id="${key}-desc">${escape(result.yLabel)} versus ${escape(result.xLabel)}. The adjacent legend identifies each curve. Readouts and the expandable data table provide numerical values.</desc>${ticks}${result.series.map(([label,values],i)=>`<path class="lab-series lab-series-${i}" d="${values.map(([a,b],n)=>`${n?'L':'M'}${x(a).toFixed(3)},${y(b).toFixed(3)}`).join(' ')}"/>`).join('')}<text x="${(left+right)/2}" y="321" text-anchor="middle">${escape(result.xLabel)}</text><text x="16" y="22">${escape(result.yLabel)}</text></svg>`;
 }
 return plot(600,false)+plot(360,true)+`<ul class="lab-legend">${result.series.map(([label],i)=>`<li><span class="lab-swatch lab-series-${i}"></span>${escape(label)}</li>`).join('')}</ul>`;
}
export function labResultHTML(id,params=defaultsFor(id)){
 const result=calculateLab(id,params),sample=result.rows.filter((_,i)=>i%Math.max(1,Math.floor(result.rows.length/10))===0||i===result.rows.length-1);
 return `<div class="lab-readouts">${result.readouts.map(([name,value])=>`<div><span>${escape(name)}</span><strong>${format(value)}</strong></div>`).join('')}</div>${chart(id,result)}<details class="lab-data"><summary>Read the numerical data</summary><p>Selected samples; export the complete calculation as CSV. Units are declared above.</p><div class="table-scroll"><table><thead><tr>${result.columns.map(c=>`<th scope="col">${escape(c)}</th>`).join('')}</tr></thead><tbody>${sample.map(row=>`<tr>${result.columns.map(c=>`<td>${format(row[c])}</td>`).join('')}</tr>`).join('')}</tbody></table></div></details>`;
}
export function initRelativityLabs(){
 const controller=new AbortController(),on=(node,event,fn)=>node.addEventListener(event,fn,{signal:controller.signal});
 for(const root of document.querySelectorAll('[data-relativity-lab]')){
  const id=root.dataset.relativityLab,record=labRecords[id];if(!record)continue;
  let state=defaultsFor(id),note='';try{const saved=JSON.parse(localStorage.getItem('gr-course-v1'))?.experiments?.[id];state=validateLabState(id,saved?.parameters||JSON.parse(localStorage.getItem(`gr-lab-${id}-v1`)));note=saved?.note||'';}catch{}
  const observation=root.querySelector('[data-lab-observation]');observation.value=note;
  const save=()=>document.dispatchEvent(new CustomEvent('gr:experiment-change',{detail:{id,version:record.version,parameters:state,note:observation.value,saved:Date.now()}}));
  on(observation,'input',save);
  const form=root.querySelector('[data-lab-controls]'),out=root.querySelector('[data-lab-result]'),status=root.querySelector('[data-lab-status]');
  function syncControls(){for(const p of record.parameters){const input=form.elements.namedItem(`parameter-${p.id}`);if(input)input.value=state[p.id];const value=form.querySelector(`[data-lab-value="${p.id}"]`);if(value)value.textContent=state[p.id];}}
  function refresh(saveChanges=true){
   try{
    const result=calculateLab(id,state);out.innerHTML=labResultHTML(id,state);
    root.dataset.scientificContext=JSON.stringify({id,version:record.version,parameters:state,readouts:result.readouts,units:record.units,assumptions:record.assumptions,limitations:record.limitation,equations:record.equations,source:record.source});
    root.dataset.labReady='true';status.textContent='';
    if(saveChanges)try{localStorage.setItem(`gr-lab-${id}-v1`,JSON.stringify(state))}catch{status.textContent='These settings could not be saved in this browser. You can still export the calculation.';}
    if(saveChanges)save();
   }catch(error){status.textContent=error.message;}
  }
  on(form,'input',()=>{state=validateLabState(id,Object.fromEntries(record.parameters.map(p=>[p.id,typeof p.value==='number'?Number(form.elements.namedItem(`parameter-${p.id}`).value):form.elements.namedItem(`parameter-${p.id}`).value])));syncControls();refresh()});
  on(form,'submit',event=>event.preventDefault());
  on(root.querySelector('[data-lab-reset]'),'click',()=>{state=defaultsFor(id);syncControls();refresh()});
  on(root.querySelector('[data-lab-export]'),'click',()=>{
   const result=calculateLab(id,state),header={record:id,version:record.version,parameters:state,units:record.units,assumptions:record.assumptions,source:record.source.url};
   const csv='# '+JSON.stringify(header)+'\n'+result.columns.join(',')+'\n'+result.rows.map(row=>result.columns.map(c=>row[c]).join(',')).join('\n');
   const url=URL.createObjectURL(new Blob([csv],{type:'text/csv'})),link=document.createElement('a');link.href=url;link.download=`gr-${id}-experiment.csv`;link.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
  });
  form.hidden=false;root.querySelector('[data-lab-actions]').hidden=false;syncControls();refresh(false);
 }
 return ()=>controller.abort();
}
