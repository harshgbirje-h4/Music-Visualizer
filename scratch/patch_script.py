import re

file_path = r'd:/promusiccc - Copy/script.js'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Replace the renderLoop adaptive quality block
old_render_block = """  if (state.mode === 'vortex') {
    const renderCost = performance.now() - frameStart;
    state.vortexLoadAvg = state.vortexLoadAvg
      ? (state.vortexLoadAvg * 0.9) + (renderCost * 0.1)
      : renderCost;

    if (state.vortexLoadAvg > 18) {
      state.vortexQuality = 'low';
      state.vortexStableFrames = 0;
    } else if (state.vortexLoadAvg < 12) {
      state.vortexStableFrames = (state.vortexStableFrames || 0) + 1;
      if (state.vortexStableFrames > 240 && state.vortexQuality === 'low') {
        state.vortexQuality = 'medium';
      } else if (state.vortexStableFrames > 720 && state.vortexQuality === 'medium') {
        state.vortexQuality = 'high';
      }
    } else if (state.vortexQuality === 'balanced') {
      state.vortexQuality = 'medium';
    } else {
      state.vortexStableFrames = 0;
    }
  }"""

new_render_block = """  if (state.mode === 'vortex') {
    const renderCost = performance.now() - frameStart;
    state.vortexLoadAvg = state.vortexLoadAvg
      ? (state.vortexLoadAvg * 0.9) + (renderCost * 0.1)
      : renderCost;

    if (state.vortexLoadAvg > 24) {
      if (state.vortexQuality === 'high') {
        state.vortexQuality = 'medium';
      } else if (state.vortexQuality === 'medium' || state.vortexQuality === 'balanced') {
        state.vortexQuality = 'low';
      }
      state.vortexStableFrames = 0;
    } else if (state.vortexLoadAvg < 14) {
      state.vortexStableFrames = (state.vortexStableFrames || 0) + 1;
      if (state.vortexStableFrames > 240 && state.vortexQuality === 'low') {
        state.vortexQuality = 'medium';
        state.vortexStableFrames = 0;
      } else if (state.vortexStableFrames > 720 && (state.vortexQuality === 'medium' || state.vortexQuality === 'balanced')) {
        state.vortexQuality = 'high';
        state.vortexStableFrames = 0;
      }
    } else {
      state.vortexStableFrames = 0;
    }
  }"""

if old_render_block in content:
    content = content.replace(old_render_block, new_render_block)
    print("Successfully replaced renderLoop quality block!")
else:
    # Try with different line endings
    old_render_block_lf = old_render_block.replace('\r\n', '\n')
    content_lf = content.replace('\r\n', '\n')
    if old_render_block_lf in content_lf:
        content_lf = content_lf.replace(old_render_block_lf, new_render_block.replace('\r\n', '\n'))
        content = content_lf
        print("Successfully replaced renderLoop quality block (LF format)!")
    else:
        print("Warning: Could not find renderLoop quality block in script.js!")

# 2. Locate the vortex functions block and replace it
start_marker = "function drawVortexPrevious("
end_marker = "function drawThemeForeground("

start_idx = content.find(start_marker)
end_idx = content.find(end_marker)

