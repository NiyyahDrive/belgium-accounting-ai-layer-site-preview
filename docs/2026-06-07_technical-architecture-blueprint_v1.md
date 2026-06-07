# Belgium Accounting AI Layer — Technical Architecture Blueprint v1

_Datum: 2026-06-07_

## 1. Doel en uitgangspunten

Dit document werkt de **implementatiegerichte technische blueprint** uit voor het Belgium Accounting AI Layer-platform. Het sluit expliciet aan op de bestaande positionering:

- **geen nieuw boekhoudpakket**
- **geen core replacement**
- **read-mostly v1**
- **human-in-the-loop als standaard**
- **één platformervaring**, niet een losse verzameling AI-tools

De technische keuzes hieronder zijn daarom gericht op:

- snelle implementatie op een **EU/VPS-first** stack
- lage integratiefrictie voor Belgische boekhoudkantoren
- auditability en AVG/vertrouwen vanaf dag 1
- multi-tenant operatie zonder onnodige platformcomplexiteit
- duidelijke groeipaden naar managed of dedicated deployments
- snellere opbouw van cliëntspecifieke dashboards en insight views dan met losse Power BI-achtige tooling, maar alleen als verlengstuk van control/review/close

## 2. Executive architectuurbesluit

### Aanbevolen v1-architectuur
Bouw v1 als een **modulaire monolith + workers** op een VPS-first Docker-platform:

- **Frontend**: Next.js webapp
- **Backend API**: NestJS of Fastify/TypeScript service
- **Async processing**: worker services via BullMQ + Redis
- **Primary database**: PostgreSQL 16
- **Vector/search**: pgvector in dezelfde PostgreSQL-cluster voor v1
- **Object storage**: S3-compatible storage, bij voorkeur EU-hosted (MinIO self-hosted of managed object storage)
- **Reverse proxy / TLS**: Caddy of Traefik
- **Auth**: Keycloak of Authentik voor SSO/RBAC
- **Observability**: Grafana + Loki + Prometheus + Sentry
- **Backups**: pgBackRest + restic naar externe EU bucket
- **Deploy**: Docker Compose in v1, met pad naar k3s wanneer team/scale dit vereist

### Waarom dit de juiste v1 is
Deze setup past bij de productstrategie:

- snel genoeg om in **30 dagen** een pilot-ready backbone neer te zetten
- robuust genoeg voor dossiers, audit trail en documentstromen
- geen over-engineering met microservices of zware Kubernetes-setup op dag 1
- duidelijk migratiepad naar **managed Postgres**, **managed object storage** en **dedicated tenant stacks**

## 3. Product-naar-systeemvertaling

De productpropositie “één platformervaring voor control, review, close en bounded reporting/advisory enablement bovenop de bestaande stack” vertaalt technisch naar vijf lagen.

### 3.1 Bronlaag
Externe systemen waaruit read-mostly data wordt opgehaald:

- boekhoudsoftware
- bank/CODA-bronnen
- mailboxen
- documentopslag
- practice management / CRM
- Peppol/UBL-bronnen

### 3.2 Integratielaag
Doel: data betrouwbaar ophalen, normaliseren en herhaalbaar verwerken.

Componenten:

- connector adapters per bron
- scheduler voor polling en delta sync
- webhook endpoints waar beschikbaar
- file ingestion pipeline
- e-mail ingestion pipeline
- mapping naar canoniek model
- idempotency + deduplicatie

### 3.3 Canonical data layer
Doel: één intern operationeel model bovenop verschillende bronsystemen.

Bevat:

- dossiers
- periodes
- boekingen/journals
- documenten
- requests
- findings
- close status
- AI recommendations
- approvals
- audit events

### 3.4 Intelligence layer
Doel: AI en control-logica bruikbaar maken binnen workflows, niet als losstaande chat.

Bevat:

- OCR/extractie
- documentclassificatie
- matching
- rules engine
- anomaly signals
- retrieval
- LLM orchestration
- confidence scoring
- source attribution

### 3.5 Experience + governance layer
Doel: één operationele cockpit met ingebouwde controle.

Bevat:

- reviewer workbench
- close cockpit
- request center
- client insight views
- AI summary views
- advisory prep views
- role-based access
- approval gates
- audit trail
- AI policy controls

## 4. Systeemlagen en componentkeuzes

## 4.1 Frontend
### Keuze
**Next.js 15 + TypeScript + Tailwind + component library (shadcn/ui of Mantine)**

### Waarom
- snel te bouwen cockpit-UI
- SSR/ISR waar nodig
- goed ecosysteem voor auth, forms, dashboards en interne insight views
- makkelijk deploybaar als container

