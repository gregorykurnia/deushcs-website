# Site feedback, round 3 (team, 2026-10-22)

The DEUS team's notes on the site. Numbering carries on from round 2 (`postpushrevisions2.0/`, up to F40).

## Summary

| # | Page | Note | Type | Status |
|---|---|---|---|---|
| F41 | Home | Hero punchline doesn't speak for every DEUS product (Potentia is left out); should say who DEUS is | wording | open: team to pick a headline |

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

### Sub-line (one for every option, no product names)

> **EN:** DEUS is an Indonesian human capital company. We use science and play to show what people are really capable of, from a child in school to a leader at work.
>
> **ID:** DEUS adalah perusahaan human capital asal Indonesia. Kami memadukan sains dan permainan untuk menunjukkan potensi sebenarnya setiap orang, dari anak di sekolah hingga pemimpin di tempat kerja.

Shorter alternative if the team wants one sentence:

> **EN:** DEUS turns science and play into clear evidence about people, so the decisions about them are fair.
>
> **ID:** DEUS mengubah sains dan permainan menjadi bukti yang jelas tentang manusia, agar setiap keputusan tentangnya adil.

### Also affected once a headline is picked

- **SEO description** (`content/en/home.md` line 6) repeats "know who to hire and prove who to reward". Update it to match; it may keep the product names, since it's for search.
- **"From hire to reward"** (Home §4) keeps its company focus. It's a section about the employee cycle, so hire and reward still fit there; Potentia has its own band in §5.

## Decision

- [ ] Team picks a headline (A to E, or a mix) and the sub-line
- [ ] Copy updated in `content/en/home.md`, `src/content/en/home.ts` and the SEO description, with the ID version kept for the translation phase
