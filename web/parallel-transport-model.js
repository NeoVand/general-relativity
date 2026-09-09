// Exact Levi-Civita transport for a plane, a cylinder, and great-circle
// segments on a sphere. No repeated projection or renormalization is used.
export const transportDefaults=Object.freeze({surface:'plane',progress:0,size:1,radius:1.3,reverse:false});
const clamp=(n,a,b,f)=>Number.isFinite(n)?Math.max(a,Math.min(b,n)):f;
export function transportState(value={}){return {surface:['plane','cylinder','sphere'].includes(value.surface)?value.surface:'plane',progress:clamp(value.progress,0,1,0),size:clamp(value.size,.15,1,1),radius:clamp(value.radius,.8,1.6,1.3),reverse:value.reverse===true};}
export const dot=(a,b)=>a.reduce((s,x,i)=>s+x*b[i],0);
export const cross=(a,b)=>[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]];
export const scale=(v,s)=>v.map(x=>x*s);
export const add=(a,b)=>a.map((x,i)=>x+b[i]);
export const unit=v=>scale(v,1/Math.hypot(...v));
export function rotate(v,axis,angle){return add(add(scale(v,Math.cos(angle)),scale(cross(axis,v),Math.sin(angle))),scale(axis,dot(axis,v)*(1-Math.cos(angle))));}
export function surfaceFrame(surface,u,v,radius=1){
 if(surface==='sphere'){
  const c=Math.cos(u),s=Math.sin(u),C=Math.cos(v),S=Math.sin(v),normal=[C*c,C*s,S];
  return {point:scale(normal,radius),normal,e1:[-s,c,0],e2:[-S*c,-S*s,C]};
 }
 if(surface==='cylinder'){
  const c=Math.cos(u/radius),s=Math.sin(u/radius);
  return {point:[radius*s,v,radius*(1-c)],normal:[-s,0,c],e1:[c,0,s],e2:[0,1,0]};
 }
 return {point:[u,v,0],normal:[0,0,1],e1:[1,0,0],e2:[0,1,0]};
}
export function transportLoop(value=transportDefaults){
 const s=transportState(value),a=s.size*Math.PI/2;
 let vertices=s.surface==='sphere'?[[1,0,0],[Math.cos(a),0,Math.sin(a)],[Math.cos(a),Math.sin(a),0]]:[[-.8,-.8],[-.8+1.6*s.size,-.8],[-.8,-.8+1.6*s.size]];
 if(s.reverse)vertices=[vertices[0],vertices[2],vertices[1]];
 vertices=[...vertices,vertices[0]];
 const lengths=vertices.slice(0,3).map((p,i)=>s.surface==='sphere'?s.radius*Math.acos(Math.max(-1,Math.min(1,dot(p,vertices[i+1])))):Math.hypot(...p.map((x,j)=>x-vertices[i+1][j])));
 const totalLength=lengths.reduce((a,b)=>a+b,0),corners=[0,lengths[0]/totalLength,(lengths[0]+lengths[1])/totalLength,1];
 const [A,B,C]=vertices;
 const signedArea=s.surface==='sphere'?2*s.radius**2*Math.atan2(dot(A,cross(B,C)),1+dot(A,B)+dot(B,C)+dot(C,A)):((B[0]-A[0])*(C[1]-A[1])-(B[1]-A[1])*(C[0]-A[0]))/2;
 return {vertices,lengths,totalLength,corners,signedArea};
}
export function transportAt(value=transportDefaults){
 const s=transportState(value),loop=transportLoop(s),distance=s.progress*loop.totalLength;
 let segment=0,remaining=distance;
 while(segment<2&&remaining>loop.lengths[segment]){remaining-=loop.lengths[segment];segment++;}
 const fraction=Math.max(0,Math.min(1,remaining/loop.lengths[segment]));
 let point,normal,vector,startPoint,startVector,startNormal;
 if(s.surface==='sphere'){
  vector=[0,0,1];
  for(let i=0;i<=segment;i++){
   const axis=unit(cross(loop.vertices[i],loop.vertices[i+1])),angle=loop.lengths[i]/s.radius*(i===segment?fraction:1);
   vector=rotate(vector,axis,angle);
   if(i===segment){normal=rotate(loop.vertices[i],axis,angle);point=scale(normal,s.radius);}
  }
  startPoint=scale(loop.vertices[0],s.radius);startVector=[0,0,1];startNormal=loop.vertices[0];
 }else{
  const p=loop.vertices[segment],q=loop.vertices[segment+1],uv=p.map((x,i)=>x+(q[i]-x)*fraction),frame=surfaceFrame(s.surface,...uv,s.radius);
  ({point,normal}=frame);vector=frame.e1;
  const start=surfaceFrame(s.surface,...loop.vertices[0],s.radius);startPoint=start.point;startVector=start.e1;startNormal=start.normal;
 }
 return {point,normal,vector,startPoint,startVector,startNormal,segment,fraction,...loop,length:Math.hypot(...vector),normalComponent:dot(vector,normal)};
}
export function transportResult(value=transportDefaults){
 const s=transportState(value),end=transportAt({...s,progress:1});
 const angle=Math.atan2(dot(end.startNormal,cross(end.startVector,end.vector)),dot(end.startVector,end.vector));
 return {angle,area:Math.abs(end.signedArea),signedArea:end.signedArea,curvature:s.surface==='sphere'?1/s.radius**2:0,endVector:end.vector,perimeter:end.totalLength};
}
