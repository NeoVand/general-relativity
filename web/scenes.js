import * as THREE from 'three';
import {earthFlow} from './earth-flow.js';
import {OrbitControls} from './assets/three/OrbitControls.js';
import {CSS2DRenderer,CSS2DObject} from './assets/three/CSS2DRenderer.js';
const V=(x=0,y=0,z=0)=>new THREE.Vector3(x,y,z);
const instances=[];
function createLab(el){
 if(el.dataset.ready)return;el.dataset.ready='loading';
 const stage=el.querySelector('.scene-stage'),kind=el.dataset.scene,input=el.querySelector('input'),output=el.querySelector('output');
 let renderer;
 try{renderer=new THREE.WebGLRenderer({antialias:true,alpha:true,powerPreference:'low-power'});}catch{el.dataset.ready='fallback';stage.querySelector('.scene-fallback span').textContent='3D is unavailable in this browser. The complete vector explanation is shown here.';return;}
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
 let update=()=>{};
 if(kind==='earth'){
  update=earthFlow({el,stage,root,camera,controls,renderer,render});
 }else if(kind==='cone'){
  camera.position.set(6,4.2,7);controls.target.set(0,.3,0);
  for(const sign of [-1,1]){const g=new THREE.ConeGeometry(2.2,2.2,80,1,true);g.translate(0,-1.1,0);if(sign===1)g.rotateZ(Math.PI);const mesh=new THREE.Mesh(g,material('geometry',{transparent:true,opacity:.14,depthWrite:false}));root.add(mesh);
   for(let j=0;j<16;j++){const a=j*Math.PI/8;line([V(),V(2.2*Math.cos(a),sign*2.2,2.2*Math.sin(a))],'geometry',.35);}line(Array.from({length:101},(_,i)=>V(2.2*Math.cos(i*Math.PI/50),sign*2.2,2.2*Math.sin(i*Math.PI/50))),'geometry',.8);}
  grid(5,10);arrow(V(0,-2.55,0),V(0,2.75,0),'ink');label('ct',V(0,2.95,0));label('x',V(2.8,0,0));label('y',V(0,0,2.8));label('ds^2=0',V(-1.5,1.85,0),'geometry');dot(V(),'curvature',.07);
  const worldline=arrow(V(),V(1,2,0),'observer');label(String.raw`u^\mu`,V(1.2,2.35,0),'observer');
  update=()=>{const b=+input.value/100,d=V(2*b,2,0);worldline.setDirection(d.clone().normalize());worldline.setLength(d.length(),.16,.08);output.innerHTML=window.katex.renderToString(`v/c=${b.toFixed(2)}`);el.dataset.measurement=b;};
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
  camera.position.set(7,6,8);controls.target.set(0,0,0);
  const rs=1;const point=(r,a)=>V(r*Math.cos(a),2*Math.sqrt(rs*(r-rs))-2,r*Math.sin(a));
  const vertices=[],indices=[],nr=60,na=100;
  for(let j=0;j<=nr;j++){const r=1+4*(j/nr)**2;for(let i=0;i<=na;i++)vertices.push(...point(r,2*Math.PI*i/na).toArray());}
  for(let j=0;j<nr;j++)for(let i=0;i<na;i++){const a=j*(na+1)+i,b=a+na+1;indices.push(a,b,a+1,b,b+1,a+1);}
  const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(vertices,3));g.setIndex(indices);g.computeVertexNormals();root.add(new THREE.Mesh(g,material('geometry',{transparent:true,opacity:.2,depthWrite:false})));
  for(let j=0;j<=16;j++){const r=1+4*(j/16)**2;line(Array.from({length:101},(_,i)=>point(r,i*Math.PI/50)),'geometry',.45);}
  for(let i=0;i<36;i++)line(Array.from({length:81},(_,j)=>point(1+4*(j/80)**2,i*Math.PI/18)),'geometry',.35);
  tube(Array.from({length:101},(_,i)=>point(1,i*Math.PI/50)),'curvature',.028);tube(Array.from({length:81},(_,j)=>point(1+4*(j/80)**2,.5)),'observer',.018);
  const marker=dot(point(2.4,.5),'observer',.09);label('r=r_s',V(0,-2.45,1),'curvature');const rlabel=label('r',point(2.4,.5).add(V(0,.35,0)),'observer');
  update=()=>{const r=+input.value/100;marker.position.copy(point(r,.5));rlabel.position.copy(point(r,.5).add(V(0,.35,0)));output.innerHTML=window.katex.renderToString(`r/r_s=${r.toFixed(2)}`);el.dataset.measurement=2*Math.sqrt(r-1);};
 }else if(kind==='tides'){
  camera.position.set(4,3,5);grid(4,8,-1.65);const cloud=new THREE.Group();root.add(cloud);sphereGrid(1.2,cloud);
  const geometry=new THREE.SphereGeometry(.033,10,8),particles=new THREE.InstancedMesh(geometry,material('observer'),240);const dummy=new THREE.Object3D();
  for(let i=0;i<240;i++){const y=1-2*(i+.5)/240,a=i*Math.PI*(3-Math.sqrt(5));dummy.position.set(1.2*Math.sqrt(1-y*y)*Math.cos(a),1.2*y,1.2*Math.sqrt(1-y*y)*Math.sin(a));dummy.updateMatrix();particles.setMatrixAt(i,dummy.matrix);}cloud.add(particles);
  arrow(V(-2,0,0),V(2.1,0,0),'curvature');label('+2GM/r^3',V(2.15,.4,0),'curvature');label('-GM/r^3',V(0,1.75,0),'curvature');label('-GM/r^3',V(0,0,1.9),'curvature');
  update=()=>{const s=+input.value*.0015;cloud.scale.set(1+2*s,1-s,1-s);output.innerHTML=window.katex.renderToString(`s=${s.toFixed(3)}`);el.dataset.scales=JSON.stringify(cloud.scale.toArray());};
 }else if(kind==='wave'){
  camera.position.set(5,3.7,7);controls.target.set(0,0,0);arrow(V(0,0,-2.9),V(0,0,3),'transport');label('z',V(0,0,3.25),'transport');label('x',V(1.75,0,1.5));label('y',V(0,1.7,1.5));
  const rings=[];
  for(let j=0;j<7;j++){const z=-2.4+j*.8,group=new THREE.Group();group.position.z=z;root.add(group);for(let i=0;i<32;i++){const a=i*Math.PI/16;dot(V(Math.cos(a),Math.sin(a),0),'observer',.035,group);}line(Array.from({length:65},(_,i)=>V(Math.cos(i*Math.PI/32),Math.sin(i*Math.PI/32),0)),'geometry',.75,group);rings.push(group);}
  update=()=>{const phase=+input.value*Math.PI/100;for(const ring of rings){const h=.35*Math.sin(1.5*ring.position.z-phase);ring.scale.set(1+h/2,1-h/2,1);}output.innerHTML=window.katex.renderToString(String.raw`\omega t=${(+input.value/100).toFixed(2)}\pi`);el.dataset.phase=phase;};
 }else if(kind==='expansion'){
  camera.position.set(5,3.5,6);const lattice=new THREE.Group();root.add(lattice);
  for(let i=-1;i<=1;i++)for(let j=-1;j<=1;j++){line([V(-1.5,i*1.5,j*1.5),V(1.5,i*1.5,j*1.5)],'geometry',.6,lattice);line([V(i*1.5,-1.5,j*1.5),V(i*1.5,1.5,j*1.5)],'geometry',.6,lattice);line([V(i*1.5,j*1.5,-1.5),V(i*1.5,j*1.5,1.5)],'geometry',.6,lattice);for(let k=-1;k<=1;k++)dot(V(i*1.5,j*1.5,k*1.5),'matter',.065,lattice);}
  label(String.raw`\Delta\chi`,V(0,-1.7,1.3),'geometry');update=()=>{const a=+input.value/100;lattice.scale.setScalar(a);output.innerHTML=window.katex.renderToString(`a=${a.toFixed(2)}`);el.dataset.measurement=a;};
 }else if(kind==='slices'){
  camera.position.set(5,3.5,6);const top=new THREE.Group();root.add(top);
  for(const [y,parent] of [[-1,root],[1,top]]){const plane=new THREE.Mesh(new THREE.PlaneGeometry(3.6,3.6),material('geometry',{transparent:true,opacity:.09,depthWrite:false}));plane.rotation.x=-Math.PI/2;plane.position.y=y;parent.add(plane);grid(3.6,8,y,'geometry',parent);}
  arrow(V(0,-1,0),V(0,1,0),'observer');label('Nn',V(-.4,.1,0),'observer');label(String.raw`\Sigma_t`,V(-1.9,-1,1.2),'geometry');label(String.raw`\Sigma_{t+dt}`,V(-1.9,1,1.2),'geometry');
  const shift=arrow(V(0,1,0),V(.8,1,0),'transport'),step=arrow(V(0,-1,0),V(.8,1,0),'ink');const beta=label(String.raw`\beta`,V(.4,1.3,0),'transport');
  update=()=>{const b=+input.value/100*1.2;top.position.x=b;shift.visible=Math.abs(b)>.001;shift.setDirection(V(Math.sign(b)||1,0,0));shift.setLength(Math.max(.001,Math.abs(b)),Math.min(.15,Math.abs(b)*.3),.06);const dir=V(b,2,0);step.setDirection(dir.clone().normalize());step.setLength(dir.length(),.15,.075);beta.position.x=b/2;output.innerHTML=window.katex.renderToString(String.raw`\beta^x=${b.toFixed(2)}`);el.dataset.measurement=b;};
 }else if(kind==='covector'){
  camera.position.set(6,4.5,6);controls.target.set(1,.4,0);root.position.set(-1,0,-.5);
  for(let x=0;x<=3;x++){const plane=new THREE.Mesh(new THREE.PlaneGeometry(3,3),material('geometry',{transparent:true,opacity:.1,depthWrite:false}));plane.rotation.y=Math.PI/2;plane.position.set(x,.8,.5);root.add(plane);line([V(x,-.7,-1),V(x,2.3,-1),V(x,2.3,2),V(x,-.7,2),V(x,-.7,-1)],'geometry',.55);label(String(x),V(x,-.95,1.55),'geometry');}
  const vec=arrow(V(),V(3,2,1),'transport');label('v',V(3.2,2.2,1),'transport');update=()=>{const t=+input.value/100;vec.setLength(Math.max(.01,t*Math.sqrt(14)),Math.min(.18,t*.2),.08);output.innerHTML=window.katex.renderToString(`x=${(3*t).toFixed(2)}`);el.dataset.measurement=3*t;};
 }
 controls.update();const initial={position:camera.position.clone(),target:controls.target.clone()};
 function render(){renderer.render(scene,camera);labelRenderer.render(scene,camera);}
 function theme(){const styles=getComputedStyle(el);for(const name of ['geometry','curvature','transport','matter','observer','line','ink','figure-tint'])palette[name]=styles.getPropertyValue('--'+name).trim();for(const m of mats)m.color.set(palette[m.userData.role]||palette.ink);render();}
 function resize(){const {width,height}=stage.getBoundingClientRect();camera.aspect=width/height;camera.zoom=Math.min(1,camera.aspect/(kind==='embedding'?1.55:1.2));camera.updateProjectionMatrix();renderer.setSize(width,height);labelRenderer.setSize(width,height);render();}
 input?.addEventListener('input',()=>{update();render()});controls.addEventListener('change',render);
 el.querySelectorAll('[data-view]').forEach(b=>b.addEventListener('click',()=>{if(b.dataset.view==='reset'){camera.position.copy(initial.position);controls.target.copy(initial.target);}else{const delta=camera.position.clone().sub(controls.target);delta.applyAxisAngle(V(0,1,0),b.dataset.view==='left'?.25:-.25);camera.position.copy(controls.target).add(delta);}controls.update();render();}));
 renderer.domElement.addEventListener('webglcontextlost',e=>{e.preventDefault();el.dataset.ready='fallback';stage.querySelector('.scene-fallback span').textContent='3D rendering paused. Reload to restore it, or use the vector explanation.';});
 new ResizeObserver(resize).observe(stage);update();theme();resize();el.dataset.ready='true';instances.push({el,render,theme});
}
const lazy=new IntersectionObserver(entries=>{for(const e of entries)if(e.isIntersecting){lazy.unobserve(e.target);try{createLab(e.target)}catch(error){e.target.dataset.ready='fallback';e.target.querySelector('.scene-fallback span').textContent='The interactive view could not initialize. The vector explanation remains available.';console.error(error);}}},{rootMargin:'200px'});
document.querySelectorAll('[data-scene]').forEach(el=>lazy.observe(el));
new MutationObserver(()=>instances.forEach(i=>i.theme())).observe(document.documentElement,{attributes:true,attributeFilter:['data-theme']});
