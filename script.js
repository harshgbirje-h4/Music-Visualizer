'use strict';

const THEMES = {
  default: {
    label: 'CHOOSE A THEME',
    tagline: 'Waiting for selection...',
    palette: ['#ffffff', '#cccccc', '#999999', '#666666'],
    glowColor: '#ffffff',
    background: ['#000000', '#111111', '#222222'],
    analyserSmoothing: 0.8,
    beatScaleBoost: 0.01,
    beatFlashDuration: 100,
    beatCooldownMax: 20,
    barSharpness: 0.5,
    lineWidth: 2,
    glowIntensity: 0.2,
    amplitude: 0.5,
    animationSpeed: 0.5,
    bgParticleCount: 20,
    bgParticleSpeed: 0.2,
    particleTrail: 0.2,
    waveformSmoothness: 0.6,
    staticNoise: 0.0,
    burstCount: 5,
    road: false,
    radio: false,
    scanlines: false,
    silhouettes: false
  },
  classic: {
    label: 'CLASSIC MODE',
    tagline: 'Warm nostalgia',
    palette: ['#ffd27a', '#f0a24d', '#b46a2d', '#6e4222'],
    glowColor: '#f0a24d',
    background: ['#120b05', '#28170d', '#4f311b'],
    analyserSmoothing: 0.65,
    beatScaleBoost: 0.028,
    beatFlashDuration: 120,
    beatCooldownMax: 16,
    barSharpness: 0.7,
    lineWidth: 3,
    glowIntensity: 0.65,
    amplitude: 0.72,
    animationSpeed: 0.55,
    bgParticleCount: 44,
    bgParticleSpeed: 0.42,
    particleTrail: 0.18,
    waveformSmoothness: 0.4,
    staticNoise: 0.04,
    burstCount: 10,
    road: false,
    radio: false,
    scanlines: false,
    silhouettes: false
  },
  bw: {
    label: 'BLACK & WHITE',
    tagline: 'Vintage TV effect',
    palette: ['#f8f8f8', '#cccccc', '#888888', '#353535'],
    glowColor: '#f2f2f2',
    background: ['#030303', '#0f0f0f', '#1c1c1c'],
    analyserSmoothing: 0.6,
    beatScaleBoost: 0.014,
    beatFlashDuration: 70,
    beatCooldownMax: 12,
    barSharpness: 1.35,
    lineWidth: 1.2,
    glowIntensity: 0.2,
    amplitude: 1.05,
    animationSpeed: 0.9,
    bgParticleCount: 120,
    bgParticleSpeed: 1.4,
    particleTrail: 0.06,
    waveformSmoothness: 0.15,
    staticNoise: 0.28,
    burstCount: 6,
    road: false,
    radio: false,
    scanlines: true,
    silhouettes: false
  },
  rock: {
    label: 'ROCK MODE',
    tagline: 'Live show energy',
    palette: ['#ff416d', '#ff7f50', '#b835ff', '#5f9cff'],
    glowColor: '#ff4b83',
    background: ['#08030f', '#18091c', '#260a30'],
    analyserSmoothing: 0.55,
    beatScaleBoost: 0.05,
    beatFlashDuration: 85,
    beatCooldownMax: 8,
    barSharpness: 1.25,
    lineWidth: 4.2,
    glowIntensity: 1.18,
    amplitude: 1.0,
    animationSpeed: 1.18,
    bgParticleCount: 56,
    bgParticleSpeed: 1.25,
    particleTrail: 0.12,
    waveformSmoothness: 0.2,
    staticNoise: 0.02,
    burstCount: 20,
    road: false,
    radio: false,
    scanlines: false,
    silhouettes: true
  },
  memory: {
    label: 'MEMORY REBOOT',
    tagline: 'Calm emotional journey',
    palette: ['#98dcff', '#5dc7ff', '#7c8dff', '#c2a8ff'],
    glowColor: '#7fd6ff',
    background: ['#050c16', '#0e1b31', '#17365c'],
    analyserSmoothing: 0.65,
    beatScaleBoost: 0.018,
    beatFlashDuration: 150,
    beatCooldownMax: 18,
    barSharpness: 0.82,
    lineWidth: 2.2,
    glowIntensity: 0.46,
    amplitude: 0.78,
    animationSpeed: 0.4,
    bgParticleCount: 68,
    bgParticleSpeed: 0.56,
    particleTrail: 0.13,
    waveformSmoothness: 0.35,
    staticNoise: 0.01,
    burstCount: 8,
    road: false,
    radio: false,
    scanlines: false,
    silhouettes: false
  },
  custom: {
    label: 'CUSTOM MODE',
    tagline: 'Your personal vibe',
    palette: ['#00ffcc', '#00ccff', '#0099cc', '#006666'],
    glowColor: '#00ffcc',
    background: ['#000000', '#0a0a0a', '#111111'],
    analyserSmoothing: 0.65,
    beatScaleBoost: 0.02,
    beatFlashDuration: 100,
    beatCooldownMax: 15,
    barSharpness: 1.0,
    lineWidth: 2.5,
    glowIntensity: 0.8,
    amplitude: 0.8,
    animationSpeed: 0.6,
    bgParticleCount: 50,
    bgParticleSpeed: 0.6,
    particleTrail: 0.15,
    waveformSmoothness: 0.3,
    staticNoise: 0.01,
    burstCount: 8,
    road: false,
    radio: false,
    scanlines: false,
    silhouettes: false
  },
  chill: {
    label: 'CHILL MODE',
    tagline: 'Relaxing night drives',
    palette: ['#a975fa', '#6b5bdb', '#845ef7', '#b197fa'],
    glowColor: '#a975fa',
    background: ['#0a0514', '#170b29', '#2d1445'],
    analyserSmoothing: 0.68,
    beatScaleBoost: 0.015,
    beatFlashDuration: 200,
    beatCooldownMax: 24,
    barSharpness: 0.5,
    lineWidth: 2,
    glowIntensity: 0.4,
    amplitude: 0.6,
    animationSpeed: 0.3,
    bgParticleCount: 40,
    bgParticleSpeed: 0.3,
    particleTrail: 0.2,
    waveformSmoothness: 0.4,
    staticNoise: 0.01,
    burstCount: 4,
    road: false,
    radio: false,
    scanlines: false,
    silhouettes: false
  },
  study: {
    label: 'STUDY MODE',
    tagline: 'Deep focus',
    palette: ['#ffeb3b', '#fbc02d', '#f9a825', '#f57f17'],
    glowColor: '#ffeb3b',
    background: ['#1a1a00', '#2a2a00', '#3a2a00'],
    analyserSmoothing: 0.7,
    beatScaleBoost: 0.005,
    beatFlashDuration: 300,
    beatCooldownMax: 30,
    barSharpness: 0.3,
    lineWidth: 1.5,
    glowIntensity: 0.2,
    amplitude: 0.4,
    animationSpeed: 0.2,
    bgParticleCount: 20,
    bgParticleSpeed: 0.2,
    particleTrail: 0.3,
    waveformSmoothness: 0.5,
    staticNoise: 0.0,
    burstCount: 2,
    road: false,
    radio: false,
    scanlines: false,
    silhouettes: false
  },
  phonk: {
    label: 'PHONK MODE',
    tagline: 'Aggressive energy',
    palette: ['#ff0000', '#aa00ff', '#ff3333', '#cc00cc'],
    glowColor: '#ff0000',
    background: ['#140000', '#240000', '#340000'],
    analyserSmoothing: 0.4,
    beatScaleBoost: 0.08,
    beatFlashDuration: 60,
    beatCooldownMax: 6,
    barSharpness: 1.5,
    lineWidth: 5.0,
    glowIntensity: 1.5,
    amplitude: 1.1,
    animationSpeed: 1.5,
    bgParticleCount: 80,
    bgParticleSpeed: 1.8,
    particleTrail: 0.05,
    waveformSmoothness: 0.05,
    staticNoise: 0.1,
    burstCount: 30,
    road: false,
    radio: false,
    scanlines: true,
    silhouettes: false
  }
};

const state = {
  threeVortexSupported: true,
  threeVortexInitialized: false,
  threeVortexScene: null,
  threeVortexCamera: null,
  threeVortexRenderer: null,
  threeVortexComposer: null,
  threeVortexData: null,

  audioCtx: null,
  analyser: null,
  source: null,
  stream: null,
  fftSize: 2048,
  bufferLength: 0,
  freqData: null,
  timeData: null,
  audioSource: 'mic',
  running: false,
  paused: false,
  animFrameId: null,
  mode: 'bars',
  theme: 'classic',
  sensitivity: 0.7,
  showBgFx: true,
  autoCycle: false,
  bassMode: true,
  beatThreshold: 160,
  beatCooldown: 0,
  beatCooldownMax: THEMES.classic.beatCooldownMax,
  beatActive: false,
  beatScale: 1,
  colorHue: 0,
  gradientT: 0,
  radialAngle: 0,
  energy: 0,
  energySmoothed: 0,
  bgCircleRadiusSmoothed: 0,
  bassSmoothed: 0,
  particles: [],
  bgParticles: [],
  bursts: [],
  vizParticles: [],
  roadOffset: 0,
  themePulse: 0,
  transitionTimer: null,
  idleFrameId: null,
  miniWindow: null,
  currentChillVideo: Math.random() < 0.5 ? 0 : 1,
  bgImageCache: {},
  currentBgImg: null,
  pipWindow: null,
  pipCtx: null,
  pipCanvas: null,
  customBgMediaUrl: null,
  customBgMediaType: null,
  visualizer: null,
  presets: null,
  presetKeys: [],
  bcLastCycle: 0,
  vortexQuality: 'low',
  vortexLoadAvg: 0,
  vortexGeometryCache: new Map()
};

const canvas = document.getElementById('viz-canvas');
const ctx = canvas.getContext('2d');
const bgCanvas = document.getElementById('bg-canvas');
const bgCtx = bgCanvas.getContext('2d');
const miniCanvas = document.getElementById('mini-canvas');
const miniCtx = miniCanvas.getContext('2d');
const beatFlash = document.getElementById('beat-flash');
const energyFill = document.getElementById('energy-fill');
const btnStart = document.getElementById('btn-start');
const btnPause = document.getElementById('btn-pause');
const btnFullscreen = document.getElementById('btn-fullscreen');
const btnScreenshot = document.getElementById('btn-screenshot');
const btnMini = document.getElementById('btn-mini');
const themeNameEl = document.getElementById('theme-name');
const themeTaglineEl = document.getElementById('theme-tagline');
const modeButtons = document.querySelectorAll('.mode-btn');
const themeButtons = document.querySelectorAll('.theme-btn');
const sourceButtons = document.querySelectorAll('.source-btn');
const sensitivitySlider = document.getElementById('sensitivity-slider');
const sensitivityVal = document.getElementById('sensitivity-val');
const toggleBg = document.getElementById('toggle-bg');
const toggleAutocycle = document.getElementById('toggle-autocycle');
const toggleBass = document.getElementById('toggle-bass');
const fileInput = document.getElementById('file-input');
const themeBg = document.getElementById('theme-bg');
const themeVideo = document.getElementById('theme-video');
const themeImage = document.getElementById('theme-image');
const audioEl = document.getElementById('audio-element');
const filePlayer = document.getElementById('file-player');
const filePlayerName = document.getElementById('file-player-name');
const fpPlayPause = document.getElementById('fp-playpause');
const fpProgressBar = document.getElementById('fp-progress-bar');
const fpProgressWrap = document.getElementById('fp-progress-wrap');
const fpTime = document.getElementById('fp-time');
const sourceBadge = document.getElementById('source-badge');
const sourceBadgeIcon = document.getElementById('source-badge-icon');
const sourceBadgeText = document.getElementById('source-badge-text');
const miniOverlayEl = document.getElementById('mini-overlay');
const miniCloseBtn = document.getElementById('mini-close');
const miniPipBtn = document.getElementById('mini-pip-btn');
const miniSourceLabel = document.getElementById('mini-source-label');

function applyIntroTitleMobileFix() {
  const title = document.getElementById('intro-title');
  if (!title) return;

  if (window.innerWidth <= 600) {
    title.style.fontSize = Math.min(window.innerWidth * 0.11, 42) + 'px';
    title.style.letterSpacing = '0.3rem';
    title.style.paddingLeft = '0.3rem';
    title.style.marginLeft = '0';
    title.style.background = 'transparent';
  }

  if (window.innerWidth <= 480) {
    title.style.fontSize = Math.min(window.innerWidth * 0.09, 32) + 'px';
    title.style.letterSpacing = '0.2rem';
  }
}

// Pre-allocated vortex ring buffers — declared once at module level to avoid
// per-frame GC pressure inside drawVortex.
const _vortexPrevX = new Float32Array(64);
const _vortexPrevY = new Float32Array(64);
const _vortexCurrX = new Float32Array(64);
const _vortexCurrY = new Float32Array(64);

function themeConfig() {
  return THEMES[state.theme] || THEMES.classic;
}

function resizeCanvas() {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const w = window.innerWidth;
  const h = window.innerHeight;
  canvas.width = bgCanvas.width = w;
  canvas.height = bgCanvas.height = h;

  const bcCanvas = document.getElementById('butterchurn-canvas');
  if (bcCanvas) {
    bcCanvas.width = w * dpr;
    bcCanvas.height = h * dpr;
  }

  if (state.visualizer) {
    // Tell butterchurn the actual pixel dimensions for rendering
    state.visualizer.setRendererSize(w * dpr, h * dpr);
  }
  
  if (typeof resizeThreeVortex === 'function') {
    resizeThreeVortex();
  }
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function hexToRgb(hex) {
  const clean = hex.replace('#', '');
  const value = clean.length === 3
    ? clean.split('').map((part) => part + part).join('')
    : clean;
  const int = parseInt(value, 16);
  return {
    r: (int >> 16) & 255,
    g: (int >> 8) & 255,
    b: int & 255
  };
}

function getThemeGlowRGB(theme) {
  if (state.autoCycle && state.theme !== 'bw') {
    const h = state.colorHue;
    const s = 1;
    const l = 0.68;
    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs((h / 60) % 2 - 1));
    const m = l - c / 2;
    let r = 0, g = 0, b = 0;
    if (0 <= h && h < 60) { r = c; g = x; b = 0; }
    else if (60 <= h && h < 120) { r = x; g = c; b = 0; }
    else if (120 <= h && h < 180) { r = 0; g = c; b = x; }
    else if (180 <= h && h < 240) { r = 0; g = x; b = c; }
    else if (240 <= h && h < 300) { r = x; g = 0; b = c; }
    else { r = c; g = 0; b = x; }
    return {
      r: Math.round((r + m) * 255),
      g: Math.round((g + m) * 255),
      b: Math.round((b + m) * 255)
    };
  }
  return hexToRgb(theme.glowColor);
}

function getThemeGlowColor(theme) {
  if (state.autoCycle && state.theme !== 'bw') {
    return `hsla(${state.colorHue}, 100%, 68%, 1)`;
  }
  return theme.glowColor;
}

function extractColorFromMedia(mediaElement) {
  try {
    const c = document.createElement('canvas');
    const cx = c.getContext('2d');
    c.width = 64;
    c.height = 64;
    cx.drawImage(mediaElement, 0, 0, 64, 64);
    const data = cx.getImageData(0, 0, 64, 64).data;

    let r = 0, g = 0, b = 0, count = 0;
    for (let i = 0; i < data.length; i += 4) {
      if (data[i+3] > 0) {
         r += data[i];
         g += data[i+1];
         b += data[i+2];
         count++;
      }
    }
    if (count === 0) return '#00ffcc';

    r = Math.floor(r / count);
    g = Math.floor(g / count);
    b = Math.floor(b / count);

    const max = Math.max(r, g, b);
    if (max < 150 && max > 0) {
      const scale = 255 / max;
      r = Math.min(255, Math.floor(r * scale));
      g = Math.min(255, Math.floor(g * scale));
      b = Math.min(255, Math.floor(b * scale));
    }

    const toHex = (n) => n.toString(16).padStart(2, '0');
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  } catch(e) {
    return '#00ffcc';
  }
}

function updateCustomThemeColor(hex) {
  const custom = THEMES.custom;
  custom.glowColor = hex;
  custom.palette[0] = hex;

  const r = parseInt(hex.slice(1,3), 16);
  const g = parseInt(hex.slice(3,5), 16);
  const b = parseInt(hex.slice(5,7), 16);

  const toHex = (r,g,b) => `#${Math.min(255,Math.max(0,Math.floor(r))).toString(16).padStart(2,'0')}${Math.min(255,Math.max(0,Math.floor(g))).toString(16).padStart(2,'0')}${Math.min(255,Math.max(0,Math.floor(b))).toString(16).padStart(2,'0')}`;

  custom.palette[1] = toHex(r*0.8, g*1.2, b*1.2);
  custom.palette[2] = toHex(r*0.6, g*0.8, b*1.5);
  custom.palette[3] = toHex(r*0.4, g*0.6, b*0.8);

  custom.background[0] = toHex(r*0.02, g*0.02, b*0.02);
  custom.background[1] = toHex(r*0.06, g*0.06, b*0.06);
  custom.background[2] = toHex(r*0.1,  g*0.1,  b*0.1);

  if (state.theme === 'custom') {
    document.body.style.setProperty('--acc1', hex);
    document.body.style.setProperty('--glow', `rgba(${r}, ${g}, ${b}, 0.3)`);
    document.body.style.setProperty('--glow-hi', `rgba(${r}, ${g}, ${b}, 0.6)`);
    document.body.style.setProperty('--bg', custom.background[0]);
    document.body.style.setProperty('--bg-soft', custom.background[1]);
    document.body.style.setProperty('--panel', `rgba(${r*0.08}, ${g*0.08}, ${b*0.08}, 0.84)`);

    applyTheme('custom', true);

    // Force vortex to re-apply the new custom color immediately
    if (state.threeVortexData) {
      state.threeVortexData._lastAppliedTheme = null;
    }
  }
  syncPipColors();
  const cp = document.getElementById('custom-color-picker');
  if (cp) cp.value = hex;
}

function rgbToHsl(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0, l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h *= 60;
  }
  return { h, s: s * 100, l: l * 100 };
}

function updateMilkdropFilter(bcCanvas) {
  const oldOverlay = document.getElementById('milkdrop-tint');
  if (oldOverlay) oldOverlay.remove();

  // If Auto Color is enabled, show all color combinations by cycling hues
  if (state.autoCycle) {
    bcCanvas.style.filter = `hue-rotate(${state.colorHue}deg) saturate(1.5) contrast(1.1) brightness(1.1)`;
    return;
  }

  // Exact color combinations as per theme identities
  switch (state.theme) {
    case 'bw':
      // Black & White combinations
      bcCanvas.style.filter = 'grayscale(100%) contrast(1.4) brightness(1.1)';
      break;
    case 'classic':
      // Golden color combinations (Warm amber)
      bcCanvas.style.filter = 'sepia(1) saturate(1.8) hue-rotate(-10deg) contrast(1.1) brightness(1.05)';
      break;
    case 'chill':
      // Purple color combinations
      bcCanvas.style.filter = 'sepia(1) saturate(3) hue-rotate(240deg) contrast(1.05) brightness(1.1)';
      break;
    case 'memory':
      // Blue color combinations
      bcCanvas.style.filter = 'sepia(1) saturate(3) hue-rotate(185deg) contrast(1.05) brightness(1.1)';
      break;
    case 'rock':
      // Pink color combinations
      bcCanvas.style.filter = 'sepia(1) saturate(3) hue-rotate(290deg) contrast(1.1) brightness(1.1)';
      break;
    case 'study':
      // Yellow color combinations
      bcCanvas.style.filter = 'sepia(1) saturate(2) hue-rotate(15deg) contrast(1.1) brightness(1.1)';
      break;
    case 'phonk':
      // Red color combinations
      bcCanvas.style.filter = 'sepia(1) saturate(5) hue-rotate(330deg) contrast(1.2) brightness(1.0)';
      break;
    case 'custom': {
      // Color changes as per user chosen color
      const customHex = themeConfig().glowColor || '#00ffcc';
      const rgb = hexToRgb(customHex);
      const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
      // Map HSL to CSS filter shifts
      const hueShift = Math.round(hsl.h - 40 + 360) % 360;
      const satVal = Math.max(1.5, hsl.s / 30);
      bcCanvas.style.filter = `sepia(1) saturate(${satVal}) hue-rotate(${hueShift}deg) contrast(1.05) brightness(1.1)`;
      break;
    }
    default:
      bcCanvas.style.filter = 'none';
      break;
  }
}

