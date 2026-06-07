const fs = require('fs');
const path = 'style.css';
let content = fs.readFileSync(path, 'utf8');

// 1. Extract the Intro Screen sections
const introSectionRegex = /\/\* =+[\s\S]*?INTRO SCREEN[\s\S]*?========================================= \*\//;
const introTitleRegex = /#intro-title\s*{[\s\S]*?}/g;
const introContentRegex = /\.intro-content\s*{[\s\S]*?}/g;
const btnEnterRegex = /#btn-enter\s*{[\s\S]*?}/g;

// We need to clean up the duplicates first
content = content.replace(/#intro-title\s*{[\s\S]*?}/g, '');
content = content.replace(/\.intro-content\s*{[\s\S]*?}/g, '');
content = content.replace(/#btn-enter\s*{[\s\S]*?}/g, '');

// 2. Define the new Base (Desktop) Styles for the Intro
const baseIntroStyles = `
/* =========================================
   INTRO SCREEN (BASE STYLES)
   ========================================= */
#intro-screen {
  position: fixed;
  inset: 0;
  z-index: 10000;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #050505;
  transition: opacity 1.2s ease, visibility 1.2s ease;
}

#intro-screen.hidden {
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
}

.intro-bg-image {
  position: absolute;
  inset: 0;
  background-image: url('intro-bg.jpg');
  background-size: cover;
  background-position: center;
  opacity: 0.8;
  z-index: -1;
  animation: introZoom 25s infinite alternate;
}

.intro-content {
  text-align: center;
  z-index: 1;
  width: 100%;
  padding: 0 24px;
  box-sizing: border-box;
}

#intro-title {
  font-family: 'Orbitron', sans-serif;
  font-size: clamp(3.5rem, 10vw, 8rem);
  font-weight: 900;
  letter-spacing: clamp(0.5rem, 2vw, 1.5rem);
  color: #fff;
  text-shadow: 0 0 40px rgba(255, 255, 255, 0.4);
  margin-bottom: 3rem;
  padding-left: clamp(0.5rem, 2vw, 1.5rem);
  animation: pulseTitle 4s infinite;
  display: block;
}

#btn-enter {
  background: rgba(0, 0, 0, 0.3);
  border: 2px solid rgba(255, 255, 255, 0.5);
  color: #fff;
  padding: 1.2rem 3rem;
  font-family: 'Orbitron', sans-serif;
  font-size: 1.2rem;
  font-weight: 700;
  letter-spacing: 0.3rem;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  backdrop-filter: blur(8px);
}
`;

// 3. Insert Base Styles BEFORE the media queries (find the first @media)
const mediaIndex = content.indexOf('@media');
if (mediaIndex !== -1) {
    content = content.slice(0, mediaIndex) + baseIntroStyles + content.slice(mediaIndex);
} else {
    content += baseIntroStyles;
}

// 4. Update the 600px and 480px media queries with the correct overrides
// Since they are at the end, they will now correctly override the base styles
content = content.replace(
  /@media\s*\(max-width:\s*600px\)\s*{/g,
  `@media (max-width: 600px) {
  #intro-title {
    font-size: clamp(2.5rem, 12vw, 4.5rem);
    letter-spacing: 0.4rem;
    padding-left: 0.4rem;
  }
  #btn-enter {
    padding: 1rem 2rem;
    font-size: 1rem;
    letter-spacing: 0.2rem;
  }`
);

content = content.replace(
  /@media\s*\(max-width:\s*480px\)\s*{/g,
  `@media (max-width: 480px) {
  #intro-title {
    font-size: clamp(1.8rem, 10vw, 2.8rem);
    letter-spacing: 0.25rem;
    padding-left: 0.25rem;
    margin-bottom: 2rem;
  }
  #btn-enter {
    padding: 0.8rem 1.8rem;
    font-size: 0.9rem;
  }`
);

fs.writeFileSync(path, content);
console.log('Final Mobile CSS Overhaul complete.');
