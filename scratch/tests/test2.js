const fs = require('fs');
const code = fs.readFileSync('script.js', 'utf8');

const start = code.indexOf('// ── True-3D Perspective Projection Engine');
const end = code.indexOf('function drawThemeForeground');
const vortexCode = code.substring(start, end);

const wrapper = `
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
  
  ${vortexCode}
  
  try {
    drawVortex(c, 800, 600);
    console.log('Successfully ran drawVortex without throwing!');
  } catch(e) {
    console.error('Error running drawVortex:', e);
  }
`;
fs.writeFileSync('test_vortex2.js', wrapper);
require('child_process').execSync('node test_vortex2.js', { stdio: 'inherit' });
