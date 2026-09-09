import {foundationLessons} from './foundation-lessons.mjs';

// Chapter navigation and prerequisite displays consume this one authored map.
// Skill edges describe readiness; reaching a chapter is never mastery evidence.
export const prerequisites=[[],[0],[0],[0,1,2],[2,3],[4],[2,4],[5,6],[6,7],[8],[7,9],[2,3,7],[9,10,11],[5,11,12],[12,13],[7,12,14],[3,7,15],[3,7,12,16],[3,9,12],[11,12,15],[15,18,19],[7,8,14,15],[17,18,21],[12,19,22],[10,16,17,18,19]];
export const routes=[
 {id:'core',title:'Build the complete picture',description:'From calculus to clocks, geometry, Einstein’s equation, observations, and cosmology. Preparation appears where it becomes useful.',chapters:[...Array.from({length:20},(_,i)=>i),24]},
 {id:'geometry',title:'Build the geometry of spacetime',description:'An introductory geometry route through metrics, transport, curvature, and tidal measurements. Use the skill checks to find preparation you can skip.',chapters:Array.from({length:11},(_,i)=>i)},
 {id:'horizons',title:'Follow a light ray into a black hole',description:'The core, causal geometry, frames, and black-hole thermodynamics, with explicit thermal and quantum preparation. Numerical evolution is a separate continuation.',chapters:[...Array.from({length:20},(_,i)=>i),21,22]},
];
const skill=(id,title,chapter,anchor,check,requires=[])=>({id,title,chapter,href:`chapter-${chapter}.html#${anchor}`,check,requires});
const baseSkills=[
 skill('calculus','Differentiate, integrate, and use the chain rule',0,'0-2-partial-derivatives-change-one-input-at-a-time','For f(x,y)=x²y along x=t, y=2t, find df/dt at t=1.'),
 skill('linear-algebra','Multiply matrices and read a bilinear form',0,'0-6-matrices-measure-pairs-of-arrows','For G=diag(1,4) and v=(3,2), calculate vᵀGv.'),
 skill('coordinate-changes','Transform vectors and covectors',2,'coordinates-change-measurements-do-not','Change coordinates in a directional derivative and recover the same scalar.',['calculus','linear-algebra']),
 skill('interval','Calculate a proper-time interval',3,'3-4-proper-time-your-life-is-a-line-integral','Compare two timelike paths between the same pair of events.',['measurement-units']),
 skill('metric','Use a metric to turn components into measurements',4,'a-metric-converts-labels-into-lengths','Find a speed from radial and angular coordinate rates.',['coordinate-changes','interval']),
 skill('covariant-derivative','Differentiate the vector and its basis',6,'differentiate-the-arrow-not-its-address','Explain a nonzero component derivative for a constant Cartesian arrow.',['metric']),
 skill('connection','Derive and use the Levi-Civita connection',7,'7-3-deriving-the-christoffel-symbols-instead-of-receiving-them-as-a-curse','Calculate both nonzero types of polar Christoffel coefficient.',['metric','covariant-derivative','lie-bracket']),
 skill('curvature','Compare transport around a loop',8,'carry-a-direction-without-turning-it','Infer a sphere’s curvature from holonomy or a small-circle deficit.',['connection']),
 skill('curvature-contractions','Distinguish Riemann, Ricci, scalar and Weyl curvature',9,'9-1-a-contraction-is-a-deliberate-loss-of-information','Explain why zero Ricci curvature need not remove tides.',['curvature']),
 skill('stress-energy','Measure energy and momentum flux',11,'11-2-energy-belongs-to-an-observer-the-tensor-belongs-to-everyone','Compare the energy density of dust in its rest frame and a boosted frame.',['interval']),
 skill('einstein-equation','Trace reverse and identify the Newtonian source',12,'12-3-trace-reversal-the-most-useful-algebraic-rearrangement','Recover the factor of one half in the trace-reversed source.',['curvature-contractions','stress-energy']),
 skill('action','Vary a path and a field with stated boundary data',13,'13-3-fields-a-degree-of-freedom-at-every-point','Derive a field Euler–Lagrange equation and name the boundary variation.',['admissible-variations','field-energy']),
 skill('hamiltonian','Follow a state in phase space',13,'13-7-from-a-history-to-a-state-hamilton-s-equations','Derive Hamilton’s equations from a Lagrangian and interpret a momentum-zero turning point.',['action','mechanics-energy']),
 skill('killing-charge','Use a spacetime symmetry to find a conserved quantity',15,'15-4-a-killing-vector-supplies-the-missing-comparison-rule','Differentiate ξ·u along a geodesic and identify the Killing cancellation.',['connection']),
 skill('schwarzschild','Use Schwarzschild constants and regular horizon coordinates',17,'horizon-directions','Calculate outgoing null directions on both sides of the horizon.',['einstein-equation','killing-charge']),
 skill('expansion','Solve the Friedmann and fluid equations',19,'19-5-solving-for-the-scale-factor-three-recognizable-cosmic-personalities','Find a(t) for a spatially flat matter-only model.',['ode-initial-data','einstein-equation']),
 skill('forms','Integrate an oriented differential form',21,'oriented-stokes','Reverse an oriented boundary integral and check Stokes’ theorem.',['calculus','connection']),
];
const dependencies={
 'measurement-units':[],'coordinate-dimensions':['measurement-units','metric'],'ode-initial-data':['calculus'],'mechanics-energy':['calculus'],
 'hyperbolic-functions':['ode-initial-data'],'lie-bracket':['coordinate-changes'],
 'field-energy':['mechanics-energy','calculus'],'poisson-sources':['mechanics-energy','calculus'],
 'admissible-variations':['mechanics-energy','ode-initial-data'],'wave-initial-data':['ode-initial-data','poisson-sources','field-energy'],
 'global-causality':['schwarzschild'],'thermal-states':['admissible-variations','mechanics-energy'],
 'quantum-states':['thermal-states','wave-initial-data'],
};
export const skills=[...baseSkills,...foundationLessons.map(l=>({...skill(l.provides[0],l.title,l.chapter,l.id,l.transfer.prompt,dependencies[l.provides[0]]),lesson:l.id,firstSection:Number(l.after.match(/^\d+\.(\d+)/)?.[1]||0)}))];
export const chapterSkills=[
 ['calculus','linear-algebra'],['mechanics-energy'],['calculus','linear-algebra'],['measurement-units','mechanics-energy','coordinate-changes'],
 ['coordinate-changes','interval'],['metric','ode-initial-data','hyperbolic-functions'],['metric','coordinate-changes'],['covariant-derivative','ode-initial-data'],
 ['connection','lie-bracket'],['curvature'],['curvature-contractions','connection'],['interval','mechanics-energy'],['curvature-contractions','stress-energy'],
 ['ode-initial-data','field-energy'],['action','einstein-equation'],['connection','action'],['interval','killing-charge','hyperbolic-functions'],
 ['einstein-equation','killing-charge'],['curvature-contractions','field-energy','poisson-sources'],['stress-energy','einstein-equation','ode-initial-data'],
 ['expansion','einstein-equation','global-causality','hamiltonian'],['connection','curvature','action'],['global-causality','forms','wave-initial-data'],
 ['einstein-equation','quantum-states','expansion'],['curvature-contractions','schwarzschild','expansion'],
];
export function requirementsFor(chapter){return (chapterSkills[chapter]||[]).map(id=>skills.find(skill=>skill.id===id));}
export function validateCurriculum(lessons=foundationLessons){
 const byId=new Map(skills.map(s=>[s.id,s]));if(byId.size!==skills.length)throw Error('Duplicate curriculum skill');
 const done=new Set(),active=new Set();
 function visit(id){if(active.has(id))throw Error(`Cyclic skill dependency at ${id}`);if(done.has(id))return;const s=byId.get(id);if(!s)throw Error(`Unknown required skill ${id}`);active.add(id);for(const dep of s.requires)visit(dep);active.delete(id);done.add(id);}
 for(const s of skills)visit(s.id);
 const position=s=>[s.chapter,s.firstSection??Number(lessons.find(l=>l.id===s.lesson||s.href.endsWith('#'+l.id))?.after.match(/^\d+\.(\d+)/)?.[1]||s.href.match(/#\d+-(\d+)-/)?.[1]||0)];
 for(const s of skills)for(const id of s.requires){if(['calculus','linear-algebra'].includes(id))continue;const a=position(byId.get(id)),b=position(s);if(a[0]>b[0]||(a[0]===b[0]&&a[1]>b[1]))throw Error(`${s.id} needs ${id} before it is taught`);}

 for(const [chapter,ids] of chapterSkills.entries())for(const id of ids){const s=byId.get(id);if(!s||s.chapter>chapter)throw Error(`Chapter ${chapter} needs untaught skill ${id}`);}
 for(const route of routes){const included=new Set(route.chapters);for(const chapter of route.chapters)for(const s of requirementsFor(chapter))if(!included.has(s.chapter))throw Error(`${route.id} omits teaching for ${s.id}`);}
}
