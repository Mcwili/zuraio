/**
 * Measure skills desktop image render width vs natural (DE, all tabs) at 1280 and 1440.
 */
import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { startStaticDistServer } from './static-dist-server.mjs';

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.join(ROOT, '..', 'dist');
const ART = '/opt/cursor/artifacts';
const PORT = 4203;
const TABS = ['architecture', 'fiduciary', 'property'];

fs.mkdirSync(ART, { recursive: true });

const server = await startStaticDistServer(DIST, PORT);
const browser = await chromium.launch({ headless: true });
const results = [];

try {
  for (const width of [360, 390, 768, 1024, 1280, 1440]) {
    for (const locale of ['en', 'de', 'fr', 'it']) {
      const page = await browser.newPage();
      await page.setViewportSize({ width, height: 900 });
      const p = locale === 'en' ? '/index.html' : `/${locale}/index.html`;
      await page.goto(`http://127.0.0.1:${PORT}${p}`, { waitUntil: 'networkidle', timeout: 90_000 });
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
      );
      if (overflow) results.push({ kind: 'overflow', locale, width });
      await page.close();
    }
  }

  for (const width of [1280, 1440]) {
    const page = await browser.newPage();
    await page.setViewportSize({ width, height: 900 });
    await page.goto(`http://127.0.0.1:${PORT}/de/index.html`, { waitUntil: 'networkidle', timeout: 90_000 });
    await page.locator('#skills').scrollIntoViewIfNeeded();

    for (const tab of TABS) {
      await page.locator(`#skills-tab-${tab}`).click();
      await page.waitForTimeout(350);
      const m = await page.locator('#skills-panel-' + tab + ' .alt-skills-panel__image').evaluate((img) => {
        const natural = Number(img.getAttribute('data-skills-natural-w')) || img.naturalWidth;
        const rendered = img.getBoundingClientRect().width;
        return { natural, rendered, pct: natural ? Math.round((rendered / natural) * 1000) / 10 : null };
      });
      results.push({ kind: 'measure', viewport: width, tab, ...m });
    }
    await page.close();
  }
} finally {
  await browser.close().catch(() => {});
  await server.close().catch(() => {});
}

const reportPath = path.join(ART, 'run15b-de-image-scale.json');
fs.writeFileSync(reportPath, JSON.stringify(results, null, 2));
console.log('measure-run15b-skills:', reportPath);
for (const r of results.filter((x) => x.kind === 'measure')) {
  console.log(`  ${r.viewport}px ${r.tab}: ${r.rendered}px / ${r.natural}px = ${r.pct}%`);
}
const overflows = results.filter((x) => x.kind === 'overflow');
if (overflows.length) {
  console.error('OVERFLOW:', overflows);
  process.exit(1);
}

for (const r of results.filter((x) => x.kind === 'measure')) {
  if (r.pct < 85) {
    console.error(`FAIL: ${r.viewport}px ${r.tab} at ${r.pct}% (<85%)`);
    process.exit(1);
  }
}
