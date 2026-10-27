---
# A8 failure list (full e2e suite, 2026-10-27, before any fix)

626 passed, 32 skipped, 8 failed.

**Environment, not fixed (no `.env.test` on this server, `DATABASE_URL_POOLED is not set`; same six as `revisions4.0/v10-failure-list.md`):**
- contact.spec.ts:217 saves a lead with the preselected product
- enhance.spec.ts:320, :362, :385, :418 (Enhance form, sent for real) and :465 (no-JS form send)

**Passed on rerun, no code change (load-sensitive on this 2-core server, not caused by A1 to A7):**
- styleguide.spec.ts:88 "Where we help: autoplay moves on when the bar fills" (A1 changed the dwell)
- header.spec.ts:31 "Solutions menu opens from the keyboard" (`aria-expanded` stayed false after Enter)

Rerun of just those two, 8 times each (`--repeat-each=8`): 16 of 16 passed. Both only wait on timing (a 5s expectation while ~600 tests ran on 2 cores; Enter pressed on the Solutions trigger right after load), and the v10 run passed them. The styleguide test already shortens A1's dwell to 400ms via `--showcase-dwell`.

`node scripts/check-geo.mjs http://localhost:3190 --prelaunch` on the local production build: 4 of 4 pass (27 pages). The server was stopped after.

Nothing caused by the code is left failing. The six database tests need `.env.test` on a machine that has it.
