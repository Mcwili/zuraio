export const heroOptions = [
  {
    headline: 'A digital executive assistant for every employee.',
    emphasis: 'assistant',
    paragraph:
      'Zuraio gives everyone in your company an intelligent assistant that can find information, answer questions, prepare documents and help get work done.',
    cta: "Meet your company's AI assistant",
    ctaHref: 'contact.html',
  },
  {
    headline: 'Give every employee the power of an executive assistant.',
    emphasis: 'executive assistant',
    paragraph:
      'Zuraio connects your company\u2019s knowledge and tools, giving your people instant support with research, writing, analysis and everyday tasks.',
    cta: 'See how Zuraio works',
    ctaHref: '#assistant-demo',
  },
  {
    headline: 'An AI assistant that knows your company.',
    emphasis: 'AI assistant',
    paragraph:
      'Zuraio understands your documents, meetings, emails and business knowledge, so your employees can find answers and complete work faster.',
    cta: 'Discover the Zuraio AI Hub',
    ctaHref: 'knowledge.html',
  },
  {
    headline: 'The intelligent workspace for your entire company.',
    emphasis: 'workspace',
    paragraph:
      'Search company knowledge, create documents, analyse information and complete everyday work through one secure AI Hub.',
    cta: 'See what it can do',
    ctaHref: '#assistant-demo',
  },
  {
    headline: 'An AI assistant for everyone. Powered by your company.',
    emphasis: 'AI assistant',
    paragraph:
      'Zuraio turns your business knowledge into secure, practical support for every employee.',
    cta: 'Explore Zuraio',
    ctaHref: 'how-it-helps.html',
  },
];

export const problemOptions = [
  {
    heading: 'Let Zuraio make your company knowledge easier to find and use.',
  },
  {
    heading: 'Let Zuraio find your information and move the work forward.',
  },
  {
    heading: 'Let Zuraio connect your knowledge and simplify the work.',
  },
  {
    heading: 'Let Zuraio help your employees find answers and get work done.',
  },
  {
    heading: 'Let Zuraio make your company knowledge easier to find, understand and use.',
  },
];

export const trustSignals = [
  { label: 'Swiss hosting available', href: 'deployment-models.html#swiss-hosted' },
  { label: 'Sources shown', href: 'knowledge.html#traceability' },
  { label: 'Approved company knowledge', href: 'knowledge.html#skillos' },
  { label: 'Choice of AI model', href: 'technical-architecture.html#models' },
  { label: 'You remain in control', href: 'data-control.html#data-ownership' },
];

export const integrations = [
  'Outlook',
  'Gmail',
  'Microsoft 365',
  'Google Workspace',
  'Teams',
  'Slack',
  'Notion',
  'SharePoint',
  'OneDrive',
  'HubSpot',
  'Salesforce',
  'WhatsApp',
  'Voice notes',
  'Abacus',
  'bexio',
  'SAP',
  'Dynamics 365',
  'Odoo',
  'Sage',
  'Proffix',
  'Klara',
];

export const nav = {
  main: [
    { label: 'How it helps', href: 'how-it-helps.html' },
    { label: 'Knowledge', href: 'knowledge.html' },
    { label: 'Integrations', href: 'integrations.html' },
    { label: 'Data control', href: 'data-control.html' },
  ],
  technical: [
    { label: 'Technical architecture', href: 'technical-architecture.html' },
    { label: 'Deployment models', href: 'deployment-models.html' },
    { label: 'AI governance', href: 'ai-governance.html' },
    { label: 'Data control', href: 'data-control.html' },
    { label: 'Knowledge and SkillOS', href: 'knowledge.html#skillos' },
  ],
  about: { label: 'About', href: 'about.html' },
};

export const ui = {
  bookDemo: 'Book a demo',
  technical: 'Technical',
  previous: '← Previous',
  next: 'Next →',
  optionOf: (n) => `Option ${n} of 5`,
  optionLabel: (n) => `Option ${n}`,
  previousAria: 'Previous hero option',
  nextAria: 'Next hero option',
  heroOptionsGroup: 'Hero messaging options',
  trustAria: 'Trust signals',
  primaryNavAria: 'Primary',
  logoAlt: 'Zuraio – own your data',
  langEn: 'EN',
  langDe: 'DE',
  langFr: 'FR',
  langIt: 'IT',
  languageLabel: 'Language',
  languageContact: 'Language / Contact',
  languageActive: 'active',
  openMenu: 'Open menu',
  closeMenu: 'Close menu',
  zuraioHome: 'Zuraio home',
};

