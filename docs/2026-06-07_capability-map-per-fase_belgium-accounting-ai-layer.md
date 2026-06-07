# Capability map per fase — Belgium Accounting AI Layer

_Datum: 2026-06-07_

## Doel van dit document
Deze capability map vertaalt de eerdere blueprint, ICP, MVP- en pilotdocumenten naar een **gefaseerde productkaart** voor de Belgium Accounting AI Layer.

De centrale keuze blijft ongewijzigd:
- we bouwen **geen nieuw boekhoudpakket**
- we starten als **AI control / review / close layer** bovenop bestaande systemen
- we gaan **read-mostly, human-in-the-loop en exception-driven**
- we richten ons eerst op **Belgische boekhoud- en accountantskantoren** met terugkerende kmo-dossiers

## Ontwerpprincipes over alle fasen heen
- **Workflow-first:** waarde zit in dossiercontrole, review en close, niet in generieke chat.
- **Read-mostly before write-back:** eerst lezen, signaleren, structureren en voorstellen.
- **Auditability by default:** elke AI-output moet herleidbaar zijn naar bron, context en goedkeuring.
- **Smalle integratiescope:** per fase beperkt aantal bronnen, geen connector-sprawl.
- **Mens beslist op uitzonderingen:** AI bereidt voor; kantoor houdt verantwoordelijkheid.

---

## Fase 1 — Pilot

### Doel van deze fase
Bewijzen dat een afgebakende pilot bij één Belgisch kantoor operationele waarde levert op dossiercompleetheid, klantopvragingen, reviewvoorbereiding en zicht op close blockers.

### User problem solved
Het kantoor heeft vandaag geen betrouwbare, gedeelde waarheid over:
- welke dossiers onvolledig zijn
- welke stukken nog ontbreken
- welke klantopvragingen nog openstaan
- welke dossiers review- of close-risico lopen

De pilot moet die chaos vervangen door één operationeel cockpitbeeld voor een beperkt team.

### Core modules
- **Accounting read connector v0:** 1 boekhoudbron uitlezen voor basisdossier- en transactiedata
- **Mailbox ingest v0:** 1 gedeelde mailbox ophalen en threads/bijlagen koppelen
- **Document ingest v0:** 1 documentbron of uploadflow voor pilotdossiers
- **Dossier- en periode-matching:** documenten, mails en requests koppelen aan cliënt, dossier en periode
- **Missing-doc workflow:** detectie van ontbrekende stukken en opvolgstatus
- **Request management v0:** open, waiting on client, received, needs review, resolved
- **Reviewer summary v0:** compacte AI-samenvatting van dossierstatus met bronverwijzingen
- **Close status board v0:** dossierstatus, blockers en open requests voor 30–50 dossiers
- **Audit trail v0:** logging van AI-output, statuswijzigingen en approvals

### Minimum data requirements
Minimaal nodig om de pilot geloofwaardig te draaien:
- 1 kantoor
- 1 pilotteam
- 30–50 afgebakende dossiers
- 1 boekhoudbron met minstens:
  - cliënt/dossier-identificatie
  - reporting period
  - basis GL of transactiestatus
  - open items of documentlinks indien beschikbaar
- 1 gedeelde mailbox met relevante klantcommunicatie
- 1 documentbron of centrale uploadmap
- historische voorbeelden van ontbrekende stukken of terugkerende documenttypes
- duidelijke dossier- en reviewowner per pilotdossier

### Human-in-the-loop controls
- concept klantopvragingen worden eerst goedgekeurd door medewerker
- lage-confidence documentclassificaties gaan naar validatiequeue
- dossierstatus “klaar voor review” mag niet volledig automatisch finaal gezet worden
- AI-summaries zijn adviserend, niet beslissend
- alle handmatige overrides worden gelogd

### KPI’s
Pilot-KPI’s moeten aantonen dat er genoeg waarde zit voor opschaling:
- % pilotdossiers met actuele compleetheidsstatus
- tijd om ontbrekende stukken te identificeren
- % open requests met correcte status
- gemiddelde reviewvoorbereidingstijd per dossier
- % AI-output met bruikbare bronverwijzing
- false positive rate op missing-doc signalen
- aantal blockers dat vóór manuele escalatie zichtbaar werd

### Wat bewust niet inbegrepen is
- meerdere boekhoudbronnen tegelijk
- automatische write-back naar boekhoudpakket
- BTW-control engine op brede schaal
- geavanceerde anomaliedetectie
- klantportaal met volledige self-service
- management reporting suite
- generieke kantoorbrede chatbot

