# What I need from you

Everything the site is waiting on from you (or from someone you ask). Tick an item when you send it; Claude ticks it too when it arrives and wires it in. Details and history stay in the files named in "Where"; this is the short list. The build plan's **Waiting for the owner** list (`docs/build-plan.md`) tracks the same items for releases.

*Updated 2026-10-23.*

## 1. Screens and pictures

Send screens as PNG, at least 1360px wide (2× for sharp screens), with no real employee or candidate names on them. Drop them in a message or in `image-components/`.

- [x] **Enhance, for the new hero animation (F72, D10):** *Done 2026-10-23: the owner chose a PA cycle's Data Details screen (`revisions3.0team/kpi-setup.png`) over a KPI setup screen; it's the hero's first step as `public/assets/enhance-pa-cycle.png`.* Optional still: a screen that shows one employee's bonus band, if you'd rather end on that than on the Bonus Dashboard.
- [ ] **Enhance, still missing:** a sharper `enhance-1.png` (solution step 3, "Review performance"; needs 1360px, now 811px). *Done 2026-10-23:* solution steps 1 and 2 now show the KPI & Competency Library and the dashboard's Team Members table, instead of a product overview. *No longer needed since R16b:* salary increase, bonus cycle setup and bonus participants (their section is cut; step 6 uses the Bonus Dashboard).
- [ ] **Enhance, found in the 2026-10-22 picture check:** a sharper `enhance-pa-dashboard.png` (step 2 of the Enhance hero; needs about 1360px, now 921px). *Done 2026-10-23:* the talent map (solution step 5) is the owner's nine-box screen.
- [ ] **GBA:** one product shot for the GBA hero (front view of the GBA or the HR dashboard, F12); a sharper `gba-1-crop.png`. *No longer needed: the individual report, since Reports left the GBA page in round 4.*
- [ ] **Discover:** a real Discover story scene (F19; the Personality card still shows it). *No longer needed: the report crop (F19) and the sharper `discover-report-crop.png`, since Reports left the GBA page in round 4.* (The individual profile suitability report arrived 2026-10-23.)

- [ ] **Clients and About have no pictures yet.** The ones they're waiting for: the Telkom group photo at Graha Merah Putih (group 4, Q7), leadership photos (group 7, Q10). New and optional: a photo for the Calvin Christian School story (a class or a teacher using Potentia), only with the school's permission for any child who can be recognised.

*No longer needed:* the three recognition logos (Startup Studio, Innovfest, Tech in Asia). Recognition is cut from Home and About (D2).

## 2. Facts from the product team

- [ ] **"Why DEUS" on Home (F54–F57):** R14b rewrote the four points from facts already confirmed; please read them on Home. Three answers would let them say more. (1) Can Enhance import employees and KPIs in bulk? Allows: "Invite a whole intake or load every employee from one spreadsheet, …" in "Ready for volume". (2) Is Enhance in Bahasa Indonesia? Allows bringing back "Built for Indonesia": "Every DEUS product runs in Bahasa Indonesia, and our assessments, for adults and for children, are normed on Indonesians." (3) What support do Potentia schools get (for example, help reading the classroom dashboard)? Allows adding "…and help schools read their classroom dashboard" to "We stay involved" (was "A partner, not just a vendor"). *Unblocks: those three sentences.*
- [ ] **Enhance FAQ, three buyer questions (GEO G1.6):** (1) How long does setting up Enhance usually take, from the first call to the first appraisal cycle? (2) Where is Enhance's data stored, and how is it secured (Q18)? (3) Can managers and employees use Enhance on their phones? *Unblocks: one FAQ item on the Enhance page for each answer, which AI tools can quote.*
- [ ] **Enhance solution card 3, "Turn results into pay"** (was step 6 until round 4, Phase E): check that "Connect ratings to bonuses, incentives, salary increases and development, so similar performance leads to similar rewards." matches what Enhance does. Its screen, Reward Grouping, shows groups by job level (Supervisor, Staff, Executive), so the alt only says employees are assigned to reward groups.

