import * as THREE from 'three';

// Ingoing Painlevé–Gullstrand rain observers, released from rest at infinity.
// Length unit: Earth's mean radius. Time unit: R / sqrt(2GM/R).
export const EARTH_RADIUS = 6.371e6;
export const EARTH_GM = 3.986004418e14;
export const FLOW_SPEED = 110;
export const FALL_TIME = Math.sqrt(EARTH_RADIUS ** 3 / (2 * EARTH_GM));
// Successive reference surfaces enter through a cube outside the viewing window.
// Older surfaces are already deformed when the scene first becomes visible.
export const ENTRY_HALF_SIZE = 5.4;
export const VIEW_RADIUS = 4.8;
export const INJECTION_INTERVAL = .72;
export const COHORTS = Math.ceil(((Math.sqrt(3)*ENTRY_HALF_SIZE)**1.5-1)/1.5/INJECTION_INTERVAL)+1;
export const INITIAL_PHASE = .31 * INJECTION_INTERVAL;
export function flowPhase(time) { return (time + INITIAL_PHASE) % INJECTION_INTERVAL; }
export function cohortRadius(r0, cohort, time) {
  return rainRadius(r0, cohort * INJECTION_INTERVAL + flowPhase(time));
}
export function rainRadius(r0, time) {
  return Math.max(0, r0 ** 1.5 - 1.5 * time) ** (2 / 3);
}

