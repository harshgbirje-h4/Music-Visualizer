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
  const cHot = new THREE.Color(colors.hot);

  // 75% cyberpunk + 25% theme accent
  const blendedMagenta = cPri.clone().lerp(cAcc, 0.25);
  const blendedCyan = cSec.clone().lerp(cAcc, 0.20); 
  const blendedAccent = cAcc;

  const applyEmissive = (matArray, targetColor) => {
    matArray.forEach(mat => {
      mat.color.setHex(0x050505); 
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

  applyEmissive(state.threeVortexMaterials.ringsOuter, blendedMagenta);
  applyEmissive(state.threeVortexMaterials.ringsInner, blendedCyan);
  
  applyEmissive(state.threeVortexMaterials.tileBlocks, cHot);
  
  applyEmissive(state.threeVortexMaterials.floorLines, blendedMagenta);
  applyEmissive(state.threeVortexMaterials.ceilingLines, blendedCyan);
  applyEmissive(state.threeVortexMaterials.sideLines, blendedCyan);
  
  applyBasic(state.threeVortexMaterials.floorReflections, blendedMagenta);
  applyBasic(state.threeVortexMaterials.particles, blendedCyan);
  
  if (state.threeVortexScene && state.threeVortexScene.fog) {
    state.threeVortexScene.fog.color.copy(new THREE.Color(colors.bg).lerp(cSec, 0.05));
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
  scene.fog = new THREE.FogExp2(0x03040c, 0.007);
  state.threeVortexScene = scene;

  // PERFECT CENTERING: Camera at (0,0,25) looking straight down Z
  const camera = new THREE.PerspectiveCamera(85, window.innerWidth / window.innerHeight, 0.1, 400);
  camera.position.set(0, 0, 25); 
  camera.lookAt(0, 0, -100);
  state.threeVortexCamera = camera;

  const renderScene = new RenderPass(scene, camera);
  const bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 0.85, 0.4, 0.25);
  const composer = new EffectComposer(renderer);
  composer.addPass(renderScene);
  composer.addPass(bloomPass);
  state.threeVortexComposer = composer;
  
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.1); 
  scene.add(ambientLight);
  const dirLight = new THREE.DirectionalLight(0xffffff, 0.3);
  dirLight.position.set(0, 10, 10);
  scene.add(dirLight);

  state.threeVortexMaterials = {
    ringsOuter: [],
    ringsInner: [],
    floorLines: [],
    floorReflections: [],
    tileBlocks: [],
    sideLines: [],
    ceilingLines: [],
    particles: [],
    shell: [],
    darkSurfaces: []
  };

  const data = {
    vortexRings: [],
    vortexShells: [],
    vortexFloorLines: [],
    vortexFloorRefs: [],
    vortexTiles: [],
    vortexSideLines: [],
    vortexCeilingLines: [],
    vortexParticles: null,
    speed: 0.8,
    spacing: 40, 
    segmentsCount: 12, 
    bloomPass: bloomPass
  };
  state.threeVortexData = data;

  // Premium glossy glass shell material
  const glassMat = new THREE.MeshStandardMaterial({ 
      color: 0x050508, 
      roughness: 0.1, 
      metalness: 0.9, 
      transparent: true, 
      opacity: 0.6,
      side: THREE.BackSide
  });
  state.threeVortexMaterials.shell.push(glassMat);
  
  const darkFloorMat = new THREE.MeshStandardMaterial({ color: 0x020205, roughness: 0.05, metalness: 0.95 });
  state.threeVortexMaterials.darkSurfaces.push(darkFloorMat);

  // Hexagon Geometry logic
  const outRingGeo = new THREE.TorusGeometry(15, 0.35, 12, 6);
  const inRingGeo = new THREE.TorusGeometry(12, 0.15, 8, 6);
  
  // Shell Cylinder
  const shellGeo = new THREE.CylinderGeometry(15.5, 15.5, data.spacing, 6, 1, true);
  shellGeo.rotateX(Math.PI / 2);
  shellGeo.rotateZ(Math.PI / 6); 

  const floorPanelGeo = new THREE.PlaneGeometry(20, data.spacing);
  const lineGeo = new THREE.BoxGeometry(0.3, 0.1, data.spacing);
  const tileGeo = new THREE.BoxGeometry(2, 0.5, 5);

  // Height offset for flat floor inside the shell
  const floorY = -12.5;
  const ceilingY = 12.5;
  const sideX = 13.5;

  for (let i = 0; i < data.segmentsCount; i++) {
    const zPos = -i * data.spacing;
    
    // ================= GLASS SHELL =================
    const shell = new THREE.Mesh(shellGeo, glassMat);
    shell.position.set(0, 0, zPos - data.spacing / 2);
    scene.add(shell);
    data.vortexShells.push(shell);

    // ================= RINGS =================
    const createNeonMat = () => new THREE.MeshStandardMaterial({ color: 0x050505, roughness: 0.4, metalness: 0.2 });
    const outMat = createNeonMat();
    const inMat = createNeonMat();
    state.threeVortexMaterials.ringsOuter.push(outMat);
    state.threeVortexMaterials.ringsInner.push(inMat);

    const outRing = new THREE.Mesh(outRingGeo, outMat);
    outRing.rotation.z = Math.PI / 6; // Flat top/bottom
    outRing.position.set(0, 0, zPos);
    
    const inRing = new THREE.Mesh(inRingGeo, inMat);
    inRing.rotation.z = Math.PI / 6;
    inRing.position.set(0, 0, zPos);
    
    scene.add(outRing);
    scene.add(inRing);
    data.vortexRings.push({ meshOut: outRing, matOut: outMat, meshIn: inRing, matIn: inMat });

    // ================= FLOOR =================
    const floor = new THREE.Mesh(floorPanelGeo, darkFloorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.set(0, floorY, zPos - data.spacing / 2);
    scene.add(floor);
    data.vortexShells.push(floor); 

    const fLineMat = createNeonMat();
    state.threeVortexMaterials.floorLines.push(fLineMat);
    
    const flL = new THREE.Mesh(lineGeo, fLineMat);
    flL.position.set(-6, floorY + 0.1, zPos - data.spacing / 2);
    const flR = new THREE.Mesh(lineGeo, fLineMat);
    flR.position.set(6, floorY + 0.1, zPos - data.spacing / 2);
    scene.add(flL); scene.add(flR);
    data.vortexFloorLines.push({mesh: flL, mat: fLineMat}, {mesh: flR, mat: fLineMat});

    const refMat = new THREE.MeshBasicMaterial({ color: 0xff2dff, transparent: true, opacity: 0.08, blending: THREE.AdditiveBlending, depthWrite: false });
    state.threeVortexMaterials.floorReflections.push(refMat);
    const refPlane = new THREE.Mesh(new THREE.PlaneGeometry(24, 6), refMat);
    refPlane.rotation.x = -Math.PI / 2;
    refPlane.position.set(0, floorY + 0.05, zPos);
    scene.add(refPlane);
    data.vortexFloorRefs.push({mesh: refPlane, mat: refMat});

    // ================= CEILING & SIDES =================
    const cLineMat = createNeonMat();
    state.threeVortexMaterials.ceilingLines.push(cLineMat);
    const cl = new THREE.Mesh(lineGeo, cLineMat);
    cl.position.set(0, ceilingY - 0.1, zPos - data.spacing / 2);
    scene.add(cl);
    data.vortexCeilingLines.push({mesh: cl, mat: cLineMat});
    
    const sLineMat = createNeonMat();
    state.threeVortexMaterials.sideLines.push(sLineMat);
    const slL = new THREE.Mesh(lineGeo, sLineMat);
    slL.position.set(-sideX, 0, zPos - data.spacing / 2);
    const slR = new THREE.Mesh(lineGeo, sLineMat);
    slR.position.set(sideX, 0, zPos - data.spacing / 2);
    scene.add(slL); scene.add(slR);
    data.vortexSideLines.push({mesh: slL, mat: sLineMat}, {mesh: slR, mat: sLineMat});

    // ================= TILE BLOCKS =================
    const tileMat = createNeonMat();
    state.threeVortexMaterials.tileBlocks.push(tileMat);
    
    const tTop = new THREE.Mesh(tileGeo, tileMat);
    tTop.position.set(0, ceilingY - 0.5, zPos - 10);
    const tBot = new THREE.Mesh(tileGeo, tileMat);
    tBot.position.set(0, floorY + 0.5, zPos - 10);
    
    const tLeft = new THREE.Mesh(tileGeo, tileMat);
    tLeft.rotation.z = Math.PI / 2;
    tLeft.position.set(-sideX + 0.5, 0, zPos - 10);
    const tRight = new THREE.Mesh(tileGeo, tileMat);
    tRight.rotation.z = Math.PI / 2;
    tRight.position.set(sideX - 0.5, 0, zPos - 10);
    
    scene.add(tTop); scene.add(tBot); scene.add(tLeft); scene.add(tRight);
    data.vortexTiles.push(
      {mesh: tTop, mat: tileMat}, {mesh: tBot, mat: tileMat},
      {mesh: tLeft, mat: tileMat}, {mesh: tRight, mat: tileMat}
    );
  }

  // ================= PARTICLES =================
  const pGeo = new THREE.BufferGeometry();
  const pCount = 50; 
  const pPos = new Float32Array(pCount * 3);
  for(let i=0; i<pCount; i++) {
    pPos[i*3] = (Math.random() - 0.5) * 26;
    pPos[i*3+1] = (Math.random() - 0.5) * 24; 
    pPos[i*3+2] = -Math.random() * (data.segmentsCount * data.spacing);
  }
  pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
  const pMat = new THREE.PointsMaterial({ 
    color: 0x00d9ff, size: 0.8, transparent: true, opacity: 0.6, blending: THREE.AdditiveBlending 
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
  
  // Clean controlled intensities
  applyIntensity(state.threeVortexMaterials.ringsOuter, 1.0, 0.6, 0.8, 2.8);
  applyIntensity(state.threeVortexMaterials.ringsInner, 1.2, 0.8, 1.0, 3.0);
  applyIntensity(state.threeVortexMaterials.tileBlocks, 1.0, 0.8, 1.5, 3.5);
  
  applyIntensity(state.threeVortexMaterials.floorLines, 0.6, 0.4, 0.6, 1.8);
  applyIntensity(state.threeVortexMaterials.ceilingLines, 0.8, 0.5, 0.8, 2.0);
  applyIntensity(state.threeVortexMaterials.sideLines, 0.8, 0.5, 0.8, 2.0);
  
  data.bloomPass.strength = Math.min(Math.max(0.75 + (bassPulse * 0.15) + (beatDecay * 0.15), 0.65), 1.1);
  
  data.speed = 0.8 + (isBassOn ? bassPulse * 0.3 : 0);
}

function renderThreeVortex() {
  if (!state.threeVortexComposer || !state.threeVortexData) return;
  
  updateThreeVortexAudio();
  
  const data = state.threeVortexData;
  const cam = state.threeVortexCamera;

  cam.position.z -= data.speed;

  const threshold = cam.position.z + 20; 
  const wrapDistance = data.segmentsCount * data.spacing;

  for (let i = 0; i < data.segmentsCount; i++) {
    // We check the first shell position as reference for the segment
    const segZ = data.vortexShells[i*2].position.z; // index 0 is shell, 1 is floor... actually we push shell then floor.
    // wait, we push shell, then floor. So shell is at i*2, floor is at i*2+1.
    // However, Rings are placed at zPos (not zPos - spacing/2). 
    // Let's use Rings for threshold check.
    const ring = data.vortexRings[i].meshOut;
    
    if (ring.position.z > threshold) {
      const offset = -wrapDistance;
      
      ring.position.z += offset;
      data.vortexRings[i].meshIn.position.z += offset;
      
      data.vortexShells[i*2].position.z += offset;
      data.vortexShells[i*2+1].position.z += offset; // floor
      
      data.vortexFloorRefs[i].mesh.position.z += offset;
      
      const moveArr = (arr, countPerSeg) => {
        const base = i * countPerSeg;
        for(let j=0; j<countPerSeg; j++) {
            if(arr[base+j]) arr[base+j].mesh.position.z += offset;
        }
      };

      moveArr(data.vortexFloorLines, 2);
      moveArr(data.vortexSideLines, 2);
      moveArr(data.vortexCeilingLines, 1);
      moveArr(data.vortexTiles, 4);
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

print("Successfully generated Premium Glassy Infinity Tunnel with Torus Geometry!")
