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
function resizeCanvas() {
  canvas.width = bgCanvas.width = window.innerWidth;
  canvas.height = bgCanvas.height = window.innerHeight;
}
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
function ensureCtx() {
  if (!state.audioCtx || state.audioCtx.state === 'closed') {
    state.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    state.analyser = state.audioCtx.createAnalyser();
    state.analyser.fftSize = state.fftSize;
    state.analyser.smoothingTimeConstant = 0.82;
    state.bufferLength = state.analyser.frequencyBinCount;
    state.freqData = new Uint8Array(state.bufferLength);
    state.timeData = new Uint8Array(state.analyser.fftSize);
  }
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
