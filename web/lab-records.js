// One record supplies the lab's UI, exported provenance, and tutor context.
export const labRecords={
 star:{id:'star',version:1,chapter:17,title:'Build a star from its centre',question:'How much pressure does a relativistic star need to hold itself up?',
  units:'Dimensionless geometric units G = c = K = 1; rest-mass density ρ₀, pressure p = ρ₀², energy density ε = ρ₀ + p. These are a toy equation of state, not a fitted neutron-star model.',
  assumptions:['Static, spherical, isotropic perfect fluid; zero cosmological constant.','A regular centre, a zero-pressure surface, and a Schwarzschild exterior.','RK4 in radius using enthalpy h = ln(1 + 2ρ₀); the surface uses linear interpolation.'],
  equations:[{id:'tov-mass',tex:String.raw`\frac{dm}{dr}=4\pi r^2\epsilon`},{id:'tov-pressure',tex:String.raw`\frac{dp}{dr}=-\frac{(\epsilon+p)(m+4\pi r^3p)}{r(r-2m)}`}],
  prediction:'Increase central density. Predict whether the mass and radius must both increase before changing the control.',
  limitation:'A mass–radius point alone does not establish radial stability. Changing the equation of state changes the family. Grid-refinement differences are diagnostics, not certified error bounds.',
  source:{title:'Oppenheimer and Volkoff · On Massive Neutron Cores',url:'https://doi.org/10.1103/PhysRev.55.374'},
  parameters:[{id:'central',label:'Central rest-mass density',min:.02,max:2,step:.02,value:.2},{id:'step',label:'Radial integration step',options:[.02,.01,.005,.0025],value:.01}],
 },
 distances:{id:'distances',version:1,chapter:19,title:'Ask the universe three distance questions',question:'Which distance did the observation actually measure?',
  units:'H₀ is in km s⁻¹ Mpc⁻¹. Readouts are Mpc and plotted distances are Gpc. Density parameters are relative to the present critical density.',
  assumptions:['Homogeneous FLRW expansion with dust, spatial curvature and a cosmological constant; radiation is set to zero in this lab.','Geometric optics, isotropic bolometric source luminosity and photon-number conservation.','Composite Simpson integration; Ωₖ = 1 − Ωₘ − ΩΛ.'],
  equations:[{id:'hubble-history',tex:String.raw`E(z)^2=\Omega_m(1+z)^3+\Omega_k(1+z)^2+\Omega_\Lambda`},{id:'distance-duality',tex:String.raw`D_L=(1+z)^2D_A,\qquad D_C=\frac c{H_0}\int_0^z\frac{dz'}{E(z')}`}],
  prediction:'Predict which distances change when H₀ changes while the density fractions stay fixed. Then change the matter fraction and compare the shapes.',
  limitation:'This is an ideal background prediction. It does not fit an observational catalogue or include peculiar velocities, extinction, selection effects or lensing along a particular line of sight.',
  source:{title:'Hogg · Distance measures in cosmology',url:'https://arxiv.org/abs/astro-ph/9905116'},
  parameters:[{id:'matter',label:'Matter fraction Ωₘ',min:0,max:1,step:.05,value:.3},{id:'vacuum',label:'Vacuum fraction ΩΛ',min:0,max:1,step:.05,value:.7},{id:'hubble',label:'Hubble constant H₀',min:40,max:100,step:1,value:70},{id:'z',label:'Source redshift z',min:.1,max:5,step:.1,value:2}],
 },
 photon:{id:'photon',version:1,chapter:17,title:'Follow the photon. Ask each observer.',question:'How do gravitational redshift and local motion combine in an actual frequency measurement?',
  units:'Radii are multiples of rₛ = 2GM/c²; velocities are measured by local static observers in units of c, positive outward. Frequency is normalized to the emitter’s measurement.',
  assumptions:['A radial photon in the exterior of a Schwarzschild black hole, r > rₛ.','Specified local four-velocities at emission and reception; their full worldlines are not evolved.','The plot samples a family of possible receiving events and observers, not the history of one moving detector.'],
  equations:[{id:'photon-frequency',tex:String.raw`\frac{\nu_r}{\nu_e}=\sqrt{\frac{f_e}{f_r}}\,\frac{\gamma_r(1-n\beta_r)}{\gamma_e(1-n\beta_e)},\qquad f=1-\frac{r_s}r`},{id:'observer-energy',tex:String.raw`E_{\rm obs}=-p_\mu u^\mu,\qquad n=\pm1`}],
  prediction:'First keep both observers static. Then make the receiver move toward the photon. Can a Doppler blueshift overcome the gravitational redshift?',
  limitation:'Static reference frames do not extend through the horizon. The coordinate light rate is not a locally measured speed. Use the regular-coordinate horizon lesson to study crossing.',
  source:{title:'Tong · Black holes',url:'https://www.davidtong.org/teaching/general-relativity/'},
  parameters:[{id:'emitter',label:'Emission radius r/rₛ',min:1.1,max:4,step:.1,value:2},{id:'receiver',label:'Reception radius r/rₛ',min:1.1,max:20,step:.1,value:8},{id:'emitterVelocity',label:'Emitter velocity / c',min:-.8,max:.8,step:.05,value:0},{id:'receiverVelocity',label:'Receiver velocity / c',min:-.8,max:.8,step:.05,value:0}],
 },
 evolution:{id:'evolution',version:1,chapter:20,title:'Make a universe—and audit the answer',question:'Will a smaller time step repair the apparent motion, the constraint, or both?',
  units:'Dimensionless flat-dust reduction with A(0) = V(0) = 1, zero cosmological constant and exact A(t) = (1 + 3t/2)^(2/3).',
  assumptions:['Homogeneous FLRW dust: Ȧ = V and V̇ = −1/(2A²).','Choose first-order forward Euler or classical fourth-order Runge–Kutta.','All refinements reach the same final time; the actual step can be slightly smaller than the requested step.'],
  equations:[{id:'dust-evolution',tex:String.raw`\dot A=V,\qquad\dot V=-\frac1{2A^2}`},{id:'dust-constraint',tex:String.raw`\mathcal C=V^2-\frac1A=0`}],
  prediction:'Compare a believable-looking curve with its constraint residual. Predict the effect of halving the step, then compare against the exact solution.',
  limitation:'This evolves a symmetry reduction of Einstein’s equations. It contains no gravitational waves or spatial grid and does not establish well-posedness or stability of a full numerical-relativity formulation.',
  source:{title:'Tong · Einstein equations and cosmology',url:'https://www.davidtong.org/teaching/general-relativity/'},
  parameters:[{id:'method',label:'Integration method',options:['euler','rk4'],value:'euler'},{id:'step',label:'Requested time step',options:[.4,.2,.1,.05,.025],value:.2},{id:'duration',label:'Final time',min:1,max:8,step:.5,value:4},{id:'view',label:'Plot',options:['scale','constraint'],value:'scale'}],
 },
};
export const defaultsFor=id=>Object.fromEntries(labRecords[id].parameters.map(p=>[p.id,p.value]));
export function validateLabState(id,input){
 const state=defaultsFor(id);
 for(const p of labRecords[id].parameters){const value=input?.[p.id];if(p.options){if(p.options.includes(value))state[p.id]=value;}else if(Number.isFinite(value)&&value>=p.min&&value<=p.max)state[p.id]=value;}
 return state;
}
