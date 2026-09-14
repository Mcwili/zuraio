export interface Env {
  PA_WEBHOOK_URL: string;
  PA_API_KEY: string;
  ENVIRONMENT?: string;
}

const HTML_PAGES = [
  'index.html',
  'about.html',
  'how-it-helps.html',
  'contact.html',
  'resources.html',
  'technical-architecture.html',
  'knowledge.html',
  'data-control.html',
  'deployment-models.html',
  'ai-governance.html',
  'integrations.html',
  'faq.html',
  'impressum.html',
  'privacy.html',
  'terms.html',
  'cookies.html',
];

const LOCALE_DIRS = ['', 'de', 'fr', 'it'];
const SITE_PREFIXES = ['', '/zuraio'];

function buildAllowedSources(): Set<string> {
  const set = new Set<string>(['/', '/index.html']);
  for (const prefix of SITE_PREFIXES) {
    for (const dir of LOCALE_DIRS) {
      for (const page of HTML_PAGES) {
        if (page === 'index.html') {
          set.add(dir ? `${prefix}/${dir}/` : `${prefix}/` || '/');
          if (prefix === '' && dir === '') set.add('/');
        } else {
          const path = dir ? `${prefix}/${dir}/${page}` : `${prefix}/${page}`;
          set.add(path.replace('//', '/'));
        }
      }
    }
  }
  return set;
}

const ALLOWED_SOURCES = buildAllowedSources();

const MAX = {
  name: 200,
  company: 200,
  role: 200,
  email: 320,
  phone: 50,
  companySize: 200,
  interest: 120,
  interestLabel: 200,
  message: 5000,
  locale: 10,
  source: 256,
};

const BODY_LIMIT = 20 * 1024;
const MIN_SUBMIT_MS = 3000;

function json(data: unknown, status = 200, corsOrigin?: string | null): Response {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (corsOrigin) {
    headers['Access-Control-Allow-Origin'] = corsOrigin;
    headers['Vary'] = 'Origin';
  }
  return new Response(JSON.stringify(data), { status, headers });
}

function isAllowedOrigin(origin: string | null, env: Env): boolean {
  if (!origin) return false;
  if (origin === 'https://zuraio.ch' || origin === 'https://www.zuraio.ch') return true;
  if (env.ENVIRONMENT === 'dev') {
    if (/^http:\/\/localhost(:\d+)?$/.test(origin)) return true;
    if (/^http:\/\/127\.0\.0\.1(:\d+)?$/.test(origin)) return true;
  }
  return false;
}

function corsHeaders(origin: string): Record<string, string> {
  return {
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
    Vary: 'Origin',
  };
}

function stripControlChars(value: string): string {
  return value.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '').trim();
}

function asString(value: unknown, maxLen: number): string {
  if (value == null) return '';
  const s = stripControlChars(String(value));
  return s.length > maxLen ? s.slice(0, maxLen) : s;
}

function isValidEmail(email: string): boolean {
  if (!email || email.length > MAX.email) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function normalizeSource(source: string): string {
  let path = source.split('?')[0].split('#')[0];
  if (!path.startsWith('/')) path = `/${path}`;
  path = path.replace(/\/{2,}/g, '/');
  if (path.length > 1 && path.endsWith('/')) path = path.slice(0, -1);
  if (path === '/index.html') return '/';
  return path;
}

function isAllowedSource(source: string): boolean {
  const norm = normalizeSource(source);
  if (ALLOWED_SOURCES.has(norm)) return true;
  if (norm.endsWith('/contact.html')) return true;
  return false;
}

type ContactPayload = {
  name: string;
  company: string;
  role: string;
  email: string;
  phone: string;
  companySize: string;
  interest: string;
  interestLabel: string;
  message: string;
  locale: string;
  source: string;
  website?: string;
  ts?: string | number;
};

function parseBody(raw: string): { ok: true; data: ContactPayload } | { ok: false; error: string } {
  if (raw.length > BODY_LIMIT) {
    return { ok: false, error: 'Request too large' };
  }
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return { ok: false, error: 'Invalid JSON' };
  }
  if (!parsed || typeof parsed !== 'object') {
    return { ok: false, error: 'Invalid body' };
  }
  const o = parsed as Record<string, unknown>;
  return {
    ok: true,
    data: {
      name: asString(o.name, MAX.name),
      company: asString(o.company, MAX.company),
      role: asString(o.role, MAX.role),
      email: asString(o.email, MAX.email),
      phone: asString(o.phone, MAX.phone),
      companySize: asString(o.companySize, MAX.companySize),
      interest: asString(o.interest, MAX.interest),
      interestLabel: asString(o.interestLabel, MAX.interestLabel),
      message: asString(o.message, MAX.message),
      locale: asString(o.locale, MAX.locale),
      source: asString(o.source, MAX.source),
      website: asString(o.website, 200),
      ts: o.ts as string | number | undefined,
    },
  };
}

