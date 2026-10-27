---
# B4 failure list (full e2e suite, 2026-10-27, before any fix)

650 passed, 32 skipped, 7 failed (first run of the full suite on the Phase B build).

**Environment, not fixed (no `.env.test` on this server, `DATABASE_URL_POOLED is not set`; the same tests as `a8-failure-list.md` and `revisions4.0/v10-failure-list.md`):**
- contact.spec.ts:217 saves a lead with the preselected product
- enhance.spec.ts:395, :437, :460, :493 (Enhance form, sent for real) and :540 (no-JS form send)

**Caused by B3, fixed:**
- enhance.spec.ts:90 "the header and hero book the call in the closer": it asserted no `a[href='#next-step']` anywhere on the page, but B3's "On this page" bar now links to the Next step section. The test's point is that no button points there, so it now excludes links inside a `nav`. Rerun alone: passes.

B2's picture changes caused no failures. The two load-sensitive tests from A8 (styleguide.spec.ts:88, header.spec.ts:31) passed this time.

`node scripts/check-geo.mjs http://localhost:3190 --prelaunch` on the local production build: 4 of 4 pass (27 pages). The server was stopped after.

Nothing caused by the code is left failing. The six database tests need `.env.test` on a machine that has it.
