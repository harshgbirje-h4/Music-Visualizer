import os
import re

file_path = 'd:/promusiccc - Copy/script.js'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update applyTheme to call updateThreeVortexColors
apply_theme_target = """  updateModeVisibility();
  syncPipColors();
}"""
apply_theme_replacement = """  updateModeVisibility();
  syncPipColors();
  
  if (state.mode === 'vortex' && typeof updateThreeVortexColors === 'function') {
    updateThreeVortexColors();
  }
}"""
if apply_theme_target in content:
    content = content.replace(apply_theme_target, apply_theme_replacement)
else:
    print("Failed to find applyTheme end to hook into.")

# 2. Update the Three.js Vortex mode block
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
    updateThreeVortexColors();
  } catch (err) {
    console.error('Failed to initialize Three.js Vortex:', err);
    state.threeVortexSupported = false;
    const canvas = document.getElementById('three-canvas');
    if (canvas) canvas.style.display = 'none';
  }
}

// Vortex-only color resolver mapping themes to safe cyberpunk accents
function getVortexThemeColors() {
  const cyber = {
    primary: "#ff2dff", // magenta
    secondary: "#00d9ff", // cyan
    accent: "#8a2bff", // violet
    hot: "#ff008c", // pink
    blue: "#009dff",
    bg: "#03040c"
  };

  if (state.autoCycle) {
    return {
      primary: `hsl(${state.colorHue}, 100%, 62%)`,
      secondary: `hsl(${(state.colorHue + 180) % 360}, 100%, 58%)`,
      accent: `hsl(${(state.colorHue + 270) % 360}, 90%, 62%)`,
      hot: `hsl(${(state.colorHue + 60) % 360}, 100%, 55%)`,
      blue: cyber.blue,
      bg: cyber.bg
    };
  }

  const theme = themeConfig();
  let themeAccent = cyber.accent;
  
  if (theme && theme.palette && theme.palette[0]) {
    themeAccent = theme.palette[0];
  }
  
  // Hard override for study theme to prevent yellow flood
  if (state.theme === 'study') {
     themeAccent = "#ffd700"; // small gold accent
  }

  return {
    primary: cyber.primary,
    secondary: cyber.secondary,
    accent: themeAccent, // Used for 30% blend on specific small accents only
    hot: cyber.hot,
    blue: cyber.blue,
    bg: cyber.bg
  };
}

function updateThreeVortexColors() {
  if (!state.threeVortexInitialized || state.threeVortexInitialized === 'loading') return;
  if (!state.threeVortexMaterials) return;
  
  // Mandatory Debug Logs
  console.log("VORTEX THEME:", state.theme);
  console.log("VORTEX AUTO:", state.autoCycle);
  const colors = getVortexThemeColors();
  console.log("VORTEX COLORS:", colors);

  // Convert hex/hsl to THREE.Color
  const cPri = new THREE.Color(colors.primary);
  const cSec = new THREE.Color(colors.secondary);
  const cAcc = new THREE.Color(colors.accent);
  const cHot = new THREE.Color(colors.hot);

  // Theme Color Policy: 70% cyberpunk + 30% theme accent for variation on specific objects
  const blendedMagenta = cPri.clone().lerp(cAcc, 0.15); // Mostly magenta
  const blendedCyan = cSec.clone().lerp(cAcc, 0.15); // Mostly cyan
  const blendedAccent = cAcc;

  // Apply to materials registry safely
  state.threeVortexMaterials.gateMain.forEach(mat => {
    mat.color.copy(blendedMagenta);
    mat.needsUpdate = true;
  });
  
  state.threeVortexMaterials.gateInner.forEach(mat => {
    mat.color.copy(blendedCyan);
    mat.needsUpdate = true;
  });

  state.threeVortexMaterials.gateAccent.forEach(mat => {
    mat.color.copy(blendedAccent);
    mat.needsUpdate = true;
  });
  
  state.threeVortexMaterials.floorLights.forEach(item => {
    const targetC = item.type === 'mag' ? blendedMagenta : blendedCyan;
    item.mat.color.copy(targetC);
    item.mat.needsUpdate = true;
  });
  
  state.threeVortexMaterials.wallLights.forEach(item => {
    const targetC = item.type === 'mag' ? cHot : blendedCyan;
    item.mat.color.copy(targetC);
    item.mat.needsUpdate = true;
  });
  
  state.threeVortexMaterials.ceilingLights.forEach(item => {
    const targetC = item.type === 'mag' ? blendedMagenta : blendedCyan;
    item.mat.color.copy(targetC);
    item.mat.needsUpdate = true;
  });
  
  state.threeVortexMaterials.reflections.forEach(item => {
    const targetC = item.type === 'mag' ? blendedMagenta : blendedCyan;
    item.mat.color.copy(targetC);
    item.mat.needsUpdate = true;
  });
  
  state.threeVortexMaterials.particles.forEach(mat => {
    mat.color.copy(blendedCyan);
    mat.needsUpdate = true;
  });
  
  if (state.threeVortexScene && state.threeVortexScene.fog) {
    const fogColor = new THREE.Color(colors.bg).lerp(cSec, 0.05); // slight cyan haze
    state.threeVortexScene.fog.color.copy(fogColor);
  }
}

