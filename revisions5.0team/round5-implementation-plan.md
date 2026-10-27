# Round 5: the team's open items (2026-10-27)

*Written 2026-10-27, from the "Open Items" tab of the team's Google Doc "Landing Page Feedback". Numbering carries on from round 3 (`revisions3.0team/feedback-team-2026-10-22.md`, up to F102).*

**Why:** the team checked the **live** site, which is still the 2026-10-23 release (`afa93eb`). Round 4's GBA cuts, the plain-copy pass and Enhance's three solution cards are on `staging` only (67 commits not live yet). So some of their 31 notes are already fixed on `staging`. Each note is quoted word for word at the end of this file, with a status and a response.

**Where the 31 notes stand:**

| Status | Count | Notes |
|---|---|---|
| Already fixed on `staging` (live at the next release) | 8 | F109, F112, F113, F114, F116, F117, F120, F130 (partly: A7 tightens it) |
| Built in this plan | 19 | F103–F105, F107, F108, F110, F111, F115, F118, F119, F121–F127, F131, F132 |
| Owner or Ko Will (no build task) | 4 | F106 on hold (the owner is checking it with Thania), F128 Ko Will's review, F129 office address (Q9), F133 retention (Ko Will confirms D5) |

**Defaults,** so no task stops to ask. Change any of them before the run (see "Before the run"):

| # | Question | Default |
|---|---|---|
| D1 | Scrollspy / page navigation (F103) | (a) **An "On this page" bar on Enhance and GBA only**, the two longest pages: it sticks under the header, lists the sections by their small labels, and marks the one you're reading. It scrolls sideways on phones. The other pages are short enough without it. (b) A "back to top" button on every page instead. (c) Nothing: round 4 and this round already shorten the pages. |
| D2 | Enhance "Supported beyond the platform" (F122) | **Cut it**, as the team asks. Nothing moves elsewhere: Home's "We stay involved" and the Enhance FAQ already say DEUS helps design KPIs, trains teams and reviews each cycle. |
| D3 | "Where we help" timing (F107) | **It autoplays and keeps cycling.** Each card shows for **3 seconds** (a full round of three cards takes 9 seconds; now 3.5 and 10.5). It pauses while the pointer or keyboard focus is on it, so a visitor can read, and carries on when they move away. A click jumps to that card, and the cycle carries on from there (today a click stops it for good). Only with the computer's "reduce motion" setting does it stay still, and then no bar is drawn. Home's timing only: Enhance's hero animation keeps its own. |
| D4 | About: mission and vision (F125, F126) | Undo D14's "big mission, small vision": **one section with two equal halves**, "Our mission" and "Our vision", side by side above 900px and stacked on phones. Each is a small label and its official sentence at the same size (lede size, ink), left-aligned. No sentence is set as a big heading. Official wording unchanged. |
| D5 | Privacy: two years (F133) | **Keep two years with the reason** (D17, 2026-10-22): appraisal and hiring cycles run once a year, so many companies come back a year later. The team's concern is added to Ko Will's review list; if he prefers one year, it's a one-line change. |
| D6 | Privacy: the email provider (F132) | **Name Titan.** deushcs.com's mail records (MX) point to `titan.email` (Hostinger's email service), so that is where the inbox is. Shown as "**Titan**, which holds our company inbox." with no country, since we don't know where Titan stores it. The owner can correct it in "Before the run". |
| D7 | GBA: the blue "Game-Based Assessment" line (F111) | **Remove it** on the GBA hero, as the team asks: the headline already says "Game-based assessment for hiring." This undoes the round 3 review's choice. Enhance keeps "DEUS Enhance" above its headline, because its headline doesn't name the product. |
| D8 | "Header two lines max" (F105, F124) | Home's and About's headlines take **at most two lines at 1024px and wider**, by layout only (size or measure), wording unchanged. On a 390px phone they may take up to four. |
| D9 | Tags that look clickable (F119, F123) | Every tag that does nothing becomes **plain text**: words separated by " · ", slate, no fill, no pill. One shared change: `Tag` and `IndustryPills`, everywhere they're used (Enhance hero, Clients industries, story cards, product tiles), and DESIGN-GUIDE gets a rule: pills are only for things you can click. |

