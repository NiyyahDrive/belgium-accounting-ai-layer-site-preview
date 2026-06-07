# Pricing Architecture — Belgium Accounting AI Layer

_Datum: 2026-06-07_

## Doel van dit document
Dit document definieert een **geloofwaardige, premium pricing architectuur** voor de Belgium Accounting AI Layer.

De prijslogica moet passen bij de positionering:
- **geen nieuw boekhoudpakket**
- **geen full bookkeeping replacement**
- wel een **AI control / review / close / reporting layer**
- bovenop de bestaande stack van Belgische boekhoud- en accountantskantoren
- met **human-in-the-loop**, audit trail en gecontroleerde adoptie

Dit document behandelt eerst de **design-partner pilot**, daarna de **post-pilot prijsarchitectuur**.

---

## 1. Prijsfilosofie

### 1.1 Waar de klant eigenlijk voor betaalt
De klant betaalt niet voor “AI” als buzzword.
De klant betaalt voor vijf concrete vormen van waarde:
- minder tijdverlies in review en opvolging
- sneller zicht op ontbrekende stukken en uitzonderingen
- meer voorspelbare maand- en kwartaalclose
- minder operationele chaos tussen mailbox, documenten en boekhoudbron
- auditbare AI-output zonder core replacement

### 1.2 Wat we expliciet niet prijzen
We prijzen dit **niet** alsof het een goedkoop seat-based SaaS-tooltje is.
We prijzen dit ook **niet** alsof we het hele boekhoudsysteem vervangen.

De prijs moet dus tussen twee verkeerde extremen blijven:
- te laag als generieke AI-assistent
- te hoog als core ERP-transformatie

### 1.3 Kernprincipe
De prijsstructuur moet altijd vier componenten kunnen dragen:
- **setup fee** voor onboarding, configuratie en mapping
- **maandelijkse platform fee** voor de AI-layer en cockpit
- **scope fee** voor volume en complexiteit
- **services / uitbreiding** voor extra integraties, maatwerk en rollout

---

## 2. Prijsprincipes

### 2.1 Waarde eerst, niet kost-plus
Prijs op basis van operationele impact en kritikaliteit, niet op basis van alleen infra- of modelkost.

### 2.2 Lage implementatieweerstand, geen lage positionering
De instap moet haalbaar voelen voor een pilot, maar niet goedkoop of experimenteel ogen.

### 2.3 Read-mostly = lagere setup dan core replacement
Omdat v1 read-mostly is, moet de setup goedkoper en sneller zijn dan een diep integratieproject.
Dat is een voordeel in sales, maar geen reden om commodity-pricing te hanteren.

### 2.4 Complexiteit moet betaalbaar zijn
Meer bronnen, meer teams, meer dossiers en strengere workflow-eisen moeten direct leiden tot hogere prijs.

### 2.5 Land-and-expand zonder gratis scope creep
De pilot moet een duidelijke wedge zijn.
Uitbreiding naar meer dossiers, teams, bronnen of modules wordt altijd apart geprijsd.

---

## 3. Design-partner pilot: commerciële logica

## 3.1 Doel van de pilotprijs
De pilotprijs moet drie dingen tegelijk doen:
- de drempel verlagen om te starten
- de waarde serieus positioneren
- voorkomen dat de pilot als gratis discovery of goedkope consultancy wordt behandeld

## 3.2 Standaard pilotkader
Standaard design-partner pilot:
- 1 kantoor
- 1 pilotteam
- 30–50 dossiers
- 1 boekhoudbron
- 1 gedeelde mailbox
- 1 documentbron
- 8–12 weken
- focus op dossierreview, ontbrekende stukken, close cockpit en reviewer summary

## 3.3 Pilot pricing architectuur
De pilotprijs bestaat uit:
- **eenmalige pilot setup fee**
- **vaste maandelijkse pilot fee**
- optioneel: **betaalde uitbreidingen buiten scope**

