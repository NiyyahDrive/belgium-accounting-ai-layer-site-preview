# Live Tier A Prospects — Batch A

_Date: 2026-06-07_

## Status

This file was created as the requested output location for the first live Tier A prospect batch.

However, I could **not responsibly complete a list of 10 real, publicly verified Belgian accounting firms** with the currently available toolchain in this session.

## What I verified locally first

I reviewed the existing project docs to confirm the selection criteria:

- Belgian bookkeeping / accountancy firms
- ideal size: 15–40 employees
- acceptable edge band: 10–80 employees
- focus on recurring SME dossiers
- preference for firms with visible workflow/tool fragmentation signals and operational complexity suited to an AI control/review/close layer

Source docs reviewed locally:

- `docs/2026-06-07_prospect-list-criteria-en-outreach-cadence_belgium-accounting-ai-layer.md`
- `docs/2026-06-07_icp_first-belgian-accounting-firm.md`
- `docs/2026-06-07_crm-pipeline-spec_belgium-accounting-ai-layer.md`

## Blocking issue

I attempted to use the available document-conversion tooling to fetch public web sources directly, but the live URL retrieval path was unavailable in this environment.

Observed tool error when attempting a public website fetch:

```text
Error executing tool convert_document_into_docling_document: Unexpected error: DOCLING_SERVICE_URL must be set for remote mode. Set it via environment variable or .env file.
```

Because there is no working general web retrieval/search tool available in this session, I could not verify:

- firm website contents
- office location pages
- team/about pages
- public contact names and titles
- employee-size signals
- digitalization / stack / workflow signals

## Why I did not fabricate the list

The task explicitly required:

- no hallucinations or guesses
- only publicly verifiable sources
- mark fields as `onbekend` when not verifiable
- deliver real firm data

Without functioning live web access, I would have had to guess candidate firms and source URLs from memory, which would violate those rules.

## Method notes

- Confirmed ICP and Tier A criteria from local project documentation.
- Searched the local project for any pre-existing prospect research or stored firm/source data.
- Tried the available URL-to-document tool for live public verification.
- Stopped when the environment could not access public web pages reliably enough to support non-hallucinated prospect output.

## Unknowns

Unknown because public verification was blocked in this session:

- the 10 target firms
- website-backed city/region fields
- public decision-makers / operations contacts
- verifiable employee size bands
- website-derived stack signals
- website-derived operational pain signals

## Next step required

To complete the requested prospect file properly, this environment needs **working public web retrieval/search** (for example: a functioning web search/browser tool, or a configured Docling remote service for URL conversion).