export const home = {
  meta: {
    title: 'Zuraio – AI assistant for Swiss SMEs with data control',
    description:
      'Zuraio is a digital executive assistant for Swiss SMEs. It works with approved company knowledge, shows its sources and keeps employees in control.',
    ogTitle: 'Zuraio – AI assistant for Swiss SMEs with data control',
    ogDescription:
      'Zuraio is a digital executive assistant for Swiss SMEs. It works with approved company knowledge, shows its sources and keeps employees in control.',
  },
  heroEyebrow: 'AI ASSISTANT FOR SWISS SMEs',
  problem: {
    marker: 'Recognise this?',
    headingHtml: 'Your employees spend too much time<br>searching for information.',
    body: 'Important knowledge is spread across emails, documents, meetings and business systems. People lose time searching, preparing and repeating work that has already been done.',
    cards: [
      {
        title: 'Knowledge is scattered',
        body: 'Information is spread across emails, documents, meetings and business systems.',
      },
      {
        title: 'Routine work takes time',
        body: 'Employees spend hours preparing summaries, reports and follow-ups.',
      },
      {
        title: 'Answers lack context',
        body: 'Without the right sources and history, answers are harder to find and trust.',
      },
    ],
    link: 'See practical use cases →',
    illustration: {
      labels: {
        whereIsIt: 'Where is it?',
        whichDocument: 'Which document?',
        latestVersion: 'Is this the latest version?',
        whoKnows: 'Who knows?',
        doneBefore: 'Has this been done before?',
        whoHasAccess: 'Who has access?',
      },
    },
  },
  different: {
    marker: 'More than a chatbot',
    heading: 'Your company knowledge, working for your people.',
    headingEmphasis: 'company knowledge',
    body: 'Generic AI only knows what someone provides in each conversation. Zuraio securely connects to approved company knowledge, considers the context of the person asking and prepares answers and documents with sources for review.',
    bridge:
      'Behind the scenes, Zuraio can coordinate specialised AI assistants, suitable models and connected business systems. Employees work through one simple interface.',
    bridgeLink: 'Explore the technical architecture →',
    compareTrio: {
      heading: 'How Zuraio compares',
      chatgpt: {
        name: 'ChatGPT',
        body: 'General-purpose generative AI for questions, writing and analysis. Company knowledge and business processes are not covered automatically, but have to be supplied through prompts, files or additional connections. Generated answers have to be checked for accuracy.',
      },
      copilot: {
        name: 'Microsoft Copilot',
        body: 'Generative AI inside the Microsoft world. Its value depends on the products, licences, permissions and configuration in use. Processes and data outside Microsoft 365 have to be connected separately. The content it generates also has to be reviewed.',
      },
      zuraio: {
        name: 'Zuraio',
        body: 'Controlled AI for your business. Zuraio maps your actual business processes and works with approved company knowledge instead of freely generated content. Roles and permissions make sure employees only see the information intended for them. Your data stays inside your company.',
      },
    },
    without: {
      title: 'Without Zuraio',
      subtitle: 'A fragmented process',
      steps: [
        { title: 'Ask a generic AI' },
        { title: 'Find and add files' },
        { title: 'Explain the context' },
        { title: 'Check, compile and repeat' },
      ],
    },
    with: {
      title: 'With Zuraio',
      subtitle: 'One connected route',
      steps: [
        { title: 'Ask Zuraio' },
        { title: 'Approved knowledge' },
        { title: 'Answer with sources' },
        { title: 'Review and decide' },
      ],
      outcome: 'You remain in control',
    },
  },
  integrations: {
    heading: 'Designed to work with the tools your team already uses.',
    body: 'Zuraio connects with Microsoft 365, SharePoint, Exchange and Teams, as well as CRM and ERP systems. MCP and REST APIs provide flexible connections to additional company tools.',
    link: 'View all integrations →',
  },
  demo: {
    heading: 'See your assistant working.',
    body: 'Zuraio gathers relevant company context, prepares the work and shows its sources for your review.',
    caption:
      'Zuraio can prepare a customer reply using previous correspondence, current documents and relevant company information. The employee reviews the result and decides what happens next.',
    video: 'zuraio/assets/zuraio-demo.mp4',
    poster: 'zuraio/assets/zuraio-demo-mail.png',
    videoAlt: 'Zuraio email assistant — draft reply prepared with company context and visible sources.',
    examples: [
      {
        label: 'Project status',
        prompt: 'What is the latest status of Project X, and which actions are still open?',
      },
      {
        label: 'Meeting preparation',
        prompt: 'Prepare a briefing for tomorrow\u2019s customer meeting using the latest emails, documents and CRM information.',
      },
      {
        label: 'Customer communication',
        prompt: 'Draft a customer reply using our approved terms and previous correspondence.',
      },
    ],
  },
  dataControl: {
    marker: 'Data control',
    positioning: 'Built for Swiss SMEs that want the benefits of AI without losing control of company data.',
    heading: 'AI, without handing over the keys.',
    headingEmphasis: 'keys',
    body: 'Zuraio gives companies control over where it runs, which information it can use, who can access it and how its work is reviewed.',
    cards: [
      {
        title: 'Swiss hosting with Infomaniak',
        bodyHtml:
          'Zuraio\u2019s Swiss-hosted option uses infrastructure in Switzerland provided by <a href="https://www.infomaniak.com/en/certifications" rel="noopener noreferrer">Infomaniak</a>. Infomaniak is ISO 27001:2022 certified and holds the Swiss Hosting label.',
      },
      { title: 'Access follows your rules', body: 'People work only with the information they are permitted to use.' },
      { title: 'Answers show their sources', body: 'Users can check where information came from before relying on it.' },
      { title: 'Built to be reviewed', body: 'Requests, sources and outputs can be easier to trace according to the agreed setup.' },
    ],
    note: '<b>Need stronger control?</b> On-premise options and model choice can be discussed for companies with stricter internal requirements.',
    link: 'Explore data control and security →',
  },
  reviewable: {
    marker: 'AI governance',
    heading: 'A clear record from request to approval.',
    headingEmphasis: 'explain',
    bodyParagraphs: [
      'AI use is becoming easier to scrutinise. Customers, auditors and regulators will increasingly expect companies to explain where information came from and how AI was used.',
      'Zuraio helps you stay prepared with source-backed answers and reviewable AI.',
    ],
    steps: [
      { label: 'What was asked', title: 'The request', body: 'Keep a record of the prompt or task.' },
      { label: 'What was used', title: 'The sources', body: 'See exactly which approved company information was used.' },
      { label: 'What was produced', title: 'The output', body: 'Review the answer, draft or summary that was created.' },
      { label: 'Who approved it', title: 'The review', body: 'Know who reviewed, edited or approved the final result.' },
    ],
    link: 'Learn about AI governance →',
  },
  origin: {
    marker: 'Why we built Zuraio',
    heading: 'Built for the work we do every day.',
    paragraphs: [
      'We built Zuraio because AI could generate answers, but it didn’t understand our company knowledge, access rules or working context.',
      'We wanted an assistant that works with real business information and keeps people in control.',
      'That became Zuraio.',
    ],
    link: 'Meet the team →',
  },
  faq: {
    heading: 'Common questions',
    link: 'View all questions →',
    itLink: 'Questions your IT team will ask →',
    items: [
      {
        question: 'What is Zuraio?',
        answer:
          'Zuraio is a digital assistant for companies. It helps employees find information, answer questions and prepare documents using approved company knowledge and connected tools.',
      },
      {
        question: 'Is our company data kept in Switzerland?',
        answer:
          'Zuraio offers a Swiss hosting option for companies that want to keep their environment and company data in Switzerland. Other deployment requirements are defined according to your company\u2019s needs.',
      },
      {
        question: 'Can employees access information they are not permitted to see?',
        answer:
          'Zuraio is designed to respect your company\u2019s existing access rules. Employees should only be able to use information they are permitted to access. The exact implementation depends on connected systems and the agreed configuration.',
      },
      {
        question: 'Can we see where an answer came from?',
        answer:
          'Where source-backed company knowledge is used, Zuraio can retain and present source information according to the selected assistant and interface. Not every output is necessarily source-backed, and the exact presentation varies by component.',
      },
      {
        question: 'Does Zuraio make decisions or send things automatically?',
        answer:
          'Zuraio can prepare answers, drafts and proposed actions for review. Which actions may be executed automatically depends on the component, permissions, approval rules and selected configuration.',
      },
      {
        question: 'Which tools can Zuraio connect to?',
        answer:
          'Zuraio is designed to work with existing email, document, communication and business systems. Available connections depend on approved tools and the agreed scope.',
      },
      {
        question: 'Do we have to replace our existing systems?',
        answer:
          'No. Zuraio is designed to work alongside existing tools rather than replace them. Connections are configured around your approved systems, permissions and deployment scope.',
      },
      {
        question: 'How long does implementation take?',
        answer:
          'Implementation scope depends on your systems, data sources, permissions model and deployment choice. A typical path starts with selected use cases and expands carefully after review. Contact us to discuss your setup.',
      },
      {
        question: 'Do you provide training and ongoing support?',
        answer:
          'Training and support arrangements depend on your deployment and commercial agreement. These should be confirmed before publication as part of your setup plan.',
      },
      {
        question: 'Is Zuraio intended for Swiss SMEs?',
        answer:
          'Zuraio is designed for Swiss companies and mid-sized organisations that need control over data, access, AI model choice and internal knowledge — including owner-managed businesses and teams that want practical AI rather than abstract experiments.',
      },
    ],
  },
  final: {
    heading: 'See what your own assistant could take off your desk.',
    body: 'We will look at your current tools, company knowledge and data-control requirements, then identify where Zuraio could help first.',
    primaryCta: 'Book a private demo',
    secondaryCta: 'See the assistant working',
    supporting: 'Your company. Your information. Your approval.',
  },
};

