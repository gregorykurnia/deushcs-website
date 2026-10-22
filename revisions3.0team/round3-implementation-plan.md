# Round 3 implementation plan (team feedback, 2026-10-22)

How the team's round 3 notes get built. The notes, the owner's decisions (D1–D17) and the proposed wording are in `feedback-team-2026-10-22.md` (this folder); this file says **what each task builds, in what order, on which model**. The task lines `autorun` picks up are in `IMPLEMENTATION_PLAN.md`, "Team feedback round 3", one per task below, in the same order.

## Running it

From the main folder, on `staging`, with a clean tree:

- `autorun one` builds just R12, a good first check that everything works.
- `autorun` builds R12 to the round 3 review one after another and stops after the review (the end of the section). A session that hits a real question waits for `autorun answer`.
- `autorun all` does the same overnight, making its own calls and logging them (`autorun decisions`).

Order: R12 → R13a → R13b → R14a → R14b → R16a → R16b → R15a → R15b → R17 → R18 → Round 3 review. R16a comes before R15 because it changes the product-page hero both GBA and Enhance use.

## Rules for every round 3 task

1. **Read first:** the task's section below, its F-notes and decisions in `feedback-team-2026-10-22.md` (the summary table and the page section), `DESIGN-GUIDE.md` for anything visual, `content/VOICE.md` for any wording. Copy goes in the Markdown under `content/en/` first, then the content module under `src/content/en/`; nothing is hard-coded in components.
2. **Decisions are made.** D1–D17 are settled; follow them as written. The proposed wording in the feedback file is the wording to use unless it doesn't fit (too long for two lines, for instance); then adjust it and log the change under "Decided during build" in the feedback file. D9 (the GBA headline table) is used as **provisional**: build it, and the owner approves it afterwards.
3. **Missing facts, pictures or permissions never block a task, and are never invented.** Build what can be built: keep the existing text, a placeholder screen (`missingScreens`, DESIGN-GUIDE §14.3) or a flag in `src/content/flags.ts` that's off. Then add or update the item in `NEEDED-FROM-YOU.md` (this folder) (what's needed, why, what it unblocks; one line, in the right group) and in the build plan's Waiting for the owner list, and finish the task. Name it in the report.
4. **Only stop for the owner** for what can't be undone or needs them in person (production, accounts, secrets, `main`). A wording or layout judgment call is not a reason to stop: pick the option that's easiest to change later, and log it in the feedback file under "Decided during build" (one line: task, choice, alternative, why).
5. **Checks (light, per task):** `npm run typecheck`, `npm run lint`, `npm run build`, `npm test`, then `npx playwright test tests/e2e/smoke.spec.ts` plus the spec named after each page the task mainly changes (listed per task). Update tests that assert old wording or removed sections; run only the edited tests for a wording-only spec change (`file:line`). After an e2e failure, rerun only the failed tests. The full suite runs once, in the round 3 review.
6. **Screenshots:** a visual task takes screenshots of the parts it changed at 1280 and 390 wide into `/screenshots/round3/<task>/` (gitignored), from the production build served with `npx next start -p 3210` (after `npm run build`; check the port is free first), and checks them against DESIGN-GUIDE and the notes before ticking. Stop the server it started, by PID, when done.
7. **Ticking:** in the same commit as the work, tick the task in `IMPLEMENTATION_PLAN.md` and `LANES.md`, set its F-rows in the feedback file's summary table to `done (task, date)`, and add one line under "Built" at the end of this file. Update `DESIGN-GUIDE.md` when a component's rules change, and the page's Markdown notes when a section goes.
8. **Commit and push** to `staging` as `CLAUDE.md` says. One task per session.

---

## R12 Quick fixes · Sonnet 5.5 High

**Notes:** F47, F48, F73, F80, F83. No decisions needed.

