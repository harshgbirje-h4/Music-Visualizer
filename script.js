<<<<<<< HEAD
'use strict';

const THEMES = {
  classic: {
    label: 'CLASSIC MODE',
    tagline: 'Warm nostalgia',
    palette: ['#ffd27a', '#f0a24d', '#b46a2d', '#6e4222'],
    glowColor: '#f0a24d',
    background: ['#120b05', '#28170d', '#4f311b'],
    analyserSmoothing: 0.9,
    beatScaleBoost: 0.028,
    beatFlashDuration: 120,
    beatCooldownMax: 24,
    barSharpness: 0.7,
    lineWidth: 3,
    glowIntensity: 0.65,
    amplitude: 0.72,
    animationSpeed: 0.55,
    bgParticleCount: 44,
    bgParticleSpeed: 0.42,
    particleTrail: 0.18,
    waveformSmoothness: 0.62,
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
    analyserSmoothing: 0.7,
    beatScaleBoost: 0.014,
    beatFlashDuration: 70,
    beatCooldownMax: 14,
    barSharpness: 1.35,
    lineWidth: 1.2,
    glowIntensity: 0.2,
    amplitude: 1.05,
    animationSpeed: 0.9,
    bgParticleCount: 120,
    bgParticleSpeed: 1.4,
    particleTrail: 0.06,
    waveformSmoothness: 0.22,
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
    analyserSmoothing: 0.63,
    beatScaleBoost: 0.05,
    beatFlashDuration: 85,
    beatCooldownMax: 10,
    barSharpness: 1.55,
    lineWidth: 4.2,
    glowIntensity: 1.18,
    amplitude: 1.22,
    animationSpeed: 1.18,
    bgParticleCount: 56,
    bgParticleSpeed: 1.25,
    particleTrail: 0.12,
    waveformSmoothness: 0.3,
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
    analyserSmoothing: 0.92,
    beatScaleBoost: 0.018,
    beatFlashDuration: 150,
    beatCooldownMax: 22,
    barSharpness: 0.82,
    lineWidth: 2.2,
    glowIntensity: 0.46,
    amplitude: 0.78,
    animationSpeed: 0.4,
    bgParticleCount: 68,
    bgParticleSpeed: 0.56,
    particleTrail: 0.13,
    waveformSmoothness: 0.72,
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
    palette: ['#4dabf7', '#9775fa', '#3b5bdb', '#845ef7'],
    glowColor: '#4dabf7',
    background: ['#0a0b12', '#141624', '#1d2136'],
    analyserSmoothing: 0.95,
    beatScaleBoost: 0.015,
    beatFlashDuration: 200,
    beatCooldownMax: 30,
    barSharpness: 0.5,
    lineWidth: 2,
    glowIntensity: 0.4,
    amplitude: 0.6,
    animationSpeed: 0.3,
    bgParticleCount: 40,
    bgParticleSpeed: 0.3,
    particleTrail: 0.2,
    waveformSmoothness: 0.8,
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
    palette: ['#ffffff', '#cccccc', '#999999', '#666666'],
    glowColor: '#ffffff',
    background: ['#000000', '#111111', '#222222'],
    analyserSmoothing: 0.98,
    beatScaleBoost: 0.005,
    beatFlashDuration: 300,
    beatCooldownMax: 40,
    barSharpness: 0.3,
    lineWidth: 1.5,
    glowIntensity: 0.2,
    amplitude: 0.4,
    animationSpeed: 0.2,
    bgParticleCount: 20,
    bgParticleSpeed: 0.2,
    particleTrail: 0.3,
    waveformSmoothness: 0.9,
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
    analyserSmoothing: 0.5,
    beatScaleBoost: 0.08,
    beatFlashDuration: 60,
    beatCooldownMax: 8,
    barSharpness: 2.0,
    lineWidth: 5.0,
    glowIntensity: 1.5,
    amplitude: 1.5,
    animationSpeed: 1.5,
    bgParticleCount: 80,
    bgParticleSpeed: 1.8,
    particleTrail: 0.05,
    waveformSmoothness: 0.1,
    staticNoise: 0.1,
    burstCount: 30,
    road: false,
    radio: false,
    scanlines: true,
    silhouettes: true
  }
};

