/**
 * Trim mobile skill PNGs, convert all to WebP (q88), write manifest for layout.
 * Sources: docs/skill-images/*.png (unchanged in git)
 * Output: public/zuraio/assets/skills/*.webp + skills-image-manifest.json
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const SRC_DIR = path.join(ROOT, '..', 'docs', 'skill-images');
const OUT_DIR = path.join(ROOT, '..', 'public', 'zuraio', 'assets', 'skills');
const MANIFEST_JS = path.join(ROOT, '..', 'public', 'zuraio-comparison', 'js', 'skills-image-manifest.js');

const SECTORS = ['architecture', 'fiduciary', 'property'];
const LOCALES = ['en', 'de', 'fr', 'it'];
const BG = { r: 246, g: 246, b: 242 };
const BG_TOL = 3;
const MOBILE_PAD_BELOW = 48;
const DESKTOP_PAD = 24;
const WEBP_QUALITY = 88;

function isBg(r, g, b, a = 255) {
  if (a < 128) return true;
  return (
    Math.abs(r - BG.r) <= BG_TOL &&
    Math.abs(g - BG.g) <= BG_TOL &&
    Math.abs(b - BG.b) <= BG_TOL
  );
}

async function rawPixels(image) {
  return image.clone().ensureAlpha().raw().toBuffer({ resolveWithObject: true });
}

async function contentBounds(image) {
  const { data, info } = await rawPixels(image);
  const { width, height, channels } = info;
  let minX = width;
  let minY = height;
  let maxX = -1;
  let maxY = -1;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * channels;
      if (!isBg(data[i], data[i + 1], data[i + 2], data[i + 3])) {
        if (x < minX) minX = x;
        if (y < minY) minY = y;
        if (x > maxX) maxX = x;
        if (y > maxY) maxY = y;
      }
    }
  }
  if (maxX < 0) {
    return { left: 0, top: 0, width, height };
  }
  const left = Math.max(0, minX - DESKTOP_PAD);
  const top = Math.max(0, minY - DESKTOP_PAD);
  const right = Math.min(width - 1, maxX + DESKTOP_PAD);
  const bottom = Math.min(height - 1, maxY + DESKTOP_PAD);
  return {
    left,
    top,
    width: right - left + 1,
    height: bottom - top + 1,
  };
}

async function bottomContentRow(image) {
  const { data, info } = await rawPixels(image);
  const { width, height, channels } = info;
  for (let y = height - 1; y >= 0; y--) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * channels;
      if (!isBg(data[i], data[i + 1], data[i + 2], data[i + 3])) return y;
    }
  }
  return height - 1;
}

async function trimDesktopPng(inputPath) {
  const image = sharp(inputPath);
  const bounds = await contentBounds(image);
  return {
    width: bounds.width,
    height: bounds.height,
    pipeline: sharp(inputPath).extract(bounds).png(),
  };
}

async function trimMobilePng(inputPath) {
  const image = sharp(inputPath);
  const meta = await image.metadata();
  const bottom = await bottomContentRow(image);
  let height = Math.min(meta.height, bottom + 1 + MOBILE_PAD_BELOW);
  if (height >= meta.height - 2) {
    height = meta.height;
  }
  const width = meta.width;
  return {
    width,
    height,
    pipeline: sharp(inputPath).extract({ left: 0, top: 0, width, height }).png(),
  };
}

async function toWebp(input, outPath) {
  await input.webp({ quality: WEBP_QUALITY, effort: 4 }).toFile(outPath);
  const stat = fs.statSync(outPath);
  return stat.size;
}

function baseName(sector, locale, mobile = false) {
  return `zuraio-skill-${sector}-${locale}${mobile ? '-mobile' : ''}`;
}

async function main() {
  if (!fs.existsSync(SRC_DIR)) {
    console.error('prepare-skill-images: missing docs/skill-images/ (add PNG sources on main)');
    process.exit(1);
  }

  fs.mkdirSync(OUT_DIR, { recursive: true });

  const manifest = { sectors: {}, generatedAt: new Date().toISOString() };
  const report = [];

  for (const sector of SECTORS) {
    manifest.sectors[sector] = {};
    for (const locale of LOCALES) {
      manifest.sectors[sector][locale] = {};
      for (const mobile of [false, true]) {
        const name = baseName(sector, locale, mobile);
        const srcPath = path.join(SRC_DIR, `${name}.png`);
        if (!fs.existsSync(srcPath)) {
          console.warn(`prepare-skill-images: skip missing ${name}.png`);
          continue;
        }

        let pipeline = sharp(srcPath);
        if (mobile) {
          const trimmed = await trimMobilePng(srcPath);
          pipeline = trimmed.pipeline;
          manifest.sectors[sector][locale].mobile = {
            width: trimmed.width,
            height: trimmed.height,
          };
        } else {
          const trimmed = await trimDesktopPng(srcPath);
          pipeline = trimmed.pipeline;
          manifest.sectors[sector][locale].desktop = {
            width: trimmed.width,
            height: trimmed.height,
          };
        }

        const outPath = path.join(OUT_DIR, `${name}.webp`);
        const bytes = await toWebp(pipeline, outPath);
        report.push({
          file: `${name}.webp`,
          bytes,
          kb: Math.round((bytes / 1024) * 10) / 10,
          ...(mobile
            ? { height: manifest.sectors[sector][locale].mobile.height }
            : {
                width: manifest.sectors[sector][locale].desktop.width,
                height: manifest.sectors[sector][locale].desktop.height,
              }),
        });
        if (bytes > 200 * 1024) {
          console.warn(`prepare-skill-images: ${name}.webp is ${report.at(-1).kb} KB (target ≤200 KB)`);
        }
      }
    }
  }

  const found = report.length;
  if (found === 0) {
    console.error('prepare-skill-images: no PNGs processed');
    process.exit(1);
  }

  fs.writeFileSync(
    MANIFEST_JS,
    `/** Generated by scripts/prepare-skill-images.mjs — do not edit */\nexport const SKILLS_IMAGE_MANIFEST = ${JSON.stringify(manifest, null, 2)};\n`,
  );
  console.log('prepare-skill-images: wrote', found, 'WebP files →', path.relative(path.join(ROOT, '..'), OUT_DIR));
  for (const row of report) {
    const dim = row.width != null ? `${row.width}×${row.height}px` : `height ${row.height}px`;
    console.log(`  ${row.file}\t${row.kb} KB\t${dim}`);
  }
  if (found < 24) {
    console.warn(`prepare-skill-images: expected up to 24 files, got ${found}`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
