import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.join(ROOT, '..', 'dist');
const CACHE_FILE = path.join(ROOT, 'site-asset-cache.txt');
const STALE = ['20261010h', '20261010g', '20261010f', '20261010e', '20261009f', '20261009e', '20261009d', '20261009c', '20261009b', '20261009a', '20261006d', '20261006c', '20261006b', '20261006a', '20261005f', '20261005e', '20261005c', '20261005b', '20261005a', '20261004b', '20261004a'];

const expected = fs.readFileSync(CACHE_FILE, 'utf8').trim();
if (!/^\d{8}[a-z]$/.test(expected)) {
  console.error('check-dist-asset-cache: invalid site-asset-cache.txt');
  process.exit(1);
}

function walk(dir, files = []) {
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    if (fs.statSync(full).isDirectory()) walk(full, files);
    else files.push(full);
  }
  return files;
}

if (!fs.existsSync(DIST)) {
  console.error('check-dist-asset-cache: dist/ missing');
  process.exit(1);
}

const hits = [];
for (const file of walk(DIST)) {
  if (!/\.(html|js|css|json|xml|txt)$/i.test(file)) continue;
  const text = fs.readFileSync(file, 'utf8');
  for (const stale of STALE) {
    if (text.includes(stale)) hits.push({ file: path.relative(DIST, file), stale });
  }
}

if (hits.length) {
  console.error('check-dist-asset-cache: stale cache key(s) in dist:');
  for (const h of hits.slice(0, 30)) {
    console.error(`  ${h.file} → ${h.stale}`);
  }
  if (hits.length > 30) console.error(`  … and ${hits.length - 30} more`);
  process.exit(1);
}

const mustHave = [
  path.join(DIST, 'index.html'),
  path.join(DIST, 'de', 'index.html'),
  path.join(DIST, 'fr', 'index.html'),
  path.join(DIST, 'it', 'index.html'),
  path.join(DIST, 'js', 'alt-skills-sector.js'),
];
for (const file of mustHave) {
  if (!fs.existsSync(file)) {
    console.error(`check-dist-asset-cache: missing ${path.relative(DIST, file)}`);
    process.exit(1);
  }
  const text = fs.readFileSync(file, 'utf8');
  if (!text.includes(`v=${expected}`) && !file.endsWith('alt-skills-sector.js')) {
    console.error(`check-dist-asset-cache: ${path.relative(DIST, file)} missing v=${expected}`);
    process.exit(1);
  }
}

const sectorJs = fs.readFileSync(path.join(DIST, 'js', 'alt-skills-sector.js'), 'utf8');
if (sectorJs.includes('syncPanelMinHeight')) {
  console.error('check-dist-asset-cache: alt-skills-sector.js still has syncPanelMinHeight');
  process.exit(1);
}
if (!sectorJs.includes('data-skills-lightbox-trigger')) {
  console.error('check-dist-asset-cache: alt-skills-sector.js missing skills image lightbox');
  process.exit(1);
}

console.log(`check-dist-asset-cache: OK (v=${expected}, no stale keys in dist)`);
