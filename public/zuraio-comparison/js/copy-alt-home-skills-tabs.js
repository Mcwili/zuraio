/** Homepage #skills sector tabs (EN + DE). Documents are rendered in alt-skills-sector.js */

export const SKILLS_TAB_IDS = ['architecture', 'fiduciary', 'property'];

export const skillsTabsMeta = {
  en: {
    tablistLabel: 'Choose your sector',
    legendHeading: "What's yours",
    docCaption: 'Example with invented data',
    imageTapHint: 'Tap to enlarge',
    workshopLine: 'Ready-made to start. Set up with your team in a workshop.',
    tabs: [
      { id: 'architecture', label: 'Architecture & engineering', hash: 'skills-architecture' },
      { id: 'fiduciary', label: 'Fiduciary', hash: 'skills-fiduciary' },
      { id: 'property', label: 'Property management', hash: 'skills-property' },
    ],
    panels: {
      architecture: {
        title: 'Quote in your house format',
        body:
          'Zuraio drafts the quote from the enquiry, with your fee structure, discount rules and terms. You check it and send it.',
        imageAlt:
          'Zuraio drafts a quote for the Brunner family in your house format, with your discount rule and standard terms, and flags a garage that isn\'t in the scope yet.',
        usesLabel: 'Uses:',
        sources: ['Enquiry', 'Price list', 'bexio'],
        badge: 'Draft',
        highlights: [
          { n: 1, label: 'Your house format' },
          { n: 2, label: 'Your discount rule' },
          { n: 3, label: 'Your standard terms' },
        ],
      },
      fiduciary: {
        title: 'Monthly client report, the way your partners like it',
        body:
          'Figures from Abacus and open points from your emails, in the structure your partners expect.',
        imageAlt:
          'Zuraio prepares the monthly report for Muster AG from Abacus and your emails, and flags two supplier invoices that aren\'t booked yet.',
        usesLabel: 'Uses:',
        sources: ['Abacus', 'Emails', 'Last report'],
        badge: 'Draft',
        highlights: [
          { n: 1, label: "Your partners' structure" },
          { n: 2, label: 'From Abacus' },
          { n: 3, label: 'Your wording' },
        ],
      },
      property: {
        title: 'Replies to tenants in your tone',
        body:
          "Answers from the tenant's message, the house rules and your standard clauses. Nothing goes out without your OK.",
        imageAlt:
          'Zuraio drafts a reply to a tenant in your tone, quotes your house rules and waits for your OK.',
        usesLabel: 'Uses:',
        sources: ['Tenant email', 'House rules', 'Your templates'],
        badge: 'Draft · not sent',
        highlights: [
          { n: 1, label: 'Your tone' },
          { n: 2, label: 'Your standard clause' },
          { n: 3, label: 'Waits for your OK' },
        ],
      },
    },
  },
  de: {
    tablistLabel: 'Branche wählen',
    legendHeading: 'Was Ihres ist',
    docCaption: 'Beispiel mit erfundenen Daten',
    imageTapHint: 'Zum Vergrössern tippen',
    workshopLine: 'Fertig zum Start. Mit Ihrem Team in einem Workshop eingerichtet.',
    tabs: [
      { id: 'architecture', label: 'Architektur & Ingenieurwesen', hash: 'skills-architecture' },
      { id: 'fiduciary', label: 'Treuhand', hash: 'skills-fiduciary' },
      { id: 'property', label: 'Liegenschaftsverwaltung', hash: 'skills-property' },
    ],
    panels: {
      architecture: {
        title: 'Offerte in Ihrem Hausformat',
        body:
          'Zuraio entwirft die Offerte aus der Anfrage, mit Ihrer Honorarstruktur, Ihren Rabattregeln und Ihren Bedingungen. Sie prüfen und versenden sie.',
        imageAlt:
          'Zuraio entwirft eine Offerte für die Familie Brunner in Ihrem Hausformat, mit Ihrer Rabattregel und Ihren Standardbedingungen, und markiert eine Garage, die noch nicht im Leistungsumfang ist.',
        usesLabel: 'Nutzt:',
        sources: ['Anfrage', 'Preisliste', 'bexio'],
        badge: 'Entwurf',
        highlights: [
          { n: 1, label: 'Ihr Hausformat' },
          { n: 2, label: 'Ihre Rabattregel' },
          { n: 3, label: 'Ihre Standardbedingungen' },
        ],
      },
      fiduciary: {
        title: 'Monatsreport für Mandanten, so wie Ihre Partner ihn wollen',
        body:
          'Zahlen aus Abacus und offene Punkte aus Ihren E-Mails, in der Struktur, die Ihre Partner erwarten.',
        imageAlt:
          'Zuraio bereitet den Monatsreport für die Muster AG aus Abacus und Ihren E-Mails vor und markiert zwei Lieferantenrechnungen, die noch nicht verbucht sind.',
        usesLabel: 'Nutzt:',
        sources: ['Abacus', 'E-Mails', 'Letzter Report'],
        badge: 'Entwurf',
        highlights: [
          { n: 1, label: 'Struktur Ihrer Partner' },
          { n: 2, label: 'Aus Abacus' },
          { n: 3, label: 'Ihre Formulierung' },
        ],
      },
      property: {
        title: 'Antworten an Mieter in Ihrem Ton',
        body:
          'Antworten aus der Nachricht, der Hausordnung und Ihren Standardklauseln. Nichts geht ohne Ihre Freigabe raus.',
        imageAlt:
          'Zuraio entwirft eine Antwort an eine Mieterin in Ihrem Ton, zitiert Ihre Hausordnung und wartet auf Ihre Freigabe.',
        usesLabel: 'Nutzt:',
        sources: ['Mieter-E-Mail', 'Hausordnung', 'Ihre Vorlagen'],
        badge: 'Entwurf · nicht gesendet',
        highlights: [
          { n: 1, label: 'Ihr Ton' },
          { n: 2, label: 'Ihre Standardklausel' },
          { n: 3, label: 'Wartet auf Ihre Freigabe' },
        ],
      },
    },
  },
  fr: {
    tablistLabel: 'Choisir votre secteur',
    legendHeading: 'Ce qui vous est propre',
    docCaption: 'Exemple avec des données fictives',
    imageTapHint: 'Toucher pour agrandir',
    workshopLine: 'Prêt à l’emploi au départ. Configuré avec votre équipe lors d’un atelier.',
    tabs: [
      { id: 'architecture', label: 'Architecture et ingénierie', hash: 'skills-architecture' },
      { id: 'fiduciary', label: 'Fiduciaire', hash: 'skills-fiduciary' },
      { id: 'property', label: 'Gérance immobilière', hash: 'skills-property' },
    ],
    panels: {
      architecture: {
        title: 'Une offre dans votre format maison',
        body:
          'Zuraio rédige l’offre à partir de la demande, avec votre structure d’honoraires, vos règles de rabais et vos conditions. Vous la vérifiez et l’envoyez.',
        imageAlt:
          'Zuraio rédige une offre pour la famille Brunner dans votre format maison, avec votre règle de rabais et vos conditions standard, et signale un garage qui n’est pas encore dans le périmètre.',
        usesLabel: 'Utilise :',
        sources: ['Demande', 'Liste de prix', 'bexio'],
        badge: 'Brouillon',
        highlights: [
          { n: 1, label: 'Votre format maison' },
          { n: 2, label: 'Votre règle de rabais' },
          { n: 3, label: 'Vos conditions standard' },
        ],
      },
      fiduciary: {
        title: 'Le rapport mensuel client, tel que vos associés l’aiment',
        body:
          'Les chiffres d’Abacus et les points ouverts de vos e-mails, dans la structure qu’attendent vos associés.',
        imageAlt:
          'Zuraio prépare le rapport mensuel pour Muster AG à partir d’Abacus et de vos e-mails, et signale deux factures fournisseurs qui ne sont pas encore comptabilisées.',
        usesLabel: 'Utilise :',
        sources: ['Abacus', 'E-mails', 'Dernier rapport'],
        badge: 'Brouillon',
        highlights: [
          { n: 1, label: 'La structure de vos associés' },
          { n: 2, label: 'Tiré d’Abacus' },
          { n: 3, label: 'Votre formulation' },
        ],
      },
      property: {
        title: 'Des réponses aux locataires dans votre ton',
        body:
          'Des réponses tirées du message du locataire, du règlement de maison et de vos clauses standard. Rien ne part sans votre feu vert.',
        imageAlt:
          'Zuraio rédige une réponse à une locataire dans votre ton, cite votre règlement de maison et attend votre feu vert.',
        usesLabel: 'Utilise :',
        sources: ['E-mail du locataire', 'Règlement de maison', 'Vos modèles'],
        badge: 'Brouillon · non envoyé',
        highlights: [
          { n: 1, label: 'Votre ton' },
          { n: 2, label: 'Votre clause standard' },
          { n: 3, label: 'Attend votre feu vert' },
        ],
      },
    },
  },
  it: {
    tablistLabel: 'Scegliete il vostro settore',
    legendHeading: 'Ciò che è vostro',
    docCaption: 'Esempio con dati inventati',
    imageTapHint: 'Tocca per ingrandire',
    workshopLine: 'Pronte per iniziare. Configurate con il vostro team in un workshop.',
    tabs: [
      { id: 'architecture', label: 'Architettura e ingegneria', hash: 'skills-architecture' },
      { id: 'fiduciary', label: 'Fiduciaria', hash: 'skills-fiduciary' },
      { id: 'property', label: 'Amministrazione immobiliare', hash: 'skills-property' },
    ],
    panels: {
      architecture: {
        title: 'Offerta nel vostro formato aziendale',
        body:
          'Zuraio prepara l’offerta partendo dalla richiesta, con la vostra struttura degli onorari, le vostre regole di sconto e le vostre condizioni. Voi la verificate e la inviate.',
        imageAlt:
          'Zuraio prepara un’offerta per la famiglia Brunner nel vostro formato aziendale, con la vostra regola di sconto e le vostre condizioni standard, e segnala un garage che non è ancora nel perimetro.',
        usesLabel: 'Usa:',
        sources: ['Richiesta', 'Listino prezzi', 'bexio'],
        badge: 'Bozza',
        highlights: [
          { n: 1, label: 'Il vostro formato aziendale' },
          { n: 2, label: 'La vostra regola di sconto' },
          { n: 3, label: 'Le vostre condizioni standard' },
        ],
      },
      fiduciary: {
        title: 'Il rapporto mensile per i clienti, come piace ai vostri soci',
        body:
          'Cifre da Abacus e punti aperti dalle vostre e-mail, nella struttura che i vostri soci si aspettano.',
        imageAlt:
          'Zuraio prepara il rapporto mensile per Muster AG da Abacus e dalle vostre e-mail, e segnala due fatture fornitori che non sono ancora registrate.',
        usesLabel: 'Usa:',
        sources: ['Abacus', 'E-mail', 'Ultimo rapporto'],
        badge: 'Bozza',
        highlights: [
          { n: 1, label: 'La struttura dei vostri soci' },
          { n: 2, label: 'Da Abacus' },
          { n: 3, label: 'La vostra formulazione' },
        ],
      },
      property: {
        title: 'Risposte agli inquilini con il vostro tono',
        body:
          'Risposte dal messaggio dell’inquilino, dal regolamento della casa e dalle vostre clausole standard. Nulla parte senza il vostro via libera.',
        imageAlt:
          'Zuraio prepara una risposta a un’inquilina con il vostro tono, cita il vostro regolamento della casa e attende il vostro via libera.',
        usesLabel: 'Usa:',
        sources: ['E-mail dell’inquilino', 'Regolamento della casa', 'I vostri modelli'],
        badge: 'Bozza · non inviata',
        highlights: [
          { n: 1, label: 'Il vostro tono' },
          { n: 2, label: 'La vostra clausola standard' },
          { n: 3, label: 'Attende il vostro via libera' },
        ],
      },
    },
  },

};

export function getSkillsTabsMeta(locale) {
  return skillsTabsMeta[locale] ?? skillsTabsMeta.en;
}
