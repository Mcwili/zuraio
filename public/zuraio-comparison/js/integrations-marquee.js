import { INTEGRATIONS, getIntegrationLabel, getIntegrationAlt } from './integrations-data.js?v=20260913';
import { getLocale } from './i18n.js';
import { assetHref } from './path-locale.js';
import { isInternalReviewMode, renderStatusBadge } from './internal-review.js';

const PLACEHOLDER_ICON = `<svg class="integration-icon-placeholder" viewBox="0 0 20 20" aria-hidden="true" focusable="false"><rect x="2" y="2" width="16" height="16" rx="3" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M6 10h8M10 6v8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`;

function renderLogo(integration) {
  if (integration.logo) {
    return `<img class="integration-logo-img" src="${assetHref(integration.logo)}" alt="" width="20" height="20" loading="lazy" decoding="async" />`;
  }
  return PLACEHOLDER_ICON;
}

function renderIntegrationItem(integration, locale) {
  const name = getIntegrationLabel(integration, locale);
  const alt = getIntegrationAlt(integration, locale);
  const missing = !integration.logo;
  const showAssetStatus = isInternalReviewMode() && missing;

  return `<span class="tool integration-item${missing ? '' : ' has-logo'}" data-integration="${integration.id}">
    <span class="integration-logo-wrap" aria-hidden="true">${renderLogo(integration)}</span>
    <span class="integration-name">${name}</span>
    ${showAssetStatus ? renderStatusBadge('missing-asset', 'ASSET NEEDED') : ''}
    <span class="visually-hidden">${alt}${showAssetStatus ? ' — logo asset needed' : ''}</span>
  </span>`;
}

export function initMarquee() {
  const locale = getLocale();

  document.querySelectorAll('[data-marquee]').forEach((track) => {
    const inner = track.querySelector('.marquee-inner');
    if (!inner) return;

    const html = INTEGRATIONS.map((item) => renderIntegrationItem(item, locale)).join('');

    if (!track.dataset.marqueeReady) {
      track.dataset.marqueeReady = 'true';
      inner.innerHTML = html + html;
      track.addEventListener('mouseenter', () => track.classList.add('is-paused'));
      track.addEventListener('mouseleave', () => track.classList.remove('is-paused'));
      track.addEventListener('focusin', () => track.classList.add('is-paused'));
      track.addEventListener('focusout', () => track.classList.remove('is-paused'));
      return;
    }

    inner.innerHTML = html + html;
  });
}

export { INTEGRATIONS };
