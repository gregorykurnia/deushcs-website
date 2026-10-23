# GEO plan: getting DEUS into AI answers and search

*Written 2026-10-23. Background: `SEO/seo-trends-2026-10.md`.*

**Goal:** more inbound B2B visitors and leads. When an HR head asks Google, ChatGPT, Gemini, Perplexity or Copilot about game-based assessment, Management Trainee hiring or linking appraisals to pay, the answer should name DEUS and link to deushcs.com.

**Starting point:** Phase 7 of `IMPLEMENTATION_PLAN.md` already covers the technical basics: titles and descriptions, canonical URLs, sitemap, robots, Open Graph images, JSON-LD (Organization, WebSite, SoftwareApplication, FAQPage, BreadcrumbList), redirects from the old WordPress site, Search Console and Business Profile. This plan doesn't repeat any of that. All GBA module tabs and FAQ answers are already in the server HTML, so crawlers that don't run JavaScript can read them.

**What this plan adds:**
- **G1:** make the current pages easy for AI tools to read and quote, and start measuring.
- **G2:** four use-case pages.
- **G3:** a Guides section with six in-depth articles.
- **Owner's part:** off-site work (the biggest lever for being mentioned) and a monthly check.

**Owner's decisions (2026-10-23):** Guides and use-case pages: yes. **English first**: Indonesian versions wait for Phase 6, and the owner wants to be reminded (last line of this plan and `revisions3.0team/NEEDED-FROM-YOU.md` §8). Measuring: a monthly manual check, no paid tools.

**Defaults for everything else**, so no task stops to ask. The owner can change any of them before the run:

| Question | Default |
|---|---|
| AI crawlers, including the ones that collect training data (GPTBot, ClaudeBot, Google-Extended, Applebot-Extended, CCBot) | All allowed. Being in training data helps the assistants know DEUS without searching. |
| Who's named as the author of a guide | The company ("DEUS Human Capital Services"). A named person only after the owner says who. |
| Guide topics | The six in §S9 |
| New pages before the owner has approved their wording | Built on `staging` behind switches that are on (`showUseCases`, `showGuides`, and a `published` field per guide). Before a release, anything the owner hasn't approved gets its switch turned off. |
| Facts that are missing | Left out. The task adds a line to `revisions3.0team/NEEDED-FROM-YOU.md` and carries on. |
| Header menu | Unchanged. New pages are linked from the footer, the product pages and each other. |

**How to run it:**
- Unattended: `autorun all SEO/geo-implementation-plan.md` in the project folder, after `IMPLEMENTATION_PLAN.md`'s current tasks have finished (one folder, one run at a time).
- By hand: open Claude in the main folder and say "do the next task in `SEO/geo-implementation-plan.md`".
- Nothing here goes live until the owner says "release". Nothing here touches the `noindex` switch, so G1 to G3 can be built before or after launch.

**Rough cost:** about $29 for the 22 tasks at the model table's prices (G1 $12, G2 $8, G3 $9).

## Rules for every task

- **Read first:** the project `CLAUDE.md`, this section, and the § sections your task names.
- **Branch and checks:** work on `staging` in the main folder. Run the checks in `CLAUDE.md` step 1: the smoke spec, plus the spec of each page the task changes. Run the full suite only in a "G*n* end-to-end" task. Lead-form e2e tests fail on this server because it has no `.env` files (`DATABASE_URL_POOLED is not set`). That's the environment, not the code: name those tests in the report and carry on.
- **Ticking:** tick the task's line in this file only (not `IMPLEMENTATION_PLAN.md` or `LANES.md`), in the same commit as the work. Then commit and push.
- **Facts:** only from `Creating DEUS HCS Website.md`, `content/en/*.md` and the approved decisions in `postpushrevisions1.1/`, `postpushrevisions2.0/` and `revisions3.0team/`. Never invent clients, numbers, quotes, dates or awards.
  - Every `siteFlags` switch (`src/content/flags.ts`) applies to new copy too. While a switch is off, its fact stays out: Telkom stays "a national telecom group" while `telkomNamed` is off, and there's no minimum order (`showMinimumOrder`) and no "5 to 10 times" (`showBadHireCost`).
  - Never bring back anything the owner cut (for example Recognition, D2) or reword headings that are still waiting for the owner's approval (the GBA headings, D9).
