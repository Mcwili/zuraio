import { CONTACT_API_URL, SITE } from './config.js';
import { getCopy, getLocale } from './i18n.js';
import { isInternalReviewMode } from './internal-review.js';

function formMessages() {
  const copy = getCopy();
  const form = copy.pages?.contact?.form ?? copy.contact?.form ?? {};
  return {
    sending: form.sending ?? 'Sending…',
    success: form.success ?? 'Thank you. We received your enquiry and will respond within a few business days.',
    error: form.error ?? 'Something went wrong. Please try again or email us directly.',
    errorNetwork: form.errorNetwork ?? 'We could not reach the server. Please check your connection or email us directly.',
    fallback: form.fallback ?? 'This form is not yet connected. Please email us at',
    validationMessageOrInterest:
      form.validationMessageOrInterest ?? 'Please add a message or select a main interest.',
    validationEmail: form.validationEmail ?? 'Please enter a valid email address.',
  };
}

function setNotice(notice, html, isError = false) {
  notice.hidden = false;
  notice.innerHTML = html;
  notice.classList.toggle('form-notice--error', isError);
  notice.focus({ preventScroll: true });
}

function readField(form, name) {
  const el = form.elements.namedItem(name);
  if (!el || !('value' in el)) return '';
  return String(el.value).trim();
}

function buildPayload(form) {
  const interestEl = form.querySelector('#interest');
  const interest = readField(form, 'interest');
  let interestLabel = '';
  if (interestEl instanceof HTMLSelectElement && interestEl.selectedIndex >= 0) {
    interestLabel = interestEl.options[interestEl.selectedIndex]?.text?.trim() ?? '';
    if (interestLabel.toLowerCase().includes('select')) interestLabel = '';
  }

  const ts = form.dataset.formTs || String(Date.now());

  return {
    name: readField(form, 'name'),
    company: readField(form, 'company'),
    role: readField(form, 'role'),
    email: readField(form, 'email'),
    phone: readField(form, 'phone'),
    companySize: readField(form, 'company-size'),
    interest,
    interestLabel,
    message: readField(form, 'message'),
    locale: getLocale(),
    source: window.location.pathname || '/contact.html',
    website: readField(form, 'website'),
    ts: Number(ts),
  };
}

function validateClient(payload, msg) {
  if (!payload.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) {
    return msg.validationEmail;
  }
  if (!payload.message && !payload.interest) {
    return msg.validationMessageOrInterest;
  }
  return null;
}

async function submitToRelay(payload) {
  const endpoint = CONTACT_API_URL.replace(/\/$/, '');
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  let data = null;
  try {
    data = await res.json();
  } catch {
    data = null;
  }
  return { ok: res.ok && data?.ok === true, status: res.status, data };
}

/** In-memory guard — prerender must not rely on data-contact-form-ready on the static HTML. */
let formReady = false;

export function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form || formReady) return;
  formReady = true;
  form.dataset.contactFormReady = 'true';
  form.dataset.formTs = String(Date.now());

  const notice = document.getElementById('form-notice');
  const submitBtn = form.querySelector('button[type="submit"]');
  if (!notice || !submitBtn) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const msg = formMessages();

    if (isInternalReviewMode()) {
      setNotice(
        notice,
        getLocale() === 'de'
          ? 'Entwicklungshinweis: Formular-Backend ist in Internal Review sichtbar.'
          : 'Development notice: form backend visible in internal review mode.',
        true,
      );
      return;
    }

    if (!CONTACT_API_URL) {
      setNotice(
        notice,
        `${msg.fallback} <a href="mailto:${SITE.contactEmail}">${SITE.contactEmail}</a>.`,
        true,
      );
      return;
    }

    const payload = buildPayload(form);
    const validationError = validateClient(payload, msg);
    if (validationError) {
      setNotice(notice, validationError, true);
      return;
    }

    submitBtn.disabled = true;
    const prevLabel = submitBtn.textContent;
    submitBtn.textContent = msg.sending;
    notice.hidden = true;

    try {
      const result = await submitToRelay(payload);
      if (result.ok) {
        setNotice(notice, msg.success, false);
        form.reset();
        form.dataset.formTs = String(Date.now());
      } else if (result.status >= 400 && result.status < 500 && result.data?.error) {
        setNotice(notice, String(result.data.error), true);
      } else {
        setNotice(
          notice,
          `${msg.error} <a href="mailto:${SITE.contactEmail}">${SITE.contactEmail}</a>.`,
          true,
        );
      }
    } catch {
      setNotice(
        notice,
        `${msg.errorNetwork} <a href="mailto:${SITE.contactEmail}">${SITE.contactEmail}</a>.`,
        true,
      );
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = prevLabel;
    }
  });
}
