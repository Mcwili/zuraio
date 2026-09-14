/**
 * Inject CONTACT_API_URL into built site config (dist/js/config.js).
 * Run after set-main-site.mjs. Uses env CONTACT_API_URL (public Worker URL).
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const CONFIG = path.join(ROOT, '..', 'dist', 'js', 'config.js');
const url = (process.env.CONTACT_API_URL || '').trim();

if (!fs.existsSync(CONFIG)) {
  console.warn('inject-contact-api-url: dist/js/config.js not found, skipping');
  process.exit(0);
}

let text = fs.readFileSync(CONFIG, 'utf8');
const pattern = /export const CONTACT_API_URL = ['"][^'"]*['"];/;
if (!pattern.test(text)) {
  console.warn('inject-contact-api-url: CONTACT_API_URL export not found in config.js');
  process.exit(0);
}

text = text.replace(pattern, `export const CONTACT_API_URL = ${JSON.stringify(url)};`);
fs.writeFileSync(CONFIG, text);
console.log(`inject-contact-api-url: CONTACT_API_URL ${url ? 'set' : 'empty (mailto fallback)'}`);
