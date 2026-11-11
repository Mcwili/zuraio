/** Alternative homepage copy (DE + EN). Self-contained; no imports from copy-de/en. */

export const ALT_HOME_LOCALES = ['de', 'en', 'fr', 'it'];

export const copyAltHome = {
  de: {
    metaTitle: 'Zuraio | KI, die Ihr Unternehmen kennt',
    nav: {
      howItWorks: 'So hilft Zuraio',
      skills: 'Skills',
      security: 'Sicherheit',
      about: 'Über uns',
      bookDemo: 'Demo buchen',
    },
    hero: {
      eyebrow: 'KI-Assistent für Schweizer KMU',
      headlineLines: [
        'KI, die Ihr Unternehmen kennt.',
        'Ihre Daten bleiben in der Schweiz.',
      ],
      variants: {
        a: 'KI, die Ihr Unternehmen kennt. Ihre Daten bleiben in der Schweiz.',
        c: 'Ihr Team nutzt KI längst. Wissen Sie, wo Ihre Daten landen?',
        h: 'Ein KI-Assistent, eingerichtet für Ihren Betrieb. Von Menschen, die sich die Zeit nehmen, ihn zu verstehen.',
      },
      sub: 'Zuraio beantwortet E-Mails, bereitet Sitzungen vor und findet, was Sie im Wissen Ihres Unternehmens brauchen, immer mit Quellen.',
      cta: '30-Minuten-Demo buchen',
      ctaMicro: 'Mit Ihren eigenen Beispielen. Unverbindlich.',
      trust: [
        'Gehostet bei Infomaniak in der Schweiz',
        'ISO 27001:2022',
        'Arbeitet mit bexio, Abacus und Microsoft 365',
      ],
      imageAlt:
        'Zuraio entwirft aus drei Quellen eine Antwort auf eine Kunden-E-Mail und markiert einen fehlenden Preis zur Prüfung vor dem Versand',
    },
    reasons: {
      cards: [
        {
          title: 'Kennt Ihren Betrieb bereits.',
          body: 'Antworten aus Ihren E-Mails, Dokumenten und Systemen, jede mit Quelle.',
        },
        {
          title: 'Sie entscheiden, wohin Ihre Daten gehen.',
          body: 'Jedes KI-Modell ist gekennzeichnet. Was die Schweiz verlässt, entscheiden Sie.',
        },
        {
          title: 'Skills, gemeinsam mit Ihnen entwickelt.',
          body: 'Fertige Skills ab dem ersten Tag. Danach entwickeln wir mit Ihrem Team Ihre eigenen.',
        },
      ],
    },
    skills: {
      eyebrow: 'FÜR ARCHITEKTUR- UND INGENIEURBÜROS, TREUHÄNDER UND IMMOBILIENVERWALTUNGEN',
      eyebrowShort: 'FÜR ARCHITEKTEN, TREUHÄNDER UND VERWALTUNGEN',
      heading: 'Ab dem ersten Tag nützlich. Dann so eingerichtet, wie Sie arbeiten.',
      intro:
        'Zuraio arbeitet mit Skills: Aufgaben, die Zuraio erledigen kann. Einige sind von Anfang an bereit. Andere bauen wir mit Ihrem Team, aus Ihren Vorlagen, Regeln und Ihrem Ton.',
      footer: 'Wir beginnen mit einer Aufgabe, die Ihnen wichtig ist.',
      link: 'Alle Skills ansehen →',
      linkHref: '../how-it-helps.html#skills',
    },
    integrations: {
      heading: 'Arbeitet mit den Systemen, die Schweizer KMU wirklich nutzen.',
      line: 'Ihr Team arbeitet weiter in Microsoft Outlook und Microsoft Teams.',
      link: 'Alle Integrationen →',
    },
    sameQuestion: {
      eyebrow: 'DAS WISSEN IHRES UNTERNEHMENS',
      heading: 'Gleiche Frage. Andere Antwort.',
      intro: 'Allgemeine KI-Tools sind klug. Aber sie wissen nur, was sie sehen.',
      questionLabel: 'Die Frage',
      question:
        'Hat die Muster AG die letzte Rechnung bezahlt, und was haben wir zum Jahresabschluss vereinbart?',
      leftLabel: 'Ohne Zugriff auf Ihre Systeme',
      leftAnswer:
        'Ich habe keinen Zugriff auf Ihre Rechnungen oder Ihre Vereinbarungen mit der Muster AG.',
      rightLabel: 'Zuraio',
      rightAnswer:
        'Die Rechnung vom 30. September ist in bexio offen (fällig am 30. Oktober). Jahresabschluss bis 30. April, zum Pauschalpreis; die Lohnbuchhaltung wird separat verrechnet.',
      sourcesLabel: 'Quellen',
      sourceChips: ['bexio · Rechnung 2026-118', 'Mandatsvertrag · 12. März'],
      closing: 'Der Unterschied ist nicht die KI. Sondern was sie über Ihr Unternehmen weiss.',
      link: 'So unterscheiden wir uns von ChatGPT und Copilot →',
      linkAnchor: 'chatgpt-copilot',
    },
    aiTrademark:
      'ChatGPT ist eine Marke von OpenAI. Copilot und Microsoft 365 sind Marken von Microsoft. Claude ist eine Marke von Anthropic.',
    control: {
      eyebrow: 'DATENKONTROLLE',
      heading: 'Nichts verlässt den Betrieb ohne Ihr OK.',
      intro: 'Standardmässig Schweiz. Nie abhängig von einem einzigen KI-Anbieter.',
      introSupport:
        'Ändert ein Anbieter Preise, Bedingungen oder Verfügbarkeit, wechseln Sie das Modell. Ihre Daten und Ihre Skills bleiben bei Ihnen.',
      cards: [
        {
          title: 'Schweizer Hosting, Ihre Wahl der KI',
          body: 'Gehostet bei Infomaniak in der Schweiz (ISO 27001:2022). Andere KI-Modelle sind gekennzeichnet; nur der Inhalt dieser Aufgabe geht dorthin.',
        },
        {
          title: 'Zugriff nach Ihren Regeln',
          body: 'Mitarbeitende sehen nur, was sie schon heute sehen dürfen.',
        },
        {
          title: 'Jede Antwort zeigt ihre Quelle',
          body: 'Prüfen, bevor man sich darauf verlässt.',
        },
        {
          title: 'Klar nachvollziehbar',
          body: 'Wer gefragt hat, welche Quellen genutzt wurden, wer freigegeben hat.',
        },
      ],
      note: 'Sie arbeiten mit einem IT-Partner? Wir beziehen ihn ab dem ersten Gespräch ein, auch für eigene Server oder ein bestimmtes KI-Modell.',
      itLink: 'Für Ihren IT-Partner: technische Details →',
      itHref: '../technical-architecture.html',
    },
    start: {
      heading: 'Klein anfangen. Gemeinsam aufbauen.',
      cta: '30-Minuten-Demo buchen',
      steps: [
        {
          title: 'Gespräch',
          meta: '30 Min.',
          body: 'Wir wählen eine Aufgabe, die sich lohnt.',
        },
        {
          title: 'Einrichtungs-Workshop',
          meta: '3 Stunden',
          body: 'Wir bauen mit Ihrem Team den ersten Skill, mit Ihren Daten.',
        },
        {
          title: 'Nutzen und verfeinern',
          meta: '2 Wochen',
          body: 'Ihr Team arbeitet damit. Danach schauen wir es gemeinsam an.',
        },
        {
          title: 'Entscheiden',
          meta: 'Ihre Wahl',
          body: 'Behalten, ausbauen oder aufhören.',
          tone: 'exit',
        },
      ],
    },
    team: {
      heading: 'Entwickelt in der Schweiz. Von Menschen, die Ihnen antworten.',
      body: 'Wir haben Zuraio gebaut, weil KI zwar Antworten schreiben konnte, aber unser Firmenwissen, unsere Zugriffsregeln und unsere Arbeitsweise nicht verstand.',
      contact: 'Schreiben Sie uns direkt. Sie erhalten eine Antwort von einem von uns.',
      contactFollowUp: 'Wir antworten in Tagen, nicht in Wochen.',
      people: [
        { name: 'Michael C. Wili', role: '', email: 'michael.wili@zuraio.ch', img: 'Michael' },
        { name: 'Marcelo Zanette', role: '', email: 'marcelo.zanette@zuraio.ch', img: 'Marcelo' },
        { name: 'Samuel A. Polley', role: '', email: 'samuel.polley@zuraio.ch', img: 'Samuel' },
        { name: 'Roland Steiner', role: '', email: 'roland.steiner@zuraio.ch', img: 'Roland' },
      ],
    },
    closing: {
      heading: 'Was könnte Zuraio Ihnen abnehmen?',
      cta: '30-Minuten-Demo buchen',
      tagline: 'Ihr Betrieb. Ihre Informationen. Ihr OK.',
    },
    footerTrademark:
      'Microsoft, Microsoft 365, Outlook, SharePoint, Teams, Exchange und Dynamics 365 sind Marken der Microsoft-Unternehmensgruppe. bexio, Abacus, Klara, Proffix, SAP, Salesforce, HubSpot, Odoo und Sage sind Marken ihrer jeweiligen Inhaber.',
  },
  en: {
    metaTitle: 'Zuraio | AI that knows your company',
    nav: {
      howItWorks: 'How it helps',
      skills: 'Skills',
      security: 'Security',
      about: 'About',
      bookDemo: 'Book a demo',
    },
    hero: {
      eyebrow: 'AI assistant for Swiss SMEs',
      headlineLines: [
        'AI that knows your company.',
        'Your data stays in Switzerland.',
      ],
      variants: {
        a: 'AI that knows your company. Your data stays in Switzerland.',
        c: 'Your team already uses AI. Do you know where your data goes?',
        h: 'An AI assistant set up around your business, by people who take the time to understand it.',
      },
      sub: 'Zuraio answers emails, prepares meetings and finds what you need in your company knowledge, always with sources.',
      cta: 'Book a 30-minute demo',
      ctaMicro: 'With your own examples. No commitment.',
      trust: [
        'Hosted by Infomaniak in Switzerland',
        'ISO 27001:2022',
        'Works with bexio, Abacus and Microsoft 365',
      ],
      imageAlt:
        'Zuraio drafts a reply to a client email from three sources and flags a missing price for you to check before sending',
    },
    reasons: {
      cards: [
        {
          title: 'Already knows your business.',
          body: 'Answers from your emails, documents and systems, each with its source.',
        },
        {
          title: 'You decide where your data goes.',
          body: 'Every AI model is labelled. You decide what leaves Switzerland.',
        },
        {
          title: 'Skills built with you.',
          body: 'Ready-made skills from day one. Then we build your own with your team.',
        },
      ],
    },
    skills: {
      eyebrow: 'FOR ARCHITECTURE AND ENGINEERING OFFICES, FIDUCIARIES AND PROPERTY MANAGERS',
      eyebrowShort: 'BUILT FOR ARCHITECTS, FIDUCIARIES AND PROPERTY MANAGERS',
      heading: 'Useful from day one. Then set up the way you work.',
      intro:
        'Zuraio works with skills: tasks it knows how to do. Some are ready from the start. Others we build with your team, from your templates, rules and tone.',
      footer: 'We start with one task that matters to you.',
      link: 'See all skills →',
      linkHref: '../how-it-helps.html#skills',
    },
    integrations: {
      heading: 'Works with the systems Swiss SMEs actually use.',
      line: 'Your team keeps working in Microsoft Outlook and Microsoft Teams.',
      link: 'All integrations →',
    },
    sameQuestion: {
      eyebrow: 'YOUR COMPANY\'S KNOWLEDGE',
      heading: 'Same question. Different answer.',
      intro: 'General AI tools are smart. But they only know what they can see.',
      questionLabel: 'The question',
      question:
        'Has Muster AG paid the last invoice, and what did we agree about the year-end close?',
      leftLabel: 'Without access to your systems',
      leftAnswer:
        'I don\'t have access to your invoices or your agreements with Muster AG.',
      rightLabel: 'Zuraio',
      rightAnswer:
        'The invoice from 30 September is open in bexio (due 30 October). Year-end close by 30 April, at a fixed fee; payroll is billed separately.',
      sourcesLabel: 'Sources',
      sourceChips: ['bexio · Invoice 2026-118', 'Engagement letter · 12 March'],
      closing: 'The difference isn\'t the AI. It\'s what the AI knows about your company.',
      link: 'See how we compare to ChatGPT and Copilot →',
      linkAnchor: 'chatgpt-copilot',
    },
    aiTrademark:
      'ChatGPT is a trademark of OpenAI. Copilot and Microsoft 365 are trademarks of Microsoft. Claude is a trademark of Anthropic.',
    control: {
      eyebrow: 'DATA CONTROL',
      heading: 'Nothing leaves your company without your OK.',
      intro: 'Swiss by default. Never locked into a single AI provider.',
      introSupport:
        'If a provider changes its prices, terms or availability, you switch models. Your data and your skills stay with you.',
      cards: [
        {
          title: 'Swiss hosting, your choice of AI',
          body: 'Hosted by Infomaniak in Switzerland (ISO 27001:2022). Other AI models are labelled, and only that task\'s content goes to them.',
        },
        {
          title: 'Access follows your rules',
          body: 'People only see what they\'re already allowed to see.',
        },
        {
          title: 'Every answer shows its source',
          body: 'Check before you rely on it.',
        },
        {
          title: 'A clear record',
          body: 'Who asked, which sources were used, who approved the result.',
        },
      ],
      note: 'Working with an IT partner? We involve them from the first call, including for on-premise options or a specific AI model.',
      itLink: 'For your IT partner: technical details →',
      itHref: '../technical-architecture.html',
    },
    start: {
      heading: 'Start small. Build it together.',
      cta: 'Book a 30-minute demo',
      steps: [
        {
          title: 'Talk',
          meta: '30 min',
          body: 'We pick one task worth improving.',
        },
        {
          title: 'Set-up workshop',
          meta: '3 hours',
          body: 'We build your first skill with your team, on your data.',
        },
        {
          title: 'Use and refine',
          meta: '2 weeks',
          body: 'Your team works with it. Then we review it together.',
        },
        {
          title: 'Decide',
          meta: 'Your call',
          body: 'Keep it, expand it or stop.',
          tone: 'exit',
        },
      ],
    },
    team: {
      heading: 'Developed in Switzerland, by people who answer.',
      body: 'We built Zuraio because AI could write answers but didn\'t understand our company knowledge, access rules or the way we work.',
      contact: 'Write to us directly. You\'ll get a reply from one of us.',
      contactFollowUp: 'We reply in days, not weeks.',
      people: [
        { name: 'Michael C. Wili', role: '', email: 'michael.wili@zuraio.ch', img: 'Michael' },
        { name: 'Marcelo Zanette', role: '', email: 'marcelo.zanette@zuraio.ch', img: 'Marcelo' },
        { name: 'Samuel A. Polley', role: '', email: 'samuel.polley@zuraio.ch', img: 'Samuel' },
        { name: 'Roland Steiner', role: '', email: 'roland.steiner@zuraio.ch', img: 'Roland' },
      ],
    },
    closing: {
      heading: 'What could Zuraio take off your plate?',
      cta: 'Book a 30-minute demo',
      tagline: 'Your company. Your information. Your OK.',
    },
    footerTrademark:
      'Microsoft, Microsoft 365, Outlook, SharePoint, Teams, Exchange and Dynamics 365 are trademarks of the Microsoft group of companies. bexio, Abacus, Klara, Proffix, SAP, Salesforce, HubSpot, Odoo and Sage are trademarks of their respective owners.',
  },
  fr: {
    metaTitle: 'Zuraio | L’IA qui connaît votre entreprise',
    nav: {
      howItWorks: 'Comment Zuraio aide',
      skills: 'Skills',
      security: 'Sécurité',
      about: 'À propos',
      bookDemo: 'Réserver une démo',
    },
    hero: {
      eyebrow: 'Assistant IA pour les PME suisses',
      headlineLines: [
        'L’IA qui connaît votre entreprise.',
        'Vos données restent en Suisse.',
      ],
      variants: {
        a: 'L’IA qui connaît votre entreprise. Vos données restent en Suisse.',
        c: 'Votre équipe utilise déjà l’IA. Savez-vous où vont vos données?',
        h: 'Un assistant IA configuré pour votre entreprise, par des personnes qui prennent le temps de la comprendre.',
      },
      sub: 'Zuraio répond aux e-mails, prépare les séances et trouve ce dont vous avez besoin dans les connaissances de votre entreprise, toujours avec les sources.',
      cta: 'Réserver une démo de 30 minutes',
      ctaMicro: 'Avec vos propres exemples. Sans engagement.',
      trust: [
        'Hébergé par Infomaniak en Suisse',
        'ISO 27001:2022',
        'Fonctionne avec bexio, Abacus et Microsoft 365',
      ],
      imageAlt:
        'Zuraio rédige une réponse à l’e-mail d’un client à partir de trois sources et signale un prix manquant à vérifier avant l’envoi',
    },
    reasons: {
      cards: [
        {
          title: 'Connaît déjà votre entreprise.',
          body: 'Des réponses tirées de vos e-mails, documents et systèmes, chacune avec sa source.',
        },
        {
          title: 'Vous décidez où vont vos données.',
          body: 'Chaque modèle d’IA est signalé. C’est vous qui décidez de ce qui quitte la Suisse.',
        },
        {
          title: 'Des skills développés avec vous.',
          body: 'Des skills prêts à l’emploi dès le premier jour. Ensuite, nous développons les vôtres avec votre équipe.',
        },
      ],
    },
    skills: {
      eyebrow: 'POUR LES BUREAUX D’ARCHITECTURE ET D’INGÉNIEURS, LES FIDUCIAIRES ET LES GÉRANCES IMMOBILIÈRES',
      eyebrowShort: 'POUR ARCHITECTES, FIDUCIAIRES ET GÉRANCES',
      heading: 'Utile dès le premier jour. Puis configuré selon votre façon de travailler.',
      intro:
        'Zuraio fonctionne avec des skills : des tâches que Zuraio sait accomplir. Certains sont prêts dès le départ. Les autres, nous les développons avec votre équipe, à partir de vos modèles, de vos règles et de votre ton.',
      footer: 'Nous commençons par une tâche qui compte pour vous.',
      link: 'Voir tous les skills →',
      linkHref: '../how-it-helps.html#skills',
    },
    integrations: {
      heading: 'Fonctionne avec les systèmes que les PME suisses utilisent vraiment.',
      line: 'Votre équipe continue de travailler dans Microsoft Outlook et Microsoft Teams.',
      link: 'Toutes les intégrations →',
    },
    sameQuestion: {
      eyebrow: 'LES CONNAISSANCES DE VOTRE ENTREPRISE',
      heading: 'Même question. Autre réponse.',
      intro: 'Les outils d’IA généralistes sont intelligents. Mais ils ne savent que ce qu’ils voient.',
      questionLabel: 'La question',
      question:
        'Muster SA a-t-elle payé la dernière facture, et qu’avons-nous convenu pour le bouclement annuel?',
      leftLabel: 'Sans accès à vos systèmes',
      leftAnswer:
        'Je n’ai pas accès à vos factures ni à vos accords avec Muster SA.',
      rightLabel: 'Zuraio',
      rightAnswer:
        'La facture du 30 septembre est ouverte dans bexio (échéance le 30 octobre). Bouclement annuel d’ici au 30 avril, à prix forfaitaire; les salaires sont facturés séparément.',
      sourcesLabel: 'Sources',
      sourceChips: ['bexio · Facture 2026-118', 'Lettre de mission · 12 mars'],
      closing: 'La différence n’est pas l’IA. C’est ce que l’IA sait de votre entreprise.',
      link: 'Comparaison avec ChatGPT et Copilot →',
      linkAnchor: 'chatgpt-copilot',
    },
    aiTrademark:
      'ChatGPT est une marque d’OpenAI. Copilot et Microsoft 365 sont des marques de Microsoft. Claude est une marque d’Anthropic.',
    control: {
      eyebrow: 'CONTRÔLE DES DONNÉES',
      heading: 'Rien ne quitte votre entreprise sans votre feu vert.',
      intro: 'Suisse par défaut. Jamais dépendant d’un seul fournisseur d’IA.',
      introSupport:
        'Si un fournisseur modifie ses prix, ses conditions ou sa disponibilité, vous changez de modèle. Vos données et vos skills restent chez vous.',
      cards: [
        {
          title: 'Hébergement suisse, IA de votre choix',
          body: 'Hébergé par Infomaniak en Suisse (ISO 27001:2022). Les autres modèles d’IA sont signalés, et seul le contenu de la tâche concernée leur est transmis.',
        },
        {
          title: 'L’accès suit vos règles',
          body: 'Chacun ne voit que ce qu’il a déjà le droit de voir.',
        },
        {
          title: 'Chaque réponse indique sa source',
          body: 'Vérifier avant de s’y fier.',
        },
        {
          title: 'Une traçabilité claire',
          body: 'Qui a posé la question, quelles sources ont été utilisées, qui a validé le résultat.',
        },
      ],
      note: 'Vous travaillez avec un partenaire informatique? Nous l’impliquons dès le premier entretien, y compris pour un hébergement sur vos propres serveurs ou un modèle d’IA précis.',
      itLink: 'Pour votre partenaire informatique : détails techniques →',
      itHref: '../technical-architecture.html',
    },
    start: {
      heading: 'Commencer petit. Construire ensemble.',
      cta: 'Réserver une démo de 30 minutes',
      steps: [
        {
          title: 'Entretien',
          meta: '30 min',
          body: 'Nous choisissons une tâche qui vaut la peine d’être améliorée.',
        },
        {
          title: 'Atelier de mise en place',
          meta: '3 heures',
          body: 'Nous développons votre premier skill avec votre équipe, sur vos données.',
        },
        {
          title: 'Utiliser et affiner',
          meta: '2 semaines',
          body: 'Votre équipe l’utilise. Ensuite, nous faisons le point ensemble.',
        },
        {
          title: 'Décider',
          meta: 'À vous de choisir',
          body: 'Le garder, l’étendre ou arrêter.',
          tone: 'exit',
        },
      ],
    },
    team: {
      heading: 'Développé en Suisse, par des personnes qui vous répondent.',
      body: 'Nous avons créé Zuraio parce que l’IA savait rédiger des réponses, mais ne comprenait ni les connaissances de notre entreprise, ni nos règles d’accès, ni notre façon de travailler.',
      contact: 'Écrivez-nous directement. L’un de nous vous répondra.',
      contactFollowUp: 'Nous répondons en quelques jours, pas en quelques semaines.',
      people: [
        { name: 'Michael C. Wili', role: '', email: 'michael.wili@zuraio.ch', img: 'Michael' },
        { name: 'Marcelo Zanette', role: '', email: 'marcelo.zanette@zuraio.ch', img: 'Marcelo' },
        { name: 'Samuel A. Polley', role: '', email: 'samuel.polley@zuraio.ch', img: 'Samuel' },
        { name: 'Roland Steiner', role: '', email: 'roland.steiner@zuraio.ch', img: 'Roland' },
      ],
    },
    closing: {
      heading: 'De quoi Zuraio pourrait-il vous décharger?',
      cta: 'Réserver une démo de 30 minutes',
      tagline: 'Votre entreprise. Vos informations. Votre feu vert.',
    },
    footerTrademark:
      'Microsoft, Microsoft 365, Outlook, SharePoint, Teams, Exchange et Dynamics 365 sont des marques du groupe Microsoft. bexio, Abacus, Klara, Proffix, SAP, Salesforce, HubSpot, Odoo et Sage sont des marques de leurs propriétaires respectifs.',
  },
  it: {
    metaTitle: 'Zuraio | L’IA che conosce la vostra azienda',
    nav: {
      howItWorks: 'Come aiuta Zuraio',
      skills: 'Skill',
      security: 'Sicurezza',
      about: 'Chi siamo',
      bookDemo: 'Prenotare una demo',
    },
    hero: {
      eyebrow: 'Assistente IA per le PMI svizzere',
      headlineLines: [
        'L’IA che conosce la vostra azienda.',
        'I vostri dati restano in Svizzera.',
      ],
      variants: {
        a: 'L’IA che conosce la vostra azienda. I vostri dati restano in Svizzera.',
        c: 'Il vostro team usa già l’IA. Sapete dove finiscono i vostri dati?',
        h: 'Un assistente IA configurato per la vostra azienda, da persone che si prendono il tempo di capirla.',
      },
      sub: 'Zuraio risponde alle e-mail, prepara le riunioni e trova ciò che vi serve nelle conoscenze della vostra azienda, sempre con le fonti.',
      cta: 'Prenotare una demo di 30 minuti',
      ctaMicro: 'Con i vostri esempi. Senza impegno.',
      trust: [
        'Hosting presso Infomaniak in Svizzera',
        'ISO 27001:2022',
        'Funziona con bexio, Abacus e Microsoft 365',
      ],
      imageAlt:
        'Zuraio prepara una risposta all’e-mail di un cliente partendo da tre fonti e segnala un prezzo mancante da verificare prima dell’invio',
    },
    reasons: {
      cards: [
        {
          title: 'Conosce già la vostra azienda.',
          body: 'Risposte dalle vostre e-mail, dai documenti e dai sistemi, ognuna con la sua fonte.',
        },
        {
          title: 'Siete voi a decidere dove vanno i dati.',
          body: 'Ogni modello di IA è contrassegnato. Siete voi a decidere cosa lascia la Svizzera.',
        },
        {
          title: 'Skill sviluppate con voi.',
          body: 'Skill pronte dal primo giorno. Poi sviluppiamo le vostre insieme al vostro team.',
        },
      ],
    },
    skills: {
      eyebrow: 'PER STUDI DI ARCHITETTURA E D’INGEGNERIA, FIDUCIARIE E AMMINISTRAZIONI IMMOBILIARI',
      eyebrowShort: 'PER ARCHITETTI, FIDUCIARIE E AMMINISTRAZIONI IMMOBILIARI',
      heading: 'Utile dal primo giorno. Poi configurato come lavorate voi.',
      intro:
        'Zuraio lavora con le skill: compiti che Zuraio sa svolgere. Alcune sono pronte fin dall’inizio. Altre le sviluppiamo con il vostro team, partendo dai vostri modelli, dalle vostre regole e dal vostro tono.',
      footer: 'Iniziamo con un compito che per voi conta.',
      link: 'Vedere tutte le skill →',
      linkHref: '../how-it-helps.html#skills',
    },
    integrations: {
      heading: 'Funziona con i sistemi che le PMI svizzere usano davvero.',
      line: 'Il vostro team continua a lavorare in Microsoft Outlook e Microsoft Teams.',
      link: 'Tutte le integrazioni →',
    },
    sameQuestion: {
      eyebrow: 'LE CONOSCENZE DELLA VOSTRA AZIENDA',
      heading: 'Stessa domanda. Risposta diversa.',
      intro: 'Gli strumenti di IA generici sono intelligenti. Ma sanno solo ciò che vedono.',
      questionLabel: 'La domanda',
      question:
        'Muster SA ha pagato l’ultima fattura, e cosa abbiamo concordato per la chiusura annuale?',
      leftLabel: 'Senza accesso ai vostri sistemi',
      leftAnswer:
        'Non ho accesso alle vostre fatture né agli accordi con Muster SA.',
      rightLabel: 'Zuraio',
      rightAnswer:
        'La fattura del 30 settembre è aperta in bexio (scadenza 30 ottobre). Chiusura annuale entro il 30 aprile, a forfait; la contabilità salariale viene fatturata a parte.',
      sourcesLabel: 'Fonti',
      sourceChips: ['bexio · Fattura 2026-118', 'Lettera d’incarico · 12 marzo'],
      closing: 'La differenza non è l’IA. È ciò che l’IA sa della vostra azienda.',
      link: 'Il confronto con ChatGPT e Copilot →',
      linkAnchor: 'chatgpt-copilot',
    },
    aiTrademark:
      'ChatGPT è un marchio di OpenAI. Copilot e Microsoft 365 sono marchi di Microsoft. Claude è un marchio di Anthropic.',
    control: {
      eyebrow: 'CONTROLLO DEI DATI',
      heading: 'Nulla lascia la vostra azienda senza il vostro via libera.',
      intro: 'Svizzera per impostazione predefinita. Mai vincolati a un solo fornitore di IA.',
      introSupport:
        'Se un fornitore cambia prezzi, condizioni o disponibilità, cambiate modello. I vostri dati e le vostre skill restano da voi.',
      cards: [
        {
          title: 'Hosting svizzero, IA a vostra scelta',
          body: 'Hosting presso Infomaniak in Svizzera (ISO 27001:2022). Gli altri modelli di IA sono contrassegnati, e ricevono solo il contenuto del compito in questione.',
        },
        {
          title: 'L’accesso segue le vostre regole',
          body: 'Ognuno vede solo ciò che ha già il permesso di vedere.',
        },
        {
          title: 'Ogni risposta mostra la sua fonte',
          body: 'Verificare prima di fidarsi.',
        },
        {
          title: 'Una tracciabilità chiara',
          body: 'Chi ha chiesto, quali fonti sono state usate, chi ha approvato il risultato.',
        },
      ],
      note: 'Lavorate con un partner informatico? Lo coinvolgiamo fin dal primo colloquio, anche per un hosting sui vostri server o per un modello di IA specifico.',
      itLink: 'Per il vostro partner informatico: dettagli tecnici →',
      itHref: '../technical-architecture.html',
    },
    start: {
      heading: 'Iniziare in piccolo. Costruire insieme.',
      cta: 'Prenotare una demo di 30 minuti',
      steps: [
        {
          title: 'Colloquio',
          meta: '30 min',
          body: 'Scegliamo un compito che vale la pena migliorare.',
        },
        {
          title: 'Workshop di configurazione',
          meta: '3 ore',
          body: 'Sviluppiamo la vostra prima skill con il vostro team, sui vostri dati.',
        },
        {
          title: 'Usare e perfezionare',
          meta: '2 settimane',
          body: 'Il vostro team la usa. Poi facciamo il punto insieme.',
        },
        {
          title: 'Decidere',
          meta: 'A voi la scelta',
          body: 'Tenerla, ampliarla o fermarsi.',
          tone: 'exit',
        },
      ],
    },
    team: {
      heading: 'Sviluppato in Svizzera, da persone che vi rispondono.',
      body: 'Abbiamo creato Zuraio perché l’IA sapeva scrivere risposte, ma non capiva le conoscenze della nostra azienda, le nostre regole di accesso né il nostro modo di lavorare.',
      contact: 'Scriveteci direttamente. Vi risponderà uno di noi.',
      contactFollowUp: 'Rispondiamo in pochi giorni, non in settimane.',
      people: [
        { name: 'Michael C. Wili', role: '', email: 'michael.wili@zuraio.ch', img: 'Michael' },
        { name: 'Marcelo Zanette', role: '', email: 'marcelo.zanette@zuraio.ch', img: 'Marcelo' },
        { name: 'Samuel A. Polley', role: '', email: 'samuel.polley@zuraio.ch', img: 'Samuel' },
        { name: 'Roland Steiner', role: '', email: 'roland.steiner@zuraio.ch', img: 'Roland' },
      ],
    },
    closing: {
      heading: 'Di cosa potrebbe sgravarvi Zuraio?',
      cta: 'Prenotare una demo di 30 minuti',
      tagline: 'La vostra azienda. Le vostre informazioni. Il vostro via libera.',
    },
    footerTrademark:
      'Microsoft, Microsoft 365, Outlook, SharePoint, Teams, Exchange e Dynamics 365 sono marchi del gruppo Microsoft. bexio, Abacus, Klara, Proffix, SAP, Salesforce, HubSpot, Odoo e Sage sono marchi dei rispettivi titolari.',
  },

};

export function getAltHomeCopy(locale) {
  return copyAltHome[locale] ?? copyAltHome.en;
}
