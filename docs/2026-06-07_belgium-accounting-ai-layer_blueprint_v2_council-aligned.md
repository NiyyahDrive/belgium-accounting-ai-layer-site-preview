# Belgium Accounting AI Layer — Council-aligned Blueprint v2

_Datum: 2026-06-07_

## 1. Executive decision

**GO, maar alleen in een smalle audit-first v1.**

Bouw dit product niet als brede AI-layer voor accounting en niet als nieuw boekhoudpakket. Bouw het als een **audit-first review/close/control-laag** bovenop bestaande boekhoudsoftware voor Belgische boekhoudkantoren.

De v1-beslissing is daarom expliciet:
- geen core replacement
- read-mostly, niet write-first
- workflow-first, niet chatbot-first
- exception-driven, niet generieke assistentlogica
- human-in-the-loop als standaard
- één smalle wedge: dossiers sneller review-ready en close-ready maken

Dit document is het canonieke v2-blauwdrukdocument voor pitch, build en design-partner rollout.

## 2. Positioning: what this is / what this is not

### Wat dit is
Dit is een **control, review en close-laag** voor Belgische boekhoudkantoren die bovenop bestaande systemen draait en de operationele frictie rond dossiers verlaagt.

Als verlengstuk van die wedge mag de laag ook **reporting/advisory enablement** leveren: accountingkantoren moeten vanuit dezelfde control/review/close-context sneller klantdashboards en insight views kunnen opbouwen dan met losse Power BI-achtige tooling, en op basis daarvan data-gedreven, klant-specifiek advies kunnen voorbereiden.

De kernwaarde in v1:
- ontbrekende stukken zichtbaar maken
- review-excepties prioriteren
- close-status per dossier/periode expliciet maken
- concept klantopvragingen genereren met menselijke validatie
- elke finding onderbouwen met bronverwijzing, confidence en audit trail

### Wat dit niet is
Dit is niet:
- een nieuw grootboek
- een nieuw boekhoudpakket
- een hidden core replacement
- een brede AI-suite voor alle kantoorprocessen
- een brede generieke BI-suite
- een generieke “AI accountant”
- een autonoom adviesplatform dat zonder accountant klantadvies uitstuurd
- een autonome boekings- of filing-engine

De juiste marktboodschap is dus niet “AI layer voor accounting”, maar:
**audit-first review/close/control bovenop de bestaande stack, zonder system-of-record te vervangen.**

## 3. ICP / first design partner

### Ideaal eerste kantoor
Het eerste design-partnerprofiel is een **Belgisch boekhoudkantoor met 10–80 medewerkers**, veel kmo-dossiers, terugkerende maand- of kwartaalafsluitingen en een duidelijke rolverdeling tussen dossierbeheerder, reviewer en partner.

### Eerste pilotvorm
De eerste pilot is strikt beperkt tot:
- **1 kantoor**
- **1 team**
- **30–50 dossiers**
- **1 periodeproces**
  - maandafsluiting of kwartaalreview

### Waarom dit profiel klopt
Dit profiel heeft genoeg procesvolume om waarde te tonen, maar vermijdt de procurement-, governance- en integratiezwaarte van enterprise-uitrol.

### Niet de juiste eerste klant
Niet eerst richten op:
- eenmanskantoren zonder procesdiscipline
- multi-office enterprisegroepen
- kantoren die meteen core replacement verwachten
- klanten die meerdere landen of meerdere stacks tegelijk willen onboarden

## 4. The single v1 job to be done

De v1 heeft exact één kernjob:

**maak dossiers sneller review-ready en close-ready door ontbrekende stukken, uitzonderingen en blockers automatisch zichtbaar te maken, zonder de system-of-record te wijzigen.**

Daaruit volgen vier operationele uitkomsten:
- dossiercompleetheid per periode wordt zichtbaar
- reviewwerk verschuift van zoeken naar beslissen
- concept klantopvragingen worden sneller en consistenter verstuurd
- close-status wordt bestuurbaar in plaats van impliciet
- klantgerichte dashboards, insight views en adviesvoorstellen kunnen sneller uit dezelfde dossierwaarheid worden opgebouwd