export const faqItems = [
  {
    question: 'What is Zuraio AI Hub?',
    answer:
      'Zuraio AI Hub is a platform that brings together company knowledge, specialised AI assistants, permitted models and business-system integrations. Employees use one environment while Zuraio applies the relevant identity, permission and process rules.',
  },
  {
    question: 'Who is Zuraio for?',
    answer:
      'Zuraio is initially focused on Swiss SMEs that want practical AI while retaining control over company knowledge, access and deployment choices. The technical architecture can also support more complex organisational requirements.',
  },
  {
    question: 'Where is our data processed?',
    answer:
      'The processing location depends on the selected deployment. Zuraio supports architectures using customer-controlled infrastructure, private cloud, Swiss hosting and hybrid combinations. The exact locations, model providers and data flows are documented for the agreed customer setup. See <a href="deployment-models.html">deployment models</a> for an overview.',
  },
  {
    question: 'Can we choose which AI model handles which task?',
    answer:
      'Zuraio is designed to support different approved models according to the task, data classification, permitted processing location, quality requirements and cost. The models available depend on the selected deployment and providers.',
  },
  {
    question: 'Can users only access what they are allowed to access?',
    answer:
      'Zuraio can work with Microsoft or Google identities, groups and permissions, with additional Zuraio roles where required. The exact access behaviour depends on the connected system, integration method and agreed configuration.',
  },
  {
    question: 'Can we see which sources were used in an answer?',
    answer:
      'Where source-backed company knowledge is used, Zuraio can retain and present source information according to the selected assistant and interface. Not every output is necessarily source-backed, and the exact presentation varies by component.',
  },
  {
    question: 'How does Zuraio connect to our existing tools?',
    answer:
      'Zuraio is designed to connect through MCP, APIs, webhooks and customer-specific connectors. The available scope depends on the system, selected use case and current integration maturity. See <a href="integrations.html">integrations</a> for category information.',
  },
  {
    question: 'Is our data used to train public AI models?',
    answer:
      'This depends on the selected model, provider and contractual terms. The applicable retention, processing and training conditions must be defined before company information is connected.',
  },
  {
    question: 'Does Zuraio make changes automatically?',
    answer:
      'Zuraio can prepare answers, drafts and proposed actions for review. Which actions may be executed automatically depends on the component, permissions, approval rules and selected configuration.',
  },
  {
    question: 'What is available today?',
    answer:
      'SkillOS is the most mature Zuraio component and provides versioned knowledge, retrieval and governance functions. EmailAI includes implemented core communication capabilities that are undergoing further production validation. The full Microsoft 365 and Office automation architecture remains specified or in development.',
  },
  {
    question: 'How do we get started?',
    answer:
      'We begin with selected use cases, existing systems, identity and access requirements, data classes and the preferred deployment boundary. A controlled pilot can then validate usefulness, integration and operational requirements before wider adoption.',
  },
  {
    question: 'What is a starter partner?',
    answer:
      'A starter partner works with Zuraio on a defined first use case and provides structured feedback during product validation. The precise scope, responsibilities, support and commercial terms are agreed before the project begins.',
  },
];

