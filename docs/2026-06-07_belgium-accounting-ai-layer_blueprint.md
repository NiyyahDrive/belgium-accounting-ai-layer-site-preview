# End-to-end AI-laag bovenop bestaande boekhoudplatforms — Belgische start

_Datum: 2026-06-07_

## Executive besluit
**Bouw geen nieuw boekhoudpakket in v1.**

Bouw een **AI control / review / close / reporting layer** bovenop bestaande boekhoudplatforms en rol die eerst uit bij **Belgische boekhoudkantoren** met een duidelijke dossier- en reviewflow.

De beste v1 is:
- read-first, niet write-first
- workflow-first, niet ERP-first
- exception-driven, niet chatbot-first
- human-in-the-loop, niet autonome boekhouding

---

## 1. Voor wie we dit bouwen

### Ideale eerste klant
Belgisch boekhoudkantoor met:
- 10–80 medewerkers
- veel kmo-dossiers
- terugkerende maand- en kwartaalafsluitingen
- duidelijke rolverdeling tussen dossierbeheerder, reviewer en partner
- bestaande softwarestack die al werkt, maar gefragmenteerd is

### Niet als eerste target
- eenmanskantoren zonder procesdiscipline
- enterprise-netwerken met zware procurement en complexe governance
- kantoren die meteen volledige core replacement willen

### Kernprobleem
De grootste pijn zit niet in het bestaan van boekhoudsoftware zelf, maar in alles **rondom** die software:
- ontbrekende documenten
- versnipperde inboxen
- trage review
- BTW- en reconciliatie-excepties
- klantopvragingen die manueel blijven hangen
- close die niet bestuurbaar is
- rapportering die te laat of te handmatig tot stand komt

---

## 2. Positionering

Niet zeggen:
> wij bouwen een nieuw AFAS/Exact voor België

Wel zeggen:
> wij bouwen de AI control- en closinglaag voor Belgische accountantskantoren bovenop hun bestaande systemen

### V1-propositie
**AI dossierreview en closing copilot voor Belgische accountantskantoren**

V1 lost dit op:
- welke dossiers zijn onvolledig?
- welke boekingen zijn afwijkend?
- welke documenten ontbreken nog?
- welke BTW- of reconciliatie-risico’s moeten eerst bekeken worden?
- welke klantvragen moeten nu uit?
- welke dossiers lopen close-risico?

---

## 3. Doelbeeld van het platform

Het platform is een **AI orchestration and control layer** die bovenop bestaande software draait en acht dingen doet:

1. data ophalen uit bronsystemen
2. documenten, e-mail en bijlagen begrijpen
3. dossiers structureren in één cockpit
4. review- en kwaliteitscontroles automatiseren
5. close sturen via een cockpit
6. klantopvragingen orkestreren
7. rapportering en management commentary versnellen
8. alles auditbaar en veilig houden

---

## 4. Architectuur op hoofdlijnen

```text
[Bronnen]
- boekhoudpakketten
- bank/CODA
- e-mail
- document stores
- practice management / CRM
- payroll / HR outputs
- e-invoicing / Peppol / UBL

        ↓

[Integratielaag]
- API connectors
- file ingestion
- email ingestion
- schedulers / sync jobs
- event listeners / webhooks

        ↓

[Canonical Data Layer]
- client / dossier model
- reporting period
- boekingen / journals
- documenten
- taken / requests
- findings / exceptions
- close status
- AI recommendations
- audit events

        ↓

[Intelligence Layer]
- OCR + extractie
- classificatie
- matching
- controls engine
- anomaliedetectie
- retrieval / search
- LLM services

        ↓

[Workflow & Experience Layer]
- reviewer workbench
- close cockpit
- client request portal
- reporting layer
- internal copilot
- client assistant

        ↓

[Governance Layer]
- RBAC
- tenant isolation
- audit trail
- human approval gates
- prompt/output logging
- privacy & policy controls
```

---

## 5. Bronsystemen en integraties voor België

### Prioriteit 1 — boekhoudbronnen
Begin klein. Kies 1–2 echte bronnen in plaats van tien halve integraties.

Waarschijnlijke eerste cluster:
- Exact Online
- Yuki
- Twinfield
- Odoo Accounting
- eventueel WinBooks / Octopus / Venice als latere connectoren

### Prioriteit 2 — document- en bankstromen
- CODA / CodaBox / Isabel
- documentopslag in SharePoint / OneDrive / Google Drive
- scan- en uploadstromen
- UBL / PDF / XML
- Peppol-documentreferenties

### Prioriteit 3 — praktijk- en klantlaag
- Microsoft 365 of Gmail shared inbox
- AdminPulse / Teamleader / bestaand CRM of praktijkbeheer
- klantportaal voor ontbrekende stukken

### Integratiestrategie
V1 moet **read-mostly** zijn:
- data ophalen
- analyseren
- findings maken
- taken en conceptberichten genereren

V1 moet **geen diepe write-back** vereisen om waarde te leveren.

---

## 6. Canoniek datamodel

Zonder canoniek model blijf je maatwerk per pakket bouwen.