Alles wat niet rechtstreeks bijdraagt aan deze job hoort niet in v1.

## 5. v1 use cases in priority order

### 1. Dossiercompleetheid en ontbrekende stukken
Detecteer ontbrekende documenten, ontbrekende transactiestromen en boekingen zonder documentlink per dossier/periode.

### 2. Review controls en exception queue
Voer basiscontroles uit op:
- ontbrekende stukken
- ontbrekende bank- of transactiestromen
- boekingen zonder documentlink
- afwijkende rekeningen versus historiek
- inconsistent BTW-tarief
- dubbele facturen
- grote manuele correcties
- cutoff-risico rond periode-einde
- open items en basisreconciliatie
- ongebruikelijke bewegingen op balansrekeningen

### 3. Reviewer workbench
Toon findings in één werkbank met:
- severity
- impacted entity
- reden
- bronverwijzing
- confidence
- suggested action
- menselijke eigenaar
- due date

### 4. Concept klantopvragingen
Genereer conceptmails of verzoeken voor ontbrekende stukken, altijd met menselijke validatie in v1.

### 5. Close cockpit basis
Maak per dossier/periode zichtbaar:
- status
- blockers
- open requests
- uitzonderingen
- review sign-off

### 6. AI review summary
Geef een brononderbouwde samenvatting van waarom een dossier nog niet review-ready of close-ready is.

### 7. Reporting/advisory enablement binnen de wedge
Alleen als bounded capability bovenop control/review/close:
- dossier- of periode-summary
- concept management commentary
- cliëntspecifieke dashboard- of insight views op basis van reeds geharmoniseerde dossier-, periode-, finding- en close-data
- adviesvoorstellen voor accountant-review, met bronverwijzing, confidence en verplichte menselijke validatie

Deze capability bestaat om het kantoor sneller van reviewdata naar klantgesprek te brengen dan met losse Power BI-achtige tooling. Het is geen aparte BI-suite, geen vrij analyseplatform en geen autonoom advieskanaal richting eindklant.

## 6. Architecture and operating model

### Architectuurbesluit v1
Bouw v1 als een **EU-gehoste modulaire monolith + workers** op een VPS-first Docker-platform.

### Concrete v1-stack
- **Frontend:** Next.js 15 + TypeScript
- **Backend API:** NestJS + TypeScript
- **Async processing:** BullMQ + Redis
- **Primary database:** PostgreSQL 16
- **Retrieval/search:** pgvector + full-text search in PostgreSQL
- **Object storage:** S3-compatible storage in de EU; managed waar mogelijk, anders MinIO
- **Auth / SSO / RBAC:** Authentik of Keycloak
- **Reverse proxy / TLS:** Caddy
- **Observability:** Grafana + Loki + Prometheus + Sentry
- **Backups:** pgBackRest + restic naar externe EU-bucket
- **Deploy:** Docker Compose in v1, met pas later pad naar k3s indien nodig

### Functionele systeemlagen
1. **Bronlaag**
   - boekhoudsoftware
   - mailbox
   - documentbron
   - optioneel CODA-stroom indien nodig binnen de pilot

2. **Integratielaag**
   - connector adapters
   - polling en delta sync
   - file ingestion
   - mailbox ingestion
   - idempotency en deduplicatie
   - mapping naar canoniek model

3. **Canonical data layer**
   - dossiers
   - periodes
   - boekingen/journals
   - documenten
   - requests
   - findings
   - close status
   - approvals
   - audit events

4. **Intelligence layer**
   - OCR/extractie
   - documentclassificatie
   - matching
   - rules engine
   - anomaly signals
   - retrieval
   - LLM orchestration
   - confidence scoring
   - source attribution

5. **Experience + governance layer**
   - reviewer workbench
   - close cockpit
   - request center
   - client insight views
   - AI summaries
   - advisory prep views
   - approval gates
   - audit trail
   - policy controls

