/**
 * Inject CONTACT_API_URL into built site config (dist/js/config.js).
 * Run after set-main-site.mjs. Uses env CONTACT_API_URL (public Worker URL).
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const CONFIG = path.join(ROOT, '..', 'dist', 'js', 'config.js');
const ENDPOINT_FILE = path.join(ROOT, '..', 'workers', 'contact-relay', 'public-endpoint.txt');
const PRODUCTION_DEFAULT = 'https://api.zuraio.ch/api/contact';

function readPublicEndpointFile() {
  if (!fs.existsSync(ENDPOINT_FILE)) return '';
  return fs.readFileSync(ENDPOINT_FILE, 'utf8').split('\n')[0].trim();
}

function resolveContactApiUrl(existingInDist) {
  const fromEnv = (process.env.CONTACT_API_URL || '').trim();
  if (fromEnv) return fromEnv;

  const fromFile = readPublicEndpointFile();
  if (fromFile) return fromFile;

  const canonical = (process.env.CANONICAL_BASE || '').trim();
  if (canonical === 'https://zuraio.ch') return PRODUCTION_DEFAULT;

  return existingInDist;
}

if (!fs.existsSync(CONFIG)) {
  console.warn('inject-contact-api-url: dist/js/config.js not found, skipping');
  process.exit(0);
}

let text = fs.readFileSync(CONFIG, 'utf8');
const pattern = /export const CONTACT_API_URL = ['"]([^'"]*)['"];/;
const match = text.match(pattern);
if (!match) {
  console.warn('inject-contact-api-url: CONTACT_API_URL export not found in config.js');
  process.exit(0);
}

const existingInDist = match[1] ?? '';
const url = resolveContactApiUrl(existingInDist);

if (!url) {
  console.log('inject-contact-api-url: CONTACT_API_URL empty (mailto fallback)');
  process.exit(0);
}

text = text.replace(pattern, `export const CONTACT_API_URL = ${JSON.stringify(url)};`);
fs.writeFileSync(CONFIG, text);
console.log(`inject-contact-api-url: CONTACT_API_URL set (${url})`);
