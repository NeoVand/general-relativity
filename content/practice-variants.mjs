const s=String.raw;
// Authored transfer variants change the calculation, not just the answer order.
// Each remains a bounded check of this particular method.
export const practiceVariants={
 'coordinates-change-measurements-do-not':{
  id:'negative-coordinate',prompt:s`Use $u=x$, $v=y+x^2$ and $f=2x-y$. At $x=-1$, the tangent is $(dx/d\lambda,dy/d\lambda)=(2,1)$. Calculate $df/d\lambda$ in the new coordinates.`,answer:3,
  hint:s`The transformed tangent is $(2,-3)$. Rewrite $f$ before differentiating.`,
  solution:s`$f'=2u-v+u^2$, so at $u=-1$ the covector components are $(0,-1)$. The pairing is $0(2)+(-1)(-3)=3$. Directly, $2(2)-1=3$.`
 },
 'two-maps-one-sphere':{
  id:'off-axis-tangent',prompt:s`At $(u,v)=(1,1)$, a path has tangent $(du/d\lambda,dv/d\lambda)=(2,-1)$. For $p=u/(u^2+v^2)$, find $dp/d\lambda$.`,answer:.5,
  hint:s`Differentiate with respect to both $u$ and $v$. Neither coordinate is zero here.`,
  solution:s`At this point, $\partial_up=(2-2)/4=0$ and $\partial_vp=-2/4=-1/2$. Thus $dp/d\lambda=0(2)+(-1/2)(-1)=1/2$.`
 },
 'a-metric-converts-labels-into-lengths':{
  id:'inward-and-around',prompt:s`At $r=6\,\mathrm m$, a particle has $dr/dt=-5\,\mathrm{m/s}$ and $d\theta/dt=2\,\mathrm{s^{-1}}$. What is its instantaneous speed?`,answer:13,
  hint:s`The radial velocity is inward. Its contribution to squared speed remains positive.`,
  solution:s`The orthonormal velocity components are $(-5,12)\,\mathrm{m/s}$. Their norm is $\sqrt{25+144}=13\,\mathrm{m/s}$. The coordinate angular rate is not itself a speed in metres per second.`
 },
 'differentiate-the-arrow-not-its-address':{
  id:'negative-angular-rate',prompt:s`At $r=2\,\mathrm m$ and $\theta=\pi/2$, the Cartesian velocity is $(4,0)\,\mathrm{m/s}$. Find $d\theta/dt$.`,answer:-2,
  hint:s`At the top of the circle, $\hat e_\theta=(-1,0)$. Project first, then divide by radius.`,
  solution:s`$V^{\hat\theta}=(4,0)\cdot(-1,0)=-4\,\mathrm{m/s}$. Therefore $d\theta/dt=-4/2=-2\,\mathrm{s^{-1}}$. The negative sign means decreasing angle.`
 },
 'carry-a-direction-without-turning-it':{
  id:'different-radius-and-area',prompt:s`A geodesic triangle on a sphere of radius $3\,\mathrm m$ encloses area $\pi/2\,\mathrm{m^2}$. Find the parallel-transport rotation magnitude in degrees.`,answer:10,
  hint:s`The rotation in radians is area divided by radius squared.`,
  solution:s`$\Delta\alpha=(\pi/2)/9=\pi/18$ radians, or $10^\circ$. Reversing traversal reverses the oriented rotation; its magnitude is unchanged.`
 },
 'measure-curvature-with-a-string':{
  id:'larger-sphere',prompt:s`A small geodesic circle has radius $\rho=0.20\,\mathrm m$ and measured ratio $C/(2\pi\rho)=0.9997333$. Use the leading small-circle formula to estimate the radius of the round sphere.`,answer:5,tolerance:.003,
  hint:s`The deficit is $1-0.9997333$. Invert $\delta\simeq\rho^2/(6a^2)$.`,
  solution:s`$a\simeq0.20/\sqrt{6(0.0002667)}\simeq4.99969\,\mathrm m$, about $5\,\mathrm m$. The inferred $\rho/a\simeq0.04$ supports using the small-circle expansion.`
 },
 'orbit-conservation':{
  id:'clockwise-orbit',prompt:s`A particle is at $(x,y)=(-2,3)\,\mathrm m$ with velocity $(4,-1)\,\mathrm{m/s}$. Find its signed specific angular momentum about the origin.`,answer:-10,
  hint:s`Keep the signs in $h=x\dot y-y\dot x$.`,
  solution:s`$h=(-2)(-1)-3(4)=-10\,\mathrm{m^2/s}$. Negative angular momentum corresponds to clockwise swept area in these oriented axes.`
 },
 'phase-drift':{
  id:'retrograde-phase',prompt:s`An exact toy orbit has reciprocal radius proportional to $1+0.2\cos(1.02\phi)$. Find the signed angular shift beyond $2\pi$ between successive perihelia, in radians.`,answer:2*Math.PI*(1/1.02-1),tolerance:.0005,
  hint:s`One radial cycle requires $1.02\Delta\phi=2\pi$. Subtract $2\pi$.`,
  solution:s`$\Delta\phi_{\rm shift}=2\pi(1/1.02-1)\simeq-0.12320\,\mathrm{rad}$. This specified toy orbit regresses; it is not the prograde Schwarzschild correction.`
 },
 'waves-and-retarded-time':{
  id:'negative-time-origin',prompt:s`In a flat-space model, a source is $1.5\times10^9\,\mathrm m$ away and $c=3.0\times10^8\,\mathrm{m/s}$. Reception occurs at coordinate time $t=2\,\mathrm s$. At what coordinate time was the signal emitted?`,answer:-3,
  hint:s`An event can precede the arbitrary zero of a clock coordinate. Compute $t-R/c$.`,
  solution:s`The travel time is $5\,\mathrm s$, so $t_{\rm ret}=2-5=-3\,\mathrm s$. Emission still precedes reception; a negative coordinate time does not violate causality.`
 },
 'horizon-directions':{
  id:'outside-slope',prompt:s`At areal radius $r=2r_s$, calculate the outgoing light slope $d\rho/d\tau_{\rm plot}$.`,answer:1/3,tolerance:.0005,
  hint:s`Use the dimensionless radius $\rho=2$, not $r$ in metres.`,
  solution:s`$(\rho-1)/(\rho+1)=(2-1)/(2+1)=1/3$. The positive slope points toward increasing areal radius. It is a coordinate rate, not a local light-speed measurement.`
 },
 'kruskal-and-causal-maps':{
  id:'earlier-coordinate-time',prompt:s`An event has $\arctan U=-\pi/4$ and $\arctan V=\pi/6$. Find $T_c$ as a multiple of $\pi$; enter the coefficient.`,answer:-1/24,tolerance:.0005,
  hint:s`Average the two compressed null coordinates, including the negative sign.`,
  solution:s`$T_c=(-\pi/4+\pi/6)/2=-\pi/24$. Enter $-1/24$ or approximately $-0.041667$. Future direction is not determined by whether this coordinate is positive.`
 },
 'oriented-stokes':{
  id:'reverse-orientation',prompt:s`For $\alpha=xy\,dy$, integrate clockwise around the dimensionless rectangle $0\le x\le3$, $0\le y\le2$.`,answer:-6,
  hint:s`The right edge is traversed downward for clockwise orientation.`,
  solution:s`Only the right edge contributes: $\int_2^0 3y\,dy=-6$. Equivalently, reverse the sign of the positively oriented surface integral.`
 },
 'temperature-and-quantum-input':{
  id:'temperature-to-entropy',prompt:s`A nonrotating, uncharged black hole has twice the Hawking temperature of a second one. With the conventional entropy constant $S_0=0$, what is the first hole's entropy divided by the second's?`,answer:.25,
  hint:s`First infer the mass ratio from $T_H\propto1/M$, then use $S\propto M^2$.`,
  solution:s`Twice the temperature means half the mass. The entropy ratio is $(1/2)^2=1/4$. This compares the stated semiclassical equilibrium family, not arbitrary evaporating end states.`
 }
};

const identity = value => {
 let hash=2166136261;
 for(const character of value)hash=Math.imul(hash^character.codePointAt(0),16777619);
 return (hash>>>0).toString(36);
};
export function prepareLesson(lesson,index) {
 const choices=lesson.practice.choices.map(choice=>({...choice,id:choice.id||`option-${identity(choice.text)}`}));
 const rotation=index%choices.length;
 const ordered=[...choices.slice(rotation),...choices.slice(0,rotation)];
 const extra=practiceVariants[lesson.id];
 const transfer={...lesson.transfer,id:'original',version:1};
 return {...lesson,practice:{...lesson.practice,choices:ordered},transfer,
  variants:extra?[{...transfer,...extra,version:1}]:[]};
}
