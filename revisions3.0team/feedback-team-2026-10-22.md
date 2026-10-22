# Site feedback, round 3 (team, 2026-10-22)

The DEUS team's notes on the site. Numbering carries on from round 2 (`postpushrevisions2.0/`, up to F40).

## Summary

| # | Page | Note | Type | Status |
|---|---|---|---|---|
| F41 | Home | Hero punchline doesn't speak for every DEUS product (Potentia is left out); should say who DEUS is | wording | open: headline A picked (2026-10-22), sub-line still to pick |

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

**Recommendation: S3.** It's the only one where the reader sees both ends of what DEUS does (children and employees) in one line, which is exactly what the team's note asked for, and "the people in your care" speaks to an HR head and a parent at once. S4 is the safer pick if the team wants a fact (since 2022) up front.

### Also affected once a headline is picked

- **SEO description** (`content/en/home.md` line 6) repeats "know who to hire and prove who to reward". Update it to match; it may keep the product names, since it's for search.
- **"From hire to reward"** (Home §4) keeps its company focus. It's a section about the employee cycle, so hire and reward still fit there; Potentia has its own band in §5.

## Decision

- [x] Headline: A (owner, 2026-10-22)
- [ ] Sub-line: pick from S1 to S7
- [ ] Copy updated in `content/en/home.md`, `src/content/en/home.ts` and the SEO description, with the ID version kept for the translation phase
