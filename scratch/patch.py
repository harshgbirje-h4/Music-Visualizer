import re

file_path = "d:/promusiccc - Copy/script.js"
with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# We want to replace everything from `function drawNeonPath` down to the end of `drawVortex`

new_code = """
function drawNeonPath(c, points, color, size, alpha, closePath = false) {
  if (points.length < 2) return;
  c.beginPath();
  c.moveTo(points[0].x, points[0].y);
  for (let i = 1; i < points.length; i++) {
    c.lineTo(points[i].x, points[i].y);
  }
  if (closePath) c.closePath();

  // Thick glow stroke
  c.strokeStyle = color;
  c.lineWidth = size * 8; // Thicker glow (8-14px conceptually)
  c.globalAlpha = alpha * 0.3;
  c.stroke();
  
  c.lineWidth = size * 4;
  c.globalAlpha = alpha * 0.6;
  c.stroke();

  // Bright core
  c.strokeStyle = '#ffffff';
  c.lineWidth = size * 1.5; // Core 2-4px
  c.globalAlpha = alpha;
  c.stroke();
}

function drawNeonLine(c, p0, p1, color, size, alpha) {
  if (!p0 || !p1) return;
  c.beginPath();
  c.moveTo(p0.x, p0.y);
  c.lineTo(p1.x, p1.y);

  c.strokeStyle = color;
  c.lineWidth = size * 8;
  c.globalAlpha = alpha * 0.3;
  c.stroke();

  c.lineWidth = size * 4;
  c.globalAlpha = alpha * 0.6;
  c.stroke();

  c.strokeStyle = '#ffffff';
  c.lineWidth = size * 1.5;
  c.globalAlpha = alpha;
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

    // Reflections (invert Y over the floor which is at y = _gateH)
    const floorY = _gateH;
    const reflOy = floorY + (floorY - oy);
    const pReflOuter = projectPoint(ox - camX, reflOy - camY, z, cx, cy, focalLength, nearClip);
    if (pReflOuter) {
      _gateProjReflOuter[j].x = pReflOuter.x;
      _gateProjReflOuter[j].y = pReflOuter.y;
      _gateProjReflOuter[j].scale = pReflOuter.scale;
    }

    const reflIy = floorY + (floorY - iy);
    const pReflInner = projectPoint(ix - camX, reflIy - camY, z, cx, cy, focalLength, nearClip);
    if (pReflInner) {
      _gateProjReflInner[j].x = pReflInner.x;
      _gateProjReflInner[j].y = pReflInner.y;
      _gateProjReflInner[j].scale = pReflInner.scale;
    }
  }
}

function drawCorridorSurfaces(c, z0, z1, fog, primaryCyan, primaryMagenta, mid, beat, camX, camY, cx, cy, focalLength, nearClip) {
  const h = _gateH;
  const w = _gateW * 1.5; // Wider corridor environment
  const ceilY = -h * 1.2;
  const floorY = h;

  // Project the 4 corners of the corridor at z0 and z1
  const ptL0 = projectPoint(-w - camX, ceilY - camY, z0, cx, cy, focalLength, nearClip);
  const ptR0 = projectPoint(w - camX, ceilY - camY, z0, cx, cy, focalLength, nearClip);
  const pbL0 = projectPoint(-w - camX, floorY - camY, z0, cx, cy, focalLength, nearClip);
  const pbR0 = projectPoint(w - camX, floorY - camY, z0, cx, cy, focalLength, nearClip);

  const ptL1 = projectPoint(-w - camX, ceilY - camY, z1, cx, cy, focalLength, nearClip);
  const ptR1 = projectPoint(w - camX, ceilY - camY, z1, cx, cy, focalLength, nearClip);
  const pbL1 = projectPoint(-w - camX, floorY - camY, z1, cx, cy, focalLength, nearClip);
  const pbR1 = projectPoint(w - camX, floorY - camY, z1, cx, cy, focalLength, nearClip);

  if (!ptL0 || !ptR0 || !pbL0 || !pbR0 || !ptL1 || !ptR1 || !pbL1 || !pbR1) return;

  c.save();
  
  // 1. Fill Dark Polygons
  // Ceiling
  c.fillStyle = `rgba(2, 3, 6, ${0.98 * fog})`;
  c.beginPath(); c.moveTo(ptL0.x, ptL0.y); c.lineTo(ptR0.x, ptR0.y); c.lineTo(ptR1.x, ptR1.y); c.lineTo(ptL1.x, ptL1.y); c.fill();
  
  // Left Wall
  c.fillStyle = `rgba(4, 5, 10, ${0.96 * fog})`;
  c.beginPath(); c.moveTo(ptL0.x, ptL0.y); c.lineTo(pbL0.x, pbL0.y); c.lineTo(pbL1.x, pbL1.y); c.lineTo(ptL1.x, ptL1.y); c.fill();
  
  // Right Wall
  c.fillStyle = `rgba(3, 4, 8, ${0.96 * fog})`;
  c.beginPath(); c.moveTo(ptR0.x, ptR0.y); c.lineTo(pbR0.x, pbR0.y); c.lineTo(pbR1.x, pbR1.y); c.lineTo(ptR1.x, ptR1.y); c.fill();
  
  // Floor (Glossy Black)
  c.fillStyle = `rgba(1, 1, 3, ${0.98 * fog})`;
  c.beginPath(); c.moveTo(pbL0.x, pbL0.y); c.lineTo(pbR0.x, pbR0.y); c.lineTo(pbR1.x, pbR1.y); c.lineTo(pbL1.x, pbL1.y); c.fill();

  // 2. Floor Panels & Grid (Magenta dominated)
  const floorCols = [-0.8 * w, -0.4 * w, 0, 0.4 * w, 0.8 * w];
  for (let col of floorCols) {
    const pl0 = projectPoint(col - camX, floorY - camY, z0, cx, cy, focalLength, nearClip);
    const pl1 = projectPoint(col - camX, floorY - camY, z1, cx, cy, focalLength, nearClip);
    drawNeonLine(c, pl0, pl1, primaryMagenta, pbL0.scale * 0.002, fog * 0.4 * (0.5 + beat * 0.5));
  }
  
  // Horizontal floor strips (panels)
  if (Math.round(z0 * 2) % 2 === 0) {
     drawNeonLine(c, pbL0, pbR0, primaryMagenta, pbL0.scale * 0.0025, fog * 0.6);
  }

  // 3. Wall details (Cyan dominated)
  const wallY = 0; // mid height
  const wmL0 = projectPoint(-w - camX, wallY - camY, z0, cx, cy, focalLength, nearClip);
  const wmL1 = projectPoint(-w - camX, wallY - camY, z1, cx, cy, focalLength, nearClip);
  const wmR0 = projectPoint(w - camX, wallY - camY, z0, cx, cy, focalLength, nearClip);
  const wmR1 = projectPoint(w - camX, wallY - camY, z1, cx, cy, focalLength, nearClip);
  
  drawNeonLine(c, wmL0, wmL1, primaryCyan, ptL0.scale * 0.002, fog * 0.5 * (0.4 + mid * 0.6));
  drawNeonLine(c, wmR0, wmR1, primaryCyan, ptL0.scale * 0.002, fog * 0.5 * (0.4 + mid * 0.6));
  
  // Vertical wall panels
  if (Math.round(z0 * 3) % 3 === 0) {
    drawNeonLine(c, ptL0, pbL0, primaryCyan, ptL0.scale * 0.0015, fog * 0.4);
    drawNeonLine(c, ptR0, pbR0, primaryCyan, ptL0.scale * 0.0015, fog * 0.4);
  }

  // 4. Ceiling details (Cyan dominated)
  const ceilCols = [-0.6 * w, 0.6 * w];
  for (let col of ceilCols) {
    const cl0 = projectPoint(col - camX, ceilY - camY, z0, cx, cy, focalLength, nearClip);
    const cl1 = projectPoint(col - camX, ceilY - camY, z1, cx, cy, focalLength, nearClip);
    drawNeonLine(c, cl0, cl1, primaryCyan, ptL0.scale * 0.003, fog * 0.7);
  }

  c.restore();
}

function drawFloorReflections(c, z0, z1, depthAlpha, gateColor, beat, camX, camY, cx, cy, focalLength, nearClip) {
  // Reflections should be broken, faded, darker
  const alpha = (0.15 + beat * 0.1) * depthAlpha;
  if (alpha < 0.01) return;

  c.save();
  c.globalCompositeOperation = 'screen';
  
  // We draw the reflection of the bottom part of the gate only
  c.beginPath();
  c.moveTo(_gateProjReflOuter[3].x, _gateProjReflOuter[3].y);
  c.lineTo(_gateProjReflOuter[4].x, _gateProjReflOuter[4].y);
  c.lineTo(_gateProjReflOuter[5].x, _gateProjReflOuter[5].y);
  c.lineTo(_gateProjReflOuter[0].x, _gateProjReflOuter[0].y);
  c.lineTo(_gateProjReflOuter[1].x, _gateProjReflOuter[1].y);
  c.lineTo(_gateProjReflOuter[2].x, _gateProjReflOuter[2].y);
  
  c.strokeStyle = gateColor;
  c.lineWidth = 6;
  c.globalAlpha = alpha * 0.3;
  c.stroke();
  
  // Break up the reflection using dashed lines
  c.setLineDash([15, 10, 5, 10]);
  c.strokeStyle = '#ffffff';
  c.lineWidth = 1.5;
  c.globalAlpha = alpha * 0.5;
  c.stroke();
  c.setLineDash([]);

  c.restore();
}

function drawGateStructure(c, fog) {
  c.save();
  c.fillStyle = `rgba(5, 7, 14, ${0.95 * fog})`;
  c.beginPath();
  c.moveTo(_gateProjOuter[0].x, _gateProjOuter[0].y);
  for (let j = 1; j < 6; j++) c.lineTo(_gateProjOuter[j].x, _gateProjOuter[j].y);
  c.closePath();

  c.moveTo(_gateProjInner[0].x, _gateProjInner[0].y);
  for (let j = 1; j < 6; j++) c.lineTo(_gateProjInner[j].x, _gateProjInner[j].y);
  c.closePath();

  c.fill('evenodd');
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
  const cy = height * 0.52; // slightly elevated horizon
  const focalLength = minDim * 0.65;
  const nearClip = 0.18;
  const farZ = 12.0;

  const energy = clamp(state.energySmoothed || 0, 0, 1);
  const bass = clamp(state.bassMode ? (state.bassSmoothed || 0) : energy * 0.55, 0, 1.2);
  const mid = getVortexBandEnergy(12, 88);
  const high = getVortexBandEnergy(96, 240);

  // Maximum 10 gates to strictly follow the 8-10 rule.
  const qualityName = state.vortexQuality === 'high' ? 'high' : (state.vortexQuality === 'medium' ? 'medium' : 'low');
  const quality = qualityName === 'high'
    ? { gates: 10, particles: 40, strips: 6 }
    : qualityName === 'medium'
      ? { gates: 9, particles: 30, strips: 4 }
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

  // Reduced camera sway
  const camX = Math.sin(state.cyberVortexTravel * 0.2) * 0.04;
  const camY = Math.cos(state.cyberVortexTravel * 0.15) * 0.02;

  c.save();
  c.clearRect(0, 0, width, height);

  // Deep background
  const bg = c.createLinearGradient(0, 0, 0, height);
  bg.addColorStop(0, '#020205');
  bg.addColorStop(0.42, '#03040a');
  bg.addColorStop(0.78, '#010104');
  bg.addColorStop(1, '#000000');
  c.fillStyle = bg;
  c.fillRect(0, 0, width, height);

  // Strictly balanced colors (65% Magenta, 35% Cyan)
  const isBW = state.theme === 'bw';
  const primaryMagenta = isBW ? 'rgba(160,160,160,1)' : '#ff2dff';
  const primaryCyan = isBW ? 'rgba(230,230,230,1)' : '#00d9ff';

  // Fog & Atmosphere
  const fogGrad = c.createRadialGradient(cx, cy, 0, cx, cy, Math.max(width, height) * 0.45);
  fogGrad.addColorStop(0, cyberAlpha(primaryCyan, 0.15 + bass * 0.05 + beat * 0.05));
  fogGrad.addColorStop(0.3, cyberAlpha(primaryMagenta, 0.08 + bass * 0.03));
  fogGrad.addColorStop(1, 'rgba(0,0,0,0)');
  c.fillStyle = fogGrad;
  c.fillRect(0, 0, width, height);

  for (let i = 0; i < quality.gates; i++) {
    const gate = state.cyberVortexGates[i];
    const z0 = gate.z;
    const z1 = (i === quality.gates - 1) ? nearClip : state.cyberVortexGates[i+1].z;

    const depthAlpha = clamp(1.0 - z0 / farZ, 0.0, 1.0);
    const fog = depthAlpha * depthAlpha;

    // Gates are predominantly Magenta, some Cyan accents
    const gateColorOuter = primaryMagenta;
    const gateColorInner = gate.colorSide === 0 ? primaryCyan : primaryMagenta;

    const pulse = 1.0 + bass * 0.07 + gate.pulse * 0.08;

    projectGate(gate, pulse, camX, camY, cx, cy, focalLength, nearClip);

    // 1. Draw Environment Surfaces (Walls, Floor, Ceiling) FIRST
    drawCorridorSurfaces(c, z0, z1, fog, primaryCyan, primaryMagenta, mid, beat, camX, camY, cx, cy, focalLength, nearClip);

    // 2. Draw Floor Reflections (broken, faded)
    drawFloorReflections(c, z0, z1, fog, gateColorOuter, beat, camX, camY, cx, cy, focalLength, nearClip);

    // 3. Draw Gate Structure (Thick Neon)
    const size = Math.max(1, _gateProjOuter[0].scale * 0.0035);
    drawGateStructure(c, fog);
    drawNeonPath(c, _gateProjOuter, gateColorOuter, size * 1.5, fog, true);
    drawNeonPath(c, _gateProjInner, gateColorInner, size * 0.9, fog, true);

    // 4. Particles (Max 40)
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

  // Vanishing point glow
  const nebulaRadius = minDim * clamp(0.045 + bass * 0.03 + beat * 0.015, 0.035, 0.095);
  const coreGlow = c.createRadialGradient(cx, cy, 0, cx, cy, nebulaRadius);
  coreGlow.addColorStop(0, 'rgba(235,250,255,0.8)');
  coreGlow.addColorStop(0.3, cyberAlpha(primaryCyan, 0.4 + bass * 0.15));
  coreGlow.addColorStop(0.75, cyberAlpha(primaryMagenta, 0.15 + beat * 0.08));
  coreGlow.addColorStop(1, 'rgba(0,0,0,0)');
  c.save();
  c.globalCompositeOperation = 'screen';
  c.fillStyle = coreGlow;
  c.beginPath();
  c.arc(cx, cy, nebulaRadius, 0, Math.PI * 2);
  c.fill();
  c.restore();

  // Dark vignette
  const vignette = c.createRadialGradient(cx, cy, minDim * 0.28, cx, cy, Math.max(width, height) * 0.72);
  vignette.addColorStop(0, 'rgba(0,0,0,0)');
  vignette.addColorStop(0.55, 'rgba(0,0,0,0.18)');
  vignette.addColorStop(1, 'rgba(0,0,0,0.95)');
  c.save();
  c.fillStyle = vignette;
  c.fillRect(0, 0, width, height);
  c.restore();

  c.restore();
}
"""

# Find the start and end of the block to replace
start_str = "function drawNeonPath(c, points, color, size, alpha, closePath = false) {"
end_str = "function drawThemeForeground(c, width, height) {"

start_idx = content.find(start_str)
end_idx = content.find(end_str)

if start_idx != -1 and end_idx != -1:
    new_file_content = content[:start_idx] + new_code + content[end_idx:]
    with open(file_path, "w", encoding="utf-8") as f:
        f.write(new_file_content)
    print("Replaced successfully")
else:
    print("Could not find start or end index")