### Aanbevolen pilotband
- Pilot setup fee: **€12.000–€20.000**
- Pilot monthly fee: **€4.000–€7.000 per maand**
- Minimum pilotduur: **3 maanden commercieel**, ook als operationeel gebruik in week 2 of 3 start

### Aanbevolen standaard anchor voor meeste gesprekken
Voor een typische design partner binnen de ICP:
- **€15.000 setup**
- **€5.500 per maand**
- **3 maanden minimum**

Dat geeft een typische pilotwaarde van **€31.500**.
Dat is hoog genoeg om serieus te zijn, maar laag genoeg om als gecontroleerde innovatiebeslissing door een Belgisch kantoor te kunnen worden gedragen.

---

## 4. Wat in de pilot inbegrepen is

### Inbegrepen
- pilotscope workshop en afbakening
- baseline-definitie voor KPI’s
- configuratie voor 1 boekhoudbron, 1 mailbox en 1 documentbron
- dossier- en periodeflow mapping voor de afgesproken pilotscope
- standaard controls v1 voor ontbrekende stukken, documentlinking en review findings
- close cockpit v1
- reviewer summary v1 met bronverwijzingen
- audit trail op AI-output binnen de pilotflow
- wekelijkse pilot review
- beperkte threshold tuning tijdens pilot
- eindreview met go / no-go / expand besluit

### Niet inbegrepen
- write-back automatisatie op grote schaal
- maatwerk integraties buiten de eerste scope
- multi-office uitrol
- meertalige uitgebreide change management trajecten
- onbeperkte prompt- of workflowcustomisatie
- fiscale filing automation
- volledige management reporting suite
- SLA’s op enterprise-niveau
- on-site trainingdagen buiten de afgesproken pilotaanpak

---

## 5. Setup fee logic

## 5.1 Waarom een setup fee noodzakelijk is
De setup fee dekt geen “activatieklik”, maar echt implementatiewerk:
- bronmapping
- datatoegang en ingest-configuratie
- pilotscope ontwerp
- workflow- en statusconfiguratie
- baseline en meetkader
- governance- en approvalafspraken

Zonder setup fee ontstaat bijna automatisch gratis consultancy, scope creep en slechte klantselectie.

## 5.2 Setup fee opbouw
Gebruik intern deze logica:
- **Basis onboarding layer**: €8.000
- **Bron- en workflowconfiguratie**: €4.000–€8.000
- **Complexiteitsopslag**: €0–€6.000

### Praktische interpretatie
**€12.000 setup**
- zeer standaard pilot
- schone scope
- snelle data-access
- duidelijke interne sponsor

**€15.000–€18.000 setup**
- standaard ICP-case
- beperkte mappingcomplexiteit
- normale governance-afstemming

**€20.000+ setup**
- meerdere uitzonderingen
- complexere datatoegang
- extra stakeholdermanagement
- hogere custom workflow-eisen

## 5.3 Setup fee guardrail
Geef **geen volledige setup waiver**.
Maximaal kan de setup worden verlaagd, gespreid of deels gecrediteerd onder strikte voorwaarden.

---

## 6. Monthly fee logic in de pilot

## 6.1 Waar de pilot monthly fee voor dient
De maandelijkse pilot fee dekt:
- platformtoegang
- model- en verwerkingskosten
- actieve monitoring van pilotgebruik
- wekelijkse reviewritmiek
- beperkte tuning binnen scope
- operationele support binnen pilotcontext

## 6.2 Logica voor pilot monthly band
**€4.000–€5.000 per maand**
- lichtere pilot
- lagere dossieractiviteit
- beperkte variatie in documenten en workflow

**€5.500–€6.500 per maand**
- standaard design-partner pilot
- voldoende usage om echte waarde te bewijzen
- normale feedback en tuning

**€7.000+ per maand**
- zwaardere pilot
- hogere document- of exception-load
- extra managementbetrokkenheid
- meer configuratie-iteraties binnen pilot

