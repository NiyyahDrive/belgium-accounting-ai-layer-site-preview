# 2026-06-07 live Tier A prospects — batch B

## Status

This batch could **not** be completed with grounded public-source research in the current tool environment.

## Blocking issue

I attempted to use the available document-conversion tool to fetch and verify public firm websites directly, but the tool returned the following error:

> `Error executing tool convert_document_into_docling_document: Unexpected error: DOCLING_SERVICE_URL must be set for remote mode. Set it via environment variable or .env file.`

Because no working web retrieval/search tool is available in this session, I cannot responsibly verify:
- firm existence
- website content
- city/region
- team-size signals
- public contact names/titles
- source URLs beyond unverified memory

Per the task rules, I therefore did **not** fabricate the requested 10 firms.

## Requested output schema

The intended record range for this file was:
- BAAL-011
- BAAL-012
- BAAL-013
- BAAL-014
- BAAL-015
- BAAL-016
- BAAL-017
- BAAL-018
- BAAL-019
- BAAL-020

## Method notes

- Searched the local project docs for an existing batch A / BAAL list to avoid overlap.
- Found the prospect-criteria documentation, but no visible existing BAAL prospect file in the project path or adjacent Documents search scope.
- Attempted to use the available Docling URL conversion path for live public-site verification.
- Live verification was blocked by missing Docling remote service configuration.
- No fallback web-search or shell/network retrieval tool was available in this session.

## Unknowns

- Existing batch A firm list location: unknown from visible local files.
- Which 10 firms should be excluded for overlap: unknown.
- Publicly verifiable Tier A candidates: not researched due blocked web access.
- Decision-maker names/titles/source links: unknown.

## Next unblock required

To complete this file properly, the session needs **one** of the following:
- working web search / URL fetch capability, or
- a configured `DOCLING_SERVICE_URL`, or
- a user-provided source list / exported webpages / PDFs to verify locally.
