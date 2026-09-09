import * as THREE from 'three';
import {earthFlow} from './earth-flow.js';
import {covectorCrossings,coneNearSide,embeddingHeight,radialProperLength,waveStrain} from './scene-models.js';
import {OrbitControls} from './assets/three/OrbitControls.js';
import {CSS2DRenderer,CSS2DObject} from './assets/three/CSS2DRenderer.js';
const V=(x=0,y=0,z=0)=>new THREE.Vector3(x,y,z);
const instances=[];
const labelsMargin=38;
function setView(el,view){
 const diagram=el.querySelector('.scene-diagram');if(view==='diagram'&&!diagram)return;
 el.dataset.activeView=view;
 if(diagram){diagram.hidden=view!=='diagram';diagram.inert=view!=='diagram';}
 el.querySelectorAll('[data-scene-mode]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.sceneMode===view)));
 const stage=el.querySelector('.scene-stage');
 if(diagram){
  stage.dataset.interactiveLabel||=stage.getAttribute('aria-label')||'Interactive geometry';
  if(view==='diagram'){
   const caption=diagram.querySelector('figcaption strong')?.textContent?.replace(/\.$/,'')||'Explanatory diagram';
   stage.setAttribute('aria-label',`${caption}. Static diagram.`);stage.removeAttribute('tabindex');
  }else{
   stage.setAttribute('aria-label',stage.dataset.interactiveLabel);
   if(el.dataset.ready==='true')stage.tabIndex=0;
  }
 }
 stage.querySelectorAll('canvas,.scene-labels').forEach(node=>{node.hidden=view==='diagram';node.inert=view==='diagram';});
}
function fallback(el,message){
 el.dataset.ready='fallback';el.querySelector('.scene-fallback span').textContent=message;
 if(el.querySelector('.scene-diagram'))setView(el,'diagram');
 el.querySelectorAll('[data-scene-mode=\"3d\"]').forEach(button=>{button.disabled=true;button.title='3D is unavailable in this browser';});
}
function createLab(el){
 if(el.dataset.ready)return;el.dataset.ready='loading';
 const stage=el.querySelector('.scene-stage'),kind=el.dataset.scene,input=el.querySelector('input'),output=el.querySelector('output');
 let renderer;
 try{renderer=new THREE.WebGLRenderer({antialias:true,alpha:true,powerPreference:'low-power'});}catch{fallback(el,'3D is unavailable in this browser. The diagram remains available.');return;}
 renderer.setPixelRatio(Math.min(devicePixelRatio,2));renderer.setClearColor(0,0);renderer.outputColorSpace=THREE.SRGBColorSpace;stage.append(renderer.domElement);
 renderer.domElement.setAttribute('aria-label','Rotatable three-dimensional geometry');renderer.domElement.setAttribute('role','presentation');
 const labelRenderer=new CSS2DRenderer();labelRenderer.domElement.className='scene-labels';stage.append(labelRenderer.domElement);
 const scene=new THREE.Scene(),camera=new THREE.PerspectiveCamera(36,1,.1,100);camera.position.set(6,4.5,7);
 const controls=new OrbitControls(camera,renderer.domElement);controls.enableDamping=false;controls.enablePan=false;controls.minDistance=3;controls.maxDistance=22;controls.target.set(0,.2,0);controls.update();
 scene.add(new THREE.HemisphereLight(0xffffff,0x667788,2));const light=new THREE.DirectionalLight(0xffffff,2.5);light.position.set(3,7,5);scene.add(light);
 const root=new THREE.Group();scene.add(root);
 let palette={};
 const mats=[];
 function material(role='geometry',options={}){const m=new THREE.MeshStandardMaterial({roughness:.48,metalness:.1,side:THREE.DoubleSide,...options});m.userData.role=role;mats.push(m);return m;}
 function wiremat(role='line',opacity=1){const m=new THREE.LineBasicMaterial({transparent:opacity<1,opacity});m.userData.role=role;mats.push(m);return m;}
 function line(points,role='geometry',opacity=1,parent=root){const o=new THREE.Line(new THREE.BufferGeometry().setFromPoints(points),wiremat(role,opacity));parent.add(o);return o;}
 function tube(points,role='geometry',radius=.014,parent=root){const curve=new THREE.CatmullRomCurve3(points),o=new THREE.Mesh(new THREE.TubeGeometry(curve,Math.max(24,points.length*2),radius,6,false),material(role));parent.add(o);return o;}
 function dot(pos,role='observer',radius=.04,parent=root){const m=new THREE.Mesh(new THREE.SphereGeometry(radius,16,12),material(role));m.position.copy(pos);parent.add(m);return m;}
 function arrow(from,to,role='observer',parent=root){const delta=to.clone().sub(from),o=new THREE.ArrowHelper(delta.clone().normalize(),from,delta.length(),0xffffff,.16,.08);for(const part of [o.line,o.cone]){part.material.userData.role=role;mats.push(part.material);}parent.add(o);return o;}
 function label(tex,pos,role='neutral'){const div=document.createElement('div');div.className=`scene-label math-${role}`;div.innerHTML=window.katex.renderToString(tex,{throwOnError:true});const obj=new CSS2DObject(div);obj.position.copy(pos);root.add(obj);return obj;}
 function grid(size=5,steps=10,y=0,role='line',parent=root){for(let i=0;i<=steps;i++){const v=-size/2+size*i/steps;line([V(-size/2,y,v),V(size/2,y,v)],role,.55,parent);line([V(v,y,-size/2),V(v,y,size/2)],role,.55,parent);}}
 function sphereGrid(r=1.65,parent=root){for(let j=1;j<12;j++){const phi=Math.PI*j/12;line(Array.from({length:101},(_,i)=>V(r*Math.sin(phi)*Math.cos(i*Math.PI/50),r*Math.cos(phi),r*Math.sin(phi)*Math.sin(i*Math.PI/50))),'geometry',.38,parent);}for(let j=0;j<12;j++){const phi=Math.PI*j/6;line(Array.from({length:101},(_,i)=>V(r*Math.sin(i*Math.PI/50)*Math.cos(phi),r*Math.cos(i*Math.PI/50),r*Math.sin(i*Math.PI/50)*Math.sin(phi))),'geometry',.38,parent);}}
 let update=()=>{},beforeRender=()=>{};
 if(kind==='earth'){
  update=earthFlow({el,stage,root,camera,controls,renderer,render});
 }else if(kind==='cone'){
  camera.position.set(6,4.2,7);controls.target.set(0,.3,0);
  const strokeSets=[];
  for(const sign of [-1,1]){
   const g=new THREE.ConeGeometry(2.2,2.2,80,1,true);g.translate(0,-1.1,0);if(sign===1)g.rotateZ(Math.PI);
   root.add(new THREE.Mesh(g,material('geometry',{transparent:true,opacity:sign===1?.10:.055,depthWrite:false})));
   const front=new THREE.LineSegments(new THREE.BufferGeometry(),wiremat('geometry',sign===1?.86:.58));
   const rearMaterial=new THREE.LineDashedMaterial({transparent:true,opacity:sign===1?.34:.23,dashSize:.085,gapSize:.065,depthWrite:false});rearMaterial.userData.role='geometry';mats.push(rearMaterial);
   const rear=new THREE.LineSegments(new THREE.BufferGeometry(),rearMaterial);root.add(front,rear);strokeSets.push({sign,front,rear});
  }
  let previousAngle=NaN;
  beforeRender=()=>{
   const localCamera=root.worldToLocal(camera.getWorldPosition(V())),angle=Math.atan2(localCamera.z,localCamera.x);
   if(Math.abs(angle-previousAngle)<1e-6)return;previousAngle=angle;
   let nearCount=0,farCount=0;
   for(const {sign,front,rear} of strokeSets){
    const near=[],far=[];
    const append=(a,b)=>{const midpoint=a.clone().add(b).multiplyScalar(.5),points=coneNearSide(midpoint.x,midpoint.z,localCamera.x,localCamera.z)?near:far;points.push(a,b);};
    // Split the rim into short segments so near/far styling follows the camera,
    // rather than encoding a permanent direction into the causal geometry.
    for(let i=0;i<192;i++){const a=i*Math.PI/96,b=(i+1)*Math.PI/96;append(V(2.2*Math.cos(a),sign*2.2,2.2*Math.sin(a)),V(2.2*Math.cos(b),sign*2.2,2.2*Math.sin(b)));}
    for(let j=0;j<12;j++){const a=j*Math.PI/6;append(V(),V(2.2*Math.cos(a),sign*2.2,2.2*Math.sin(a)));}
    for(const [object,points] of [[front,near],[rear,far]]){object.geometry.dispose();object.geometry=new THREE.BufferGeometry().setFromPoints(points);object.computeLineDistances();}
    nearCount+=near.length/2;farCount+=far.length/2;
   }
   el.dataset.coneDepth=JSON.stringify({near:nearCount,far:farCount,angle});
  };
  grid(5,10);arrow(V(0,-2.55,0),V(0,2.75,0),'ink');label('ct',V(0,2.95,0));label('x',V(2.8,0,0));label('y',V(0,0,2.8));label('ds^2=0',V(-1.5,1.85,0),'geometry');dot(V(),'curvature',.07);
  const worldline=arrow(V(),V(1,2,0),'observer'),endpoint=dot(V(1,2,0),'observer',.055);const ulabel=label(String.raw`u^\mu`,V(1.2,2.35,0),'observer');
  update=()=>{const b=+input.value/100,d=V(2*b,2,0);worldline.setDirection(d.clone().normalize());worldline.setLength(d.length(),.16,.08);endpoint.position.copy(d);ulabel.position.copy(d).add(V(.25,.28,0));output.innerHTML=window.katex.renderToString(`v/c=${b.toFixed(2)}`);el.dataset.measurement=b;el.dataset.narrationSource=`Light-cone experiment with two spatial dimensions shown. The observer speed is ${b.toFixed(2)} times the speed of light. The rose direction lies strictly inside the future light cone: it is timelike. The cone surface represents lightlike directions. Solid strokes are nearer the camera and dashed strokes are farther away; this depth cue changes when you orbit, not the causal classification.`;};
 }else if(kind==='sphere'){
  camera.position.set(4,3.4,4.5);controls.target.set(0,.3,0);
  root.add(new THREE.Mesh(new THREE.SphereGeometry(1.646,64,40),material('figure-tint',{roughness:.62,metalness:.04})));sphereGrid();
  const vertices=[V(0,1,0),V(1,0,0),V(0,0,1),V(0,1,0)];
  for(let j=0;j<3;j++){const axis=vertices[j].clone().cross(vertices[j+1]).normalize();tube(Array.from({length:41},(_,i)=>vertices[j].clone().applyAxisAngle(axis,i*Math.PI/80).multiplyScalar(1.66)),'transport',.024);}
  label('P',V(-.2,1.9,0));label('A',V(1.95,-.12,0));label('B',V(0,-.12,1.95));
  const moving=arrow(V(0,1.67,0),V(.7,1.67,0),'transport');arrow(V(0,1.68,0),V(.72,1.68,0),'observer');
  const tangentPlane=new THREE.Mesh(new THREE.PlaneGeometry(1.5,1.5),material('geometry',{transparent:true,opacity:.09,depthWrite:false}));root.add(tangentPlane);
  update=()=>{const t=+input.value/100,seg=Math.min(2,Math.floor(t)),a=(t-seg)*Math.PI/2;let vec=V(1,0,0);for(let j=0;j<seg;j++)vec.applyAxisAngle(vertices[j].clone().cross(vertices[j+1]).normalize(),Math.PI/2);const axis=vertices[seg].clone().cross(vertices[seg+1]).normalize(),pos=vertices[seg].clone().applyAxisAngle(axis,a);vec.applyAxisAngle(axis,a);moving.position.copy(pos.clone().multiplyScalar(1.68));moving.setDirection(vec);moving.setLength(.7,.14,.07);tangentPlane.position.copy(pos.clone().multiplyScalar(1.66));tangentPlane.quaternion.setFromUnitVectors(V(0,0,1),pos);output.innerHTML=t===3?'Returned · '+window.katex.renderToString(String.raw`\Delta\alpha=90^\circ`):`Arc ${seg+1} of 3 · ${Math.round((t-seg)*100)}%`;el.dataset.vector=JSON.stringify(vec.toArray());el.dataset.position=JSON.stringify(pos.toArray());};
 }else if(kind==='embedding'){
  camera.position.set(7,5.6,8);controls.target.set(0,-.8,0);
  const sceneScale=3.3,nr=48,na=96;
  // All lengths use the same fixed R. Aligning the outer rim vertically changes
  // only the arbitrary additive constant of the auxiliary embedding height.
  const point=(r,a,c)=>V(sceneScale*r*Math.cos(a),sceneScale*(embeddingHeight(r,c)-embeddingHeight(1,c)),sceneScale*r*Math.sin(a));
  const indices=[];for(let j=0;j<nr;j++)for(let i=0;i<na;i++){const a=j*(na+1)+i,b=a+na+1;indices.push(a,b,a+1,b,b+1,a+1);}
  const surface=new THREE.BufferGeometry();surface.setAttribute('position',new THREE.Float32BufferAttribute(new Float32Array((nr+1)*(na+1)*3),3));surface.setIndex(indices);
  root.add(new THREE.Mesh(surface,material('geometry',{transparent:true,opacity:.12,depthWrite:false,roughness:.9,metalness:0})));
  const wire=[];
  for(let j=1;j<=9;j++)wire.push({kind:'ring',fraction:j/9,object:line(Array.from({length:97},()=>V()),'geometry',j===9?.55:.26)});
  for(let i=0;i<20;i++)wire.push({kind:'meridian',angle:i*Math.PI/10,object:line(Array.from({length:65},()=>V()),'geometry',.23)});
  const horizon=line(Array.from({length:129},()=>V()),'curvature',.95),ruler=new THREE.Mesh(new THREE.BufferGeometry(),material('observer',{roughness:.8,metalness:0}));root.add(ruler);
  // A narrow physical ruler is easier to follow than an entire emphasized meridian.
  const rulerDots=[dot(V(),'observer',.07),dot(V(),'observer',.07)];
  const horizonLabel=label('r_s',V(),'curvature'),rulerLabel=label(String.raw`\Delta\ell`,V(),'observer');
  const measurement=el.querySelector('[data-embedding-measure]'),hint=el.querySelector('[data-embedding-ratio]'),azimuth=-.35;
  function setPoints(object,points){object.geometry.setFromPoints(points);object.geometry.computeBoundingSphere();}
  beforeRender=()=>{
   const projected=[0,.25,.5,.75,1].map(t=>point(.75+.25*t,azimuth,+input.value/100).project(camera));
   el.dataset.rulerScreen=JSON.stringify(projected.map(p=>[(p.x+1)/2,(1-p.y)/2]));
   // Offset perpendicular to the measured path in screen space. A fixed world
   // vertical offset can land on a steep ruler at high mass on a small screen.
   const {width,height}=stage.getBoundingClientRect();if(!width||!height)return;
   const dx=(projected[4].x-projected[0].x)*width,dy=-(projected[4].y-projected[0].y)*height;
   let nx=dy,ny=-dx,length=Math.hypot(nx,ny);if(length<1e-5){nx=0;ny=-1;length=1;}if(ny>0){nx=-nx;ny=-ny;}
   const margin=width<500?30:40,p=projected[2].clone();p.x+=2*margin*nx/length/width;p.y-=2*margin*ny/length/height;
   rulerLabel.position.copy(root.worldToLocal(p.unproject(camera)));
  };
  update=()=>{
   const c=+input.value/100,positions=surface.getAttribute('position');
   for(let j=0;j<=nr;j++){const r=c+(1-c)*(j/nr)**2;for(let i=0;i<=na;i++){const p=point(r,2*Math.PI*i/na,c);positions.setXYZ(j*(na+1)+i,p.x,p.y,p.z);}}
   positions.needsUpdate=true;surface.computeVertexNormals();surface.computeBoundingSphere();
   for(const item of wire){const points=item.kind==='ring'?Array.from({length:97},(_,i)=>point(c+(1-c)*item.fraction,i*Math.PI/48,c)):Array.from({length:65},(_,j)=>point(c+(1-c)*(j/64)**2,item.angle,c));setPoints(item.object,points);}
   setPoints(horizon,Array.from({length:129},(_,i)=>point(c,i*Math.PI/64,c)));
   ruler.geometry.dispose();ruler.geometry=new THREE.TubeGeometry(new THREE.CatmullRomCurve3(Array.from({length:41},(_,i)=>point(.75+.25*i/40,azimuth,c))),80,.023,8,false);
   rulerDots[0].position.copy(point(.75,azimuth,c));rulerDots[1].position.copy(point(1,azimuth,c));
   rulerLabel.position.copy(point(.875,azimuth,c)).add(V(0,.75,0));horizonLabel.position.copy(point(c,azimuth+1.0,c)).add(V(0,-.27,.05));
   const proper=radialProperLength(.75,1,c);
   output.innerHTML=window.katex.renderToString(String.raw`r_s/R=${c.toFixed(2)}`);
   if(measurement)measurement.innerHTML=window.katex.renderToString(String.raw`\Delta\ell=${proper.toFixed(3)}R`);
   if(hint)hint.textContent=`${(proper/.25).toFixed(2)} times the coordinate interval`;
   el.dataset.compactness=c;el.dataset.measurement=proper;el.dataset.ruler=JSON.stringify({from:.75,to:1,coordinate:.25,proper});
   el.dataset.narrationSource=`Black-hole radial ruler. The Schwarzschild radius is ${c.toFixed(2)} times a fixed reference radius R. Increasing this ratio increases mass. The coordinate endpoints remain at zero point seven five R and R, so their coordinate difference is zero point two five R. The proper length of the rose path is ${proper.toFixed(3)} R, or ${(proper/.25).toFixed(2)} times the coordinate difference. The embedding height is auxiliary, not time or force. Both endpoints remain outside the horizon.`;
  };
 }else if(kind==='tides'){
  camera.position.set(4,3,5);const cloud=new THREE.Group();root.add(cloud);
  // Keep a quiet initial sphere behind the changing cloud. Three great circles
  // reveal its shape without turning the test particles into a wirework ball.
  for(const plane of ['xy','xz','yz']){
   const points=Array.from({length:97},(_,i)=>{const a=i*Math.PI/48,c=1.2*Math.cos(a),s=1.2*Math.sin(a);return plane==='xy'?V(c,s,0):plane==='xz'?V(c,0,s):V(0,c,s);});
   const m=new THREE.LineDashedMaterial({transparent:true,opacity:.22,dashSize:.045,gapSize:.045});m.userData.role='ink';mats.push(m);
   const reference=new THREE.Line(new THREE.BufferGeometry().setFromPoints(points),m);reference.computeLineDistances();root.add(reference);
   line(points,'geometry',.68,cloud);
  }
  const count=96,geometry=new THREE.SphereGeometry(.027,10,8),particles=new THREE.InstancedMesh(geometry,material('observer',{roughness:.8,metalness:0}),count);const dummy=new THREE.Object3D();
  for(let i=0;i<count;i++){const y=1-2*(i+.5)/count,a=i*Math.PI*(3-Math.sqrt(5));dummy.position.set(1.2*Math.sqrt(1-y*y)*Math.cos(a),1.2*y,1.2*Math.sqrt(1-y*y)*Math.sin(a));dummy.updateMatrix();particles.setMatrixAt(i,dummy.matrix);}cloud.add(particles);
  arrow(V(-2,0,0),V(2.1,0,0),'curvature');label(String.raw`\hat r`,V(2.15,.4,0),'curvature');label(String.raw`\hat\theta`,V(0,1.75,0),'curvature');label(String.raw`\hat\phi`,V(0,0,1.9),'curvature');
  update=()=>{const s=+input.value*.0015;cloud.scale.set(1+2*s,1-s,1-s);output.innerHTML=window.katex.renderToString(`s=${s.toFixed(3)}`);el.dataset.scales=JSON.stringify(cloud.scale.toArray());};
 }else if(kind==='wave'){
  camera.position.set(5,3.7,7);controls.target.set(0,0,0);arrow(V(0,0,-2.9),V(0,0,3),'transport');label('z',V(0,0,3.25),'transport');label('x',V(1.52,-.12,0));label('y',V(-.12,1.48,0));
  line([V(-1.32,0,0),V(1.32,0,0)],'ink',.24);line([V(0,-1.32,0),V(0,1.32,0)],'ink',.24);
  const rings=[];
  for(let j=0;j<7;j++){
   const z=(j-3)*.8,focus=j===3,opacity=focus?1:Math.max(.13,.42-.08*Math.abs(j-3)),group=new THREE.Group();group.position.z=z;root.add(group);
   for(let i=0;i<(focus?32:20);i++){
    const a=i*2*Math.PI/(focus?32:20),particle=dot(V(Math.cos(a),Math.sin(a),0),'observer',focus?.036:.022,group);
    particle.material.transparent=!focus;particle.material.opacity=opacity;particle.material.depthWrite=focus;
   }
   line(Array.from({length:65},(_,i)=>V(Math.cos(i*Math.PI/32),Math.sin(i*Math.PI/32),0)),focus?'observer':'geometry',focus?.95:opacity,group);
   group.matrixAutoUpdate=false;rings.push({group,z});
  }
  const amplitudeInput=el.querySelector('[data-wave-amplitude]'),frequencyInput=el.querySelector('[data-wave-frequency]'),playButton=el.querySelector('[data-wave-play]'),equation=el.querySelector('[data-wave-equation]');
  const reducedMotion=matchMedia('(prefers-reduced-motion: reduce)'),events=new AbortController();
  let phase=+input.value*Math.PI/100,amplitude=+amplitudeInput.value/100,frequency=+frequencyInput.value/100,polarization='plus',playing=false,visible=false,disposed=false,raf=0,lastTime=0,lastReadout=0,frames=0;
  function accessibleState(){
   el.dataset.phase=phase;el.dataset.polarization=polarization;el.dataset.amplitude=amplitude;el.dataset.frequency=frequency;el.dataset.playing=String(playing);
   el.dataset.waveState=JSON.stringify({phase,amplitude,frequency,polarization,playing});
   el.dataset.narrationSource=`Gravitational-wave experiment. ${polarization==='plus'?'Plus polarization stretches along the coordinate axes.':'Cross polarization stretches along axes rotated forty-five degrees.'} The strain amplitude is ${amplitude.toFixed(2)} and angular frequency is ${frequency.toFixed(2)} times c divided by the undeformed ring radius. The middle detector phase is ${(phase/Math.PI).toFixed(2)} pi radians. The brighter middle ring is one detector. The surrounding rings sample the same traveling wave at different positions. Higher frequency shortens wavelength while wave speed stays c. Strain is exaggerated; the displacement model is first order.`;
  }
  function applyGeometry(){
   for(const {group,z} of rings){const h=waveStrain(z,phase,amplitude,frequency),plus=polarization==='plus'?h:0,cross=polarization==='cross'?h:0;group.matrix.set(1+plus/2,cross/2,0,0,cross/2,1-plus/2,0,0,0,0,1,z,0,0,0,1);group.matrixWorldNeedsUpdate=true;if(z===0)el.dataset.detectorMatrix=JSON.stringify([1+plus/2,cross/2,cross/2,1-plus/2]);}
   el.dataset.phase=phase;
  }
  function updateReadout(){
   output.innerHTML=window.katex.renderToString(String.raw`\phi=${(phase/Math.PI).toFixed(2)}\pi`);
   input.style.setProperty('--range-fill',`${phase/(2*Math.PI)*100}%`);input.setAttribute('aria-valuetext',`Phase ${(phase/Math.PI).toFixed(2)} pi radians`);
   for(const [control,name,value,tex] of [[amplitudeInput,'amplitude',amplitude,String.raw`h_0=${amplitude.toFixed(2)}`],[frequencyInput,'frequency',frequency,String.raw`\omega L_0/c=${frequency.toFixed(2)}`]]){
    el.querySelector(`[data-wave-${name}-value]`).innerHTML=window.katex.renderToString(tex);control.style.setProperty('--range-fill',`${100*(+control.value-control.min)/(control.max-control.min)}%`);control.setAttribute('aria-valuetext',name==='amplitude'?`Strain ${value.toFixed(2)}`:`Angular frequency ${value.toFixed(2)} c per reference length`);
   }
   el.querySelector('[data-wave-wavelength]').innerHTML=window.katex.renderToString(String.raw`\lambda/L_0=${(2*Math.PI/frequency).toFixed(2)}`)+' · shorter at higher frequency';
   accessibleState();
  }
  function updateEquation(){
   const h=String.raw`\htmlClass{math-geometry}{h}`,tex=polarization==='plus'?String.raw`\begin{gathered}${h}_+=h_0\sin(\omega z/c-\phi)\\x=x_0(1+${h}_+/2)\\y=y_0(1-${h}_+/2)\end{gathered}`:String.raw`\begin{gathered}${h}_\times=h_0\sin(\omega z/c-\phi)\\x=x_0+${h}_\times y_0/2\\y=y_0+${h}_\times x_0/2\end{gathered}`;
   equation.innerHTML=window.katex.renderToString(tex,{displayMode:true,throwOnError:true,trust:context=>context.command==='\\htmlClass'});
   equation.closest('.scene-equation').dataset.narrationSource=polarization==='plus'?'Plus polarization. The displacement along x is its initial value times one plus half the strain. Along y it is its initial value times one minus half the strain. One direction stretches while the other squeezes.':'Cross polarization. The x displacement receives half the strain times the initial y coordinate, while the y displacement receives half the strain times the initial x coordinate. The stretching axes are rotated forty-five degrees relative to plus polarization.';
  }
  function cancelFrame(){if(raf)cancelAnimationFrame(raf);raf=0;lastTime=0;}
  function canAnimate(){return !disposed&&playing&&visible&&!document.hidden&&el.dataset.activeView!=='diagram'&&el.dataset.ready==='true';}
  function synchronize(){
   if(!canAnimate()){cancelFrame();el.dataset.animating='false';return;}
   el.dataset.animating='true';if(!raf)raf=requestAnimationFrame(tick);
  }
  function setPlaying(value){playing=value;playButton.setAttribute('aria-pressed',String(value));playButton.setAttribute('aria-label',value?'Pause wave':'Play wave');playButton.querySelector('[data-wave-play-label]').textContent=value?'Pause':'Play';accessibleState();synchronize();}
  function tick(now){
   raf=0;if(!canAnimate()){cancelFrame();return;}
   if(lastTime){phase=(phase+frequency*.8*Math.min(.05,(now-lastTime)/1000))%(2*Math.PI);input.value=phase/Math.PI*100;applyGeometry();frames++;el.dataset.frames=frames;}
   lastTime=now;
   if(now-lastReadout>120){updateReadout();lastReadout=now;}
   render();raf=requestAnimationFrame(tick);
  }
  playButton.addEventListener('click',()=>setPlaying(!playing),{signal:events.signal});
  el.querySelectorAll('[data-wave-polarization]').forEach(button=>button.addEventListener('click',()=>{polarization=button.dataset.wavePolarization;el.querySelectorAll('[data-wave-polarization]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));applyGeometry();updateEquation();updateReadout();render();},{signal:events.signal}));
  for(const control of [amplitudeInput,frequencyInput])control.addEventListener('input',()=>{amplitude=+amplitudeInput.value/100;frequency=+frequencyInput.value/100;applyGeometry();updateReadout();render();},{signal:events.signal});
  document.addEventListener('visibilitychange',synchronize,{signal:events.signal});
  reducedMotion.addEventListener('change',()=>{if(reducedMotion.matches)setPlaying(false);},{signal:events.signal});
  const intersection=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;synchronize();},{threshold:.08});
  const viewObserver=new MutationObserver(synchronize);viewObserver.observe(el,{attributes:true,attributeFilter:['data-active-view','data-ready']});
  update=()=>{phase=+input.value*Math.PI/100;applyGeometry();updateReadout();};
  update.onInput=()=>setPlaying(false);
  update.start=()=>{updateEquation();intersection.observe(stage);setPlaying(!reducedMotion.matches);};
  update.dispose=()=>{disposed=true;cancelFrame();events.abort();intersection.disconnect();viewObserver.disconnect();};
 }else if(kind==='expansion'){
  camera.position.set(5,3.5,6);const lattice=new THREE.Group();root.add(lattice);
  for(let i=-1;i<=1;i++)for(let j=-1;j<=1;j++){line([V(-1.5,i*1.5,j*1.5),V(1.5,i*1.5,j*1.5)],'geometry',.6,lattice);line([V(i*1.5,-1.5,j*1.5),V(i*1.5,1.5,j*1.5)],'geometry',.6,lattice);line([V(i*1.5,j*1.5,-1.5),V(i*1.5,j*1.5,1.5)],'geometry',.6,lattice);for(let k=-1;k<=1;k++)dot(V(i*1.5,j*1.5,k*1.5),'matter',.065,lattice);}
  tube([V(-1.5,-1.5,1.5),V(0,-1.5,1.5),V(1.5,-1.5,1.5)],'observer',.018,lattice);dot(V(-1.5,-1.5,1.5),'observer',.083,lattice);dot(V(1.5,-1.5,1.5),'observer',.083,lattice);
  const separation=label(String.raw`\ell`,V(0,-1.7,1.3),'observer');update=()=>{const a=+input.value/100;lattice.scale.setScalar(a);separation.position.set(0,-1.7*a,1.6*a);output.innerHTML=window.katex.renderToString(`a=${a.toFixed(2)}`);el.dataset.measurement=a;};
 }else if(kind==='slices'){
  camera.position.set(5,3.5,6);const top=new THREE.Group();root.add(top);
  for(const [y,parent] of [[-1,root],[1,top]]){const plane=new THREE.Mesh(new THREE.PlaneGeometry(3.6,3.6),material('geometry',{transparent:true,opacity:.09,depthWrite:false}));plane.rotation.x=-Math.PI/2;plane.position.y=y;parent.add(plane);grid(3.6,8,y,'geometry',parent);}
  arrow(V(0,-1,0),V(0,1,0),'observer');label('Nn',V(-.4,.1,0),'observer');label(String.raw`\Sigma_t`,V(-1.9,-1,1.2),'geometry');const upperLabel=label(String.raw`\Sigma_{t+dt}`,V(-1.9,1,1.2),'geometry');
  const shift=arrow(V(0,1,0),V(.8,1,0),'transport'),step=arrow(V(0,-1,0),V(.8,1,0),'ink');const beta=label(String.raw`\beta`,V(.4,1.3,0),'transport');
  update=()=>{const b=+input.value/100*1.2;top.position.x=b;upperLabel.position.x=-1.9+b;shift.visible=Math.abs(b)>.001;shift.setDirection(V(Math.sign(b)||1,0,0));shift.setLength(Math.max(.001,Math.abs(b)),Math.min(.15,Math.abs(b)*.3),.06);const dir=V(b,2,0);step.setDirection(dir.clone().normalize());step.setLength(dir.length(),.15,.075);beta.position.x=b/2;output.innerHTML=window.katex.renderToString(String.raw`\beta^x=${b.toFixed(2)}`);el.dataset.measurement=b;};
 }else if(kind==='covector'){
  camera.position.set(6,4.5,6);controls.target.set(1,.4,0);root.position.set(-1,0,-.5);
  for(let x=0;x<=3;x++){const plane=new THREE.Mesh(new THREE.PlaneGeometry(3,3),material('geometry',{transparent:true,opacity:.08,depthWrite:false}));plane.rotation.y=Math.PI/2;plane.position.set(x,.8,.5);root.add(plane);line([V(x,-.7,-1),V(x,2.3,-1),V(x,2.3,2),V(x,-.7,2),V(x,-.7,-1)],'geometry',.42);label(String(x),V(x,-.95,1.55),'geometry');}
  const crossings=covectorCrossings(1).map(p=>{const ring=new THREE.Mesh(new THREE.TorusGeometry(.10,.016,8,32),material('transport',{roughness:.75,metalness:0}));ring.rotation.y=Math.PI/2;ring.position.set(...p);root.add(ring);return ring;});
  dot(V(),'ink',.045);
  const vec=arrow(V(),V(3,2,1),'transport'),vlabel=label('v',V(3.2,2.2,1),'transport');update=()=>{const t=+input.value/100;vec.setLength(Math.max(.01,t*Math.sqrt(14)),Math.min(.18,t*.2),.08);vlabel.position.set(3*t+.25,2*t+.25,t);const reached=covectorCrossings(t);crossings.forEach((ring,i)=>ring.visible=i<reached.length);output.innerHTML=window.katex.renderToString(String.raw`\omega(\lambda v)=${(3*t).toFixed(2)}`);el.dataset.measurement=3*t;el.dataset.crossings=JSON.stringify(reached);el.dataset.narrationSource=`Covector experiment. The displacement fraction lambda is ${t.toFixed(2)}, so the displayed arrow is lambda times the vector with components three, two, one. Applying the covector dx gives ${(3*t).toFixed(2)} coordinate intervals. There ${reached.length===1?'is one ring':'are '+reached.length+' rings'} at the positive integer levels reached so far. Rings identify exact arrow-plane intersections; their count is not the Euclidean length of the arrow. The pairing counts level intervals from the starting level zero, including a fractional final interval.`;};
 }
 // Reserve the full parameter envelope once: changing a value never crops the
 // model or makes the camera jump. CSS2D label anchors participate in the bounds.
 const bounds=new THREE.Box3(),framePoints=[];
 function captureBounds(){
  root.updateMatrixWorld(true);bounds.union(new THREE.Box3().setFromObject(root));
  root.traverse(o=>{
   if(o.isCSS2DObject){const p=o.getWorldPosition(V());bounds.expandByPoint(p);framePoints.push(p);}
   const positions=o.geometry?.getAttribute('position');
   if(positions&&!o.isInstancedMesh){for(let i=0;i<positions.count;i++)framePoints.push(V().fromBufferAttribute(positions,i).applyMatrix4(o.matrixWorld));}
  });
 }
 if(kind!=='earth'){
  const value=input.value;
  for(const t of [0,.125,.25,.375,.5,.625,.75,.875,1]){input.value=+input.min+t*(input.max-input.min);update();captureBounds();}
  bounds.expandByScalar(.06);
  input.value=value;update();
  const center=bounds.getCenter(V()),offset=center.clone().sub(controls.target);
  controls.target.copy(center);camera.position.add(offset);
 }
 controls.update();const initial={position:camera.position.clone(),target:controls.target.clone()};
 function render(){beforeRender();renderer.render(scene,camera);labelRenderer.render(scene,camera);}
 function theme(){const styles=getComputedStyle(el);for(const name of ['geometry','curvature','transport','matter','observer','line','ink','figure-tint'])palette[name]=styles.getPropertyValue('--'+name).trim();for(const m of mats)m.color.set(palette[m.userData.role]||palette.ink);render();}
 function fit(width,height){
  camera.zoom=1;camera.updateProjectionMatrix();camera.updateMatrixWorld(true);
  if(kind==='earth'){camera.zoom=.88*Math.min(1,camera.aspect);return;}
  let x=0,y=0;
  for(const point of framePoints){const p=point.clone().project(camera);x=Math.max(x,Math.abs(p.x));y=Math.max(y,Math.abs(p.y));}
  const horizontalMargin=Math.max(labelsMargin,...[...stage.querySelectorAll('.scene-label')].map(node=>node.offsetWidth/2+12));
  camera.zoom=Math.min((1-2*horizontalMargin/width)/x,(1-2*labelsMargin/height)/y,1.35);
 }
 function resize(){const {width,height}=stage.getBoundingClientRect();if(!width||!height||el.dataset.activeView==='diagram')return;camera.aspect=width/height;fit(width,height);camera.updateProjectionMatrix();renderer.setSize(width,height);labelRenderer.setSize(width,height);render();}
 function parameter(){update.onInput?.();update();input.style.setProperty('--range-fill',`${100*(+input.value-input.min)/(input.max-input.min)}%`);input.setAttribute('aria-valuetext',output.querySelector('annotation')?.textContent||output.textContent);render();}
 input?.addEventListener('input',parameter);controls.addEventListener('change',render);
 el.querySelectorAll('[data-view]').forEach(b=>b.addEventListener('click',()=>{if(b.dataset.view==='reset'){camera.position.copy(initial.position);controls.target.copy(initial.target);controls.update();resize();}else{const delta=camera.position.clone().sub(controls.target);delta.applyAxisAngle(V(0,1,0),b.dataset.view==='left'?.25:-.25);camera.position.copy(controls.target).add(delta);controls.update();render();}}));
 if(kind!=='earth'){
  stage.tabIndex=0;stage.dataset.interactiveLabel=`${el.querySelector('h2')?.textContent||'Interactive geometry'}. Drag to rotate, use arrow keys to orbit, or Home to reset the view.`;stage.setAttribute('aria-label',stage.dataset.interactiveLabel);
  stage.addEventListener('keydown',event=>{if(event.target!==stage||el.dataset.activeView==='diagram')return;const view={ArrowLeft:'left',ArrowRight:'right',Home:'reset'}[event.key];if(view){event.preventDefault();el.querySelector(`[data-view=${view}]`).click();}});
 }
 renderer.domElement.addEventListener('webglcontextlost',e=>{e.preventDefault();if(el.isConnected)fallback(el,'3D rendering paused. The diagram remains available.');});

 const resizeObserver=new ResizeObserver(resize);resizeObserver.observe(stage);update();if(input)parameter();theme();resize();el.dataset.ready='true';setView(el,el.dataset.activeView||'3d');update.start?.();instances.push({el,render,theme,dispose(){update.dispose?.();resizeObserver.disconnect();controls.dispose();scene.traverse(o=>{o.geometry?.dispose();const materials=Array.isArray(o.material)?o.material:[o.material];materials.filter(Boolean).forEach(m=>{Object.values(m).forEach(v=>{if(v?.isTexture)v.dispose()});m.dispose()})});renderer.dispose();renderer.forceContextLoss();}});
}
export function initScenes(){
const abort=new AbortController();
document.querySelectorAll('[data-scene]').forEach(el=>{
 el.querySelectorAll('[data-scene-mode]').forEach(button=>button.addEventListener('click',()=>setView(el,button.dataset.sceneMode),{signal:abort.signal}));
 setView(el,el.dataset.activeView||'3d');
});
const lazy=new IntersectionObserver(entries=>{for(const e of entries)if(e.isIntersecting){lazy.unobserve(e.target);try{createLab(e.target)}catch(error){fallback(e.target,'The interactive view could not initialize. The diagram remains available.');console.error(error);}}},{rootMargin:'200px'});
document.querySelectorAll('[data-scene]').forEach(el=>lazy.observe(el));
const themeObserver=new MutationObserver(()=>instances.forEach(i=>i.theme()));themeObserver.observe(document.documentElement,{attributes:true,attributeFilter:['data-theme']});
return ()=>{abort.abort();lazy.disconnect();themeObserver.disconnect();instances.splice(0).forEach(i=>i.dispose())};
}
