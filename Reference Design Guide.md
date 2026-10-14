# DEUS Design Guide

A portable design system pulled from the two DEUS decks in `brand-kit-main`:

| Source | What it is | Mode |
|---|---|---|
| `about.html` | DEUS Human Capital Services company profile, in Bahasa Indonesia (12 slides) | **Light**: paper and tint backgrounds, navy ink, orange accent |
| `enhance.html` | DEUS Enhance "First Contact" sales deck, in English (8 slides) | **Dark + Sky**: navy and glow slides, sky-blue light slides, glass cards |

Both decks share the same tokens, type, eyebrow pattern, footer, contact bar and motion engine. This guide treats them as **one system with three surface modes** (Light, Dark, Sky), so the same language carries over to a scrolling website.

> **Units.** The decks are built on a fixed **1920×1080 canvas** that is scaled to fit the screen. On a 1440px-wide laptop that scale is about **0.75**. Every "Deck" value below is canvas px. The "Web" column is the value to use on a normal responsive site, already scaled down, with mobile endpoints taken from the decks' own `≤900px` mobile CSS.

---

## 1. Brand essence

- **Who:** DEUS Human Capital Services (legal entity: PT Investama Persada Kurnia). HR-tech that offers gamified assessment, performance management and people analytics.
- **Products:** Discover, Enhance, Next Chapter, Potentia.
- **Personality:** confident, calm, evidence-led, human. "Consulting-grade editorial" rather than "playful startup".
- **Visual signature, in one line:** *Huge, tightly tracked navy headlines in Inter ExtraBold, monospace orange eyebrows with a dash, hairline rules, soft periwinkle glows over a faint dot grid, and one orange accent per view.*

### The 10 signature moves (if you only remember these)
1. **Eyebrow label:** JetBrains Mono, uppercase, wide tracking, orange, led by a 28×2px orange dash.
2. **Display type:** Inter 800 with **negative tracking that tightens as size grows** (about −0.02em for h2, about −0.034em for hero).
3. **Navy, not black:** headings `#0A1740`, body ink `#0F1F52`, muted copy is a grey-teal slate `#56696E`.
4. **One orange accent per view.** Use it for the eyebrow, numbers, the last or current item, a single highlighted word, or the CTA. Never for large fills.
5. **Mono numerals for indexing:** `01`, `02`, … `06` in orange mono above each item. Use `01 / 04` for "n of total".
6. **Hairline structure:** 1px navy rules at 12% (`--line`) and 26% (`--line-strong`) opacity separate content, in place of boxes and shadows.
7. **Atmosphere layer:** a 30px dot grid masked to a soft ellipse, plus one or two periwinkle radial glows in the corners.
8. **Big soft-radius cards** (28px) in translucent white with 1px hairline borders. On hover they **invert to solid navy** and the arrow chip turns orange.
9. **Pill everything small:** contact chips, CTA buttons, nav dots and badges are all `border-radius:100px`.
10. **Staggered rise-in:** items fade up 44px with `cubic-bezier(.2,.7,.3,1)` over .85s, about 130ms apart.

---

## 2. Color

### 2.1 Core palette (shared by both decks)

| Token | Hex | Role |
|---|---|---|
| `--navy-900` | `#0A1740` | Headings on light. Darkest ink. |
| `--navy-800` | `#0F1F52` | Body ink on light, **base background of Dark mode**, hover fill for cards |
| `--navy-700` | `#1D2F6E` | Solid card surface on Dark (role cards) |
| `--navy-600` | `#2B3F86` | Deep accent blue, used in glows |
| `--orange` | `#FF5A33` | **The accent.** Eyebrows, numbers, active dot, CTA, highlight underline |
| `--orange-dim` | `#E14B27` | Hover/pressed state of orange. Small orange text on glass. |
| `--slate-600` | `#56696E` | Secondary/body copy on light (ledes, paragraphs) |
| `--slate-500` | `#6E8388` | Tertiary/meta (footer, eyebrow sub-numbers, stat labels) |
| `--white` | `#FFFFFF` | |

### 2.2 Light-mode surfaces (`about.html`)

| Token | Hex / value | Role |
|---|---|---|
| `--paper` | `#F8FBFD` | Default section background |
| `--tint` | `#EFF6FA` | Alternate section background. Sections alternate **paper → tint → paper**. |
| `--page-tint` | `#EAF4F8` | Slightly deeper tint (Enhance light slides) |
| `--card-glass` | `#F4F9FC` | Solid fallback for glass cards |
| `--line` | `rgba(15,31,82,.12)` | Hairlines, card borders, list dividers |
| `--line-strong` | `rgba(15,31,82,.26)` | Top-rules over columns, emphasized dividers, pill borders |
| `--line-light` | `#DCE9EC` | Opaque hairline (footer rule on Enhance light slides) |
| `--peri` | `#99B4FF` | Periwinkle. **Glows only**, at 10–50% alpha. Also a small orbit dot. |
| `--peri-soft` | `#DCE6FF` | Defined in the source, unused. Safe for soft fills. |
| Timeline rule | `#A9B5CD` | Connector line between timeline dots |

### 2.3 Dark-mode surfaces (`enhance.html`)

| Token | Hex / value | Role |
|---|---|---|
| Background | `--navy-800` `#0F1F52` | |
| Glow stops | `#3A56AA` → `#223B82` → `#14245F` → transparent | The signature "blue nebula" radial |
| `--mist-300` | `#C9D3EE` | Body copy on dark |
| `--mist-400` | `#9AA8D8` | Meta/footer copy on dark. Gear illustration fill. |
| `--mist-500` | `#7480B4` | Faint captions on dark |
| Dark hairline | `rgba(255,255,255,.12)` | Footer rule, borders |
| Dark glass | `rgba(255,255,255,.07)` bg, `rgba(255,255,255,.14)` border | Cards on navy |
| Dot grid (dark) | `rgba(201,211,238,.16)` | |

