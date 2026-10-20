# To do next

**Written:** 2026-10-15. **Where things stand:** Phases 0 to 4 are built, and were released to `main` on 2026-10-15 (`f61ebdc`, live at https://deushcs-website.vercel.app/, still `noindex`). Phase 7 (launch) is next; Phase 6 (Indonesian) waits until after launch. Every lane has delivered its work to `staging`.

This list is the owner's running order. The details for each item are below the table. Tick an item here when it's done. Items that become real build tasks also go into `IMPLEMENTATION_PLAN.md` (and `LANES.md`) first, because the plan is still what the build follows.

| # | Item | Who | Model + effort | Waiting on | When |
|---|---|---|---|---|---|
| 1 | [Release `staging` to `main`](#1-release-staging-to-main) | Done 2026-10-15 | Sonnet 5.5 High (future releases) | Nothing | Done |
| 2 | [Check the live site and give feedback](#2-check-the-live-site-and-give-feedback) | Owner, then the team; Claude collects | Opus 5.5 Medium | 1 | Now (owner's round in `postpushrevisions1.1/feedback-2026-10-16.md`) |
| 3 | [Client and partner logos](#3-client-and-partner-logos) | Owner sends, Claude builds | Sonnet 5.5 High | Q8 permissions, logo files | Before launch |
| 4 | [Pictures: add and revise](#4-pictures-add-and-revise) | Owner adds and reviews pictures, Claude wires them in | Haiku 5.5 Max | 3; picture notes from 2 | Before launch |
| 5 | [Re-revise the content](#5-re-revise-the-content) | Owner decides, Claude edits | Opus 5.5 Medium | 2 | Before launch |
| 6 | [Case studies](#6-case-studies) | Owner picks + gets permission, Claude writes | Opus 5.5 Medium, then Haiku 5.5 Max | Client permissions | Before launch (first 2–3), then ongoing |
| 7 | [Phase 7: launch](#7-phase-7-launch) | Claude, owner for DNS | Per task (below) | 3–6 for 7.4 | Before launch |
| 8 | [QA steps](#8-qa-steps) | Claude writes and runs, owner tests on a phone | Sonnet 5.5 High | Nothing to write it; 7 to run it | With 7.4, then every release |
| 9 | [SEO and GEO](#9-seo-and-geo-getting-found) | Claude builds, owner sets up accounts | Sonnet 5.5 High | 7.5 for anything that needs indexing | Launch week, then monthly |
| 10 | [Blog content and marketing plan](#10-blog-content-and-marketing-plan) | Claude drafts, owner approves | Opus 5.5 Medium | Nothing | After 7.1 |
| 11 | [Blog page](#11-blog-page) | Claude | Opus 5.5 High (design), Sonnet 5.5 High (build) | 10 | After launch |
| 12 | [Starter blog posts](#12-starter-blog-posts) | Claude drafts, owner reviews | Opus 5.5 Medium | 10, 11 | After launch |
| 13 | [Indonesian pages (Phase 6)](#13-indonesian-pages-phase-6) | Claude translates, native reviewer approves | Sonnet 5.5 High | Reviewer named (Q14) | After launch |

---

## 1. Release `staging` to `main`

- [x] **Released** on 2026-10-15: `main` is at `f61ebdc` and Vercel's production deployment is Ready.
- [x] **`LEAD_IP_SALT`** added to Vercel Production on 2026-10-16 and production redeployed, so the forms' spam limit holds across server instances.
- **Every later release:** the owner says "release" (or "ship it") and Claude follows "Releasing to production" in `CLAUDE.md`:
  - shows what goes live (`git log origin/main..origin/staging`, in plain words) and the Waiting for the owner list
  - runs typecheck, lint, build, unit tests and the **full** Playwright suite; any code failure stops the release
  - asks before any production migration (`npm run db:migrate`), and releases only after it has run
  - fast-forwards `main` to `staging`, pushes, checks the Vercel deployment and the live URL
- The site stays `noindex` until Task 7.5, so releasing now doesn't affect Google. It just lets the owner review the real thing.
- **Done when:** https://deushcs-website.vercel.app/ shows the Phase 1–4 pages and the Enhance and Contact forms deliver an email to admin@deushcs.com.

## 2. Check the live site and give feedback

- [ ] **Owner:** go through every page on a phone and a laptop. The pages: Home, Solutions, Game-Based Assessment, Discover, Next Chapter, Science, Enhance, Clients, the Telkom story (anonymised), About, Contact, Privacy, a 404.
- [ ] **Owner:** send one test lead through Enhance and one through Contact, and check that both emails arrive.
- [ ] **Owner:** write feedback anywhere convenient (a message, a list, screenshots). For each point: page, what's wrong, what it should be.
- [x] **Claude:** sort the owner's first round into `postpushrevisions1.1/feedback-2026-10-16.md` (F1–F30, each with a response and proposal; 2026-10-16). Wording goes to item 5; picture notes go to item 4; bugs get fixed one at a time; new ideas go to the owner first (no features beyond the plans without asking).
- [ ] **Owner:** answer the "Decisions needed" list at the end of `postpushrevisions1.1/feedback-2026-10-16.md`; the tasks are already in `IMPLEMENTATION_PLAN.md` ("Feedback round 1", R1 to R7) and `LANES.md`, and each one is built once its F-items are approved (R1, the menu, is ready now).
- [ ] **Team:** second round of feedback, added to the same file under "Team feedback".
- [ ] **Owner:** sign off Phase 4 (on the Waiting for the owner list; it blocks Phase 7).

## 3. Client and partner logos

The logo wall is built but hidden (`showLogoWall` in `src/content/flags.ts`) until Q8 is answered. Partners named in the source document: Universitas Gadjah Mada (scientific partner, Potentia) and Level Up powered by Agate (product partner, Potentia). The owner asked on 2026-10-16 to remove UGM from Home and About (feedback F8).

- [ ] **Owner:** list the clients and partners whose logos may be shown, with written permission where a contract needs it. Claude never adds a client that isn't on this list.
- [ ] **Owner:** send each logo as **SVG** (best) or a PNG at least 400px wide on a transparent background, named after the company.
- [ ] **Owner:** decide where partners go: a separate "Partners" row (on About or Science), or mixed into the client wall. Suggested: separate, because a partner isn't a buyer.
- [ ] **Claude:** add the logos to `public/assets/logos/`, give every logo one treatment (same height box, single-colour or greyscale per the design guide, colour on hover only if the guide allows), with the company name as alt text; add the list to a content module; turn on `showLogoWall`; screenshot at 390 and 1280.
- [ ] **Claude:** update `WEBSITE-PLAN.md` Q8 and the Waiting list.

## 4. Pictures: add and revise

This is the section for getting the pictures right: the owner adds the right pictures and replaces the wrong or weak ones, and Claude wires them in. It comes after the logos (item 3), so logos and pictures don't get mixed up. Picture notes from the feedback rounds (item 2) land here: the owner's round 1 logged F3, F11, F12, F19, F21, F24 and F26 in `postpushrevisions1.1/feedback-2026-10-16.md` (wrong Discover story screen, blurry Discover report, Keypress game on Next Chapter to be swapped for a front view of the GBA, Enhance calibration and reward grouping screens), plus F7 and F29 (recognition logos, an event photo, news coverage). Decided 2026-10-16: F12 is one real product shot for the GBA hero (the front view of the GBA or the HR dashboard), which also covers F24; F19 is a real Discover story scene next to a sharp report crop (the owner sends both); F7 is a logo strip whose shell is built first (R7), so the owner only sends the three logo files (Startup Studio Indonesia / Komdigi, Innovfest by NUS x AsiaTech, Tech in Asia, as `.svg` or 2× `.png`) for `public/assets/recognition/`.

- [ ] **Owner:** go through the site page by page and list every picture that's wrong, blurry or not representative, with what should be there instead (or send the replacement).
- [ ] **Claude:** keep one list (page, current file, problem, replacement, status) at the end of this section, and swap each picture in as it arrives.

### Brand kit assets

The brand kit is `~/projects/brand-kit-main` (a download of `gitlab.com/deushcs/brand-kit`, not a git checkout). Most of it is already in `public/assets/`. What's there and isn't used yet:

| File in `assets_compro/` | Width | Status |
|---|---|---|
| `enhance 4.png`, `enhance 5.png` | 2431px | **Not in the site.** May cover some of the four missing Enhance screens (product overview, salary increase, bonus cycle, bonus participants) |
| `laptop-frame 2.png`, `laptop-frame-cutout.png`, `laptop-mockup-frame.png` | 960–1400px | **Not in the site.** Device frames for screenshots; only if `DESIGN-GUIDE.md` allows them |
| `design-guide/deus-logo.png` | — | Different file from the site's `deus-logo.png`; check which is newer and sharper |
| Everything else | — | Already in `public/assets/`, same sizes |

- [ ] **Claude:** open `enhance 4.png` and `enhance 5.png`, match them to the `missingScreens` list in `src/content/images.ts`, copy the matches into `public/assets/` with kebab-case names, and wire them in. Report what they show and which placeholders they replace.
- [ ] **Claude:** compare the two logos and keep the better one; check whether the GitLab repo has anything newer than the local download (logo SVG, client logos).
- [ ] **Claude:** check the laptop frames against the design guide; if the guide doesn't cover device frames, ask the owner before using them.
- [ ] **Owner:** still to send (from the Waiting list): SVG logo, the other missing screenshots, 2× versions of `enhance-1.png` (needs 1360px), `discover-report-crop.png` and `gba-1-crop.png`, and confirm what `gba-2` and `gba-3` show.

### Picture list

| Page | Slot | Was | Now | Status |
|---|---|---|---|---|
| Home | Hero card "Plays DEUS Discover" (F34) | `gba-1-crop.png` | `discover-title.png` | done (R10) |
| Home | Where we help, Hire (F35) | `gba-2-crop.png` | `gba-1-crop.png` | done (R10) |
| Home | Where we help, Develop (F36) | placeholder | `gba-batch-report.png` | done (R10) |
| Home | Where we help, Perform and reward (F37) | `enhance-1.png` | `enhance-bonus-dashboard.png` | done (R10) |
| Home | Our solutions, GBA tile (F38) | `gba-2-crop.png` | `gba-next-chapter.png` | done (R10) |
| Home | Our solutions, Enhance tile (F39) | `enhance-1.png` | `enhance-pa-dashboard.png` | done (R10) |
| Home | GBA spotlight, Simulation tile (F31) | placeholder | `gba-simulation.png` | done (2026-10-19) |
| GBA | Simulation, Business Operations card | placeholder | `gba-simulation.png` | done (2026-10-19) |
| GBA | Cognitive, all seven game tiles | placeholders | `gba-game-*.png` (owner's GBA set) | done (2026-10-20) |
| GBA | Neuroscience, Balloon, Hard or Easy, Lengths, Faces tiles | placeholders | `gba-game-*.png` | done (2026-10-20) |
| GBA | Neuroscience, Tower Game tile | placeholder | the owner's "Tower Game" file is a copy of the Balloon Game's | **waiting on the owner** |
| GBA | Simulation, Event Operations card | placeholder | `gba-simulation-event-operations.png` | done (2026-10-20) |
| GBA | Personality, story stage (F19) | `gba-1-crop.png` | `discover-festival.png` | done (2026-10-20) |
| GBA | Platform, admin dashboard | placeholder | `gba-cms.png` (WhatsApp copy, 1600px; company names blurred by the owner) | done (2026-10-20); a sharper original would help |
| GBA | Reports, Batch and Interactive tabs | placeholders | `gba-report-batch.png`, `gba-report-interactive.png` | done (2026-10-20) |
| GBA | Reports, Individual tab | placeholder | not sent yet | waiting on the owner |

## 5. Re-revise the content

- [ ] **Owner + Claude:** go page by page through `content/en/*.md` (the source the site's wording comes from) with the live page open. Claude prepares one checklist per page: every `[VERIFY]` mark, every hidden claim, every open question that touches it.
- [ ] **Owner:** answer the hidden-claim switches in `src/content/flags.ts`, each off until a source confirms it: `showBadHireCost`, `showMinimumOrder`, `showMarketClaim`, `showUgmPartnership`.
- [ ] **Owner:** answer the open items that change wording: the two Enhance select error messages, the four "From rating to reward" descriptions (ENHANCE-PAGE-SPEC §5), office address and business hours for Contact (Q9), the logo tagline ("Human Capital and Business Solutions" vs "Human Capital Services"), the Home headline (Q3), and any still open in `WEBSITE-PLAN.md` §14.
- [ ] **Claude:** apply the changes to the Markdown first, then to `src/content/`, one page per commit. `ENHANCE-CONTENT.md` stays untouched.
- **Rule:** no new clients, numbers or quotes unless they're in `Creating DEUS HCS Website.md` or the owner adds them there first.

## 6. Case studies

**What exists:** one story layout (`src/content/stories/`), so each new case study is one content file, not new design. Telkom runs anonymised at `/clients/national-telecom-group` until Q7; Calvin Christian School is written (Indonesian) but held until Q11. Each is one switch in `flags.ts`.

**Recommendation: how to get them in.**

1. **Pick 3 to 5 to start, one per product at least.** Game-Based Assessment (Telkom is there), Enhance (none yet; the most important gap, since Enhance is the lead page), Potentia/education (Calvin). Then aim for a spread of industries from the list on the Clients page (Retail, Telecommunications, Education, FMCG, F&B, Electronics).
2. **Use one intake form for every client.** Claude writes `docs/case-study-intake.md`, a one-page questionnaire the account owner fills in from their notes or a 20-minute call:
   - client, industry, size, product used, year
   - the problem before DEUS (in the client's words if possible)
   - what DEUS did, in steps, and how long it took
   - **results with numbers** (candidates assessed, time saved, completion rate, cost, retention); only numbers the client will stand behind
   - one quote: who said it, their exact title, the exact words
   - photo (if any) and logo file
   - **permission level:** named (name, logo, quote), anonymised ("a national FMCG company", numbers only), or internal only
3. **Ask for permission in writing, in one email.** Claude drafts a short Indonesian/English template that shows the client the exact text and asks for the permission level. Anonymised is the default, so nothing is blocked while a client decides.
4. **Short version for the rest.** Clients without a full story can still go on the planned project list (`/clients/projects`, WEBSITE-PLAN §5.8): one row each, client or anonymous description, industry, product, year. That shows breadth ("40+ brands") without a write-up for each. It's in the plan as "later" (Q22), so it needs the owner's go-ahead.
5. **Each story is then a small task:** intake → Claude drafts the Markdown in `content/en/` in the house voice (Opus 5.5 Medium) → owner and client approve → Claude turns it into the content file (Haiku 5.5 Max, exact copy) → card appears on `/clients` and the matching product page.

- [ ] **Claude:** write `docs/case-study-intake.md` and the permission email template.
- [ ] **Owner:** choose the first 3–5 clients and send the intake forms.
- [ ] **Owner:** answer Q7 (Telkom: name, Graha Merah Putih photo, Ibu Lina's quote) and Q11 (Calvin: name, correct names and titles for both quotes).
- [ ] **Owner:** decide on the project list (Q22).

## 7. Phase 7: launch

From `IMPLEMENTATION_PLAN.md`. English only; Phase 6 comes after. Build one task at a time, with the model and effort the plan gives.

- [ ] **7.1 SEO**: per-page titles and descriptions through `pageMetadata`; JSON-LD `Organization` (legalName PT Investama Persada Kurnia), `SoftwareApplication` per product, `BreadcrumbList` · **Sonnet 5.5 High**
- [ ] **7.2 Open Graph images** (the image shown when a link is shared on WhatsApp/LinkedIn), from the guide §7.28 template · **Sonnet 5.5 High**
- [ ] **7.3 Analytics**: CTA, WhatsApp, email, form submit, language switch and outbound clicks · **Haiku 5.5 Max**. *Owner:* pick the analytics tool (Q13): Vercel Web Analytics by default (custom events may need the Pro plan), or Google Analytics 4 if the team already uses Google tools.
- [ ] **7.4 Release checks**: full Playwright, accessibility scan, Lighthouse mobile ≥ 90 on Home and Enhance, `/security-review`, placeholders replaced with approved content · **Sonnet 5.5 High**. Uses the QA steps from item 8.
- [ ] **7.5 Domain cutover** to deushcs.com (Hostinger): back up WordPress and list its URLs, record every DNS record, point only the web records at Vercel, leave mail records alone, test email at admin@deushcs.com, redirect old WordPress URLs, set `SITE_INDEXABLE=true`, keep WordPress as the rollback for a few weeks · **Opus 5.5 High**
- **Owner, before 7.5:** DNS access at Hostinger; say where the mail is hosted (Q16); privacy policy reviewed by counsel; Waiting for the owner list empty.

## 8. QA steps

The plan has the release checks (7.4) but no written checklist a person can follow. Proposed: Claude writes `docs/qa-checklist.md`, used before every release and at launch.

- [ ] **Automated** (Claude runs): typecheck, lint, build, unit tests, full Playwright (every page at 390 and 1280, link crawl, forms, redirects, 404), accessibility scan (no serious or critical issues), Lighthouse mobile on Home and Enhance, `/security-review`.
- [ ] **Forms end to end** (Claude, then owner once): submit Enhance and Contact with good data, bad data and an empty form; the email arrives; the lead is in the database; the spam limit kicks in; the thank-you state shows.
- [ ] **Real devices** (owner, about 15 minutes): iPhone Safari and an Android Chrome; tap every CTA and the WhatsApp button; scroll every page; rotate once.
- [ ] **Content** (Claude): no `[VERIFY]` text, placeholder text or "lorem" on any page; every number on the site traces to `Creating DEUS HCS Website.md`; no raw client names that are still held.
- [ ] **Launch-day extras** (Claude + owner, after 7.5): deushcs.com and www both load over HTTPS; old WordPress URLs redirect; email in and out still works; `robots.txt` allows indexing; sitemap submitted (item 9).
- [ ] **Each item gets a result line** (date, pass/fail, who) in the checklist file, so a release has a record.

## 9. SEO and GEO: getting found

**SEO** gets the site onto Google for the searches buyers make. **GEO** (generative engine optimisation) gets DEUS named in AI answers (ChatGPT, Gemini, Perplexity, Google's AI Overviews). Both reward the same things: clear pages, consistent facts, structured data and useful content. Nothing counts until 7.5 lifts `noindex`.

**On the site** (Claude, mostly in 7.1, the rest as one extra task):
- [ ] Every page targets one main keyword from `WEBSITE-PLAN.md` §9.1 in its title, H1, description and first paragraph, without stuffing.
- [ ] `FAQPage` structured data on every page that has an FAQ; add short FAQs where buyers ask the same questions (price, how long, how candidates take it, data security).
- [ ] Facts stated plainly and the same everywhere (company name, legal name, founding year, what each product does, "40+ brands"), so search engines and AI models repeat them correctly.
- [ ] `robots.txt` and the sitemap; decide whether AI crawlers (GPTBot, ClaudeBot, PerplexityBot, Google-Extended) are allowed. Suggested: allow, because being cited is the goal. Optional `llms.txt` summarising the site.
- [ ] Internal links: every product page links to its case studies and related posts; every post links to a product page.
- [ ] Redirects from every old WordPress URL (in 7.5), so existing Google rankings carry over.
- [ ] Speed: Lighthouse ≥ 90 on mobile (7.4).

**Off the site** (owner sets up, Claude guides; WEBSITE-PLAN §9.3):
- [ ] Google Search Console and Bing Webmaster Tools: verify deushcs.com, submit the sitemap.
- [ ] Google Business Profile with the same name, address and phone as the site.
- [ ] LinkedIn company page (does one exist?), linking to the site; staff profiles link to it too.
- [ ] Website link in @potentiabydeus's bio and on deuspotentia.com.
- [ ] Listings where Indonesian HR buyers look (HR associations, software directories, partner pages such as UGM and Agate if they list partners).

**More inbound leads** (needs the owner's go-ahead; each is in WEBSITE-PLAN §12 "Later"):
- [ ] Use-case landing pages for high-intent searches: "Management Trainee assessment", "campus recruitment", "talent mapping" (mostly reusing GBA content).
- [ ] Downloadable one-pagers per product in exchange for an email.
- [ ] The blog (items 10–12), mostly in Indonesian, since that's how most buyers search.

**After launch** (Haiku 5.5 Max, monthly): read Search Console (queries, clicks, pages not indexed), list the queries that show DEUS but get few clicks, and suggest title or content changes and new post topics.

## 10. Blog content and marketing plan

The blog is not in v1 (WEBSITE-PLAN §12 "Later" #4), so it goes through the plan first: Claude adds it as a new phase in `IMPLEMENTATION_PLAN.md` once the owner approves this plan.

- [ ] **Claude:** write `docs/content-plan.md` for the owner to approve. Proposed outline:
  - **Goal:** inbound demo requests and WhatsApp chats from HR leaders, not traffic for its own sake. Each post ends with one CTA to the matching product page.
  - **Readers:** HR heads, talent acquisition leads and business owners at mid-size and large Indonesian companies; schools for Potentia.
  - **Language:** Indonesian first (that's where the search volume is and where competitors are thin), English for posts aimed at regional or multinational buyers. This links to item 13: Indonesian posts need the `/id` routes, or the blog's own Indonesian section, earlier than the rest of Phase 6.
  - **Four content pillars**, one per product line plus one broad:
    1. Recruitment and assessment (Game-Based Assessment, Next Chapter)
    2. Personality and fit (Discover)
    3. Performance and pay (Enhance)
    4. HR leadership in Indonesia (broad topics that build trust)
  - **Post types:** how-to guides, explainers ("what is…"), comparisons ("psikotes online vs game-based assessment"), checklists and templates, client stories (from item 6), and short news posts.
  - **Cadence:** 2 posts a month to start (realistic for a small team), each 800–1,500 words; one longer "pillar" guide per pillar in the first quarter.
  - **Distribution:** every post goes to LinkedIn (company page and staff), WhatsApp broadcast to existing contacts, and an optional monthly email to past leads (only those who agreed, per the privacy policy).
  - **Workflow:** topic from the keyword list → Claude drafts → DEUS expert checks the facts → native reviewer for Indonesian → publish → share.
  - **Measuring it:** Search Console clicks and positions per post; analytics (7.3) for post → CTA clicks → form submits; review every quarter and do more of what brings leads.
  - **Rules:** same voice as the site (`content/VOICE.md`); no invented clients, numbers or studies; cite sources for every statistic.
- [ ] **Owner:** approve or change the plan; name who checks facts and who reviews Indonesian.

## 11. Blog page

- [ ] **Owner:** approve the blog as a new phase (item 10).
- [ ] **Claude (Opus 5.5 High):** design the blog index and post layout in `DESIGN-GUIDE.md` and the reference file first, from existing pieces (the design guide needs a new piece for long-form text: headings, lists, quotes, images, tables).
- [ ] **Claude (Sonnet 5.5 High):** build it. Suggested shape:
  - posts as Markdown/MDX files in the repo (`content/blog/en/`, `content/blog/id/`), like the rest of the content; a headless CMS (WEBSITE-PLAN §12 #6) only if the team needs to publish without a developer
  - routes `/en/insights` and `/id/insights` (name to decide: "Insights", "Blog" or "Resources"), with a post page at `/[locale]/insights/[slug]`
  - index with pillar filter, newest first; each post has title, description, date, author, pillar, reading time, cover image, a CTA block and related posts
  - `Article` structured data, Open Graph image per post (from 7.2), included in the sitemap, RSS feed
  - Playwright test for the index and one post; screenshots at 390 and 1280
- [ ] Header and footer link to the blog once there are at least 3 posts.

## 12. Starter blog posts

Five to start, one per pillar plus one comparison. Topics only; Claude drafts each from DEUS's own material and sources, and the owner and a DEUS expert check every fact before it goes up.

| # | Working title | Language | Pillar | Target search | Links to |
|---|---|---|---|---|---|
| 1 | Cara memilih psikotes untuk program Management Trainee | ID | Recruitment | asesmen management trainee, psikotes online | Game-Based Assessment |
| 2 | Apa itu asesmen berbasis game, dan kenapa kandidat lebih menyukainya? | ID | Recruitment | asesmen berbasis game, gamifikasi rekrutmen | Game-Based Assessment |
| 3 | Kalibrasi kinerja: langkah demi langkah agar penilaian lebih adil | ID | Performance | kalibrasi kinerja, sistem appraisal karyawan | Enhance |
| 4 | Remunerasi berbasis kinerja: menghubungkan nilai KPI dengan kenaikan gaji dan bonus | ID | Performance | remunerasi berbasis kinerja, software KPI karyawan | Enhance |
| 5 | Big Five personality assessment: what it measures and how to use it in hiring | EN | Personality | personality assessment, Big Five assessment | Discover |

Next in line: campus recruitment checklist, cognitive vs personality tests, how to read an assessment report, running a fair bonus cycle, one post per new case study.

- [ ] **Claude:** draft posts 1–5 into `content/blog/` once item 11 exists (or as Markdown drafts in `docs/blog-drafts/` before then).
- [ ] **Owner:** review each draft; native reviewer approves the Indonesian ones.

## 13. Indonesian pages (Phase 6)

On hold until after launch (owner, 2026-10-15). The tasks are in `IMPLEMENTATION_PLAN.md` Phase 6:

- [ ] **Owner:** name the native Indonesian reviewer (Q14; default is the owner). Nothing goes live unreviewed.
- [ ] **6.1** Global strings and Enhance · **Sonnet 5.5 High**
- [ ] **6.2** One task per remaining page: home, about, solutions, contact, privacy, GBA, Discover, Next Chapter, Science, Clients, Telkom · **Sonnet 5.5 High**; after two pages, try About on **Haiku 5.5 Max** and keep it if the reviewer finds no extra issues
- [ ] **6.3** English version of the Calvin story · **Sonnet 5.5 High**
- [ ] **6.4** `hreflang`, sitemap alternates and the Indonesian-browser redirect · **Opus 5.5 Medium**
- [ ] **6.5** Screenshots and tests of every page in both languages; the language switch keeps the page · **Sonnet 5.5 High**
- Uses the glossary in `WEBSITE-PLAN.md` §6.4 and "Anda" (`content/VOICE.md`). The Calvin story and the About values and mission already exist in Indonesian.
- If the blog (item 10) goes Indonesian first, 6.1 and 6.4 may need to come earlier. Decide together with item 10.
