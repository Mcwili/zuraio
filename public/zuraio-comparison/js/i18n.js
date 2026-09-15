import * as en from './copy-en.js';
import * as de from './copy-de.js';
import * as fr from './copy-fr.js';
import * as it from './copy-it.js';
import { isSupportedLocale } from './locales.js';
import { PAIN_CARD_ICONS } from './pain-card-icons.js';
import { refreshRoutesDiagram } from './routes-diagram.js';
import { applyTechnicalTranslations } from './apply-technical-i18n.js';
import { applyLegalTranslations } from './apply-legal-i18n.js';
import { setHeadlineHtml, formatHeadline } from './headline-emphasis.js';
import { HERO_COMPARISON_ENABLED, SITE_BASE } from './config.js';
import {
  LOCALE_SEGMENTS,
  getLocaleFromPathname,
  isInLocaleSubdir as pathIsInLocaleSubdir,
  langHrefForLocale,
} from './path-locale.js';

const LOCALE_KEY = 'zuraio-locale';

const copies = { en, de, fr, it };

export function getLocaleFromPath() {
  return getLocaleFromPathname();
}

export function isInLocaleSubdir() {
  return pathIsInLocaleSubdir();
}

export function getCurrentPageFile() {
  const segments = location.pathname.split('/').filter(Boolean);
  const last = segments[segments.length - 1] || 'index.html';
  return last.endsWith('.html') ? last : 'index.html';
}

export function getLocale() {
  const fromUrl = new URLSearchParams(location.search).get('lang');
  if (isSupportedLocale(fromUrl)) return fromUrl;
  const fromPath = getLocaleFromPath();
  if (fromPath) return fromPath;
  const stored = localStorage.getItem(LOCALE_KEY);
  if (isSupportedLocale(stored)) return stored;
  return 'de';
}

/** On production, first visit to unprefixed URLs opens German (`/de/…`). Respects saved language. */
export function ensureDefaultLocaleRoute() {
  const host = location.hostname;
  if (host === 'localhost' || host === '127.0.0.1') return;

  const params = new URLSearchParams(location.search);
  if (params.get('lang')) return;

  if (getLocaleFromPath()) return;

  const stored = localStorage.getItem(LOCALE_KEY);
  const preferred = isSupportedLocale(stored) ? stored : 'de';
  if (preferred === 'en') return;

  const page = getCurrentPageFile();
  location.replace(`${langHrefForLocale(page, preferred, SITE_BASE)}${location.hash}`);
}

export function setLocale(locale) {
  if (!isSupportedLocale(locale)) return;
  localStorage.setItem(LOCALE_KEY, locale);
  const page = getCurrentPageFile();
  const hash = location.hash;
  const target = page === 'index.html' ? 'index.html' : page;
  location.href = `${langHrefForLocale(target, locale, SITE_BASE)}${hash}`;
}

export function getCopy() {
  return copies[getLocale()] ?? copies.en;
}

export function t(path) {
  const parts = path.split('.');
  let value = getCopy();
  for (const part of parts) {
    if (value == null) return undefined;
    value = value[part];
  }
  return value;
}

function setHeading(selector, text, emphasis) {
  if (text == null) return;
  document.querySelectorAll(selector).forEach((el) => {
    setHeadlineHtml(el, text, emphasis);
  });
}

function setText(selector, text) {
  if (text == null) return;
  document.querySelectorAll(selector).forEach((el) => {
    el.textContent = text;
  });
}

function setHtml(selector, html) {
  if (html == null) return;
  document.querySelectorAll(selector).forEach((el) => {
    el.innerHTML = html;
  });
}

export function langHref(path) {
  return langHrefForLocale(path, getLocale(), SITE_BASE);
}

function shouldLocalizeHref(href) {
  if (!href) return false;
  if (href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('http') || href.startsWith('../')) {
    return false;
  }
  if (href.startsWith('#') && !href.includes('.html')) return false;
  const file = href.split('#')[0];
  return file.endsWith('.html');
}

export function applyInternalLinkLocales(root = document) {
  root.querySelectorAll('a[href]').forEach((anchor) => {
    const href = anchor.getAttribute('href');
    if (!shouldLocalizeHref(href)) return;
    anchor.setAttribute('href', langHref(href));
  });
}

function setLinkHref(selector, path) {
  if (!path) return;
  document.querySelectorAll(selector).forEach((el) => {
    if (el.tagName === 'A') el.href = langHref(path);
  });
}