### Kernschermen v1
- kantoor dashboard
- dossier cockpit
- reviewer workbench
- close cockpit
- request center
- client insight view builder
- advisory prep view
- document triage
- tenant/admin settings
- audit trail viewer

## 4.2 Backend API
### Keuze
**NestJS + TypeScript + Prisma of Drizzle ORM**

### Waarom
- gestructureerd genoeg voor teams en domeinmodules
- goede ondersteuning voor queues, auth, validation, OpenAPI
- TypeScript end-to-end versnelt iteratie

### Domeinmodules
- auth & identity
- tenant management
- client/dossier/periode
- connectors
- documents
- email threads
- controls/findings
- requests/workflows
- AI recommendations
- insight view definitions
- advisory narratives
- approvals
- audit/compliance
- reporting summaries

## 4.3 Async processing
### Keuze
**BullMQ + Redis**

### Waarom
Vrijwel alle waardevolle accounting-AI flows zijn asynchroon:

- sync jobs
- mailbox polling
- OCR/extractie
- classification
- embeddings
- summary generation
- nightly controls
- notifications

### Belangrijke queues
- `connector-sync`
- `document-ingest`
- `email-ingest`
- `ocr-extract`
- `classification`
- `matching`
- `controls-run`
- `llm-tasks`
- `notifications`
- `backup-verification`

## 4.4 Database
### Keuze
**PostgreSQL 16** als primaire database

### Waarom
- transactioneel betrouwbaar
- sterk audit- en relationeel model
- JSONB voor bronpayloads en AI metadata
- row-level security mogelijk
- pgvector beschikbaar voor retrieval

### Aanvullingen
- `pgvector` voor embeddings/retrieval
- `pgcrypto` voor field-level encryptie waar nodig
- `pgaudit` of applicatieve audit events

## 4.5 Object storage
### Keuze
**S3-compatible object storage in de EU**

Voorkeursvolgorde:
1. **Managed EU object storage** bij Hetzner/OVH/Scaleway/Exoscale of Backblaze EU-regio indien contractueel passend
2. **MinIO** op aparte VPS indien managed storage niet beschikbaar is

### Gebruik
- originele documenten
- verwerkte documentversies
- OCR text artifacts
- AI evidence bundles
- exportbestanden
- backup archives

### Waarom niet alles in Postgres
Documenten, mailbijlagen en exports horen niet als blobs in de primaire OLTP-database thuis.

## 4.6 Search en retrieval
### v1-keuze
**Postgres + pgvector + full-text search**

### Wanneer uitbreiden
Pas naar OpenSearch/Elasticsearch wanneer:

- er veel cross-tenant searchvolume ontstaat
- retrieval latency merkbaar stijgt
- complexe aggregatie- en analysecases dit rechtvaardigen

Voor v1 is extra search-infra meestal onnodige complexiteit.

## 4.7 Identity & access
### Keuze
**Keycloak** of **Authentik**

### Waarom
- SSO met Microsoft 365/Google mogelijk
- RBAC en groups
- MFA
- auditbare login/events
- scheiding tussen platform identity en applicatielogica

### Voorkeur
- **Authentik** als eenvoudigere VPS-first keuze
- **Keycloak** als enterprise-SAML/complexe identity roadmap nu al essentieel is

## 4.8 Reverse proxy en edge
### Keuze
**Caddy** voor eenvoud of **Traefik** als dynamische multi-service routing wenselijk is

### v1-advies
Gebruik **Caddy** voor:
- automatische TLS
- eenvoudige config
- reverse proxy
- basis security headers

## 4.9 Secrets management
### v1-keuze
- secrets niet in `.env` op developers laptops verspreiden
- productie-secrets opslaan in **1Password/Bitwarden + CI injectie** of **Infisical self-hosted**

### Praktisch advies
Voor een klein team:
- **1Password Secrets Automation** of **Bitwarden + handoff discipline** is vaak realistischer dan meteen Vault

Voor hogere security-eisen:
- **Infisical** of managed secret manager met EU-hosting

## 4.10 CI/CD
### Keuze
**GitHub Actions** of **GitLab CI**

Pijplijn:
- lint/test/build
- container image build
- vulnerability scan
- migration check
- deploy naar staging
- manual approval naar productie

## 5. Integraties met bestaande boekhoudsoftware

## 5.1 Integratieprincipes
V1 moet **read-mostly** blijven. Dat betekent:

- ophalen van transacties, metadata, dossierstatus en documentlinks
- genereren van findings, requests en conceptacties in het AI Layer-platform
- write-back alleen voor laag-risico metadata of later optioneel

### V1 doet niet
- autonoom boeken
- transacties definitief aanpassen in boekhoudpakket
- black-box reconciliaties terugschrijven
- fiscale filings indienen

