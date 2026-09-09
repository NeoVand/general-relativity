// Scientific identities shared by the renderer and the authored inspector.
// Bindings are positive declarations: an unfamiliar subscript must stay unclassified.
const legacyDefinitions={
 metric:['Metric tensor','g','_{\\mu\\nu}','geometry','Bilinear form','With both indices downstairs, the metric pairs tangent vectors to give an inner product or interval. With both upstairs, the inverse metric pairs covectors and raises indices. One raised index gives the identity map. Its components depend on the coordinates.','chapter-4.html#4-4-the-metric-is-a-local-measuring-operation'],
 'metric-determinant':['Metric determinant','g','','geometry','Scalar density ingredient','An unindexed g denotes the determinant of the metric matrix here. Its magnitude supplies the volume factor used in integration.','chapter-4.html#4-7-determinants-tell-integration-how-much-room-there-is'],
 minkowski:['Minkowski metric','\\eta','_{\\mu\\nu}','geometry','Flat-spacetime metric','In an orthonormal frame this matrix has entries minus one, one, one, one on its diagonal. It distinguishes time from space in the interval.','chapter-3.html#3-3-the-interval-the-quantity-that-refuses-to-change'],
 'scale-factor':['Scale factor','a','(t)','geometry','Cosmological scale','The scale factor converts a fixed comoving separation into a physical distance. Ratios of scale factors matter; its normalization is a convention.','chapter-19.html#19-1-flrw-geometry-with-the-units-declared-before-the-equations-multiply'],
 perturbation:['Metric perturbation','h','_{\\mu\\nu}','geometry','Small change to a metric','This describes a small departure from a chosen background metric. In gravitational-wave calculations the transverse components encode strain.','chapter-18.html#18-1-linearization-is-a-controlled-approximation-not-a-different-theory'],
 'spatial-metric':['Spatial metric','\\gamma','_{ij}','geometry','Geometry of a spatial slice','The spatial metric measures distances within one spacelike slice. It is part of the decomposition used to evolve spacetime.','chapter-20.html#20-2-slicing-spacetime-without-claiming-that-nature-has-a-preferred-slicer'],
 connection:['Connection coefficients','\\Gamma','^{\\rho}_{\\mu\\nu}','transport','Coordinate coefficients','These coefficients account for how the coordinate basis changes between neighboring events. They enter covariant derivatives and the geodesic equation; they are not tensor components.','chapter-7.html#7-3-deriving-the-christoffel-symbols-instead-of-receiving-them-as-a-curse'],
 'covariant-derivative':['Covariant derivative','\\nabla','','transport','Geometric differentiation','This derivative compares nearby tensor fields while accounting for changing bases. For a scalar, one covariant derivative agrees with an ordinary partial derivative.','chapter-6.html#6-2-what-a-derivative-must-be-able-to-compare'],
 'spin-connection':['Spin connection','\\omega','^a{}_b','transport','Connection one-form','The spin connection compares local orthonormal frames. It packages the rotation or Lorentz transformation of those frames along a displacement.','chapter-21.html#21-3-why-an-orthonormal-frame-needs-a-spin-connection'],
 riemann:['Riemann curvature tensor','R','^{\\rho}{}_{\\sigma\\mu\\nu}','curvature','Curvature operator','This tensor describes the mismatch produced by comparing directions around a small loop. It also governs relative acceleration between neighboring freely falling trajectories.','chapter-8.html#8-2-curvature-as-a-machine-with-three-vector-inputs'],
 ricci:['Ricci tensor','R','_{\\mu\\nu}','curvature','Contraction of curvature','Ricci curvature combines selected components of the Riemann tensor. It retains the contraction that appears in Einstein’s equation, but not all curvature information.','chapter-9.html#9-2-ricci-curvature-as-a-directional-average-of-tidal-effects'],
 'scalar-curvature':['Ricci scalar','R','','curvature','Trace of the Ricci tensor','Contracting the Ricci tensor with the inverse metric produces this scalar. A zero Ricci scalar alone does not imply that spacetime is flat.','chapter-9.html#9-1-a-contraction-is-a-deliberate-loss-of-information'],
 einstein:['Einstein tensor','G','_{\\mu\\nu}','curvature','Divergence-free curvature combination','The Einstein tensor is the Ricci tensor minus one half the metric times the Ricci scalar. Its covariant divergence vanishes by a geometric identity.','chapter-9.html#9-5-contracting-bianchi-until-einstein-s-tensor-appears'],
 weyl:['Weyl tensor','C','^{\\rho}{}_{\\sigma\\mu\\nu}','curvature','Trace-free curvature','Weyl curvature is the part of the Riemann tensor left after removing its Ricci traces. It can be nonzero in vacuum, including outside a spherical mass.','chapter-9.html#9-3-extracting-the-trace-free-remainder-the-weyl-tensor'],
 'curvature-form':['Curvature two-form','\\Omega','^a{}_b','curvature','Curvature in a local frame','This packages curvature using differential forms and an orthonormal frame. It describes how the connection fails to be path independent.','chapter-21.html#21-4-cartan-s-equations-package-geometry-into-two-lines'],
 'stress-energy':['Stress–energy tensor','T','_{\\mu\\nu}','matter','Energy, momentum, and stress','Its components describe energy density, momentum flow, and stresses relative to a chosen frame. Together they supply the matter side of Einstein’s equation.','chapter-11.html#11-1-a-tensor-is-a-shipping-manifest-for-energy-and-momentum'],
 density:['Density','\\rho','','matter','Local matter quantity','The surrounding definition specifies whether this is mass density or energy density. Density alone is only one part of the full stress–energy description.','chapter-11.html#11-4-perfect-fluids-derived-from-isotropy'],
 'proper-time':['Proper time','\\tau','','observer','Time recorded by a clock','Proper time is the elapsed time recorded by an ideal clock along its timelike worldline. Different journeys between shared events can accumulate different readings.','chapter-3.html#3-4-proper-time-your-life-is-a-line-integral'],
 'four-velocity':['Four-velocity','u','^\\mu','observer','Tangent to a timelike worldline','Four-velocity differentiates an observer’s coordinates with respect to their proper time. Its components depend on the coordinates; the vector describes the observer’s motion.','chapter-3.html#3-6-four-velocity-and-four-momentum'],
 'cosmological-constant':['Cosmological constant','\\Lambda','','neutral','Constant geometric term','This constant multiplies the metric in Einstein’s equation. It may equivalently be placed on the matter side as a vacuum stress–energy contribution.','chapter-15.html#15-6-the-cosmological-constant-as-vacuum-stress-energy']
};
export const scientificSymbols = Object.fromEntries(
 Object.entries(legacyDefinitions).map(([id, [title, base, suffix, role, kind, description, lesson]]) =>
  [id, {id, title, base, suffix, role, kind, description, lesson}])
);
scientificSymbols['plot-time'] = {
 id: 'plot-time', title: 'Dimensionless plotting time', base: String.raw`\tau`,
 suffix: String.raw`_{\rm plot}`, role: 'neutral', kind: 'Coordinate · dimensionless',
 description: 'Here τ plot = cv/rₛ − ρ, with ρ = r/rₛ and v the advanced Eddington–Finkelstein time. It labels events in this radial causal diagram. It is not the elapsed time of a traveler’s clock; slopes in these axes are coordinate rates.',
 lesson: 'chapter-17.html#horizon-directions-step-3', units: 'dimensionless',
 definition: String.raw`\tau_{\rm plot}=cv/r_s-\rho`,
 assumptions: ['Schwarzschild radial diagram', 'v in seconds', 'rₛ = 2G_N M/c²']
};
scientificSymbols['euclidean-time'] = {
 id: 'euclidean-time', title: 'Euclidean time parameter', base: String.raw`\tau`,
 suffix: '_E', role: 'neutral', kind: 'Analytic continuation · seconds',
 description: 'The substitution t = −iτ_E introduces a real parameter in an analytically continued calculation. It is not the proper time of an observer inside a black hole. The thermal interpretation requires quantum statistical mechanics in addition to geometry.',
 lesson: 'chapter-22.html#temperature-and-quantum-input-step-2', units: 'seconds',
 definition: String.raw`t=-i\tau_E`, assumptions: ['Analytic continuation', 'Thermal interpretation requires quantum input']
};
scientificSymbols['proper-time'].units = 'seconds';

const clockChapters = new Set([3, 5, 7, 8, 9, 10, 11, 12, 15, 17, 18, 21, 22, 24]);
const timeBindings = [
 {chapter: 17, suffix: 'plot', id: 'plot-time'},
 {chapter: 22, suffix: 'E', id: 'euclidean-time'},
 {chapter: 3, suffix: 'home', id: 'proper-time'},
 {chapter: 3, suffix: 'traveler', id: 'proper-time'},
];
export function timeSymbol(chapter, parts) {
 if (!parts.length) return clockChapters.has(Number(chapter)) ? 'proper-time' : null;
 if (parts.length !== 1 || parts[0].kind !== '_') return null;
 const suffix = parts[0].value.replace(/\\(?:mathrm|text|rm)\b/g, '').replace(/[{}\s]/g, '');
 return timeBindings.find(binding => binding.chapter === Number(chapter) && binding.suffix === suffix)?.id || null;
}
export const symbolEntries = Object.fromEntries(Object.entries(scientificSymbols).map(([id, s]) =>
 [id, [s.title, s.base, s.suffix, s.role, s.kind, s.description, s.lesson]]));
