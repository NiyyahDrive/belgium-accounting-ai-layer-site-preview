window.DEMO_DATA = {
  metrics: [
    { label: 'Actieve demo-dossiers', value: '36', tone: 'neutral', detail: 'pilotteam / juni-close' },
    { label: 'Open blockers', value: '7', tone: 'risk', detail: '3 met partnerimpact' },
    { label: 'Te late klantrequests', value: '5', tone: 'warn', detail: 'gemiddeld 2,4 dagen over SLA' },
    { label: 'Reviewer summaries klaar', value: '24', tone: 'good', detail: '12 wachten op laatste stukken' }
  ],
  flow: [
    'Start in de kantoorcockpit: toon waar de close stokt.',
    'Open het request center: laat zien dat opvolging niet meer in mailbox-chaos zit.',
    'Klik een dossier open: ontbrekende stukken, findings en bronnen staan samen.',
    'Ga naar de close cockpit: escalaties en partnerprioriteiten worden zichtbaar.',
    'Eindig met de AI-summary: reviewer keurt expliciet goed binnen dezelfde cockpit.'
  ],
  focusAreas: [
    'Juni-close voor vennootschapsdossiers',
    'BTW-voorbereiding met ontbrekende aankoopfacturen',
    'Partnerreview op uitzonderingen > €25k'
  ],
  blockers: [
    { label: 'Aankoopfacturen nog niet volledig', count: 3, tone: 'risk' },
    { label: 'Wachten op klantbevestiging leasing', count: 2, tone: 'warn' },
    { label: 'Partnerreview uitzonderingen open', count: 2, tone: 'neutral' }
  ],
  portfolio: [
    { dossierId: 'northwind', dossier: 'Northwind Logistics BV', owner: 'L. Peeters', period: 'Jun 2026', status: 'Blocker', progress: 68, blocker: '3 aankoopfacturen ontbreken', nextAction: 'Request 17 opvolgen', tone: 'risk' },
    { dossierId: 'atelier', dossier: 'Atelier Delta SRL', owner: 'S. Janssens', period: 'Jun 2026', status: 'Review', progress: 82, blocker: 'Partnercommentaar op omzetafwijking', nextAction: 'Reviewer summary valideren', tone: 'warn' },
    { dossierId: 'greenharbor', dossier: 'Green Harbor Group', owner: 'M. Verhelst', period: 'Jun 2026', status: 'Op schema', progress: 91, blocker: 'Geen kritieke blocker', nextAction: 'Close afronden', tone: 'good' },
    { dossierId: 'studio', dossier: 'Studio Rombaut CommV', owner: 'E. Claes', period: 'Jun 2026', status: 'Blocker', progress: 61, blocker: 'Leasingdocument nog open', nextAction: 'Klant bellen + upload vragen', tone: 'risk' }
  ],
  requests: [
    { id: 'REQ-17', client: 'Northwind Logistics BV', title: 'Ontbrekende aankoopfacturen april-juni', owner: 'L. Peeters', due: 'Vandaag 16:00', status: 'Open', priority: 'Hoog', channel: 'Gedeelde mailbox + portal', note: 'Herinnering klaar, wacht op klantupload.' },
    { id: 'REQ-21', client: 'Atelier Delta SRL', title: 'Toelichting omzetpiek Q2', owner: 'S. Janssens', due: 'Morgen 11:00', status: 'In review', priority: 'Midden', channel: 'Reviewer request', note: 'AI-samenvatting klaar, partnercheck nodig.' },
    { id: 'REQ-09', client: 'Studio Rombaut CommV', title: 'Leasingcontract wagenpark', owner: 'E. Claes', due: '2 dagen te laat', status: 'Escalatie', priority: 'Hoog', channel: 'Mailbox follow-up', note: 'Zonder dit document blijft balanscontrole rood.' },
    { id: 'REQ-05', client: 'Green Harbor Group', title: 'BTW-bijlage ondertekenen', owner: 'M. Verhelst', due: 'Vrijdag 14:00', status: 'Klaar voor verzending', priority: 'Laag', channel: 'Klantportal', note: 'Geen blocker voor close.' }
  ],
  dossiers: [
    {
      id: 'northwind',
      name: 'Northwind Logistics BV',
      period: 'Juni 2026',
      owner: 'L. Peeters',
      reviewer: 'S. De Smet',
      closeStatus: 'Blocker',
      confidence: 'Gecontroleerd voorstel, reviewer vereist',
      missingDocs: [
        '3 aankoopfacturen voor transportkosten',
        'Ondertekende leasingbijlage heftruck',
        'Bankattest voor uitzonderlijke terugbetaling'
      ],
      findings: [
        { severity: 'Hoog', title: 'Transportkosten 18% hoger dan vorige periode', detail: 'AI signaleert afwijking op basis van grootboek + aankoopboek; reviewer moet oorzaak bevestigen.' },
        { severity: 'Midden', title: 'Leasingkost geboekt zonder nieuw contract in documentbron', detail: 'Bronmatch ontbreekt; follow-up naar klant is automatisch voorbereid maar nog niet verzonden.' }
      ],
      sources: [
        'mailbox/ap-june-thread.msg',
        'docs/purchases-q2-map/',
        'ledger/jun-2026/transport-expenses.csv',
        'close-checklist/northwind-jun-2026'
      ],
      summary: {
        dossierType: 'Vennootschap',
        materiality: '€25.000',
        aiRecommendation: 'Niet vrijgeven voor close',
        partnerAction: 'Klantsignaal escaleren indien stukken morgen 11:00 niet binnen zijn'
      }
    },
    {
      id: 'atelier',
      name: 'Atelier Delta SRL',
      period: 'Juni 2026',
      owner: 'S. Janssens',
      reviewer: 'T. Wouters',
      closeStatus: 'Review',
      confidence: 'Sterke brondekking, partnercommentaar open',
      missingDocs: [
        'Klanttoelichting op omzetpiek Q2'
      ],
      findings: [
        { severity: 'Midden', title: 'Omzet Q2 14% boven forecast', detail: 'AI-highlight op managementcommentary voorbereid; partner moet bepalen of extra toelichting nodig is voor klantgesprek.' },
        { severity: 'Laag', title: 'Eén bankregel vraagt classificatiecheck', detail: 'Geen materiële impact, wel reviewpunt voor consistentie.' }
      ],
      sources: [
        'mailbox/revenue-question.msg',
        'docs/sales-q2-summary.pdf',
        'ledger/jun-2026/revenue-bridge.xlsx'
      ],
      summary: {
        dossierType: 'Creatief agentschap',
        materiality: '€15.000',
        aiRecommendation: 'Vrijgeven na partnercommentaar',
        partnerAction: 'Commentary voor klantcall aanvullen met Q2-context'
      }
    },
    {
      id: 'greenharbor',
      name: 'Green Harbor Group',
      period: 'Juni 2026',
      owner: 'M. Verhelst',
      reviewer: 'L. Vanneste',
      closeStatus: 'Op schema',
      confidence: 'Klaar voor afronding',
      missingDocs: [
        'Geen kritieke stukken open'
      ],
      findings: [
        { severity: 'Laag', title: 'BTW-bijlage wacht op finale handtekening', detail: 'Administratief, geen close-blocker.' }
      ],
      sources: [
        'portal/vat-appendix-signature.pdf',
        'close-checklist/green-harbor-jun-2026'
      ],
      summary: {
        dossierType: 'Holdingsstructuur',
        materiality: '€40.000',
        aiRecommendation: 'Klaar voor close',
        partnerAction: 'Klantupdate delen vanuit dezelfde cockpit'
      }
    },
    {
      id: 'studio',
      name: 'Studio Rombaut CommV',
      period: 'Juni 2026',
      owner: 'E. Claes',
      reviewer: 'P. Maes',
      closeStatus: 'Blocker',
      confidence: 'Eén materiële documentgap blokkeert close',
      missingDocs: [
        'Ondertekend leasingcontract wagenpark',
        'Bijlage met restwaarde-afspraken'
      ],
      findings: [
        { severity: 'Hoog', title: 'Balanscontrole voertuigen niet sluitend', detail: 'Afschrijving en leasingschema kunnen niet definitief bevestigd worden zonder contractbijlage.' },
        { severity: 'Midden', title: 'Klantfollow-up zit vandaag nog in gedeelde mailbox', detail: 'Demo toont waarom request center nodig is als centrale workflow bovenop mail + docs.' }
      ],
      sources: [
        'mailbox/leasing-follow-up.msg',
        'docs/fixed-assets/vehicle-register.xlsx',
        'close-checklist/studio-rombaut-jun-2026'
      ],
      summary: {
        dossierType: 'Creatieve diensten',
        materiality: '€18.000',
        aiRecommendation: 'Niet vrijgeven tot contract compleet is',
        partnerAction: 'Beslis of close verschuift of tijdelijke provisie nodig is'
      }
    }
  ],
  closeStages: [
    { name: 'Bronnen ingelezen', complete: 34, total: 36, tone: 'good' },
    { name: 'Requests afgewerkt', complete: 28, total: 36, tone: 'warn' },
    { name: 'Reviewer akkoord', complete: 24, total: 36, tone: 'warn' },
    { name: 'Partner-ready', complete: 19, total: 36, tone: 'risk' }
  ],
  escalations: [
    { client: 'Northwind Logistics BV', issue: 'Materiële aankoopfacturen ontbreken > 24u voor review cut-off', owner: 'L. Peeters', action: 'Escaleren naar klant-CFO indien geen upload tegen morgen 11:00.' },
    { client: 'Studio Rombaut CommV', issue: 'Leasingcontract ontbreekt waardoor balanscontrole open blijft', owner: 'E. Claes', action: 'Partner beslist of close verschuift of provisie nodig is.' },
    { client: 'Atelier Delta SRL', issue: 'Managementcommentary nog niet goedgekeurd voor klantbespreking', owner: 'T. Wouters', action: 'Partnerreview inplannen voor donderdag 09:00.' }
  ],
  aiSummary: {
    headline: 'Northwind Logistics BV kan nog niet veilig naar close worden doorgeschoven.',
    narrative: 'De cockpit combineert mailboxsignalen, documentmatching en grootboekafwijkingen in één reviewer summary. De AI-output stelt voor om de close niet vrij te geven totdat drie aankoopfacturen en een leasingbijlage bevestigd zijn. De reviewer behoudt volledige controle en ziet alle gebruikte bronnen in hetzelfde scherm.',
    tags: ['Blocker zichtbaar', 'Bronverwijzingen compleet', 'Reviewer approval verplicht'],
    controls: [
      'AI-samenvatting verwijst naar 4 concrete bronnen.',
      'Geen externe klantcommunicatie zonder expliciete approval gate.',
      'Reviewer kan finding per finding accepteren, aanpassen of verwerpen.',
      'Audit trail registreert samenvatting, edits en finale goedkeuring.'
    ],
    auditTrail: [
      { time: '08:42', actor: 'System', event: 'Mailboxthread en documentmap opnieuw gesynchroniseerd.' },
      { time: '08:47', actor: 'AI Layer', event: 'Reviewer summary gegenereerd met 2 findings en 4 bronlinks.' },
      { time: '09:05', actor: 'L. Peeters', event: 'Ontbrekende stukken gemarkeerd en follow-up voorbereid.' },
      { time: '09:18', actor: 'S. De Smet', event: 'Wacht op finale reviewbeslissing.' }
    ]
  }
};