### 2.4 Sky-mode surfaces (`enhance.html` solution/outcome slides)

| Value | Role |
|---|---|
| `#81B8EE` | Sky blue section background, overlaid with white radial highlights |
| `linear-gradient(165deg,#DCEEFC,#A9D2F0)` | Pale sky panel (split layouts) |
| `linear-gradient(165deg,#16296B,#0F1F52)` | Navy panel paired with the sky panel |
| `#8FC0F0 → #2A4DA8` | Vertical gradient for the "pill" timeline line |
| `#33507E` | Body copy **inside white glass cards** on sky |
| `#1E3A6E`, `#153059` | Footer and CTA copy directly on sky |
| `#FBFDFF` | Near-white split panel |

### 2.5 Logo colors (sampled from the logo tile)
- Tile: `#0E222D` (very dark teal-navy). Mark and wordmark: cream `#FDF4D0` / warm grey.
- The logo is a **square app-tile** (157×157 source) shown at 38×38px, `border-radius:10px`, `box-shadow:0 6px 18px rgba(10,23,64,.18)`, top-left of every view. It is included here as `deus-logo.png`.

### 2.6 Usage ratios
- **Light pages:** about 85% paper/tint, 12% navy ink, 3% or less orange.
- **Dark pages:** about 80% navy and glow, 15% white/mist text, 5% or less orange.
- Orange never fills large areas. The biggest orange fills in the source are a 56px arrow chip on hover, a CTA pill, and a 12%-alpha orange-tinted teaser card.

### 2.7 Contrast (measured, WCAG 2.x)

| Pair | Ratio | Verdict |
|---|---|---|
| navy-900 on paper | 16.7 | ✅ AAA |
| slate-600 on paper / tint | 5.6 / 5.3 | ✅ AA body |
| slate-500 on paper | 3.8 | ⚠️ large text or non-essential meta only |
| **orange `#FF5A33` on paper** | **3.0** | ❌ fails AA for small text, borderline for large |
| orange-dim `#E14B27` on paper | 3.9 | ⚠️ large text only |
| orange on navy-800 | 5.1 | ✅ AA (orange reads better on dark) |
| white on orange (CTA) | 3.1 | ⚠️ large/bold text only |
| mist-300 on navy-800 | 10.5 | ✅ |
| mist-400 on navy-800 | 6.7 | ✅ |

**Recommendation for the website** (a small deviation from the decks, which are presentation media):
- Add `--orange-ink: #C93D1B` (4.9:1 on paper) for **small orange text on light backgrounds**: eyebrows, item numbers and inline links. Keep `#FF5A33` for dashes, dots, underlines, icons, large display words and anything on navy.
- For CTA buttons, either keep `#FF5A33` with white **bold text ≥ 18.7px**, or use `#C93D1B` as the button fill (white on it is about 5.1:1).
- Don't use slate-500 for anything the user must read.

---

## 3. Typography

### 3.1 Families
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&display=swap" rel="stylesheet">
```
- **Inter** (400, 500, 600, 700, 800). Everything except labels. Headlines are **always 800**.
- **JetBrains Mono** (500, 600, 700). Eyebrows, numbers, footers, meta, chip labels, "n / total" counters. Usually **uppercase with wide tracking**.
- Stacks: `'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif` and `'JetBrains Mono','SFMono-Regular',Consolas,monospace`.
- Global: `-webkit-font-smoothing:antialiased; text-rendering:optimizeLegibility;`
- Next.js: `next/font/google` → `Inter({ subsets:['latin'], weight:['400','500','600','700','800'] })` and `JetBrains_Mono({ subsets:['latin'], weight:['500','600','700'] })`.

### 3.2 Type scale

Letter-spacing is given in `em` so it scales with size.

| Role | Deck (px / lh / tracking) | Web desktop → mobile | Weight | Color (light / dark) |
|---|---|---|---|---|
| **Hero display** (cover h1) | 132 / 1.03 / −4.5px | `clamp(40px, 7vw, 104px)` · lh 1.03 · **−0.034em** | 800 | navy-900 / white |
| **Statement / closing** | 106–124 / 1.07–1.08 / −3.4 to −4px | `clamp(30px, 6vw, 92px)` · lh 1.07 · −0.032em | 800 | navy-900 / white |
| **Product title** | 108 / 1.0 / −3.4px | `clamp(46px, 6vw, 84px)` · lh 1.0 · −0.031em | 800 | navy-900 |
| **Big stat** | 340 / .9 / −14px | `clamp(130px, 18vw, 260px)` · lh .9 · −0.041em | 800 | navy-900 + orange "+" |
| **H1** (page) | 60 / 1.14 / −1.5px | `clamp(34px, 4.2vw, 48px)` · lh 1.14 · −0.025em | 800 | navy-900 / white |
| **H2** (section) | 56 / 1.1 / −1.2px | `clamp(28px, 3.6vw, 44px)` · lh 1.1 · −0.021em | 800 | navy-900 / white |
| **H3 card title (large)** | 58 / 1.0 / −2px | `clamp(30px, 3.2vw, 44px)` · lh 1 · −0.034em | 800 | navy-900 |
| **H3 item** | 36 / 1.15 / −.8px | `clamp(22px, 2.2vw, 28px)` · lh 1.15 · −0.022em | 800 | navy-900 |
| **H4 / glass-card title** | 24–27 / 1.25 | `18–20px` · lh 1.25 · −0.012em | 700 | navy-900 / white |
| **Tagline** | 28 / 1.38 / −.3px | `clamp(18px, 1.6vw, 22px)` · lh 1.38 | 600 | navy-800 |
| **Lede** | 25 / 1.5–1.55 | `clamp(16px, 1.4vw, 20px)` · lh 1.55 | 400 | slate-600 / mist-300 |
| **Body** | 20–23 / 1.5–1.6 | `16–17px` · lh 1.6 | 400 | slate-600 / mist-300 |
| **Small body** | 18–19 / 1.5 | `14–15px` · lh 1.55 | 400 | slate-600 |
| **Eyebrow** (mono) | 16 / 600 / 4px | `12–13px` (mobile 11px) · **0.25em** · UPPERCASE | 600 | orange (→ orange-ink on light web) |
| **Index number** (mono) | 18 / 600 / 2px | `13–14px` · 0.11em | 600 | orange |
| **Cover sub** (mono) | 21 / 500 / 3px | `13–16px` · 0.14em · UPPERCASE | 500 | navy-800 |
| **Stat label** (mono) | 22 / 600 / 6px | `13–16px` · 0.27em · UPPERCASE | 600 | slate-500 |
| **Footer / meta** (mono) | 14 / 2px | `10–11px` · 0.14em · UPPERCASE | 400–500 | slate-500 / mist-400 |
| **Chip label** (mono) | 12 / 1.5px | `11–12px` · 0.12em · UPPERCASE | 400 | slate-500 / mist-400 |
| **Chip text** (sans) | 13 / 600 | `13px` | 600 | navy-900 / white |

