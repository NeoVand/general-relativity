import assert from 'node:assert/strict';
import {lessons} from '../content/course.mjs';
const near=(a,b,tolerance=2e-5)=>assert.ok(Math.abs(a-b)<tolerance,`${a} ≈ ${b}`);
for(let chapter=0;chapter<25;chapter++)assert(lessons.some(l=>l.chapter===chapter),`Chapter ${chapter} has active practice`);
for(const lesson of lessons)assert(lesson.variants.length>=1,`${lesson.id} has a different transfer example`);

// Compute curvature directly from a supplied metric by finite differences.
// This does not call the closed-form curvature formulas taught in the book.
const dimension=4,h=1e-4;
const matrix=()=>Array.from({length:4},()=>Array(4).fill(0));
const tensor3=()=>Array.from({length:4},()=>matrix());
function invert(g){
 const rows=g.map((row,i)=>[...row,...Array.from({length:4},(_,j)=>+(i===j))]);
 for(let col=0;col<4;col++){
  let pivot=col;
  for(let row=col+1;row<4;row++)if(Math.abs(rows[row][col])>Math.abs(rows[pivot][col]))pivot=row;
  assert.ok(Math.abs(rows[pivot][col])>1e-12,'The test metric is nondegenerate');
  [rows[col],rows[pivot]]=[rows[pivot],rows[col]];
  const scale=rows[col][col];rows[col]=rows[col].map(value=>value/scale);
  for(let row=0;row<4;row++)if(row!==col){const factor=rows[row][col];rows[row]=rows[row].map((value,j)=>value-factor*rows[col][j])}
 }
 return rows.map(row=>row.slice(4));
}
const indices=Array.from({length:256},(_,i)=>[i>>6,(i>>4)%4,(i>>2)%4,i%4]);
const flatIndex=([a,b,c,d])=>64*a+16*b+4*c+d;
function connection(metric,point){
 const g=metric(point),inverse=invert(g);
 const partial=Array.from({length:4},(_,k)=>{const a=[...point],b=[...point];a[k]+=h;b[k]-=h;const ga=metric(a),gb=metric(b);return ga.map((row,i)=>row.map((value,j)=>(value-gb[i][j])/(2*h)))});
 const gamma=tensor3();
 for(let a=0;a<4;a++)for(let b=0;b<4;b++)for(let c=0;c<4;c++)for(let k=0;k<4;k++)gamma[a][b][c]+=.5*inverse[a][k]*(partial[b][k][c]+partial[c][k][b]-partial[k][b][c]);
 return gamma;
}
function curvature(metric,point){
 const g=metric(point),inverse=invert(g),gamma=connection(metric,point);
 const derivative=Array.from({length:4},(_,k)=>{const a=[...point],b=[...point];a[k]+=h;b[k]-=h;const ga=connection(metric,a),gb=connection(metric,b);return ga.map((rows,i)=>rows.map((row,j)=>row.map((v,l)=>(v-gb[i][j][l])/(2*h))))});
 const R=Array.from({length:4},()=>tensor3());
 for(let a=0;a<dimension;a++)for(let b=0;b<dimension;b++)for(let c=0;c<dimension;c++)for(let d=0;d<dimension;d++){
  R[a][b][c][d]=derivative[c][a][d][b]-derivative[d][a][c][b];
  for(let e=0;e<dimension;e++)R[a][b][c][d]+=gamma[a][c][e]*gamma[e][d][b]-gamma[a][d][e]*gamma[e][c][b];
 }
 const ricci=matrix();
 for(let b=0;b<4;b++)for(let d=0;d<4;d++)for(let a=0;a<4;a++)ricci[b][d]+=R[a][b][a][d];
 const scalar=ricci.reduce((sum,row,a)=>sum+row.reduce((sum,value,b)=>sum+inverse[a][b]*value,0),0);
 const lowered=indices.map(([a,b,c,d])=>g[a].reduce((sum,value,k)=>sum+value*R[k][b][c][d],0));
 let raised=lowered;
 for(let slot=0;slot<4;slot++){
  const previous=raised;
  raised=indices.map(index=>inverse[index[slot]].reduce((sum,value,k)=>{const source=[...index];source[slot]=k;return sum+value*previous[flatIndex(source)]},0));
 }
 const kretschmann=lowered.reduce((sum,value,i)=>sum+value*raised[i],0);
 return {ricci,lowered,scalar,kretschmann,G00:ricci[0][0]-g[0][0]*scalar/2,G11:g[1][1]?(ricci[1][1]-g[1][1]*scalar/2)/g[1][1]:null};
}
// A conformal rescaling of flat spacetime supplies an independent sign check
// for the added conformal-curvature derivation. This metric has sectional
// curvature -1 and vanishing Weyl curvature, although Ricci is nonzero.
for(const z of [1,2]){
 const metric=point=>matrix().map((row,i)=>row.map((_,j)=>i===j?(i===0?-1:1)/point[3]**2:0));
 const point=[.2,.3,.4,z],g=metric(point),result=curvature(metric,point);
 near(result.scalar,-12);near(result.kretschmann,24);
 indices.forEach(([a,b,c,d],i)=>near(result.lowered[i],-(g[a][c]*g[b][d]-g[a][d]*g[b][c])));
 for(let a=0;a<4;a++)for(let b=0;b<4;b++)near(result.ricci[a][b],-3*g[a][b]);
}
// The wave metric is not diagonal. A true inverse and full index raising are
// essential: treating the contraction as a sum of squares gives the wrong K.
for(const U of [.2,.7,1.1]){
 const A=u=>.2+.03*u,B=u=>.07*Math.cos(u);
 const metric=([u,v,x,y])=>{const g=matrix();g[0][0]=A(u)*(x*x-y*y)+2*B(u)*x*y;g[0][1]=g[1][0]=-1;g[2][2]=g[3][3]=1;return g};
 const point=[U,-.2,.4,-.3],result=curvature(metric,point),g=metric(point),inverse=invert(g);
 for(let a=0;a<4;a++)for(let b=0;b<4;b++)near(g[a].reduce((sum,value,k)=>sum+value*inverse[k][b],0),+(a===b));
 near(inverse[0][0],0);near(inverse[1][1],-g[0][0]);
 near(result.lowered[flatIndex([0,2,0,2])],-A(U));
 near(result.lowered[flatIndex([0,3,0,3])],A(U));
 near(result.lowered[flatIndex([0,2,0,3])],-B(U));
 result.ricci.flat().forEach(value=>near(value,0));near(result.scalar,0);near(result.kretschmann,0);
 assert.ok(Math.max(...result.lowered.map(Math.abs))>.1,'Nonzero tidal curvature survives zero scalar contractions');
}
// At the origin these static quadratic potentials have zero value and first
// derivatives. Curvature there depends only on their Hessians, so the test
// isolates the separate temporal/spatial contributions without fitting a
// numerical solution or reusing the chapter's Ricci formulas.
const temporal=[.2,.3,.4],amplitude=.001;
for(const spatial of [[0,0,0],temporal,[.5,.6,.7]]){
 const metric=point=>{
  const phi=amplitude*temporal.reduce((sum,value,i)=>sum+value*point[i+1]**2,0);
  const psi=amplitude*spatial.reduce((sum,value,i)=>sum+value*point[i+1]**2,0);
  const g=matrix();g[0][0]=-(1+2*phi);for(let i=1;i<4;i++)g[i][i]=1-2*psi;return g;
 };
 const result=curvature(metric,[0,0,0,0]);
 const laplacianPhi=2*amplitude*temporal.reduce((a,b)=>a+b,0),laplacianPsi=2*amplitude*spatial.reduce((a,b)=>a+b,0);
 near(result.ricci[0][0],laplacianPhi,2e-7);near(result.G00,2*laplacianPsi,2e-7);
 near(result.scalar,4*laplacianPsi-2*laplacianPhi,2e-7);
 for(let i=0;i<3;i++){
  near(result.ricci[i+1][i+1],laplacianPsi+2*amplitude*(spatial[i]-temporal[i]),2e-7);
  near(result.ricci[i+1][i+1]-result.scalar/2,2*amplitude*(spatial[i]-temporal[i])-(laplacianPsi-laplacianPhi),2e-7);
 }
}
const flrw=power=>point=>{const g=matrix();g[0][0]=-1;for(let i=1;i<4;i++)g[i][i]=point[0]**(2*power);return g};
// Test the time-dependent spherical ansatz before imposing vacuum. This
// independently checks the off-diagonal equation used in the staticity proof.
for(const point of [[.3,2,.8,.1],[.7,3,1.2,.4]]){
 const metric=([t,r,theta])=>{
  const g=matrix(),alpha=.03*t*r,beta=.04*t*t+.02*r;
  g[0][0]=-Math.exp(2*alpha);g[1][1]=Math.exp(2*beta);
  g[2][2]=r*r;g[3][3]=r*r*Math.sin(theta)**2;return g;
 };
 near(curvature(metric,point).ricci[0][1],2*.08*point[0]/point[1],2e-6);
}
// Kerr is supplied as an exact solution. Differentiate its full metric,
// including the factor of two in the time-angle cross term, to check vacuum.
// Zero spin also checks the Schwarzschild curvature contraction at a horizon-
// exterior point; the ingoing chart below checks that invariant at the horizon.
for(const spin of [0,.4,.8]){
 const metric=([t,r,theta])=>{
  const m=1,a=spin,S=r*r+a*a*Math.cos(theta)**2,D=r*r-2*m*r+a*a,g=matrix();
  g[0][0]=-(1-2*m*r/S);g[0][3]=g[3][0]=-2*m*a*r*Math.sin(theta)**2/S;
  g[1][1]=S/D;g[2][2]=S;
  g[3][3]=(r*r+a*a+2*m*a*a*r*Math.sin(theta)**2/S)*Math.sin(theta)**2;return g;
 };
 const result=curvature(metric,[.1,5,.9,.2]);
 result.ricci.flat().forEach(value=>near(value,0,3e-6));
 if(spin===0)near(result.kretschmann,48/5**6,1e-7);
}
for(const r of [1,2,3]){
 const metric=([v,r,theta])=>{const g=matrix();g[0][0]=-(1-2/r);g[0][1]=g[1][0]=1;g[2][2]=r*r;g[3][3]=r*r*Math.sin(theta)**2;return g};
 const result=curvature(metric,[.1,r,.9,.2]);
 result.ricci.flat().forEach(value=>near(value,0,3e-6));
 near(result.kretschmann,48/r**6,2e-5);
}
for(const t of [1,2,3]){
 const dust=curvature(flrw(2/3),[t,0,0,0]);near(dust.scalar,4/(3*t*t));near(dust.kretschmann,80/(27*t**4));near(dust.G00,4/(3*t*t));near(dust.G11,0);
 const radiation=curvature(flrw(.5),[t,0,0,0]);near(radiation.scalar,0);near(radiation.G11/radiation.G00,1/3);near(radiation.kretschmann,3/(2*t**4));
}
// Nonzero spatial curvature is included here, rather than inferring conformal
// flatness from the k=0 examples. Test the complete Weyl subtraction in the
// coordinate basis, using Ricci obtained from numerical metric derivatives.
for(const k of [-1,0,1]){
 const power=.7,point=[2,.4,.9,.2];
 const metric=([t,chi,theta])=>{const a=t**power,g=matrix();g[0][0]=-1;g[1][1]=a*a/(1-k*chi*chi);g[2][2]=a*a*chi*chi;g[3][3]=g[2][2]*Math.sin(theta)**2;return g};
 const g=metric(point),r=curvature(metric,point),A=power*(power-1)/point[0]**2,B=power**2/point[0]**2+k/point[0]**(2*power);
 near(r.scalar,6*(A+B),3e-5);near(r.kretschmann,12*(A*A+B*B),3e-5);
 for(const [i,[a,b,c,d]] of indices.entries()){
  const ricciPart=.5*(g[a][c]*r.ricci[b][d]-g[a][d]*r.ricci[b][c]-g[b][c]*r.ricci[a][d]+g[b][d]*r.ricci[a][c]);
  const scalarPart=r.scalar/6*(g[a][c]*g[b][d]-g[a][d]*g[b][c]);
  near(r.lowered[i]-ricciPart+scalarPart,0,3e-6);
 }
}
// Full-index contraction checks the signs and multiplicities of the six-entry table.
function contract(values){const tensor=Array.from({length:4},()=>tensor3()),pairs=[[0,1],[0,2],[0,3],[1,2],[1,3],[2,3]],sign=[-1,1,1,1];
 pairs.forEach(([a,b],i)=>{tensor[a][b][a][b]=tensor[b][a][b][a]=values[i];tensor[a][b][b][a]=tensor[b][a][a][b]=-values[i]});
 const ricci=matrix();for(let b=0;b<4;b++)for(let d=0;d<4;d++)for(let a=0;a<4;a++)ricci[b][d]+=sign[a]*tensor[a][b][a][d];
 return {ricci,scalar:ricci.reduce((sum,row,i)=>sum+sign[i]*row[i],0),K:tensor.reduce((sum,rows,a)=>sum+rows.reduce((sum,cols,b)=>sum+cols.reduce((sum,row,c)=>sum+row.reduce((sum,value,d)=>sum+sign[a]*sign[b]*sign[c]*sign[d]*value*value,0),0),0),0)};
}
const vacuum=contract([-2,1,1,-1,-1,2]);assert.deepEqual(vacuum.ricci,matrix());assert.equal(vacuum.K,48);
assert.equal(contract([-2,-2,-2,2,2,2]).scalar,24);assert.equal(contract([1,2,3,4,5,6]).ricci[2][2],8);
console.log('All chapters have distinct transfer practice. Independent metric derivatives verify FLRW sources and Weyl cancellation for all three spatial curvatures, spherical time dependence, Kerr vacuum, regular horizon curvature, conformal and wave invariants, and the separate weak-field potentials.');
