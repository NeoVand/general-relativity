// A frictionless cart attached to a Hooke-law spring. SI units throughout.
export const mechanicsDefaults = {mass:1,stiffness:1,position:1,momentum:0,time:0};
export const mechanicsBounds = {mass:[.5,2],stiffness:[.5,2],position:[-1.25,1.25],momentum:[-1,1]};
export function mechanicsState(input={}) {
  const state={...mechanicsDefaults};
  for(const [key,[min,max]] of Object.entries(mechanicsBounds))if(Number.isFinite(input[key]))state[key]=Math.max(min,Math.min(max,input[key]));
  const period=2*Math.PI*Math.sqrt(state.mass/state.stiffness);
  if(Number.isFinite(input.time))state.time=Math.max(0,Math.min(period,input.time));
  return state;
}
export function oscillator(input=mechanicsDefaults) {
  const {mass:m,stiffness:k,position:q0,momentum:p0,time:t}=mechanicsState(input);
  const omega=Math.sqrt(k/m),angle=omega*t;
  const q=q0*Math.cos(angle)+p0/(m*omega)*Math.sin(angle);
  const p=p0*Math.cos(angle)-m*omega*q0*Math.sin(angle);
  const kinetic=p*p/(2*m),potential=k*q*q/2;
  return {q,p,velocity:p/m,force:-k*q,kinetic,potential,energy:kinetic+potential,
    initialEnergy:p0*p0/(2*m)+k*q0*q0/2,omega,period:2*Math.PI/omega};
}
export const hamiltonian=(q,p,{mass,stiffness})=>p*p/(2*mass)+stiffness*q*q/2;
export const hamiltonianFlow=(q,p,{mass,stiffness})=>[p/mass,-stiffness*q];
