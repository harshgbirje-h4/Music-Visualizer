import os
import re

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
  }
}

function getVortexThemeColors() {
  const cyber = {
    primary: "#ff2dff", 
    secondary: "#00d9ff", 
    accent: "#8a2bff", 
    hot: "#ff008c", 
    blue: "#009dff",
    bg: "#020104"
  };

  if (state.autoCycle) {
    return {
      primary: `hsl(${state.colorHue}, 100%, 62%)`,
      secondary: `hsl(${(state.colorHue + 180) % 360}, 100%, 58%)`,
      accent: `hsl(${(state.colorHue + 270) % 360}, 90%, 62%)`,
      bg: cyber.bg
    };
  }

  const theme = themeConfig();
  let themeAccent = cyber.accent;
  if (theme && theme.palette && theme.palette[0]) themeAccent = theme.palette[0];
  if (state.theme === 'study') themeAccent = "#ffd700";

  return { primary: cyber.primary, secondary: cyber.secondary, accent: themeAccent, bg: cyber.bg };
}

function updateThreeVortexColors() {
  if (!state.threeVortexInitialized || state.threeVortexInitialized === 'loading') return;
  if (!state.threeVortexMaterials) return;
  
  const colors = getVortexThemeColors();

  const cPri = new THREE.Color(colors.primary);
  const cSec = new THREE.Color(colors.secondary);
  const cAcc = new THREE.Color(colors.accent);

  const blendedMagenta = cPri.clone().lerp(cAcc, 0.15);
  const blendedCyan = cSec.clone().lerp(cAcc, 0.15); 

  const applyEmissive = (matArray, targetColor) => {
    matArray.forEach(mat => {
      mat.color.setHex(0x000000); 
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
  applyEmissive(state.threeVortexMaterials.floorLines, blendedMagenta);
  applyEmissive(state.threeVortexMaterials.cyanStrips, blendedCyan);
  applyBasic(state.threeVortexMaterials.particles, blendedMagenta);
  
  // Set fog to perfectly match background to create true depth fade
  if (state.threeVortexScene && state.threeVortexScene.fog) {
    state.threeVortexScene.fog.color.copy(new THREE.Color(colors.bg));
  }
}

function setupThreeScene() {
  const canvas = document.getElementById('three-canvas');
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 0.8; 
  state.threeVortexRenderer = renderer;

  const scene = new THREE.Scene();
  // Denser fog for extreme depth fade (so distant rings fade to black/purple)
  scene.fog = new THREE.FogExp2(0x020104, 0.012);
  scene.background = new THREE.Color(0x020104);
  state.threeVortexScene = scene;

  // 1. FRONT HEXAGON SMALLER
  // Camera placed much further back so first segment looks smaller (approx 45% screen height)
  const camera = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight, 0.1, 800);
  camera.position.set(0, 0, 30); 
  camera.lookAt(0, 0, -100);
  state.threeVortexCamera = camera;

  const renderScene = new RenderPass(scene, camera);
  // Controlled bloom: lower strength, softer radius, no pure white blowout
  const bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 0.8, 0.45, 0.3);
  const composer = new EffectComposer(renderer);
  composer.addPass(renderScene);
  composer.addPass(bloomPass);
  state.threeVortexComposer = composer;
  
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); 
  scene.add(ambientLight);

  state.threeVortexMaterials = {
    ringsOuter: [], ringsInner: [], floorLines: [], cyanStrips: [], particles: [], glass: [], darkSurfaces: []
  };

  const data = {
    segments: [], vortexParticles: null, speed: 1.0, spacing: 40, segmentsCount: 16, bloomPass: bloomPass
  };
  state.threeVortexData = data;

  // GLASS & WALL MATERIALS
  const glassMat = new THREE.MeshStandardMaterial({ 
      color: 0x010003, roughness: 0.05, metalness: 0.95, transparent: true, opacity: 0.4
  });
  state.threeVortexMaterials.glass.push(glassMat);
  
  // Real dark glossy wall panels to enclose the space
  const darkWallMat = new THREE.MeshStandardMaterial({ 
      color: 0x010101, roughness: 0.15, metalness: 0.85 
  });
  state.threeVortexMaterials.darkSurfaces.push(darkWallMat);

  // Reflective floor
  const reflectionFloorMat = new THREE.MeshStandardMaterial({ 
      color: 0x000000, roughness: 0.02, metalness: 1.0, transparent: true, opacity: 0.8
  });
  state.threeVortexMaterials.darkSurfaces.push(reflectionFloorMat);

  // NEON MATERIALS
  const createNeonMat = () => new THREE.MeshStandardMaterial({ color: 0x000000, roughness: 0.3, metalness: 0.1 });
  const outMat = createNeonMat();
  const inMat = createNeonMat();
  const fLineMat = createNeonMat();
  const cStripMat = createNeonMat();
  
  // 6. FAKE REFLECTIONS - Dim mirrored materials
  const createDimNeonMat = () => new THREE.MeshStandardMaterial({ 
      color: 0x000000, roughness: 0.3, metalness: 0.1, transparent: true, opacity: 0.2 
  });
  const outMatDim = createDimNeonMat();
  const inMatDim = createDimNeonMat();
  const cStripMatDim = createDimNeonMat();
  
  state.threeVortexMaterials.ringsOuter.push(outMat, outMatDim);
  state.threeVortexMaterials.ringsInner.push(inMat, inMatDim);
  state.threeVortexMaterials.floorLines.push(fLineMat);
  state.threeVortexMaterials.cyanStrips.push(cStripMat, cStripMatDim);

  const boxGeo = new THREE.BoxGeometry(1, 1, 1);

  // SHARP HEX FRAME GENERATOR
  const createHexFrame = (radius, thickness, depth, material) => {
      const group = new THREE.Group();
      const apothem = radius * Math.cos(Math.PI/6); 
      for(let i=0; i<6; i++) {
          const angle = (i * Math.PI / 3) + Math.PI/6; 
          const x = apothem * Math.cos(angle);
          const y = apothem * Math.sin(angle);
          const bar = new THREE.Mesh(boxGeo, material);
          bar.scale.set(radius + thickness*0.2, thickness, depth); 
          bar.position.set(x, y, 0);
          bar.rotation.z = angle + Math.PI/2;
          group.add(bar);
      }
      return group;
  };

  const floorY = -9.5; // Raised slightly so it occupies 35-40% of screen height
  const wallDist = 13;

  for (let i = 0; i < data.segmentsCount; i++) {
    const zPos = -(i+2) * data.spacing; // Push first segment deeper
    
    const segGroup = new THREE.Group();
    segGroup.position.set(0, 0, zPos);
    
    const reflGroup = new THREE.Group();
    reflGroup.position.set(0, floorY * 2, zPos); 
    reflGroup.scale.y = -1; 

    // Helper to add geometry to main and dim clone to reflection
    const addReflected = (mesh, dimMeshClone) => {
        segGroup.add(mesh);
        reflGroup.add(dimMeshClone);
    };

    // ================= 2. CORRIDOR ARCHITECTURE =================
    // Floor
    const floor = new THREE.Mesh(boxGeo, reflectionFloorMat);
    floor.scale.set(100, 0.2, data.spacing);
    floor.position.set(0, floorY, 0); 
    segGroup.add(floor); 

    // Left, Right, Ceiling Glossy Panels
    const addWall = (x, y, w, h, rotZ) => {
        const wall = new THREE.Mesh(boxGeo, darkWallMat);
        wall.scale.set(w, h, data.spacing);
        wall.position.set(x, y, 0);
        wall.rotation.z = rotZ;
        segGroup.add(wall);
    };
    addWall(-wallDist, 2, 0.5, 24, -Math.PI/12); // Angled slightly inward like a tunnel
    addWall(wallDist, 2, 0.5, 24, Math.PI/12);
    addWall(0, 12, 24, 0.5, 0); // Flat ceiling

    // ================= NEON GATES =================
    const ringGroup = new THREE.Group();
    ringGroup.add(createHexFrame(6.5, 0.2, 0.4, outMat)); // Reduced radius by 25% (was 8)
    ringGroup.add(createHexFrame(5.2, 0.08, 0.2, inMat)); // Cyan inner
    
    const dimRingGroup = new THREE.Group();
    dimRingGroup.add(createHexFrame(6.5, 0.2, 0.4, outMatDim)); 
    dimRingGroup.add(createHexFrame(5.2, 0.08, 0.2, inMatDim));
    
    segGroup.add(ringGroup);
    reflGroup.add(dimRingGroup);

    // ================= 4. REAL GLASS SIDE MODULES =================
    const createSideModule = (xSign, isDim = false) => {
        const modGroup = new THREE.Group();
        const dist = 9; // Positioned on the wall
        modGroup.position.set(xSign * dist, 0, 0);
        
        // Wide dark transparent panel facing camera slightly
        const panel = new THREE.Mesh(boxGeo, glassMat);
        panel.scale.set(0.2, 3.5, 8);
        panel.rotation.y = -xSign * 0.05; // angle towards camera slightly
        modGroup.add(panel);
        
        const mOut = isDim ? outMatDim : outMat;
        const mIn = isDim ? inMatDim : inMat;

        // Thin magenta border
        const bTop = new THREE.Mesh(boxGeo, mOut);
        bTop.scale.set(0.1, 0.05, 7.8);
        bTop.position.set(xSign * 0.15, 1.6, 0);
        modGroup.add(bTop);
        
        const bBot = new THREE.Mesh(boxGeo, mOut);
        bBot.scale.set(0.1, 0.05, 7.8);
        bBot.position.set(xSign * 0.15, -1.6, 0);
        modGroup.add(bBot);

        // Cyan horizontal beam
        const cBeam = new THREE.Mesh(boxGeo, mIn);
        cBeam.scale.set(0.1, 0.1, 8.5);
        cBeam.position.set(xSign * 0.2, 0, 0);
        modGroup.add(cBeam);
        
        // 3 rows of small equalizer tiles
        for(let row=0; row<3; row++) {
            for(let col=0; col<5; col++) {
                const dot = new THREE.Mesh(boxGeo, mIn);
                dot.scale.set(0.05, 0.2, 0.4);
                dot.position.set(xSign * 0.25, -0.6 + (row*0.6), -3 + (col*1.5));
                modGroup.add(dot);
            }
        }
        return modGroup;
    };
    
    segGroup.add(createSideModule(-1, false));
    segGroup.add(createSideModule(1, false));
    reflGroup.add(createSideModule(-1, true));
    reflGroup.add(createSideModule(1, true));

    // ================= 5. MANY SMALL TILES =================
    const createTileRow = (x, y, w, h, d, zCount, zSpacing) => {
        const g = new THREE.Group();
        const gDim = new THREE.Group();
        for(let t=0; t<zCount; t++) {
            const z = -t * zSpacing;
            
            const tile = new THREE.Mesh(boxGeo, outMat);
            tile.scale.set(w, h, d);
            tile.position.set(x, y, z);
            g.add(tile);
            
            const tileDim = new THREE.Mesh(boxGeo, outMatDim);
            tileDim.scale.set(w, h, d);
            tileDim.position.set(x, y, z);
            gDim.add(tileDim);
        }
        segGroup.add(g);
        reflGroup.add(gDim);
    };

    // Ceiling rows
    createTileRow(-2, 11.8, 1.2, 0.1, 0.8, 6, 6);
    createTileRow(2, 11.8, 1.2, 0.1, 0.8, 6, 6);
    
    // Floor center row
    createTileRow(0, floorY + 0.1, 1.8, 0.1, 1.0, 5, 8);

    // ================= CORRIDOR LIGHT STRIPS =================
    const addStrip = (x, y, w, h, isCyan = false) => {
        const mat = isCyan ? cStripMat : outMat;
        const matDim = isCyan ? cStripMatDim : outMatDim;
        
        const s = new THREE.Mesh(boxGeo, mat);
        s.scale.set(w, h, data.spacing);
        s.position.set(x, y, 0);
        segGroup.add(s);
        
        const sDim = new THREE.Mesh(boxGeo, matDim);
        sDim.scale.set(w, h, data.spacing);
        sDim.position.set(x, y, 0);
        reflGroup.add(sDim);
    };

    // Magenta perspective guide lines on floor
    addStrip(-3, floorY + 0.12, 0.4, 0.05, false);
    addStrip(3, floorY + 0.12, 0.4, 0.05, false);
    
    // Cyan edge rails
    addStrip(-8, floorY + 0.12, 0.15, 0.05, true);
    addStrip(8, floorY + 0.12, 0.15, 0.05, true);
    
    // Ceiling seams
    addStrip(-6, 11.9, 0.1, 0.1, true);
    addStrip(6, 11.9, 0.1, 0.1, true);

    scene.add(segGroup);
    scene.add(reflGroup);
    
    data.segments.push({
        main: segGroup,
        refl: reflGroup,
        ringGroup: ringGroup,
        reflRingGroup: dimRingGroup 
    });
  }

  // PARTICLES
  const pGeo = new THREE.BufferGeometry();
  const pCount = 150; 
  const pPos = new Float32Array(pCount * 3);
  for(let i=0; i<pCount; i++) {
    pPos[i*3] = (Math.random() - 0.5) * 16;
    pPos[i*3+1] = (Math.random() - 0.5) * 12; 
    pPos[i*3+2] = -Math.random() * (data.segmentsCount * data.spacing);
  }
  pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
  const pMat = new THREE.PointsMaterial({ 
    color: 0xff2dff, size: 0.15, transparent: true, opacity: 0.5, blending: THREE.AdditiveBlending 
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
  
  if (state.autoCycle) updateThreeVortexColors();
  
  if (state.beatActive) state.vortexBeatGlow = 1;
  if (state.vortexBeatGlow > 0) state.vortexBeatGlow *= 0.85; 
  
  const data = state.threeVortexData;
  const isBassOn = state.bassMode;
  
  const bassPulse = isBassOn ? Math.min(1, (state.bassSmoothed || 0) * 2.5) : 0;
  const beatDecay = state.vortexBeatGlow || 0;
  
  // 7. DEPTH FADE happens automatically because fog matches background perfectly.
  // We just control emission base intensity.
  
  const applyIntensity = (matArray, base, pMult, bMult, limit) => {
      const val = Math.min(base + (bassPulse * pMult) + (beatDecay * bMult), limit);
      matArray.forEach(mat => {
          if (mat.emissiveIntensity !== undefined) mat.emissiveIntensity = val;
      });
  };
  
  applyIntensity(state.threeVortexMaterials.ringsOuter, 1.0, 0.7, 0.9, 2.5);
  applyIntensity(state.threeVortexMaterials.ringsInner, 0.8, 0.3, 0.6, 2.0);
  applyIntensity(state.threeVortexMaterials.floorLines, 0.8, 0.4, 0.6, 2.0);
  applyIntensity(state.threeVortexMaterials.cyanStrips, 0.6, 0.2, 0.4, 1.5);
  
  const scale = 1.0 + (bassPulse * 0.1) + (beatDecay * 0.05);
  data.segments.forEach(seg => {
      if (seg.ringGroup) seg.ringGroup.scale.set(scale, scale, 1);
      if (seg.reflRingGroup) seg.reflRingGroup.scale.set(scale, scale, 1);
  });
  
  data.bloomPass.strength = Math.min(Math.max(0.7 + (bassPulse * 0.15) + (beatDecay * 0.1), 0.6), 1.0);
  data.speed = 0.8 + (isBassOn ? bassPulse * 0.2 : 0);
  
  const time = Date.now() * 0.001;
  state.threeVortexCamera.position.x = Math.sin(time * 0.4) * 0.15;
  state.threeVortexCamera.position.y = Math.cos(time * 0.3) * 0.1;
}

function renderThreeVortex() {
  if (!state.threeVortexComposer || !state.threeVortexData) return;
  updateThreeVortexAudio();
  
  const data = state.threeVortexData;
  const cam = state.threeVortexCamera;

  cam.position.z -= data.speed;

  const threshold = cam.position.z + 30; // Matches deeper start distance
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
      pArr[i*3+2] += data.speed * 0.8; 
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

print("Successfully injected fix_vortex_composition!")