## 6.3 Minimum maandfee
Hanteer een **minimum maandfee van €4.000**.
Anders wordt de pilot te snel gezien als experiment in plaats van serieuze operationele laag.

---

## 7. Pilot discount logic

## 7.1 Waarom korting alleen onder voorwaarden kan
Een design-partner korting is verdedigbaar wanneer de klant ons echt helpt sneller te leren en geloofwaardig te referencen.
Die korting is geen standaard saleskorting.

## 7.2 Toelaatbare pilot incentives
Een pilotdiscount mag alleen worden gegeven als minstens twee van deze voorwaarden gelden:
- snelle start binnen 30 dagen
- duidelijke interne sponsor en vast pilotteam
- wekelijkse feedbackdiscipline
- bereidheid om KPI-baseline en evaluatie te delen
- bereidheid om als design partner input te geven op productrichting
- optioneel: toestemming voor anonieme case learnings

## 7.3 Vorm van de korting
Gebruik deze volgorde van voorkeur:
1. **pilot pricing als tijdelijke launch band**
2. **gedeeltelijk credit van pilot setup naar jaarcontract**
3. **extra scope-item inbegrepen**
4. pas als laatste: **directe prijsreductie**

## 7.4 Aanbevolen discount guardrails
- standaard pilotdiscount: **0–15%**
- uitzonderlijk maximum: **20%**
- boven 20% alleen als er een uitzonderlijk strategisch voordeel is

## 7.5 Beste commerciële formule
De beste concessie is meestal:
- volle of bijna volle pilotprijs
- **25–50% van de pilot setup gecrediteerd** bij ondertekening van een post-pilot contract binnen 30 dagen na evaluatie

Dat beschermt prijsniveau én stimuleert conversie.

---

## 8. Post-pilot pricing architectuur

Na de pilot verschuift de prijs van “begeleide validatie” naar “productiegebruik”.
De prijs moet dan eenvoudiger, schaalbaarder en beter uitlegbaar worden.

## 8.1 Structuur na de pilot
Post-pilot prijs bestaat uit:
- **platform fee per kantooromgeving**
- **team / workspace fee**
- **volume fee op actieve dossiers of close-activiteit**
- **module fee voor extra capabilities**
- **services fee voor uitbreidingen en rollout**

## 8.2 Waarom deze mix werkt
- platform fee dekt de kernwaarde en premium positionering
- team fee koppelt prijs aan operationeel gebruik
- volume fee laat meegroeien met dossierintensiteit
- module fee voorkomt dat alle toekomstige waarde in één vlak bedrag wordt opgesloten

---

## 9. Packaging tiers na de pilot

## 9.1 Tier 1 — Control
Voor kantoren die vooral dossiercompleetheid en exception review willen verbeteren.

### Inbegrepen
- 1 kantooromgeving
- dossierstatus cockpit
- ontbrekende-stukken signalering
- basis exception findings
- reviewer summary
- audit trail basis
- 1 boekhoudbron
- 1 mailboxbron
- 1 documentbron
- 1 team inbegrepen

### Niet inbegrepen
- geavanceerde close orchestration
- uitgebreide reporting workflows
- meerdere teams inbegrepen
- maatwerkintegraties
- geavanceerde SLA / governance wensen

### Richtprijs
- **€3.500–€5.000 per maand**
- plus setup / expansion fees waar relevant

## 9.2 Tier 2 — Review & Close
Voor kantoren die de AI-layer als echte operationele review- en closingcockpit willen inzetten.

### Inbegrepen
Alles uit Control, plus:
- close cockpit met blockers en deadlines
- uitgebreidere review findings
- request workflow voor ontbrekende stukken
- extra configuratie voor reviewer- en managerrollen
- 2 teams inbegrepen
- uitgebreidere weekly/monthly business review in opstartfase

