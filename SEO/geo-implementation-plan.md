# GEO plan: getting DEUS into AI answers and search

*Written 2026-10-23. Background: `SEO/seo-trends-2026-10.md`.*

**Goal:** more inbound B2B visitors and leads. When an HR head asks Google, ChatGPT, Gemini, Perplexity or Copilot about game-based assessment, Management Trainee hiring or linking appraisals to pay, the answer should name DEUS and link to deushcs.com. Once they arrive, the page should give them a step they're ready to take, and every lead should show where it came from, so we know what works.

**Starting point:** Phase 7 of `IMPLEMENTATION_PLAN.md` already covers the technical basics: titles and descriptions, canonical URLs, sitemap, robots, Open Graph images, JSON-LD (Organization, WebSite, SoftwareApplication, FAQPage, BreadcrumbList), redirects from the old WordPress site, Search Console and Business Profile. This plan doesn't repeat any of that. All GBA module tabs and FAQ answers are already in the server HTML, so crawlers that don't run JavaScript can read them.

**What this plan adds:**
- **L:** record where each lead came from, and offer a download to visitors who aren't ready to ask for a trial.
- **G1:** make the current pages easy for AI tools to read and quote, and start measuring.
- **G2:** four use-case pages.
- **G3:** a Guides section with seven in-depth articles, the seventh built on DEUS's own numbers.
- **G4:** Indonesian versions of the use-case pages and guides 1 and 2.
- **Owner's part:** off-site work (the biggest lever for being mentioned), answering leads fast, and a monthly check.

**Owner's decisions (2026-10-23):** Guides and use-case pages: yes. **English first**: Indonesian versions wait for Phase 6, and the owner wants to be reminded (last line of this plan and `revisions3.0team/NEEDED-FROM-YOU.md` §9). Measuring: a monthly manual check, no paid tools.

**Added later the same day,** because the site has to bring in leads on its own (outbound is hard): Phase L (lead source and a download offer), guide 7 on DEUS's own numbers, proof that still shows while client stories are off, and G4, Indonesian for the pages that bring leads. G4 is the one exception to English first; the rest still waits for Phase 6.

**Defaults for everything else**, so no task stops to ask. The owner can change any of them before the run:

