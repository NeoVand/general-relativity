// Euclidean experiments. Lengths are metres and angles are radians.
export const polarDefaults=Object.freeze({radius:1.8,angle:.65,step:.4,view:'coordinates'});
const bounded=(value,low,high,fallback)=>Number.isFinite(value)?Math.max(low,Math.min(high,value)):fallback;
export function polarState(value={}) {
  return {radius:bounded(value.radius,0,2.6,polarDefaults.radius),angle:bounded(value.angle,0,2*Math.PI,polarDefaults.angle),step:bounded(value.step,.02,.8,polarDefaults.step),view:value.view==='step'?'step':'coordinates'};
}
export function polarMeasurements(value=polarDefaults) {
  const {radius:r,angle:t,step:h}=polarState(value);
  return {point:[r*Math.cos(t),r*Math.sin(t)],next:[r*Math.cos(t+h),r*Math.sin(t+h)],arc:r*h,chord:2*r*Math.sin(h/2),angleDefined:r>0};
}
export function polarFromPoint(x,y) {
  const radius=Math.min(2.6,Math.hypot(x,y));
  return {radius,angle:radius<1e-12?0:(Math.atan2(y,x)+2*Math.PI)%(2*Math.PI)};
}

export const fieldDefaults=Object.freeze({field:'uniform',angle:.55,separation:.6});
export const fieldNames=Object.freeze({uniform:'Uniform eastward flow',expansion:'Expansion',rotation:'Rotation',shear:'Shear'});
export function fieldState(value={}) {
  return {field:Object.hasOwn(fieldNames,value.field)?value.field:'uniform',angle:bounded(value.angle,0,2*Math.PI,fieldDefaults.angle),separation:bounded(value.separation,.04,1.2,fieldDefaults.separation)};
}
// Components are velocities in m/s. Each nonuniform field has rate 0.4 /s.
export function fieldVelocity(field,[x,y]) {
  if(field==='expansion')return [.4*x,.4*y];
  if(field==='rotation')return [-.4*y,.4*x];
  if(field==='shear')return [.4*y,0];
  return [1,0];
}
export function polarUnitFrame(angle) {return [[Math.cos(angle),Math.sin(angle)],[-Math.sin(angle),Math.cos(angle)]];}
const dot=(a,b)=>a[0]*b[0]+a[1]*b[1];
const subtract=(a,b)=>a.map((x,i)=>x-b[i]);
const combine=(basis,components)=>[0,1].map(i=>basis[0][i]*components[0]+basis[1][i]*components[1]);
export function fieldMeasurements(value=fieldDefaults) {
  const s=fieldState(value),r=1.8,t=s.angle,h=s.separation;
  const P=[r*Math.cos(t),r*Math.sin(t)],Q=[r*Math.cos(t+h),r*Math.sin(t+h)];
  const atP=fieldVelocity(s.field,P),atQ=fieldVelocity(s.field,Q),B0=polarUnitFrame(t),B1=polarUnitFrame(t+h);
  const c0=B0.map(e=>dot(e,atP)),c1=B1.map(e=>dot(e,atQ));
  // Exact finite product rule: B1 c1 - B0 c0 = B0(c1-c0) + (B1-B0)c1.
  // c1 in the second term is essential; c0 there would leave a cross term.
  const components=combine(B0,subtract(c1,c0)),basis=combine(B1.map((b,i)=>subtract(b,B0[i])),c1);
  return {P,Q,atP,atQ,c0,c1,components,basis,difference:subtract(atQ,atP),arc:r*h,divergence:s.field==='expansion'?.8:0};
}
