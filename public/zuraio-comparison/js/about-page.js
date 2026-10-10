import { getAboutCopy } from './copy-about.js';
import { renderAltHomeHeader, renderAltHomeFooter } from './alt-homepage-chrome.js';
import { renderAltHomeFounders } from './alt-home-founders.js';
import { renderAltPageCta } from './alt-page-cta.js';
import { currentLocale, getLocaleFromPathname } from './path-locale.js';
import { resolveRouteFromLocation } from './site-routes.js';
import { ALT_HOME_REASON_ICONS } from './alt-home-reason-icons.js';

const PAGE_CACHE = '20261010j';

function pageLocale() {
  return getLocaleFromPathname() ?? (document.documentElement.lang || 'en');
}

function copyLocale() {
  return currentLocale();
}

function routeHref(key) {
  return resolveRouteFromLocation(key, copyLocale(), location.pathname);
}

function beliefsHtml(items) {
  return items
    .map((item, i) => {
      const icon = ALT_HOME_REASON_ICONS[i % ALT_HOME_REASON_ICONS.length] ?? '';
      return `<article class="alt-home-reasons-strip__item alt-about-belief" role="listitem">
        <span class="alt-home-reasons-strip__icon" aria-hidden="true">${icon}</span>
        <div class="alt-home-reasons-strip__text">
          <p class="alt-home-reasons-strip__title">${item.lead}</p>
          <p class="alt-home-reasons-strip__body">${item.body}</p>
        </div>
      </article>`;
    })
    .join('');
}

function renderMain(copy) {
  const founders = renderAltHomeFounders(copy.team.people);
  const starterHref = `${routeHref('contact')}?interest=starter`;
  return `
    <section class="alt-section alt-section--tint alt-security-hero">
      <div class="wrap">
        <span class="marker hero-eyebrow">${copy.hero.eyebrow}</span>
        <h1><span class="alt-security-hero__line">${copy.hero.heading}</span></h1>
        <p class="lede alt-security-hero__sub">${copy.hero.sub}</p>
      </div>
    </section>

    <section class="alt-section alt-section--paper alt-about-team" id="team">
      <div class="wrap">
        <div class="alt-section-head">
          <h2>${copy.team.heading}</h2>
        </div>
        <div class="origin-portraits__grid alt-home-founders alt-about-founders">${founders}</div>
        <p class="alt-home-contact">${copy.team.contactLine}</p>
      </div>
    </section>

    <section class="alt-section alt-section--tint alt-about-beliefs">
      <div class="wrap">
        <div class="alt-section-head">
          <h2>${copy.beliefs.heading}</h2>
        </div>
        <div class="alt-about-beliefs-grid alt-home-reasons-strip" role="list">${beliefsHtml(copy.beliefs.items)}</div>
      </div>
    </section>

    <section class="alt-section alt-section--paper alt-about-starter">
      <div class="wrap alt-about-starter__inner">
        <div>
          <h2>${copy.starter.heading}</h2>
          <p class="lede">${copy.starter.body}</p>
        </div>
        <a class="alt-home-link-secondary" data-route="contact" href="${starterHref}">${copy.starter.link}</a>
      </div>
    </section>

    ${renderAltPageCta(copy.cta, 'tint')}`;
}

function boot() {
  document.body.setAttribute('data-alt-chrome', '');
  const locale = pageLocale();
  const copy = getAboutCopy(copyLocale());
  document.title = copy.metaTitle;
  document.documentElement.lang = locale;

  renderAltHomeHeader(copy, copyLocale(), { mode: 'site' });
  renderAltHomeFooter({ footerTrademark: copy.footerTrademark }, copyLocale(), { mode: 'site' });

  const main = document.getElementById('about-main');
  if (main) main.innerHTML = renderMain(copy);
}

boot();
