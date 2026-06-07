import re

file_path = "d:/promusiccc - Copy/script.js"
with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

new_code = """
function drawNeonPath(c, points, color, size, alpha, closePath = false) {
  if (points.length < 2) return;
  c.beginPath();
  c.moveTo(points[0].x, points[0].y);
  for (let i = 1; i < points.length; i++) {
    c.lineTo(points[i].x, points[i].y);
  }
  if (closePath) c.closePath();

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

function drawCorridorSurfaces(c, z0, z1, fog, vortexPrimaryColor, vortexSecondaryColor, accentColor, floorPulse, wallPulse, camX, camY, cx, cy, focalLength, nearClip) {
  const h = _gateH;
  const w = _gateW * 1.5;
  const ceilY = -h * 1.2;
  const floorY = h;

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
  
  const isAlt = Math.round(z0 * 2) % 2 === 0;
  
  c.fillStyle = isAlt ? `rgba(15, 20, 35, ${0.9 * fog})` : `rgba(8, 12, 22, ${0.9 * fog})`;
  c.beginPath(); c.moveTo(ptL0.x, ptL0.y); c.lineTo(ptR0.x, ptR0.y); c.lineTo(ptR1.x, ptR1.y); c.lineTo(ptL1.x, ptL1.y); c.fill();
  
  c.fillStyle = isAlt ? `rgba(20, 25, 45, ${0.85 * fog})` : `rgba(12, 15, 30, ${0.85 * fog})`;
  c.beginPath(); c.moveTo(ptL0.x, ptL0.y); c.lineTo(pbL0.x, pbL0.y); c.lineTo(pbL1.x, pbL1.y); c.lineTo(ptL1.x, ptL1.y); c.fill();
  
  c.fillStyle = isAlt ? `rgba(15, 20, 40, ${0.85 * fog})` : `rgba(10, 14, 28, ${0.85 * fog})`;
  c.beginPath(); c.moveTo(ptR0.x, ptR0.y); c.lineTo(pbR0.x, pbR0.y); c.lineTo(pbR1.x, pbR1.y); c.lineTo(ptR1.x, ptR1.y); c.fill();
  
  c.fillStyle = isAlt ? `rgba(8, 12, 25, ${0.95 * fog})` : `rgba(4, 6, 15, ${0.95 * fog})`;
  c.beginPath(); c.moveTo(pbL0.x, pbL0.y); c.lineTo(pbR0.x, pbR0.y); c.lineTo(pbR1.x, pbR1.y); c.lineTo(pbL1.x, pbL1.y); c.fill();

  c.strokeStyle = `rgba(40, 60, 100, ${0.5 * fog})`;
  c.lineWidth = ptL0.scale * 0.001;
  c.beginPath();
  c.moveTo(ptL0.x, ptL0.y); c.lineTo(pbL0.x, pbL0.y);
  c.moveTo(ptR0.x, ptR0.y); c.lineTo(pbR0.x, pbR0.y);
  c.stroke();

  // Floor Panels & Grid (Magenta dominated)
  const floorCols = [-0.8 * w, -0.4 * w, 0, 0.4 * w, 0.8 * w];
  for (let col of floorCols) {
    const pl0 = projectPoint(col - camX, floorY - camY, z0, cx, cy, focalLength, nearClip);
    const pl1 = projectPoint(col - camX, floorY - camY, z1, cx, cy, focalLength, nearClip);
    if (pl0 && pl1) {
      drawNeonLine(c, pl0, pl1, vortexPrimaryColor, pbL0.scale * 0.0015, fog * floorPulse * 0.8);
    }
  }
  
  if (isAlt) {
     drawNeonLine(c, pbL0, pbR0, vortexPrimaryColor, pbL0.scale * 0.002, fog * floorPulse);
  }

  // Wall details (Cyan dominated)
  const wallY = 0;
  const wmL0 = projectPoint(-w - camX, wallY - camY, z0, cx, cy, focalLength, nearClip);
  const wmL1 = projectPoint(-w - camX, wallY - camY, z1, cx, cy, focalLength, nearClip);
  const wmR0 = projectPoint(w - camX, wallY - camY, z0, cx, cy, focalLength, nearClip);
  const wmR1 = projectPoint(w - camX, wallY - camY, z1, cx, cy, focalLength, nearClip);
  
  if (wmL0 && wmL1 && wmR0 && wmR1) {
    drawNeonLine(c, wmL0, wmL1, vortexSecondaryColor, ptL0.scale * 0.002, fog * wallPulse);
    drawNeonLine(c, wmR0, wmR1, vortexSecondaryColor, ptL0.scale * 0.002, fog * wallPulse);
  }
  
  if (!isAlt) {
    drawNeonLine(c, ptL0, pbL0, vortexSecondaryColor, ptL0.scale * 0.0015, fog * wallPulse * 0.8);
    drawNeonLine(c, ptR0, pbR0, vortexSecondaryColor, ptL0.scale * 0.0015, fog * wallPulse * 0.8);
  }

  // Ceiling details (Cyan dominated)
  const ceilCols = [-0.6 * w, 0.6 * w];
  for (let col of ceilCols) {
    const cl0 = projectPoint(col - camX, ceilY - camY, z0, cx, cy, focalLength, nearClip);
    const cl1 = projectPoint(col - camX, ceilY - camY, z1, cx, cy, focalLength, nearClip);
    if (cl0 && cl1) {
      drawNeonLine(c, cl0, cl1, accentColor, ptL0.scale * 0.0025, fog * wallPulse * 1.2);
    }
  }

  c.restore();
}

function drawFloorReflections(c, z0, z1, depthAlpha, gateColor, reflectionPulse, camX, camY, cx, cy, focalLength, nearClip) {
  const alpha = reflectionPulse * depthAlpha;
  if (alpha < 0.01) return;

  c.save();
  c.globalCompositeOperation = 'screen';
  
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
  if (state.vortexBeatGlow === undefined) state.vortexBeatGlow = 0;

  const dt = Math.min(now - state.cyberVortexLastTime, 34);
  state.cyberVortexLastTime = now;

  const minDim = Math.min(width, height);
  const cx = width * 0.5;
  const cy = height * 0.52;
  const focalLength = minDim * 0.65;
  const nearClip = 0.18;
  const farZ = 12.0;

  const energy = clamp(state.energySmoothed || 0, 0, 1);
  const bass = state.bassMode ? clamp(state.bassSmoothed || 0, 0, 1.2) : 0;
  const high = getVortexBandEnergy(96, 240);

  const qualityName = state.vortexQuality === 'high' ? 'high' : (state.vortexQuality === 'medium' ? 'medium' : 'low');
  const quality = qualityName === 'high'
    ? { gates: 10, particles: 40, strips: 6 }
    : qualityName === 'medium'
      ? { gates: 9, particles: 30, strips: 4 }
      : { gates: 8, particles: 20, strips: 2 };

  ensureCyberVortexPools(farZ, nearClip);
  syncCyberVortexQuality(quality, farZ, nearClip);

  const speed = dt * (0.0028 + (state.bassMode ? energy * 0.0035 + bass * 0.015 : energy * 0.005));
  state.cyberVortexTravel += speed;
  
  // 1. BEAT GLOW VARIABLE
  if (state.beatActive) {
      state.vortexBeatGlow = 1.0;
  }
  state.vortexBeatGlow *= Math.pow(0.85, dt / 16.67);
  const vortexBeatGlow = clamp(state.vortexBeatGlow, 0, 1);

  // 2. EXPLICIT VARIABLES FOR REACTIVITY
  const bassPulse = state.bassMode ? (bass * 0.08) : 0;
  const portalGlowBoost = 1.0 + (state.bassMode ? bassPulse : 0) + vortexBeatGlow * 0.5;
  const floorPulse = 0.5 + (state.bassMode ? bassPulse * 2 : 0) + vortexBeatGlow * 0.6;
  const wallPulse = 0.4 + (state.bassMode ? bassPulse : 0) + vortexBeatGlow * 0.3;
  const reflectionPulse = 0.15 + (state.bassMode ? bassPulse * 1.5 : 0) + vortexBeatGlow * 0.25;

  updateCyberVortexPools(quality, speed, farZ, nearClip, bass, high);
  sortActiveGates(state.cyberVortexGates, quality.gates);

  ensureProjectedPool();
  _projectedIndex = 0;

  const camX = Math.sin(state.cyberVortexTravel * 0.2) * 0.04;
  const camY = Math.cos(state.cyberVortexTravel * 0.15) * 0.02;

  c.save();
  c.clearRect(0, 0, width, height);

  const bg = c.createLinearGradient(0, 0, 0, height);
  bg.addColorStop(0, '#020205');
  bg.addColorStop(0.42, '#03040a');
  bg.addColorStop(0.78, '#010104');
  bg.addColorStop(1, '#000000');
  c.fillStyle = bg;
  c.fillRect(0, 0, width, height);

  // 3. EXPLICIT COLOR VARIABLES
  let vortexPrimaryColor, vortexSecondaryColor, accentColor, fogAmbientColor, gateAccentColor;

  if (state.autoCycle) {
    vortexPrimaryColor = paletteColor(0, 1);
    vortexSecondaryColor = paletteColor(0.33, 1);
    accentColor = paletteColor(0.66, 1);
    gateAccentColor = paletteColor(0.5, 1);
    fogAmbientColor = paletteColor(0, 1);
  } else if (state.theme === 'custom' || state.theme === 'default') {
    vortexPrimaryColor = '#ff2dff'; // Magenta
    vortexSecondaryColor = '#00d9ff'; // Cyan
    accentColor = '#8a2bff'; // Deep violet
    gateAccentColor = '#ff008c'; // Hot pink
    fogAmbientColor = '#4ddcff'; // Soft blue glow
  } else {
    const tConfig = themeConfig();
    vortexPrimaryColor = tConfig.palette[0] || '#ffffff';
    vortexSecondaryColor = tConfig.palette[1] || '#aaaaaa';
    accentColor = tConfig.palette[2] || '#777777';
    gateAccentColor = tConfig.palette[3] || '#444444';
    fogAmbientColor = tConfig.glowColor || '#ffffff';
  }

  const fogGrad = c.createRadialGradient(cx, cy, 0, cx, cy, Math.max(width, height) * 0.45);
  fogGrad.addColorStop(0, cyberAlpha(fogAmbientColor, 0.15 + (state.bassMode ? bass * 0.05 : 0) + vortexBeatGlow * 0.1));
  fogGrad.addColorStop(0.3, cyberAlpha(vortexPrimaryColor, 0.08 + (state.bassMode ? bass * 0.03 : 0)));
  fogGrad.addColorStop(1, 'rgba(0,0,0,0)');
  c.fillStyle = fogGrad;
  c.fillRect(0, 0, width, height);

  for (let i = 0; i < quality.gates; i++) {
    const gate = state.cyberVortexGates[i];
    const z0 = gate.z;
    const z1 = (i === quality.gates - 1) ? nearClip : state.cyberVortexGates[i+1].z;

    const depthAlpha = clamp(1.0 - z0 / farZ, 0.0, 1.0);
    const fog = depthAlpha * depthAlpha;

    const gateColorOuter = vortexPrimaryColor;
    const gateColorInner = gate.colorSide === 0 ? vortexSecondaryColor : gateAccentColor;

    const pulse = 1.0 + gate.pulse * 0.04 + (state.bassMode ? bassPulse : 0);

    projectGate(gate, pulse, camX, camY, cx, cy, focalLength, nearClip);

    drawCorridorSurfaces(c, z0, z1, fog, vortexPrimaryColor, vortexSecondaryColor, accentColor, floorPulse, wallPulse, camX, camY, cx, cy, focalLength, nearClip);

    drawFloorReflections(c, z0, z1, fog, gateColorOuter, reflectionPulse, camX, camY, cx, cy, focalLength, nearClip);

    const size = Math.max(1, _gateProjOuter[0].scale * 0.0035);
    drawGateStructure(c, fog);
    
    drawNeonPath(c, _gateProjOuter, gateColorOuter, size * 1.5, fog * portalGlowBoost, true);
    drawNeonPath(c, _gateProjInner, gateColorInner, size * 0.9, fog * portalGlowBoost, true);

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
          const pAlpha = pFog * pFog * (0.3 + high * 0.7 + vortexBeatGlow * 0.4);
          const pColor = particle.colorSide === 0 ? vortexSecondaryColor : vortexPrimaryColor;
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

  const nebulaRadius = minDim * clamp(0.045 + (state.bassMode ? bass * 0.03 : 0) + vortexBeatGlow * 0.02, 0.035, 0.095);
  const coreGlow = c.createRadialGradient(cx, cy, 0, cx, cy, nebulaRadius);
  coreGlow.addColorStop(0, `rgba(235,250,255,${0.8 + vortexBeatGlow * 0.2})`);
  coreGlow.addColorStop(0.3, cyberAlpha(fogAmbientColor, 0.4 + (state.bassMode ? bass * 0.15 : 0) + vortexBeatGlow * 0.2));
  coreGlow.addColorStop(0.75, cyberAlpha(vortexPrimaryColor, 0.15 + vortexBeatGlow * 0.1));
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
  vignette.addColorStop(1, 'rgba(0,0,0,0.95)');
  c.save();
  c.fillStyle = vignette;
  c.fillRect(0, 0, width, height);
  c.restore();

  c.restore();
}
"""

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
