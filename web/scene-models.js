// Pure physical models used by the scenes. Coordinates here have no rendering units.
export const covectorCrossings = extent => [1, 2, 3].filter(x => x <= 3 * extent + 1e-10).map(x => [x, 2 * x / 3, x / 3]);
export const coneNearSide = (x, z, cameraX, cameraZ) => x * cameraX + z * cameraZ >= 0;

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
