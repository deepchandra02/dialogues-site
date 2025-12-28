import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distDir = path.join(__dirname, '..', 'dist');
const indexPath = path.join(distDir, 'index.html');
const notFoundPath = path.join(distDir, '404.html');

// Read the built index.html
if (!fs.existsSync(indexPath)) {
  console.error('Error: dist/index.html not found. Run `npm run build` first.');
  process.exit(1);
}

const indexHTML = fs.readFileSync(indexPath, 'utf-8');

// For GitHub Pages, 404.html should be identical to index.html
// This allows client-side routing to work
fs.writeFileSync(notFoundPath, indexHTML);

console.log('✓ Generated 404.html for GitHub Pages routing');
