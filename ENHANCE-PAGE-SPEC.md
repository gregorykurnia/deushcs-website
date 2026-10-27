# DEUS Enhance: Website Page Spec

**Status:** Draft v0.2 (2026-10-14). v0.2: surfaces and visuals updated to the Daylight direction (light only, no device frames, sentence-case labels; see `WEBSITE-PLAN.md` §7.1). **Route:** `/[locale]/solutions/enhance`. **Part of:** `WEBSITE-PLAN.md` §5.6.

**The clean page copy is in `content/en/enhance.md`.** This file keeps the reasoning, screen mapping, form fields and Indonesian drafts. If the two disagree on wording, `content/en/enhance.md` wins.

**How this relates to `ENHANCE-CONTENT.md`:** that file is the approved deck copy and stays untouched. This spec turns it into a web page:
- Sections marked **Ready** use the deck copy as-is (small web edits are listed per section).
- Sections marked ***New*** are expansions. They only reuse facts already in the sources (the deck, brief §5.2 and the screen names), regrouped or explained further. They need a DEUS review before going live.
- **[VERIFY]** marks anything the team must confirm. No clients, numbers or features are invented.
- Indonesian lines are **drafts** for the second-language phase and need a native review.

---

## Page at a glance

The page keeps the deck's argument (from the deck: Problem → Urgency → Solution → Fit → Outcome → Next step → Closer) and adds five sections that a web visitor needs but a live presentation doesn't: the reward story in more depth, the service journey, a self-qualifier, a form, and an FAQ.

| # | Section | Surface | Status |
|---|---|---|---|
| 1 | Hero | White + Sky window | Ready |
| 2 | The Problem | Cloud, 3×2 panels | Ready |
| 3 | The Urgency | White | Ready (one grammar fix) |
| 4 | The Solution: three cards, no tabs (round 4) | Cloud | Merged copy, new screen mapping |
| 5 | ~~From Rating to Reward~~ | | **Cut in R16b** (F76, D11): its gist is in card 3 of section 4 |
| 6 | Works with what you have | White (since R16b) | Ready |
| 7 | Supported Beyond the Platform | Cloud (since R16b) | Ready, expanded into a journey |
| 8 | The Business Outcome | White → soft sky wash | Ready |
| 9 | ~~Is Enhance Right for You?~~ | | **Cut in R16b** (F78, D12): it repeated "What the gap looks like" |
| 10 | (Better together with DEUS assessments) | White | ***New***, hidden until Q19 is confirmed |
| 11 | Next Step | Cloud | Heading and two steps as text; the form moved to the closing (R16b, F79) |
| 12 | FAQ | White | ***New*** |
| 13 | Closing + booking form, WhatsApp and email | Sky (closing panel) | The form replaces the closing buttons (R16b, F79) |

**Client stories live in the Clients section, not on this page** (plan §5.8). The sources have no Enhance client example yet. When the team supplies one (even anonymous: "a manufacturing group with 4 plants"), it becomes a story at `/clients/<name>`, and this page gets one small link card to it between sections 8 and 9, with no numbers or quotes repeated here (plan Q18).

---

## SEO

| | English | Indonesian (draft) |
|---|---|---|
| Title | DEUS Enhance: Performance Appraisal and KPI Platform \| DEUS HCS | DEUS Enhance: Aplikasi Penilaian Kinerja dan KPI \| DEUS HCS |
| Description | Connect KPIs, appraisals, calibration and talent mapping to bonus, incentive and salary decisions. Works with your existing HRIS, ERP and payroll. | Hubungkan KPI, penilaian kinerja, kalibrasi, dan pemetaan talenta dengan keputusan bonus, insentif, dan kenaikan gaji. Bekerja bersama HRIS, ERP, dan payroll Anda. |
| Keywords | performance management software Indonesia, KPI appraisal platform, performance calibration | aplikasi penilaian kinerja, software KPI karyawan, sistem appraisal karyawan, kalibrasi kinerja, remunerasi berbasis kinerja |
| Structured data | `SoftwareApplication` (name DEUS Enhance, category BusinessApplication, publisher DEUS / PT Investama Persada Kurnia) + `FAQPage` for section 12 | |

