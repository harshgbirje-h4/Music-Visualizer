
  let state = {};
  function themeConfig() { return { label: 'CLASSIC' }; }
  const performance = { now: () => 1000 };
  
  const c = {
    save: () => {},
    restore: () => {},
    beginPath: () => {},
    moveTo: () => {},
    lineTo: () => {},
    closePath: () => {},
    stroke: () => {},
    fill: () => {},
    fillRect: () => {},
    arc: () => {},
    globalAlpha: 1,
    lineWidth: 1
  };
  
  // ── True-3D Perspective Projection Engine ──────────────────────────────
function project3D(p, camera, fov, cx, cy) {
  // Prevent division by zero or rendering behind camera. Safety near-plane clip.
  if (p.z <= 0.2) return null; 
  const scale = fov / p.z;
  return {
    x: cx + (p.x - camera.x) * scale,
    y: cy + (p.y - camera.y) * scale,
    scale: scale,
    z: p.z
  };
}

// ── Geometry Generators ────────────────────────────────────────────────
function createPolygonPoints(radius, sides, twistOffset = 0) {
  const points = [];
  for (let i = 0; i < sides; i++) {
    const angle = (i / sides) * Math.PI * 2 + twistOffset;
    points.push({
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius,
      z: 0
    });
  }
  return points;
}

function createSquarePoints(size, twistOffset = 0) {
  return createPolygonPoints(size, 4, Math.PI / 4 + twistOffset);
}

function createCirclePoints(radius, segments = 64, twistOffset = 0) {
  return createPolygonPoints(radius, segments, twistOffset);
}

// ── Automatic Pattern Blending ─────────────────────────────────────────
function smoothstep(min, max, value) {
  const x = Math.max(0, Math.min(1, (value - min) / (max - min)));
  return x * x * (3 - 2 * x);
}

function updateTunnelTransitions(now, bass, energy) {
  if (!state.vortexState) {
    state.vortexState = {
      currentPat: 0,
      nextPat: 0,
      progress: 1, // 1 means transition is complete
      lastChangeTime: now
    };
  }

  const vs = state.vortexState;

  // Trigger pattern change automatically
  if (vs.progress >= 1 && (now - vs.lastChangeTime) > 8000) {
    // If energy spikes, or enough time passed, pick a new random pattern (0 to 4)
    if (energy > 0.6 || (now - vs.lastChangeTime) > 15000) {
      let next = Math.floor(Math.random() * 5);
      while (next === vs.currentPat) {
        next = Math.floor(Math.random() * 5);
      }
      vs.nextPat = next;
      vs.progress = 0;
      vs.lastChangeTime = now;
    }
  }

  // Advance transition progress
  if (vs.progress < 1) {
    // Transition speed is driven by bass/energy: faster on hard drops, slower on calm
    const speed = 0.0005 + (bass * 0.002);
    vs.progress += speed * (performance.now() - now || 16); 
    if (vs.progress >= 1) {
      vs.progress = 1;
      vs.currentPat = vs.nextPat;
    }
  }
}

