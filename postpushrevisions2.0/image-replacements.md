# Image replacements (owner, 2026-10-19)

The owner's new pictures are in `image-components/`. Each file name says which section it's for. This file says where each one goes, page by page, **starting with Home**. Other pages get added below as the owner sends their pictures. Numbering carries on from `feedback-2026-10-19.md` (F31 to F33).

## Summary (Home)

| # | Home section | Slot | Now | Becomes | Status |
|---|---|---|---|---|---|
| F34 | Hero, "One employee's journey" | "Plays DEUS Discover" card | `gbaStory` (`gba-1-crop.png`, the Sinta story scene) | `"One Employees Journey" - plays DEUS Discover.png` (Heroes of a Fallen Land title screen) | done |
| F35 | Where we help | Hire, "Choose the right people" | `gbaNumerical` (`gba-2-crop.png`, number blocks game) | **the current "Plays DEUS Discover" picture**: `gbaStory` (`gba-1-crop.png`, the Sinta story scene) | done |
| F36 | Where we help | Develop, "Find the potential you already have" | placeholder `gbaReportBatch` | `Where we Help - "Find Potential We Already Have".png` (Batch Neuro Report, Cohort Overview) | done |
| F37 | Where we help | Perform and reward, "Pay for performance you can prove" | `enhanceDashboard` (`enhance-1.png`) | `Where we Help - Pay for Performance.jpeg` (Bonus Dashboard) | done |
| F38 | Our solutions | Game-Based Assessment tile | `gbaNumerical` (`gba-2-crop.png`) | `Our Solutions- Game Based Assessment.png` (Next Chapter desk scene) | done |
| F39 | Our solutions | DEUS Enhance tile | `enhanceDashboard` (`enhance-1.png`) | `Our Solutions - DEUS Enhance.jpeg` (PA Dashboard) | done |

F34 and F35 are a swap: the Sinta story scene leaves the hero card and moves to the Hire tab, and the new Heroes of a Fallen Land screen takes its place in the hero.

## Rules for every swap