### Go / no-go criteria naar V1
**Go naar V1 als:**
- pilotteam gebruikt de cockpit en requestflow effectief in echte dossiers
- dossierstatus en missing-doc logica zijn operationeel betrouwbaar genoeg voor dagelijks gebruik
- AI-summaries leveren meerwaarde en vereisen geen volledige herschrijving
- false positives zijn beheersbaar en bespreekbaar met het pilotteam
- er is aantoonbaar sneller zicht op open stukken en blockers dan in de nulmeting

**No-go of verlengen als:**
- matching tussen mails/documenten en dossiers structureel zwak blijft
- teams de workflow niet vertrouwen of niet adopteren
- audit trail of explainability onvoldoende is voor operationeel comfort
- het product vooral demo-waarde maar geen dagelijkse gebruikswaarde toont

---

## Fase 2 — V1

### Doel van deze fase
Van pilotcockpit naar een **pilot-ready MVP** die niet alleen ontbrekende stukken toont, maar ook de eerste echte review- en controlwaarde levert binnen een beperkt bronlandschap.

### User problem solved
Reviewers verliezen te veel tijd aan zoeken, interpreteren en handmatig detecteren van uitzonderingen. Partners zien risico’s te laat. V1 moet uitzonderingen systematisch zichtbaar maken vóór de finale review.

### Core modules
- **Accounting connector v1:** stabielere read connector voor 1 primaire boekhoudbron
- **Document intelligence v1:** OCR, classificatie, confidence scoring, basis extractie
- **Email intelligence v1:** thread matching, attachment handling, intent detectie voor klantantwoorden
- **Controls engine v1:**
  - ontbrekend document
  - boeking zonder documentlink
  - afwijkend rekeninggebruik versus historiek
  - inconsistent BTW-tarief
  - duplicate invoice signal
  - basic bank/open-item mismatch signal
- **Reviewer workbench v1:** dossierbeeld met findings, requests, documenten en summary
- **Close cockpit v1:** dossiers per status, blockers, nearing deadline signalen
- **Exception queue:** centrale afhandeling van lage-confidence of onduidelijke items
- **Audit & governance v1:** bronverwijzingen, model logging, approval events, rolgebaseerde toegang

### Minimum data requirements
- alles uit de pilotfase
- betere historische dataset per dossier of periode om afwijkingen te kunnen benchmarken
- toegang tot documentlinks of documentbestanden voor een zinvolle control engine
- basis BTW-data of equivalent transactielabel voor consistency checks
- minimaal 1 volledige maand- of kwartaalcyclus in de test/pilotomgeving
- expliciete materialiteitsdrempels of reviewregels van het kantoor

### Human-in-the-loop controls
- elke finding heeft menselijke eigenaar en status
- materiële uitzonderingen mogen niet auto-resolved worden
- externe communicatie blijft standaard approval-based
- AI-explanations moeten bron en reden tonen
- lage-confidence extracties en matches blijven verplicht menselijk nazicht vereisen
- reviewer beslist of finding resolved, dismissed of escalated wordt

### KPI’s
- reductie in reviewtijd per dossier versus baseline
- % dossiers waarin V1 minstens één bruikbare finding detecteert vóór partnerreview
- precision / false positive rate van findings per type
- % documenten correct geclassificeerd voor operationeel gebruik
- % requests correct gekoppeld aan dossier en periode
- tijd tot blockeridentificatie in de close
- gebruiksfrequentie van reviewer workbench per gebruiker/periode

### Wat bewust niet inbegrepen is
- multi-ERP of multi-office orchestration
- autonome boekingen
- automatische fiscale filing
- betalingen of treasury-acties
- brede reporting- en BI-suite
- volledige client portal experience
- write-back van correcties naar system of record

### Go / no-go criteria naar V1.5
**Go naar V1.5 als:**
- controls engine produceert herhaalbaar bruikbare findings
- reviewer workbench wordt opgenomen in het echte reviewproces
- confidence handling verlaagt operationele ruis in plaats van ze te vergroten
- kantoor is bereid scope licht te verbreden na bewezen kernwaarde
- er is voldoende datakwaliteit om meer geautomatiseerde close- en reportingflows te ondersteunen

**No-go of stabilisatieronde als:**
- findings veroorzaken te veel reviewfrictie door ruis
- document intelligence levert onvoldoende classificatie- of extractiekwaliteit
- gebruikers blijven werken buiten de cockpit
- KPI-verbetering is te klein om uitrol economisch te rechtvaardigen

---

## Fase 3 — V1.5

