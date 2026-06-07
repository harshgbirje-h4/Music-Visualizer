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

function getVortexThemeColors() {
  const cyber = {
    primary: "#ff2dff",
    secondary: "#00d9ff",
    accent: "#8a2bff",
    hot: "#ff008c",
    blue: "#009dff",
    bg: "#03040c"
  };

  if (state.autoCycle) {
    return {
      primary: `hsl(${state.colorHue}, 100%, 62%)`,
      secondary: `hsl(${(state.colorHue + 100) % 360}, 100%, 58%)`,
      accent: `hsl(${(state.colorHue + 210) % 360}, 90%, 62%)`,
      hot: cyber.hot,
      blue: cyber.blue,
      bg: cyber.bg
    };
  }

  const theme = themeConfig();
  // Theme colors are accents only, not full replacement.
  const themeAccent = theme && theme.palette && theme.palette[0]
    ? theme.palette[0]
    : cyber.accent;

  return {
    primary: cyber.primary,
    secondary: cyber.secondary,
    accent: themeAccent,
    hot: cyber.hot,
    blue: cyber.blue,
    bg: cyber.bg
  };
}

function setupThreeScene() {
  const canvas = document.getElementById('three-canvas');
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  // Tone mapping for rich color without washing out (emergency fix applied)
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 0.75;
  state.threeVortexRenderer = renderer;

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x05010a, 0.012); // subtle atmospheric blue/cyan depth haze
  state.threeVortexScene = scene;

  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 200);
  camera.position.set(0, 5, 0); 
  state.threeVortexCamera = camera;

  const renderScene = new RenderPass(scene, camera);
  // Bloom configured for neon cores: emergency fix applied
  const bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 0.85, 0.45, 0.25);
  const composer = new EffectComposer(renderer);
  composer.addPass(renderScene);
  composer.addPass(bloomPass);
  state.threeVortexComposer = composer;
  
  // Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
  scene.add(ambientLight);
  const dirLight = new THREE.DirectionalLight(0xffffff, 0.5);
  dirLight.position.set(0, 20, -10);
  scene.add(dirLight);

  // Groups and Data
  const data = {
    vortexGates: [],
    vortexFloorPanels: [],
    vortexFloorLights: [],
    vortexWallPanels: [],
    vortexWallLights: [],
    vortexCeilingPanels: [],
    vortexCeilingLights: [],
    vortexReflections: [],
    vortexParticles: null,
    speed: 0.6,
    spacing: 35, 
    segmentsCount: 8, 
    bloomPass: bloomPass
  };
  state.threeVortexData = data;

  // Palette Materials (MeshBasicMaterial preserves color under bloom better for pure neon)
  const matMagenta = new THREE.MeshBasicMaterial({ color: 0xff2dff });
  const matPink = new THREE.MeshBasicMaterial({ color: 0xff008c });
  const matCyan = new THREE.MeshBasicMaterial({ color: 0x00d9ff });
  const matViolet = new THREE.MeshBasicMaterial({ color: 0x8a2bff });
  
  // Fake reflection materials
  const refMagenta = new THREE.MeshBasicMaterial({ color: 0xff2dff, transparent: true, opacity: 0.15, blending: THREE.AdditiveBlending, depthWrite: false });
  const refCyan = new THREE.MeshBasicMaterial({ color: 0x00d9ff, transparent: true, opacity: 0.15, blending: THREE.AdditiveBlending, depthWrite: false });

  // Corridor dark surfaces (emergency fix applied to keep them dark)
  const darkWallMat = new THREE.MeshStandardMaterial({ color: 0x070816, roughness: 0.35, metalness: 0.5 });
  const darkFloorMat = new THREE.MeshStandardMaterial({ color: 0x03040c, roughness: 0.15, metalness: 0.8 });

  // Reusable Geometries
  const boxGeo = new THREE.BoxGeometry(1, 1, 1);
  const floorPanelGeo = new THREE.PlaneGeometry(70, data.spacing);
  const wallPanelGeo = new THREE.PlaneGeometry(data.spacing, 35);
  const ceilPanelGeo = new THREE.PlaneGeometry(70, data.spacing);

  for (let i = 0; i < data.segmentsCount; i++) {
    const zPos = -i * data.spacing;
    
    // ================= FLOOR =================
    const floor = new THREE.Mesh(floorPanelGeo, darkFloorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.set(0, -3, zPos - data.spacing / 2);
    scene.add(floor);
    data.vortexFloorPanels.push(floor);

    // Floor Accents
    const fMagL = new THREE.Mesh(boxGeo, matMagenta);
    fMagL.scale.set(1.5, 0.1, data.spacing * 0.8);
    fMagL.position.set(-18, -2.95, zPos - data.spacing / 2);
    scene.add(fMagL);
    data.vortexFloorLights.push({ mesh: fMagL, mat: matMagenta, baseColor: 0xff2dff });

    const fMagR = new THREE.Mesh(boxGeo, matMagenta);
    fMagR.scale.set(1.5, 0.1, data.spacing * 0.8);
    fMagR.position.set(18, -2.95, zPos - data.spacing / 2);
    scene.add(fMagR);
    data.vortexFloorLights.push({ mesh: fMagR, mat: matMagenta, baseColor: 0xff2dff });

    const fCyanL = new THREE.Mesh(boxGeo, matCyan);
    fCyanL.scale.set(0.5, 0.1, data.spacing);
    fCyanL.position.set(-8, -2.95, zPos - data.spacing / 2);
    scene.add(fCyanL);
    data.vortexFloorLights.push({ mesh: fCyanL, mat: matCyan, baseColor: 0x00d9ff });

    const fCyanR = new THREE.Mesh(boxGeo, matCyan);
    fCyanR.scale.set(0.5, 0.1, data.spacing);
    fCyanR.position.set(8, -2.95, zPos - data.spacing / 2);
    scene.add(fCyanR);
    data.vortexFloorLights.push({ mesh: fCyanR, mat: matCyan, baseColor: 0x00d9ff });

    // Fake Floor Perspective Reflection (Gate Reflection)
    const fReflGate = new THREE.Mesh(boxGeo, refMagenta);
    fReflGate.scale.set(36, 0.05, 3);
    fReflGate.position.set(0, -2.98, zPos - 2);
    scene.add(fReflGate);
    data.vortexReflections.push({ mesh: fReflGate, mat: refMagenta, baseColor: 0xff2dff });

    // ================= WALLS =================
    const leftWall = new THREE.Mesh(wallPanelGeo, darkWallMat);
    leftWall.rotation.y = Math.PI / 2;
    leftWall.position.set(-35, 14.5, zPos - data.spacing / 2);
    scene.add(leftWall);
    data.vortexWallPanels.push(leftWall);

    const rightWall = new THREE.Mesh(wallPanelGeo, darkWallMat);
    rightWall.rotation.y = -Math.PI / 2;
    rightWall.position.set(35, 14.5, zPos - data.spacing / 2);
    scene.add(rightWall);
    data.vortexWallPanels.push(rightWall);

    // Wall Lights
    const wCyanL = new THREE.Mesh(boxGeo, matCyan);
    wCyanL.scale.set(0.8, 0.8, data.spacing);
    wCyanL.position.set(-34.5, 6, zPos - data.spacing / 2);
    scene.add(wCyanL);
    data.vortexWallLights.push({ mesh: wCyanL, mat: matCyan, baseColor: 0x00d9ff });

    const wCyanR = new THREE.Mesh(boxGeo, matCyan);
    wCyanR.scale.set(0.8, 0.8, data.spacing);
    wCyanR.position.set(34.5, 6, zPos - data.spacing / 2);
    scene.add(wCyanR);
    data.vortexWallLights.push({ mesh: wCyanR, mat: matCyan, baseColor: 0x00d9ff });

    const wMagVertL = new THREE.Mesh(boxGeo, matPink);
    wMagVertL.scale.set(1.5, 16, 1.5);
    wMagVertL.position.set(-34.2, 14, zPos - data.spacing * 0.25);
    scene.add(wMagVertL);
    data.vortexWallLights.push({ mesh: wMagVertL, mat: matPink, baseColor: 0xff008c });

    const wMagVertR = new THREE.Mesh(boxGeo, matPink);
    wMagVertR.scale.set(1.5, 16, 1.5);
    wMagVertR.position.set(34.2, 14, zPos - data.spacing * 0.25);
    scene.add(wMagVertR);
    data.vortexWallLights.push({ mesh: wMagVertR, mat: matPink, baseColor: 0xff008c });

    // Wall modules (small cyan blocks)
    const wModL = new THREE.Mesh(boxGeo, matCyan);
    wModL.scale.set(2, 3, 6);
    wModL.position.set(-34, 10, zPos - data.spacing * 0.75);
    scene.add(wModL);
    data.vortexWallLights.push({ mesh: wModL, mat: matCyan, baseColor: 0x00d9ff });
    
    const wModR = new THREE.Mesh(boxGeo, matCyan);
    wModR.scale.set(2, 3, 6);
    wModR.position.set(34, 10, zPos - data.spacing * 0.75);
    scene.add(wModR);
    data.vortexWallLights.push({ mesh: wModR, mat: matCyan, baseColor: 0x00d9ff });

    // ================= CEILING =================
    const ceiling = new THREE.Mesh(ceilPanelGeo, darkWallMat);
    ceiling.rotation.x = Math.PI / 2;
    ceiling.position.set(0, 32, zPos - data.spacing / 2);
    scene.add(ceiling);
    data.vortexCeilingPanels.push(ceiling);

    const cCyanL = new THREE.Mesh(boxGeo, matCyan);
    cCyanL.scale.set(1.2, 0.5, data.spacing);
    cCyanL.position.set(-14, 31.5, zPos - data.spacing / 2);
    scene.add(cCyanL);
    data.vortexCeilingLights.push({ mesh: cCyanL, mat: matCyan, baseColor: 0x00d9ff });

    const cCyanR = new THREE.Mesh(boxGeo, matCyan);
    cCyanR.scale.set(1.2, 0.5, data.spacing);
    cCyanR.position.set(14, 31.5, zPos - data.spacing / 2);
    scene.add(cCyanR);
    data.vortexCeilingLights.push({ mesh: cCyanR, mat: matCyan, baseColor: 0x00d9ff });

    const cMagFrame = new THREE.Mesh(boxGeo, matMagenta);
    cMagFrame.scale.set(40, 1.5, 3);
    cMagFrame.position.set(0, 31, zPos - data.spacing * 0.5);
    scene.add(cMagFrame);
    data.vortexCeilingLights.push({ mesh: cMagFrame, mat: matMagenta, baseColor: 0xff2dff });

    // ================= GATES =================
    const gateGroup = new THREE.Group();
    gateGroup.position.set(0, 0, zPos);
    
    const createBar = (w, h, d, x, y, rotZ, mat) => {
      const mesh = new THREE.Mesh(boxGeo, mat);
      mesh.scale.set(w, h, d);
      mesh.position.set(x, y, 0);
      mesh.rotation.z = rotZ;
      return mesh;
    };

    // Hexagonal Portal Gate Structure
    const gTop = createBar(26, 3, 4, 0, 24, 0, matMagenta);
    const gBot = createBar(26, 3, 4, 0, 2, 0, matMagenta);
    const gTL = createBar(4, 20, 4, -18, 16.5, -0.6, matMagenta);
    const gTR = createBar(4, 20, 4, 18, 16.5, 0.6, matMagenta);
    const gBL = createBar(4, 20, 4, -18, 9.5, 0.6, matMagenta);
    const gBR = createBar(4, 20, 4, 18, 9.5, -0.6, matMagenta);

    const cTop = createBar(23, 1, 4.5, 0, 22.5, 0, matCyan);
    const cBot = createBar(23, 1, 4.5, 0, 3.5, 0, matCyan);
    const cTL = createBar(1.5, 17, 4.5, -16, 15.5, -0.6, matCyan);
    const cTR = createBar(1.5, 17, 4.5, 16, 15.5, 0.6, matCyan);
    const cBL = createBar(1.5, 17, 4.5, -16, 10.5, 0.6, matCyan);
    const cBR = createBar(1.5, 17, 4.5, 16, 10.5, -0.6, matCyan);
    
    // Violet side accents (switched to use violet material slot properly)
    const vAccL = createBar(2, 6, 5, -22, 13, 0, matViolet);
    const vAccR = createBar(2, 6, 5, 22, 13, 0, matViolet);

    gateGroup.add(gTop, gBot, gTL, gTR, gBL, gBR, cTop, cBot, cTL, cTR, cBL, cBR, vAccL, vAccR);
    scene.add(gateGroup);
    
    data.vortexGates.push({
      group: gateGroup,
      materials: [matMagenta, matCyan, matViolet, matPink],
      baseColors: [0xff2dff, 0x00d9ff, 0x8a2bff, 0xff008c]
    });
  }

  // ================= PARTICLES =================
  const pGeo = new THREE.BufferGeometry();
  const pCount = 30; // Start with 30 as requested
  const pPos = new Float32Array(pCount * 3);
  for(let i=0; i<pCount; i++) {
    pPos[i*3] = (Math.random() - 0.5) * 60;
    pPos[i*3+1] = Math.random() * 25 + 2; 
    pPos[i*3+2] = -Math.random() * (data.segmentsCount * data.spacing);
  }
  pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
  const pMat = new THREE.PointsMaterial({ 
    color: 0x00d9ff, 
    size: 1.0, 
    transparent: true, 
    opacity: 0.8, 
    blending: THREE.AdditiveBlending 
  });
  const particles = new THREE.Points(pGeo, pMat);
  scene.add(particles);
  data.vortexParticles = particles;
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
  const beatDecay = state.vortexBeatGlow || 0;
  
  // Use strictly controlled Vortex theme colors (never washes out)
  const colors = getVortexThemeColors();
  const colorMag = new THREE.Color(colors.primary);
  const colorCyan = new THREE.Color(colors.secondary);
  const colorPink = new THREE.Color(colors.hot);
  const colorVio = new THREE.Color(colors.accent);

  // Moderate intensity multipliers to prevent white blowout (clamping applied)
  let intensity = 1.0 + (bassPulse * 0.2) + (beatDecay * 0.3);
  intensity = Math.min(intensity, 1.4); // Clamp max multiplier so it doesn't blow out
  
  data.vortexGates.forEach(g => {
    g.materials[0].color.copy(colorMag).multiplyScalar(intensity);
    g.materials[1].color.copy(colorCyan).multiplyScalar(intensity * 1.05);
    g.materials[2].color.copy(colorVio).multiplyScalar(intensity);
    g.materials[3].color.copy(colorPink).multiplyScalar(intensity);
  });

  const applyColors = (arr) => {
    arr.forEach(s => {
      const c = (s.baseColor === 0xff2dff) ? colorMag : 
                (s.baseColor === 0x00d9ff) ? colorCyan : 
                (s.baseColor === 0xff008c) ? colorPink : new THREE.Color(s.baseColor);
      s.mat.color.copy(c).multiplyScalar(Math.min(intensity * 0.9, 1.3)); // strictly clamp
    });
  };

  applyColors(data.vortexFloorLights);
  applyColors(data.vortexWallLights);
  applyColors(data.vortexCeilingLights);
  applyColors(data.vortexReflections);
  
  if (data.vortexParticles) {
    data.vortexParticles.material.color.copy(colorCyan).multiplyScalar(Math.min(intensity * 1.1, 1.4));
  }

  // Bloom tuning for premium glow without overexposure
  data.bloomPass.strength = 0.85 + (bassPulse * 0.15) + (beatDecay * 0.15);
  
  // Forward speed
  data.speed = 0.5 + (isBassOn ? bassPulse * 0.25 : 0);
}

