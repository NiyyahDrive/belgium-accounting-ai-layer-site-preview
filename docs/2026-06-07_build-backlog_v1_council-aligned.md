# Belgium Accounting AI Layer — Build Backlog v1 (Council-aligned)

_Datum: 2026-06-07_

## 1. Executive build decision

**Build v1 als een audit-first, read-mostly control/review/close-platform bovenop bestaande boekhoudsoftware — niet als nieuw boekhoudpakket en niet als losse AI-tools.**

De v1-bouwbeslissing is daarom hard:
- **één platformervaring i.p.v. losse tools**: één cockpit, één identitylaag, één auditmodel, één request/finding-model en assistants alleen als ingebedde workflowpanelen
- **modulaire monolith + workers** op EU/VPS-first Docker-platform
- **human-in-the-loop als standaard** met approval gates voor klantmails, materiële correcties, compliance-excepties en finale review/sign-off
- **read-mostly v1**: wel lezen, normaliseren, analyseren en prioriteren; geen autonome write-back, filings of betalingen
- **smalle wedge**: dossiers sneller review-ready en close-ready maken voor 1 kantoor, 1 team, 30–50 dossiers en 1 periodeproces
- **bounded reporting/advisory enablement** alleen als verlengstuk van de wedge: sneller cliëntdashboards, insight views en adviesvoorstellen opbouwen vanuit dezelfde canonical data dan met losse Power BI-achtige tooling

## 2. Release gates

Release naar pilot is alleen toegestaan als onderstaande gates groen zijn:
- **Platform gate**: één navigatiemodel, één login/SSO-flow, één cockpit voor intake/review/close/requests
- **Tenant gate**: tenant isolation getest, default-deny tussen tenants, tenant-scoped retrieval en integration tests aanwezig
- **Governance gate**: approval gates actief, audit events actief, evidence bundles verplicht op findings en AI-output
- **Security gate**: EU/EER-hosting bevestigd voor database, storage, backups en logging; MFA actief voor admins/reviewers/managers; secrets buiten losse `.env`-sprawl
- **Data gate**: 1 accounting source, 1 mailbox source en 1 document source draaien end-to-end met idempotente sync en observeerbare fouten
- **Recovery gate**: back-upjobs actief, restore-test naar staging uitgevoerd en gesigneerd
- **Workflow gate**: finding- en request-state machines werken; close-status per dossier/periode zichtbaar
- **AI gate**: AI Gateway in runtime, source attribution + confidence logging actief, degraded mode gedefinieerd voor LLM/OCR/mailbox/storage

## 3. Repo/service split

**Aanbevolen split: één monorepo, meerdere services.** Dit ondersteunt de gewenste platformervaring beter dan losse productrepo’s.

### Monorepo-onderdelen
- `web`: Next.js cockpit voor reviewer workbench, close cockpit, request center, dossierweergave en admin
- `api`: NestJS backend met domeinmodules, auth-integratie, tenant context, workflows en auditlogica
- `workers`: BullMQ-workers voor sync, OCR/extractie, classificatie, matching, controls, AI-taken en notificaties
- `infra`: Docker Compose, Caddy, deployment-config, provisioning, backup/restore, monitoring en secret-injectie

### Services/runtime
- `web`
- `api`
- `worker-sync`
- `worker-docs`
- `worker-ai`
- `scheduler`
- `auth`
- `postgres`
- `redis`
- `object-storage` (managed S3-compatible of MinIO fallback)
- `backup-agent`
- observability-stack

## 4. Module breakdown

### Platform foundation
- auth & identity
- tenant management
- role assignment / RBAC
- audit events
- AI Gateway
- feature flags / capability packs

### Source & ingest
- source connections
- connector SDK/pattern
- accounting ingest
- mailbox ingest
- document ingest
- sync run logging
- idempotency / deduplicatie
- raw refs + canonical mapping

### Canonical workflow model
- managed entities / clients
- dossiers / engagements
- reporting periods
- journals / GL entries / invoices / bank transactions / VAT records
- documents / document versions
- email threads / messages
- requests / request items
- findings / control runs
- close checklist items
- AI sessions / recommendations
- approvals / notifications

### Experience modules
- dossier cockpit
- reviewer workbench
- close cockpit
- request center
- client insight views
- advisory prep views
- document triage
- audit trail viewer
- admin/settings

### Intelligence modules
- OCR/extractie
- documentclassificatie
- matching dossier/periode
- rules-first controls
- anomaly signals
- retrieval / pgvector
- summaries, explanations en conceptmails
- insight narrative generation en dashboard annotations
- adviesvoorstellen voor accountant-review
- confidence + source attribution

## 5. Environments

Minimaal:
- `dev`
- `staging`
- `production`

