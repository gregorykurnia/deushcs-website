# C6 failure list (full e2e suite, 2026-10-27, before any fix)

586 passed, 32 skipped, 7 failed.

Environment (no `.env.test` on this server, `DATABASE_URL_POOLED is not set`; not caused by the code):
- contact.spec.ts:217 saves a lead with the preselected product
- enhance.spec.ts:263, :305, :328, :361 and :407 (Enhance form, sent for real; no-JS form send)

Caused by C5 (FAQ gained "What reports do we get?", so 12 questions, not 11):
- gba.spec.ts:178 FAQ answers open and close, and FAQPage structured data
