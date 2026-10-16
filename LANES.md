# Lanes: who builds what, in which terminal

Three terminals build in parallel, one lane each. Every lane has its own folder and branch, and works through its own list below, top to bottom. `IMPLEMENTATION_PLAN.md` holds the full task details. This file says **which lane does which task, with which model and effort**. The git rules (commit, push, deliver to `staging`, release) are in `CLAUDE.md`.

| Lane | Folder (open a terminal here, then run `claude`) | Branch | Builds |
|---|---|---|---|
| **P1** | `~/projects/deushcs-website-p1` | `phase-1-enhance` | Phase 1 (Enhance + Contact); after launch, Phase 6 setup, its own translations and the Phase 6 finish |
| **P2** | `~/projects/deushcs-website-p2` | `phase-2-home` | Phase 2 (Home, About, Solutions), then 4.3 and 4.4 from Phase 4; after launch, translations of its own pages |
| **P3** | `~/projects/deushcs-website-p3` | `phase-3-assessments` | Phase 3 (Assessments), then Phase 4 (Clients: 4.1, 4.2, 4.5 and the review); after launch, translations of its own pages |
| **Main** | `~/projects/deushcs-website` | `staging` | The plan review, Phase 7 (launch) and releases |

## How a lane works through its list

1. **Find the next task:** the first unticked row in your lane's list (in Phase 6, the first unticked cell in your column of the step grid). Do the tasks in order. Skip a task only when its "Needs" column says it's waiting for something that isn't on `staging` yet, or for the owner. Then do the next task that isn't waiting, and say so in the report.
2. **Check the model and effort** against the row. If they differ, say so and suggest the switch before starting, for example `/model opus` and `/effort high`.
3. **Do that one task**, following its full description in `IMPLEMENTATION_PLAN.md`.
4. **Run the checks** in `CLAUDE.md`.
5. **Tick the task in both files, in the same commit:** `[x]` in `IMPLEMENTATION_PLAN.md`, with the one-line note the plan asks for, and `[x]` in this file's row.
6. **Commit and push** to your lane branch, then **deliver the task to `staging`** ("Delivering a lane's work to `staging`" in `CLAUDE.md`).
7. **Stop and report:** what was done, the commit, that it's on `staging`, and the **next row of your list with its model and effort**. Wait for the owner.

The owner can say "carry on" to run several tasks in one go. Even then, stop when the next row's model or effort is different, at a phase review, and at anything that needs the owner.

**Stay in your lane.** Only do the tasks in your own list. When a task needs something that belongs to another lane (a component, a page, a shared string), wait for it to reach `staging` and merge it in. Don't build it yourself. Files every lane touches (`IMPLEMENTATION_PLAN.md`, this file, `types.ts`, `registry.ts`, `messages/*.json`) will sometimes conflict on merge: keep both sides.

**Model shorthand:** "Opus 5.5 · High" means `/model opus` with `/effort high`. Sonnet is `/model sonnet` and Haiku is `/model haiku`; effort is `low`, `medium`, `high`, `xhigh` or `max`.

---

## P1: Phase 1, Enhance + Contact (starts at 1.2)

| Done | Task | Model | Effort | Needs |
|---|---|---|---|---|
| [x] | 1.2 Lead pipeline | Opus 5.5 | High | Nothing (`neondb_test` and the `leads` table exist since 2026-10-14) |
| [x] | 1.3 Resend on `notify.deushcs.com` | Sonnet 5.5 | High | The owner adds the DNS records at Hostinger (subdomain only) |
| [x] | 1.4 `LeadForm` | Sonnet 5.5 | High | 1.2 |
| [x] | 1.5 `ScrollSyncedScreen` | Opus 5.5 | High | Nothing |
| [x] | 1.6 Enhance page | Opus 5.5 | Medium | 1.4, 1.5 |
| [x] | 1.7 Contact page, plus the calibration build on Haiku 5.5 Max | Sonnet 5.5 | High | 1.4. The calibration build goes on a branch called `phase-1-calibration` (so Vercel skips it). It is never delivered to `staging`. |
| [x] | 1.8 Privacy policy draft | Opus 5.5 | Medium | 1.2 (the text must match what the code stores) |
| [x] | 1.9 Phase 1 e2e | Sonnet 5.5 | High | 1.2 to 1.8 |
| [x] | Phase 1 review (end of phase) | Opus 5.5 | High | 1.9. Then the owner signs Phase 1 off. |

## P2: Phase 2, Home + About + Solutions (starts at 2.2; 2.1 is done)

