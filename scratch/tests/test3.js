const fs = require('fs');
const code = fs.readFileSync('script.js', 'utf8');

const start = code.indexOf('// ── True-3D Perspective Projection Engine');
const end = code.indexOf('function drawThemeForeground');
const vortexCode = code.substring(start, end);

const wrapper = `
  let state = {};
  function themeConfig() { return { label: 'CLASSIC' }; }
  const performance = { now: () => 1000 };
  
  let drawCount = 0;
  let lines = 0;
  const c = {
    save: () => {},
    restore: () => {},
    beginPath: () => {},
    moveTo: () => {},
    lineTo: () => { lines++; },
    closePath: () => {},
    stroke: () => { drawCount++; },
    fill: () => { drawCount++; },
    fillRect: () => {},
    arc: () => {},
    set globalAlpha(v) { this._alpha = v; },
    get globalAlpha() { return this._alpha; },
    set lineWidth(v) {},
    set strokeStyle(v) {},
    set fillStyle(v) {},
    set shadowBlur(v) {},
    set shadowColor(v) {},
    set globalCompositeOperation(v) {},
    set lineCap(v) {},
    set lineJoin(v) {}
  };
  
  ${vortexCode}
  
  try {
    drawVortex(c, 800, 600);
    console.log('Successfully ran drawVortex.');
    console.log('Draw calls (stroke/fill):', drawCount);
    console.log('Lines drawn:', lines);
  } catch(e) {
    console.error('Error running drawVortex:', e);
  }
`;
fs.writeFileSync('test_vortex3.js', wrapper);
require('child_process').execSync('node test_vortex3.js', { stdio: 'inherit' });