| Question | Default |
|---|---|
| AI crawlers, including the ones that collect training data (GPTBot, ClaudeBot, Google-Extended, Applebot-Extended, CCBot) | All allowed. Being in training data helps the assistants know DEUS without searching. |
| Who's named as the author of a guide | The company ("DEUS Human Capital Services"). A named person only after the owner says who. |
| Guide topics | The six in §S9 |
| New pages before the owner has approved their wording | Built on `staging` behind switches that are on (`showUseCases`, `showGuides`, and a `published` field per guide). Before a release, anything the owner hasn't approved gets its switch turned off. |
| Facts that are missing | Left out. The task adds a line to `revisions3.0team/NEEDED-FROM-YOU.md` and carries on. |
| Header menu | Unchanged. New pages are linked from the footer, the product pages and each other. |
| Where a lead came from | The first page of the visit and the referring site's name, kept in the browser tab for the visit (`sessionStorage`, no cookie) and saved in the lead's `extra` field, so no database change (§S10). |
| The download | A sample GBA candidate report (PDF, sample data only) from the owner. Built behind `showSampleReport`, which stays off until the file is in `public/downloads/` (§S11). |
| Guide 7 (DEUS's own numbers) | Built only from the owner's numbers in `SEO/data/assessment-findings.md`. Until that file exists, its task waits and the run goes on without it. |
| Proof on new pages while client stories are off | The client logo wall and the "40+ brands" line, as on Home. No story links. |
| Indonesian (G4) | The four use-case pages, guides 1 and 2, and what they need to work end to end (shared strings, Contact). Live only after a native speaker (Q14) has read them; until then each release turns `showIndonesianLeadPages` off (§S12). |

**How to run it:**
- Unattended: `autorun all SEO/geo-implementation-plan.md` in the project folder, after `IMPLEMENTATION_PLAN.md`'s current tasks have finished (one folder, one run at a time).
- By hand: open Claude in the main folder and say "do the next task in `SEO/geo-implementation-plan.md`".
- Nothing here goes live until the owner says "release". Nothing here touches the `noindex` switch, so G1 to G3 can be built before or after launch.

**Rough cost:** about $43 for the 33 tasks at the model table's prices (L $6, G1 $12, G2 $8, G3 $10, G4 $7).

## Rules for every task

- **Read first:** the project `CLAUDE.md`, this section, and the § sections your task names.
- **Branch and checks:** work on `staging` in the main folder. Run the checks in `CLAUDE.md` step 1: the smoke spec, plus the spec of each page the task changes. Run the full suite only in a phase's end-to-end task. Lead-form e2e tests fail on this server because it has no `.env` files (`DATABASE_URL_POOLED is not set`). That's the environment, not the code: name those tests in the report and carry on.
- **Ticking:** tick the task's line in this file only (not `IMPLEMENTATION_PLAN.md` or `LANES.md`), in the same commit as the work. Then commit and push.
- **Facts:** only from `Creating DEUS HCS Website.md`, `content/en/*.md` and the approved decisions in `postpushrevisions1.1/`, `postpushrevisions2.0/` and `revisions3.0team/`. Never invent clients, numbers, quotes, dates or awards.
  - Every `siteFlags` switch (`src/content/flags.ts`) applies to new copy too. While a switch is off, its fact stays out: Telkom stays "a national telecom group" while `telkomNamed` is off, and there's no minimum order (`showMinimumOrder`) and no "5 to 10 times" (`showBadHireCost`).
  - Never bring back anything the owner cut (for example Recognition, D2) or reword headings that are still waiting for the owner's approval (the GBA headings, D9).
- **General claims** (what the Big Five is, what an assessment-centre study found) need a reputable source that the writer actually opened, linked in the copy's Sources list. No statistic without a source.
- **Copy:** change the Markdown in `content/en/` first, then the content module. Follow `content/VOICE.md`: American English, sentence case, none of its banned words. English only, except Phase G4 (§S12).
- **Look:** `DESIGN-GUIDE.md` is binding. Use existing components and tokens. Any visual change gets screenshots at 390 and 1280.
- **Off limits:** `isIndexable()`, the `noindex` logic, canonical URLs and redirects stay as they are.
- **No tricks:** nothing hidden from people, no content shown only to bots, no keyword lists.

## Phase G1: Make the current pages easy for AI to quote, and start measuring

- [x] G1.1 AI visibility check kit: write `SEO/ai-visibility/README.md`, `SEO/ai-visibility/prompts.md` and `SEO/ai-visibility/scorecard.csv` as §S6 says. Done when the three files exist, the prompt list has 20 English and 10 Indonesian questions, and the README explains the 30-minute monthly run and how to read the AI referrers in Vercel Analytics and Search Console (Markdown and CSV only, so no code checks) · Sonnet 5.5 High: judgment about what buyers really ask, no code.
- [x] G1.2 Off-site checklist: write `SEO/off-site-checklist.md` as §S7 says. Use web search to find the current Indonesian HR media, communities, directories and software listing sites, and open every link to confirm it works. Done when each item has why it matters, the link, what to write (reusing the site's own approved wording) and the owner as the one who does it (Markdown only) · Sonnet 5.5 High: research and judgment.
- [x] G1.3 GEO check script: `scripts/check-geo.mjs` and `tests/unit/check-geo.test.ts`, built like `scripts/check-launch.mjs` and `tests/unit/check-launch.test.ts`. Read §S4, `src/app/robots.ts`, `src/app/sitemap.ts` and `src/lib/structured-data.ts`, and add the robots unit test §S4 names. Done when the unit tests pass and `node scripts/check-geo.mjs <local production build> --prelaunch` passes. A page whose FAQ text is missing from its raw HTML must fail; prove that once with a unit test. Stop the server by its PID afterwards · Sonnet 5.5 High: a script with tests, following an existing one.
- [x] G1.4 Structured data upgrade: `src/lib/structured-data.ts`, its callers under `src/app/[locale]/` and `tests/unit/structured-data.test.ts`. Read §S1. Done when unit tests cover every new field and the `@id` links, `check-geo.mjs --prelaunch` passes on a local production build, and every value in the JSON-LD is also visible on its page · Opus 5.5 Medium: mistakes here are silent; unit-tested judgment.
- [x] G1.5 GBA page answer passage and buyer FAQ: `content/en/game-based-assessment.md`, then `src/content/en/game-based-assessment.ts` (and the page, only if the passage needs a slot). Read §S2 and §S3. Done when the passage and 4 to 6 new FAQ items are on the page, the commit body lists the source of every fact, `tests/e2e/gba.spec.ts` and the smoke spec pass, and screenshots at 390 and 1280 show no layout change beyond the new text · Opus 5.5 High: buyer-facing copy where an invented fact would go unnoticed.
- [x] G1.6 Enhance page answer passage and buyer FAQ: `content/en/enhance.md`, then `src/content/en/enhance.ts` (`ENHANCE-CONTENT.md` stays untouched). Read §S2 and §S3. Done when the passage and 3 to 5 new FAQ items are on the page, the commit body lists the source of every fact, `tests/e2e/enhance.spec.ts` and the smoke spec pass, and screenshots at 390 and 1280 show no layout change beyond the new text · Opus 5.5 High: same as G1.5.
- [x] G1.7 Answer passages on Home, Solutions, About and Clients: their Markdown in `content/en/`, then their modules in `src/content/en/`. Read §S2. Done when each page has its passage, the commit body lists the source of every fact, the four pages' specs (`home`, `solutions`, `about`, `clients`) and the smoke spec pass, and screenshots at 390 and 1280 show no layout change beyond the new text · Opus 5.5 High: positioning copy on the main pages.
- [x] G1.8 llms.txt and IndexNow: `src/app/llms.txt/route.ts`, a key file in `public/`, `scripts/indexnow.mjs`, unit tests, one line in `CLAUDE.md` "Releasing to production" step 5, and an llms.txt check in `scripts/check-geo.mjs`. Read §S5. Done when `/llms.txt` on a local production build lists every sitemap page with its one-line summary, and `node scripts/indexnow.mjs https://deushcs.com --dry-run` prints the URL list and sends nothing. The script must refuse any other origin; prove that with a unit test · Haiku 5.5 Max: small, fully specified wiring.
- [x] G1.9 Phase G1 end-to-end check: build once, then run the full e2e suite once (`npm run test:e2e`), `scripts/check-geo.mjs --prelaunch` and `scripts/check-launch.mjs --prelaunch` against the local production build. Save the failure list first. Fix what G1 caused and rerun only the failed tests (`--last-failed`). Done when nothing caused by the code is left failing; the commit body lists the results and any environment failures · Sonnet 5.5 High: runs and triages.
- [x] Phase G1 review: read G1's whole diff. Check every new sentence against the sources (nothing invented, switches respected, nothing the owner cut comes back, `content/VOICE.md` followed). Check that the JSON-LD matches what each page shows, and that nothing touched `noindex`, canonical URLs or redirects. Take screenshots of the changed pages at 390 and 1280. Fix what you find and rerun only what the fixes touch. Any open item goes to a fix task or to `revisions3.0team/NEEDED-FROM-YOU.md` · Opus 5.5 High: the last look before this copy can go live, where these faults are silent.

## Phase L: Turn visitors into leads, and see where they came from

*Runs right after G1. The site is live, so the sooner each lead carries its source, the sooner the monthly check can count leads, not just mentions.*

- [x] L1 Lead source: `src/lib/visit-source.ts`, a `VisitSource` client component rendered once in `src/app/[locale]/layout.tsx` (like `ClickTracking`), then `src/components/forms/LeadForm.tsx`, `src/lib/leads/schema.ts`, `src/lib/leads/notify.ts`, `src/lib/analytics.ts`, `src/content/en/privacy.ts` and a "Leads by source" step in `SEO/ai-visibility/README.md`. Read §S10. Done when unit tests cover the visit record (another site's referrer kept as its host name, this site's and bad values dropped, never overwritten later in the visit), the server's handling of the two new fields and the two new email lines; a new test in `tests/e2e/contact.spec.ts` opens the GBA page from a link with `utm_source`, follows "Request a free trial" and finds the landing page, referrer and tag in the form's hidden fields; and that spec and the smoke spec pass apart from the known lead-sending failures. No database change · Opus 5.5 High: the lead pipeline, where a slip loses leads silently.
- [x] L2 Download offer: a `download` variant of `LeadForm`, a `DownloadOffer` block in `src/components/blocks/`, the `showSampleReport` switch in `src/content/flags.ts`, a `download` analytics event, a `noindex` header for `/downloads/` in `next.config.ts`, the block on `/styleguide` in its three states, and on the GBA page while the switch is on. Copy goes in `content/en/global.md` first, then `messages/en.json`; the privacy page names the new form. Read §S11 and `DESIGN-GUIDE.md` §7.9. Done when unit tests cover the variant's parsing (`extra.offer`, no role or size needed), its email and that the block renders nowhere while the switch is off; `tests/e2e/gba.spec.ts` and the smoke spec pass; and styleguide screenshots of the block (ready, error, sent) at 390 and 1280 follow the guide. The switch stays off until the owner's PDF is in `public/downloads/` · Opus 5.5 High: a new way in for leads, through the same pipeline.
- [x] L3 Phase L end-to-end check: build once, then run the full e2e suite once (`npm run test:e2e`) and save the failure list first. Fix what L1 and L2 caused and rerun only the failed tests (`--last-failed`). Done when nothing caused by the code is left failing; the commit body lists the results and any environment failures · Sonnet 5.5 High: runs and triages.
- [x] Phase L review: read Phase L's whole diff. On a local production build, follow a visit (open a page from a tagged link with a referrer, move through two pages, open the form) and check the hidden fields, then read the email `buildLeadEmail` makes for that lead. Check that no full address, query string or personal detail goes into the new fields or any analytics event, that the forms still post without script, that the privacy text matches what's now collected, and that the download block appears nowhere while its switch is off. Fix, then rerun only what the fixes touch. Any open item goes to a fix task or to `revisions3.0team/NEEDED-FROM-YOU.md` · Opus 5.5 High: lead data and personal data, where faults are silent.

## Phase G2: Use-case pages

- [x] G2.1 Use-case copy: write `content/en/use-cases/<slug>.md` for the four pages in §S8, with every section §S8 lists and a Sources note at the end of each file (dropped from the modules, like `> Note:` lines). Done when the four files exist and every fact traces to a source (Markdown only) · Opus 5.5 High: new buyer-facing copy, facts only.
- [x] G2.2 Use-case template and the Management Trainee page: a collection like the client stories (`src/content/stories/`, `storiesIn`): `src/content/use-cases/` with `useCasesIn(locale)` and the `showUseCases` switch in `src/content/flags.ts`. Also the route `src/app/[locale]/solutions/[slug]/page.tsx` (static params only), built from existing blocks, with `pageMetadata`, an Open Graph image, JSON-LD (§S1: WebPage, FAQPage, BreadcrumbList Home › Solutions › page) and sitemap entries through `sitemapEntries`. Read §S8, `DESIGN-GUIDE.md` and the Telkom story's page and registry. Done when the Management Trainee page renders, unit tests show the sitemap lists use cases only while `showUseCases` is on, a new `tests/e2e/use-cases.spec.ts` passes, and screenshots at 390 and 1280 follow the guide · Sonnet 5.5 xHigh: a new page layout with no mockup.
- [x] G2.3 Campus recruitment, talent mapping and appraisal-to-pay pages: convert their Markdown into `src/content/en/use-cases/*.ts`, register them, and extend `tests/e2e/use-cases.spec.ts` to all four pages with one parameterised test. Done when the four pages render and that spec passes · Haiku 5.5 Max: repeats the page G2.2 built.
- [x] G2.4 Links into the use-case pages: a "Use cases" group in the footer, the GBA page's use-case cards (each links to its page where one exists), one link from Enhance to the appraisal-to-pay page, the Solutions page, and the Telkom story to the Management Trainee page. Read §S8's link list. Done when every link answers 200, and the specs for those pages (`closing-footer`, `gba`, `enhance`, `solutions`, `story`) pass · Sonnet 5.5 High: shared footer and several pages.
- [x] G2.5 Phase G2 end-to-end check: build once, then run the full e2e suite once and `scripts/check-geo.mjs --prelaunch`, and take screenshots of the four pages at 390 and 1280. Fix what G2 caused and rerun only the failed tests. Done when nothing caused by the code is left failing · Sonnet 5.5 High: runs and triages.
- [x] Phase G2 review: read G2's diff. Check facts and switches as in the G1 review, check that the page design follows `DESIGN-GUIDE.md`, that turning `showUseCases` off removes the pages, links, sitemap entries and llms.txt lines, and that `/id/solutions/<slug>` goes to the English page. Fix, then rerun only what the fixes touch · Opus 5.5 High: new public pages.

## Phase G3: Guides

- [x] G3.1 Copy for guides 1 and 2: write `content/en/guides/<slug>.md` for the first two topics in §S9, with web research for the outside sources (open each one). Done when both files have every part §S9 lists, each is 1,200 to 2,000 words, every DEUS fact traces to a source, and every outside claim has a link (Markdown only) · Opus 5.5 High: long-form writing where invented facts are the main risk.
- [x] G3.2 Guides section with guides 1 and 2: `src/content/guides/` (a registry with a `published` field per guide, and the `showGuides` switch), `src/app/[locale]/guides/page.tsx` and `src/app/[locale]/guides/[slug]/page.tsx` in the article layout §S9 describes, JSON-LD (§S1: Article, FAQPage, BreadcrumbList), sitemap entries, Open Graph images, a "Guides" footer link, and guides 1 and 2 as modules. Done when unit tests show unpublished guides are left out of the index, sitemap and llms.txt, a new `tests/e2e/guides.spec.ts` passes, and screenshots at 390 and 1280 follow the guide · Sonnet 5.5 xHigh: a new article layout with no mockup.
- [x] G3.3 Copy for guides 3 to 6: `content/en/guides/<slug>.md` for the other four topics in §S9, under the same rules as G3.1. Done as in G3.1 (Markdown only) · Opus 5.5 High: same as G3.1.
- [x] G3.4 Guides 3 to 6 on the site, and links to the guides: convert them into modules and register them. Then add one "Related guide" link with the existing link component on the GBA page, the Enhance page and each use-case page (§S9's link list). Done when all six guides render, `tests/e2e/guides.spec.ts` covers all six, and the specs for the pages that got a link pass · Haiku 5.5 Max: copying Markdown into modules and small wiring.
- [ ] G3.5 Guide 7, on DEUS's own numbers: only from `SEO/data/assessment-findings.md`, the owner's file. If it isn't there yet, this task waits for the owner and changes nothing. Otherwise write `content/en/guides/<slug>.md` under §S9's rules for guide 7, then its module, registered like the others and listed in the "Related guides" of guides 1 to 3. Done when the guide renders, `tests/e2e/guides.spec.ts` covers it, and the commit body maps every number to its line in the owner's file · Opus 5.5 High: published numbers under the company's name.
- [x] G3.6 Phase G3 end-to-end check: build once, then run the full e2e suite once and `scripts/check-geo.mjs --prelaunch`, and take screenshots of the index and two guides at 390 and 1280. Fix what G3 caused and rerun only the failed tests. Done when nothing caused by the code is left failing · Sonnet 5.5 High: runs and triages.
- [x] Phase G3 review: read G3's diff. Check every DEUS fact against the sources (guide 7's numbers against the owner's file, if it was built) and every outside claim against its link (open a sample of them), check that the Article JSON-LD matches the page, that unpublishing a guide removes every trace of it, and that the guides read like `content/VOICE.md` and not like generic AI text. Fix, then rerun only what the fixes touch · Opus 5.5 High: long copy going public under the company's name.

## Phase G4: Indonesian for the pages that bring leads

*Runs after G2 and G3, from English the owner has approved. Most buyers search and ask AI in Indonesian, where there's less competition. This does part of `IMPLEMENTATION_PLAN.md` Phase 6 early (the shared strings, Contact, and the language links search engines read), so these pages work in Indonesian from the first click to the sent form. The rest of Phase 6 still waits for the owner.*

- [x] G4.1 Indonesian shared strings and Contact: the parts of `messages/id.json` these pages use (header, footer, closing panel, WhatsApp button, contact form, language switch), `content/id/contact.md` then `src/content/id/contact.ts`, and the `showIndonesianLeadPages` switch in `src/content/flags.ts`, which every Indonesian module from this phase obeys (the registry leaves them out while it's off). Read §S12, `WEBSITE-PLAN.md` §6 and `content/VOICE.md`. Done when `/id/contact` renders with every string in Indonesian, a unit test shows it goes to `/en/contact` while the switch is off, and a new `/id/contact` test in `tests/e2e/contact.spec.ts` passes along with the rest of that spec apart from the known lead-sending failures · Sonnet 5.5 High: many language rules.
- [x] G4.2 Language links for search: `hreflang` alternates with `x-default` from `localesFor` in the page metadata, language alternates in `src/app/sitemap.ts`, and the Indonesian lines in `/llms.txt`, for every page that exists in both languages. This is 6.4 without the browser redirect, which waits for Phase 6. Read §S12 and 6.4 in `IMPLEMENTATION_PLAN.md`. Done when unit tests show alternates only on pages with an Indonesian version, and only while the switch is on · Opus 5.5 Medium: small logic where mistakes are silent.
- [x] G4.3 Use-case pages in Indonesian: `content/id/use-cases/<slug>.md` for the four pages, then their modules. Written for Indonesian search, not word for word: each H1 and answer passage uses §S12's search phrase. Same fact rules as G2.1. Done when the four `/id/solutions/<slug>` pages render, `tests/e2e/use-cases.spec.ts` covers them, and screenshots at 390 and 1280 show nothing overflowing (Indonesian runs longer) · Sonnet 5.5 High: language with search phrases.
- [x] G4.4 Guides 1 and 2 in Indonesian: `content/id/guides/<slug>.md`, then their modules, under §S12's rules, and an Indonesian guides index that lists only these two. Sources may stay in English; add Indonesian ones the writer finds and opens. Done when both guides render under `/id/guides/`, `tests/e2e/guides.spec.ts` covers them, and screenshots at 390 and 1280 show nothing overflowing · Sonnet 5.5 High: long-form language.
- [x] G4.5 Phase G4 end-to-end check: build once, then run the full e2e suite once and `scripts/check-geo.mjs --prelaunch`, and take screenshots of every Indonesian page at 390 and 1280. Fix what G4 caused and rerun only the failed tests. Done when nothing caused by the code is left failing · Sonnet 5.5 High: runs and triages.
- [x] Phase G4 review: read G4's diff. Check every Indonesian page against its English page (no fact added or lost, switches respected), the glossary, "Anda" and the search phrases. Check that turning `showIndonesianLeadPages` off removes every Indonesian page, link, sitemap alternate and llms.txt line, and that every other `/id/` page still goes to English. List what a native speaker should look at first in `revisions3.0team/NEEDED-FROM-YOU.md` (Q14). Fix, then rerun only what the fixes touch · Opus 5.5 High: the first Indonesian pages to go public.

## The owner's part

- [ ] *Owner, now:* run the first monthly check from `SEO/ai-visibility/README.md` once G1.1 is done. That's the baseline: what AI tools say about DEUS before any of this goes live.
- [ ] *Owner, now:* in Vercel → Firewall, check that no bot rule blocks AI crawlers (the "AI Bots" managed rule off, or set to log only). After launch, `node scripts/check-geo.mjs https://deushcs.com` confirms it.
- [ ] *Owner, from now on:* work through `SEO/off-site-checklist.md` from the top. The LinkedIn company page comes first. Send its URL so it goes into `sameAs`.
- [ ] *Owner, now:* the inbound-leads list in `revisions3.0team/NEEDED-FROM-YOU.md` §9: who answers new leads and how fast, a log of WhatsApp enquiries, the sample report PDF (L2), the numbers for guide 7 (G3.5) and the Vercel plan check. Client permissions (§4 there) now matter most: a named result is what turns a visitor into a lead.
- [ ] *Owner, before G4 goes live:* a native speaker (Q14) reads the Indonesian pages. Until then each release turns `showIndonesianLeadPages` off.
- [ ] *Owner, before each release that carries G1 to G4 or L work:* read the new copy in the review screenshots or on a local production build. Anything not approved yet: tell Claude "hold <page>" and it turns that page's switch off for the release.
- [x] *Owner, after launch (7.6):* *(done 2026-10-23)* Bing Webmaster Tools → "Import from Google Search Console", then submit the sitemap there too (Copilot, and reportedly ChatGPT search, use Bing's index). IndexNow then runs at every release (G1.8).
- [ ] *Owner, monthly:* the 30-minute AI visibility check, plus Search Console and Vercel Analytics referrers. Ask Claude to add a short `SEO/ai-visibility/<yyyy-mm>.md` summary with three next actions. Once L1 is live the summary also counts leads by source. The first action is one new page (at most one a month): for the question where AI tools name other providers but not DEUS, a guide or use-case page under §S8's or §S9's rules.
- [ ] *Owner, every three months:* ask Claude to refresh the guides' facts and their "Last updated" dates, and to write a new `SEO/seo-trends-<yyyy-mm>.md`.
- [ ] *Owner, reminder:* **Indonesian GEO, the rest.** Most buyers search and ask AI in Indonesian ("asesmen berbasis game", "psikotes online", "aplikasi penilaian kinerja"). G4 covers the use-case pages and guides 1 and 2. When Phase 6 starts, ask Claude to add Indonesian versions of guides 3 to 7 too (keyword map `WEBSITE-PLAN.md` §9.1), checked by a native speaker (Q14). The Indonesian prompts in the monthly check show the gain.

---

## §S1 Structured data

All built in `src/lib/structured-data.ts`. Every URL is absolute from `siteUrl()`, and every value must be visible on the page it's on (Google's rule).

- **Stable IDs** link everything into one company record: `<site>/#organization` and `<site>/#website`. `WebSite.publisher`, each `SoftwareApplication.publisher`, and each Article's `publisher` and `author` point to the organization's `@id`.
- **Organization** gains:
  - `description`: Home's answer passage (§S2).
  - `foundingDate` "2022".
  - `areaServed`: the Country "Indonesia".
  - `knowsAbout`: game-based assessment, psychometric assessment, personality assessment, cognitive assessment, performance management, performance appraisal, talent mapping.
  - `address`: only while `showAddress` is on.
  - `sameAs` stays as it is (the owner's URLs only).
- **GBA `SoftwareApplication`** gains:
  - `featureList`: the four module names.
  - `offers`: none while the GBA page shows no price (round 4, 2026-10-27). If a price comes back, an `AggregateOffer` in IDR with only the prices the page shows (`lowPrice` the lowest price per candidate on the page).
  - `applicationSubCategory` "Assessment".
- **Enhance `SoftwareApplication`** gains `featureList`. No `offers`, because no price is public.
- **Client stories** get an `Article` with `headline`, `description`, `about` (the product) and `publisher`. The client's name only while its switch is on.
- **About** gets `AboutPage` with `mainEntity` → the organization's `@id`. **Contact** gets `ContactPage`.
- **Use-case pages:** `WebPage` with `about` → the product, plus `FAQPage` and `BreadcrumbList`.
- **Guides:**
  - `Article`: `headline`, `description`, `datePublished`, `dateModified`, `author` and `publisher` → the organization, `about` → the product.
  - Plus `FAQPage` and `BreadcrumbList`.
- Google shows FAQ rich results only for government and health sites since 2023, and dropped HowTo results. Keep FAQPage for the meaning it carries to AI tools; don't chase rich results.

## §S2 Answer passages

One self-contained paragraph of 40 to 70 words per page. AI tools lift passages like this into answers.

- **It must stand alone:** no "this" or "it" pointing outside the paragraph. It says what the thing is, who it's for, what makes it different, and names "DEUS" and "Indonesia".
- **Placement:**
  - It goes in the hero's supporting line only if it adds to the approved wording without replacing it.
  - Otherwise it opens the first section after the hero, in the existing body text style.
  - Never change a headline the owner approved. Record the placement in the commit body.
- **Each page's subject:**

| Page | It says |
|---|---|
| Home | DEUS Human Capital Services: Indonesian HR-tech company since 2022; game-based assessments for hiring and development, Enhance for linking performance to pay, Potentia for children's learning; 40+ brands across the industries listed |
| GBA | What game-based assessment is; the four modules; browser-based with no app; results the same or next day; for high-volume hiring and talent decisions; no price (round 4) |
| Enhance | People performance platform: KPIs and competencies, consistent calibration, results feed bonus and raise decisions; works alongside the existing HRIS |
| Solutions | The products in one paragraph, each with who it's for |
| About | Who DEUS is, when it started, what it builds, for whom; facts only from the page and the sources |
| Clients | Who uses DEUS: 40+ brands, the industries, the kind of programs (MT recruitment and so on), with names only where their switches allow |

## §S3 Buyer FAQ items

These are questions buyers type into AI tools. The first sentence of each answer answers it directly, in 40 to 80 words in total. At most 6 new items per page. They go into the existing FAQ, so FAQPage JSON-LD follows automatically. A question with no answer in the sources is left out and listed in `revisions3.0team/NEEDED-FROM-YOU.md`.

- **GBA candidates:**
  - How much does a game-based assessment cost? *(dropped in round 4: the GBA page shows no price)*
  - Is game-based assessment scientifically valid? (the four credibility pillars)
  - How is it different from a traditional psychometric test (psikotes)? (the pain points, "candidates can't fake how they play")
  - What can we use it for? (the use-case table; after G2, link the use-case pages)
  - How many candidates can it handle at once? (the Telkom numbers, anonymised while `telkomNamed` is off)
  - Which modules should we choose? (the use-case table's module pairings)
- **Enhance candidates:**
  - What is DEUS Enhance and who is it for?
  - How does calibration work in Enhance?
  - How long does setup take? (only if the sources say)
  - Where is our data stored? (Q18: only if answered)
  - Can managers and employees use it on their phones? (only if the sources say)

## §S4 GEO check script

Usage: `node scripts/check-geo.mjs <origin> [--prelaunch]`. It prints a pass or fail for each check and exits non-zero on any failure.

1. **robots.txt**, skipped with `--prelaunch`: no group that applies to `*`, Googlebot, Bingbot, OAI-SearchBot, ChatGPT-User, GPTBot, PerplexityBot, Perplexity-User, ClaudeBot, Claude-SearchBot, Claude-User, Google-Extended, Applebot-Extended or CCBot disallows `/`. The matching unit test for `src/app/robots.ts` asserts the same once `isIndexable()`.
2. **Every sitemap URL**, fetched with the user agents of Googlebot, Bingbot, OAI-SearchBot, ChatGPT-User, PerplexityBot, ClaudeBot and Applebot, answers 200 with HTML and no challenge page (no "Vercel Security Checkpoint", no captcha).
3. **The raw HTML** (no JavaScript run) contains the page's H1 and the text of every FAQPage question and answer in its JSON-LD. This proves the content is in the server HTML and that the markup matches what people see.
4. **Every JSON-LD block** parses, and each page carries the types §S1 gives it (a map in the script).
5. After G1.8: `/llms.txt` answers 200 as `text/plain`.

## §S5 llms.txt and IndexNow

- **`/llms.txt`**, in the llmstxt.org format:
  - `# DEUS Human Capital Services`, then a `>` line with Home's answer passage.
  - Then sections (Products, Use cases, Guides, Company), each a list of `- [Title](absolute URL): one-line summary`.
  - Built from the content registry and the sitemap's page list, so it never drifts. Section names come from `messages/en.json`.
  - Honest note: no major AI search engine has confirmed it reads llms.txt. It's here because it costs almost nothing and stays current by itself.
- **IndexNow** tells Bing (and through it Copilot, and reportedly ChatGPT search) about changed pages within minutes. Google doesn't use it.
  - The key file `public/<key>.txt` is public by design.
  - `scripts/indexnow.mjs <origin> [--dry-run]` reads `<origin>/sitemap.xml` and posts the list to `https://api.indexnow.org/indexnow`.
  - It refuses any origin other than `https://deushcs.com`, and refuses while `robots.txt` disallows all (before launch).
  - The release step in `CLAUDE.md` runs it after a production deploy succeeds.

## §S6 AI visibility check kit

- **`prompts.md`:**
  - 20 English questions: 5 about the brand ("What is DEUS Human Capital Services?"), 5 for the category ("best game-based assessment providers in Indonesia"), 5 problems ("how to screen 1,000 Management Trainee applicants fairly"), 3 comparisons ("alternatives to traditional psikotes for hiring") and 2 about Enhance ("performance appraisal software in Indonesia that links to bonuses").
  - The same ideas as 10 Indonesian questions, for measuring only.
- **`README.md`**, the monthly run in about 30 minutes:
  - Use a private window, logged out where possible. Ask every question in ChatGPT (search on), Gemini, Perplexity, Google AI Mode, Copilot, and as a normal Google search (note whether an AI Overview appears).
  - Record each answer in the scorecard.
  - Then note AI referrers in Vercel Analytics (chatgpt.com, perplexity.ai, gemini.google.com, copilot.microsoft.com, claude.ai) and Search Console's totals. AI Overviews and AI Mode clicks are counted inside Search Console's web totals and can't be separated.
- **`scorecard.csv`** columns: `date, engine, language, prompt, deus_mentioned (y/n), deushcs_linked (y/n), position (first / among others / no), competitors_named, sources_cited, notes`.

## §S7 Off-site checklist

Ordered by impact on being mentioned:

1. **LinkedIn company page:** complete, with About's answer passage, the website, industry and specialties. Post each guide there, and from a person's profile too (the owner's or a team member's): people's posts usually reach more buyers than a company page's.
2. **Google Business Profile:** Phase 7 already covers it; point to it, don't repeat it.
3. **Bing Webmaster Tools and Bing Places.**
4. **Ecosystem listings:** the Startup Studio Indonesia alumni page, Tech in Asia's company profile, Crunchbase, and any Komdigi listings. Correct or claim each one, with the same name, description and URL everywhere.
5. **Software listing sites** where Indonesian and regional HR buyers compare tools (for example G2, Capterra or GetApp; the task checks which are current). Reviews only from real clients, never written for them.
6. **Indonesian HR media, communities and events:** guest articles and news about real milestones (the Potentia launch at Komdigi; client programs only with permission). The task names current outlets and communities with links. Guide 7, built on DEUS's own numbers, is the strongest reason for an outlet to write about DEUS.
7. **Partner links back to deushcs.com:** deuspotentia.com, Level Up powered by Agate, UGM (Potentia), and @potentiabydeus's bio.
8. **Wikidata:** an item for DEUS only with independent published references (such as coverage of Startup Studio Indonesia Batch 6). Don't create a Wikipedia article: notability and conflict-of-interest rules make it likely to be deleted.
9. **News coverage list (R8):** each real article also earns a link from About when R8 is built.
10. **Same name everywhere:** "DEUS Human Capital Services (DEUS HCS)", the same one-paragraph description and `https://deushcs.com`.

## §S8 Use-case pages

Each is 600 to 900 words. Sections in order:

1. Hero: an H1 that says the search phrase, the answer passage (§S2 rules) and the CTA "Request a free trial".
2. The problem, from the relevant pain points.
3. How DEUS does it: which modules and why, with links to the GBA module sections.
4. How it runs: the four steps, adapted to the case.
5. Proof. While `showStories` is off (as now): the client logo wall and the "40+ brands" line, as on Home (`ProofRow` with `LogoWall`), and no story link. Once it's on: the Telkom story card where it fits (anonymised while `telkomNamed` is off), otherwise the "Read client stories" link. Never invent a client.
6. On the three GBA pages, the download offer (§S11), while `showSampleReport` is on.
7. FAQ: 3 to 5 items (§S3 rules).
8. The closing contact bar.

| Slug | H1 (search phrase) | Product | Main sources | Keywords (§9.1) |
|---|---|---|---|---|
| `management-trainee-assessment` | Management Trainee assessment | GBA | Use-case table: MT; Telkom story | management trainee assessment |
| `campus-recruitment-assessment` | Campus recruitment assessment | GBA | Use-case table: campus | campus recruitment, graduate screening |
| `talent-mapping` | Talent mapping and internal promotions | GBA | Use-case table: talent mapping, competency mapping, leadership identification, development programs; F16 "Promotions and rotations" | talent mapping, competency mapping |
| `performance-appraisal-and-pay` | Linking performance appraisal to pay | Enhance | `content/en/enhance.md`, brief §5.2 | performance management software Indonesia, KPI appraisal platform |

**Links in (G2.4):** the footer group, the GBA use-case cards, Enhance (appraisal-to-pay page), the Solutions page, and the Telkom story (Management Trainee page). **Links out:** the product page and the relevant guides (added in G3.4).

## §S9 Guides

**Layout:**
- Article width, as on the privacy page. H1, then the answer (2 to 3 sentences), then "Key points" (3 to 5 bullets).
- Right after the key points, one next step for readers who aren't ready to talk: the download offer (§S11) on guides 1 to 4 and 7 (while `showSampleReport` is off, a one-line link to the matching use-case page instead), and a one-line link to the Enhance page's call to action on guides 5 and 6.
- A "Last updated" date and the author (the company).
- Question-shaped H2s and at least one table, using the existing table component.
- An FAQ (3 to 5 items, using the existing accordion), Sources (outside links), one CTA to the matching product or use-case page, "Related guides", then the closing contact bar.
- The index at `/guides` lists the published guides with their answer line.

**Rules:**
- 1,200 to 2,000 words. Written for an HR head who knows the field.
- Examples that aren't real clients are labeled as examples.
- No statistic without a source. No keyword stuffing.
- Each guide says something a generic AI answer wouldn't: DEUS's own approach, process and facts.
- Guide 7 uses only the owner's numbers in `SEO/data/assessment-findings.md`. It says how many candidates, which period and how each number was counted, and names no client and nothing that identifies one. Original data is among what AI tools cite most (`SEO/seo-trends-2026-10.md`).

| # | Slug | Title | Main question | Links to |
|---|---|---|---|---|
| 1 | `what-is-game-based-assessment` | What is game-based assessment? A guide for HR teams in Indonesia | What it is, how it works, the science, when to use it | GBA |
| 2 | `game-based-assessment-vs-psychometric-tests` | Game-based assessment vs traditional psychometric tests | Comparison table: faking, drop-out, speed, scoring, candidate experience | GBA, Management Trainee page |
| 3 | `management-trainee-recruitment` | How to run Management Trainee recruitment at scale | Stages, volumes, timelines, which assessment where | Management Trainee page |
| 4 | `campus-recruitment-screening` | Campus recruitment: screening thousands of graduates fairly and fast | Fair ranking across universities, logistics | Campus page |
| 5 | `link-performance-appraisal-to-pay` | How to link performance appraisals to pay and bonuses | Frameworks, calibration, bands, pitfalls | Enhance, appraisal-to-pay page |
| 6 | `kpis-and-competencies-for-appraisal` | Setting KPIs and competencies for a fair performance appraisal | Building a framework when you don't have one yet (Enhance's FAQ) | Enhance |
| 7 | `game-based-assessment-findings-indonesia` | What our candidates showed us: findings from DEUS game-based assessments in Indonesia (final title follows the numbers) | DEUS's own combined numbers, such as completion, time taken and how results spread, by program | GBA, Management Trainee page |

## §S10 Where a lead came from

Today the form reads campaign tags (UTM) only from the address of the page it's on, and every product page's button goes to `/contact`. So a lead that started on another page arrives with no source, and its page reads `/contact`. A visitor who came from ChatGPT (it tags its links `utm_source=chatgpt.com`), read the GBA page and asked for a trial is saved as if they'd typed the address.

- **The first page of a visit is remembered.** On the first page view in a browser tab, `VisitSource` writes to `sessionStorage` (key `deus-visit`):
  - `landingPage`: that page's path as `sourcePage` stores it, without the query string.
  - `referrer`: the host name from `document.referrer` when it's another site (`chatgpt.com`, `www.google.com`, `www.linkedin.com`); empty when it's this site or missing. The host only, never the full address.
  - `utm_source`, `utm_medium` and `utm_campaign` from that page's address.
  - Later pages in the visit never overwrite it, and it ends when the tab closes. No cookie. If storage is blocked, nothing is stored and the form works as it does today.
- **The form** sends `landingPage` and `referrer` as hidden fields. Its UTM fields take the remembered tags first, then the current address's. Without script the form still posts, with these fields empty.
- **The server** checks `landingPage` like `sourcePage`, and `referrer` as a lower-case host name (letters, digits, dots and hyphens, up to 253 characters). Anything else is dropped, never an error. Both go into `extra` (`extra.landingPage`, `extra.referrer`): no migration, nothing to run on production.
- **The lead email** adds `First page: <landingPage>` and `Came from: <referrer>` under `Page:`, each only when it has a value.
- **Analytics:** `whatsapp_click` gets `from` (the remembered referrer, or `direct`), so WhatsApp enquiries can be counted by source too. `form_submit` stays as it is, since the lead itself now carries the source.
- **Privacy** (`src/content/en/privacy.ts`, "What we collect"): the first page of the visit and the name of the website that sent the visitor; and that WhatsApp click counts record that website's name. The header comment in that file lists where each kind of change goes.
- **Monthly check** (`SEO/ai-visibility/README.md`): a "Leads by source" step that counts the month's lead emails by their `Came from:` and `Campaign:` lines and Vercel's `whatsapp_click` events by `from`, and a fourth line in the summary.

## §S11 Download offer

A smaller step for visitors who aren't ready to ask for a trial: a PDF in exchange for name, work email and company. Each download is a warm lead to follow up.

- **The offer:** a sample GBA candidate report from the owner, with sample data only (never a real candidate's results), at `public/downloads/gba-sample-report.pdf`. `showSampleReport` stays off until that file is there; while it's off, the block renders nowhere.
- **The block** (`DownloadOffer`, `src/components/blocks/`): a card in the existing card style with a title, one line on what's inside, and a short form that is always open: name, work email, company and the consent checkbox, then one button ("Get the sample report"). Built from `LeadForm`'s parts; no styles beyond `DESIGN-GUIDE.md`.
- **The form** is a third `LeadForm` variant, `download`. It posts `formType` "contact", `productInterest` "gba" and `extra.offer` "gba-sample-report", so no migration. It doesn't ask for role, size or a message. The honeypot and rate limit apply as for every form.
- **When sent,** the success panel gives the download link (opens the PDF), "See it on your own candidates: Request a free trial" (`/contact?product=gba`) and the WhatsApp shortcut. The analytics event is `download` with `offer`.
- **The email** to sales has the subject `New lead: download · <company>` and a line `Downloaded: Sample GBA report`.
- **The file isn't secret.** It's linked only from the success panel, and `/downloads/` is served with `X-Robots-Tag: noindex` so search engines don't list it.
- **Where it goes:** the GBA page (just before the FAQ since round 4, because the Reports section is gone; the commit body records where), the three GBA use-case pages (§S8) and guides 1 to 4 and 7 (§S9).

## §S12 Indonesian pages

- **What's in Indonesian:** the four use-case pages, guides 1 and 2 with their index, Contact, and the shared strings they use. Every other `/id/` page still goes to its English page, as now (Privacy included, until Phase 6). The header's other links lead to English pages until then.
- **Language:** the glossary in `WEBSITE-PLAN.md` §6.4, "Anda", and `content/VOICE.md` where it applies. Product names stay in English (Game-Based Assessment, DEUS Enhance). English HR terms that Indonesian HR teams really use are fine (management trainee, KPI).
- **Search phrases** (from `WEBSITE-PLAN.md` §9.1). Where the table says "task picks", the task chooses the phrase Indonesian HR teams use and records why in the commit body:

| Page | H1 and answer passage use |
|---|---|
| Management Trainee | asesmen management trainee |
| Campus recruitment | rekrutmen kampus |
| Talent mapping | talent mapping (task picks the Indonesian phrase to pair with it) |
| Appraisal to pay | remunerasi berbasis kinerja, sistem appraisal karyawan |
| Guide 1 | asesmen berbasis game |
| Guide 2 | asesmen berbasis game and psikotes online |

- **Addresses:** the same slugs as English (`/id/solutions/management-trainee-assessment`), so the language switch keeps the path.
- **The switch:** `showIndonesianLeadPages`, on while building. These pages go live only after a native speaker (Q14) has read them; until then each release turns it off.
