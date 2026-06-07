const fs = require('fs');
const path = 'style.css';
let content = fs.readFileSync(path, 'utf8');

// 1. Overhaul the Intro Title for ALL screens
// We use a more responsive clamp and handle letter-spacing better
content = content.replace(
  /#intro-title\s*{[\s\S]*?}/,
  `#intro-title {
  font-family: 'Orbitron', sans-serif;
  font-size: clamp(3rem, 12vw, 8rem);
  font-weight: 900;
  letter-spacing: clamp(0.4rem, 2vw, 1.5rem);
  color: #fff;
  text-shadow: 0 0 40px rgba(255, 255, 255, 0.4);
  margin-bottom: 3rem;
  /* Use padding-left instead of margin-left to keep centering perfect */
  padding-left: clamp(0.4rem, 2vw, 1.5rem); 
  animation: pulseTitle 4s infinite;
  width: 100%;
  max-width: 100vw;
  box-sizing: border-box;
  overflow: hidden;
}`
);

// 2. Fix the Mobile Media Queries specifically for the Intro Screen
// Ensure intro-content has padding so it never touches edges
content = content.replace(
  /\.intro-content\s*{[\s\S]*?}/,
  `.intro-content {
  text-align: center;
  z-index: 1;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}`
);

// 3. Tighten up the 480px specific intro styles
content = content.replace(
  /#intro-title\s*{\s*font-size:\s*clamp\(2rem,\s*10vw,\s*4rem\);\s*letter-spacing:\s*0\.4rem;\s*margin-left:\s*0\.4rem;\s*margin-bottom:\s*2rem;\s*}/g,
  `#intro-title {
    font-size: clamp(2.2rem, 11vw, 4rem);
    letter-spacing: 0.3rem;
    padding-left: 0.3rem;
    margin-left: 0;
    margin-bottom: 2.5rem;
  }`
);

// 4. Ensure the enter button is easy to tap on all phones
content = content.replace(
  /#btn-enter\s*{[\s\S]*?}/,
  `#btn-enter {
  background: rgba(0, 0, 0, 0.3);
  border: 2px solid rgba(255, 255, 255, 0.5);
  color: #fff;
  padding: clamp(1rem, 3vw, 1.2rem) clamp(1.5rem, 5vw, 3.5rem);
  font-family: 'Orbitron', sans-serif;
  font-size: clamp(0.9rem, 4vw, 1.2rem);
  font-weight: 700;
  letter-spacing: 0.2rem;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  backdrop-filter: blur(8px);
  max-width: 90vw;
}`
);

fs.writeFileSync(path, content);
console.log('Bulletproof Intro Screen applied.');
