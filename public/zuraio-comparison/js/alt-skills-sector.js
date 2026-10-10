import { getSkillsTabsMeta, SKILLS_TAB_IDS } from './copy-alt-home-skills-tabs.js';
import { assetHref, currentLocale } from './path-locale.js';
import { SKILLS_IMAGE_MANIFEST as manifest } from './skills-image-manifest.js';

const PEOPLE_ICON = `<svg class="alt-skills-panel__workshop-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`;

const LIGHTBOX_CLOSE = {
  en: 'Close enlarged image',
  de: 'Vergrösserte Ansicht schliessen',
  fr: 'Fermer l’image agrandie',
  it: 'Chiudi immagine ingrandita',
};

function legendRowId(tabId, n) {
  return `skills-legend-${tabId}-${n}`;
}

function imageSizes(sector, locale) {
  const loc = manifest.sectors?.[sector]?.[locale] ?? manifest.sectors?.[sector]?.en;
  if (!loc?.desktop) return null;
  return {
    desktop: loc.desktop,
    mobile: loc.mobile ?? loc.desktop,
  };
}

function imageBaseName(sector, locale) {
  return `zuraio/assets/skills/zuraio-skill-${sector}-${locale}`;
}

function renderUses(usesLabel, sources) {
  const chips = sources.map((s) => `<span class="alt-sq-source-chips__chip">${s}</span>`).join('');
  return `<div class="alt-skills-panel__uses">
    <span class="alt-skills-panel__uses-label">${usesLabel}</span>
    <div class="alt-skills-panel__uses-chips">${chips}</div>
  </div>`;
}

function renderLegend(tabId, panel, legendHeading) {
  const rows = panel.highlights
    .map(
      (h) => `<li class="alt-skills-panel__legend-item">
      <button type="button" class="alt-skills-panel__legend-row" id="${legendRowId(tabId, h.n)}" data-hl-target="${h.n}">
        <span class="alt-skills-panel__legend-marker" aria-hidden="true">${h.n}</span>
        <span class="alt-skills-panel__legend-text">${h.label}</span>
      </button>
    </li>`,
    )
    .join('');
  return `<div class="alt-skills-panel__legend">
    <p class="alt-skills-panel__legend-kicker">${legendHeading}</p>
    <ul class="alt-skills-panel__legend-list">${rows}</ul>
  </div>`;
}

function renderPanelCompact(tabId, panel, meta, workshopLine) {
  return `
    <div class="alt-skills-panel__compact">
      <div class="alt-skills-panel__intro">
        <h3 class="alt-skills-panel__title">${panel.title}</h3>
        <p class="alt-skills-panel__body">${panel.body}</p>
      </div>
      <div class="alt-skills-panel__aside">
        ${renderUses(panel.usesLabel, panel.sources)}
        ${renderLegend(tabId, panel, meta.legendHeading)}
        <p class="alt-skills-panel__workshop">${PEOPLE_ICON}<span>${workshopLine}</span></p>
      </div>
    </div>`;
}

function renderPanelImage(tabId, locale, panel, meta, caption, { eager = false } = {}) {
  const sizes = imageSizes(tabId, locale);
  if (!sizes) {
    return `<div class="alt-skills-panel__doc"><p class="alt-skills-doc__caption">${caption}</p></div>`;
  }

  const base = imageBaseName(tabId, locale);
  const desktopSrc = assetHref(`${base}.webp`);
  const mobileSrc = assetHref(`${base}-mobile.webp`);
  const { width: dw, height: dh } = sizes.desktop;
  const { width: mw, height: mh } = sizes.mobile;
  const alt = panel.imageAlt ?? '';
  const loading = eager ? 'eager' : 'lazy';
  const fetchPriority = eager ? ' fetchpriority="high"' : '';

  return `
    <div class="alt-skills-panel__doc">
      <figure class="alt-skills-panel__figure">
        <button type="button" class="alt-skills-panel__image-btn" data-skills-lightbox-trigger aria-haspopup="dialog" aria-label="${meta.imageTapHint}">
          <picture>
            <source media="(max-width: 599px)" srcset="${mobileSrc}" width="${mw}" height="${mh}" />
            <img
              class="alt-skills-panel__image"
              src="${desktopSrc}"
              width="${dw}"
              height="${dh}"
              alt="${alt.replace(/"/g, '&quot;')}"
              loading="${loading}"
              decoding="async"${fetchPriority}
              style="--skills-natural-w: ${dw}px"
              data-skills-natural-w="${dw}"
              data-skills-fullsrc="${mobileSrc}"
              data-skills-fullsrc-desktop="${desktopSrc}"
            />
          </picture>
        </button>
        <p class="alt-skills-panel__tap-hint">${meta.imageTapHint}</p>
        <figcaption class="alt-skills-doc__caption">${caption}</figcaption>
      </figure>
    </div>`;
}