### Operating model
- het **boekhoudkantoor is de tenant**
- klantdossiers zijn managed entities binnen die tenant
- v1 is **read-mostly**
- AI geeft aanbevelingen, geen autonome boekhoudbeslissingen
- de gebruiker werkt in **één cockpit**, niet in losse tools per functie
- reporting/advisory views gebruiken dezelfde canonical data, approvals en audit trail als review/close

### Runtime-afbakening
De v1 houdt een harde scheiding tussen:
- **control plane** voor tenant-, policy- en adminconfiguratie
- **data/workflow plane** voor ingest, dossiers, findings, requests en close-status
- **AI plane** voor modelrouting, prompt templating, PII controls, logging en approval flags via een verplichte **AI Gateway**

## 7. Integration strategy

### Scopebesluit voor de eerste pilot
De eerste integratiescope is exact:
- **1 accounting source**
- **1 mailbox source**
- **1 document source**

Niet meer.

### Integratieprincipes
- start read-mostly
- haal alleen data op die nodig is voor dossiercompleetheid, review en close-status
- gebruik replayable en versioned ingest-contracten per connector
- bewaar raw refs en canonical records
- maak sync runs observeerbaar en herhaalbaar
- gebruik webhook-sync alleen waar de bron dit stabiel ondersteunt

### Prioritaire broncategorieën
- **Accounting source:** Exact Online, Yuki, Twinfield of Odoo Accounting; kies er één voor de pilot
- **Mailbox source:** Microsoft Graph heeft prioriteit in Belgische kantoorcontext; Gmail alleen indien nodig
- **Document source:** SharePoint/OneDrive of Google Drive; kies er één

### Systeem-of-record boundary
Het bronpakket blijft system of record.

V1 mag:
- lezen
- normaliseren
- analyseren
- findings maken
- requests en conceptacties genereren

V1 mag niet:
- journals of transacties autonoom aanpassen
- fiscale filings indienen
- betalingen initiëren
- brondata herdefiniëren buiten expliciete, latere write-back scope

## 8. Security / privacy / governance guardrails

De volgende guardrails zijn releasevoorwaarden, niet best practices.

### Data residency en providerbeleid
- **EU/EER-only datapad** voor productiegegevens
- database, object storage, backups en logging zijn EU/EER-gehost
- **no training / no retention** bij modelproviders
- geen impliciete data-uitstroom naar niet-EU providers zonder expliciete contractuele dekking

### Dataminimalisatie en PII
- **PII minimization vóór model calls**
- alleen data ophalen die nodig is voor dossiercompleetheid, review en close-status
- geen volledige mailboxhistoriek spiegelen
- geen irrelevante HR- of persoonsdata in scope
- prompt templates zonder onnodige PII

### Toegang en isolatie
- **tenant isolation als release gate**
- default-deny tussen tenants
- tenant-scoped retrieval met testdekking
- RBAC per team en dossier
- MFA voor admins, reviewers en managers
- geen productiegegevens in dev of staging zonder masking

### Approval en accountability
- **approval gates** als echte policy engine
- menselijk akkoord verplicht voor:
  - materiële boekingscorrecties
  - BTW- en compliance-excepties
  - finale dossierreview
  - externe rapportnarratieven
  - uitzonderlijke klantcommunicatie
  - lage-confidence documentbeslissingen
- AI-output zonder voldoende bewijs valt standaard terug naar **onvoldoende bewijs**

### Evidence en auditability
- **evidence bundles** verplicht per finding en AI recommendation
- per AI-actie minimaal loggen:
  - tenant_id
  - assistant type
  - input scope refs
  - prompt template version
  - model name/version
  - output
  - confidence of review-needed flag
  - menselijke actie ja/nee
  - final status
- forensic-grade logging voor login, role changes, exports, connectorwijzigingen, approvals en admin overrides

### Security baseline
- encryptie in transit en at rest
- database niet publiek bereikbaar
- object storage tenant-gescheiden
- upload scanning op malware
- content-type en MIME-validatie
- secure webhook signature validation
- secrets in dedicated secret manager
- maandelijkse restore-tests; backup zonder restore-test telt niet

## 9. Design-partner rollout model

### Doel van de pilot
Bewijs workflowfit, niet platformbreedte.