function updateModeVisibility() {
  const isMilkdrop = state.mode === 'milkdrop';
  const isVortex   = state.mode === 'vortex';
  const showBc     = isMilkdrop;

  document.body.classList.toggle('milkdrop-mode', isMilkdrop);
  document.body.classList.toggle('vortex-mode', isVortex);

  const threeCanvas = document.getElementById('three-canvas');
  if (threeCanvas) {
    if (isVortex && state.threeVortexSupported) {
      threeCanvas.style.display = 'block';
    } else {
      threeCanvas.style.display = 'none';
    }
  }

  const bcCanvas = document.getElementById('butterchurn-canvas');
  if (bcCanvas) {
    bcCanvas.style.opacity = showBc ? '1' : '0';
    bcCanvas.style.zIndex = '5';
    if (showBc) {
      updateMilkdropFilter(bcCanvas);
    } else {
      bcCanvas.style.filter = '';
    }
  }
}


function mix(a, b, t) {
  return a + (b - a) * t;
}

function paletteColor(t, alpha = 1) {
  const theme = themeConfig();
  if (state.autoCycle && state.theme !== 'bw') {
    const hue = (state.colorHue + t * 180) % 360;
    return `hsla(${hue}, 100%, 68%, ${alpha})`;
  }

  let palette = theme.palette;
  if (state.theme === 'chill' && state.mode === 'bars') {
    palette = ['#e066ff', '#bc20ff', '#8b00ff', '#c738ff'];
  }

  const scaled = clamp(t, 0, 0.9999) * (palette.length - 1);
  const index = Math.floor(scaled);
  const next = Math.min(palette.length - 1, index + 1);
  const localT = scaled - index;
  const a = hexToRgb(palette[index]);
  const b = hexToRgb(palette[next]);
  const r = Math.round(mix(a.r, b.r, localT));
  const g = Math.round(mix(a.g, b.g, localT));
  const bCh = Math.round(mix(a.b, b.b, localT));
  return `rgba(${r}, ${g}, ${bCh}, ${alpha})`;
}

function spectralLinear(c, x0, y0, x1, y1, alpha = 1) {
  const gradient = c.createLinearGradient(x0, y0, x1, y1);
  for (let i = 0; i <= 12; i += 1) {
    gradient.addColorStop(i / 12, paletteColor(i / 12, alpha));
  }
  return gradient;
}

function glow(c, color, blur, drawFn) {
  c.save();
  c.shadowColor = color;
  c.shadowBlur = Math.max(0, blur);
  drawFn();
  c.restore();
}

function ensureCtx() {
  if (!state.audioCtx || state.audioCtx.state === 'closed') {
    state.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    state.analyser = state.audioCtx.createAnalyser();
    state.analyser.fftSize = state.fftSize;
    state.analyser.smoothingTimeConstant = 0.85;
    state.bufferLength = state.analyser.frequencyBinCount;
    state.freqData = new Uint8Array(state.bufferLength);
    state.timeData = new Uint8Array(state.analyser.fftSize);

    if (window.butterchurn && window.butterchurnPresets) {
      const bcCanvas = document.getElementById('butterchurn-canvas');
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = window.innerWidth;
      const h = window.innerHeight;

      // Scale canvas for high-DPI sharpness
      bcCanvas.width = w * dpr;
      bcCanvas.height = h * dpr;

      // Force preserveDrawingBuffer: true so we can copy the WebGL canvas to the Picture-in-Picture canvas
      try {
        bcCanvas.getContext('webgl2', { preserveDrawingBuffer: true });
      } catch (e) {
        try {
          bcCanvas.getContext('webgl', { preserveDrawingBuffer: true });
        } catch (err) {}
      }

      // Use pixelRatio:1 since we are manually scaling the canvas dimensions above
      state.visualizer = butterchurn.default.createVisualizer(state.audioCtx, bcCanvas, {
        width: w * dpr,
        height: h * dpr,
        pixelRatio: 1,
        textureRatio: 1
      });
      state.visualizer.connectAudio(state.analyser);
      state.presets = butterchurnPresets.getPresets();
      state.presetKeys = Object.keys(state.presets);
      loadThemePreset(state.theme);
    }
  }
  if (state.audioCtx.state === 'suspended') {
    state.audioCtx.resume();
  }
  applyTheme(state.theme, true);
}

function loadThemePreset(themeName) {
  if (!state.visualizer || !state.presets) return;

  // Use the FULL preset pool - no keyword restrictions that cause white screens / repeated patterns.
  const blacklistRegex = /unknown|blank|test\b|untitled|empty/i;
  let pool = state.presetKeys.filter(k => !blacklistRegex.test(k));
  if (pool.length === 0) pool = state.presetKeys;

  let blendTime = 2.5;

  // Avoid picking the same preset twice in a row
  let attempts = 0, randomKey;
  do {
    randomKey = pool[Math.floor(Math.random() * pool.length)];
    attempts++;
  } while (randomKey === state.lastPresetKey && attempts < 10);
  state.lastPresetKey = randomKey;

  state.visualizer.loadPreset(state.presets[randomKey], blendTime);
}

function disconnectSource() {
  try {
    if (state.source) {
      state.source.disconnect();
    }
  } catch (error) {
    void error;
  }
  state.source = null;
  if (state.stream) {
    state.stream.getTracks().forEach((track) => track.stop());
    state.stream = null;
  }
  if (state.dummyAudio) {
    state.dummyAudio.srcObject = null;
  }
}

async function initMic() {
  try {
    ensureCtx();
    disconnectSource();
    state.stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
    state.source = state.audioCtx.createMediaStreamSource(state.stream);
    state.source.connect(state.analyser);
    badge('MIC', 'MIC');
    return true;
  } catch (error) {
    showError(`Microphone unavailable: ${error.message}`);
    return false;
  }
}

function initFile(file) {
  return new Promise((resolve) => {
    ensureCtx();
    disconnectSource();
    audioEl.src = URL.createObjectURL(file);
    audioEl.load();
    if (!audioEl._src || audioEl._src.context !== state.audioCtx) {
      try {
        audioEl._src = state.audioCtx.createMediaElementSource(audioEl);
      } catch (error) {
        void error;
      }
    }
    state.source = audioEl._src;
    if (state.source) {
      state.source.connect(state.analyser);
      state.analyser.connect(state.audioCtx.destination);
    }
    audioEl.oncanplay = () => {
      audioEl.play();
      filePlayerName.textContent = file.name.replace(/\.[^/.]+$/, '');
      filePlayer.classList.remove('hidden');
      badge('FILE', 'FILE');
      state.currentChillVideo = state.currentChillVideo === 0 ? 1 : 0;
      if (state.theme === 'chill') applyTheme('chill', true);
      resolve(true);
    };
    audioEl.onerror = () => {
      showError('Cannot decode the selected file.');
      resolve(false);
    };
  });
}

async function initScreen() {
  try {
    ensureCtx();
    disconnectSource();
    showToast('Select a browser tab and enable tab audio.');
    state.stream = await navigator.mediaDevices.getDisplayMedia({
      video: {
        width: { ideal: 1280, max: 1920 },
        height: { ideal: 720, max: 1080 },
        frameRate: { ideal: 30, max: 60 }
      },
      audio: {
        echoCancellation: false,
        noiseSuppression: false,
        autoGainControl: false,
        channelCount: 2,
        sampleRate: 48000,
        sampleSize: 16
      }
    });
    const audioTracks = state.stream.getAudioTracks();
    if (!audioTracks.length) {
      showError('No audio track found. Enable tab audio when sharing.');
      state.stream.getTracks().forEach((track) => track.stop());
      state.stream = null;
      return false;
    }
    state.source = state.audioCtx.createMediaStreamSource(new MediaStream(audioTracks));
    state.source.connect(state.analyser);

    // Prevent Chrome from suspending the stream when there's no audio output
    if (!state.dummyAudio) {
      state.dummyAudio = new Audio();
      state.dummyAudio.muted = true;
    }
    state.dummyAudio.srcObject = state.stream;
    state.dummyAudio.play().catch(() => {});

    state.stream.getVideoTracks()[0]?.addEventListener('ended', () => {
      if (state.audioSource === 'screen' && state.running) {
        showToast('Screen sharing ended.');
        stopAll();
        resetButton();
      }
    });
    badge('SCR', 'SCREEN');
    return true;
  } catch (error) {
    showError(error.name === 'NotAllowedError' ? 'Screen capture cancelled.' : `Screen capture failed: ${error.message}`);
    return false;
  }
}

async function switchSource(mode) {
  if (state.running) {
    stopAll();
  }
  state.audioSource = mode;
  updateStartButtonLabel();
  if (mode !== 'file') {
    filePlayer.classList.add('hidden');
    audioEl.pause();
    try {
      state.analyser?.disconnect(state.audioCtx?.destination);
    } catch (error) {
      void error;
    }
  }
}

async function startVisualizer() {
  let ok = false;
  if (state.audioSource === 'mic') {
    ok = await initMic();
  } else if (state.audioSource === 'file') {
    if (!audioEl.src || audioEl.src === location.href) {
      fileInput.click();
      return;
    }
    ensureCtx();
    disconnectSource();
    state.source = audioEl._src;
    if (state.source) {
      state.source.connect(state.analyser);
      state.analyser.connect(state.audioCtx.destination);
      audioEl.play();
      filePlayer.classList.remove('hidden');
      fpPlayPause.textContent = 'PAUSE';
      badge('FILE', 'FILE');
      ok = true;
    }
  } else {
    ok = await initScreen();
  }

  if (!ok) {
    resetButton();
    return;
  }

  state.running = true;
  state.paused = false;
  if (state.idleFrameId) {
    cancelAnimationFrame(state.idleFrameId);
    state.idleFrameId = null;
  }
  initAmbientParticles();
  initBgParticles();
  if (!state.animFrameId) {
    renderLoop();
  }
  btnStart.innerHTML = '<span class="btn-icon">STOP</span><span>Stop</span>';
  btnStart.classList.add('active');
  btnStart.disabled = false;
  btnPause.disabled = false;
  btnPause.textContent = 'PAUSE';
  hideStatus();
  updateMiniLabel();
}

function stopAll() {
  if (state.animFrameId) {
    cancelAnimationFrame(state.animFrameId);
    state.animFrameId = null;
  }
  disconnectSource();
  try {
    state.analyser?.disconnect();
  } catch (error) {
    void error;
  }
  audioEl.pause();
  state.running = false;
  state.paused = false;
  sourceBadge.classList.add('hidden');
  updateMiniLabel();
  if (!state.idleFrameId) {
    idleAnimation();
  }
}

function detectBeat(freqData) {
  const theme = themeConfig();
  const bins = Math.floor(state.bufferLength * 0.08);
  let total = 0;
  for (let i = 0; i < bins; i += 1) {
    total += freqData[i];
  }
  const score = (total / bins) * state.sensitivity;
  if (state.beatCooldown > 0) {
    state.beatCooldown -= 1;
    state.beatActive = false;
    return;
  }

  if (score > state.beatThreshold) {
    state.beatActive = true;
    state.beatCooldown = theme.beatCooldownMax;
    beatEffect();
    return;
  }

  state.beatActive = false;
}

function beatEffect() {
  const theme = themeConfig();
  beatFlash.classList.add('flash');
  window.setTimeout(() => beatFlash.classList.remove('flash'), theme.beatFlashDuration);
  state.beatScale = 1 + theme.beatScaleBoost;
  state.themePulse = 1;
  spawnBursts(theme.burstCount);
  miniOverlayEl.style.boxShadow = `0 0 40px ${paletteColor(0.35, 0.45)}, 0 10px 50px rgba(0, 0, 0, 0.75)`;
  window.setTimeout(() => {
    miniOverlayEl.style.boxShadow = '';
  }, 140);
}

function averageEnergy(freqData) {
  let sum = 0;
  for (let i = 0; i < state.bufferLength; i += 1) {
    sum += freqData[i];
  }
  return Math.min(1, (sum / state.bufferLength / 255) * state.sensitivity * 3);
}

function renderLoop(fromWorker = false) {
  if (!state.running) {
    return;
  }

  const frameStart = performance.now();

  if (!fromWorker) {
    state.animFrameId = requestAnimationFrame(() => renderLoop(false));
  }

  if (document.hidden && !fromWorker) {
    return; // Let the background worker handle it to avoid double rendering
  }

  if (state.paused) {
    return;
  }

  state.analyser.getByteFrequencyData(state.freqData);
  state.analyser.getByteTimeDomainData(state.timeData);

  const theme = themeConfig();
  detectBeat(state.freqData);
  state.energy = averageEnergy(state.freqData);
  state.energySmoothed += (state.energy - state.energySmoothed) * 0.12;

  let bassSum = 0;
  // Use only the first 8 bins (~180Hz) to capture precise sub-bass hits instead of mid-range frequencies.
  // This eliminates the "muddy" or delayed feel.
  let bassBins = Math.min(8, state.bufferLength);
  for(let i = 0; i < bassBins; i++) {
      bassSum += state.freqData[i];
  }
  let rawBass = (bassSum / bassBins / 255) * state.sensitivity;

  if (typeof state.bassVelocity === 'undefined') state.bassVelocity = 0;

  // Spring physics for true bouncy effect
  const stiffness = 0.85; // High stiffness snaps instantly to the beat, removing delay
  const damping = 0.4;   // Quick settle for a snappy bounce

  const force = (rawBass - state.bassSmoothed) * stiffness;
  state.bassVelocity += force;
  state.bassVelocity *= damping;
  state.bassSmoothed += state.bassVelocity;
  state.bassSmoothed = Math.max(0, state.bassSmoothed); // Prevent collapsing inward

  const pumpScale = state.bassMode ? 1 + (state.bassSmoothed * 0.2) : 1;
  state.glowMultiplier = state.bassMode ? 1 + (state.bassSmoothed * 1.2) : 1;

  if (state.bassMode && state.mode !== 'vortex') {
      document.body.style.transform = `scale(${1 + (state.bassSmoothed * 0.05)})`;
  } else {
      document.body.style.transform = '';
  }

  energyFill.style.height = `${state.energySmoothed * 100}%`;
  state.beatScale += (1 - state.beatScale) * 0.18;
  state.themePulse *= 0.92;
  state.gradientT = (state.gradientT + 0.0012 * theme.animationSpeed) % 1;
  state.radialAngle = (state.radialAngle + 0.005 * theme.animationSpeed) % (Math.PI * 2);
  state.roadOffset += theme.animationSpeed * (0.8 + state.energySmoothed * 4);
  if (state.autoCycle) {
    state.colorHue = (state.colorHue + theme.animationSpeed * 1.4) % 360;
    const bcCanvas = document.getElementById('butterchurn-canvas');
    if (bcCanvas && state.mode === 'milkdrop') {
      updateMilkdropFilter(bcCanvas);
    }
  }

  if (state.mode === 'milkdrop' && state.visualizer) {
    if (!state.bcLastCycle || performance.now() - state.bcLastCycle > 9000) {
      loadThemePreset(state.theme);
      state.bcLastCycle = performance.now();
    }
    state.visualizer.render();

    if (state._wasNotMilkdrop) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      state._wasNotMilkdrop = false;
    }
  } else {
    state._wasNotMilkdrop = true;
    const width = canvas.width;
    const height = canvas.height;
    const isVortex = state.mode === 'vortex';
    ctx.save();
    ctx.translate(width / 2, height / 2);
    if (isVortex) {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, width, height);
    } else {
      ctx.scale(state.beatScale * pumpScale, state.beatScale * pumpScale);
    }
    ctx.translate(-width / 2, -height / 2);
    if (isVortex) {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, width, height);
    } else {
      drawBackground(ctx, width, height);
      if (state.showBgFx) {
        drawAmbientOverlay(ctx, width, height);
      }
    }
    drawMode(ctx, width, height);
    if (!isVortex) {
      drawThemeForeground(ctx, width, height);
    }
    ctx.restore();
  }

  if (state.showBgFx && state.mode !== 'vortex') {
    drawBgCanvas();
  } else {
    bgCtx.clearRect(0, 0, bgCanvas.width, bgCanvas.height);
  }
  const pipVideo = document.getElementById('pip-video');
  const isPipActive = pipVideo && document.pictureInPictureElement === pipVideo;

  if (!miniOverlayEl.classList.contains('hidden') || pipVideo) {
    renderPip(miniCtx, miniCanvas.width, miniCanvas.height);
    if (state.bassMode) {
      miniCanvas.style.transform = `scale(${1 + (state.bassSmoothed * 0.05)})`;
    } else {
      miniCanvas.style.transform = '';
    }
  }

  if (state.pipWindow && state.pipCtx && state.pipCanvas) {
    renderPip(state.pipCtx, state.pipCanvas.width, state.pipCanvas.height);
    if (state.bassMode) {
      state.pipCanvas.style.transform = `scale(${1 + (state.bassSmoothed * 0.05)})`;
    } else {
      state.pipCanvas.style.transform = '';
    }
  }

  syncPopup();

  if (state.mode === 'vortex') {
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
  }

  if (state.audioSource === 'file' && audioEl.duration) {
    const pct = (audioEl.currentTime / audioEl.duration) * 100;
    fpProgressBar.style.width = `${pct}%`;
    fpTime.textContent = `${fmt(audioEl.currentTime)} / ${fmt(audioEl.duration)}`;
  }
}

function drawImageCover(ctx, img, cw, ch) {
  let imgW = img.naturalWidth || img.videoWidth || img.width;
  let imgH = img.naturalHeight || img.videoHeight || img.height;
  if (!imgW || !imgH) return;

  const imgRatio = imgW / imgH;
  const canvasRatio = cw / ch;
  let drawWidth, drawHeight, offsetX, offsetY;

  if (imgRatio > canvasRatio) {
    drawHeight = ch;
    drawWidth = ch * imgRatio;
    offsetX = (cw - drawWidth) / 2;
    offsetY = 0;
  } else {
    drawWidth = cw;
    drawHeight = cw / imgRatio;
    offsetX = 0;
    offsetY = (ch - drawHeight) / 2;
  }

  ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
}

function syncPipColors() {
  if (!state.pipWindow) return;
  const computed = getComputedStyle(document.body);
  const root = state.pipWindow.document.documentElement;
  const vars = ['--bg', '--bg-soft', '--panel', '--border', '--text', '--acc1', '--acc2', '--glow-hi'];
  vars.forEach(v => {
    let val = computed.getPropertyValue(v).trim();
    if (val) root.style.setProperty(v, val);
  });
}

function drawBackground(c, width, height) {
  const theme = themeConfig();
  const bg = c.createLinearGradient(0, 0, 0, height);
  const c1 = hexToRgb(theme.background[0]);
  const c2 = hexToRgb(theme.background[1]);
  const c3 = hexToRgb(theme.background[2]);

  if (state.mode === 'vortex') {
    const topGlow = state.autoCycle && state.theme !== 'bw'
      ? paletteColor(0.12, 0.2)
      : `rgba(${c1.r}, ${c1.g}, ${c1.b}, 0.18)`;
    const midGlow = state.autoCycle && state.theme !== 'bw'
      ? paletteColor(0.42, 0.16)
      : `rgba(${c2.r}, ${c2.g}, ${c2.b}, 0.12)`;
    bg.addColorStop(0, topGlow);
    bg.addColorStop(0.55, midGlow);
    bg.addColorStop(1, `rgba(${c3.r}, ${c3.g}, ${c3.b}, 0.95)`);
  } else {
    bg.addColorStop(0, `rgba(${c1.r}, ${c1.g}, ${c1.b}, 0.7)`);
    bg.addColorStop(0.5, `rgba(${c2.r}, ${c2.g}, ${c2.b}, 0.6)`);
    bg.addColorStop(1, `rgba(${c3.r}, ${c3.g}, ${c3.b}, 0.8)`);
  }

  c.clearRect(0, 0, width, height);

  if (c === miniCtx || c === state.pipCtx) {
    if (state.theme === 'chill' || state.theme === 'study') {
      if (themeVideo && themeVideo.readyState >= 2 && !themeVideo.paused) {
        drawImageCover(c, themeVideo, width, height);
      }
    } else if (state.theme === 'phonk' && themeImage && themeImage.complete && themeImage.naturalWidth > 0) {
      drawImageCover(c, themeImage, width, height);
    } else if (state.currentBgImg && state.currentBgImg.complete && state.currentBgImg.naturalWidth > 0) {
      drawImageCover(c, state.currentBgImg, width, height);
    }
  }

  c.fillStyle = bg;
  c.fillRect(0, 0, width, height);

  if (theme.label === 'CLASSIC MODE') {
    const glowDisc = c.createRadialGradient(width / 2, height * 0.5, 0, width / 2, height * 0.5, height * 0.58);
    glowDisc.addColorStop(0, 'rgba(255, 214, 126, 0.08)');
    glowDisc.addColorStop(0.65, 'rgba(92, 45, 15, 0.05)');
    glowDisc.addColorStop(1, 'rgba(0, 0, 0, 0.35)');
    c.fillStyle = glowDisc;
    c.fillRect(0, 0, width, height);
  } else if (theme.label === 'BLACK & WHITE') {
    c.fillStyle = `rgba(255, 255, 255, ${0.02 + Math.random() * 0.02})`;
    c.fillRect(0, 0, width, height);
  } else if (theme.label === 'ROCK MODE') {
    const stageLight = c.createRadialGradient(width * 0.5, height * 0.32, 0, width * 0.5, height * 0.32, width * 0.48);
    stageLight.addColorStop(0, 'rgba(255, 75, 125, 0.08)');
    stageLight.addColorStop(0.5, 'rgba(96, 156, 255, 0.05)');
    stageLight.addColorStop(1, 'rgba(0, 0, 0, 0)');
    c.fillStyle = stageLight;
    c.fillRect(0, 0, width, height);
  } else if (theme.road) {
    const moon = c.createRadialGradient(width * 0.75, height * 0.18, 0, width * 0.75, height * 0.18, height * 0.18);
    moon.addColorStop(0, 'rgba(212, 236, 255, 0.14)');
    moon.addColorStop(1, 'rgba(212, 236, 255, 0)');
    c.fillStyle = moon;
    c.fillRect(0, 0, width, height);
  }

  const vignette = c.createRadialGradient(width / 2, height / 2, height * 0.1, width / 2, height / 2, height * 0.86);
  vignette.addColorStop(0, 'rgba(0, 0, 0, 0)');
  vignette.addColorStop(0.64, 'rgba(0, 0, 0, 0.18)');
  vignette.addColorStop(1, 'rgba(0, 0, 0, 0.64)');
  c.fillStyle = vignette;
  c.fillRect(0, 0, width, height);
}

