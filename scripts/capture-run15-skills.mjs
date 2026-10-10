import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { startStaticDistServer } from './static-dist-server.mjs';

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.join(ROOT, '..', 'dist');
const ART = '/opt/cursor/artifacts';
const PORT = 4201;

fs.mkdirSync(ART, { recursive: true });

const server = await startStaticDistServer(DIST, PORT);
const browser = await chromium.launch({ headless: true });
const base = `http://127.0.0.1:${PORT}`;

const widths = [360, 390, 768, 1280, 1440];
const tabs = ['architecture', 'fiduciary', 'property'];

try {
  for (const width of widths) {
    for (const locale of ['en', 'de', 'fr', 'it']) {
      const page = await browser.newPage();
      await page.setViewportSize({ width, height: 900 });
      const p = locale === 'en' ? '/en/homepage-preview.html' : `/${locale}/homepage-preview.html`;
      await page.goto(`${base}${p}`, { waitUntil: 'networkidle', timeout: 90_000 });
      await page.waitForSelector('[data-alt-skills-sector]', { timeout: 30_000 });
      const overflow = await page.evaluate(() => ({
        overflowX: document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
      }));
      if (overflow.overflowX) console.error('OVERFLOW', locale, width);
      await page.close();
    }
  }

  const page = await browser.newPage();
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto(`${base}/de/homepage-preview.html`, { waitUntil: 'networkidle', timeout: 90_000 });
  for (const tab of tabs) {
    await page.locator('#skills').scrollIntoViewIfNeeded();
    await page.locator(`#skills-tab-${tab}`).click();
    await page.waitForTimeout(400);
    await page.locator(`#skills-panel-${tab} .alt-skills-panel__figure`).screenshot({
      path: path.join(ART, `run15-de-1280-tab-${tab}.png`),
    });
  }

  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(`${base}/en/homepage-preview.html`, { waitUntil: 'networkidle', timeout: 90_000 });
  await page.locator('#skills').scrollIntoViewIfNeeded();
  await page.getByRole('tab', { name: 'Fiduciary' }).click();
  await page.waitForTimeout(400);
  await page.locator('#skills-panel-fiduciary .alt-skills-panel__figure').screenshot({
    path: path.join(ART, 'run15-en-390-fiduciary.png'),
  });
  await page.locator('#skills-panel-fiduciary [data-skills-lightbox-trigger]').click();
  await page.waitForTimeout(300);
  await page.screenshot({ path: path.join(ART, 'run15-en-390-fiduciary-lightbox.png') });

  await page.close();
} finally {
  await browser.close().catch(() => {});
  await server.close().catch(() => {});
}

console.log('capture-run15-skills: done');
