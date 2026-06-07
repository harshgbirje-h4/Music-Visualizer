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
    updateThreeVortexColors(); 
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
    bg: "#05010a"
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
  
  if (state.theme === 'study') {
     themeAccent = "#ffd700"; 
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

function updateThreeVortexColors() {
  if (!state.threeVortexInitialized || state.threeVortexInitialized === 'loading') return;
  if (!state.threeVortexMaterials) return;
  
  const colors = getVortexThemeColors();

  const cPri = new THREE.Color(colors.primary);
  const cSec = new THREE.Color(colors.secondary);
  const cAcc = new THREE.Color(colors.accent);

  // 80% cyberpunk + 20% theme accent
  const blendedMagenta = cPri.clone().lerp(cAcc, 0.20);
  const blendedCyan = cSec.clone().lerp(cAcc, 0.20); 

  const applyEmissive = (matArray, targetColor) => {
    matArray.forEach(mat => {
      mat.color.setHex(0x020202); 
      mat.emissive.copy(targetColor);
      mat.needsUpdate = true;
    });
  };
  
  const applyBasic = (matArray, targetColor) => {
    matArray.forEach(mat => {
      mat.color.copy(targetColor);
      mat.needsUpdate = true;
    });
  };

  // Main neon
  applyEmissive(state.threeVortexMaterials.ringsOuter, blendedMagenta);
  applyEmissive(state.threeVortexMaterials.ringsInner, blendedCyan);
  
  // Modules
  applyEmissive(state.threeVortexMaterials.modMag, blendedMagenta);
  applyEmissive(state.threeVortexMaterials.modCyan, blendedCyan);
  
  // Floor and accents
  applyEmissive(state.threeVortexMaterials.floorLines, blendedMagenta);
  applyBasic(state.threeVortexMaterials.particles, blendedMagenta);
  
  if (state.threeVortexScene && state.threeVortexScene.fog) {
    state.threeVortexScene.fog.color.copy(new THREE.Color(colors.bg));
  }
}

function setupThreeScene() {
  const canvas = document.getElementById('three-canvas');
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 0.85; 
  state.threeVortexRenderer = renderer;

  const scene = new THREE.Scene();
  // Deep purple/magenta cyber fog
  scene.fog = new THREE.FogExp2(0x05010a, 0.007);
  state.threeVortexScene = scene;

  // PERFECT CENTERING: Camera at (0,0,25) looking straight down Z
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 500);
  camera.position.set(0, 0, 25); 
  camera.lookAt(0, 0, -100);
  state.threeVortexCamera = camera;

  const renderScene = new RenderPass(scene, camera);
  const bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 1.0, 0.45, 0.2);
  const composer = new EffectComposer(renderer);
  composer.addPass(renderScene);
  composer.addPass(bloomPass);
  state.threeVortexComposer = composer;
  
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.2); 
  scene.add(ambientLight);

  state.threeVortexMaterials = {
    ringsOuter: [],
    ringsInner: [],
    modMag: [],
    modCyan: [],
    floorLines: [],
    particles: [],
    glass: [],
    darkSurfaces: []
  };

  const data = {
    segments: [],
    vortexParticles: null,
    speed: 1.0,
    spacing: 50, 
    segmentsCount: 14, 
    bloomPass: bloomPass
  };
  state.threeVortexData = data;

  // Premium glossy glass materials
  const glassMat = new THREE.MeshStandardMaterial({ 
      color: 0x050510, 
      roughness: 0.1, 
      metalness: 0.9, 
      transparent: true, 
      opacity: 0.4,
      envMapIntensity: 2.0
  });
  state.threeVortexMaterials.glass.push(glassMat);
  
  const darkFloorMat = new THREE.MeshStandardMaterial({ 
      color: 0x020202, 
      roughness: 0.05, 
      metalness: 0.95,
      transparent: true,
      opacity: 0.9 // Let reflections show slightly through
  });
  state.threeVortexMaterials.darkSurfaces.push(darkFloorMat);

  const createNeonMat = () => new THREE.MeshStandardMaterial({ color: 0x020202, roughness: 0.2, metalness: 0.1 });
  
  const outMat = createNeonMat();
  const inMat = createNeonMat();
  const modMagMat = createNeonMat();
  const modCyanMat = createNeonMat();
  const fLineMat = createNeonMat();
  
  state.threeVortexMaterials.ringsOuter.push(outMat);
  state.threeVortexMaterials.ringsInner.push(inMat);
  state.threeVortexMaterials.modMag.push(modMagMat);
  state.threeVortexMaterials.modCyan.push(modCyanMat);
  state.threeVortexMaterials.floorLines.push(fLineMat);

  // Geometries
  const outRingGeo = new THREE.TorusGeometry(14, 0.4, 6, 6);
  const inRingGeo = new THREE.TorusGeometry(12, 0.15, 6, 6);
  
  const boxGeo = new THREE.BoxGeometry(1, 1, 1);
  const floorPanelGeo = new THREE.PlaneGeometry(100, data.spacing);
  const shellGeo = new THREE.CylinderGeometry(16, 16, data.spacing, 6, 1, true);
  shellGeo.rotateX(Math.PI / 2);
  shellGeo.rotateZ(Math.PI / 6);

  const floorY = -13;

  for (let i = 0; i < data.segmentsCount; i++) {
    const zPos = -i * data.spacing;
    
    // Parent group for the entire segment
    const segGroup = new THREE.Group();
    segGroup.position.set(0, 0, zPos);
    
    // Parent group for reflections
    const reflGroup = new THREE.Group();
    reflGroup.position.set(0, floorY * 2, zPos); // Mirror across floorY
    reflGroup.scale.y = -1; // Flip upside down!

    // ================= FLOOR PLANE =================
    const floor = new THREE.Mesh(floorPanelGeo, darkFloorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.set(0, floorY, 0); 
    // We only add the floor to the main segment, not the reflection
    segGroup.add(floor);

    // ================= SHELL =================
    const shell = new THREE.Mesh(shellGeo, glassMat);
    segGroup.add(shell);
    // Don't strictly need to reflect the dark shell

    // Helper to add to both real and reflection
    const addReflected = (mesh) => {
        segGroup.add(mesh);
        // Clone for reflection but dim the emissive slightly using opacity
        const rMesh = mesh.clone();
        // Since materials are shared, we rely on the reflection being under the semi-transparent floor
        // It looks like a perfect raytraced reflection natively!
        reflGroup.add(rMesh);
    };

    // ================= RINGS =================
    const outRing = new THREE.Mesh(outRingGeo, outMat);
    outRing.rotation.z = Math.PI / 6; 
    addReflected(outRing);
    
    const inRing = new THREE.Mesh(inRingGeo, inMat);
    inRing.rotation.z = Math.PI / 6;
    addReflected(inRing);

    // ================= SIDE MODULES (Glossy Glass + Core) =================
    const leftMod = new THREE.Group();
    leftMod.position.set(-14.5, 0, 0);
    
    const rightMod = new THREE.Group();
    rightMod.position.set(14.5, 0, 0);

    const buildMod = (group) => {
        // Glass Casing
        const casing = new THREE.Mesh(boxGeo, glassMat);
        casing.scale.set(3, 4, 18);
        group.add(casing);
        
        // Magenta Core
        const coreMag = new THREE.Mesh(boxGeo, modMagMat);
        coreMag.scale.set(1.5, 2.5, 12);
        group.add(coreMag);
        
        // Cyan Beam
        const coreCyan = new THREE.Mesh(boxGeo, modCyanMat);
        coreCyan.scale.set(1.8, 0.4, 14);
        group.add(coreCyan);
    };
    buildMod(leftMod);
    buildMod(rightMod);
    
    addReflected(leftMod);
    addReflected(rightMod);

    // Small dotted tile array behind side modules
    const dotArrayL = new THREE.Group();
    dotArrayL.position.set(-15, 0, -12);
    const dotArrayR = new THREE.Group();
    dotArrayR.position.set(15, 0, -12);
    
    for(let d=0; d<4; d++) {
        const dotL = new THREE.Mesh(boxGeo, modCyanMat);
        dotL.scale.set(1, 0.5, 1.5);
        dotL.position.set(0, 0, -d * 4);
        dotArrayL.add(dotL);
        
        const dotR = new THREE.Mesh(boxGeo, modCyanMat);
        dotR.scale.set(1, 0.5, 1.5);
        dotR.position.set(0, 0, -d * 4);
        dotArrayR.add(dotR);
    }
    addReflected(dotArrayL);
    addReflected(dotArrayR);

    // ================= TOP / BOTTOM TILE BLOCKS =================
    // Top tile at y=13.5
    const tTop = new THREE.Group();
    tTop.position.set(0, 13.5, 0);
    const tTopCase = new THREE.Mesh(boxGeo, glassMat);
    tTopCase.scale.set(4, 2.5, 4);
    const tTopCore = new THREE.Mesh(boxGeo, modMagMat);
    tTopCore.scale.set(2, 1.5, 2);
    tTop.add(tTopCase, tTopCore);
    
    const vLineTop = new THREE.Mesh(boxGeo, modCyanMat);
    vLineTop.scale.set(0.1, 3, 0.1);
    vLineTop.position.set(0, 11.5, 0);
    
    // Bottom tile at y=-11.5 (above floor)
    const tBot = new THREE.Group();
    tBot.position.set(0, -11.5, 0);
    const tBotCase = new THREE.Mesh(boxGeo, glassMat);
    tBotCase.scale.set(4, 2.5, 4);
    const tBotCore = new THREE.Mesh(boxGeo, modMagMat);
    tBotCore.scale.set(2, 1.5, 2);
    tBot.add(tBotCase, tBotCore);
    
    const vLineBot = new THREE.Mesh(boxGeo, modCyanMat);
    vLineBot.scale.set(0.1, 3, 0.1);
    vLineBot.position.set(0, -9.5, 0);

    addReflected(tTop);
    addReflected(vLineTop);
    addReflected(tBot);
    addReflected(vLineBot);

    // ================= FLOOR LASER LINES =================
    // Placed exactly to align with the bottom hexagon corners (x = +/- 12 * cos(60) = 6)
    const flL = new THREE.Mesh(boxGeo, fLineMat);
    flL.scale.set(0.6, 0.1, data.spacing);
    flL.position.set(-6, floorY + 0.1, 0);
    
    const flR = new THREE.Mesh(boxGeo, fLineMat);
    flR.scale.set(0.6, 0.1, data.spacing);
    flR.position.set(6, floorY + 0.1, 0);
    
    // We only add floor lines to the main segment, since they are ON the floor
    segGroup.add(flL);
    segGroup.add(flR);
    
    // Add both groups to scene
    scene.add(segGroup);
    scene.add(reflGroup);
    
    data.segments.push({
        main: segGroup,
        refl: reflGroup
    });
  }

  // ================= PARTICLES =================
  const pGeo = new THREE.BufferGeometry();
  const pCount = 80; 
  const pPos = new Float32Array(pCount * 3);
  for(let i=0; i<pCount; i++) {
    pPos[i*3] = (Math.random() - 0.5) * 30;
    pPos[i*3+1] = (Math.random() - 0.5) * 26; 
    pPos[i*3+2] = -Math.random() * (data.segmentsCount * data.spacing);
  }
  pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
  // Box points
  const pMat = new THREE.PointsMaterial({ 
    color: 0xff2dff, size: 0.5, transparent: true, opacity: 0.8, blending: THREE.AdditiveBlending 
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
  
  if (state.beatActive) {
    state.vortexBeatGlow = 1;
  }
  if (state.vortexBeatGlow > 0) {
    state.vortexBeatGlow *= 0.88;
  }
  
  const data = state.threeVortexData;
  const isBassOn = state.bassMode;
  
  const bassPulse = isBassOn ? Math.min(1, (state.bassSmoothed || 0) * 2.8) : 0;
  const beatDecay = state.vortexBeatGlow || 0;
  
  const applyIntensity = (matArray, base, pMult, bMult, limit) => {
      const val = Math.min(base + (bassPulse * pMult) + (beatDecay * bMult), limit);
      matArray.forEach(mat => {
          if (mat.emissiveIntensity !== undefined) mat.emissiveIntensity = val;
      });
  };
  
  applyIntensity(state.threeVortexMaterials.ringsOuter, 1.2, 0.8, 1.0, 3.5);
  applyIntensity(state.threeVortexMaterials.ringsInner, 1.5, 1.0, 1.2, 4.0);
  applyIntensity(state.threeVortexMaterials.modMag, 1.5, 0.8, 1.5, 4.0);
  applyIntensity(state.threeVortexMaterials.modCyan, 1.8, 1.0, 1.5, 4.5);
  applyIntensity(state.threeVortexMaterials.floorLines, 0.8, 0.5, 0.8, 2.2);
  
  data.bloomPass.strength = Math.min(Math.max(0.85 + (bassPulse * 0.2) + (beatDecay * 0.15), 0.7), 1.2);
  
  data.speed = 1.0 + (isBassOn ? bassPulse * 0.4 : 0);
}

function renderThreeVortex() {
  if (!state.threeVortexComposer || !state.threeVortexData) return;
  
  updateThreeVortexAudio();
  
  const data = state.threeVortexData;
  const cam = state.threeVortexCamera;

  cam.position.z -= data.speed;

  const threshold = cam.position.z + 25; 
  const wrapDistance = data.segmentsCount * data.spacing;

  for (let i = 0; i < data.segmentsCount; i++) {
    const seg = data.segments[i];
    
    if (seg.main.position.z > threshold) {
      const offset = -wrapDistance;
      seg.main.position.z += offset;
      seg.refl.position.z += offset;
    }
  }

  if (data.vortexParticles) {
    const posAttr = data.vortexParticles.geometry.attributes.position;
    const pArr = posAttr.array;
    for(let i=0; i<pArr.length/3; i++) {
      pArr[i*3+2] += data.speed * 0.6;
      if (pArr[i*3+2] > cam.position.z + 20) {
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

print("Successfully injected Premium Reference Implementations!")