### 3.3 Typographic rules
- **Inline emphasis:** `<b>` at 700 in the *heading* color (navy-900 on light, white on dark) inside slate or mist body copy. Use it to pull out 1–3 key phrases per paragraph.
- **Accent line:** in two-line closers, the second line is orange and on its own line (`.accent{display:block;color:var(--orange)}`). Example: "Siap bertransformasi / **dengan DEUS?**"
- **Orange first letter:** in lists where every item starts with the same letter (the six "I" values), `h3::first-letter{color:var(--orange)}`.
- **Highlighted phrase:** a 6px orange underline drawn as a background wipe (see §7.3). Use once per page, on the phrase that carries the message.
- **Long names stay on one line** (`white-space:nowrap` with slightly smaller size) so card rows stay aligned.
- **Measure:** ledes max about 1000px deck (about 60–70ch). Paragraph columns about 470px deck (about 36ch).
- **Mobile:** headlines drop tracking to about −0.025em, and everything goes left-aligned (Light) or centered (Enhance). **Prefer left-aligned for the website.**

---

## 4. Layout and spacing

### 4.1 Grid and frame
| | Deck | Web |
|---|---|---|
| Canvas / container | 1920 wide, 128px side padding (content width 1664) | `max-width: 1280–1440px`, side padding `clamp(22px, 6.67vw, 128px)` |
| Section padding (top / bottom) | 124 / 150 (Light), 112 / 64 (Dark) | `clamp(84px, 9vw, 140px)` top and bottom |
| Brand mark | absolute top 38, left 128 | in the site header, aligned to the container's left edge |
| Footer meta bar | absolute bottom 56, 1px top rule | sits at the bottom of a section or the page, `padding-top: 22px; border-top: 1px solid var(--line)` |

Columns used in the source:
- **4-up** cards (solutions): `repeat(4,1fr)`, gap 32.
- **3×2** grid (values, problems, outcomes): `repeat(3,1fr)` × 2 rows, column-gap 64 (rule-topped) or gap 22 (glass cards).
- **2-up** (vision/mission): `1fr 1fr`, gap 40.
- **6-up** horizontal timeline.
- **Asymmetric split**: `700px 1fr`, gap 96 (stat + list). `640px copy | flex visual`, gap 72 (product). 60/40 and 50/50 full-bleed color splits (Enhance).
- Mobile (≤900px): everything collapses to **one column**. Enhance keeps compact 3×2 glass grids at **2 columns**.

### 4.2 Spacing scale
The decks use these values repeatedly (deck px): **6 · 8 · 10 · 14 · 18 · 22 · 26 · 30 · 36 · 40 · 48 · 56 · 64 · 72 · 96 · 128**.

Normalized web scale (about ×0.75, rounded to a 4px grid):

| Token | px | Typical use |
|---|---|---|
| `--s-1` | 4 | icon–text nudge |
| `--s-2` | 8 | chip gaps, small stacks |
| `--s-3` | 12 | title → paragraph |
| `--s-4` | 16 | eyebrow → heading (deck 22) |
| `--s-5` | 20 | rule → content (deck 26–30) |
| `--s-6` | 24 | card grid gap (deck 32) |
| `--s-7` | 32 | card padding (deck 36–40), 2-up gap |
| `--s-8` | 40 | heading → grid (deck 56–60) |
| `--s-9` | 48 | 3-up column gap (deck 64) |
| `--s-10` | 72 | big split gaps (deck 96) |
| `--s-11` | 96–128 | section padding |

**Rhythm recipe for any section:** eyebrow → 16px → H2 → 16px → lede → 40px → grid. Each grid item: 1px top rule → 20px → mono number → 14px → H3 → 10px → paragraph.

### 4.3 Radius
| Token | px | Use |
|---|---|---|
| `--r-xs` | 4 | screen insets in device mockups |
| `--r-sm` | 10 | logo tile, inner dashed placeholders |
| `--r-md` | 14–18 | icon tiles, role cards, laptop mockup |
| `--r-lg` | 20–24 | step cards, feature cards, lede card. **Mobile cards: 16–20.** |
| `--r-xl` | **28** | primary cards (solutions, vision/mission, glass grid) |
| `--r-pill` | 100 | chips, buttons, nav dots, contact bar |
| circle | 50% | icon discs (176px vision icon), arrow chip (56px), timeline nodes |

### 4.4 Elevation
The system is **mostly flat**. Hairlines do the separating. Shadows appear on hover, on glass, and on product imagery.