- **F80 phone field** (`src/lib/leads/schema.ts`, `whatsapp: optionalLine`; used by the Contact and Enhance forms): when filled, accept only digits, spaces, `+`, `-`, `(`, `)`, with 8–15 digits. Error message in the forms' existing style, wording in the content or messages file (e.g. "Please enter a valid phone number, digits only."). Input `type="tel"`, `inputMode="tel"`, `autoComplete="tel"`. Unit tests for valid and invalid numbers, server and client side. The Enhance form's existing e2e test fills a valid number; add one invalid case.
- **F73** Enhance "Up next" label → "What the gap looks like, daily" (`content/en/enhance.md` §2 and `src/content/en/enhance.ts`).
- **F48** Home "Where we help": remove the product line under each card (`hireToReward` in `src/content/en/home.ts`, `HireToReward.tsx`).
- **F47** Home "Where we help": shorten the auto-advance interval so the first switch happens within about 4 seconds of the section coming into view, and keep any progress indicator in step. Reduced motion: no auto-advance (as now, if it already does that).
- **F83** Client story: "← All client stories" link above the story's label, to `/clients` (story template under `src/components`, wording in the stories content).

**Checks:** smoke, `enhance.spec.ts`, `contact.spec.ts`, `home.spec.ts`, `story.spec.ts`.

## R13a Shared closing and Recognition removal · Sonnet 5.5 High

**Notes:** F59 (D3), F58 and F92 (D2).

