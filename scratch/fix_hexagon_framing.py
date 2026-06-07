import os
import re

file_path = 'd:/promusiccc - Copy/script.js'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace THREE.JS VORTEX MODE
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
    updateThreeVortexColors(); // Apply colors initially
  } catch (err) {
    console.error('Failed to initialize Three.js Vortex:', err);
    state.threeVortexSupported = false;
    const canvas = document.getElementById('three-canvas');
    if (canvas) canvas.style.display = 'none';
  }
}

// Vortex-only color resolver mapping themes safely
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
  
  // Safe Study theme
  if (state.theme === 'study') {
     themeAccent = "#ffd700"; // small gold accent
  }

  return {
    primary: cyber.primary,
    secondary: cyber.secondary,
    accent: themeAccent, 
    hot: cyber.hot,
    blue: cyber.blue,
    bg: cyber.bg
  };
}

// Central function to update all registered materials
function updateThreeVortexColors() {
  if (!state.threeVortexInitialized || state.threeVortexInitialized === 'loading') return;
  if (!state.threeVortexMaterials) return;
  
  const colors = getVortexThemeColors();

  const cPri = new THREE.Color(colors.primary);
  const cSec = new THREE.Color(colors.secondary);
  const cAcc = new THREE.Color(colors.accent);
  const cHot = new THREE.Color(colors.hot);

  // 70% cyberpunk + 30% theme accent
  const blendedMagenta = cPri.clone().lerp(cAcc, 0.3);
  const blendedCyan = cSec.clone().lerp(cAcc, 0.2); 
  const blendedAccent = cAcc;
  const baseIntensity = 1.0;

  // Helpers to apply emissive colors properly
  const applyEmissive = (matArray, targetColor, intensity) => {
    matArray.forEach(mat => {
      mat.color.setHex(0x111111); // Dark base color
      mat.emissive.copy(targetColor);
      mat.emissiveIntensity = intensity;
      mat.needsUpdate = true;
    });
  };
  
  const applyBasic = (matArray, targetColor) => {
    matArray.forEach(mat => {
      mat.color.copy(targetColor);
      mat.needsUpdate = true;
    });
  };

  applyEmissive(state.threeVortexMaterials.gateMain, blendedMagenta, baseIntensity);
  applyEmissive(state.threeVortexMaterials.gateInner, blendedCyan, baseIntensity);
  applyEmissive(state.threeVortexMaterials.gateAccent, blendedAccent, baseIntensity);
  
  state.threeVortexMaterials.floorLights.forEach(item => {
    item.mat.color.setHex(0x050505);
    item.mat.emissive.copy(item.type === 'mag' ? blendedMagenta : blendedCyan);
    item.mat.emissiveIntensity = baseIntensity * 0.5;
    item.mat.needsUpdate = true;
  });
  
  state.threeVortexMaterials.wallLights.forEach(item => {
    item.mat.color.setHex(0x050505);
    item.mat.emissive.copy(item.type === 'mag' ? cHot : blendedCyan);
    item.mat.emissiveIntensity = baseIntensity;
    item.mat.needsUpdate = true;
  });
  
  state.threeVortexMaterials.ceilingLights.forEach(item => {
    item.mat.color.setHex(0x050505);
    item.mat.emissive.copy(item.type === 'mag' ? blendedMagenta : blendedCyan);
    item.mat.emissiveIntensity = baseIntensity;
    item.mat.needsUpdate = true;
  });
  
  state.threeVortexMaterials.reflections.forEach(item => {
    item.mat.color.copy(item.type === 'mag' ? blendedMagenta : blendedCyan);
    item.mat.needsUpdate = true;
  });
  
  applyBasic(state.threeVortexMaterials.particles, blendedCyan);
  
  if (state.threeVortexScene && state.threeVortexScene.fog) {
    state.threeVortexScene.fog.color.copy(new THREE.Color(colors.bg).lerp(cSec, 0.08));
  }
}