| Token | Value | Use |
|---|---|---|
| `--sh-logo` | `0 6px 18px rgba(10,23,64,.18)` | logo tile |
| `--sh-hover` | `0 26px 44px rgba(10,23,64,.22)` | card lifted on hover (with `translateY(-8px)`) |
| `--sh-glass` | `0 20px 44px rgba(11,29,74,.16), inset 0 1px 0 rgba(255,255,255,.85)` | light glass card |
| `--sh-glass-dark` | `0 20px 44px rgba(4,10,32,.4), inset 0 1px 0 rgba(255,255,255,.08)` | glass on navy |
| `--sh-soft` | `0 14px 32px rgba(20,60,110,.12)` | feature or step cards on sky |
| `--sh-solid-dark` | `0 18px 34px rgba(4,10,16,.35)` | solid navy-700 cards |
| `--sh-device` | `drop-shadow(0 30px 38px rgba(10,23,64,.17))` | laptop mockup (filter, not box-shadow) |
| `--sh-cta` | `0 10px 24px rgba(255,90,51,.4)` | orange CTA pill |
| Orange halo | `0 0 0 6px rgba(255,90,51,.16)` | "current" timeline node |

---

## 5. Backgrounds and atmosphere

Every section has two decorative pseudo-layers behind the content (`z-index` 0/1, content at 2, `pointer-events:none`).

### 5.1 Light: dot grid + periwinkle glow
```css
.section{ position:relative; background:var(--paper); overflow:hidden; }
.section.tint{ background:var(--tint); }

/* dot grid, faded out by an elliptical mask; move the focus per section with --gx/--gy */
.section::before{
  content:""; position:absolute; inset:0; pointer-events:none;
  background-image:radial-gradient(rgba(15,31,82,.11) 1.5px, transparent 1.5px);
  background-size:30px 30px;
  -webkit-mask-image:radial-gradient(ellipse 1300px 950px at var(--gx,80%) var(--gy,10%), #000 0%, transparent 74%);
          mask-image:radial-gradient(ellipse 1300px 950px at var(--gx,80%) var(--gy,10%), #000 0%, transparent 74%);
}
/* two corner glows: top-right strong, bottom-left soft */
.section::after{
  content:""; position:absolute; inset:0; pointer-events:none;
  background:
    radial-gradient(900px 640px at 104% -8%, rgba(153,180,255,.34), transparent 66%),
    radial-gradient(700px 520px at -6% 108%, rgba(153,180,255,.2), transparent 64%);
}
.section > *{ position:relative; z-index:2; }
```
- **Vary `--gx/--gy` per section** (the deck moves the dot-grid focus on every slide: 76/46, 20/90, 84/14, 16/8 …) so scrolling doesn't feel repetitive.
- For a hero or closing CTA, boost the glows to `.5` / `.4` alpha and size `1150×860` / `1000×760`.
- On mobile, change the mask to `ellipse 120% 60% at 90% 0%`.

### 5.2 Dark: blue nebula
```css
.section.dark{
  color:#fff;
  background:
    radial-gradient(1300px 950px at 78% 12%, #3A56AA 0%, #223B82 26%, #14245F 48%, transparent 72%),
    var(--navy-800);
}
.section.dark::before{ /* lighter dots */
  background-image:radial-gradient(rgba(201,211,238,.16) 1.5px, transparent 1.5px);
  background-size:30px 30px;
  mask-image:radial-gradient(ellipse 1300px 950px at 80% 12%, #000 0%, transparent 76%);
}
.section.dark::after{ background:radial-gradient(760px 560px at -8% 108%, rgba(43,63,134,.5), transparent 62%); }
```
Closing variant: twin glows at `90% 4%` and `4% 100%` in `rgba(58,86,170,.85/.7)`. Headline gets `text-shadow:0 20px 55px rgba(0,0,0,.5), 0 6px 16px rgba(0,0,0,.35)`.

### 5.3 Sky
```css
.section.sky{
  background:
    radial-gradient(1100px 750px at 78% 10%, rgba(255,255,255,.55), transparent 62%),
    radial-gradient(900px 650px at 8% 95%, rgba(255,255,255,.28), transparent 60%),
    #81B8EE;
}
```

### 5.4 Ornament: orbit rings (cover art)
An 800px SVG of concentric circles in navy at 10–24% opacity (one ring dashed `2 9`), crosshair lines, a central white disc at 72%, a periwinkle radial glow, and **three orbiting dots**: orange r10, periwinkle r15 with a white stroke, navy r6. They rotate at **120s, 80s (reverse) and 50s**. This is the brand's abstract "system / people in orbit" motif. Use it in heroes, 404 pages and empty states. Copy the SVG from `about.html` lines 573–593.

---

## 6. Components

Each recipe shows web-scale values. Light mode is the default and dark variants are noted.

### 6.1 Eyebrow
```html
<div class="eyebrow">Our Solutions <span class="eb-num">01 / 04</span></div>
```
```css
.eyebrow{
  display:flex; align-items:center; gap:12px; margin-bottom:16px;
  font:600 12px/1 var(--font-mono); letter-spacing:.25em; text-transform:uppercase;
  color:var(--orange-ink);           /* #FF5A33 on dark */
}
.eyebrow::before{ content:""; width:24px; height:2px; background:var(--orange); }
.eyebrow .eb-num{ color:var(--slate-500); margin-left:6px; }
```
Always sits above a heading. Hero variant: slightly larger, with a 36px dash. Centered variant: `justify-content:center`.

### 6.2 Section header
Eyebrow → H2 (navy-900, 800) → optional lede (slate-600, max about 64ch). Left-aligned by default. Centered only for statement and closing sections.

### 6.3 Statement block
Very large H2 (statement scale) with one `.underline-word` phrase, then a `border-top:1px solid var(--line-strong)` rule, 36px deck (about 28px web) padding, and a lede paragraph underneath. Use it for the mission or philosophy line.

