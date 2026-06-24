const fs = require('fs');
const path = require('path');

function processDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDir(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      // Remove style={{ fontFamily: ... }} completely
      content = content.replace(/style=\{\{\s*fontFamily:\s*\"\'[^\']+\',\s*[^\"]+\"\s*\}\}/g, '');
      
      // Remove fontFamily: '...' inside objects
      content = content.replace(/fontFamily:\s*\"\'[^\']+\',\s*[^\"]+\",?/g, '');
      
      fs.writeFileSync(fullPath, content, 'utf8');
    }
  }
}

processDir('./src');
console.log('Removed inline font families');
