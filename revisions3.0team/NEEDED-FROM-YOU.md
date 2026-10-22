# What I need from you

Everything the site is waiting on from you (or from someone you ask). Tick an item when you send it; Claude ticks it too when it arrives and wires it in. Details and history stay in the files named in "Where"; this is the short list. The build plan's **Waiting for the owner** list (`docs/build-plan.md`) tracks the same items for releases.

*Updated 2026-10-22.*

## 1. Screens and pictures

Send screens as PNG, at least 1360px wide (2× for sharp screens), with no real employee or candidate names on them. Drop them in a message or in `image-components/`.

- [ ] **Enhance, for the new hero animation (F72, D10):** one screen of **KPI setup** (an employee's or a role's KPIs with their weights and targets). It is the only step of the "review to pay decision" loop still showing a placeholder; the other three use screens already here (the PA dashboard, the calibration matrix, the Bonus Dashboard). Optional: a screen that shows one employee's bonus band, if you'd rather end on that than on the Bonus Dashboard. *Unblocks: the Enhance hero's first step (built in R16a).*
- [ ] **Enhance, still missing:** product overview (solution steps 1 and 2 show a placeholder). Sharper `enhance-1.png` (needs 1360px, now 811px). *No longer needed since R16b:* salary increase, bonus cycle setup and bonus participants (their section is cut; step 6 uses the Bonus Dashboard).
- [ ] **Enhance, found in the 2026-10-22 picture check:** a **talent map** screen (the 9-box grid of performance against potential): solution step 5, "Talent mapping", shows the calibration matrix again because there's no talent map yet. A sharper `enhance-pa-dashboard.png` (step 2 of the Enhance hero; needs about 1360px, now 921px). Optional: one screen each for solution steps 1 and 2 instead of a single overview (step 1, "Set the framework": the KPI setup screen above can serve; step 2, "Track across levels": KPI progress for the company, a department and one person).
- [ ] **GBA:** the individual report; one product shot for the GBA hero (front view of the GBA or the HR dashboard, F12); a sharper `gba-1-crop.png`.
- [ ] **Discover:** individual profile suitability report; a real Discover story scene plus a sharp report crop (F19); sharper `discover-report-crop.png`.

- [ ] **Clients and About have no pictures yet.** The ones they're waiting for: the Telkom group photo at Graha Merah Putih (group 4, Q7), client logo files (group 4, Q8) and leadership photos (group 7, Q10). New and optional: a photo for the Calvin Christian School story (a class or a teacher using Potentia), only with the school's permission for any child who can be recognised.

*No longer needed:* the three recognition logos (Startup Studio, Innovfest, Tech in Asia). Recognition is cut from Home and About (D2).

## 2. Facts from the product team

- [ ] **"Why DEUS" on Home (F54–F57):** R14b rewrote the four points from facts already confirmed; please read them on Home. Three answers would let them say more. (1) Can Enhance import employees and KPIs in bulk? Allows: "Invite a whole intake or load every employee from one spreadsheet, …" in "Ready for volume". (2) Is Enhance in Bahasa Indonesia? Allows bringing back "Built for Indonesia": "Every DEUS product runs in Bahasa Indonesia, and our assessments, for adults and for children, are normed on Indonesians." (3) What support do Potentia schools get (for example, help reading the classroom dashboard)? Allows adding "…and help schools read their classroom dashboard" to "A partner, not just a vendor". *Unblocks: those three sentences.*
- [ ] **Enhance step 6, "Turn results into decisions":** check that its second sentence ("Set up each bonus cycle and who takes part, group similar performance into similar rewards, and plan raises beside the performance behind them.") matches what Enhance does.

## 3. Approvals from you

- [ ] **GBA headlines (D9):** built as proposed in R15a (provisional). Go through the table in `revisions3.0team/feedback-team-2026-10-22.md` (GBA section), plus the four extra keyword headings listed under it, and say yes or change each row. *Unblocks: final GBA wording before launch.*
- [ ] **Enhance form:** wording for the two error messages on the required dropdowns (role, number of employees).
- [ ] **Phase 4 sign-off** (Clients pages). *Blocks Phase 7, launch.*

## 4. Clients

- [ ] **DKB/BCG story (F82):** what DEUS did for them, any numbers, a quote if there is one, and permission to name them.
- [ ] **Q7, Telkom:** permission to name Telkom, show the Graha Merah Putih photo (send the file) and use Ibu Lina's quote.
- [ ] **Q11, Calvin Christian School:** permission to name the school, and the correct names and titles for both quotes. The story is written and ready to switch on.
- [ ] **Q8, client logos:** which logos may be shown, with the files (SVG, or PNG at least 400px wide on a transparent background).

## 5. Company details

- [ ] **Office address (Q9)** and business hours. *Shows on Contact and Privacy.*
- [ ] **Email provider** for admin@deushcs.com (Google Workspace, Microsoft 365, …). *Named on Privacy (F100).*
- [ ] **How WhatsApp is run:** the WhatsApp Business app on a phone, or a service provider. *Named on Privacy (F101).*

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