- **General claims** (what the Big Five is, what an assessment-centre study found) need a reputable source that the writer actually opened, linked in the copy's Sources list. No statistic without a source.
- **Copy:** change the Markdown in `content/en/` first, then the content module. Follow `content/VOICE.md`: American English, sentence case, none of its banned words. English only.
- **Look:** `DESIGN-GUIDE.md` is binding. Use existing components and tokens. Any visual change gets screenshots at 390 and 1280.
- **Off limits:** `isIndexable()`, the `noindex` logic, canonical URLs and redirects stay as they are.
- **No tricks:** nothing hidden from people, no content shown only to bots, no keyword lists.

## Phase G1: Make the current pages easy for AI to quote, and start measuring

- [ ] G1.1 AI visibility check kit: write `SEO/ai-visibility/README.md`, `SEO/ai-visibility/prompts.md` and `SEO/ai-visibility/scorecard.csv` as §S6 says. Done when the three files exist, the prompt list has 20 English and 10 Indonesian questions, and the README explains the 30-minute monthly run and how to read the AI referrers in Vercel Analytics and Search Console (Markdown and CSV only, so no code checks) · Sonnet 5.5 High: judgment about what buyers really ask, no code.
- [ ] G1.2 Off-site checklist: write `SEO/off-site-checklist.md` as §S7 says. Use web search to find the current Indonesian HR media, communities, directories and software listing sites, and open every link to confirm it works. Done when each item has why it matters, the link, what to write (reusing the site's own approved wording) and the owner as the one who does it (Markdown only) · Sonnet 5.5 High: research and judgment.
- [ ] G1.3 GEO check script: `scripts/check-geo.mjs` and `tests/unit/check-geo.test.ts`, built like `scripts/check-launch.mjs` and `tests/unit/check-launch.test.ts`. Read §S4, `src/app/robots.ts`, `src/app/sitemap.ts` and `src/lib/structured-data.ts`, and add the robots unit test §S4 names. Done when the unit tests pass and `node scripts/check-geo.mjs <local production build> --prelaunch` passes. A page whose FAQ text is missing from its raw HTML must fail; prove that once with a unit test. Stop the server by its PID afterwards · Sonnet 5.5 High: a script with tests, following an existing one.
- [ ] G1.4 Structured data upgrade: `src/lib/structured-data.ts`, its callers under `src/app/[locale]/` and `tests/unit/structured-data.test.ts`. Read §S1. Done when unit tests cover every new field and the `@id` links, `check-geo.mjs --prelaunch` passes on a local production build, and every value in the JSON-LD is also visible on its page · Opus 5.5 Medium: mistakes here are silent; unit-tested judgment.
- [ ] G1.5 GBA page answer passage and buyer FAQ: `content/en/game-based-assessment.md`, then `src/content/en/game-based-assessment.ts` (and the page, only if the passage needs a slot). Read §S2 and §S3. Done when the passage and 4 to 6 new FAQ items are on the page, the commit body lists the source of every fact, `tests/e2e/gba.spec.ts` and the smoke spec pass, and screenshots at 390 and 1280 show no layout change beyond the new text · Opus 5.5 High: buyer-facing copy where an invented fact would go unnoticed.
- [ ] G1.6 Enhance page answer passage and buyer FAQ: `content/en/enhance.md`, then `src/content/en/enhance.ts` (`ENHANCE-CONTENT.md` stays untouched). Read §S2 and §S3. Done when the passage and 3 to 5 new FAQ items are on the page, the commit body lists the source of every fact, `tests/e2e/enhance.spec.ts` and the smoke spec pass, and screenshots at 390 and 1280 show no layout change beyond the new text · Opus 5.5 High: same as G1.5.
- [ ] G1.7 Answer passages on Home, Solutions, About and Clients: their Markdown in `content/en/`, then their modules in `src/content/en/`. Read §S2. Done when each page has its passage, the commit body lists the source of every fact, the four pages' specs (`home`, `solutions`, `about`, `clients`) and the smoke spec pass, and screenshots at 390 and 1280 show no layout change beyond the new text · Opus 5.5 High: positioning copy on the main pages.
- [ ] G1.8 llms.txt and IndexNow: `src/app/llms.txt/route.ts`, a key file in `public/`, `scripts/indexnow.mjs`, unit tests, one line in `CLAUDE.md` "Releasing to production" step 5, and an llms.txt check in `scripts/check-geo.mjs`. Read §S5. Done when `/llms.txt` on a local production build lists every sitemap page with its one-line summary, and `node scripts/indexnow.mjs https://deushcs.com --dry-run` prints the URL list and sends nothing. The script must refuse any other origin; prove that with a unit test · Haiku 5.5 Max: small, fully specified wiring.
- [ ] G1.9 Phase G1 end-to-end check: build once, then run the full e2e suite once (`npm run test:e2e`), `scripts/check-geo.mjs --prelaunch` and `scripts/check-launch.mjs --prelaunch` against the local production build. Save the failure list first. Fix what G1 caused and rerun only the failed tests (`--last-failed`). Done when nothing caused by the code is left failing; the commit body lists the results and any environment failures · Sonnet 5.5 High: runs and triages.
- [ ] Phase G1 review: read G1's whole diff. Check every new sentence against the sources (nothing invented, switches respected, nothing the owner cut comes back, `content/VOICE.md` followed). Check that the JSON-LD matches what each page shows, and that nothing touched `noindex`, canonical URLs or redirects. Take screenshots of the changed pages at 390 and 1280. Fix what you find and rerun only what the fixes touch. Any open item goes to a fix task or to `revisions3.0team/NEEDED-FROM-YOU.md` · Opus 5.5 High: the last look before this copy can go live, where these faults are silent.

## Phase G2: Use-case pages

- [ ] G2.1 Use-case copy: write `content/en/use-cases/<slug>.md` for the four pages in §S8, with every section §S8 lists and a Sources note at the end of each file (dropped from the modules, like `> Note:` lines). Done when the four files exist and every fact traces to a source (Markdown only) · Opus 5.5 High: new buyer-facing copy, facts only.
- [ ] G2.2 Use-case template and the Management Trainee page: a collection like the client stories (`src/content/stories/`, `storiesIn`): `src/content/use-cases/` with `useCasesIn(locale)` and the `showUseCases` switch in `src/content/flags.ts`. Also the route `src/app/[locale]/solutions/[slug]/page.tsx` (static params only), built from existing blocks, with `pageMetadata`, an Open Graph image, JSON-LD (§S1: WebPage, FAQPage, BreadcrumbList Home › Solutions › page) and sitemap entries through `sitemapEntries`. Read §S8, `DESIGN-GUIDE.md` and the Telkom story's page and registry. Done when the Management Trainee page renders, unit tests show the sitemap lists use cases only while `showUseCases` is on, a new `tests/e2e/use-cases.spec.ts` passes, and screenshots at 390 and 1280 follow the guide · Sonnet 5.5 xHigh: a new page layout with no mockup.
- [ ] G2.3 Campus recruitment, talent mapping and appraisal-to-pay pages: convert their Markdown into `src/content/en/use-cases/*.ts`, register them, and extend `tests/e2e/use-cases.spec.ts` to all four pages with one parameterised test. Done when the four pages render and that spec passes · Haiku 5.5 Max: repeats the page G2.2 built.
- [ ] G2.4 Links into the use-case pages: a "Use cases" group in the footer, the GBA page's use-case cards (each links to its page where one exists), one link from Enhance to the appraisal-to-pay page, the Solutions page, and the Telkom story to the Management Trainee page. Read §S8's link list. Done when every link answers 200, and the specs for those pages (`closing-footer`, `gba`, `enhance`, `solutions`, `story`) pass · Sonnet 5.5 High: shared footer and several pages.
- [ ] G2.5 Phase G2 end-to-end check: build once, then run the full e2e suite once and `scripts/check-geo.mjs --prelaunch`, and take screenshots of the four pages at 390 and 1280. Fix what G2 caused and rerun only the failed tests. Done when nothing caused by the code is left failing · Sonnet 5.5 High: runs and triages.
- [ ] Phase G2 review: read G2's diff. Check facts and switches as in the G1 review, check that the page design follows `DESIGN-GUIDE.md`, that turning `showUseCases` off removes the pages, links, sitemap entries and llms.txt lines, and that `/id/solutions/<slug>` goes to the English page. Fix, then rerun only what the fixes touch · Opus 5.5 High: new public pages.

## Phase G3: Guides

- [ ] G3.1 Copy for guides 1 and 2: write `content/en/guides/<slug>.md` for the first two topics in §S9, with web research for the outside sources (open each one). Done when both files have every part §S9 lists, each is 1,200 to 2,000 words, every DEUS fact traces to a source, and every outside claim has a link (Markdown only) · Opus 5.5 High: long-form writing where invented facts are the main risk.
- [ ] G3.2 Guides section with guides 1 and 2: `src/content/guides/` (a registry with a `published` field per guide, and the `showGuides` switch), `src/app/[locale]/guides/page.tsx` and `src/app/[locale]/guides/[slug]/page.tsx` in the article layout §S9 describes, JSON-LD (§S1: Article, FAQPage, BreadcrumbList), sitemap entries, Open Graph images, a "Guides" footer link, and guides 1 and 2 as modules. Done when unit tests show unpublished guides are left out of the index, sitemap and llms.txt, a new `tests/e2e/guides.spec.ts` passes, and screenshots at 390 and 1280 follow the guide · Sonnet 5.5 xHigh: a new article layout with no mockup.
- [ ] G3.3 Copy for guides 3 to 6: `content/en/guides/<slug>.md` for the other four topics in §S9, under the same rules as G3.1. Done as in G3.1 (Markdown only) · Opus 5.5 High: same as G3.1.
- [ ] G3.4 Guides 3 to 6 on the site, and links to the guides: convert them into modules and register them. Then add one "Related guide" link with the existing link component on the GBA page, the Enhance page and each use-case page (§S9's link list). Done when all six guides render, `tests/e2e/guides.spec.ts` covers all six, and the specs for the pages that got a link pass · Haiku 5.5 Max: copying Markdown into modules and small wiring.
- [ ] G3.5 Phase G3 end-to-end check: build once, then run the full e2e suite once and `scripts/check-geo.mjs --prelaunch`, and take screenshots of the index and two guides at 390 and 1280. Fix what G3 caused and rerun only the failed tests. Done when nothing caused by the code is left failing · Sonnet 5.5 High: runs and triages.
- [ ] Phase G3 review: read G3's diff. Check every DEUS fact against the sources and every outside claim against its link (open a sample of them), check that the Article JSON-LD matches the page, that unpublishing a guide removes every trace of it, and that the guides read like `content/VOICE.md` and not like generic AI text. Fix, then rerun only what the fixes touch · Opus 5.5 High: long copy going public under the company's name.

## The owner's part

- [ ] *Owner, now:* run the first monthly check from `SEO/ai-visibility/README.md` once G1.1 is done. That's the baseline: what AI tools say about DEUS before any of this goes live.
- [ ] *Owner, now:* in Vercel → Firewall, check that no bot rule blocks AI crawlers (the "AI Bots" managed rule off, or set to log only). After launch, `node scripts/check-geo.mjs https://deushcs.com` confirms it.
- [ ] *Owner, from now on:* work through `SEO/off-site-checklist.md` from the top. The LinkedIn company page comes first. Send its URL so it goes into `sameAs`.
- [ ] *Owner, before each release that carries G1 to G3 work:* read the new copy in the review screenshots or on a local production build. Anything not approved yet: tell Claude "hold <page>" and it turns that page's switch off for the release.
- [x] *Owner, after launch (7.6):* *(done 2026-10-23)* Bing Webmaster Tools → "Import from Google Search Console", then submit the sitemap there too (Copilot, and reportedly ChatGPT search, use Bing's index). IndexNow then runs at every release (G1.8).
- [ ] *Owner, monthly:* the 30-minute AI visibility check, plus Search Console and Vercel Analytics referrers. Ask Claude to add a short `SEO/ai-visibility/<yyyy-mm>.md` summary with three next actions.
- [ ] *Owner, every three months:* ask Claude to refresh the guides' facts and their "Last updated" dates, and to write a new `SEO/seo-trends-<yyyy-mm>.md`.
- [ ] *Owner, reminder:* **Indonesian GEO.** Most buyers search and ask AI in Indonesian ("asesmen berbasis game", "psikotes online", "aplikasi penilaian kinerja"). When Phase 6 starts, ask Claude to add Indonesian versions of the use-case pages and guides (keyword map `WEBSITE-PLAN.md` §9.1), checked by the native reviewer (Q14), and the Indonesian prompts in the monthly check will show the gain.

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
  - `offers`: an `AggregateOffer` in IDR, but only with the prices the page shows (`lowPrice` the lowest price per candidate on the page).
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
| GBA | What game-based assessment is; the four modules; browser-based with no app; results the same or next day; for high-volume hiring and talent decisions; starting price as the page shows it |
| Enhance | People performance platform: KPIs and competencies, consistent calibration, results feed bonus and raise decisions; works alongside the existing HRIS |
| Solutions | The products in one paragraph, each with who it's for |
| About | Who DEUS is, when it started, what it builds, for whom; facts only from the page and the sources |
| Clients | Who uses DEUS: 40+ brands, the industries, the kind of programs (MT recruitment and so on), with names only where their switches allow |

## §S3 Buyer FAQ items

These are questions buyers type into AI tools. The first sentence of each answer answers it directly, in 40 to 80 words in total. At most 6 new items per page. They go into the existing FAQ, so FAQPage JSON-LD follows automatically. A question with no answer in the sources is left out and listed in `revisions3.0team/NEEDED-FROM-YOU.md`.

- **GBA candidates:**
  - How much does a game-based assessment cost? (the prices the page shows)
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

1. **LinkedIn company page:** complete, with About's answer passage, the website, industry and specialties. Post each guide there.
2. **Google Business Profile:** Phase 7 already covers it; point to it, don't repeat it.
3. **Bing Webmaster Tools and Bing Places.**
4. **Ecosystem listings:** the Startup Studio Indonesia alumni page, Tech in Asia's company profile, Crunchbase, and any Komdigi listings. Correct or claim each one, with the same name, description and URL everywhere.
5. **Software listing sites** where Indonesian and regional HR buyers compare tools (for example G2, Capterra or GetApp; the task checks which are current). Reviews only from real clients, never written for them.
6. **Indonesian HR media, communities and events:** guest articles and news about real milestones (the Potentia launch at Komdigi; client programs only with permission). The task names current outlets and communities with links.
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
5. Proof: the Telkom story card where it fits (anonymised while `telkomNamed` is off). Otherwise the "Read client stories" link. Never invent a client.
6. FAQ: 3 to 5 items (§S3 rules).
7. The closing contact bar.

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
- A "Last updated" date and the author (the company).
- Question-shaped H2s and at least one table, using the existing table component.
- An FAQ (3 to 5 items, using the existing accordion), Sources (outside links), one CTA to the matching product or use-case page, "Related guides", then the closing contact bar.
- The index at `/guides` lists the published guides with their answer line.

**Rules:**
- 1,200 to 2,000 words. Written for an HR head who knows the field.
- Examples that aren't real clients are labeled as examples.
- No statistic without a source. No keyword stuffing.
- Each guide says something a generic AI answer wouldn't: DEUS's own approach, process and facts.

| # | Slug | Title | Main question | Links to |
|---|---|---|---|---|
| 1 | `what-is-game-based-assessment` | What is game-based assessment? A guide for HR teams in Indonesia | What it is, how it works, the science, when to use it | GBA |
| 2 | `game-based-assessment-vs-psychometric-tests` | Game-based assessment vs traditional psychometric tests | Comparison table: faking, drop-out, speed, scoring, candidate experience | GBA, Management Trainee page |
| 3 | `management-trainee-recruitment` | How to run Management Trainee recruitment at scale | Stages, volumes, timelines, which assessment where | Management Trainee page |
| 4 | `campus-recruitment-screening` | Campus recruitment: screening thousands of graduates fairly and fast | Fair ranking across universities, logistics | Campus page |
| 5 | `link-performance-appraisal-to-pay` | How to link performance appraisals to pay and bonuses | Frameworks, calibration, bands, pitfalls | Enhance, appraisal-to-pay page |
| 6 | `kpis-and-competencies-for-appraisal` | Setting KPIs and competencies for a fair performance appraisal | Building a framework when you don't have one yet (Enhance's FAQ) | Enhance |
