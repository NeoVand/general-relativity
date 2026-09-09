import assert from 'node:assert/strict';
import {starProfile,cosmicDistances,photonExchange,evolveDust} from '../web/relativity-models.js';
const near=(a,b,tolerance)=>assert.ok(Math.abs(a-b)<=tolerance,`${a} ≈ ${b} (±${tolerance})`);
// Independent Newtonian n=1 Lane–Emden limit: θ=sin(ξ)/ξ.
const weak=starProfile({central:1e-6,step:.001});near(weak.radius,Math.sqrt(Math.PI/2),3e-5);near(weak.mass/(Math.sqrt(2*Math.PI)*1e-6),1,3e-5);
for(const central of [.02,.2,1,2]){
 const star=starProfile({central,step:.005});assert(star.mass>0&&star.compactness<1);assert.equal(star.rows.at(-1).p,0);
 for(let i=1;i<star.rows.length;i++){assert(star.rows[i].m>=star.rows[i-1].m-1e-12);assert(star.rows[i].p<=star.rows[i-1].p+1e-12);}
}
const stars=[.02,.01,.005].map(step=>starProfile({step}));assert(Math.abs(stars[2].radius-stars[1].radius)<Math.abs(stars[1].radius-stars[0].radius));
// Analytically integrated expansion histories and distance duality.
for(const z of [0,.1,1,3]){
 const dust=cosmicDistances({matter:1,vacuum:0,z});near(dust.comoving/(299792.458/70),2*(1-1/Math.sqrt(1+z)),1e-8);
 const deSitter=cosmicDistances({matter:0,vacuum:1,z});near(deSitter.comoving/(299792.458/70),z,1e-10);
 const curved=cosmicDistances({matter:.2,vacuum:.2,z});near(curved.luminosity,(1+z)**2*curved.angular,1e-8);
}
// Killing-energy transport and local Lorentz factors independently calibrate the ray.
near(photonExchange({emitter:2,receiver:8}).frequencyRatio,Math.sqrt(4/7),1e-12);
near(photonExchange({emitter:2,receiver:8}).frequencyRatio*photonExchange({emitter:8,receiver:2}).frequencyRatio,1,1e-12);
near(photonExchange({emitter:8,receiver:8,receiverVelocity:.6}).frequencyRatio,.5,1e-12);
assert.throws(()=>photonExchange({emitter:1}));assert.throws(()=>cosmicDistances({matter:0,vacuum:2,z:2}));
// Compare evolution to the exact FLRW reduction at one common final time.
const euler=[.1,.05,.025].map(step=>evolveDust({step,method:'euler'}));
const rk4=[.2,.1,.05].map(step=>evolveDust({step}));
assert(Math.abs(euler[2].error)<Math.abs(euler[1].error));assert(Math.abs(rk4[2].error)<Math.abs(rk4[1].error));
const ratio=Math.abs(rk4[1].error/rk4[2].error);assert(ratio>12&&ratio<20,`RK4 benchmark convergence ratio ${ratio}`);
assert(Math.abs(rk4[1].constraint)<Math.abs(euler[1].constraint));
console.log('Stellar regularity, surface detection, Newtonian limit and refinement; analytic and curved cosmological distances; photon reciprocity and Doppler shifts; FLRW constraint/evolution convergence verified.');
