const fs = require('fs');
let code = fs.readFileSync('script.js', 'utf8');

// Mock browser objects
global.window = {};
global.document = {
  getElementById: (id) => {
    return {
      getContext: () => ({}),
      style: {},
      classList: { toggle: () => {} }
    };
  },
  body: { classList: { toggle: () => {} } },
  querySelectorAll: () => []
};
global.performance = { now: () => 1000 };

const state = {};
function themeConfig() { return { label: 'CLASSIC' }; }
function updateMilkdropFilter() {}
function loadThemePreset() {}
function applyTheme() {}
function requestPip() {}

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
  arc: () => {}
};

try {
  eval(code);
  drawVortex(c, 800, 600);
  console.log('Successfully ran drawVortex without throwing!');
} catch(e) {
  console.error('Error running drawVortex:', e);
}