// ── Render Specific Tunnel Layer ───────────────────────────────────────
function renderTunnelLayer(c, pat, alphaMult, ringData, now, bass, mids, width, SIDES) {
  c.save();
  c.globalAlpha = smoothstep(0, 1, alphaMult);

  if (pat === 0) {
    // 1. Rainbow Circular Tunnel
    for (let i = 0; i < ringData.length; i++) {
      const r = ringData[i];
      const hue = (now * 0.1 + (1.0 - r.zPct) * 360) % 360;
      
      c.beginPath();
      c.moveTo(r.points[0].x, r.points[0].y);
      for (let j = 1; j < SIDES; j++) c.lineTo(r.points[j].x, r.points[j].y);
      c.closePath();

      c.lineWidth = Math.max(2, 20 * r.points[0].scale);
      c.strokeStyle = `hsla(${hue}, 100%, ${50 + bass * 20}%, ${r.zPct})`;
      c.stroke();
    }
  } 
  else if (pat === 1) {
    // 2. Fiery Square Frame Tunnel
    for (let i = 0; i < ringData.length - 1; i++) {
      const r1 = ringData[i];
      const r2 = ringData[i+1];
      
      c.beginPath();
      c.moveTo(r1.points[0].x, r1.points[0].y);
      for (let j = 1; j < SIDES; j++) c.lineTo(r1.points[j].x, r1.points[j].y);
      c.closePath();
      
      const hue = 10 + ((1.0 - r1.zPct) * 40); 
      c.shadowBlur = 10 * r1.points[0].scale * (1 + bass);
      c.shadowColor = `hsla(${hue}, 100%, 50%, ${r1.zPct})`;
      c.strokeStyle = `hsla(${hue}, 100%, 70%, ${r1.zPct})`;
      c.lineWidth = Math.max(1, 8 * r1.points[0].scale);
      c.stroke();
      c.shadowBlur = 0;

      c.beginPath();
      for (let j = 0; j < SIDES; j++) {
        c.moveTo(r1.points[j].x, r1.points[j].y);
        c.lineTo(r2.points[j].x, r2.points[j].y);
      }
      c.strokeStyle = `hsla(${hue}, 100%, 50%, ${r1.zPct * 0.3})`;
      c.lineWidth = 2 * r1.points[0].scale;
      c.stroke();
    }
  }
  else if (pat === 2) {
    // 3. Neon Cyber Square Wireframe Tunnel
    for (let i = 0; i < ringData.length - 1; i++) {
      const r1 = ringData[i];
      const r2 = ringData[i+1];
      
      c.beginPath();
      c.moveTo(r1.points[0].x, r1.points[0].y);
      for (let j = 1; j < SIDES; j++) c.lineTo(r1.points[j].x, r1.points[j].y);
      c.closePath();

      const neonAlpha = r1.zPct * (0.5 + bass * 0.5);
      c.shadowBlur = 20 * r1.points[0].scale * (1 + bass);
      c.shadowColor = `rgba(0, 200, 255, ${neonAlpha})`;
      c.strokeStyle = `rgba(200, 255, 255, ${neonAlpha})`;
      c.lineWidth = Math.max(2, 5 * r1.points[0].scale);
      c.stroke();
      c.shadowBlur = 0;

      c.beginPath();
      for (let j = 0; j < SIDES; j++) {
        c.moveTo(r1.points[j].x, r1.points[j].y);
        c.lineTo(r2.points[j].x, r2.points[j].y);
      }
      c.strokeStyle = `rgba(255, 0, 255, ${neonAlpha * 0.6})`;
      c.lineWidth = Math.max(1, 3 * r1.points[0].scale);
      c.stroke();
    }
  }
  else if (pat === 3) {
    // 4. Pink/Cyan Octagon Tunnel (Solid Panels)
    for (let i = 0; i < ringData.length - 1; i++) {
      const r1 = ringData[i];
      const r2 = ringData[i+1];
      
      for (let j = 0; j < SIDES; j++) {
        const nextJ = (j + 1) % SIDES;
        c.beginPath();
        c.moveTo(r1.points[j].x, r1.points[j].y);
        c.lineTo(r1.points[nextJ].x, r1.points[nextJ].y);
        c.lineTo(r2.points[nextJ].x, r2.points[nextJ].y);
        c.lineTo(r2.points[j].x, r2.points[j].y);
        c.closePath();

        const isPink = j % 2 === 0;
        const panelAlpha = r1.zPct * (0.8 + bass * 0.2);
        c.fillStyle = isPink ? 
          `rgba(255, 0, 128, ${panelAlpha})` : 
          `rgba(0, 255, 200, ${panelAlpha})`;
        c.fill();
        
        c.strokeStyle = '#000000';
        c.lineWidth = Math.max(1, 3 * r1.points[0].scale);
        c.stroke();
      }
    }
  }
  else if (pat === 4) {
    // 5. Hybrid Reactive (Wireframe Octagon with intense glow)
    for (let i = 0; i < ringData.length - 1; i++) {
      const r1 = ringData[i];
      const r2 = ringData[i+1];
      
      c.beginPath();
      c.moveTo(r1.points[0].x, r1.points[0].y);
      for (let j = 1; j < SIDES; j++) c.lineTo(r1.points[j].x, r1.points[j].y);
      c.closePath();

      const alpha = r1.zPct * (0.5 + bass * 0.5);
      c.shadowBlur = 10 * r1.points[0].scale;
      c.shadowColor = `rgba(255, 255, 0, ${alpha})`;
      c.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
      c.lineWidth = Math.max(1, 4 * r1.points[0].scale);
      c.stroke();
      c.shadowBlur = 0;

      c.beginPath();
      for (let j = 0; j < SIDES; j++) {
        c.moveTo(r1.points[j].x, r1.points[j].y);
        c.lineTo(r2.points[j].x, r2.points[j].y);
      }
      c.strokeStyle = `rgba(0, 255, 0, ${alpha * 0.5})`;
      c.lineWidth = Math.max(1, 2 * r1.points[0].scale);
      c.stroke();
    }
  }

  c.restore();
}

function getPatternConfig(pat, width) {
  let SIDES = 8, RADIUS = width * 0.3;
  if (pat === 0) { SIDES = 64; RADIUS = width * 0.22; }
  else if (pat === 1) { SIDES = 4; RADIUS = width * 0.35; }
  else if (pat === 2) { SIDES = 4; RADIUS = width * 0.3; }
  else if (pat === 3) { SIDES = 8; RADIUS = width * 0.3; }
  else if (pat === 4) { SIDES = 8; RADIUS = width * 0.25; }
  return { SIDES, RADIUS };
}

