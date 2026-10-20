# GBA page length (owner, 2026-10-20)

The owner's note: **Solutions → Game-Based Assessment is far too long; people have to scroll a lot.** This file measures the page, says where the length comes from and recommends a fix. Numbering carries on from `image-replacements.md` (F34 to F39), so this is **F40**. Nothing here is built yet; the owner's answers to Q1–Q3 below decide what goes into the build.

## Summary

| # | Page | Note | Type | Status |
|---|---|---|---|---|
| F40 | GBA | The page is too long; visitors scroll through about 28 screens on a laptop and 39 on a phone | structure, layout | proposed |

## How long it is now

Measured on the live site (https://deushcs-website.vercel.app/en/solutions/game-based-assessment) on 2026-10-20, with a laptop window of 1280×800 and a phone of 390×844. A "screen" is one window height.

| Page | Laptop (1280) | Phone (390) |
|---|---|---|
| **Game-Based Assessment** | **22,139px · 27.7 screens** | **33,134px · 39.3 screens** |
| Home | 10,612px · 13.3 screens | 15,157px · 18.0 screens |
| Solutions | 5,013px · 6.3 screens | 5,497px · 6.5 screens |

GBA is about twice as long as Home. Section by section:

| Section | Laptop | Phone |
|---|---|---|
| 1. Hero | 1.5 | 1.7 |
| 2. The problem | 1.2 | 1.6 |
| 3. Three pillars | 1.0 | 1.4 |
| **4. The four modules (together)** | **9.6** | **14.9** |
|  · Personality | 2.5 | 3.6 |
|  · Cognitive (7 games) | 2.5 | 4.1 |
|  · Neuroscience (6 games) | 2.1 | 3.9 |
|  · Simulation | 2.0 | 2.9 |
| 5. Use cases | 1.4 | 2.6 |
| 6. How it works | 1.0 | 1.5 |
| 7. The platform | 1.5 | 1.8 |
| **8. Reports** | **2.5** | **3.1** |
| **9. The science** | **2.4** | **4.0** |
| 10. Business impact | 1.1 | 1.7 |
| 11–15. Clients link, pricing, adoption, FAQ, closer | 4.1 | 3.8 |
| Footer | 0.5 | 0.9 |

## Why it's long

1. **Two pages became one, and both stayed whole.** F10 folded DEUS Discover and Next Chapter into this page, and F28 added the Science page. That was the right call (one product, one page), but every module kept its full content, so the four modules alone are a third of the page: 9.6 screens on a laptop, 15 on a phone. A visitor who only cares about, say, Simulation still scrolls past Personality, Cognitive and Neuroscience to get there.
2. **The same pattern repeats four times.** Each module has its own header, its own games or story, a science line and its own "What traditional tests miss / What you get instead" box. Reading them one after another feels like the same section four times.
3. **On a phone the game lists stack.** Cognitive's 7 games and Neuroscience's 6 each become one tall column of picture tiles (about 290px each), so those two modules alone are 8 phone screens.
4. **Reports shows reports twice.** The three report tabs (Individual, Batch, Interactive) are already compact, but under them the two Personality reports sit in a separate pair of tall cards.
5. **The science section points back up the page.** Its first row is three cards (Personality, Cognitive, Neuroscience) that only link back to the module sections, which the module sub-nav already does.

## Recommendation: keep one page, show one module at a time

**Turn the four module sections into tabs.** The sticky module pill that's already there (Personality · Cognitive · Neuroscience · Simulation) stops being a set of jump links and becomes a switcher: one module shows at a time, the way Reports and Home's "Where we help" already work. Nothing is deleted; every module keeps its header, games, science line and miss/gain box. It's the biggest win by far, and it doesn't undo F10: still one page, still one product.

Three smaller changes go with it:

- **On a phone, game lists become one sideways-swipe row** (a carousel with snap, the next tile peeking at the edge), instead of a 7-tile column. Laptop keeps the three-column grid.
- **Reports: the two Personality reports join the tabs** (Individual · Batch · Interactive · Personality · Profile suitability, or one "Personality" tab holding both, see Q2), so there's one switcher instead of tabs plus a second block.
- **The science: drop the three link cards** at the top of the section. Each module tab already carries its own science line, and the menu and module pill do the linking. The four phases, the three points and the psychologists line stay.

### What it saves (estimates)

| | Laptop | Phone |
|---|---|---|
| Now | 27.7 screens | 39.3 screens |
| Modules as tabs (the block shrinks to its tallest module) | −6.6 | −10.9 |
| Phone game rows swipe sideways | — | (inside the line above) |
| Personality reports into the tabs | −1.1 | −1.4 |
| Science link cards removed | −0.4 | −0.7 |
| **After** | **about 19–20 screens** | **about 26 screens** |

So roughly **30% shorter on a laptop and a third shorter on a phone**, with no copy removed. Estimates are from the measured section heights; the build checks the real numbers.

### How the tabs behave

- **Same look as today's pill**, in the same place under "Four modules, one platform.", and it still sticks under the header while the modules are on screen, so switching is always one tap away. The selected module fills ink, as now (DESIGN-GUIDE §7.10).
- **Switching keeps the reader in place.** If they've scrolled down into a long module and switch, the page scrolls back up just enough to put the pill and the new module's title under the header. No jump to the top of the page.
- **Every link that points at a module still works.** The menu (`nav.ts`), the redirects from `/solutions/discover` and `/solutions/next-chapter` (`next.config.ts`), Enhance's "DEUS Discover →" link and the styleguide all go to `#personality`, `#cognitive`, `#neuro` or `#simulation`. Opening the page with one of those opens that tab and scrolls to it; clicking a menu link while already on the page does the same. Switching tabs updates the address bar (without adding history steps), so a sales link to `#simulation` lands on Simulation.
- **A "Next module" link at the end of each panel** ("Next: Cognitive →"), so someone who wants to read all four doesn't have to scroll back up to the pill.
- **All four modules stay in the HTML** (Radix tabs hide the inactive ones, as `SegmentedTabs` already does), so search engines still see every game and every line.
- **One surface for the whole block.** The modules now alternate White and Cloud; as tabs they sit on one surface (White), and each module's miss/gain box uses the White variant.

### Considered and not recommended

- **Splitting the modules back into their own pages.** Shortest pages, but it reverses F10, which the owner approved because they're one product.
- **Collapsing whole sections into accordions** ("Read more"). Hides the headlines, so people scanning can't see what's there; accordions suit the FAQ, not the main story.
- **Cutting copy.** The copy is approved (R3 wording pass) and each module's content is what sales sends people for. Showing less at once is enough.
- **A page-wide "on this page" sidebar.** Helps people jump, but the page stays just as long. It can come later if the tabs aren't enough.

## Questions for the owner

- **Q1. Modules as tabs?** (a) **Recommended:** yes, as above. (b) Keep them stacked and only do the smaller changes (saves about 1.5 laptop screens and 6 phone screens).
- **Q2. Personality reports in the Reports tabs:** (a) **Recommended:** one "Personality" tab showing both reports side by side on a laptop, stacked on a phone, so the pill keeps four short labels. (b) Two separate tabs (five labels; the pill scrolls sideways on a phone).
- **Q3. Also fold "Start small. See the results. Then decide." (Smooth adoption) into Pricing?** Its four checks read as part of the offer, and it would save about another screen. (a) Yes, as a checklist next to the price. (b) **Recommended for now:** no, leave it; see how the page feels after the tabs first.

## How this gets built

One task, **R11 GBA page length (F40)** · **Opus 5.5 High**: it's a layout and interaction change on the page sales sends most, checked at three widths, which is the visual row of the model table. Main folder, on `staging`. The build session adds R11 to `IMPLEMENTATION_PLAN.md` ("Feedback round 1") and `LANES.md`, and ticks it there and in the summary table above when done.

The build session ticks each box as it finishes the step, in the same commit as the work.

- [ ] **Owner answers** Q1–Q3
- [ ] **R11 added** to `IMPLEMENTATION_PLAN.md` ("Feedback round 1") and `LANES.md`
- [ ] **1. Module tabs**: the module pill becomes a tab switcher; one module shows at a time; sticky as now; the page scrolls up to the pill on a switch when needed; "Next module" link at the end of each panel; one surface for the block
  - Files: `src/components/blocks/ModuleNav.tsx` (or a new `ModuleTabs.tsx` beside it), `src/app/[locale]/solutions/game-based-assessment/page.tsx`, the "next module" label in `src/content/en/game-based-assessment.ts` (and the types), `DESIGN-GUIDE.md` §7 (module nav)
- [ ] **2. Links to modules**: `#personality`, `#cognitive`, `#neuro`, `#simulation` open their tab on load and on `hashchange`; the hash follows the selected tab via `history.replaceState`; check the menu, both redirects, Enhance's Discover link and the styleguide
- [ ] **3. Phone game rows**: below 600px the games list is a sideways-swipe row with snap and a peek of the next tile, no page-wide sideways scroll; 600px and up unchanged
  - Files: `src/components/blocks/GameTile.tsx` (`GameGrid` list variant)
- [ ] **4. Reports**: the Personality reports move into the Reports tabs (as Q2 decides); the separate pair of cards goes
- [ ] **5. Science**: the three framework link cards go (and their content in `game-based-assessment.ts` / `content/en/game-based-assessment.md`); the rest of the section stays
- [ ] **6. Checks**: typecheck, lint, build, unit tests, e2e smoke and `tests/e2e/gba.spec.ts` (it checks the module sections, so it needs updating for tabs: a test that a module link opens its tab, and one that switching tabs works by keyboard)
- [ ] **7. Measure again** at 1280 and 390 and put the real numbers in the "What it saves" table above
- [ ] **8. Screenshots** at 1280, ~1000 and 390 of the module block (each tab), Reports and the science section, for the owner's review
- [ ] **9. Ticked** in the plan, `LANES.md` and the summary table above (F40 → done); committed and pushed to `staging`
- [ ] **Owner review** of the screenshots

## Brief for R11 (paste into a session, after the owner answers Q1–Q3)

```
GBA page length (owner, 2026-10-20): the Game-Based Assessment page is far too long
(27.7 screens at 1280, 39.3 at 390). Details, measurements and the plan:
postpushrevisions2.0/gba-page-length.md (F40). Owner's answers: Q1 = __, Q2 = __, Q3 = __.

Before starting: read CLAUDE.md, then add this as task "R11 GBA page length" under
"Feedback round 1" in IMPLEMENTATION_PLAN.md and in LANES.md (main folder, staging),
and tick it in both when done. Model: Opus 5.5 High (visual). Say so if I'm on another.

1. Module tabs: the sticky module pill (Personality · Cognitive · Neuroscience ·
   Simulation) becomes a tab switcher; one module shows at a time. Same look as the pill
   today (DESIGN-GUIDE §7.10), still sticky. On a switch, if the reader is scrolled
   down inside the block, scroll up just enough to put the pill and the new module's title
   under the header. A "Next: <module> →" link ends each panel (its label is copy, in the
   content module). The whole block sits on White. All panels stay in the HTML.
2. Module links: #personality, #cognitive, #neuro and #simulation open that tab and
   scroll to it, on load and on hashchange (menu clicks while on the page). Switching
   updates the hash with history.replaceState. Check the menu (nav.ts), the
   /solutions/discover and /solutions/next-chapter redirects, Enhance's "DEUS Discover →"
   link and the styleguide links.
3. Phone game rows: below 600px the Cognitive and Neuroscience game lists become a
   sideways-swipe row (scroll snap, next tile peeking). No page-wide sideways scroll.
   600px and up stay as they are.
4. Reports: the two Personality reports move into the Reports tabs as Q2 says; the
   separate pair of cards below the tabs goes.
5. Science: remove the three framework link cards at the top of the section (content
   module and content/en/game-based-assessment.md too). Everything else stays.

Don't cut or reword any other copy. Update DESIGN-GUIDE.md to match.

Tick each box in the feedback file's "How this gets built" checklist as you finish that
step (same commit as the work), mark F40 "done" in its summary table, and replace the
estimates in "What it saves" with the real measurements at 1280 and 390.

Checks per CLAUDE.md (typecheck, lint, build, unit, e2e smoke + gba spec, updated for
tabs). Screenshots at 1280, ~1000 and 390 for my review. Commit and push to staging.
```
