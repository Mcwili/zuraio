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
import { initRoutesDiagram, refreshRoutesDiagram } from './routes-diagram.js?v=20260820';
import { applyAllTranslations, ensureDefaultLocaleRoute, getLocale, initLocaleSwitcher } from './i18n.js?v=20260915';
import { initContactForm } from './contact-form.js?v=20260914';

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

ensureDefaultLocaleRoute();

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
  initContactForm();
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
  initContactForm();
});
