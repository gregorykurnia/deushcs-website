# DEUS HCS Website: Website Plan

**Status:** Draft v0.5 (2026-10-14). v0.5: visual direction changed to **Daylight** (chosen from three mockups in `design-directions/`): light surfaces only, Manrope, no dark sections, no device frames; nav order is now Solutions · Clients · Science · About. `DESIGN-GUIDE.md` now documents Daylight (v1, 2026-10-14). v0.4: Potentia lives on its own site, deuspotentia.com; this site links to it and no longer has Potentia pages. v0.3: full page copy written in `content/` (see below), with a voice guide; Home headline changed to "Hire on evidence. Reward on evidence." v0.2: all client stories (Telkom, Calvin Christian School) and their numbers move to one **Clients** section; Home keeps a client logo band; a project list is planned inside Clients. Not yet approved.

**Decisions so far**
- 2026-10-14: Client stories, their statistics and their quotes live only in the Clients section (§5.8). Product pages and Home link to it but don't repeat the numbers. Home may show the client logo wall and the company-wide "40+ brands". A project list comes later, also inside Clients.
- 2026-10-14: The visual direction is **Daylight v2** (`design-directions/c-daylight-v2.html`). Every page is light; there are no dark sections. Screenshots float over the sky gradient instead of sitting in device frames. Sample people and scores in mockups are placeholders until approved sample data exists.
- 2026-10-14: Potentia has its own website, **deuspotentia.com** (Indonesian only for now). deushcs.com introduces Potentia briefly and links out to it; it has no Potentia pages, forms or checkout of its own. The Calvin Christian School story stays in Clients here.

**Companion files**

| File | Role | Wins on |
|---|---|---|
| `Creating DEUS HCS Website.md` ("the brief") | Facts: company, products, proof, contacts, open questions | Everything factual, except Enhance copy |
| `DESIGN-GUIDE.md` | The Daylight visual system (tokens, type, components, motion), written from `design-directions/c-daylight-v2.html` | Everything visual. Where brief §8 or `Reference Design Guide.md` (the older deck-based guide) differ, the guide wins |
| `ENHANCE-CONTENT.md` | Approved Enhance copy, word for word from the First Contact deck | Enhance copy. It is newer than brief §5.2: it adds "Fragmented review" as problem 03 and makes "Turn results into decisions" the closing card instead of step 06 |
| `ENHANCE-PAGE-SPEC.md` | The expanded Enhance page: structure, screen mapping, form fields, draft Indonesian | The Enhance page build |
| `content/VOICE.md` | How DEUS sounds: rules, banned words, before/after examples | All copy |
| `content/en/*.md`, `content/id/*.md` | The finished copy for every page, ready for review. English for corporate pages; Indonesian for the Calvin story | Page wording. This plan stays the source for page structure |

**Rules carried over from the brief:** never invent client names, numbers, certifications or testimonials. Copy written for this plan is marked *(new)* and needs a DEUS review. Facts that need confirming are marked **[VERIFY]**.

---

## 1. What the website must do

| # | Goal | How we'll know |
|---|---|---|
| 1 | **Generate qualified B2B leads**: demo / free-trial requests for assessments, 30-minute appraisal-review calls for Enhance | Form submissions and WhatsApp clicks per month, by product |
| 2 | **Make DEUS credible to large Indonesian corporates and BUMN**: the science, the client stories, the recognition | Time on product pages; sales team says prospects arrive "warm" |
| 3 | **Replace the PDF decks as the thing sales sends after a call.** Each product page must work on its own, top to bottom, as a "first contact deck" with the contact step at the end | Sales uses page links instead of attachments |
| 4 | **Send parents and schools to Potentia's own site** (deuspotentia.com) with a short, clear introduction | Outbound clicks to deuspotentia.com |
| 5 | **Be bilingual-ready from day one**, even if the second language ships later | Adding a language is a translation job, not a rebuild |

**Not in v1:** client login portal, online payment, blog, careers. Each is listed under §12 Later.

---

## 2. Audiences and how they arrive

Builds on brief §7. The key addition is **how people arrive**, because it changes what each page must do.

| Audience | Usually arrives from | Must come away believing | Lands on | Primary CTA |
|---|---|---|---|---|
| HR heads, talent acquisition (large corporates, BUMN) | Sales follow-up link, LinkedIn, Google ("asesmen berbasis game") | "This is scientifically sound, works at our scale, and candidates like it" | Game-Based Assessment, Science, Clients (Telkom story) | Request a demo / free trial |
| Recruiters running MT and campus drives | Link from their HR head; Google ("asesmen management trainee") | "Bulk upload, auto reports, results in a day" | GBA (CMS + Reports sections) | Request a demo |
| C-suite, Finance, Plant & Ops leaders | Sales link, referral | "Performance and pay will finally be connected, without replacing our HRIS" | Enhance | Book a 30-minute appraisal review |
| HR running appraisal cycles | Google ("aplikasi penilaian kinerja", "software KPI") | "One framework, calibration that's consistent, less spreadsheet work" | Enhance | Book a 30-minute appraisal review |
| Parents | WhatsApp share, Instagram @potentiabydeus, school | "This understands my child, isn't a scary test, and gives me something to do next" | Potentia card or band on Home → deuspotentia.com | Visit Potentia (external) |
| Schools, principals, teachers | School network, Potentia launch coverage | "Classroom dashboard helps differentiated teaching" | Clients (Calvin story) → deuspotentia.com | Register the school on deuspotentia.com |
| Partners, press, investors | Komdigi / Startup Studio, events | "Real company, real milestones" | About | Contact |

**Implication:** most B2B visitors land on a **product page, not Home**. Every product page carries its own case (problem, solution, science), its own CTA and the contact bar at the end, so it never depends on Home having been read. Client stories stay in the Clients section; a product page points to the relevant story with one small link card (e.g. "See how a national telecom group ran its MT recruitment →") rather than repeating its numbers.

---

## 3. Positioning and messaging

### 3.1 The company story in one line

DEUS helps organisations see their people clearly at the two moments that matter most: **when choosing them** (assessment) and **when growing and rewarding them** (performance). Potentia applies the same science to children.

This turns four separate products into one story, **"from hire to reward"**:

