# Site feedback, round 3 (team, 2026-10-22)

The DEUS team's notes on the site. Numbering carries on from round 2 (`postpushrevisions2.0/`, up to F40). The team's notes are quoted word for word under each page further down.

## How this round runs

About 70 notes, so they're sorted by what each one needs before anything is built:

1. **Logged** (this file): every note has an F-number, a type and a proposal.
2. **Decisions first** (D1–D17 below). Several notes disappear once a section is cut (for example, Home's Potentia band language, all of Enhance §5), so the owner settles cuts and keep-or-change questions before any copy is polished.
3. **Built in tasks by area**: fixes that need no decision first, then the shared parts, then one or two tasks per page. The build order, models and task briefs are in `round3-implementation-plan.md`, ready for `autorun`.
4. **The team's wording is the intent, not final copy.** Suggested headlines keep their keywords, but they get a grammar and `content/VOICE.md` pass.

**Types:** *bug* (broken; just fix) · *wording* (copy change; owner approves the batch) · *layout* (visual change on one page) · *shared* (one component, fixed everywhere it appears) · *cut/keep* (owner decides) · *positioning* (what DEUS says about itself; owner decides) · *needs info* (a fact, asset or person outside this repo).

## Summary

| # | Page · section | Note (short) | Type | Waits on | Task | Status |
|---|---|---|---|---|---|---|
| F41 | Home · hero | Punchline doesn't speak for every product; say who DEUS is | wording | | | done: headline A + sub-line S6 (2026-10-22) |
| F42 | All · header | Solutions menu unbalanced (assessments column much longer than Enhance) | layout | | | done: stacked rows, `2a3a1ca` (2026-10-22) |
| F43 | Home · hero window | The journey window names products (DEUS Discover, DEUS Enhance); show the stages instead | wording | | R14a | open |
| F44 | Home · trusted by | Lines 1 and 2 repeat the industries; line 1 = 40+ brands, line 2 = industries, animated in a loop | shared | D4 | R13b | decided (D4, 2026-10-22) |
| F45 | Home · why DEUS exists | Is "thin evidence" the real problem, or several (scattered data too)? | positioning | D6 | R14a | decided (D6, 2026-10-22) |
| F46 | Home · where we help | Heading to two lines max | wording | | R14a | open |
| F47 | Home · where we help | Cards switch too slowly, so nobody notices they change or can be clicked | bug | | R12 | open |
| F48 | Home · where we help | Product label on each card makes it look clickable; remove | bug | | R12 | open |
| F49 | Home · our solutions | Heading to two lines max | wording | | R14a | open |
| F50 | Home · our solutions | Cards look different sizes; Potentia card only shows after scrolling | layout | | R14a | open |
| F51 | Home · our solutions | GBA card text isn't beginner-friendly; plain words, no jargon | wording | | R14a | open |
| F52 | Home · §6–8 spotlights | GBA, Enhance and Potentia spotlights repeat §5; needed? | cut/keep | D1 | R14a | decided (D1, 2026-10-22) |
| F53 | Home · Potentia band | Indonesian text among English sections feels odd | cut/keep | D1 | R14a | decided (D1, 2026-10-22) |
| F54 | Home · why DEUS | "Evidence over gut feel": say why we beat gut feel (data-driven), not which theories per product | positioning | facts | R14b | open |
| F55 | Home · why DEUS | "Built for Indonesia" only covers the assessments | positioning | facts | R14b | open |
| F56 | Home · why DEUS | "Ready for volume" only covers the assessments; cover every product | positioning | facts | R14b | open |
| F57 | Home · why DEUS | "A partner, not just a vendor": same, every product | positioning | facts | R14b | open |
| F58 | Home · recognition | Purpose unclear; reads like milestones; "Backed by" implies partnership | cut/keep | D2 | R13a | decided (D2, 2026-10-22) |
| F59 | Home, Enhance, About · let's talk | "Chat on WhatsApp" button and the WhatsApp number below it repeat each other | shared | D3 | R13a | decided (D3, 2026-10-22) |
| F60 | GBA · hero | Headline should carry "Game-Based Assessment" (SEO and clarity) | wording | D9 | R15a | open |
| F61 | GBA · the problem | Headline should say "recruitment"; "Scoring eats your week" → "Manual scoring slows down hiring" | wording | D9 | R15a | open |
| F62 | GBA · three principles | Headline should show the benefit for hiring | wording | D9 | R15a | open |
| F63 | GBA · modules | "All your talent assessments in one platform" | wording | D9 | R15a | open |
| F64 | GBA · Personality | Title "DEUS Discover: Personality Test" (larger), sub-line smaller, drop one sentence | wording, layout | D9 | R15a | open |
| F65 | GBA · Cognitive | Title "Cognitive Assessment", new sub-line, drop the framework sentence | wording, layout | D8, D9 | R15a | open |
| F66 | GBA · Neuroscience | Title "Neuroscience Assessment", new sub-line, drop the research sentence | wording, layout | D8, D9 | R15a | open |
| F67 | GBA · Simulation | Title "Simulation Assessment", new sub-line | wording, layout | D9 | R15a | open |
| F68 | GBA · modules | Add a "swipe right" / next button to move between modules | layout | | R15a | open |
| F69 | GBA · all headings | Put main keywords in section headings (reference: Agate's GBA page) | wording | D9 | R15a | open |
| F70 | GBA · lower sections | How it works, Platform, Science, Before and after, Getting started: better in a sales presentation; Pricing is too far down | cut/keep | D7 | R15b | decided (D7, 2026-10-22) |
| F71 | Enhance · hero | Looks exactly like the Home hero; visitors can't tell which page they're on | layout | D10 | R16a | decided (D10, 2026-10-22) |
| F72 | Enhance · hero | Screenshot doesn't show the tagline; ideally an animation from review to pay decision | needs info | D10, screens | R16a | open |
| F73 | Enhance · the problem | "Up next" says "See how Enhance closes each gap" but the next section is "What the gap looks like, daily" | bug | | R12 | open |
| F74 | Enhance · the solution | Not obvious the cards scroll; behave like Home's "Where we help" | layout | | R16b | open |
| F75 | Enhance · the solution | "Turn results into better decisions" looks detached after the cards | layout | D11 | R16b | decided (D11, 2026-10-22) |
| F76 | Enhance · from rating to reward | Repeats the solution section; if kept: empty space, content only covers reward, the "why?" line is unclear | cut/keep | D11 | R16b | decided (D11, 2026-10-22) |
| F77 | Enhance · supported beyond | Orange dot on the last step only makes it look more important; animate if it's a process | shared | D5 | R13b | decided (D5, 2026-10-22) |
| F78 | Enhance · is it a fit? | Repeats "What the gap looks like"; discard | cut/keep | D12 | R16b | decided (D12, 2026-10-22) |
| F79 | Enhance · next step | Easy-adoption text sits beside the booking form; form repeats the closing CTAs; "Prefer to talk first?" repeats too | cut/keep | D13 | R16b | decided (D13, 2026-10-22) |
| F80 | Enhance, Contact · forms | WhatsApp number field accepts letters | bug | | R12 | open |
| F81 | Clients · industries | Animate the industries (enter right, exit left, loop) | shared | D4 | R13b | decided (D4, 2026-10-22) |
| F82 | Clients · client stories | Add the DKB/BCG story so Telkom's card isn't alone | needs info | story, permission | R17 | open |
| F83 | Client story · header | Add a "back" link | bug | | R12 | open |
| F84 | Client story · intro | Avoid "TEXT 1 · TEXT 2" labels | wording | D15 | R17 | decided (D15, 2026-10-22) |
| F85 | Client story · intro | Headline two lines max; still sounds AI-written | wording | | R17 | open |
| F86 | Client story · planning an intake? | Heading two lines max | wording | | R17 | open |
| F87 | About · hero | "make people decisions on better evidence" is awkward | wording | | R17 | open |
| F88 | About · our story | Last sentence ("expanded our assessments…") should end on what DEUS is | wording | | R17 | open |
| F89 | About · mission | Why two Mission sections? | cut/keep | D14 | R17 | decided (D14, 2026-10-22) |
| F90 | About · the six I's | Identical darker cards look clickable and generic | layout | | R17 | open |
| F91 | About · our journey | Orange dot on the last step only (as F77) | shared | D5 | R13b | decided (D5, 2026-10-22) |
| F92 | About · recognition | Drop it: listing it makes DEUS look like that's all; its background clashes with the next section | cut/keep | D2 | R13a | decided (D2, 2026-10-22) |
| F93 | Privacy · whole page | Plain words a non-technical reader understands | wording | Ko Will | R18 | open |
| F94 | Privacy · whole page | "UU PDP" → "peraturan perundang-undangan yang berlaku" | wording | D16, Ko Will | R18 | open |
| F95 | Privacy · whole page | Add the office address | needs info | address (Q9) | R18 | open |
| F96 | Privacy · header | Label and title repeat each other; match the footer link's name | wording | | R18 | open |
| F97 | Privacy · header | "We only collect what you type" contradicts the timestamps and IP code below | wording | | R18 | open |
| F98 | Privacy · what we collect | "Scrambled code" and "NEXT_LOCALE" aren't user-friendly | wording | | R18 | open |
| F99 | Privacy · what we collect | "If you only browse the site, it stores nothing about you" contradicts too | wording | | R18 | open |
| F100 | Privacy · who sees your data | Why isn't "our email provider" named? | needs info | provider | R18 | open |
| F101 | Privacy · who sees your data | Add WhatsApp to the list | needs info | WhatsApp setup | R18 | open |
| F102 | Privacy · how long we keep it | Two years: really? Why? Feels very long | positioning | D17, Ko Will | R18 | open |

## Decisions for the owner

Each has a recommended answer. Cuts come first because they make other notes moot.

**Shared**
- [x] **D1 Home §6–8 spotlights** (F52, F53). (a) **Cut all three** (recommended): §5's three cards already introduce each product and link to its page, and Home drops from about 13 screens to about 9. The F53 language question goes away with it. Note: R9 (Simulation tile) and part of R10 (spotlight images) live in these sections and would go too. (b) Keep all three, shortened, with the Potentia band in English on the English page (undoes F9's "body stays Indonesian"). (c) Cut GBA and Enhance, keep Potentia in English. **Decided (owner, 2026-10-22): (a), cut all three.**
- [x] **D2 Recognition on Home and About** (F58, F92). (a) **Cut both** (recommended): About's timeline already holds the same facts (2023 Startup Studio, 2024 Innovfest and Tech in Asia), so nothing is lost, and it fixes the About background clash. (b) Keep on About only, renamed "Milestones", no "Backed by". (c) Keep both, reworded. Undoes R7 and F32 either way except (c). **Decided (owner, 2026-10-22): (a), cut on both pages.**
- [x] **D3 WhatsApp twice in "Let's talk"** (F59). (a) **Keep the "Chat on WhatsApp" button; the contact bar under it shows only "Contact us" and the email** (recommended): the button opens WhatsApp with a ready message, which the bare number doesn't. (b) Keep the number, drop the button. **Decided (owner, 2026-10-22): (a).**
- [x] **D4 Rotating industries** (F44, F81). (a) **Yes**: one industry at a time slides in from the right and out to the left, on a loop; it pauses on hover and stays still for visitors who turn off motion (recommended). (b) No animation, a plain line. **Decided (owner, 2026-10-22): (a), one industry at a time.**
- [x] **D5 Timeline dots** (F77, F91). (a) **All dots the same; as the section scrolls into view they fill in one by one**, so it reads as a process (recommended). (b) All the same, no animation. **Decided (owner, 2026-10-22): (a).**

**Home**
- [x] **D6 What problem DEUS solves** (F45). The current text already mentions "five spreadsheets", so scattered data is in the story but not in the headline. (a) **Both, in the headline**: "Most people decisions still run on thin, scattered evidence." (recommended; also matches Enhance's "From scattered data to better decisions"). (b) Keep "thin evidence". (c) Lead with scattered data only. **Decided (owner, 2026-10-22): (a), "Most people decisions still run on thin, scattered evidence."**

**GBA**
- [x] **D7 GBA lower sections** (F70). Today's page after R11: about 20 laptop screens, Pricing at screen 16. (a) Cut all five as the team suggests. (b) **Cut Platform, Science and Before and after; merge How it works and Getting started into one short "How it works" (four steps plus "start with a free trial") just above Pricing** (recommended): "How do I start?" still moves a buyer to act, and Pricing comes up by about 7 screens. (c) Keep everything, only move Pricing up. **Decided (owner, 2026-10-22): the Platform, Science and Before and after content stays, folded into one tabbed "Behind the results" section (Platform · Science · Before and after, the pattern R11 used for the modules); How it works and Getting started merge into one short section above Pricing.**
- [x] **D8 Module science lines** (F65, F66). They were added in F28 when the Science page was folded in. (a) **Remove them, as the team asks** (recommended); if D7 cuts the Science section, one line ("developed with psychologists on established research") goes into the three-principles section so the science isn't lost entirely. (b) Keep them. **Decided (owner, 2026-10-22): (a), with the owner's condition that the science stays meaningful.** So the module lines move rather than vanish: the Science tab (D7) keeps its three foundation cards (Big Five and the Universal Competency Framework; classical frameworks for processing speed, memory, reasoning and attention; neuroscience tasks), and the neuroscience card takes over what the removed line said (risk-taking, motivation, effort and emotion recognition, read from what people do rather than what they say). The four development phases, "Validated", "Normed for Indonesia" and "Hard to coach" stay, and so does the "Scientifically grounded" principle near the top.
- [ ] **D9 GBA headline set** (F60–F69): approve the table in the GBA section below, row by row.

**Enhance**
- [x] **D10 Enhance hero** (F71, F72). The hero gets a product-page layout that's clearly different from Home (applies to the GBA hero too, which shares it). For the picture: (a) **a short coded animation from real Enhance screens: KPI → appraisal score → calibration → bonus band** (recommended; needs those screens, three of which are already on the waiting list). (b) A screen recording from the product team. (c) For now a static bonus-cycle screen. **Decided (owner, 2026-10-22): (a).** The screens are on the owner's list in `NEEDED-FROM-YOU.md`; R16 builds the new hero with the screens there are now and swaps in the rest as they arrive.
- [x] **D11 Solution steps and "From rating to reward"** (F75, F76). (a) **"Turn results into decisions" becomes step 6 of the solution switcher, and §5 "From rating to reward" is cut** (recommended): reward is then explained once, inside the process. §5 is one of our additions, not the approved deck, so `ENHANCE-CONTENT.md` is untouched. (b) Keep §5, fixed as the team describes. **Decided (owner, 2026-10-22): (a), cut §5, "Turn results into decisions" becomes step 6.**
- [x] **D12 "Is it a fit?"** (F78). (a) **Cut** (recommended; also our addition, not the deck). (b) Keep. **Decided (owner, 2026-10-22): (a), cut.**
- [x] **D13 Booking form placement** (F79). (a) **"Next step" keeps its two steps as text; the form, WhatsApp and email move into one contact block at the bottom, replacing the closing's repeated buttons** (recommended). (b) Keep as is. **Decided (owner, 2026-10-22): (a).**

**Clients and About**
- [x] **D14 Two Mission sections** (F89). (a) **One section: the mission in the large statement style, the vision under it** (recommended). (b) Keep only the plain vision-and-mission pair. **Decided (owner, 2026-10-22): (a).**
- [x] **D15 "TEXT · TEXT" labels** (F84). (a) **Fix the client story labels only** ("Client story" alone; the product moves to the at-a-glance box) (recommended). Dates in timelines ("2023 · …") stay. (b) Remove every "X · Y" label on the site, including "Personality · DEUS Discover" in the menu. **Decided (owner, 2026-10-22): (a).**

**Privacy** (with Ko Will)
- [x] **D16 Naming the law** (F94). (a) Never name it: "the applicable laws and regulations" throughout, as the team asks. (b) **Name it once ("the applicable laws and regulations, including the Personal Data Protection Law") and use the general phrase after that** (recommended, for Ko Will to confirm): still true if the law changes or another law applies, and specific enough to be credible. **Decided (owner, 2026-10-22): (b); Ko Will to confirm in his review.**
- [x] **D17 Retention** (F102). It was always a proposal (waiting list, 2026-10-15). (a) **Two years, with the reason in the text** ("hiring and appraisal cycles run once a year, so many companies come back a year later") (recommended). (b) One year. (c) Another period Ko Will prefers. **Decided (owner, 2026-10-22): (a), two years with the reason written in; Ko Will to confirm in his review.**

## Facts and assets needed

| For | What | From |
|---|---|---|
| F54–F57 | What "built for Indonesia", "ready for volume" and "partner" mean for Enhance and Potentia: e.g. can Enhance import employees in bulk, is it in Bahasa Indonesia (already a VERIFY in its FAQ), what support Potentia schools get | Product team |
| F72 | Real Enhance screens: KPI setup, an appraisal score, calibration, bonus cycle (the last three overlap the existing waiting list) | Product team |
| F82 | The DKB/BCG story: what DEUS did, numbers, a quote if any, and permission to name them. Calvin's story is ready but held for Q11 | Owner / client |
| F93–F102 | Ko Will's review of the privacy page | Ko Will |
| F95 | Office address (Q9) | Owner |
| F100 | Which provider holds `admin@deushcs.com` (Google Workspace, Microsoft 365, …) | Owner / Ko Will |
| F101 | How WhatsApp is run (WhatsApp Business app on a phone, or an API provider) | Owner |

## Tasks

The build order, each task's brief and its model are in `round3-implementation-plan.md` (this folder). The task lines `autorun` picks up are in `IMPLEMENTATION_PLAN.md`, "Team feedback round 3".

## Decided during build

Calls the building sessions made themselves (round 3 rule 4 in `round3-implementation-plan.md`), one line each: task, choice, the main alternative, why. The owner and the round 3 review check them.

*(none yet)*

## Notes that undo earlier decisions

Settle these on purpose, not by accident:
- **D1 (a)** cuts R9's Simulation tile (F31) and the spotlight pictures from R10 (F34–F39); **D1 (b)** reverses F9 (Potentia body in Indonesian).
- **D2 (a)** removes R7's logo strip (F7) and F32's captions.
- **D7** (decided) keeps every section R11 kept, but folds three of them into tabs, as R11 did for the modules.
- **D8 (a)** removes F28's per-module science lines (the Science section itself stays, in the D7 tabs).

## F41. Home hero punchline

**Team's note (verbatim):**

> Punchline kurang mewakili semua produk DEUS. Who to hire/reward ga termasuk Potentia di dalamnya. Mungkin bisa cari punchline yang fokus ke who DEUS is > branding utama DEUS
>
> Sebaiknya penjelasan punchline tidak langsung sebut nama produk. Lebih fokus ke DEUS itu apa

**Now** (`content/en/home.md` §1, `src/content/en/home.ts`):

> # Know who to hire. Prove who to reward.
>
> DEUS helps Indonesian companies see their people clearly. Our game-based assessments show how candidates really think and behave, and DEUS Enhance links every appraisal to the bonus and salary decisions that follow.

**Cause:** the headline speaks only to companies (hiring and pay), so Potentia, which serves schools and parents, has no place in it. The sub-line names two products, so it reads as a product list rather than a statement of what DEUS is.

**What the new version has to do:**

- Speak for all three products (assessment, performance, Potentia) without naming any of them.
- Say who DEUS is: the main brand line, the one the rest of the site hangs under.
- Stay inside the brief: the mission ("understand, develop, and optimize the best potential of every individual") and the positioning line ("people are a company's most important asset"). No new claims.
- Follow `content/VOICE.md` (no "empower", "unlock", "holistic" and so on).

### Headline options

| | English | Bahasa Indonesia | Why it works | Watch out |
|---|---|---|---|---|
| **A** (recommended) | Every person has potential. We help you see it. | Setiap orang punya potensi. Kami bantu Anda melihatnya. | Fits a candidate, an employee and a child equally. Straight from the mission. Sounds like a person talking, not a slogan. | Two sentences, like the current one, so the layout stays the same. |
| **B** | See people clearly. | Kenali setiap orang dengan jelas. | Shortest. Picks up "see their people clearly" from the current sub-line, so the idea isn't new to the site. | Needs the sub-line to explain what "clearly" means. |
| **C** | Better evidence about people. | Bukti yang lebih kuat tentang manusia. | Matches "Why DEUS exists" ("thin evidence") and the Solutions heading ("better evidence about people"), so the whole page tells one story. | More rational than warm; the ID version reads stiffer. |
| **D** | People are your most important asset. Know them properly. | Manusia adalah aset terpenting Anda. Kenali mereka dengan benar. | Built on the brief's own positioning line, which the team already uses. | First half is a common phrase in HR marketing; less distinctive. Speaks to companies more than to parents. |
| **E** | The science of human potential. | Sains di balik potensi manusia. | Brand-like and short; covers every product. | Abstract: VOICE.md asks headlines to "say something" on their own. Better as a tagline under the logo than as the hero. |

**Picked (owner, 2026-10-22): A.** "Every person has potential. We help you see it." / "Setiap orang punya potensi. Kami bantu Anda melihatnya."

### Sub-line options (to sit under headline A, no product names)

The headline already says "potential" and "see", so the sub-line does the other job: who DEUS is and how it works. Every option avoids product names and stays within the brief (founded 2022, Indonesian, companies and schools as clients, science-based games).

| | English | Bahasa Indonesia | Angle |
|---|---|---|---|
| **S1** | DEUS is an Indonesian human capital company. We use science and play to show what people are really capable of, from a child in school to a leader at work. | DEUS adalah perusahaan human capital asal Indonesia. Kami memadukan sains dan permainan untuk menunjukkan potensi sebenarnya setiap orang, dari anak di sekolah hingga pemimpin di tempat kerja. | Who we are + method + full range (round 1 draft) |
| **S2** | DEUS turns science and play into clear evidence about people, so the decisions about them are fair. | DEUS mengubah sains dan permainan menjadi bukti yang jelas tentang manusia, agar setiap keputusan tentangnya adil. | One sentence, fairness (round 1 draft) |
| **S3** (recommended) | From a child's first assessment to an employee's next promotion, DEUS gives you a clearer, fairer picture of the people in your care. | Dari asesmen pertama seorang anak hingga promosi berikutnya seorang karyawan, DEUS memberi Anda gambaran yang lebih jelas dan adil tentang orang-orang yang Anda dampingi. | Range of who we serve; "people in your care" fits HR, teachers and parents alike |
| **S4** | Since 2022, DEUS has helped Indonesian companies and schools understand their people with science-based games and data, not guesswork. | Sejak 2022, DEUS membantu perusahaan dan sekolah di Indonesia memahami orang-orangnya lewat permainan berbasis sains dan data, bukan tebakan. | Track record + method; most factual |
| **S5** | We're an Indonesian human capital company. We believe people are the most important asset any organization has, so we give you the evidence to understand and develop them. | Kami perusahaan human capital asal Indonesia. Kami percaya manusia adalah aset terpenting setiap organisasi, karena itu kami memberi Anda bukti untuk memahami dan mengembangkannya. | Belief-led; uses the brief's positioning line |
| **S6** | DEUS measures how people think, behave and grow, then turns it into evidence you can act on. | DEUS mengukur cara orang berpikir, berperilaku, dan bertumbuh, lalu mengubahnya menjadi bukti yang bisa Anda tindak lanjuti. | What we do, plainly; shortest after S2 |
| **S7** | Science-based assessments and people data for Indonesian companies, schools and families. | Asesmen berbasis sains dan data manusia untuk perusahaan, sekolah, dan keluarga di Indonesia. | Descriptive, no verb; reads like a brand descriptor |

**Picked (owner, 2026-10-22): S6.** "DEUS measures how people think, behave and grow, then turns it into evidence you can act on."

**Recommendation before the pick: S3.** It's the only one where the reader sees both ends of what DEUS does (children and employees) in one line, which is exactly what the team's note asked for, and "the people in your care" speaks to an HR head and a parent at once. S4 is the safer pick if the team wants a fact (since 2022) up front.

### Also affected once a headline is picked

- **SEO description** (`content/en/home.md` line 6) repeats "know who to hire and prove who to reward". Update it to match; it may keep the product names, since it's for search.
- **"From hire to reward"** (Home §4) keeps its company focus. It's a section about the employee cycle, so hire and reward still fit there; Potentia has its own band in §5.

## Decision

- [x] Headline: A (owner, 2026-10-22)
- [x] Sub-line: S6 (owner, 2026-10-22)
- [x] Copy updated in `content/en/home.md`, `src/content/en/home.ts`, the SEO description and `tests/e2e/home.spec.ts`; the ID wording above is kept for the translation phase

---

# The notes in full, page by page

The team's words, as sent (with the ✅ / ⌛️ marks they had), then what we propose. Proposed wording is a draft for the owner; nothing is built until the matching task runs.

## Home

> **Header.** Untuk tombol dropdown bagian Solutions bisa di-consider bentuk layout lain karena saat ini ga seimbang; bagian untuk assessments jauh lebih panjang daripada untuk DEUS Enhance ✅

**F42**: done (`2a3a1ca`, stacked rows).

> **Section 1: Intro.** Punchline kurang mewakili semua produk DEUS. Who to hire/reward ga termasuk Potentia di dalamnya. Mungkin bisa cari punchline yang fokus ke who DEUS is > branding utama DEUS ⌛️ / Sebaiknya penjelasan punchline tidak langsung sebut nama produk. Lebih fokus ke DEUS itu apa ⌛️

**F41**: done (see the F41 section above).

> **Section 2: Employee Journey, Trusted By…** Sebaiknya belum perlu mention nama product dulu. Lebih fokus ke tahap-tahap yang dilalui, dari awal hingga akhir / Line 1 dan 2 untuk bagian "Trusted By" redundant. Mungkin line 1 bisa lebih fokus ke 40+ brands, sementara line 2 baru sections-nya. Ide menarik, bisa juga tambahin animasi tulisan sections-nya entrance right dan exit left on a loop biar menarik

- **F43** (the sky window beside the hero): "Plays DEUS Discover" → "Plays an assessment game"; "Q1 2026 appraisal, DEUS Enhance" → "Q1 2026 appraisal". The three steps keep their stage dates (assessed, hired, appraised), which is the journey the team asks for.
- **F44**: line 1 → "Trusted by **40+ brands** across Indonesia."; line 2 → the industries, one at a time (D4).

> **Section 3: Why DEUS Exists.** Mungkin perlu dicek ulang apakah masalah utama yang kita jawab adalah weak evidence atau engga, atau mungkin adalah gabungan dari >1 hal. Menurutku market Indonesia juga seringkali bermasalah dengan scattered data

- **F45**: see D6. With (a), the paragraphs stay; they already show both (a CV and a practiced psychotest = thin; "five spreadsheets" = scattered).

> **Section 4: Where We Help.** Subheader sebaiknya dalam 2 baris saja / Jeda antar cards pada bagian ini sebaiknya lebih cepat, karena saat ini user tidak sadar setiap bagian clickable/tampilan dapat berubah / Pada setiap cards, better hapus label nama produk, karena memberikan kesan bagian tersebut dapat di klik

- **F46**: "One partner, from the first assessment to the last bonus decision." → "One partner, from first assessment to final bonus."
- **F47**: shorten the time each card stays before switching, and check it at 1280 that the change is noticeable.
- **F48**: remove the "Game-Based Assessment" / "DEUS Enhance" line under each card.

> **Section 5: Our Solutions.** Subheader sebaiknya dalam 2 baris saja / Perlu dipertimbangkan apakah besar cards pada bagian ini memang beda-beda atau engga, plus card untuk product Potentia tidak langsung keliatan di awal (harus scroll dulu) / Penjelasan untuk card "Game Based Assessment" saat ini tidak beginner-friendly, dengan arti user tidak akan langsung menangkap maksud dari deskripsi dalam sekali baca. Hindari terms sebisa mungkin serta pastikan menggunakan bahasa umum dan awam

- **F49**: "Three solutions, built on the same idea: better evidence about people." → "Three solutions, one idea: better evidence about people."
- **F50**: three cards of the same size, all in view together at 1280 (checked with a screenshot).
- **F51**: now "Four modules on one platform: Personality · DEUS Discover, Cognitive, Neuroscience and Simulation. Games that reveal personality and competencies, and show how someone thinks, handles risk and makes decisions under time pressure." → "Short online games that show how a candidate thinks, works and makes decisions. Results are scored for you, ready the moment they finish."

> **Section 6–8: Details on each product.** Perlu dipertimbangkan lagi apakah butuh atau engga. Saat ini redundant dengan bagian sebelumnya (Section 5) / Even kalau masih mau di-keep, khusus untuk Section 8 tentang Potentia rasanya aneh kalau tiba-tiba dijelaskan dalam bahasa Indonesia, sementara yang lain menggunakan Inggris

- **F52, F53**: see D1.

> **Section 9: Why DEUS.** Evidence over gut feel: Instead of mentioning menggunakan teori apa dan dipisah per produk, fokus ke kenapa kita lebih dari gut-feel. Misalnya, karena kita data-driven / Built for Indonesia: pertimbangkan ulang karena saat ini poin ini hanya khusus untuk produk asesmen doang / Ready for volume: sama seperti poin nomor 1, jangan cm fokus penjelasan untuk produk asesmen doang. Instead, lebih fokuskan ke kenapa semua produk DEUS ready for volume, misal mass upload, semua dianalisis menggunakan sistem, dll. / A partner, not just a vendor: idem

- **F54–F57**: each point gets rewritten to hold for every product, from the facts in "Facts and assets needed". Drafts come to the owner in R14 before they're built; no claim goes in that the product team hasn't confirmed.

> **Section 10: Recognition.** Not sure maksud dari bagian ini apa, karena kontennya lebih cocok ke milestone. Frasa "backed by…" mengimplikasikan partnership

- **F58**: see D2.

> **Section 11: Let's Talk.** Saat ini ada dua tombol yang redundant, yaitu "Chat on WhatsApp" dan nomor WA yang tertera di bawahnya. Pls consider

- **F59**: see D3. The same note came for Enhance §10 and About §7; it's one shared closing section, so one fix covers all three (and every other page that uses it).

## Solutions: Game-Based Assessment

> **Section2 Awal Game Based Assessment.** (1) Current headline: Reveal Real Potential Through Play. Rekomendasi headline: Game based assessment for a better hiring experience. Feedback: Mungkin headline utama baiknya masukkan keyword "Game Based Assessment" supaya lebih seo/geo optimized dan straight to the point. (2) Current headline: The usual psychotest has stopped telling you much. Rekomendasi headline: The challenges of traditional psychometric testing in Recruitment. Feedback: Headline yang sekarang belum langsung jelaskan konteks recruitment. Mungkin bisa pakai alternatif yang lebih jelas, pakai keyword2 yang relevan untuk search engine google. Untuk subheading "Scoring eats your week", mungkin bisa diubah alternatifnya jadi subheading seperti: "Manual scoring slows down hiring", yang lebih mudah ditangkap. (3) Current headline: Built so the results are worth trusting. Rekomendasi headline: A smarter assessment for better hiring results. Feedback: Baiknya pakai headline yang langsung menujukkan manfaat asesmen untuk hiring. (4) Current headline: Four modules. Use one, or use them all. Rekomendasi headline: All your talent assessments in one platform. Feedback: Headline ini lebih straightforward dalam menjelaskan keunggulan gba.. keyword "Talent Assessment" juga mungkin membantu perjelas produk DEUS bagi user dan search engin
>
> **Section Personality Test.** Judul utama baiknya diganti DEUS Discover: "Personality Test" (font dibesarkan), Subjudul nya: "know your candidates before the interview", (font dikecilkan). Kalimat "Results that read like they were written for your company, because they are" baiknya di hilangkan saja agar tidak terlalu panjang
>
> **Section Cognitive.** Judul utama diubah jadi "Cognitive Assessment" (font dibesarkan). Subjudul kalimat "seven games. seven ways of thinking" diubah jadi Measure Cognitive Skills through seven interactive games (font dikecilkan). Kalimat "The cognitive games are grounded in classical frameworks for measuring processing speed, memory, reasoning and attention" dihilangkan saya agar tidak terlaulu panting
>
> **Section Neuroscience.** Judul utama diubah jadi "Neuroscience Assessment" (font dibesarkan). Subjudul kalimat dari "the things people can't easily fake in an interview" diubah jadi "Neuroscience Assessment that reveal real candidate behavior" (font dikecilkan). Kalimat "The neuroscience module adapts behavioral tasks from neuroscience research, designed to reveal risk-taking, motivation, effort and emotion recognition through what people do rather than what they say" dihilangkan saja agar tidak terlalu panjang
>
> **Section Simulation.** Judul utama diubah jadi "Simulation Assessment" (font dibesarkan). Sub judul kalimat "a real business problem, against the clock" diubah jadi: "Simulation Assessment to test business problem solving skills" (font dikecilkan)
>
> **Note tambahan.** Kalau memungkinkan, section Personality, Cognitive, Neuroscience dan Simulation bisa ditambahkan tombol geser ke kanan juga. / Beberapa keyword utama ku coba ambil dari page GBA Agate, karena tim mereka harusnya sudah research untuk optimasi search engine/GEO: https://agatelevelup.com/game-based-assessment/ / Keyword2 utama lebih baik dimasukkan ke judul2 section untuk mempermudah visibility di search engine/GEO
>
> **Untuk Section: How it Works, The Platform Behind It, The Science, Before and After, Getting Started.** Bisa dipertimbangkan lagi apakah section2 ini perlu dimasukkan ke dalam web, karena sepertinya lebih cocok untuk di introduce saat presentasi saja, karena banyak detail dan kemungkinan tidak akan terlalu di baca dan untuk website, terlalu panjang kalau mau scroll sampai paling bawah ..informasi penting seperti "Pricing" cukup jauh untuk di reach. Bisa refer kembali ke website GBA Agate, informasinya straight to the point, tidak membingungkan pembaca dengan terlalu banyak informasi

**D9 headline set** (sentence case, as on the rest of the site). The team's suggestion is used as is wherever it reads well.

| # | Where | Now | Team's suggestion | Proposed |
|---|---|---|---|---|
| F60 | Hero | Reveal real potential through play. | Game based assessment for a better hiring experience | **Game-based assessment for better hiring.** |
| F61 | The problem | The usual psychotest has stopped telling you much. | The challenges of traditional psychometric testing in Recruitment | **Why traditional psychometric tests fall short in recruitment.** |
| F61 | The problem, card | Scoring eats your week | Manual scoring slows down hiring | **Manual scoring slows down hiring** |
| F62 | Three principles | Built so the results are worth trusting. | A smarter assessment for better hiring results | **A smarter assessment for better hiring results.** |
| F63 | Modules | Four modules, one platform. | All your talent assessments in one platform | **All your talent assessments on one platform.** |
| F64 | Personality title / sub | Know your candidates before the interview. | DEUS Discover: "Personality Test" / know your candidates before the interview | **DEUS Discover: Personality Test** / Know your candidates before the interview. |
| F65 | Cognitive title / sub | Seven games. Seven ways of thinking. | Cognitive Assessment / Measure Cognitive Skills through seven interactive games | **Cognitive Assessment** / Measure cognitive skills through seven interactive games. |
| F66 | Neuroscience title / sub | The things people can't easily fake in an interview. | Neuroscience Assessment / Neuroscience Assessment that reveal real candidate behavior | **Neuroscience Assessment** / See how candidates really behave, not only what they say. (The suggestion repeats the title and has a grammar slip.) |
| F67 | Simulation title / sub | A real business problem, against the clock. | Simulation Assessment / Simulation Assessment to test business problem solving skills | **Simulation Assessment** / Test business problem-solving skills against the clock. |

- **F64–F67 layout**: each module gets a large product title and a smaller sub-line, so the module name is what a reader sees first. The sentences the team marks go (F64's "Results that read like…"; F65 and F66's science lines per D8).
- **F68**: a "next" arrow beside the module pill (and swipe on a phone) that moves to the next module; the "Next module" link at the end of each panel stays.
- **F69**: in R15, read Agate's page for the keywords they lead with (game-based assessment, talent assessment, psychometric test and so on), check them against the table above and the remaining section headings, and bring any further changes to the owner. The site is `noindex` until Task 7.5, so this lands before search engines see it.
- **F70**: see D7.

## DEUS Enhance

> **Section 1: Intro.** Make sure tampilan ini ttp berbeda dengan tampilan intro di homepage, karena saat ini layout, design, dan font size sama persis → user bisa bingung sekarang dia di halaman mana / Product screenshot saat ini kurang mewakili DEUS Enhance. Karena tagline adalah "every KPI, review, and pay decision," maka sebaiknya screenshot mewakili tagline itu. Akan lebih baik jika ada animasi/video yang menunjukkan gimana proses dari review bisa berubah ke pay decision

- **F71, F72**: see D10.

> **Section 2: The Problem.** Up Next bukan "See How Enhance Closes Each Gap," tapi "What the Gap Looks Like Daily." Either change the label atau change the section name

- **F73**: the label becomes "Up next: What the gap looks like, daily".

> **Section 4: The Solution.** Design ambiguous. User tidak akan sadar bahwa bagian cards bisa di-scroll. Better behaviour seperti di homepage Section 4 / Berhubung cards + tampilannya sudah mengambil satu halaman sendiri, bagian "Turn Results Into Better Decisions" seakan terpisah dan tidak punya makna. Either change the layout atau discard bagian ini

- **F74**: the scroll-linked cards become the switcher Home's "Where we help" uses (cards that change on their own and on click, with the picture beside them). It must still show all steps with JavaScript off (Review focus 5 in `IMPLEMENTATION_PLAN.md`).
- **F75**: see D11.

> **Section 5: From Rating to Reward.** Perlu dicek lagi tujuan bagian ini apa, karena sebenarnya redundant. Section sebelumnya sudah menjelaskan berbagai proses di Enhance from end-to-end, lalu mengapa harus ada penjelasan berulang tentang rating to reward? / Jika pun mau disimpan, better hilangkan bagian kosong di sebelah subheader dan deskripsi / Konten tidak sejalan dengan subheader. Saat ini, konten menekankan hanya kepada step "reward"nya, padahal subheader fokus ke "from rating to reward." / Bagian "So when an employee asks "why?", there's an answer" cukup ambigu, terutama bagi user yang tidak terbiasa dengan bahasa inggris. Bisa memberikan kesan bahwa ini adalah pertanyaan dengan jawaban di section berikutnya

- **F76**: see D11. With (a), the bonus-cycle screens still appear, inside step 6.

> **Section 6: Supported Beyond the Platform.** Titik oranye hanya di bagian paling ujung memberikan kesan bagian itu lebih penting dibandingkan yang lain. Jika memang yang ditekankan adalah proses, sebaiknya tambahkan animasi

- **F77**: see D5 (same component as About's journey).

> **Section 7: Is It A Fit?** Redundant dengan Section "What This Gap Looks Like." Unless ada pertimbangan lain, better discard

- **F78**: see D12.

> **Section 8: Next Step.** Rasanya kurang tepat jika penjelasan "Start Where It Matters Most to You" digabung dengan forms booking. Bagian deskripsi masih fokus tentang bagaimana adopsi Enhance mudah, tapi sebelahnya sudah langsung call to action / Bagian forms booking juga redundant, karena di bawah (Section 10) ada lagi tombol untuk chat WhatsApp atau book call. Better forms booking ada di bagian bawah bersama dengan CTA lainnya / Bagian "Prefer to talk first?" juga sebaiknya digabung saja ke bawah karena redundant / Aku ada coba submit lewat forms booking. Saat ini tidak ada parameter untuk phone number, sehingga tulis huruf juga bisa

- **F79**: see D13.
- **F80**: a real bug, in both forms (they share `src/lib/leads/schema.ts`, where the field is a free text line). Fix: accept digits, spaces, `+`, `-` and brackets only, 8–15 digits, with an error message in the form's style, and a phone keyboard on mobile (`type="tel"`). The message's wording goes to the owner with the task.

> **Section 10: Let's Talk.** Saat ini ada dua tombol yang redundant, yaitu "Chat on WhatsApp" dan nomor WA yang tertera di bawahnya. Pls consider

- See F59 / D3.

## Clients

> **Starting page, Section 2: Industries.** Ide menarik, bisa juga tambahin animasi tulisan sections-nya entrance right dan exit left on a loop biar menarik / **Section 3: Client Stories.** Bisa tambahin juga cerita tentang DKB/BCG supaya cards nya tidak hanya satu sendirian

- **F81**: see D4 (same component as Home's trusted-by line).
- **F82**: needs the story material and permission (Facts table). Calvin Christian School's story is written and waiting only for Q11; turning on `publishCalvin` would also give Telkom a neighbour.

> **Client story, Header.** Better sediakan tombol "back to previous page" (or something along those lines) untuk memudahkan navigasi / **Section 1: Intro.** Hindari label dengan format seperti "[TEKS 1] · [TEKS 2]" karena kesannya panjang dan dapat membingungkan user / Header sebaiknya maksimal 2 baris, jangan terlalu banyak seperti ini. Punchline juga masih sangat AI-sounding / **Section 4: Planning an Intake?** Header maks 2 baris

- **F83**: "← All client stories" above the story's label, linking to `/clients`.
- **F84**: see D15.
- **F85**: "1,000+ Management Trainee candidates. 30+ provinces. Results in one day." (three fragments in a row is the AI pattern the team hears) → "**1,000+ trainee candidates across 30+ provinces, assessed with results in one day.**" One sentence, same facts; checked for two lines at 1280 and 390.
- **F86**: the closing heading "Planning an intake?" is short, so the long part is its sub-line; shorten that to two lines at 1280 ("We'll show you how a nationwide intake runs on DEUS, from the first upload to the final ranked list.").

## About

> **Section 1: Intro.** Awkward AI grammar "make people decisions on better evidence." / **Section 2: Our Story.** Kalimat terakhir …"and expanded our assessments…" bisa diganti dengan kalimat yang lebih fokus dengan tagline apa sebenarnya DEUS itu / **Section 3: Our Mission.** Kenapa ada dua bagian untuk Mission? / **Section 4: The Six Is.** Hindari AI slop. Desain dengan identical card grids seperti ini dengan bg yang lebih gelap seringkali mengindikasikan kepada user cards bisa di hover/di klik / **Section 5: Our Journey.** Titik oranye hanya di bagian paling ujung memberikan kesan bagian itu lebih penting dibandingkan yang lain. Jika memang yang ditekankan adalah proses, sebaiknya tambahkan animasi / **Section 6: Recognition.** Better gausah. Terlalu banyak di mention justru memberikan efek boomerang; seakan pencapaian DEUS 'hanya' itu. Pertimbangkan juga warna background pada bagian ini yang 'nabrak' dengan section berikutnya, sehingga memberikan kesan tidak rapih / **Section 7: Let's Talk.** Saat ini ada dua tombol yang redundant, yaitu "Chat on WhatsApp" dan nomor WA yang tertera di bawahnya. Pls consider

- **F87**: "…working with businesses across the country to make people decisions on better evidence." → "…working with businesses across the country so that decisions about people rest on real evidence."
- **F88**: the last sentence keeps the facts but ends on the brand line: "Since then, we've represented Komdigi at Innovfest by NUS x AsiaTech in Singapore, launched Potentia to bring the same science to children, and added cognitive, neuroscience and simulation games. It all comes back to one belief: every person has potential, and our job is to help you see it."
- **F89**: see D14.
- **F90**: the six values become a plain list on the page background (letter, value, one line), no card boxes, so nothing looks clickable.
- **F91**: see D5. **F92**: see D2. Let's talk: see F59 / D3.

## Privacy

> Untuk bagian ini baiknya konsultasi dengan Ko Will juga, berhubung lebih tech-related, namun beberapa keynotes dariku adalah: Pastikan bahwa yang ditulis di bagian ini dimengerti oleh user awam, bahkan mereka yang tidak mengerti tech terms. Tidak ada gunanya membuat Privacy Policy yang menjelaskan tentang kerahasiaan data jika orang yang membacanya tidak akan mengerti / Sebaiknya kata "UU PDP" diganti jadi frasa "perundang-undangan yang berlaku." Walaupun memang lebih spesifik, UU kita seringkali berubah-ubah sesuai kemauan bapak presiden :) Dan mungkin ada UU lain (di luar PDP) yang mengatur tentang kerahasiaan data / Masukkan alamat kantor juga
>
> **Section 1: Header.** Label dan judul halaman redundant. Pastikan bahwa nama label dan page header mencerminkan apa yang ditulis di bagian footer halaman / "We only collect what you type.." apakah betul? Saat ini bersifat kontradiktif karena di bawahnya menjelaskan kita mengambil informasi yang TIDAK mereka ketik, seperti timestamp atau IP address
>
> **Section 3: What We Collect.** Penjelasan tentang "scrambled code" dan "NEXT_LOCALE" tidak user-friendly / Sama seperti section 1, frasa "If you only browse the site, it stores nothing about you" juga kontradiktif
>
> **Section 5: Who Sees Your Data.** Apakah ada pertimbangan kenapa vendor untuk "our email provider" tidak disebut? / WhatsApp juga sebaiknya dimasukkan ke dalam daftar
>
> **Section 7: How Long We Keep It.** Apakah memang betul-betul 2 tahun? Ada pertimbangan kah? Karena saat ini kesannya lama banget

The text lives in `src/content/en/privacy.ts` (there is no Markdown copy). Proposed direction, for Ko Will's review before R18 is built:

- **F93**: one plain-language pass over the whole page: short sentences, no technical names where a description does (but provider names stay, since they're what a reader can check).
- **F96**: the footer link says "Privacy policy"; the page's small label ("Privacy") goes, and the title stays "Privacy policy".
- **F97**: "we only collect what you type into our forms" → "we collect what you send us through our forms, plus a few technical details every website needs to run safely."
- **F98**: the IP code → "To stop spam, we keep a coded version of your internet address that can't be turned back into the address itself." NEXT_LOCALE → "If you switch the site's language, a small file (a cookie) remembers your choice until you close your browser."
- **F99**: "If you only browse the site, it stores nothing about you" → "If you only browse, we don't store anything that identifies you. Our hosting provider keeps short technical logs for security, which it deletes after a short time."
- **F100–F101**: name the email provider and add WhatsApp (Meta), once the owner confirms both (Facts table).
- **F95**: the address shows once Q9 is answered (`showAddress` in `src/content/flags.ts`).
- The unit test `tests/unit/privacy-page.test.tsx` checks the page still describes every stored field, so the rewrite can't silently drop one.