// ── True 3D Infinity Tunnel Engine ─────────────────────────────────────
function renderInfinityTunnel(c, width, height) {
  const cx = width / 2;
  const cy = height / 2;

  const now = performance.now();
  if (state.totalZ === undefined) state.totalZ = 0;
  if (state.lastFrameTime === undefined) state.lastFrameTime = now;
  const dt = Math.min(now - state.lastFrameTime, 50);
  state.lastFrameTime = now;

  const energy = state.energySmoothed || 0;
  const bass = state.bassSmoothed || energy;
  const mids = state.midsSmoothed || energy;
  
  // Speed is reactive to bass: faster on hits
  const speed = 0.008 + (bass * 0.02);
  state.totalZ += speed * dt;
  const zTravel = state.totalZ;

  updateTunnelTransitions(now, bass, energy);
  const vs = state.vortexState;

  // Smooth camera sway (no shape distortion)
  const camera = {
    x: Math.sin(now * 0.0006) * (width * 0.08),
    y: Math.cos(now * 0.00045) * (height * 0.08)
  };

  const fov = Math.min(width, height) * 0.9;
  const zMin = 1;
  const zMax = 45;
  const RING_COUNT = 70;
  const RING_SPACING = (zMax - zMin) / RING_COUNT;

  c.save();
  c.lineCap = 'round';
  c.lineJoin = 'round';
  c.globalCompositeOperation = 'screen';

  // Deep Black Space Background
  c.fillStyle = '#020205';
  c.fillRect(0, 0, width, height);

  // Helper to process geometry for a pattern
  const processPattern = (pat) => {
    const config = getPatternConfig(pat, width);
    const SIDES = config.SIDES;
    let templatePoints;
    if (SIDES === 64) templatePoints = createCirclePoints(config.RADIUS);
    else if (SIDES === 4) templatePoints = createSquarePoints(config.RADIUS);
    else templatePoints = createPolygonPoints(config.RADIUS, SIDES);

    const ringData = [];
    for (let i = 0; i < RING_COUNT; i++) {
      // STRICT RECYCLING inside [zMin, zMax] BEFORE projection
      const zOffset = (zTravel + i * RING_SPACING) % (zMax - zMin);
      const z = zMax - zOffset; // Far is zMax, Near is zMin
      
      if (z <= 0.2) continue; // Safety clip

      // Mids drive rotation to give twisting sensation
      let twist = 0;
      if (pat === 0) twist = z * 0.05 + (now * 0.001) + mids * 0.5;
      if (pat === 3) twist = z * 0.02 + Math.sin(now * 0.0005) * 0.5;
      if (pat === 4) twist = z * 0.03 + (now * 0.002);
      if (pat === 2 || pat === 1) twist = Math.PI / 4; // Squares stay aligned

      const projectedPoints = [];
      let allValid = true;
      for (let j = 0; j < SIDES; j++) {
        const p = templatePoints[j];
        const rx = p.x * Math.cos(twist) - p.y * Math.sin(twist);
        const ry = p.x * Math.sin(twist) + p.y * Math.cos(twist);
        const proj = project3D({ x: rx, y: ry, z: z }, camera, fov, cx, cy);
        if (!proj) { allValid = false; break; }
        projectedPoints.push(proj);
      }

      if (allValid && projectedPoints.length === SIDES) {
        // nearFactor applies glow/intensity. 1.0 = near (zMin), 0.0 = far (zMax)
        const nearFactor = Math.max(0, Math.min(1, 1.0 - ((z - zMin) / (zMax - zMin))));
        ringData.push({
          points: projectedPoints,
          z: z,
          zPct: nearFactor
        });
      }
    }

    // Sort strictly from back (far) to front (near)
    ringData.sort((a, b) => b.z - a.z);
    return { ringData, SIDES };
  };

  // Render current pattern fading out
  const currentData = processPattern(vs.currentPat);
  renderTunnelLayer(c, vs.currentPat, 1.0 - vs.progress, currentData.ringData, now, bass, mids, width, currentData.SIDES);

  // If transitioning, render next pattern fading in
  if (vs.progress < 1) {
    const nextData = processPattern(vs.nextPat);
    renderTunnelLayer(c, vs.nextPat, vs.progress, nextData.ringData, now, bass, mids, width, nextData.SIDES);
  }

  // The white blob SINGULARITY logic has been entirely removed as requested.

  c.restore();
}

// Map the old drawVortex call to the new engine
function drawVortex(c, width, height) {
  renderInfinityTunnel(c, width, height);
}





  
  try {
    drawVortex(c, 800, 600);
    console.log('Successfully ran drawVortex without throwing!');
  } catch(e) {
    console.error('Error running drawVortex:', e);
  }