export const faqItHeading = 'Questions your IT team will ask';

export const faqItItems = [
  {
    question: 'Where is our data stored?',
    answer:
      'The processing location depends on the selected deployment. Zuraio supports architectures using customer-controlled infrastructure, private cloud, Swiss hosting and hybrid combinations. The exact locations, model providers and data flows are documented for the agreed customer setup. See <a href="deployment-models.html">deployment models</a> for an overview.',
  },
  {
    question: 'Does company data leave the selected environment?',
    answer:
      'Policies can take account of the task, data classification, permitted processing location and approved model provider. The exact locations and data flows are documented for the agreed customer setup.',
  },
  {
    question: 'Can external cloud AI models be disabled?',
    answer:
      'Which models are available, and which data may be sent to each, are defined in the agreed deployment and model policies. The availability of a specific model must be confirmed as part of the technical and commercial scope.',
  },
  {
    question: 'Are employee queries stored?',
    answer:
      'Relevant requests, sources and actions can be retained according to the agreed audit model and the maturity of each component. The exact retention behaviour depends on the selected components and agreed configuration.',
  },
  {
    question: 'Are audit records available?',
    answer:
      'Relevant requests, sources and actions can be retained according to the agreed audit model and the maturity of each component. The exact scope depends on the selected components and agreed configuration.',
  },
  {
    question: 'How are existing access permissions applied?',
    answer:
      'Zuraio can work with established Microsoft or Google identities, groups and permissions. Identity and permission context can be passed to the relevant assistant and data source so access can be checked when information is retrieved or an action is requested. The exact permission behaviour depends on the connected system, integration method and agreed deployment.',
  },
];

