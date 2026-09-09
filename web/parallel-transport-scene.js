import {surfaceFrame,transportAt,transportLoop,transportRoutesAt,transportRoutesResult} from './parallel-transport-model.js';

export async function createTransportScene(root,getState,routes=false,onUnavailable=()=>{}){
 const frame=state=>routes?transportRoutesAt(state):transportAt(state);
 const [THREE,{OrbitControls}]=await Promise.all([import('three'),import('./assets/three/OrbitControls.js')]);
 const stage=root.querySelector('.tp-spatial');if(!stage.isConnected)return null;
 let renderer;try{renderer=new THREE.WebGLRenderer({antialias:true,alpha:true,powerPreference:'low-power'})}catch{return null}
 renderer.setPixelRatio(Math.min(devicePixelRatio||1,2));renderer.setClearColor(0,0);renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;
 const scene=new THREE.Scene(),camera=new THREE.OrthographicCamera(-3,3,2.3,-2.3,.1,60),target=new THREE.Vector3(0,0,.15);
 const pose=surface=>surface==='sphere'?[5,6,5]:[3,-5,6];
 camera.up.set(0,0,1);camera.position.set(...pose(getState().surface));camera.lookAt(target);
 const canvas=renderer.domElement;canvas.setAttribute('role','img');canvas.setAttribute('aria-label','Parallel transport on a surface. Drag to rotate, use arrow keys to orbit, or Home to reset the camera.');stage.append(canvas);stage.tabIndex=0;
 let controls=new OrbitControls(camera,canvas);controls.target.copy(target);controls.enablePan=false;controls.enableZoom=false;controls.enableDamping=false;controls.minPolarAngle=.08;controls.maxPolarAngle=Math.PI-.08;controls.update();
 canvas.style.touchAction='pan-y';
 const fill=new THREE.HemisphereLight(0xffffff,0x748392,2);scene.add(fill);const light=new THREE.DirectionalLight(0xffffff,2.4);light.position.set(-3,-5,7);scene.add(light);const rim=new THREE.DirectionalLight(0xb4d4f0,1);rim.position.set(4,3,1);scene.add(rim);
 const terrain=new THREE.Group(),pathGroup=new THREE.Group(),angleGroup=new THREE.Group();scene.add(terrain,pathGroup,angleGroup);let angleKey='';
 const materials=new Set(),V=p=>new THREE.Vector3(...p);let surface,key='',lastSurface='',disposed=false,available=true;
 function material(role,opacity=1,standard=false){const m=new (standard?THREE.MeshStandardMaterial:THREE.MeshBasicMaterial)({side:THREE.DoubleSide,transparent:opacity<1,opacity,...(standard?{roughness:.85,metalness:0}:{})});m.userData.role=role;materials.add(m);colorMaterial(m,getComputedStyle(root),document.documentElement.dataset.theme==='dark');return m}
 function disposeGroup(g){g.traverse(o=>{o.geometry?.dispose();for(const m of (Array.isArray(o.material)?o.material:[o.material]).filter(Boolean)){materials.delete(m);m.dispose()}});g.clear()}
 function arrow(role){const g=new THREE.Group(),m=material(role),shaft=new THREE.Mesh(new THREE.CylinderGeometry(.018,.018,.4,12),m),head=new THREE.Mesh(new THREE.ConeGeometry(.055,.14,20),m);shaft.position.y=.2;head.position.y=.47;g.add(shaft,head);scene.add(g);return g}
 const initialArrow=arrow('transport'),movingArrow=arrow('observer');
 const directMarker=new THREE.Mesh(new THREE.SphereGeometry(.028,20,16),material('transport'));directMarker.visible=routes;scene.add(directMarker);
 const directTangent=new THREE.Mesh(new THREE.PlaneGeometry(.72,.72),material('matter',.12));directTangent.material.depthWrite=false;directTangent.visible=routes;scene.add(directTangent);
 const tangent=new THREE.Mesh(new THREE.PlaneGeometry(.72,.72),material('matter',.17));tangent.material.depthWrite=false;scene.add(tangent);
 const marker=new THREE.Mesh(new THREE.SphereGeometry(.032,20,16),material('observer',1,true));scene.add(marker);
 const labels=[...['A','B','C','P'],...(routes?['angle']:[])].map(name=>{const el=document.createElement('span');el.className='tp-label';el.textContent=name;stage.append(el);return {name,el,point:new THREE.Vector3()}});
 const raycaster=new THREE.Raycaster();
 function placeLabels(){
  const rect=stage.getBoundingClientRect(),cameraPoint=new THREE.Vector3();camera.getWorldPosition(cameraPoint);
  for(const label of labels){
   const p=label.point.clone().project(camera),px=(p.x+1)*rect.width/2,py=(1-p.y)*rect.height/2;
   raycaster.setFromCamera(new THREE.Vector2(p.x,p.y),camera);const hits=surface?raycaster.intersectObject(surface,false):[];
   const blocked=hits.length>0&&hits[0].point.distanceTo(label.point)>.12&&hits[0].distance<raycaster.ray.origin.distanceTo(label.point);
   const nearVertex=label.name==='P'&&labels.slice(0,3).some(l=>l.point.distanceTo(label.point)<.18);
   label.el.hidden=label.enabled===false||blocked||nearVertex||px<16||px>rect.width-16||py<16||py>rect.height-16;
   label.el.style.left=`${px+(routes&&label.name==='C'?-11:0)}px`;label.el.style.top=`${py+(routes&&label.name==='C'?13:label.name==='angle'?0:-13)}px`;
  }
 }
 function render(){if(disposed||!available)return;renderer.render(scene,camera);placeLabels();const f=frame(getState()),reference=routes?f.direct:{point:f.startPoint,vector:f.startVector},project=p=>V(p).project(camera).toArray();stage.dataset.projection=JSON.stringify({frustum:[camera.left,camera.right,camera.top,camera.bottom],start:project(reference.point),initialTip:project(reference.point.map((x,i)=>x+.52*reference.vector[i])),point:project(f.point),tip:project(f.point.map((x,i)=>x+.52*f.vector[i]))})}
 function colorMaterial(m,css,dark){
   m.color.set(css.getPropertyValue(`--${m.userData.role}`).trim()||'#3f8f92');
   if(m.userData.surface){
    if(dark)m.color.set(css.getPropertyValue('--tp-surface-dark').trim()||'#285a63');
    else m.color.lerp(new THREE.Color('#6fd4c2'),.45);
   }
   // Unlit teaching marks should match their legend, without filmic whitening.
   const toneMapped=!(dark&&m.isMeshBasicMaterial);
   if(m.toneMapped!==toneMapped){m.toneMapped=toneMapped;m.needsUpdate=true}
 }
 function theme(){
  const css=getComputedStyle(root),dark=document.documentElement.dataset.theme==='dark';
  // Text colors are deliberately luminous in the dark theme; they are not
  // surface albedos. Keep the surface below the teaching marks in brightness.
  fill.intensity=dark?.85:2;rim.intensity=dark?.7:1;
  fill.groundColor.set(dark?'#b7c7d2':'#748392');
  light.position.set(-3,dark?5:-5,7);
  for(const m of materials)colorMaterial(m,css,dark);
  render();
 }
 function makeSurface(s){
  disposeGroup(terrain);const positions=[],normals=[],uv=[],indices=[],rows=60,cols=96;
  for(let j=0;j<=rows;j++)for(let i=0;i<=cols;i++){
   const u=s.surface==='sphere'?2*Math.PI*i/cols:-1.6+3.2*i/cols,v=s.surface==='sphere'?-Math.PI/2+Math.PI*j/rows:-1.6+3.2*j/rows;
   const f=surfaceFrame(s.surface,u,v,s.radius);positions.push(...f.point);normals.push(...f.normal);uv.push(i/cols,j/rows);
  }
  for(let j=0;j<rows;j++)for(let i=0;i<cols;i++){const a=j*(cols+1)+i,b=a+cols+1;indices.push(a,a+1,b,a+1,b+1,b)}
  const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));g.setAttribute('normal',new THREE.Float32BufferAttribute(normals,3));g.setAttribute('uv',new THREE.Float32BufferAttribute(uv,2));g.setIndex(indices);
  const m=material('geometry',1,true);
  m.userData.surface=true;
  m.customProgramCacheKey=()=>`transport-surface-${s.surface}`;
  // Grid and shading share one surface. Screen-space derivatives antialias
  // the grid; no nearly coincident grid mesh competes for the depth buffer.
  m.onBeforeCompile=shader=>{
   shader.vertexShader='varying vec2 tpUV;\n'+shader.vertexShader.replace('#include <begin_vertex>','#include <begin_vertex>\ntpUV=uv;');
   shader.fragmentShader='varying vec2 tpUV;\n'+shader.fragmentShader;
   shader.fragmentShader=shader.fragmentShader.replace('#include <color_fragment>',`#include <color_fragment>
    vec2 q=tpUV*vec2(${s.surface==='sphere'?'16.0,8.0':'12.0,12.0'});
    vec2 w=max(fwidth(q),vec2(0.0001));
    vec2 d=abs(fract(q-0.5)-0.5)/w;
    float line=1.0-smoothstep(0.45,1.25,min(d.x,d.y));
    float resolved=1.0-smoothstep(0.25,0.6,max(w.x,w.y));
    diffuseColor.rgb*=1.0-0.18*line*resolved;`);
  };
  surface=new THREE.Mesh(g,m);terrain.add(surface);
 }
 function makePath(s){
  disposeGroup(pathGroup);
  const loop=transportLoop(s);
  for(let i=0;i<3;i++){
   const curve=new THREE.Curve();curve.getPoint=t=>{const f=transportAt({...s,progress:loop.corners[i]+t*(loop.corners[i+1]-loop.corners[i])});return V(f.point).addScaledVector(V(f.normal),.018)};
   pathGroup.add(new THREE.Mesh(new THREE.TubeGeometry(curve,96,.014,6,false),material(routes&&i<2?'observer':'transport')));
  }
  for(let i=0;i<3;i++){const f=transportAt({...s,progress:loop.corners[i]}),p=V(f.point).addScaledVector(V(f.normal),.03),ball=new THREE.Mesh(new THREE.SphereGeometry(.025,16,12),material('transport'));ball.position.copy(p);pathGroup.add(ball);labels[i].point.copy(p).addScaledVector(V(f.normal),.065);labels[i].el.textContent=(s.reverse?'ACB':'ABC')[i]}
 }
 function update(){
  if(disposed||!available)return;const s=getState(),f=frame(s),newKey=JSON.stringify([s.surface,s.radius,s.size,s.reverse]);
  if(newKey!==key){makeSurface(s);makePath(s);key=newKey;theme()}
  if(lastSurface!==s.surface){lastSurface=s.surface;reset();resize()}
  const n=V(f.normal),v=V(f.vector),p=V(f.point);
  movingArrow.position.copy(p).addScaledVector(n,.025);movingArrow.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),v);
  const reference=routes?f.direct:{point:f.startPoint,normal:f.startNormal,vector:f.startVector};
  initialArrow.position.copy(V(reference.point)).addScaledVector(V(reference.normal),.022);initialArrow.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),V(reference.vector));
  if(routes){
   directMarker.position.copy(V(reference.point)).addScaledVector(V(reference.normal),.028);
   directTangent.visible=V(reference.point).distanceTo(p)>.12;
   directTangent.position.copy(V(reference.point)).addScaledVector(V(reference.normal),.022);
   directTangent.quaternion.setFromRotationMatrix(new THREE.Matrix4().makeBasis(V(reference.vector),new THREE.Vector3().crossVectors(V(reference.normal),V(reference.vector)),V(reference.normal)));
  }
  // Keep the reference unobtrusive while the carried arrow leaves the start.
  initialArrow.scale.set(.65,1,.65);
  marker.position.copy(p).addScaledVector(n,.032);tangent.position.copy(p).addScaledVector(n,.022);
  tangent.quaternion.setFromRotationMatrix(new THREE.Matrix4().makeBasis(v,new THREE.Vector3().crossVectors(n,v),n));
  labels[3].point.copy(p).addScaledVector(n,.09);
  if(routes){
   const angle=transportRoutesResult(s).angle,show=s.progress===1&&Math.abs(angle)>.02,newAngleKey=JSON.stringify([show,s.surface,s.radius,s.size]);labels[4].enabled=show;
   if(newAngleKey!==angleKey){
    disposeGroup(angleGroup);angleKey=newAngleKey;
    if(show){
     const blue=V(f.direct.vector),across=new THREE.Vector3().crossVectors(n,blue),origin=p.clone().addScaledVector(n,.035),curve=new THREE.Curve();
     curve.getPoint=t=>origin.clone().addScaledVector(blue,.25*Math.cos(t*angle)).addScaledVector(across,.25*Math.sin(t*angle));
     angleGroup.add(new THREE.Mesh(new THREE.TubeGeometry(curve,40,.004,6,false),material('matter')));
     labels[4].point.copy(origin).addScaledVector(blue,.49*Math.cos(angle/2)).addScaledVector(across,.49*Math.sin(angle/2));labels[4].el.textContent=`${(Math.abs(angle)*180/Math.PI).toFixed(1)}°`;
    }
   }
  }
  render();
 }
 function resize(){const {width,height}=stage.getBoundingClientRect();if(!width||!height)return;const half=(getState().surface==='sphere'?1.98:2.55)/Math.min(1,width/height);camera.left=-half*width/height;camera.right=half*width/height;camera.top=half;camera.bottom=-half;camera.updateProjectionMatrix();renderer.setSize(width,height,false);render()}
 // OrbitControls captures the camera's up direction at construction. Recreate
 // it when changing that direction, so orbiting after a face-on view is smooth.
 function renewControls(){controls.removeEventListener('change',render);controls.dispose();controls=new OrbitControls(camera,canvas);controls.target.copy(target);controls.enablePan=false;controls.enableZoom=false;controls.enableDamping=false;controls.minPolarAngle=.08;controls.maxPolarAngle=Math.PI-.08;controls.update();controls.addEventListener('change',render);canvas.style.touchAction='pan-y'}
 function reset(){camera.up.set(0,0,1);camera.position.set(...pose(getState().surface));renewControls();render()}
 function faceStart(){const f=frame({...getState(),progress:routes?1:0}),normal=routes?f.normal:f.startNormal,vector=routes?f.direct.vector:f.startVector;camera.up.copy(V(vector));camera.position.copy(target).addScaledVector(V(normal),9);renewControls();render()}
 function keyboard(event){
  if(event.key==='Home'){reset();event.preventDefault();return}
  if(!['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(event.key))return;event.preventDefault();
  const toY=new THREE.Quaternion().setFromUnitVectors(camera.up,new THREE.Vector3(0,1,0)),spherical=new THREE.Spherical().setFromVector3(camera.position.clone().sub(target).applyQuaternion(toY));
  if(event.key==='ArrowLeft')spherical.theta-=.12;if(event.key==='ArrowRight')spherical.theta+=.12;if(event.key==='ArrowUp')spherical.phi-=.12;if(event.key==='ArrowDown')spherical.phi+=.12;
  spherical.phi=Math.max(.08,Math.min(Math.PI-.08,spherical.phi));camera.position.copy(new THREE.Vector3().setFromSpherical(spherical).applyQuaternion(toY.invert()).add(target));controls.update();render();
 }
 function lost(event){event.preventDefault();available=false;stage.hidden=true;root.querySelector('[data-tp-fallback]').hidden=false;root.dataset.transportSpatial='fallback';onUnavailable()}
 controls.addEventListener('change',render);stage.addEventListener('keydown',keyboard);canvas.addEventListener('webglcontextlost',lost);
 const resizeObserver=new ResizeObserver(resize);resizeObserver.observe(stage);
 const themeObserver=new MutationObserver(theme);themeObserver.observe(document.documentElement,{attributes:true,attributeFilter:['data-theme','class']});
 stage.hidden=false;root.querySelector('[data-tp-fallback]').hidden=true;root.dataset.transportSpatial='ready';resize();update();
 return {update,reset,faceStart,dispose(){disposed=true;controls.dispose();resizeObserver.disconnect();themeObserver.disconnect();stage.removeEventListener('keydown',keyboard);canvas.removeEventListener('webglcontextlost',lost);disposeGroup(terrain);disposeGroup(pathGroup);disposeGroup(angleGroup);for(const o of [initialArrow,movingArrow])disposeGroup(o);tangent.geometry.dispose();marker.geometry.dispose();directMarker.geometry.dispose();directTangent.geometry.dispose();for(const m of materials)m.dispose();renderer.dispose();canvas.remove();labels.forEach(l=>l.el.remove())}};
}
