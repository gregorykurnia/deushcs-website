# V10 failure list (full e2e suite, 2026-10-27, before any fix)

587 passed, 32 skipped, 6 failed. All six are environment (no `.env.test` on this server, `DATABASE_URL_POOLED is not set`); none is caused by Phase V.

- contact.spec.ts:217 saves a lead with the preselected product
- enhance.spec.ts:263, :305, :328, :361 and :407 (Enhance form, sent for real; no-JS form send)

`node scripts/check-geo.mjs --prelaunch`: 4 of 4 pass (27 pages).
`node scripts/check-voice.mjs`: 11 hits, all in `src/content/styleguide.ts` (a component showcase, now skipped); 0 hits in 71 files after.