## 5.2 Prioritaire integraties
### Boekhoudsoftware
Aanbevolen eerste supportvolgorde:
1. **Exact Online**
2. **Yuki**
3. **Twinfield**
4. **Odoo Accounting**
5. later: **WinBooks**, **Octopus**, **Venice**

### Document- en bankstromen
- SharePoint / OneDrive
- Google Drive
- mailbox via Microsoft Graph of Gmail API
- CODA/CodaBox/Isabel-bestanden
- UBL/XML/PDF documentstromen
- Peppol documentreferenties waar praktisch beschikbaar

### Practice management / CRM
Latere maar nuttige integraties:
- AdminPulse
- Teamleader
- bestaand CRM of praktijkbeheer

## 5.3 Connectorpatroon
Elke connector krijgt hetzelfde interne contract:

- `source_system`
- `source_tenant_id`
- `source_entity_type`
- `source_entity_id`
- `source_updated_at`
- `canonical_entity_type`
- `canonical_payload`
- `raw_payload_ref`
- `sync_run_id`
- `hash_fingerprint`

### Voordelen
- uniforme sync-observability
- makkelijker herverwerken
- snellere support voor extra systemen
- minder maatwerk per bron

## 5.4 Syncmodellen
Ondersteun drie syncvormen:

- **historische bootstrap**: eerste ingest van pilotdossiers
- **delta sync**: periodieke polling op wijzigingsdatum/checkpoints
- **event/webhook sync**: alleen waar bron dit stabiel ondersteunt

## 5.5 Praktische v1-integratiescope
Voor de eerste pilot:

- 1 accounting source
- 1 mailbox source
- 1 document source
- 30–50 dossiers
- alleen de data die nodig is voor dossiercompleetheid, findings en close status

Dat voorkomt dat techniek de pilotambitie ondermijnt.

## 6. Canoniek datamodel

## 6.1 Tenant- en organisatiemodel
Het platform heeft twee operationele niveaus:

### Niveau 1: Platform tenant
Meestal het **boekhoudkantoor**.

Velden:
- tenant_id
- naam
- land
- dataprocessing region
- subscription/pilot plan
- policy pack
- feature flags

### Niveau 2: Managed client entity
De **klantdossiers/vennootschappen** van dat kantoor.

Velden:
- managed_entity_id
- tenant_id
- legal_entity_name
- ondernemingsnummer / VAT number waar toegestaan
- dossierverantwoordelijke
- review owner
- reporting cadence
- source mappings

### Belangrijke keuze
Voor v1 is een **boekhoudkantoor de tenant**, en zijn hun klanten **managed entities binnen die tenant**.

Dat past het best bij de operationele realiteit:
- kantoor is de betalende en beherende partij
- medewerkers werken over meerdere klantdossiers heen
- cliënten mogen beperkte portaltoegang krijgen zonder volledig aparte tenantlogica

## 6.2 Kernentiteiten
Minimaal nodig:

- Tenant
- User
- RoleAssignment
- ManagedEntity / Client
- Dossier / Engagement
- ReportingPeriod
- SourceConnection
- SourceSyncRun
- Journal
- GLEntry
- APInvoice
- ARInvoice
- BankTransaction
- VATRecord
- Document
- DocumentVersion
- EmailThread
- EmailMessage
- Request
- RequestItem
- Finding
- ControlRun
- CloseChecklistItem
- AISession
- AIRecommendation
- ApprovalAction
- AuditEvent
- Notification

## 6.3 Data-opslagpatroon per entiteit
### Relationeel in Postgres
Voor:
- gebruikers en rollen
- dossiers en periodes
- findings
- requests
- approvals
- audit events
- control runs

### JSONB in Postgres
Voor:
- connector raw metadata
- model inputs/outputs
- source-specific fields
- confidence distributions

### Object storage
Voor:
- originele documenten
- e-mailbijlagen
- OCR artefacten
- exports

### Vector store in Postgres
Voor:
- document chunks
- email chunks
- knowledge snippets
- retrieval metadata

## 6.4 Database-opzet
### Aanbevolen PostgreSQL schemas
- `public` of `app`: primaire applicatietabellen
- `audit`: audit events en evidence records
- `connector`: sync state, checkpoints, raw references
- `ai`: prompts, responses, embeddings metadata, policy logs

### V1 tenant-isolatie in database
Gebruik een combinatie van:
- `tenant_id` op vrijwel elke business-tabel
- `managed_entity_id` waar relevant
- row-level security voor app-queries
- service-accounts met beperkte rechten

