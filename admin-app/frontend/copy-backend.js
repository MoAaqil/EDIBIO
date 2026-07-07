const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '../backend/lib');
const destDir = path.join(__dirname, 'lib');

function copyDir(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (let entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

if (fs.existsSync(srcDir)) {
  // Clean target first to avoid stale files
  if (fs.existsSync(destDir)) {
    fs.rmSync(destDir, { recursive: true, force: true });
  }
  copyDir(srcDir, destDir);
  console.log('Backend database assets copied to frontend library successfully.');
} else {
  console.log('Source backend/lib directory not found. Retaining existing frontend/lib assets.');
}