if start_idx != -1 and end_idx != -1:
    print(f"Found vortex block: start_idx={start_idx}, end_idx={end_idx}")
    
    new_vortex_code = """let _projectedIndex = 0;
const _gateW = 1.8;
const _gateH = 1.2;
const _gateVerticesX = new Float32Array([
   _gateW * 0.5,
   _gateW,
   _gateW * 0.5,
  -_gateW * 0.5,
  -_gateW,
  -_gateW * 0.5
]);
const _gateVerticesY = new Float32Array([
  -_gateH,
   0,
   _gateH,
   _gateH,
   0,
  -_gateH
]);

const _gateProjOuter = [
  { x: 0, y: 0, scale: 0, z: 0 },
  { x: 0, y: 0, scale: 0, z: 0 },
  { x: 0, y: 0, scale: 0, z: 0 },
  { x: 0, y: 0, scale: 0, z: 0 },
  { x: 0, y: 0, scale: 0, z: 0 },
  { x: 0, y: 0, scale: 0, z: 0 }
];
const _gateProjInner = [
  { x: 0, y: 0, scale: 0, z: 0 },
  { x: 0, y: 0, scale: 0, z: 0 },
  { x: 0, y: 0, scale: 0, z: 0 },
  { x: 0, y: 0, scale: 0, z: 0 },
  { x: 0, y: 0, scale: 0, z: 0 },
  { x: 0, y: 0, scale: 0, z: 0 }
];
const _gateProjReflOuter = [
  { x: 0, y: 0, scale: 0, z: 0 },
  { x: 0, y: 0, scale: 0, z: 0 },
  { x: 0, y: 0, scale: 0, z: 0 },
  { x: 0, y: 0, scale: 0, z: 0 },
  { x: 0, y: 0, scale: 0, z: 0 },
  { x: 0, y: 0, scale: 0, z: 0 }
];
const _gateProjReflInner = [
  { x: 0, y: 0, scale: 0, z: 0 },
  { x: 0, y: 0, scale: 0, z: 0 },
  { x: 0, y: 0, scale: 0, z: 0 },
  { x: 0, y: 0, scale: 0, z: 0 },
  { x: 0, y: 0, scale: 0, z: 0 },
  { x: 0, y: 0, scale: 0, z: 0 }
];

function sortGatesDescending(a, b) {
  return b.z - a.z;
}

function sortActiveGates(arr, n) {
  for (let i = 1; i < n; i++) {
    const key = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j].z < key.z) {
      arr[j + 1] = arr[j];
      j = j - 1;
    }
    arr[j + 1] = key;
  }
}

function ensureProjectedPool() {
  if (!state.vortexProjectedPool || state.vortexProjectedPool.length < 800) {
    state.vortexProjectedPool = [];
    for (let i = 0; i < 800; i++) {
      state.vortexProjectedPool.push({ x: 0, y: 0, scale: 0, z: 0 });
    }
  }
}

function projectPoint(x, y, z, cx, cy, focalLength, nearClip) {
  if (z <= nearClip) return null;
  const pool = state.vortexProjectedPool;
  if (!pool) return null;
  if (_projectedIndex >= pool.length) {
    pool.push({ x: 0, y: 0, scale: 0, z: 0 });
  }
  const pt = pool[_projectedIndex++];
  const scale = focalLength / z;
  pt.x = cx + x * scale;
  pt.y = cy + y * scale;
  pt.scale = scale;
  pt.z = z;
  return pt;
}

function ensureCyberVortexPools(farZ, nearClip) {
  if (!state.cyberVortexGates || state.cyberVortexGates.length < 12) {
    state.cyberVortexGates = [];
    for (let i = 0; i < 12; i++) {
      state.cyberVortexGates.push({
        z: nearClip + i * ((farZ - nearClip) / 12),
        pulse: 0,
        colorSide: i % 2,
        seed: Math.random()
      });
    }
  }

  if (!state.cyberVortexParticles || state.cyberVortexParticles.length < 40) {
    state.cyberVortexParticles = [];
    for (let i = 0; i < 40; i++) {
      const particle = { x: 0, y: 0, z: 0, speed: 0, size: 0, colorSide: 0, streak: 0 };
      resetCyberVortexParticle(particle, farZ, true, nearClip);
      state.cyberVortexParticles.push(particle);
    }
  }
}

function syncCyberVortexQuality(quality, farZ, nearClip) {
  if (state.cyberVortexQualityIndex === quality.gates) return;
  state.cyberVortexQualityIndex = quality.gates;
  const span = farZ - nearClip;
  for (let i = 0; i < quality.gates; i++) {
    const gate = state.cyberVortexGates[i];
    gate.z = nearClip + (i / quality.gates) * span;
    gate.pulse = 0;
    gate.colorSide = i % 2;
  }
}

function updateCyberVortexPools(quality, speed, farZ, nearClip, bass, high) {
  const span = farZ - nearClip;
  for (let i = 0; i < quality.gates; i++) {
    const gate = state.cyberVortexGates[i];
    gate.z -= speed * (1.0 + bass * 0.8);
    gate.pulse *= 0.85;

    if (state.beatActive && i < 2) {
      gate.pulse = 1.0;
    }

    if (gate.z <= nearClip) {
      gate.z += span;
      gate.colorSide = 1 - gate.colorSide;
      gate.pulse = state.beatActive ? 1.0 : 0.0;
    }
  }

  const particleSpeed = speed * (2.2 + high * 2.5 + bass * 0.8);
  for (let i = 0; i < quality.particles; i++) {
    const particle = state.cyberVortexParticles[i];
    particle.z -= particleSpeed * particle.speed;
    if (particle.z <= nearClip) {
      resetCyberVortexParticle(particle, farZ, false, nearClip);
    }
  }
}

function resetCyberVortexParticle(particle, farZ, scatter, nearClip) {
  const angle = Math.random() * Math.PI * 2;
  const radius = 1.3 + Math.random() * 0.6;
  particle.x = Math.cos(angle) * radius;
  particle.y = Math.sin(angle) * radius * 0.65;
  particle.z = scatter ? nearClip + Math.random() * (farZ - nearClip) : farZ;
  particle.speed = 0.5 + Math.random() * 1.0;
  particle.size = 1.0 + Math.random() * 2.0;
  particle.colorSide = Math.random() < 0.5 ? 0 : 1;
  particle.streak = 0.15 + Math.random() * 0.25;
}

function getVortexBandEnergy(startBin, endBin) {
  if (!state.freqData || !state.bufferLength) return 0;
  const start = Math.min(state.bufferLength - 1, startBin);
  const end = Math.min(state.bufferLength, endBin);
  let sum = 0;
  let count = 0;
  for (let i = start; i < end; i += 1) {
    sum += state.freqData[i];
    count += 1;
  }
  return count ? clamp((sum / count / 255) * state.sensitivity * 1.25, 0, 1.35) : 0;
}

function cyberAlpha(color, alpha) {
  if (color.charAt(0) === '#') {
    const rgb = hexToRgb(color);
    return `rgba(${rgb.r},${rgb.g},${rgb.b},${alpha})`;
  }
  const start = color.indexOf('(');
  const end = color.indexOf(')');
  if (start == -1 || end == -1) return color;
  const parts = color.slice(start + 1, end).split(',');
  return `rgba(${parts[0].trim()},${parts[1].trim()},${parts[2].trim()},${alpha})`;
}

function drawNeonPath(c, points, color, size, alpha, closePath = false) {
  if (points.length < 2) return;
  c.beginPath();
  c.moveTo(points[0].x, points[0].y);
  for (let i = 1; i < points.length; i++) {
    c.lineTo(points[i].x, points[i].y);
  }
  if (closePath) {
    c.closePath();
  }
  c.strokeStyle = color;
  c.lineWidth = size * 4.5;
  c.globalAlpha = alpha * 0.22;
  c.stroke();

  c.strokeStyle = '#ffffff';
  c.lineWidth = size;
  c.globalAlpha = alpha * 0.95;
  c.stroke();
}

function drawNeonLine(c, p0, p1, color, size, alpha) {
  if (!p0 || !p1) return;
  c.beginPath();
  c.moveTo(p0.x, p0.y);
  c.lineTo(p1.x, p1.y);

  c.strokeStyle = color;
  c.lineWidth = size * 4.5;
  c.globalAlpha = alpha * 0.22;
  c.stroke();

  c.strokeStyle = '#ffffff';
  c.lineWidth = size;
  c.globalAlpha = alpha * 0.95;
  c.stroke();
}

function projectGate(gate, pulse, camX, camY, cx, cy, focalLength, nearClip) {
  const z = gate.z;
  const outerScale = pulse * 1.05;
  const innerScale = pulse * 0.88;

  for (let j = 0; j < 6; j++) {
    const ox = _gateVerticesX[j] * outerScale;
    const oy = _gateVerticesY[j] * outerScale;
    const pOuter = projectPoint(ox - camX, oy - camY, z, cx, cy, focalLength, nearClip);
    if (pOuter) {
      _gateProjOuter[j].x = pOuter.x;
      _gateProjOuter[j].y = pOuter.y;
      _gateProjOuter[j].scale = pOuter.scale;
    }

    const ix = _gateVerticesX[j] * innerScale;
    const iy = _gateVerticesY[j] * innerScale;
    const pInner = projectPoint(ix - camX, iy - camY, z, cx, cy, focalLength, nearClip);
    if (pInner) {
      _gateProjInner[j].x = pInner.x;
      _gateProjInner[j].y = pInner.y;
      _gateProjInner[j].scale = pInner.scale;
    }

    const pReflOuter = projectPoint(ox - camX, 2 * _gateH - oy - camY, z, cx, cy, focalLength, nearClip);
    if (pReflOuter) {
      _gateProjReflOuter[j].x = pReflOuter.x;
      _gateProjReflOuter[j].y = pReflOuter.y;
      _gateProjReflOuter[j].scale = pReflOuter.scale;
    }

    const pReflInner = projectPoint(ix - camX, 2 * _gateH - iy - camY, z, cx, cy, focalLength, nearClip);
    if (pReflInner) {
      _gateProjReflInner[j].x = pReflInner.x;
      _gateProjReflInner[j].y = pReflInner.y;
      _gateProjReflInner[j].scale = pReflInner.scale;
    }
  }
}

function drawGateStructure(c, depthAlpha) {
  c.save();
  c.fillStyle = `rgba(10, 12, 22, ${0.9 * depthAlpha})`;
  c.beginPath();
  c.moveTo(_gateProjOuter[0].x, _gateProjOuter[0].y);
  for (let j = 1; j < 6; j++) {
    c.lineTo(_gateProjOuter[j].x, _gateProjOuter[j].y);
  }
  c.closePath();

  c.moveTo(_gateProjInner[0].x, _gateProjInner[0].y);
  for (let j = 1; j < 6; j++) {
    c.lineTo(_gateProjInner[j].x, _gateProjInner[j].y);
  }
  c.closePath();

  c.fill('evenodd');
  c.restore();
}

function drawFloorSlabs(c, z0, z1, depthAlpha, colorA, colorB, mid, beat, camX, camY, cx, cy, focalLength, nearClip) {
  const dy = 0.04;
  const h = _gateH;
  const w = _gateW;

  const colsX0 = [-0.85 * w, -0.15 * w, 0.2 * w];
  const colsX1 = [-0.2 * w, 0.15 * w, 0.85 * w];

  for (let col = 0; col < 3; col++) {
    const x0 = colsX0[col];
    const x1 = colsX1[col];

    const pt0_l = projectPoint(x0 - camX, h - dy - camY, z0, cx, cy, focalLength, nearClip);
    const pt0_r = projectPoint(x1 - camX, h - dy - camY, z0, cx, cy, focalLength, nearClip);
    const pt1_l = projectPoint(x0 - camX, h - dy - camY, z1, cx, cy, focalLength, nearClip);
    const pt1_r = projectPoint(x1 - camX, h - dy - camY, z1, cx, cy, focalLength, nearClip);
    const pb1_l = projectPoint(x0 - camX, h - camY, z1, cx, cy, focalLength, nearClip);
    const pb1_r = projectPoint(x1 - camX, h - camY, z1, cx, cy, focalLength, nearClip);

    if (!pt0_l || !pt0_r || !pt1_l || !pt1_r || !pb1_l || !pb1_r) continue;

    const slabColor = col === 0 ? colorA : (col === 2 ? colorB : (beat > 0.5 ? colorA : colorB));

    c.save();
    c.fillStyle = `rgba(8, 10, 20, ${0.92 * depthAlpha})`;
    c.beginPath();
    c.moveTo(pt0_l.x, pt0_l.y);
    c.lineTo(pt0_r.x, pt0_r.y);
    c.lineTo(pt1_r.x, pt1_r.y);
    c.lineTo(pt1_l.x, pt1_l.y);
    c.closePath();
    c.fill();

    c.fillStyle = `rgba(5, 6, 12, ${0.96 * depthAlpha})`;
    c.beginPath();
    c.moveTo(pt1_l.x, pt1_l.y);
    c.lineTo(pt1_r.x, pt1_r.y);
    c.lineTo(pb1_r.x, pb1_r.y);
    c.lineTo(pb1_l.x, pb1_l.y);
    c.closePath();
    c.fill();
    c.restore();

    c.save();
    c.beginPath();
    c.moveTo(pt0_l.x, pt0_l.y);
    c.lineTo(pt0_r.x, pt0_r.y);
    c.lineTo(pt1_r.x, pt1_r.y);
    c.lineTo(pt1_l.x, pt1_l.y);
    c.closePath();

    c.strokeStyle = slabColor;
    c.lineWidth = 3.5;
    c.globalAlpha = depthAlpha * 0.16 * (0.4 + mid * 0.6 + beat * 0.4);
    c.stroke();

    c.strokeStyle = '#ffffff';
    c.lineWidth = 1;
    c.globalAlpha = depthAlpha * 0.8 * (0.4 + mid * 0.6 + beat * 0.4);
    c.stroke();
    c.restore();
  }
}

function drawSegmentReflections(c, z0, z1, depthAlpha, colorA, colorB, beat, camX, camY, cx, cy, focalLength, nearClip) {
  const alpha = (0.24 + beat * 0.2) * depthAlpha;
  c.save();
  c.globalCompositeOperation = 'screen';

  c.beginPath();
  c.moveTo(_gateProjReflOuter[0].x, _gateProjReflOuter[0].y);
  for (let j = 1; j < 6; j++) {
    c.lineTo(_gateProjReflOuter[j].x, _gateProjReflOuter[j].y);
  }
  c.closePath();
  c.strokeStyle = colorA;
  c.lineWidth = 8;
  c.globalAlpha = alpha * 0.14;
  c.stroke();
  c.strokeStyle = '#ffffff';
  c.lineWidth = 1.8;
  c.globalAlpha = alpha * 0.55;
  c.stroke();

  c.beginPath();
  c.moveTo(_gateProjReflInner[0].x, _gateProjReflInner[0].y);
  for (let j = 1; j < 6; j++) {
    c.lineTo(_gateProjReflInner[j].x, _gateProjReflInner[j].y);
  }
  c.closePath();
  c.strokeStyle = colorB;
  c.lineWidth = 6;
  c.globalAlpha = alpha * 0.14;
  c.stroke();
  c.strokeStyle = '#ffffff';
  c.lineWidth = 1.2;
  c.globalAlpha = alpha * 0.55;
  c.stroke();

  const pr_l = projectPoint(-_gateW * 0.3 - camX, 3 * _gateH - camY, z0, cx, cy, focalLength, nearClip);
  const pr_r = projectPoint(_gateW * 0.3 - camX, 3 * _gateH - camY, z0, cx, cy, focalLength, nearClip);
  if (pr_l && pr_r) {
    c.beginPath();
    c.moveTo(pr_l.x, pr_l.y);
    c.lineTo(pr_r.x, pr_r.y);
    c.strokeStyle = colorB;
    c.lineWidth = 6;
    c.globalAlpha = alpha * 0.12;
    c.stroke();
    c.strokeStyle = '#ffffff';
    c.lineWidth = 1.5;
    c.globalAlpha = alpha * 0.5;
    c.stroke();
  }

  c.restore();
}

function drawFloorGlaze(c, z0, z1, depthAlpha, camX, camY, cx, cy, focalLength, nearClip) {
  const h = _gateH;
  const w = _gateW;

  const p0_l = projectPoint(-w * 0.5 - camX, h - camY, z0, cx, cy, focalLength, nearClip);
  const p0_r = projectPoint(w * 0.5 - camX, h - camY, z0, cx, cy, focalLength, nearClip);
  const p1_l = projectPoint(-w * 0.5 - camX, h - camY, z1, cx, cy, focalLength, nearClip);
  const p1_r = projectPoint(w * 0.5 - camX, h - camY, z1, cx, cy, focalLength, nearClip);

  if (!p0_l || !p0_r || !p1_l || !p1_r) return;

  c.save();
  c.fillStyle = `rgba(3, 4, 10, ${0.84 * depthAlpha})`;
  c.beginPath();
  c.moveTo(p0_l.x, p0_l.y);
  c.lineTo(p0_r.x, p0_r.y);
  c.lineTo(p1_r.x, p1_r.y);
  c.lineTo(p1_l.x, p1_l.y);
  c.closePath();
  c.fill();
  c.restore();
}

function drawVortex(c, width, height) {
  const now = performance.now();
  if (state.cyberVortexLastTime === undefined) state.cyberVortexLastTime = now;
  if (state.cyberVortexTravel === undefined) state.cyberVortexTravel = 0;
  if (state.cyberVortexBeat === undefined) state.cyberVortexBeat = 0;

  const dt = Math.min(now - state.cyberVortexLastTime, 34);
  state.cyberVortexLastTime = now;

  const minDim = Math.min(width, height);
  const cx = width * 0.5;
  const cy = height * 0.52;
  const focalLength = minDim * 0.65;
  const nearClip = 0.18;
  const farZ = 12.0;

  const energy = clamp(state.energySmoothed || 0, 0, 1);
  const bass = clamp(state.bassMode ? (state.bassSmoothed || 0) : energy * 0.55, 0, 1.2);
  const mid = getVortexBandEnergy(12, 88);
  const high = getVortexBandEnergy(96, 240);

  const qualityName = state.vortexQuality === 'high' ? 'high' : (state.vortexQuality === 'medium' ? 'medium' : 'low');
  const quality = qualityName === 'high'
    ? { gates: 12, particles: 40, strips: 6 }
    : qualityName === 'medium'
      ? { gates: 10, particles: 30, strips: 4 }
      : { gates: 8, particles: 20, strips: 2 };

  ensureCyberVortexPools(farZ, nearClip);
  syncCyberVortexQuality(quality, farZ, nearClip);

  const speed = dt * (0.0028 + energy * 0.0035 + bass * 0.015);
  state.cyberVortexTravel += speed;
  state.cyberVortexBeat = Math.max(state.cyberVortexBeat * Math.pow(0.78, dt / 16.67), state.beatActive ? 1.0 : 0.0);
  const beat = clamp(state.cyberVortexBeat, 0, 1);

  updateCyberVortexPools(quality, speed, farZ, nearClip, bass, high);
  sortActiveGates(state.cyberVortexGates, quality.gates);

  ensureProjectedPool();
  _projectedIndex = 0;

  const camX = Math.sin(state.cyberVortexTravel * 0.3) * 0.06;
  const camY = Math.cos(state.cyberVortexTravel * 0.22) * 0.03;

  c.save();
  c.clearRect(0, 0, width, height);

  const bg = c.createLinearGradient(0, 0, 0, height);
  bg.addColorStop(0, '#020206');
  bg.addColorStop(0.42, '#04050e');
  bg.addColorStop(0.78, '#020207');
  bg.addColorStop(1, '#000000');
  c.fillStyle = bg;
  c.fillRect(0, 0, width, height);

  const isBW = state.theme === 'bw';
  const ambientColor = isBW
    ? 'rgba(180,180,180,1)'
    : (state.autoCycle || (state.theme !== 'classic' && state.theme !== 'default')
      ? paletteColor(0.2, 1)
      : '#00d9ff');
  const ambientColor2 = isBW
    ? 'rgba(120,120,120,1)'
    : (state.autoCycle || (state.theme !== 'classic' && state.theme !== 'default')
      ? paletteColor(0.8, 1)
      : '#ff2dff');

  const fogGrad = c.createRadialGradient(cx, cy, 0, cx, cy, Math.max(width, height) * 0.45);
  fogGrad.addColorStop(0, cyberAlpha(ambientColor, 0.2 + bass * 0.08 + beat * 0.08));
  fogGrad.addColorStop(0.3, cyberAlpha(ambientColor2, 0.08 + bass * 0.04));
  fogGrad.addColorStop(1, 'rgba(0,0,0,0)');
  c.fillStyle = fogGrad;
  c.fillRect(0, 0, width, height);

  const primaryCyan = isBW ? 'rgba(230,230,230,1)' : '#00d9ff';
  const primaryMagenta = isBW ? 'rgba(160,160,160,1)' : '#ff2dff';

  for (let i = 0; i < quality.gates; i++) {
    const gate = state.cyberVortexGates[i];
    const z0 = gate.z;
    const z1 = (i === quality.gates - 1) ? nearClip : state.cyberVortexGates[i+1].z;

    const depthAlpha = clamp(1.0 - z0 / farZ, 0.0, 1.0);
    const fog = depthAlpha * depthAlpha;

    const gateColorOuter = gate.colorSide === 0 ? primaryMagenta : primaryCyan;
    const gateColorInner = gate.colorSide === 0 ? primaryCyan : primaryMagenta;

    const pulse = 1.0 + bass * 0.07 + gate.pulse * 0.08;

    projectGate(gate, pulse, camX, camY, cx, cy, focalLength, nearClip);

    const p0_lt = _gateProjOuter[5];
    const p0_rt = _gateProjOuter[0];
    const p0_rc = _gateProjOuter[1];
    const p0_rb = _gateProjOuter[2];
    const p0_lb = _gateProjOuter[3];
    const p0_lc = _gateProjOuter[4];

    const p1_lt = projectPoint(_gateVerticesX[5] * 1.05 - camX, _gateVerticesY[5] * 1.05 - camY, z1, cx, cy, focalLength, nearClip);
    const p1_rt = projectPoint(_gateVerticesX[0] * 1.05 - camX, _gateVerticesY[0] * 1.05 - camY, z1, cx, cy, focalLength, nearClip);
    const p1_rc = projectPoint(_gateVerticesX[1] * 1.05 - camX, _gateVerticesY[1] * 1.05 - camY, z1, cx, cy, focalLength, nearClip);
    const p1_rb = projectPoint(_gateVerticesX[2] * 1.05 - camX, _gateVerticesY[2] * 1.05 - camY, z1, cx, cy, focalLength, nearClip);
    const p1_lb = projectPoint(_gateVerticesX[3] * 1.05 - camX, _gateVerticesY[3] * 1.05 - camY, z1, cx, cy, focalLength, nearClip);
    const p1_lc = projectPoint(_gateVerticesX[4] * 1.05 - camX, _gateVerticesY[4] * 1.05 - camY, z1, cx, cy, focalLength, nearClip);

    drawSegmentReflections(c, z0, z1, fog, gateColorOuter, gateColorInner, beat, camX, camY, cx, cy, focalLength, nearClip);

    drawFloorGlaze(c, z0, z1, fog, camX, camY, cx, cy, focalLength, nearClip);

    c.save();
    c.fillStyle = `rgba(4, 5, 12, ${0.9 * fog})`;
    if (p0_lt && p0_lc && p1_lc && p1_lt) {
      c.beginPath();
      c.moveTo(p0_lt.x, p0_lt.y);
      c.lineTo(p0_lc.x, p0_lc.y);
      c.lineTo(p1_lc.x, p1_lc.y);
      c.lineTo(p1_lt.x, p1_lt.y);
      c.closePath();
      c.fill();
    }
    if (p0_lc && p0_lb && p1_lb && p1_lc) {
      c.beginPath();
      c.moveTo(p0_lc.x, p0_lc.y);
      c.lineTo(p0_lb.x, p0_lb.y);
      c.lineTo(p1_lb.x, p1_lb.y);
      c.lineTo(p1_lc.x, p1_lc.y);
      c.closePath();
      c.fill();
    }
    if (p0_rt && p0_rc && p1_rc && p1_rt) {
      c.beginPath();
      c.moveTo(p0_rt.x, p0_rt.y);
      c.lineTo(p0_rc.x, p0_rc.y);
      c.lineTo(p1_rc.x, p1_rc.y);
      c.lineTo(p1_rt.x, p1_rt.y);
      c.closePath();
      c.fill();
    }
    if (p0_rc && p0_rb && p1_rb && p1_rc) {
      c.beginPath();
      c.moveTo(p0_rc.x, p0_rc.y);
      c.lineTo(p0_rb.x, p0_rb.y);
      c.lineTo(p1_rb.x, p1_rb.y);
      c.lineTo(p1_rc.x, p1_rc.y);
      c.closePath();
      c.fill();
    }
    if (p0_lt && p0_rt && p1_rt && p1_lt) {
      c.fillStyle = `rgba(3, 3, 8, ${0.9 * fog})`;
      c.beginPath();
      c.moveTo(p0_lt.x, p0_lt.y);
      c.lineTo(p0_rt.x, p0_rt.y);
      c.lineTo(p1_rt.x, p1_rt.y);
      c.lineTo(p1_lt.x, p1_lt.y);
      c.closePath();
      c.fill();
    }
    c.restore();

    drawFloorSlabs(c, z0, z1, fog, primaryCyan, primaryMagenta, mid, beat, camX, camY, cx, cy, focalLength, nearClip);

    const size = Math.max(1, p0_lb ? p0_lb.scale * 0.0035 : 1);
    drawNeonLine(c, p0_lb, p1_lb, primaryMagenta, size, fog);
    drawNeonLine(c, p0_rb, p1_rb, primaryCyan, size, fog);
    drawNeonLine(c, p0_lt, p1_lt, primaryMagenta, size, fog);
    drawNeonLine(c, p0_rt, p1_rt, primaryCyan, size, fog);

    drawNeonLine(c, p0_lc, p1_lc, primaryMagenta, size * 0.8, fog);
    drawNeonLine(c, p0_rc, p1_rc, primaryCyan, size * 0.8, fog);

    const pb_l = projectPoint(-_gateW * 0.3 - camX, -_gateH - camY, z0, cx, cy, focalLength, nearClip);
    const pb_r = projectPoint(_gateW * 0.3 - camX, -_gateH - camY, z0, cx, cy, focalLength, nearClip);
    drawNeonLine(c, pb_l, pb_r, gateColorInner, size * 1.1, fog * (0.5 + mid * 0.5 + beat * 0.2));

    drawGateStructure(c, fog);
    drawNeonPath(c, _gateProjOuter, gateColorOuter, size * 1.5, fog, true);
    drawNeonPath(c, _gateProjInner, gateColorInner, size * 0.9, fog, true);

    c.save();
    c.globalCompositeOperation = 'screen';
    for (let pIdx = 0; pIdx < quality.particles; pIdx++) {
      const particle = state.cyberVortexParticles[pIdx];
      const isInside = (i === 0 && particle.z >= z0) || (particle.z <= z0 && particle.z > z1);
      if (isInside) {
        const head = projectPoint(particle.x - camX, particle.y - camY, particle.z, cx, cy, focalLength, nearClip);
        const tail = projectPoint(particle.x - camX, particle.y - camY, particle.z + particle.streak + high * 0.3, cx, cy, focalLength, nearClip);
        if (head && tail) {
          const pFog = clamp(1.0 - particle.z / farZ, 0.0, 1.0);
          const pAlpha = pFog * pFog * (0.3 + high * 0.7 + beat * 0.3);
          const pColor = particle.colorSide === 0 ? primaryCyan : primaryMagenta;
          c.strokeStyle = pColor;
          c.lineWidth = Math.max(0.6, particle.size * head.scale * 0.003);
          c.beginPath();
          c.moveTo(tail.x, tail.y);
          c.lineTo(head.x, head.y);
          c.stroke();
        }
      }
    }
    c.restore();
  }

  const nebulaRadius = minDim * clamp(0.045 + bass * 0.03 + beat * 0.015, 0.035, 0.095);
  const coreGlow = c.createRadialGradient(cx, cy, 0, cx, cy, nebulaRadius);
  coreGlow.addColorStop(0, 'rgba(235,250,255,0.72)');
  coreGlow.addColorStop(0.3, cyberAlpha(primaryCyan, 0.35 + bass * 0.12));
  coreGlow.addColorStop(0.75, cyberAlpha(primaryMagenta, 0.12 + beat * 0.06));
  coreGlow.addColorStop(1, 'rgba(0,0,0,0)');
  c.save();
  c.globalCompositeOperation = 'screen';
  c.fillStyle = coreGlow;
  c.beginPath();
  c.arc(cx, cy, nebulaRadius, 0, Math.PI * 2);
  c.fill();
  c.restore();

  const vignette = c.createRadialGradient(cx, cy, minDim * 0.28, cx, cy, Math.max(width, height) * 0.72);
  vignette.addColorStop(0, 'rgba(0,0,0,0)');
  vignette.addColorStop(0.55, 'rgba(0,0,0,0.18)');
  vignette.addColorStop(1, 'rgba(0,0,0,0.92)');
  c.save();
  c.fillStyle = vignette;
  c.fillRect(0, 0, width, height);
  c.restore();

  c.restore();
}
"""
    
    # Perform replacement
    patched_content = content[:start_idx] + new_vortex_code + content[end_idx:]
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(patched_content)
    print("Successfully replaced vortex functions block in script.js!")
else:
    print("Error: Could not find start or end markers for vortex functions block!")