### Minimale kernentiteiten
- Client
- Dossier / Engagement
- Legal Entity
- Reporting Period
- General Ledger Entry
- Journal
- Account Mapping
- Purchase Invoice
- Sales Invoice
- Bank Transaction
- VAT Record
- Document
- Task / Request
- Review Finding
- Close Checklist Item
- Report Pack
- AI Recommendation
- Approval Event

### Belgische uitbreidingen
- BTW-status
- intracom-status
- klantenlisting-context
- CODA metadata
- Peppol / UBL referenties
- dossiermandaat / volmachtstatus waar relevant
- jaarrekening/NBB mapping als latere uitbreiding

---

## 7. Hoofdmodules van de AI-laag

## 7.1 Integratielaag
Doel: alle relevante data en documenten in een betrouwbaar, normaliseerbaar kanaal krijgen.

Functies:
- API polling
- webhook-verwerking
- batch ingestion van historische dossiers
- delta sync
- deduplicatie
- mapping naar canoniek model
- importvalidatie

## 7.2 Document intelligence
Doel: documenten automatisch bruikbaar maken in plaats van alleen opslaan.

Functies:
- OCR
- documentclassificatie
- veldextractie
- confidence scoring
- document-to-transaction matching
- completeness checks per dossier/periode

Documenttypes in v1:
- aankoopfactuur
- verkoopfactuur
- bankbewijs
- contract
- loonstaat / payroll-output
- BTW-document
- algemene dossierbijlagen

## 7.3 E-mail & klantopvragingen
Doel: klantfollow-up uit de mailbox-chaos trekken.

Functies:
- thread-to-client matching
- bijlageclassificatie
- intent detection
- concept klantmails
- reminderflows
- status van open requests

Gewenste flow:
1. systeem detecteert ontbrekend stuk
2. concept vraag wordt gegenereerd
3. medewerker valideert of auto-send volgens policy
4. klant antwoordt via e-mail of portaal
5. AI koppelt antwoord terug aan het juiste dossier en request
6. medewerker behandelt alleen uitzonderingen

## 7.4 Review & control engine
Dit is de kern van de waarde.

Controles in v1:
- ontbrekende documenten
- ontbrekende bank- of transactiestromen
- boekingen zonder documentlink
- afwijkende rekeningen versus historiek
- inconsistent BTW-tarief
- dubbele facturen
- grote manuele correcties
- cutoff-risico rond periode-einde
- open-items / basisreconciliatie
- ongebruikelijke bewegingen op balansrekeningen

Elke finding bevat:
- severity
- impacted entity
- reden
- bronverwijzing
- confidence
- suggested action
- menselijke eigenaar
- due date

## 7.5 Close cockpit
Doel: van losse checklistjes naar bestuurbare close-operatie.

Functies:
- close calendar
- dossierstatus per periode
- dependency tracking
- blocker management
- exception heatmap
- reviewer sign-off
- AI-samenvatting: waarom is dossier X nog niet closable?

## 7.6 Reporting & narrative layer
Doel: sneller bruikbare output voor klant en partner.

Functies:
- management packs
- flash reports
- KPI-overzichten
- variantieanalyse
- concept management commentary
- reviewmemo voor klantgesprek

## 7.7 AI-copilot laag
Twee interfaces:

### Interne kantoor-copilot
Voor dossierbeheerder, reviewer, partner.

Voorbeelden:
- welke dossiers missen nog stukken?
- waarom is dit dossier rood?
- vat de uitzonderingen van deze maand samen
- welke BTW-risico’s moet ik eerst bekijken?

### Klantassistent
Beperkt en veilig.

Voorbeelden:
- welke documenten ontbreken nog?
- wat is de status van mijn dossier?
- waarom werd dit document opgevraagd?

Niet in v1:
- open-ended agent met brede schrijfrechten
- autonome boekhouder
- autonome fiscale indiening

---

## 8. End-to-end datastromen

## Stroom A — document intake
1. klant uploadt of mailt document
2. ingestion haalt bestand op
3. OCR + classificatie + extractie
4. koppeling aan cliënt / dossier / periode
5. confidence score
6. bij hoge confidence koppelen aan open request of transactie
7. bij lage confidence naar validatiequeue
8. audit trail opslaan

## Stroom B — boekhoudsync
1. connector haalt journals, GL, open items en BTW-data op
2. normalisatie naar canoniek model
3. delta update
4. control engine draait checks
5. findings verschijnen in reviewer workbench en close cockpit

## Stroom C — klantopvraging
1. systeem detecteert ontbrekende informatie
2. workflow-engine maakt request
3. AI maakt conceptbericht
4. medewerker valideert of policy laat auto-send toe
5. klant levert antwoord / document
6. AI koppelt terug aan request
7. status wordt geüpdatet

## Stroom D — review
1. reviewer opent dossier
2. ziet findings, checklist, documenten en AI-samenvatting
3. accepteert of verwerpt aanbevelingen
4. goedgekeurde acties worden taken, commentaren of beperkte write-back in latere fasen
5. sign-off event wordt gelogd

## Stroom E — reporting
1. close-status bereikt ‘ready’
2. reporting layer haalt finale cijfers op
3. AI maakt conceptcommentaar
4. reviewer of partner keurt goed
5. output gaat naar portaal, PDF of mail

