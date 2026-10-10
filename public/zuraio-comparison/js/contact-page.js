import { CONTACT_FOUNDERS, getContactCopy } from './copy-contact.js';
import { renderAltHomeHeader, renderAltHomeFooter } from './alt-homepage-chrome.js';
import { assetHref, currentLocale, getLocaleFromPathname } from './path-locale.js';
import { resolveRouteFromLocation } from './site-routes.js';
import { initContactForm } from './contact-form.js?v=20261010h';

const FOUNDER_PREVIEW = 'zuraio/assets/team-preview';

function pageLocale() {
  return getLocaleFromPathname() ?? (document.documentElement.lang || 'en');
}

function copyLocale() {
  return currentLocale();
}

function viewingLocale() {
  return currentLocale();
}

function routeHref(key) {
  return resolveRouteFromLocation(key, viewingLocale(), location.pathname);
}

function foundersHtml(people) {
  return people
    .map(
      (p) => `<article class="alt-home-founder alt-contact-founder">
        <div class="alt-home-founder__photo">
          <picture>
            <source type="image/webp" srcset="${assetHref(`${FOUNDER_PREVIEW}/${p.img}.webp`)}">
            <img src="${assetHref(`${FOUNDER_PREVIEW}/${p.img}.webp`)}" alt="" width="250" height="312" loading="lazy" decoding="async" />
          </picture>
        </div>
        <h3 class="alt-home-founder__name">${p.name}</h3>
        <p class="alt-home-founder__email"><a href="mailto:${p.email}">${p.email}</a></p>
      </article>`,
    )
    .join('');
}

function companySizeOptionsHtml(form) {
  return `<option value="">${form.companySizePlaceholder}</option>${form.companySizeOptions
    .map((o) => `<option value="${o.value}">${o.label}</option>`)
    .join('')}`;
}

function renderMain(copy) {
  const f = copy.form;
  return `
    <section class="alt-section alt-section--tint alt-contact-hero">
      <div class="wrap">
        <h1>${copy.hero.heading}</h1>
        <p class="lede alt-contact-hero__sub">${copy.hero.sub}</p>
      </div>
    </section>

    <section class="alt-section alt-section--paper alt-contact-main" id="contact-form-section">
      <div class="wrap alt-contact-grid">
        <div class="alt-contact-form-wrap">
          <form id="contact-form" class="alt-contact-form" novalidate data-contact-alt="true">
            <div class="form-row">
              <label for="name">${f.name} <span aria-hidden="true">*</span></label>
              <input type="text" id="name" name="name" required autocomplete="name" minlength="2" maxlength="120">
            </div>
            <div class="form-row">
              <label for="company">${f.company} <span aria-hidden="true">*</span></label>
              <input type="text" id="company" name="company" required autocomplete="organization" minlength="2" maxlength="200">
            </div>
            <div class="form-row">
              <label for="email">${f.email} <span aria-hidden="true">*</span></label>
              <input type="email" id="email" name="email" required autocomplete="email" maxlength="254">
            </div>
            <div class="form-row">
              <label for="company-size">${f.companySize}</label>
              <select id="company-size" name="company-size">
                ${companySizeOptionsHtml(f)}
              </select>
            </div>
            <div class="form-row">
              <label for="message">${f.message}</label>
              <textarea id="message" name="message" rows="5" maxlength="2000" placeholder="${f.messagePlaceholder}"></textarea>
            </div>
            <div class="form-row alt-contact-form__checkbox">
              <label class="alt-contact-checkbox">
                <input type="checkbox" id="starter-partner" name="starter-partner" value="yes">
                <span>${f.starterLabel}</span>
              </label>
            </div>
            <input type="hidden" name="interest" id="interest" value="">
            <div class="form-row visually-hidden" aria-hidden="true">
              <label for="website">Website</label>
              <input type="text" id="website" name="website" tabindex="-1" autocomplete="off">
            </div>
            <button type="submit" class="btn btn-primary btn-lg alt-home-cta">${f.submit}</button>
            <p class="alt-contact-form__trust">${f.trust}</p>
            <p id="form-notice" class="form-notice" tabindex="-1" hidden role="status" aria-live="polite"></p>
          </form>
        </div>
        <aside class="alt-contact-founders" aria-labelledby="contact-founders-h">
          <h2 id="contact-founders-h" class="alt-contact-founders__heading">${copy.founders.heading}</h2>
          <p class="alt-contact-founders__reply">${copy.founders.reply}</p>
          <div class="alt-contact-founders__grid">${foundersHtml(CONTACT_FOUNDERS)}</div>
        </aside>
      </div>
    </section>

    <section class="alt-section alt-section--tint alt-contact-starter">
      <div class="wrap alt-contact-starter__inner">
        <div>
          <h2>${copy.starter.heading}</h2>
          <p class="lede">${copy.starter.body}</p>
        </div>
        <a class="alt-home-link-secondary" data-route="contact" href="${routeHref('contact')}?interest=starter">${copy.starter.link}</a>
      </div>
    </section>`;
}

function applyStarterQueryParam() {
  const params = new URLSearchParams(window.location.search);
  if (params.get('interest') !== 'starter') return;
  const box = document.getElementById('starter-partner');
  if (box) box.checked = true;
  const hidden = document.getElementById('interest');
  if (hidden instanceof HTMLInputElement) hidden.value = 'starter-partner';
}

function boot() {
  document.body.setAttribute('data-alt-chrome', '');
  const locale = pageLocale();
  const copy = getContactCopy(copyLocale());
  document.title = copy.metaTitle;
  document.documentElement.lang = locale;

  renderAltHomeHeader(copy, copyLocale(), { mode: 'site' });
  renderAltHomeFooter({ footerTrademark: copy.footerTrademark }, copyLocale(), { mode: 'site' });

  const main = document.getElementById('contact-main');
  if (main) main.innerHTML = renderMain(copy);

  applyStarterQueryParam();
  initContactForm();
}

boot();
