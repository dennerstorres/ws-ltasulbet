/* Cross-platform copy of migrations to dist/migrations */
const fs = require('fs');
const path = require('path');

// Ensure dist/migrations only has compiled JS migrations
const distDir = path.join(__dirname, '..', 'dist', 'migrations');

function cleanTsFiles(dir) {
  if (!fs.existsSync(dir)) return;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const entryPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      cleanTsFiles(entryPath);
    } else if (entry.name.endsWith('.ts')) {
      fs.rmSync(entryPath, { force: true });
    }
  }
}

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function main() {
  ensureDir(distDir);
  cleanTsFiles(distDir);
  console.log(`[copy-migrations] Ensured dist migrations are JS-only at ${distDir}`);
}

main();
