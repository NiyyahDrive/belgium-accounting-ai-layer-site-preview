# Lokale demo-runbook — Fidaris

## Doel
Deze runbook beschrijft hoe je binnen dit project de klikbare lokale demo gebruikt in een klantgesprek.

## Demo-URL's
- Website: `index.html`
- Klikbare demo: `demo.html`

## Wat de demo expliciet toont
- **één platformervaring** voor het kantoor in plaats van losse AI-tools
- **kantoorcockpit** met portfolio-overzicht en blockers
- **request center** voor klantopvragingen en opvolging
- **dossierreview** met ontbrekende stukken, findings en bronverwijzingen
- **close cockpit** met escalaties en periodestatus
- **governed AI-summary** met human-in-the-loop en audit trail

## Lokale start
Vanuit de projectmap:

```bash
cd /Users/mojo/Documents/09_Projects/Belgium-Accounting-AI-Layer
python3 -m http.server 4173
```

Open daarna:
- `http://127.0.0.1:4173/`
- `http://127.0.0.1:4173/demo.html`

## Aanbevolen demo-flow in gesprek
1. Start op de website en positioneer Fidaris als **één platform voor Belgische boekhoudkantoren**.
2. Open `demo.html` vanuit de CTA of rechtstreeks.
3. Toon de **kantoorcockpit** en leg uit dat operations, reviewers en partners in dezelfde omgeving werken.
4. Ga naar **Request center** om te tonen dat follow-up niet meer in mailbox-chaos zit.
5. Open **Dossierreview** en wijs op bronnen, ontbrekende stukken en review findings.
6. Ga naar **Close cockpit** om te tonen hoe blockers vroeg zichtbaar worden.
7. Eindig op **AI-summary** en benadruk approval gate + audit trail.

## Demo-data disclaimer
Alle gegevens in de demo zijn fictief en expliciet bedoeld als demo-data. Niet gebruiken als echte klant- of dossierinformatie.
