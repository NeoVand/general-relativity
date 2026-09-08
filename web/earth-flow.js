import * as THREE from 'three';

// Ingoing Painlevé–Gullstrand rain observers, released from rest at infinity.
// Length unit: Earth's mean radius. Time unit: R / sqrt(2GM/R).
export const EARTH_RADIUS = 6.371e6;
export const EARTH_GM = 3.986004418e14;
export const FALL_TIME = Math.sqrt(EARTH_RADIUS ** 3 / (2 * EARTH_GM));
export const DURATION = 2.4;
export function rainRadius(r0, time) {
  return Math.max(0, r0 ** 1.5 - 1.5 * time) ** (2 / 3);
}

export function earthFlow({el, stage, root, camera, controls, renderer, render, input, output}) {
  camera.position.set(5.6, 3.2, 7.8);
  controls.target.set(0, 0, 0);
  controls.minDistance = 4.8;
  controls.maxDistance = 15;
  const uniforms = {
    time: {value: 0}, ink: {value: new THREE.Color()}, fade: {value: 1},
  };
  // A deformed material grid: each vertex follows a radial timelike geodesic.
  // Connecting strokes identify neighboring observers; they are not light rays.
  const positions = [];
  for (let axis = 0; axis < 3; axis++) {
    for (let a = -4; a <= 4; a++) for (let b = -4; b <= 4; b++) {
      if (a*a + b*b > 30) continue;
      for (let i = 0; i < 120; i++) {
        for (const k of [i, i+1]) {
          const p = [0, 0, 0];
          p[axis] = -6 + k / 10;
          p[(axis+1)%3] = a * 1.0;
          p[(axis+2)%3] = b * 1.0;
          positions.push(...p);
        }
      }
    }
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  const gridMaterial = new THREE.ShaderMaterial({
    uniforms, transparent: true, depthWrite: false,
    vertexShader: `
      uniform float time;
      varying float radius;
      varying float initialRadius;
      varying float depth;
      varying float emphasis;
      void main() {
        initialRadius = length(position);
        emphasis = min(abs(position.x), min(abs(position.y), abs(position.z))) < .001 ? 1. : .52;
        radius = pow(max(0., pow(initialRadius, 1.5) - 1.5*time), 2./3.);
        vec3 p = position * radius / max(initialRadius, .001);
        vec4 view = modelViewMatrix * vec4(p, 1.);
        depth = -view.z;
        gl_Position = projectionMatrix * view;
      }`,
    fragmentShader: `
      uniform vec3 ink;
      uniform float fade;
      varying float radius;
      varying float initialRadius;
      varying float depth;
      varying float emphasis;
      void main() {
        if (initialRadius < 1. || radius < 1.005) discard;
        float edge = 1. - smoothstep(3.1, 4.8, radius);
        float near = 1. - smoothstep(7., 13., depth);
        gl_FragColor = vec4(ink, edge * (.12 + .48*near) * fade * emphasis);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }`,
  });
  const grid = new THREE.LineSegments(geometry, gridMaterial);
  grid.frustumCulled = false;
  root.add(grid);

  const earthMaterial = new THREE.MeshStandardMaterial({color: 0xffffff, roughness: .92, metalness: 0});
  const earth = new THREE.Mesh(new THREE.SphereGeometry(1, 96, 64), earthMaterial);
  earth.rotation.y = -1.6;
  root.add(earth);
  new THREE.TextureLoader().load('./assets/earth/blue-marble-december.webp', texture => {
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
  const starts = Array.from({length: 160}, (_, i) => {
    const y = 1 - 2*(i+.5)/160, theta = i*Math.PI*(3-Math.sqrt(5));
    const r = 1.25 + ((i*73)%160)/160 * 4.7;
    return {r, direction: new THREE.Vector3(Math.sqrt(1-y*y)*Math.cos(theta), y, Math.sqrt(1-y*y)*Math.sin(theta))};
  });
  const dummy = new THREE.Object3D();
  const button = el.querySelector('[data-flow-play]');
  const status = el.querySelector('[data-flow-status]');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let playing = !reduced.matches, visible = false, frame = 0, last = 0, time = +input.value/100*DURATION;
  let lastReadout = -1;
  const setButton = () => {
    button.setAttribute('aria-label', playing ? 'Pause free fall' : 'Play free fall');
    button.setAttribute('aria-pressed', String(playing));
    button.querySelector('span').textContent = playing ? 'Pause' : 'Play';
    el.dataset.playing = String(playing);
  };
  function draw(timeValue, fading = 1) {
    uniforms.time.value = timeValue;
    uniforms.fade.value = fading;
    for (let i = 0; i < starts.length; i++) {
      const s = starts[i], r = rainRadius(s.r, timeValue);
      dummy.position.copy(s.direction).multiplyScalar(r);
      const edge = Math.max(0, Math.min(1, (4.5-r)/.7));
      dummy.scale.setScalar(r > 1.02 ? edge : 0);
      dummy.updateMatrix(); particles.setMatrixAt(i, dummy.matrix);
    }
    particles.instanceMatrix.needsUpdate = true;
    particleMaterial.opacity = fading * .8;
    const minutes = timeValue * FALL_TIME / 60;
    const rounded = Math.round(minutes*10);
    if (rounded !== lastReadout) {
      output.innerHTML = window.katex.renderToString(`t=${(rounded/10).toFixed(1)}\\,\\mathrm{min}`);
      input.setAttribute('aria-valuetext', `${minutes.toFixed(1)} minutes of free fall`);
      lastReadout = rounded;
    }
    el.dataset.time = String(timeValue);
    el.dataset.measurement = String(rainRadius(3, timeValue));
    el.dataset.frames = String(+(el.dataset.frames || 0) + 1);
  }
  function stopFrame() {cancelAnimationFrame(frame); frame = 0; last = 0;}
  function tick(now) {
    frame = 0;
    if (!playing || !visible || document.hidden || el.dataset.ready === 'fallback') {last=0; return;}
    const dt = last ? Math.min((now-last)/1000, .1) : 0;
    last = now;
    // Ninety seconds of PG time per playback second. A short fade marks replay.
    time += dt * 90 / FALL_TIME;
    if (time > DURATION + .12) time = 0;
    const shown = Math.min(time, DURATION);
    const fade = time > DURATION ? Math.max(0, 1-(time-DURATION)/.12) : Math.min(1, time/.10);
    input.value = String(shown/DURATION*100);
    status.textContent = time > DURATION || time < .1 ? 'Replaying the reference grid' : 'Free fall · accelerated playback';
    draw(shown, fade); render();
    frame = requestAnimationFrame(tick);
  }
  function resume() {if (playing && visible && !document.hidden && !frame) frame=requestAnimationFrame(tick);}
  button.addEventListener('click', () => {playing = !playing; setButton(); if(playing) resume(); else {stopFrame(); status.textContent='Paused · drag the time slider';}});
  input.addEventListener('input', () => {playing = false; stopFrame(); setButton(); status.textContent='Paused · drag the time slider';});
  new IntersectionObserver(entries => {visible=entries[0].isIntersecting; if(visible)resume();else stopFrame();},{threshold:.05}).observe(stage);
  document.addEventListener('visibilitychange', () => {if(document.hidden)stopFrame();else resume();});
  reduced.addEventListener('change', () => {if(reduced.matches){playing=false;stopFrame();setButton();status.textContent='Paused · reduced motion';}});
  renderer.domElement.addEventListener('webglcontextlost', stopFrame);
  new MutationObserver(theme).observe(document.documentElement,{attributes:true,attributeFilter:['data-theme']});
  function theme() {
    const styles = getComputedStyle(el);
    uniforms.ink.value.set(styles.getPropertyValue('--geometry').trim());
    particleMaterial.color.set(styles.getPropertyValue('--observer').trim());
    render();
  }
  setButton(); theme();
  status.textContent = playing ? 'Free fall · accelerated playback' : 'Paused · drag the time slider';
  return () => {time = +input.value/100*DURATION; draw(time);};
}