Regels:
- staging gebruikt alleen synthetische of gemaskte data
- geen gedeelde productiecredentials in staging
- productie is EU/EER-only voor database, object storage, backups en logging
- staging moet deployment-, restore- en release-gate-omgeving zijn; niet alleen demo-omgeving

## 6. Deployment order

### Infrastructuurvolgorde
1. EU VPS/managed basis provisionen
2. netwerk, TLS en reverse proxy
3. PostgreSQL + Redis + object storage
4. auth provider
5. observability-stack
6. backup-agent en restore-pad
7. web/api/workers/scheduler

### Applicatievolgorde
1. auth + tenant context
2. canonical model
3. connector framework
4. document/email/accounting ingest
5. findings engine
6. requests workflow
7. close cockpit
8. AI summaries / explanations / conceptmails
9. audit trail hardening
10. pilot onboarding

## 7. 30-dagen sprintvolgorde

## Week 1 — scope, backbone en security basis
- pilotbronnen locken: 1 accounting, 1 mailbox, 1 documentbron
- 3-node EU basis opzetten of managed equivalent kiezen
- repo-structuur `web` / `api` / `workers` / `infra` maken
- auth provider deployen
- DB schema v1 + tenant context + RBAC basis bouwen
- AI Gateway contract vastleggen
- observability activeren

**Week 1 outcome:** staging draait, login werkt, tenantmodel staat, audit-event-skeleton bestaat.

## Week 2 — connector framework en canonical ingest
- connector SDK/pattern bouwen
- eerste accounting connector read-only ingest
- mailbox ingest implementeren
- document ingest implementeren
- raw refs + canonical records opslaan
- sync run logging, retries en idempotency bouwen
- dossier/periode mapping activeren

**Week 2 outcome:** minstens één end-to-end sync run werkt, dossiers zijn zichtbaar in UI, sync fouten zijn observeerbaar.

## Week 3 — document intelligence, findings en requests
- upload/classificatieflow bouwen
- OCR/extractie pipeline activeren
- matching document ↔ dossier/periode
- controls: missing document, booking without document link, duplicate/inconsistent VAT waar haalbaar
- finding model + workbench v1 bouwen
- request state machine bouwen
- concept klantmails via approval gate

**Week 3 outcome:** document-naar-finding-flow werkt, open requests zichtbaar, AI-conceptmails zijn gelogd en reviewbaar.

## Week 4 — close cockpit, hardening en pilot readiness
- close cockpit bouwen
- AI review/close summary per dossier/periode
- bounded client insight view templates bouwen op canonical dossier/periode/finding-data
- advisory prep flow bouwen met approval gate voor adviesvoorstellen
- audit trail viewer afronden
- backupjobs configureren
- restore-test naar staging uitvoeren
- alerting thresholds instellen
- security/release checklist afronden
- pilot admin guide + runbook schrijven

**Week 4 outcome:** echte dossierstatussen zichtbaar, backup/restore getest, AI-output auditbaar, pilot-tenant kan live worden ingericht.

## 8. Backlog per workstream

### A. Platform foundation
- monorepo + CI/CD pipeline
- auth provider keuze: Authentik of Keycloak
- SSO/MFA/RBAC
- tenant context propagation in web/api/workers
- audit event schema + logging
- capability pack model voor bounded assistants
- AI Gateway met model routing, prompt templating, PII controls en logging

### B. Data & connectors
- connector contract standaardiseren
- accounting connector #1 bouwen
- mailbox connector #1 bouwen
- document connector #1 bouwen
- bootstrap + delta sync
- retry, checkpointing, deduplicatie, idempotency
- source mapping naar canonical model

### C. Canonical data layer
- tenant, managed entity, dossier, period modellen
- document-, e-mail-, request- en finding-entiteiten
- insight view definitions en advisory narrative-entiteiten
- approvals, audit events en notifications
- object-storage referenties + evidence bundle model
- RLS / tenant-scope enforcement

### D. Controls & intelligence
- rules-first controls engine
- OCR/extractie
- documentclassificatie
- matching engine
- source attribution + confidence scoring
- AI explanations / summaries
- dashboard annotation generation op canonical data
- accountant-first advisory suggestion generation
- degraded modes voor LLM, OCR, mailbox en storage

### E. Experience / cockpit
- één globale navigatie en role-based routing
- dossier cockpit
- reviewer workbench
- request center
- close cockpit
- client insight views
- advisory prep views
- document triage
- audit trail viewer

### F. Governance, security & compliance
- EU hosting / DPA / subprocessor register
- secrets management
- malware scan + MIME/content-type validatie
- approval policies
- forensic-grade audit logging
- backup, restore en verificatie
- security checklist + release gates

### G. Pilot operations
- design-partner scope lock
- 30–50 dossiers selecteren
- KPI-baseline meten
- runbooks en admin guide
- wekelijkse ruis-vs-waarde review
- live pilot enablement