### Doel van deze fase
De stap maken van een bruikbare control-MVP naar een **meer complete close- en reviewer productivity layer** die operationeel schaalbaarder is binnen hetzelfde type kantoor.

### User problem solved
Zelfs met basiscontrols blijven close en review versnipperd: blockers staan op meerdere plekken, follow-up op uitzonderingen is nog te handmatig en partnervoorbereiding kost te veel synthese. V1.5 moet de stap zetten van “signalen tonen” naar “werk slimmer orkestreren”.

### Core modules
- **Close orchestration v1.5:** close calendar, dependency tracking, blocker labels, SLA/reminders
- **Reviewer action layer:** findings omzetten naar taken, comments en gestandaardiseerde reviewacties
- **Improved matching & confidence layer:** betere koppeling document ↔ transactie ↔ request ↔ dossier
- **AI close summary:** waarom is een dossier nog niet closable, wat moet eerst gebeuren
- **Management commentary draft v0:** conceptcommentaar op basis van finale cijfers en uitzonderingen, nog steeds menselijk gevalideerd
- **Light client request portal of structured inbox view:** niet full self-service, wel betere zichtbaarheid voor open opvragingen
- **KPI dashboard v1:** zicht op reviewtijd, blockerprofielen, request aging, close predictability
- **Operational analytics:** heatmap van uitzonderingen per dossier, team of periode

### Minimum data requirements
- stabiele V1-datastromen zonder structurele gaten
- meer consistente periodedata over meerdere closes
- duidelijk gedefinieerde close-checklist of statusflow per team
- beter gemapte transactie- en documentrelaties
- basis historiek om trends en uitzonderingspatronen te tonen
- akkoord van kantoor over standaard tasking- en escalatielogica

### Human-in-the-loop controls
- AI close summary blijft adviserend; finale closable-status vereist menselijke sign-off
- management commentary drafts vereisen reviewer of partnergoedkeuring
- taken of escalaties die extern effect hebben worden niet autonoom uitgevoerd
- materiaalheidsregels bepalen welke uitzonderingen expliciete review vereisen
- portal- of inboxantwoorden met lage confidence blijven naar medewerkerqueue gaan

### KPI’s
- verdere reductie van time-to-close
- % dossiers met tijdige blockeridentificatie vóór deadline
- aging van open requests en uitzonderingen
- % close blockers opgelost zonder partnerescalatie op het einde van de periode
- tijdswinst voor reviewer/manager bij periodische synthese
- acceptatiegraad van AI close summaries en commentary drafts
- voorspelbaarheid van close-status per team/periode

### Wat bewust niet inbegrepen is
- brede autonome workflow over alle klanten zonder teamreview
- volledige rapporteringssuite met maatwerkdashboards per klant
- volledige self-service client assistant
- massale write-back naar boekhoudsystemen
- geautomatiseerde indieningen naar externe instanties
- generieke agent die buiten dossiercontext vrij mag handelen

### Go / no-go criteria naar V2
**Go naar V2 als:**
- V1.5 levert meetbare close-bestuurbaarheid, niet alleen betere zichtbaarheid
- reviewers en managers vertrouwen de orchestrationlaag voor dagelijkse prioritering
- commentary drafts en close summaries besparen effectief tijd zonder governanceverlies
- datakwaliteit en procesdiscipline zijn sterk genoeg voor beperkte controlled write-back of bredere reportingfuncties
- minstens één design partner wil verbreden naar meer teams, dossiers of aanvullende modules

**No-go of consolidatie als:**
- close orchestration blijft te afhankelijk van handmatige workarounds
- teamadoptie stagneert buiten early champions
- AI-output voor summaries/commentary mist voldoende betrouwbaarheid
- operationele KPI’s verbeteren onvoldoende om bredere uitrol te verantwoorden

---

## Fase 4 — V2

### Doel van deze fase
Uitbouwen naar een **volwaardige AI operations layer voor accounting firms** met bredere integratiekracht, sterkere reportingvoorbereiding en selectieve, gecontroleerde write-back waar het risicoprofiel dat toelaat.

### User problem solved
Het kantoor wil niet alleen sneller reviewen en closen, maar de volledige operationele keten rond accounting voorspelbaarder maken: van intake tot control, close, interne samenwerking en output naar klant. V2 moet van teamwinst naar kantoorbrede operating leverage gaan.