const state = {
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
  sensitivity: 1.0,
  showBgFx: true,
  autoCycle: false,
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
  particles: [],
  bgParticles: [],
  bursts: [],
  vizParticles: [],
  roadOffset: 0,
  themePulse: 0,
  transitionTimer: null,
  idleFrameId: null,
  miniWindow: null,
  currentChillVideo: Math.random() < 0.5 ? 0 : 1
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

function themeConfig() {
  return THEMES[state.theme] || THEMES.classic;
}

=======
/* =========================================
   SPECTR — Audio Visualizer  v5
   Pixel-matched to reference image:
   • Symmetric top+bottom bars from centre
   • Massive bloom/glow like the photo
   • Yellow→Orange→Magenta→Pink→Violet→Blue→Cyan
   • Radial mode = same concept mapped to circle
   • All modes share one spectral colour system
   ========================================= */
'use strict';

// ── STATE ──────────────────────────────────
const state = {
  audioCtx:null, analyser:null, source:null, stream:null,
  fftSize:2048, bufferLength:0, freqData:null, timeData:null,
  audioSource:'mic',
  running:false, paused:false, animFrameId:null,
  mode:'bars', theme:'neon', sensitivity:1.0, showBgFx:true, autoCycle:false,
  beatThreshold:160, beatCooldown:0, beatCooldownMax:18, beatActive:false,
  colorHue:0, gradientT:0, radialAngle:0,
  particles:[], maxParticles:70,
  energy:0, energySmoothed:0, beatScale:1.0,
  miniWindow:null, miniOverlay:false,
};

// ── DOM ────────────────────────────────────
const canvas          = document.getElementById('viz-canvas');
const ctx             = canvas.getContext('2d');
const bgCanvas        = document.getElementById('bg-canvas');
const bgCtx           = bgCanvas.getContext('2d');
const miniCanvas      = document.getElementById('mini-canvas');
const miniCtx         = miniCanvas.getContext('2d');
const beatFlash       = document.getElementById('beat-flash');
const energyFill      = document.getElementById('energy-fill');
const btnStart        = document.getElementById('btn-start');
const btnPause        = document.getElementById('btn-pause');
const btnFullscreen   = document.getElementById('btn-fullscreen');
const btnScreenshot   = document.getElementById('btn-screenshot');
const btnMini         = document.getElementById('btn-mini');
const modeButtons     = document.querySelectorAll('.mode-btn');
const themeButtons    = document.querySelectorAll('.theme-btn');
const sourceButtons   = document.querySelectorAll('.source-btn');
const sensitivitySlider = document.getElementById('sensitivity-slider');
const sensitivityVal    = document.getElementById('sensitivity-val');
const toggleBg          = document.getElementById('toggle-bg');
const toggleAutocycle   = document.getElementById('toggle-autocycle');
const fileInput         = document.getElementById('file-input');
const audioEl           = document.getElementById('audio-element');
const filePlayer        = document.getElementById('file-player');
const filePlayerName    = document.getElementById('file-player-name');
const fpPlayPause       = document.getElementById('fp-playpause');
const fpProgressBar     = document.getElementById('fp-progress-bar');
const fpProgressWrap    = document.getElementById('fp-progress-wrap');
const fpTime            = document.getElementById('fp-time');
const sourceBadge       = document.getElementById('source-badge');
const sourceBadgeIcon   = document.getElementById('source-badge-icon');
const sourceBadgeText   = document.getElementById('source-badge-text');
const miniOverlayEl     = document.getElementById('mini-overlay');
const miniCloseBtn      = document.getElementById('mini-close');
const miniPipBtn        = document.getElementById('mini-pip-btn');
const miniSourceLabel   = document.getElementById('mini-source-label');

// ── RESIZE ─────────────────────────────────
>>>>>>> 9c4df1acd34d0733e195ccda157f98a3081ab930
function resizeCanvas() {
  canvas.width = bgCanvas.width = window.innerWidth;
  canvas.height = bgCanvas.height = window.innerHeight;
}
<<<<<<< HEAD

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

function mix(a, b, t) {
  return a + (b - a) * t;
}

function paletteColor(t, alpha = 1) {
  const theme = themeConfig();
  if (state.autoCycle && state.theme !== 'bw') {
    const hue = (state.colorHue + t * 180) % 360;
    return `hsla(${hue}, 100%, 68%, ${alpha})`;
  }

  const palette = theme.palette;
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

=======
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// ════════════════════════════════════════════
//  SPECTRAL COLOUR ENGINE
//  Pixel-sampled from the reference image:
//  pos 0.00 → bright yellow  (255,255,  0)
//  pos 0.12 → yellow-orange  (255,200,  0)
//  pos 0.22 → orange         (255,120,  0)
//  pos 0.33 → hot pink/magenta(255, 20,140)
//  pos 0.45 → violet-magenta (200,  0,255)
//  pos 0.57 → blue-violet    ( 80,  0,255)
//  pos 0.68 → royal blue     (  0, 80,255)
//  pos 0.80 → sky/cyan-blue  (  0,180,255)
//  pos 1.00 → pure cyan      (  0,255,230)
// ════════════════════════════════════════════
const SP = [
  [0.00, 255,255,  0],
  [0.12, 255,200,  0],
  [0.22, 255,120,  0],
  [0.33, 255, 20,140],
  [0.45, 200,  0,255],
  [0.57,  80,  0,255],
  [0.68,   0, 80,255],
  [0.80,   0,180,255],
  [1.00,   0,255,230],
];

// Returns rgba string for t in [0,1], animated by state.gradientT
function spectral(t, a) {
  if (a === undefined) a = 1;
  if (state.autoCycle) {
    const h = ((state.colorHue + t * 320) % 360 + 360) % 360;
    return `hsla(${h},100%,62%,${a})`;
  }
  // Slow drift of entire palette
  const ts = ((t + state.gradientT * 0.4) % 1 + 1) % 1;
  for (let i = 0; i < SP.length - 1; i++) {
    if (ts >= SP[i][0] && ts <= SP[i+1][0]) {
      const u = (ts - SP[i][0]) / (SP[i+1][0] - SP[i][0]);
      const r = Math.round(SP[i][1] + u * (SP[i+1][1] - SP[i][1]));
      const g = Math.round(SP[i][2] + u * (SP[i+1][2] - SP[i][2]));
      const b = Math.round(SP[i][3] + u * (SP[i+1][3] - SP[i][3]));
      return `rgba(${r},${g},${b},${a})`;
    }
  }
  return `rgba(0,255,230,${a})`;
}

// Linear gradient covering full spectral range across x0→x1
function spectralLinear(c, x0, y0, x1, y1) {
  const g = c.createLinearGradient(x0, y0, x1, y1);
  for (let i = 0; i <= 16; i++) g.addColorStop(i/16, spectral(i/16, 1));
  return g;
}

// ── GLOW ───────────────────────────────────
function glow(c, col, blur, fn) {
  c.shadowColor = col; c.shadowBlur = Math.max(0, blur);
  fn();
  c.shadowBlur = 0; c.shadowColor = 'transparent';
}

// ── AUDIO ──────────────────────────────────
>>>>>>> 9c4df1acd34d0733e195ccda157f98a3081ab930
function ensureCtx() {
  if (!state.audioCtx || state.audioCtx.state === 'closed') {
    state.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    state.analyser = state.audioCtx.createAnalyser();
    state.analyser.fftSize = state.fftSize;
<<<<<<< HEAD
=======
    state.analyser.smoothingTimeConstant = 0.82;
>>>>>>> 9c4df1acd34d0733e195ccda157f98a3081ab930
    state.bufferLength = state.analyser.frequencyBinCount;
    state.freqData = new Uint8Array(state.bufferLength);
    state.timeData = new Uint8Array(state.analyser.fftSize);
  }
<<<<<<< HEAD
  if (state.audioCtx.state === 'suspended') {
    state.audioCtx.resume();
  }
  applyTheme(state.theme, true);
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
      video: true,
      audio: {
        echoCancellation: false,
        noiseSuppression: false,
        sampleRate: 44100
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

function renderLoop() {
  if (!state.running) {
    return;
  }

  state.animFrameId = requestAnimationFrame(renderLoop);
  if (state.paused) {
    return;
  }

  state.analyser.getByteFrequencyData(state.freqData);
  state.analyser.getByteTimeDomainData(state.timeData);

  const theme = themeConfig();
  detectBeat(state.freqData);
  state.energy = averageEnergy(state.freqData);
  state.energySmoothed += (state.energy - state.energySmoothed) * 0.12;
  energyFill.style.height = `${state.energySmoothed * 100}%`;
  state.beatScale += (1 - state.beatScale) * 0.18;
  state.themePulse *= 0.92;
  state.gradientT = (state.gradientT + 0.0012 * theme.animationSpeed) % 1;
  state.radialAngle = (state.radialAngle + 0.005 * theme.animationSpeed) % (Math.PI * 2);
  state.roadOffset += theme.animationSpeed * (0.8 + state.energySmoothed * 4);
  if (state.autoCycle) {
    state.colorHue = (state.colorHue + theme.animationSpeed * 1.4) % 360;
  }

  const width = canvas.width;
  const height = canvas.height;
  ctx.save();
  ctx.translate(width / 2, height / 2);
  ctx.scale(state.beatScale, state.beatScale);
  ctx.translate(-width / 2, -height / 2);
  drawBackground(ctx, width, height);
  if (state.showBgFx) {
    drawAmbientOverlay(ctx, width, height);
  }
  drawMode(ctx, width, height);
  drawThemeForeground(ctx, width, height);
  ctx.restore();

  if (state.showBgFx) {
    drawBgCanvas();
  } else {
    bgCtx.clearRect(0, 0, bgCanvas.width, bgCanvas.height);
  }
  if (!miniOverlayEl.classList.contains('hidden')) {
    drawMini();
  }
  syncPopup();

  if (state.audioSource === 'file' && audioEl.duration) {
    const pct = (audioEl.currentTime / audioEl.duration) * 100;
    fpProgressBar.style.width = `${pct}%`;
    fpTime.textContent = `${fmt(audioEl.currentTime)} / ${fmt(audioEl.duration)}`;
  }
}

function drawBackground(c, width, height) {
  const theme = themeConfig();
  const bg = c.createLinearGradient(0, 0, 0, height);
  const c1 = hexToRgb(theme.background[0]);
  const c2 = hexToRgb(theme.background[1]);
  const c3 = hexToRgb(theme.background[2]);

  bg.addColorStop(0, `rgba(${c1.r}, ${c1.g}, ${c1.b}, 0.7)`);
  bg.addColorStop(0.5, `rgba(${c2.r}, ${c2.g}, ${c2.b}, 0.6)`);
  bg.addColorStop(1, `rgba(${c3.r}, ${c3.g}, ${c3.b}, 0.8)`);
  
  c.clearRect(0, 0, width, height);
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

  for (let i = 0; i < count; i += 1) {
    const amp = getAmplitude(i, count);
    const length = clamp(maxHeight * amp * 1.45, theme.label === 'BLACK & WHITE' ? 3 : 4, maxHeight);
    const x = i * (barWidth + gap);
    const color = paletteColor(i / count, theme.label === 'BLACK & WHITE' ? 0.86 : 1);

    c.save();
    c.fillStyle = color;
    if (theme.label === 'BLACK & WHITE') {
      c.fillRect(x, centerY - length, barWidth, length * 2);
      if (state.beatActive && i % 8 === 0) {
        c.fillStyle = 'rgba(255, 255, 255, 0.9)';
        c.fillRect(x, centerY - length - 2, barWidth, 2);
      }
    } else {
      const gradient = c.createLinearGradient(x, centerY - length, x, centerY + length);
      gradient.addColorStop(0, paletteColor(i / count, 1));
      gradient.addColorStop(0.5, paletteColor(i / count, 0.22));
      gradient.addColorStop(1, paletteColor(i / count, 1));
      c.fillStyle = gradient;
      roundRect(c, x, centerY - length, barWidth, length * 2, cornerRadius);
      c.fill();
      glow(c, color, length * theme.glowIntensity * 0.25 + 8, () => {
        c.fillStyle = gradient;
        roundRect(c, x, centerY - length, barWidth, length * 2, cornerRadius);
        c.fill();
      });
    }
    c.restore();
  }

  c.save();
  c.strokeStyle = theme.label === 'BLACK & WHITE'
    ? 'rgba(255, 255, 255, 0.16)'
    : spectralLinear(c, 0, centerY, width, centerY, 0.32);
  c.lineWidth = theme.label === 'BLACK & WHITE' ? 1 : 1.6;
  c.beginPath();
  c.moveTo(0, centerY);
  c.lineTo(width, centerY);
  c.stroke();
  c.restore();
}

function drawRadial(c, width, height) {
  const theme = themeConfig();
  const cx = width / 2;
  const cy = height / 2;
  const dim = Math.min(width, height);
  const ringRadius = dim * (theme.road ? 0.18 : 0.2);
  const outerMax = dim * (theme.label === 'ROCK MODE' ? 0.34 : 0.26);
  const innerMax = dim * 0.08;
  const spokes = theme.label === 'BLACK & WHITE' ? 210 : 170;

  for (let i = 0; i < spokes; i += 1) {
    const angle = (i / spokes) * Math.PI * 2 + state.radialAngle;
    const amp = getAmplitude(i, spokes);
    const outer = Math.max(3, amp * outerMax * 1.6);
    const inner = Math.max(1, amp * innerMax * 1.2);
    const x1 = cx + Math.cos(angle) * (ringRadius - inner);
    const y1 = cy + Math.sin(angle) * (ringRadius - inner);
    const x2 = cx + Math.cos(angle) * (ringRadius + outer);
    const y2 = cy + Math.sin(angle) * (ringRadius + outer);
    c.save();
    c.strokeStyle = paletteColor(i / spokes, theme.label === 'BLACK & WHITE' ? 0.9 : 1);
    c.lineWidth = theme.lineWidth * (theme.label === 'BLACK & WHITE' ? 0.7 : 1);
    c.lineCap = theme.label === 'BLACK & WHITE' ? 'square' : 'round';
    if (theme.label !== 'BLACK & WHITE') {
      c.shadowColor = c.strokeStyle;
      c.shadowBlur = 6 + outer * 0.1 * theme.glowIntensity;
    }
    c.beginPath();
    c.moveTo(x1, y1);
    c.lineTo(x2, y2);
    c.stroke();
    c.restore();
  }

  drawRadialWave(c, cx, cy, ringRadius + outerMax * 0.6, theme);
  drawCenterOrb(c, cx, cy, ringRadius * 0.64, theme);
}

function drawRadialWave(c, cx, cy, radius, theme) {
  const points = Math.min(state.timeData.length, 512);
  c.save();
  c.beginPath();
  for (let i = 0; i <= points; i += 1) {
    const sample = state.timeData[i % points] / 128 - 1;
    const angle = (i / points) * Math.PI * 2 - Math.PI / 2 - state.radialAngle * 0.4;
    const wobble = sample * radius * 0.24 * state.sensitivity * (theme.label === 'BLACK & WHITE' ? 1.4 : 0.8);
    const r = radius + wobble;
    const x = cx + Math.cos(angle) * r;
    const y = cy + Math.sin(angle) * r;
    if (i === 0) {
      c.moveTo(x, y);
    } else {
      c.lineTo(x, y);
    }
  }
  c.closePath();
  c.strokeStyle = theme.label === 'BLACK & WHITE'
    ? 'rgba(255, 255, 255, 0.85)'
    : spectralLinear(c, cx - radius, cy, cx + radius, cy, 0.8);
  c.lineWidth = theme.label === 'BLACK & WHITE' ? 1 : 2;
  if (theme.label !== 'BLACK & WHITE') {
    c.shadowColor = paletteColor(0.4, 0.8);
    c.shadowBlur = 14 * theme.glowIntensity;
  }
  c.stroke();
  c.restore();
}

function drawCenterOrb(c, cx, cy, radius, theme) {
  const orb = c.createRadialGradient(cx, cy, 0, cx, cy, radius * (1.7 + state.energySmoothed * 0.9));
  if (theme.label === 'BLACK & WHITE') {
    orb.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
    orb.addColorStop(0.45, 'rgba(200, 200, 200, 0.26)');
    orb.addColorStop(1, 'rgba(255, 255, 255, 0)');
  } else {
    orb.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
    orb.addColorStop(0.28, paletteColor(0.35, 0.76));
    orb.addColorStop(0.7, paletteColor(0.75, 0.18));
    orb.addColorStop(1, 'rgba(255, 255, 255, 0)');
  }
  c.save();
  c.fillStyle = orb;
  c.beginPath();
  c.arc(cx, cy, radius * (1.5 + state.energySmoothed * 0.6), 0, Math.PI * 2);
  c.fill();
  c.restore();
}

function drawWave(c, width, height) {
  const theme = themeConfig();
  const centerY = height * (theme.road ? 0.56 : 0.5);
  const samples = state.timeData.length;
  const step = width / samples;
  const points = [];
  const ampScale = height * (theme.label === 'ROCK MODE' ? 0.34 : theme.road ? 0.18 : 0.24);

  for (let i = 0; i < samples; i += 1) {
    const sample = state.timeData[i] / 128 - 1;
    points.push({
      x: i * step,
      y: centerY + sample * ampScale * state.sensitivity
    });
  }

  c.save();
  c.beginPath();
  c.moveTo(0, centerY);
  drawSmoothPath(c, points, theme.waveformSmoothness);
  c.lineTo(width, centerY);
  c.closePath();
  const fill = c.createLinearGradient(0, centerY - ampScale, 0, centerY + ampScale);
  fill.addColorStop(0, paletteColor(0.15, theme.label === 'BLACK & WHITE' ? 0.16 : 0.24));
  fill.addColorStop(0.5, paletteColor(0.5, theme.label === 'BLACK & WHITE' ? 0.04 : 0.08));
  fill.addColorStop(1, 'rgba(0, 0, 0, 0)');
  c.fillStyle = fill;
  c.fill();
  c.restore();

  c.save();
  c.beginPath();
  c.moveTo(points[0].x, points[0].y);
  drawSmoothPath(c, points, theme.waveformSmoothness);
  c.strokeStyle = theme.label === 'BLACK & WHITE'
    ? 'rgba(255, 255, 255, 0.92)'
    : spectralLinear(c, 0, 0, width, 0, 1);
  c.lineWidth = theme.lineWidth;
  c.lineCap = 'round';
  c.lineJoin = 'round';
  if (theme.label !== 'BLACK & WHITE') {
    c.shadowColor = paletteColor(0.45, 0.7);
    c.shadowBlur = 18 * theme.glowIntensity;
  }
  c.stroke();
  c.restore();

  if (theme.label === 'ROCK MODE') {
    c.save();
    c.beginPath();
    c.moveTo(points[0].x, points[0].y + 8);
    drawSmoothPath(c, points.map((point) => ({ x: point.x, y: point.y + 8 })), 0.18);
    c.strokeStyle = 'rgba(95, 156, 255, 0.55)';
    c.lineWidth = 1.6;
    c.stroke();
    c.restore();
  }
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
  drawGuitar(c, width * 0.14, height * 0.58, 0.68);
  drawDrumKit(c, width * 0.74, height * 0.66, 0.8);
  drawPiano(c, width * 0.42, height * 0.78, 0.8);
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

function drawPiano(c, x, y, scale) {
  c.save();
  c.translate(x, y);
  c.scale(scale, scale);
  c.fillRect(0, 0, 140, 36);
  c.clearRect(10, 6, 8, 24);
  c.clearRect(30, 6, 8, 24);
  c.clearRect(58, 6, 8, 24);
  c.clearRect(78, 6, 8, 24);
  c.clearRect(98, 6, 8, 24);
  c.clearRect(118, 6, 8, 24);
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

function drawMini() {
  const width = miniCanvas.width;
  const height = miniCanvas.height;
  drawBackground(miniCtx, width, height);
  drawMode(miniCtx, width, height);
  drawThemeForeground(miniCtx, width, height);
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
  drawBackground(popupCtx, popupCanvas.width, popupCanvas.height);
  drawMode(popupCtx, popupCanvas.width, popupCanvas.height);
  drawThemeForeground(popupCtx, popupCanvas.width, popupCanvas.height);
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
    *{box-sizing:border-box;margin:0;padding:0}
    html,body{width:100%;height:100%;overflow:hidden;background:#050505;color:#d7ebff;font-family:monospace}
    #title,#label{position:fixed;left:0;right:0;text-align:center;background:rgba(0,0,0,.45);letter-spacing:.16em}
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

async function requestPip() {
  if (!document.pictureInPictureEnabled) {
    showToast('Picture-in-Picture is not supported here.');
    return;
  }
  let video = document.getElementById('pip-video');
  if (!video) {
    video = document.createElement('video');
    video.id = 'pip-video';
    video.style.display = 'none';
    document.body.appendChild(video);
  }
  try {
    video.srcObject = canvas.captureStream(30);
    await video.play();
    await video.requestPictureInPicture();
    showToast('Picture-in-Picture started.');
  } catch (error) {
    showToast(`Picture-in-Picture failed: ${error.message}`);
  }
}

function applyTheme(themeName, silent = false) {
  const nextTheme = THEMES[themeName] ? themeName : 'classic';
  state.theme = nextTheme;
  const theme = themeConfig();
  state.beatCooldownMax = theme.beatCooldownMax;
  document.body.dataset.theme = nextTheme;
  themeNameEl.textContent = theme.label;
  themeTaglineEl.textContent = theme.tagline;

  const themeBgUrls = {
    classic: 'url("https://images.unsplash.com/photo-1507838153414-b4b713384a76?q=80&w=1920&auto=format&fit=crop")',
    bw: 'url("https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?q=80&w=1920&auto=format&fit=crop")',
    rock: 'url("https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?q=80&w=1920&auto=format&fit=crop")',
    memory: 'url("memory_bg.jpg")'
  };
  if (themeBg) {
    themeBg.style.backgroundImage = themeBgUrls[nextTheme] || '';
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
      'vecteezy_a-sports-car-driving-on-a-road-at-night_70199228.mp4',
      'vecteezy_cars-parked-on-a-hillside-with-a-90-s-inspired-night-sky-a_49887896.mp4'
    ];
    themeVideo.src = chillVideos[state.currentChillVideo];
    themeVideo.classList.remove('hidden');
    themeVideo.play();
  } else if (nextTheme === 'study') {
    themeVideo.src = 'Animate_this_image_and_video_s.mp4';
    themeVideo.classList.remove('hidden');
    themeVideo.play();
  } else if (nextTheme === 'phonk') {
    themeImage.src = 'phonk_bg.jpg';
    themeImage.classList.remove('hidden');
  }

  if (state.analyser) {
    state.analyser.smoothingTimeConstant = theme.analyserSmoothing;
  }

  themeButtons.forEach((button) => {
    button.classList.toggle('active', button.dataset.theme === nextTheme);
  });

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
  sourceButtons.forEach((button) => {
    button.addEventListener('click', async () => {
      sourceButtons.forEach((item) => item.classList.remove('active'));
      button.classList.add('active');
      await switchSource(button.dataset.source);
      updateStartButtonLabel();
    });
  });

  btnStart.addEventListener('click', async () => {
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
  });

  toggleAutocycle.addEventListener('change', () => {
    state.autoCycle = toggleAutocycle.checked;
  });

  document.addEventListener('click', () => {
    if (state.audioCtx && state.audioCtx.state === 'suspended') {
      state.audioCtx.resume();
    }
  });
}

window.state = state;

(function boot() {
  buildIdleScreen();
  handleUi();
  applyTheme('classic', true);
  initBgParticles();
  initAmbientParticles();
  updateMiniLabel();
  idleAnimation();
})();
=======
  if (state.audioCtx.state === 'suspended') state.audioCtx.resume();
}
function disconnectSrc() {
  try { if (state.source) state.source.disconnect(); } catch(_){}
  state.source = null;
  if (state.stream) { state.stream.getTracks().forEach(t=>t.stop()); state.stream=null; }
}
async function initMic() {
  try {
    ensureCtx(); disconnectSrc();
    state.stream = await navigator.mediaDevices.getUserMedia({audio:true,video:false});
    state.source = state.audioCtx.createMediaStreamSource(state.stream);
    state.source.connect(state.analyser);
    badge('🎙','MIC'); return true;
  } catch(e) { showError('Mic denied: '+e.message); return false; }
}
function initFile(file) {
  return new Promise(res => {
    ensureCtx(); disconnectSrc();
    audioEl.src = URL.createObjectURL(file); audioEl.load();
    if (!audioEl._src || audioEl._src.context !== state.audioCtx) {
      try { audioEl._src = state.audioCtx.createMediaElementSource(audioEl); } catch(_){}
    }
    state.source = audioEl._src;
    state.source.connect(state.analyser);
    state.analyser.connect(state.audioCtx.destination);
    audioEl.oncanplay = () => {
      audioEl.play();
      filePlayerName.textContent = file.name.replace(/\.[^/.]+$/,'');
      filePlayer.classList.remove('hidden');
      fpPlayPause.textContent='⏸';
      badge('📁','FILE'); res(true);
    };
    audioEl.onerror = () => { showError('Cannot decode file.'); res(false); };
  });
}
async function initScreen() {
  try {
    ensureCtx(); disconnectSrc();
    showToast('📋 Select TAB and enable "Share tab audio"');
    state.stream = await navigator.mediaDevices.getDisplayMedia({video:true,audio:{echoCancellation:false,noiseSuppression:false,sampleRate:44100}});
    const atracks = state.stream.getAudioTracks();
    if (!atracks.length) {
      showError('No audio track. Tick "Share tab audio".');
      state.stream.getTracks().forEach(t=>t.stop()); state.stream=null; return false;
    }
    state.source = state.audioCtx.createMediaStreamSource(new MediaStream(atracks));
    state.source.connect(state.analyser);
    state.stream.getVideoTracks()[0]?.addEventListener('ended',()=>{
      if(state.audioSource==='screen'&&state.running){showToast('Screen share ended');stopAll();resetBtn();}
    });
    badge('🖥','SCREEN'); return true;
  } catch(e) { showError(e.name==='NotAllowedError'?'Screen denied.':'Screen failed: '+e.message); return false; }
}
async function switchSrc(mode) {
  if (state.running) stopAll();
  state.audioSource = mode; updateBtnLabel();
  if (mode!=='file') { filePlayer.classList.add('hidden'); audioEl.pause(); try{state.analyser?.disconnect(state.audioCtx?.destination);}catch(_){} }
}

// ── START/STOP ─────────────────────────────
async function startViz() {
  let ok=false;
  if (state.audioSource==='mic') ok=await initMic();
  else if (state.audioSource==='file') {
    if (!audioEl.src||audioEl.src===location.href){fileInput.click();return;}
    ensureCtx(); disconnectSrc();
    state.source=audioEl._src;
    if(state.source){state.source.connect(state.analyser);state.analyser.connect(state.audioCtx.destination);audioEl.play();filePlayer.classList.remove('hidden');fpPlayPause.textContent='⏸';badge('📁','FILE');ok=true;}
  } else ok=await initScreen();
  if (ok) {
    state.running=true; state.paused=false;
    initParticles(); initBgP();
    if(!state.animFrameId) loop();
    btnStart.innerHTML='<span class="btn-icon">⏹</span><span>Stop</span>';
    btnStart.classList.add('active'); btnPause.disabled=false;
    hideSt(); updateMiniLbl(); btnStart.disabled=false;
  } else resetBtn();
}
function stopAll() {
  if(state.animFrameId){cancelAnimationFrame(state.animFrameId);state.animFrameId=null;}
  disconnectSrc();
  try{state.analyser?.disconnect();}catch(_){}
  audioEl.pause(); state.running=false; state.paused=false;
  sourceBadge.classList.add('hidden'); updateMiniLbl();
}

// ── BEAT ───────────────────────────────────
function detectBeat(fd) {
  const n=Math.floor(state.bufferLength*0.07); let s=0;
  for(let i=0;i<n;i++) s+=fd[i];
  const sc=(s/n)*state.sensitivity;
  if(state.beatCooldown>0){state.beatCooldown--;state.beatActive=false;}
  else if(sc>state.beatThreshold){state.beatActive=true;state.beatCooldown=state.beatCooldownMax;beatFX();}
  else state.beatActive=false;
}
function beatFX() {
  beatFlash.classList.add('flash');
  setTimeout(()=>beatFlash.classList.remove('flash'),80);
  state.beatScale=1.025;
  miniOverlayEl.style.boxShadow='0 0 40px rgba(0,180,255,0.55),0 10px 50px rgba(0,0,0,0.8)';
  setTimeout(()=>miniOverlayEl.style.boxShadow='',120);
}
function energy(fd) {
  let s=0; for(let i=0;i<state.bufferLength;i++) s+=fd[i];
  return Math.min(1,(s/state.bufferLength/255)*state.sensitivity*3);
}

// ── RENDER LOOP ────────────────────────────
function loop() {
  if(!state.running) return;
  state.animFrameId=requestAnimationFrame(loop);
  if(state.paused) return;

  state.analyser.getByteFrequencyData(state.freqData);
  state.analyser.getByteTimeDomainData(state.timeData);
  detectBeat(state.freqData);
  state.energy=energy(state.freqData);
  state.energySmoothed+=(state.energy-state.energySmoothed)*0.10;
  energyFill.style.height=(state.energySmoothed*100)+'%';
  state.beatScale+=(1-state.beatScale)*0.16;
  state.gradientT=(state.gradientT+0.0006)%1;
  state.radialAngle=(state.radialAngle+0.004)%(Math.PI*2);
  if(state.autoCycle) state.colorHue=(state.colorHue+0.3)%360;

  const W=canvas.width, H=canvas.height;
  ctx.save();
  ctx.translate(W/2,H/2); ctx.scale(state.beatScale,state.beatScale); ctx.translate(-W/2,-H/2);
  drawBg(ctx,W,H);
  if(state.showBgFx) drawAmbient(ctx,W,H);
  drawMode(ctx,W,H);
  ctx.restore();

  if(state.showBgFx) drawBgCanvas();
  if(!miniOverlayEl.classList.contains('hidden')) drawMini();
  syncPopup();

  if(state.audioSource==='file'&&audioEl.duration) {
    const pct=(audioEl.currentTime/audioEl.duration)*100;
    fpProgressBar.style.width=pct+'%';
    fpTime.textContent=fmt(audioEl.currentTime)+' / '+fmt(audioEl.duration);
  }
}

// ── BACKGROUND ─────────────────────────────
function drawBg(c,W,H) {
  // Very slow fade — keeps trails from previous frame
  c.fillStyle='rgba('+bgRGB()+',0.18)';
  c.fillRect(0,0,W,H);
  // Heavy vignette — corners pure black like the image
  const v=c.createRadialGradient(W/2,H/2,H*0.05,W/2,H/2,H*0.95);
  v.addColorStop(0,'rgba(0,0,0,0)');
  v.addColorStop(0.55,'rgba(0,0,0,0.3)');
  v.addColorStop(1,'rgba(0,0,0,0.88)');
  c.fillStyle=v; c.fillRect(0,0,W,H);
}
function bgRGB() {
  if(state.theme==='cyberpunk') return '1,0,12';
  if(state.theme==='minimal')   return '4,4,4';
  return '0,0,4';
}

// ── AMBIENT BG STREAKS ──────────────────────
const bgP=[];
function initBgP() {
  bgP.length=0;
  for(let i=0;i<28;i++) bgP.push(mkBgP(true));
}
function mkBgP(rand) {
  const W=bgCanvas.width, H=bgCanvas.height;
  return { x:Math.random()*W, y:rand?Math.random()*H:H+10,
    vx:(Math.random()-0.5)*0.2, vy:-(Math.random()*0.35+0.06),
    len:Math.random()*90+30, a:Math.random()*0.10+0.02,
    t:Math.random(), w:Math.random()*0.9+0.2 };
}
function drawBgCanvas() {
  const W=bgCanvas.width, H=bgCanvas.height;
  bgCtx.clearRect(0,0,W,H);
  for(let i=bgP.length-1;i>=0;i--) {
    const p=bgP[i], sp=1+state.energySmoothed*3.5;
    p.x+=p.vx*sp; p.y+=p.vy*sp;
    if(p.y<-p.len||p.x<-120||p.x>W+120){bgP[i]=mkBgP(false);continue;}
    const a=Math.min(0.22,p.a*(1+state.energySmoothed*2));
    bgCtx.save();
    bgCtx.strokeStyle=spectral(p.t,a);
    bgCtx.lineWidth=p.w;
    bgCtx.shadowColor=spectral(p.t,0.5); bgCtx.shadowBlur=4;
    bgCtx.beginPath();
    bgCtx.moveTo(p.x,p.y);
    bgCtx.lineTo(p.x-p.vx*p.len*sp,p.y-p.vy*p.len*sp);
    bgCtx.stroke(); bgCtx.restore();
  }
}

// ── AMBIENT PARTICLES ───────────────────────
function initParticles() {
  state.particles=[];
  for(let i=0;i<state.maxParticles;i++) state.particles.push(mkPart(true));
}
function mkPart(rand) {
  const W=canvas.width,H=canvas.height;
  return {x:Math.random()*W,y:rand?Math.random()*H:H+5,
    vx:(Math.random()-0.5)*0.25,vy:-(Math.random()*0.38+0.06),
    sz:Math.random()*1.6+0.4,a:Math.random()*0.28+0.05,
    t:Math.random(),life:1,decay:Math.random()*0.003+0.001};
}
function drawAmbient(c,W,H) {
  for(let i=state.particles.length-1;i>=0;i--) {
    const p=state.particles[i];
    p.x+=p.vx+(state.energySmoothed*(Math.random()-0.5)*0.5);
    p.y+=p.vy*(1+state.energySmoothed*2);
    p.life-=p.decay; p.a=p.life*0.3;
    if(p.life<=0||p.y<-10||p.x<-5||p.x>W+5){state.particles[i]=mkPart(false);continue;}
    c.beginPath(); c.arc(p.x,p.y,p.sz*(1+state.energySmoothed*0.5),0,Math.PI*2);
    c.fillStyle=spectral(p.t,p.a*0.5); c.fill();
  }
  if(state.beatActive) {
    for(let i=0;i<6;i++) state.particles.push({
      x:Math.random()*W,y:Math.random()*H,
      vx:(Math.random()-0.5)*2,vy:(Math.random()-0.5)*2,
      sz:Math.random()*2+0.6,a:0.5,t:Math.random(),life:1,decay:0.022});
    while(state.particles.length>state.maxParticles*2) state.particles.shift();
  }
}

// ── MODE DISPATCH ───────────────────────────
function drawMode(c,W,H) {
  switch(state.mode) {
    case 'bars':      drawBars(c,W,H); break;
    case 'circle':    drawRadial(c,W,H); break;
    case 'wave':      drawWave(c,W,H); break;
    case 'particles': drawParticles(c,W,H); break;
  }
}

// ════════════════════════════════════════════
//  BARS — pixel-matched to the reference image
//  Key visual traits from the image:
//  • Bars grow symmetrically from vertical centre
//  • Massive soft bloom (huge shadowBlur)
//  • Very narrow bars, many of them
//  • Strong spectral gradient left→right
//  • Pure black gaps between bars
//  • Faint outer glow spreading into the dark
// ════════════════════════════════════════════
function drawBars(c,W,H) {
  const N      = Math.min(state.bufferLength, 180);
  const gap    = 2;
  const barW   = Math.max(1.5, (W - gap*(N-1)) / N);
  const cy     = H * 0.5;          // centre — bars grow up AND down
  const maxLen = H * 0.44;         // max half-height (so bars can fill ~88% of screen)

  for (let i=0; i<N; i++) {
    const bin = Math.floor(Math.pow(i/N, 1.2) * state.bufferLength);
    const amp  = state.freqData[bin] / 255;
    const len  = Math.max(2, amp * maxLen * state.sensitivity);
    const x    = i * (barW + gap);
    const t    = i / N;                     // spectral position
    const col  = spectral(t, 1);

    // ── vertical gradient per bar: dark root→vivid tip (both ends)
    const grad = c.createLinearGradient(x, cy-len, x, cy+len);
    grad.addColorStop(0,   spectral(t, 1.0));   // top tip   — full brightness
    grad.addColorStop(0.35,spectral(t, 0.85));
    grad.addColorStop(0.5, spectral(t, 0.15));  // centre    — very dark seam
    grad.addColorStop(0.65,spectral(t, 0.85));
    grad.addColorStop(1,   spectral(t, 1.0));   // bottom tip — full brightness
    c.fillStyle = grad;

    // Bar body — rounded at both tips
    const r = Math.min(barW/2, 3);
    c.beginPath();
    // Top half
    if (len > r*2) {
      c.moveTo(x+r, cy-len); c.lineTo(x+barW-r, cy-len);
      c.quadraticCurveTo(x+barW,cy-len, x+barW,cy-len+r);
      c.lineTo(x+barW, cy+len-r);
      c.quadraticCurveTo(x+barW,cy+len, x+barW-r,cy+len);
      c.lineTo(x+r, cy+len);
      c.quadraticCurveTo(x,cy+len, x,cy+len-r);
      c.lineTo(x, cy-len+r);
      c.quadraticCurveTo(x,cy-len, x+r,cy-len);
      c.closePath();
    } else {
      c.rect(x, cy-len, barW, len*2);
    }
    c.fill();

    // ── BLOOM — the key effect from the image
    // Layer 1: wide soft glow (ambient bloom into darkness)
    if (amp > 0.15) {
      c.save();
      c.globalAlpha = amp * 0.55 * state.sensitivity;
      c.shadowColor = col;
      c.shadowBlur  = amp * 60 * state.sensitivity;
      c.fillStyle   = col;
      c.fillRect(x, cy-len, barW, len*2);
      c.restore();
    }

    // Layer 2: tight bright core glow on tips
    if (amp > 0.35) {
      // Top tip
      c.save();
      c.shadowColor = col;
      c.shadowBlur  = amp * 28 * state.sensitivity;
      c.fillStyle   = 'rgba(255,255,255,'+( amp * 0.7)+')';
      c.fillRect(x, cy-len, barW, 2);
      // Bottom tip
      c.fillRect(x, cy+len-2, barW, 2);
      c.restore();
    }
  }

  // ── Horizontal spectral seam line at centre (subtle)
  c.save();
  c.globalAlpha = 0.25;
  const seam = spectralLinear(c, 0, cy, W, cy);
  c.strokeStyle = seam; c.lineWidth = 1;
  c.shadowColor = 'rgba(255,255,255,0.3)'; c.shadowBlur = 4;
  c.beginPath(); c.moveTo(0,cy); c.lineTo(W,cy); c.stroke();
  c.restore();
}

// ════════════════════════════════════════════
//  RADIAL WAVE — the reference image mapped
//  to a full 360° sunburst:
//  • Bars grow symmetrically inward+outward from a ring
//  • Spectral colours around the circle
//  • Two waveform rings (time-domain) overlaid
//  • Massive bloom on loud bars
//  • Beat pulse rings
//  • White hot centre orb
// ════════════════════════════════════════════
function drawRadial(c,W,H) {
  const cx=W/2, cy=H/2;
  const dim    = Math.min(W,H);
  const ringR  = dim * 0.22;      // the "centre ring" where bars grow from
  const maxOut = dim * 0.32;      // max bar length outward
  const maxIn  = dim * 0.10;      // max bar length inward
  const N      = 300;             // number of spokes

  // ── Inner glow disc
  const disc = c.createRadialGradient(cx,cy,0,cx,cy,ringR*1.6);
  disc.addColorStop(0,'rgba(255,255,255,0.06)');
  disc.addColorStop(0.5,'rgba(80,20,200,0.04)');
  disc.addColorStop(1,'rgba(0,0,0,0)');
  c.beginPath(); c.arc(cx,cy,ringR*1.6,0,Math.PI*2); c.fillStyle=disc; c.fill();

  // ── Spokes — symmetric outward + inward (mirrors the bar mode)
  for (let i=0; i<N; i++) {
    const angle = (i/N)*Math.PI*2 + state.radialAngle;
    const bin   = Math.floor((i/N)*state.bufferLength*0.75);
    const amp   = state.freqData[bin] / 255;
    const outLen = Math.max(1, amp * maxOut * state.sensitivity);
    const inLen  = Math.max(0.5, amp * maxIn  * state.sensitivity);
    const t = ((i/N) + state.gradientT) % 1;
    const col = spectral(t, 1);
    const cos = Math.cos(angle), sin = Math.sin(angle);

    // Outer spoke
    const x1o = cx+cos*(ringR+inLen),  y1o = cy+sin*(ringR+inLen);
    const x2o = cx+cos*(ringR+outLen), y2o = cy+sin*(ringR+outLen);
    // Inner spoke (points toward centre)
    const x1i = cx+cos*(ringR-inLen),  y1i = cy+sin*(ringR-inLen);
    const x2i = cx+cos*(ringR-outLen*0.28), y2i = cy+sin*(ringR-outLen*0.28);

    // Draw outer
    c.beginPath(); c.moveTo(x1o,y1o); c.lineTo(x2o,y2o);
    c.strokeStyle = col; c.lineWidth = amp>0.5 ? 2.2 : 1.5; c.lineCap='round';
    if (amp>0.4) glow(c,col,amp*20,()=>c.stroke()); else c.stroke();

    // Draw inner (mirrored)
    c.beginPath(); c.moveTo(x1i,y1i); c.lineTo(x2i,y2i);
    c.strokeStyle = spectral(t,0.7); c.lineWidth=1.2;
    c.stroke();

    // Bloom at tips for loud spokes
    if (amp>0.55) {
      c.save();
      c.globalAlpha=amp*0.45;
      c.shadowColor=col; c.shadowBlur=amp*45*state.sensitivity;
      c.strokeStyle=col; c.lineWidth=2;
      c.beginPath(); c.moveTo(x1o,y1o); c.lineTo(x2o,y2o); c.stroke();
      c.restore();
    }
  }

  // ── Outer waveform ring (time-domain bent to circle)
  const timeN = Math.min(state.timeData.length, 512);
  const wRing = ringR + maxOut*0.52;

  c.beginPath();
  for (let k=0; k<=timeN; k++) {
    const v = (state.timeData[k%timeN]/128-1)*state.sensitivity*0.9;
    const a = (k/timeN)*Math.PI*2 - Math.PI/2 + state.radialAngle;
    const r = wRing + v * dim * 0.09;
    const x = cx+Math.cos(a)*r, y = cy+Math.sin(a)*r;
    k===0 ? c.moveTo(x,y) : c.lineTo(x,y);
  }
  c.closePath();
  glow(c,'rgba(0,200,255,0.7)', 14+state.energySmoothed*20, ()=>{
    c.strokeStyle = spectralLinear(c,cx-wRing,0,cx+wRing,0);
    c.lineWidth=2.8; c.stroke();
  });

  // ── Inner waveform ring (counter-rotating)
  const iRing = ringR * 0.62;
  c.beginPath();
  for (let m=0; m<=timeN; m++) {
    const v = (state.timeData[m%timeN]/128-1)*state.sensitivity*0.55;
    const a = (m/timeN)*Math.PI*2 - Math.PI/2 - state.radialAngle*0.6;
    const r = iRing - v*dim*0.05;
    const x = cx+Math.cos(a)*r, y = cy+Math.sin(a)*r;
    m===0 ? c.moveTo(x,y) : c.lineTo(x,y);
  }
  c.closePath();
  glow(c,'rgba(255,80,200,0.55)',8,()=>{
    c.strokeStyle='rgba(255,100,220,0.4)'; c.lineWidth=1.4; c.stroke();
  });

  // ── Ring border at ringR
  glow(c,'rgba(160,80,255,0.9)',20,()=>{
    c.beginPath(); c.arc(cx,cy,ringR,0,Math.PI*2);
    c.strokeStyle='rgba(180,100,255,0.6)'; c.lineWidth=2; c.stroke();
  });

  // ── Beat pulse rings
  if (state.beatActive) {
    const pr1=ringR+state.energySmoothed*maxOut*1.2;
    glow(c,spectral(state.gradientT,0.9),30,()=>{
      c.beginPath(); c.arc(cx,cy,pr1,0,Math.PI*2);
      c.strokeStyle=spectral(state.gradientT,0.5); c.lineWidth=2.5; c.stroke();
    });
    const pr2=ringR+state.energySmoothed*maxOut*1.6;
    glow(c,spectral((state.gradientT+0.5)%1,0.5),12,()=>{
      c.beginPath(); c.arc(cx,cy,pr2,0,Math.PI*2);
      c.strokeStyle=spectral((state.gradientT+0.5)%1,0.25); c.lineWidth=1.2; c.stroke();
    });
  }

  // ── White-hot centre orb (like the image's bright centre)
  const orbR=ringR*0.48+state.energySmoothed*ringR*0.38;
  const og=c.createRadialGradient(cx,cy,0,cx,cy,orbR);
  og.addColorStop(0,'rgba(255,255,255,0.95)');
  og.addColorStop(0.25,spectral(0.5,0.8));
  og.addColorStop(0.6,spectral(0.75,0.3));
  og.addColorStop(1,'rgba(0,0,0,0)');
  c.beginPath(); c.arc(cx,cy,orbR,0,Math.PI*2); c.fillStyle=og; c.fill();
}

// ════════════════════════════════════════════
//  WAVE — same image aesthetic, horizontal
// ════════════════════════════════════════════
function drawWave(c,W,H) {
  const cy=H/2, dlen=state.timeData.length, sw=W/dlen;
  const pts=[];
  for(let i=0;i<dlen;i++) {
    const v=(state.timeData[i]/128-1)*state.sensitivity;
    pts.push({x:i*sw, y:cy+v*(H*0.40)});
  }

  const grad=spectralLinear(c,0,0,W,0);
  const wg=state.energySmoothed*45*state.sensitivity+12;

  // Filled area
  c.beginPath(); c.moveTo(0,cy);
  for(let i=0;i<pts.length-1;i++) {
    const mx2=(pts[i].x+pts[i+1].x)/2,my2=(pts[i].y+pts[i+1].y)/2;
    c.quadraticCurveTo(pts[i].x,pts[i].y,mx2,my2);
  }
  c.lineTo(W,cy); c.closePath();
  const fg=c.createLinearGradient(0,cy-H*0.40,0,cy);
  fg.addColorStop(0,'rgba(0,200,255,'+(0.12+state.energySmoothed*0.16)+')');
  fg.addColorStop(1,'rgba(0,0,0,0)');
  c.fillStyle=fg; c.fill();

  // Main glow line
  glow(c,'rgba(0,200,255,0.6)',wg,()=>{
    c.beginPath(); c.moveTo(pts[0].x,pts[0].y);
    for(let i=0;i<pts.length-1;i++) {
      const mx2=(pts[i].x+pts[i+1].x)/2,my2=(pts[i].y+pts[i+1].y)/2;
      c.quadraticCurveTo(pts[i].x,pts[i].y,mx2,my2);
    }
    c.lineTo(pts[pts.length-1].x,pts[pts.length-1].y);
    c.strokeStyle=grad; c.lineWidth=3.5; c.lineCap='round'; c.lineJoin='round'; c.stroke();
  });

  // White hairline
  c.beginPath(); c.moveTo(pts[0].x,pts[0].y);
  for(let i=0;i<pts.length-1;i++){const mx2=(pts[i].x+pts[i+1].x)/2,my2=(pts[i].y+pts[i+1].y)/2;c.quadraticCurveTo(pts[i].x,pts[i].y,mx2,my2);}
  c.strokeStyle='rgba(255,255,255,0.4)'; c.lineWidth=0.8; c.stroke();

  // Mirror bottom
  c.save(); c.globalAlpha=0.14; c.translate(0,H); c.scale(1,-1);
  c.beginPath(); c.moveTo(pts[0].x,H-pts[0].y);
  for(let i=0;i<pts.length-1;i++){const pax=pts[i].x,pay=H-pts[i].y,pbx=pts[i+1].x,pby=H-pts[i+1].y,pmx=(pax+pbx)/2,pmy=(pay+pby)/2;c.quadraticCurveTo(pax,pay,pmx,pmy);}
  c.strokeStyle=grad; c.lineWidth=1.8; c.stroke(); c.restore();

  c.beginPath(); c.moveTo(0,cy); c.lineTo(W,cy);
  c.strokeStyle='rgba(0,200,255,0.04)'; c.lineWidth=1; c.stroke();
}

// ════════════════════════════════════════════
//  PARTICLES — spectral explosion
// ════════════════════════════════════════════
const vizP=[];
function drawParticles(c,W,H) {
  const cx=W/2,cy=H/2;
  if(state.running&&!state.paused) {
    for(let i=0;i<8;i++) {
      const bi=Math.floor(Math.random()*state.bufferLength*0.7);
      const amp=state.freqData[bi]/255;
      if(amp<0.07) continue;
      const a=Math.random()*Math.PI*2, sp=amp*6*state.sensitivity;
      vizP.push({x:cx,y:cy,vx:Math.cos(a)*sp,vy:Math.sin(a)*sp,
        sz:amp*5.5+1.5,al:amp,t:Math.random(),life:1,decay:0.013+Math.random()*0.013});
    }
    while(vizP.length>160) vizP.shift();
  }
  for(let i=vizP.length-1;i>=0;i--) {
    const p=vizP[i];
    p.x+=p.vx; p.y+=p.vy; p.vx*=0.975; p.vy*=0.975; p.life-=p.decay;
    if(p.life<=0){vizP.splice(i,1);continue;}
    const al=p.life*p.al;
    glow(c,spectral(p.t,0.8),p.sz*4.5,()=>{
      c.beginPath(); c.arc(p.x,p.y,p.sz*p.life,0,Math.PI*2);
      c.fillStyle=spectral(p.t,al); c.fill();
    });
  }
  // Orb
  const orbR=28+state.energySmoothed*70*state.sensitivity;
  const og=c.createRadialGradient(cx,cy,0,cx,cy,orbR);
  og.addColorStop(0,'rgba(255,255,255,0.95)');
  og.addColorStop(0.25,spectral(0.42+state.gradientT*0.2,0.78));
  og.addColorStop(0.65,spectral(0.72+state.gradientT*0.2,0.28));
  og.addColorStop(1,'rgba(0,0,0,0)');
  glow(c,spectral(state.gradientT,0.7),26,()=>{
    c.beginPath(); c.arc(cx,cy,orbR,0,Math.PI*2); c.fillStyle=og; c.fill();
  });
}

// ── MINI ───────────────────────────────────
function drawMini() {
  const mW=miniCanvas.width, mH=miniCanvas.height;
  drawBg(miniCtx,mW,mH); drawMode(miniCtx,mW,mH);
}
function syncPopup() {
  if(!state.miniWindow||state.miniWindow.closed) return;
  const mc=state.miniWindow._canvas, mx=state.miniWindow._ctx;
  if(!mc||!mx) return;
  drawBg(mx,mc.width,mc.height); drawMode(mx,mc.width,mc.height);
}

// ── MINI POPUP ─────────────────────────────
function openMiniWin() {
  if(state.miniWindow&&!state.miniWindow.closed){state.miniWindow.focus();return;}
  const pw=340,ph=230;
  const popup=window.open('','SPECTR_MINI',
    `width=${pw},height=${ph},left=${window.screen.width-pw-20},top=${window.screen.height-ph-60},resizable=yes,scrollbars=no,toolbar=no,menubar=no,location=no,status=no`);
  if(!popup){showToast('⚠ Popup blocked — use overlay instead.');return;}
  popup.document.write(`<!DOCTYPE html><html><head><title>SPECTR MINI</title>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Orbitron:wght@700&display=swap"/>
<style>*{margin:0;padding:0;box-sizing:border-box;}html,body{width:100%;height:100%;background:#000004;overflow:hidden;}canvas{display:block;}
#lb{position:fixed;bottom:0;left:0;right:0;text-align:center;font-size:9px;letter-spacing:.18em;color:#203040;padding:4px;background:rgba(0,0,6,.9);font-family:monospace;}
#tt{position:fixed;top:0;left:0;right:0;text-align:center;font-size:10px;letter-spacing:.22em;padding:4px;background:rgba(0,0,6,.9);font-family:Orbitron,sans-serif;}</style>
</head><body>
<div id="tt" style="background:linear-gradient(90deg,#ffff00,#ff7800,#ff0090,#c000ff,#0050ff,#00ffdc);-webkit-background-clip:text;-webkit-text-fill-color:transparent;">◈ SPECTR</div>
<canvas id="mc"></canvas><div id="lb">— WAITING —</div>
<script>
const cv=document.getElementById('mc'),ct=cv.getContext('2d'),lb=document.getElementById('lb');
function rsz(){cv.width=window.innerWidth;cv.height=window.innerHeight;}rsz();
window.addEventListener('resize',rsz);
window._canvas=cv;window._ctx=ct;
(function lp(){requestAnimationFrame(lp);const p=window.opener;if(!p||p.closed){lb.textContent='— DISCONNECTED —';return;}
const s=p.state;if(!s||!s.running){lb.textContent='— NO SIGNAL —';return;}
lb.textContent={mic:'🎙 MIC',file:'📁 FILE',screen:'🖥 SCREEN'}[s.audioSource]||'—';})();
<\/script></body></html>`);
  popup.document.close();
  setTimeout(()=>{popup._canvas=popup.document.getElementById('mc');popup._ctx=popup._canvas?.getContext('2d');},400);
  state.miniWindow=popup;
  popup.addEventListener('beforeunload',()=>state.miniWindow=null);
}

// ── IDLE ANIMATION ─────────────────────────
function idleAnim() {
  if(state.running) return;
  requestAnimationFrame(idleAnim);
  const W=canvas.width,H=canvas.height;
  ctx.fillStyle='rgba(0,0,4,0.08)'; ctx.fillRect(0,0,W,H);
  const t=Date.now()/1000,cx=W/2,cy=H/2;
  for(let i=0;i<8;i++){
    const r=50+i*52+Math.sin(t*0.44+i*1.1)*14;
    const a=Math.max(0.006,0.018+Math.sin(t*0.28+i*0.85)*0.012);
    ctx.beginPath(); ctx.arc(cx,cy,r,0,Math.PI*2);
    ctx.strokeStyle=spectral(i/8,a); ctx.lineWidth=1; ctx.stroke();
  }
}

// ── MINI OVERLAY DRAG ──────────────────────
function toggleMini() {
  const h=miniOverlayEl.classList.toggle('hidden');
  if(!h) updateMiniLbl();
  btnMini.style.borderColor=h?'':'var(--accent1)';
  btnMini.style.boxShadow=h?'':'0 0 12px var(--glow-color)';
}
(function drag(){
  let on=false,ox=0,oy=0;
  const hd=document.getElementById('mini-header');
  hd.addEventListener('mousedown',e=>{if(e.target.tagName==='BUTTON')return;on=true;const r=miniOverlayEl.getBoundingClientRect();ox=e.clientX-r.left;oy=e.clientY-r.top;miniOverlayEl.style.cursor='grabbing';});
  window.addEventListener('mousemove',e=>{if(!on)return;miniOverlayEl.style.right='auto';miniOverlayEl.style.bottom='auto';miniOverlayEl.style.left=(e.clientX-ox)+'px';miniOverlayEl.style.top=(e.clientY-oy)+'px';});
  window.addEventListener('mouseup',()=>{on=false;miniOverlayEl.style.cursor='';});
  hd.addEventListener('touchstart',e=>{if(e.target.tagName==='BUTTON')return;const tc=e.touches[0];on=true;const r=miniOverlayEl.getBoundingClientRect();ox=tc.clientX-r.left;oy=tc.clientY-r.top;},{passive:true});
  window.addEventListener('touchmove',e=>{if(!on)return;const tc=e.touches[0];miniOverlayEl.style.right='auto';miniOverlayEl.style.bottom='auto';miniOverlayEl.style.left=(tc.clientX-ox)+'px';miniOverlayEl.style.top=(tc.clientY-oy)+'px';},{passive:true});
  window.addEventListener('touchend',()=>{on=false;});
})();

// ── PiP ────────────────────────────────────
async function pip() {
  if(!document.pictureInPictureEnabled){showToast('⚠ PiP not supported.');return;}
  let v=document.getElementById('pip-v');
  if(!v){v=document.createElement('video');v.id='pip-v';v.style.display='none';document.body.appendChild(v);}
  try{v.srcObject=canvas.captureStream(30);await v.play();await v.requestPictureInPicture();showToast('📺 PiP active!');}
  catch(e){showToast('⚠ PiP failed: '+e.message);}
}

// ── HELPERS ────────────────────────────────
function resetBtn(){updateBtnLabel();btnStart.disabled=false;btnPause.disabled=true;}
function updateBtnLabel(){
  const ic={mic:'🎙',file:'📁',screen:'🖥'},lb={mic:'Start Mic',file:'Load File',screen:'Capture Screen'};
  btnStart.innerHTML=`<span class="btn-icon">${ic[state.audioSource]}</span><span>${lb[state.audioSource]}</span>`;
  btnStart.classList.remove('active');
}
function badge(ic,tx){sourceBadgeIcon.textContent=ic;sourceBadgeText.textContent=tx;sourceBadge.classList.remove('hidden');}
function showSt(){const e=document.getElementById('status-text');if(e)e.classList.remove('hidden');}
function hideSt(){const e=document.getElementById('status-text');if(e)e.classList.add('hidden');}
function showError(m){console.error(m);alert(m);}
let ttimer=null;
function showToast(m){
  let t=document.getElementById('screen-toast');
  if(!t){t=document.createElement('div');t.id='screen-toast';document.body.appendChild(t);}
  t.textContent=m;t.classList.remove('hidden');
  if(ttimer)clearTimeout(ttimer);ttimer=setTimeout(()=>t.classList.add('hidden'),4000);
}
function updateMiniLbl(){miniSourceLabel.textContent=state.running?({mic:'🎙 MICROPHONE',file:'📁 FILE',screen:'🖥 SYSTEM AUDIO'}[state.audioSource]||'—'):'— NO SIGNAL —';}
function fmt(s){return Math.floor(s/60)+':'+Math.floor(s%60).toString().padStart(2,'0');}

// ── UI ─────────────────────────────────────
function handleUI() {
  sourceButtons.forEach(btn=>btn.addEventListener('click',async()=>{
    sourceButtons.forEach(b=>b.classList.remove('active'));btn.classList.add('active');
    await switchSrc(btn.dataset.source);updateBtnLabel();
  }));

  btnStart.addEventListener('click',async()=>{
    if(!state.running){btnStart.textContent='⟳ Connecting…';btnStart.disabled=true;await startViz();}
    else{stopAll();resetBtn();filePlayer.classList.add('hidden');audioEl.pause();showSt();btnPause.textContent='⏸';state.paused=false;const po=document.getElementById('pause-overlay');if(po)po.classList.remove('visible');}
  });

  fileInput.addEventListener('change',async e=>{
    const f=e.target.files[0];if(!f)return;
    btnStart.textContent='⟳ Loading…';btnStart.disabled=true;
    const ok=await initFile(f);
    if(ok){state.running=true;state.paused=false;initParticles();initBgP();if(!state.animFrameId)loop();btnStart.innerHTML='<span class="btn-icon">⏹</span><span>Stop</span>';btnStart.classList.add('active');btnStart.disabled=false;btnPause.disabled=false;hideSt();updateMiniLbl();}
    else resetBtn();fileInput.value='';
  });

  btnPause.addEventListener('click',()=>{
    state.paused=!state.paused;btnPause.textContent=state.paused?'▶':'⏸';
    if(state.audioSource==='file'){state.paused?audioEl.pause():audioEl.play();}
    let ov=document.getElementById('pause-overlay');
    if(!ov){ov=document.createElement('div');ov.id='pause-overlay';ov.innerHTML='<div id="pause-label">⏸ PAUSED</div>';document.body.appendChild(ov);}
    ov.classList.toggle('visible',state.paused);
  });

  fpPlayPause.addEventListener('click',()=>{if(audioEl.paused){audioEl.play();fpPlayPause.textContent='⏸';state.paused=false;}else{audioEl.pause();fpPlayPause.textContent='▶';}});
  audioEl.addEventListener('ended',()=>{fpPlayPause.textContent='▶';});
  fpProgressWrap.addEventListener('click',e=>{if(!audioEl.duration)return;const r=fpProgressWrap.getBoundingClientRect();audioEl.currentTime=((e.clientX-r.left)/r.width)*audioEl.duration;});

  btnFullscreen.addEventListener('click',()=>{if(!document.fullscreenElement)document.documentElement.requestFullscreen().catch(()=>{});else document.exitFullscreen().catch(()=>{});});
  btnScreenshot.addEventListener('click',()=>{const l=document.createElement('a');l.download='spectr-'+Date.now()+'.png';l.href=canvas.toDataURL();l.click();});
  btnMini.addEventListener('click',e=>{if(e.shiftKey)openMiniWin();else toggleMini();});
  btnMini.title='Mini Overlay (click) | Popup (Shift+click)';
  miniCloseBtn.addEventListener('click',()=>{miniOverlayEl.classList.add('hidden');btnMini.style.borderColor='';btnMini.style.boxShadow='';});
  miniPipBtn.addEventListener('click',()=>pip());

  modeButtons.forEach(btn=>btn.addEventListener('click',()=>{state.mode=btn.dataset.mode;modeButtons.forEach(b=>b.classList.remove('active'));btn.classList.add('active');}));
  themeButtons.forEach(btn=>btn.addEventListener('click',()=>{state.theme=btn.dataset.theme;document.body.dataset.theme=state.theme;themeButtons.forEach(b=>b.classList.remove('active'));btn.classList.add('active');}));
  sensitivitySlider.addEventListener('input',()=>{state.sensitivity=parseFloat(sensitivitySlider.value);sensitivityVal.textContent=state.sensitivity.toFixed(1);});
  toggleBg.addEventListener('change',()=>state.showBgFx=toggleBg.checked);
  toggleAutocycle.addEventListener('change',()=>state.autoCycle=toggleAutocycle.checked);
  document.addEventListener('click',()=>{if(state.audioCtx&&state.audioCtx.state==='suspended')state.audioCtx.resume();});
}

function buildIdle() {
  const d=document.createElement('div');d.id='status-text';
  d.innerHTML='<div id="status-title">SPECTR</div><div id="status-sub">SELECT SOURCE &amp; HIT START</div>';
  document.body.appendChild(d);
}

window.state=state;
(function boot(){buildIdle();handleUI();initBgP();idleAnim();})();
>>>>>>> 9c4df1acd34d0733e195ccda157f98a3081ab930