### Waarom dit v1-geschikt is
- sneller dan aparte database per tenant
- genoeg isolatie voor eerste kantoren
- eenvoudiger reporting en operations
- pad open naar dedicated tenant db bij enterprise deals

## 6.5 Wanneer dedicated storage nodig wordt
Schakel over naar **dedicated database + dedicated object bucket** per tenant wanneer:

- contractueel vereist
- hoog datavolume per kantoor
- strengere security-eisen
- enterprise onboarding met DPA/security review

## 7. Tenant model en isolatie

## 7.1 Aanbevolen tenant model
### V1
**Shared application, shared database, logical isolation via tenant_id + RLS, dedicated object prefixes/buckets per tenant.**

### V1.5 / V2
Voor grotere tenants:
- dedicated database instance
- dedicated object bucket
- eventueel dedicated worker pool

## 7.2 Isolatieniveaus
### Applicatielaag
- elk request krijgt tenant context uit auth token
- policy enforcement in middleware/service layer
- alle queries tenant-scoped

### Datalaag
- row-level security
- tenant-aware indexes
- encryptie voor gevoelige velden

### Object storage
- prefix: `tenant/{tenant_id}/...`
- desnoods aparte bucket per tenant met striktere policies

### AI-laag
- retrieval uitsluitend binnen tenant boundary
- geen cross-tenant embeddings index
- prompt building alleen uit tenant-approved bronnen

## 7.3 Rolmodel
### Kantoorrollen
- Platform Admin
- Office Admin
- Manager
- Reviewer
- Dossierbeheerder
- Read-only Partner
- Compliance/Audit Viewer

### Klantrollen
- Client Admin
- Client Contributor
- Client Read-only

## 7.4 Approval model
Verplicht approval gates voor:
- externe klantmails versturen
- material findings sluiten zonder reviewer
- AI-samenvattingen markeren als final
- eventuele latere write-back acties

## 8. AI-assistentenmodel zonder wildgroei

## 8.1 Architectuurprincipe
Niet elke use case krijgt een aparte losse chatbot. Gebruik een **bounded assistant registry**: een beperkt aantal taakgerichte assistenten binnen één platformervaring.

Reporting en advisory vallen hier alleen binnen als **bounded capability**: de assistent mag werken op canonical dossier-, periode-, finding- en close-data om accountantgestuurde cliëntinzichten en adviesvoorstellen te versnellen, maar niet uitgroeien tot vrije BI- of autonome advieslaag.

## 8.2 V1-assistenten
### 1. Intake Assistant
Taken:
- documentclassificatie
- ontbrekende metadata voorstellen
- dossier/periode match-suggesties
- confidence en bronverwijzingen tonen

### 2. Review Assistant
Taken:
- findings uitleggen
- uitzonderingen samenvatten
- brondata aanwijzen
- reviewer-notes voorstellen

### 3. Close Assistant
Taken:
- open blockers samenvatten
- periodestatus duiden
- prioritering voorstellen

### 4. Client Request Assistant
Taken:
- concept klantvragen genereren
- ontbrekende stukken bundelen
- herinneringen voorstellen

### 5. Reporting Assistant
Taken:
- voorlopige management commentary
- dossier- of periode-summary
- cliëntspecifieke insight narratives op basis van review/close-data
- dashboard annotations en adviesvoorstellen voor accountant-review
- brononderbouwde narrative output

## 8.3 Geen wildgroei: activation model
Assistenten worden **niet vrij gecreëerd door eindgebruikers**.

In plaats daarvan:
- platform beheert een vaste set assistant types
- tenant admin activeert capability packs per kantoor
- extra gedrag komt via policy/config, niet via nieuwe assistant-sprawl

### Voorbeeld capability packs
- `document-intake-pack`
- `review-pack`
- `close-pack`
- `client-requests-pack`
- `reporting-advisory-pack`

## 8.4 AI-orchestratie
Gebruik een interne service als **AI Gateway** met:
- model routing
- prompt templating
- tenant policies
- PII controls
- logging
- rate limiting
- human-approval flags

## 8.5 Modelstrategie
### Praktisch v1-modelbeleid
- gebruik primair één sterke general-purpose LLM voor tekstredenering/summaries
- gebruik aparte OCR/document-AI waar nuttig
- gebruik deterministische rules vóór LLM waar mogelijk

### Aanbevolen patroon
- OCR/extractie: gespecialiseerde document pipeline
- classificatie/matching: combinatie van rules + smaller model
- samenvattingen/uitleg/conceptmails: general LLM

### Belangrijk
LLM’s geven **aanbevelingen**, geen autonome boekhoudbeslissingen.

## 8.6 AI logging en evidence
Per AI-actie opslaan:
- tenant_id
- assistant_type
- input scope refs
- prompt template version
- model name/version
- output
- confidence / review-needed flag
- human action genomen ja/nee
- final status