function initBgParticles() {
  const theme = themeConfig();
  state.bgParticles = [];
  for (let i = 0; i < theme.bgParticleCount; i += 1) {
    state.bgParticles.push(makeBgParticle(true));
  }
}

function makeBgParticle(randomY = false) {
  const theme = themeConfig();
  const width = bgCanvas.width;
  const height = bgCanvas.height;
  const types = theme.label === 'BLACK & WHITE'
    ? ['noise']
    : theme.label === 'ROCK MODE'
      ? ['ember']
      : theme.road
        ? ['star', 'rain']
        : ['dust', 'streak'];
  const type = types[Math.floor(Math.random() * types.length)];
  return {
    type,
    x: Math.random() * width,
    y: randomY ? Math.random() * height : height + Math.random() * 30,
    size: Math.random() * (theme.road ? 2 : 3) + 0.5,
    speed: (Math.random() * 0.7 + 0.3) * theme.bgParticleSpeed,
    alpha: Math.random() * 0.4 + 0.05,
    drift: Math.random() * 0.8 - 0.4,
    hueT: Math.random()
  };
}

function drawBgCanvas() {
  const theme = themeConfig();
  const width = bgCanvas.width;
  const height = bgCanvas.height;
  bgCtx.clearRect(0, 0, width, height);

  if (theme.label === 'BLACK & WHITE') {
    drawStaticNoise(bgCtx, width, height);
  }

  for (let i = state.bgParticles.length - 1; i >= 0; i -= 1) {
    const particle = state.bgParticles[i];
    updateBgParticle(particle, width, height);
    if (particle.y < -20 || particle.y > height + 20 || particle.x < -20 || particle.x > width + 20) {
      state.bgParticles[i] = makeBgParticle(false);
      continue;
    }

    bgCtx.save();
    if (particle.type === 'noise') {
      bgCtx.fillStyle = `rgba(255, 255, 255, ${particle.alpha})`;
      bgCtx.fillRect(particle.x, particle.y, particle.size, particle.size);
    } else if (particle.type === 'rain') {
      bgCtx.strokeStyle = paletteColor(0.12 + particle.hueT * 0.7, particle.alpha * 0.75);
      bgCtx.lineWidth = 1;
      bgCtx.beginPath();
      bgCtx.moveTo(particle.x, particle.y);
      bgCtx.lineTo(particle.x - particle.drift * 8, particle.y + particle.size * 9);
      bgCtx.stroke();
    } else if (particle.type === 'ember') {
      bgCtx.fillStyle = paletteColor(particle.hueT, particle.alpha);
      bgCtx.shadowColor = paletteColor(particle.hueT, particle.alpha);
      bgCtx.shadowBlur = 12;
      bgCtx.beginPath();
      bgCtx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      bgCtx.fill();
    } else {
      bgCtx.fillStyle = paletteColor(particle.hueT, particle.alpha * (particle.type === 'dust' ? 0.45 : 0.28));
      bgCtx.beginPath();
      bgCtx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      bgCtx.fill();
    }
    bgCtx.restore();
  }
}

function drawStaticNoise(c, width, height) {
  const count = 180 + Math.floor(state.energySmoothed * 220);
  for (let i = 0; i < count; i += 1) {
    const x = Math.random() * width;
    const y = Math.random() * height;
    const alpha = Math.random() * 0.12 + 0.02;
    c.fillStyle = `rgba(255, 255, 255, ${alpha})`;
    c.fillRect(x, y, Math.random() * 2, Math.random() * 2);
  }
}

function updateBgParticle(particle, width, height) {
  const theme = themeConfig();
  const speedBoost = 1 + state.energySmoothed * (theme.label === 'ROCK MODE' ? 4 : 1.8);
  if (particle.type === 'noise') {
    particle.x += (Math.random() - 0.5) * 4;
    particle.y += (Math.random() - 0.5) * 4;
    return;
  }
  if (particle.type === 'rain') {
    particle.y += particle.speed * speedBoost * 1.7;
    particle.x += particle.drift * 0.7;
    return;
  }
  particle.y -= particle.speed * speedBoost;
  particle.x += particle.drift * speedBoost * 0.35;
  if (theme.road) {
    particle.y += 0.4;
  }
  if (particle.type === 'streak') {
    particle.x += Math.sin(state.gradientT * Math.PI * 2 + particle.hueT * 10) * 0.2;
  }
}

function initAmbientParticles() {
  state.particles = [];
  const count = themeConfig().label === 'ROCK MODE' ? 80 : 58;
  for (let i = 0; i < count; i += 1) {
    state.particles.push(makeAmbientParticle(true));
  }
}

function makeAmbientParticle(randomY = false) {
  const theme = themeConfig();
  const width = canvas.width;
  const height = canvas.height;
  return {
    x: Math.random() * width,
    y: randomY ? Math.random() * height : height + Math.random() * 20,
    vx: (Math.random() - 0.5) * 0.45,
    vy: -(Math.random() * 0.45 + 0.08),
    size: Math.random() * (theme.road ? 1.6 : 2.4) + 0.6,
    alpha: Math.random() * 0.22 + 0.05,
    life: 1,
    hueT: Math.random()
  };
}

function drawAmbientOverlay(c, width, height) {
  const theme = themeConfig();
  for (let i = state.particles.length - 1; i >= 0; i -= 1) {
    const particle = state.particles[i];
    particle.x += particle.vx + (Math.random() - 0.5) * theme.particleTrail;
    particle.y += particle.vy * (1 + state.energySmoothed);
    particle.life -= 0.002 + (theme.label === 'ROCK MODE' ? 0.001 : 0);
    particle.alpha = clamp(particle.life * 0.22, 0, 0.24);
    if (particle.life <= 0 || particle.y < -20 || particle.x < -20 || particle.x > width + 20) {
      state.particles[i] = makeAmbientParticle(false);
      continue;
    }
    c.save();
    if (theme.label === 'BLACK & WHITE') {
      c.fillStyle = `rgba(255, 255, 255, ${particle.alpha * 0.55})`;
      c.fillRect(particle.x, particle.y, particle.size, particle.size * 3);
    } else {
      c.fillStyle = paletteColor(particle.hueT, particle.alpha);
      c.beginPath();
      c.arc(particle.x, particle.y, particle.size * (1 + state.energySmoothed * 0.4), 0, Math.PI * 2);
      c.fill();
    }
    c.restore();
  }
  drawBursts(c);
}

function spawnBursts(count) {
  const width = canvas.width;
  const height = canvas.height;
  for (let i = 0; i < count; i += 1) {
    const angle = Math.random() * Math.PI * 2;
    const speed = 1 + Math.random() * (themeConfig().label === 'ROCK MODE' ? 6 : 3);
    state.bursts.push({
      x: width * (0.3 + Math.random() * 0.4),
      y: height * (0.28 + Math.random() * 0.38),
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      life: 1,
      size: Math.random() * 3 + 1,
      hueT: Math.random()
    });
  }
  while (state.bursts.length > 140) {
    state.bursts.shift();
  }
}

function drawBursts(c) {
  for (let i = state.bursts.length - 1; i >= 0; i -= 1) {
    const burst = state.bursts[i];
    burst.x += burst.vx;
    burst.y += burst.vy;
    burst.vx *= 0.97;
    burst.vy *= 0.97;
    burst.life -= 0.03;
    if (burst.life <= 0) {
      state.bursts.splice(i, 1);
      continue;
    }
    c.save();
    const alpha = burst.life * (themeConfig().label === 'ROCK MODE' ? 0.9 : 0.45);
    c.fillStyle = paletteColor(burst.hueT, alpha);
    c.beginPath();
    c.arc(burst.x, burst.y, burst.size * burst.life, 0, Math.PI * 2);
    c.fill();
    c.restore();
  }
}

function drawMode(c, width, height) {
  const bcCanvas = document.getElementById('butterchurn-canvas');
  if (state.mode === 'milkdrop') {
    if (bcCanvas.style.opacity !== '1') {
      bcCanvas.style.opacity = '1';
      bcCanvas.style.mixBlendMode = 'normal';
    }
    updateMilkdropFilter(bcCanvas);
    return;
  } else {
    if (bcCanvas.style.opacity !== '0') {
      bcCanvas.style.opacity = '0';
      bcCanvas.style.mixBlendMode = 'screen';
      bcCanvas.style.filter = '';
      const overlay = document.getElementById('milkdrop-tint');
      if (overlay) overlay.style.backgroundColor = 'transparent';
    }
  }

  switch (state.mode) {
    case 'bars':
      drawBars(c, width, height);
      break;
    case 'circle':
      drawRadial(c, width, height);
      break;
    case 'wave':
      drawWave(c, width, height);
      break;
    case 'vortex':
      drawVortex(c, width, height);
      break;
    case 'lyrics':
      break;
    default:
      drawBars(c, width, height);
  }
}

function getAmplitude(index, total) {
  const theme = themeConfig();
  const bin = Math.floor(Math.pow(index / total, 1.1) * state.bufferLength * 0.9);
  const raw = state.freqData[bin] / 255;
  return Math.pow(raw, theme.barSharpness) * theme.amplitude * state.sensitivity;
}

function drawBars(c, width, height) {
  const theme = themeConfig();
  const count = theme.label === 'BLACK & WHITE' ? 150 : 110;
  const gap = theme.label === 'BLACK & WHITE' ? 3 : 4;
  const barWidth = Math.max(1.2, (width - gap * (count - 1)) / count);
  const centerY = height * 0.52;
  const maxHeight = height * (theme.road ? 0.26 : 0.38);
  const cornerRadius = theme.label === 'BLACK & WHITE' ? 0 : Math.min(7, barWidth * 0.48);

  const isBW = theme.label === 'BLACK & WHITE';

  c.save();

  for (let i = 0; i < count; i += 1) {
    const amp = getAmplitude(i, count);
    const length = clamp(maxHeight * amp * 1.45 * (1 + (state.bassSmoothed || 0) * 0.5), isBW ? 3 : 4, maxHeight);
    const x = i * (barWidth + gap);

    if (isBW) {
      c.fillStyle = 'rgba(255, 255, 255, 0.86)';
      c.fillRect(x, centerY - length, barWidth, length * 2);
      if (state.beatActive && i % 8 === 0) {
        c.fillStyle = 'rgba(255, 255, 255, 0.9)';
        c.fillRect(x, centerY - length - 2, barWidth, 2);
      }
    } else {
      const colorFull = paletteColor(i / count, 1);
      const gradient = c.createLinearGradient(x, centerY - length, x, centerY + length);
      gradient.addColorStop(0, colorFull);
      gradient.addColorStop(0.5, paletteColor(i / count, 0.22));
      gradient.addColorStop(1, colorFull);

      c.globalCompositeOperation = 'screen';
      c.fillStyle = colorFull;

      let currentGlowInt = theme.glowIntensity;
      if (state.theme === 'chill') currentGlowInt = 1.2;

      c.globalAlpha = 0.15 * currentGlowInt;
      c.beginPath();
      roundRect(c, x - 4, centerY - length - 4, barWidth + 8, length * 2 + 8, cornerRadius + 2);
      c.fill();

      c.globalAlpha = 0.3 * currentGlowInt;
      c.beginPath();
      roundRect(c, x - 1.5, centerY - length - 1.5, barWidth + 3, length * 2 + 3, cornerRadius + 1);
      c.fill();

      c.globalCompositeOperation = 'source-over';
      c.globalAlpha = 1.0;

      c.fillStyle = gradient;
      c.beginPath();
      roundRect(c, x, centerY - length, barWidth, length * 2, cornerRadius);
      c.fill();
    }
  }

  c.strokeStyle = isBW
    ? 'rgba(255, 255, 255, 0.16)'
    : spectralLinear(c, 0, centerY, width, centerY, 0.32);
  c.lineWidth = isBW ? 1 : 1.6;
  c.beginPath();
  c.moveTo(0, centerY);
  c.lineTo(width, centerY);
  c.stroke();

  c.restore();
}

function getAudioIntensity() {
  if (!state.running || !state.freqData) return 0;

  let sum = 0;
  for (let i = 0; i < state.bufferLength; i++) {
    sum += state.freqData[i];
  }
  let avg = sum / state.bufferLength / 255;

  let bassSum = 0;
  let bassBins = Math.floor(state.bufferLength * 0.1);
  for(let i=0; i<bassBins; i++){
      bassSum += state.freqData[i];
  }
  let bassAvg = bassSum / bassBins / 255;

  return (avg * 0.4 + bassAvg * 0.6) * state.sensitivity;
}

function smoothAmplitude(prev, current) {
  return prev * 0.85 + current * 0.15;
}

function drawFluidLayer(c, cx, cy, baseRadius, multiplier, color, data, blur) {
  const bins = data.length;
  const points = [];

  for (let i = 0; i < bins; i++) {
    const angle = (Math.PI / 2) - (i / (bins - 1)) * Math.PI;
    const amp = Math.pow(data[i], 1.5) * multiplier * state.sensitivity * (1 + (state.bassSmoothed || 0) * 0.8);
    const r = baseRadius + amp;
    points.push({ x: cx + Math.cos(angle) * r, y: cy + Math.sin(angle) * r });
  }

  for (let i = bins - 1; i >= 0; i--) {
    const angle = (Math.PI / 2) + (i / (bins - 1)) * Math.PI;
    const amp = Math.pow(data[i], 1.5) * multiplier * state.sensitivity * (1 + (state.bassSmoothed || 0) * 0.8);
    const r = baseRadius + amp;
    points.push({ x: cx + Math.cos(angle) * r, y: cy + Math.sin(angle) * r });
  }

  const loopPoints = [...points, points[0], points[1]];

  c.save();
  c.fillStyle = color;
  if (blur > 0) {
    c.shadowColor = color;
    c.shadowBlur = blur;
  }

  c.beginPath();
  c.moveTo(loopPoints[0].x, loopPoints[0].y);
  drawSmoothPath(c, loopPoints, 0.5);
  c.closePath();

  c.moveTo(cx + baseRadius, cy);
  c.arc(cx, cy, baseRadius, 0, Math.PI * 2, false);

  c.fill();
  c.restore();
}

