// Placement is an editorial decision. Every lesson must have a reviewed role.
// These records check authored order; they cannot establish learner comprehension.
const entries=[
 ['measurements-and-units','section-end','Use the position, time, and unit definitions from 0.1.'],
 ['initial-data-and-oscillations','section-end','Start with the falling-ball equation and initial data before generalizing.'],
 ['mechanics-energy-and-pressure','section-end','Force, momentum, energy, and pressure must be defined before pressure work.'],
 ['weightlessness-and-tides','section-end','The scale experiment and Newtonian fall model precede quantitative tides.'],
 ['coordinates-change-measurements-do-not','section-end','Vectors, covectors, and the Jacobian are explained before the worked transformation.'],
 ['hyperbolas-and-rapidity','section-end','The Lorentz boost, interval, and exponential definitions precede composition practice.'],
 ['doppler-is-an-observer-measurement','section-end','Four-momentum and observer energy must precede the photon calculation.'],
 ['two-maps-one-sphere','section-end','Explain charts, inverses, and overlap before stereographic calculation.'],
 ['a-metric-converts-labels-into-lengths','section-end','Explain polar coordinates and derive their length rule before the experiment.'],
 ['dimensions-before-symbols','section-end','Follow both the interval and polar-metric lessons; preserve its existing practice identity.'],
 ['affine-is-a-parameter-choice','section-end','Define affine reparameterization before testing a nonlinear example.'],
 ['differentiate-the-arrow-not-its-address','section-end','The vector comparison problem precedes rotating-basis calculation.'],
 ['flows-that-do-not-commute','section-start','Supply the bracket operation used in the torsion definition in this section.'],
 ['carry-a-direction-without-turning-it','section-end','Define holonomy before the sphere transport experiment.'],
 ['measure-curvature-with-a-string','section-end','Derive sphere curvature before the independent circumference measurement.'],
 ['contract-curvature-by-hand','section-end','Define contractions and Ricci before asking for a vacuum counterexample.'],
 ['what-a-tidal-instrument-measures','section-end','Derive the instrument-frame equation and spherical Newtonian tides before the calibration exercise.'],
 ['fields-carry-energy','section-start','Supply the string and electromagnetic energy vocabulary used by the field examples.'],
 ['poisson-from-a-flux','section-start','Explain Poisson normalization before using it to calibrate Einstein’s equation.'],
 ['variations-and-boundary-data','section-end','Define a variation before adding endpoint and constrained examples.'],
 ['boundary-action-is-part-of-the-question','section-end','Explain the boundary obstruction and define induced curvature before the exercise and its cylindrical example.'],
 ['symmetry-earns-a-charge','section-start','Give a particle symmetry calculation before the local field identity.'],
 ['orbit-conservation','section-start','Derive angular momentum and the orbit equation before the Mercury calculation.'],
 ['phase-drift','section-start','Explain resonant phase drift after orbit conservation and before the precession calculation.'],
 ['horizon-directions','section-end','Derive horizon-regular coordinates before interpreting their null slopes.'],
 ['kruskal-and-causal-maps','section-end','Motivate the global horizon before constructing its extended causal map.'],
 ['causal-domains','section-end','The explicit causal map must precede domains of dependence.'],
 ['waves-and-retarded-time','section-start','Define real wave propagation before linearized gravitational waves.'],
 ['waves-modes-and-green-functions','section-start','Define the retarded kernel before using the sourced gravitational solution.'],
 ['distances-are-measurement-protocols','section-end','The observing protocols precede the worked distance calculation.'],
 ['evolve-and-check-the-constraint','section-end','The numerical constraints and coordinate policy precede the benchmark exercise.'],
 ['oriented-stokes','section-end','Define forms and orientation before the boundary calculation.'],
 ['probability-temperature-and-entropy','section-start','Define probabilities, entropy, and thermal weights before quantum thermal reasoning.'],
 ['quantum-states-and-reduced-information','section-start','Define states and restriction after probabilities, before the horizon-temperature argument.'],
 ['temperature-and-quantum-input','section-end','The thermal foundations and near-horizon geometry precede their synthesis.'],
 ['an-error-budget-for-effective-theory','section-end','Explain effective expansion and its scale before estimating a remainder.'],
 ['a-curved-universe-capstone','section-end','Place the independent synthesis after the calculation workflow.'],
];
export const lessonSequence=Object.fromEntries(entries.map(([id,placement,reason],order)=>[id,{placement,reason,order}]));
export function sequenceLesson(lesson){
 const record=lessonSequence[lesson.id];
 if(!record)throw Error(`Lesson ${lesson.id} needs an explicit placement review`);
 return {...lesson,...record};
}
export function compareLessons(a,b){
 return a.chapter-b.chapter||Number(a.after.match(/^\d+\.(\d+)/)[1])-Number(b.after.match(/^\d+\.(\d+)/)[1])||a.order-b.order;
}
