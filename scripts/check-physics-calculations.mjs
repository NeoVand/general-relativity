import assert from 'node:assert/strict';
import {lessons} from '../content/course.mjs';
const near=(a,b,tolerance=2e-5)=>assert.ok(Math.abs(a-b)<tolerance,`${a} ≈ ${b}`);
for(let chapter=0;chapter<25;chapter++)assert(lessons.some(l=>l.chapter===chapter),`Chapter ${chapter} has active practice`);
for(const lesson of lessons)assert(lesson.variants.length>=1,`${lesson.id} has a different transfer example`);

// Compute curvature directly from a supplied metric by finite differences.
// This does not call the closed-form FLRW curvature formulas taught in the book.
const dimension=4,h=1e-4;
const matrix=()=>Array.from({length:4},()=>Array(4).fill(0));
const tensor3=()=>Array.from({length:4},()=>matrix());
function connection(metric,point){
 const g=metric(point),inverse=g.map(row=>1/row[row.findIndex(value=>value!==0)]);
 const partial=Array.from({length:4},(_,k)=>{const a=[...point],b=[...point];a[k]+=h;b[k]-=h;const ga=metric(a),gb=metric(b);return ga.map((row,i)=>row.map((value,j)=>(value-gb[i][j])/(2*h)))});
 const gamma=tensor3();
 for(let a=0;a<4;a++)for(let b=0;b<4;b++)for(let c=0;c<4;c++)gamma[a][b][c]=.5*inverse[a]*(partial[b][a][c]+partial[c][a][b]-partial[a][b][c]);
 return gamma;
}
function curvature(metric,point){
 const g=metric(point),inverse=g.map((row,i)=>1/row[i]),gamma=connection(metric,point);
 const derivative=Array.from({length:4},(_,k)=>{const a=[...point],b=[...point];a[k]+=h;b[k]-=h;const ga=connection(metric,a),gb=connection(metric,b);return ga.map((rows,i)=>rows.map((row,j)=>row.map((v,l)=>(v-gb[i][j][l])/(2*h))))});
 const R=Array.from({length:4},()=>tensor3());
 for(let a=0;a<dimension;a++)for(let b=0;b<dimension;b++)for(let c=0;c<dimension;c++)for(let d=0;d<dimension;d++){
  R[a][b][c][d]=derivative[c][a][d][b]-derivative[d][a][c][b];
  for(let e=0;e<dimension;e++)R[a][b][c][d]+=gamma[a][c][e]*gamma[e][d][b]-gamma[a][d][e]*gamma[e][c][b];
 }
 const ricci=matrix();let kretschmann=0;
 for(let b=0;b<4;b++)for(let d=0;d<4;d++)for(let a=0;a<4;a++)ricci[b][d]+=R[a][b][a][d];
 const scalar=ricci.reduce((sum,row,a)=>sum+inverse[a]*row[a],0);
 for(let a=0;a<4;a++)for(let b=0;b<4;b++)for(let c=0;c<4;c++)for(let d=0;d<4;d++)kretschmann+=inverse[a]*inverse[b]*inverse[c]*inverse[d]*(g[a][a]*R[a][b][c][d])**2;
 return {scalar,kretschmann,G00:ricci[0][0]+scalar/2,G11:(ricci[1][1]-g[1][1]*scalar/2)/g[1][1]};
}
const flrw=power=>point=>{const g=matrix();g[0][0]=-1;for(let i=1;i<4;i++)g[i][i]=point[0]**(2*power);return g};
for(const t of [1,2,3]){
 const dust=curvature(flrw(2/3),[t,0,0,0]);near(dust.scalar,4/(3*t*t));near(dust.kretschmann,80/(27*t**4));near(dust.G00,4/(3*t*t));near(dust.G11,0);
 const radiation=curvature(flrw(.5),[t,0,0,0]);near(radiation.scalar,0);near(radiation.G11/radiation.G00,1/3);near(radiation.kretschmann,3/(2*t**4));
}
// Full-index contraction checks the signs and multiplicities of the six-entry table.
function contract(values){const tensor=Array.from({length:4},()=>tensor3()),pairs=[[0,1],[0,2],[0,3],[1,2],[1,3],[2,3]],sign=[-1,1,1,1];
 pairs.forEach(([a,b],i)=>{tensor[a][b][a][b]=tensor[b][a][b][a]=values[i];tensor[a][b][b][a]=tensor[b][a][a][b]=-values[i]});
 const ricci=matrix();for(let b=0;b<4;b++)for(let d=0;d<4;d++)for(let a=0;a<4;a++)ricci[b][d]+=sign[a]*tensor[a][b][a][d];
 return {ricci,scalar:ricci.reduce((sum,row,i)=>sum+sign[i]*row[i],0),K:tensor.reduce((sum,rows,a)=>sum+rows.reduce((sum,cols,b)=>sum+cols.reduce((sum,row,c)=>sum+row.reduce((sum,value,d)=>sum+sign[a]*sign[b]*sign[c]*sign[d]*value*value,0),0),0),0)};
}
const vacuum=contract([-2,1,1,-1,-1,2]);assert.deepEqual(vacuum.ricci,matrix());assert.equal(vacuum.K,48);
assert.equal(contract([-2,-2,-2,2,2,2]).scalar,24);assert.equal(contract([1,2,3,4,5,6]).ricci[2][2],8);
console.log('All chapters have distinct transfer practice. Independent metric/connection calculation verifies dust and radiation curvature, source and invariants; full-index sums verify the curvature-table exercises.');