export function renderSkillsSectorTabs(copy, locale, routeHref) {
  const meta = getSkillsTabsMeta(locale);
  const sk = copy.skills;
  const tabsHtml = meta.tabs
    .map((tab, i) => {
      const selected = i === 0;
      return `<button type="button" role="tab" id="skills-tab-${tab.id}" class="alt-skills-tabs__tab${selected ? ' is-active' : ''}" aria-selected="${selected}" aria-controls="skills-panel-${tab.id}" tabindex="${selected ? '0' : '-1'}" data-skills-tab="${tab.id}">${tab.label}</button>`;
    })
    .join('');

  const panelsHtml = SKILLS_TAB_IDS.map((tabId, i) => {
    const panel = meta.panels[tabId];
    const hidden = i !== 0;
    return `
      <div role="tabpanel" id="skills-panel-${tabId}" class="alt-skills-panel${hidden ? ' is-hidden' : ''}" aria-labelledby="skills-tab-${tabId}" data-skills-panel="${tabId}" aria-hidden="${hidden ? 'true' : 'false'}">
        <div class="alt-skills-panel__grid">
          ${renderPanelCompact(tabId, panel, meta, meta.workshopLine)}
          ${renderPanelImage(tabId, locale, panel, meta, meta.docCaption, { eager: i === 0 })}
        </div>
      </div>`;
  }).join('');

  return `
    <div class="alt-skills-sector" data-alt-skills-sector>
      <div role="tablist" aria-label="${meta.tablistLabel}" class="alt-skills-tabs">${tabsHtml}</div>
      <div class="alt-skills-panels" data-skills-panels>${panelsHtml}</div>
      <p class="alt-skills-sector__foot">
        <span class="alt-skills-sector__foot-line">${sk.footer ?? ''}</span>
        <a class="alt-home-link-secondary alt-skills-sector__link" data-route="skills" href="${routeHref('skills')}">${sk.link}</a>
      </p>
    </div>`;
}

