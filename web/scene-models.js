// Pure physical models used by the scenes. Coordinates here have no rendering units.
export const covectorCrossings = extent => [1, 2, 3].filter(x => x <= 3 * extent + 1e-10).map(x => [x, 2 * x / 3, x / 3]);
// A point on x²+z²=y² is visible unless the segment toward the camera meets
// the finite cone again. The known root at the point leaves one linear factor.
// This includes views through either open rim, perspective, and camera height.
export function conePointVisible([x,y,z],[cx,cy,cz],height=2.2){
 const dx=cx-x,dy=cy-y,dz=cz-z;
 const a=dx*dx+dz*dz-dy*dy,b=2*(x*dx+z*dz-y*dy);
 if(Math.abs(a)<1e-12)return true;
 const s=-b/a;
 return !(s>1e-6&&s<1-1e-6&&Math.abs(y+s*dy)<height-1e-6);
}

// r and z are measured in a fixed reference length R; compactness is r_s/R.
export function embeddingHeight(r, compactness) {
 return 2 * Math.sqrt(compactness * Math.max(0, r - compactness));
}
export function radialProperLength(a, b, compactness) {
 if (compactness === 0) return b - a;
 if (a < compactness || b < a) throw new RangeError('The ruler must lie outside the horizon.');
 const primitive = r => Math.sqrt(r * (r - compactness)) + compactness * Math.log(Math.sqrt(r) + Math.sqrt(r - compactness));
 return primitive(b) - primitive(a);
}
export function waveStrain(z, phase, amplitude, angularFrequency) {
 // z/L0 and phase=omega*t. omega*L0/c=angularFrequency, hence k=omega/c.
 return amplitude * Math.sin(angularFrequency * z - phase);
}
export function waveDisplacement(x, y, strain, polarization = 'plus') {
 return polarization === 'cross' ? [x + strain * y / 2, y + strain * x / 2] : [x * (1 + strain / 2), y * (1 - strain / 2)];
}
