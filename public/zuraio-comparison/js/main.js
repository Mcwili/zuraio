import { renderHeader, renderFooter, initReveal, initTabs } from './site.js?v=20260750';
import { initHeroComparison } from './hero-comparison.js?v=20260773';
import { initProblemComparison } from './problem-comparison.js?v=20260716';
import { initDemoStatic } from './demo-static.js';
import { initControlParticles } from './control-particles.js?v=20260766';
import { initAuditParticles } from './audit-particles.js?v=20260768';
import { initScatteredKnowledge, renderScatteredKnowledge } from './scattered-knowledge.js';
import { initMarquee } from './integrations-marquee.js?v=20260913';
import { initFaq } from './faq-accordion.js';
import { initInternalReview, refreshInternalReview, isInternalReviewMode } from './internal-review.js';
import { initLogoWatermarks } from './logo-watermarks.js';
import { SITE } from './config.js';
import { initRoutesDiagram, refreshRoutesDiagram } from './routes-diagram.js?v=20260820';
import { applyAllTranslations, getLocale, initLocaleSwitcher } from './i18n.js?v=20260821b';

const TECHNICAL_PAGES = new Set([
  'technicalArchitecture',
  'knowledge',
  'dataControl',
  'deploymentModels',
  'aiGovernance',
  'integrations',
  'faq',
]);

const LEGAL_PAGES = new Set(['impressum', 'privacy', 'terms', 'cookies']);

document.documentElement.lang = getLocale();

function boot() {
  renderHeader();
  renderFooter();
  applyAllTranslations();
  initInternalReview();
  initLogoWatermarks();
  initReveal();
  initTabs();
  initHeroComparison();
  initProblemComparison();
  initScatteredKnowledge();
  initDemoStatic();
  initControlParticles();
  initAuditParticles();
  initMarquee();
  initFaq();
  initRoutesDiagram();
}

boot();

initLocaleSwitcher(() => {
  const pageId = document.body.dataset.page;
  if (pageId && (TECHNICAL_PAGES.has(pageId) || LEGAL_PAGES.has(pageId))) {
    location.reload();
    return;
  }
  renderHeader();
  renderFooter();
  applyAllTranslations();
  initReveal();
  refreshInternalReview();
  initMarquee();
  renderScatteredKnowledge(document.querySelector('[data-scattered-knowledge]'));
  initFaq();
  refreshRoutesDiagram();
  initDemoStatic();
});

// Contact form
const form = document.getElementById('contact-form');
form?.addEventListener('submit', (e) => {
  e.preventDefault();
  const notice = document.getElementById('form-notice');
  if (!notice) return;
  notice.hidden = false;

  if (isInternalReviewMode()) {
    notice.textContent =
      getLocale() === 'de'
        ? 'Entwicklungshinweis: Dieses Formular ist noch nicht mit einem Backend verbunden. Integrationspunkt in contact.html dokumentiert.'
        : 'Development notice: this form is not yet connected to a backend. Integration point documented in contact.html source.';
    return;
  }

  notice.innerHTML =
    getLocale() === 'de'
      ? `Das Formular ist noch nicht verbunden. Bitte schreiben Sie uns an <a href="mailto:${SITE.contactEmail}">${SITE.contactEmail}</a>.`
      : `This form is not yet connected. Please email us at <a href="mailto:${SITE.contactEmail}">${SITE.contactEmail}</a>.`;
});