| Stage | Question the client has | DEUS answer |
|---|---|---|
| **Hire** | Who should we bring in? | Game-Based Assessment: Discover (personality) + Next Chapter (cognitive, neuro, simulation) |
| **Develop** | Where is our hidden potential? Who's ready to lead? | The same assessments for competency mapping, talent mapping, leadership identification (brief §5.1 use cases) |
| **Perform and reward** | Are we rating fairly, and paying for real performance? | Enhance |
| *Education (sub-brand)* | How does my child learn best? | Potentia by DEUS |

### 3.2 Headline options for Home

| EN | ID (draft) | Source |
|---|---|---|
| Reveal real potential through play. | Asesmen berbasis game yang mengungkap potensi sebenarnya. | Brief §9 |
| People are your most important asset. See them clearly. *(new, second sentence)* | Manusia adalah aset terpenting Anda. Kenali mereka dengan jelas. | Brief §1 positioning + new |
| From the first assessment to the last bonus decision. *(new)* | Dari asesmen pertama hingga keputusan bonus terakhir. | New, from §3.1 |

| Hire on evidence. Reward on evidence. *(new, v0.3)* | Rekrut berdasarkan bukti. Beri penghargaan berdasarkan bukti. | New |

**Chosen for the copy (v0.3):** "Hire on evidence. Reward on evidence." It covers both product families in five words and sets up the page's argument. The "first assessment to last bonus decision" line becomes the heading of the Home "Where we help" section. "Reveal real potential through play" stays as the Game-Based Assessment hero.

### 3.3 Company-level pillars ("Why DEUS")

All four come from facts in the brief, regrouped for the whole company rather than for GBA only:

| # | Pillar | Proof behind it |
|---|---|---|
| 01 | **Evidence over gut feel** | Games, KPIs and minigames scored one structured way for everyone; Enhance replaces "memory or gut feel" with mapping |
| 02 | **Fits what you already use** | GBA and Potentia play in a browser on a phone or laptop, no app; Enhance works alongside the HRIS, ERP and payroll already there |
| 03 | **Ready for volume** | GBA CSV upload and automatic invitations; Enhance tracks every plant and branch in one place; Potentia's classroom dashboard; results calculated by the system |
| 04 | **A partner, not just a vendor** | Free trial or pilot (GBA), appraisal review first, KPI framework design, training, post-cycle review (Enhance), one-on-one consultation for parents (Potentia) |

Since R14b (team feedback F54–F57, 2026-10-22) each pillar holds for every product; the wording is in `content/en/home.md` §9.

### 3.4 Voice

Full rules in `content/VOICE.md`. In short, from brief §8 and the decks. Corporate pages: confident, concise, evidence-led, no hype, short declarative headlines, Title Case in English and sentence case in Indonesian. Corporate Indonesian addresses the reader as **"Anda"**. Potentia: warm, parent-to-parent Indonesian using **"kita"**, never clinical.

---

## 4. Information architecture

### 4.1 Sitemap

Every page lives under a locale prefix (`/en/…`, `/id/…`). Slugs are English in both languages for v1 (simpler; localised slugs can come later).

```
/                                   → redirects to /id or /en (browser language, then the default locale)
/[locale]                           Home
/[locale]/solutions                 Solutions overview (all four, grouped Assess / Perform / Education)
/[locale]/solutions/game-based-assessment   GBA umbrella: modules, CMS, reports, use cases, process, pricing logic
/[locale]/solutions/discover        Personality module (DEUS Discover)
/[locale]/solutions/next-chapter    Cognitive + Neuro + Simulation modules      [VERIFY public name]
/[locale]/solutions/enhance         People Performance Platform  → ENHANCE-PAGE-SPEC.md
/[locale]/science                   Superseded by R6 (F28): redirects to the GBA page's #science
/[locale]/clients                   Clients hub: logo wall, industries, every client story (and later the project list)
/[locale]/clients/telkom-group      Telkom Group: MT recruitment story           [VERIFY permission]
/[locale]/clients/calvin-christian-school   Calvin Christian School: Potentia story   [VERIFY permission]
/[locale]/clients/projects          Project list (later, see §5.8)
/[locale]/about                     Story, vision/mission, the 6 I's, timeline, team
/[locale]/contact                   Form + WhatsApp + email (+ address)
/[locale]/privacy                   Privacy policy (needed: forms collect personal data)

External: Potentia → https://deuspotentia.com (its own site, Indonesian only for now)
```

`/pricing` is **not** a page by default (see open question Q5). Pricing logic lives on the GBA page.

### 4.2 Header

| Left | Centre | Right |
|---|---|---|
| Logo tile + "DEUS" | **Solutions** (mega menu) · **Clients** · **Science** · **About**, in a white pill group | Language switch `EN / ID` · **Contact** (text link) · **Request a demo** (navy pill) |

**Solutions mega menu**, grouped by the story in §3.1:

| Assess (hire and develop) | Perform and reward | For families and schools |
|---|---|---|
| Game-Based Assessment: overview | DEUS Enhance | Potentia by DEUS ↗ (deuspotentia.com, opens in a new tab) |
| DEUS Discover: personality | | |
| Next Chapter: cognitive, neuro, simulation | | |

Behaviour: transparent over the hero, then white at about 72% + blur + bottom hairline once scrolled; the active link is filled navy inside the pill group. On product pages the CTA changes to match the page: "Request a free trial" (GBA, Discover, Next Chapter, as in §8.3; confirmed by the owner 2026-10-15), "Book a 30-min call" (Enhance). Science keeps "Request a demo".

**Mobile:** logo, CTA pill, menu button. The menu opens a full-height sheet with the same three groups, the language switch and the contact chips.

### 4.3 Footer

Four columns on white, then a bottom row:
1. Logo, one-line description, contact chips (WhatsApp, email), social links [VERIFY].
2. Solutions: the four products.
3. Company: About, Clients, Science, Contact.
4. Legal: Privacy policy, "PT Investama Persada Kurnia", address [VERIFY].

Bottom row: "© 2026 DEUS Human Capital Services" left, the language links ("English / Bahasa Indonesia") right, in normal sentence case.

### 4.4 Persistent elements

- **Floating WhatsApp button** on every page, bottom right. Its prefilled message depends on the page (§8.2). Hidden while the contact bar at the end of the page is on screen, so there aren't two.
- **Closing CTA section** (two-beat closer + contact bar) at the end of every page except Contact and Privacy.

---

## 5. Page-by-page plan