### Niet inbegrepen
- volledige management reporting suite
- onbeperkte custom controls
- enterprise procurement of security maatwerk

### Richtprijs
- **€6.000–€9.000 per maand**

## 9.3 Tier 3 — Reporting Layer
Voor kantoren die ook reporting-voorbereiding en partner/manager views willen versnellen.

### Inbegrepen
Alles uit Review & Close, plus:
- reporting preparation workflows
- AI commentary support binnen guardrails
- uitgebreidere management- en partneroverzichten
- hogere configuratie-intensiteit
- 3 teams inbegrepen

### Niet inbegrepen
- volledige BI-vervanging
- volledige autonome rapportgeneratie zonder menselijke review
- maatwerk op enterprise-groepniveau

### Richtprijs
- **€10.000–€15.000 per maand**

---

## 10. Extra prijscomponenten na de pilot

## 10.1 Setup / expansion fees
Gebruik bijkomende setup fees voor:
- extra boekhoudbron: **€4.000–€8.000**
- extra mailbox of documentbron met aparte logica: **€2.000–€5.000**
- extra team rollout: **€2.500–€6.000**
- extra kantoor of vestiging: apart geprijsd

## 10.2 Volume logic
Hanteer volume niet als goedkoop per-dossier model, maar als schaalcomponent bovenop de platformfee.

Aanbevolen logica:
- basispakket bevat een afgesproken activiteitsband
- boven die band geldt een **volume uplift**
- uplift kan gebaseerd zijn op:
  - aantal actieve dossiers
  - aantal dossiers in close-cyclus
  - aantal exception-heavy dossiers

### Praktische volume guardrail
Voor de eerste contracten is het meestal beter om te werken met **bands** in plaats van pure usage pricing.
Bijvoorbeeld:
- tot 75 actieve dossiers
- 76–150 actieve dossiers
- 151–300 actieve dossiers
- 300+ op maat

Dat houdt pricing eenvoudig en premium.

## 10.3 Team / workspace logic
Hanteer na de pilot een opslag voor extra teams wanneer deze niet in de tier zijn inbegrepen:
- extra team: **€1.000–€2.000 per maand**, afhankelijk van workload en supportbehoefte

## 10.4 Professional services
Voor maatwerk, rollout of governanceprojecten:
- remote workshop / configuratiepakket: vaste prijs
- intensieve maatwerktrack: offerte
- on-site dag: **€1.500–€2.500 per dag** exclusief verplaatsing

---

## 11. Success-based upsell logic

## 11.1 Wat we wel doen
Een success-based upsell mag conversie versnellen, zolang de kernprijs niet afhankelijk wordt van moeilijk bewijsbare ROI-discussies.

## 11.2 Wat we niet doen
Geen pure “no cure no pay”.
Geen prijsmodel dat volledig afhangt van urenbesparing die achteraf eindeloos wordt bediscussieerd.

## 11.3 Veilige success-based mechanismen
Gebruik liever deze vormen:
- pilot setup credit bij conversie
- upgrade naar hogere tier bij behalen van afgesproken pilot KPI’s
- uitbreiding naar extra team tegen vooraf afgesproken launch condities
- tijdelijke prijsbescherming voor 12 maanden bij snelle scale decision

## 11.4 Aanbevolen commerciële upsell
Als pilotdoelen gehaald worden:
- klant tekent binnen 30 dagen voor 12 maanden
- **pilot setup credit van 25–50%** wordt toegepast
- extra team of extra bron krijgt **launch pricing** gedurende eerste contractjaar

Dat beloont succes zonder de basisarchitectuur te ondermijnen.

---

## 12. Contract- en risiconotes

## 12.1 Pilotcontract
Pilotcontract moet minimaal expliciet maken:
- afgebakende scope
- duur en evaluatiemoment
- verantwoordelijkheden van beide partijen
- data-access aannames
- human-in-the-loop uitgangspunt
- geen garantie op volledig autonome verwerking
- duidelijke omschrijving van out-of-scope werk

