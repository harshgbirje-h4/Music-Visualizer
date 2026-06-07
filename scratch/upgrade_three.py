import os

file_path = 'd:/promusiccc - Copy/script.js'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

start_marker = '// ==========================================\n// THREE.JS VORTEX MODE\n// =========================================='
if start_marker not in content:
    print('Start marker not found')
    exit(1)

pre_three = content.split(start_marker)[0]

new_three_logic = """// ==========================================
// THREE.JS VORTEX MODE
// ==========================================

let THREE, EffectComposer, RenderPass, UnrealBloomPass;

async function initThreeVortex() {
  if (state.threeVortexInitialized || !state.threeVortexSupported) return;
  state.threeVortexInitialized = 'loading';

  try {
    THREE = await import('three');
    const [composerModule, renderPassModule, bloomPassModule] = await Promise.all([
      import('three/addons/postprocessing/EffectComposer.js'),
      import('three/addons/postprocessing/RenderPass.js'),
      import('three/addons/postprocessing/UnrealBloomPass.js')
    ]);
    EffectComposer = composerModule.EffectComposer;
    RenderPass = renderPassModule.RenderPass;
    UnrealBloomPass = bloomPassModule.UnrealBloomPass;
    
    setupThreeScene();
    state.threeVortexInitialized = true;
    resizeThreeVortex();
  } catch (err) {
    console.error('Failed to initialize Three.js Vortex:', err);
    state.threeVortexSupported = false;
    const canvas = document.getElementById('three-canvas');
    if (canvas) canvas.style.display = 'none';
  }
}

function setupThreeScene() {
  const canvas = document.getElementById('three-canvas');
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.0;
  state.threeVortexRenderer = renderer;

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x05010a, 0.015);
  state.threeVortexScene = scene;

  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 150);
  camera.position.set(0, 5, 0); // Positioned above the floor
  state.threeVortexCamera = camera;

  const renderScene = new RenderPass(scene, camera);
  const bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 1.5, 0.6, 0.1);
  const composer = new EffectComposer(renderer);
  composer.addPass(renderScene);
  composer.addPass(bloomPass);
  state.threeVortexComposer = composer;
  
  // Base ambient and directional light
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
  scene.add(ambientLight);
  const dirLight = new THREE.DirectionalLight(0xffffff, 0.3);
  dirLight.position.set(0, 10, -10);
  scene.add(dirLight);

  // Scene Data
  const data = {
    gates: [],
    floorPanels: [],
    floorStrips: [],
    wallPanels: [],
    wallStrips: [],
    ceilingStrips: [],
    particles: [],
    speed: 0.5,
    spacing: 25, // Spacing between gates
    segmentsCount: 9, // Number of repeating segments
    bloomPass: bloomPass
  };
  state.threeVortexData = data;

  // Materials
  const darkWallMat = new THREE.MeshStandardMaterial({
    color: 0x080414,
    roughness: 0.8,
    metalness: 0.2
  });

  const floorMat = new THREE.MeshStandardMaterial({
    color: 0x020108,
    roughness: 0.05,
    metalness: 0.9 // Very glossy reflective floor
  });

  // Reusable Geometries
  const gateBarGeo = new THREE.BoxGeometry(1, 1, 1);
  const floorGeo = new THREE.PlaneGeometry(60, data.spacing);
  const wallGeo = new THREE.PlaneGeometry(data.spacing, 30);
  const ceilGeo = new THREE.PlaneGeometry(60, data.spacing);
  const panelGeo = new THREE.BoxGeometry(1, 1, 1);

  for (let i = 0; i < data.segmentsCount; i++) {
    const zPos = -i * data.spacing;
    
    // ==========================================
    // 1. FLOOR UPGRADE
    // ==========================================
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.set(0, -2, zPos - data.spacing / 2);
    scene.add(floor);
    data.floorPanels.push(floor);

    // Cyan accent floor strips
    const fCyanMat = new THREE.MeshBasicMaterial({ color: 0x00d9ff });
    const fCyanStripL = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.1, data.spacing), fCyanMat);
    fCyanStripL.position.set(-10, -1.9, zPos - data.spacing / 2);
    scene.add(fCyanStripL);
    data.floorStrips.push({ mesh: fCyanStripL, mat: fCyanMat, baseColor: 0x00d9ff });

    const fCyanStripR = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.1, data.spacing), fCyanMat);
    fCyanStripR.position.set(10, -1.9, zPos - data.spacing / 2);
    scene.add(fCyanStripR);
    data.floorStrips.push({ mesh: fCyanStripR, mat: fCyanMat, baseColor: 0x00d9ff });

    // Magenta floor glow lines
    const fMagMat = new THREE.MeshBasicMaterial({ color: 0xff2dff });
    const fMagL = new THREE.Mesh(new THREE.BoxGeometry(2, 0.05, data.spacing), fMagMat);
    fMagL.position.set(-20, -1.95, zPos - data.spacing / 2);
    scene.add(fMagL);
    data.floorStrips.push({ mesh: fMagL, mat: fMagMat, baseColor: 0xff2dff });

    const fMagR = new THREE.Mesh(new THREE.BoxGeometry(2, 0.05, data.spacing), fMagMat);
    fMagR.position.set(20, -1.95, zPos - data.spacing / 2);
    scene.add(fMagR);
    data.floorStrips.push({ mesh: fMagR, mat: fMagMat, baseColor: 0xff2dff });

    // Fake Perspective Reflection Strips on floor (Violet)
    const fReflMat = new THREE.MeshBasicMaterial({ color: 0x8a2bff, transparent: true, opacity: 0.4 });
    const fRefl = new THREE.Mesh(new THREE.BoxGeometry(20, 0.05, 1.0), fReflMat);
    fRefl.position.set(0, -1.95, zPos);
    scene.add(fRefl);
    data.floorStrips.push({ mesh: fRefl, mat: fReflMat, baseColor: 0x8a2bff });


    // ==========================================
    // 2. WALL UPGRADE
    // ==========================================
    const leftWall = new THREE.Mesh(wallGeo, darkWallMat);
    leftWall.rotation.y = Math.PI / 2;
    leftWall.position.set(-28, 13, zPos - data.spacing / 2);
    scene.add(leftWall);
    data.wallPanels.push(leftWall);

    const rightWall = new THREE.Mesh(wallGeo, darkWallMat);
    rightWall.rotation.y = -Math.PI / 2;
    rightWall.position.set(28, 13, zPos - data.spacing / 2);
    scene.add(rightWall);
    data.wallPanels.push(rightWall);

    // Wall panels and detailed elements
    const wallPinkMat = new THREE.MeshBasicMaterial({ color: 0xff008c });
    const wallCyanMat = new THREE.MeshBasicMaterial({ color: 0x00d9ff });

    // Left wall horizontal cyan bar
    const wCyanL = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.5, data.spacing), wallCyanMat);
    wCyanL.position.set(-27.5, 5, zPos - data.spacing / 2);
    scene.add(wCyanL);
    data.wallStrips.push({ mesh: wCyanL, mat: wallCyanMat, baseColor: 0x00d9ff });

    // Right wall horizontal cyan bar
    const wCyanR = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.5, data.spacing), wallCyanMat);
    wCyanR.position.set(27.5, 5, zPos - data.spacing / 2);
    scene.add(wCyanR);
    data.wallStrips.push({ mesh: wCyanR, mat: wallCyanMat, baseColor: 0x00d9ff });

    // Left wall vertical magenta strips
    const wMagL = new THREE.Mesh(new THREE.BoxGeometry(0.5, 15, 0.5), wallPinkMat);
    wMagL.position.set(-27.5, 12.5, zPos);
    scene.add(wMagL);
    data.wallStrips.push({ mesh: wMagL, mat: wallPinkMat, baseColor: 0xff008c });

    // Right wall vertical magenta strips
    const wMagR = new THREE.Mesh(new THREE.BoxGeometry(0.5, 15, 0.5), wallPinkMat);
    wMagR.position.set(27.5, 12.5, zPos);
    scene.add(wMagR);
    data.wallStrips.push({ mesh: wMagR, mat: wallPinkMat, baseColor: 0xff008c });

    // Detailed glowing rectangular modules on walls
    const wModL = new THREE.Mesh(new THREE.BoxGeometry(1, 2, 4), wallCyanMat);
    wModL.position.set(-27, 8, zPos - 5);
    scene.add(wModL);
    data.wallStrips.push({ mesh: wModL, mat: wallCyanMat, baseColor: 0x00d9ff });

    const wModR = new THREE.Mesh(new THREE.BoxGeometry(1, 2, 4), wallCyanMat);
    wModR.position.set(27, 8, zPos - 5);
    scene.add(wModR);
    data.wallStrips.push({ mesh: wModR, mat: wallCyanMat, baseColor: 0x00d9ff });


    // ==========================================
    // 3. CEILING UPGRADE
    // ==========================================
    const ceiling = new THREE.Mesh(ceilGeo, darkWallMat);
    ceiling.rotation.x = Math.PI / 2;
    ceiling.position.set(0, 28, zPos - data.spacing / 2);
    scene.add(ceiling);
    
    // Long ceiling cyan bars
    const cCyanMat = new THREE.MeshBasicMaterial({ color: 0x00d9ff });
    const cBarL = new THREE.Mesh(new THREE.BoxGeometry(1, 1, data.spacing), cCyanMat);
    cBarL.position.set(-15, 27.5, zPos - data.spacing / 2);
    scene.add(cBarL);
    data.ceilingStrips.push({ mesh: cBarL, mat: cCyanMat, baseColor: 0x00d9ff });

    const cBarR = new THREE.Mesh(new THREE.BoxGeometry(1, 1, data.spacing), cCyanMat);
    cBarR.position.set(15, 27.5, zPos - data.spacing / 2);
    scene.add(cBarR);
    data.ceilingStrips.push({ mesh: cBarR, mat: cCyanMat, baseColor: 0x00d9ff });

    // Magenta rectangular overhead frames
    const cMagMat = new THREE.MeshBasicMaterial({ color: 0xff2dff });
    const cFrame = new THREE.Mesh(new THREE.BoxGeometry(30, 0.5, 2), cMagMat);
    cFrame.position.set(0, 27, zPos);
    scene.add(cFrame);
    data.ceilingStrips.push({ mesh: cFrame, mat: cMagMat, baseColor: 0xff2dff });


    // ==========================================
    // 4. PORTAL GATE UPGRADE
    // ==========================================
    const gateGroup = new THREE.Group();
    gateGroup.position.set(0, 0, zPos);
    
    const matMagenta = new THREE.MeshBasicMaterial({ color: 0xff2dff });
    const matPink = new THREE.MeshBasicMaterial({ color: 0xff008c });
    const matCyan = new THREE.MeshBasicMaterial({ color: 0x00d9ff });

    const createBar = (w, h, d, x, y, rotZ, mat) => {
      const mesh = new THREE.Mesh(gateBarGeo, mat);
      mesh.scale.set(w, h, d);
      mesh.position.set(x, y, 0);
      mesh.rotation.z = rotZ;
      return mesh;
    };

    // Thick Hexagonal portal structure
    // Left diagonal magenta bar
    const leftBar = createBar(2.5, 18, 3, -16, 8, 0.35, matMagenta);
    // Right diagonal magenta bar
    const rightBar = createBar(2.5, 18, 3, 16, 8, -0.35, matMagenta);
    // Top pink/magenta bar
    const topBar = createBar(26, 2.5, 3, 0, 16.5, 0, matPink);
    // Lower side cyan accent bars
    const leftLowCyan = createBar(1.5, 8, 2, -18.5, 2, 0.2, matCyan);
    const rightLowCyan = createBar(1.5, 8, 2, 18.5, 2, -0.2, matCyan);
    // Inner cyan highlight bars
    const leftInnerCyan = createBar(0.6, 16, 3.2, -14.2, 8, 0.35, matCyan);
    const rightInnerCyan = createBar(0.6, 16, 3.2, 14.2, 8, -0.35, matCyan);
    const topInnerCyan = createBar(22, 0.6, 3.2, 0, 15.0, 0, matCyan);

    gateGroup.add(leftBar, rightBar, topBar, leftLowCyan, rightLowCyan, leftInnerCyan, rightInnerCyan, topInnerCyan);
    scene.add(gateGroup);
    
    data.gates.push({
      group: gateGroup,
      materials: [matMagenta, matPink, matCyan],
      baseColors: [0xff2dff, 0xff008c, 0x00d9ff]
    });
  }

  // ==========================================
  // 5. PARTICLES / RAIN STREAKS
  // ==========================================
  const pGeo = new THREE.BufferGeometry();
  const pCount = 60; // Max 60 particles as requested
  const pPos = new Float32Array(pCount * 3);
  for(let i=0; i<pCount; i++) {
    pPos[i*3] = (Math.random() - 0.5) * 40;
    pPos[i*3+1] = Math.random() * 20 + 2; // Above floor
    pPos[i*3+2] = -Math.random() * (data.segmentsCount * data.spacing);
  }
  pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
  // Use additive blending and a streak-like appearance
  const pMat = new THREE.PointsMaterial({ 
    color: 0x00d9ff, 
    size: 0.8, 
    transparent: true, 
    opacity: 0.9, 
    blending: THREE.AdditiveBlending 
  });
  const particles = new THREE.Points(pGeo, pMat);
  scene.add(particles);
  data.particlesObj = particles;
}

function resizeThreeVortex() {
  if (!state.threeVortexInitialized || state.threeVortexInitialized === 'loading') return;
  const w = window.innerWidth;
  const h = window.innerHeight;
  state.threeVortexCamera.aspect = w / h;
  state.threeVortexCamera.updateProjectionMatrix();
  state.threeVortexRenderer.setSize(w, h);
  state.threeVortexComposer.setSize(w, h);
}

function updateThreeVortexAudio() {
  if (!state.threeVortexData) return;
  const data = state.threeVortexData;
  const isBassOn = state.bassMode;
  
  // Audio reactions
  const bassPulse = isBassOn ? (state.bassSmoothed || 0) : 0;
  // Beat burst glow
  const beatDecay = state.vortexBeatGlow || 0;
  
  // Determine dominant palette
  const theme = themeConfig();
  let colorMag = new THREE.Color(0xff2dff);
  let colorCyan = new THREE.Color(0x00d9ff);
  let colorPink = new THREE.Color(0xff008c);
  
  if (state.autoCycle && state.theme !== 'bw') {
    colorMag.setHSL((state.colorHue % 360)/360, 1.0, 0.5);
    colorCyan.setHSL(((state.colorHue + 180) % 360)/360, 1.0, 0.5);
    colorPink.setHSL(((state.colorHue + 60) % 360)/360, 1.0, 0.5);
  } else if (!state.autoCycle && state.theme !== 'vortex') {
    colorMag.set(theme.palette[0] || 0xff2dff);
    colorCyan.set(theme.palette[1] || theme.glowColor || 0x00d9ff);
    colorPink.set(theme.palette[2] || theme.palette[0] || 0xff008c);
  }

  // Intensity multiplier: base + bass + beat
  const intensity = 1.0 + (bassPulse * 1.5) + (beatDecay * 1.5);
  
  data.gates.forEach(g => {
    // Index 0: Magenta, Index 1: Pink, Index 2: Cyan
    g.materials[0].color.copy(colorMag).multiplyScalar(intensity);
    g.materials[1].color.copy(colorPink).multiplyScalar(intensity);
    g.materials[2].color.copy(colorCyan).multiplyScalar(intensity * 1.2);
  });

  data.floorStrips.forEach(s => {
    const c = (s.baseColor === 0xff2dff) ? colorMag : ((s.baseColor === 0x00d9ff) ? colorCyan : new THREE.Color(s.baseColor));
    s.mat.color.copy(c).multiplyScalar(intensity * 0.9);
  });
  
  data.wallStrips.forEach(s => {
    const c = (s.baseColor === 0xff008c) ? colorPink : colorCyan;
    s.mat.color.copy(c).multiplyScalar(intensity);
  });
  
  data.ceilingStrips.forEach(s => {
    const c = (s.baseColor === 0xff2dff) ? colorMag : colorCyan;
    s.mat.color.copy(c).multiplyScalar(intensity);
  });
  
  if (data.particlesObj) {
    // alternate color between cyan and pink based on something or just fix
    data.particlesObj.material.color.copy(colorCyan).multiplyScalar(intensity * 1.2);
  }

  // Bloom tuning as requested
  data.bloomPass.strength = 1.2 + (bassPulse * 0.6) + (beatDecay * 0.5);
  data.bloomPass.radius = 0.6;
  data.bloomPass.threshold = 0.15;
  
  // Forward speed
  data.speed = 0.5 + (isBassOn ? bassPulse * 0.4 : 0);
}

function renderThreeVortex() {
  if (!state.threeVortexComposer || !state.threeVortexData) return;
  const data = state.threeVortexData;
  const cam = state.threeVortexCamera;

  // Move camera forward
  cam.position.z -= data.speed;

  // Recycle elements seamlessly
  const threshold = cam.position.z + 10; 
  const wrapDistance = data.segmentsCount * data.spacing;

  for (let i = 0; i < data.segmentsCount; i++) {
    const gate = data.gates[i].group;
    if (gate.position.z > threshold) {
      const offset = -wrapDistance;
      
      // Move gate
      gate.position.z += offset;
      
      // Move floor parts
      data.floorPanels[i].position.z += offset;
      
      // We know how we pushed strips. There are 5 strips per segment
      // 0: CyanL, 1: CyanR, 2: MagL, 3: MagR, 4: Refl
      const fBase = i * 5;
      for(let j=0; j<5; j++) data.floorStrips[fBase + j].mesh.position.z += offset;
      
      // Walls: 2 panels per segment
      data.wallPanels[i*2].position.z += offset;
      data.wallPanels[i*2+1].position.z += offset;
      
      // Wall strips: 6 per segment
      // 0: CyanL, 1: CyanR, 2: MagL, 3: MagR, 4: ModL, 5: ModR
      const wBase = i * 6;
      for(let j=0; j<6; j++) data.wallStrips[wBase + j].mesh.position.z += offset;
      
      // Ceiling panels (handled via wrap like floor but wait, we only added ceiling panels as meshes directly to scene without an array)
      // Ah! Let's ensure ceiling panels were added to an array, wait, I didn't add ceiling panels to an array!
      // Let me fix that. I'll search the children of the scene? No, let's just leave the scene intact. Wait, if ceiling panels aren't moved they will disappear.
    }
  }

  // Recycle particles
  const posAttr = data.particlesObj.geometry.attributes.position;
  const pArr = posAttr.array;
  for(let i=0; i<pArr.length/3; i++) {
    // Also move particles slightly towards camera
    pArr[i*3+2] += data.speed * 0.5; // moving towards camera faster than camera
    if (pArr[i*3+2] > cam.position.z + 5) {
      pArr[i*3+2] -= wrapDistance;
    }
  }
  posAttr.needsUpdate = true;

  state.threeVortexComposer.render();
}
"""

# Small correction to ceiling panels tracking
new_three_logic = new_three_logic.replace(
    'scene.add(ceiling);\n    \n    // Long ceiling cyan bars',
    'scene.add(ceiling);\n    if (!data.ceilingPanels) data.ceilingPanels = [];\n    data.ceilingPanels.push(ceiling);\n    \n    // Long ceiling cyan bars'
)

new_three_logic = new_three_logic.replace(
    '// Move floor parts',
    '// Move floor & ceiling parts\n      if (data.ceilingPanels) data.ceilingPanels[i].position.z += offset;'
)

new_three_logic = new_three_logic.replace(
    '// Ceiling panels (handled via wrap like floor but wait, we only added ceiling panels as meshes directly to scene without an array)',
    ''
)

new_content = pre_three + new_three_logic

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(new_content)

print("Successfully upgraded Three.js Vortex mode!")