### 6.4 Rule-topped item (values, features)
```css
.val{ border-top:1px solid var(--line-strong); padding-top:24px; }
.val .num{ font:600 13px var(--font-mono); letter-spacing:.11em; color:var(--orange-ink); display:block; margin-bottom:14px; }
.val h3{ font-size:clamp(22px,2.2vw,28px); font-weight:800; letter-spacing:-.022em; line-height:1.15; color:var(--navy-900); margin-bottom:10px; }
.val p{ font-size:16px; line-height:1.55; color:var(--slate-600); max-width:36ch; }
```
Grid: 3 columns, column-gap about 48px, rows evenly distributed. **No boxes.** This is the default way to list 3–6 things.

### 6.5 Solution card (link card with navy-invert hover)
```html
<a class="sol-card" href="/discover">
  <span class="sol-num">01</span>
  <h3>Discover</h3>
  <p>Asesmen gamifikasi untuk mengenali kepribadian…</p>
  <span class="sol-arrow"><svg viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg></span>
</a>
```
```css
.sol-card{
  display:flex; flex-direction:column; text-decoration:none; min-height:390px;
  padding:30px 28px 28px; border-radius:28px;
  background:rgba(255,255,255,.62); border:1px solid var(--line); color:var(--navy-800);
  transition:background-color .3s ease, border-color .3s ease, color .3s ease, transform .3s ease, box-shadow .3s ease;
}
.sol-num{ font:600 13px var(--font-mono); letter-spacing:.11em; color:var(--orange-ink); margin-bottom:20px; }
.sol-card h3{ font-size:clamp(30px,3.2vw,44px); font-weight:800; letter-spacing:-.034em; line-height:1; color:var(--navy-900); }
.sol-card p{ margin-top:20px; padding-top:20px; border-top:1px solid var(--line-strong); font-size:17px; line-height:1.5; color:var(--slate-600); }
.sol-arrow{ margin-top:auto; width:42px; height:42px; border-radius:50%; display:flex; align-items:center; justify-content:center; border:1px solid var(--line-strong); }
.sol-arrow svg{ width:18px; height:18px; fill:none; stroke:currentColor; stroke-width:1.8; stroke-linecap:round; stroke-linejoin:round; }

.sol-card:hover, .sol-card:focus-visible{
  background:var(--navy-800); border-color:var(--navy-800); transform:translateY(-8px);
  box-shadow:0 26px 44px rgba(10,23,64,.22); outline:none;
}
.sol-card:hover h3{ color:#fff; }
.sol-card:hover p{ color:rgba(255,255,255,.78); border-color:rgba(255,255,255,.22); }
.sol-card:hover .sol-num{ color:var(--orange); }
.sol-card:hover .sol-arrow{ background:var(--orange); border-color:var(--orange); color:#fff; transform:translateX(6px); }
```
**This hover is the brand's primary interactive moment.** Reuse it for any clickable card.

### 6.6 Glass card (Enhance)
- **On light or sky:** `background:rgba(255,255,255,.4); backdrop-filter:blur(18px) saturate(140%); border:1px solid rgba(255,255,255,.75); border-radius:28px; box-shadow:var(--sh-glass);`
- **On dark:** `background:rgba(255,255,255,.07); border:1px solid rgba(255,255,255,.14); box-shadow:var(--sh-glass-dark);`. The title is white and the text is mist-300.
- **Anatomy:** a big mono number (34px deck, **700**, orange) top-left, then a gradient divider `linear-gradient(90deg, rgba(15,31,82,.35), rgba(15,31,82,.04))` (white version on dark), with the title and copy anchored to the bottom (`justify-content:flex-end`).
- **Outcome variant:** a 54px white-60% icon disc with a 1.6px-stroke navy line icon at the top, then an orange **sans-bold** role tag ("HR", "Managers & Supervisors") and copy at the bottom.
- **Teaser variant** (the last cell of a grid, linking to the next section): an orange-tinted fill `rgba(255,90,51,.12)` with border `rgba(255,90,51,.3)` on dark (or lighter white glass on light), a mono label "UP NEXT", a 22px title and a `→`. On hover the tint rises to `.2`, or on sky the card lifts 6px.

### 6.7 Flip card (vision/mission)
A 2-up grid. Each card is 28px radius with a hairline border.
- **Front:** a centered 176px-deck (about 120px web) circle filled with a periwinkle radial and an orange **1.5px line icon**, then the title (96px deck, about 64px web, 800) with a 40×3 orange bar above it.
- **Back** (`rotateY(180deg)`, white 88%): a mono orange tag with a dash, then a large statement (40px deck, about 26px web) with **bolded key phrases**.
- Flips on hover or focus (`.85s cubic-bezier(.65,0,.35,1)`), and on tap on touch devices. In print, or as a no-JS fallback, show front and back stacked.
- *Website tip:* the flip hides content. For SEO and accessibility, consider showing both faces stacked on mobile, as the print styles do.

### 6.8 Timeline
**Horizontal (Light):** a 6-column `<ol>`. Each item: year (54px deck, about 40px web, 800, navy-900) → a 16px hollow node (`border:2px solid var(--navy-800)`, paper fill) → H4 (700) → small paragraph. Connector `#A9B5CD` 2px lines **draw left→right** in segments after the reveal (`scaleX(0→1)`, .4s linear each). **The last or current year is orange**, and its node is a filled orange dot with a `0 0 0 6px rgba(255,90,51,.16)` halo.
**Mobile:** vertical, with a 1px `--line-strong` rail at left 7px and nodes absolutely positioned on it.

**Vertical "process" (Dark/Sky):** each step has a 16px pale dot ringed in `rgba(42,77,168,.55)`, sitting on a **28px-wide rounded pill line** with the gradient `#8FC0F0 → #2A4DA8`. The last segment fades to transparent. Steps are labelled `▸ 01` in mono orange, followed by a white H3 and mist-300 copy. Steps reveal one by one as the user scrolls.

### 6.9 Stat block
A huge number (`40` + an orange `+` in a `<span>`), slightly outdented (`margin-left:-.035em`) so the glyph's optical edge aligns. Below it a mono uppercase stat label at 0.27em tracking in slate-500. The block is topped by a `--line-strong` rule.