### Opzet
- 1 Belgisch kantoor
- 1 team
- 30–50 dossiers
- 1 accounting source
- 1 mailbox source
- 1 document source
- 1 periodeproces

### Fasevolgorde
1. **Scope lock**
   - design partner vastzetten
   - pilotteam en dossiers selecteren
   - bronnen vastleggen
   - KPI-baseline meten
   - materialiteitsdrempels en policies bepalen

2. **Intake foundation**
   - accounting ingest
   - mailbox ingest
   - document ingest
   - OCR en classificatie
   - dossier/periode mapping

3. **Review/control**
   - completeness checks
   - basis review controls
   - findings engine
   - reviewer workbench
   - concept klantopvragingen met approval gate

4. **Close cockpit**
   - status per dossier/periode
   - blockers
   - sign-off
   - AI review/close summary

5. **Hardening**
   - backup- en restore-test
   - observability alerts
   - tenant policy packs
   - security baseline review

### Pilotregels
- baseline vóór livegang
- wekelijkse review op ruis versus waarde
- bronverwijzing en confidence op elke finding
- geen kantoorbrede rollout vóór bewijs van workflowfit
- geen verbreding van scope zolang de kernjob niet aantoonbaar werkt

## 10. Explicit not-in-v1 list

**Niet in v1:**
- nieuw grootboek
- eigen boekhoudkern
- core replacement
- autonome boekingen
- write-back naar journals of transacties
- fiscale filings of VAT-submissions
- payment initiation
- generieke “AI accountant” chat
- vrije agentcreatie door eindgebruikers
- brede reporting-suite
- generieke self-service BI-omgeving
- payroll/HR
- CRM- of practice-management replacement
- multi-land scope
- meerdere accounting connectors in de eerste pilot
- volledige mailboxhistoriek sync
- microservices- of Kubernetes-first herplatforming
- open-ended client assistant buiten de review/close-context
- autonoom gegenereerde klantadviezen zonder accountant-review

## 11. Immediate decision points

1. Kies de eerste pilotbron voor accounting: Exact Online, Yuki, Twinfield of Odoo Accounting.
2. Kies de eerste mailboxbron: bij voorkeur Microsoft Graph.
3. Kies de eerste documentbron: SharePoint/OneDrive of Google Drive.
4. Bevestig de identity-keuze: **Authentik of Keycloak**.
5. Maak de **AI Gateway** een verplichte runtime boundary, niet een latere refactor.
6. Definieer tenant policy packs vanaf de eerste pilot.
7. Maak **evidence bundles** verplicht in het datamodel en de workflow.
8. Test tenant isolation als harde release gate vóór pilot-livegang.
9. Definieer degraded modes voor LLM, OCR, mailbox en storage.
10. Bevestig contractueel de EU/EER-hosting, DPA, subprocessors en no-training/no-retention-lijn.

## 12. Next artifacts to create

1. **Design-partner ICP brief**
   - exact kantoorprofiel, teamprofiel en selectiecriteria

2. **Pilot scope sheet**
   - gekozen accounting source, mailbox source, document source, dossierselectie en KPI-baseline

3. **Canonical data model v1 spec**
   - tenant, dossier, periode, document, finding, request, approval, audit event

4. **Connector ingest contracts v1**
   - replayable/versioned contract per gekozen bron

5. **Review controls spec v1**
   - exacte controleregels, materialiteitsdrempels, confidence- en escalatieregels

6. **Security / privacy / governance pack**
   - DPA-input, subprocessor register, retention policy, AI policy en tenant isolation testplan

7. **Pilot runbook**
   - onboarding, sync-operatie, incidentflow, approvalflow, restore-test en weekly review cadence

8. **Reviewer workbench and close cockpit functional spec**
   - schermen, states, sign-off logica en evidence bundle-weergave

9. **Design-partner success scorecard**
   - reviewtijd, time-to-close, false positive rate, % dossiers review-ready, % requests opgelost

10. **30-dagen build plan**
   - vertaald uit deze blueprint naar uitvoerbare engineeringfasen zonder scopeverbreding
