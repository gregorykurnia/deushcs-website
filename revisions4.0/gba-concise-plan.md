# Round 4: a shorter Game-Based Assessment page

*Written 2026-10-27, from the owner's request the same day.*

**Why:** the GBA page reads like a company deck. It is 13,579px long at 1280 wide (about 15 screens) and 18,668px at 390 (about 22 phone screens), and that is with only one of the four module tabs open. A website's job is narrower: show what it is, why it's different, what's in it, and get the visitor to ask for a trial. Detail that belongs in a sales deck comes off the page.

**Owner's decisions (2026-10-27):**
- Remove **The problem**, **Reports**, **How it works**, **Pricing** and **Behind the results** (Platform, Science, Before and after).
- **What's different** moves to the top, right under the hero, without its "What's different" label.
- **The four modules** show together in one section, without the pill of tabs, and much shorter. The layout was left to Claude: §S2.
- Claude may recommend more cuts: R1 and R2 below. Each is its own task; delete its line to skip it.

**Result:** about half the length (estimate: ~7 desktop screens and ~12 phone screens). C6 measures the real numbers.

**Defaults for everything else,** so no task stops to ask. The owner can change any of them before the run:

| Question | Default |
|---|---|
| The top section's heading | No visible label or title (the hero's H1 already says "better hiring"). A visually hidden H2, "What's different", keeps the heading outline whole for screen readers and the accessibility scan. |
| The answer passage AI tools quote (G1.5) | It opened The problem. It now opens the top section, above the three pillars (GEO plan §S2: "opens the first section after the hero"). Wording unchanged. |
| The price | No pricing section. "From IDR 69,000 per candidate" stays in the answer passage and the cost FAQ, so the page still shows the price its JSON-LD `offers` names (GEO §S1). |
| Module titles | The D9 titles stay as they are (still provisional, `NEEDED-FROM-YOU.md`). Each module's sub-line ("Know your candidates before the interview.", and the others) goes. |
| Game names | Not shown. Each card says how many games there are and what they measure. The FAQ and the use-case pages keep the module names. |
| Links into the page | The module anchors stay (`#personality`, `#cognitive`, `#neuro`, `#simulation`): the header menu, the use-case pages, Enhance and the old `/solutions/discover` and `/solutions/next-chapter` redirects keep working. `/science` and the old site's `/our-science` go to `#principles`; the old report URLs (`/our-outputs`, `/individual-report`, `/mass-dashboard`) go to the page without an anchor. |
| The sample-report download (L2, off until the owner's PDF arrives) | It sat after Reports. It moves to just before the FAQ, the fallback GEO plan §S11 already names. |
| Removed copy | Deleted from the Markdown and the content module (git keeps it for a deck). Not moved to another page. |
| Images no longer shown | Files and `images.ts` entries stay; other pages or a later round may use them. |
| Components no page uses any more | Deleted with their tests (for example `ModuleTabs`, `MissGain`, `ScrollingReport`), checked with grep first. `SegmentedTabs` stays: the styleguide shows it. |
| Header menu, hero, FAQ (apart from R2), closing panel, meta title and description | Unchanged. |

**How to run it:** in the main folder on `staging`, with a clean tree: `autorun check revisions4.0/gba-concise-plan.md`, then `autorun all revisions4.0/gba-concise-plan.md`. By hand: "do the next task in `revisions4.0/gba-concise-plan.md`". Nothing goes live until the owner says "release".

**Rough cost:** about $7.40 for the seven sessions at the model table's prices.

## Rules for every task

- **Read first:** the project `CLAUDE.md`, this section, and the § sections your task names.
- **Branch:** `staging` in the main folder. One task per session.
- **Copy:** change `content/en/game-based-assessment.md` first, then `src/content/en/game-based-assessment.ts`. Use the exact wording in §S2 and §S5. `content/VOICE.md` applies. No new facts; every `siteFlags` switch still applies.
- **Look:** `DESIGN-GUIDE.md` is binding. Tokens and existing components only. Surfaces as §S1 says.
- **Checks:** `CLAUDE.md` step 1 (`npm run typecheck`, `npm run lint`, `npm run build`, `npm test`), then the smoke spec and the specs your task names, each for the reason given. Delete tests of removed parts; don't rewrite them for something else. The full e2e suite runs once, in C6. After an e2e failure, rerun only the failed tests.
- **Screenshots:** `npx playwright test tests/e2e/assessments.spec.ts -g "screenshots"` saves the whole GBA page at 1280 and 390 to `screenshots/phase-3/`. Look at them before ticking. Don't start `next start` by hand: Playwright's own server runs without database settings, which keeps it away from production.
- **Ticking:** tick the task's line in this file only (not `IMPLEMENTATION_PLAN.md` or `LANES.md`), in the same commit as the work. A call you made that this plan doesn't settle goes under "Decided during build" at the end (one line: task, choice, why).
- **Commit and push** to `staging` as `CLAUDE.md` says.

## Phase C1: A shorter GBA page

- [ ] C1 Docs: rewrite `content/en/game-based-assessment.md` to the new order (§S1) with §S2's module copy and §S3's top section, dropping the five sections; update `WEBSITE-PLAN.md` §5.3's table, `IMPLEMENTATION_PLAN.md` §4's GBA and `/science` rows, `DESIGN-GUIDE.md` (§S2's "Module cards" replaces "Module tabs" in §7.10; drop GBA from the segmented tabs' examples), and the GBA lines in `revisions3.0team/NEEDED-FROM-YOU.md` per §S4. Done when those files match §S1 to §S4 (Markdown only, so no code checks) · Sonnet 5.5 High: careful edits to many docs from exact wording.
- [ ] C2 Cut the five sections: content module, `GbaContent` in `src/content/types.ts`, the page, redirects and tests, per §S3 and §S4. First run the screenshot spec once and write the starting page heights (the PNG heights) in the commit body. Done when the checks pass, `tests/e2e/gba.spec.ts` and `tests/e2e/assessments.spec.ts` pass (both edited; the second also takes the screenshots), the page's JSON-LD `lowPrice` is the price the page shows, and the screenshots show the top section as §S3 says · Opus 5.5 Medium: silent failures (price readers, JSON-LD, redirects, anchors), well specified and unit-tested.
- [ ] C3 The four modules in one look: a `ModuleCard` block, the modules content and type, the page, the styleguide and tests, per §S2 (and §S3's note on the campus use-case page's alt). Done when the checks pass, `tests/e2e/gba.spec.ts` passes with §S6's new tests, the grid meets §S2's height limits on the screenshots, and arriving with each module anchor shows that card's title under the header · Sonnet 5.5 xHigh: a new layout judged from screenshots.
- [ ] C4 R1 Use cases from six cards to three, per §S5. Markdown, then the content module, then the use-case card test in `tests/e2e/gba.spec.ts` (run only that edited test, `file:line`). Done when the section shows three cards, each linking to its use-case page · Haiku 5.5 Max: exact copy from this plan.
- [ ] C5 R2 One FAQ item about reports, per §S5. Markdown, then the content module; a unit test that the FAQ JSON-LD carries it. Done when the checks pass (no e2e: wording in a flow that works) · Haiku 5.5 Max: exact copy from this plan.
- [ ] C6 Phase C1 end-to-end check: build once, run the full e2e suite once (`npm run test:e2e`) and `node scripts/check-geo.mjs` on the local production build with `--prelaunch`, saving the failure list first. Fix what C1 to C5 caused and rerun only the failed tests. Done when nothing caused by the code is left failing, and the commit body and this file's "Built" note give the page heights before and after at 1280 and 390 · Sonnet 5.5 High: runs and triages.
- [ ] Phase C1 review: read the round's whole diff. Check every sentence on the page against the old copy and the sources (nothing invented, switches respected), that the JSON-LD matches what the page shows, that every link into the page lands on its card (header menu, use-case pages in both languages, Enhance, the redirects), the heading outline, and the screenshots against `DESIGN-GUIDE.md` and §S2. Fix, then rerun only what the fixes touch · Opus 5.5 High: a public page changed.

## The owner's part

- [ ] *Owner, after the review:* look at `screenshots/phase-3/` (or `npm run preview`), then say "release". The D9 module titles are still waiting for your yes (`revisions3.0team/NEEDED-FROM-YOU.md`).

---

## §S1 The new page order

| # | Section | Surface | What's in it | Change |
|---|---|---|---|---|
| 1 | Hero | White | As now | None |
| 2 | What's different (`#principles`) | Cloud | The answer passage, then the three pillars (§S3) | Moved to the top; label and title gone |
| 3 | The suite (`#modules`) | White | Header, then the four module cards in one grid (§S2) | Rebuilt |
| 4 | Use cases (`#use-cases`) | Cloud | As now; three cards after R1 (§S5) | Shorter after R1 |
| 5 | Client stories link | White | As now, while `showStories` is on | None |
| 6 | FAQ (`#faq`) | White | The download offer first, while `showSampleReport` is on; then the FAQ as now, plus one item after R2 (§S5); the related guide under it | Download offer moved here; one item more after R2 |
| 7 | Closing panel | White | As now | None |

Gone: The problem, Reports, How it works, Pricing, Behind the results (Platform, Science, Before and after), the module tabs and everything inside the four module sections beyond what §S2 keeps.

## §S2 The four modules in one look

**The idea:** one card per module, all four visible together in a 2 × 2 grid, so a visitor sees the whole suite at a glance and nothing waits behind a tab. Each card answers three questions in about 50 words: what it is, what the candidate does, what it measures. One game screen per card keeps the "it's a game" feel.

**Section:** `#modules` on White. Header as now: label "The suite · 4 modules", title "All your talent assessments on one platform.", and a new lede: "Use one module, combine two, or run all four. Every module runs on the same platform, and reports are generated automatically."

**Grid:** a `ul`, two equal columns above 900px with a 20px gap, one column at 900px and below. Personality and Cognitive on the first row, Neuroscience and Simulation on the second. Cards in a row share one height.

**Card** (the side product tile's anatomy, §7.11, as a static card: no link, no hover lift):
1. H3: the module's title (`text-h3`), with id `<module>-title`.
2. Body: one or two sentences, `text-card`, slate.
3. Measures: over a `--line` hairline, `text-card`, ink: a bold count, then what it measures.
4. A sky strip at the bottom (`--grad-thumb`), 170px tall (150px below 600px), with the top of the module's screen inset 32px from the sides and 26px from the top, radius 12, `--shadow`, cropped by the strip. The strip sits at the bottom of the card (`margin-top: auto`), so strips in a row line up.

White card, `--line` hairline, radius 24, `--shadow-soft`. Padding 30px 32px 26px above the strip (24px on phones). Each `li` carries its module's id (`personality`, `cognitive`, `neuro`, `simulation`) and a scroll margin so an anchor lands the card's top 12px under the header (84px; 68px below 480px). The cards come in with the usual `Reveal` stagger.

Desktop, 1280 wide (the whole grid in about one screen):

```
                         The suite · 4 modules
              All your talent assessments on one platform.
   Use one module, combine two, or run all four. Every module runs on the
        same platform, and reports are generated automatically.

┌─────────────────────────────────────┐ ┌─────────────────────────────────────┐
│ DEUS Discover: Personality Test     │ │ Cognitive Assessment                │
│ Candidates make decisions in an     │ │ Seven short, timed games that       │
│ RPG-style story. How they handle …  │ │ measure how fast and how accurately │
│ ─────────────────────────────────── │ │ ─────────────────────────────────── │
│ 32 personality subtraits and 24     │ │ 7 games: processing speed, working  │
│ competency traits, built on …       │ │ memory, pattern recognition, …      │
│ ░░░┌─────────────────────────────┐░ │ │ ░░░┌─────────────────────────────┐░ │
│ ░░░│ Discover story scene        │░ │ │ ░░░│ Objective Shooter           │░ │
└─────────────────────────────────────┘ └─────────────────────────────────────┘
┌─────────────────────────────────────┐ ┌─────────────────────────────────────┐
│ Neuroscience Assessment             │ │ Simulation Assessment               │
│ Six games based on established …    │ │ Two business scenarios against …    │
│ ─────────────────────────────────── │ │ ─────────────────────────────────── │
│ 6 games: risk-taking, planning, …   │ │ 2 scenarios: analytical thinking, … │
│ ░░░┌─────────────────────────────┐░ │ │ ░░░┌─────────────────────────────┐░ │
│ ░░░│ Balloon Game                │░ │ │ ░░░│ Business Operations         │░ │
└─────────────────────────────────────┘ └─────────────────────────────────────┘
```

Phone, 390 wide (the same four cards stacked; the sky strip is 150px):

```
┌──────────────────────────────┐
│ DEUS Discover:               │
│ Personality Test             │
│ Candidates make decisions in │
│ an RPG-style story. How they │
│ handle each situation …      │
│ ──────────────────────────── │
│ 32 personality subtraits and │
│ 24 competency traits, …      │
│ ░░┌────────────────────────┐ │
│ ░░│ Discover story scene   │ │
└──────────────────────────────┘
  … then Cognitive, Neuroscience
    and Simulation the same way
```

**Copy** (exact; condensed from the current module copy, nothing new):

| Card | Title | Body | Measures (`**bold**` as written) | Screen |
|---|---|---|---|---|
| `personality` | DEUS Discover: Personality Test | Candidates make decisions in an RPG-style story. How they handle each situation shows their personality and competencies, measured against the framework your organization already uses. | **32** personality subtraits and **24** competency traits, built on the Big Five (OCEAN), plus competencies from your own framework. | `images.discoverFestival`, the story scene's current alt |
| `cognitive` | Cognitive Assessment | Seven short, timed games that measure how fast and how accurately someone processes information. | **7 games:** processing speed, working memory, pattern recognition, arithmetic, spatial reasoning, logical reasoning and cognitive agility. | `images.gameObjectiveShooter`, Objective Shooter's current alt (the hero already shows Mallet Math) |
| `neuro` | Neuroscience Assessment | Six games based on established neuroscience research. They capture behavior people don't consciously control. | **6 games:** risk-taking, planning, motivation, effort allocation, attention to detail and emotion recognition. | `images.gameBalloon`, the Balloon Game's current alt |
| `simulation` | Simulation Assessment | Two business scenarios against the clock: review cases and write a business report, then allocate a budget under a live timer. Both can be customized to your industry. | **2 scenarios:** analytical thinking, financial and business acumen, diagnostic information gathering and written synthesis. | `images.gbaSimulation`, alt "Business Operations: a mini case analysis with a calculator." |

**Limits** (checked on the C3 screenshots): at 1280 wide, the grid from the top of the first card to the bottom of the last is at most 950px, so both rows fit in about one screen. At 390 wide, at most 2,400px. If a card runs over, shorten the strip by up to 20px before touching the copy, and log it.

**Code:** `src/components/blocks/ModuleCard.tsx` (props: id, title, body, measures, image), shown on `/styleguide` with the other blocks. The content type keeps `modules.intro` and gets `modules.cards` (one entry per row above, in that order). The page's `SoftwareApplication` `featureList` keeps listing the four titles. Delete `ModuleTabs`, `MissGain`, the module sections' code and their tests once nothing imports them. `GameTile` and `GameGrid` stay (the styleguide and Home use them).

**DESIGN-GUIDE:** C1 replaces §7.10's "Module tabs" entry with a "Module cards (GBA, round 4)" entry holding this section's grid, card and limits, and points §7.16's games list note at it ("no longer on the GBA page").

## §S3 The top section, and what C2 cuts

**Top section** (`#principles`, Cloud, right after the hero): a visually hidden H2 "What's different" (id `principles-title`, the section's label); the answer passage (today `problem.intro.lede`, wording unchanged) as a centred paragraph in the section-header lede style, at most 40em wide; 40px below it (48px on desktop) the three pillars as they are, `WhyPanel` with `columns={3}` and `surface="cloud"`. The "Up next" teaser goes with The problem. The section keeps the normal top padding (the hero is White, this is Cloud).

**Content and type:** drop `problem` (move its `intro.lede` to `principles.passage`), `howItWorks`, `behind`, `platform`, `reports`, `science`, `impact` and `pricing`. Keep the price in one place: `export const GBA_FROM_PRICE = 69000` in `src/content/en/game-based-assessment.ts`, used by the answer passage, the cost FAQ, the page's JSON-LD `lowPrice` and the six other readers of `gbaEn.pricing.from.amount` (`npm run typecheck` lists them: two English and one Indonesian use-case page, two English and two Indonesian guides). C2 leaves `modules` alone. (C3 note: `campus-recruitment-assessment.ts` reads `gbaEn.modules.personality.story.alt`; point it at the Personality card's alt, which is the same text.)

**Page:** remove sections 2 and 6 to 9 and their imports. The download offer moves to just before the FAQ, GEO plan §S11's fallback (update the placement regex in `tests/unit/download-offer.test.tsx`). Leave `src/content/flags.ts` as it is: other pages' tests read those switches.

**Redirects:** `next.config.ts` `/science` → `${gba}#principles`; `src/lib/old-site-redirects.ts` `#science` → `#principles`, and the `#reports` group → the page without an anchor. Update the redirect rows in `tests/e2e/gba.spec.ts`.

**Tests:** see §S6.

## §S4 Where the removed facts still live

| Removed | Still on the page, or gone |
|---|---|
| The problem: four pain points | "Candidates can't fake how they play" in the pillar *Real behavior signals* and the FAQ *How is it different from a traditional psychometric test?* |
| The problem: answer passage | Opens the top section (§S3) |
| Reports: three report types, personality reports | The FAQ item from R2. Without R2: the hero's "reports generated the moment they finish" only |
| How it works: four steps, start small | FAQ: no install, anti-cheat, results the same day, *Can we try it first?*, no long-term contract (cost answer) |
| Pricing | Answer passage and the cost FAQ |
| Platform: six features and the dashboard | FAQ *How many candidates can it handle at once?* (invitations, reminders, progress, reports) |
| Science: frameworks, four phases, three points | Pillar *Scientifically grounded*; FAQ *Is it scientifically valid?* and *Is it designed for Indonesian candidates?* |
| Before and after: four impact points | Gone (a deck point) |
| Inside the modules: story text, stat readout, customization panels, game lists, "what tests miss", scenario cards, "what it assesses" | Condensed into the cards (§S2); customization stays in the FAQ *Can we assess against our own competency framework?* |

**Docs to bring in line (C1):** `NEEDED-FROM-YOU.md` group 1's GBA and Discover lines (the individual report crop, sharper `gba-1-crop.png` and `discover-report-crop.png`): mark the report crops "no longer needed: Reports left the GBA page in round 4" and keep what the hero or the cards still use. The D9 line: only the headings still on the page are waiting. The G1 copy line: GBA's passage now opens the top section, not The problem.

## §S5 Recommendations (each a task of its own; delete the line to skip)

**R1, C4: use cases from six cards to three.** Four of today's six cards link to the same page (talent mapping). One card per use-case page halves the section on desktop and saves three panels on a phone. The FAQ *What can we use it for?* still names all six uses. Section title unchanged.

| Card | Icon | Links to | Body |
|---|---|---|---|
| Recruitment | `map-pin` | `campus-recruitment-assessment` | As now |
| Management Trainee recruitment | `users` | `management-trainee-assessment` | As now |
| Talent mapping and promotions | `target` | `talent-mapping` | Map your people against your competency framework, find who's ready for supervisor and manager roles, and check fit before a promotion or rotation (mutasi). |

**R2, C5: one FAQ item, so the reports facts survive in a single answer** (and in the FAQ JSON-LD that AI tools read). After *How quickly do we get results?*:

- **What reports do we get?** An individual report for each candidate, a batch report for the whole intake, and an interactive dashboard your hiring committee can filter and sort, all generated the moment each candidate finishes. The individual report gives an overall score and percentile, each competency, strengths, development areas and a hiring recommendation, as a PDF or a live link. Personality adds a written profile and how closely each candidate matches the role.

## §S6 Tests to change

- **C2:** `tests/e2e/gba.spec.ts`: delete the tests for The problem, How it works, Pricing, Behind the results (Platform, Science, Before and after, `#science`, `#impact`) and Reports; add one that none of `#problem`, `#reports`, `#how-it-works`, `#pricing`, `#behind-results`, `#platform`, `#science`, `#impact` exists, one that the first section after the hero holds the answer passage and the three pillars with no visible heading, and one that the JSON-LD `lowPrice` appears, formatted, in the page text. `tests/e2e/assessments.spec.ts`: delete "Reports tabs by keyboard". Unit: `gba-page.test.tsx` (drop the report-tab, lower-sections, `NumberedSteps`-on-GBA and `ScrollingReport` cases whose component is deleted), `assessment-content.test.ts` (drop the science-section cases; keep the switch checks that still have copy to check), `download-offer.test.tsx` (placement).
- **C3:** `tests/e2e/gba.spec.ts`: delete the module-tab tests (sticky pill, arrow, swipe, "Next module" link, games row); add: the four cards are visible at once with no tab list in `#modules`, and for each of the four anchors, arriving with it puts `#<module>-title` in the viewport below the header. `tests/e2e/clients-phase.spec.ts`: delete "a wordy odd one out doesn't shrink…" (the stat readout leaves GBA; the other pages' stat tests stay). Unit: `gba-modules.test.tsx` becomes the module cards' tests (four cards in order, ids, titles equal to `featureList`, every card has a screen with alt text, measures start with a bold count) plus `ModuleCard` rendering.
- **C4:** the use-case card count in `tests/e2e/gba.spec.ts`.
- **C5:** a unit test that `faqPageJsonLd` of the GBA FAQ includes "What reports do we get?".

---

## Decided during build

*(one line per call: task, choice, why)*

## Built

*(one line per task: task, date, commit, page heights where measured)*
