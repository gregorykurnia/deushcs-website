# What I need from you

Everything the site is waiting on from you (or from someone you ask). Tick an item when you send it; Claude ticks it too when it arrives and wires it in. Details and history stay in the files named in "Where"; this is the short list. The build plan's **Waiting for the owner** list (`docs/build-plan.md`) tracks the same items for releases.

*Updated 2026-10-23.*

## 1. Screens and pictures

Send screens as PNG, at least 1360px wide (2× for sharp screens), with no real employee or candidate names on them. Drop them in a message or in `image-components/`.

- [x] **Enhance, for the new hero animation (F72, D10):** *Done 2026-10-23: the owner chose a PA cycle's Data Details screen (`revisions3.0team/kpi-setup.png`) over a KPI setup screen; it's the hero's first step as `public/assets/enhance-pa-cycle.png`.* Optional still: a screen that shows one employee's bonus band, if you'd rather end on that than on the Bonus Dashboard.
- [ ] **Enhance, still missing:** a sharper `enhance-1.png` (solution step 3, "Review performance"; needs 1360px, now 811px). *Done 2026-10-23:* solution steps 1 and 2 now show the KPI & Competency Library and the dashboard's Team Members table, instead of a product overview. *No longer needed since R16b:* salary increase, bonus cycle setup and bonus participants (their section is cut; step 6 uses the Bonus Dashboard).
- [ ] **Enhance, found in the 2026-10-22 picture check:** a sharper `enhance-pa-dashboard.png` (step 2 of the Enhance hero; needs about 1360px, now 921px). *Done 2026-10-23:* the talent map (solution step 5) is the owner's nine-box screen.
- [ ] **GBA:** the individual report; one product shot for the GBA hero (front view of the GBA or the HR dashboard, F12); a sharper `gba-1-crop.png`.
- [ ] **Discover:** a real Discover story scene plus a sharp report crop (F19); sharper `discover-report-crop.png`. (The individual profile suitability report arrived 2026-10-23.)

- [ ] **Clients and About have no pictures yet.** The ones they're waiting for: the Telkom group photo at Graha Merah Putih (group 4, Q7), leadership photos (group 7, Q10). New and optional: a photo for the Calvin Christian School story (a class or a teacher using Potentia), only with the school's permission for any child who can be recognised.

*No longer needed:* the three recognition logos (Startup Studio, Innovfest, Tech in Asia). Recognition is cut from Home and About (D2).

## 2. Facts from the product team

- [ ] **"Why DEUS" on Home (F54–F57):** R14b rewrote the four points from facts already confirmed; please read them on Home. Three answers would let them say more. (1) Can Enhance import employees and KPIs in bulk? Allows: "Invite a whole intake or load every employee from one spreadsheet, …" in "Ready for volume". (2) Is Enhance in Bahasa Indonesia? Allows bringing back "Built for Indonesia": "Every DEUS product runs in Bahasa Indonesia, and our assessments, for adults and for children, are normed on Indonesians." (3) What support do Potentia schools get (for example, help reading the classroom dashboard)? Allows adding "…and help schools read their classroom dashboard" to "A partner, not just a vendor". *Unblocks: those three sentences.*
- [ ] **Enhance step 6, "Turn results into decisions":** check that its second sentence ("Set up each bonus cycle and who takes part, group similar performance into similar rewards, and plan raises beside the performance behind them.") matches what Enhance does.

## 3. Approvals from you

- [ ] **Approved sample data for the launch (Task 7.4):** the site still shows the mockup's sample data in three places: the Home hero journey (`src/content/en/home.ts`, `hero.journey`: "Rina Wulandari", Rational 94 / Empathy 75 / Diplomatic 60, "Recommended for the 2025 MT intake", appraisal 3.05 with KPI 2.96 and Competency 3.40, "Bonus band B", March 2025 to March 2026, "22 minutes"); the GBA hero window (`src/content/en/game-based-assessment.ts`, `hero.window`: "22 minutes" and the suitability report alt text with 90/100 and the 99th percentile, shown on the screenshot the team sent); and the same journey wording on the styleguide, which is not public. Either approve them as they are (they are labelled "Example" on Home), or send replacements and Claude swaps them in. *Unblocks: the sample-data line of 7.4.*
- [ ] **GBA headlines (D9):** built as proposed in R15a (provisional). Go through the table in `revisions3.0team/feedback-team-2026-10-22.md` (GBA section), plus the four extra keyword headings listed under it, and say yes or change each row. *Unblocks: final GBA wording before launch.*
- [ ] **Enhance form:** wording for the two error messages on the required dropdowns (role, number of employees).
- [ ] **Phase 4 sign-off** (Clients pages). *Blocks Phase 7, launch.*

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

- [ ] **Google Search Console:** add deushcs.com as a Domain property (one new TXT record at Hostinger; nothing else in DNS changes), then export the last 12 months (Pages and Queries) into `docs/seo/`. *Unblocks: redirects for the old pages people still visit (7.3b).*
- [ ] **Google Business Profile** for DEUS Human Capital Services, website https://deushcs.com. Needs the office address (Q9, §5); verification can take days to weeks.
- [ ] **Profile links:** the LinkedIn company page and any other official profiles. *Unblocks: `sameAs` in the site's company data (7.1).*
- [ ] **The old blog:** about 60 WordPress articles won't be on the new site. Unless you say otherwise, each redirects to the closest product page. Bringing them over is the Blog item in §8.

## 5c. Analytics: before launch

- [ ] **Vercel Web Analytics:** in the Vercel project, open the Analytics tab and turn Web Analytics on. Then check the plan: custom events (the six the site sends: CTA, WhatsApp, email, form, language and Potentia clicks) need Pro or higher, and aren't recorded on Hobby. *Unblocks: the visit and click counts after launch (7.3).*

## 6. Ko Will: Privacy review

- [ ] Ask Ko Will to review the Privacy page: **ready now** (R18 rewrote it in plain words, 2026-10-22; the text is in `src/content/en/privacy.ts`). He also confirms: naming the Personal Data Protection Law once (D16), keeping data two years with the reason given (D17), the 3 × 24-hour deadlines, the overseas-storage wording (Singapore, United States), who on the team can open the leads, and whether a data protection officer must be named. Full list: the Privacy row in `docs/build-plan.md`.

## 7. Later (not blocking the round 3 fixes)

- [ ] **Leadership (Q10):** photos and short bios, for About.
- [ ] **News coverage (R8, F29):** the list of real articles (outlet, headline, date, link).
- [ ] **Indonesian reviewer (Q14):** a native speaker to check the Indonesian pages after launch.

## 8. Reminder: two sections to add

Not built yet. Say when you want each one planned; these are what each needs from you first.

- [ ] **Clients: the project list** (`/clients/projects`, WEBSITE-PLAN §5.8, Q22). A list of past projects under the client stories: client (or "a national FMCG company" when it can't be named), industry, product, year and size. Needs: the project records from the team, and which clients may be named.
- [ ] **Blog (insights and articles)** (WEBSITE-PLAN §12, item 4: Indonesian articles for search, such as "Cara memilih psikotes untuk MT"). Needs: your go-ahead, the first few topics and who writes them.