## 12.2 Post-pilot contract
Aanbevolen standaard:
- **12 maanden contractduur**
- jaarlijkse vooruitblik op pricing en scope
- duidelijke definities van teams, bronnen en activiteitsbanden

## 12.3 Risicobegrenzing
Altijd opnemen:
- AI-output is beslissingsondersteunend, niet finale professionele vervanging
- klant blijft eindverantwoordelijk voor review, goedkeuring en indien relevant filing
- lage-confidence output moet door menselijke review passeren
- write-back of externe communicatie gebeurt alleen binnen afgesproken guardrails

## 12.4 Data en security
Niet gratis weggeven in de deal:
- extra security due diligence buiten standaardpakket
- custom DPA/SLA-onderhandelingen met zware afwijkingen
- diepgaande audit support buiten normale pre-sales of onboarding

---

## 13. Onderhandelingsguardrails

## 13.1 Wat we commercieel willen beschermen
Bescherm altijd deze vier dingen:
- setup fee principe
- minimum maandfee
- duidelijke scopegrenzen
- premium positionering

## 13.2 Wat je eerder mag weggeven
Geef liever weg:
- iets meer pilotbegeleiding
- een extra workshop
- beperkte setup credit bij conversie
- tijdelijke launch pricing voor uitbreiding

Geef liever niet weg:
- gratis pilot
- onbeperkte customisatie
- open einde qua scope
- zware korting op zowel setup als maandfee tegelijk

## 13.3 Hard floor
Onder deze grens niet gaan voor een standaard design-partner pilot, tenzij er uitzonderlijk strategisch gewicht is:
- **setup onder €10.000: vermijden**
- **maandfee onder €4.000: vermijden**
- **totale pilotwaarde onder €22.000: vermijden**

## 13.4 Als procurement prijsdruk zet
Gebruik deze antwoorden:
- scope verkleinen in plaats van prijs leeg te duwen
- minder bronnen of minder dossiers in plaats van algemene korting
- minder begeleidingsintensiteit in plaats van lagere platformwaarde
- pilot credit bij conversie in plaats van upfront discount

## 13.5 Rode lijnen
Niet doen:
- prijzen alsof we generieke AI seats verkopen
- beloven dat we volledige headcount vervangen
- ROI-cijfers garanderen die we nog niet bewezen hebben
- klantreferenties of marktproof suggereren die nog niet bestaan

---

## 14. Aanbevolen prijskaart voor eerste gesprekken

### Design-partner pilot
- **€15.000 setup**
- **€5.500 per maand**
- **3 maanden minimum**
- **30–50 dossiers, 1 team, 1 boekhoudbron, 1 mailbox, 1 documentbron**

### Post-pilot instap
- **Control**: vanaf **€3.500–€5.000 per maand**
- **Review & Close**: vanaf **€6.000–€9.000 per maand**
- **Reporting Layer**: vanaf **€10.000–€15.000 per maand**
- extra setup en uitbreidingen apart

### Beste onderhandelingsboodschap
“Wij prijzen dit niet als een vervanging van uw boekhoudpakket, maar ook niet als een lichte AI-addon. Het is een operationele control- en closinglaag die direct op review, dossiergrip en close-bestuurbaarheid zit. Daarom werken we met een afgebakende setup, een serieuze maar beheersbare pilot fee, en daarna een schaalbaar productiemodel.”

---

## 15. Eindoordeel
De juiste pricing architectuur voor deze propositie is:
- **pilot-first**
- **premium maar niet enterprise-zwaar**
- **setup + monthly + expansion**
- **scopegedisciplineerd**
- **sterk genoeg om serieus genomen te worden**

De kern is eenvoudig:
**verkoop geen goedkope AI-tool en verkoop geen core replacement. Verkoop een premium, auditbare AI control / review / close / reporting layer met een duidelijke wedge, meetbare pilot en schaalbare uitrol.**