Each page lists its sections in order, with its surface (White; Cloud = the soft grey-blue alternate; Sky = the Daylight gradient panel, used only for hero windows and the closing panel; Warm = the Potentia band), the source, and what's missing. There are no dark surfaces. Copy status: **Ready** (approved source copy), **From brief** (facts exist, needs light writing), **New** (needs writing and review).

### 5.1 Home

Purpose: orient in 10 seconds, show the two product families, prove credibility, route each audience onward.

| # | Section | Surface | Content | Status |
|---|---|---|---|---|
| 1 | **Hero** | White + Sky window | Centered H1 per §3.2, lede (the About paragraph, shortened), CTAs: Request a demo · Explore solutions. Below: the sky window following one person from first game (Discover) to hire to first appraisal and bonus (Enhance), on a timeline | From brief |
| 2 | **Client logos** | White | "Trusted by 40**+** brands" + the client logo wall (approved logos only, Q8) + a "See client stories →" link to /clients. No client statistics here. Until logos are approved: the "40+ brands" stat with the six industries instead | From brief |
| 3 | **From hire to reward** | White | The three stages from §3.1 (Hire → Develop → Perform and reward) as tabs; each tab names its products and swaps the product screen beside it | New |
| 4 | **Solutions** | Cloud | Three cards of the same size in one row since R14a (F50): Game-Based Assessment, DEUS Enhance, and Potentia in the warm skin linking out | Ready |
| 5 | ~~Assessment spotlight~~ | | Cut in R14a (D1, 2026-10-22): section 4's cards already introduce each product | Removed |
| 6 | ~~Enhance spotlight~~ | | Cut in R14a (D1, 2026-10-22) | Removed |
| 7 | **Why DEUS** | White | The four pillars from §3.3, as soft cloud panels with line icons | New (from facts) |
| 8 | **Industries and recognition** | Cloud | Industry row (Retail, Telecommunications, Education, FMCG, F&B, Electronics) + recognition row (Startup Studio Indonesia Batch 6, Innovfest by NUS x AsiaTech, Tech in Asia; UGM off since 2026-10-16, F8) | From brief |
| 9 | ~~Potentia band~~ | | Cut in R14a (D1, 2026-10-22), with its Indonesian copy (F53); Potentia stays as section 4's third card | Removed |
| 10 | **Closer** | Sky (closing panel) | "Ready to transform / with DEUS?" + contact bar | Ready (ID exists: "Siap bertransformasi / dengan DEUS?") |

### 5.2 Solutions overview

A short index page (useful on mobile and for search): hero ("Solutions"), the three groups from the mega menu as large cards, a "Not sure where to start?" block linking to Contact. Status: New, short.

### 5.3 Game-Based Assessment (umbrella)

Purpose: the full case for DEUS assessments; the page sales links most. Surface: White and Cloud alternating. The game screenshots and product UI carry the "tech/game" mood (brief §8), so there are no dark sections.

| # | Section | Surface | Content (brief §5.1) |
|---|---|---|---|
| 1 | Hero | White + Sky window | "Reveal real potential through play." Lede on modular suite. CTAs: Request a free trial · Request a demo. Game screens floating in the sky window |
| 2 | The problem | Cloud, 2×2 panels | The 4 pain points + teaser card |
| 3 | Three pillars | White | Real behaviour signals · Scientifically grounded · Enterprise-ready |
| 4 | Four modules | White | Personality, Cognitive, Neuro, Simulation as cards; each links to its anchor on Discover / Next Chapter. "Deploy one, combine two, or run the full suite" |
| 5 | Use cases | Cloud | The 6 use cases (MT recruitment, competency mapping, leadership identification, internal talent mapping, campus recruitment, talent and development), each naming the recommended modules |
| 6 | Reports | White | Tabs: Individual / Batch / Interactive live. Each tab: contents, who it's for, format, screenshot (auto-scroll for tall reports) |
| 7 | How it works | Cloud | Since R15b (F70, D7): the 4 steps, then the former "Smooth adoption" (Free trial · Pilot first · No long-term contract · Mix and match modules) in a white panel with a "Request a free trial" button. The chips are gone |
| 8 | Pricing logic | White | Per Q5. Default: "Starting from Rp69.000 per candidate" + "Pay per candidate, combine modules, volume pricing above 250 candidates" + Contact sales |
| 9 | Behind the results | Cloud | Since R15b (F70, D7): one section, three tabs: Platform (the 6 CMS features + screenshot), Science (as R6 built it; `#science` opens this tab) and Before and after (the 4 impact items + the ROI line [VERIFY]). Each tab keeps its former heading as an H3 |
| 10 | Client stories link | White | One centred line: "Read client stories →" to `/clients` (F18). The Telkom card came off (F6, F18) |
| 11 | FAQ | White | New, from facts: devices? (mobile and desktop browser, no app) · How long are results? (same or next day) · Can candidates cheat? (anti-cheat proctoring, device checks) · Can we use our competency framework? (yes, custom competencies) · Minimum purchase? (Rp10,000,000) · Is it normed for Indonesia? (yes) |
| 12 | Closer | Sky (closing panel) | Free-trial CTA + contact bar |

### 5.4 DEUS Discover (Personality)

**Superseded 2026-10-16 (feedback F10), built in R2:** this page is now the Personality · DEUS Discover section of the Game-Based Assessment page (§5.3, `#personality`); `/solutions/discover` redirects there. See §5.5's note.

| # | Section | Content |
|---|---|---|
| 1 | Hero (White, RPG screens floating in the sky window) | "Personality, revealed through story." *(new)* Lede: RPG-style situational-judgment profiling built on the Big Five |
| 2 | What it measures | Stat trio: **32** personality subtraits · **24** competency traits · **custom** competencies |
| 3 | How it works | The RPG narrative explained: candidates make choices in a story; choices and hesitations become data |
| 4 | Four differentiators | Rapid profiling · Custom competencies · Mass-scale summary · End-to-end usage |
| 5 | Your competencies, your language | The 3 customisation points (organisation's language; mapped to role; client's industry scenarios) with the Finance / Sales / Marketing example |
| 6 | Reports | Personality Report + Individual Profile Suitability screenshots |
| 7 | Beyond recruitment | Development, promotion readiness, training needs analysis, leadership mapping |
| 8 | Part of the suite | "Combine with Cognitive, Neuro and Simulation" → GBA |
| 9 | Closer | Request a demo |

