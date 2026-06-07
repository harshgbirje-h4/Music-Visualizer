const fs = require('fs');
const code = fs.readFileSync('script.js', 'utf8');
const start = code.indexOf('// ── True-3D Perspective Projection Engine');
const end = code.indexOf('function drawThemeForeground');
const vortexCode = code.substring(start, end);

const wrapper = `
  let state = {};
  function themeConfig() { return { label: 'CLASSIC' }; }
  const performance = { now: () => 1000 };
  
  let firstFrameLog = false;
  let logCount = 0;
  const c = {
    save: () => {},
    restore: () => {},
    beginPath: () => {},
    moveTo: (x, y) => { if (logCount < 5) { console.log('moveTo', x, y); logCount++; } },
    lineTo: (x, y) => {},
    closePath: () => {},
    stroke: () => {},
    fill: () => {},
    fillRect: () => {},
    arc: () => {},
    set globalAlpha(v) { if (logCount < 5) console.log('alpha', v); this._alpha = v; },
    get globalAlpha() { return this._alpha; },
    set lineWidth(v) { if (logCount < 5) console.log('lineWidth', v); },
    set strokeStyle(v) { if (logCount < 5) console.log('strokeStyle', v); },
    set fillStyle(v) { if (logCount < 5) console.log('fillStyle', v); },
    set shadowBlur(v) {},
    set shadowColor(v) {},
    set globalCompositeOperation(v) {},
    set lineCap(v) {},
    set lineJoin(v) {}
  };
  
  ${vortexCode}
  
  drawVortex(c, 800, 600);
`;
fs.writeFileSync('test_vortex4.js', wrapper);
require('child_process').execSync('node test_vortex4.js', { stdio: 'inherit' });
