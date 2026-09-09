// Collisionless massive particles in a periodic unit cube. Distances are in
// box widths L, times in L/c, and four-momenta in mc (each particle has mass m).
export const particleFlowDefaults=Object.freeze({preset:'stream',speed:.55,time:4,plane:.5,row:1,column:1,angle:Math.PI/4});
const clamp=(v,a,b,f)=>Number.isFinite(v)?Math.max(a,Math.min(b,v)):f;
export function particleFlowState(v={}){return {preset:['stream','balanced','slanted'].includes(v.preset)?v.preset:'stream',speed:clamp(v.speed,.1,.85,.55),time:clamp(v.time,0,30,4),plane:clamp(v.plane,.15,.85,.5),row:Math.round(clamp(v.row,0,3,1)),column:Math.round(clamp(v.column,0,3,1)),angle:clamp(v.angle,-Math.PI/2,Math.PI/2,Math.PI/4)};}
export const wrap=x=>((x%1)+1)%1;
function initialCoordinate(index){let x=(index+0x9e3779b9)>>>0;x=Math.imul(x^(x>>>16),0x21f0aaad);x=Math.imul(x^(x>>>15),0x735a2d97);return ((x^(x>>>15))>>>0)/4294967296;}
export function prepareParticles(value=particleFlowDefaults){
 const s=particleFlowState(value),gamma=1/Math.sqrt(1-s.speed**2);
 return Array.from({length:96},(_,i)=>{
  let direction=[1,0,0];
  if(s.preset==='balanced'){direction=[0,0,0];direction[Math.floor(i%6/2)]=(i%2?1:-1)}
  if(s.preset==='slanted'){const sign=i%2?1:-1;direction=[sign*Math.cos(s.angle),sign*Math.sin(s.angle),0]}
  const velocity=direction.map(x=>x*s.speed),momentum=[gamma,...velocity.map(x=>gamma*x)];
  return {id:i,initial:[0,1,2].map(axis=>initialCoordinate(3*i+axis+17)),velocity,momentum};
 });
}
export function particlePosition(p,time){return p.initial.map((x,i)=>wrap(x+p.velocity[i]*time));}
export function particleTensor(particles){return Array.from({length:4},(_,i)=>Array.from({length:4},(_,j)=>particles.reduce((total,p)=>total+p.momentum[i]*p.momentum[j]/p.momentum[0],0)));}
export function crossingCount(p,axis,plane,time){const a=p.initial[axis]-plane;const b=a+p.velocity[axis]*time;return p.velocity[axis]>=0?Math.floor(b)-Math.floor(a):Math.ceil(b)-Math.ceil(a);}
export function particleFlowMeasurements(value=particleFlowDefaults){
 const s=particleFlowState(value),particles=prepareParticles(s),tensor=particleTensor(particles),axis=Math.max(0,s.row-1),events=[];
 let positive=0,negative=0,sum=0;
 for(const p of particles){
  const signed=crossingCount(p,axis,s.plane,s.time),count=Math.abs(signed);if(signed>0)positive+=count;else negative+=count;sum+=signed*p.momentum[s.column];
  if(count){const a=p.initial[axis]-s.plane,b=a+p.velocity[axis]*s.time,k=p.velocity[axis]>0?Math.floor(b):Math.ceil(b),time=(k-a)/p.velocity[axis];
   if(time>0&&time<=s.time+1e-10)events.push({id:p.id,time,direction:Math.sign(signed),carried:p.momentum[s.column],contribution:Math.sign(signed)*p.momentum[s.column],point:particlePosition(p,time).map((x,j)=>j===axis?s.plane:x)});
  }
 }
 events.sort((a,b)=>b.time-a.time);
 return {particles,tensor,expected:tensor[s.row][s.column],measured:s.row===0?tensor[0][s.column]:s.time>0?sum/s.time:null,sum,positive,negative,count:positive+negative,events,meanVelocity:[0,1,2].map(j=>particles.reduce((sum,p)=>sum+p.velocity[j],0)/particles.length),particleCount:particles.length,volume:1,area:1};
}