### Core modules
- **Multi-source integration layer v2:** uitbreiding naar extra boekhoudbronnen, documentstromen en praktijkbeheersystemen
- **Canonical data layer v2:** robuuster cliënt-, dossier-, periode-, finding- en reportingmodel
- **Advanced controls:** uitgebreidere anomaliedetectie, balansbewegingen, cutoff-signalen, diepere reconciliaties
- **Reporting layer v2:** management packs, variantieanalyse, klantgerichte outputvoorbereiding
- **Internal copilot:** retrieval en samenvatting binnen geautoriseerde dossiercontext voor medewerker, reviewer en partner
- **Controlled write-back (selectief):** alleen voor laag-risico, expliciet goedgekeurde updates of statusmutaties
- **Office-level operations dashboard:** portefeuille-overzicht, workload, uitzonderingsclusters, close gezondheid
- **Governance layer v2:** fijnmaziger RBAC, tenant controls, retentiebeleid, uitgebreider policy engine

### Minimum data requirements
- stabiele, schaalbare datamodellen over meerdere teams of kantoren
- voldoende brondekking om kantoorbrede dashboards zinvol te maken
- heldere policies voor write-back, approvals, materialiteit en dataretentie
- bewezen datakwaliteit en procesdiscipline uit eerdere fasen
- rol- en toegangsmodel dat door het kantoor gedragen wordt
- periodieke evaluatie van privacy, security en leveranciersbeleid

### Human-in-the-loop controls
- controlled write-back alleen voor vooraf goedgekeurde use cases en gebruikersrollen
- compliance-, BTW- en materiële uitzonderingen blijven onder expliciete menselijke review
- copilot krijgt beperkte scope per dossier/team en geen open-ended autonomie
- policy engine bepaalt wat AI mag voorstellen, uitvoeren of blokkeren
- kritieke klantoutput blijft goedkeuringsplichtig
- audit logging en traceability blijven verplicht voor elke high-impact actie

### KPI’s
- dossiers per FTE of per reviewer
- time-to-close over meerdere teams
- % issues vóór partnerreview of finale close gedetecteerd
- voorspelbaarheid van workload en blockerprofielen
- acceptatiegraad van controlled write-back use cases
- reductie van manuele follow-up op kantoorbreed niveau
- consistentie en snelheid van reportingvoorbereiding
- incidentenratio op governance, privacy of foutieve AI-acties

### Wat bewust niet inbegrepen is
Ook in V2 blijven enkele grenzen strategisch verstandig:
- geen volledige vervanging van core accounting system of record
- geen onbeperkte autonome “AI-accountant”
- geen black-box beslissingen zonder bron of audit trail
- geen brede financiële handelingen zoals betalingen zonder aparte governance
- geen scope-expansie naar alles tegelijk als integratiecomplexiteit de productfocus schaadt

### Go / no-go criteria voor verdere expansie
**Go voor verdere expansie als:**
- V2 bewijst schaalbare operationele leverage zonder governance-erosie
- meerdere teams/kantoren behalen consistente KPI-verbetering
- controlled write-back veilig en begrensd werkt
- reporting- en copilotmodules worden gebruikt als echte productiviteitslaag
- support- en implementatielast niet disproportioneel stijgt per nieuwe klant of bron

**No-go of herprioriteren als:**
- integratiecomplexiteit sneller groeit dan productwaarde
- governancekosten te hoog worden voor de gerealiseerde efficiëntiewinst
- write-back of copilotfunctionaliteit het risicoprofiel te sterk verhoogt
- maatwerk per kantoor de schaalbaarheid ondergraaft

---

## Capability ladder in één oogopslag

### Pilot
Focus: dossiercompleetheid, requestflow, cockpitzicht, auditbare AI-samenvatting.

### V1
Focus: echte review controls, reviewer workbench, exception handling, pilot-ready MVP.

### V1.5
Focus: close orchestration, reviewer productivity, commentary drafts, beter operationeel ritme.

### V2
Focus: kantoorbrede operations layer, bredere integraties, reportingvoorbereiding, selectieve controlled write-back.

---

## Harde strategische conclusie
De logische productvolgorde is:
1. **zicht krijgen op ontbrekende stukken en dossierstatus**
2. **uitzonderingen en reviewwerk structureel maken**
3. **close bestuurbaar maken**
4. **pas daarna opschalen naar reporting en beperkte write-back**

Als we deze volgorde omdraaien, stijgen implementatierisico, governancecomplexiteit en time-to-value te snel.

## Samenvatting in één zin
**De juiste capability map voor dit project start met een smalle, auditbare pilot rond dossiercontrole en groeit daarna via review en close naar een bredere AI operations layer — zonder vroegtijdig te vervallen in core replacement of autonome accountancy.**