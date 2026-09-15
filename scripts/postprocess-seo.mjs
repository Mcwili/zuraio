/**
 * Inject canonical, hreflang, Open Graph, JSON-LD and fix locale paths.
 */
import * as en from '../public/zuraio-comparison/js/copy-en.js';
import * as de from '../public/zuraio-comparison/js/copy-de.js';
import * as fr from '../public/zuraio-comparison/js/copy-fr.js';
import * as it from '../public/zuraio-comparison/js/copy-it.js';
import {
  CANONICAL_BASE,
  LOCALES,
  OG_IMAGE_PATH,
  OG_LOCALE,
  SOFTWARE_APP_PAGES,
  SITE_BASE_PATH,
  canonicalUrl,
} from './seo-config.mjs';

const copies = { en, de, fr, it };

function escapeHtml(text) {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

const PAGE_ID_BY_FILE = {
  'about.html': 'about',
  'how-it-helps.html': 'howItHelps',
  'contact.html': 'contact',
  'resources.html': 'resources',
  'technical-architecture.html': 'technicalArchitecture',
  'knowledge.html': 'knowledge',
  'data-control.html': 'dataControl',
  'deployment-models.html': 'deploymentModels',
  'ai-governance.html': 'aiGovernance',
  'integrations.html': 'integrations',
  'faq.html': 'faq',
  'impressum.html': 'impressum',
  'privacy.html': 'privacy',
  'terms.html': 'terms',
  'cookies.html': 'cookies',
};

function resolvePageId(page) {
  return PAGE_ID_BY_FILE[page] ?? page.replace('.html', '');
}

function getMeta(locale, page) {
  const copy = copies[locale] ?? copies.en;
  if (page === 'index.html') {
    const m = copy.home?.meta ?? {};
    return {
      title: m.title ?? 'Zuraio',
      description: m.description ?? '',
      ogTitle: m.ogTitle ?? m.title ?? 'Zuraio',
      ogDescription: m.ogDescription ?? m.description ?? '',
    };
  }
  const pid = resolvePageId(page);
  const p = copy.pages?.[pid];
  if (p) {
    return {
      title: p.title ?? 'Zuraio',
      description: p.description ?? p.hero?.lede ?? '',
      ogTitle: p.ogTitle ?? p.title ?? 'Zuraio',
      ogDescription: p.ogDescription ?? p.description ?? p.hero?.lede ?? '',
    };
  }
  return { title: 'Zuraio', description: '', ogTitle: 'Zuraio', ogDescription: '' };
}

function buildHreflangLinks(page) {
  return LOCALES.map(
    (loc) =>
      `<link rel="alternate" hreflang="${loc}" href="${escapeHtml(canonicalUrl(loc, page))}">`,
  ).join('\n');
}

function buildJsonLd(locale, page) {
  const blocks = [];
  const copy = copies[locale] ?? copies.en;
  const url = canonicalUrl(locale, page);

  if (page === 'index.html') {
    blocks.push({
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Zuraio',
      url: CANONICAL_BASE + '/',
      email: 'michael.wili@zuraio.ch',
      description: copy.home?.meta?.description ?? copy.site?.tagline ?? '',
    });
    blocks.push({
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'Zuraio',
      url: CANONICAL_BASE + '/',
      inLanguage: locale,
      description: copy.home?.meta?.description ?? '',
    });
  }

  if (SOFTWARE_APP_PAGES.has(page)) {
    const meta = getMeta(locale, page);
    blocks.push({
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'Zuraio',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      url,
      description: meta.description || copy.site?.tagline || '',
      provider: {
        '@type': 'Organization',
        name: 'Zuraio',
        url: CANONICAL_BASE + '/',
      },
    });
  }

  if (!blocks.length) return '';
  return blocks
    .map((b) => `<script type="application/ld+json">${JSON.stringify(b)}</script>`)
    .join('\n');
}

function rewriteAssetPaths(html, locale) {
  if (locale === 'en') return html;
  return html
    .replace(/\bhref="assets\//g, 'href="../assets/')
    .replace(/\bsrc="assets\//g, 'src="../assets/')
    .replace(/\bhref="css\//g, 'href="../css/')
    .replace(/\bsrc="js\//g, 'src="../js/')
    .replace(/\bhref="zuraio\//g, 'href="../zuraio/')
    .replace(/\bsrc="zuraio\//g, 'src="../zuraio/')
    .replace(/srcset="\.\.\/zuraio\//g, 'srcset="../zuraio/')
    .replace(/srcset="zuraio\//g, 'srcset="../zuraio/')
    .replace(/data-src="zuraio\//g, 'data-src="../zuraio/')
    .replace(/poster="zuraio\//g, 'poster="../zuraio/');
}

/** Convert relative asset URLs to deployment-root absolute paths (GitHub Pages preview). */
function rewriteAbsoluteAssetPaths(html) {
  if (!SITE_BASE_PATH) return html;
  const base = SITE_BASE_PATH.replace(/\/$/, '');
  const prefix = `${base}/`;

  let out = html;
  out = out.replace(/\b(href|src)="(?:\.\.\/)+/g, `$1="${prefix}`);
  out = out.replace(/\b(href|src=")(assets\/)/g, `$1${prefix}$2`);
  out = out.replace(/\b(href|src=")(zuraio\/)/g, `$1${prefix}$2`);
  out = out.replace(/\b(href|src=")(css\/)/g, `$1${prefix}$2`);
  out = out.replace(/\bsrc="js\//g, `src="${prefix}js/`);
  out = out.replace(/srcset="(?:\.\.\/)+/g, `srcset="${prefix}`);
  out = out.replace(/srcset="(zuraio\/)/g, `srcset="${prefix}$1`);
  out = out.replace(/data-src="(?:\.\.\/)+/g, `data-src="${prefix}`);
  out = out.replace(/data-src="(zuraio\/)/g, `data-src="${prefix}$1`);
  out = out.replace(/poster="(?:\.\.\/)+/g, `poster="${prefix}`);
  out = out.replace(/poster="(zuraio\/)/g, `poster="${prefix}$1`);
  // Prerender captures root-absolute /assets/... from runtime JS; prefix for GitHub preview.
  out = out.replace(
    /(\b(?:href|src|data-src|poster)=")\/assets\//g,
    `$1${base}/assets/`,
  );
  return out;
}

function stripLocalePrefixFromPath(pathSegment) {
  for (const loc of LOCALES) {
    if (pathSegment === loc || pathSegment === `${loc}/`) return '';
    if (pathSegment.startsWith(`${loc}/`)) return pathSegment.slice(loc.length + 1);
  }
  return pathSegment;
}

function rewriteAbsolutePageLinks(html, locale) {
  if (!SITE_BASE_PATH) return html;
  const base = SITE_BASE_PATH.replace(/\/$/, '');
  const home = locale === 'en' ? `${base}/` : `${base}/${locale}/`;

  let out = html.replace(/\bhref="\/"/g, `href="${home}"`);

  for (const loc of LOCALES) {
    out = out.replace(new RegExp(`\\bhref="/${loc}/"`, 'g'), `href="${base}/${loc}/"`);
  }

  out = out.replace(/\bhref="\/([^"]*\.html[^"]*)"/g, (_, rest) => {
    const file = stripLocalePrefixFromPath(rest);
    if (locale === 'en') return `href="${base}/${file}"`;
    return `href="${base}/${locale}/${file}"`;
  });
  return out;
}

function isRootAssetPath(pathAfterAssets) {
  return /^(?:favicon|apple-touch|zuraio-logo|integrations\/)/.test(pathAfterAssets);
}

/** On GitHub preview, media lives under /zuraio/zuraio/assets/ not /zuraio/assets/. */
function fixPreviewMediaAssetPaths(html) {
  if (!SITE_BASE_PATH) return html;
  const base = SITE_BASE_PATH.replace(/\/$/, '');

  let out = html.replace(
    /(\b(?:href|src|data-src|poster)=")\/zuraio\/assets\/([^"]+)"/g,
    (match, prefix, rest) => {
      if (isRootAssetPath(rest)) return `${prefix}${base}/assets/${rest}"`;
      return `${prefix}${base}/zuraio/assets/${rest}"`;
    },
  );

  out = out.replace(/srcset="([^"]+)"/g, (_, value) => {
    const parts = value.split(',').map((part) => {
      const trimmed = part.trim();
      const m = trimmed.match(/^(\S+)(\s+.+)?$/);
      if (!m) return trimmed;
      let url = m[1];
      const descriptor = m[2] ?? '';
      if (url.startsWith('http')) return trimmed;
      url = url.replace(/^(\.\.\/)+/, '');
      if (url.startsWith('/')) {
        if (url.startsWith(`${base}/`)) return `${url}${descriptor}`;
        if (url.startsWith('/zuraio/assets/')) {
          const rest = url.slice('/zuraio/assets/'.length);
          url = isRootAssetPath(rest) ? `${base}/assets/${rest}` : `${base}/zuraio/assets/${rest}`;
        } else if (url.startsWith('/assets/')) {
          url = `${base}${url}`;
        } else if (url.startsWith('/zuraio/')) {
          url = `${base}${url}`;
        }
      } else if (url.startsWith('zuraio/')) {
        url = `${base}/${url}`;
      } else if (url.startsWith('assets/')) {
        url = `${base}/${url}`;
      }
      return `${url}${descriptor}`;
    });
    return `srcset="${parts.join(', ')}"`;
  });

  return out;
}

function normalizeLocaleLinks(html, locale) {
  if (locale === 'en') return html;
  let out = html;
  for (const loc of LOCALES) {
    if (loc === 'en') continue;
    out = out.replace(new RegExp(`href="${loc}/${loc}/`, 'g'), 'href="');
    out = out.replace(new RegExp(`href="${loc}/`, 'g'), 'href="');
  }
  return out;
}

function rewriteLangLinks(html, locale) {
  let out = html;
  for (const loc of LOCALES) {
    if (loc === 'en') {
      out = out.replace(
        new RegExp(`([?"'])([^"']*)\\.html\\?lang=en([^"']*)`, 'g'),
        (_, q, file, rest) => `${q}${file}.html${rest}`,
      );
    } else {
      out = out.replace(
        new RegExp(`([?"'])(${loc}/)([^"']*)\\.html\\?lang=${loc}`, 'g'),
        (_, q, prefix, file) => `${q}${prefix}${file}.html`,
      );
      out = out.replace(
        new RegExp(`([?"'])([^"']*)\\.html\\?lang=${loc}([^"']*)`, 'g'),
        (_, q, file, rest) => {
          const clean = file.replace(new RegExp(`^(${LOCALES.join('|')})/`), '');
          return locale === 'en'
            ? `${q}${loc}/${clean}.html${rest}`
            : `${q}${clean}.html${rest}`;
        },
      );
    }
  }
  return normalizeLocaleLinks(out, locale);
}

export function postprocessHtml(html, locale, page) {
  const meta = getMeta(locale, page);
  const canonical = canonicalUrl(locale, page);
  const ogImage = `${CANONICAL_BASE}${OG_IMAGE_PATH}`;
  const ogLocale = OG_LOCALE[locale] ?? 'en_CH';
  const altLocales = LOCALES.filter((l) => l !== locale)
    .map((l) => OG_LOCALE[l])
    .filter(Boolean);

  let out = rewriteAssetPaths(html, locale);
  out = rewriteLangLinks(out, locale);
  out = normalizeHomeLinks(out, locale);
  out = rewriteAbsoluteAssetPaths(out);
  out = rewriteAbsolutePageLinks(out, locale);
  out = fixPreviewMediaAssetPaths(out);
  out = stripClientRuntimeState(out);

  out = out.replace(/<html lang="[^"]*">/, `<html lang="${locale}">`);

  out = out.replace(/<title>[^<]*<\/title>/, `<title>${escapeHtml(meta.title)}</title>`);

  const descTag = `<meta name="description" content="${escapeHtml(meta.description)}">`;
  if (out.includes('name="description"')) {
    out = out.replace(/<meta name="description" content="[^"]*">/, descTag);
  } else {
    out = out.replace('</head>', `  ${descTag}\n</head>`);
  }

  const headInject = `
  <link rel="canonical" href="${escapeHtml(canonical)}">
  ${buildHreflangLinks(page)}
  <link rel="alternate" hreflang="x-default" href="${escapeHtml(canonicalUrl('en', page))}">
  <meta property="og:title" content="${escapeHtml(meta.ogTitle)}">
  <meta property="og:description" content="${escapeHtml(meta.ogDescription)}">
  <meta property="og:type" content="website">
  <meta property="og:url" content="${escapeHtml(canonical)}">
  <meta property="og:image" content="${escapeHtml(ogImage)}">
  <meta property="og:locale" content="${ogLocale}">
${altLocales.map((l) => `  <meta property="og:locale:alternate" content="${l}">`).join('\n')}
  ${buildJsonLd(locale, page)}
`;

  out = out.replace(/<link rel="canonical"[^>]*>\s*/g, '');
  out = out.replace(/<link rel="alternate" hreflang="[^"]*"[^>]*>\s*/g, '');
  out = out.replace(/<meta property="og:[^"]+"[^>]*>\s*/g, '');
  out = out.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>\s*/g, '');

  out = out.replace('</head>', `${headInject}</head>`);

  return out;
}

function normalizeHomeLinks(html, locale) {
  const base = SITE_BASE_PATH.replace(/\/$/, '');
  const home =
    locale === 'en'
      ? base
        ? `${base}/`
        : '/'
      : base
        ? `${base}/${locale}/`
        : `/${locale}/`;
  return html.replace(/href="index\.html(#[^"]*)?"/g, (_, hash = '') => `href="${home}${hash}"`);
}

function stripClientRuntimeState(html) {
  return html
    .replace(/\sdata-routes-observer-bound="[^"]*"/g, '')
    .replace(/\sdata-routes-animated="[^"]*"/g, '')
    .replace(/\sdata-contact-form-ready="[^"]*"/g, '')
    .replace(/\sdata-form-ts="[^"]*"/g, '')
    .replace(/(<path[^>]*data-route-path="[^"]+"[^>]*)\sstyle="stroke-dasharray:[^"]*"/g, '$1');
}

export function injectLangRedirect(html) {
  const snippet = `<script>
(function(){var p=new URLSearchParams(location.search),l=p.get('lang');
if(!l||!['en','de','fr','it'].includes(l))return;
try{localStorage.setItem('zuraio-locale',l);}catch(e){}
var seg=location.pathname.split('/').filter(Boolean),base=seg[0]==='zuraio'?'/zuraio':'';
var localeIdx=base?1:0,curLoc=seg[localeIdx];
var inLoc=['de','fr','it'].includes(curLoc);
var f=location.pathname.split('/').pop()||'';
var isHome=!f||f==='index.html'||(inLoc&&seg.length===localeIdx+1);
p.delete('lang');var q=p.toString(),suffix=(q?'?'+q:'')+location.hash;
if(l==='en'){location.replace((isHome?(base?base+'/':'/'):(base?base+'/':'/')+f)+suffix);return;}
location.replace((base||'')+'/'+l+'/'+(isHome?'':f)+suffix);
})();
</script>`;
  return html.replace('</head>', `${snippet}\n</head>`);
}