- [ ] **Round 5 (team's open items, `revisions5.0team/round5-implementation-plan.md`):** whether admin@deushcs.com's inbox is Titan, as the mail records show (D6). On hold: what Thania meant by "HOAFL played only 22 mins" (F106). *Unblocks: the plan's "Before the run" line.*

## 3. Approvals from you

- [x] **Approved sample data for the launch (Task 7.4):** *approved as it is, 2026-10-23.* the site still shows the mockup's sample data in three places: the Home hero journey (`src/content/en/home.ts`, `hero.journey`: "Rina Wulandari", Rational 94 / Empathy 75 / Diplomatic 60, "Recommended for the 2025 MT intake", appraisal 3.05 with KPI 2.96 and Competency 3.40, "Bonus band B", March 2025 to March 2026, "22 minutes"); the GBA hero window (`src/content/en/game-based-assessment.ts`, `hero.window`: "22 minutes" and the suitability report alt text with 90/100 and the 99th percentile, shown on the screenshot the team sent); and the same journey wording on the styleguide, which is not public. Either approve them as they are (they are labelled "Example" on Home), or send replacements and Claude swaps them in. *Unblocks: the sample-data line of 7.4.*
- [ ] **Round 4 headings (replaces D9's GBA headline table):** approve the round 4 headings in `revisions4.0/copy-changes.md`. Phase V rewrote headings, buttons and FAQ questions across the site in plain words; each page's table lists them before → after. Say yes or change any row. *Unblocks: the release that carries Phase V.*
- [ ] **Enhance form:** wording for the two error messages on the required dropdowns (role, number of employees).
- [ ] **New copy for AI answers (GEO plan G1, reviewed 2026-10-23):** one summary paragraph each on Home (end of "Why DEUS exists"), Solutions (under the hero), GBA (opening the top section, "What makes game-based assessment different.", since round 4 removed The problem) and Enhance (opening "The problem"), About (opening the story) and Clients (under "Where our clients work."), plus the new GBA FAQ items (the cost one went in round 4: the page shows no price) and four new Enhance ones. Every fact comes from the site's approved copy and the brief, and none sits behind a switch, so it goes live with the next release. Read them on `staging` (`npm run preview`) and say yes or change any. *Unblocks: nothing; it ships unless you object.*
- [x] **Phase 4 sign-off** (Clients pages). *Signed off 2026-10-23.*

## 4. Clients

- [ ] **DKB/BCG story (F82):** what DEUS did for them, any numbers, a quote if there is one, and permission to name them.
- [ ] **Q7, Telkom:** permission to name Telkom, show the Graha Merah Putih photo (send the file) and use Ibu Lina's quote.
- [ ] **Q11, Calvin Christian School:** permission to name the school, and the correct names and titles for both quotes. The story is written and ready to switch on.
- [x] **Q8, client logos:** every client may be shown (owner, 2026-10-23); the wall is on. Still welcome: Omosando's logo and a proper Glamify wordmark (Glamify shows its app icon for now). NeutraDC, Ocean8, Helios Capital (Asia, Jakarta), EliteAir (PT Elite Air Industrial) and Healthy Choice (PT Indospirit Natura) checked 2026-10-23.

## 5. Company details

- [ ] **Office address (Q9)** and business hours. *Shows on Contact and Privacy.*
- [ ] **Email provider** for admin@deushcs.com (Google Workspace, Microsoft 365, …). *Named on Privacy (F100).*
- [ ] **How WhatsApp is run:** the WhatsApp Business app on a phone, or a service provider. *Named on Privacy (F101).*

## 5b. Google: start now, before launch

So a search for "DEUS Human Capital Services" finds the new site from launch week. Steps and defaults: the first line of Phase 7 in `IMPLEMENTATION_PLAN.md`.

- [ ] **Google Search Console:** *TXT record in DNS since 2026-10-23; the 12-month export is still welcome.* add deushcs.com as a Domain property (one new TXT record at Hostinger; nothing else in DNS changes), then export the last 12 months (Pages and Queries) into `docs/seo/`. *Unblocks: redirects for the old pages people still visit (7.3b).*
- [ ] **Google Business Profile** for DEUS Human Capital Services, website https://deushcs.com. Needs the office address (Q9, §5); verification can take days to weeks.
- [ ] **Profile links:** the LinkedIn company page and any other official profiles. *Unblocks: `sameAs` in the site's company data (7.1).*
- [ ] **The old blog:** about 60 WordPress articles won't be on the new site. Unless you say otherwise, each redirects to the closest product page. Bringing them over is the Blog item in §8.

## 5c. Analytics: before launch

- [ ] **Vercel Web Analytics:** in the Vercel project, open the Analytics tab and turn Web Analytics on. Then check the plan: custom events (the six the site sends: CTA, WhatsApp, email, form, language and Potentia clicks) need Pro or higher, and aren't recorded on Hobby. *Unblocks: the visit and click counts after launch (7.3), and counting WhatsApp enquiries by where visitors came from (GEO plan L1).*

## 6. Ko Will: Privacy review

- [ ] Ask Ko Will to review the Privacy page: **ready now** (R18 rewrote it in plain words, 2026-10-22; the text is in `src/content/en/privacy.ts`). He also confirms: naming the Personal Data Protection Law once (D16), keeping data two years with the reason given (D17), the 3 × 24-hour deadlines, the overseas-storage wording (Singapore, United States), who on the team can open the leads, and whether a data protection officer must be named. Full list: the Privacy row in `docs/build-plan.md`. New since: the forms now also record the first page of a visit and the name of the website that sent the visitor, and WhatsApp click counts record that website's name (GEO plan L1, built; the text is in "What we collect"). Also new (L2, built, switched off until the sample PDF arrives): a short form offering the sample report, named in the first line of "What we collect"; it records which download was asked for. The Phase L review also corrected the campaign-tags sentence there: the tags are kept from any tagged link, including the ones some AI assistants add, not only from DEUS campaigns.

## 7. Later (not blocking the round 3 fixes)

- [ ] **Leadership (Q10):** photos and short bios, for About.
- [ ] **News coverage (R8, F29):** the list of real articles (outlet, headline, date, link).
- [ ] **Indonesian reviewer (Q14):** a native speaker to check the Indonesian pages after launch.

## 8. Reminder: two sections to add

Not built yet. Say when you want each one planned; these are what each needs from you first.

- [ ] **Clients: the project list** (`/clients/projects`, WEBSITE-PLAN §5.8, Q22). A list of past projects under the client stories: client (or "a national FMCG company" when it can't be named), industry, product, year and size. Needs: the project records from the team, and which clients may be named.
- [ ] **Blog (insights and articles)** (WEBSITE-PLAN §12, item 4: Indonesian articles for search, such as "Cara memilih psikotes untuk MT"). Needs: your go-ahead, the first few topics and who writes them. *Mostly answered 2026-10-23: the GEO plan's Guides (G3, seven topics, written under the company's name) and G4 (guides 1 and 2 in Indonesian) cover it.*

## 9. Inbound leads (GEO plan, 2026-10-23)

The site has to bring in leads on its own, so these matter most after the client permissions in §4 (Telkom Q7 and the DKB/BCG story F82): a named result is what turns a visitor into a lead. Plan: `SEO/geo-implementation-plan.md`.

- [ ] **Who answers new leads, and how fast.** Name the person (or two) and a reply time you can keep, such as "within one working day". Then add their emails to `LEAD_NOTIFY_TO` in Vercel (Settings → Environment Variables, Production, comma-separated) and redeploy, and tell Claude the reply time so the thank-you message promises it (`replyTime` in `src/content/flags.ts`). The first company to reply usually wins an inbound lead. *Unblocks: the promised reply time.*
- [ ] **A log of WhatsApp enquiries.** WhatsApp chats never reach the leads table. A shared sheet is enough: date, company, product, how they found DEUS (ask them), and what came of it. Without it the monthly numbers count only forms. *Unblocks: honest monthly lead counts.*
- [ ] **Sample report PDF (L2):** one GBA candidate report with sample data only (no real candidate), as a PDF. Or say "write a checklist instead", and Claude drafts a one-page Management Trainee assessment checklist for you to approve. *Unblocks: the download offer (`showSampleReport`).* On the GBA page it sits just before the FAQ since round 4 (Reports is gone). The block is built (L2): copy in `content/en/global.md` "Download offer", its look in `screenshots/l2/` on this server or `/en/styleguide` (ready, errors, sent). Its card layout has no mockup, so it's built from the guide's existing pieces; say if you want it changed. Drop the file at `public/downloads/gba-sample-report.pdf` and ask Claude to turn the switch on.
- [ ] **Numbers for guide 7 (G3.5):** DEUS's own findings, put in `SEO/data/assessment-findings.md` or sent to Claude. For a period you choose: how many candidates and how many companies (not named), by program (Management Trainee, campus, internal), completion rate, typical time to finish, and anything else the team finds surprising. Combined numbers only, so no client or candidate can be recognised, with a line on how each was counted. *Unblocks: guide 7, the piece AI tools and HR media are most likely to quote.*
- [ ] **Use-case pages (G2.1), facts to make them stronger:** the four pages are drafted in `content/en/use-cases/` from existing facts only. Three answers would let them say more. (1) Which modules Telkom's MT intake used (the Management Trainee page could then say so). (2) A campus drive or an internal talent review DEUS has run, even unnamed ("a retail group assessed N graduates"), for the campus and talent-mapping pages, which have no client example. (3) An Enhance client example (Q18) for the appraisal-to-pay page. Please also read the four pages' wording before a release; they're new copy. *Unblocks: a client example on each page.*
- [ ] **Telkom logo beside the unnamed story (G2 review):** the use-case pages (and Home, GBA) show the approved logo wall, which includes Telkom Indonesia and Telin, while the copy says "a national telecom group" because `telkomNamed` (Q7) is off. A reader can link the two. Either is fine to Claude: say "name Telkom" (turn `telkomNamed` on) or "keep it" and nothing changes. *Unblocks: a consistent Telkom mention.*
- [ ] **Use-case layout (G2.2, G2.3), no mockup:** the shared page (DESIGN-GUIDE §7.30) is built from the guide's existing pieces. G2.3 added two-across cards for four, and a line under the cards with one link. Say if you want it changed, or send a mockup. *Unblocks: the final look of the four pages.*
- [ ] **Guide layout (G3.2), no mockup, and the wording of guides 1 and 2:** the shared article page and the `/guides` index (DESIGN-GUIDE §7.31) are built from the guide's existing pieces, in the privacy page's reading column. The two guides are new copy, drafted in `content/en/guides/` from existing facts and linked sources only; please read them before a release (each guide's `published` field, and `showGuides` in `src/content/flags.ts`, turn them off). The author is the company until you name a person. Guides 3 to 6 (Management Trainee recruitment, campus screening, appraisal to pay, KPIs and competencies) are drafted the same way in `content/en/guides/` (G3.3, 2026-10-23) and are on the site on `staging` from G3.4; read them there too. Guides 5 and 6 name two Indonesian regulations (PP 36/2021, Permenaker 6/2016) from Hukumonline summaries; worth a look from whoever handles your legal questions. Say if you want the layout changed, or send a mockup. *Unblocks: the final look of the guides.*
- [ ] **Related guide links (G3.4), no mockup, and which guide each page names:** the GBA page, the Enhance page and the four use-case pages show one "Related guide" line under their FAQ (DESIGN-GUIDE §7.31). Each page names one guide in its `relatedGuide` field: GBA and talent mapping name "What is game-based assessment?", Enhance names "Setting KPIs and competencies…", Management Trainee names "How to run Management Trainee recruitment…", campus names "Campus recruitment: screening…", and appraisal to pay names "How to link performance appraisals to pay…". Say if you want another guide on a page, a different place or style. *Unblocks: the final look of the guide links.*
- [ ] **Indonesian pages (G4):** a native speaker (Q14, §7) reads them before they go live: `/id/contact`, the four `/id/solutions/<slug>` use-case pages, `/id/guides` and its two guides (text in `content/id/`). Facts and links match the English pages (G4 review). What to look at first:
  1. **The H1 and answer passage of each page**, which carry the search phrases: "asesmen management trainee", "rekrutmen kampus", "talent mapping, atau pemetaan talenta", "remunerasi berbasis kinerja" with "sistem appraisal karyawan", "asesmen berbasis game" and "psikotes online". Guide 1's passage ("data yang sulit dilatih lebih dulu oleh kandidat") reads stiff.
  2. **English terms left in:** "appraisal" (the glossary says "penilaian kinerja"; it stays where the search phrase or the H1 needs it), "Batch report", "high-potential", "review talenta", "scoping", "swanilai" (self-report) and "manajer perekrut" (hiring manager). The module names are translated in the header menu ("Kepribadian", "Kognitif", "Neurosains") but kept in English on the pages ("Personality", "Cognitive", "Neuroscience"): pick one.
  3. **Guide 2's "Pemalsuan jawaban" paragraph** (faking), with the one sentence from an Indonesian study (Salsabila et al. 2026, one psychologist interviewed) on test items sold and shared on social media.
  4. **The shared closing panel:** "Siap melangkah bersama DEUS?" is looser than the English "Ready to transform…", and "Mari berbincang" may read stiff. The header's "Tentang" may need to be "Tentang Kami".
  5. **Phrases translated too literally:** "Kandidat pulang dengan kesan…" (campus, guide 2), "meranking" (perhaps "memeringkat"), "Undangan bermerek", the step "Main" (perhaps "Mainkan"), "Ia" for an assessment (talent mapping FAQ, guide 2 FAQ), "hari ini" where "saat ini" fits (appraisal page), "berdampingan dengan kinerja di baliknya" (appraisal page, how it works step 5).
  6. **"Lihat 40+"** under the logo wall, short for "See all 40+" so it fits on a phone, and the 404 and error-page wording added in the G4 review.
- [ ] **Reminder, Indonesian for the rest:** when Phase 6 starts, ask Claude for Indonesian versions of guides 3 to 7 too.