export function earthFlow({el, stage, root, camera, controls, renderer, render}) {
  let disposed=false;
  camera.position.set(5.6, 3.2, 7.8);
  controls.target.set(0, 0, 0);
  controls.minDistance = 4.8;
  controls.maxDistance = 15;
  controls.autoRotateSpeed = .6; // A perceptible, unhurried camera orbit every 100 seconds.
  const uniforms = {
    phase: {value: INITIAL_PHASE}, ink: {value: new THREE.Color()},
  };
  // Each cohort starts on the six faces of a distant cube. Vertices keep their
  // angular direction and fall exactly along the PG rain congruence. All ages
  // are populated at startup. The youngest face is outside the visible window;
  // the oldest has passed the surface, so phase wrap replaces only hidden data.
  const positions = [], ages = [], weights = [];
  const divisions = 4, samples = 48;
  for (let cohort = 0; cohort < COHORTS; cohort++) {
    for (let axis = 0; axis < 3; axis++) for (const side of [-1,1]) {
      for (let orientation = 0; orientation < 2; orientation++) {
        for (let j = 0; j <= divisions; j++) {
          // Adjacent cube faces share boundary strokes: draw each only once.
          if (j===0 || j===divisions) continue;
          for (let i = 0; i < samples; i++) for (const k of [i,i+1]) {
            const p = [0,0,0];
            p[axis] = side * ENTRY_HALF_SIZE;
            p[(axis+1+orientation)%3] = (-1+2*j/divisions)*ENTRY_HALF_SIZE;
            p[(axis+2-orientation)%3] = (-1+2*k/samples)*ENTRY_HALF_SIZE;
            positions.push(...p);
            ages.push(cohort * INJECTION_INTERVAL);
            weights.push(j===divisions/2 ? 1 : .62);
          }
        }
      }
    }
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute('age', new THREE.Float32BufferAttribute(ages, 1));
  geometry.setAttribute('weight', new THREE.Float32BufferAttribute(weights, 1));
  const fragmentShader = `
      uniform vec3 ink;
      varying float radius;
      varying float depth;
      varying float emphasis;
      void main() {
        if (radius < 1.005) discard;
        float edge = 1. - smoothstep(3.1, 4.8, radius);
        float near = 1. - smoothstep(7., 13., depth);
        gl_FragColor = vec4(ink, edge * (.12 + .48*near) * emphasis);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }`;
  const gridMaterial = new THREE.ShaderMaterial({
    uniforms, transparent: true, depthWrite: false,
    vertexShader: `
      uniform float phase;
      attribute float age;
      attribute float weight;
      varying float radius;
      varying float depth;
      varying float emphasis;
      void main() {
        float r0 = length(position);
        emphasis = weight;
        radius = pow(max(0., pow(r0, 1.5) - 1.5*(age+phase)), 2./3.);
        vec3 p = position * radius / r0;
        vec4 view = modelViewMatrix * vec4(p, 1.);
        depth = -view.z;
        gl_Position = projectionMatrix * view;
      }`,
    fragmentShader,
  });
  const grid = new THREE.LineSegments(geometry, gridMaterial);
  grid.frustumCulled = false;
  root.add(grid);
  // These radial connectors join successive falling surfaces into cells.
  const radial = [], seen = new Set();
  for (let axis=0;axis<3;axis++) for(const side of [-1,1]) {
    for(let a=-1;a<=1;a+=.5) for(let b=-1;b<=1;b+=.5) {
      const p=[0,0,0];p[axis]=side;p[(axis+1)%3]=a;p[(axis+2)%3]=b;
      const direction=new THREE.Vector3(...p).normalize();
      const key=direction.toArray().map(x=>x.toFixed(5)).join(',');
      if(seen.has(key))continue;seen.add(key);
      radial.push(...direction.clone().multiplyScalar(1.006).toArray(),...direction.clone().multiplyScalar(VIEW_RADIUS).toArray());
    }
  }
  const radialGeometry=new THREE.BufferGeometry();
  radialGeometry.setAttribute('position',new THREE.Float32BufferAttribute(radial,3));
  root.add(new THREE.LineSegments(radialGeometry,new THREE.ShaderMaterial({
    uniforms,transparent:true,depthWrite:false,
    vertexShader:`varying float radius; varying float depth; varying float emphasis;
      void main(){radius=length(position);emphasis=.23;vec4 p=modelViewMatrix*vec4(position,1.);depth=-p.z;gl_Position=projectionMatrix*p;}`,
    fragmentShader,
  })));

  const earthMaterial = new THREE.MeshStandardMaterial({color: 0xffffff, roughness: .92, metalness: 0});
  const earth = new THREE.Mesh(new THREE.SphereGeometry(1, 96, 64), earthMaterial);
  earth.rotation.y = -1.6;
  root.add(earth);
  new THREE.TextureLoader().load('./assets/earth/blue-marble-december.webp', texture => {
    if(disposed){texture.dispose();return;}
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());
    earthMaterial.map = texture;
    earthMaterial.needsUpdate = true;
    el.dataset.texture = 'ready';
    render();
  }, undefined, () => {el.dataset.texture = 'unavailable';});

  // A thin limb glow provides atmospheric depth without obscuring coastlines.
  const atmosphere = new THREE.Mesh(new THREE.SphereGeometry(1.018, 64, 48), new THREE.ShaderMaterial({
    transparent: true, depthWrite: false,
    vertexShader: `varying vec3 n; varying vec3 v;
      void main(){vec4 p=modelViewMatrix*vec4(position,1.);n=normalize(normalMatrix*normal);v=normalize(-p.xyz);gl_Position=projectionMatrix*p;}`,
    fragmentShader: `varying vec3 n; varying vec3 v;
      void main(){float rim=pow(1.-max(0.,dot(normalize(n),normalize(v))),3.);gl_FragColor=vec4(.20,.57,.92,.46*rim);
      #include <colorspace_fragment>
      }`,
  }));
  root.add(atmosphere);

  const particleMaterial = new THREE.MeshBasicMaterial({color: 0xffffff, transparent: true});
  const particles = new THREE.InstancedMesh(new THREE.SphereGeometry(.023, 8, 6), particleMaterial, 160);
  particles.frustumCulled = false;
  root.add(particles);
  const particleEntry = 5.2;
  const particleLifetime = (particleEntry**1.5-1)/1.5;
  const starts = Array.from({length: 160}, (_, i) => {
    const y = 1 - 2*(i+.5)/160, theta = i*Math.PI*(3-Math.sqrt(5));
    return {age: ((i*73)%160)/160*particleLifetime, direction: new THREE.Vector3(Math.sqrt(1-y*y)*Math.cos(theta), y, Math.sqrt(1-y*y)*Math.sin(theta))};
  });
  const dummy = new THREE.Object3D();
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let playing = !reduced.matches, visible = false, frame = 0, last = 0, time = 0;
  stage.tabIndex = 0;
  const describe = () => {
    stage.setAttribute('aria-label', `Earth in a continuously falling reference grid. Drag to rotate. Press Space to ${playing?'pause':'resume'} motion.`);
    el.dataset.playing = String(playing);
  };
  function draw(timeValue) {
    uniforms.phase.value = flowPhase(timeValue);
    for (let i = 0; i < starts.length; i++) {
      const s = starts[i], age = (s.age+timeValue)%particleLifetime;
      const r = rainRadius(particleEntry, age);
      dummy.position.copy(s.direction).multiplyScalar(r);
      const edge = Math.max(0, Math.min(1, (VIEW_RADIUS-r)/.7));
      const surface = Math.max(0, Math.min(1, (r-1.005)/.06));
      dummy.scale.setScalar(edge*surface);
      dummy.updateMatrix(); particles.setMatrixAt(i, dummy.matrix);
    }
    particles.instanceMatrix.needsUpdate = true;
    particleMaterial.opacity = .8;
    el.dataset.time = String(timeValue);
    el.dataset.phase = String(uniforms.phase.value);
    el.dataset.frames = String(+(el.dataset.frames || 0) + 1);
  }
  function stopFrame() {cancelAnimationFrame(frame); frame = 0; last = 0;}
  function tick(now) {
    frame = 0;
    if (!playing || !visible || document.hidden || el.dataset.ready === 'fallback') {last=0; return;}
    const dt = last ? Math.min((now-last)/1000, .1) : 0;
    last = now;
    // Accelerated PG time. No global reset or fade.
    time += dt * FLOW_SPEED / FALL_TIME;
    draw(time);
    // Advance the viewpoint only with the animation; dragging keeps full control.
    controls.autoRotate = true;
    controls.update(dt);
    controls.autoRotate = false;
    render();
    frame = requestAnimationFrame(tick);
  }
  function resume() {if (playing && visible && !document.hidden && !frame) frame=requestAnimationFrame(tick);}
  const lifecycle=new AbortController(),signal=lifecycle.signal;
  stage.addEventListener('keydown', event => {
    if(event.code!=='Space')return;
    event.preventDefault(); playing=!playing; describe();
    if(playing)resume();else stopFrame();
  },{signal});
  const visibilityObserver=new IntersectionObserver(entries => {visible=entries.at(-1).isIntersecting; if(visible)resume();else stopFrame();},{threshold:.05});visibilityObserver.observe(stage);
  document.addEventListener('visibilitychange', () => {if(document.hidden)stopFrame();else resume();},{signal});
  reduced.addEventListener('change', () => {if(reduced.matches){playing=false;stopFrame();describe();}},{signal});
  renderer.domElement.addEventListener('webglcontextlost', stopFrame,{signal});
  const themeObserver=new MutationObserver(theme);themeObserver.observe(document.documentElement,{attributes:true,attributeFilter:['data-theme']});
  function theme() {
    const styles = getComputedStyle(el);
    uniforms.ink.value.set(styles.getPropertyValue('--geometry').trim());
    particleMaterial.color.set(styles.getPropertyValue('--observer').trim());
    render();
  }
  describe(); theme();
  const update=()=>draw(time);
  update.dispose=()=>{disposed=true;playing=false;stopFrame();lifecycle.abort();visibilityObserver.disconnect();themeObserver.disconnect()};
  return update;
}
