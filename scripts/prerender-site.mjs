/**
 * Playwright prerender: write fully localized HTML for all pages and locales.
 */
import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { HTML_PAGES, LOCALES, LOCALE_DIRS } from './seo-config.mjs';
import { postprocessHtml, injectLangRedirect } from './postprocess-seo.mjs';
import * as copyEn from '../public/zuraio-comparison/js/copy-en.js';
import * as copyDe from '../public/zuraio-comparison/js/copy-de.js';
import * as copyFr from '../public/zuraio-comparison/js/copy-fr.js';
import * as copyIt from '../public/zuraio-comparison/js/copy-it.js';

const COPY = { en: copyEn, de: copyDe, fr: copyFr, it: copyIt };

/**
 * Localize `data-i18n` elements inside <noscript>. The browser never exposes
 * that content to the DOM while scripting is on, so applyDataI18n() cannot
 * reach it; without this the fallback stays English on every locale page.
 */
function localizeNoscript(html, locale) {
  const copy = COPY[locale];
  if (!copy) return html;
  const lookup = (key) => key.split('.').reduce((acc, part) => (acc == null ? acc : acc[part]), copy);

  return html.replace(/<noscript>([\s\S]*?)<\/noscript>/gi, (block, inner) => {
    const localized = inner.replace(
      /<([a-zA-Z0-9]+)((?:"[^"]*"|'[^']*'|[^>"'])*\bdata-i18n="([^"]+)"(?:"[^"]*"|'[^']*'|[^>"'])*)>([\s\S]*?)<\/\1>/g,
      (full, tag, attrs, key, body) => {
        const value = lookup(key);
        return typeof value === 'string' ? `<${tag}${attrs}>${value}</${tag}>` : full;
      },
    );
    return `<noscript>${localized}</noscript>`;
  });
}

function rewriteAssetPathsForLocale(html, locale) {
  if (locale === 'en') return html;
  return html
    .replace(/\bhref="assets\//g, 'href="../assets/')
    .replace(/\bsrc="assets\//g, 'src="../assets/')
    .replace(/\bhref="css\//g, 'href="../css/')
    .replace(/\bsrc="js\//g, 'src="../js/')
    .replace(/\bhref="zuraio\//g, 'href="../zuraio/')
    .replace(/\bsrc="zuraio\//g, 'src="../zuraio/')
    .replace(/srcset="([^"]*)"/g, (_match, value) => {
      // Rewrite every candidate, not only the first one (e.g. "a.avif 640w, b.avif 960w").
      const rewritten = value
        .split(',')
        .map((candidate) => candidate.trim().replace(/^zuraio\//, '../zuraio/'))
        .join(', ');
      return `srcset="${rewritten}"`;
    });
}

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.join(ROOT, '..', 'dist');
const PORT = Number(process.env.PRERENDER_PORT || 4175);

function waitForServer(port, attempts = 30) {
  return new Promise((resolve, reject) => {
    let tries = 0;
    const tick = () => {
      const req = http.get(`http://127.0.0.1:${port}/index.html`, (res) => {
        res.resume();
        resolve();
      });
      req.on('error', () => {
        tries += 1;
        if (tries >= attempts) reject(new Error(`Server not ready on port ${port}`));
        else setTimeout(tick, 500);
      });
    };
    tick();
  });
}

function startServer() {
  return new Promise((resolve, reject) => {
    const proc = spawn('npx', ['serve', DIST, '-l', String(PORT), '--no-clipboard'], {
      stdio: 'pipe',
      shell: true,
    });
    proc.on('error', reject);
    waitForServer(PORT)
      .then(() => resolve(proc))
      .catch((err) => {
        proc.kill('SIGTERM');
        reject(err);
      });
  });
}

function prerenderPath(htmlPage, locale) {
  const dir = LOCALE_DIRS[locale];
  if (!dir) {
    return htmlPage === 'index.html' ? '/' : `/${htmlPage}`;
  }
  return htmlPage === 'index.html' ? `/${dir}/` : `/${dir}/${htmlPage}`;
}

async function waitForPageReady(page, pageName, locale) {
  await page.waitForSelector('#site-header nav a', { timeout: 45000 });
  await page.waitForSelector('main', { timeout: 45000 });

  if (pageName === 'index.html') {
    await page.waitForFunction(
      () => document.querySelector('[data-hero-headline]')?.textContent?.trim().length > 8,
      { timeout: 45000 },
    );
    await page.waitForFunction(
      () => (document.querySelector('.hero-trust-bar__list')?.children.length ?? 0) >= 4,
      { timeout: 45000 },
    );
    if (locale !== 'en') {
      await page.waitForFunction(
        (loc) => document.documentElement.lang === loc,
        locale,
        { timeout: 45000 },
      );
    }
  }

  if (pageName === 'faq.html') {
    await page.waitForSelector('.faq-q', { timeout: 45000 });
    if (locale !== 'en') {
      await page.waitForFunction(
        (loc) => document.documentElement.lang === loc,
        locale,
        { timeout: 45000 },
      );
    }
  }

  const dataPage = await page.evaluate(() => document.body.dataset.page || '');
  const needsBody = [
    'technicalArchitecture',
    'knowledge',
    'dataControl',
    'deploymentModels',
    'aiGovernance',
    'integrations',
  ];
  if (needsBody.includes(dataPage)) {
    await page.waitForFunction(
      () => (document.querySelector('main')?.textContent?.trim().length ?? 0) > 300,
      { timeout: 45000 },
    );
  }

  if (['impressum', 'privacy', 'terms', 'cookies'].includes(dataPage)) {
    await page.waitForSelector('.legal-content h2', { timeout: 45000 });
  }

  await page.waitForTimeout(600);
}

if (!fs.existsSync(DIST)) {
  console.error('prerender-site: dist/ not found');
  process.exit(1);
}

const baseTemplates = Object.fromEntries(
  HTML_PAGES.map((page) => [page, fs.readFileSync(path.join(DIST, page), 'utf8')]),
);

function bootstrapLocaleDir(locale) {
  const dirKey = LOCALE_DIRS[locale];
  if (!dirKey) return;
  const outDir = path.join(DIST, dirKey);
  fs.mkdirSync(outDir, { recursive: true });
  for (const htmlPage of HTML_PAGES) {
    const dest = path.join(outDir, htmlPage);
    const localized = localizeNoscript(baseTemplates[htmlPage], locale);
    fs.writeFileSync(dest, rewriteAssetPathsForLocale(localized, locale));
  }
}

const server = await startServer();
const browser = await chromium.launch({ headless: true });

for (const locale of LOCALES) {
  bootstrapLocaleDir(locale);
  const context = await browser.newContext();
  const page = await context.newPage();

  for (const htmlPage of HTML_PAGES) {
    const url = `http://127.0.0.1:${PORT}${prerenderPath(htmlPage, locale)}`;
    console.log(`prerender-site: ${locale} ${htmlPage}`);
    await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
    await waitForPageReady(page, htmlPage, locale);
    let html = await page.content();

    html = postprocessHtml(html, locale, htmlPage);
    html = injectLangRedirect(html);

    const dirKey = LOCALE_DIRS[locale];
    const outDir = dirKey ? path.join(DIST, dirKey) : DIST;
    fs.mkdirSync(outDir, { recursive: true });
    fs.writeFileSync(path.join(outDir, htmlPage), html);
  }

  await context.close();
}

await browser.close();
if (server) {
  server.kill('SIGKILL');
}
console.log('prerender-site: complete');
process.exit(0);
