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
  },

  // ── AI Klantdashboard-bouwer (NLP) ──────────────────────────────────────────
  // Gesimuleerde natural-language builder: het kantoor typt in gewone taal wat de
  // klant wil zien; de intent-engine bouwt een dashboard uit deze demo-data.
  dashboardBuilder: {
    months: ['Jan', 'Feb', 'Mrt', 'Apr', 'Mei', 'Jun'],
    quarters: ['Q1 2026', 'Q2 2026'],
    examplePrompts: [
      'Toon de omzet per maand voor dit jaar',
      'Vergelijk omzet en kosten per kwartaal',
      'Hoe staat de cashflow ervoor?',
      'Wat is de brutomarge en het rendement?',
      'Laat de openstaande klantfacturen zien',
      'Geef een BTW-overzicht voor de aangifte'
    ],
    // Per klant: maandreeksen in hele euro's (fictief, demo).
    clients: [
      {
        id: 'northwind', name: 'Northwind Logistics BV', sector: 'Transport & logistiek',
        series: {
          revenue:     [182000, 175000, 198000, 205000, 211000, 224000],
          costs:       [141000, 138000, 152000, 161000, 168000, 179000],
          cashflow:    [ 28000, -12000,  41000,  19000,  33000,  22000],
          vat:         [ 21000,  20100,  23400,  24100,  24800,  26300],
          receivables: [ 64000,  58000,  71000,  83000,  91000,  88000]
        }
      },
      {
        id: 'atelier', name: 'Atelier Delta SRL', sector: 'Creatief agentschap',
        series: {
          revenue:     [42000, 39000, 48000, 51000, 67000, 72000],
          costs:       [31000, 30000, 34000, 36000, 41000, 44000],
          cashflow:    [ 8000,  4000, 11000,  9000, 18000, 15000],
          vat:         [ 4800,  4500,  5500,  5900,  7700,  8300],
          receivables: [12000, 14000, 16000, 21000, 28000, 24000]
        }
      },
      {
        id: 'greenharbor', name: 'Green Harbor Group', sector: 'Holdingstructuur',
        series: {
          revenue:     [310000, 305000, 318000, 322000, 330000, 341000],
          costs:       [228000, 224000, 233000, 238000, 244000, 251000],
          cashflow:    [ 61000,  58000,  64000,  59000,  70000,  67000],
          vat:         [ 35600,  35100,  36500,  37000,  38000,  39200],
          receivables: [102000,  98000, 110000,  95000, 104000,  99000]
        }
      },
      {
        id: 'studio', name: 'Studio Rombaut CommV', sector: 'Creatieve diensten',
        series: {
          revenue:     [28000, 26000, 31000, 33000, 35000, 38000],
          costs:       [22000, 21000, 24000, 26000, 27000, 30000],
          cashflow:    [ 3000, -2000,  5000,  1000,  4000,  2000],
          vat:         [ 3200,  3000,  3600,  3800,  4000,  4400],
          receivables: [ 9000, 11000, 13000, 18000, 22000, 19000]
        }
      }
    ],
    // Intents: keyword-sets die de gesproken/getypte vraag op een metric mappen.
    intents: [
      {
        id: 'revenue', label: 'Omzet', metric: 'revenue', chart: 'bar', accent: 'good',
        keywords: ['omzet', 'revenue', 'verkoop', 'verkopen', 'turnover', 'inkomsten', 'sales'],
        title: 'Omzetontwikkeling',
        source: 'ledger/{id}/grootboek-omzet.csv'
      },
      {
        id: 'costs', label: 'Kosten', metric: 'costs', chart: 'bar', accent: 'warn',
        keywords: ['kosten', 'uitgaven', 'expenses', 'lasten', 'cost'],
        title: 'Kostenontwikkeling',
        source: 'ledger/{id}/aankoopboek.csv'
      },
      {
        id: 'margin', label: 'Marge & rendement', metric: 'margin', chart: 'line', accent: 'gold',
        keywords: ['marge', 'brutomarge', 'winst', 'rendement', 'resultaat', 'profit', 'margin', 'winstgevend'],
        title: 'Brutomarge en rendement',
        source: 'ledger/{id}/resultatenrekening.csv'
      },
      {
        id: 'cashflow', label: 'Cashflow', metric: 'cashflow', chart: 'bar', accent: 'neutral',
        keywords: ['cashflow', 'kasstroom', 'liquiditeit', 'cash', 'liquide', 'geldstroom'],
        title: 'Cashflow per maand',
        source: 'bank/{id}/transacties-jun-2026.csv'
      },
      {
        id: 'vat', label: 'BTW', metric: 'vat', chart: 'bar', accent: 'warn',
        keywords: ['btw', 'vat', 'belasting', 'aangifte', 'tax'],
        title: 'BTW-overzicht',
        source: 'btw/{id}/aangifte-werkblad.xlsx'
      },
      {
        id: 'receivables', label: 'Openstaande facturen', metric: 'receivables', chart: 'bar', accent: 'risk',
        keywords: ['openstaande', 'openstaand', 'debiteuren', 'facturen', 'factuur', 'klantfacturen', 'te ontvangen', 'outstanding', 'dso', 'betaling'],
        title: 'Openstaande klantfacturen',
        source: 'debiteuren/{id}/openstaande-posten.csv'
      }
    ],
    // Inzichtsjablonen per metric. {trend}/{last}/{ytd}/{client} worden ingevuld.
    insights: {
      revenue: 'De omzet van {client} {trend} over het halfjaar; juni komt uit op {last}. Year-to-date staat de teller op {ytd}. AI-laag markeert pieken voor reviewer-context vóór ze in het klantgesprek komen.',
      costs: 'De kosten {trend}; in juni {last}. Cumulatief {ytd} dit jaar. Sterke stijgingen worden gesignaleerd voor reviewercontrole vóór ze als advies naar de klant gaan.',
      margin: 'De brutomarge {trend}, met {last} in juni en {ytd} year-to-date. De AI-laag berekent dit uit omzet minus kosten en laat de reviewer het marge-percentage bevestigen.',
      cashflow: 'De cashflow {trend}; juni sluit op {last}. Negatieve maanden worden expliciet uitgelicht zodat het kantoor liquiditeitsrisico vroeg met de klant kan bespreken.',
      vat: 'Het BTW-saldo {trend}; juni {last}, samen {ytd} over zes maanden. Cijfers blijven een voorbereiding op de aangifte — geen automatische indiening.',
      receivables: 'De openstaande klantfacturen {trend} naar {last} in juni. AI-laag stelt opvolgacties voor, maar versturen gebeurt pas na expliciete goedkeuring door het kantoor.'
    }
  }
};