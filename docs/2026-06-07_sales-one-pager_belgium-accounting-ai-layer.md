# Belgium Accounting AI Layer — Design-Partner Pilot One-Pager

## Eén platformervaring voor control, review, close en reporting — bovenop de bestaande stack

**Belgium Accounting AI Layer** helpt Belgische boekhoud- en accountantskantoren hun versnipperde operationele workflow samen te brengen in **één platformlaag** voor dossiercompleetheid, documentverwerking, mailboxopvolging, review, close en reporting-voorbereiding.

**Dit is geen nieuw boekhoudpakket.**  
**Dit is geen core replacement.**  
**Dit is geen extra losse AI-tool.**

Het is een **AI control / review / close / reporting layer** die bovenop de huidige boekhoudsoftware, mailboxen en documentbronnen ligt — zodat teams niet nog meer tools moeten orkestreren, maar eindelijk vanuit **één platformervaring** kunnen werken.

## Het kernprobleem
Accountingkantoren hebben zelden een tekort aan tools. Ze hebben een tekort aan **samenhang** tussen tools.

Vandaag zitten de grootste operationele verliezen vaak tussen systemen:
- documenten komen binnen, maar landen niet consistent in het juiste dossier
- mailboxopvolging blijft verspreid over personen en inboxen
- ontbrekende stukken worden manueel nagejaagd
- reviewers zoeken informatie samen uit verschillende bronnen
- close-status en blockers zijn pas laat zichtbaar
- reporting commentary en managementsamenvattingen vragen nog te veel handwerk

Het resultaat: een team werkt met een boekhoudpakket, mailbox, documentopslag en extra hulpprocessen — maar zonder één gedeelde operationele laag die alles samenbrengt.

## Onze positionering in één zin
**Eén platformlaag bovenop boekhoudbron, mailbox en documentbron die documenten, requests, review findings, uitzonderingen en close-status samenbrengt in één cockpit — met human-in-the-loop en audit trail ingebouwd.**

## Wat we expliciet wel zijn
- een **platformervaring**, niet een verzameling losse copilots
- een **bovenliggende orchestration layer** bovenop de huidige stack
- een **read-mostly startarchitectuur** met beperkt implementatierisico
- een **AI-assisted control- en reviewworkflow** met menselijke goedkeuring
- een **praktische operating layer** voor dossierteams, reviewers en partners

## Wat we expliciet niet doen
- geen vervanging van bestaand boekhoudpakket
- geen volledige core stack migratie
- geen autonome boekhouder
- geen black-box AI zonder explainability
- geen fiscale filing automation in v1
- geen “nog een tool” die opnieuw apart beheerd moet worden

## Voor wie dit relevant is
Voor Belgische boekhoud- en accountantskantoren die:
- hun huidige boekhoudsoftware willen behouden
- veel terugkerende kmo-dossiers verwerken
- vandaag manueel blijven schakelen tussen mailbox, documenten en dossierwerk
- review- en closewerk sneller en voorspelbaarder willen maken
- AI willen inzetten, maar alleen met **human-in-the-loop**, bronverwijzingen en audit trail
- operationele efficiëntie willen winnen zonder een groot transformatieproject te starten

## Waarom het narratief “één platformervaring” ertoe doet
De markt zit vol puntoplossingen: een tool voor documentextractie, een tool voor e-mail drafting, een tool voor AI-chat, een tool voor review checklists, een tool voor reporting support.

Voor een kantoor betekent dat vaak alleen maar:
- meer context switching
- meer beheerlast
- meer opleiding per tool
- meer versnipperde verantwoordelijkheid
- meer risico dat inzichten niet samenkomen

Onze thesis is het tegenovergestelde:
**kantoren willen geen extra losse tools; ze willen één platformlaag die mailbox, document, review en close samenbrengt zonder hun bestaande stack te vervangen.**

## Wat het team concreet krijgt
- **één cockpit** voor dossierstatus, uitzonderingen, blockers en open acties
- automatische detectie van ontbrekende stukken en onvolledige dossiers
- document- en e-mailtriage binnen dezelfde workflow
- concepten voor klantopvragingen, met menselijke goedkeuring
- AI reviewer summaries met bronverwijzingen
- close cockpit met zicht op deadlines, blockers en open exceptions
- audit trail per AI-output, finding en goedkeuring
- één gedeelde operationele laag voor medewerker, reviewer en partner

## Welke operationele winst we willen creëren
- minder versnippering tussen mailbox, documentopslag en reviewwerk
- minder manuele opvolging van ontbrekende stukken
- snellere review per dossier
- vroeger zicht op close blockers en uitzonderingen
- hogere voorspelbaarheid van dossierstatus
- consistentere voorbereiding van reporting commentary en reviewer context