function setupThreeScene() {
  const canvas = document.getElementById('three-canvas');
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  // Safe Tone mapping
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 0.8; 
  state.threeVortexRenderer = renderer;

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x05010a, 0.012);
  state.threeVortexScene = scene;

  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 200);
  camera.position.set(0, 5, 0); 
  state.threeVortexCamera = camera;

  const renderScene = new RenderPass(scene, camera);
  // Safe Bloom Pass setup
  const bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 0.85, 0.45, 0.25);
  const composer = new EffectComposer(renderer);
  composer.addPass(renderScene);
  composer.addPass(bloomPass);
  state.threeVortexComposer = composer;
  
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
  scene.add(ambientLight);
  const dirLight = new THREE.DirectionalLight(0xffffff, 0.5);
  dirLight.position.set(0, 20, -10);
  scene.add(dirLight);

  // Master Data & Material Registry
  state.threeVortexMaterials = {
    gateMain: [],
    gateInner: [],
    gateAccent: [],
    floorLights: [],
    wallLights: [],
    ceilingLights: [],
    particles: [],
    reflections: [],
    darkSurfaces: []
  };

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

  // Base Materials
  const darkWallMat = new THREE.MeshStandardMaterial({ color: 0x070816, roughness: 0.35, metalness: 0.5 });
  const darkFloorMat = new THREE.MeshStandardMaterial({ color: 0x03040c, roughness: 0.15, metalness: 0.8 });
  state.threeVortexMaterials.darkSurfaces.push(darkWallMat, darkFloorMat);

  const boxGeo = new THREE.BoxGeometry(1, 1, 1);
  const floorPanelGeo = new THREE.PlaneGeometry(70, data.spacing);
  const wallPanelGeo = new THREE.PlaneGeometry(data.spacing, 35);
  const ceilPanelGeo = new THREE.PlaneGeometry(70, data.spacing);

  for (let i = 0; i < data.segmentsCount; i++) {
    const zPos = -i * data.spacing;
    
    // FLOOR
    const floor = new THREE.Mesh(floorPanelGeo, darkFloorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.set(0, -3, zPos - data.spacing / 2);
    scene.add(floor);
    data.vortexFloorPanels.push(floor);

    const fMagLMat = new THREE.MeshBasicMaterial({ color: 0xff2dff });
    const fMagRMat = new THREE.MeshBasicMaterial({ color: 0xff2dff });
    const fCyanLMat = new THREE.MeshBasicMaterial({ color: 0x00d9ff });
    const fCyanRMat = new THREE.MeshBasicMaterial({ color: 0x00d9ff });
    state.threeVortexMaterials.floorLights.push({mat: fMagLMat, type: 'mag'}, {mat: fMagRMat, type: 'mag'}, {mat: fCyanLMat, type: 'cyan'}, {mat: fCyanRMat, type: 'cyan'});

    const fMagL = new THREE.Mesh(boxGeo, fMagLMat);
    fMagL.scale.set(1.5, 0.1, data.spacing * 0.8);
    fMagL.position.set(-18, -2.95, zPos - data.spacing / 2);
    scene.add(fMagL);
    data.vortexFloorLights.push({ mesh: fMagL, mat: fMagLMat });

    const fMagR = new THREE.Mesh(boxGeo, fMagRMat);
    fMagR.scale.set(1.5, 0.1, data.spacing * 0.8);
    fMagR.position.set(18, -2.95, zPos - data.spacing / 2);
    scene.add(fMagR);
    data.vortexFloorLights.push({ mesh: fMagR, mat: fMagRMat });

    const fCyanL = new THREE.Mesh(boxGeo, fCyanLMat);
    fCyanL.scale.set(0.5, 0.1, data.spacing);
    fCyanL.position.set(-8, -2.95, zPos - data.spacing / 2);
    scene.add(fCyanL);
    data.vortexFloorLights.push({ mesh: fCyanL, mat: fCyanLMat });

    const fCyanR = new THREE.Mesh(boxGeo, fCyanRMat);
    fCyanR.scale.set(0.5, 0.1, data.spacing);
    fCyanR.position.set(8, -2.95, zPos - data.spacing / 2);
    scene.add(fCyanR);
    data.vortexFloorLights.push({ mesh: fCyanR, mat: fCyanRMat });

    const refMat = new THREE.MeshBasicMaterial({ color: 0xff2dff, transparent: true, opacity: 0.15, blending: THREE.AdditiveBlending, depthWrite: false });
    state.threeVortexMaterials.reflections.push({mat: refMat, type: 'mag'});
    const fReflGate = new THREE.Mesh(boxGeo, refMat);
    fReflGate.scale.set(36, 0.05, 3);
    fReflGate.position.set(0, -2.98, zPos - 2);
    scene.add(fReflGate);
    data.vortexReflections.push({ mesh: fReflGate, mat: refMat });

    // WALLS
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

    const wCyanLMat = new THREE.MeshBasicMaterial({ color: 0x00d9ff });
    const wCyanRMat = new THREE.MeshBasicMaterial({ color: 0x00d9ff });
    const wMagVertLMat = new THREE.MeshBasicMaterial({ color: 0xff008c });
    const wMagVertRMat = new THREE.MeshBasicMaterial({ color: 0xff008c });
    const wModLMat = new THREE.MeshBasicMaterial({ color: 0x00d9ff });
    const wModRMat = new THREE.MeshBasicMaterial({ color: 0x00d9ff });
    
    state.threeVortexMaterials.wallLights.push(
      {mat: wCyanLMat, type: 'cyan'}, {mat: wCyanRMat, type: 'cyan'},
      {mat: wMagVertLMat, type: 'mag'}, {mat: wMagVertRMat, type: 'mag'},
      {mat: wModLMat, type: 'cyan'}, {mat: wModRMat, type: 'cyan'}
    );

    const wCyanL = new THREE.Mesh(boxGeo, wCyanLMat);
    wCyanL.scale.set(0.8, 0.8, data.spacing);
    wCyanL.position.set(-34.5, 6, zPos - data.spacing / 2);
    scene.add(wCyanL);
    data.vortexWallLights.push({ mesh: wCyanL, mat: wCyanLMat });

    const wCyanR = new THREE.Mesh(boxGeo, wCyanRMat);
    wCyanR.scale.set(0.8, 0.8, data.spacing);
    wCyanR.position.set(34.5, 6, zPos - data.spacing / 2);
    scene.add(wCyanR);
    data.vortexWallLights.push({ mesh: wCyanR, mat: wCyanRMat });

    const wMagVertL = new THREE.Mesh(boxGeo, wMagVertLMat);
    wMagVertL.scale.set(1.5, 16, 1.5);
    wMagVertL.position.set(-34.2, 14, zPos - data.spacing * 0.25);
    scene.add(wMagVertL);
    data.vortexWallLights.push({ mesh: wMagVertL, mat: wMagVertLMat });

    const wMagVertR = new THREE.Mesh(boxGeo, wMagVertRMat);
    wMagVertR.scale.set(1.5, 16, 1.5);
    wMagVertR.position.set(34.2, 14, zPos - data.spacing * 0.25);
    scene.add(wMagVertR);
    data.vortexWallLights.push({ mesh: wMagVertR, mat: wMagVertRMat });

    const wModL = new THREE.Mesh(boxGeo, wModLMat);
    wModL.scale.set(2, 3, 6);
    wModL.position.set(-34, 10, zPos - data.spacing * 0.75);
    scene.add(wModL);
    data.vortexWallLights.push({ mesh: wModL, mat: wModLMat });
    
    const wModR = new THREE.Mesh(boxGeo, wModRMat);
    wModR.scale.set(2, 3, 6);
    wModR.position.set(34, 10, zPos - data.spacing * 0.75);
    scene.add(wModR);
    data.vortexWallLights.push({ mesh: wModR, mat: wModRMat });

    // CEILING
    const ceiling = new THREE.Mesh(ceilPanelGeo, darkWallMat);
    ceiling.rotation.x = Math.PI / 2;
    ceiling.position.set(0, 32, zPos - data.spacing / 2);
    scene.add(ceiling);
    data.vortexCeilingPanels.push(ceiling);

    const cCyanLMat = new THREE.MeshBasicMaterial({ color: 0x00d9ff });
    const cCyanRMat = new THREE.MeshBasicMaterial({ color: 0x00d9ff });
    const cMagFrameMat = new THREE.MeshBasicMaterial({ color: 0xff2dff });
    state.threeVortexMaterials.ceilingLights.push({mat: cCyanLMat, type: 'cyan'}, {mat: cCyanRMat, type: 'cyan'}, {mat: cMagFrameMat, type: 'mag'});

    const cCyanL = new THREE.Mesh(boxGeo, cCyanLMat);
    cCyanL.scale.set(1.2, 0.5, data.spacing);
    cCyanL.position.set(-14, 31.5, zPos - data.spacing / 2);
    scene.add(cCyanL);
    data.vortexCeilingLights.push({ mesh: cCyanL, mat: cCyanLMat });

    const cCyanR = new THREE.Mesh(boxGeo, cCyanRMat);
    cCyanR.scale.set(1.2, 0.5, data.spacing);
    cCyanR.position.set(14, 31.5, zPos - data.spacing / 2);
    scene.add(cCyanR);
    data.vortexCeilingLights.push({ mesh: cCyanR, mat: cCyanRMat });

    const cMagFrame = new THREE.Mesh(boxGeo, cMagFrameMat);
    cMagFrame.scale.set(40, 1.5, 3);
    cMagFrame.position.set(0, 31, zPos - data.spacing * 0.5);
    scene.add(cMagFrame);
    data.vortexCeilingLights.push({ mesh: cMagFrame, mat: cMagFrameMat });

    // GATES
    const gateGroup = new THREE.Group();
    gateGroup.position.set(0, 0, zPos);
    
    const matMain = new THREE.MeshBasicMaterial({ color: 0xff2dff });
    const matInner = new THREE.MeshBasicMaterial({ color: 0x00d9ff });
    const matAcc = new THREE.MeshBasicMaterial({ color: 0x8a2bff });
    
    state.threeVortexMaterials.gateMain.push(matMain);
    state.threeVortexMaterials.gateInner.push(matInner);
    state.threeVortexMaterials.gateAccent.push(matAcc);

    const createBar = (w, h, d, x, y, rotZ, mat) => {
      const mesh = new THREE.Mesh(boxGeo, mat);
      mesh.scale.set(w, h, d);
      mesh.position.set(x, y, 0);
      mesh.rotation.z = rotZ;
      return mesh;
    };

    const gTop = createBar(26, 3, 4, 0, 24, 0, matMain);
    const gBot = createBar(26, 3, 4, 0, 2, 0, matMain);
    const gTL = createBar(4, 20, 4, -18, 16.5, -0.6, matMain);
    const gTR = createBar(4, 20, 4, 18, 16.5, 0.6, matMain);
    const gBL = createBar(4, 20, 4, -18, 9.5, 0.6, matMain);
    const gBR = createBar(4, 20, 4, 18, 9.5, -0.6, matMain);

    const cTop = createBar(23, 1, 4.5, 0, 22.5, 0, matInner);
    const cBot = createBar(23, 1, 4.5, 0, 3.5, 0, matInner);
    const cTL = createBar(1.5, 17, 4.5, -16, 15.5, -0.6, matInner);
    const cTR = createBar(1.5, 17, 4.5, 16, 15.5, 0.6, matInner);
    const cBL = createBar(1.5, 17, 4.5, -16, 10.5, 0.6, matInner);
    const cBR = createBar(1.5, 17, 4.5, 16, 10.5, -0.6, matInner);
    
    const vAccL = createBar(2, 6, 5, -22, 13, 0, matAcc);
    const vAccR = createBar(2, 6, 5, 22, 13, 0, matAcc);

    gateGroup.add(gTop, gBot, gTL, gTR, gBL, gBR, cTop, cBot, cTL, cTR, cBL, cBR, vAccL, vAccR);
    scene.add(gateGroup);
    
    data.vortexGates.push({
      group: gateGroup,
      materials: [matMain, matInner, matAcc]
    });
  }

  // PARTICLES
  const pGeo = new THREE.BufferGeometry();
  const pCount = 30; 
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
  state.threeVortexMaterials.particles.push(pMat);
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
  
  if (state.autoCycle) {
    updateThreeVortexColors();
  }
  
  const data = state.threeVortexData;
  const isBassOn = state.bassMode;
  
  const bassPulse = isBassOn ? (state.bassSmoothed || 0) : 0;
  const beatDecay = state.vortexBeatGlow || 0;
  
  // Safe intensity clamping
  const intensity = Math.min(1.0 + (bassPulse * 0.4) + (beatDecay * 0.8), 2.2);
  
  // Apply intensity dynamically via bloom and material multiplier
  // We don't overwrite color here anymore, we just multiply it.
  // Wait, if we use set color in updateThreeVortexColors, multiplying it here every frame will blow it up!
  // Instead, since MeshBasicMaterial handles color directly, we can just let Bloom handle the brightness scaling,
  // or we can dynamically scale the color but we'd need to store the base color.
  // Since we rebuild the base color in updateThreeVortexColors, we MUST call it if we want to reset colors.
  // Actually, to make it clean without destroying base colors: we just scale the Bloom strength.
  
  data.bloomPass.strength = Math.min(0.85 + (bassPulse * 0.2) + (beatDecay * 0.15), 1.3);
  
  data.speed = 0.5 + (isBassOn ? bassPulse * 0.25 : 0);
}

function renderThreeVortex() {
  if (!state.threeVortexComposer || !state.threeVortexData) return;
  
  updateThreeVortexAudio();
  
  const data = state.threeVortexData;
  const cam = state.threeVortexCamera;

  cam.position.z -= data.speed;

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

  if (data.vortexParticles) {
    const posAttr = data.vortexParticles.geometry.attributes.position;
    const pArr = posAttr.array;
    for(let i=0; i<pArr.length/3; i++) {
      pArr[i*3+2] += data.speed * 0.6;
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

print("Successfully injected Material Pipeline fix!")