function applyList(selector, items, template) {
  const container = document.querySelector(selector);
  if (!container || !items) return;
  container.innerHTML = items.map(template).join('');
}

function renderHomeFaq(items, limit = 6) {
  if (!items?.length) return '';
  return items
    .slice(0, limit)
    .map(
      (item, i) => `
    <div class="faq-item reveal${i ? ` d${Math.min(i, 3)}` : ''}">
      <button class="faq-q" type="button" aria-expanded="false">${item.question}</button>
      <div class="faq-a" hidden>
        <p>${item.answer}</p>
      </div>
    </div>`,
    )
    .join('');
}

export function applyDataI18n() {
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const value = t(el.dataset.i18n);
    if (value == null) return;
    if (el.dataset.i18nHtml === 'true') {
      el.innerHTML = value;
    } else {
      el.textContent = value;
    }
  });
}

export function applyHomeTranslations() {
  const home = getCopy().home;
  if (!home) return;

  if (home.meta?.title) document.title = home.meta.title;
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc && home.meta?.description) metaDesc.setAttribute('content', home.meta.description);
  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle && home.meta?.ogTitle) ogTitle.setAttribute('content', home.meta.ogTitle);
  const ogDesc = document.querySelector('meta[property="og:description"]');
  if (ogDesc && home.meta?.ogDescription) ogDesc.setAttribute('content', home.meta.ogDescription);

  setText('[data-hero-eyebrow]', home.heroEyebrow);
  setText('#problem .marker', home.problem.marker);
  setHtml('#problem [data-problem-headline]', home.problem.headingHtml || home.problem.heading);
  setText('#problem [data-problem-body], #problem .lede', home.problem.body);
  applyList('#problem .pain-grid', home.problem.cards, (c, i) =>
    `<div class="pain-card reveal${i ? ` d${i}` : ''}"><span class="pain-card__icon">${PAIN_CARD_ICONS[i] || ''}</span><span class="n">${c.title}</span><p>${c.body}</p></div>`,
  );
  setHtml('#problem .section-link a', home.problem.link);
  setLinkHref('#problem .section-link a', 'how-it-helps.html');

  setText('#different .marker', home.different.marker);
  setText('#different h2', home.different.heading);
  setText('#different .lede', home.different.body);

  refreshRoutesDiagram();

  setText('[data-compare-bridge]', home.different.bridge);
  setHtml('[data-compare-bridge-link]', home.different.bridgeLink);
  setLinkHref('[data-compare-bridge-link]', 'technical-architecture.html');

  if (home.different.compareTrio) {
    setText('[data-compare-trio-heading]', home.different.compareTrio.heading);
    setText('[data-compare-name="chatgpt"]', home.different.compareTrio.chatgpt.name);
    setText('[data-compare-body="chatgpt"]', home.different.compareTrio.chatgpt.body);
    setText('[data-compare-name="copilot"]', home.different.compareTrio.copilot.name);
    setText('[data-compare-body="copilot"]', home.different.compareTrio.copilot.body);
    setText('[data-compare-name="zuraio"]', home.different.compareTrio.zuraio.name);
    setText('[data-compare-body="zuraio"]', home.different.compareTrio.zuraio.body);
  }
  setText('#integrations h2', home.integrations.heading);
  setText('#integrations .lede', home.integrations.body);
  setHtml('#integrations .section-link a', home.integrations.link);
  setLinkHref('#integrations .section-link a', 'integrations.html');

  setText('#assistant-demo h2', home.demo.heading);
  setText('#assistant-demo .lede', home.demo.body);
  const demoExamples = document.querySelector('[data-demo-examples]');
  if (demoExamples && home.demo.examples) {
    demoExamples.innerHTML = home.demo.examples
      .map(
        (example) =>
          `<li class="demo-example"><span class="demo-example__label">${example.label}</span><p class="demo-example__prompt">${example.prompt}</p></li>`,
      )
      .join('');
  }
  const demoSteps = document.querySelector('[data-demo-steps]');
  if (demoSteps && home.demo.steps) {
    demoSteps.innerHTML = home.demo.steps
      .map(
        (step, index) =>
          `<li class="demo-static__step"><span class="demo-static__step-num">${index + 1}</span><span class="demo-static__step-text">${step.title}</span></li>`,
      )
      .join('');
  }
  setText('[data-demo-caption]', home.demo.caption);

  setText('#data-control .marker', home.dataControl.marker);
  setText('#data-control .data-control__positioning', home.dataControl.positioning);
  setText('#data-control h2', home.dataControl.heading);
  setText('#data-control .lede', home.dataControl.body);
  const ccards = document.querySelectorAll('#data-control .ccard');
  home.dataControl.cards?.forEach((card, i) => {
    const el = ccards[i];
    if (!el) return;
    el.querySelector('h4').textContent = card.title;
    const body = el.querySelector('p');
    if (body) {
      if (card.bodyHtml) body.innerHTML = card.bodyHtml;
      else if (card.body) body.textContent = card.body;
    }
  });
  setHtml('#data-control .ctrl-note span:last-child', home.dataControl.note);
  setHtml('#data-control .section-link a', home.dataControl.link);
  setLinkHref('#data-control .section-link a', 'data-control.html');

  setText('#reviewable .marker', home.reviewable.marker);
  setText('#reviewable h2', home.reviewable.heading);
  const reviewableLedes = document.querySelectorAll('#reviewable .lede');
  home.reviewable.bodyParagraphs?.forEach((paragraph, i) => {
    if (reviewableLedes[i]) reviewableLedes[i].textContent = paragraph;
  });
  const processSteps = document.querySelectorAll('#reviewable .acol');
  home.reviewable.steps?.forEach((step, i) => {
    const el = processSteps[i];
    if (!el) return;
    const label = el.querySelector('.step');
    const title = el.querySelector('h4');
    const body = el.querySelector('p');
    if (label) label.textContent = step.label;
    if (title) title.textContent = step.title;
    if (body) body.textContent = step.body;
  });
  setHtml('#reviewable .section-link a', home.reviewable.link);
  setLinkHref('#reviewable .section-link a', 'ai-governance.html');

  setText('#origin .marker', home.origin.marker);
  setText('#origin h2', home.origin.heading);
  const originText = document.querySelector('#origin .origin-text');
  if (originText) {
    const paragraphs = originText.querySelectorAll('p:not(.origin-cta)');
    home.origin.paragraphs?.forEach((p, i) => {
      if (paragraphs[i]) paragraphs[i].textContent = p;
    });
  }
  setHtml('#origin .origin-cta a', home.origin.link);
  setLinkHref('#origin .origin-cta a', 'about.html');

  setText('#faq-home h2', home.faq?.heading);
  const faqHome = document.querySelector('[data-home-faq]');
  if (faqHome && home.faq?.items) {
    faqHome.innerHTML = renderHomeFaq(home.faq.items, 6);
  }
  setHtml('[data-faq-home-link]', home.faq?.link);
  setLinkHref('[data-faq-home-link]', 'faq.html');
  setHtml('[data-faq-it-link]', home.faq?.itLink);
  setLinkHref('[data-faq-it-link]', 'faq.html#it-questions');
  setText('#final h2', home.final.heading);
  setText('#final p:not(.small)', home.final.body);
  const finalCtas = document.querySelectorAll('#final .cta-row a');
  if (finalCtas[0]) {
    finalCtas[0].textContent = home.final.primaryCta;
    finalCtas[0].href = langHref('contact.html');
  }
  if (finalCtas[1]) finalCtas[1].textContent = home.final.secondaryCta;
  setText('#final .small', home.final.supporting);
}

