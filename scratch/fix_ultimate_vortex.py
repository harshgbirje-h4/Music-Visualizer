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
  }
}

function getVortexThemeColors() {
  const cyber = {
    primary: "#ff2dff", 
    secondary: "#00d9ff", 
    accent: "#8a2bff", 
    hot: "#ff008c", 
    blue: "#009dff",
    bg: "#020104" // Extremely dark cyber space
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
  
  if (state.threeVortexScene && state.threeVortexScene.fog) {
    state.threeVortexScene.fog.color.copy(new THREE.Color(colors.bg));
  }
}

function setupThreeScene() {
  const canvas = document.getElementById('three-canvas');
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // optimize
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 0.9; 
  state.threeVortexRenderer = renderer;

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x020104, 0.006);
  state.threeVortexScene = scene;

  // Camera placed so R=8 is ~50% screen height
  const camera = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight, 0.1, 800);
  camera.position.set(0, 0, 24); 
  camera.lookAt(0, 0, -100);
  state.threeVortexCamera = camera;

  const renderScene = new RenderPass(scene, camera);
  const bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 0.85, 0.4, 0.25);
  const composer = new EffectComposer(renderer);
  composer.addPass(renderScene);
  composer.addPass(bloomPass);
  state.threeVortexComposer = composer;
  
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.4); 
  scene.add(ambientLight);

  state.threeVortexMaterials = {
    ringsOuter: [],
    ringsInner: [],
    floorLines: [],
    cyanStrips: [],
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

  // Shared Materials
  const glassMat = new THREE.MeshStandardMaterial({ 
      color: 0x010003, roughness: 0.1, metalness: 0.9, transparent: true, opacity: 0.6
  });
  state.threeVortexMaterials.glass.push(glassMat);
  
  const darkWallMat = new THREE.MeshStandardMaterial({ 
      color: 0x010101, roughness: 0.2, metalness: 0.8 
  });
  state.threeVortexMaterials.darkSurfaces.push(darkWallMat);

  const reflectionFloorMat = new THREE.MeshStandardMaterial({ 
      color: 0x000000, roughness: 0.02, metalness: 0.95, transparent: true, opacity: 0.75
  });
  state.threeVortexMaterials.darkSurfaces.push(reflectionFloorMat);

  const createNeonMat = () => new THREE.MeshStandardMaterial({ color: 0x000000, roughness: 0.3, metalness: 0.1 });
  
  const outMat = createNeonMat();
  const inMat = createNeonMat();
  const fLineMat = createNeonMat();
  const cStripMat = createNeonMat();
  
  state.threeVortexMaterials.ringsOuter.push(outMat);
  state.threeVortexMaterials.ringsInner.push(inMat);
  state.threeVortexMaterials.floorLines.push(fLineMat);
  state.threeVortexMaterials.cyanStrips.push(cStripMat);

  // Common Geometries
  const boxGeo = new THREE.BoxGeometry(1, 1, 1);

  // CUSTOM HEX FRAME CONSTRUCTOR (No Torus)
  const createHexFrame = (radius, thickness, depth, material) => {
      const group = new THREE.Group();
      const apothem = radius * Math.cos(Math.PI/6); // distance from center to edge
      for(let i=0; i<6; i++) {
          const angle = (i * Math.PI / 3) + Math.PI/6; // +PI/6 makes it flat top/bottom
          const x = apothem * Math.cos(angle);
          const y = apothem * Math.sin(angle);
          const bar = new THREE.Mesh(boxGeo, material);
          // The length of a hex side is exactly `radius` 
          // add tiny bit to thickness to hide corner seams
          bar.scale.set(radius + thickness*0.5, thickness, depth); 
          bar.position.set(x, y, 0);
          bar.rotation.z = angle + Math.PI/2;
          group.add(bar);
      }
      return group;
  };

  const floorY = -12;

  // CORRIDOR GENERATION
  for (let i = 0; i < data.segmentsCount; i++) {
    const zPos = -i * data.spacing;
    
    const segGroup = new THREE.Group();
    segGroup.position.set(0, 0, zPos);
    
    // Fake Reflection Group
    const reflGroup = new THREE.Group();
    reflGroup.position.set(0, floorY * 2, zPos); 
    reflGroup.scale.y = -1; 

    const addReflected = (mesh) => {
        segGroup.add(mesh);
        reflGroup.add(mesh.clone());
    };

    // ================= CORRIDOR ARCHITECTURE =================
    // The glossy transparent floor
    const floor = new THREE.Mesh(boxGeo, reflectionFloorMat);
    floor.scale.set(100, 0.2, data.spacing);
    floor.position.set(0, floorY, 0); 
    segGroup.add(floor); // Only main scene

    // Side wall dark panels (giving structure to the empty space)
    const addWall = (x, rotZ) => {
        const wall = new THREE.Mesh(boxGeo, darkWallMat);
        wall.scale.set(0.5, 40, data.spacing);
        wall.position.set(x, 0, 0);
        wall.rotation.z = rotZ;
        segGroup.add(wall);
    };
    addWall(-20, -Math.PI/6);
    addWall(20, Math.PI/6);
    // Ceiling panel
    const ceil = new THREE.Mesh(boxGeo, darkWallMat);
    ceil.scale.set(40, 0.5, data.spacing);
    ceil.position.set(0, 18, 0);
    segGroup.add(ceil);

    // ================= NEON GATES =================
    const ringGroup = new THREE.Group();
    
    // Custom sharp lines, no Torus
    const outRing = createHexFrame(8, 0.2, 0.4, outMat);
    const inRing = createHexFrame(6.5, 0.08, 0.2, inMat);
    ringGroup.add(outRing);
    ringGroup.add(inRing);

    addReflected(ringGroup);

    // ================= SLEEK SIDE MODULES =================
    // Removed massive filled boxes, replaced with glass plates & thin lines
    const createSideModule = (xSign) => {
        const modGroup = new THREE.Group();
        const dist = 12; // Farther out
        modGroup.position.set(xSign * dist, 0, 0);
        
        // Dark Glass Back-panel (Thin)
        const panel = new THREE.Mesh(boxGeo, glassMat);
        panel.scale.set(0.2, 4, 10);
        modGroup.add(panel);
        
        // Thin Magenta Border Lines (Top & Bottom)
        const bTop = new THREE.Mesh(boxGeo, outMat);
        bTop.scale.set(0.1, 0.1, 10);
        bTop.position.set(xSign * 0.15, 2, 0);
        modGroup.add(bTop);
        
        const bBot = new THREE.Mesh(boxGeo, outMat);
        bBot.scale.set(0.1, 0.1, 10);
        bBot.position.set(xSign * 0.15, -2, 0);
        modGroup.add(bBot);

        // Thin Cyan Center Beam
        const cBeam = new THREE.Mesh(boxGeo, inMat);
        cBeam.scale.set(0.1, 0.1, 12);
        cBeam.position.set(xSign * 0.2, 0, 0);
        modGroup.add(cBeam);
        
        // Small dotted equalizer grid (tiny BoxGeometry tiles)
        for(let d=0; d<6; d++) {
            const dot = new THREE.Mesh(boxGeo, inMat);
            dot.scale.set(0.1, 0.3, 0.3);
            dot.position.set(xSign * 0.25, -1, -5 + (d*2));
            modGroup.add(dot);
        }

        // Connector lines from Module to Hexagon points
        const conn = new THREE.Mesh(boxGeo, inMat);
        const hexPointX = 8; // Since radius=8 and it's pointy on left/right
        const gap = dist - hexPointX;
        conn.scale.set(gap, 0.05, 0.05);
        conn.position.set(-xSign * gap/2, 0, 0);
        modGroup.add(conn);

        return modGroup;
    };
    
    addReflected(createSideModule(-1));
    addReflected(createSideModule(1));

    // ================= SMALL PARALLEL TILE ROWS =================
    // Ceiling tiles
    const ceilTile = new THREE.Mesh(boxGeo, outMat);
    ceilTile.scale.set(1.5, 0.1, 2);
    ceilTile.position.set(0, 14, 0);
    addReflected(ceilTile);

    // Floor center tiles
    const floorTile = new THREE.Mesh(boxGeo, outMat);
    floorTile.scale.set(1.5, 0.1, 2);
    floorTile.position.set(0, floorY + 0.1, 0);
    addReflected(floorTile);

    // ================= FLOOR LASERS AND CORRIDOR STRIPS =================
    const addStrip = (x, y, w, h, mat, reflect = false) => {
        const s = new THREE.Mesh(boxGeo, mat);
        s.scale.set(w, h, data.spacing);
        s.position.set(x, y, 0);
        if (reflect) addReflected(s);
        else segGroup.add(s);
    };

    // Magenta perspective guide lines
    addStrip(-3.5, floorY + 0.15, 0.4, 0.05, fLineMat, false);
    addStrip(3.5, floorY + 0.15, 0.4, 0.05, fLineMat, false);
    
    // Cyan edge rails
    addStrip(-11, floorY + 0.15, 0.15, 0.05, cStripMat, false);
    addStrip(11, floorY + 0.15, 0.15, 0.05, cStripMat, false);
    
    // Ceiling rails
    addStrip(-7, 13.9, 0.1, 0.1, cStripMat, true);
    addStrip(7, 13.9, 0.1, 0.1, cStripMat, true);

    scene.add(segGroup);
    scene.add(reflGroup);
    
    data.segments.push({
        main: segGroup,
        refl: reflGroup,
        ringGroup: ringGroup,
        reflRingGroup: reflGroup.children[reflGroup.children.length - 1] 
    });
  }

  // ================= PARTICLES =================
  const pGeo = new THREE.BufferGeometry();
  const pCount = 150; 
  const pPos = new Float32Array(pCount * 3);
  for(let i=0; i<pCount; i++) {
    pPos[i*3] = (Math.random() - 0.5) * 20;
    pPos[i*3+1] = (Math.random() - 0.5) * 16; 
    pPos[i*3+2] = -Math.random() * (data.segmentsCount * data.spacing);
  }
  pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
  const pMat = new THREE.PointsMaterial({ 
    color: 0xff2dff, size: 0.15, transparent: true, opacity: 0.6, blending: THREE.AdditiveBlending 
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
  
  const applyIntensity = (matArray, base, pMult, bMult, limit) => {
      const val = Math.min(base + (bassPulse * pMult) + (beatDecay * bMult), limit);
      matArray.forEach(mat => {
          if (mat.emissiveIntensity !== undefined) mat.emissiveIntensity = val;
      });
  };
  
  applyIntensity(state.threeVortexMaterials.ringsOuter, 1.2, 0.8, 1.0, 3.5);
  applyIntensity(state.threeVortexMaterials.ringsInner, 1.0, 0.4, 0.8, 2.5);
  applyIntensity(state.threeVortexMaterials.floorLines, 0.9, 0.6, 0.8, 2.8);
  applyIntensity(state.threeVortexMaterials.cyanStrips, 0.7, 0.3, 0.5, 2.0);
  
  // Pulse ring scale on bass
  const scale = 1.0 + (bassPulse * 0.1) + (beatDecay * 0.05);
  data.segments.forEach(seg => {
      if (seg.ringGroup) seg.ringGroup.scale.set(scale, scale, 1);
      if (seg.reflRingGroup) seg.reflRingGroup.scale.set(scale, scale, 1);
  });
  
  data.bloomPass.strength = Math.min(Math.max(0.75 + (bassPulse * 0.15) + (beatDecay * 0.1), 0.7), 1.1);
  data.speed = 0.9 + (isBassOn ? bassPulse * 0.3 : 0);
  
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

print("Successfully executed the Ultimate Premium Geometry Rewrite!")