## 9. Security blueprint

## 9.1 Basisprincipes
- least privilege
- default-deny tussen tenants
- encryptie in transit en at rest
- auditability by design
- human approval voor externe of materiële acties
- geen productiegegevens in dev zonder masking

## 9.2 Netwerkarchitectuur
### VPS-first topologie
- publieke toegang alleen via reverse proxy
- app, worker, db, redis en MinIO op private Docker-netwerken
- SSH alleen via bastion/VPN of IP allowlist
- database nooit publiek bereikbaar

## 9.3 Auth en sessies
- SSO met Microsoft 365 waar mogelijk
- MFA verplicht voor admins/reviewers/managers
- korte sessielevensduur + refresh tokens
- device/session logging

## 9.4 Encryptie
### In transit
- TLS 1.2+
- HSTS
- secure cookies

### At rest
- VPS disk encryption waar host dit ondersteunt
- PostgreSQL volume encrypted at rest via host/disk layer
- object storage SSE of encrypted disks
- gevoelige velden optioneel field-level encrypted

## 9.5 Key management
Voor v1 pragmatisch:
- secrets in dedicated secret manager
- rotatie op vaste cadence
- aparte keys per omgeving

Voor grotere klanten:
- tenant-specifieke encryptiesleutels of dedicated storage-keys

## 9.6 Auditability
Log minimaal:
- login/logout
- role changes
- connector config changes
- data exports
- AI outputs en approvals
- finding status changes
- request lifecycle changes
- admin overrides

## 9.7 Applicatiebeveiliging
- server-side authorization checks, nooit alleen UI-based
- CSRF/XSS/SSR-fouten actief mitigeren
- upload scanning op malware
- content-type validatie
- rate limits op auth en ingestion endpoints
- secure webhook signature validation

## 10. Privacy en AVG / Belgische context

## 10.1 Verwerkingsrol
Waarschijnlijk model:
- **boekhoudkantoor** = verwerkingsverantwoordelijke voor klantdossiers
- **platformleverancier** = verwerker

Dit moet contractueel scherp staan in:
- DPA
- verwerkingsregister
- subprocessorlijst
- bewaartermijnen

## 10.2 EU data residency
Aanbevolen harde regel:
- productiegegevens uitsluitend in **EU/EER-regio’s** opslaan en verwerken
- object storage, database, backups en logging eveneens EU-hosted
- geen impliciete data-uitstroom naar niet-EU LLM-providers zonder expliciete contractuele dekking

## 10.3 DPA en subprocessors
Nodig vóór live pilot:
- Data Processing Agreement
- lijst van subprocessors
- beschrijving van data categories
- TOMs (technical and organizational measures)
- incident/meldprocedure

## 10.4 Dataminimalisatie
In v1 alleen ophalen wat nodig is voor:
- dossiercompleetheid
- control/review
- close status
- reporting prep

Niet standaard spiegelen:
- volledige historische mailboxen buiten scope
- irrelevante HR/persoonsdata
- niet-benodigde klantbestanden

## 10.5 Bewaartermijnen
Stel bewaarbeleid in per datacategorie:
- raw connector snapshots: korter, bv. 30–90 dagen
- audit events: langer, bv. 1–3 jaar afhankelijk van contract/compliancebehoefte
- AI intermediate artifacts: beperkt bewaren, tenzij nodig voor explainability
- documenten: conform afgesproken kantoorbeleid en bronrol

## 10.6 Rechten van betrokkenen
Ondersteun operationeel:
- export van persoonsgegevens per dossier waar redelijkerwijs mogelijk
- delete/retention workflows volgens contractuele grenzen
- log van datatoegang en exports

## 10.7 Privacy by design in AI
- retrieval enkel tenant-scoped
- prompt templates zonder onnodige PII
- masking/redaction voor gevoelige velden waar mogelijk
- model usage logging
- optioneel “no training on customer data”-garantie via providerkeuze

## 11. Deployment topology

## 11.1 Aanbevolen VPS-first productieopzet
### Fase 1: pilot/early production
**3-node minimum** in één EU-regio:

1. **Edge/App VPS**
   - Caddy
   - Next.js frontend
   - backend API
   - Sentry relay optioneel

2. **Worker VPS**
   - async workers
   - OCR jobs
   - scheduled syncs
   - heavy AI orchestration

3. **Data VPS**
   - PostgreSQL
   - Redis
   - MinIO alleen als managed object storage ontbreekt

### Waarom niet alles op één VPS
Dat kan voor demo, maar is zwak voor:
- security isolation
- resource contention door OCR/AI jobs
- backup/restore discipline
- incident recovery

