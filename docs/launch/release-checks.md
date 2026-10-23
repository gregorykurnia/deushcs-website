# Release checks (Task 7.4), run 2026-10-23 on `staging` at 76a963c plus the spec fixes in the same commit

| Check | Result |
|---|---|
| typecheck, lint, unit tests | Pass (374 passed, 9 skipped) |
| Full Playwright (`E2E_PORT=3195 npx playwright test --workers=2`, 8.5 min) | 446 passed, 20 skipped, **6 failed: all lead-form tests that write to the database** (`contact.spec.ts:127`, `enhance.spec.ts:250, 292, 315, 348, 394`). This checkout has no `.env.test`, so they fail with `DATABASE_URL_POOLED is not set`. They need a run on the Mac; the owner deferred it, 2026-10-23. |
| axe (serious/critical) | Pass on every page, mobile and desktop, as part of the full run |
| `check-launch.mjs <local build> --prelaunch` | Pass, 10 of 10 (9 sitemap URLs, 214 old paths) |
| `/security-review` of the Phase 7 surface | No finding of 8/10 confidence or more. See below. |
| Lighthouse mobile ≥ 90 on Home and Enhance | **Moved to 7.7 by the owner** (PageSpeed Insights on the live site in the first week). **Not measured validly here.** Accessibility 100 and best practices 96 on both. Performance came out 42 to 76, LCP 3.5 to 6.5 s, but the server has 2 cores, a load average of 4 to 12 from other sessions and a Lighthouse benchmark index of 450 to 1100, so TBT swung from 390 ms to 5 s between identical runs. Home's LCP element is the headline, which never animates; it waits only on hydration. Rerun on the Mac (below). |
| Placeholder sample data replaced with approved data | **Approved as it is by the owner, 2026-10-23** (labelled "Example" on Home). |

## Fixed in this task
Three specs were stale after Phase 7, not site bugs: `scaffold.spec.ts` expected an Indonesian browser to reach `/id` (detection is off until 6.4; it now expects `/en` in one hop), `gba.spec.ts` read the first JSON-LD block (the main folder fixed it first; its version stands) and `header.spec.ts` hovered before hydration (it now hovers again until the menu opens; 8 of 8 passes).

## Security review
Read: the lead action, rate limit and notification email, the OG image route, the proxy's slash redirect, the old-site redirect rules, JSON-LD output, analytics. Clean: the OG route only draws names from a fixed table; `serializeJsonLd` escapes `<`; the lead email is plain text with one-line subjects; analytics props carry no form answers; the `//evil.com/` slash-redirect probe stays on the site (Next normalises the path first). One note, not a finding: `npm audit --omit=dev` reports 7 high advisories, all through the `shadcn` CLI (`ts-morph`), which is listed under `dependencies` but never imported by the site. Moving it to `devDependencies` would clear them from the production audit; it is left for the owner to approve since it changes `package.json`.

## Lighthouse on the Mac (the owner's step)
```
npm run build && npx next start -p 3190      # in another terminal, nothing else running
npx lighthouse http://localhost:3190/en --form-factor=mobile --only-categories=performance
npx lighthouse http://localhost:3190/en/solutions/enhance --form-factor=mobile --only-categories=performance
```
Want ≥ 90 and LCP < 2.5 s on both. If either is lower, send the numbers back; the first thing to look at is the 230 KB shared chunk's evaluation time.
