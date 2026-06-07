const fs = require('fs');
const path = 'style.css';
let content = fs.readFileSync(path, 'utf8');

// 1. Force the Intro Title to be much smaller on mobile
content = content.replace(
  /@media\s*\(max-width:\s*600px\)\s*{[\s\S]*?#intro-title\s*{[\s\S]*?}/g,
  `@media (max-width: 600px) {
  #intro-title {
    font-size: clamp(2rem, 12vw, 4rem) !important;
    letter-spacing: 0.3rem !important;
    padding-left: 0.3rem !important;
    margin-left: 0 !important;
  }`
);

content = content.replace(
  /@media\s*\(max-width:\s*480px\)\s*{[\s\S]*?#intro-title\s*{[\s\S]*?}/g,
  `@media (max-width: 480px) {
  #intro-title {
    font-size: clamp(1.8rem, 10vw, 2.5rem) !important;
    letter-spacing: 0.2rem !important;
    padding-left: 0.2rem !important;
    margin-bottom: 2rem !important;
    margin-left: 0 !important;
  }`
);

// 2. Also fix the Base Style just in case
content = content.replace(
  /#intro-title\s*{\s*font-family:\s*'Orbitron',\s*sans-serif;\s*font-size:\s*clamp\(3\.5rem,\s*10vw,\s*8rem\);/g,
  `#intro-title {
  font-family: 'Orbitron', sans-serif;
  font-size: clamp(2.5rem, 8vw, 8rem);`
);

fs.writeFileSync(path, content);
console.log('Mobile Logo successfully shrunk for all devices.');