---

## 9. Guardrails

## Operationeel
- geen write-back naar boekhoudpakket zonder expliciete policy
- geen autonome fiscale indieningen
- geen betaalinstructies vanuit AI
- lage-confidence extracties altijd naar review
- materiële uitzonderingen verplicht menselijk nazicht

## AI
- bronverwijzingen verplicht
- vaste outputschema’s
- default: “onvoldoende bewijs” als zekerheid ontbreekt
- geen antwoord buiten geautoriseerde dossiercontext
- model output validatie op gestructureerde acties

## Security & privacy
- tenant isolation per kantoor
- RBAC per team en dossier
- encryptie at rest en in transit
- instelbare retentie voor prompts, embeddings en documenten
- standaard geen training op klantdata
- volledige logging van AI-aanbevelingen en approvals

## Compliance
Voor België / EU minimaal:
- GDPR / DPA
- human oversight
- traceability
- EU-hostingvoorkeur
- leveranciersscreening
- beroepsgeheim-respecterende toegangspolitiek

---

## 10. Human-in-the-loop

In v1 is menselijk akkoord verplicht voor:
- materiële boekingscorrecties
- BTW- en compliance-excepties
- finale dossierreview
- externe rapportnarratieven
- uitzonderlijke klantcommunicatie
- lage-confidence documentbeslissingen
- reclassificaties boven drempel

Doel:
- AI doet voorbereiding
- mens beslist op uitzonderingen
- kantoor houdt verantwoordelijkheid

---

## 11. KPI’s

### Operationeel
- reviewtijd per dossier
- time-to-close
- % documenten correct geclassificeerd
- % requests automatisch gekoppeld
- tijd tot compleet dossier

### Kwaliteit
- false positive rate van findings
- % issues ontdekt vóór partnerreview
- % boekingen zonder documentlink
- correctiegraad na AI-suggestie

### Commercieel
- urenbesparing per dossier
- dossiers per FTE
- margeverbetering in pilotteam
- klantresponstijd op opvragingen

### Governance
- % AI-output met bronverwijzing
- % lage-confidence items correct geëscaleerd
- incidenten rond toegang of privacy
- audit completeness

---

## 12. Beste integratie-aanpak bij een Belgisch boekhoudkantoor

## Startmodel
Begin met:
- 1 kantoor
- 1 team
- 30–50 dossiers
- 1 boekhoudbron
- 1 gedeelde mailbox
- 1 documentbron
- eventueel 1 CODA-stroom

### Beste eerste use cases
1. document- en e-mailtriage
2. ontbrekende stukken detecteren
3. klantopvragingen genereren
4. basis review controls
5. close status en blockers zichtbaar maken
6. AI review summary
7. management commentary drafts

### Wat niet in v1 komt
- nieuw grootboek
- volledige ERP-scope
- autonome boekingen op schaal
- volledige filing automation
- tientallen connectors tegelijk
- generieke “AI accountant” chatbot zonder workflowcontext

### Waarom dit werkt
Omdat het kantoor dan:
- weinig disruptie voelt
- sneller resultaat ziet
- geen system-of-record hoeft te migreren
- vertrouwen kan opbouwen rond uitzonderingen en auditability

---

## 13. Gefaseerde rollout

## Fase 0 — scope lock (4–6 weken)
- design partner kiezen
- pilotteam kiezen
- 30–50 dossiers selecteren
- 2–3 kernbronnen vastzetten
- canoniek model v1 definiëren
- policies en materialiteitsdrempels bepalen
- KPI-baseline meten

## Fase 1 — intake automation (6–10 weken)
- accounting connector v1
- mailbox ingestion
- document ingestion
- OCR + classificatie
- request tracking
- basisportaal of inbox-flow

## Fase 2 — review/control (8–12 weken)
- completeness checks
- basisreconciliatie
- BTW consistency
- duplicate / unusual transaction detection
- reviewer workbench
- explainability

## Fase 3 — close cockpit (6–8 weken)
- close calendar
- dossierstatus
- blockers
- SLA/reminders
- AI close summary

## Fase 4 — reporting & internal copilot (6–10 weken)
- reporting packs
- concept management commentary
- interne retrieval-copilot

## Fase 5 — controlled write-back (optioneel)
Pas nadat vertrouwen en audit trail sterk genoeg zijn.

---

## 14. Mijn harde advies

**Bouw eerst de AI control- en workflowlaag, niet de core accounting engine.**

Dat betekent:
- begin in België
- kies één scherp kantoorprofiel
- los review, close en documentchaos op
- maak de integratielaag je product
- hou write-back minimaal in v1
- bouw auditability vanaf dag 1

## Samenvatting in één zin
**De beste start is een Belgische AI dossierreview- en closinglaag bovenop bestaande boekhoudsoftware, niet een nieuw boekhoudpakket.**

---

## Aanbevolen volgende artefacten
1. ICP-profiel voor het eerste Belgische kantoor
2. capability map per fase
3. 90-dagen MVP-backlog
4. pilot rollout-plan voor 1 design partner