function setupThreeScene() {
  const canvas = document.getElementById('three-canvas');
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  
  // Safe Tone mapping
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 0.85; 
  state.threeVortexRenderer = renderer;

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x05010a, 0.009); // slightly reduced fog for deeper tunnel feel
  state.threeVortexScene = scene;

  // PERFECT CENTERING & FRAMING FIX:
  // Use slightly wider FOV and pull camera back on Z so front gate is perfectly framed
  const camera = new THREE.PerspectiveCamera(80, window.innerWidth / window.innerHeight, 0.1, 350);
  camera.position.set(0, 13, 20); // Moved back from 10 to 20 so front gate (z=0) is fully visible
  // Look perfectly straight down the center axis
  camera.lookAt(0, 13, -100);
  state.threeVortexCamera = camera;

  const renderScene = new RenderPass(scene, camera);
  const bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 0.85, 0.45, 0.25);
  const composer = new EffectComposer(renderer);
  composer.addPass(renderScene);
  composer.addPass(bloomPass);
  state.threeVortexComposer = composer;
  
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.15); // Darker ambient
  scene.add(ambientLight);
  const dirLight = new THREE.DirectionalLight(0xffffff, 0.3);
  dirLight.position.set(0, 20, -10);
  scene.add(dirLight);

  // MATERIAL REGISTRY
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
    speed: 0.7,
    spacing: 35, // Dense spacing for a cohesive tunnel
    segmentsCount: 10, // More segments for a complete infinity depth
    bloomPass: bloomPass
  };
  state.threeVortexData = data;

  // Dark background surfaces
  const darkWallMat = new THREE.MeshStandardMaterial({ color: 0x05060a, roughness: 0.4, metalness: 0.3 });
  const darkFloorMat = new THREE.MeshStandardMaterial({ color: 0x020308, roughness: 0.1, metalness: 0.8 });
  state.threeVortexMaterials.darkSurfaces.push(darkWallMat, darkFloorMat);

  const boxGeo = new THREE.BoxGeometry(1, 1, 1);
  const floorPanelGeo = new THREE.PlaneGeometry(80, data.spacing);
  const wallPanelGeo = new THREE.PlaneGeometry(data.spacing, 40);
  const ceilPanelGeo = new THREE.PlaneGeometry(80, data.spacing);

  for (let i = 0; i < data.segmentsCount; i++) {
    const zPos = -i * data.spacing;
    
    // ================= FLOOR =================
    const floor = new THREE.Mesh(floorPanelGeo, darkFloorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.set(0, 0, zPos - data.spacing / 2); // Floor exactly at y=0
    scene.add(floor);
    data.vortexFloorPanels.push(floor);

    const createNeonMat = () => new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.4, metalness: 0.1 });
    const fMagLMat = createNeonMat();
    const fMagRMat = createNeonMat();
    const fCyanLMat = createNeonMat();
    const fCyanRMat = createNeonMat();
    state.threeVortexMaterials.floorLights.push(
      {mat: fMagLMat, type: 'mag'}, {mat: fMagRMat, type: 'mag'}, 
      {mat: fCyanLMat, type: 'cyan'}, {mat: fCyanRMat, type: 'cyan'}
    );

    // Continuous, straight, non-blooming floor strips
    const fMagL = new THREE.Mesh(boxGeo, fMagLMat);
    fMagL.scale.set(0.6, 0.1, data.spacing);
    fMagL.position.set(-18, 0.05, zPos - data.spacing / 2);
    scene.add(fMagL);
    data.vortexFloorLights.push({ mesh: fMagL, mat: fMagLMat });

    const fMagR = new THREE.Mesh(boxGeo, fMagRMat);
    fMagR.scale.set(0.6, 0.1, data.spacing);
    fMagR.position.set(18, 0.05, zPos - data.spacing / 2);
    scene.add(fMagR);
    data.vortexFloorLights.push({ mesh: fMagR, mat: fMagRMat });

    const fCyanL = new THREE.Mesh(boxGeo, fCyanLMat);
    fCyanL.scale.set(0.3, 0.1, data.spacing);
    fCyanL.position.set(-8, 0.05, zPos - data.spacing / 2);
    scene.add(fCyanL);
    data.vortexFloorLights.push({ mesh: fCyanL, mat: fCyanLMat });

    const fCyanR = new THREE.Mesh(boxGeo, fCyanRMat);
    fCyanR.scale.set(0.3, 0.1, data.spacing);
    fCyanR.position.set(8, 0.05, zPos - data.spacing / 2);
    scene.add(fCyanR);
    data.vortexFloorLights.push({ mesh: fCyanR, mat: fCyanRMat });

    // Subtle Reflection
    const refMat = new THREE.MeshBasicMaterial({ color: 0xff2dff, transparent: true, opacity: 0.06, blending: THREE.AdditiveBlending, depthWrite: false });
    state.threeVortexMaterials.reflections.push({mat: refMat, type: 'mag'});
    const fReflGate = new THREE.Mesh(boxGeo, refMat);
    fReflGate.scale.set(38, 0.05, 3);
    fReflGate.position.set(0, 0.02, zPos);
    scene.add(fReflGate);
    data.vortexReflections.push({ mesh: fReflGate, mat: refMat });

    // ================= WALLS =================
    const leftWall = new THREE.Mesh(wallPanelGeo, darkWallMat);
    leftWall.rotation.y = Math.PI / 2;
    leftWall.position.set(-42, 13, zPos - data.spacing / 2);
    scene.add(leftWall);
    data.vortexWallPanels.push(leftWall);

    const rightWall = new THREE.Mesh(wallPanelGeo, darkWallMat);
    rightWall.rotation.y = -Math.PI / 2;
    rightWall.position.set(42, 13, zPos - data.spacing / 2);
    scene.add(rightWall);
    data.vortexWallPanels.push(rightWall);

    const wCyanLMat = createNeonMat();
    const wCyanRMat = createNeonMat();
    const wMagVertLMat = createNeonMat();
    const wMagVertRMat = createNeonMat();
    
    state.threeVortexMaterials.wallLights.push(
      {mat: wCyanLMat, type: 'cyan'}, {mat: wCyanRMat, type: 'cyan'},
      {mat: wMagVertLMat, type: 'mag'}, {mat: wMagVertRMat, type: 'mag'}
    );

    // Continuous side light trails
    const wCyanL = new THREE.Mesh(boxGeo, wCyanLMat);
    wCyanL.scale.set(0.5, 0.5, data.spacing);
    wCyanL.position.set(-41.5, 13, zPos - data.spacing / 2);
    scene.add(wCyanL);
    data.vortexWallLights.push({ mesh: wCyanL, mat: wCyanLMat });

    const wCyanR = new THREE.Mesh(boxGeo, wCyanRMat);
    wCyanR.scale.set(0.5, 0.5, data.spacing);
    wCyanR.position.set(41.5, 13, zPos - data.spacing / 2);
    scene.add(wCyanR);
    data.vortexWallLights.push({ mesh: wCyanR, mat: wCyanRMat });

    // Vertical wall struts aligned with gates
    const wMagVertL = new THREE.Mesh(boxGeo, wMagVertLMat);
    wMagVertL.scale.set(1.5, 26, 1.5);
    wMagVertL.position.set(-41.2, 13, zPos);
    scene.add(wMagVertL);
    data.vortexWallLights.push({ mesh: wMagVertL, mat: wMagVertLMat });

    const wMagVertR = new THREE.Mesh(boxGeo, wMagVertRMat);
    wMagVertR.scale.set(1.5, 26, 1.5);
    wMagVertR.position.set(41.2, 13, zPos);
    scene.add(wMagVertR);
    data.vortexWallLights.push({ mesh: wMagVertR, mat: wMagVertRMat });

    // ================= CEILING =================
    const ceiling = new THREE.Mesh(ceilPanelGeo, darkWallMat);
    ceiling.rotation.x = Math.PI / 2;
    ceiling.position.set(0, 26, zPos - data.spacing / 2); // Perfectly symmetric (y=26, center=13)
    scene.add(ceiling);
    data.vortexCeilingPanels.push(ceiling);

    const cCyanLMat = createNeonMat();
    const cCyanRMat = createNeonMat();
    const cMagFrameMat = createNeonMat();
    state.threeVortexMaterials.ceilingLights.push(
      {mat: cCyanLMat, type: 'cyan'}, {mat: cCyanRMat, type: 'cyan'}, {mat: cMagFrameMat, type: 'mag'}
    );

    const cCyanL = new THREE.Mesh(boxGeo, cCyanLMat);
    cCyanL.scale.set(0.6, 0.3, data.spacing);
    cCyanL.position.set(-14, 25.8, zPos - data.spacing / 2);
    scene.add(cCyanL);
    data.vortexCeilingLights.push({ mesh: cCyanL, mat: cCyanLMat });

    const cCyanR = new THREE.Mesh(boxGeo, cCyanRMat);
    cCyanR.scale.set(0.6, 0.3, data.spacing);
    cCyanR.position.set(14, 25.8, zPos - data.spacing / 2);
    scene.add(cCyanR);
    data.vortexCeilingLights.push({ mesh: cCyanR, mat: cCyanRMat });

    const cMagFrame = new THREE.Mesh(boxGeo, cMagFrameMat);
    cMagFrame.scale.set(38, 0.3, 1.5);
    cMagFrame.position.set(0, 25.8, zPos);
    scene.add(cMagFrame);
    data.vortexCeilingLights.push({ mesh: cMagFrame, mat: cMagFrameMat });

    // ================= GATES (Mathematically Perfect Hexagon) =================
    const gateGroup = new THREE.Group();
    gateGroup.position.set(0, 13, zPos); // Set local center exactly to corridor center!
    
    const matMain = createNeonMat();
    const matInner = createNeonMat();
    const matAcc = createNeonMat();
    
    state.threeVortexMaterials.gateMain.push(matMain);
    state.threeVortexMaterials.gateInner.push(matInner);
    state.threeVortexMaterials.gateAccent.push(matAcc);

    // Creates a perfect seamless flat-topped hexagon
    const createPerfectHexagon = (radius, thickness, depth, material) => {
        const hex = new THREE.Group();
        const edgeLength = 2 * radius * Math.tan(Math.PI / 6);
        // Angles for normals: 90, 30, -30, -90, -150, 150
        const angles = [Math.PI/2, Math.PI/6, -Math.PI/6, -Math.PI/2, -5*Math.PI/6, 5*Math.PI/6];
        angles.forEach(angle => {
            const mesh = new THREE.Mesh(boxGeo, material);
            // Overshoot edge length slightly by thickness to merge corners perfectly
            mesh.scale.set(edgeLength + thickness * 1.0, thickness, depth);
            mesh.position.set(Math.cos(angle) * radius, Math.sin(angle) * radius, 0);
            mesh.rotation.z = angle + Math.PI/2;
            hex.add(mesh);
        });
        return hex;
    };

    // The floor is y=0, ceiling is y=26, center is y=13. 
    // Radius of 12 connects perfectly without clipping through floor/ceiling.
    const outerHex = createPerfectHexagon(12, 2.5, 4.0, matMain);
    const innerHex = createPerfectHexagon(10.2, 0.8, 4.5, matInner);
    
    // Violet side accents hugging the left/right points of the hexagon
    // Right point is at distance = edgeLength (which is 12 / cos(30) = 13.85)
    const rightPtDist = 12 / Math.cos(Math.PI/6);
    const vAccL = new THREE.Mesh(boxGeo, matAcc);
    vAccL.scale.set(1.5, 6, 5);
    vAccL.position.set(-rightPtDist - 1.5, 0, 0);
    const vAccR = new THREE.Mesh(boxGeo, matAcc);
    vAccR.scale.set(1.5, 6, 5);
    vAccR.position.set(rightPtDist + 1.5, 0, 0);

    gateGroup.add(outerHex, innerHex, vAccL, vAccR);
    scene.add(gateGroup);
    
    data.vortexGates.push({
      group: gateGroup,
      materials: [matMain, matInner, matAcc]
    });
  }

  // ================= PARTICLES =================
  const pGeo = new THREE.BufferGeometry();
  const pCount = 50; 
  const pPos = new Float32Array(pCount * 3);
  for(let i=0; i<pCount; i++) {
    pPos[i*3] = (Math.random() - 0.5) * 60;
    pPos[i*3+1] = Math.random() * 26; // Fill entirely from floor to ceiling
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
  if (!state.threeVortexData || !state.threeVortexMaterials) return;
  
  if (state.autoCycle) {
    updateThreeVortexColors();
  }
  
  const data = state.threeVortexData;
  const isBassOn = state.bassMode;
  
  const bassPulse = isBassOn ? (state.bassSmoothed || 0) : 0;
  const beatDecay = state.vortexBeatGlow || 0;
  
  const baseEmissive = 1.0;
  const floorBase = 0.5; 
  
  const pulseAdd = bassPulse * 0.5;
  const beatAdd = beatDecay * 0.8;
  
  let intensity = baseEmissive + pulseAdd + beatAdd;
  intensity = Math.max(0.8, Math.min(intensity, 2.5)); 
  
  let floorIntensity = floorBase + (pulseAdd * 0.5) + (beatAdd * 0.5);
  floorIntensity = Math.max(0.4, Math.min(floorIntensity, 1.2));
  
  const applyIntensity = (matArray, val) => {
    matArray.forEach(mat => {
      mat.emissiveIntensity = val;
    });
  };
  
  applyIntensity(state.threeVortexMaterials.gateMain, intensity);
  applyIntensity(state.threeVortexMaterials.gateInner, intensity);
  applyIntensity(state.threeVortexMaterials.gateAccent, intensity);
  
  applyIntensity(state.threeVortexMaterials.floorLights, floorIntensity);
  applyIntensity(state.threeVortexMaterials.wallLights, intensity);
  applyIntensity(state.threeVortexMaterials.ceilingLights, intensity);
  
  data.bloomPass.strength = Math.min(Math.max(0.75 + (bassPulse * 0.15) + (beatDecay * 0.1), 0.65), 1.0);
  
  data.speed = 0.7 + (isBassOn ? bassPulse * 0.2 : 0);
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

print("Successfully generated mathematically perfect hexagons and tunnel continuity!")
