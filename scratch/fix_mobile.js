const fs = require('fs');
const path = 'style.css';
let content = fs.readFileSync(path, 'utf8');

// 1. Fix intro title
content = content.replace(
  /font-size:\s*clamp\(3rem,\s*15vw,\s*6rem\);/g,
  'font-size: clamp(2rem, 10vw, 4rem);'
);

// 2. Fix header padding/gap in 480px media query
content = content.replace(
  /padding:\s*16px\s*12px;\s*gap:\s*12px;/g,
  'padding: 20px 16px; gap: 16px;'
);

// 3. Fix logo font size in 480px
content = content.replace(
  /#logo\s*{\s*text-align:\s*center;\s*order:\s*1;\s*}/g,
  '#logo { text-align: center; order: 1; font-size: 24px; }'
);

// 4. Increase control panel padding
content = content.replace(
  /padding:\s*12px\s*10px\s*16px;/g,
  'padding: 20px 14px 24px;'
);

// 5. Hide energy meter strictly
content = content.replace(
  /#energy-meter\s*{\s*display:\s*none;\s*}/g,
  '#energy-meter { display: none !important; }'
);

fs.writeFileSync(path, content);
console.log('Mobile fixes applied successfully.');