export const faqCta = {
  heading: 'Still have questions?',
  lede: 'Book a private demo and we can discuss your systems, data-control requirements and first workflows.',
  button: 'Contact us',
};

export const pages = {
  howItHelps: {
    title: 'How it helps — Zuraio',
    description: 'Practical ways Zuraio helps Swiss teams prepare, search, draft and follow up using approved company knowledge.',
    hero: { marker: 'How it helps', heading: 'Less administration. More valuable work.', headingEmphasis: 'valuable', lede: 'Zuraio helps people prepare, search, draft, summarise and follow up using approved company knowledge. It works alongside existing systems and brings the relevant context together when it is needed.' },
  },
  knowledge: {
    title: 'Knowledge — Zuraio',
    description: 'How Zuraio turns scattered company information into governed, usable context for employees and assistants.',
    hero: { marker: 'Knowledge', heading: 'Turn scattered company information into governed, usable context.', headingEmphasis: 'governed', lede: 'Important knowledge is often spread across inboxes, shared drives, meeting notes and business systems. Zuraio brings approved information and working methods together so employees and specialised assistants can use them more effectively.' },
  },
  integrations: {
    title: 'Integrations — Zuraio',
    description: 'How Zuraio connects with Microsoft 365, SharePoint, Exchange, Teams, CRM, ERP, MCP and REST APIs.',
    hero: { marker: 'Integrations', heading: 'Works alongside the systems your team already uses.', headingEmphasis: 'already', lede: 'Zuraio is designed to connect company knowledge and workflows without forcing teams to replace the systems that already work.' },
  },
  dataControl: {
    title: 'Data control & security — Zuraio',
    description: 'How Zuraio helps Swiss companies keep control of data, access, models and review while using AI.',
    hero: { marker: 'Data control', heading: 'Keep control of company data while using AI.', headingEmphasis: 'control', lede: 'Zuraio is designed for companies that want AI benefits without uncontrolled data exposure, unclear model routing or generic external processing.' },
  },
  deploymentModels: {
    title: 'Deployment models — Zuraio',
    description: 'Local, hybrid and Swiss-hosted deployment options for Zuraio, including model choice and data location.',
    hero: { marker: 'Deployment', heading: 'Local, hybrid or Swiss-hosted.', headingEmphasis: 'Swiss-hosted', lede: 'Different companies have different requirements for data location, infrastructure, model choice, operations and cost. Zuraio supports deployment designs that can be adapted to those requirements.' },
  },
  technicalArchitecture: {
    title: 'Technical architecture — Zuraio',
    description: 'The controlled Zuraio platform architecture for company knowledge, assistants, models and integrations.',
    hero: { marker: 'Technical architecture', heading: 'A controlled AI platform for company knowledge, specialised assistants and business processes.', headingEmphasis: 'controlled', lede: 'Zuraio brings together a central user interface, identity and access controls, company knowledge, specialised AI assistants, model selection and system integrations. Its orchestration layer coordinates these components so employees can work through one consistent environment.' },
  },
  aiGovernance: {
    title: 'AI governance — Zuraio',
    description: 'How Zuraio supports reviewable AI use with records from request to approval.',
    hero: { marker: 'AI governance', heading: 'AI use that can be understood and reviewed.', headingEmphasis: 'reviewed', lede: 'Responsible company AI requires more than a model. Organisations need clear rules for knowledge, access, models, actions, human review and operational records.' },
  },
  faq: {
    title: 'FAQ — Zuraio',
    description: 'Practical questions about using Zuraio at work, including IT deployment and data-control topics.',
    hero: { marker: 'FAQ', heading: 'Practical questions about using Zuraio at work.', headingEmphasis: 'Practical', lede: 'Answers to common questions about company knowledge, deployment, permissions, models and everyday use.' },
  },
  about: {
    title: 'About — Zuraio',
    description: 'Why Zuraio was built and the team behind the platform.',
    hero: { marker: 'About Zuraio', heading: 'Practical AI. Built around people.' },
  },
  contact: {
    title: 'Contact — Zuraio',
    description: 'Contact Zuraio to discuss your tools, company knowledge and data-control requirements.',
    hero: { marker: 'Contact', heading: 'Find the first practical use case for your company.', headingEmphasis: 'practical', lede: 'We will look at your current tools, company knowledge and data-control requirements, then identify where Zuraio could help first.' },
    form: {
      sending: 'Sending…',
      success: 'Thank you. We received your enquiry and will respond within a few business days.',
      error: 'Something went wrong. Please try again or email us directly at',
      errorNetwork: 'We could not reach the server. Please check your connection or email us at',
      fallback: 'This form is not yet connected. Please email us at',
      validationMessageOrInterest: 'Please add a message or select a main interest.',
      validationEmail: 'Please enter a valid email address.',
    },
  },
  resources: {
    title: 'Resources — Zuraio',
    description: 'Technical and practical Zuraio resources for teams evaluating or deploying the platform.',
    hero: { marker: 'Resources', heading: 'Technical and practical information about Zuraio.', headingEmphasis: 'practical', lede: 'Guides, overviews and reference material for teams evaluating or deploying Zuraio.' },
  },
  privacy: {
    title: 'Privacy — Zuraio',
    description: 'Zuraio privacy policy information.',
    hero: { marker: 'Legal', heading: 'Privacy policy.', lede: 'This page is a structured placeholder. A complete privacy policy must be prepared and reviewed by qualified legal counsel before publication.' },
  },
  impressum: {
    title: 'Impressum — Zuraio',
    description: 'Legal disclosure and company information for Zuraio.',
    hero: { marker: 'Legal', heading: 'Impressum.', lede: 'This page is a structured placeholder. All company details below must be verified and inserted before publication.' },
  },
  terms: {
    title: 'Terms of use — Zuraio',
    description: 'Terms of use for the Zuraio website and services.',
    hero: { marker: 'Legal', heading: 'Terms of use.', lede: 'This page is a structured placeholder. Complete terms must be prepared and reviewed by qualified legal counsel before publication.' },
  },
  cookies: {
    title: 'Cookie settings — Zuraio',
    description: 'Cookie settings and information for the Zuraio website.',
    hero: { marker: 'Legal', heading: 'Cookie settings.', lede: 'This page is a structured placeholder. Actual cookie categories and controls will be published after legal and technical review.' },
  },
};