| Done | Task | Model | Effort | Needs |
|---|---|---|---|---|
| [x] | 2.2 Home: hero and "From hire to reward" | Opus 5.5 | High | Nothing |
| [x] | 2.3 Home: remaining sections | Sonnet 5.5 | High | 2.2 |
| [x] | 2.4 About | Sonnet 5.5 | High | Nothing |
| [x] | 2.5 Solutions overview | Haiku 5.5 | Max | Nothing |
| [x] | 2.6 "Coming soon" panel | Haiku 5.5 | Max | Placeholders only for routes that have no real page on `staging` yet. P1 and P3 are building Enhance, Contact, GBA, Discover, Next Chapter, Science and Clients. When a real page arrives on a merge, the real page wins. |
| [x] | 2.7 Phase 2 e2e | Sonnet 5.5 | High | 2.2 to 2.6 |
| [x] | Phase 2 review (end of phase) | Opus 5.5 | High | 2.7. Then the owner signs Phase 2 off. *(Signed off 2026-10-15.)* |
| [x] | 4.3 Clients hub *(moved from P3 on 2026-10-15)* | Haiku 5.5 | Max | 4.1 (on `staging`). Replaces the 2.6 placeholder at `/clients`. The story cards link to the story pages P3 builds in 4.2; until 4.2 reaches `staging` those links 404, which is fine there. |
| [x] | 4.4 Link cards on Home and GBA *(moved from P3 on 2026-10-15)* | Haiku 5.5 | High | 4.1 (on `staging`). GBA's `clientStory` is ready in its content module (see the comment in its `page.tsx`); this task may edit the GBA page even though P3 built it. Same note as 4.3 about links before 4.2 lands. |
| [x] | Hero widths on About and Solutions *(from the Phase 1 review, owner's decision 2026-10-15)*: H1 `max-w-[11em]` (not 14em) and lede `max-w-[34em]`, per guide §3.3, as Contact now has; check both at 1280 and 390 | Haiku 5.5 | Max | Nothing. No plan task number; tick it here only. |

## P3: Phase 3, Assessments (starts at 3.3), then Phase 4, Clients

4.3 and 4.4 moved to P2 on 2026-10-15, so they run alongside 4.2. P3 does 4.2, then 4.5 once P2's two tasks are on `staging`.

| Done | Task | Model | Effort | Needs |
|---|---|---|---|---|
| [x] | 3.3 GBA page | Sonnet 5.5 | High | Nothing |
| [x] | 3.4 Discover page | Haiku 5.5 | Max | 3.3 (it copies the GBA pattern) |
| [x] | 3.5 Next Chapter page | Sonnet 5.5 | High | Nothing |
| [x] | 3.6 Science page | Haiku 5.5 | Max | Nothing |
| [x] | 3.7 Phase 3 e2e + screenshots | Sonnet 5.5 | High | 3.3 to 3.6 |
| [x] | Phase 3 review (end of phase) | Opus 5.5 | High | 3.7. Then the owner signs Phase 3 off. *(Signed off 2026-10-15.)* |
| [x] | 4.1 Clients content modules | Sonnet 5.5 | High | Nothing |
| [x] | 4.2 Story template | Sonnet 5.5 | High | 4.1 |
| [x] | 4.5 Phase 4 e2e | Sonnet 5.5 | High | 4.1 to 4.4 on `staging` (4.3 and 4.4 come from P2) |
| [x] | Phase 4 review (end of phase) | Opus 5.5 | High | 4.5. Then the owner signs Phase 4 off. *(Done 2026-10-15, 4.4 included.)* |

## Main folder: feedback round 1 (before Phase 7)

The owner's review of the live site (`postpushrevisions1.1/feedback-2026-10-16.md`). These run in the main folder, on `staging`, one at a time, because most of them touch Home and shared components. Full details are in `IMPLEMENTATION_PLAN.md`, "Feedback round 1". Skip a row whose F-numbers aren't all approved yet and take the next one.

| Done | Task | Model | Effort | Needs |
|---|---|---|---|---|
| [ ] | R1 Solutions menu (F1) | Sonnet 5.5 | High | Nothing. F1 approved 2026-10-16 |
| [ ] | R2 Product structure (F9, F10) | Sonnet 5.5 | High | F9 approved; waiting on F10; R1 on `staging` (same menu data) |
| [ ] | R3 Wording pass (F2, F3, F13–F17, F20, F23, F30) | Sonnet 5.5 | High | All its F-numbers approved (F2 and F3 are) |
| [ ] | R4 Removals and the UGM switch (F5, F6, F8, F18) | Haiku 5.5 | Max | F5, F6, F8 approved; waiting on F18 |
| [ ] | R5 Label style and pill replacements (F4, F22, F25) | Opus 5.5 | High | F4 decided (option B: lines both sides, small capitals); waiting on F22, F25 |
| [ ] | R6 Science into the product pages (F28) | Opus 5.5 | Medium | F28 approved |
| [ ] | R7 Recognition and news (F7, F29) | Opus 5.5 | High | Logo files, photo and article list from the owner |
| [ ] | Round 1 review | Opus 5.5 | High | The R-tasks the owner wants in the next release |

## Main folder: plan review and Phase 7, launch

Phase 7 starts once Phases 1 to 4 are on `staging` and signed off. The site launches in English only; Phase 6 (Indonesian) comes after launch. Phase 7 runs in the main folder, on `staging`, because it touches every page.

| Done | Task | Model | Effort | Needs |
|---|---|---|---|---|
| [ ] | S0.2 Plan review | Opus 5.5 | Medium | Can run any time; the sooner the better |
| [ ] | 7.1 SEO | Sonnet 5.5 | High | Phases 1 to 4 signed off |
| [ ] | 7.2 Open Graph images | Sonnet 5.5 | High | 7.1 |
| [ ] | 7.3 Analytics | Haiku 5.5 | Max | Phases 1 to 4 signed off |
| [ ] | 7.4 Release checks | Sonnet 5.5 | High | 7.1 to 7.3. Fixes go back to the model of their kind of task. |
| [ ] | 7.5 Domain cutover | Opus 5.5 | High | 7.4, and the owner present (DNS at Hostinger, email at stake) |

## Phase 6, second language: step grid (after launch)

**On hold.** On 2026-10-15 the owner moved all Indonesian work to after the English site is finished and launched (Phase 7). No lane starts a Phase 6 cell until the owner says to start Phase 6. Until then every page ships in English only: the language switch shows Indonesian greyed out, and `/id/…` addresses redirect to English.

6.1 sets the glossary and the shared Indonesian strings, so it comes first. Each lane then translates its own pages, once those pages are on `staging`. A native reviewer approves every page before it goes live.

**How to read the grid:** each column is one terminal, each row is a step, and the steps run top to bottom. Your lane works down its own column. A cell can start once everything in its **Needs** note (below the grid) is on `staging` and merged into your lane. "Wait" means that terminal has nothing to do in that step. Tick a cell by changing its `[ ]` to `[x]`.

| Step | P1 terminal | P2 terminal | P3 terminal |
|---|---|---|---|
| **1** | [ ] **6.1** Indonesian: global strings + Enhance · Sonnet 5.5 · High | Wait for 6.1 | [ ] **6.3** English Calvin story · Sonnet 5.5 · High |
| **2** | [ ] **6.2** Indonesian: Contact, Privacy · Sonnet 5.5 · High | [ ] **6.2** Indonesian: Home, Solutions · Sonnet 5.5 · High | [ ] **6.2** Indonesian: GBA, Discover, Next Chapter, Science · Sonnet 5.5 · High |
| **3** | Wait for every 6.2 cell | [ ] **6.2** Indonesian: About (the Haiku trial) · Haiku 5.5 · Max | [ ] **6.2** Indonesian: Clients, Telkom story · Sonnet 5.5 · High |
| **4** | [ ] **6.4** Locale SEO logic · Opus 5.5 · Medium | Done with Phase 6 | Done with Phase 6 |
| **5** | [ ] **6.5** Phase 6 e2e + screenshots, both locales · Sonnet 5.5 · High | | |
| **6** | [ ] **Phase 6 review** (end of phase) · Opus 5.5 · High | | |

**Needs:**
- **Every cell:** the owner has said to start Phase 6 (after launch).
- **6.1** (P1, step 1): the Phase 1 review is done.
- **6.3** (P3, step 1): Phase 4 is on `staging`. It doesn't need 6.1, which is why it runs alongside it.
- **6.2 Contact, Privacy** (P1, step 2): 6.1.
- **6.2 Home, Solutions** (P2, step 2): 6.1, and the Phase 2 review on `staging`.
- **6.2 GBA, Discover, Next Chapter, Science** (P3, step 2): 6.1, and the Phase 3 review on `staging`.
- **6.2 About** (P2, step 3): two pages already translated on Sonnet (Home and Solutions from step 2 count). If the reviewer finds no extra issues, later translations may use Haiku 5.5 Max too.
- **6.2 Clients, Telkom story** (P3, step 3): 6.1, and the Phase 4 review on `staging`.
- **6.4** (P1, step 4): every 6.2 cell, in all three columns, is on `staging`.
- **6.5** (P1, step 5): 6.4.
- **Phase 6 review** (P1, step 6): 6.5. Then the owner signs Phase 6 off.
