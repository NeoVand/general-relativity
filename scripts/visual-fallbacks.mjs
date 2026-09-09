import {chartCoordinates, polarMeasurements, polarBasis, transportedFrame, radialNullDirections} from '../web/visual-lessons.js';

// The static route uses the same geometric calculations as the interactive view.
// These are measurements at a declared state, available before any browser code.
export function visualFallback(type, render) {
 const m = tex => render(`$${tex}$`);
 let rows, description;
 if (type === 'charts') {
  const c = chartCoordinates([.8, 0, .6]);
  description = 'On the unit sphere, the point (0.8, 0, 0.6) has two regular addresses. Neither chart changes the point.';
  rows = [['North-pole projection', `(u,v)=(${c.north.join(',')})`], ['South-pole projection', `(p,q)=(${c.south.join(',')})`]];
 } else if (type === 'metric') {
  const p = polarMeasurements(3, .03, .01);
  description = 'At radius 3 m, compare a radial step of 0.03 m with an angular step of 0.01 rad. The tangent prediction is a local approximation.';
  rows = [['Radial length', String.raw`\Delta r=0.03\,\mathrm m`], ['Angular length', String.raw`r\Delta\theta=0.03\,\mathrm m`], ['Tangent prediction', String.raw`\ell_{\rm tan}=${p.tangent.toFixed(5)}\,\mathrm m`]];
 } else if (type === 'basis') {
  const p = polarBasis(Math.PI / 4);
  description = 'At an angle of 45°, the polar unit basis has rotated, but the Cartesian vector still points east.';
  rows = [['Polar components', String.raw`(V^{\hat r},V^{\hat\theta})=(${p.components.map(v => v.toFixed(4)).join(',')})`], ['Cartesian vector', String.raw`(V^x,V^y)=(1,0)`]];
 } else if (type === 'transport') {
  const p = transportedFrame(3);
  description = 'After the three great-circle arcs, the vector returns to its initial point. Its final direction is perpendicular to its initial direction (0, 0, 1).';
  rows = [['Final point', `(X,Y,Z)=(${p.point.map(v => Math.round(v)).join(',')})`], ['Final vector', `(V^X,V^Y,V^Z)=(${p.vector.map(v => Math.round(v)).join(',')})`], ['Turn relative to the initial vector', String.raw`\Delta\alpha=\pi/2`]];
 } else if (type === 'horizon') {
  description = 'The two slopes are coordinate directions in the dimensionless radial plot. At each event, both point toward the future. A local observer still measures the speed of light as c.';
  rows = [['Ingoing light at every event', String.raw`d\rho/d\tau_{\rm plot}=-1`], ...[3, 1, .5].map(rho => [`Outgoing light at ρ = ${rho}`, String.raw`d\rho/d\tau_{\rm plot}=${radialNullDirections(rho).outgoing.toFixed(3)}`])];
 } else throw Error(`No static measurements for visual lesson ${type}`);
 return `<div class="visual-summary"><p class="eyebrow">A STATE YOU CAN CHECK</p><p>${description}</p><dl>${rows.map(([label,tex]) => `<div><dt>${label}</dt><dd>${m(tex)}</dd></div>`).join('')}</dl><p>The worked steps explain these measurements. Interactive controls appear when available.</p></div>`;
}