export const site = {
  tagline: 'AI for Swiss companies that need control of their data.',
};

export const footerGroups = [
  {
    title: 'Product',
    links: [
      { label: 'How Zuraio helps', href: 'how-it-helps.html' },
      { label: 'Knowledge', href: 'knowledge.html' },
      { label: 'Integrations', href: 'integrations.html' },
      { label: 'Use cases', href: 'how-it-helps.html#use-cases' },
      { label: 'Book a demo', href: 'contact.html' },
    ],
  },
  {
    title: 'Data & Security',
    links: [
      { label: 'Data control', href: 'data-control.html' },
      { label: 'Swiss hosting', href: 'deployment-models.html#swiss-hosted' },
      { label: 'Deployment models', href: 'deployment-models.html' },
      { label: 'Technical architecture', href: 'technical-architecture.html' },
      { label: 'AI governance', href: 'ai-governance.html' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: 'about.html' },
      { label: 'Contact', href: 'contact.html' },
      { label: 'Resources', href: 'resources.html' },
      { label: 'Partners', href: 'contact.html#partnerships' },
      { label: 'Pressroom', href: 'resources.html#pressroom' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Impressum', href: 'impressum.html' },
      { label: 'Privacy', href: 'privacy.html' },
      { label: 'Cookie settings', href: 'cookies.html' },
      { label: 'Terms of use', href: 'terms.html' },
    ],
  },
];

/**
 * Per-page strings wired through `data-i18n` attributes in the HTML templates.
 * Resolved by applyDataI18n() in i18n.js via t("extra.<page>.<key>").
 */
export const extra = {
  about: {
    k16: 'Our team',
    k01: 'Why we started',
    k02: 'Built from the same problem our clients face.',
    k03: 'We needed a better way to prepare for meetings, manage emails, find the right information, draft reports and reduce repeated admin. Public AI tools were useful, but they were not enough for serious company work.',
    k04: 'We wanted one controlled layer connected to real business knowledge, with clear rules around access, data and model choice. That is what became Zuraio AI Hub.',
    k05: 'What we believe',
    k06: 'Human judgement comes first.',
    k07: 'Company data stays under company control.',
    k08: 'Start with real workflows.',
    k09: 'Make sources and access clear.',
    k10: 'Build tools people can use every day.',
    k11: 'The people behind Zuraio.',
    k12: 'A small team building practical AI for Swiss companies.',
    k13: 'Let’s talk about your company.',
    k14: 'Tell us about your workflows and what you would like to improve.',
    k15: 'Contact the team →',
  },
  contact: {
    k30: 'Enquiry form',
    k31: 'Name <span aria-hidden="true">*</span>',
    k32: 'Company <span aria-hidden="true">*</span>',
    k33: 'Email <span aria-hidden="true">*</span>',
    k34: 'Role',
    k35: 'Phone',
    k36: 'Company size',
    k37: 'Main interest',
    k38: 'Meeting preparation',
    k39: 'Data control',
    k40: 'Technical architecture',
    k41: 'Message',
    k42: 'Website',
    k43: 'Send enquiry',
    k44: 'Contact paths.',
    k45: 'Switzerland',
    k46: 'Partnerships',
    k28: 'Send your enquiry to <a href="mailto:michael.wili@zuraio.ch">michael.wili@zuraio.ch</a>.',
    k29: 'For direct enquiries, email us at <a href="mailto:michael.wili@zuraio.ch">michael.wili@zuraio.ch</a>.',
    k01: 'Tell us about your company.',
    k02: 'Development notice: this form is not yet connected to a backend. Submissions are handled client-side only until integration is complete.',
    k03: 'Select an option',
    k04: 'Email and follow-up',
    k05: 'Internal knowledge search',
    k06: 'Reports and summaries',
    k07: 'Starter partner discussion',
    k08: 'Your enquiry will be handled confidentially.',
    k09: 'Three ways to reach us',
    k10: '1. Book a demo',
    k11: 'Use the form to request a private demo. We typically respond within a few business days.',
    k12: '2. Email directly',
    k13: '3. Starter partner conversation',
    k14: 'Interested in shaping Zuraio as an early partner? Mention "starter partner" in your message or use the form interest option.',
    k15: 'Starter partner programme.',
    k16: 'Zuraio works with selected starter partners to deploy practical AI workflows, test real use cases and shape the product roadmap.',
    k17: 'Who it is for',
    k18: 'Swiss companies with sensitive internal knowledge',
    k19: 'Owner-managed and mid-sized organisations',
    k20: 'Teams that want AI but need data control',
    k21: 'Organisations that want practical first use cases',
    k22: 'What partners can expect',
    k23: 'Direct input into product development',
    k24: 'Early access to Zuraio AI Hub',
    k25: 'Practical workflow selection and controlled pilot setup',
    k26: 'Roadmap influence — commercial terms to be agreed',
    k27: 'Start the conversation',
  },
  how_it_helps: {
    k51: 'Use cases',
    k52: 'Meeting preparation',
    k53: 'Examples:',
    k54: 'By role',
    k55: 'Process consistency',
    k56: 'Augmenting people',
    k57: 'Operations teams',
    k58: 'Administration teams',
    k59: 'project updates',
    k60: 'meeting actions',
    k61: 'internal reminders',
    k62: 'admin checklists',
    k63: 'proposal checklists',
    k64: 'client onboarding',
    k65: 'report templates',
    k66: 'meeting preparation',
    k67: 'decision summaries',
    k68: 'project summaries',
    k69: 'process checklists',
    k70: 'task capture',
    k71: 'follow-up tracking',
    k72: 'email summaries',
    k73: 'document search',
    k74: 'report drafts',
    k75: 'internal FAQs',
    k76: 'client briefs',
    k77: 'proposal preparation',
    k78: 'CRM context',
    k79: 'follow-up drafting',
    k80: 'meeting notes',
    k81: 'handovers',
    k82: 'reminders',
    k01: 'Where Zuraio helps day to day.',
    k02: 'Practical workflows for meetings, email, reports, knowledge search, admin and process consistency — not abstract AI experiments.',
    k03: 'Generate a briefing before a meeting using relevant emails, documents, client history, open tasks and previous notes.',
    k04: 'client meeting brief',
    k05: 'supplier negotiation brief',
    k06: 'internal management meeting brief',
    k07: 'project status briefing',
    k08: 'board preparation notes',
    k09: 'Email and follow-up',
    k10: 'Summarise long threads, draft replies and detect open actions.',
    k11: 'What did the client ask for?',
    k12: 'What do we still owe them?',
    k13: 'Draft a reply in our tone.',
    k14: 'Create a follow-up reminder.',
    k15: 'Reports and summaries',
    k16: 'Draft updates from approved documents and internal sources.',
    k17: 'monthly management summaries',
    k18: 'sales account reports',
    k19: 'internal decision notes',
    k20: 'board briefing packs',
    k21: 'Internal knowledge search',
    k22: 'Ask questions across documents, policies, standards, project folders and other approved knowledge sources.',
    k23: 'What do we usually include in this proposal?',
    k24: 'Where is the latest version of this policy?',
    k25: 'What did we agree on this project?',
    k26: 'Which document supports this claim?',
    k27: 'Admin and task capture',
    k28: 'Turn emails, notes or voice inputs into structured tasks, reminders and follow-ups.',
    k29: 'client follow-up tasks',
    k30: 'project handover notes',
    k31: 'Help teams follow the same steps and reduce avoidable human error.',
    k32: 'compliance document reviews',
    k33: 'recurring admin workflows',
    k34: 'Built for the way different teams work.',
    k35: 'Owners and management',
    k36: 'company-wide knowledge search',
    k37: 'board and management reports',
    k38: 'risk and follow-up visibility',
    k39: 'Sales and client teams',
    k40: 'AI that supports your people — not replaces them.',
    k41: 'Zuraio is designed around a simple principle: AI should support human judgement, not replace it. The goal is to reduce repeated preparation, surface relevant context and help teams work faster — while keeping people in control of decisions, approvals and final outputs.',
    k42: 'People stay accountable',
    k43: 'Outputs are designed to be reviewed, edited and approved by the people responsible for the work. Zuraio assists with drafts and summaries; your team decides what is sent, shared or acted on.',
    k44: 'Sources you can check',
    k45: 'Where internal knowledge is used, answers can include references to the documents or systems they came from. This is intended to make it easier to verify information before acting on it.',
    k46: 'Workflows that fit how you work',
    k47: 'Rather than asking employees to change how they work entirely, Zuraio is designed to connect to existing tools and knowledge — meeting preparation, email, reports and search in the places teams already spend their time.',
    k48: 'Show us your current workflow.',
    k49: 'We will walk through where controlled AI could help first — based on your systems, data-control needs and everyday work.',
    k50: 'Book a private demo',
  },
  integrations: {
    k01: 'The categories below describe the types of systems Zuraio is designed to connect. Availability must be confirmed for each customer setup.',
  },
  resources: {
    k26: 'Resource library.',
    k27: 'Coming soon',
    k28: 'Integration catalogue',
    k29: 'Press kit',
    k30: 'Data control',
    k31: 'Technical architecture',
    k32: 'AI governance',
    k33: 'Pressroom',
    k34: 'Available',
    k01: 'Downloads and guides',
    k02: 'Swiss data-control guide',
    k03: 'A short guide for IT and legal teams covering architecture, residency options, model routing and auditability — written for Swiss companies evaluating controlled AI.',
    k04: 'Technical architecture overview (PDF)',
    k05: 'A deeper technical summary for CTOs and IT advisers — routing, agents, permissions, deployment models and audit design.',
    k06: 'Product overview (PDF)',
    k07: 'A concise overview of Zuraio AI Hub for sharing with colleagues — use cases, data control and deployment options.',
    k08: 'A verified list of supported integrations by category and status — replacing placeholder content on the integrations page.',
    k09: 'Press and media.',
    k10: 'Logo assets, brand guidelines, company boilerplate and approved photography for media use.',
    k11: 'Company fact sheet',
    k12: 'Key facts about Zuraio — founding story, product positioning and contact details for journalists.',
    k13: 'On the website',
    k14: 'Available now on this site.',
    k15: 'How it helps',
    k16: 'Practical use cases by workflow and business role.',
    k17: 'Data ownership, access, encryption and deployment links.',
    k18: 'Architecture diagram, request flow and implementation approach.',
    k19: 'Common questions about Zuraio, data control and getting started.',
    k20: 'Transparency, oversight and limitations.',
    k21: 'Book a demo',
    k22: 'Request a private conversation about your company setup.',
    k23: 'Need something specific?',
    k24: 'Contact us and we can share relevant materials for your evaluation.',
    k25: 'Get in touch',
  },
};
