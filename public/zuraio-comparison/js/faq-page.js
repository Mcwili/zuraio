import { getFaqCopy, getAllFaqItems } from './copy-faq.js';
import { renderAltHomeHeader, renderAltHomeFooter, syncLangSwitchHrefs } from './alt-homepage-chrome.js';
import { renderAltPageCta } from './alt-page-cta.js';
import { renderFaqAccordionItem } from './faq-render.js';
import { initFaq, initFaqFromHash } from './faq-accordion.js';
import { currentLocale, getLocaleFromPathname } from './path-locale.js';
import { resolveRouteFromLocation } from './site-routes.js';

const PAGE_CACHE = '20261010h';

function pageLocale() {
  return getLocaleFromPathname() ?? (document.documentElement.lang || 'en');
}

function copyLocale() {
  return currentLocale();
}

function routeHref(key) {
  return resolveRouteFromLocation(key, copyLocale(), location.pathname);
}

function injectFaqJsonLd(copy) {
  const items = getAllFaqItems(copyLocale());
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  };
  const el = document.createElement('script');
  el.type = 'application/ld+json';
  el.textContent = JSON.stringify(schema);
  document.head.appendChild(el);
}

function renderGroups(copy) {
  let index = 0;
  return copy.groups
    .map((group) => {
      const items = group.items.map((item) => renderFaqAccordionItem(item, index++, { idPrefix: 'faq-page' })).join('');
      return `
        <section class="alt-faq-group" aria-labelledby="alt-faq-group-${group.id}">
          <h2 id="alt-faq-group-${group.id}" class="alt-faq-group__heading">${group.heading}</h2>
          <div class="faq-list alt-faq-page-list">${items}</div>
          ${
            group.id === 'for-your-it-team'
              ? `<p class="alt-faq-it-link"><a class="alt-home-link-secondary" data-route="it-partner" href="${routeHref('it-partner')}">${copy.itTeamLink}</a></p>`
              : ''
          }
        </section>`;
    })
    .join('');
}

function renderMain(copy) {
  return `
    <section class="alt-section alt-section--tint alt-security-hero alt-faq-hero">
      <div class="wrap">
        <h1><span class="alt-security-hero__line">${copy.hero.heading}</span></h1>
        <p class="lede alt-security-hero__sub">${copy.hero.sub}</p>
      </div>
    </section>

    <section class="alt-section alt-section--paper alt-faq-main">
      <div class="wrap">
        ${renderGroups(copy)}
      </div>
    </section>

    ${renderAltPageCta(copy.cta, 'tint')}`;
}

function boot() {
  document.body.setAttribute('data-alt-chrome', '');
  const locale = pageLocale();
  const copy = getFaqCopy(copyLocale());
  document.title = copy.metaTitle;
  document.documentElement.lang = locale;

  renderAltHomeHeader(copy, copyLocale(), { mode: 'site' });
  renderAltHomeFooter({ footerTrademark: copy.footerTrademark }, copyLocale(), { mode: 'site' });

  const main = document.getElementById('faq-main');
  if (main) main.innerHTML = renderMain(copy);

  injectFaqJsonLd(copy);
  initFaq();
  initFaqFromHash();
  syncLangSwitchHrefs();
  window.addEventListener('hashchange', () => {
    initFaqFromHash();
    syncLangSwitchHrefs();
  });
}

boot();