## Design-partner pilot
### Doel
In **8 tot 12 weken** aantonen dat een kantoor sneller grip krijgt op dossiers, review en close door niet nóg een losse tool toe te voegen, maar een **één-platformlaag** bovenop de bestaande stack te activeren.

### Standaard pilotscope
- 1 kantoor
- 1 pilotteam
- 30–50 dossiers
- 1 boekhoudbron
- 1 gedeelde mailbox
- 1 documentbron
- focus op document- en e-mailtriage, ontbrekende-stukken workflow, exception-driven review, close cockpit en reviewer summary

### Aanpak
**Fase 1 — Baseline en afbakening**
- selectie pilotdossiers
- bevestiging huidige procesflow en tool-fricties
- baseline op reviewtijd, dossiercompleetheid en open exceptions

**Fase 2 — Configuratie en onboarding**
- koppeling van afgesproken bronnen
- mapping naar dossier- en periodeflow
- set-up van controles, statussen en reviewlogica
- inrichting van de cockpit over mailbox, document en review heen

**Fase 3 — Live pilot**
- operationeel gebruik in echte dossiers
- wekelijkse KPI-review
- tuning op false positives, thresholds en workflow

**Fase 4 — Evaluatie en scale decision**
- vergelijking baseline versus pilotresultaat
- beslissing over bredere uitrol, scope-uitbreiding of stopzetting

## Wat de pilot moet bewijzen
We willen geen hype verkopen, maar meetbare operationele waarde. De pilot moet onder meer aantonen:
- sneller zicht op ontbrekende stukken
- minder context switching tussen tools
- kortere reviewtijd per dossier
- vroeger zicht op close blockers
- hogere voorspelbaarheid van dossierstatus
- bruikbare AI-output met duidelijke bronverwijzingen
- aanvaardbaar false-positive niveau voor operationeel gebruik

## Governance en vertrouwen
Deze propositie is ontworpen voor een risicogevoelige context:
- **human-in-the-loop** blijft standaard
- elke AI-output moet auditbaar zijn
- reviewer en partner blijven eindverantwoordelijk
- lage-confidence output passeert via menselijke review
- externe communicatie en materiële acties verlopen via approval gates
- de startarchitectuur is **read-mostly** om operationeel risico laag te houden

## Waarom dit beter is dan “nog een tool”
- sluit aan op de bestaande stack in plaats van migratie te forceren
- vervangt versnipperde handoffs door **één platformervaring**
- combineert document, e-mail, control, review en close in één laag
- maakt AI bruikbaar in operationele workflows, niet alleen in losse chatinteracties
- verlaagt adoptieweerstand omdat teams niet in aparte tools hoeven te werken
- is binnen een afgebakende pilot concreet te evalueren

## Commerciële structuur
### Aanbevolen design-partner pilot anchor
- **€15.000 setup**
- **€5.500 per maand**
- **3 maanden minimum**

Dit is bedoeld als een serieuze maar beheersbare pilot voor een kantoor dat bewijs van waarde wil zien zonder zich vast te rijden in een groot transformatieproject.

### Inbegrepen in de pilot
- pilotscope workshop en afbakening
- KPI-baseline definitie
- configuratie voor 1 boekhoudbron, 1 mailbox en 1 documentbron
- dossier- en periodeflow mapping voor de afgesproken pilotscope
- standaard controls v1 voor ontbrekende stukken, documentlinking en review findings
- cockpit v1 voor dossierstatus, exceptions en close-opvolging
- reviewer summary v1 met bronverwijzingen
- wekelijkse pilot review
- beperkte threshold tuning tijdens pilot
- eindreview met go / no-go / expand besluit

### Niet inbegrepen
- write-back automatisatie op grote schaal
- maatwerkintegraties buiten de eerste scope
- multi-office rollout
- fiscale filing automation
- volledige management reporting suite
- onbeperkte workflowcustomisatie

## Ideale design partner
De beste fit is meestal een Belgisch kantoor dat:
- ongeveer 10–80 medewerkers telt
- een duidelijke reviewflow heeft
- vandaag nog te veel manuele opvolging heeft tussen mailbox, documenten en dossierwerk
- geen core replacement wil
- geen behoefte heeft aan nóg een losse tool
- wel 30–50 dossiers wil afbakenen voor een gecontroleerde pilot

## Call to action
**Plan een 45-minuten pilot fit gesprek.**

In dat gesprek toetsen we:
- of uw kantoor binnen de juiste pilotzone valt
- waar vandaag de grootste frictie zit tussen mailbox, document en reviewflow
- welke pilotscope realistisch is
- welke baseline en KPI’s gebruikt moeten worden

Na dat gesprek ontvangt u:
- een voorgestelde pilotscope
- een KPI-baseline template
- een implementatie-aanpak
- een duidelijk besliskader om wel of niet te starten