- **F59:** the default closing section (`content/en/global.md` "Closing section", its component, and Enhance's own closing): keep the "Chat on WhatsApp" button; the contact bar under it shows "Contact us" and the email, without the WhatsApp number. The floating WhatsApp button stays. Check every page using the closing.
- **F58, F92:** remove the Recognition section from Home and About (content modules, Markdown, components no longer used, `showUgmPartnership` only if nothing else reads it). The timeline on About keeps the same facts. Fix About's background sequence so neighbouring sections still alternate as DESIGN-GUIDE says (the team saw a clash). Remove the recognition logo item from `NEEDED-FROM-YOU.md` (this folder) if it's still there.

**Checks:** smoke, `home.spec.ts`, `about.spec.ts`, `closing-footer.spec.ts`.

## R13b Rotating industries and timeline dots · Opus 5.5 High

**Notes:** F44 and F81 (D4), F77 and F91 (D5). One component each, used on every page that has it.

- **Industries (F44, F81):** Home's trusted-by line becomes two lines: "Trusted by **40+ brands** across Indonesia." then the industries, one at a time, sliding in from the right and out to the left on a loop (about 2.5 s each). Same component on Clients §3. Pauses on hover and focus; with `prefers-reduced-motion` it shows the full list as a static line. Screen readers get the full list once (the moving word is `aria-hidden`). No layout shift as words change length. All industries render in the HTML without JavaScript.
- **Timeline dots (F77, F91):** Enhance "Supported beyond the platform" and About "Our journey": every dot looks the same; when the section scrolls into view they fill in one after another (accent colour), so it reads as a process. No orange end dot. Reduced motion or no JavaScript: all dots shown filled. Tokens only.
- Update `DESIGN-GUIDE.md` for both patterns.

**Checks:** smoke, `home.spec.ts`, `clients.spec.ts`, `enhance.spec.ts`, `about.spec.ts`. Screenshots at 1280 and 390, including the reduced-motion state.

## R14a Home structure and wording · Opus 5.5 High

**Notes:** F43, F45 (D6), F46, F49, F50, F51, F52 and F53 (D1).

- **D1:** remove the three spotlights (§6 GBA, §7 Enhance, §8 Potentia band) from Home: content, Markdown, components and images used nowhere else (keep image files other pages use; check `images.ts`). Home's SEO description stays accurate.
- **F43:** the hero's journey window: "Plays DEUS Discover" → "Plays an assessment game"; "Q1 2026 appraisal, DEUS Enhance" → "Q1 2026 appraisal".
- **F45 (D6):** heading "Most people decisions still run on thin, scattered evidence."; paragraphs unchanged.
- **F46:** "One partner, from first assessment to final bonus."; **F49:** "Three solutions, one idea: better evidence about people." Both must fit on two lines at 1280 and 390; shorten further if not.
- **F50:** the three solution cards are the same size and all three are in view together on a 1280×800 screen once the section heading is at the top. On a phone they stack; that's fine.
- **F51:** GBA card text → "Short online games that show how a candidate thinks, works and makes decisions. Results are scored for you, ready the moment they finish."

**Checks:** smoke, `home.spec.ts`. Screenshots of the whole page at both widths; record the new page length in screens in the "Built" note.

## R14b Home "Why DEUS" rewrite · Opus 5.5 High

**Notes:** F54–F57.

- Rewrite the four points so each holds for every DEUS product (assessments, Enhance, Potentia), per the team's notes: (1) why we're more than gut feel: data-driven, structured, comparable results, not a list of theories per product; (2) "Built for Indonesia", widened beyond norming, or replaced by a point that truly covers all products; (3) "Ready for volume": bulk upload, automatic analysis and reports, many sites at once; (4) "A partner, not just a vendor": how we work with clients across products.
- **Only claims already in the sources** (`Creating DEUS HCS Website.md`, the content files, `ENHANCE-CONTENT.md`, `WEBSITE-PLAN.md`). Where a point needs an Enhance or Potentia fact that isn't there (e.g. bulk employee import in Enhance), write it without that claim and list the fact in `NEEDED-FROM-YOU.md` (this folder) group 2 with the exact sentence it would allow.
- Four titles of two to five words, one or two sentences each, VOICE.md rules.

**Checks:** smoke, `home.spec.ts` (wording assertions only).

## R16a Product-page hero and the Enhance appraisal-to-pay animation · Opus 5.5 High

**Notes:** F71, F72 (D10).

- **F71:** `src/components/blocks/ProductHero.tsx` (GBA and Enhance) gets a layout clearly different from the Home hero: smaller headline than Home's, the product name prominent as the eyebrow, and the product picture as the main element. Design it from DESIGN-GUIDE tokens and existing pieces; compare side by side with Home in screenshots. Update DESIGN-GUIDE's hero section.
- **F72:** Enhance's hero picture becomes a short looping sequence that tells "review to pay decision": KPI → appraisal score → calibration → bonus band, each frame a real Enhance screen (from `src/content/images.ts`) or, where the screen is missing, the existing placeholder. Coded (CSS or a small client component), not a video. Pauses on hover; reduced motion shows one still frame (the bonus screen, or its placeholder); without JavaScript the first frame shows. Labels for each step come from the content module.
- Make sure `NEEDED-FROM-YOU.md` (this folder) group 1 names exactly which screens the sequence still lacks.

**Checks:** smoke, `enhance.spec.ts`, `gba.spec.ts`. Screenshots of both heroes and Home's hero at both widths.

## R16b Enhance page body · Opus 5.5 High

**Notes:** F74, F75 and F76 (D11), F78 (D12), F79 (D13).

- **F74, F75:** §4 "The solution" stops being the scroll-linked cards and uses the same switcher as Home's "Where we help" (reuse that component if it fits; otherwise share its behaviour). Six steps: the five there are now plus **6. Turn results into decisions** ("Connect outcomes to incentives, bonuses, salary, and development."), whose picture is the bonus cycle screen (or its placeholder). With JavaScript off, all six steps and their text are visible (Review focus 5 in `IMPLEMENTATION_PLAN.md`; update its e2e test to six steps).
- **F76:** remove §5 "From rating to reward". Its four bonus and salary descriptions are not lost: put the gist into step 6's text if it fits in two sentences; otherwise drop them (they were never approved deck copy).
- **F78:** remove §9 "Is it a fit?" and any links to it.
- **F79:** §11 "Next step" keeps its heading and two steps, as text only. The booking form, "Chat on WhatsApp" and email move together into one contact block at the bottom of the page, which replaces Enhance's closing buttons (the closing headline "Make performance visible. Make decisions clearer." stays above it). "Prefer to talk first?" goes. Every "Book a call" link on the page now points to the form's new place. The form keeps its fields, validation and success message; its e2e tests must pass unchanged apart from position.
- `ENHANCE-CONTENT.md` stays untouched; `ENHANCE-PAGE-SPEC.md` and `content/en/enhance.md` get notes for what moved or went.

**Checks:** smoke, `enhance.spec.ts`. Screenshots of the whole page at both widths; record the new length.

## R15a GBA headings, module titles and module arrows · Opus 5.5 High

**Notes:** F60–F69 (D8, D9 provisional).

- **F60–F63, F69:** the headings from the D9 table in the feedback file. Before writing, read Agate's page (https://agatelevelup.com/game-based-assessment/) for the keywords it leads with; where a keyword fits a remaining heading naturally, use it, and list the extra changes in the feedback file's GBA section for the owner. Update the page's SEO title and description to carry "game-based assessment" and "talent assessment".
- **F64–F67:** each module tab gets a large title ("DEUS Discover: Personality Test", "Cognitive Assessment", "Neuroscience Assessment", "Simulation Assessment") and a smaller sub-line from the table. Remove "Results that read like they were written for your company, because they are." and the Cognitive and Neuroscience science lines (D8).
- **D8, keep the science meaningful:** the Science section's three foundation cards stay; the neuroscience card takes over the removed line's content (risk-taking, motivation, effort and emotion recognition, read from what people do rather than what they say), and the cognitive card already names processing speed, memory, reasoning and attention. Check that nothing the removed lines said is now missing from the page.
- **F68:** a "next module" arrow button at the right of the module pill (and swipe left/right on the module panel on touch screens) that moves to the next module, wrapping from Simulation to Personality. Keyboard accessible, with a label naming the next module. The "Next module" link at the end of each panel stays. Tab and hash behaviour from R11 must keep working.
- Update the menu (`nav.ts`) labels only if they repeat the old module names in a way that now conflicts; keep the anchors.

**Checks:** smoke, `gba.spec.ts` (and `assessments.spec.ts` if it asserts module headings). Screenshots of the hero, the modules block (each tab) and the science section at both widths.

## R15b GBA lower sections · Opus 5.5 High

**Notes:** F70 (D7).

- **"Behind the results":** one section with tabs, Platform · Science · Before and after, the same tab pattern R11 used (`SegmentedTabs` or the module pill's component). Each tab holds its current section's content in full; trim only the section headings that become tab titles. The `#science` anchor (and the `/science` redirect) opens the Science tab.
- **How it works + Getting started:** one short section, "How it works": the four steps plus the "start with a free trial or pilot" offer from Getting started, with its button. Place it directly above Pricing.
- New order from Use cases down: Use cases → Reports → How it works → Pricing → Behind the results → Client stories link → FAQ → closing. If that order reads badly in screenshots, adjust it and log why; the aim is Pricing as high as it sensibly goes.
- Record the new page length (screens at 1280 and 390, measured as in `postpushrevisions2.0/gba-page-length.md`) and Pricing's new position in the "Built" note.

**Checks:** smoke, `gba.spec.ts`. Screenshots of the whole page at both widths.

## R17 Clients and About · Opus 5.5 High

**Notes:** F84 (D15), F85, F86, F87, F88, F89 (D14), F90, F82.

- **Client story (F84–F86):** eyebrow "Client story" only, with the product in the at-a-glance box; headline "1,000+ trainee candidates across 30+ provinces, assessed with results in one day." (two lines max at 1280 and 390); closing sub-line "We'll show you how a nationwide intake runs on DEUS, from the first upload to the final ranked list." The anonymised and named versions both follow (check `flags.ts`). Calvin's story template gets the same eyebrow change.
- **About (F87–F90):** the hero and story sentences from the feedback file. D14: one mission section, the mission in the large statement style and the vision under it; the separate "Vision and mission" section goes (official wording unchanged). F90: the six values become a plain list on the page background (letter, value, one line), no card boxes or hover look; update DESIGN-GUIDE.
- **F82:** no new story is written without the material. Make sure `NEEDED-FROM-YOU.md` (this folder) group 4 has it, and leave the Clients cards as they are.

**Checks:** smoke, `story.spec.ts`, `clients.spec.ts`, `about.spec.ts`. Screenshots of About and the story at both widths.

## R18 Privacy rewrite · Opus 5.5 Medium

**Notes:** F93–F102 (D16, D17). Text in `src/content/en/privacy.ts`.

- **F93:** plain words throughout: short sentences, every technical term replaced by what it does. Keep every fact the page states now; `tests/unit/privacy-page.test.tsx` checks every stored field is still described.
- **F94 (D16):** name the law once ("the applicable laws and regulations, including Indonesia's Personal Data Protection Law (Law No. 27 of 2022)"), then "the applicable laws" after that.
- **F96:** drop the small "Privacy" label; the title stays "Privacy policy", matching the footer link.
- **F97–F99:** the wording in the feedback file's Privacy section (forms plus a few technical details; the coded internet address; the language cookie; browsing stores nothing that identifies you).
- **F100, F101:** add WhatsApp to "Who sees your data" ("WhatsApp, run by Meta, if you message us there"). Name the email provider only if `NEEDED-FROM-YOU.md` (this folder) shows it's been answered; otherwise keep "our email provider".
- **F102 (D17):** two years, with the reason ("hiring and appraisal cycles run once a year, so many companies come back a year later").
- **F95:** the address shows through `showAddress` once Q9 is answered; leave the flag as it is.
- Update `updated` to the build date. Make sure `NEEDED-FROM-YOU.md` (this folder) group 6 says the rewritten page is ready for Ko Will.

**Checks:** smoke, `privacy.spec.ts`, the privacy unit test.

## Round 3 review · Opus 5.5 High

The phase review for round 3 (never skipped). In order:

1. Go through every F-row in the feedback file's summary table: built as decided, or listed as waiting in `NEEDED-FROM-YOU.md` (this folder). Read "Decided during build" and check each call is sensible.
2. Screenshots of every changed page at 1280 and 390 (Home, GBA, Enhance, Clients, the story, About, Privacy, Contact), checked against the notes, `DESIGN-GUIDE.md` and each other (the product heroes must not look like Home's).
3. Fix what's wrong. Anything too big to fix here becomes a fix task line in `IMPLEMENTATION_PLAN.md` under "Team feedback round 3" (same format, model and effort picked from the global table) and a row in `LANES.md`, or is dropped with a reason. None stays only in the review notes.
4. Then the full checks once: typecheck, lint, build, unit tests and the full Playwright suite (`npm run test:e2e`), on a free machine. Rerun only failed tests after a fix.
5. Write the result under "Review" below: what was checked, what was fixed, what's left and where it went. Tell the owner the round is ready for a release and what's still waiting on them in `NEEDED-FROM-YOU.md` (this folder).

---

## Built

*(Each task adds one line here when it's done: task, date, commit, anything the owner should look at.)*

- **R12** (2026-10-22): F47 tabs switch after 3.5s (was 7s; `--tab-dwell`, DESIGN-GUIDE follows), F48 product line off Home's tabs, F73 "Up next" names and jumps to "What the gap looks like, daily", F80 phone field checked (8–15 digits; error wording for the owner: "Please enter a valid phone number, digits only."), F83 "← All client stories" on the story page. The e2e tests that write leads (Enhance form, including the new phone case) can't run on the Oracle checkout, which has no `.env.test`; unit tests cover them.
- **R13a** (2026-10-22): F59 the closing's contact bar is "Contact us" + the email only (the "Chat on WhatsApp" button above it stays; floating button unchanged; `Closing.contactWhatsapp`/`contactEmail` messages removed). F58/F92 Recognition is gone from Home and About (components `Recognition`, `AboutRecognition`, content, types, tests, `showUgmPartnership`); About's leadership section is Cloud so the background alternates once it's on. Nothing waiting on the owner: the recognition logo item was already off `NEEDED-FROM-YOU.md`. Checks: typecheck, lint, build, unit 295 passed; e2e smoke, home, about, closing-footer passed.
- **R13b** (2026-10-22): F44/F81 Home's line is "Trusted by **40+ brands** across Indonesia." with the six industries under it one at a time (2.5s each, in from the right, out to the left, CSS only, hover/focus pauses, still row with reduced motion); Clients §3 uses the same `IndustryTicker`. F77/F91 the About and Enhance timelines have no ember end dot: all dots alike, filling azure one after another as the timeline comes into view (`SequenceOnView`, `--dur-fill`); filled without JS or with reduced motion. DESIGN-GUIDE §1, §7.12, §7.15, §9 follow. For the owner to look at: screenshots in `/screenshots/round3/R13b/`. Checks: typecheck, lint, build, unit 297 passed; e2e home and about passed (clients, enhance and smoke specs left to the round 3 review, see "Decided during build").
- **R14a** (2026-10-22): D1 the GBA, Enhance and Potentia spotlights are off Home (components, content, types, tests; Why DEUS is White now so the backgrounds still alternate). F43 the hero window says "Plays an assessment game" and "Q1 2026 appraisal". F45 "Most people decisions still run on thin, scattered evidence." F46 and F49 shortened to fit two lines at 390: "One partner, from assessment to bonus." and "Three solutions, one idea: better evidence." (see "Decided during build"). F50 three equal cards in one row, all in view at 1280×800 under the heading (new e2e check). F51 the GBA card's plain-words text. Page length: 7.7 screens at 1280×800 (was about 13), 10.4 at 390×844. For the owner to look at: screenshots in `/screenshots/round3/R14a/`. Checks: typecheck, lint, build, unit 297 passed; e2e smoke and home passed (36).
- **R14b** (2026-10-22): F54–F57 Why DEUS's four points now hold for every product: "Evidence over gut feel" (games, KPIs and minigames scored one structured way), "Fits what you already use" (replaces "Built for Indonesia"), "Ready for volume" (one spreadsheet, every plant in one place, a whole class on one dashboard) and "A partner, not just a vendor" (start small, then KPI design, training, cycle reviews, parent consultations). Facts only from the sources; the three that would let it say more are in `NEEDED-FROM-YOU.md` group 2. For the owner to look at: the wording, and screenshots in `/screenshots/round3/R14b/`. Checks: typecheck, lint, build, unit 298 passed; e2e smoke and home passed (36).
- **R16a** (2026-10-22): F71 GBA and Enhance share a new product hero: two columns, copy left-aligned with the product name as a 24px azure lead line and the H1 at H2 size (Home keeps its centred display headline), the picture in a rounded sky panel on the right; one column on a phone. F72 Enhance's picture is a CSS loop "From review to pay decision": KPIs → Appraisal → Calibration → Bonus, 3.5s each with an ember step bar, paused on hover or focus, KPIs without script, the bonus screen still with reduced motion. Only KPI setup is a placeholder (`missingScreens.enhanceKpiSetup`, in `NEEDED-FROM-YOU.md` group 1). DESIGN-GUIDE §7.12 and §9.3–9.4 follow. For the owner to look at: screenshots in `/screenshots/round3/R16a/` (both heroes, each loop step, Home for comparison). Checks: typecheck, lint, build, unit 303 passed; e2e enhance and gba 63 passed, 5 failed (the form tests that save a lead: no `.env.test` here); smoke left to the round 3 review.

## Review

*(The round 3 review writes its result here.)*