function validateForForward(data: ContactPayload): string | null {
  if (!data.name) return 'Name is required';
  if (!isValidEmail(data.email)) return 'Valid email is required';
  if (!data.message && !data.interest) return 'Message or interest is required';
  if (!isAllowedSource(data.source || '/contact.html')) return 'Invalid source';
  const locale = data.locale || 'en';
  if (!['en', 'de', 'fr', 'it'].includes(locale)) return 'Invalid locale';
  const ts = Number(data.ts);
  if (!Number.isFinite(ts) || ts <= 0) return 'Invalid submission timing';
  if (Date.now() - ts < MIN_SUBMIT_MS) return 'Submitted too quickly';
  return null;
}

async function forwardToPowerAutomate(data: ContactPayload, env: Env): Promise<Response> {
  if (!env.PA_WEBHOOK_URL || !env.PA_API_KEY) {
    console.error('Missing PA_WEBHOOK_URL or PA_API_KEY');
    return json({ ok: false }, 502);
  }

  const locale = data.locale || 'en';
  const source = normalizeSource(data.source || '/contact.html');

  const paBody = {
    name: data.name,
    company: data.company,
    role: data.role,
    email: data.email,
    phone: data.phone,
    companySize: data.companySize,
    interest: data.interest,
    interestLabel: data.interestLabel,
    message: data.message,
    locale,
    source,
    apiKey: env.PA_API_KEY,
  };

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10_000);

  try {
    const res = await fetch(env.PA_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(paBody),
      signal: controller.signal,
    });
    clearTimeout(timeout);
    if (res.status === 202) {
      return json({ ok: true }, 200);
    }
    console.error('Power Automate status', res.status);
    return json({ ok: false }, 502);
  } catch (err) {
    clearTimeout(timeout);
    console.error('Power Automate fetch failed', err instanceof Error ? err.name : 'error');
    return json({ ok: false }, 502);
  }
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    if (url.pathname !== '/api/contact') {
      return new Response('Not Found', { status: 404 });
    }

    const origin = request.headers.get('Origin');
    const allowed = isAllowedOrigin(origin, env);

    if (request.method === 'OPTIONS') {
      if (!allowed || !origin) {
        return new Response(null, { status: 403 });
      }
      return new Response(null, { status: 204, headers: corsHeaders(origin) });
    }

    if (request.method !== 'POST') {
      return new Response('Method Not Allowed', { status: 405 });
    }

    if (!allowed || !origin) {
      return new Response('Forbidden', { status: 403 });
    }

    const raw = await request.text();
    const parsed = parseBody(raw);
    if (!parsed.ok) {
      return json({ ok: false, error: parsed.error }, 400, origin);
    }

    const data = parsed.data;

    if (data.website) {
      return json({ ok: true }, 200, origin);
    }

    const validationError = validateForForward(data);
    if (validationError) {
      return json({ ok: false, error: validationError }, 400, origin);
    }

    const result = await forwardToPowerAutomate(data, env);
    const headers = corsHeaders(origin);
    const body = await result.text();
    return new Response(body, { status: result.status, headers: { ...headers, 'Content-Type': 'application/json' } });
  },
};