## 9. Not-in-v1

Niet opnemen in deze backlog als release-scope:
- nieuw grootboek of eigen boekhoudkern
- core replacement
- autonome boekingen
- journal/transactie write-back
- fiscale filings / VAT submissions
- payment initiation
- generieke vrije chatbot of agent-sprawl
- vrije agentcreatie door eindgebruikers
- brede reporting-suite buiten review/close- en accountant-advisory-ondersteuning
- generieke self-service BI-suite
- autonoom klantadvies zonder accountant-review of approval gate
- payroll/HR
- practice-management of CRM replacement
- multi-land scope
- meerdere accounting connectors in de eerste pilot
- microservices- of Kubernetes-first herplatforming

## 10. Hard dependencies / sequence

- **Pilotbronkeuze eerst**: zonder keuze voor accounting/mailbox/documentbron geen realistische connector- en datamodelbeslissingen
- **Tenant + auth vóór workflows**: workbench, requests en close cockpit mogen niet gebouwd worden zonder tenant context en RBAC
- **Canonical model vóór intelligence**: OCR, controls en AI moeten op stabiele canonical entiteiten landen
- **Connector framework vóór connector #2+**: eerst contract, daarna implementaties
- **AI Gateway vóór productiewaardige AI-features**: geen directe modelcalls vanuit UI of losse modules
- **Finding model vóór close cockpit**: close-status moet rusten op findings, requests en checkliststates
- **Evidence bundles vóór pilot-live**: zonder bewijsstructuur geen audit-first positionering
- **Restore-test vóór live pilot**: backup zonder restore is niet voldoende
- **Één platformervaring afdwingen vanaf week 1**: geen aparte mini-apps voor intake, review of requests; alles als modules in dezelfde cockpit en identitylaag

## 11. Acceptance criteria per phase

### Fase A — internal foundation
- staging stack draait
- login, MFA en basis-RBAC werken
- tenantmodel en audit-event-skeleton bestaan
- monorepo en deploypad zijn operationeel
- AI Gateway contract is gedefinieerd

### Fase B — pilot v1
- 1 accounting source, 1 mailbox source en 1 document source syncen end-to-end
- dossiers/periodes zijn zichtbaar in cockpit
- findings en requests hebben werkende state machines
- reviewer workbench en close cockpit zijn bruikbaar in één UI-flow
- concept klantmails gaan alleen via approval gate

### Fase C — hardening
- restore-test naar staging is uitgevoerd en gelogd
- alerts op queue failures, sync failures en storage/db-health staan aan
- tenant isolation test suite is groen
- evidence bundles en audit trail zijn volledig op AI-output en findings
- security baseline review is afgerond

### Fase D — pilot readiness / controlled livegang
- pilot-tenant kan veilig worden ingericht
- admin guide en runbooks zijn aanwezig
- KPI-baseline en eerste meetmethode zijn vastgelegd
- degraded modes zijn beschreven en getest op hoofdlijnen
- release gates zijn formeel afgetekend

## 12. Top risks + mitigaties

### Integratierisico
- **Risico:** bron-API’s zijn inconsistent of te beperkt
- **Mitigatie:** connector abstraction, starten met 1 bron, read-only scope, raw snapshot refs bewaren

### AI-betrouwbaarheid
- **Risico:** false positives of onverklaarbare output ondermijnen reviewvertrouwen
- **Mitigatie:** rules-first aanpak, confidence thresholds, menselijke approval, source attribution verplicht

### Privacy/compliance
- **Risico:** onduidelijke dataflow naar subprocessors of te brede datascope
- **Mitigatie:** EU-hosting, DPA’s vooraf, subprocessor register, dataminimalisatie, PII controls in AI Gateway

### Operationele last
- **Risico:** VPS-first stack vraagt te veel beheer
- **Mitigatie:** managed storage/backups waar mogelijk, observability vanaf dag 1, runbooks, maandelijkse restore-tests

### Tenant-isolatie
- **Risico:** logische multi-tenancy wordt slordig geïmplementeerd
- **Mitigatie:** RLS vanaf begin, tenant-scoped integration tests, audit op admin actions, retrieval boundary enforcement

### Product-sprawl
- **Risico:** team bouwt alsnog losse AI-tools of extra assistenten buiten de wedge
- **Mitigatie:** bounded assistant registry, capability packs i.p.v. losse apps, één cockpit, backlogprioriteit altijd op review-ready/close-ready workflow

## 13. Kort besluit voor buildsturing

Als een backlog-item niet direct bijdraagt aan **één cockpit voor dossiercompleetheid, findings, requests en close-status** binnen een **read-mostly audit-first workflow**, hoort het niet in v1.