## 11.2 Als managed verstandiger is
Zelfs in een VPS-first strategie zijn sommige managed services vaak verstandiger:

### Sterk aanbevolen managed indien budget toelaat
- managed object storage
- managed PostgreSQL backups of managed Postgres
- managed email delivery
- managed uptime monitoring / Sentry SaaS EU setup indien DPA passend

### Reden
Deze onderdelen zijn operationeel gevoelig en leveren weinig productdifferentiatie op.

## 11.3 Containerstructuur
### App VPS
- `reverse-proxy`
- `web`
- `api`
- `auth` (indien lokaal gehost)

### Worker VPS
- `worker-sync`
- `worker-docs`
- `worker-ai`
- `scheduler`

### Data VPS
- `postgres`
- `redis`
- `minio` (optioneel)
- `backup-agent`
- `node-exporter`

## 11.4 Omgevingen
Minimaal:
- `dev`
- `staging`
- `production`

### Regel
Geen gedeelde productiecredentials in staging. Staging mag synthetische of gemaskte data gebruiken, niet blind kopieën van productie.

## 12. Observability en operations

## 12.1 Doel
Accounting workflows zijn audit- en deadlinegevoelig. Observability moet zowel technisch als operationeel zijn.

## 12.2 Aanbevolen stack
- **Prometheus**: metrics
- **Grafana**: dashboards
- **Loki**: logs
- **Tempo** of OpenTelemetry tracing: request/job traces
- **Sentry**: applicatiefouten en performance
- **Uptime Kuma** of Better Stack**:** externe checks

## 12.3 Wat meten
### Platform health
- CPU/memory/disk
- db connections
- queue depth
- job failures
- object storage availability

### Product health
- sync success rate per connector
- document ingest latency
- OCR/classification turnaround time
- finding false-positive review rate
- AI task completion rate
- pending approvals
- failed external message drafts

### Compliance health
- audit log write failures
- export events
- admin overrides
- retention cleanup jobs

## 12.4 Alerting
Alarmen op:
- database backup failure
- queue backlog boven threshold
- connector error rate spike
- disk nearly full
- auth outage
- failed scheduled controls
- object storage unavailable

## 12.5 Runbooks
Maak voor v1 minimaal runbooks voor:
- connector outage
- restore van Postgres
- restore van object storage
- revoked credentials / secret rotation
- AI provider outage / failover naar degraded mode

## 13. Back-up en disaster recovery

## 13.1 Backupstrategie
### PostgreSQL
- dagelijkse full backup
- continue WAL archiving of minstens frequente incremental backups
- point-in-time recovery waar mogelijk

### Object storage
- versioning aan
- dagelijkse snapshot of replication naar tweede EU-locatie

### Config/secrets/infrastructure
- infra-as-code repo backuppen
- auth realm/config exporteren
- container manifests bewaren

## 13.2 Tooling
- **pgBackRest** voor PostgreSQL
- **restic** voor encrypted offsite backups
- tweede EU bucket/provider voor offsite copy

## 13.3 Hersteldoelen
### Realistische v1-doelen
- **RPO**: 15 minuten tot 24 uur, afhankelijk van budget en WAL setup
- **RTO**: 4 tot 8 uur voor pilotomgeving

### Voor productiecontracten expliciteren
Deze doelen moeten in pilot/contractdocumenten benoemd worden, niet impliciet gelaten.

## 13.4 DR-scenario’s
Ondersteun minimaal:
- verlies van app VPS
- verlies van worker VPS
- corrupte deploy
- database restore uit backup
- object storage herstel uit tweede locatie

## 13.5 Backupverificatie
Een backup die nooit is teruggezet is geen bewezen backup. Plan:
- wekelijkse integrity checks
- maandelijkse restore-test naar staging
- log en sign-off van restore-test

## 14. Gebruik door boekhoudkantoren en hun klanten

## 14.1 Operationeel model voor kantoren
### Dossierbeheerder
- ziet missing docs
- verwerkt documenttriage
- initieert klantopvragingen
- werkt lage/midden-severity findings af

### Reviewer
- beoordeelt findings
- valideert AI-samenvattingen
- keurt uitzonderingen en closures goed

### Manager/Partner
- ziet close cockpit
- prioriteert blockers
- bewaakt teamload en deadlines
- gebruikt client insight views en advisory prep views om data-gedreven klantadvies voor te bereiden vanuit dezelfde cockpit

## 14.2 Gebruik door klanten van het kantoor
Klanten gebruiken geen volledige accounting cockpit. Ze krijgen een **beperkte portalervaring** voor:
- open requests
- upload van ontbrekende stukken
- status van aangeleverde documenten
- eventueel veilige messaging