### 5.5 Next Chapter (Cognitive, Neuro, Simulation)

One page, three module sections with sticky in-page navigation (a pill sub-nav, like the header's). Each module uses the same **"What traditional tests miss / What this gives you"** two-column pattern, which the brief supplies for all three.

| # | Section | Content |
|---|---|---|
| 1 | Hero (White + Sky window) | "Measure how people think, not what they memorised." *(new)* + 3 module chips |
| 2 | Cognitive: 7 games | Game grid: name + what it measures + screenshot (Objective Shooter … Speed Sorting). Miss / Gain columns |
| 3 | Neuroscience: 6 games | Game grid (Balloon … Faces). "Motivation, risk tolerance, effort allocation and EQ through unconscious behaviour." Miss / Gain |
| 4 | Simulation: 2 business scenarios | Business Operations and Event Operations cards; the 4 aspects measured; "customisable via the CMS". Miss / Gain |
| 5 | Which module for which use case | Compact matrix: use cases × modules (from brief §5.1 use-case table) |
| 6 | Closer | Request a free trial |

**Superseded 2026-10-16 (feedback F10, answers Q4):** this page and the Discover page (§5.4) fold into the Game-Based Assessment page (§5.3) as module sections, and "Next Chapter" is no longer used as a name. The new GBA page order is in `postpushrevisions1.1/feedback-2026-10-16.md`, F10. Built in R2; `/solutions/next-chapter` redirects to `#cognitive`.

### 5.6 DEUS Enhance

Full spec in **`ENHANCE-PAGE-SPEC.md`**. Summary of the structure: Hero → Problem (5 + teaser) → Urgency (5 roles) → Solution (5 steps, scroll-synced to product screens) + "Turn results into decisions" → **From rating to reward** *(new)* → Works with what you have → **Supported beyond the platform, as a journey** *(new)* → Outcome (5 roles) → **Is Enhance right for you?** *(new)* → Next step with an inline form → **FAQ** *(new)* → Closer.

### 5.7 Science

**Superseded 2026-10-16 (feedback F28), built in R6:** this page is split across the product pages as F28's "How it's divided" table in `postpushrevisions1.1/feedback-2026-10-16.md` says: a science line in the Personality, Cognitive and Neuroscience sections, the CHC line in Home's Potentia band, and the rest in the GBA page's "The science" section (§5.3, `#science`). `/science` redirects there, and "Science" is off the menu and footer.

Purpose: the credibility page HR heads and psychologists check before a purchase.

| # | Section | Content |
|---|---|---|
| 1 | Hero (White) | "Built on established science. Normed for Indonesia." *(new, from brief pillars)* |
| 2 | Frameworks | Big Five (OCEAN) + Universal Competency Framework (Discover) · neuroscience behavioural paradigms (Neuro) · classical cognitive frameworks (Cognitive) · CHC theory (Potentia) |
| 3 | How an assessment is built | 4-phase timeline: Theory → Item development → Validation → Norming, "guided by psychometricians and I/O psychology researchers" |
| 4 | Validated against traditional tools | Convergent validity with traditional cognitive tests. **[VERIFY]** any figures the team can publish (don't invent coefficients) |
| 5 | Normed on the Indonesian population | Why local norms matter |
| 6 | Fair and secure | Anti-cheat proctoring, device checks, behavioural data that can't be rehearsed |
| 7 | Academic partnership | UGM (for Potentia) [VERIFY co-branding rules]. Off since 2026-10-16 (F8), so the section is hidden |
| 8 | Closer | Request a demo |

### 5.8 Clients (all client stories, and later the project list)

**The rule:** every client example lives here, for every product, including Potentia. A client's statistics, quotes and photos appear **only on that client's story page** (and as a short summary on its card in the hub). Elsewhere on the site, pages link here instead of repeating them. The only client content outside this section is the **logo wall on Home** and the company-wide "40+ brands" number.

**Clients hub** (`/clients`)

| # | Section | Content |
|---|---|---|
| 1 | Hero | "Trusted by 40**+** brands" *(company-wide number)* + short lede |
| 2 | Logo wall | Approved logos only (Q8); hidden until then |
| 3 | Industries | Rule list: Retail, Telecommunications, Education, FMCG, F&B, Electronics |
| 4 | Client stories | One card per story: client, product tag (Game-Based Assessment / Enhance / Potentia), one headline result, link. Filter chips by product once there are more than about 4 stories |
| 5 | Project list | Added later (see below) |
| 6 | Closer | "Want results like these?" → Request a demo |

**One shared story layout**, so every new client story is a content file, not a new design:

| Part | Content |
|---|---|
| Header | Client name, product tag, the headline result |
| At a glance | 2–4 stat blocks |
| The challenge | What the client needed |
| What DEUS did | Products and modules used, how it was delivered |
| Results | What changed |
| In their words | Client and participant quotes (with permission) |
| Photo | Optional |
| CTA | A next step that matches the story's product |

**Story 1: Telkom Group** (`/clients/telkom-group`, all from brief §6, gated on Q7)

| Part | Content |
|---|---|
| Header | "1,000+ Management Trainee candidates, 30+ provinces, results in 1 day" · tag: Game-Based Assessment |
| At a glance | 1,000+ candidates · 30+ provinces at once · results within 1 day · 2 consecutive years |
| The challenge | MT recruitment for Telkom Indonesia and 6 subsidiaries at national scale |
| What DEUS did | Game-based assessment delivered simultaneously across 30+ provinces, two years running. **[VERIFY]** which modules were used (not in the brief) |
| In their words | Ibu Lina (Telkom Group Selection) + the 3 participant quotes ("tidak terasa seperti psikotest") |
| Photo | Group photo at Telkom Indonesia Graha Merah Putih, Bandung |
| CTA | "Running an MT or campus drive?" → Request a demo |

**Story 2: Calvin Christian School** (`/clients/calvin-christian-school`, from brief §5.3, in Indonesian first because Potentia's audience is, gated on Q11)

| Part | Content |
|---|---|
| Header | "200+ siswa SD mengenali potensi kognitifnya dengan Potentia" *(new wording around the brief's number)* · tag: Potentia |
| At a glance | 200+ elementary students · 8 cognitive dimensions per student · classroom dashboard for teachers |
| The challenge | Helping teachers understand each student's cognitive profile so teaching can be differentiated |
| What DEUS did | Potentia for the elementary school, with the Classroom Dashboard for teachers; plans to extend to junior and senior high |
| In their words | The teacher (Yennie) and parent (Chrissie) quotes from the deck. **[VERIFY]** names, titles and permission (the press credits similar quotes to Chrissie Martinez, Principal, and Oh Yen Nie, UPH) |
| CTA | "Untuk sekolah Anda?" → register the school on https://deuspotentia.com/daftar/institusi |

**Story 3+: Enhance and others.** Enhance has no client example in the sources yet (Q18). When one arrives, it becomes a story here and the Enhance page gets a link card to it.

**Project list (later, `/clients/projects`).** A simple list of past projects, separate from the full stories: each row has client (or an anonymous description such as "national FMCG company" when the name can't be shown), industry, product, year, and scale (e.g. number of participants). Filterable by product and industry. A project that later gets a full story links to it. Content comes from the team's project records; nothing is listed without permission (Q22).

### 5.9 About

| # | Section | Surface | Content |
|---|---|---|---|
| 1 | Hero | White | "We believe people are a company's most important asset." + About paragraph |
| 2 | Mission and vision | White | The mission as a large centered statement, the vision under it (one section since R17, D14) |
| 3 | ~~Vision and mission~~ | | Merged into 2 (D14) |
| 4 | The 6 I's | Cloud | Plain list of six: letter, value, one line; no panels (F90) |
| 5 | Our story | White | Horizontal timeline 2022 → 2026, with the ember "now" node on 2026 (same pattern as the Home hero) |
| 6 | Recognition and ecosystem | Cloud | Startup Studio Indonesia Batch 6, Innovfest by NUS x AsiaTech, Tech in Asia; UGM off since 2026-10-16 (F8); Agate is not named (owner, 2026-10-15) |
| 7 | Leadership | White | CEO Gregory Amadeus Kurnia + others [VERIFY: Q10, photos and bios needed]. Hidden until supplied |
| 8 | Company details | White | Legal entity PT Investama Persada Kurnia, address [VERIFY] |
| 9 | Closer | Sky (closing panel) | Contact |

### 5.10 Contact

- Short hero: "Let's talk about your people." *(new)*
- **The form** (fields in §8.1), with product interest pre-selected when arriving from a product page (`/contact?product=enhance`).
- Side column: WhatsApp chip, email chip, address [VERIFY], business hours [VERIFY].
- Success state: "Thanks, we've received your message." + "Need it faster? Chat on WhatsApp" link. A promised reply time ("within 1 business day") only if the team commits to it [VERIFY].

### 5.11 Privacy policy

Needed because the forms collect names, emails and phone numbers, which falls under Indonesia's Personal Data Protection Law (UU PDP No. 27/2022). Covers: what's collected, why, how long, who sees it, how to ask for deletion, contact. **The team (or their counsel) must approve the text**; Claude can draft it.

### 5.12 Potentia (external site)

Potentia has its own website at **https://deuspotentia.com** (Indonesian only for now). It already handles everything parents and schools need: buying a voucher (`/beli-token`, paid through the website, schools or Shopee), registering a school or institution (`/daftar/institusi`), help, contact and the reports themselves. So deushcs.com doesn't duplicate it. Potentia appears here only as:

| Where | What |
|---|---|
| Home, Solutions card 04 | One-line description, "Visit Potentia ↗" |
| Home, Potentia band | Short Indonesian introduction, button to deuspotentia.com |
| Solutions overview | Card linking out |
| Mega menu and footer | "Potentia by DEUS ↗" |
| Science | CHC theory and the UGM partnership, one paragraph |
| About | 2025 timeline entry, partners |
| Clients | The Calvin Christian School story |

**Link rules:** open in a new tab; show ↗; add the UTM tags from §8.4. On English pages, label the link "Visit Potentia (in Indonesian) ↗" until an English version of deuspotentia.com exists, then link to that.

### 5.13 404 and error pages

A small sky panel, "This page has drifted out of orbit." *(new)*, links to Home and Solutions.

---

## 6. Bilingual plan (Bahasa Indonesia + English)

### 6.1 Build for two languages from day one, ship them in two steps

- **Phase 0** sets up the plumbing: `[locale]` routes, `next-intl`, a language switch, and **every visible string in content files**, never in components.
- **v1** ships one language for the corporate pages. Potentia content lives on deuspotentia.com, so the only Potentia text here is the Home band and the Calvin story, both in Indonesian. **Default (Q1): English first** for corporate pages, because the most developed source copy (Enhance, GBA) is English, and corporate HR buyers read the English decks already.
- **The second-language phase** (Phase 6) translates every corporate page into Indonesian, and the Calvin story into English. Then Indonesian becomes the default locale for visitors whose browser is set to Indonesian.
- Until a page exists in a language, the switch on that page is disabled for it (not a broken link, and no machine-translated fallback).

### 6.2 What's already translated

The brief already has Indonesian for: positioning line, About paragraph, vision, mission, all 6 values, all 4 product one-liners, the closer. `ENHANCE-PAGE-SPEC.md` adds draft Indonesian for every Enhance heading. So the ID phase starts well ahead.

### 6.3 Translation process

1. Claude drafts the translation from the approved English, following the glossary below.
2. A native-speaking DEUS reviewer approves each page (Q14). Nothing goes live unreviewed.
3. Indonesian runs 20–30% longer than English, so every component is built and tested with the longer text (stress test in the styleguide).

### 6.4 Glossary (keep consistent across the site)

| English | Indonesian | Note |
|---|---|---|
| assessment | asesmen | as in the brief |
| game-based / gamified | berbasis game / berbasis gamifikasi | |
| psychometric test | psikotes | |
| performance appraisal | penilaian kinerja | |
| performance management | manajemen kinerja | |
| calibration | kalibrasi | |
| talent mapping | pemetaan talenta | |
| remuneration / pay | remunerasi | |
| bonus, incentive, salary increase | bonus, insentif, kenaikan gaji | |
| competency | kompetensi | |
| KPI, HRIS, ERP, CMS, MT | keep in English | standard in Indonesian HR |
| Management Trainee | Management Trainee | keep |
| candidate / participant | kandidat / peserta | |
| HR | HR or SDM | HR in product copy, SDM in mission-type copy (as the brief does) |
| parents / child | orang tua / anak | |
| Request a demo | Minta demo | |
| Book a 30-minute call | Jadwalkan panggilan 30 menit | |

### 6.5 Technical details

`<html lang>` per locale; `hreflang` alternates and `x-default`; per-locale page titles, descriptions and Open Graph images; `sitemap.xml` with alternates; numbers and money formatted per locale (`Rp69.000` in ID, `IDR 69,000` in EN) through `Intl`.

---

## 7. Design application

`DESIGN-GUIDE.md` (Daylight) is the visual source of truth. This section records the decisions that shape it.

### 7.1 Decisions

- **Surfaces:** every page is light. White and Cloud sections alternate; the Daylight sky gradient appears only in hero windows and the closing panel. **No dark sections** on any page, including the assessment and Enhance pages (owner decision, 2026-10-14); the game screenshots and product UI carry the tech mood. The Potentia band on Home uses Potentia's warm colours, matching deuspotentia.com.
- **No site-wide dark-mode toggle.** (This departs from the playbook default of light and dark; a marketing site gains little from it.)
- **Native scrolling,** no scroll-jacking. Reveal-once animations with `prefers-reduced-motion` respected.
- **Orange (ember `#FF6B3D`) marks "now" only:** the current step, the final timeline node, the active tab, a live recording dot. It is never a button and never small text on white. Buttons are navy pills.
- **No device frames.** Screenshots float over the sky gradient or a soft sky tile with a deep, soft shadow. A phone frame is allowed only for Potentia's mobile game. Key data moments (profile bars, scores, event logs) are built as UI cards in code.
- **Labels are sentence case,** in a small pill above the heading. No monospace and no all-caps text anywhere.

### 7.2 Gaps to design before pages are built

The Daylight mockup covers the homepage. These pieces still need designing (the guide marks them "extrapolated"):

| Gap | Notes |
|---|---|
| Header, mega menu, mobile menu sheet | The mockup shows the desktop header only |
| Language switch | `EN / ID` text toggle, as in the mockup |
| Full footer | Columns + bottom row |
| Form controls | Input, select, textarea, checkbox, focus, error, success, loading, disabled |
| Tabs | Reports (GBA), persona switcher (Enhance) |
| Accordion | FAQ |
| Data table | Pricing, games list, use-case matrix (and its mobile layout) |
| Logo wall, case-study layout, quote card | |
| Scroll-synced product screen ("sticky screen, steps scroll, screen changes") | Enhance solution section; deck already hints at it ("Scroll to reveal each step") |
| Potentia band | The warm band from the mockup (`#FFF6EC → #FFE6D2`, `DESIGN-GUIDE.md` §2.3), not deuspotentia.com's own royal blue and Montserrat. Specified in the guide |
| Favicon, app icon, Open Graph image template | From the logo tile |
| 404 page | Small sky panel |

These are designed once in a `/styleguide` page (Phase 0) and signed off before any real page is built.

---

## 8. Conversion and lead handling

### 8.1 Forms

**General contact / demo form:** name · work email · company · role · WhatsApp number (optional) · product interest (Discover / Next Chapter / Enhance / Not sure) · company size or expected number of candidates · message · consent checkbox ("I agree DEUS may contact me about this request" + privacy policy link).

**Enhance variant** (extra fields, all optional): number of sites or plants · how performance is tracked today (spreadsheets / an HRIS module / other software / not formally) · when the next appraisal cycle starts. These help sales prepare the 30-minute review. Details in the Enhance spec.

**Schools and parents (Potentia):** no form here; they go to deuspotentia.com, which has its own purchase, school registration and contact pages.

**Where a submission goes:** validated on the server → saved to the `leads` table in Neon → email notification to `admin@deushcs.com` (and anyone else in Q15) → success message with a WhatsApp shortcut. Spam: a hidden honeypot field plus a per-IP rate limit; add a CAPTCHA (Cloudflare Turnstile) only if spam shows up.

### 8.2 WhatsApp

Number: **+62 823-1212-1660** (default for Q2: `ENHANCE-CONTENT.md` and `Reference Design Guide.md` both use 823, so only the GBA deck disagrees). Every WhatsApp link carries a prefilled message for the page, for example:

| Page | Prefilled message (ID, since WhatsApp conversations are usually Indonesian) |
|---|---|
| Enhance | "Halo DEUS, saya ingin tahu lebih lanjut tentang DEUS Enhance." |
| GBA / Discover / Next Chapter | "Halo DEUS, saya tertarik dengan asesmen berbasis game untuk perusahaan saya." |
| Other | "Halo DEUS, saya ingin bertanya tentang layanan DEUS." |


### 8.3 CTAs by page

| Page | Primary | Secondary |
|---|---|---|
| Home | Request a demo | Explore solutions |
| GBA, Discover, Next Chapter | Request a free trial | Request a demo · WhatsApp |
| Enhance | Book a 30-minute appraisal review | WhatsApp · email |
| Science, About | Request a demo | Contact |
| Clients hub and stories | Request a demo (the Calvin story links to deuspotentia.com) | Contact |
| Potentia band and card | Kunjungi Potentia ↗ (deuspotentia.com) | — |

### 8.4 Measuring it

Events: `cta_click` (which CTA, which page), `whatsapp_click` (page), `email_click`, `form_submit` (product), `language_switch`, `outbound_click` (links to deuspotentia.com). Links to deuspotentia.com carry `?utm_source=deushcs.com&utm_medium=referral`, so the Potentia site can see visitors who came from here. Default tool (Q13): **Vercel Web Analytics** for traffic, with custom events (check the Vercel plan: custom events may need Pro) or **Google Analytics 4** if the team already uses Google tools. UTM parameters on form submissions are saved with the lead, so sales can see which campaign it came from.

---

## 9. SEO

### 9.1 Keyword map

| Page | Indonesian | English |
|---|---|---|
| GBA | asesmen berbasis game, psikotes online, gamifikasi rekrutmen | game-based assessment Indonesia, gamified psychometric test |
| Discover | asesmen kepribadian, tes kepribadian karyawan | personality assessment, Big Five assessment |
| Next Chapter | tes kognitif karyawan, asesmen kognitif | cognitive assessment, neuroscience assessment |
| GBA use cases | asesmen management trainee, rekrutmen kampus | management trainee assessment |
| Enhance | aplikasi penilaian kinerja, software KPI karyawan, sistem appraisal karyawan, kalibrasi kinerja, remunerasi berbasis kinerja | performance management software Indonesia, KPI appraisal platform |

### 9.2 Technical SEO

- Per-page, per-locale titles and descriptions (pattern: `<Page> | DEUS Human Capital Services`).
- Open Graph images generated from one template (title on the Daylight sky gradient, with the logo tile).
- Structured data: `Organization` (legalName PT Investama Persada Kurnia), `SoftwareApplication` for each product, `FAQPage` where there's an FAQ, `BreadcrumbList`.
- `sitemap.xml` with language alternates; `robots.txt`. **Preview deployments and the pre-launch site are `noindex`.**
- Performance budget: LCP under 2.5s on a mid-range phone on 4G; images through `next/image` (AVIF/WebP); fonts through `next/font`; carousels and animations pause when off screen.

### 9.3 Off-site (not part of the build, but worth doing at launch)

Google Business Profile, a LinkedIn company page [VERIFY whether one exists], the website link in @potentiabydeus's bio.

---

## 10. Technical approach

### 10.1 Stack

The default stack from `~/.claude/playbooks/new-app.md`, which suits this site well:

| Concern | Choice | Why here |
|---|---|---|
| Framework | Next.js (App Router) + TypeScript | Static pages for speed and SEO; Server Actions for the form |
| Styling | Tailwind CSS v4 with the guide's `@theme` block; shadcn/ui only for accessible primitives (dialog, sheet, tabs, accordion, select), fully restyled | The guide ships its tokens as a Tailwind v4 `@theme` block |
| Languages | `next-intl` | Locale routing, message files, formatting |
| Content | Typed content files per locale in the repo (`content/en/…`, `content/id/…`) | ~14 pages, edited through Claude sessions; no CMS to run or pay for. A headless CMS is a later option (§12) if the team wants to edit without Claude |
| Data | Neon Postgres + Drizzle: one `leads` table | Leads are kept even if an email fails to send |
| Validation | Zod, in the Server Action | |
| Email | Resend (or similar) for lead notifications | Needs a sending domain on deushcs.com |
| Fonts and icons | `next/font` (Manrope); `lucide-react` | Daylight uses Manrope only; line icons match Lucide |
| Tests | Vitest (form validation) + Playwright (every page renders in both locales, form end to end, screenshots at 390 and 1280) | |
| Hosting | GitHub → Vercel, every push to `main` deploys | |

### 10.2 Data

One table, `leads`: id, created_at, locale, source_page, form_type (contact / enhance), product_interest, name, company, role, email, whatsapp, size, extra (JSON for form-specific fields), message, consent_at, utm_source / medium / campaign, status (new / contacted / closed). Nothing about children is stored by the website.

### 10.3 Project structure (outline)

```
src/
  app/[locale]/            pages (one folder per route in §4.1)
  app/[locale]/styleguide  dev-only component reference
  components/              header, footer, sections (SectionLabel, ProductTile, JourneyTimeline, FloatingCard, Tabs, EventLog, ClosingPanel, …)
  content/en/, content/id/ page copy, typed
  lib/                     db (Drizzle), leads action, analytics, whatsapp links
  styles/tokens.css        copied from DESIGN-GUIDE.md (drop-in tokens)
public/assets/             logo, product screenshots, Potentia phone frame and logo for the band
```

### 10.4 Domain and launch safety

`deushcs.com` already receives email (`admin@deushcs.com`), so **pointing the domain at Vercel must keep the existing MX (email) records untouched**. Before the switch: confirm where the domain is registered, who has access, and whether a website lives there now (Q16). If it does, old URLs are redirected to the new pages.

---

## 11. Build phases

Each phase is usable on its own. The site stays `noindex` on a Vercel URL until Phase 7, unless the team decides to launch earlier (Q17).

| Phase | What gets built | Done when |
|---|---|---|
| **0. Foundation** | Repo, Next.js scaffold, tokens, fonts, `[locale]` routing in both languages, header, footer, mobile menu, floating WhatsApp, closing-CTA section, `/styleguide` with every component (including the §7.2 gaps), 404, Neon `leads` table, Vercel deploy | The Vercel URL loads `/en` and `/id` shells and `/styleguide`; the owner signs off the styleguide against the design guide |
| **1. Enhance + Contact** | Enhance page (per spec), contact form (general + Enhance variant) end to end, email notification, privacy policy draft | A test inquiry from the Enhance page lands in Neon and arrives at admin@deushcs.com; sales can send the Enhance link |
| **2. Home + About + Solutions overview** | The three pages | Every Home link resolves (pages not yet built show a short "coming soon" panel) |
| **3. Assessments** | GBA umbrella, Discover, Next Chapter, Science | All four pages pass review with real screenshots |
| **4. Clients** | Clients hub, the shared story layout, Telkom and Calvin Christian School stories, logo wall if approved, link cards on Home and GBA | Both stories live (or held with anonymised wording until permission), and every link card points to them |
| ~~5. Potentia~~ | Removed in v0.4: Potentia lives on deuspotentia.com. The Home band and card are built in Phase 2 | — |
| **6. Second language** | Indonesian for every corporate page (and the Calvin story in English), reviewed by a native speaker; hreflang; ID metadata | Every page exists in both locales and the switch works on every page |
| **7. Launch** | SEO metadata, OG images, structured data, analytics events, accessibility and performance checks, domain cutover keeping email intact, remove `noindex` | deushcs.com serves the new site, email still works, Lighthouse ≥ 90 on mobile for Home and Enhance |

**Why Enhance first:** its copy is final and has no [VERIFY] blockers, and the sales team can start sending the link straight away. Assessment pages wait on screenshots and the Next Chapter naming decision; Clients waits on Telkom's and Calvin Christian School's permission.

---

## 12. Later (suggestions, not in v1)

Each is accepted or declined by the owner; declined ones move to "Out of scope".

1. **Use-case landing pages** for search ("Management Trainee assessment", "Campus recruitment", "Talent mapping"): high-intent keywords, mostly reusing GBA content.
2. **"Play a sample game"** on the GBA page: a visitor tries one short cognitive game. The strongest possible demo of "candidates enjoy it", if the game team can provide a web build.
3. **Link to the English deuspotentia.com** once it exists (English pages currently link to the Indonesian site).
4. **Insights / articles** in Indonesian for SEO (e.g., "Cara memilih psikotes untuk MT").
5. **Downloadable one-pagers** per product (in exchange for an email).
6. **Headless CMS** (e.g., Sanity) so the team can edit copy without a developer.
7. **Client login links** in the header, if Discover / Enhance / CMS have client URLs (brief Q14).
8. **Careers page.**

---

## 13. Content readiness

| Page | Copy | Visual assets | Blocked by |
|---|---|---|---|
| Home | From brief + new | Logo SVG, one screenshot per product | Q3 headline |
| Solutions overview | New (short) | — | — |
| GBA | From brief | Game, report and CMS screenshots (GBA deck slides 7–19) | Q4, Q5 |
| Discover | From brief + new hero | RPG screens, personality report | — |
| Next Chapter | From brief | 13 game screenshots, simulation screens | Q4 |
| **Enhance** | **Ready** + new sections | **`assets_enhance/` folder is missing** (`Reference Design Guide.md` §13): overview, calibration matrix, salary increase, bonus cycle, reward grouping, bonus participants, appraisal dashboard | Asset export only |
| Science | From brief | Optional diagrams (we draw them) | Validation figures, if any |
| Clients hub + Telkom + Calvin stories | From brief | Telkom photo, approved logos | Q7, Q8, Q11 |
| Project list (later) | Needs the team's project records | — | Q22 |
| About | From brief (ID ready) | Leadership photos | Q10 |
| Contact | New (short) | — | Q9 address |
| Privacy | New | — | Legal review |
| Potentia band (Home) | Written | Potentia logo, one character illustration | Q6 |

---

## 14. Open questions

Each has a default, so nothing blocks; the default is used until answered. Q2–Q14 come from brief §12; the rest are new.

| # | Question | Default if unanswered | Blocks |
|---|---|---|---|
| Q1 | **Which language ships first** for corporate pages? | English first, Indonesian in Phase 6 | Phase 1 copy |
| Q2 | WhatsApp number: 823 or 832? | **+62 823-1212-1660** (two of three sources) | Every page |
| Q3 | Tagline: "Human Capital Services" or "Human Capital and Business Solutions"? | "Human Capital Services" (matches domain and brand name) | Header, footer, metadata |
| Q4 | Is "Next Chapter" a public product name? **Answered 2026-10-16 (feedback F10): no. Discover and Next Chapter fold into the GBA page as module sections, named Personality · DEUS Discover, Cognitive, Neuroscience and Simulation.** | Yes, as a product page linked from the GBA umbrella | Phase 3 |
| Q5 | Show pricing publicly? | "Starting from Rp69.000 per candidate" + contact sales; no full table | GBA pricing section |
| Q6 | Potentia age range: 7–15 or 9–15? | 7–15 (the decks) | Potentia band copy |
| Q7 | Permission to name Telkom, show the photo and Ibu Lina's quote? | The story runs anonymised ("a national telecom group", no photo, no names) until confirmed | Phase 4 |
| Q8 | Which client logos can appear (Home and Clients)? | **Answered (owner, 2026-10-23): every client.** Home shows eleven logos and "See all 40+"; Clients shows them all, grouped by company | Home, Clients |
| Q9 | Show the office address? | Hide until confirmed | Contact, footer |
| Q10 | Leadership section? | Hidden until photos and bios exist | About |
| Q11 | Calvin Christian School: permission to name the school, and the correct names and titles for the quotes | Story held until confirmed | Clients |
| Q12 | ~~Potentia: own domain?~~ **Answered:** deuspotentia.com. English pages link to the Indonesian site until an English version exists | — |
| Q13 | Analytics tool | Vercel Web Analytics; GA4 if the team prefers | Phase 7 |
| Q14 | Who reviews Indonesian translations? | The owner | Phase 6 |
| Q15 | Who receives lead notifications? | admin@deushcs.com only | Phase 1 |
| Q16 | Is there a website on deushcs.com now, and who manages the domain/DNS? | **Answered 2026-10-14:** a WordPress site on Hostinger; the owner holds the domain at Hostinger. Still to confirm: where `admin@deushcs.com` mail is hosted | Phase 7 |
| Q17 | Launch progressively (go public after Phase 2) or all at once? | All at once after Phase 7 | Indexing |
| Q18 | Enhance: any client example, numbers, security/hosting facts, or pricing model to publish? | None shown; FAQ answers point to the scoping call | Enhance client story + FAQ |
| Q19 | Enhance + assessments: do Discover / Next Chapter results feed Enhance's talent map (performance × potential)? | Don't claim an integration; the "Better together" block stays hidden | Enhance + Home |
| Q20 | ~~Potentia WhatsApp number~~ No longer applies: deuspotentia.com handles its own contact | — |
| Q21 | Social links for DEUS corporate (LinkedIn, Instagram)? | Footer shows none until supplied | Footer |
| Q22 | Project list: which projects can be listed, and named or anonymous? | Built only once the team supplies a list; anonymous descriptions by default | /clients/projects |

---

## 15. What the owner needs to send

| Item | For | Phase |
|---|---|---|
| Logo as SVG (and a transparent PNG) | Header, favicon, OG images | 0 |
| The `assets_enhance/` folder or fresh Enhance screenshots (list in §13) | Enhance page | 1 |
| GitHub, Vercel and Neon accounts (or permission to create them) | Hosting, data | 0 |
| GBA deck screenshots exported at high resolution (slides 7–19, 26) | Assessment pages | 3 |
| Telkom permission + photo; Calvin Christian School permission + correct quote names | Client stories | 4 |
| Project records for the project list | /clients/projects | Later |
| Potentia logo and one character illustration | Home band | 2 |
| Domain/DNS access for deushcs.com | Launch | 7 |
| Answers to Q1, Q2, Q4, Q5 first (they affect the most pages) | | Now |

---

## 16. Next steps

1. Owner reviews this plan and `ENHANCE-PAGE-SPEC.md`, and answers the top questions (Q1, Q2, Q4, Q5).
2. Project setup (playbook Step 0): `git init`, a project `CLAUDE.md`, and the build plan copied into `docs/`. The playbook's design steps 4–5 (brief, three directions) are done: Daylight v2 was chosen from three directions in `design-directions/`, and `DESIGN-GUIDE.md` documents it; Step 6 shrinks to designing the §7.2 gaps in `/styleguide`.
3. Implementation plan (routes, components, phase task lists with a model pick per task).
4. Phase 0, then Phase 1 (Enhance + Contact).