function tabIdFromHash(hash) {
  const id = (hash || '').replace(/^#/, '');
  if (id === 'skills-architecture') return 'architecture';
  if (id === 'skills-fiduciary') return 'fiduciary';
  if (id === 'skills-property') return 'property';
  return null;
}

function setHighlightActive(panel, n, active) {
  if (!panel || n == null) return;
  panel.querySelectorAll(`[data-hl-target="${n}"]`).forEach((el) => {
    el.classList.toggle('is-hl-linked', active);
  });
}

function bindHighlightLinking(root) {
  root.querySelectorAll('[role="tabpanel"]').forEach((panel) => {
    panel.querySelectorAll('[data-hl-target]').forEach((btn) => {
      const n = btn.dataset.hlTarget;
      btn.addEventListener('mouseenter', () => setHighlightActive(panel, n, true));
      btn.addEventListener('mouseleave', () => setHighlightActive(panel, n, false));
      btn.addEventListener('focus', () => setHighlightActive(panel, n, true));
      btn.addEventListener('blur', () => setHighlightActive(panel, n, false));
    });
  });
}

function skillsLocaleFromPage() {
  return currentLocale();
}

function replaceSkillsTabHash(tabId) {
  const tab = getSkillsTabsMeta(skillsLocaleFromPage()).tabs.find((t) => t.id === tabId);
  if (!tab?.hash) return;
  const nextHash = `#${tab.hash}`;
  if (window.location.hash === nextHash) return;
  const url = `${window.location.pathname}${window.location.search}${nextHash}`;
  history.replaceState(null, '', url);
}

function selectTab(root, tabId, { focusTab = false, updateHash = false } = {}) {
  const tabs = [...root.querySelectorAll('[role="tab"]')];
  const panels = [...root.querySelectorAll('[role="tabpanel"]')];
  tabs.forEach((tab) => {
    const active = tab.dataset.skillsTab === tabId;
    tab.classList.toggle('is-active', active);
    tab.setAttribute('aria-selected', active ? 'true' : 'false');
    tab.tabIndex = active ? 0 : -1;
    if (active) {
      tab.scrollIntoView({ inline: 'nearest', block: 'nearest', behavior: 'smooth' });
      if (focusTab) tab.focus({ preventScroll: true });
    }
  });
  panels.forEach((panel) => {
    const active = panel.dataset.skillsPanel === tabId;
    panel.classList.toggle('is-hidden', !active);
    panel.setAttribute('aria-hidden', active ? 'false' : 'true');
  });
  if (updateHash) replaceSkillsTabHash(tabId);
}

function bindTabsKeyboard(root) {
  const tablist = root.querySelector('[role="tablist"]');
  if (!tablist) return;
  tablist.addEventListener('keydown', (e) => {
    const tabs = [...tablist.querySelectorAll('[role="tab"]')];
    const idx = tabs.findIndex((t) => t === document.activeElement);
    if (idx === -1) return;
    let next = idx;
    if (e.key === 'ArrowRight') next = (idx + 1) % tabs.length;
    else if (e.key === 'ArrowLeft') next = (idx - 1 + tabs.length) % tabs.length;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = tabs.length - 1;
    else return;
    e.preventDefault();
    const tab = tabs[next];
    selectTab(root, tab.dataset.skillsTab, { focusTab: true, updateHash: true });
  });
}

function mobileSkillsLightbox() {
  return window.matchMedia('(max-width: 599px)').matches;
}

function ensureLightbox(locale) {
  let el = document.getElementById('alt-skills-lightbox');
  if (el) return el;
  const closeLabel = LIGHTBOX_CLOSE[locale] ?? LIGHTBOX_CLOSE.en;
  el = document.createElement('div');
  el.id = 'alt-skills-lightbox';
  el.className = 'alt-skills-lightbox';
  el.hidden = true;
  el.innerHTML = `
    <div class="alt-skills-lightbox__backdrop" data-skills-lightbox-close tabindex="-1"></div>
    <div class="alt-skills-lightbox__panel" role="dialog" aria-modal="true" aria-label="${closeLabel}">
      <button type="button" class="alt-skills-lightbox__close" data-skills-lightbox-close>${closeLabel}</button>
      <div class="alt-skills-lightbox__scroll">
        <img class="alt-skills-lightbox__img" alt="" decoding="async" />
      </div>
    </div>`;
  document.body.appendChild(el);
  return el;
}

function bindSkillsLightbox(root) {
  const locale = skillsLocaleFromPage();
  const lightbox = ensureLightbox(locale);
  const img = lightbox.querySelector('.alt-skills-lightbox__img');
  let lastTrigger = null;

  const close = () => {
    lightbox.hidden = true;
    document.body.classList.remove('alt-skills-lightbox-open');
    if (lastTrigger) lastTrigger.focus();
    lastTrigger = null;
  };

  lightbox.querySelectorAll('[data-skills-lightbox-close]').forEach((node) => {
    node.addEventListener('click', close);
  });

  document.addEventListener('keydown', (e) => {
    if (!lightbox.hidden && e.key === 'Escape') {
      e.preventDefault();
      close();
    }
  });

  root.querySelectorAll('[data-skills-lightbox-trigger]').forEach((btn) => {
    btn.addEventListener('click', () => {
      if (!mobileSkillsLightbox()) return;
      const panelImg = btn.querySelector('.alt-skills-panel__image');
      if (!panelImg) return;
      lastTrigger = btn;
      const src =
        mobileSkillsLightbox() && panelImg.dataset.skillsFullsrc
          ? panelImg.dataset.skillsFullsrc
          : panelImg.src;
      img.src = src;
      img.alt = panelImg.alt;
      lightbox.hidden = false;
      document.body.classList.add('alt-skills-lightbox-open');
      lightbox.querySelector('.alt-skills-lightbox__close')?.focus();
    });
  });
}

export function initSkillsSectorTabs() {
  const root = document.querySelector('[data-alt-skills-sector]');
  if (!root) return;

  root.querySelectorAll('[role="tab"]').forEach((tab) => {
    tab.addEventListener('click', () => {
      selectTab(root, tab.dataset.skillsTab, { focusTab: true, updateHash: true });
    });
  });

  bindTabsKeyboard(root);
  bindHighlightLinking(root);
  bindSkillsLightbox(root);

  const fromHash = tabIdFromHash(window.location.hash);
  if (fromHash) selectTab(root, fromHash);

  window.addEventListener('hashchange', () => {
    const id = tabIdFromHash(window.location.hash);
    if (id) selectTab(root, id);
  });
}