Klanten krijgen in v1 **geen vrije BI-omgeving** en geen autonome adviesfeed. Eventuele gedeelde dashboard- of insight views worden door het kantoor geselecteerd, begrensd en gepubliceerd vanuit dezelfde governance-, approval- en auditlaag.

### Waarom belangrijk
Dit houdt de platformervaring coherent:
- kantoor werkt in één cockpit
- klant ziet alleen het deel dat voor aanlevering/samenwerking nodig is

## 14.3 Eén platformervaring technisch afdwingen
Om te voorkomen dat het platform toch losse tools wordt:
- één navigatiemodel
- één identitylaag
- één audit model
- één request/finding model
- één canonical databasis voor review-, close-, dashboard- en advisory views
- assistants alleen als ingebedde workflowpanelen, niet als losse apps

## 15. Controls engine en workflowlogica

## 15.1 V1 rules-first aanpak
Begin met deterministische controles, niet met pure ML:
- ontbrekend document
- boeking zonder documentlink
- duplicate invoice signal
- inconsistent BTW-tarief
- afwijkend rekeninggebruik t.o.v. historiek
- basic bank/open-item mismatch

## 15.2 Finding model
Per finding opslaan:
- tenant_id
- managed_entity_id
- dossier_id
- period_id
- control_type
- severity
- confidence
- source references
- AI explanation
- status
- assigned_to
- reviewer_required

## 15.3 Workflow states
### Requests
- open
- waiting_on_client
- received
- needs_review
- resolved
- dismissed

### Findings
- new
- acknowledged
- in_review
- resolved
- dismissed

### Close checklist
- not_started
- in_progress
- blocked
- ready_for_review
- closed

## 16. Concrete infrastructuurkeuzes voor snelle VPS-implementatie

## 16.1 Aanbevolen hostingprofiel
### Budgetbewuste maar serieuze setup
- provider: **Hetzner**, **OVHcloud**, **Scaleway** of vergelijkbare EU-host
- regio: EU, bij voorkeur België-nabijheid niet vereist zolang EU-residency en contracten goed zitten

### Startcapaciteit
- App VPS: 4 vCPU / 8 GB RAM
- Worker VPS: 8 vCPU / 16 GB RAM
- Data VPS: 8 vCPU / 16–32 GB RAM + snelle NVMe

Dit is meestal genoeg voor een vroege pilot met 30–50 dossiers en documentverwerking.

## 16.2 OS en runtime
- Ubuntu LTS of Debian stable
- Docker Engine + Compose
- unattended security updates
- fail2ban of provider firewall policies

## 16.3 E-mail
Voor outbound notificaties/requests:
- Postmark, Mailgun EU-geschikt contractueel, of Microsoft 365 relay

Voor inbound mailboxing:
- Microsoft Graph heeft prioriteit in Belgische kantoorcontext

## 16.4 Bestandsbeveiliging
- virus/malware scan op uploads
- MIME-type validatie
- file size limits
- checksum logging

## 17. Gefaseerde rollout

## 17.1 Fase A — internal foundation
- canonical model
- auth/RBAC
- connector framework
- audit events
- dossier cockpit skeleton

## 17.2 Fase B — pilot v1
- 1 boekhoudbron
- 1 mailboxbron
- 1 documentbron
- 30–50 dossiers
- findings + requests + close cockpit basis

## 17.3 Fase C — hardening
- backup drills
- observability alerts
- security baseline review
- tenant policy packs
- portal polish

## 17.4 Fase D — scale-out
- extra accounting connectors
- managed Postgres/object storage
- optional dedicated tenant deployments
- deeper reporting layer

## 17.5 Fase E — controlled write-back
Alleen na bewezen auditability en klantvraag:
- low-risk status sync
- request status update terug naar bron
- later beperkte metadata write-back

Niet starten met write-back.

## 18. Concreet 30-dagen implementatiepad

## Week 1 — scope, backbone en security basis
### Doelen
- architectuur locken
- infrastructuur opzetten
- tenancy en auth modelleren

### Taken
- bevestig eerste pilot-bronnen: 1 accounting, 1 mailbox, 1 documentbron
- provision 3 VPS’en in EU-regio
- zet Docker, reverse proxy en basisnetwerken op
- deploy Postgres, Redis, object storage keuze
- deploy auth provider
- maak repo-structuur voor `web`, `api`, `workers`, `infra`
- definieer DB schema v1
- implementeer tenant context + RBAC basis
- activeer Sentry/Grafana/Loki

### Exit criteria
- staging stack draait
- login werkt
- tenant model staat
- audit event skeleton bestaat

## Week 2 — connector framework en canonical ingest
### Doelen
- eerste betrouwbare datainname
- canoniek model operationeel

