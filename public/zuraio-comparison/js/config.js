import { detectSiteBase } from './path-locale.js';

/** GitHub Pages project-site prefix (`/zuraio`); empty on zuraio.ch root. */
export const SITE_BASE = detectSiteBase();

/** Lock homepage to one hero message. Set true only for internal review. */
export const HERO_COMPARISON_ENABLED = false;
/** Show prev/next/dots bar — internal review only. */
export const HERO_CONTROLS_VISIBLE = false;
/** Auto-advance interval (ms) when comparison mode is enabled. */
export const HERO_AUTO_PLAY_MS = 7000;
/** Option 1: A digital executive assistant for every employee. */
export const DEFAULT_HERO_OPTION = 1;
export const PROBLEM_COMPARISON_ENABLED = false;
/** Auto-advance interval (ms) for problem section title options. */
export const PROBLEM_AUTO_PLAY_MS = 5000;
export const DEFAULT_PROBLEM_OPTION = 1;
/** Auto-advance interval (ms) for platform demo showcase slides. */
export const DEMO_AUTO_PLAY_MS = 5500;
export const SPINE_ENABLED = false;

/** When true, show internal TODO labels, ownership and review panels. */
export const INTERNAL_REVIEW_MODE = false;

/** When true, show decorative logo-derived background watermarks. */
export const LOGO_WATERMARKS_ENABLED = true;

/** Public contact relay URL (Worker). Build may override via CONTACT_API_URL env / public-endpoint.txt. */
export const CONTACT_API_URL = 'https://api.zuraio.ch/api/contact';

export const SITE = {
  name: 'Zuraio',
  tagline: 'AI for Swiss companies that need control of their data.',
  internalLabel: 'Zuraio — AI for Swiss companies',
  heroBackground: 'zuraio/assets/260714_zuraio_hero_12.png',
  heroPopup: 'zuraio/assets/260707_UI_Apps_Vision.png',
  heroPlatform: 'zuraio/assets/zuraio-platform-ui.png',
  problemDiagram: 'zuraio/assets/zuraio_knowledge_background_right_aligned.png',
  integrationsBackground: 'zuraio/assets/260707-fits-into-the-tools.png',
  heroImage: 'zuraio/assets/zuraio-hero.jpg',
  contactEmail: 'michael.wili@zuraio.ch',
  logo: 'assets/zuraio-logo.png',
};

/** Platform screenshots for the assistant demo carousel (index.html). */
export const DEMO_SHOWCASE_SLIDES = [
  { id: 'mail', image: 'zuraio/assets/zuraio-demo-mail.png' },
  { id: 'project-summary', image: 'zuraio/assets/zuraio-demo-project-summary.png' },
  { id: 'appointment-reply', image: 'zuraio/assets/zuraio-demo-appointment-reply.png' },
  { id: 'meeting-transcript', image: 'zuraio/assets/zuraio-demo-meeting-transcript.png' },
  { id: 'tasks', image: 'zuraio/assets/zuraio-demo-tasks.png' },
  { id: 'briefing', image: 'zuraio/assets/zuraio-demo-briefing.png' },
];