- **Home only.** `gbaStory`, `gbaNumerical` and `enhanceDashboard` are also used on the GBA page, the Enhance page, the Solutions page (`SolutionGroups.tsx`) and the styleguide. **Don't overwrite their files or change those keys.** Add new keys to `images` in `src/content/images.ts` and point only Home's slots at them. The other pages stay exactly as they are until their own round.
- **Copies go in `public/assets/`**, cropped and sized; the originals in `image-components/` stay untouched and untracked (don't commit that folder). Kebab-case names in the style of the existing ones, e.g. `discover-title.png`, `gba-batch-report.png`, `enhance-bonus-dashboard.png`, `gba-next-chapter.png`, `enhance-pa-dashboard.png`.
- **Crop away black borders and bars**, then export at about 2× the slot's display width (no larger), so the files stay small. Width and height in `images.ts` must match the exported file.
- **Alt text is copy**, so it lives in `src/content/en/home.ts` (and `content/en/home.md` if the alt is listed there), never in a component. Reuse approved wording where it exists.
- **Check each slot at 1280, ~1000 and 390.** The frames show the picture's top-left part and clip the rest, so the crop decides what visitors see.

## F34. Hero journey card: "Plays DEUS Discover"

- **File:** `image-components/"One Employees Journey" - plays DEUS Discover.png` (2000×2000, the game sits in a black square).
- **Crop:** to the game frame only, roughly x 44–1877, y 397–1536 (measure it exactly). Export about 700px wide; the card is 340px.
- **Wire:** new key (e.g. `discoverTitle`) in `images.ts`; `HomeHero.tsx` line 48 uses it instead of `images.gbaStory`. Alt stays `""` (the card's title names it). Title and meta ("Plays DEUS Discover", "22 minutes") don't change.
- The styleguide's copy of this card keeps `gbaStory`.

## F35. Where we help, Hire: "Choose the right people"

- **Picture:** the one the hero card shows today, `images.gbaStory` (`public/assets/gba-1-crop.png`). No new file; this slot just points at the existing key.
- **Wire:** in `home.ts`, `hireToReward.stages[0].screen` becomes `{ image: "gbaStory", alt: … }`. Alt: reuse the GBA page's approved wording, "A DEUS Discover story scene: a colleague asks what you would do, with two answers to choose from."
- **Result card (Q1, owner decides before building):** the card on this tab says "Numerical reasoning · 82 · percentile, Indonesian norm", which matched the number game but not a personality story scene. Options:
  - **(a) Recommended:** remove the result card from this tab. It's sample data anyway, and the other two tabs have none.
  - (b) Keep it as it is.
  - (c) Swap it for a personality reading using the hero's sample data (e.g. "Rational · 94"), which still needs approved sample data before launch (Task 7.4).
- 830px wide against a 620px slot is a bit soft on retina screens. If it looks blurry, ask the owner for a sharper capture of the same scene (it's on the TODO-NEXT item 4 list as F19).

## F36. Where we help, Develop: "Find the potential you already have"

- **File:** `image-components/Where we Help - "Find Potential We Already Have".png` (2000×2000, a batch report: Cohort Overview, Domain Statistics, Band Distribution).
- **Crop:** drop the black band along the top (about 78px). The slot is a 620px-wide landscape stage, so crop to landscape (about 16:10) from the top: the green "Cohort Overview" header, the three stat cards and the first rows of Domain Statistics. Export about 1240px wide.
- **Wire:** this is the batch report the placeholder was waiting for. Add it to `images` as a new key (e.g. `gbaReportBatch`) and change `hireToReward.stages[1].screen` from `{ missing: "gbaReportBatch" }` to `{ image: "gbaReportBatch", alt: … }`. Alt: "A Game-Based Assessment batch report: a cohort overview with scores for each domain." Keep `missingScreens.gbaReportBatch` for now, because the GBA page still shows that placeholder (see "Later" below). If the type checker objects to the same name in both, use `gbaBatchReport` for the image.

## F37. Where we help, Perform and reward: "Pay for performance you can prove"

- **File:** `image-components/Where we Help - Pay for Performance.jpeg` (1101×1600, portrait: Bonus Dashboard).
- **Crop:** portrait won't fit the landscape stage. Crop the top part: the "Bonus Dashboard" title, "FY26 - Q2 Global Performance", Employee Status Breakdown and Budget Allocation (the 118% gauge), down to about y 540. Export at full width (1101px; it's the largest available).
- **Wire:** new key (e.g. `enhanceBonusDashboard`); `hireToReward.stages[2].screen` points at it. Alt: "DEUS Enhance bonus dashboard: employee status breakdown and budget allocation for a bonus cycle."

## F38. Our solutions, Game-Based Assessment tile

- **File:** `image-components/Our Solutions- Game Based Assessment.png` (1440×719: the Next Chapter desk scene, "Game Completed 0/17", "Select Your Game").
- **Crop:** cut the dark bars on both sides (the frame runs about x 80–1360). Export about 1280px wide.
- **Wire:** new key (e.g. `gbaNextChapter`); in `HomeSolutions.tsx`, `tileScreens["/solutions/game-based-assessment"].image` points at it. `SolutionGroups.tsx` (the Solutions page) keeps `gbaNumerical`. Alt stays `""` (the tile's title names it).

## F39. Our solutions, DEUS Enhance tile

- **File:** `image-components/Our Solutions - DEUS Enhance.jpeg` (921×838: PA Dashboard with score cards, KPI and Competency charts, feedback).
- **Crop:** none needed beyond trimming any edge. The tile shows a 680px-wide picture clipped at the bottom, so check that the four score cards and the top of both charts are visible.
- **Wire:** new key (e.g. `enhancePaDashboard`); `tileScreens["/solutions/enhance"].image` points at it. `SolutionGroups.tsx` and the Enhance page keep `enhanceDashboard`. Alt stays `""`.
- 921px is under 2× the 680px slot, so it'll be slightly soft on retina screens. Fine for now; a larger capture can replace it later.

## Owner checks (before building)

- **Q1:** the Hire tab's result card (F35): (a) remove, (b) keep or (c) personality reading. Default if unanswered: **(a)**. *Built with (a), 2026-10-19.*
- **Q2:** the Bonus Dashboard (F37) and PA Dashboard (F39) show people's names ("Andi Hermansyah", "Faisal Akbar" and others). The PA one uses a `.test` email, so it looks like test data. Confirm that none of them are real employees or clients before it goes live.

## How this gets built

One task, **R10 Home image replacements** · **Opus 5.5 High** (cropping and checking frames is visual work), in the main folder on `staging`. The build session adds R10 to `IMPLEMENTATION_PLAN.md` ("Feedback round 1") and `LANES.md`, and ticks it there and in the summary table above when done. Each box below gets ticked as the step finishes, in the same commit as the work.

- [x] **R10 added** to `IMPLEMENTATION_PLAN.md` and `LANES.md`
- [x] **1. Crops** for F34, F36, F37, F38 and F39 exported to `public/assets/`, with sizes recorded in `images.ts`
- [x] **2. F34 + F35 swap** (hero card and Hire tab), with Q1 applied
- [x] **3. F36 + F37** (Develop and Perform and reward tabs)
- [x] **4. F38 + F39** (solution tiles), Home only
- [x] **5. Other pages unchanged:** the GBA page, Enhance page, Solutions page and styleguide still show their old pictures
- [x] **6. Checks:** typecheck, lint, build, unit tests, e2e smoke and home spec (`tests/e2e/home.spec.ts`, updated if it checks the Develop placeholder or an image source)
- [x] **7. Screenshots** of the hero, Where we help (all three tabs) and Our solutions at 1280, ~1000 and 390, for the owner's review
- [x] **8. Ticked** in the plan, `LANES.md`, the summary table above and the picture list in TODO-NEXT item 4; committed and pushed to `staging`
- [x] **Owner review** of the screenshots (approved 2026-10-19)
- [ ] **Later:** the GBA page's own batch-report placeholder can use the F36 picture too, when the GBA page's pictures are reviewed

## Brief for R10 (paste into a session)

```
Home image replacements (owner, 2026-10-19). Six picture changes on Home, built as one task.
Details, crops and alt text: postpushrevisions2.0/image-replacements.md (F34-F39).
New pictures are in image-components/ (leave that folder untouched and uncommitted).

Before starting: read CLAUDE.md, then add this as task "R10 Home image replacements" under
"Feedback round 1" in IMPLEMENTATION_PLAN.md and in LANES.md (main folder, staging), and
tick it in both when done. Model: Opus 5.5 High (visual). Say so if I'm on another.

1. F34 + F35 (a swap): the hero's "Plays DEUS Discover" card gets the Heroes of a Fallen
   Land screen; the Sinta story scene it shows today (gbaStory) moves to Where we help,
   "Choose the right people". Apply Q1 for that tab's result card (default: remove it).
2. F36: Where we help, "Find the potential you already have": the batch report replaces the
   gbaReportBatch placeholder.
3. F37: Where we help, "Pay for performance you can prove": the Bonus Dashboard, cropped to
   its top part.
4. F38 + F39: Our solutions tiles: the Next Chapter desk scene (GBA) and the PA Dashboard
   (Enhance).

Home only: add new keys in src/content/images.ts and point Home's slots at them. Don't
overwrite existing files or keys; the GBA, Enhance and Solutions pages and the styleguide
keep their pictures. Crop black borders, export at about 2x display width, alt text in
home.ts. Check 1280, ~1000 and 390: the frames clip to the top-left, so the crop decides
what shows.

Tick each box in the file's "How this gets built" checklist as you finish that step (same
commit as the work), and mark F34-F39 "done" in its summary table.

Checks per CLAUDE.md (typecheck, lint, build, unit, e2e smoke + home spec). Screenshots of
the three sections at 1280 and 390 for my review. Commit and push to staging.
```