### Taken
- bouw connector SDK/pattern
- implementeer eerste accounting connector read-only ingest
- implementeer mailbox ingest via Microsoft Graph of Gmail API
- implementeer document ingest uit SharePoint/Drive/upload
- sla raw refs en canonical records op
- bouw sync run logging + retry/idempotency
- maak eerste dossier/periode mapping

### Exit criteria
- ten minste één end-to-end sync run werkt
- dossierrecords zichtbaar in UI
- sync errors zijn observeerbaar

## Week 3 — document intelligence, requests en findings
### Doelen
- eerste echte waardevolle workflow

### Taken
- document upload/classificatieflow
- OCR/extractie pipeline
- matching van documenten aan dossier/periode
- missing-document control
- boeking-zonder-document control
- request state machine
- concept klantmail generatie met approval gate
- reviewer workbench eerste versie

### Exit criteria
- document naar finding flow werkt
- open requests zichtbaar
- AI conceptmails gelogd en reviewbaar

## Week 4 — close cockpit, hardening en pilot readiness
### Doelen
- operationele cockpit neerzetten
- basis compliance en recoverability aantonen

### Taken
- close cockpit bouwen
- AI summary per dossier/periode
- audit trail viewer afronden
- backupjobs configureren
- restore-test naar staging uitvoeren
- alerting thresholds instellen
- security checklist doorlopen
- pilot admin guide en runbook schrijven

### Exit criteria dag 30
- cockpit toont echte dossierstatussen
- backup + restore getest
- AI outputs auditbaar
- pilot-tenant kan live worden ingericht

## 19. Aanbevolen build-volgorde van functionaliteit

Bouw in deze volgorde:

1. auth + tenant context
2. canonical model
3. connector framework
4. document/email ingest
5. findings engine
6. requests workflow
7. close cockpit
8. AI summaries/explanations
9. klantportal
10. pas daarna bredere reporting en optionele write-back

## 20. Belangrijkste risico’s en mitigaties

## 20.1 Integratierisico
**Risico:** bron-API’s zijn inconsistent of beperkt.

**Mitigatie:**
- connector abstraction
- starten met 1 bron
- read-only scope
- raw snapshot refs bewaren

## 20.2 AI-betrouwbaarheid
**Risico:** te veel false positives of onverklaarbare output.

**Mitigatie:**
- rules-first controles
- confidence thresholds
- menselijke approval
- source attribution verplicht

## 20.3 Privacy/compliance
**Risico:** onduidelijke dataflow naar subprocessors.

**Mitigatie:**
- EU-hosting
- DPA’s vooraf
- subprocessor register
- data minimization

## 20.4 Operationele last
**Risico:** self-hosted VPS-stack kost te veel beheer.

**Mitigatie:**
- managed object storage zodra mogelijk
- managed Postgres overwegen vanaf eerste betalende klanten
- Compose houden in v1, niet prematuur naar Kubernetes

## 20.5 Tenant-isolatie
**Risico:** logische multi-tenancy wordt slordig geïmplementeerd.

**Mitigatie:**
- RLS vanaf begin
- tenant-scoped integration tests
- audit op admin actions
- retrieval boundary enforcement

## 21. Harde aanbevelingen

1. **Start niet met microservices.** Gebruik modulaire monolith + workers.
2. **Start niet met write-back.** Houd v1 read-mostly.
3. **Maak het boekhoudkantoor de tenant.** Beheer klanten als managed entities binnen die tenant.
4. **Beperk AI tot vijf bounded assistants.** Geen vrijgroeiende chatbot-sprawl.
5. **Gebruik PostgreSQL als kern.** Voeg pas extra infra toe wanneer echte schaal dit afdwingt.
6. **Host alles in de EU.** Ook backups, logging en object storage.
7. **Behandel auditability als kernfeature.** Niet als latere compliance-laag.
8. **Doe maandelijks restore-tests.** Backup zonder restore-test telt niet.
9. **Bouw één cockpit.** Geen aparte apps voor mail, docs, review en close.
10. **Kies managed waar het operationeel geen differentiatie oplevert.** Vooral storage, backup en later database.

## 22. Samenvatting in één zin

De juiste v1 voor Belgium Accounting AI Layer is een **EU-gehoste, VPS-first modulaire monolith met workers, PostgreSQL, S3-compatible storage, strikte tenant-isolatie, bounded AI-assistenten en audit-first governance**, gebouwd als **read-mostly orchestration/control layer bovenop bestaande boekhoudsoftware** — zodat een Belgisch boekhoudkantoor binnen 30 dagen een geloofwaardige pilot kan draaien zonder core replacement.
