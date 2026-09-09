// Small, inspectable physical models. All assumptions and unit scales are
// declared by the authored lab record. These functions are also used at build
// time to publish calculated tables when browser enhancement is unavailable.
export function rk4Step(f,x,y,h){
 const add=(a,b,factor)=>a.map((v,i)=>v+factor*b[i]);
 const k1=f(x,y),k2=f(x+h/2,add(y,k1,h/2)),k3=f(x+h/2,add(y,k2,h/2)),k4=f(x+h,add(y,k3,h));
 return y.map((v,i)=>v+h*(k1[i]+2*k2[i]+2*k3[i]+k4[i])/6);
}
export function starProfile({central=.2,step=.01}={}){
 if(!(central>0&&central<=10&&step>0&&step<=.05))throw Error('Choose positive central density and a radial step no larger than 0.05.');
 const eos=enthalpy=>{const rho=Math.expm1(Math.max(0,enthalpy))/2,p=rho*rho;return {rho,p,epsilon:rho+p}};
 const pc=central**2,ec=central+pc,hc=Math.log1p(2*central),r0=1e-5;
 const rows=[{r:0,m:0,rho:central,p:pc,epsilon:ec}];
 let r=r0,y=[4*Math.PI*ec*r0**3/3,hc-2*Math.PI*(ec/3+pc)*r0*r0];
 function rhs(radius,[mass,enthalpy]){
  const {p,epsilon}=eos(enthalpy),gap=radius-2*mass;
  if(!(gap>0))throw Error('The static radial integration reached r ≤ 2m. This model no longer applies.');
  return [4*Math.PI*radius*radius*epsilon,-(mass+4*Math.PI*radius**3*p)/(radius*gap)];
 }
 for(let i=0;i<Math.ceil(5/step);i++){
  const next=rk4Step(rhs,r,y,step);
  if(!next.every(Number.isFinite))throw Error('The stellar integration is not finite. Reduce the step.');
  if(next[1]<=0){const fraction=y[1]/(y[1]-next[1]);r+=step*fraction;y=[y[0]+fraction*(next[0]-y[0]),0];rows.push({r,m:y[0],...eos(0)});return {rows,radius:r,mass:y[0],compactness:2*y[0]/r,central,step,surfaceMethod:'linear zero of enthalpy'};}
  r+=step;y=next;rows.push({r,m:y[0],...eos(y[1])});
 }
 throw Error('No zero-pressure surface was found within the model’s radial domain.');
}
export function simpson(f,a,b,intervals=256){
 const n=Math.max(2,2*Math.ceil(intervals/2)),h=(b-a)/n;let sum=f(a)+f(b);
 for(let i=1;i<n;i++)sum+=(i%2?4:2)*f(a+i*h);
 return sum*h/3;
}
export function cosmicDistances({matter=.3,vacuum=.7,radiation=0,hubble=70,z=1,intervals=256}={}){
 if(![matter,vacuum,radiation,hubble,z].every(Number.isFinite)||matter<0||vacuum<0||radiation<0||hubble<=0||z<0||z>20)throw Error('Choose nonnegative densities and redshift, and a positive Hubble constant.');
 const curvature=1-matter-vacuum-radiation;
 const expansion=redshift=>{const x=1+redshift,value=matter*x**3+radiation*x**4+curvature*x*x+vacuum;if(!(value>0))throw Error('This parameter choice has no continuous expanding path over the requested redshift interval.');return Math.sqrt(value)};
 const chi=simpson(x=>1/expansion(x),0,z,intervals),hubbleDistance=299792.458/hubble;
 const transverse=Math.abs(curvature)<1e-8?chi*(1+curvature*chi*chi/6):curvature>0?Math.sinh(Math.sqrt(curvature)*chi)/Math.sqrt(curvature):Math.sin(Math.sqrt(-curvature)*chi)/Math.sqrt(-curvature);
 if(transverse<0)throw Error('This chart has passed the first antipode. The simple single-image distance interpretation is outside this lab.');
 const comoving=hubbleDistance*chi,transverseDistance=hubbleDistance*transverse;
 return {z,matter,vacuum,radiation,curvature,hubble,H:hubble*expansion(z),comoving,transverse:transverseDistance,angular:transverseDistance/(1+z),luminosity:transverseDistance*(1+z),lookbackHubble:simpson(x=>1/((1+x)*expansion(x)),0,z,intervals),unit:'Mpc'};
}
export function photonExchange({emitter=2,receiver=8,emitterVelocity=0,receiverVelocity=0}={}){
 if(![emitter,receiver,emitterVelocity,receiverVelocity].every(Number.isFinite)||emitter<=1||receiver<=1||Math.abs(emitterVelocity)>=1||Math.abs(receiverVelocity)>=1)throw Error('Static reference frames require r/rs > 1 and local speeds below c.');
 const direction=receiver>=emitter?1:-1,f=r=>1-1/r,doppler=beta=>(1-direction*beta)/Math.sqrt(1-beta*beta);
 const gravity=Math.sqrt(f(emitter)/f(receiver)),motion=doppler(receiverVelocity)/doppler(emitterVelocity);
 const time=direction*((receiver-emitter)+Math.log((receiver-1)/(emitter-1)));
 return {emitter,receiver,emitterVelocity,receiverVelocity,direction,gravity,motion,frequencyRatio:gravity*motion,coordinateTravelTime:time,receiverCoordinateSpeed:direction*f(receiver),localLightSpeed:1};
}
export function evolveDust({step=.1,duration=4,method='rk4'}={}){
 if(!(step>0&&step<=.5&&duration>0&&duration<=20)||!['rk4','euler'].includes(method))throw Error('Choose Euler or RK4, a positive step up to 0.5, and duration up to 20.');
 const count=Math.ceil(duration/step),h=duration/count,rhs=(_,y)=>[y[1],-1/(2*y[0]*y[0])];
 let y=[1,1];const rows=[];
 for(let i=0;i<=count;i++){
  const t=i*h,exact=(1+1.5*t)**(2/3),constraint=y[1]**2-1/y[0];rows.push({t,scale:y[0],velocity:y[1],exact,error:y[0]-exact,constraint});
  if(i<count)y=method==='rk4'?rk4Step(rhs,t,y,h):y.map((value,j)=>value+h*rhs(t,y)[j]);
 }
 return {rows,step:h,method,duration,...rows.at(-1)};
}
