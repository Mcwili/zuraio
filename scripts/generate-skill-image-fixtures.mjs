/** Dev-only: layout-accurate PNGs until docs/skill-images/*.png are on main. Not run in CI build. */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(ROOT, '..', 'docs', 'skill-images');
const SECTORS = ['architecture', 'fiduciary', 'property'];
const LOCALES = ['en', 'de', 'fr', 'it'];

function cardSvg(width, height, cardBottomY, label) {
  const cardX = Math.round(width * 0.08);
  const cardY = Math.round(height * 0.06);
  const cardW = Math.round(width * 0.84);
  const cardH = cardBottomY - cardY;
  return Buffer.from(`<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="#F6F6F2"/>
  <rect x="${cardX}" y="${cardY}" width="${cardW}" height="${cardH}" rx="16" fill="#FFFFFF" stroke="#E8E8E4"/>
  <text x="${width / 2}" y="${cardY + 48}" text-anchor="middle" font-family="system-ui,sans-serif" font-size="22" fill="#5a5a54">${label}</text>
</svg>`);
}

async function write(name, width, height, cardBottomY) {
  const file = path.join(OUT, `${name}.png`);
  await sharp(cardSvg(width, height, cardBottomY, name)).png().toFile(file);
}

fs.mkdirSync(OUT, { recursive: true });

for (const sector of SECTORS) {
  for (const locale of LOCALES) {
    await write(`zuraio-skill-${sector}-${locale}`, 1536, 1024, 920);
    await write(`zuraio-skill-${sector}-${locale}-mobile`, 1080, 1440, 1180);
  }
}

console.log('generate-skill-image-fixtures: wrote 24 PNGs to docs/skill-images/');