function renderThreeVortex() {
  if (!state.threeVortexComposer || !state.threeVortexData) return;
  const data = state.threeVortexData;
  const cam = state.threeVortexCamera;

  // Move camera forward
  cam.position.z -= data.speed;

  // Seamless Recycling
  const threshold = cam.position.z + 10; 
  const wrapDistance = data.segmentsCount * data.spacing;

  for (let i = 0; i < data.segmentsCount; i++) {
    const gate = data.vortexGates[i].group;
    if (gate.position.z > threshold) {
      const offset = -wrapDistance;
      
      gate.position.z += offset;
      data.vortexFloorPanels[i].position.z += offset;
      data.vortexCeilingPanels[i].position.z += offset;
      
      const moveArr = (arr, countPerSeg) => {
        const base = i * countPerSeg;
        for(let j=0; j<countPerSeg; j++) {
            if(arr[base+j]) arr[base+j].mesh.position.z += offset;
        }
      };

      moveArr(data.vortexFloorLights, 4);
      moveArr(data.vortexReflections, 1);
      
      data.vortexWallPanels[i*2].position.z += offset;
      data.vortexWallPanels[i*2+1].position.z += offset;
      moveArr(data.vortexWallLights, 6);
      
      moveArr(data.vortexCeilingLights, 3);
    }
  }

  // Particles
  if (data.vortexParticles) {
    const posAttr = data.vortexParticles.geometry.attributes.position;
    const pArr = posAttr.array;
    for(let i=0; i<pArr.length/3; i++) {
      pArr[i*3+2] += data.speed * 0.6; // move towards camera faster
      if (pArr[i*3+2] > cam.position.z + 10) {
        pArr[i*3+2] -= wrapDistance;
      }
    }
    posAttr.needsUpdate = true;
  }

  state.threeVortexComposer.render();
}
"""

new_content = pre_three + new_three_logic

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(new_content)

print("Successfully applied theme and bloom fixes to Three.js Vortex mode!")