### 6.10 Rule list (industries / tags)
A 2-column `<ul>` with a `--line-strong` top border. Each `li`: `padding:20px 0; border-bottom:1px solid var(--line); font-size:clamp(20px,2.2vw,28px); font-weight:700; letter-spacing:-.02em; color:navy-900`. Even items get `border-left:1px solid var(--line)` and left padding. One column on mobile.

### 6.11 Note / pull quote
`padding-left:22px; border-left:2px solid var(--orange); font-size:18px; line-height:1.6; color:var(--slate-600)`.

### 6.12 Buttons and chips
```css
/* Primary CTA: orange pill */
.btn{
  display:inline-flex; align-items:center; gap:6px;
  background:var(--orange); color:#fff; font:700 16px var(--font-sans);
  padding:10px 20px; border-radius:100px; text-decoration:none;
  box-shadow:0 10px 24px rgba(255,90,51,.4);
  transition:background .15s ease, transform .15s ease;
}
.btn:hover{ background:var(--orange-dim); transform:translateY(-1px); }
.btn::after{ content:"↗"; }       /* the source uses ↗ for external/mail actions, → for internal */

/* Secondary: outline pill (extrapolated from the chip and arrow styles) */
.btn-ghost{ background:transparent; color:var(--navy-900); border:1px solid var(--line-strong); box-shadow:none; }
.btn-ghost:hover{ background:rgba(255,90,51,.12); border-color:rgba(255,90,51,.55); }

/* Contact chip */
.chip{
  display:inline-flex; align-items:center; gap:7px;
  font:600 13px var(--font-sans); color:var(--navy-900); text-decoration:none;
  padding:6px 14px 6px 10px; border-radius:100px;
  background:rgba(255,255,255,.85); border:1px solid var(--line-strong);
  transition:background .15s, border-color .15s, transform .15s;
}
.chip:hover{ background:rgba(255,90,51,.12); border-color:rgba(255,90,51,.55); transform:translateY(-1px); }
.chip svg{ width:15px; height:15px; }
```
Dark chip: `background:rgba(255,255,255,.08); border-color:rgba(255,255,255,.16); color:#fff`.

**Contact bar:** a frosted pill that groups the label plus chips. Light: `rgba(255,255,255,.72)` with `blur(10px)`. Dark: `rgba(10,23,64,.55)`. Both have a `--line-strong` border, `padding:9px 18px`, `gap:16px`, and the mono label "CONTACT US" first. Contents: a WhatsApp chip (brand-green `#25D366` glyph) and an email chip (orange outline envelope).

### 6.13 Navigation
- **In the decks:** a vertical dot rail on the right (frosted white pill, 8px dots in navy at 22%, the **active dot stretches to a 22px orange capsule**) or a horizontal version at the bottom on dark.
- **For the website** (extrapolated, not in the source): a sticky header with the logo tile on the left, nav links in Inter 500 15px navy-800 (or mono uppercase 12px at 0.14em for a more "deck" feel), and an orange CTA pill on the right. Once scrolled, the bar becomes `rgba(248,251,253,.72) + blur(10px)` with a bottom `--line` border. Show the active link with an orange 2px underline or a small orange dot. The dot-rail capsule can serve as an in-page section indicator on long pages.

### 6.14 Footer meta bar
`display:flex; justify-content:space-between; padding-top:22px; border-top:1px solid var(--line);` in mono 11px uppercase at 0.14em, slate-500. Content is like "COMPANY PROFILE ··· 2026" or "PREPARED BY DEUS HUMAN CAPITAL SERVICES". Use it as the site footer's bottom row.

### 6.15 Device mockups
Product screenshots are **always shown inside a device**: a laptop PNG frame with the screenshot behind its transparent screen, a phone overlapping the laptop's right edge, or an angled laptop using a `matrix3d` homography. Behind the device sits a periwinkle radial glow (`980×760`, `rgba(153,180,255,.34)`), and the device has `filter:drop-shadow(0 30px 38px rgba(10,23,64,.17))`.

Inside the screen, use one of three behaviors:
- a **carousel**: 2s pause, 750ms slide on `cubic-bezier(.65,0,.35,1)`, looping seamlessly;
- a **slow auto-scroll** of a tall report: 20s ease-in-out loop that holds at the top and bottom;
- a **crossfade** between screenshots (.9s).

Frames are available in `assets_compro/`: `laptop-mockup-frame.png` (1400×841, angled ¾), `laptop-frame 2.png` (960×1080, front), `laptop-frame-cutout.png` (960×1080, angled). Screen rectangles are in `about.html` lines 262–280.

### 6.16 Icons
- **Line icons:** stroke 1.5–1.8, round caps and joins, `fill:none`, 24 viewBox. Navy on light cards, orange in hero discs and checkmarks. Use Lucide or Feather to match.
- **Arrow glyphs:** `→` (internal/next), `↗` (external/mail), `▸` (step prefix), `↓` (scroll hint, gently bouncing).

---

## 7. Motion

### 7.1 Tokens
| Token | Value | Use |
|---|---|---|
| `--ease-reveal` | `cubic-bezier(.2,.7,.3,1)` | element entrances (soft expo-out) |
| `--ease-slide` | `cubic-bezier(.65,0,.35,1)` | big moves: section transitions, flips, carousels |
| `--ease-wipe` | `cubic-bezier(.45,.05,.3,1)` | underline wipe |
| `--ease-pop` | `cubic-bezier(.34,1.56,.64,1)` | playful icon pop-ins (overshoot) |
| `--dur-micro` | `.15s ease` | chips, buttons, dots |
| `--dur-hover` | `.3s ease` | cards |
| `--dur-reveal` | `.85s` | entrances |
| `--stagger` | `.13s` (light) / `.16s` (dark grids) | between siblings |

