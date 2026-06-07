# Council-pass — Belgium Accounting AI Layer

_Datum: 2026-06-07_

## Executive oordeel
**REFRAME-GO**

De Council-pass ondersteunt de kernrichting, maar niet in de vorm van een brede “AI layer voor accounting”.

De juiste v1 is:
- **geen nieuw boekhoudpakket**
- **geen core replacement**
- **read-first**
- **workflow-first**
- **exception-driven**
- **human-in-the-loop**
- **één smalle review/close/control wedge** bovenop bestaande systemen

## Definitieve Council-positie
Bouw dit niet als een generiek AI-platform voor accountants.

Bouw dit als:
**een audit-first control, review en close-laag voor Belgische boekhoudkantoren die reviewfrictie verlaagt zonder de system-of-record te vervangen.**

## 1. Waarom dit wél kansrijk is
- Belgische boekhoudkantoren willen **geen kernmigratie** om efficiëntiewinst te testen.
- De grootste pijn zit **rondom** de boekhoudsoftware:
  - ontbrekende documenten
  - mailbox-chaos
  - trage review
  - BTW- en reconciliatie-excepties
  - onduidelijke close-status
  - laattijdige rapportering
- Een overlay-model is daarom geloofwaardiger dan een replacement-verhaal.
- De gekozen doelgroep — kantoren met **10–80 medewerkers** en veel kmo-dossiers — is rationeel: genoeg procesvolume, maar nog niet te log.

## 2. Waarom dit ook snel kan mislopen
- Als het een **extra cockpit** wordt zonder aantoonbare versnelling in het reviewritme.
- Als “AI layer” de boodschap blijft in plaats van een concreet operationeel voordeel.
- Als connector-complexiteit sneller groeit dan productfit.
- Als privacy, auditability en accountability niet hard genoeg ingebouwd zijn.
- Als v1 ongemerkt opschuift richting boekhoudkern, reporting-suite of generieke AI-accountant.

## 3. Council-besluit per as
### Markt / adoptie
**GO, maar smaller.**

De wedge werkt alleen als v1 direct het volgende doet:
- dossiers sneller review-ready maken
- ontbrekende stukken zichtbaar maken
- uitzonderingen en blockers prioriteren
- close-status per dossier/periode glashelder maken

### Architectuur / security / privacy
**GO, maar strakker en explicieter.**

De VPS-first modulaire monolith + workers is een verdedigbare v1.
Maar de Council eist hardere keuzes op:
- tenant boundaries
- AI-governance als runtime enforcement
- integratiescope
- mailbox/privacy boundary
- evidence en audit trail

## 4. Grootste risico’s en blinde vlekken
### Commercieel / operationeel
- te brede positionering
- extra werk i.p.v. minder werk
- false positives en outputruis
- partnerconservatisme
- integratiefrictie door rommelige brondata

### Technisch / compliance
- shared DB + RLS als trust bottleneck
- AI-governance nog te principieel, te weinig afdwingbaar
- mailbox/document-ingest als onderschat privacy- en supportrisico
- te veel self-managed infra tegelijk in v1
- pgvector in primaire cluster zonder expliciete degraded mode

## 5. Wat strakker moet in v1
### Productmatig
V1 moet vernauwen naar één kernjob:
**“maak dossiers sneller review-ready en close-ready door ontbrekende stukken, uitzonderingen en blockers automatisch zichtbaar te maken.”**

### Dus expliciet wél in v1
- **1 accounting connector**
- **1 mailbox source**
- **1 document source**
- completeness checks
- basis review controls
- exception queue / reviewer workbench
- simpele close-status per dossier/periode
- concept klantopvragingen met menselijke validatie

### Technisch expliciet aanscherpen
- AI Gateway als **verplichte policy-enforcement layer**
- replayable/versioned ingest-contract per connector
- harde scheiding tussen:
  - control plane
  - data/workflow plane
  - AI plane
- expliciete system-of-record boundary
- worker-isolatie per jobtype
- evidence bundles per finding / AI recommendation
- tenant-isolatie als **release gate**, niet alleen architectuurprincipe

## 6. Security & privacy guardrails die niet optioneel zijn
- **EU/EER-only datapad**
- **no training / no retention** bij modelproviders
- **PII minimization vóór model calls**
- tenant-scoped retrieval met testdekking
- approval gates als echte policy engine
- strengere object storage isolation
- geen productie-mailboxen of rauwe dossiers in dev/staging
- forensic-grade security logging
- expliciete secret-management keuze
- mailbox-scope begrenzen: geen volledige mailboxhistoriek spiegelen

## 7. Harde not-in-v1 lijst
De Council sluit deze onderdelen expliciet uit voor v1:
- nieuw grootboek / eigen boekhoudkern
- autonome boekingen
- write-back naar journals/transacties
- fiscale filings / VAT-submissions
- payment initiation
- generieke “AI accountant” chat
- vrije agentcreatie door eindgebruikers
- brede reporting-suite
- payroll/HR
- CRM/practice-management replacement
- multi-land scope
- meerdere accounting connectors in de eerste pilot
- volledige mailboxhistoriek sync
- microservices/k8s-first herplatforming
- hidden core replacement

## 8. Design-partner rollout advies
Start met:
- **1 Belgisch kantoor**
- **1 team**
- **30–50 dossiers**
- **1 periodeproces**
  - bv. maandafsluiting of kwartaalreview

Pilotregels:
- meet baseline vóór livegang
- wekelijkse review op ruis vs. waarde
- bronverwijzing + confidence op elke finding
- standaard naar “onvoldoende bewijs” wanneer bewijs zwak is
- geen kantoorbrede rollout vóór bewijs van workflowfit

## 9. Concrete besluitpunten nu
1. Kies **Authentik of Keycloak** nu.
2. Maak de **AI Gateway** een aparte runtime boundary.
3. Maak dedicated buckets sneller mogelijk dan dedicated DB’s.
4. Beperk de eerste pilot tot exact:
   - 1 accounting source
   - 1 mailbox source
   - 1 document source
5. Voer tenant policy packs al vanaf de eerste pilot in.
6. Definieer degraded modes voor LLM, OCR, mailbox en storage.
7. Maak evidence bundles verplicht.
8. Test tenant isolation als harde release gate.

## Kortste Council-zin
**GO — maar alleen als dit geen brede accounting AI layer wordt, en wel een smalle audit-first review/close control wedge bovenop één bestaande stack bij één Belgisch design-partnerkantoor.**