---

## 1. Hero · Ready

**Surface:** White, centered headline, then a sky window with product screens floating in it (no laptop frame).

| | English | Indonesian (draft) |
|---|---|---|
| Eyebrow | DEUS Enhance | DEUS Enhance |
| H1 | From scattered data to better decisions | Dari data yang tersebar menjadi keputusan yang lebih tepat |
| Lede | **DEUS Enhance** connects your performance data to every KPI, review, and pay decision. | **DEUS Enhance** menghubungkan data kinerja Anda dengan setiap KPI, penilaian, dan keputusan remunerasi. |
| Chips *(new, from the solution steps)* | KPIs · Appraisal · Calibration · Talent mapping · Rewards | KPI · Penilaian · Kalibrasi · Pemetaan talenta · Remunerasi |
| Primary CTA | Book a 30-minute call → (scrolls to section 11) | Jadwalkan panggilan 30 menit |
| Secondary CTA | See how it works ↓ (scrolls to section 4) | Lihat cara kerjanya |

**Visual:** the deck's rotating screens floating in the sky window, crossfading every few seconds: product overview → calibration matrix → salary increase dashboard → bonus cycle setup → reward grouping.

**Web edit:** drop the deck footer "Prepared by DEUS Human Capital Services" (it's a deck artefact).

---

## 2. The Problem · Ready

**Surface:** Cloud, 3×2 white panels. Five problems + one teaser card fill the grid exactly.

| | English | Indonesian (draft) |
|---|---|---|
| Eyebrow | The problem | Tantangannya |
| H2 | We understand your challenges | Kami memahami tantangan Anda |

| # | Title | Copy | ID title (draft) | ID copy (draft) |
|---|---|---|---|---|
| 01 | Scattered data | KPIs and appraisal results sit across Excel and disconnected systems, slowing consolidation. | Data tersebar | KPI dan hasil penilaian tersebar di Excel dan sistem yang tidak terhubung, sehingga konsolidasi berjalan lambat. |
| 02 | Inconsistent standards | Managers, departments, or plants may evaluate performance differently. | Standar tidak seragam | Manajer, departemen, atau pabrik dapat menilai kinerja dengan cara yang berbeda. |
| 03 | Fragmented review | Teams review performance on different schedules, so there are no consistent, org-wide rhythms. | Penilaian terpecah | Setiap tim menilai kinerja dengan jadwal berbeda, sehingga tidak ada ritme yang konsisten di seluruh organisasi. |
| 04 | Limited visibility | Hard to identify high performers, performance gaps, and development potential. | Visibilitas terbatas | Sulit mengenali karyawan berkinerja tinggi, kesenjangan kinerja, dan potensi pengembangan. |
| 05 | Disconnected rewards | Performance results don't consistently inform bonus, incentive, salary, or development decisions. | Remunerasi tidak terhubung | Hasil kinerja tidak selalu menjadi dasar keputusan bonus, insentif, gaji, atau pengembangan. |
| → | *Teaser:* Up next · See how Enhance closes every gap → | | Selanjutnya · Lihat bagaimana Enhance menutup setiap kesenjangan → | |

**Mobile:** 2-column grid, teaser spans both.

---

## 3. The Urgency · Ready (one fix)

**Surface:** White, five role cards over the interlocking-gears illustration (redrawn light, in sky blues; gear "wind-up" motion once).

| | English | Indonesian (draft) |
|---|---|---|
| Eyebrow | The urgency | Mengapa sekarang |
| H2 | What the gap looks like, daily | Seperti apa kesenjangan ini, setiap hari |
| Lede | The cost doesn't show up in your report — it shows up in how the week actually goes. | Biayanya tidak terlihat di laporan Anda — tetapi terasa di jalannya minggu kerja Anda. |

**Web edit:** the deck's "How the Gap Looks Like, Daily" is ungrammatical; use "What the gap looks like, daily" (or "How the gap looks, daily").

| Role | Scenario | ID (draft) |
|---|---|---|
| HR | It's the week before calibration, and HR is still pulling scores from different spreadsheets. | Seminggu sebelum kalibrasi, tim HR masih mengumpulkan nilai dari berbagai spreadsheet. |
| Plant & operations leaders | A plant director asks how their site compares. No one can answer without a week of emails. | Seorang direktur pabrik bertanya bagaimana kinerja pabriknya dibanding yang lain. Tidak ada yang bisa menjawab tanpa seminggu bertukar email. |
| Managers & supervisors | Two managers rate the same performance differently. Nobody notices until calibration, if at all. | Dua manajer menilai kinerja yang sama secara berbeda. Tidak ada yang menyadarinya sampai kalibrasi, atau bahkan tidak sama sekali. |
| Employees | An employee asks why a colleague got a bigger bonus. No one can explain it with objective evidence. | Seorang karyawan bertanya mengapa rekannya mendapat bonus lebih besar. Tidak ada yang bisa menjelaskannya dengan bukti objektif. |
| Senior management & finance | Bonus gets finalized from a spreadsheet never checked against actual performance ratings. | Bonus difinalisasi dari spreadsheet yang tidak pernah dicocokkan dengan hasil penilaian kinerja yang sebenarnya. |

**Design note:** the five roles appear again, **in the same order with the same icons**, in section 8 (Outcome), so the reader sees each problem paid off. Icons from the deck: people/team (HR), factory (Plant & Ops), briefcase (Managers), person (Employees), upward trend (Senior Mgmt & Finance).

---

## 4. The Solution · three cards (round 4)

> **Phase E (round 4, 2026-10-27, `revisions4.0/round4-implementation-plan.md` §S10):** the six steps are three cards, side by side, all seen while scrolling. There are no tabs, no numbers and nothing to click, so R16b's tab switcher goes. Card 1 merges steps 1 and 2, card 2 merges steps 3 to 5, and card 3 is step 6, now on the reward grouping screen (the hero still cycles the bonus dashboard). No script is needed: all three cards are in the server HTML.

**Surface:** Cloud. **Pattern:** each card is the GBA module card (DESIGN-GUIDE §7.10, Module cards) without its measures line: title, body, then its screen on a sky strip at the bottom. **Grid:** three equal columns above 900px with a 20px gap, and one column at 900px and below. Cards in a row share one height. **Height limits:** at 1280 wide, at most 650px; at 390 wide, at most 1,500px.

| | English | Indonesian (draft) |
|---|---|---|
| Eyebrow | The solution | Solusinya |
| H2 | How Enhance closes each gap | Bagaimana Enhance menutup setiap kesenjangan |

| Card | Merges | Title | Copy (round 4, §S10) | Closes problem | Screen *(checked against the screens in the Phase E review, 2026-10-27)* | ID title (draft) |
|---|---|---|---|---|---|---|
| 1 | Steps 1, 2 | Set KPIs and track them | Set KPIs, competencies, weights and formulas by role and level. Then follow performance from the company down to each team and person. | 01 Scattered data, 02 Inconsistent standards, 04 Limited visibility | KPI and competency library: `images.enhanceKpiLibrary`, alt "DEUS Enhance KPI and competency library" | Tetapkan KPI dan pantau |
| 2 | Steps 3, 4, 5 | Review and calibrate | Everyone goes through one structured self-review and appraisal. Compare ratings across managers and units, and see where each person sits by performance and potential. | 02 Inconsistent standards, 03 Fragmented review, 04 Limited visibility | Talent map: `images.enhanceTalentMap`, alt "DEUS Enhance talent map: a nine-box grid of KPI against competency, beside each person's scores" | Tinjau dan kalibrasi |
| 3 | Step 6 | Turn results into pay | Connect ratings to bonuses, incentives, salary increases and development, so similar performance leads to similar rewards. | None (step 6 had no problem number) | Reward grouping: `images.enhanceRewardGrouping`, alt "DEUS Enhance reward grouping: employees assigned to reward groups, with those still ungrouped flagged" | Ubah hasil menjadi imbalan |

The "Closes problem" column is for reference: no tags are shown (§S10). Card 1 drops step 1's "periods, and measures", and card 3 keeps only the gist of step 6's second sentence, both as §S10 gives them.

---

## 5. From Rating to Reward · *New*

> **Cut in R16b (2026-10-22, F76, D11).** Kept here for the record. Step 6 said: "Set up each bonus cycle and who takes part, group similar performance into similar rewards, and plan raises beside the performance behind them." Round 4 keeps only its gist, in card 3 of §4.

**Why add it:** connecting performance to pay is Enhance's clearest differentiator (brief §5.2: "integrated with remuneration schemes (bonus, incentives, salary increases)"), but the deck covers it in one card. Four of the deck's product screens are about rewards, so the page can show it properly.

**Surface:** White, four items, each with its screenshot floating on a small sky tile.

| | English *(new)* | Indonesian (draft) |
|---|---|---|
| Eyebrow | From rating to reward | Dari penilaian ke remunerasi |
| H2 | A rating only matters if it shapes what happens next. | Penilaian baru bermakna jika menentukan langkah berikutnya. |
| Lede | Enhance carries performance results through to bonus, incentive, and salary decisions, so every reward can be explained with evidence. | Enhance membawa hasil kinerja hingga ke keputusan bonus, insentif, dan kenaikan gaji, sehingga setiap remunerasi dapat dijelaskan dengan bukti. |

| # | Title | Copy *(new)* | Screen |
|---|---|---|---|
| 01 | Set up the bonus cycle | Define each bonus cycle and the rules that link it to performance results. | Bonus cycle setup |
| 02 | Choose who takes part | Select the employees included in each cycle. | Bonus participants setup |
| 03 | Group rewards fairly | Group employees so that similar performance leads to similar rewards. | Reward grouping |
| 04 | Plan salary increases | See salary increase decisions alongside the performance behind them. | Salary increase dashboard |

**[VERIFY]** with the product team that each one-line description matches what the screen actually does; adjust wording rather than adding features.

**Closing line of the section:** "So when an employee asks why, there's an answer." *(new — it calls back the Employees scenario in section 3)* · ID: "Sehingga ketika karyawan bertanya mengapa, selalu ada jawabannya."

---

## 6. Works with what you have · Ready

**Surface:** Cloud. Left: copy. Right: the systems illustration (HRIS, ERP, Payroll, Operational flowing into DEUS Enhance).

| | English | Indonesian (draft) |
|---|---|---|
| Eyebrow | Usability | Kemudahan |
| H2 | We can start from where you are | Kita mulai dari kondisi Anda saat ini |
| H3 | Works with what you have | Bekerja dengan sistem yang Anda miliki |
| Copy | DEUS Enhance can complement your existing HRIS, ERP, payroll, and operational systems — it does not necessarily require replacing them. Integration, data flow, and configuration are adapted to your organization's processes and confirmed during scoping. | DEUS Enhance dapat melengkapi HRIS, ERP, payroll, dan sistem operasional yang sudah Anda gunakan — tanpa harus menggantinya. Integrasi, alur data, dan konfigurasi disesuaikan dengan proses organisasi Anda dan dikonfirmasi saat tahap scoping. |

**Web edit:** "Supported Beyond the Platform" moves to its own section (7), so this section focuses on systems.

---

## 7. Supported Beyond the Platform · Ready, expanded into a journey

**Why expand:** the deck lists five kinds of support in one sentence. Shown as a sequence, they answer the buyer's unspoken question "what happens after we sign?" No new services are added; it's the same five items in their natural order.

**Surface:** White, horizontal timeline (the same pattern as the Home hero journey), vertical on mobile.

| | English | Indonesian (draft) |
|---|---|---|
| Eyebrow | Supported beyond the platform | Pendampingan menyeluruh |
| H2 | DEUS provides more than software. | DEUS memberikan lebih dari sekadar software. |
| Lede (Ready) | Our consultative approach can support KPI framework design, implementation, user training, post-cycle review, and ongoing hands-on customer assistance. | Pendekatan konsultatif kami dapat mendukung perancangan kerangka KPI, implementasi, pelatihan pengguna, evaluasi pasca-siklus, dan pendampingan langsung yang berkelanjutan. |

| # | Stage | One line *(new, describing the stage named in the deck)* | ID (draft) |
|---|---|---|---|
| 01 | KPI framework design | Shape KPIs and competencies that fit each role and level. | Perancangan kerangka KPI |
| 02 | Implementation | Configure Enhance around your structure, periods, and processes. | Implementasi |
| 03 | User training | Prepare HR, managers, and employees to use it with confidence. | Pelatihan pengguna |
| 04 | Post-cycle review | Look back after each cycle at what worked and what to adjust. | Evaluasi pasca-siklus |
| 05 | Ongoing assistance | Hands-on help whenever your team needs it. | Pendampingan berkelanjutan |

The last node gets the ember "now" marker (the "ongoing" one), following the guide's rule that ember marks the current item.

---

## 8. The Business Outcome · Ready

**Surface:** White fading into a soft sky wash, white outcome cards (line icon in a sky tile, role tag in azure, copy).

| | English | Indonesian (draft) |
|---|---|---|
| Eyebrow | The business outcome | Hasil bisnis |
| H2 | An investment that moves you forward | Investasi yang membawa Anda melangkah maju |

| Role | Outcome | ID (draft) |
|---|---|---|
| HR | Move from scattered spreadsheets to one standardized, company-wide framework for tracking and calibrating performance. | Beralih dari spreadsheet yang tersebar ke satu kerangka standar di seluruh perusahaan untuk memantau dan mengkalibrasi kinerja. |
| Plant & operations leaders | See how every team or plant is tracking in real time, without chasing separate reports. | Lihat perkembangan setiap tim atau pabrik secara real time, tanpa harus mengejar laporan terpisah. |
| Managers & supervisors | Evaluate more consistently and decide with mapping instead of memory or gut feel. | Menilai dengan lebih konsisten dan mengambil keputusan berdasarkan pemetaan, bukan ingatan atau intuisi. |
| Employees | Gain clarity on expectations, evaluations, and development areas without subjective standards. | Mendapat kejelasan tentang ekspektasi, penilaian, dan area pengembangan tanpa standar yang subjektif. |
| Senior management & finance | Connect results to incentive, bonus, and salary decisions that used to be disconnected. | Menghubungkan hasil kinerja dengan keputusan insentif, bonus, dan gaji yang sebelumnya terpisah. |

**Optional interaction *(new)*:** a "Before / After" toggle on each card that flips between the section-3 scenario and this outcome. Both texts stay in the page for search engines and screen readers; on mobile they're stacked.

*(Reserved: one link card to an Enhance client story in the Clients section. Hidden until Q18 gives a client example.)*

---

## 9. Is Enhance Right for You? · *New*

> **Cut in R16b (2026-10-22, F78, D12)**, with its "Book a call" link. Kept here for the record.

**Why add it:** lets a visitor qualify themselves before booking, and gives sales better-fit calls. Every line restates a problem from section 2 or 3 in the visitor's own terms.

**Surface:** Cloud, a checklist with the checkmark draw animation.

| | English *(new)* | Indonesian (draft) |
|---|---|---|
| Eyebrow | Is it a fit? | Apakah cocok? |
| H2 | Enhance is built for you if… | Enhance tepat untuk Anda jika… |

- ✓ Your KPIs and appraisal results live in spreadsheets or separate systems. · *KPI dan hasil penilaian Anda masih tersimpan di spreadsheet atau sistem terpisah.*
- ✓ You run more than one team, department, branch, or plant, and want them evaluated the same way. · *Anda mengelola lebih dari satu tim, departemen, cabang, atau pabrik, dan ingin semuanya dinilai dengan standar yang sama.*
- ✓ Calibration takes weeks of consolidating scores. · *Kalibrasi memakan waktu berminggu-minggu untuk mengumpulkan nilai.*
- ✓ You want bonus, incentive, and salary decisions to rest on measurable performance. · *Anda ingin keputusan bonus, insentif, dan gaji didasarkan pada kinerja yang terukur.*
- ✓ You'd like help designing the KPI framework, not just a tool. · *Anda membutuhkan pendampingan dalam merancang kerangka KPI, bukan hanya sebuah aplikasi.*

Below: "Ticked two or more? Let's look at your current process." → section 11. · ID: "Mencentang dua atau lebih? Mari kita tinjau proses Anda saat ini."

---

## 10. Better Together with DEUS Assessments · *New*, hidden until confirmed

**Show only if Q19 confirms** that Discover / Next Chapter results can inform Enhance's talent map (performance × potential). Otherwise leave it out: it would be an invented integration.

| | English *(new)* |
|---|---|
| Eyebrow | Better together |
| H2 | Performance shows what people have done. Assessment shows what they could do. |
| Copy | Enhance maps employees by performance and potential. DEUS's game-based assessments measure personality, cognitive ability and business judgement, giving the potential axis real evidence. |
| Links | DEUS Discover → · Game-Based Assessment → |

---

## 11. Next Step + inquiry form · Ready + new form

> **R16b (2026-10-22, F79, D13):** this section keeps its heading, lede and two steps, as text only (no screenshot). The form, "Chat on WhatsApp" and the email link moved together into the closing panel (§13) at `#book-a-call`, where they replace the closing buttons. "Prefer to talk first?" is gone. Every "Book a call" on the page jumps to the form.

**Surface:** Cloud, two columns: steps and copy on the left, the form on the right. A floating screenshot of the bonus participants setup sits under the steps on desktop.

| | English | Indonesian (draft) |
|---|---|---|
| Eyebrow | Next step | Langkah selanjutnya |
| H2 | Start Where It **Matters Most** to You *(underline wipe on "Matters Most")* | Mulai dari yang **paling penting** bagi Anda |
| Lede | Most organizations start with a current appraisal process review. Here's what it looks like: | Sebagian besar organisasi memulai dengan meninjau proses penilaian kinerja yang berjalan saat ini. Begini prosesnya: |
| 01 | A short, low-commitment look at how your performance is tracked and evaluated today, to know what to keep and where the gaps are. | Tinjauan singkat tanpa komitmen tentang cara kinerja dipantau dan dinilai saat ini, untuk mengetahui apa yang perlu dipertahankan dan di mana kesenjangannya. |
| 02 | We recommend whether a KPI-mapping workshop, a pilot, or a tailored trial is the best next step for you. | Kami merekomendasikan langkah terbaik berikutnya: workshop pemetaan KPI, pilot, atau uji coba yang disesuaikan. |

**Web edit:** the deck's "Kindly Reply to This Message ↗" is email wording. On the web it becomes the form plus: "Prefer to talk first? Chat on WhatsApp ↗ or email admin@deushcs.com ↗" (ID: "Ingin bicara langsung? Chat via WhatsApp atau email ke admin@deushcs.com").

**The form *(new)*** — heading "Book your 30-minute appraisal review" · ID "Jadwalkan tinjauan penilaian kinerja 30 menit"

| Field | Type | Required | Why |
|---|---|---|---|
| Full name | text | yes | |
| Work email | email | yes | |
| Company | text | yes | |
| Your role | select: HR · Finance · Operations / Plant · Management / Leadership · Other | yes | Matches the page's five roles |
| WhatsApp number | tel | no | Most follow-up in Indonesia happens on WhatsApp |
| Number of employees | select: under 100 · 100–499 · 500–1,999 · 2,000+ | yes | Sizing |
| Number of sites or plants | select: 1 · 2–5 · 6+ | no | Multi-site is a key Enhance fit |
| How do you track performance today? | select: Spreadsheets · An HRIS module · Other software · Not formally yet | no | Lets sales prepare the review |
| When does your next appraisal cycle start? | select: Within 3 months · 3–6 months · Later / not sure | no | Urgency |
| Anything else? | textarea | no | |
| Consent | checkbox + privacy link | yes | UU PDP |

Submit button: "Request my review →" · ID "Kirim permintaan →". Success: "Thanks — we'll be in touch to set up your 30-minute call." · ID "Terima kasih — kami akan menghubungi Anda untuk menjadwalkan panggilan 30 menit."

**Fallbacks (kept from the deck):** the email link opens `admin@deushcs.com` with subject **"Inquiry about DEUS Enhance"** and the deck's body text; the WhatsApp link opens with "Halo DEUS, saya ingin tahu lebih lanjut tentang DEUS Enhance."

---

## 12. FAQ · *New*

**Surface:** White, accordion, `FAQPage` structured data. Answers only use what the sources say; questions the sources can't answer point to the scoping call or wait for the team.

| # | Question | Answer | Source |
|---|---|---|---|
| 1 | Do we have to replace our HRIS or payroll system? | No. Enhance can complement your existing HRIS, ERP, payroll and operational systems. Integration and data flow are confirmed during scoping. | Deck §5 |
| 2 | Can we use our own KPIs and competencies? | Yes. KPIs, competencies, weights, formulas, periods and measures are customised by role and level. | Deck §4 step 01 |
| 3 | We don't have a KPI framework yet. Can you help? | Yes. DEUS can support KPI framework design, often starting with a KPI-mapping workshop. | Deck §5, §7 |
| 4 | Does it work for companies with several plants or branches? | Yes. Performance is tracked from company level down to teams and individuals, and plant and operations leaders can see how each site is tracking. | Deck §4, §6 |
| 5 | How does Enhance connect performance to pay? | Appraisal and calibration results flow into bonus cycles, reward grouping and salary increase decisions, so rewards are based on measurable performance. | Deck §4 card, brief §5.2, screen names |
| 6 | How do we get started? | With a short, low-commitment review of your current appraisal process. Then we recommend a KPI-mapping workshop, a pilot, or a tailored trial. | Deck §7 |
| 7 | What support do we get after launch? | Implementation, user training, post-cycle review and ongoing hands-on assistance. | Deck §5 |
| 8 | Where is our data stored, and how is it secured? | **[VERIFY — no source. Hide until the team supplies an answer.]** | — |
| 9 | How is Enhance priced? | **[VERIFY — default: "Pricing depends on your organisation's size and scope; we'll share it after the review call."]** | — |
| 10 | How long does implementation take? | **[VERIFY — hide until answered.]** | — |
| 11 | Is the platform available in Bahasa Indonesia? | **[VERIFY — hide until answered.]** | — |

---

## 13. Closing · Ready

**Surface:** Sky (closing panel), centered two-beat closer with the fade-in punchline words, then the contact bar.

| | English | Indonesian (draft) |
|---|---|---|
| Line 1 | Make performance **visible.** | Jadikan kinerja **terlihat.** |
| Line 2 (same ink color as line 1) | Make decisions **clearer.** | Jadikan keputusan **lebih jelas.** |
| Sub-line | DEUS Human Capital Services | DEUS Human Capital Services |
| Contact bar | Contact us · WhatsApp +62 823-1212-1660 · admin@deushcs.com | Hubungi kami · … |

---

## Assets needed

| Asset | Used in | Status |
|---|---|---|
| Product overview screenshot | Hero, step 01–02 | In the missing `assets_enhance/` folder |
| Calibration matrix | Hero, steps 04–05 | On disk: `public/assets/enhance-3.png` |
| Salary increase dashboard | Hero, section 5 | Missing |
| Bonus cycle setup | Hero, section 5 | Missing |
| Reward grouping | Hero, section 5 | On disk: `public/assets/enhance-2.png` |
| Bonus participants setup | Section 5, section 11 | Missing |
| Performance appraisal dashboard | Step 03 | Brief §5.2 mentions it; source file needed |
| Systems illustration (HRIS / ERP / Payroll / Operational → Enhance) | Section 6 | Missing (or redrawn as SVG) |
| Gears illustration | Section 3 | Missing (or redrawn as SVG) |

Screenshots must use demo data, never a real client's employee names or pay figures.

## Open questions for this page

- Q18 (plan): any Enhance client example, security/hosting answer, pricing model, implementation timeline, platform languages.
- Q19 (plan): does assessment data feed Enhance's talent map? Decides section 10.
- Do the screen-to-step mappings in sections 4 and 5 match what each screen really shows?
- Is "Talent mapping" a 9-box (performance × potential) grid? If yes, the copy can say so.