### 7.2 Staggered reveal (website version)
The decks trigger entrances when a slide becomes current. On a scrolling site, trigger them with an `IntersectionObserver` instead.
```css
.r{ opacity:0; translate:0 44px; }
.in-view .r{
  opacity:1; translate:0 0;
  transition:opacity .85s var(--ease-reveal), translate .85s var(--ease-reveal);
  transition-delay:calc(.15s + var(--i,0) * .13s);
}
```
```js
const io = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting){ e.target.classList.add('in-view'); io.unobserve(e.target); }
}), { threshold: .25 });
document.querySelectorAll('section').forEach(s => io.observe(s));
```
Set `style="--i:n"` on each child in reading order: eyebrow 0, heading 1, lede 2, grid items 3+. Reveal once and don't reverse on scroll-out (the Enhance code explicitly avoids that because it jitters). On the web, use about 32px travel; 44–80px only suits full-screen sections.

### 7.3 Highlight underline wipe
```css
.underline-word{
  background:linear-gradient(var(--orange),var(--orange)) no-repeat 0 calc(100% - 2px) / 0% 6px;
  transition:background-size 1.1s var(--ease-wipe);
}
.in-view .underline-word{ background-size:100% 6px; transition-delay:1.2s; }
```
It runs after the headline has landed and wraps correctly across line breaks.

### 7.4 Other signature motions
- **Orbit art:** continuous linear rotation at 50/80/120s, running only while visible.
- **Timeline connector draw:** sequential `scaleX` segments after the reveal.
- **Card hover:** lift −8px, invert to navy, arrow slides +6px.
- **Checkmark draw:** `stroke-dasharray:30; stroke-dashoffset:30 → 0` over .6s.
- **Fade-in punchline words:** closing words fade over 1.8–2.4s with a .5s/1.3s delay. Use this for the final CTA line.
- **Gear "wind-up":** gears rotate 220° and −320° over 1.6s once (Enhance urgency slide).
- **Mockup rotate-in:** `rotateY(-42deg) → 0` over 2.4s.

### 7.5 Deck-only behaviors (don't port to a website)
The decks scroll-jack: wheel input moves the deck at 650px per slide and snaps after 140ms idle, with full-viewport slides moving vertically. **Use native scroll on the website.** If you want a "presentation" landing page, CSS `scroll-snap-type:y proximity` on full-height sections gets 80% of the feel without hijacking input.

### 7.6 Reduced motion
```css
@media (prefers-reduced-motion:reduce){
  *, *::before, *::after{ transition-duration:.01s !important; transition-delay:0s !important; animation:none !important; }
  .r{ opacity:1; translate:none; }
}
```

---

## 8. Responsive rules (from the decks' `≤900px` CSS)
- Breakpoint: **900px** (plus a 681–900px band where two-column splits come back).
- One column. Cards keep their full design with smaller padding (22px) and radius (20px).
- Type mobile endpoints: hero `clamp(40px,12.5vw,58px)`, H2 `clamp(28px,8vw,38px)`, lede 16px, body 15px, eyebrow 11px at 0.23em, footer 10px.
- Section padding: `84px 22px 44px`.
- Hover-only interactions (flip, invert) need tap or focus equivalents: `@media (hover:none)` uses `:focus`.
- Disable entrance transforms on mobile if they cause jank. The light deck shows content immediately on mobile.
- Horizontal timeline → vertical rail. Stat number `clamp(130px,42vw,200px)`.
- The contact bar becomes a stacked block in normal flow at the end of the page.

---

## 9. Voice and content patterns
- **Languages:** the company profile is in **Bahasa Indonesia** and the product sales deck is in **English**. Labels and eyebrows mix freely ("Our Solutions" over "Solusi Kami", "Our Story" over "Perjalanan DEUS"). Pick one primary language per site and offer a toggle if needed.
- **Headlines:** short, declarative, benefit-first. Title Case in English ("From Scattered Data to Better Decisions"), sentence case in Indonesian ("Nilai-nilai yang kami pegang").
- **Two-beat closers:** "Make performance *visible.* / Make decisions *clearer.*" and "Siap bertransformasi / *dengan DEUS?*", with the second beat in orange.
- **Structure every argument as:** Problem (numbered 01–05 + teaser) → Urgency (persona vignettes) → Solution (numbered steps) → Fit/Usability → Outcome (per persona) → Next step (1–2 low-commitment steps + CTA) → Closer + contact.
- **Personas used:** HR · Plant & Operations Leaders · Managers & Supervisors · Employees · Senior Management & Finance.
- **Numbering:** two-digit mono (`01`), "n / total" for series (`01 / 04`), `▸ 01` for steps.
- **Teaser cards** end every grid with a pointer to what comes next ("Up next → See how Enhance closes every gap").
- **CTA copy:** soft and specific ("Reply to This Message ↗ and we'll set up a quick 30-minute call").
- **Contact:** WhatsApp `+62 823-1212-1660` (`https://wa.me/6282312121660`) and `admin@deushcs.com`.

---

## 10. Page blueprint: deck to website

| Website section | Source pattern | Surface |
|---|---|---|
| Hero | Cover: eyebrow + hero display + mono sub over a rule + orbit art (Light), **or** dark nebula + laptop mockup + glass lede card (Enhance) | paper or dark |
| Mission / philosophy | Statement block with underline wipe | tint |
| About (Vision & Mission) | 2-up flip cards | paper |
| Values | 3×2 rule-topped items, orange first letter | tint |
| Solutions overview | 4-up solution cards (navy-invert hover) | paper |
| Product detail (×4) | 640px copy column (eyebrow `01 / 04`, product title, tagline, rule, desc) + device mockup with glow | alternate paper/tint |
| Problem → Solution (product page) | Dark 3×2 glass grid + teaser → split navy timeline / sky feature card | dark → sky |
| Story | Horizontal timeline, current year orange | paper |
| Clients / proof | Big stat + 2-col rule list + orange-bar note (+ logo wall if available) | tint |
| CTA | Centered two-beat closer, boosted glows, contact bar | paper or dark |
| Footer | Logo tile, nav columns, mono meta bar | tint or navy-900 |