function drawReactiveBackgroundCircle(c, cx, cy, baseRadius, theme) {
  if (!state.running || !state.freqData) return;

  const bins = Math.min(90, state.bufferLength);
  const data = [];
  for (let i = 0; i < bins; i++) {
    data.push(state.freqData[i] / 255);
  }

  const beatBoost = state.beatActive ? 1.6 : 1.0;
  const maxAmp = baseRadius * 1.5 * beatBoost;

  const rgb = getThemeGlowRGB(theme);
  const r = Math.floor(Math.min(255, rgb.r * 1.3 + 40));
  const g = Math.floor(Math.min(255, rgb.g * 1.3 + 40));
  const b = Math.floor(Math.min(255, rgb.b * 1.3 + 40));

  const colorInner = `rgba(${Math.min(255, r+30)}, ${Math.min(255, g+30)}, ${Math.min(255, b+30)}, 0.95)`;
  const colorMid = `rgba(${r}, ${g}, ${b}, 0.75)`;
  const colorOuter = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.4)`;

  const glowMult = state.glowMultiplier || 1;

  c.save();
  if (theme.label !== 'BLACK & WHITE') {
    c.globalCompositeOperation = 'screen';
  }
  drawFluidLayer(c, cx, cy, baseRadius, maxAmp * 1.0, colorOuter, data, 50 * glowMult);
  drawFluidLayer(c, cx, cy, baseRadius, maxAmp * 0.6, colorMid, data, 25 * glowMult);
  if (theme.label !== 'BLACK & WHITE') {
    c.globalCompositeOperation = 'lighter';
  }
  drawFluidLayer(c, cx, cy, baseRadius, maxAmp * 0.3, colorInner, data, 10 * glowMult);
  c.restore();
}

function drawRadial(c, width, height) {
  const theme = themeConfig();
  const cx = width / 2;
  const cy = height / 2;
  const dim = Math.min(width, height);
  const ringRadius = dim * (theme.road ? 0.18 : 0.22);

  drawReactiveBackgroundCircle(c, cx, cy, ringRadius, theme);
  drawCenterOrb(c, cx, cy, ringRadius * 0.64, theme);
}

function drawRadialWave(c, cx, cy, radius, theme) {
  const points = Math.min(state.timeData.length, 512);
  const wavePoints = [];

  for (let i = 0; i <= points; i += 1) {
    const sample = state.timeData[i % points] / 128 - 1;
    const angle = (i / points) * Math.PI * 2 - Math.PI / 2 - state.radialAngle * 0.4;
    const wobble = sample * radius * 0.35 * state.sensitivity * (theme.label === 'BLACK & WHITE' ? 1.4 : 1.2) * (1 + (state.bassSmoothed || 0) * 1.8);
    const r = radius + wobble;
    wavePoints.push({ x: cx + Math.cos(angle) * r, y: cy + Math.sin(angle) * r });
  }

  const drawGlowingRing = (lineWidth, blur, alpha, color) => {
    c.save();
    if (!isBW) c.globalCompositeOperation = 'screen';
    c.beginPath();
    c.moveTo(wavePoints[0].x, wavePoints[0].y);
    for (let i = 1; i < wavePoints.length; i++) {
      c.lineTo(wavePoints[i].x, wavePoints[i].y);
    }
    c.closePath();
    c.strokeStyle = color;
    c.lineWidth = lineWidth + (blur * 0.8);
    c.lineCap = 'round';
    c.lineJoin = 'round';
    c.globalAlpha = alpha * 0.75;
    c.stroke();
    c.restore();
  };

  const isBW = theme.label === 'BLACK & WHITE';
  const baseColor = isBW ? 'rgba(255, 255, 255, 1)' : spectralLinear(c, cx - radius, cy, cx + radius, cy, 1);
  const glowColor = isBW ? 'rgba(255, 255, 255, 1)' : getThemeGlowColor(theme);

  drawGlowingRing(6, 35 * theme.glowIntensity, 0.5, glowColor);
  drawGlowingRing(3, 15 * theme.glowIntensity, 0.8, baseColor);
  drawGlowingRing(1.5, 5, 1.0, 'rgba(255, 255, 255, 0.95)');
}

function drawCenterOrb(c, cx, cy, radius, theme) {
  const isBW = theme.label === 'BLACK & WHITE';
  const glowRadius = radius * (2.4 + state.energySmoothed * 2.0);

  const orb = c.createRadialGradient(cx, cy, 0, cx, cy, glowRadius);
  if (isBW) {
    orb.addColorStop(0, 'rgba(255, 255, 255, 1)');
    orb.addColorStop(0.3, 'rgba(255, 255, 255, 0.8)');
    orb.addColorStop(0.6, 'rgba(200, 200, 200, 0.2)');
    orb.addColorStop(1, 'rgba(255, 255, 255, 0)');
  } else {
    const rgb = getThemeGlowRGB(theme);
    const hr = Math.floor(Math.min(255, rgb.r*1.5+100));
    const hg = Math.floor(Math.min(255, rgb.g*1.5+100));
    const hb = Math.floor(Math.min(255, rgb.b*1.5+100));
    const hotCore = `rgba(${hr}, ${hg}, ${hb}, 1)`;
    const midGlow = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.7)`;
    const outerGlow = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.15)`;

    orb.addColorStop(0, 'rgba(255, 255, 255, 1)');
    orb.addColorStop(0.12, hotCore);
    orb.addColorStop(0.4, midGlow);
    orb.addColorStop(0.7, outerGlow);
    orb.addColorStop(1, 'rgba(0, 0, 0, 0)');
  }

  c.save();
  if (!isBW) {
    c.globalCompositeOperation = 'screen';
  }
  c.fillStyle = orb;
  c.beginPath();
  c.arc(cx, cy, glowRadius, 0, Math.PI * 2);
  c.fill();
  c.restore();
}

function drawWave(c, width, height) {
  const theme = themeConfig();
  const centerY = height * (theme.road ? 0.56 : 0.5);

  const samples = Math.min(state.timeData.length, 256);
  const dataStep = state.timeData.length / samples;
  const step = width / (samples - 1);
  const points = [];
  const ampScale = height * (theme.label === 'ROCK MODE' ? 0.34 : theme.road ? 0.18 : 0.35);

  for (let i = 0; i < samples; i += 1) {
    const dataIndex = Math.floor(i * dataStep);
    const safeIndex = Math.min(dataIndex, state.timeData.length - 1);
    const sample = state.timeData[safeIndex] / 128 - 1;
    points.push({
      x: i * step,
      y: centerY + sample * ampScale * state.sensitivity * (1 + (state.bassSmoothed || 0) * 1.2)
    });
  }

  const isBW = theme.label === 'BLACK & WHITE';

  c.save();
  if (!isBW) {
    c.globalCompositeOperation = 'screen';
  }

  c.beginPath();
  c.moveTo(0, centerY);
  drawSmoothPath(c, points, theme.waveformSmoothness);
  c.lineTo(width, centerY);
  c.closePath();

  const fill = c.createLinearGradient(0, centerY - ampScale * 1.5, 0, centerY + ampScale * 1.5);
  if (isBW) {
    fill.addColorStop(0, 'rgba(255, 255, 255, 0.2)');
    fill.addColorStop(0.5, 'rgba(255, 255, 255, 0.05)');
  } else {
    fill.addColorStop(0, paletteColor(0.2, 0.6));
    fill.addColorStop(0.5, paletteColor(0.8, 0.15));
  }
  fill.addColorStop(1, 'rgba(0, 0, 0, 0)');
  c.fillStyle = fill;
  c.fill();

  const drawGlowingLine = (lineWidth, blur, alpha, color) => {
    c.beginPath();
    c.moveTo(points[0].x, points[0].y);
    drawSmoothPath(c, points, theme.waveformSmoothness);
    c.strokeStyle = color;
    c.lineWidth = lineWidth + (blur * 0.8);
    c.lineCap = 'round';
    c.lineJoin = 'round';
    c.globalAlpha = alpha * 0.75;
    c.stroke();
  };

  const baseColor = isBW ? 'rgba(255, 255, 255, 1)' : spectralLinear(c, 0, 0, width, 0, 1);
  const glowColor = isBW ? 'rgba(255, 255, 255, 1)' : getThemeGlowColor(theme);

  drawGlowingLine(theme.lineWidth * 6, 40 * theme.glowIntensity, 0.5, glowColor);
  drawGlowingLine(theme.lineWidth * 3, 20 * theme.glowIntensity, 0.8, baseColor);

  if (!isBW) c.globalCompositeOperation = 'lighter';
  drawGlowingLine(theme.lineWidth * 1.2, 5, 1.0, 'rgba(255, 255, 255, 1)');

  if (theme.label === 'ROCK MODE') {
    c.globalCompositeOperation = 'screen';
    c.beginPath();
    c.moveTo(points[0].x, points[0].y + 12);
    drawSmoothPath(c, points.map((point) => ({ x: point.x, y: point.y + 12 })), 0.18);
    c.strokeStyle = 'rgba(95, 156, 255, 0.8)';
    c.lineWidth = 2;
    c.shadowColor = 'rgba(95, 156, 255, 1)';
    c.shadowBlur = 10;
    c.stroke();
  }

  c.restore();
}

function drawParticlesMode(c, width, height) {
  const theme = themeConfig();
  const cx = width / 2;
  const cy = height / 2;

  if (state.running && !state.paused) {
    const spawnCount = theme.label === 'ROCK MODE' ? 14 : theme.road ? 5 : 8;
    for (let i = 0; i < spawnCount; i += 1) {
      const bin = Math.floor(Math.random() * state.bufferLength * 0.8);
      const amp = state.freqData[bin] / 255;
      if (amp < 0.05) {
        continue;
      }
      const angle = Math.random() * Math.PI * 2;
      const speed = amp * (theme.label === 'ROCK MODE' ? 9 : theme.road ? 3 : 5) * state.sensitivity;
      state.vizParticles.push({
        x: cx,
        y: cy,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 1,
        alpha: amp,
        size: amp * 6 + 1.2,
        hueT: Math.random()
      });
    }
    while (state.vizParticles.length > 220) {
      state.vizParticles.shift();
    }
  }

  for (let i = state.vizParticles.length - 1; i >= 0; i -= 1) {
    const particle = state.vizParticles[i];
    particle.x += particle.vx;
    particle.y += particle.vy;
    particle.vx *= theme.label === 'ROCK MODE' ? 0.985 : 0.965;
    particle.vy *= theme.label === 'ROCK MODE' ? 0.985 : 0.965;
    particle.life -= theme.label === 'ROCK MODE' ? 0.018 : 0.011;
    if (particle.life <= 0) {
      state.vizParticles.splice(i, 1);
      continue;
    }
    c.save();
    c.fillStyle = paletteColor(particle.hueT, particle.alpha * particle.life);
    if (theme.label !== 'BLACK & WHITE') {
      c.shadowColor = c.fillStyle;
      c.shadowBlur = particle.size * 4;
    }
    c.beginPath();
    c.arc(particle.x, particle.y, particle.size * particle.life, 0, Math.PI * 2);
    c.fill();
    c.restore();
  }

  drawCenterOrb(c, cx, cy, 32 + state.energySmoothed * 48, theme);
}

function project3D(p, camera, fov, cx, cy) {
  if (p.z <= 0.2) return null;
  const tunnelScale = 1.5;
  const scale = (fov * tunnelScale) / p.z;
  return {
    x: cx + (p.x - camera.x) * scale,
    y: cy + (p.y - camera.y) * scale,
    scale: scale,
    z: p.z
  };
}

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

function smoothstep(min, max, value) {
  const x = Math.max(0, Math.min(1, (value - min) / (max - min)));
  return x * x * (3 - 2 * x);
}

function getVortexTemplatePoints(sides = 6, radius = 1) {
  const cacheKey = `${sides}:${radius}`;
  const cached = state.vortexGeometryCache.get(cacheKey);
  if (cached) return cached;

  const points = createPolygonPoints(radius, sides);
  state.vortexGeometryCache.set(cacheKey, points);
  return points;
}

let _projectedIndex = 0;
const _gateW = 3.2;
const _gateH = 1.6;
const _gateVerticesX = new Float32Array([
  -_gateW,
  -_gateW * 0.65,
   _gateW * 0.65,
   _gateW
]);
const _gateVerticesY = new Float32Array([
   _gateH,
  -_gateH,
  -_gateH,
   _gateH
]);

const _gateProjOuter = [
  { x: 0, y: 0, scale: 0, z: 0 }, { x: 0, y: 0, scale: 0, z: 0 },
  { x: 0, y: 0, scale: 0, z: 0 }, { x: 0, y: 0, scale: 0, z: 0 }
];
const _gateProjInner = [
  { x: 0, y: 0, scale: 0, z: 0 }, { x: 0, y: 0, scale: 0, z: 0 },
  { x: 0, y: 0, scale: 0, z: 0 }, { x: 0, y: 0, scale: 0, z: 0 }
];
const _gateProjReflOuter = [
  { x: 0, y: 0, scale: 0, z: 0 }, { x: 0, y: 0, scale: 0, z: 0 },
  { x: 0, y: 0, scale: 0, z: 0 }, { x: 0, y: 0, scale: 0, z: 0 }
];
const _gateProjReflInner = [
  { x: 0, y: 0, scale: 0, z: 0 }, { x: 0, y: 0, scale: 0, z: 0 },
  { x: 0, y: 0, scale: 0, z: 0 }, { x: 0, y: 0, scale: 0, z: 0 }
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
  if (!state.cyberVortexGates || state.cyberVortexGates.length < 7) {
    state.cyberVortexGates = [];
    for (let i = 0; i < 7; i++) {
      state.cyberVortexGates.push({
        z: nearClip + i * ((farZ - nearClip) / 7),
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
  const angle = Math.PI + Math.random() * Math.PI;
  const radius = 2.0 + Math.random() * 1.5;
  particle.x = Math.cos(angle) * radius;
  particle.y = Math.sin(angle) * radius * 0.8;
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
  if (color.startsWith('hsl')) {
    const h = color.match(/hsl\(([^)]+)\)/);
    if (h) {
      const parts = h[1].split(',');
      return `hsla(${parts[0].trim()},${parts[1].trim()},${parts[2].trim()},${alpha})`;
    }
  }
  const start = color.indexOf('(');
  const end = color.indexOf(')');
  if (start == -1 || end == -1) return color;
  const parts = color.slice(start + 1, end).split(',');
  return `rgba(${parts[0].trim()},${parts[1].trim()},${parts[2].trim()},${alpha})`;
}

function getVortexPremiumColors() {
  if (state.autoCycle) {
    return {
      primary: `hsl(${state.colorHue}, 100%, 65%)`,
      hotPink: `hsl(${(state.colorHue + 330) % 360}, 100%, 65%)`,
      secondary: `hsl(${(state.colorHue + 180) % 360}, 100%, 62%)`,
      accent: `hsl(${(state.colorHue + 270) % 360}, 100%, 68%)`,
      bg: '#03040c'
    };
  }

  const theme = themeConfig();
  if (theme && theme.palette && theme.palette.length >= 3) {
    return {
      primary: theme.palette[0],
      hotPink: theme.palette[0],
      secondary: theme.palette[1],
      accent: theme.palette[2],
      bg: theme.background ? theme.background[0] : '#03040c'
    };
  }

  return {
    primary: '#ff2dff',
    hotPink: '#ff008c',
    secondary: '#00d9ff',
    accent: '#8a2bff',
    bg: '#03040c'
  };
}

function drawNeonLine(c, p0, p1, color, size, alpha) {
  if (!p0 || !p1 || alpha < 0.01) return;
  c.save();
  c.globalCompositeOperation = 'screen';
  c.beginPath();
  c.moveTo(p0.x, p0.y);
  c.lineTo(p1.x, p1.y);

  c.strokeStyle = color;
  c.lineWidth = size * 10;
  c.globalAlpha = alpha * 0.25;
  c.stroke();

  c.lineWidth = size * 3;
  c.globalAlpha = alpha * 0.7;
  c.stroke();

  c.strokeStyle = '#ffffff';
  c.lineWidth = size * 0.8;
  c.globalAlpha = Math.min(1.0, alpha * 0.9);
  c.stroke();
  c.restore();
}

function drawGateSegment(c, p0, p1, innerP0, innerP1, colorMain, colorHighlight, size, glow, alpha) {
  if (alpha < 0.01) return;
  c.save();
  c.globalCompositeOperation = 'screen';
  
  // Outer glow
  c.beginPath(); c.moveTo(p0.x, p0.y); c.lineTo(p1.x, p1.y);
  c.strokeStyle = glow;
  c.lineWidth = size * 16;
  c.globalAlpha = alpha * 0.3;
  c.stroke();
  
  // Main thick bar
  c.lineWidth = size * 6;
  c.strokeStyle = colorMain;
  c.globalAlpha = alpha * 0.9;
  c.stroke();
  
  // Bright core
  c.lineWidth = size * 2;
  c.strokeStyle = '#ffffff';
  c.globalAlpha = alpha;
  c.stroke();
  
  // Inner cyan highlight
  c.beginPath(); c.moveTo(innerP0.x, innerP0.y); c.lineTo(innerP1.x, innerP1.y);
  c.strokeStyle = colorHighlight;
  c.lineWidth = size * 1.5;
  c.globalAlpha = alpha * 0.8;
  c.stroke();
  
  c.restore();
}

function projectGate(gate, pulse, camX, camY, cx, cy, focalLength, nearClip) {
  const z = gate.z;
  const outerScale = 1.0 + pulse * 0.05;
  const innerScale = 0.85 + pulse * 0.05;

  for (let j = 0; j < 4; j++) {
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

function drawCorridorSurfaces(c, z0, z1, fog, isAlt, colors, glowBoost, camX, camY, cx, cy, focalLength, nearClip) {
  const w = _gateW; 
  const h = _gateH; 

  const fw = 50.0;
  const fh = 50.0;

  const fL0 = projectPoint(-fw - camX, h - camY, z0, cx, cy, focalLength, nearClip);
  const fR0 = projectPoint(fw - camX, h - camY, z0, cx, cy, focalLength, nearClip);
  const fL1 = projectPoint(-fw - camX, h - camY, z1, cx, cy, focalLength, nearClip);
  const fR1 = projectPoint(fw - camX, h - camY, z1, cx, cy, focalLength, nearClip);

  const cL0 = projectPoint(-fw - camX, -h - camY, z0, cx, cy, focalLength, nearClip);
  const cR0 = projectPoint(fw - camX, -h - camY, z0, cx, cy, focalLength, nearClip);
  const cL1 = projectPoint(-fw - camX, -h - camY, z1, cx, cy, focalLength, nearClip);
  const cR1 = projectPoint(fw - camX, -h - camY, z1, cx, cy, focalLength, nearClip);

  const slope = (w * 0.35) / (2 * h); 
  const getWallX = (y) => -w + (h - y) * slope;
  
  const wLT0 = projectPoint(getWallX(-fh) - camX, -fh - camY, z0, cx, cy, focalLength, nearClip);
  const wLB0 = projectPoint(getWallX(fh) - camX, fh - camY, z0, cx, cy, focalLength, nearClip);
  const wLT1 = projectPoint(getWallX(-fh) - camX, -fh - camY, z1, cx, cy, focalLength, nearClip);
  const wLB1 = projectPoint(getWallX(fh) - camX, fh - camY, z1, cx, cy, focalLength, nearClip);

  const getWallXR = (y) => w - (h - y) * slope;
  const wRT0 = projectPoint(getWallXR(-fh) - camX, -fh - camY, z0, cx, cy, focalLength, nearClip);
  const wRB0 = projectPoint(getWallXR(fh) - camX, fh - camY, z0, cx, cy, focalLength, nearClip);
  const wRT1 = projectPoint(getWallXR(-fh) - camX, -fh - camY, z1, cx, cy, focalLength, nearClip);
  const wRB1 = projectPoint(getWallXR(fh) - camX, fh - camY, z1, cx, cy, focalLength, nearClip);

  c.save();

  if (fL0 && fR0 && fL1 && fR1) {
    c.fillStyle = isAlt ? `rgba(4, 5, 8, ${1.0 * fog})` : `rgba(2, 2, 4, ${1.0 * fog})`;
    c.beginPath(); c.moveTo(fL0.x, fL0.y); c.lineTo(fR0.x, fR0.y); c.lineTo(fR1.x, fR1.y); c.lineTo(fL1.x, fL1.y); c.fill();
  }
  if (cL0 && cR0 && cL1 && cR1) {
    c.fillStyle = isAlt ? `rgba(8, 9, 14, ${0.98 * fog})` : `rgba(5, 6, 10, ${0.98 * fog})`;
    c.beginPath(); c.moveTo(cL0.x, cL0.y); c.lineTo(cR0.x, cR0.y); c.lineTo(cR1.x, cR1.y); c.lineTo(cL1.x, cL1.y); c.fill();
  }
  if (wLT0 && wLB0 && wLT1 && wLB1) {
    c.fillStyle = isAlt ? `rgba(12, 14, 20, ${0.95 * fog})` : `rgba(7, 8, 12, ${0.95 * fog})`;
    c.beginPath(); c.moveTo(wLT0.x, wLT0.y); c.lineTo(wLB0.x, wLB0.y); c.lineTo(wLB1.x, wLB1.y); c.lineTo(wLT1.x, wLT1.y); c.fill();
  }
  if (wRT0 && wRB0 && wRT1 && wRB1) {
    c.fillStyle = isAlt ? `rgba(10, 11, 16, ${0.95 * fog})` : `rgba(6, 7, 10, ${0.95 * fog})`;
    c.beginPath(); c.moveTo(wRT0.x, wRT0.y); c.lineTo(wRB0.x, wRB0.y); c.lineTo(wRB1.x, wRB1.y); c.lineTo(wRT1.x, wRT1.y); c.fill();
  }

  // Floor Perspective Grid
  const floorCols = [-w*0.8, -w*0.4, 0, w*0.4, w*0.8];
  for (let i = 0; i < floorCols.length; i++) {
    const col = floorCols[i];
    const pl0 = projectPoint(col - camX, h - camY, z0, cx, cy, focalLength, nearClip);
    const pl1 = projectPoint(col - camX, h - camY, z1, cx, cy, focalLength, nearClip);
    if (pl0 && pl1) {
      drawNeonLine(c, pl0, pl1, i % 2 === 0 ? colors.primary : colors.secondary, fL0.scale * 0.003, fog * glowBoost);
    }
  }

  // Horizontal Floor Strips
  if (isAlt) {
     const plL = projectPoint(-w - camX, h - camY, z0, cx, cy, focalLength, nearClip);
     const plR = projectPoint(w - camX, h - camY, z0, cx, cy, focalLength, nearClip);
     if (plL && plR) drawNeonLine(c, plL, plR, colors.primary, plL.scale * 0.004, fog * glowBoost * 1.2);
  }

  // Ceiling bright cyan long light bars
  const ceilCols = [-w*0.5, 0, w*0.5];
  for (let i = 0; i < ceilCols.length; i++) {
    const col = ceilCols[i];
    const cl0 = projectPoint(col - camX, -h - camY, z0, cx, cy, focalLength, nearClip);
    const cl1 = projectPoint(col - camX, -h - camY, z1, cx, cy, focalLength, nearClip);
    if (cl0 && cl1) {
      drawNeonLine(c, cl0, cl1, colors.secondary, fL0.scale * 0.004, fog * glowBoost * 1.2); 
    }
  }

  // Magenta rectangular ceiling frames
  if (!isAlt) { 
     const clL = projectPoint(-w*0.65 - camX, -h - camY, z0, cx, cy, focalLength, nearClip);
     const clR = projectPoint(w*0.65 - camX, -h - camY, z0, cx, cy, focalLength, nearClip);
     if (clL && clR) drawNeonLine(c, clL, clR, colors.primary, clL.scale * 0.003, fog * glowBoost);
  }

  // Wall horizontal cyan strips
  const wallY = 0;
  const wL0 = projectPoint(getWallX(wallY) - camX, wallY - camY, z0, cx, cy, focalLength, nearClip);
  const wL1 = projectPoint(getWallX(wallY) - camX, wallY - camY, z1, cx, cy, focalLength, nearClip);
  const wR0 = projectPoint(getWallXR(wallY) - camX, wallY - camY, z0, cx, cy, focalLength, nearClip);
  const wR1 = projectPoint(getWallXR(wallY) - camX, wallY - camY, z1, cx, cy, focalLength, nearClip);
  if (wL0 && wL1) drawNeonLine(c, wL0, wL1, colors.secondary, fL0.scale * 0.003, fog * glowBoost);
  if (wR0 && wR1) drawNeonLine(c, wR0, wR1, colors.secondary, fL0.scale * 0.003, fog * glowBoost);

  // Wall details
  if (isAlt) {
      const wlT = projectPoint(getWallX(-h) - camX, -h - camY, z0, cx, cy, focalLength, nearClip);
      const wlB = projectPoint(getWallX(h) - camX, h - camY, z0, cx, cy, focalLength, nearClip);
      if (wlT && wlB) drawNeonLine(c, wlT, wlB, colors.primary, wlT.scale * 0.004, fog * glowBoost * 1.2);
      const wrT = projectPoint(getWallXR(-h) - camX, -h - camY, z0, cx, cy, focalLength, nearClip);
      const wrB = projectPoint(getWallXR(h) - camX, h - camY, z0, cx, cy, focalLength, nearClip);
      if (wrT && wrB) drawNeonLine(c, wrT, wrB, colors.primary, wrT.scale * 0.004, fog * glowBoost * 1.2);
  } else {
      const wlT = projectPoint(getWallX(-h) - camX, -h - camY, z0, cx, cy, focalLength, nearClip);
      const wlB1 = projectPoint(getWallX(h) - camX, h - camY, z1, cx, cy, focalLength, nearClip);
      if (wlT && wlB1) drawNeonLine(c, wlT, wlB1, colors.accent, wlT.scale * 0.002, fog * glowBoost);
      const wrT = projectPoint(getWallXR(-h) - camX, -h - camY, z0, cx, cy, focalLength, nearClip);
      const wrB1 = projectPoint(getWallXR(h) - camX, h - camY, z1, cx, cy, focalLength, nearClip);
      if (wrT && wrB1) drawNeonLine(c, wrT, wrB1, colors.accent, wrT.scale * 0.002, fog * glowBoost);
  }

  c.restore();
}

function drawFloorReflections(c, fog, colors, glowBoost, camX, camY, cx, cy, focalLength, nearClip) {
  const alpha = glowBoost * fog * 0.7;
  if (alpha < 0.01) return;

  c.save();
  c.globalCompositeOperation = 'screen';
  
  const size = Math.max(0.5, _gateProjReflOuter[0].scale * 0.0025);

  drawNeonLine(c, _gateProjReflOuter[0], _gateProjReflOuter[1], colors.primary, size, alpha * 0.5);
  drawNeonLine(c, _gateProjReflOuter[1], _gateProjReflOuter[2], colors.hotPink, size, alpha * 0.5);
  drawNeonLine(c, _gateProjReflOuter[2], _gateProjReflOuter[3], colors.primary, size, alpha * 0.5);
  
  c.beginPath();
  c.moveTo(_gateProjReflOuter[0].x, _gateProjReflOuter[0].y);
  c.lineTo(_gateProjReflOuter[1].x, _gateProjReflOuter[1].y);
  c.lineTo(_gateProjReflOuter[2].x, _gateProjReflOuter[2].y);
  c.lineTo(_gateProjReflOuter[3].x, _gateProjReflOuter[3].y);
  c.fillStyle = `rgba(10, 20, 35, ${alpha * 0.1})`;
  c.fill();
  
  c.restore();
}

function drawGateStructure(c, fog) {
  c.save();
  c.fillStyle = `rgba(2, 2, 4, ${0.98 * fog})`;
  c.beginPath();
  c.moveTo(_gateProjOuter[0].x, _gateProjOuter[0].y);
  c.lineTo(_gateProjOuter[1].x, _gateProjOuter[1].y);
  c.lineTo(_gateProjOuter[2].x, _gateProjOuter[2].y);
  c.lineTo(_gateProjOuter[3].x, _gateProjOuter[3].y);
  
  c.lineTo(_gateProjInner[3].x, _gateProjInner[3].y);
  c.lineTo(_gateProjInner[2].x, _gateProjInner[2].y);
  c.lineTo(_gateProjInner[1].x, _gateProjInner[1].y);
  c.lineTo(_gateProjInner[0].x, _gateProjInner[0].y);
  
  c.closePath();
  c.fill();
  c.restore();
}

function drawVortex(c, width, height) {
  if (state.threeVortexSupported) {
    if (!state.threeVortexInitialized) {
      initThreeVortex();
    }
    c.clearRect(0, 0, width, height);
    if (state.threeVortexInitialized === true) {
      renderThreeVortex();
    }
    return;
  }

  const now = performance.now();
  if (state.cyberVortexLastTime === undefined) state.cyberVortexLastTime = now;
  if (state.cyberVortexTravel === undefined) state.cyberVortexTravel = 0;
  if (state.vortexBeatGlow === undefined) state.vortexBeatGlow = 0;

  const dt = Math.min(now - state.cyberVortexLastTime, 34);
  state.cyberVortexLastTime = now;

  const minDim = Math.min(width, height);
  const cx = width * 0.5;
  const cy = height * 0.58; 
  const focalLength = minDim * 0.65;
  const nearClip = 0.18;
  const farZ = 16.0;

  const energy = clamp(state.energySmoothed || 0, 0, 1);
  const bass = state.bassMode ? clamp(state.bassSmoothed || 0, 0, 1.2) : 0;
  const high = getVortexBandEnergy(96, 240);

  const qualityName = state.vortexQuality === 'high' ? 'high' : (state.vortexQuality === 'medium' ? 'medium' : 'low');
  const quality = qualityName === 'high'
    ? { gates: 7, particles: 40 }
    : qualityName === 'medium'
      ? { gates: 6, particles: 30 }
      : { gates: 5, particles: 20 };

  ensureCyberVortexPools(farZ, nearClip);
  syncCyberVortexQuality(quality, farZ, nearClip);

  const speed = dt * (0.0028 + (state.bassMode ? energy * 0.0035 + bass * 0.015 : energy * 0.005));
  state.cyberVortexTravel += speed;
  
  state.vortexBeatGlow = state.vortexBeatGlow || 0;
  if (state.beatActive) {
    state.vortexBeatGlow = 1;
  }
  state.vortexBeatGlow *= 0.88;

  const bassPulse = state.bassMode
    ? Math.min(1, (state.bassSmoothed || 0) * 2.8)
    : 0;

  const glowBoost = 1 + state.vortexBeatGlow * 1.8 + bassPulse * 1.2;

  updateCyberVortexPools(quality, speed, farZ, nearClip, bass, high);
  sortActiveGates(state.cyberVortexGates, quality.gates);

  ensureProjectedPool();
  _projectedIndex = 0;

  const camX = Math.sin(state.cyberVortexTravel * 0.15) * 0.05;
  const camY = Math.cos(state.cyberVortexTravel * 0.10) * 0.03;

  c.save();
  c.clearRect(0, 0, width, height);

  const colors = getVortexPremiumColors();
  
  c.fillStyle = colors.bg;
  c.fillRect(0, 0, width, height);

  const fogGrad = c.createRadialGradient(cx, cy, 0, cx, cy, Math.max(width, height) * 0.45);
  fogGrad.addColorStop(0, cyberAlpha(colors.secondary, 0.25 + glowBoost * 0.15));
  fogGrad.addColorStop(0.35, cyberAlpha(colors.primary, 0.1 + glowBoost * 0.1));
  fogGrad.addColorStop(1, 'rgba(0,0,0,0)');
  c.fillStyle = fogGrad;
  c.fillRect(0, 0, width, height);

  for (let i = 0; i < quality.gates; i++) {
    const gate = state.cyberVortexGates[i];
    const z0 = gate.z;
    const z1 = (i === quality.gates - 1) ? nearClip : state.cyberVortexGates[i+1].z;

    const depthAlpha = clamp(1.0 - z0 / farZ, 0.0, 1.0);
    const fog = Math.pow(depthAlpha, 1.5);

    const pulse = gate.pulse;

    projectGate(gate, pulse, camX, camY, cx, cy, focalLength, nearClip);

    drawCorridorSurfaces(c, z0, z1, fog, gate.colorSide === 0, colors, glowBoost, camX, camY, cx, cy, focalLength, nearClip);
    drawFloorReflections(c, fog, colors, glowBoost, camX, camY, cx, cy, focalLength, nearClip);

    drawGateStructure(c, fog);
    
    const size = Math.max(1, _gateProjOuter[0].scale * 0.0035);
    drawGateSegment(c, _gateProjOuter[0], _gateProjOuter[1], _gateProjInner[0], _gateProjInner[1], colors.primary, colors.secondary, size, colors.accent, fog * glowBoost);
    drawGateSegment(c, _gateProjOuter[1], _gateProjOuter[2], _gateProjInner[1], _gateProjInner[2], colors.hotPink, colors.secondary, size, colors.accent, fog * glowBoost);
    drawGateSegment(c, _gateProjOuter[2], _gateProjOuter[3], _gateProjInner[2], _gateProjInner[3], colors.primary, colors.secondary, size, colors.accent, fog * glowBoost);

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
          const pAlpha = pFog * pFog * (0.3 + high * 0.7 + state.vortexBeatGlow * 0.4);
          const pColor = particle.colorSide === 0 ? colors.secondary : colors.primary;
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

  const vignette = c.createRadialGradient(cx, cy, minDim * 0.35, cx, cy, Math.max(width, height) * 0.72);
  vignette.addColorStop(0, 'rgba(0,0,0,0)');
  vignette.addColorStop(0.55, 'rgba(0,0,0,0.25)');
  vignette.addColorStop(1, 'rgba(0,0,0,0.95)');
  c.save();
  c.fillStyle = vignette;
  c.fillRect(0, 0, width, height);
  c.restore();

  c.restore();
}

function drawThemeForeground(c, width, height) {
  const theme = themeConfig();
  if (theme.radio) {
    drawClassicRadio(c, width, height);
  }
  if (theme.scanlines) {
    drawCrtOverlay(c, width, height);
  }
  if (theme.silhouettes) {
    drawRockSilhouettes(c, width, height);
  }
  if (theme.road) {
    drawMemoryHighway(c, width, height);
  }
}

function drawClassicRadio(c, width, height) {
  const radioWidth = Math.min(width * 0.28, 360);
  const radioHeight = radioWidth * 0.58;
  const x = width * 0.08;
  const y = height * 0.58;
  c.save();
  c.globalAlpha = 0.72;
  c.fillStyle = 'rgba(57, 32, 16, 0.72)';
  c.strokeStyle = 'rgba(214, 163, 89, 0.36)';
  c.lineWidth = 2;
  roundRect(c, x, y, radioWidth, radioHeight, 18);
  c.fill();
  c.stroke();

  c.fillStyle = 'rgba(247, 213, 146, 0.1)';
  roundRect(c, x + radioWidth * 0.08, y + radioHeight * 0.18, radioWidth * 0.58, radioHeight * 0.28, 10);
  c.fill();

  c.strokeStyle = 'rgba(247, 213, 146, 0.55)';
  c.beginPath();
  c.moveTo(x + radioWidth * 0.14, y + radioHeight * 0.32);
  c.lineTo(x + radioWidth * 0.6, y + radioHeight * 0.32);
  c.stroke();

  for (let i = 0; i < 6; i += 1) {
    const lineY = y + radioHeight * (0.58 + i * 0.06);
    c.strokeStyle = `rgba(255, 218, 150, ${0.08 + i * 0.01})`;
    c.beginPath();
    c.moveTo(x + radioWidth * 0.1, lineY);
    c.lineTo(x + radioWidth * 0.58, lineY);
    c.stroke();
  }

  drawKnob(c, x + radioWidth * 0.78, y + radioHeight * 0.36, radioWidth * 0.08);
  drawKnob(c, x + radioWidth * 0.78, y + radioHeight * 0.68, radioWidth * 0.08);
  c.restore();
}

function drawKnob(c, x, y, radius) {
  c.save();
  c.fillStyle = 'rgba(255, 218, 150, 0.18)';
  c.strokeStyle = 'rgba(255, 218, 150, 0.42)';
  c.beginPath();
  c.arc(x, y, radius, 0, Math.PI * 2);
  c.fill();
  c.stroke();
  c.beginPath();
  c.moveTo(x, y);
  c.lineTo(x + radius * 0.8, y - radius * 0.2);
  c.stroke();
  c.restore();
}

function drawCrtOverlay(c, width, height) {
  c.save();
  const offset = (Math.random() - 0.5) * (state.beatActive ? 6 : 2);
  c.translate(offset, 0);
  c.fillStyle = `rgba(255, 255, 255, ${0.02 + Math.random() * 0.02})`;
  c.fillRect(0, 0, width, height);
  for (let y = 0; y < height; y += 3) {
    c.fillStyle = y % 2 === 0 ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.06)';
    c.fillRect(0, y, width, 1);
  }
  const curve = c.createRadialGradient(width / 2, height / 2, height * 0.2, width / 2, height / 2, height * 0.8);
  curve.addColorStop(0, 'rgba(255, 255, 255, 0)');
  curve.addColorStop(1, 'rgba(0, 0, 0, 0.18)');
  c.fillStyle = curve;
  c.fillRect(0, 0, width, height);
  c.restore();
}

function drawRockSilhouettes(c, width, height) {
  c.save();
  c.globalAlpha = 0.22;
  c.fillStyle = 'rgba(16, 8, 20, 0.84)';
  drawDrumKit(c, width * 0.74, height * 0.66, 0.8);
  c.restore();

  if (state.beatActive) {
    c.save();
    c.strokeStyle = paletteColor(0.2, 0.24);
    c.lineWidth = 2;
    for (let i = 0; i < 5; i += 1) {
      const x = width * (0.14 + i * 0.17);
      c.beginPath();
      c.moveTo(x, 0);
      c.lineTo(width * 0.5, height * 0.55);
      c.stroke();
    }
    c.restore();
  }
}

function drawGuitar(c, x, y, scale) {
  c.save();
  c.translate(x, y);
  c.scale(scale, scale);
  c.beginPath();
  c.ellipse(0, 0, 34, 42, 0, 0, Math.PI * 2);
  c.ellipse(0, -46, 22, 26, 0, 0, Math.PI * 2);
  c.fill();
  c.fillRect(-4, -120, 8, 76);
  c.fillRect(-10, -140, 20, 16);
  c.restore();
}

function drawDrumKit(c, x, y, scale) {
  c.save();
  c.translate(x, y);
  c.scale(scale, scale);
  c.beginPath();
  c.arc(0, 0, 34, 0, Math.PI * 2);
  c.arc(-56, -16, 20, 0, Math.PI * 2);
  c.arc(56, -16, 20, 0, Math.PI * 2);
  c.fill();
  c.fillRect(-2, -68, 4, 100);
  c.fillRect(-58, -60, 4, 78);
  c.fillRect(54, -60, 4, 78);
  c.restore();
}



function drawMemoryHighway(c, width, height) {
  const horizon = height * 0.62;
  c.save();
  c.fillStyle = 'rgba(0, 0, 0, 0.28)';
  c.beginPath();
  c.moveTo(width * 0.3, height);
  c.lineTo(width * 0.46, horizon);
  c.lineTo(width * 0.54, horizon);
  c.lineTo(width * 0.7, height);
  c.closePath();
  c.fill();

  c.strokeStyle = 'rgba(110, 180, 240, 0.18)';
  c.lineWidth = 2;
  for (let i = 0; i < 9; i += 1) {
    const t = ((state.roadOffset * 0.03) + i * 0.14) % 1;
    const y = mix(horizon, height, t);
    const spread = mix(width * 0.03, width * 0.18, t);
    c.beginPath();
    c.moveTo(width / 2 - spread * 0.12, y);
    c.lineTo(width / 2 + spread * 0.12, y);
    c.stroke();
  }

  drawCar(c, width * 0.5, height * 0.82, 1 + state.energySmoothed * 0.08);
  c.restore();
}

function drawCar(c, x, y, scale) {
  c.save();
  c.translate(x, y);
  c.scale(scale, scale);
  c.fillStyle = 'rgba(10, 20, 38, 0.9)';
  c.beginPath();
  c.moveTo(-52, 10);
  c.lineTo(-30, -10);
  c.lineTo(18, -10);
  c.lineTo(42, 10);
  c.lineTo(52, 10);
  c.lineTo(52, 22);
  c.lineTo(-52, 22);
  c.closePath();
  c.fill();
  c.fillStyle = 'rgba(129, 188, 255, 0.22)';
  c.fillRect(-16, -8, 24, 10);
  c.fillStyle = 'rgba(140, 214, 255, 0.35)';
  c.fillRect(-46, 12, 16, 2);
  c.fillRect(30, 12, 16, 2);
  c.restore();
}

function renderPip(ctxToRender, width, height) {
  ctxToRender.clearRect(0, 0, width, height);

  const isMilkdrop = state.mode === 'milkdrop';
  const isVortex   = state.mode === 'vortex';

  // 1. Draw Background
  if (isVortex) {
    if (state.showBgFx && state.visualizer) {
      const bcCanvas = document.getElementById('butterchurn-canvas');
      if (bcCanvas) {
        ctxToRender.save();
        if (bcCanvas.style.filter && bcCanvas.style.filter !== 'none') {
          ctxToRender.filter = bcCanvas.style.filter;
        }
        drawImageCover(ctxToRender, bcCanvas, width, height);
        ctxToRender.restore();
      }
      // Draw the same black overlay to dim Milkdrop backdrop and make the vortex pop
      ctxToRender.fillStyle = 'rgba(0, 0, 0, 0.35)';
      ctxToRender.fillRect(0, 0, width, height);
    } else {
      ctxToRender.fillStyle = '#000';
      ctxToRender.fillRect(0, 0, width, height);
    }
  } else if (isMilkdrop) {
    const bcCanvas = document.getElementById('butterchurn-canvas');
    if (bcCanvas) {
      ctxToRender.save();
      if (bcCanvas.style.filter && bcCanvas.style.filter !== 'none') {
        ctxToRender.filter = bcCanvas.style.filter;
      }
      drawImageCover(ctxToRender, bcCanvas, width, height);
      ctxToRender.restore();
    }
  } else {
    if (state.theme === 'chill' || state.theme === 'study' || (state.theme === 'custom' && state.customBgMediaType === 'video')) {
      if (themeVideo && themeVideo.readyState >= 2 && !themeVideo.paused) {
        drawImageCover(ctxToRender, themeVideo, width, height);
      }
    } else if (state.theme === 'phonk' && themeImage && themeImage.complete) {
      drawImageCover(ctxToRender, themeImage, width, height);
    } else if (state.currentBgImg && state.currentBgImg.complete) {
      drawImageCover(ctxToRender, state.currentBgImg, width, height);
    } else {
      const theme = THEMES[state.theme] || THEMES.default;
      ctxToRender.fillStyle = theme.background[0] || '#000';
      ctxToRender.fillRect(0, 0, width, height);
    }
  }

  // 2. Draw standard layers
  if (!isVortex && !isMilkdrop) {
    drawImageCover(ctxToRender, bgCanvas, width, height);
  }

  // Draw the main visualizer canvas (where vortex geometric rings / neon strokes are rendered)
  drawImageCover(ctxToRender, canvas, width, height);
}

function syncPopup() {
  if (!state.miniWindow || state.miniWindow.closed) {
    return;
  }
  const popupCanvas = state.miniWindow._canvas;
  const popupCtx = state.miniWindow._ctx;
  if (!popupCanvas || !popupCtx) {
    return;
  }
  renderPip(popupCtx, popupCanvas.width, popupCanvas.height);
}

function openMiniWindow() {
  if (state.miniWindow && !state.miniWindow.closed) {
    state.miniWindow.focus();
    return;
  }
  const popup = window.open(
    '',
    'SPECTR_MINI',
    `width=340,height=230,left=${window.screen.width - 360},top=${window.screen.height - 290},resizable=yes,scrollbars=no,toolbar=no,menubar=no,location=no,status=no`
  );
  if (!popup) {
    showToast('Popup blocked. Use the overlay mini view instead.');
    return;
  }
  popup.document.write(`<!DOCTYPE html><html><head><title>SPECTR MINI</title>
  <style>
    :root { --bg: #050505; --panel: rgba(0,0,0,.45); --text: #d7ebff; }
    *{box-sizing:border-box;margin:0;padding:0}
    html,body{width:100%;height:100%;overflow:hidden;background:var(--bg);color:var(--text);font-family:monospace}
    #title,#label{position:fixed;left:0;right:0;text-align:center;background:var(--panel);letter-spacing:.16em}
    #title{top:0;padding:6px 0;font-size:10px}
    #label{bottom:0;padding:5px 0;font-size:9px}
    canvas{display:block}
  </style></head><body>
  <div id="title">SPECTR MINI</div>
  <canvas id="mc"></canvas>
  <div id="label">WAITING</div>
  <script>
    const cv=document.getElementById('mc');
    const ct=cv.getContext('2d');
    const lb=document.getElementById('label');
    function resize(){cv.width=window.innerWidth;cv.height=window.innerHeight}
    resize();
    window.addEventListener('resize',resize);
    window._canvas=cv;
    window._ctx=ct;
    (function tick(){
      requestAnimationFrame(tick);
      if(!window.opener||window.opener.closed){lb.textContent='DISCONNECTED';return;}
      const s=window.opener.state;
      lb.textContent=s&&s.running?({mic:'MIC',file:'FILE',screen:'SCREEN'}[s.audioSource]||'LIVE'):'NO SIGNAL';
    })();
  <\/script></body></html>`);
  popup.document.close();
  window.setTimeout(() => {
    popup._canvas = popup.document.getElementById('mc');
    popup._ctx = popup._canvas?.getContext('2d');
    syncPipColors();
  }, 300);
  state.miniWindow = popup;
  popup.addEventListener('beforeunload', () => {
    state.miniWindow = null;
  });
}

function idleAnimation() {
  if (state.running) {
    state.idleFrameId = null;
    return;
  }
  state.idleFrameId = requestAnimationFrame(idleAnimation);
  const width = canvas.width;
  const height = canvas.height;
  drawBackground(ctx, width, height);
  const theme = themeConfig();
  const cx = width / 2;
  const cy = height / 2;
  for (let i = 0; i < 7; i += 1) {
    const radius = 60 + i * 42 + Math.sin(performance.now() * 0.0007 + i) * 8;
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.strokeStyle = paletteColor(i / 7, theme.label === 'BLACK & WHITE' ? 0.18 : 0.24);
    ctx.lineWidth = theme.label === 'BLACK & WHITE' ? 1 : 1.4;
    ctx.stroke();
  }
  drawThemeForeground(ctx, width, height);
}

function toggleMiniOverlay() {
  const hidden = miniOverlayEl.classList.toggle('hidden');
  if (!hidden) {
    updateMiniLabel();
  }
  btnMini.style.borderColor = hidden ? '' : 'var(--acc1)';
  btnMini.style.boxShadow = hidden ? '' : '0 0 12px var(--glow)';
}

(function enableMiniDrag() {
  let dragging = false;
  let offsetX = 0;
  let offsetY = 0;
  const header = document.getElementById('mini-header');

  header.addEventListener('mousedown', (event) => {
    if (event.target.tagName === 'BUTTON') {
      return;
    }
    dragging = true;
    const rect = miniOverlayEl.getBoundingClientRect();
    offsetX = event.clientX - rect.left;
    offsetY = event.clientY - rect.top;
    miniOverlayEl.style.cursor = 'grabbing';
  });

  window.addEventListener('mousemove', (event) => {
    if (!dragging) {
      return;
    }
    miniOverlayEl.style.right = 'auto';
    miniOverlayEl.style.bottom = 'auto';
    miniOverlayEl.style.left = `${event.clientX - offsetX}px`;
    miniOverlayEl.style.top = `${event.clientY - offsetY}px`;
  });

  window.addEventListener('mouseup', () => {
    dragging = false;
    miniOverlayEl.style.cursor = '';
  });
})();

async function requestPip(isAuto = false) {
  if ('documentPictureInPicture' in window) {
    try {
      const pipWindow = await window.documentPictureInPicture.requestWindow({
        width: 400,
        height: 280
      });

      pipWindow.document.body.innerHTML = `
        <style>
          :root { --bg: #000; --panel: #111; --text: #fff; --acc1: #5f9cff; --border: #444; }
          body { margin: 0; background: var(--bg); height: 100vh; font-family: monospace; color: var(--text); overflow: hidden; position: relative; }
          #canvas-container { position: absolute; inset: 0; z-index: 1; display: flex; align-items: center; justify-content: center; background: var(--bg); overflow: hidden; }
          canvas { width: 100%; height: 100%; display: block; object-fit: cover; transform-origin: center center; }
          #pip-controls { position: absolute; bottom: 0; left: 0; right: 0; z-index: 10; padding: 12px; background: rgba(15, 15, 15, 0.85); backdrop-filter: blur(12px); display: flex; gap: 8px; align-items: center; justify-content: center; border-top: 1px solid var(--border); flex-wrap: wrap; transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.4s ease; }
          select, button { background: rgba(30, 30, 30, 0.6); color: var(--text); border: 1px solid var(--border); padding: 6px 12px; border-radius: 4px; font-family: monospace; font-size: 11px; cursor: pointer; outline: none; transition: all 0.2s; }
          select:hover, button:hover { border-color: var(--acc1); background: rgba(40, 40, 40, 0.8); }
          button { font-weight: bold; color: var(--acc1); border-color: var(--acc1); }
          option { background: var(--bg); color: var(--text); font-family: monospace; }
          body.controls-hidden #pip-controls { transform: translateY(100%); opacity: 0; pointer-events: none; }
          #pip-sens { -webkit-appearance: none; appearance: none; width: 80px; height: 4px; border-radius: 999px; outline: none; cursor: pointer; background: linear-gradient(90deg, var(--acc2, #b835ff), var(--acc1)); }
          #pip-sens::-webkit-slider-thumb { -webkit-appearance: none; width: 12px; height: 12px; border-radius: 50%; background: var(--text); box-shadow: 0 0 10px var(--glow-hi, var(--acc1)); }
        </style>
        <div id="canvas-container">
          <canvas id="pip-canvas" width="600" height="320"></canvas>
        </div>
        <div id="pip-controls">
          <button id="pip-pause">${state.paused ? 'PLAY' : 'PAUSE'}</button>
          <button id="pip-bass">${state.bassMode ? 'BASS: ON' : 'BASS: OFF'}</button>
          <button id="pip-autocolor">${state.autoCycle ? 'AUTO: ON' : 'AUTO: OFF'}</button>
          <select id="pip-mode">
            <option value="bars" ${state.mode === 'bars' ? 'selected' : ''}>MODE: BARS</option>
            <option value="circle" ${state.mode === 'circle' ? 'selected' : ''}>MODE: RADIAL</option>
            <option value="wave" ${state.mode === 'wave' ? 'selected' : ''}>MODE: WAVE</option>
            <option value="vortex" ${state.mode === 'vortex' ? 'selected' : ''}>MODE: VORTEX</option>
            <option value="milkdrop" ${state.mode === 'milkdrop' ? 'selected' : ''}>MODE: MILKDROP</option>
          </select>
          <select id="pip-theme">
            <option value="classic" ${state.theme === 'classic' ? 'selected' : ''}>THEME: CLASSIC</option>
            <option value="bw" ${state.theme === 'bw' ? 'selected' : ''}>THEME: B&W</option>
            <option value="rock" ${state.theme === 'rock' ? 'selected' : ''}>THEME: ROCK</option>
            <option value="memory" ${state.theme === 'memory' ? 'selected' : ''}>THEME: MEMORY</option>
            <option value="chill" ${state.theme === 'chill' ? 'selected' : ''}>THEME: CHILL</option>
            <option value="study" ${state.theme === 'study' ? 'selected' : ''}>THEME: STUDY</option>
            <option value="phonk" ${state.theme === 'phonk' ? 'selected' : ''}>THEME: PHONK</option>
            <option value="custom" ${state.theme === 'custom' ? 'selected' : ''}>THEME: CUSTOM</option>
          </select>
          <div style="display:flex;align-items:center;gap:4px;">
            <label for="pip-sens" style="font-size:10px;">SENS</label>
            <input type="range" id="pip-sens" min="0.2" max="3.0" step="0.1" value="${state.sensitivity}" />
          </div>
        </div>
      `;

      const pipCanvas = pipWindow.document.getElementById('pip-canvas');
      const pipCtx = pipCanvas.getContext('2d');
      state.pipWindow = pipWindow;
      state.pipCtx = pipCtx;
      state.pipCanvas = pipCanvas;
      syncPipColors();

      const resizePip = () => {
        const container = pipWindow.document.getElementById('canvas-container');
        if (container && pipCanvas) {
          pipCanvas.width = container.clientWidth;
          pipCanvas.height = container.clientHeight;
        }
      };
      pipWindow.addEventListener('resize', resizePip);
      setTimeout(resizePip, 0);

      pipWindow.document.getElementById('pip-pause').addEventListener('click', (e) => {
        btnPause.click();
        e.target.textContent = state.paused ? 'PLAY' : 'PAUSE';
      });

      pipWindow.document.getElementById('pip-bass').addEventListener('click', (e) => {
        const tb = document.getElementById('toggle-bass');
        if (tb) {
          tb.checked = !tb.checked;
          tb.dispatchEvent(new Event('change'));
          e.target.textContent = tb.checked ? 'BASS: ON' : 'BASS: OFF';
        }
      });

      pipWindow.document.getElementById('pip-autocolor').addEventListener('click', (e) => {
        const ta = document.getElementById('toggle-autocycle');
        if (ta) {
          ta.checked = !ta.checked;
          ta.dispatchEvent(new Event('change'));
          e.target.textContent = ta.checked ? 'AUTO: ON' : 'AUTO: OFF';
        }
      });

      // PiP Auto-hide logic
      let pipControlsTimer = null;
      const resetPipControls = () => {
        if (!pipWindow || !pipWindow.document) return;
        pipWindow.document.body.classList.remove('controls-hidden');
        if (pipControlsTimer) clearTimeout(pipControlsTimer);
        pipControlsTimer = setTimeout(() => {
          if (pipWindow && pipWindow.document) {
            pipWindow.document.body.classList.add('controls-hidden');
          }
        }, 3000);
      };
      pipWindow.addEventListener('mousemove', resetPipControls);
      pipWindow.addEventListener('mousedown', resetPipControls);
      pipWindow.document.getElementById('pip-controls').addEventListener('change', resetPipControls);
      resetPipControls();


      pipWindow.document.getElementById('pip-mode').addEventListener('change', (e) => {
        const newMode = e.target.value;
        const modeBtn = document.querySelector(`.mode-btn[data-mode="${newMode}"]`);
        if (modeBtn) modeBtn.click();
      });

      pipWindow.document.getElementById('pip-theme').addEventListener('change', (e) => {
        const newTheme = e.target.value;
        const themeBtn = document.querySelector(`.theme-btn[data-theme="${newTheme}"]`);
        if (themeBtn) themeBtn.click();
      });

      pipWindow.document.getElementById('pip-sens').addEventListener('input', (e) => {
        state.sensitivity = parseFloat(e.target.value);
        const mainSlider = document.getElementById('sensitivity-slider');
        const mainVal = document.getElementById('sensitivity-val');
        if (mainSlider) mainSlider.value = state.sensitivity;
        if (mainVal) mainVal.textContent = state.sensitivity.toFixed(1);
      });

      pipWindow.addEventListener('pagehide', () => {
        state.pipWindow = null;
        state.pipCtx = null;
        state.pipCanvas = null;
      });
      if (!isAuto) showToast('Picture-in-Picture started successfully.');
      return;
    } catch (error) {
      if (!isAuto) console.warn('Document PiP failed or denied, falling back to Video PiP.', error);
    }
  }

  // Fallback to Standard Video PiP
  if (!document.pictureInPictureEnabled) {
    if (!isAuto) showToast('Picture-in-Picture is not supported here.');
    return;
  }
  initAutoPip();
  let video = document.getElementById('pip-video');

  try {
    await video.requestPictureInPicture();
    if (!isAuto) showToast('Picture-in-Picture started (Fallback Mode).');
  } catch (error) {
    if (!isAuto) showToast(`Picture-in-Picture failed: ${error.message}`);
    if (isAuto) throw error;
  }
}

function applyTheme(themeName, silent = false) {
  const nextTheme = THEMES[themeName] ? themeName : 'default';
  state.theme = nextTheme;
  const theme = themeConfig();
  state.beatCooldownMax = theme.beatCooldownMax;
  document.body.dataset.theme = nextTheme;

  if (nextTheme !== 'custom') {
    document.body.style.removeProperty('--acc1');
    document.body.style.removeProperty('--glow');
    document.body.style.removeProperty('--glow-hi');
    document.body.style.removeProperty('--bg');
    document.body.style.removeProperty('--bg-soft');
    document.body.style.removeProperty('--panel');
  } else if (!silent) {
    updateCustomThemeColor(THEMES.custom.glowColor);
  }

  themeNameEl.textContent = theme.label;
  themeTaglineEl.textContent = theme.tagline;

  if (state.mode === 'milkdrop') {
    loadThemePreset(nextTheme);
    state.bcLastCycle = performance.now();
    const bcCanvas = document.getElementById('butterchurn-canvas');
    if (bcCanvas) updateMilkdropFilter(bcCanvas);
  }

  const themeBgUrls = {
    default: 'main-bg.jpg',
    classic: 'https://images.unsplash.com/photo-1507838153414-b4b713384a76?q=80&w=1920&auto=format&fit=crop',
    bw: 'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?q=80&w=1920&auto=format&fit=crop',
    rock: 'https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?q=80&w=1920&auto=format&fit=crop',
    memory: 'memory_bg.jpg'
  };

  if (themeBgUrls[nextTheme]) {
    if (!state.bgImageCache[nextTheme]) {
      const img = new Image();
      if (themeBgUrls[nextTheme].startsWith('http')) {
        img.crossOrigin = 'anonymous';
      }
      img.src = themeBgUrls[nextTheme];
      state.bgImageCache[nextTheme] = img;
    }
    state.currentBgImg = state.bgImageCache[nextTheme];
  } else if (nextTheme === 'custom' && state.customBgMediaType === 'image') {
      const img = new Image();
      img.src = state.customBgMediaUrl;
      state.currentBgImg = img;
  } else {
    state.currentBgImg = null;
  }

  if (themeBg) {
    if (nextTheme === 'custom' && state.customBgMediaUrl && state.customBgMediaType === 'image') {
       themeBg.style.backgroundImage = `url("${state.customBgMediaUrl}")`;
    } else {
       themeBg.style.backgroundImage = themeBgUrls[nextTheme] ? `url("${themeBgUrls[nextTheme]}")` : '';
    }
  }

  if (themeVideo) {
    themeVideo.classList.add('hidden');
    themeVideo.pause();
  }
  if (themeImage) {
    themeImage.classList.add('hidden');
  }

  if (nextTheme === 'chill') {
    const chillVideos = [
      'vecteezy_cars-parked-on-a-hillside-with-a-90-s-inspired-night-sky-a_49887896.mp4'
    ];
    themeVideo.src = chillVideos[0];
    themeVideo.classList.remove('hidden');
    themeVideo.play();
  } else if (nextTheme === 'study') {
    themeVideo.src = 'Animate_this_image_and_video_s.mp4';
    themeVideo.classList.remove('hidden');
    themeVideo.play();
  } else if (nextTheme === 'phonk') {
    themeImage.src = 'phonk_bg.jpg';
    themeImage.classList.remove('hidden');
  } else if (nextTheme === 'custom') {
    if (state.customBgMediaUrl) {
      if (state.customBgMediaType === 'video') {
        themeVideo.src = state.customBgMediaUrl;
        themeVideo.classList.remove('hidden');
        themeVideo.play().catch(()=>{});
      }
    } else {
      themeBg.style.backgroundImage = 'none';
    }
  }

  if (state.analyser) {
    state.analyser.smoothingTimeConstant = theme.analyserSmoothing;
  }

  themeButtons.forEach((button) => {
    button.classList.toggle('active', button.dataset.theme === nextTheme);
  });

  if (state.pipWindow) {
    const pipThemeSel = state.pipWindow.document.getElementById('pip-theme');
    if (pipThemeSel) pipThemeSel.value = nextTheme;
  }

  if (!silent) {
    document.body.classList.add('theme-transitioning');
    window.clearTimeout(state.transitionTimer);
    state.transitionTimer = window.setTimeout(() => {
      document.body.classList.remove('theme-transitioning');
    }, 520);
  }

  initBgParticles();
  initAmbientParticles();
  beatFlash.style.background = theme.label === 'BLACK & WHITE'
    ? 'radial-gradient(circle at center, rgba(255,255,255,0.14) 0%, transparent 60%)'
    : `radial-gradient(circle at center, ${paletteColor(0.18, 0.2)} 0%, transparent 60%)`;
  updateModeVisibility();
  syncPipColors();
  
  if (state.mode === 'vortex' && typeof updateThreeVortexColors === 'function') {
    updateThreeVortexColors();
  }
}

function roundRect(c, x, y, width, height, radius) {
  const r = Math.min(radius, width / 2, height / 2);
  c.beginPath();
  c.moveTo(x + r, y);
  c.lineTo(x + width - r, y);
  c.quadraticCurveTo(x + width, y, x + width, y + r);
  c.lineTo(x + width, y + height - r);
  c.quadraticCurveTo(x + width, y + height, x + width - r, y + height);
  c.lineTo(x + r, y + height);
  c.quadraticCurveTo(x, y + height, x, y + height - r);
  c.lineTo(x, y + r);
  c.quadraticCurveTo(x, y, x + r, y);
  c.closePath();
}

function drawSmoothPath(c, points, smoothness) {
  for (let i = 0; i < points.length - 1; i += 1) {
    const current = points[i];
    const next = points[i + 1];
    const midX = mix(current.x, next.x, 0.5);
    const midY = mix(current.y, next.y, 0.5);
    if (smoothness > 0.4) {
      c.quadraticCurveTo(current.x, current.y, midX, midY);
    } else {
      c.lineTo(next.x, next.y);
    }
  }
}

function resetButton() {
  updateStartButtonLabel();
  btnStart.disabled = false;
  btnPause.disabled = true;
}

function updateStartButtonLabel() {
  const icon = { mic: 'MIC', file: 'FILE', screen: 'SCREEN' };
  const label = { mic: 'Start Mic', file: 'Load File', screen: 'Capture Screen' };
  btnStart.innerHTML = `<span class="btn-icon">${icon[state.audioSource]}</span><span>${label[state.audioSource]}</span>`;
  btnStart.classList.remove('active');
}

function badge(icon, text) {
  sourceBadgeIcon.textContent = icon;
  sourceBadgeText.textContent = text;
  sourceBadge.classList.remove('hidden');
}

function showStatus() {
  const status = document.getElementById('status-text');
  if (status) {
    status.classList.remove('hidden');
  }
}

function hideStatus() {
  const status = document.getElementById('status-text');
  if (status) {
    status.classList.add('hidden');
  }
}

function showError(message) {
  console.error(message);
  alert(message);
}

let toastTimer = null;
function showToast(message) {
  let toast = document.getElementById('screen-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'screen-toast';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.remove('hidden');
  if (toastTimer) {
    clearTimeout(toastTimer);
  }
  toastTimer = window.setTimeout(() => {
    toast.classList.add('hidden');
  }, 3600);
}

function updateMiniLabel() {
  miniSourceLabel.textContent = state.running
    ? ({ mic: 'MICROPHONE', file: 'FILE PLAYBACK', screen: 'SYSTEM AUDIO' }[state.audioSource] || 'LIVE')
    : 'NO SIGNAL';
}

function fmt(seconds) {
  return `${Math.floor(seconds / 60)}:${Math.floor(seconds % 60).toString().padStart(2, '0')}`;
}

function buildIdleScreen() {
  const status = document.createElement('div');
  status.id = 'status-text';
  status.innerHTML = '<div id="status-title">SPECTR</div><div id="status-sub">SELECT A SOURCE AND START THE VISUALIZER</div>';
  document.body.appendChild(status);
}

function handleUi() {
  const introScreen = document.getElementById('intro-screen');
  const btnEnter = document.getElementById('btn-enter');

  if (btnEnter && introScreen) {
    btnEnter.addEventListener('click', () => {
      introScreen.classList.add('hidden');
      if (state.audioCtx && state.audioCtx.state === 'suspended') {
        state.audioCtx.resume();
      }
      initAutoPip();
    });
  }

  const customColorPicker = document.getElementById('custom-color-picker');
  if (customColorPicker) {
    customColorPicker.addEventListener('input', (e) => {
      updateCustomThemeColor(e.target.value);
    });
  }

  const customBgBtn = document.getElementById('custom-bg-btn');
  const customBgUpload = document.getElementById('custom-bg-upload');
  if (customBgBtn && customBgUpload) {
    customBgBtn.addEventListener('click', () => customBgUpload.click());
    customBgUpload.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;

      if (state.customBgMediaUrl) {
        URL.revokeObjectURL(state.customBgMediaUrl);
      }

      const url = URL.createObjectURL(file);
      state.customBgMediaUrl = url;
      state.customBgMediaType = file.type.startsWith('video') ? 'video' : 'image';

      if (state.customBgMediaType === 'video') {
        const tempVid = document.createElement('video');
        tempVid.src = url;
        tempVid.onloadeddata = () => {
          if (state.autoCycle) {
            updateCustomThemeColor(extractColorFromMedia(tempVid));
          }
          if (state.theme === 'custom') applyTheme('custom');
        };
      } else {
        const tempImg = new Image();
        tempImg.src = url;
        tempImg.onload = () => {
          if (state.autoCycle) {
            updateCustomThemeColor(extractColorFromMedia(tempImg));
          }
          if (state.theme === 'custom') applyTheme('custom');
        };
      }
    });
  }

  const customAutoBtn = document.getElementById('custom-auto-btn');
  if (customAutoBtn) {
    customAutoBtn.addEventListener('click', () => {
      if (state.customBgMediaUrl) {
        if (state.customBgMediaType === 'video') {
          const v = document.getElementById('theme-video');
          if (v) updateCustomThemeColor(extractColorFromMedia(v));
        } else if (state.currentBgImg) {
          updateCustomThemeColor(extractColorFromMedia(state.currentBgImg));
        }
      }
    });
  }

  sourceButtons.forEach((button) => {
    button.addEventListener('click', async () => {
      sourceButtons.forEach((item) => item.classList.remove('active'));
      button.classList.add('active');
      await switchSource(button.dataset.source);
      updateStartButtonLabel();
    });
  });

  btnStart.addEventListener('click', async () => {
    initAutoPip();
    if (!state.running) {
      btnStart.textContent = 'Connecting';
      btnStart.disabled = true;
      await startVisualizer();
      return;
    }
    stopAll();
    resetButton();
    filePlayer.classList.add('hidden');
    audioEl.pause();
    showStatus();
    btnPause.textContent = 'PAUSE';
    state.paused = false;
    const overlay = document.getElementById('pause-overlay');
    if (overlay) {
      overlay.classList.remove('visible');
    }
  });

  fileInput.addEventListener('change', async (event) => {
    const file = event.target.files[0];
    if (!file) {
      return;
    }
    btnStart.textContent = 'Loading';
    btnStart.disabled = true;
    const ok = await initFile(file);
    if (ok) {
      state.running = true;
      state.paused = false;
      initAmbientParticles();
      initBgParticles();
      if (!state.animFrameId) {
        renderLoop();
      }
      btnStart.innerHTML = '<span class="btn-icon">STOP</span><span>Stop</span>';
      btnStart.classList.add('active');
      btnStart.disabled = false;
      btnPause.disabled = false;
      btnPause.textContent = 'PAUSE';
      hideStatus();
      updateMiniLabel();
    } else {
      resetButton();
    }
    fileInput.value = '';
  });

  btnPause.addEventListener('click', () => {
    state.paused = !state.paused;
    btnPause.textContent = state.paused ? 'PLAY' : 'PAUSE';

    if (state.pipWindow) {
      const pipPauseBtn = state.pipWindow.document.getElementById('pip-pause');
      if (pipPauseBtn) pipPauseBtn.textContent = state.paused ? 'PLAY' : 'PAUSE';
    }

    if (state.audioSource === 'file') {
      if (state.paused) {
        audioEl.pause();
        fpPlayPause.textContent = 'PLAY';
      } else {
        audioEl.play();
        fpPlayPause.textContent = 'PAUSE';
      }
    }
    let overlay = document.getElementById('pause-overlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = 'pause-overlay';
      overlay.innerHTML = '<div id="pause-label">PAUSED</div>';
      document.body.appendChild(overlay);
    }
    overlay.classList.toggle('visible', state.paused);
  });

  fpPlayPause.addEventListener('click', () => {
    if (audioEl.paused) {
      audioEl.play();
      fpPlayPause.textContent = 'PAUSE';
      state.paused = false;
      btnPause.textContent = 'PAUSE';
    } else {
      audioEl.pause();
      fpPlayPause.textContent = 'PLAY';
      state.paused = true;
      btnPause.textContent = 'PLAY';
    }
  });

  audioEl.addEventListener('ended', () => {
    fpPlayPause.textContent = 'PLAY';
  });

  fpProgressWrap.addEventListener('click', (event) => {
    if (!audioEl.duration) {
      return;
    }
    const rect = fpProgressWrap.getBoundingClientRect();
    audioEl.currentTime = ((event.clientX - rect.left) / rect.width) * audioEl.duration;
  });

  btnFullscreen.addEventListener('click', () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      return;
    }
    document.exitFullscreen().catch(() => {});
  });

  btnScreenshot.addEventListener('click', () => {
    const link = document.createElement('a');
    link.download = `spectr-${Date.now()}.png`;
    link.href = canvas.toDataURL();
    link.click();
  });

  btnMini.addEventListener('click', (event) => {
    if (event.shiftKey) {
      openMiniWindow();
      return;
    }
    toggleMiniOverlay();
  });

  btnMini.title = 'Mini overlay. Shift-click for popup.';

  miniCloseBtn.addEventListener('click', () => {
    miniOverlayEl.classList.add('hidden');
    btnMini.style.borderColor = '';
    btnMini.style.boxShadow = '';
  });

  miniPipBtn.addEventListener('click', () => {
    requestPip();
  });

  modeButtons.forEach((button) => {
    button.addEventListener('click', () => {
      state.mode = button.dataset.mode;
      modeButtons.forEach((item) => item.classList.remove('active'));
      button.classList.add('active');
      if (state.mode === 'vortex') {
        state.vortexQuality = 'low';
        state.vortexLoadAvg = 0;
        state.vortexStableFrames = 0;
        state.vortexPoolQuality = 0;
      }

      if (state.mode === 'milkdrop') {
        loadThemePreset(state.theme);
        state.bcLastCycle = performance.now();
      }
      updateModeVisibility();

      if (state.pipWindow) {
        const pipModeSel = state.pipWindow.document.getElementById('pip-mode');
        if (pipModeSel) pipModeSel.value = state.mode;
      }
    });
  });

  themeButtons.forEach((button) => {
    button.addEventListener('click', () => {
      applyTheme(button.dataset.theme);
    });
  });

  sensitivitySlider.addEventListener('input', () => {
    state.sensitivity = parseFloat(sensitivitySlider.value);
    sensitivityVal.textContent = state.sensitivity.toFixed(1);
  });

  toggleBg.addEventListener('change', () => {
    state.showBgFx = toggleBg.checked;
    if (state.mode === 'milkdrop' && state.showBgFx) {
      loadThemePreset(state.theme);
      state.bcLastCycle = performance.now();
    }
    updateModeVisibility();
  });

  toggleAutocycle.addEventListener('change', () => {
    state.autoCycle = toggleAutocycle.checked;
    const bcCanvas = document.getElementById('butterchurn-canvas');
    if (bcCanvas) updateMilkdropFilter(bcCanvas);

    if (state.pipWindow) {
      const pipAuto = state.pipWindow.document.getElementById('pip-autocolor');
      if (pipAuto) pipAuto.textContent = state.autoCycle ? 'AUTO: ON' : 'AUTO: OFF';
    }
  });

  toggleBass.addEventListener('change', () => {
    state.bassMode = toggleBass.checked;
    if (state.pipWindow) {
      const pipBass = state.pipWindow.document.getElementById('pip-bass');
      if (pipBass) pipBass.textContent = state.bassMode ? 'BASS: ON' : 'BASS: OFF';
    }
  });

  document.addEventListener('click', () => {
    if (state.audioCtx && state.audioCtx.state === 'suspended') {
      state.audioCtx.resume();
    }
  });

  // Global Auto-hide HUD logic
  let controlsTimer = null;
  function resetControlsTimeout() {
    document.body.classList.remove('controls-hidden');
    if (controlsTimer) clearTimeout(controlsTimer);
    if (!state.running) return;
    controlsTimer = setTimeout(() => {
      document.body.classList.add('controls-hidden');
    }, 3000);
  }
  window.addEventListener('mousemove', resetControlsTimeout);
  window.addEventListener('mousedown', resetControlsTimeout);
  window.addEventListener('keydown', resetControlsTimeout);
  document.getElementById('control-panel').addEventListener('change', resetControlsTimeout);
  resetControlsTimeout();
}

window.state = state;

(function boot() {
  buildIdleScreen();
  handleUi();
  applyIntroTitleMobileFix();
  window.addEventListener('resize', applyIntroTitleMobileFix);
  applyTheme('default', true);
  initBgParticles();
  initAmbientParticles();
  updateMiniLabel();
  idleAnimation();

  if ('mediaSession' in navigator) {
    navigator.mediaSession.setActionHandler('play', () => {
      if (state.paused) btnPause.click();
    });
    navigator.mediaSession.setActionHandler('pause', () => {
      if (!state.paused) btnPause.click();
    });
  }

  // Background worker to keep PIP alive when tab is hidden
  const code = `
    self.onmessage = function(e) {
      if (e.data === 'ping') {
        setTimeout(() => self.postMessage('tick'), 30);
      }
    };
  `;
  const blob = new Blob([code], { type: 'application/javascript' });
  const bgWorker = new Worker(URL.createObjectURL(blob));
  bgWorker.onmessage = () => {
    if (document.hidden && state.running && !state.paused) {
      renderLoop(true);
      bgWorker.postMessage('ping');
    }
  };
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      if (state.running && !state.paused) {
        bgWorker.postMessage('ping');
        if (!state.pipWindow && !document.pictureInPictureElement) {
          requestPip(true).catch(() => {});
        }
      }
    } else {
      if (state.pipWindow) {
        state.pipWindow.close();
      }
      const v = document.getElementById('pip-video');
      if (v && state.running && !state.paused) {
        v.play().catch(() => {});
      }
    }
  });
})();

function initAutoPip() {
  if (!document.pictureInPictureEnabled) return;

  let video = document.getElementById('pip-video');
  if (!video) {
    video = document.createElement('video');
    video.id = 'pip-video';
    video.style.position = 'fixed';
    video.style.bottom = '0';
    video.style.right = '0';
    video.style.width = '100px';
    video.style.height = '100px';
    video.style.opacity = '0.01';
    video.style.pointerEvents = 'none';
    video.style.zIndex = '-9999';
    video.muted = true;
    video.playsInline = true;
    document.body.appendChild(video);
  }

  if (!video.srcObject) {
    try {
      video.srcObject = miniCanvas.captureStream(30);
      video.autoPictureInPicture = true;
      video.addEventListener('leavepictureinpicture', () => {
        if (state.running && !state.paused) {
          video.play().catch(() => {});
        }
      });
      video.play().catch(e => console.warn('Auto PiP video play blocked:', e));
    } catch (error) {
      console.warn('Could not initialize auto-PiP stream:', error);
    }
  }
}


// ==========================================
// THREE.JS VORTEX MODE
// ==========================================

let THREE, EffectComposer, RenderPass, UnrealBloomPass, Reflector;

async function initThreeVortex() {
  if (state.threeVortexInitialized || !state.threeVortexSupported) return;
  state.threeVortexInitialized = 'loading';

  try {
    THREE = await import('three');
    const [composerModule, renderPassModule, bloomPassModule, reflectorModule] = await Promise.all([
      import('three/addons/postprocessing/EffectComposer.js'),
      import('three/addons/postprocessing/RenderPass.js'),
      import('three/addons/postprocessing/UnrealBloomPass.js'),
      import('three/addons/objects/Reflector.js')
    ]);
    EffectComposer = composerModule.EffectComposer;
    RenderPass = renderPassModule.RenderPass;
    UnrealBloomPass = bloomPassModule.UnrealBloomPass;
    Reflector = reflectorModule.Reflector;
    
    setupThreeScene();
    state.threeVortexInitialized = true;
    resizeThreeVortex();
  } catch (err) {
    console.error('Failed to initialize Premium Three.js Vortex:', err);
    state.threeVortexSupported = false;
  }
}

// Extrude a premium flat-top hexagonal ring with bevels
function createThickHexRing(radius, tubeRadius, color, emissiveIntensity) {
  const shape = new THREE.Shape();
  for (let i = 0; i < 6; i++) {
    const angle = i * Math.PI / 3;
    const x = radius * Math.cos(angle);
    const y = radius * Math.sin(angle);
    if (i === 0) shape.moveTo(x, y);
    else shape.lineTo(x, y);
  }
  shape.closePath();

  const hole = new THREE.Path();
  const innerRadius = radius - tubeRadius;
  for (let i = 5; i >= 0; i--) {
    const angle = i * Math.PI / 3;
    const x = innerRadius * Math.cos(angle);
    const y = innerRadius * Math.sin(angle);
    if (i === 5) hole.moveTo(x, y);
    else hole.lineTo(x, y);
  }
  hole.closePath();
  shape.holes.push(hole);

  const extrudeSettings = {
    depth: 0.12,
    bevelEnabled: true,
    bevelThickness: 0.02,
    bevelSize: 0.02,
    bevelSegments: 2
  };

  const geo = new THREE.ExtrudeGeometry(shape, extrudeSettings);
  geo.center();

  const mat = new THREE.MeshStandardMaterial({
    color: 0x05000a,
    emissive: new THREE.Color(color),
    emissiveIntensity: emissiveIntensity,
    roughness: 0.1,
    metalness: 0.9
  });

  return new THREE.Mesh(geo, mat);
}

// Helper to create beveled 3D boxes for modules
function createBeveledBox(w, h, d, bevel, color, emissive, emissiveIntensity) {
  const shape = new THREE.Shape();
  const x = -w/2;
  const y = -h/2;
  shape.moveTo(x + bevel, y);
  shape.lineTo(x + w - bevel, y);
  shape.quadraticCurveTo(x + w, y, x + w, y + bevel);
  shape.lineTo(x + w, y + h - bevel);
  shape.quadraticCurveTo(x + w, y + h, x + w - bevel, y + h);
  shape.lineTo(x + bevel, y + h);
  shape.quadraticCurveTo(x, y + h, x, y + h - bevel);
  shape.lineTo(x, y + bevel);
  shape.quadraticCurveTo(x, y, x + bevel, y);
  shape.closePath();

  const geo = new THREE.ExtrudeGeometry(shape, {
    depth: d - bevel * 2,
    bevelEnabled: true,
    bevelThickness: bevel,
    bevelSize: bevel,
    bevelSegments: 2
  });
  geo.center();

  const mat = new THREE.MeshStandardMaterial({
    color: new THREE.Color(color),
    emissive: new THREE.Color(emissive),
    emissiveIntensity: emissiveIntensity,
    roughness: 0.15,
    metalness: 0.85
  });
  return new THREE.Mesh(geo, mat);
}

// Generate flat wedge geometry for volumetric light shafts
function createLightShaft(isRight) {
  const geo = new THREE.BufferGeometry();
  const w = 0.6;  
  const h = 0.95; 
  const len = 1.8; 
  
  const vertices = new Float32Array(isRight ? [
    0, h/2, -w/2, 0, h/2, w/2, -len, 0, 0,
    0, -h/2, w/2, 0, -h/2, -w/2, -len, 0, 0,
    0, h/2, w/2, 0, -h/2, w/2, -len, 0, 0,
    0, -h/2, -w/2, 0, h/2, -w/2, -len, 0, 0
  ] : [
    0, h/2, -w/2, len, 0, 0, 0, h/2, w/2,
    0, -h/2, w/2, len, 0, 0, 0, -h/2, -w/2,
    0, h/2, w/2, len, 0, 0, 0, -h/2, w/2,
    0, -h/2, -w/2, len, 0, 0, 0, h/2, -w/2
  ]);
  
  geo.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
  geo.computeVertexNormals();
  
  const mat = new THREE.MeshBasicMaterial({
    color: 0xcc0088,
    opacity: 0.04,
    transparent: true,
    side: THREE.DoubleSide,
    depthWrite: false,
    blending: THREE.AdditiveBlending
  });
  
  return new THREE.Mesh(geo, mat);
}

// Premium infinity mirror panel — nested magenta/cyan glowing frames
function createInfinityMirrorPanel(width, height) {
  const group   = new THREE.Group();
  const mats    = [];
  const borderW = 0.022;  // Dark mirror backing (occlude geometry behind the panel)
  const base = new THREE.Mesh(
    new THREE.PlaneGeometry(width, height),
    new THREE.MeshBasicMaterial({ color: 0x010004 })
  );
  group.add(base);

  const frameCount = 7;
  for (let i = 0; i < frameCount; i++) {
    const scale  = 1.0 - i * 0.12;
    if (scale < 0.08) break;

    const fw    = width  * scale;
    const fh    = height * scale;
    const zOff  = -(i + 1) * 0.006;
    const color = (i % 2 === 0) ? 0xff00cc : 0x00ccff;
    const baseOp = Math.max(0.05, 0.88 - i * 0.11);

    const mat = new THREE.MeshBasicMaterial({
      color,
      transparent: true,
      opacity: baseOp,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    mat.userData.baseOpacity = baseOp;
    mats.push(mat);

    const addStrip = (sw, sh, sx, sy) => {
      const mesh = new THREE.Mesh(new THREE.PlaneGeometry(sw, sh), mat);
      mesh.position.set(sx, sy, zOff);
      group.add(mesh);
    };
    
    addStrip(fw,      borderW, 0,                     fh / 2 - borderW / 2);  // top edge
    addStrip(fw,      borderW, 0,                    -fh / 2 + borderW / 2);  // bottom edge
    addStrip(borderW, fh,     -fw / 2 + borderW / 2,  0);                     // left edge
    addStrip(borderW, fh,      fw / 2 - borderW / 2,  0);                     // right edge
  }

  return { group, mats };
}

// Flat hexagonal ring outline — 6 thin quads forming a hex border (used for OLED mirror)
function createHexRingGroup(radius, tubeR, color, opacity) {
  const group = new THREE.Group();
  const mat = new THREE.MeshBasicMaterial({
    color,
    transparent: true,
    opacity,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  });
  mat.userData.baseOpacity = opacity;
  group.userData.mat = mat;

  for (let i = 0; i < 6; i++) {
    const a1 = i       * Math.PI / 3;
    const a2 = (i + 1) * Math.PI / 3;
    const x1 = radius * Math.cos(a1), y1 = radius * Math.sin(a1);
    const x2 = radius * Math.cos(a2), y2 = radius * Math.sin(a2);
    const cx  = (x1 + x2) / 2,  cy  = (y1 + y2) / 2;
    const len = Math.hypot(x2 - x1, y2 - y1);
    const ang = Math.atan2(y2 - y1, x2 - x1);
    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(len + tubeR, tubeR * 2), mat);
    mesh.position.set(cx, cy, 0);
    mesh.rotation.z = ang;
    group.add(mesh);
  }
  return group;
}

// ================================================================
// VORTEX THEME PALETTES — one entry per app theme
// primary   = outer hex ring color
// secondary = inner hex ring color  
// accent    = node dots, spine emissive
// frameCol  = side module frame emissive
// glowCol   = side module glow panel emissive
// haze      = atmospheric haze cylinder color
// fog       = scene fog + background color
// ================================================================
const VORTEX_THEMES = {
  default:  { primary: 0xff00cc, secondary: 0x00ccff, accent: 0xff00cc, frameCol: 0xcc00aa, glowCol: 0x99ddee, haze: 0x330044, fog: 0x0d0018 },
  classic:  { primary: 0xf0a24d, secondary: 0xffd27a, accent: 0xf0a24d, frameCol: 0xb46a2d, glowCol: 0xddbb88, haze: 0x281200, fog: 0x120b05 },
  bw:       { primary: 0xcccccc, secondary: 0x777777, accent: 0xdddddd, frameCol: 0x888888, glowCol: 0x999999, haze: 0x1a1a1a, fog: 0x030303 },
  rock:     { primary: 0xff416d, secondary: 0xb835ff, accent: 0xff4b83, frameCol: 0xff416d, glowCol: 0xdd6688, haze: 0x2a0010, fog: 0x08030f },
  memory:   { primary: 0x55aaee, secondary: 0x9988dd, accent: 0x77bbff, frameCol: 0x4499cc, glowCol: 0x6699bb, haze: 0x071428, fog: 0x050c16 },
  custom:   { primary: 0x00ffcc, secondary: 0x00ccff, accent: 0x00ffcc, frameCol: 0x00ccaa, glowCol: 0x55aaaa, haze: 0x001a14, fog: 0x000000 },
  chill:    { primary: 0xa975fa, secondary: 0x6b5bdb, accent: 0xa975fa, frameCol: 0x845ef7, glowCol: 0x8866cc, haze: 0x160830, fog: 0x0a0514 },
  study:    { primary: 0xddcc00, secondary: 0xcc8800, accent: 0xeecc11, frameCol: 0xbb9900, glowCol: 0x998822, haze: 0x1a1600, fog: 0x1a1a00 },
  phonk:    { primary: 0xcc0000, secondary: 0x880099, accent: 0xdd1111, frameCol: 0xaa1111, glowCol: 0x882222, haze: 0x280000, fog: 0x140000 }
};

function applyVortexTheme(data, scene, renderer) {
  // For custom theme: derive colors live from the user-picked palette
  let t;
  if (state.theme === 'custom') {
    const cp = THEMES.custom;
    const hexToInt = h => parseInt(h.replace('#',''), 16);
    const primary   = hexToInt(cp.palette[0] || '#00ffcc');
    const secondary = hexToInt(cp.palette[1] || '#00ccff');
    const accent    = primary;
    const frameCol  = hexToInt(cp.palette[2] || '#009988');
    const glowCol   = hexToInt(cp.palette[1] || '#33aaaa');
    // Fog derived from background[0] (very dark version of picked color)
    const fogHex    = cp.background[0] || '#000000';
    const fog       = hexToInt(fogHex);
    const hazeHex   = cp.background[1] || '#0a0a0a';
    const haze      = hexToInt(hazeHex);
    t = { primary, secondary, accent, frameCol, glowCol, haze, fog };
  } else {
    t = VORTEX_THEMES[state.theme] || VORTEX_THEMES.default;
  }
  const fogColor = new THREE.Color(t.fog);

  // Fog + background
  if (scene.fog)       scene.fog.color.set(fogColor);
  if (scene.background) scene.background.set(fogColor);
  renderer.setClearColor(fogColor);

  // Hex rings — outer and inner
  data.rings.forEach((r, idx) => {
    const variation = idx % 3;
    let outerHex = t.primary;
    // Slight variation on outer ring for depth
    if (variation === 1) outerHex = t.secondary;
    else if (variation === 2) outerHex = t.primary;
    r.outerMesh.material.emissive.setHex(outerHex);
    r.innerMesh.material.emissive.setHex(t.secondary);
    // Node dots
    r.group.children.forEach(child => {
      if (child.isMesh && !child.userData.isRing) {
        if (child.material && child.material.emissive) {
          child.material.emissive.setHex(t.accent);
        }
      }
    });
  });

  // Side wall modules — frame + glow
  data.modules.forEach(m => {
    if (m.glowR.material && m.glowR.material.emissive) m.glowR.material.emissive.setHex(t.glowCol);
    if (m.glowL.material && m.glowL.material.emissive) m.glowL.material.emissive.setHex(t.glowCol);
    // frames
    m.group.traverse(child => {
      if (child.isMesh && child !== m.glowR && child !== m.glowL && child.material && child.material.emissive) {
        child.material.emissive.setHex(t.frameCol);
      }
    });
  });

  // Particles — primary color
  if (data.particles) {
    const pColor = new THREE.Color(t.primary);
    const sColor = new THREE.Color(t.secondary);
    const cols = data.particles.geo.attributes.color.array;
    for (let i = 0; i < cols.length; i += 3) {
      const usePrimary = Math.random() < 0.65;
      cols[i]     = usePrimary ? pColor.r : sColor.r;
      cols[i + 1] = usePrimary ? pColor.g : sColor.g;
      cols[i + 2] = usePrimary ? pColor.b : sColor.b;
    }
    data.particles.geo.attributes.color.needsUpdate = true;
  }

  // Haze cylinder
  if (data.hazeMat) data.hazeMat.color.setHex(t.haze);

  // Spine struts
  if (data.spineMats) {
    data.spineMats.forEach(m => m.emissive.setHex(t.secondary));
  }

  // Infinity mirror panels — tint to primary/secondary
  if (data.infinityMats) {
    data.infinityMats.forEach((mat, idx) => {
      mat.color.setHex(idx % 2 === 0 ? t.primary : t.secondary);
    });
  }

  data._lastAppliedTheme = state.theme;
}

function setupThreeScene() {
  const canvas = document.getElementById('three-canvas');
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5)); // Cap: high-DPI screens would otherwise render 4x pixels
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 0.72;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  state.threeVortexRenderer = renderer;

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x0d0018, 0.011);
  scene.background = new THREE.Color(0x0d0018);
  state.threeVortexScene = scene;

  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 500);
  camera.position.set(0, 0.3, 2);
  camera.lookAt(0, 0.3, -100);
  state.threeVortexCamera = camera;

  const renderScene = new RenderPass(scene, camera);
  const bloomPass = new UnrealBloomPass(
    new THREE.Vector2(window.innerWidth, window.innerHeight),
    0.75, 0.40, 0.25
  );
  const composer = new EffectComposer(renderer);
  composer.addPass(renderScene);
  composer.addPass(bloomPass);
  state.threeVortexComposer = composer;

  scene.add(new THREE.AmbientLight(0x220033, 0.4));

  const hexRadius   = 3.0;
  const ringCount   = 24;
  const ringSpacing = 4.0;
  const tunnelLen   = ringCount * ringSpacing;

  state.threeVortexData = {
    rings: [], modules: [],
    particles: null,
    bloomPass,
    ringCount, ringSpacing,
    flySpeed: 0.06,
    cameraKick: 0,
    smoothedBass: 0, smoothedLowMid: 0,
    smoothedMid: 0, smoothedHigh: 0,
    smoothedAmplitude: 0, lastBeatTime: 0
  };

  // ================================================================
  // GLOSSY MIRROR FLOOR & CEILING
  // ================================================================
  let bgReflector; // Declare early for mutual visibility hiding during render passes

  const floorGeo = new THREE.PlaneGeometry(10, tunnelLen + 20, 1, 1);
  const floorReflector = new Reflector(floorGeo, {
    clipBias: 0.003,
    textureWidth: 1024,
    textureHeight: 1024,
    color: 0x110218
  });
  
  const oldFloorRender = floorReflector.onBeforeRender;
  floorReflector.onBeforeRender = function(renderer, scene, camera) {
    if (bgReflector) bgReflector.visible = false;
    oldFloorRender.call(this, renderer, scene, camera);
    if (bgReflector) bgReflector.visible = true;
  };

  floorReflector.rotation.x = -Math.PI / 2;
  floorReflector.position.set(0, -hexRadius, -(tunnelLen / 2));
  scene.add(floorReflector);

  const ceilGeo = new THREE.PlaneGeometry(10, tunnelLen + 20, 1, 1);
  const ceilReflector = new Reflector(ceilGeo, {
    clipBias: 0.003,
    textureWidth: 1024,
    textureHeight: 1024,
    color: 0x110218
  });

  const oldCeilRender = ceilReflector.onBeforeRender;
  ceilReflector.onBeforeRender = function(renderer, scene, camera) {
    if (bgReflector) bgReflector.visible = false;
    oldCeilRender.call(this, renderer, scene, camera);
    if (bgReflector) bgReflector.visible = true;
  };

  ceilReflector.rotation.x = Math.PI / 2;
  ceilReflector.position.set(0, hexRadius, -(tunnelLen / 2));
  scene.add(ceilReflector);

  // ================================================================
  // SPINE STRUTS
  // ================================================================
  const spineGeo = new THREE.BoxGeometry(0.04, 0.04, tunnelLen + 20);
  const spineMat = new THREE.MeshStandardMaterial({
    color: 0x000000,
    emissive: new THREE.Color(0x22aadd),
    emissiveIntensity: 0.55,
    roughness: 0.15,
    metalness: 0.85
  });
  const topSpine = new THREE.Mesh(spineGeo, spineMat);
  topSpine.position.set(0, hexRadius, -(tunnelLen / 2));
  scene.add(topSpine);

  const botSpineMat = spineMat.clone();
  const botSpine = new THREE.Mesh(spineGeo, botSpineMat);
  botSpine.position.set(0, -hexRadius, -(tunnelLen / 2));
  scene.add(botSpine);

  state.threeVortexData.spineMats = [spineMat, botSpineMat];

  // ================================================================
  // HEX RINGS
  // ================================================================
  for (let i = 0; i < ringCount; i++) {
    const zPos = -(i * ringSpacing);
    const ringGroup = new THREE.Group();
    ringGroup.position.z = zPos;

    // Alternate outer ring color between magenta and deep violet for variety
    const outerColor = (i % 3 === 0) ? 0xff00cc : (i % 3 === 1) ? 0xdd00ff : 0xff00aa;
    const outer = createThickHexRing(hexRadius, 0.07, outerColor, 1.1);
    ringGroup.add(outer);

    const inner = createThickHexRing(hexRadius - 0.28, 0.05, 0x00ccff, 0.85);
    ringGroup.add(inner);

    // Corner node accent dots — smaller and subtler
    const nodeMat = new THREE.MeshStandardMaterial({
      color: 0x000000,
      emissive: new THREE.Color(0xff00cc),
      emissiveIntensity: 1.2,
      roughness: 0.1,
      metalness: 0.9
    });
    const nodeGeo = new THREE.BoxGeometry(0.09, 0.09, 0.09);
    
    const nodeTop = new THREE.Mesh(nodeGeo, nodeMat);
    nodeTop.position.set(0, hexRadius, 0);
    
    const nodeBot = new THREE.Mesh(nodeGeo, nodeMat.clone());
    nodeBot.position.set(0, -hexRadius, 0);
    
    ringGroup.add(nodeTop, nodeBot);

    scene.add(ringGroup);

    state.threeVortexData.rings.push({
      group: ringGroup,
      outerMesh: outer,
      innerMesh: inner,
      nodeMats: [nodeMat, nodeBot.material],
      baseScale: 1.0
    });
  }

  // ================================================================
  // SIDE WALL MODULES
  // ================================================================
  const sideX = hexRadius;

  for (let i = 0; i < ringCount - 1; i++) {
    const zPos = -(i * ringSpacing) - ringSpacing / 2;
    const modGroup = new THREE.Group();
    modGroup.position.z = zPos;

    // Right Side Module
    const rGroup = new THREE.Group();
    rGroup.position.set(sideX, 0, 0);
    
    const rFrame = createBeveledBox(0.8, 1.2, 0.4, 0.02, 0x020005, 0xcc00aa, 0.5);
    rFrame.rotation.y = Math.PI / 2;
    
    const rGlow = createBeveledBox(0.6, 0.95, 0.05, 0.005, 0x001122, 0xe0faff, 1.2);
    rGlow.rotation.y = Math.PI / 2;
    rGlow.position.set(-0.18, 0, 0);
    
    const rShaft = createLightShaft(true);
    rShaft.position.set(-0.2, 0, 0);

    rGroup.add(rFrame, rGlow, rShaft);
    modGroup.add(rGroup);

    // Left Side Module
    const lGroup = new THREE.Group();
    lGroup.position.set(-sideX, 0, 0);
    
    const lFrame = createBeveledBox(0.8, 1.2, 0.4, 0.02, 0x020005, 0xcc00aa, 0.5);
    lFrame.rotation.y = Math.PI / 2;
    
    const lGlow = createBeveledBox(0.6, 0.95, 0.05, 0.005, 0x001122, 0xe0faff, 1.2);
    lGlow.rotation.y = Math.PI / 2;
    lGlow.position.set(0.18, 0, 0);
    
    const lShaft = createLightShaft(false);
    lShaft.position.set(0.2, 0, 0);

    lGroup.add(lFrame, lGlow, lShaft);
    modGroup.add(lGroup);

    scene.add(modGroup);
    state.threeVortexData.modules.push({
      group: modGroup,
      glowR: rGlow,
      glowL: lGlow
    });
  }

  // ================================================================
  // ATMOSPHERIC HAZE CYLINDER
  // ================================================================
  const hazeGeo = new THREE.CylinderGeometry(hexRadius * 0.9, hexRadius * 0.9, tunnelLen + 20, 6, 1, true);
  const hazeMat = new THREE.MeshBasicMaterial({
    color: 0x330044,
    opacity: 0.03,
    transparent: true,
    side: THREE.BackSide,
    depthWrite: false
  });
  const hazeMesh = new THREE.Mesh(hazeGeo, hazeMat);
  hazeMesh.rotation.x = Math.PI / 2;
  hazeMesh.position.set(0, 0, -(tunnelLen / 2));
  scene.add(hazeMesh);
  state.threeVortexData.hazeMat = hazeMat; // store ref for theme hot-swap

  // ================================================================
  // FLOATING PARTICLES — THREE.Points for performance
  // ================================================================
  const pCount = 150;
  const pPositions = new Float32Array(pCount * 3);
  const pColors    = new Float32Array(pCount * 3);
  const pSpeeds    = new Float32Array(pCount);
  const magenta = new THREE.Color(0xff44cc);
  const cyan    = new THREE.Color(0x44ddff);

  for (let i = 0; i < pCount; i++) {
    pPositions[i * 3]     = (Math.random() - 0.5) * hexRadius * 2.4;
    pPositions[i * 3 + 1] = (Math.random() - 0.5) * hexRadius * 2.0;
    pPositions[i * 3 + 2] = -Math.random() * tunnelLen;
    const col = Math.random() < 0.65 ? magenta : cyan;
    pColors[i * 3]     = col.r;
    pColors[i * 3 + 1] = col.g;
    pColors[i * 3 + 2] = col.b;
    pSpeeds[i] = 0.018 + Math.random() * 0.028;
  }

  const pGeo = new THREE.BufferGeometry();
  pGeo.setAttribute('position', new THREE.BufferAttribute(pPositions, 3));
  pGeo.setAttribute('color',    new THREE.BufferAttribute(pColors,    3));

  const pMat = new THREE.PointsMaterial({
    size: 0.055,
    vertexColors: true,
    transparent: true,
    opacity: 0.65,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    sizeAttenuation: true
  });

  const particleSystem = new THREE.Points(pGeo, pMat);
  scene.add(particleSystem);
  state.threeVortexData.particles = { system: particleSystem, geo: pGeo, speeds: pSpeeds, count: pCount, tunnelLen };

  // ================================================================
  // INFINITY MIRROR WALL PANELS: top / mid / bottom × left / right
  // ================================================================
  const panelW    = 2.5;           // local width  → world-Z extent after Y rotation
  const panelH    = 1.02;          // local height → world-Y extent
  const panelSets = 5;             // how many sets along the tunnel
  const panelStep = tunnelLen / panelSets;
  const panelYs   = [hexRadius * 0.50, 0, -hexRadius * 0.50];  // top / mid / bottom
  const ipGroups  = [];
  const ipMats    = [];

  for (let si = 0; si < panelSets; si++) {
    const setGrp = new THREE.Group();
    setGrp.position.z = -(si * panelStep + panelStep * 0.5);

    panelYs.forEach(yp => {
      // Right wall: rotate -90° around Y so panel face points toward -X (into tunnel)
      const rp = createInfinityMirrorPanel(panelW, panelH);
      rp.group.position.set(hexRadius - 0.08, yp, 0);
      rp.group.rotation.y = -Math.PI / 2;
      setGrp.add(rp.group);
      rp.mats.forEach(m => ipMats.push(m));

      // Left wall: rotate +90° around Y so panel face points toward +X (into tunnel)
      const lp = createInfinityMirrorPanel(panelW, panelH);
      lp.group.position.set(-(hexRadius - 0.08), yp, 0);
      lp.group.rotation.y = Math.PI / 2;
      setGrp.add(lp.group);
      lp.mats.forEach(m => ipMats.push(m));
    });

    scene.add(setGrp);
    ipGroups.push(setGrp);
  }

  state.threeVortexData.infinityPanels = ipGroups;
  state.threeVortexData.infinityMats   = ipMats;



  // Background mirror removed to eliminate the center reflection artifact.
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

function getEnergyForHz(startHz, endHz) {
  if (!state.freqData || !state.bufferLength || !state.audioCtx) return 0;
  const nyquist = state.audioCtx.sampleRate / 2;
  const startBin = Math.floor((startHz / nyquist) * state.bufferLength);
  const endBin   = Math.ceil((endHz   / nyquist) * state.bufferLength);
  let sum = 0, count = 0;
  for (let i = startBin; i <= endBin && i < state.bufferLength; i++) {
    sum += state.freqData[i];
    count++;
  }
  return count ? (sum / count) / 255 : 0;
}

function updateThreeVortexAudio() {
  const data = state.threeVortexData;
  if (!data) return;

  const now = performance.now();

  // ── Hot-swap theme colors whenever the user switches theme ────────
  if (data._lastAppliedTheme !== state.theme) {
    applyVortexTheme(data, state.threeVortexScene, state.threeVortexRenderer);
  }

  // ── Frequency energy (tuned for 0.7 sensitivity) ──────────────────
  let rawBass   = Math.min(getEnergyForHz(0,    200)   * state.sensitivity, 1.2);
  let rawLowMid = Math.min(getEnergyForHz(200,  800)   * state.sensitivity, 1.2);
  let rawMid    = Math.min(getEnergyForHz(800,  2000)  * state.sensitivity, 1.2);
  let rawHigh   = Math.min(getEnergyForHz(2000, 10000) * state.sensitivity, 1.2);
  let rawAmp    = Math.min(getEnergyForHz(0,    10000) * state.sensitivity, 1.2);

  // ── Dynamic AGC — normalises quiet mic vs loud file sources ───────
  if (!data.runningAmpAverage) data.runningAmpAverage = 0.18;
  if (data.smoothedAmplitude > 0.005) {
    data.runningAmpAverage = data.runningAmpAverage * 0.992 + data.smoothedAmplitude * 0.008;
  }
  // Gain range wider so 0.7 sensitivity still drives full visual range
  const dynamicGain = Math.min(Math.max(0.22 / data.runningAmpAverage, 0.6), 3.2);

  rawBass   *= dynamicGain;
  rawLowMid *= dynamicGain;
  rawMid    *= dynamicGain;
  rawHigh   *= dynamicGain;
  rawAmp    *= dynamicGain;

  // ── Smoothing — snappier response for reactive feel ───────────────
  data.smoothedBass      = data.smoothedBass      * 0.78 + rawBass   * 0.22;
  data.smoothedLowMid    = data.smoothedLowMid    * 0.74 + rawLowMid * 0.26;
  data.smoothedMid       = data.smoothedMid       * 0.70 + rawMid    * 0.30;
  data.smoothedHigh      = data.smoothedHigh      * 0.62 + rawHigh   * 0.38;
  data.smoothedAmplitude = data.smoothedAmplitude * 0.78 + rawAmp    * 0.22;

  // ── Beat detection → camera kick ─────────────────────────────────
  if (rawBass > data.smoothedBass * 1.35 && now - data.lastBeatTime > 180) {
    data.cameraKick = 0.22;
    data.lastBeatTime = now;
  }

  // ── Tunnel fly speed — audio driven ──────────────────────────────
  // base 0.06, amplitude pushes up to +0.22, beat kick adds burst
  // At 0.7 sensitivity this gives a satisfying 0.06–0.30 range
  const themeCfg = THEMES[state.theme] || THEMES.classic;
  const themeSpeedMult = themeCfg.animationSpeed || 0.6; // phonk=1.5, study=0.2 etc
  data.flySpeed  = (0.05 + data.smoothedAmplitude * 0.22 + data.cameraKick) * (0.6 + themeSpeedMult * 0.8);
  data.cameraKick *= 0.82;

  // ── Bloom — rises strongly with energy, theme glowIntensity scales peak ─
  const themeGlowMult = Math.min(themeCfg.glowIntensity || 0.8, 1.5);
  data.bloomPass.strength = Math.min(
    0.60 + data.smoothedLowMid * 0.35 * themeGlowMult + data.smoothedBass * 0.18 * themeGlowMult,
    1.05
  );

  // ── Wave history buffers (propagate bass/mid as wave down tunnel) ─
  if (!data.bassHistory) {
    data.bassHistory = new Array(data.rings.length).fill(0);
    data.midHistory  = new Array(data.modules.length).fill(0);
  }
  data.bassHistory.unshift(data.smoothedBass);
  data.bassHistory.pop();
  data.midHistory.unshift(data.smoothedMid);
  data.midHistory.pop();

  const t = now * 0.001;

  // ── Cinematic camera sway ─────────────────────────────────────────
  const swayX = Math.sin(t * 0.35) * 0.055 + Math.sin(t * 0.11) * 0.02;
  const swayY = Math.cos(t * 0.28) * 0.04  + Math.cos(t * 0.17) * 0.015;
  state.threeVortexCamera.position.x = swayX * (0.4 + data.smoothedBass * 0.7);
  state.threeVortexCamera.position.y = 0.25 + swayY * (0.4 + data.smoothedBass * 0.7);
  state.threeVortexCamera.rotation.z = Math.sin(t * 0.22) * 0.014 * (1 + data.smoothedBass * 0.6);

  const camZ     = state.threeVortexCamera.position.z;
  const wrapDist = data.ringCount * data.ringSpacing;

  // ── Hex rings — fly + scale pulse + emissive intensity glow ───────
  data.rings.forEach((r, idx) => {
    r.group.position.z += data.flySpeed;
    const ringBass = data.bassHistory[idx] || 0;
    // Scale pulse: more reactive — up to 12% expansion on beat
    const targetScale = 1.0 + ringBass * 0.12;
    r.baseScale = (r.baseScale || 1.0) * 0.85 + targetScale * 0.15;
    r.group.scale.set(r.baseScale, r.baseScale, 1);
    // Emissive glow surge on beat — kept moderate to preserve color fidelity
    const glowLevel = Math.min(0.75 + ringBass * 0.75, 1.4);
    if (r.outerMesh.material) r.outerMesh.material.emissiveIntensity = glowLevel;
    if (r.innerMesh.material) r.innerMesh.material.emissiveIntensity = Math.min(0.6 + ringBass * 0.65, 1.2);
    if (r.group.position.z > camZ + 2) r.group.position.z -= wrapDist;
  });

  // ── Side modules — fly + glow pulse ──────────────────────────────
  data.modules.forEach((m, idx) => {
    m.group.position.z += data.flySpeed;
    if (m.group.position.z > camZ + 2) m.group.position.z -= wrapDist;
    const modMid = data.midHistory[idx] || 0;
    // Glow surges moderately — preserves color without washing to white
    const targetGlow = 0.75 + modMid * 0.75 + data.smoothedBass * 0.28;
    m.glowR.material.emissiveIntensity = Math.min(targetGlow, 1.5);
    m.glowL.material.emissiveIntensity = Math.min(targetGlow, 1.5);
  });

  // ── Particles — fly + opacity pulse ──────────────────────────────
  const pData    = data.particles;
  const positions = pData.geo.attributes.position.array;
  const particleBoost = data.smoothedHigh * 0.10;
  const pWrapDist = pData.tunnelLen;
  for (let i = 0; i < pData.count; i++) {
    positions[i * 3 + 2] += pData.speeds[i] + particleBoost + data.flySpeed * 0.55;
    if (positions[i * 3 + 2] > camZ + 1) {
      positions[i * 3 + 2] -= pWrapDist;
      positions[i * 3]     = (Math.random() - 0.5) * 6.2;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 5.6;
    }
  }
  pData.geo.attributes.position.needsUpdate = true;
  pData.system.material.opacity = 0.38 + data.smoothedHigh * 0.42;

  // ── Infinity mirror panels ────────────────────────────────────────
  if (data.infinityPanels) {
    data.infinityPanels.forEach(g => {
      g.position.z += data.flySpeed;
      if (g.position.z > camZ + 2) g.position.z -= wrapDist;
    });
    const infPulse = Math.min(0.65 + data.smoothedMid * 0.60 + data.smoothedBass * 0.30, 1.6);
    data.infinityMats.forEach(mat => {
      mat.opacity = Math.min(mat.userData.baseOpacity * infPulse, 0.95);
    });
  }
}

// Target 30fps for vortex — halves GPU load vs uncapped 60fps, invisible on a slow tunnel
const _VORTEX_FRAME_MS = 1000 / 30;
let _vortexLastFrame = 0;

function renderThreeVortex() {
  if (!state.threeVortexComposer || !state.threeVortexData) return;
  const now = performance.now();
  if (now - _vortexLastFrame < _VORTEX_FRAME_MS) return; // skip frame — stay at ~30fps
  _vortexLastFrame = now;
  updateThreeVortexAudio();
  state.threeVortexComposer.render();
}
