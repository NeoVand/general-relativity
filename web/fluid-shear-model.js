// Exact steady Newtonian laminar flow between parallel plates. SI units.
export const fluidGeometry=Object.freeze({height:.02,length:.12,density:900,referencePressure:100});
export const fluidDefaults=Object.freeze({mode:'plate',drive:.6,gradient:600,viscosity:.12,probe:.35,time:.12});
const clamp=(v,a,b,f)=>Number.isFinite(v)?Math.max(a,Math.min(b,v)):f;
export function fluidState(v={}){return {mode:v.mode==='pressure'?'pressure':'plate',drive:clamp(v.drive,-1.2,1.2,.6),gradient:clamp(v.gradient,-1200,1200,600),viscosity:clamp(v.viscosity,.04,.3,.12),probe:clamp(v.probe,.1,.9,.35),time:clamp(v.time,0,.8,.12)};}
export function fluidAt(value,y=fluidGeometry.height*fluidState(value).probe,x=fluidGeometry.length/2){
 const s=fluidState(value),H=fluidGeometry.height,G=s.mode==='pressure'?s.gradient:0,U=s.mode==='plate'?s.drive:0;
 const velocity=U*y/H+G*y*(H-y)/(2*s.viscosity),slope=U/H+G*(H-2*y)/(2*s.viscosity),shear=s.viscosity*slope,pressure=fluidGeometry.referencePressure-G*(x-fluidGeometry.length/2);
 return {y,velocity,slope,shear,pressure,momentumFlux:-shear,gradient:G,upperSpeed:U,curvature:-G/s.viscosity,volumeFlow:U*H/2+G*H**3/(12*s.viscosity),dissipation:s.viscosity*U*U/H+G*G*H**3/(12*s.viscosity)};
}
export function dyePosition(value,row,column){const s=fluidState(value),H=fluidGeometry.height,L=fluidGeometry.length,y=(row+.5)*H/10,initial=(column+.31+(row%3)*.23)*L/9,velocity=fluidAt(s,y).velocity;return {x:((initial+velocity*s.time)%L+L)%L,y,velocity};}