---

## 11. Do / Don't

**Do**
- Keep orange to one focal point per view.
- Use hairlines before boxes, and boxes before shadows.
- Pair every heading with a mono eyebrow.
- Tighten tracking on big type. Leave mono labels widely tracked.
- Alternate paper and tint sections, and shift the glow/dot focus each time.
- Put screenshots in device frames with a glow behind them.
- Give every interactive card the navy-invert + orange-arrow hover.

**Don't**
- Don't use pure black (`#000`) or pure grey for text. Ink is navy and muted text is slate.
- Don't fill large areas with orange or use orange gradients.
- Don't add new accent hues. Blues (navy → periwinkle → sky) are the only secondary family.
- Don't use rounded corners under 10px on containers, or mix sharp and soft corners.
- Don't use heavy drop shadows at rest.
- Don't use mono for paragraphs or sans for eyebrows.
- Don't center long body copy.

---

## 12. Drop-in tokens

### 12.1 CSS custom properties
```css
:root{
  /* ink + accent */
  --navy-900:#0A1740; --navy-800:#0F1F52; --navy-700:#1D2F6E; --navy-600:#2B3F86;
  --orange:#FF5A33; --orange-dim:#E14B27; --orange-ink:#C93D1B; /* orange-ink = web a11y addition */
  --slate-600:#56696E; --slate-500:#6E8388; --white:#FFFFFF;
  /* light surfaces */
  --paper:#F8FBFD; --tint:#EFF6FA; --page-tint:#EAF4F8; --card-glass:#F4F9FC;
  --line:rgba(15,31,82,.12); --line-strong:rgba(15,31,82,.26); --line-light:#DCE9EC;
  --peri:#99B4FF; --peri-soft:#DCE6FF;
  /* dark + sky */
  --mist-300:#C9D3EE; --mist-400:#9AA8D8; --mist-500:#7480B4;
  --glow-1:#3A56AA; --glow-2:#223B82; --glow-3:#14245F;
  --sky:#81B8EE; --sky-ink:#33507E;
  /* type */
  --font-sans:'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;
  --font-mono:'JetBrains Mono','SFMono-Regular',Consolas,monospace;
  /* shape */
  --r-sm:10px; --r-md:16px; --r-lg:22px; --r-xl:28px; --r-pill:100px;
  --sh-logo:0 6px 18px rgba(10,23,64,.18);
  --sh-hover:0 26px 44px rgba(10,23,64,.22);
  --sh-glass:0 20px 44px rgba(11,29,74,.16), inset 0 1px 0 rgba(255,255,255,.85);
  --sh-cta:0 10px 24px rgba(255,90,51,.4);
  /* motion */
  --ease-reveal:cubic-bezier(.2,.7,.3,1);
  --ease-slide:cubic-bezier(.65,0,.35,1);
  --ease-wipe:cubic-bezier(.45,.05,.3,1);
  --ease-pop:cubic-bezier(.34,1.56,.64,1);
  /* layout */
  --gutter:clamp(22px, 6.67vw, 128px);
  --section-y:clamp(84px, 9vw, 140px);
  --container:1440px;
}
html{ font-family:var(--font-sans); color:var(--navy-800); background:var(--paper);
      -webkit-font-smoothing:antialiased; text-rendering:optimizeLegibility; }
h1,h2,h3{ color:var(--navy-900); font-weight:800; }
::selection{ background:rgba(255,90,51,.18); }                      /* extrapolated */
:focus-visible{ outline:2px solid var(--orange); outline-offset:3px; }  /* from the dot nav */
```

### 12.2 Tailwind v4 (`@theme`, for a Next.js project)
```css
@import "tailwindcss";
@theme {
  --color-navy-900:#0A1740; --color-navy-800:#0F1F52; --color-navy-700:#1D2F6E; --color-navy-600:#2B3F86;
  --color-orange:#FF5A33; --color-orange-dim:#E14B27; --color-orange-ink:#C93D1B;
  --color-slate-600:#56696E; --color-slate-500:#6E8388;
  --color-paper:#F8FBFD; --color-tint:#EFF6FA; --color-peri:#99B4FF; --color-sky:#81B8EE;
  --color-mist-300:#C9D3EE; --color-mist-400:#9AA8D8; --color-mist-500:#7480B4;
  --color-line:rgb(15 31 82 / .12); --color-line-strong:rgb(15 31 82 / .26);
  --font-sans:"Inter", ui-sans-serif, system-ui, sans-serif;
  --font-mono:"JetBrains Mono", ui-monospace, monospace;
  --radius-card:28px; --radius-pill:100px;
  --shadow-hover:0 26px 44px rgb(10 23 64 / .22);
  --shadow-cta:0 10px 24px rgb(255 90 51 / .4);
  --ease-reveal:cubic-bezier(.2,.7,.3,1);
  --ease-slide:cubic-bezier(.65,0,.35,1);
}
```
Eyebrow in Tailwind: `font-mono text-[12px] font-semibold uppercase tracking-[.25em] text-orange-ink flex items-center gap-3 before:content-[''] before:w-6 before:h-[2px] before:bg-orange`.

---

## 13. Assets
- `deus-logo.png` (in this folder): the 157×157 logo tile, extracted from the base64 data URI in `about.html`. For production, get the vector original from the brand owner.
- `../assets_compro/`: laptop and phone frames plus product screenshots (Discover report, Enhance 1–5, Next Chapter gba 1–4, Potentia report and phone).
- ⚠️ `enhance.html` references an `assets_enhance/` folder (logo icon, cover mockup, box/light/icon illustration layers, slide-7 mockup, screenshots 6–9) that is **not in this repo**. Get it from the original source if you need those visuals.