**How to run it:** in the main folder on `staging` with a clean tree, `autorun check revisions5.0team/round5-implementation-plan.md`, then `autorun all revisions5.0team/round5-implementation-plan.md` (both phases) or `autorun revisions5.0team/round5-implementation-plan.md` (stops after each phase's review). By hand: "do the next task in `revisions5.0team/round5-implementation-plan.md`". Nothing goes live until the owner says "release"; the release also ships round 4.

**Rough cost:** about $21 for the 14 sessions at the model table's prices: Phase A $13, Phase B $8.

## Before the run

- [x] Owner: read D1 to D9 above and change any default you disagree with (write the change into the table). In D6, confirm Titan, or name the provider. Then tick this line. *Owner, 2026-10-27: all defaults as written, Titan included.*

## Rules for every task

- **Read first:** the project `CLAUDE.md`, this section, `DESIGN-GUIDE.md`, `content/VOICE.md`, the defaults table above, and the notes your task names (at the end of this file).
- **Branch:** `staging` in the main folder. One task per session.
- **Copy:** Markdown under `content/` first, then the module under `src/content/`. Use the exact wording this plan gives. No new facts; every `siteFlags` switch still applies. `npm test` runs the voice checker with `--strict`, so new copy must pass it.
- **Look:** `DESIGN-GUIDE.md` is binding. Tokens and existing components only; when a task changes a shared rule, it updates the guide's section in the same commit.
- **Pictures:** a product screen is never cut off (owner, 2026-10-27, as in `c24b328`). Screens in one group share one frame size, and each screen fits whole inside it.
- **Checks:** `CLAUDE.md` step 1, then the smoke spec and the spec of the page the task is about (`tests/e2e/<page>.spec.ts`), each for the reason given. A change of wording only needs the e2e tests you edited (`file:line`). Delete tests of removed parts. After an e2e failure, rerun only the failed tests. The full suite runs once per phase (A8, B4).
- **Screenshots:** each page spec has a "screenshots" test (`-g "screenshots"`); Home and About save theirs where their spec says. Look at the 1280 and 390 shots before ticking, plus any width the task names. Don't start `next start` by hand: Playwright's own server runs without database settings, which keeps it away from production.
- **Ticking:** tick the task's line in this file only, in the same commit as the work, and set the notes' status at the end of this file. A call this plan doesn't settle goes under "Decided during build" (one line: task, choice, why).
- **Commit and push** to `staging` as `CLAUDE.md` says.

## Phase A: The team's fixes, page by page

- [x] A1 Home "Where we help" (F107, F108), in `src/components/blocks/WhereWeHelpTabs.tsx`. First reproduce F107 on the Playwright build at 1280×800 and 1366×768: autoplay, a click on each card, the pointer resting on the cards, reduced motion. Write in the commit body what you found. Known cause: after a click (and with reduced motion) autoplay stops for good but the active bar is drawn full, so it looks stuck. Fix per D3: 3 seconds per card (a value for this showcase, not the shared `--tab-dwell`, which Enhance's `ReviewToPay` also uses); autoplay keeps cycling, pauses on hover or focus and resumes after; a click switches the card and its screen and the cycle carries on from that card; with reduced motion nothing moves and no bar shows. Fix any other cause the repro finds. Update the component's header comment and DESIGN-GUIDE §9.2. F108: the three screens share one frame on the stage, each whole and none cut off (today they're 620px wide, start 56px in and overflow the stage). Done when the checks pass, `home.spec.ts` has tests that autoplay moves from card 1 to 2 within about 4 seconds, that a click on card 3 shows card 3's screen and the cycle then moves on to card 1, and that with reduced motion no bar shows, and the screenshots show three whole, equal-sized screens · Sonnet 5.5 xHigh: an interaction bug plus a layout judged from screenshots.
- [ ] A2 Home hero headline and the Potentia tile (F105, F110). F105 per D8: "Every person has potential. / We help you see it." takes two lines at 1024, 1280 and 1440 (now three at 1280), wording unchanged. Leave the journey card's text alone (F106 is on hold). F110: the Potentia tile's phone and report art show whole in their box (`ProductTile` `variant="potentia"`), and the three tiles stay equal and in view together at 1280×800 (F50). Done when the checks pass, `home.spec.ts` passes, and the 1024, 1280, 1440 and 390 screenshots show it · Sonnet 5.5 xHigh: type and image layout judged from screenshots.
- [ ] A3 Plain-text tags (F119, F123) per D9: `Tag` (`src/components/ui/pills.tsx`) and `IndustryPills` (`src/components/blocks/StatReadout.tsx`) become plain text, words separated by " · ". Check every place they appear: Enhance hero chips, Clients industries, story cards, product tiles, the styleguide. Interactive `Chip` stays as it is. DESIGN-GUIDE gets the rule "pills are only for things you can click" in its tags section. Done when the checks pass, a unit test checks that the tags render no pill classes, and screenshots of Enhance's hero and Clients' industries at 1280 and 390 show plain text · Sonnet 5.5 xHigh: a shared component, judged from screenshots.
- [ ] A4 Enhance pictures and the support section (F118, F121, F122). F122 per D2: cut "Supported beyond the platform" (`#support`) from the content module, `content/en/enhance.md`, `ENHANCE-PAGE-SPEC.md`, the page and the tests; grep for `#support` first, and keep the surfaces alternating. Leave `ENHANCE-CONTENT.md` untouched. F118: the hero's four review-to-pay screens (`ReviewToPay`) share one frame size, each whole, so nothing jumps as they change. F121: the three solution cards use `screen="whole"`, as GBA's do since `c24b328`, so the Reward Grouping screen isn't cut. The cards already use screens the hero doesn't (Phase E). Done when the checks pass, `enhance.spec.ts` passes with the support tests removed, and the 1280 and 390 screenshots show equal, whole screens in the hero and in the cards · Sonnet 5.5 xHigh: a cut plus picture layout judged from screenshots.
- [ ] A5 GBA hero and headings (F111, F115). F111 per D7: remove the hero's product line (`hero.eyebrow` in `src/content/en/game-based-assessment.ts`, the Markdown's "Eyebrow" line and its note) and update the tests that read it. Leave the hero window's text alone (F106 is on hold). F115: no heading changes; record in this file's F115 response that every H2 now carries a search phrase. Done when the checks pass and `gba.spec.ts` passes (only the tests you edited, `file:line`) · Haiku 5.5 Max: exact copy from this plan.
- [ ] A6 About (F124 to F127). F124 per D8: "We believe people are a company's most important asset." takes two lines at 1024 and wider, wording unchanged. F125 and F126 per D4: `MissionStatement` becomes the two equal halves; update DESIGN-GUIDE's mission entry and `content/en/about.md`'s note. F127: "Our history" (`MilestoneTimeline`) works at every width. Look at 901, 1024, 1100, 1180 and 1280 (the team saw it break in a window that wasn't full screen); below the width where five columns fit, it switches to the stacked layout phones use. Check Enhance doesn't use `MilestoneTimeline` any more after A4 (grep); if it still does, look at it there too. Done when the checks pass, `about.spec.ts` passes, and the screenshots at those widths and 390 show the headline in two lines, the two equal halves and a tidy timeline · Sonnet 5.5 xHigh: layout at many widths, judged from screenshots.
- [ ] A7 Privacy wording (F130, F131, F132), in `src/content/en/privacy.ts` (no Markdown copy) and its Indonesian version if one exists. F130: "If you only browse, we don't store anything that identifies you. Our hosting provider keeps short technical logs for security, which it deletes after a short time." → "If you only browse and don't send a form, we don't know who you are. We count visits without names (see Vercel Web Analytics below), and our hosting provider keeps short technical logs for security, which it deletes after a short time." F131: "…financial details. The website stores nothing about children. Potentia, our assessment for students, runs on its own website, deuspotentia.com, which handles its own data." → "…financial details. Potentia, our assessment for children, runs on its own website, deuspotentia.com, which handles its own data. None of the forms on this website ask about children." F132 per D6: "Our email provider, which holds that inbox." → "**Titan**, which holds our company inbox." Change `updated` to the day of the change. Add the three changes and D5 to Ko Will's line in `revisions3.0team/NEEDED-FROM-YOU.md` group 6, and tick the email provider line in group 5. Done when the checks pass (`tests/unit/privacy-page.test.tsx` included) and `privacy.spec.ts`'s edited tests pass · Haiku 5.5 Max: exact copy from this plan.
- [ ] A8 Phase A end-to-end check: build once, run the full e2e suite once (`npm run test:e2e`), save the failure list to `revisions5.0team/a8-failure-list.md` first, then `node scripts/check-geo.mjs` on the local build with `--prelaunch`. Fix what A1 to A7 caused, and rerun only the failed tests. Tests that need the test database this server lacks are named, not fixed (see `revisions4.0/v10-failure-list.md`). Done when nothing caused by the code is left failing · Sonnet 5.5 High: runs and triages.
- [ ] Phase A review: read the phase's whole diff. Check each note F105 to F132 that Phase A covers against its response at the end of this file: is it really fixed, on the page, at 1280 and 390? Check every copy change against the sources (nothing invented), that A1 cycles as D3 says (3 seconds a card, carries on after a click), that no product screen is cut off on Home, Enhance or About, that nothing links to the cut `#support`, the heading outline of each changed page, and the screenshots against `DESIGN-GUIDE.md`. Fix, then rerun only what the fixes touch · Opus 5.5 High: public pages changed.

## Phase B: Pictures on every page, and page navigation

- [ ] B1 Picture audit (F104): run each page spec's screenshot test once, at 1280 and 390 (Home, Solutions, GBA, Enhance, Clients, the Telkom story, About, Contact, Privacy, the four use-case pages and the guides). List every product screen or photo that is cut off, stretched, blurry or a different size from its neighbours in `revisions5.0team/picture-list.md` (page, section, image key in `src/content/images.ts`, what's wrong, the fix). Fix nothing in this task. Done when the list covers every page (an empty list is fine) · Sonnet 5.5 High: a careful look at many screenshots.
- [ ] B2 Fix the picture list (F104): work through `revisions5.0team/picture-list.md` page by page. After each page, rerun only that page's screenshot test. A screen too small to show sharply goes to `revisions3.0team/NEEDED-FROM-YOU.md` group 1, not into an upscale. Done when every row is fixed or moved to the owner's list with a reason, and the checks pass · Sonnet 5.5 xHigh: picture layout judged from screenshots.
- [ ] B3 "On this page" bar (F103) per D1 (if the owner chose (b) or (c), build that instead, or tick this line with "not built" under "Decided during build"). A small `SectionNav` block: sticky under the header on Enhance and GBA, a link to each section's anchor labelled with that section's small label (so no new copy beyond its accessible name, "On this page", in `messages/*.json`), the current section marked as you scroll (IntersectionObserver), and sideways scrolling on phones. It must not cover the anchors' landing spots (`scroll-mt`), and it must work without JavaScript (plain links). Add it to the styleguide and DESIGN-GUIDE. Done when the checks pass, `enhance.spec.ts` and `gba.spec.ts` each have a test that clicking a link lands its section under the header and marks it current, and the screenshots at 1280 and 390 show it · Sonnet 5.5 xHigh: new navigation, judged from screenshots.
- [ ] B4 Phase B end-to-end check: build once, run the full e2e suite once, save the failure list to `revisions5.0team/b4-failure-list.md` first, then `check-geo.mjs --prelaunch`. Fix what B2 and B3 caused and rerun only the failed tests. Done when nothing caused by the code is left failing · Sonnet 5.5 High: runs and triages.
- [ ] Phase B review: read the phase's diff. Check that every row of `picture-list.md` is closed, the screenshots of every page at 1280 and 390 show no cut-off product screen, the "On this page" bar on both pages (keyboard, no JavaScript, phones, every link landing), and that every note at the end of this file has a final status. Fix, then rerun only what the fixes touch · Opus 5.5 High: public pages changed.

## The owner's part (after the run)

- [ ] Owner: ask Ko Will for the Privacy review (F128; `revisions3.0team/NEEDED-FROM-YOU.md` group 6, now with A7's changes and D5).
- [ ] Owner: the office address (Q9, F129). Once it's in, `showAddress` in `src/content/flags.ts` shows it on Contact and Privacy (a five-minute task).
- [ ] Owner: say "release" to ship round 4 and round 5 together, then send the team the responses below (Claude can write them into the Google Doc's Open Items tab on request).

## Decided during build

*(one line per call: task, choice, why)*

- A1: a mouse click no longer holds the cycle; only keyboard focus (`:focus-visible`) does, because a clicked button keeps focus and the old "focus pauses" rule would have frozen the bar at empty after every click. A1 also keeps the bar's 3px row (empty, no fill) with reduced motion and before the script, so the card doesn't shift when the bar appears.
- A1: the three screens sit in one 16:9 white frame with the screen shown whole inside it (`object-fit: contain`), rather than a stage-sized frame, so the frame is the same on every card and the white above or beside a screen is small. 3s is the new `--showcase-dwell` token; `--tab-dwell` stays 3.5s for Enhance.

## Built

*(one line per task: task, date, commit)*

- A1 · 2026-10-27 · Home "Where we help": 3s cycle that carries on after a click, one frame for the three screens.

---

# The team's notes, word for word, with our responses

Quoted exactly as they appear in the Open Items tab (headings as the team wrote them). Under each: its number, its status, and what we do. *Status:* **fixed on staging** (done in round 4, live at the next release) · **task** (built in this plan) · **owner** (needs the owner or Ko Will).

The doc also has one comment, from Gregory on the HOAFL note: *"@thania.ferdinanto@deushcs.com Not too sure maksudnya gmn hehe utk yg played only 22 mins"*. F106 waits for Thania's answer.

## ALL PAGES

> Bisa ditambahkan scrollspy/bantuan navigasi untuk memudahkan user, berhubung beberapa halaman sangat panjang ke bawah

**F103 · task B3 (D1).** Agreed for the longest pages. Round 4 already cut the GBA page from about 15 laptop screens to 9 (13,579px → 7,086px), and A4 cuts a section from Enhance (about 13 screens now). For those two pages we add an "On this page" bar that sticks under the header, lists the sections and marks the one you're reading. The other pages are short enough without it.

> Beberapa gambar tampilan nya terpotong

**F104 · task A1, A2, A4, then B1 and B2.** Agreed: from now on a product screen is never cut off. The ones we know of are fixed in Phase A: Home's "Where we help" (F108), the Potentia card (F110), Enhance's hero and solution cards (F118, F121). The GBA module cards were fixed on 2026-10-27 (`c24b328`). Phase B then screenshots every page and fixes any others it finds.

## HOMEPAGE

### Section 1: Intro

> Header 2 baris saja

**F105 · task A2 (D8).** Confirmed: at 1280px, "Every person has potential. We help you see it." breaks into three lines. A2 resizes it so it takes two lines on laptops (1024px and wider), without changing the words. On a phone it may still take up to four, because the text is large.

### Section 2: Employee Journey, Trusted By…

> Consider tulis HOAFL played only 22 mins, karena banyak yang komplain lama

**F106 · on hold (owner).** HOAFL is Heroes of a Fallen Land, the DEUS Discover story game shown in the first journey card ("Plays an assessment game · 22 minutes"). The owner is checking with Thania what she meant before anything changes, so this round leaves the card as it is.

### Section 4: Where We Help

> Bug, loading bar sudah penuh tapi belum otomatis pindah ke card berikutnya. Di klik pun tidak bisa.

**F107 · task A1 (D3) · fixed on `staging`.** Confirmed as a bug. Once a card is clicked (or when the computer is set to reduce motion), the cards stop changing for good, but the bar stays drawn full, so it looks stuck. A1 reproduces it on a laptop first, then fixes it. The cards autoplay and keep cycling, 3 seconds each (a full round in 9 seconds, down from 10.5). They pause only while the pointer is on them, so people can read. A click jumps to that card and the cycle carries on from there. Anything else the repro finds gets fixed too, and new tests check it.

> Cek lagi product screenshot yang dimasukkan ke dalam setiap cards. Better ukurannya sama dan tidak terpotong.

**F108 · task A1 · fixed on `staging`.** Agreed. Today each screen is placed so it runs off the edge of its panel. The three screens get one frame of the same size and each shows whole.

### Section 5: Our Solutions

> Reassess header. What do you mean by "one idea"? Mana one idea-nya?

**F109 · fixed on staging.** The round 4 copy pass changed "Three solutions, one idea: better evidence." to "**Three products, all built on evidence.**" (label "Our products"). It goes live at the next release.

> Gambar di Potentia card terpotong

**F110 · task A2.** Agreed. The phone and report pictures get a box they fit in whole, and the three cards stay the same size and in view together.

## SOLUTIONS

### Game Based Assessment

Current headline: Reveal Real Potential Through Play

> Tulisan berwarna biru Game Based Assessment dihapus saja agar tidak mengulang

**F111 · task A5 (D7).** Agreed. The headline has been "Game-based assessment for hiring." since round 3, so the blue product line above it repeats it. We remove it. (Round 3's review had kept it; this undoes that.)

#### Section Simulation

> Sub judul kalimat "a real business problem, against the clock" diubah jadi: "The assessment to test business problem solving skills" (font dikecilkan)

**F112 · fixed on staging.** Round 4 removed the sub-lines from all four modules to shorten the page. The Simulation card is now titled "**Simulation Assessment**", and its first line says what it tests: "Two timed business cases. In one, candidates review information and write a business report; in the other, they split a budget while a timer runs." It also lists the skills: analytical thinking, financial and business acumen, information gathering and written synthesis.

#### Note tambahan

> Kalau memungkinkan, section Personality, Cognitive, Neuroscience dan Simulation bisa ditambahkan tombol geser ke kanan juga. Tambahan: Terlihat membingungkan bagi user apabila harus click tombol "Personality", "Cognitive", "Neuroscience, "Simulation" untuk melihat konten masing2 assessment. Lalu apabila refer ke webiste Agate, content jauh lebih consise, informasi tidak perlu terlalu banyak, bisa memancing rasa penasaran bagi user

**F113 · fixed on staging.** Round 4 removed the four buttons. The four modules now show together as four cards in a 2 × 2 grid, nothing to click or swipe, each about 50 words (what the candidate does, what it shows, what it measures) with one game screen. It's in the spirit of Agate's page: short, and enough to make people curious.

> Mungkin section2 seperti "What traditional tests miss & What you get instead" bisa di hapus saja

**F114 · fixed on staging.** Gone. Round 4 folded the module contents into the cards and deleted that two-column block.

> Keyword2 utama lebih baik dimasukkan ke judul2 section untuk mempermudah visibility di search engine/GEO (referensi keyword dari page GBA Agate: https://agatelevelup.com/game-based-assessment/)

**F115 · mostly done; A5 records it.** Done in round 3 (F69, using Agate's keywords) and kept through round 4. Every heading on the page now carries a search phrase. Page title "Game-Based Assessment: Talent Assessment for Hiring"; headline "Game-based assessment for hiring."; "What makes our assessments different."; "All your talent assessments on one platform."; modules "DEUS Discover: Personality Test", "Cognitive Assessment", "Neuroscience Assessment", "Simulation Assessment"; "Talent assessment for each stage of the employee lifecycle."; FAQ "Questions HR teams ask about game-based assessment." The site has been open to search engines since launch, so these are already being indexed.

#### Section Reports

> Tulisan "Export as Pdf", "Download as Pdf" terlihat seperti tombol yang bisa di click

**F116 · fixed on staging.** Round 4 removed the whole Reports section (owner's decision). One FAQ item, "What reports do we get?", now describes the reports, with no fake buttons.

#### Section How it Works, The Platform Behind It, The Science, Before and After, Getting Started

> Bisa dipertimbangkan lagi apakah section2 ini perlu dimasukkan ke dalam web, karena sepertinya lebih cocok untuk di introduce saat presentasi saja, karena banyak detail dan kemungkinan tidak akan terlalu di baca dan untuk website, terlalu panjang kalau mau scroll sampai paling bawah ..informasi penting seperti "Pricing" cukup jauh untuk di reach
>
> Bisa refer kembali ke website GBA Agate, informasinya straight to the point, tidak membingungkan pembaca dengan terlalu banyak informasi

**F117 · fixed on staging.** Agreed, and done in round 4. How it works (which took in Getting started in round 3), the platform, the science and before-and-after are all gone, along with The problem and Reports. The page is now: hero, what's different, the four modules, use cases, FAQ, closing. It's about 9 laptop screens instead of 15. On pricing, the owner decided the GBA page shows **no price at all**; "Request a free trial" is the next step, at the top and the bottom of the page.

### DEUS Enhance

#### Section 1: Intro

> Product screenshot better sama ukuran. Pastikan jangan terpotong

**F118 · task A4.** Agreed. The four screens in the top animation (KPIs → appraisal → calibration → bonus) are different shapes today, so the frame changes size as they switch. They get one frame size, and each shows whole.

> Chips "KPIs," "Appraisal," dll. memberikan kesan bisa di klik

**F119 · task A3 (D9).** Agreed. They become a plain line of text ("KPIs · Appraisal · Calibration · Talent mapping · Rewards"). The same fix applies everywhere on the site: from now on, only things you can click look like pills.

#### Section 5: How Enhance Closes Each Gap

> Too much steps, orang ga akan baca

**F120 · fixed on staging.** Round 4 (Phase E) replaced the six steps with **three cards** that show all at once: "Set KPIs and track them", "Review and calibrate", "Turn results into pay". No tabs, no numbers, nothing to click.

> Pastikan product screenshot dimensinya sama semua, dan jangan pakai screenshot yang sama yang sudah dipakai di bagian lain

**F121 · partly fixed on staging; the rest in task A4.** No repeats: the three cards now use screens the top animation doesn't (KPI & Competency Library, the talent map, Reward Grouping). Same size: not yet, because the Reward Grouping screen is cut off at the bottom. A4 shows each screen whole and lines them up, as the GBA cards do now.

#### Section 6: Supported Beyond the Platform

> Gausah, jangan terlalu banyak section

**F122 · task A4 (D2).** Agreed, cut. What it said (KPI design help, training, reviewing each cycle) is still on Home under "We stay involved" and in the Enhance FAQ.

## CLIENTS

### Section 2: Industries

> Chips "Retail," "Telecommunications," dll. Memberikan kesan bisa di klik

**F123 · task A3 (D9).** Agreed. Same fix as F119: the industries become plain text, no pills.

## ABOUT

### Section 1: Intro

> Header 2 baris saja maks

**F124 · task A6 (D8).** Agreed. "We believe people are a company's most important asset." gets two lines on laptops, by resizing, without changing the words.

### Section 3: Our Mission

> Kenapa Vision lebih kecil dari Mission?

**F125 · task A6 (D4).** Round 3 (D14) made the mission the big statement and put the vision under it, smaller. The team is right that this makes the vision look less important. A6 gives them equal weight: two halves side by side, "Our mission" and "Our vision", at the same size.

> Untuk Mission perbaiki layout, jangan semuanya header kayak sekarang

**F126 · task A6 (D4).** Agreed. The mission sentence is no longer set as a huge heading. It reads at the same size as the vision, under a small "Our mission" label. The official wording stays.

### Section 5: Our Journey

> Cek web responsiveness untuk bagian ini. Timeline jadi berantakan kalau windows ga maksimal

**F127 · task A6.** Agreed. (The section is now labelled "Our history".) Five columns don't fit in a laptop window that isn't full screen. A6 checks it at five widths between 901px and 1280px. Below the width where five columns fit, it switches to the stacked layout phones already use.

## PRIVACY

> Untuk bagian ini baiknya konsultasi dengan Ko Will juga, berhubung lebih tech-related.

**F128 · owner.** Agreed. Ko Will's review has been ready since round 3 (`NEEDED-FROM-YOU.md` group 6). A7 adds this round's changes and the two-year question (F133) to his list.

### General

> Masukkan alamat kantor juga

**F129 · owner (Q9).** The address line is built and switched off (`showAddress`) until the owner sends the address. Once it arrives, it shows on Contact and Privacy the same day.

### Section 3: What We Collect

> Sama seperti section 1, frasa "If you only browse the site, it stores nothing about you" juga kontradiktif

**F130 · fixed in round 3 (live); A7 tightens it.** Since 2026-10-23 the live text reads: "If you only browse, we don't store anything that identifies you. Our hosting provider keeps short technical logs for security…". It can still sound odd next to the analytics paragraph below it, so A7 makes it: "If you only browse and don't send a form, we don't know who you are. We count visits without names (see Vercel Web Analytics below), and our hosting provider keeps short technical logs for security, which it deletes after a short time."

> "Stores nothing about children" maksudnya gimana? Kalau soal Potentia either di mention setelah kalimat terakhir/dihilangkan dari bagian ini.

**F131 · task A7.** It means the website's forms never collect anything about a child. Potentia runs on its own website. As suggested, Potentia comes first and the sentence follows it, said plainly: "Potentia, our assessment for children, runs on its own website, deuspotentia.com, which handles its own data. None of the forms on this website ask about children."

### Section 5: Who Sees Your Data

> Apakah ada pertimbangan kenapa vendor untuk "our email provider" tidak disebut?

**F132 · task A7 (D6).** No reason, except that we hadn't confirmed it. deushcs.com's mail records point to Titan (Hostinger's email service), so A7 names it: "**Titan**, which holds our company inbox." The owner confirms before the run.

### Section 7: How Long We Keep It

> Apakah memang betul-betul 2 tahun? Ada pertimbangan kah? Karena saat ini kesannya lama banget

**F133 · owner and Ko Will (D5).** There is a reason, and since round 3 the page gives it: hiring and appraisal cycles run once a year, so many companies come back a year later, and two years means we still have their message. Anyone can ask us to delete theirs sooner. We keep two years unless Ko Will prefers one; changing it is one line.
