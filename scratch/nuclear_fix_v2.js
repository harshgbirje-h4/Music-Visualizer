const fs = require('fs');

const paths = [
  'index.html',
  '../index.html',
  '../promusiccc/index.html'
];

const mobileScript = `
  <script>
    function forceMobileFix() {
      const title = document.getElementById('intro-title');
      if (!title) return;
      if (window.innerWidth <= 600) {
        title.style.fontSize = Math.min(window.innerWidth * 0.11, 42) + 'px';
        title.style.letterSpacing = '0.3rem';
        title.style.paddingLeft = '0.3rem';
        title.style.marginLeft = '0';
        title.style.background = 'transparent'; // Remove any debug red
      }
      if (window.innerWidth <= 480) {
        title.style.fontSize = Math.min(window.innerWidth * 0.09, 32) + 'px';
        title.style.letterSpacing = '0.2rem';
      }
    }
    window.addEventListener('load', forceMobileFix);
    window.addEventListener('resize', forceMobileFix);
    forceMobileFix();
  </script>
`;

paths.forEach(p => {
  try {
    if (fs.existsSync(p)) {
      let content = fs.readFileSync(p, 'utf8');
      // Remove old debug/internal styles
      content = content.replace(/<style>[\s\S]*?<\/style>/g, '');
      // Add the new script before </body>
      if (!content.includes('forceMobileFix')) {
          content = content.replace('</body>', mobileScript + '\n</body>');
      }
      // Also update CSS version just in case
      content = content.replace(/style\.css\?v=[\d.]+/g, 'style.css?v=2.0');
      fs.writeFileSync(p, content);
      console.log('Fixed ' + p);
    }
  } catch (e) {
    console.error('Error fixing ' + p + ': ' + e.message);
  }
});