export function applyPageTranslations() {
  const pageId = document.body.dataset.page;
  if (!pageId) return;
  const page = getCopy().pages?.[pageId];
  if (!page) return;
  if (page.title) document.title = page.title;
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc && page.description) metaDesc.setAttribute('content', page.description);
  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle && (page.ogTitle || page.title)) ogTitle.setAttribute('content', page.ogTitle || page.title);
  const ogDesc = document.querySelector('meta[property="og:description"]');
  if (ogDesc && (page.ogDescription || page.description)) {
    ogDesc.setAttribute('content', page.ogDescription || page.description);
  }
  if (page.hero) {
    setText('.page-hero .marker', page.hero.marker);
    setHeading('.page-hero h1', page.hero.heading, page.hero.headingEmphasis);
    setText('.page-hero .lede', page.hero.lede);
  }
  applyDataI18n();
}

export function applyAllTranslations() {
  const locale = getLocale();
  document.documentElement.lang = locale;
  applyHomeTranslations();
  applyPageTranslations();
  applyTechnicalTranslations(locale);
  applyLegalTranslations(locale);
  applyDataI18n();
  applyInternalLinkLocales();
}

export function initLocaleSwitcher(onChange) {
  window.addEventListener('zuraio:locale', () => {
    applyAllTranslations();
    onChange?.();
  });
}
