# DEUS Design Guide: Daylight

The visual source of truth for the DEUS Human Capital Services website. `WEBSITE-PLAN.md` refers to this file.

| | |
|---|---|
| **Direction** | Daylight v2, chosen by the owner on 2026-10-14 from three mockups in `design-directions/` |
| **Source of every value** | `design-directions/c-daylight-v2.html` (the CSS, plus the guide sheet at `#guide`). Screenshots: `design-directions/screenshots/c-daylight-v2-*.png` |
| **Replaces** | `Reference Design Guide.md` (the older guide, taken from the sales decks). Keep that file for history; where the two differ, this guide wins |
| **Stack it targets** | Next.js App Router, Tailwind CSS v4, `next/font` (Manrope), `lucide-react` (`WEBSITE-PLAN.md` §10) |
| **Status** | v1, 2026-10-14. Components marked **extrapolated** are not in the mockup. They follow its rules, and the owner signs them off in `/styleguide` before any page is built |

> **Sample data is illustrative.** Every person, score, date and percentage in the mockup and in this guide (Rina Wulandari, 94 / 75 / 60, 3.05, 2.96, 3.40, "Bonus band B", March 2025, the 82nd percentile, the event-log timestamps, "22 minutes", "2025 MT intake") is a placeholder. Keep the patterns, and replace the data with approved sample data before launch. Never show a real client's employee names or pay figures.

> **Units.** Values are CSS px at a 1440px-wide desktop unless marked otherwise. Mobile values come from the mockup's `@media (max-width:900px)` block. Fluid `clamp()` values interpolate between the two, from a 390px phone to a 1296px viewport (the 1200px container plus two 48px gutters). The interpolation itself is extrapolated; both endpoints are from the mockup.

---

## Contents

1. [Brand essence and the Daylight signature](#1-brand-essence-and-the-daylight-signature)
2. [Color](#2-color)
3. [Typography](#3-typography)
4. [Layout and spacing](#4-layout-and-spacing)
5. [Radius and elevation](#5-radius-and-elevation)
6. [Surfaces and atmosphere](#6-surfaces-and-atmosphere)
7. [Components](#7-components)
8. [Product imagery](#8-product-imagery)
9. [Motion](#9-motion)
10. [Responsive rules](#10-responsive-rules)
11. [Voice in the UI](#11-voice-in-the-ui)
12. [Do and don't](#12-do-and-dont)
13. [Drop-in tokens](#13-drop-in-tokens)
14. [Assets and placeholders](#14-assets-and-placeholders)
15. [Leftovers from the old design](#15-leftovers-from-the-old-design)

---

## 1. Brand essence and the Daylight signature

- **Who:** DEUS Human Capital Services (legal entity PT Investama Persada Kurnia). Game-based assessment (DEUS Discover, Next Chapter) and performance management (DEUS Enhance) for Indonesian companies, plus Potentia for children, parents and schools.
- **The idea, in one line:** *Know who to hire. Prove who to reward.* The site follows one employee from assessment to appraisal and the reward decisions that follow.
- **The feeling:** open, light and calm, like a clear morning sky. Generous space, centered moments, soft blue light behind real product screens. Premium and approachable, closer to a modern product company than a consultancy.

### The 10 moves to remember

1. **Light only.** White and Cloud sections. There is no dark surface anywhere, including the assessment and Enhance pages.
2. **The sky gradient is the only atmosphere.** It appears in two places: the hero window and the closing panel. No dot grids, and no glows on every section.
3. **Manrope only.** SemiBold (600) headlines with tight tracking: −0.045em display, −0.038em H2. No monospace, and no capitals-only text except the section label (§7.7).
4. **Headlines stay in ink.** Both lines of a two-line headline are navy ink. Never accent one word in color, weight or italics.
5. **Ember means now.** The DEUS orange `#FF6B3D` marks the current step, the hero journey's final node, the active tab's progress bar, a live recording dot or an approved result. It is never a button and never text on white.
6. **Navy pill buttons.** Primary is ink with white text. Secondary is white with a hairline border and a soft shadow. Text links are azure-ink.
7. **Section labels** sit above section headings: small azure-ink capitals between two short azure lines (§7.7).
8. **Space is the luxury.** 144px between sections, a centered header (label → H2 → lede), then 72px to the content.
9. **Show the person, not the software.** Product screens float over sky tiles with deep, soft shadows. There are no laptop frames. Key data moments (profile bars, appraisal scores, event logs) are UI cards built in code.
10. **Pills and soft corners.** Buttons, nav and chips are pills. Panels step up from 16 to 24 to 36px radius as they grow.

### What changed from the reference guide

| Reference guide (decks) | Daylight |
|---|---|
| Inter ExtraBold + JetBrains Mono | Manrope only, SemiBold headlines |
| Mono uppercase orange eyebrows with a dash | Section label: Manrope 13/700 azure-ink capitals between two short azure lines, no orange, no mono |
| Orange as the main accent and CTA | Navy CTAs; ember marks "now" only |
| Dot grid + periwinkle glows on every section | Plain cloud/white; sky gradient in two places |
| Screenshots in laptop frames | Floating screens and UI cards built in code |
| 10px+ radii, 28px cards | Pills; 16 / 24 / 36px panels |
| Light / Dark / Sky surface modes | Light only: White, Cloud, Sky panel, Warm (Potentia) |
| Navy-invert card hover with orange arrow chip | Card lifts 4px and gains the large soft shadow; arrow stays azure-ink |
| Mono numbering (`01`, `01 / 04`, `▸ 01`) | Plain numbers in a 32px circle (`1`, `2`, `3`) |
| Orbit-ring illustration | None. The journey timeline is the signature visual |

---

## 2. Color

### 2.1 Tokens

From the mockup's `:root` unless marked.

| Token | Hex | Role |
|---|---|---|
| `--ink` | `#101B3D` | Headings, primary button fill, active nav pill, strong text, numbers |
| `--ink-2` | `#26315A` | Nav links, chip text, primary button hover, secondary strong text (timeline dates) |
| `--slate` | `#5B6785` | Body copy, ledes, card descriptions, meta |
| `--slate-2` | `#8790A8` | Non-essential meta only (see contrast). Mockup uses it for the inactive language, footer bottom row, industry row and log timestamps |
| `--line` | `#E6EAF2` | Hairlines, card borders, dividers, progress-bar track |
| `--cloud` | `#F7F9FC` | Alternate section background, panel fill, field fill, number-circle fill |
| `--white` | `#FFFFFF` | Default background, cards |
| `--sky-1` | `#EAF3FF` | Tag fill, bar track, sky wash, stage tint |
| `--sky-2` | `#CFE2FF` | Thumbnail gradient top, hero glow |
| `--sky-3` | `#A9CBFF` | Data-bar gradient start, closing-panel bottom, hero glow |
| `--azure` | `#2563EB` | Focus, data bars, line icons, field focus border, the section label's lines (at 55%) |
| `--azure-ink` | `#1D4FC4` | Text links, section-label text, tag text |
| `--ember` | `#FF6B3D` | "Now" only (§2.4) |

Supporting values used in the mockup (named here so code doesn't repeat hex literals):

| Token | Value | Where it's used |
|---|---|---|
| `--ember-ink` | `#B23F18` | "Approved" text in the appraisal card; the Potentia link |
| `--ember-wash` | `#FFF3EE` | The "Bonus band B · Approved" row |
| `--ember-halo` | `rgba(255,107,61,.22)` | 6px ring around the "now" timeline node |
| `--ember-halo-sm` | `rgba(255,107,61,.20)` | 4px ring around the recording dot |
| `--error` | `#C42B2B` | Error field border |
| `--error-ink` | `#B02525` | Error message text |
| `--error-wash` | `#FDF2F2` | Form-level error panel. **Extrapolated** |
| `--focus-ring` | `rgba(37,99,235,.14)` | 4px field focus ring |
| `--field-border` | `#8790A8` | Field border at rest. **Extrapolated accessibility fix**, see §2.6 |

### 2.2 The Daylight gradients

| Name | Value | Used for |
|---|---|---|
| **Sky window** (the Daylight gradient) | `linear-gradient(180deg, #8DBAF7 0%, #B6D3FB 38%, #E3EEFD 74%, #F7F9FC 100%)` | The hero window. Two white highlights sit on top: `radial-gradient(600px 300px at 18% 30%, rgba(255,255,255,.5), transparent 70%)` and `radial-gradient(700px 320px at 84% 22%, rgba(255,255,255,.4), transparent 70%)` |
| **Closing panel** | `linear-gradient(180deg, #F7F9FC 0%, #D7E7FE 60%, #A9CBFF 100%)` | The closing panel and the 404 panel. The same family, running light to dark so the page "lands" |
| **Hero glow** | `radial-gradient(closest-side, rgba(169,203,255,.55), rgba(207,226,255,.35) 45%, rgba(255,255,255,0) 100%)` on a 1700×1100 ellipse, centered, top −340px | Behind the header and hero headline only |
| **Sky wash** | `linear-gradient(180deg, #fff, var(--sky-1) 55%, #fff)` | One soft section per page at most (none on Home since R14a cut the assessment spotlight) |
| **Stage tile** | `linear-gradient(160deg, var(--sky-1), #fff 70%)` | Behind the tab showcase screen and other large floating screens |
| **Thumbnail tile** | `linear-gradient(180deg, var(--sky-2), var(--sky-1))` | Behind screenshots in product tiles |
| **Data bar** | `linear-gradient(90deg, var(--sky-3), var(--azure))` | Profile bars, percentile bars |
| **Ember track** | `linear-gradient(90deg, rgba(255,255,255,.85), var(--ember))` | The last segment of the journey timeline, arriving at "now" |
| **Potentia warm band** | `linear-gradient(100deg, #FFF6EC, #FFE6D2)` | The Potentia tile and band only |

The guide sheet's gradient chip uses the sky-window stops at `90deg` purely to show them; on the site the window runs `180deg`.

### 2.3 Potentia palette (the warm band)

Potentia is a separate sub-brand with its own site (deuspotentia.com). On this site it appears as one warm tile or band. These values come from the mockup's `.p.potentia`.

| Token | Value | Role |
|---|---|---|
| `--warm-1` | `#FFF6EC` | Gradient start |
| `--warm-2` | `#FFE6D2` | Gradient end |
| `--warm-line` | `#FBE0C8` | Tile border |
| `--warm-text` | `#6B5446` | Body copy on the band |
| `--warm-link` | `#B23F18` | Link on the band (same as `--ember-ink`) |
| `--warm-chip` | `#9A4A1E` | Text of the "For parents and schools, in Bahasa Indonesia" chip, on `rgba(255,255,255,.7)` |
| `--shadow-warm` | `0 30px 60px -28px rgba(120,60,20,.45)` | Shadow under the Potentia phone and report images |

Headings on the band stay ink. Don't use Potentia's own royal blue, star mark or Montserrat here; that identity lives on deuspotentia.com.

### 2.4 Ember: one job

Ember marks **now**, so people learn to read it as "this is where we are".

| Ember is used for | How |
|---|---|
| The final or current timeline node | 18px dot filled ember, 2px white border, `0 0 0 6px var(--ember-halo)` |
| The segment arriving at "now" | The ember track gradient |
| The active tab's progress bar | 3px bar on a `--line` track |
| The active step in a scroll-synced sequence | The same 3px progress bar (extrapolated, §7.25) |
| A live "recording" dot | 8px dot, `0 0 0 4px var(--ember-halo-sm)` |
| An approved result | `--ember-ink` text on `--ember-wash` |

**Never:** a button fill, a link, text on white (2.83:1), a heading word, an icon color, a large fill, a section background, a hover state, a decorative dot. If more than two ember marks are visible in one view, one of them is wrong. Ember never carries meaning alone: the node also sits last on the line, and the tab is also white and raised.

### 2.5 Usage ratios

Approximate, read from the homepage screenshot (not measured):

| Share | What |
|---|---|
| about 70% | White and Cloud |
| about 15% | Sky (hero window, closing panel, image tiles) |
| about 12% | Ink and slate text, navy buttons |
| under 2% | Azure (links, icons, data bars) |
| under 0.5% | Ember (a few dots and one 3px bar) |

### 2.6 Contrast (measured, WCAG 2.x)

Computed with the WCAG relative-luminance formula. Small text needs 4.5:1. Large text (24px+, or 18.66px+ at weight 700) and UI parts (borders, focus rings, icons) need 3:1. Weight 600 doesn't count as bold for this rule.

| Pair | Ratio | Verdict | Use |
|---|---|---|---|
| ink on white / cloud / sky-1 | 16.85 / 15.98 / 15.06 | ✅ AAA | Headings, strong text |
| white on ink | 16.85 | ✅ AAA | Primary button |
| white on ink-2 | 12.58 | ✅ AAA | Primary button hover |
| ink-2 on white / cloud | 12.58 / 11.93 | ✅ AAA | Nav, chips, dates |
| slate on white / cloud / sky-1 | 5.64 / 5.35 / 5.04 | ✅ AA | Body copy, ledes |
| **slate-2 on white / cloud** | **3.19 / 3.02** | ⚠️ large text and non-essential only | See the rule below |
| azure on white / cloud | 5.17 / 4.90 | ✅ AA | Icons, focus, data (links use azure-ink) |
| azure-ink on white / cloud / sky-1 | 7.08 / 6.71 / 6.32 | ✅ AAA / AA | Links, section labels, tags |
| **ember on white / cloud** | **2.83 / 2.68** | ❌ fails, even for large text | Never text. As a UI mark it's 2.83, so it never carries meaning alone |
| white on ember | 2.83 | ❌ | Why ember is never a button |
| ink on ember | 5.96 | ✅ AA | Only if text ever has to sit on ember (it shouldn't) |
| ember-ink `#B23F18` on ember-wash / white | 5.34 / 5.81 | ✅ AA | "Approved" |
| warm-text `#6B5446` on warm-1 / warm-2 | 6.59 / 5.87 | ✅ AA | Potentia body |
| warm-link `#B23F18` on warm-1 / warm-2 | 5.43 / 4.84 | ✅ AA | Potentia link |
| warm-chip `#9A4A1E` on the chip (70% white over warm) | 6.09 / 5.92 | ✅ AA | Potentia chip |
| ink on sky window, top stop `#8DBAF7` / `#B6D3FB` | 8.43 / 10.99 | ✅ AAA | Window caption |
| ink-2 on `#8DBAF7` / `#B6D3FB` | 6.29 / 8.21 | ✅ AA | Timeline dates |
| slate on `#8DBAF7` / `#B6D3FB` | 2.82 / 3.68 | ❌ | **No slate text directly on the upper sky window** |
| slate on the closing panel at its 60% stop `#D7E7FE` / bottom `#A9CBFF` | 4.50 / 3.40 | ⚠️ / ❌ | **Keep slate copy in the top 60% of the closing panel**; anything lower is ink or ink-2 |
| slate on the contact bar (70% white over the panel) | 4.99–5.29 | ✅ AA | Contact-bar labels |
| slate on a floating card (90% white over the sky) | 5.29 | ✅ AA | Card keys |
| error-ink `#B02525` on white / cloud / error-wash | 6.69 / 6.35 / 6.11 | ✅ AA | Error messages |
| error `#C42B2B` border on white | 5.63 | ✅ | Error field border |
| azure focus border / outline on white | 5.17 | ✅ | Focus |
| **line `#E6EAF2` on white / cloud** | **1.21 / 1.14** | ❌ for a field boundary | Fine for decorative hairlines; not enough to show where a field is |
| cloud fill on white | 1.05 | ❌ for a field boundary | |
| field-border `#8790A8` on white / cloud | 3.19 / 3.02 | ✅ 3:1 | **Extrapolated** field border at rest |

**Rules that follow from the table**

- **Slate-2 is for things nobody has to read**: decorative separators (the `/` in `EN / ID`), placeholder text, disabled text. Anything a visitor reads or clicks uses slate or darker. That changes four mockup details: the inactive language, the industry row in the proof band, event-log timestamps and the footer bottom row all move from slate-2 to slate. The look barely changes (both are cool grey).
- **Fields need a 3:1 boundary** (WCAG 1.4.11). The mockup's soft field (cloud fill, `--line` border) fails at 1.21. Default: keep the cloud fill and use `--field-border` `#8790A8` at rest. If the owner prefers the softer mockup look in `/styleguide`, it's a conscious accessibility trade-off; record it.
- **Ember and azure as UI marks:** azure passes 3:1 everywhere. Ember doesn't, so it is always paired with a shape or position cue.

---

## 3. Typography

### 3.1 Family

**Manrope**, weights 400, 500, 600 and 700. Nothing else: no monospace, no second family, no italics for emphasis.

```tsx
// app/[locale]/layout.tsx
import { Manrope } from "next/font/google";
const manrope = Manrope({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-manrope", display: "swap" });
// <html lang={locale} className={manrope.variable}>
```

The `latin` subset covers English and Bahasa Indonesia, including the en dash in "7–15". Stack: `var(--font-manrope), system-ui, sans-serif`. Global: `-webkit-font-smoothing: antialiased`.

| Weight | Role |
|---|---|
| 400 | Body, ledes, descriptions |
| 500 | UI: nav links, language switch, meta, card keys, the inactive "Contact" link |
| 600 | Headings and big numbers (display, H2, stats), buttons, links, tags, chips |
| 700 | Small titles (34px and under): product names, tab titles, card titles, footer headings, the "DEUS" wordmark, emphasized words in body, section labels |

**Weight rule:** 600 at 40px and above, 700 at 34px and below. Big type gets its weight from size and space, so it stays at 600; small titles need 700 to hold their own.

### 3.2 Type scale

`lh` is line-height. Tracking is in `em`, so it scales with the size. Colors are ink unless noted. Mobile values come from the mockup's ≤900px CSS where it sets them; otherwise the size stays the same.

| Role | Desktop | Mobile | Fluid value | lh | Weight | Tracking | Source |
|---|---|---|---|---|---|---|---|
| **Display** (Home and page heroes) | 80 | 46 | `clamp(46px, 1.96rem + 3.75vw, 80px)` | 1.02 | 600 | −0.045em | `.hero h1` |
| **Closing H2** (closing panel, 404, long page H1s) | 60 | 34 | `clamp(34px, 1.43rem + 2.87vw, 60px)` | 1.08 | 600 | −0.038em | `.close h2` |
| **H2** (section) | 52 | 34 | `clamp(34px, 1.64rem + 1.99vw, 52px)` | 1.08 | 600 | −0.038em | `h2` |
| **H2 in an article** (story pages, privacy) | 34 | 28 | `clamp(28px, 1.59rem + 0.66vw, 34px)` | 1.15 | 600 | −0.03em | Extrapolated |
| **Big stat** (score in a card) | 52 | 52 | | 1 | 600 | −0.04em | `.jc .big b` |
| **Result stat** (percentile) | 40 | 40 | | 1.05 | 600 | −0.04em | `.stage .res .v b` |
| **H3, lead tile** | 34 | 28 | `clamp(28px, 1.59rem + 0.66vw, 34px)` | 1.2 | 700 | −0.035em | `.p.lead h3` (mobile extrapolated) |
| **H3, Potentia band** | 30 | 26 | | 1.2 | 700 | −0.025em | `.p.potentia h3` (mobile extrapolated) |
| **H3, product tile** | 24 | 22 | | 1.25 | 700 | −0.025em | `.p h3` |
| **H3, panel** (Why DEUS) | 22 | 22 | | 1.25 | 700 | −0.022em | `.why h3` |
| **Title, tab** | 20 | 20 | | 1.3 | 700 | −0.02em | `.tab .h` |
| **Title, stat tile** | 20 | 20 | | 1.3 | 700 | −0.02em | `.gba .note .stats b` |
| **Title, card** (floating card, game tile) | 17 | 17 | | 1.35 | 700 | −0.015em | `.jc .t`, `.game b` |
| **Lede, hero** | 20 | 17 | `clamp(17px, 0.98rem + 0.33vw, 20px)` | 1.65 | 400 | 0 | `.hero .lede`, slate |
| **Lede, section** | 19 | 17 | `clamp(17px, 1.01rem + 0.22vw, 19px)` | 1.65 | 400 | 0 | `.s-head p`, `.close p`, slate (mobile extrapolated) |
| **Body large** | 18 | 17 | | 1.65 | 400 | 0 | `.gba .note p`, slate |
| **Body** | 17 | 17 | | 1.65 | 400 | 0 | `body`, slate for copy |
| **Body small** | 16 | 16 | | 1.65 | 400 | 0 | `.tab p`, `.why p`, proof line, slate |
| **Card copy** | 15.5 | 15.5 | | 1.65 | 400 | 0 | `.p p`, slate |
| **Button** | 16 (sm 15) | same | | 1 | 600 | 0 | `.btn` |
| **UI** (nav, contact link, footer links) | 15 | 15 | | 1.65 | 500 | 0 | `.nav`, `footer li` (footer links 400 in slate) |
| **Section label** | 13 | 13 | | 1.4 | 700 | +0.12em, capitals | `text-eyebrow` (F4). The one capitals-only, letter-spaced text on the site |
| **Tag, chip** | 14 (tags 13.5) | same | | 1.65 | 600 | 0 | `.chips span`, `.pts span` |
| **Meta** (product subtitle, card captions) | 14 | 14 | | 1.65 | 500 | 0 | `.p small`, `.game > .cap span`, slate |
| **Card key** | 13 | 13 | | 1.65 | 500 | 0 | `.jc .k`, `.stage .res .k`, slate |
| **Log row** | 13 | 13 | | 1.65 | 400 (last row 700) | 0 | `.game .log li` |
| **Micro** (split-cell labels) | 12.5 | 12.5 | | 1.65 | 400 | 0 | `.jc .split div`, slate |
| **Styleguide display** | 96 | 60 | | 1 | 600 | −0.05em | `.g-head h1`. Styleguide only |
| **Wordmark** | 19 | 19 | | 1 | 700 | −0.02em | `.brand b` |

The guide sheet labels the display size "Display 84", but the CSS sets 80px. The CSS wins: **80**.

The mockup leaves titles at the body line-height (1.65). The `lh` values for titles are extrapolated, so they hold together when an Indonesian title wraps.

### 3.3 Rules

- **Headlines:** 600, tight tracking, `text-wrap: balance`. Display is capped at `max-width: 11em`, the closing H2 at `12em`, and section headers at `780px`.
- **Two-line headlines:** each line is a block (`<span style="display:block">`), so "Know who to hire. / Prove who to reward." breaks where the copy says. **Both lines stay ink and the same weight.** In the content files, ` / ` marks the line break, and headings carry no bold (`content/VOICE.md`). If bold ever appears in a heading, don't render it as a color, weight or style change.
- **Never accent part of a headline:** no colored word, no italic word, no highlighter, no underline wipe.
- **Emphasis in body copy:** `<b>` at 700 in ink inside slate copy, for one or two key phrases per paragraph (as in "Trusted by **40+ brands**").
- **Numbers:** `font-variant-numeric: tabular-nums` wherever numbers sit in columns or change (scores, bars, logs, tables, stats). The "+" in "40+" stays ink, the same as the number.
- **No capitals-only text,** no letter-spaced labels, and no monospace anywhere, including timestamps and code-like IDs. The one exception is the section label (§7.7, F4): capitals with 0.12em spacing, written in sentence case in the content and set in capitals by CSS.
- **Measure:** body 60–70 characters (`max-width: 34em` for ledes, `30em` in the lead tile, `22em` in the footer about line). Ledes use `text-wrap: balance`.
- **Indonesian runs 20–30% longer.** Test every heading, button and tab in Indonesian in `/styleguide`. Headings may take a third line on mobile; buttons may not wrap (shorten the copy instead).

---

## 4. Layout and spacing

### 4.1 Frame

| Token | Desktop | Mobile (≤900px) | Source |
|---|---|---|---|
| `--container` | 1200px content width | full width | `.wrap` |
| `--gutter` | 48px | 22px. Fluid: `clamp(22px, 0.68rem + 2.87vw, 48px)` | `--gutter` |
| Wide frame | 1320px max (header, hero window, closing panel) | full width | `.header .wrap`, `.window`, `.close .panel` |
| Wide-frame inset | 24px each side (window and closing panel) | 24px (extrapolated: 12px below 480px) | `.window`, `.close` |
| Header height | 84px | 84px (extrapolated: 68px below 480px) | `.header` |

Content lives in `.wrap` (1200 + gutters = 1296px). Only three things use the wider 1320px frame: the header, the hero sky window and the closing panel. That makes the sky moments feel bigger than the content around them.

### 4.2 Section rhythm

| Step | Desktop | Mobile | Source |
|---|---|---|---|
| Section padding (top and bottom) | **144px** | **88px**. Fluid: `clamp(88px, 3.99rem + 6.18vw, 144px)` | `section.s` |
| Tight top padding: the second of two sections that share a background | 96px | 64px (extrapolated) | `style="padding-top:96px"` on Why DEUS |
| Section label → H2 | 20px | 20px | label margin |
| H2 → lede | 20px | 20px | `.s-head p` |
| Section header → content | **72px** | 48px (extrapolated; the mockup keeps 72) | `.s-head` |
| Content → secondary row (e.g. the GBA note) | 64px | 40px (extrapolated) | `.gba .note` |
| Header → hero H1 | 64px | 64px | inline `padding-top:64px` |
| Hero H1 → lede | 28px | 28px | `.hero .lede` |
| Lede → buttons | 40px | 40px | `.hero .ctas` |
| Buttons → sky window | 64px | 64px | `.window` |
| Hero window → proof row | 56px | 56px | `.proof` |
| Footer padding | 72px top, 40px bottom | same | `footer` |

**Recipe for any section:** section label → 20 → H2 → 20 → lede (optional) → 72 → content. One idea per section.

### 4.3 Spacing values

Daylight sits on a 4px grid with a few 2px steps inside small components. Tailwind v4's default `--spacing: 0.25rem` covers all of them (`p-18` = 72px, `py-36` = 144px), so there's no custom spacing scale; use these values and nothing in between.

| Value | Typical use |
|---|---|
| 6 | Nav pill inner padding, gap between nav links |
| 8 | Chip gaps, field label → input, inner card padding (play card) |
| 10 | Logo radius, button icon gap, split-cell gap |
| 12 | Brand logo → wordmark, button pair gap, tab stack gap |
| 14 | Tab number → title, bar spacing |
| 16 | Field spacing, small card offsets |
| 20 | Grid gap (tiles, games, panels), card padding (floating cards), label → H2 |
| 22 | Header right-side gap |
| 24 | Grid gap in panels, icon → text in panels, window inset |
| 26–28 | Tab padding |
| 32 | Tile body padding |
| 40 | Lead tile padding, panel padding, showcase gap, lede → buttons |
| 48 | Footer column gap, gutter, industry row gap |
| 56 | Proof row top, stage image inset |
| 64 | Hero top, window top, note row |
| 72 | Section header → content, footer top |
| 88 / 96 | Mobile section padding / tight section top |
| 120 | Closing panel padding (top and bottom) |
| 144 | Section padding |

### 4.4 Grid patterns

| Pattern | Columns | Gap | Mobile | Source |
|---|---|---|---|---|
| Tab showcase | `420px 1fr` | 40 | 1 column, stage `min-height: 340px` | `.show` |
| Product tiles | `1.25fr 1fr` (`1fr 1fr` on Home), lead spans 2 rows, Potentia spans all | 20 | 1 column | `.prods` |
| Game tiles | `1fr 0.6fr 1fr`, four tiles as a mirrored 2×2 (wide + narrow, then narrow + wide; F31) | 20 | 1 column | `.games` (mockup: three tiles at `1.6fr 1fr 1fr`) |
| Panels (Why DEUS, 2×2) | `1fr 1fr` | 20 | 1 column | `.why` |
| Copy + stats | `1fr 1fr` | 64 | 1 column | `.gba .note` |
| Footer | `1.6fr 1fr 1fr 1fr` | 48 | `1fr 1fr` | `footer .cols` |
| Styleguide sheet | `repeat(6, 1fr)` with spans 6 / 4 / 3 / 2 | 20 | 1 column | `.g-grid` |
| 3×2 values (The 6 I's) | `repeat(3, 1fr)` | 32 row / 40 column | 1 column (2 columns 600–900px) | Plain list since R17 (F90) |
| Article column (stories, privacy) | single column, `max-width: 720px`, centered | | full width | Extrapolated |
| Scroll-synced steps | `420px 1fr` (same as the showcase) | 40 | inline | Extrapolated from `.show` |

### 4.5 Alignment

- **Centered:** the hero (headline, lede, buttons), section headers (label → H2 → lede), the proof row, the closing panel, the 404 panel, and the window caption.
- **Left-aligned:** everything inside cards, tiles, tabs, panels, tables, forms, footers and articles. Body copy longer than three lines is never centered.
- A centered header always sits over a grid or a centered element. Don't center a header above a single left-aligned paragraph; use a left-aligned header there (article pages).

---

## 5. Radius and elevation

### 5.1 Radius

Radii step up with size. Small parts get small radii, large panels get large ones, and anything that acts like a button or a tag is a pill.

| Token | px | Use | Source |
|---|---|---|---|
| `--r-xs` | 10 | Logo tile | `.brand img` |
| `--r-sm` | 12 | Split cells and the bonus row inside cards, side-tile screenshots, icon tiles in menus | `.jc .split div`, `.jc .bonus`, `.p.side .thumb img` |
| `--r-field` | 14 | Inputs, selects, textareas; lead-tile screenshot | `.field .in`, `.p.lead .thumb img` |
| `--r-md` | 16 | Stat tiles, icon tiles (56px), event log, stage screenshot, Potentia images | `--r-md` |
| `--r-float-sm` | 20 | Small floating result card, mobile contact bar | `.stage .res` |
| `--r-float` | 22 | Journey cards in the sky window | `.jc` |
| `--r-lg` | 24 | Tiles, tabs, panels, game tiles, styleguide cards | `--r-lg` |
| `--r-xl` | 36 | Sky window (top corners only), stage, closing panel | `--r-xl` |
| `--pill` | 999 | Buttons, nav, chips, tags, contact bar, bars | `--pill` |
| circle | 50% | Timeline nodes, tab number circles, the recording dot | |

Data bars use a 9px radius on a 6px bar (fully round ends). An image inside a padded card takes the card radius minus the padding (the play card: 22 − 8 = 14, the mockup uses 15).

The sky window has rounded **top corners only** (`36px 36px 0 0`), because its bottom fades into the page.

### 5.2 Elevation

Daylight is mostly flat: hairline borders separate things that sit on the page, and shadows mean "this floats above it".

| Token | Value | Use |
|---|---|---|
| none + `1px solid var(--line)` | | Resting tiles, panels, stat tiles, game tiles' border, stage, tables |
| `--shadow` (soft) | `0 1px 2px rgba(16,27,61,.05), 0 12px 32px -12px rgba(16,27,61,.16)` | Secondary button, active tab, game tiles, side-tile screenshots |
| `--shadow-lg` (float) | `0 2px 4px rgba(16,27,61,.04), 0 40px 80px -32px rgba(16,27,61,.28)` | Floating UI cards, floating screenshots, tile hover, event log, mega menu (extrapolated) |
| `--shadow-btn` | `0 8px 20px -8px rgba(16,27,61,.5)` | Primary button |
| `--shadow-warm` | `0 30px 60px -28px rgba(120,60,20,.45)` | Images on the Potentia band |
| Ember halo | `0 0 0 6px rgba(255,107,61,.22)` | The "now" node |
| Focus ring (fields) | `0 0 0 4px rgba(37,99,235,.14)` | Focused input |
| Focus outline (everything else) | `outline: 2px solid var(--azure); outline-offset: 3px` | `:focus-visible` |

**Frosted surfaces** use translucent white and a blur, only over the sky or over the page while scrolling:

| Surface | Background | Blur |
|---|---|---|
| Nav pill | `rgba(255,255,255,.7)` + `1px solid var(--line)` | 12px |
| Journey card | `rgba(255,255,255,.9)` + `1px solid rgba(255,255,255,.95)` | 16px |
| Event log | `rgba(255,255,255,.92)` | 14px |
| Contact bar | `rgba(255,255,255,.7)` | 10px |
| Header once scrolled (extrapolated) | `rgba(255,255,255,.72)` + bottom hairline | 16px |

---

## 6. Surfaces and atmosphere

Four surfaces. **There is no dark surface**, no dark-mode toggle, and no navy section anywhere.

| Surface | Background | Where | Notes |
|---|---|---|---|
| **White** | `#FFFFFF` | Default for every section | |
| **Cloud** | `var(--cloud)` | Alternate sections (the product tiles on Home), panels on white sections | Never two Cloud sections in a row |
| **Sky** | The sky window or closing-panel gradient (§2.2) | The hero window, the closing panel, the 404 panel. Nowhere else | The only atmosphere. Always inside a rounded panel in the 1320px frame, never full-bleed |
| **Warm** | The Potentia gradient (§2.3) | The Potentia tile or band. Nowhere else | Labelled as being for parents and schools, in Bahasa Indonesia |

Two softer tints support these. They are **not** atmosphere:

| Tint | Value | Where |
|---|---|---|
| Sky wash | `linear-gradient(180deg, #fff, var(--sky-1) 55%, #fff)` | One section per page at most. Its white edges let it sit between two White sections |
| Sky tiles | Stage tile and thumbnail tile gradients | Behind floating product screens (§8) |

### 6.1 Page order

- Start with the hero (White, with the hero glow and the sky window).
- Alternate White and Cloud. When two neighbouring sections share a background (a White section after the sky wash, for example), give the second one the tight 96px top padding.
- End with the closing panel on White (`padding: 0 24px 24px` around it), then the footer on White.
- Home example (since R14a, D1, which cut the three product spotlights): Hero + window (White) → Proof → Why DEUS exists (Cloud) → Where we help (White) → Solutions (Cloud) → Why DEUS (White) → Closing panel → Footer. Home has no sky-wash section now.

### 6.2 Hero glow

The hero section has one radial glow behind the header and headline (`.hero::before`, §2.2), clipped by `overflow: hidden`. It is the only glow on the site. Don't add glows to other sections, cards or buttons.

---

## 7. Components

Every component lists its anatomy, states and CSS. **Source** gives the mockup selector; **extrapolated** means the mockup doesn't show it. Component names match `WEBSITE-PLAN.md` §10.3.

Shared rules for every interactive element:

```css
:focus-visible { outline: 2px solid var(--azure); outline-offset: 3px; }   /* mockup */
@media (prefers-reduced-motion: reduce) { * { transition: none !important; } }  /* mockup; §9.4 extends it */
```

Touch targets are at least 44×44px. Every hover has a matching `:focus-visible` style.

---

### 7.1 Header with pill nav

**Source:** `.header`, `.brand`, `.nav`, `.header .right` · **Extrapolated:** sticky and scrolled states, hover, mobile menu button.

**Anatomy (desktop):** three flex zones in the 1320px frame, 84px tall.
- **Left (`flex:1`):** logo tile (36×36, radius 10) + "DEUS" wordmark (19/700, −0.02em), gap 12. Links to Home.
- **Center:** the nav pill. Solutions · Clients · Science · About (this order, which the owner chose).
- **Right (`flex:1`, right-aligned, gap 22, 15/500):** language switch `EN / ID` · Contact (text link, ink) · primary small button "Request a demo". On Enhance the button reads "Book a 30-minute call"; on assessment pages, "Request a free trial".

```css
.header { position: sticky; top: 0; z-index: 50; height: 84px; transition: background .2s, box-shadow .2s; }  /* sticky: extrapolated */
.header .wrap { max-width: 1320px; height: 100%; display: flex; align-items: center; }
.brand { display: flex; align-items: center; gap: 12px; flex: 1; }
.brand img { width: 36px; height: 36px; border-radius: 10px; }
.brand b { font-size: 19px; font-weight: 700; letter-spacing: -.02em; }
.nav { display: flex; gap: 6px; padding: 6px; border-radius: 999px; background: rgba(255,255,255,.7);
       border: 1px solid var(--line); font-size: 15px; font-weight: 500; backdrop-filter: blur(12px); }
.nav a { padding: 8px 18px; border-radius: 999px; color: var(--ink-2); }
.nav a.on, .nav a[aria-current] { background: var(--ink); color: #fff; }
.nav a:not(.on):hover { background: rgba(16,27,61,.06); color: var(--ink); }           /* extrapolated */
.header .right { flex: 1; display: flex; justify-content: flex-end; align-items: center; gap: 22px; font-size: 15px; font-weight: 500; }

/* scrolled (extrapolated, WEBSITE-PLAN §4.2): add .is-scrolled once scrollY > 8 */
.header.is-scrolled { background: rgba(255,255,255,.72); backdrop-filter: blur(16px) saturate(140%);
                      box-shadow: 0 1px 0 var(--line); }
```

| State | Look |
|---|---|
| Over the hero | Transparent; the hero glow shows through |
| Scrolled | 72% white, blur, bottom hairline |
| Active page | Its nav link filled ink, white text (`aria-current="page"`). On product pages, "Solutions" is active |
| Link hover | 6% ink tint, text to ink (extrapolated) |
| Solutions open | Chevron rotates 180°; the pill keeps the active fill if the visitor is in Solutions |

**Breakpoints:** below 1100px, hide the Contact text link (extrapolated; the header gets crowded). At 900px and below, hide the nav pill, language switch and Contact link (mockup), and show the menu button next to the CTA.

---

### 7.2 Mega menu (Solutions) · extrapolated

**Anatomy:** the "Solutions" nav item is a `<button aria-expanded>` with the label and a 14px `ChevronDown`. It opens a panel centered under the nav pill, 8px below the header.

- **Panel:** white, radius 24, `1px solid var(--line)`, `--shadow-lg`, `width: min(760px, 100vw - 48px)`, padding 12.
- **Stacked rows, no group headings** (F1, F10; layout from the owner's pick, 2026-10-22), so neither side runs long:
  - **Row 1:** Game-Based Assessment across the full width, its four modules below in a 2×2 grid, each behind a 2px `--sky-2` left rule.
  - **Row 2:** two equal tiles side by side: DEUS Enhance, then the Potentia card.
  - Item: a link block, padding `14px 16px`, radius 16. Title 15/700 ink (16/700 for a product); description 14/400 slate, line-height 1.45, `text-wrap: pretty`. Hover and focus: `background: var(--cloud)`.
  - **Potentia item:** warm card (`--warm-1` background, `--warm-line` border, radius 16). Title "Potentia by DEUS" with a 15px `ArrowUpRight` icon; description in `--warm-text`; a note "Opens deuspotentia.com (in Indonesian)". `target="_blank" rel="noopener"`.
- **Footer strip:** `background: var(--cloud)`, radius 16, padding `14px 16px`, margin-top 8: a link "All solutions" with an arrow → `/solutions`.

**Behavior:** opens on click, Enter or Space, and on hover after a 120ms intent delay; closes on Esc (focus returns to the trigger), on outside click and when the pointer leaves for 200ms. Arrow keys move between items. Animation: fade plus 8px rise over .2s (`--ease-out`); none with reduced motion. Use shadcn/Radix `NavigationMenu`, restyled.

---

### 7.3 Mobile menu · extrapolated

**Trigger (≤900px):** a 42px round secondary button (white, `--line` border, `--shadow`) with a 20px `Menu` icon, right of the CTA. Accessible name "Open menu".

**Sheet:** full height, from the top, white, `z-index: 70`, padding `0 var(--gutter) 32px`, scrolls inside.
1. Top row, 84px, matching the header: logo + wordmark, and a 42px round `X` button ("Close menu").
2. The three Solutions groups. Group headings 14/700 slate; items 17/600 ink, padding 14px 0, `border-bottom: 1px solid var(--line)`. Potentia keeps its ↗ icon.
3. Clients · Science · About · Contact as items in the same style.
4. Language switch as a segmented pill (two options, active filled ink), 44px tall.
5. Two secondary buttons, full width, stacked with a 12px gap: "Chat on WhatsApp" and "Email us".

**Behavior:** locks body scroll, traps focus, closes on Esc, on route change and with the X button. Fade plus 12px drop over .2s. Use shadcn `Sheet` (`side="top"`), restyled.

---

### 7.4 Language switch

**Source:** `.lang` · **Extrapolated:** link behavior, states, the mobile segmented version.

```html
<nav class="lang" aria-label="Language">
  <a href="/en/…" hreflang="en" lang="en" aria-current="true">EN</a>
  <span aria-hidden="true"> / </span>
  <a href="/id/…" hreflang="id" lang="id">ID</a>
</nav>
```
```css
.lang { font-size: 15px; font-weight: 500; color: var(--slate-2); }       /* slate-2 is for the "/" only */
.lang a { color: var(--slate); }                                          /* mockup: slate-2; moved to slate for contrast */
.lang a[aria-current] { color: var(--ink); font-weight: 700; }
.lang a:hover { color: var(--ink); }
```
- Fixed order **EN / ID** on both locales, as in the mockup. The current language is ink and bold.
- Switching keeps the visitor on the same page in the other language and fires `language_switch`.
- Accessible names: "English" and "Bahasa Indonesia" (`aria-label`).

---

### 7.5 Buttons

**Source:** `.btn`, `.btn-primary`, `.btn-secondary`, `.btn-sm` · **Extrapolated:** secondary hover, pressed, disabled, loading, icon-only.

```css
.btn { display: inline-flex; align-items: center; gap: 10px; height: 52px; padding: 0 26px; border-radius: 999px;
       font: 600 16px/1 var(--font); border: 1px solid transparent; white-space: nowrap;
       transition: background .15s, box-shadow .15s, border-color .15s, transform .15s; }
.btn svg { width: 17px; height: 17px; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
.btn-primary { background: var(--ink); color: #fff; box-shadow: 0 8px 20px -8px rgba(16,27,61,.5); }
.btn-primary:hover { background: var(--ink-2); }
.btn-secondary { background: #fff; color: var(--ink); border-color: var(--line); box-shadow: var(--shadow); }
.btn-secondary:hover { border-color: #D3D9E5; box-shadow: var(--shadow-lg); }       /* extrapolated */
.btn:active { transform: translateY(1px); }                                          /* extrapolated */
.btn-sm { height: 42px; padding: 0 20px; font-size: 15px; }
.btn-icon { width: 42px; height: 42px; padding: 0; justify-content: center; }        /* extrapolated */
.btn[disabled], .btn[aria-disabled="true"] { background: var(--line); color: var(--slate-2); border-color: transparent;
                                             box-shadow: none; cursor: not-allowed; }  /* extrapolated */
.btn[aria-busy="true"] { cursor: progress; }  /* shows a 17px spinner in place of the icon, label "Sending…" */
```

| Variant | Use |
|---|---|
| **Primary** (ink pill) | The one main action in a view: Request a demo, Request a free trial, Book a 30-minute call, Send message |
| **Secondary** (white pill) | The second action: Explore our solutions, Chat on WhatsApp |
| **Small** (42px) | The header CTA, the footer contact chips |
| **Icon-only** (42px round, secondary style) | Menu, close. Always with an accessible name |

- Pairs sit side by side with a 12px gap, primary first. At 900px and below they stack, centered, at their natural width (mockup).
- At most one primary button per view. Ember is never a button color.
- Icons: `ArrowRight` for internal next steps, `ArrowUpRight` for external links (deuspotentia.com), `ArrowDown` for in-page jumps ("See how it works"). Use them on text links mostly; buttons usually have no icon.
- The secondary button stays white on the sky and closing panels.

---

### 7.6 Links

**Source:** `.link`.

```css
.link { color: var(--azure-ink); font-weight: 600; display: inline-flex; align-items: center; gap: 8px; }
.link svg { width: 17px; height: 17px; transition: transform .15s; }
.link:hover svg { transform: translateX(3px); }                                    /* extrapolated */
.link:hover .link-text { text-decoration: underline; text-underline-offset: 3px; } /* extrapolated */
.prose a { color: var(--azure-ink); text-decoration: underline; text-underline-offset: 3px; text-decoration-thickness: 1px; }  /* extrapolated */
```
- **Standalone links** ("See DEUS Enhance →", "Read the Telkom story →") are azure-ink, 600, with an arrow and no underline at rest.
- **Inline links in body copy** are underlined, since color alone isn't enough to mark them.
- **External links** use `ArrowUpRight` and open in a new tab. Links to deuspotentia.com add `?utm_source=deushcs.com&utm_medium=referral`.
- On the warm band, links use `--warm-link`.

---

### 7.7 Section label, tags and chips

**Source:** `.p.lead .pts span`, `.chips span`. The section label replaced the mockup's `.s-head .label` pill on 2026-10-16 (feedback F4, option B in `postpushrevisions1.1/label-style-mockup-2.html`).

```css
/* Section label: small capitals between two short azure lines, above a section heading.
   No fill, so it is the same on White, Cloud and sky. Component: SectionLabel (src/components/ui/pills.tsx). */
.label { display: inline-block; max-width: 100%; font-size: 13px; line-height: 1.4; font-weight: 700;
         letter-spacing: .12em; text-transform: uppercase; color: var(--azure-ink); text-wrap: balance; margin-bottom: 20px; }
.label::before, .label::after { content: ""; padding-left: 32px; opacity: .55;
         background: linear-gradient(var(--azure), var(--azure)) no-repeat 0 55% / 32px 1.5px; }
.label::before { margin-right: 14px; }
.label::after  { margin-left: 14px; }
/* below 480px: 20px lines, 10px away */

/* Tag: a static attribute (features on the lead tile, product tags on story cards) */
.tag { font-size: 13.5px; font-weight: 600; padding: 7px 13px; border-radius: 999px; background: var(--sky-1); color: var(--azure-ink); }

/* Chip: interactive filter or choice */
.chip { font-size: 14px; font-weight: 600; padding: 8px 14px; border-radius: 999px; border: 1px solid var(--line);
        color: var(--ink-2); background: #fff; }
.chip:hover { border-color: var(--slate-2); }                                   /* extrapolated */
.chip[aria-pressed="true"], .chip[aria-checked="true"] { background: var(--ink); color: #fff; border-color: var(--ink); }
```
- **Section label:** written in sentence case exactly as `Eyebrow:` in the content files ("Where we help", "Our solutions"); CSS sets the capitals, so screen readers and copy-paste get the sentence-case text. One per section header, and optional in heroes (the Home mockup has none). It follows its header's alignment: centred over grids, left-aligned in articles. The lines are painted on empty inline boxes (not inline-blocks), so a label that wraps on a phone keeps the first line before its first word and the last line after its last word, and never leaves a line alone on a row. Never an orange dash, never a pill fill.
- **Tag** is information; **chip** is a control. Don't make tags look clickable.
- **A list of short items** (the Simulation module's "What it assesses") is not a row of tags: it is a two-column list with thin dividers (F25). Hairlines (`--line`) above the first row and under every row, running the full width, the columns split by 24px padding rather than a gap; items 17/600 ink-2, 16px top and bottom; at most 760px wide and centred under its small title; one column below 600px.
- Filter chips (client stories, once there are more than about four) wrap with an 8px gap.

---

### 7.8 Section header

**Source:** `.s-head`.

```css
.s-head { text-align: center; max-width: 780px; margin: 0 auto 72px; }
.s-head h2 { font-size: var(--text-h2); line-height: 1.08; font-weight: 600; letter-spacing: -.038em; text-wrap: balance; }
.s-head p { font-size: 19px; color: var(--slate); margin-top: 20px; }
```
Section label → H2 → optional lede (one or two sentences). Centered. 72px to the content (48px on mobile).

**Sub-line (extrapolated, F64–F67):** where the H2 is a product's name (the four GBA modules), a smaller line follows it 12px below: 24px (`text-h3`) at weight 600, ink-2, balanced. Then the lede as usual, 20px below. Only for a name-as-title; an ordinary section says it all in its H2.

---

### 7.9 Form controls

**Source:** `.field`, `.field .in`, `.in.focus`, `.in.err`, `.msg` (the guide sheet) · **Extrapolated:** hover, select, textarea, checkbox, choice chips, hint, optional marker, disabled, loading, success, form-level error, and the 3:1 border.

Labels and messages come from `content/en/global.md` (Contact form).

**Anatomy:** label (14/600 ink, 8px below) → control → hint or error (13px, 7px above). 16px between fields; 24px between groups. Two fields can share a row on desktop (Full name + Work email); one per row on mobile.

```css
.field label { display: block; font-size: 14px; font-weight: 600; margin-bottom: 8px; }
.field label .opt { font-weight: 500; color: var(--slate); }     /* "(optional)", extrapolated */
.input, .select, .textarea {
  width: 100%; height: 50px; border-radius: 14px; background: var(--cloud);
  border: 1px solid var(--field-border);     /* mockup: var(--line); see §2.6 */
  padding: 0 16px; font: 400 16px/1.4 var(--font); color: var(--ink);   /* mockup 15px; 16px stops iOS zooming on focus */
  transition: background .15s, border-color .15s, box-shadow .15s; }
.input::placeholder { color: var(--slate-2); }
.input:hover { border-color: var(--slate); }                                         /* extrapolated */
.input:focus { outline: none; background: #fff; border-color: var(--azure); box-shadow: 0 0 0 4px rgba(37,99,235,.14); }
.input[aria-invalid="true"] { background: #fff; border-color: #C42B2B; }
.input[aria-invalid="true"]:focus { box-shadow: 0 0 0 4px rgba(196,43,43,.14); }     /* extrapolated */
.input:disabled { background: var(--cloud); border-color: var(--line); color: var(--slate-2); cursor: not-allowed; }  /* extrapolated */
.textarea { height: auto; min-height: 140px; padding: 14px 16px; resize: vertical; line-height: 1.55; }   /* extrapolated */
.select { appearance: none; padding-right: 48px; background-image: url(chevron-down.svg); background-repeat: no-repeat;
          background-position: right 16px center; background-size: 18px; }                               /* extrapolated */
.hint { font-size: 13px; color: var(--slate); margin-top: 7px; }                                          /* extrapolated */
.msg  { font-size: 13px; color: #B02525; margin-top: 7px; }
```

**Checkbox (consent)** · extrapolated: a 22px box, radius 6, white, `1.5px solid var(--field-border)`. Checked: ink fill with a white 14px `Check` (stroke 3). Focus: the standard outline. The label is 15/400 slate beside it, gap 12, and the privacy link inside it is an inline link. The whole row is clickable.

**Choice (product interest, company size)** · extrapolated: a radio group drawn as chips (§7.7), `role="radiogroup"`, with the selected chip ink. On mobile they wrap. Use a native `<select>` instead when there are more than six options.

| State | Look | Copy (from `global.md`) |
|---|---|---|
| Rest | Cloud fill, 3:1 border | |
| Hover | Border to slate | |
| Focus | White fill, azure border, 4px azure ring | |
| Filled | Cloud fill, ink text | |
| Error | White fill, `#C42B2B` border, message below in `#B02525`, `aria-invalid` + `aria-describedby` | "Please tell us your company's name." etc. |
| Disabled | Cloud fill, `--line` border, slate-2 text | |
| Loading (form) | Fields `readonly`, primary button `aria-busy` with spinner | "Sending…" |
| Form-level error | Panel above the button: `--error-wash` fill, radius 16, padding `16px 20px`, 15px `#B02525` text, a 18px `AlertCircle` | "Something went wrong on our side…" |
| Success | Replaces the form (§ below) | "Thank you. We've got your message." |

**Validation:** check on blur and on submit, never on each keystroke. On submit, move focus to the first invalid field. Errors appear under their fields, not in a list at the top.

**Success panel** · extrapolated: white, radius 24, `1px solid var(--line)`, padding 40, centered. A 48px sky-1 circle holding a 24px azure `Check` → H3 (24/700) "Thank you. We've got your message." → body slate → a link "Chat with us on WhatsApp". Focus moves to the heading (`tabindex="-1"`). No ember: a sent form isn't "now", and no green either (there's no green in the palette).

---

### 7.10 Tabs: the "Where we help" showcase

**Source:** `.show`, `.tabs`, `.tab`, `.tab.on`, `.tab .progress`, `.stage`, `.stage .res` · **Extrapolated:** ARIA, keyboard, autoplay timing, mobile behavior.

**Anatomy (desktop):** two columns, `420px 1fr`, gap 40.
- **Left, the tab list:** three stacked tabs, gap 12. Each tab has a 32px number circle (`1`, `2`, `3`, 14/700) and a title (20/700, −0.02em).
  - **Active tab:** a white card (radius 24, `--line` border, `--shadow`), padding `26px 28px`. The circle turns ink with white text. The tab shows its description (16px slate, indented 46px), its product line (14/600 azure-ink, "DEUS Discover and Next Chapter") and the **ember progress bar** (3px, on a `--line` track, indented 46px, 18px above).
  - **Inactive tabs:** transparent, title in slate, cloud circle with a slate number. Title only.
- **Right, the stage:** a sky tile (`linear-gradient(160deg, var(--sky-1), #fff 70%)`, radius 36, `--line` border, `min-height: 520px`, `overflow: hidden`). A screenshot floats at `left: 56px; top: 56px; width: 620px` (radius 16, `--shadow-lg`) and bleeds off the right edge. A result card (§7.13) overlaps the bottom right at `right: 40px; bottom: 40px; width: 280px`.

```css
.show { display: grid; grid-template-columns: 420px 1fr; gap: 40px; align-items: stretch; }
.tabs { display: flex; flex-direction: column; gap: 12px; }
.tab { padding: 26px 28px; border-radius: 24px; border: 1px solid transparent; text-align: left; }
.tab .h { display: flex; align-items: center; gap: 14px; font-size: 20px; font-weight: 700; letter-spacing: -.02em; }
.tab .h i { font-style: normal; width: 32px; height: 32px; border-radius: 50%; display: grid; place-items: center;
            font-size: 14px; font-weight: 700; background: var(--cloud); color: var(--slate); }
.tab p { margin-top: 12px; color: var(--slate); font-size: 16px; padding-left: 46px; }
.tab .prod { margin-top: 14px; padding-left: 46px; font-size: 14px; font-weight: 600; color: var(--azure-ink); }
.tab[aria-selected="true"] { background: #fff; border-color: var(--line); box-shadow: var(--shadow); }
.tab[aria-selected="true"] .h i { background: var(--ink); color: #fff; }
.tab:not([aria-selected="true"]) .h { color: var(--slate); }
.tab:not([aria-selected="true"]):hover .h { color: var(--ink); }                     /* extrapolated */
.tab .progress { height: 3px; border-radius: 9px; background: var(--line); margin: 18px 0 0 46px; overflow: hidden; }
.tab .progress i { display: block; height: 100%; background: var(--ember); border-radius: 9px;
                   transform-origin: left; animation: tab-progress var(--tab-dwell) linear forwards; }
@keyframes tab-progress { from { transform: scaleX(0); } to { transform: scaleX(1); } }
.stage { border-radius: 36px; background: linear-gradient(160deg, var(--sky-1), #fff 70%); border: 1px solid var(--line);
         position: relative; overflow: hidden; min-height: 520px; }
.stage img { position: absolute; left: 56px; top: 56px; width: 620px; border-radius: 16px; box-shadow: var(--shadow-lg); }
```

**Behavior (extrapolated):**
- `role="tablist"` with `aria-orientation="vertical"`; each tab is a `<button role="tab">`; the stage is the `tabpanel`. Up and Down arrows move between tabs; Home and End jump to the ends.
- **Autoplay:** the progress bar fills over `--tab-dwell` (3.5s), then the next tab activates and the stage crossfades (.4s). Autoplay pauses on hover and focus, stops for good after the visitor picks a tab, and runs only while the showcase is on screen. With reduced motion there's no autoplay and the bar shows full.
- The tab button holds only text (number, title, description, product line). Put any links in the stage, not in the tab.
- **Enhance "The solution"** (R16b, F74, F75, 2026-10-22) uses the same showcase with **six** tabs (KPI framework → … → "Turn results into decisions", whose stage is the Bonus Dashboard) and no result card. It sets `openWithoutScript`: in the server HTML, and so without JavaScript, every tab shows its description (the active one still alone in the white card with the bar), and the list collapses to the active description once the script runs. Home keeps the description of the active tab only.

**Mobile (≤900px):** one column; the tab list, then the stage (`min-height: 340px`, screenshot at `left: 20px; top: 20px; width: 90%`, result card at `right: 16px; bottom: 16px; width: 220px`).

#### Segmented tabs (Reports on GBA, persona switcher on Enhance) · extrapolated

For short switchers, use the nav-pill shape: a pill container (`rgba(255,255,255,.7)` on white, `#fff` on cloud; `--line` border; padding 6; gap 6), triggers 15/500 ink-2 with padding `8px 18px`, and the active trigger filled ink with white text. The selected state is ink, never ember. Center it under the section header, 40px above the panel. On mobile it scrolls sideways (`overflow-x: auto; scroll-snap-type: x mandatory`) with no visible scrollbar, and the active tab scrolls into view.

**Linked tabs (F70):** GBA's "Behind the results" (Platform · Science · Before and after) gives each tab an anchor (`#platform`, `#science`, `#impact`). Arriving with one, or a hash change to one, opens that tab and scrolls the pill to just under the header (12px of air). Each tab keeps its former section's title as a centred H3 (`text-h3-panel`) with its lede under it, 40–48px above the content.

#### Module tabs (the four modules on GBA, F40) · extrapolated

The same pill, used as tabs for the four module sections, so one module shows at a time. It sits under the "All your talent assessments on one platform." header and sticks just under the header (12px of air) while the module is on screen, then lets go. All four modules sit on White; each is a full section (eyebrow "Module n of 4", the module's name as the title with a sub-line under it, §7.8, then the lede) with its own `#id`, and links to that id open its tab and scroll its label just under the pill. A switch from deep inside a module scrolls up to the new module's label; a switch near the top leaves the page still. Each module but the last ends with a centred standalone text link to the next ("Next module: Cognitive →"). Every module stays in the HTML; the inactive ones are hidden.

**Next arrow (F68):** a 55px circle right of the pill, 8px away (the pair is centred), in the pill's glass (70% white, blur, hairline) with an 18px ink arrow; hover turns the border azure and the arrow azure-ink. It opens the next module, Simulation wrapping to Personality, and is named like the link ("Next module: Cognitive"). It is a button outside the tab list, after it in tab order. On a touch screen a one-finger sideways swipe (50px or more, mostly sideways) on the module does the same: left for the next, right for the one before; a swipe that starts on a row that scrolls sideways (the phone's games) scrolls that row instead.

---

### 7.11 Product tiles

**Source:** `.prods`, `.p`, `.p.lead`, `.p.side`, `.p.potentia`.

**Layout:** `grid-template-columns: 1.25fr 1fr`, gap 20. On Home (since R14a, F50) the three products are cards of the same size in one row (`repeat(3, 1fr)`, `ProductGrid thirds`), so all three are in view together at 1280×800 once the section heading reaches the top: Game-Based Assessment and Enhance as side tiles, then Potentia **stacked** (`ProductTile stacked`: the warm skin with a side tile's padding, 24px title and a 170px art strip, 200px below 901px, in place of the full-width row). One column below 901px. A group with a single product uses the wide tile (copy left, screenshot right). The whole tile is one link.

```css
.p { border-radius: 24px; background: #fff; border: 1px solid var(--line); overflow: hidden; display: flex;
     transition: box-shadow .2s, transform .2s; }
.p:hover, .p:focus-visible { box-shadow: var(--shadow-lg); transform: translateY(-4px); }
.p .body { padding: 32px; display: flex; flex-direction: column; }
.p h3 { font-size: 24px; font-weight: 700; letter-spacing: -.025em; }
.p small { font-size: 14px; color: var(--slate); font-weight: 500; }   /* the subtitle, e.g. "Performance and reward" */
.p p { font-size: 15.5px; color: var(--slate); margin-top: 12px; }
.p .link { margin-top: 20px; font-size: 15px; }
.p .thumb { position: relative; overflow: hidden; background: linear-gradient(180deg, var(--sky-2), var(--sky-1)); }

/* lead (Enhance) */
.p.lead { grid-row: span 2; flex-direction: column; }
.p.lead .body { padding: 40px 40px 32px; }
.p.lead h3 { font-size: 34px; letter-spacing: -.035em; }
.p.lead p { font-size: 17px; max-width: 30em; }
.p.lead .pts { display: flex; gap: 8px; flex-wrap: wrap; margin-top: 20px; }   /* tags */
.p.lead .thumb { flex: 1; min-height: 380px; }
.p.lead .thumb img { position: absolute; left: 40px; top: 40px; width: 680px; max-width: none; border-radius: 14px; box-shadow: var(--shadow-lg); }

/* side (Discover, Next Chapter) */
.p.side { flex-direction: column; }
.p.side .body { padding: 30px 32px 26px; }
.p.side .thumb { height: 170px; margin-top: auto; }
.p.side .thumb img { position: absolute; left: 32px; right: 32px; top: 26px; width: calc(100% - 64px); height: 240px;
                     object-fit: cover; object-position: top; border-radius: 12px; box-shadow: var(--shadow); }

/* Potentia (warm, full width) */
.p.potentia { grid-column: 1 / -1; background: linear-gradient(100deg, #FFF6EC, #FFE6D2); border-color: #FBE0C8;
              flex-direction: row; align-items: center; }
.p.potentia .body { flex: 1; padding: 44px 48px; }
.p.potentia h3 { font-size: 30px; }
.p.potentia .chip-lang { font-size: 13px; font-weight: 600; color: #9A4A1E; background: rgba(255,255,255,.7);
                         padding: 5px 11px; border-radius: 999px; align-self: flex-start; margin-bottom: 16px; }
.p.potentia p { color: #6B5446; max-width: 34em; }
.p.potentia .link { color: #B23F18; }
.p.potentia .art { flex: 0 0 520px; height: 260px; position: relative; overflow: hidden; align-self: stretch; }
.p.potentia .art img { position: absolute; border-radius: 16px; box-shadow: 0 30px 60px -28px rgba(120,60,20,.45); }
.p.potentia .art .ph { width: 150px; left: 60px; top: 40px; }                       /* phone */
.p.potentia .art .rp { width: 300px; left: 236px; top: 56px; height: 300px; object-fit: cover; object-position: top; } /* report */
```

| Tile | Anatomy |
|---|---|
| **Lead** | H3 (product name) → subtitle → description → 3 tags → link → a large sky thumbnail with a screenshot bleeding off the bottom right |
| **Side** | H3 → subtitle → description → link → a short sky thumbnail with the top of a screenshot |
| **Potentia** | Language chip ("For parents and schools, in Bahasa Indonesia") → H3 → description → external link ("Visit Potentia ↗") → art: phone image plus report image, overlapping |

**States:** rest is flat with a hairline. Hover and focus lift the tile 4px and add `--shadow-lg`; the image doesn't move. With reduced motion, only the shadow changes. The Potentia tile is the same component with the warm skin; it's the only external tile, so it opens in a new tab.

**Mobile:** one column; the lead stops spanning; lead image `width: 560px; left: 24px; top: 24px`; side thumbs `flex: 0 0 200px`; Potentia stacks (body padding 28, art `flex: 0 0 260px`).

**Reused on other pages** (extrapolated): the Solutions overview uses lead and side tiles for its three groups, and client-story cards use the side tile (§7.21).

---

### 7.12 Journey timeline (the hero window)

**Source:** `.window`, `.sky`, `.track`, `.node`, `.node.now`, `.when`, `.jc` · **Extrapolated:** the mobile date row, motion (§9.2), the About-page variant.

This is the brand's signature moment: **one person's story**, assessed in DEUS Discover → hired → appraised in DEUS Enhance, bonus approved.

**Anatomy (desktop):** a 580px-tall sky window (rounded top corners, 36px) in the 1320px frame.
- **Caption:** "One person, from first game to first bonus", 15/600 ink, centered, 40px from the top.
- **Track:** a 2px line at `top: 104px`, from 16.6% to 83.4%, white at 85%. Its second half runs from white to ember (the ember track).
- **Nodes:** three 18px circles at 16.6%, 50% and 83.4%. Past nodes are white with a 2px ink border. The **last node is "now"**: ember fill, 2px white border, 6px ember halo.
- **Dates:** centered under each node at `top: 128px`, 14/500 ink-2, the date in 700 ink ("**March 2025**, assessed").
- **Cards:** three floating cards at `top: 170px`, 340px wide, centered on their nodes (§7.13).

```css
.window { margin: 64px auto 0; max-width: 1320px; padding: 0 24px; }
.sky { position: relative; height: 580px; border-radius: 36px 36px 0 0; overflow: hidden;
       background: linear-gradient(180deg, #8DBAF7 0%, #B6D3FB 38%, #E3EEFD 74%, #F7F9FC 100%); }
.sky::before { content: ""; position: absolute; inset: 0; background:
  radial-gradient(600px 300px at 18% 30%, rgba(255,255,255,.5), transparent 70%),
  radial-gradient(700px 320px at 84% 22%, rgba(255,255,255,.4), transparent 70%); }
.sky .cap { position: absolute; left: 0; right: 0; top: 40px; text-align: center; font-size: 15px; font-weight: 600; color: var(--ink); }
.track { position: absolute; left: 16.6%; right: 16.6%; top: 104px; height: 2px; background: rgba(255,255,255,.85); }
.track::after { content: ""; position: absolute; left: 50%; right: 0; top: 0; height: 2px;
                background: linear-gradient(90deg, rgba(255,255,255,.85), var(--ember)); }
.node { position: absolute; top: 96px; width: 18px; height: 18px; margin-left: -9px; border-radius: 50%;
        background: #fff; border: 2px solid var(--ink); z-index: 2; }
.node.now { background: var(--ember); border-color: #fff; box-shadow: 0 0 0 6px rgba(255,107,61,.22); }
.when { position: absolute; top: 128px; width: 340px; margin-left: -170px; text-align: center; font-size: 14px; color: var(--ink-2); font-weight: 500; }
.when b { font-weight: 700; color: var(--ink); }
```

**Semantics:** mark it up as an ordered list (`<ol aria-label="Example: one candidate from assessment to first bonus">`), one `<li>` per step holding its node, date and card. Nodes and track are decorative (`aria-hidden`). The "now" step gets visually hidden text: "Current step".

**Mobile (≤900px):** the window grows to fit (`height: auto; padding: 28px 18px 40px`) and becomes a column with a 14px gap. The caption is static; the track, nodes and dates are hidden; the cards stack at full width. **Recommended addition (extrapolated):** keep each date as a small row above its card (a 10px node + "**March 2025**, assessed", 14px ink-2), with the last node in ember, so the story keeps its timeline on phones.

**Other pages:**
- **Product heroes** (GBA, Enhance; F71, D10, 2026-10-22) are built to look unlike Home's, so a visitor knows which page they're on (`ProductHero.tsx`). Desktop: two columns, `5fr 7fr`, gap 56, vertically centred, in the 1320px frame. **Left, the copy, left-aligned:** the product name as the lead line (24/700, azure-ink; not a section label), the H1 at the **H2 size** (`text-h2`, 34–52px, smaller than Home's display headline), the lede at the small lede size, the Enhance chips, then the two buttons side by side. **Right, the picture:** a **sky panel**: the sky-window gradient and highlights in a fully rounded panel (radius 36, padding 40; 32×18 on a phone), not a window docked to the section's foot, holding the product's screens or cards. The section pulls up under the header (glow behind it, shifted towards the copy) and ends with the tight section padding. Mobile: one column, the copy still left-aligned, the panel under the buttons. GBA's panel: the cognitive game card across the top, the story card and the result card under it. Enhance's panel: the review-to-pay loop below.
- **Enhance's review-to-pay loop** (F72, `ReviewToPay.tsx`, `.review-to-pay` in `globals.css`): a caption ("From review to pay decision", 15/600 ink, centred), a 4:3 stage with one screen at a time (KPIs → appraisal → calibration → bonus), each a play-shape floating card sized to fit the stage whole (taller screens float narrower; a missing screen shows its placeholder at 16:10), and a step row of four under it: a 28px number circle (active ink with white text, others white with slate), the label (14/600; 13px on a phone, number above label) and a 3px track (white at 70%) whose **ember bar** fills while that step shows, as the Home tabs' bar does. Each step holds `--tab-dwell` (3.5s) with a .4s crossfade, then loops. CSS keyframes only; they rest paused on step 1, so without JavaScript the KPI step shows, and run while the panel is on screen. Hover or focus (the figure is one tab stop) pauses it. Reduced motion: step 4, the bonus screen, still, with its bar full.
- **Process timeline (About "Our journey", Enhance "Supported beyond the platform"), extrapolated; F77, F91, 2026-10-22:** the same track on a **White** surface, with **every node alike**: no ember end node, because one marked step reads as more important than the rest. Track `--line`; nodes 18px, filled azure with a 2px azure border. Below the fold, script empties them (white, 2px ink border), and when half the timeline (or half the screen) is in view they fill in one after another, `--dur-fill` (.35s) each, starting .2s in and each starting as the one before finishes, so it reads as a process (`SequenceOnView`, `data-sequence` in `globals.css`). Once only. Without JavaScript, with reduced motion, or already on screen at load, every node shows filled. Screen readers still hear About's newest year as the current step. About: years 20/700 ink, labels 15px slate, max 22ch, five nodes spaced evenly; Enhance: stage names lead, lines left-aligned. Mobile: a vertical rail (2px `--line` line at `left: 8px`), nodes on the rail, text indented 36px.

---

### 7.13 Floating UI cards

**Source:** `.jc` and its children · **Extrapolated:** reuse rules.

Real-looking product UI built in code, floating over the sky. Four variants share one shell.

```css
.jc { width: 340px; background: rgba(255,255,255,.9); backdrop-filter: blur(16px); border: 1px solid rgba(255,255,255,.95);
      border-radius: 22px; box-shadow: var(--shadow-lg); padding: 20px; }
.jc .k { font-size: 13px; color: var(--slate); font-weight: 500; }                    /* key: "Candidate profile" */
.jc .t { font-size: 17px; font-weight: 700; letter-spacing: -.015em; margin-top: 2px; }  /* title: the person */
```

| Variant | Anatomy | CSS (from the mockup) |
|---|---|---|
| **Play card** | 8px padding; a game screenshot (radius 15) → a row: "Plays DEUS Discover" (14/600) and "22 minutes" (13/500 slate) | `.jc.play{padding:8px}` `.jc.play img{border-radius:15px}` `.row{display:flex;justify-content:space-between;padding:12px 10px 6px;font-size:14px;font-weight:600}` |
| **Profile card** | Key → name → three trait rows (label 14/600, value slate tabular) each with a 6px bar → footer line above a hairline | `.tr{display:flex;justify-content:space-between;font-size:14px;font-weight:600;margin-top:14px}` `.bar{height:6px;background:var(--sky-1);border-radius:9px;margin-top:7px;overflow:hidden}` `.bar i{background:linear-gradient(90deg,var(--sky-3),var(--azure))}` `.foot{margin-top:16px;padding-top:14px;border-top:1px solid var(--line);font-size:13.5px;font-weight:600}` |
| **Appraisal card** | Key ("Q1 2026 appraisal, DEUS Enhance") → big score (52/600) with a rating tag (13.5/600 azure-ink on sky-1 pill) → two split cells (cloud, radius 12; label 12.5 slate, value 18/700 ink) → bonus row (ember-wash, radius 12; "Bonus band B" 14/600 ink and "Approved" 13px ember-ink) | `.big{display:flex;align-items:baseline;gap:12px;margin-top:10px}` `.big b{font-size:52px;font-weight:600;letter-spacing:-.04em;line-height:1}` `.split{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:18px}` `.split div{background:var(--cloud);border-radius:12px;padding:10px 12px}` `.bonus{margin-top:12px;display:flex;justify-content:space-between;background:#FFF3EE;border-radius:12px;padding:12px 14px}` |
| **Result card** (on a stage) | Key ("Numerical reasoning") → value (40/600) + unit (13px slate, "percentile, Indonesian norm") → 6px bar. Solid white, `--line` border, radius 20, padding `20px 22px`, 280px wide | `.stage .res` |

**Rules:**
- Bars are always the sky-3 → azure gradient on a sky-1 track. Width equals the value.
- Bars and numbers carry visually hidden text where the meaning isn't in the label (for example, "Rational: 94 out of 100").
- The only ember inside a card is the "Approved" text on its wash. No ember bars or ember numbers.
- Cards hold real-looking data, which is **illustrative** until approved sample data exists.
- On white or cloud surfaces (not over the sky), use solid white with a `--line` border instead of the frosted fill.

---

### 7.14 Event log

**Source:** `.game .log`.

A live recording of what a candidate does inside a game ("Recording this scene"), floating over the first game tile.

```css
.log { position: absolute; right: 16px; top: 16px; width: 290px; background: rgba(255,255,255,.92); backdrop-filter: blur(14px);
       border-radius: 16px; padding: 14px 16px 6px; box-shadow: var(--shadow-lg); }
.log .h { display: flex; align-items: center; gap: 8px; font-size: 13px; font-weight: 700; padding-bottom: 8px; border-bottom: 1px solid var(--line); }
.log .h i { width: 8px; height: 8px; border-radius: 50%; background: var(--ember); box-shadow: 0 0 0 4px rgba(255,107,61,.2); }  /* live dot */
.log ol { list-style: none; }
.log li { display: grid; grid-template-columns: 54px 1fr; gap: 8px; font-size: 13px; padding: 8px 0; border-bottom: 1px solid var(--line); }
.log li:last-child { border-bottom: 0; font-weight: 700; }                 /* the decision */
.log time { color: var(--slate); font-variant-numeric: tabular-nums; }      /* mockup: slate-2; moved to slate for contrast */
```
- Rows show a timestamp (`00:45.4`) and a plain-language action ("Hovers 'follow the schedule'"). The last row is the decision, in 700.
- The ember dot means "recording now". It may pulse slowly (§9.3).
- Hidden at 900px and below (mockup). On the GBA page (extrapolated), show it below the tile on mobile instead of hiding it, if that section is about the log.

---

### 7.15 Stats and readouts

**Source:** `.gba .note .stats`, `.proof` · **Extrapolated:** the big-number stat.

**Stat tile** (short facts: "Browser only", "Indonesian norms"):
```css
.stats { display: flex; gap: 16px; }
.stats div { flex: 1; background: #fff; border-radius: 16px; padding: 20px 22px; border: 1px solid var(--line); }
.stats b { display: block; font-size: 20px; font-weight: 700; letter-spacing: -.02em; }
.stats span { font-size: 14px; color: var(--slate); line-height: 1.45; display: block; margin-top: 4px; }
```

**Big-number stat** (story pages' "At a glance", Discover's 32 / 24, extrapolated): number 52/600, −0.04em, ink, `tabular-nums`, line-height 1; label 15px slate, max 18ch, 8px below. Two to four in a row (gap 20), on a cloud panel (radius 24, padding 32) or as white stat tiles on cloud. The "+" is part of the number, in ink.

**Proof row** (under the hero): "Trusted by **40+ brands** across Indonesia." (16px slate, number in ink), then the industries under it (19/600 slate; mobile 16px). Industries use slate (the mockup's slate-2 fails contrast for 19px text). When client logos are approved, the logo wall replaces the industries (§7.20).

**Rotating industries** (F44, F81, D4, 2026-10-22; Home's proof row and the Clients hub's Industries, `IndustryTicker`): one industry at a time, centred. Each slides in from 24px right while fading in (.5s), leads for 2.5s in all, then slides 24px left and fades out as the next one comes in, on a loop. CSS only: every industry is in the HTML, the words are stacked in one grid cell as wide as the longest so nothing shifts, and the keyframes are written per list length. Hover or keyboard focus (the line is one tab stop) holds it. The moving words are `aria-hidden`; screen readers get the full list once, as a visually hidden list. With reduced motion that list is the line itself: the industries in a centred row (gap 48; mobile wrapping with `gap: 12px 24px`), and nothing moves.

---

### 7.16 Game tiles

**Source:** `.games`, `.game`.

```css
.games { display: grid; grid-template-columns: 1.6fr 1fr 1fr; gap: 20px; }   /* mockup, three tiles; Home now has four, see below */
.game { border-radius: 24px; overflow: hidden; background: #fff; box-shadow: var(--shadow); border: 1px solid var(--line); position: relative; }
.game img { width: 100%; height: 300px; object-fit: cover; }
.game > .cap { padding: 18px 22px; display: flex; justify-content: space-between; align-items: baseline; }
.game b { font-size: 17px; font-weight: 700; letter-spacing: -.015em; }    /* module: "Personality" */
.game > .cap span { font-size: 14px; color: var(--slate); }                /* what it shows: "Story choices" */
```
- A screenshot (300px tall, cropped to cover) above a caption row. The first, wider tile can carry the event log.
- **Spotlight, four tiles (F31, 2026-10-19; Home's spotlight was cut in R14a, D1, and the styleguide keeps the layout):** one per module, Personality, Cognitive, Neuroscience, Simulation. Three columns `1fr 0.6fr 1fr` with gap 20; the 1st and 4th tiles span two columns, so the rows read wide + narrow, then narrow + wide. A wide tile is the old 1.6fr lead (about 700px at 1280, 560px at 1000), so the 290px event log still leaves most of Personality's screenshot clear. Four across was rejected: at 1000px the lead shrinks to about 310px and the log would cover it. One column at 900px and below. A module without a screenshot (Simulation, until it arrives) shows its §14.3 placeholder in the same frame.
- Game screenshots are the one place with dark, saturated color. They carry the "tech and game" mood, so the surfaces around them stay light.
- Static by default. If a tile links somewhere, use the product-tile hover (lift 4px, `--shadow-lg`).
- **Games list (Next Chapter), extrapolated:** the same tile at `repeat(3, 1fr)`, with 200px images, the game name as the title and "what it measures" as the caption. Below 600px it's one sideways-swipe row (F40) out to the screen's edges, each tile 78% wide so the next one peeks in, with scroll snap and no visible scrollbar; the row takes keyboard focus and is named after its module.

---

### 7.17 Why DEUS panels

**Source:** `.why`.

```css
.why { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
.why > div { background: var(--cloud); border-radius: 24px; padding: 40px; display: grid; grid-template-columns: 56px 1fr; gap: 24px; }
.why .ic { width: 56px; height: 56px; border-radius: 16px; background: #fff; display: grid; place-items: center; border: 1px solid var(--line); }
.why .ic svg { width: 24px; height: 24px; stroke: var(--azure); fill: none; stroke-width: 1.7; stroke-linecap: round; stroke-linejoin: round; }
.why h3 { font-size: 22px; font-weight: 700; letter-spacing: -.022em; line-height: 1.25; }
.why p { font-size: 16px; color: var(--slate); margin-top: 10px; }
```
Cloud panels on a White section, with a line icon in a white tile. Mobile: one column, icon above the text, padding 28. This is the default for any 2–6 benefits or pillars (the GBA pillars). **Exception, The 6 I's (About, F90):** a plain list on the Cloud section, no panels, icons or hover: each value is its letter ("I", `text-h2` azure, decorative), then the 20/700 value and one 17px slate line, over a `--line` hairline, so nothing looks clickable. On a Cloud section, flip it: white panels with a `--line` border.

**Icons:** `lucide-react` at 24px with `strokeWidth={1.7}`, in azure. The mockup's icons are close to Lucide's `FlaskConical`, `MapPin`, `Users` and `RefreshCw`; since R14b Home's second point ("Fits what you already use") uses `Puzzle`.

---

### 7.18 Closing panel with contact bar

**Source:** `.close`, `.close .panel`, `.close .contact`.

```css
.close { padding: 0 24px 24px; }
.close .panel { max-width: 1320px; margin: 0 auto; border-radius: 36px; padding: 120px 48px; text-align: center;
                position: relative; overflow: hidden; background: linear-gradient(180deg, #F7F9FC 0%, #D7E7FE 60%, #A9CBFF 100%); }
.close h2 { font-size: var(--text-closing); max-width: 12em; margin: 0 auto; }
.close p { font-size: 19px; color: var(--slate); max-width: 32em; margin: 22px auto 0; }
.close .ctas { display: flex; justify-content: center; gap: 12px; margin-top: 40px; }
.close .contact { margin-top: 36px; display: inline-flex; gap: 28px; font-size: 15px; font-weight: 600;
                  background: rgba(255,255,255,.7); padding: 12px 24px; border-radius: 999px; backdrop-filter: blur(10px); }
.close .contact span { color: var(--slate); font-weight: 500; margin-right: 8px; }
```
**Anatomy:** optional section label → closing H2 (two lines allowed, both ink) → lede (slate, kept in the top 60% of the panel) → primary + secondary buttons ("Request a demo", "Chat on WhatsApp") → the contact bar.

**Contact bar:** a frosted pill with one link: "Contact us" (label in slate 500) admin@deushcs.com → `mailto:`. It has no WhatsApp number (R13a, F59): the "Chat on WhatsApp" button above it opens the chat with the page's prefilled message, so the number is not shown twice. Hover underlines the value (extrapolated). The bar's position is the trigger that hides the floating WhatsApp button (§7.26).

**Mobile:** panel padding `64px 24px`; buttons stack; the contact bar becomes a column (gap 6, radius 20).

**With a form (Enhance, R16b, F79):** the panel can hold a contact block in place of the primary button. Enhance puts its booking form there (`#book-a-call`): a white card (radius 24, `--line` border, padding 40; 20 on a phone), max 760px, centred, text left-aligned, under the lede; then the "Chat on WhatsApp" button and the contact bar, whose email link carries the page's prefill. The panel's side padding drops to 12px on a phone so the form keeps its width. Every "Book a call" on the page jumps to the card.

Used at the end of every page except Contact and Privacy. Copy comes from each page's closing block, or the default in `global.md`.

---

### 7.19 Footer

**Source:** `footer` · **Extrapolated:** contact chips, links, mobile column spans.

```css
footer { padding: 72px 0 40px; }
footer .cols { display: grid; grid-template-columns: 1.6fr 1fr 1fr 1fr; gap: 48px; }
footer h4 { font-size: 14px; font-weight: 700; margin-bottom: 16px; }
footer li { list-style: none; font-size: 15px; color: var(--slate); margin-bottom: 10px; }
footer li a:hover { color: var(--ink); }                                                       /* extrapolated */
footer .about { font-size: 15px; color: var(--slate); max-width: 22em; margin-top: 18px; }
footer .bottom { margin-top: 56px; padding-top: 24px; border-top: 1px solid var(--line); display: flex;
                 justify-content: space-between; font-size: 14px; color: var(--slate); }      /* mockup: slate-2 */
```
| Column | Content (from `global.md` and the plan §4.3) |
|---|---|
| 1 (1.6fr) | Logo + wordmark → "Game-based assessment and performance management for Indonesian companies." → two small secondary buttons, 20px below: WhatsApp and Email (extrapolated) |
| 2 · Solutions | Game-Based Assessment · DEUS Discover · Next Chapter · DEUS Enhance · Potentia ↗ |
| 3 · Company | About · Clients · Science · Contact (the nav order) |
| 4 · Legal | Privacy policy · PT Investama Persada Kurnia · address [VERIFY, hidden until confirmed] |
| Bottom row | "© 2026 DEUS Human Capital Services" left; "English / Bahasa Indonesia" right (language links, current one in ink) |

On White, with no top border (the closing panel separates it). Mobile: `1fr 1fr`, with column 1 spanning both columns (extrapolated); the bottom row stacks with an 8px gap.

---

### 7.20 Logo wall · extrapolated

Replaces the industry row under "Trusted by 40+ brands" once logos are approved (Q8), and appears on the Clients hub.

- A grid of `repeat(6, minmax(0, 1fr))` (3 on mobile), gap `24px 48px` (mobile `16px 20px`), each logo centred in a 64px-tall cell.
- **Sized by area** (owner, 2026-10-23): every logo gets about 3,000px², inside 160×46, so a square mark (Boga, Pepper Lunch) holds its own beside a long wordmark (JVC Kenwood). On a phone a wide logo shrinks to its cell, keeping its shape (`logoSize` in `LogoWall.tsx`).
- One color: every logo, SVG or raster, is `filter: grayscale(1); opacity: .7`, so they read as one grey. No hover color change; logos aren't links unless they open a client story.
- **Home** shows eleven logos, the biggest names first, and a twelfth cell with a small secondary button "See all 40+ →" to the Clients hub, so the row reads as a long list at a glance. Nothing rotates.
- **Clients hub:** every logo, grouped by company (Telkom Indonesia, Boga Group, Delamibrands, Binacitra Kharisma Lestari, then "More clients"), each group under its name (14/700 slate, 16px above the grid), 48px between groups (56 on desktop), on Cloud.
- `alt` is the client's name. Never show a logo without permission. Every client is cleared for the wall (owner, 2026-10-23), Telkom and Calvin included, while their stories stay anonymised or held (Q7, Q11). The logos and their order live in `src/content/client-logos.ts`.
- The Home recognition strip (F7) was cut in R13a (D2); `LogoMark` keeps the one-colour rule for the logo wall.

---

### 7.21 Case study: story page, story card and link card · extrapolated

One shared layout for every client story (`WEBSITE-PLAN.md` §5.8), so each new story is a content file.

**Story page:**
1. **Header** (White, centered): "← All client stories" on its own row → section label "Client story" alone (no "· product", F84/D15) → H1 at the closing scale (60/34), **two lines at most** at 1280 and 390 (F85) → one-line result lede.
2. **At a glance:** a centred 15px slate line "Solution: **<product>**" (the product, in ink, semibold), then 2–4 big-number stats (§7.15) on a cloud panel, 72px below the lede. The closing heading also keeps to two lines (F86).
3. **Body** (White): the article column (`max-width: 720px`, left-aligned). Each part (The challenge, What DEUS did, Results) has its section label **left-aligned** → article H2 (34px) → body 17px slate, paragraphs 20px apart.
4. **In their words:** quote cards (§7.22).
5. **Photo** (optional): container width, radius 24, no shadow, a 15px slate caption 12px below.
6. **Closing panel** with the story's own CTA.

**Story card (Clients hub):** the side product tile (§7.11) with the product tag (§7.7) on top, client name (14/500 slate), the result as the H3 (24/700, max three lines), and "Read the story →". Optional thumbnail on a sky tile. Grid `repeat(2, 1fr)`, gap 20.

**Client story link card:** a single row on a cloud panel (radius 24, padding `28px 32px`, flex, space-between): section label "Client story" → the line "Telkom Group: 1,000+ MT candidates, results in 1 day" (20/700) → "Read the story →" link on the right. On mobile the link drops below. It repeats no other numbers or quotes. Product pages and Home no longer use it (R4, F6 and F18): GBA ends with the one-line "Read client stories →" link (§7.6), and the card returns with a stories row (TODO-NEXT item 6).

---

### 7.22 Quote card · extrapolated

```css
.quote { background: var(--cloud); border-radius: 24px; padding: 40px; }            /* white + --line border on Cloud sections */
.quote::before { content: "“"; display: block; font-size: 56px; line-height: .6; font-weight: 600; color: var(--sky-3); margin-bottom: 8px; }
.quote blockquote { font-size: 22px; font-weight: 600; letter-spacing: -.015em; line-height: 1.45; color: var(--ink); text-wrap: pretty; }
.quote figcaption { margin-top: 24px; display: flex; align-items: center; gap: 12px; }
.quote figcaption b { display: block; font-size: 15px; font-weight: 700; }
.quote figcaption span { font-size: 14px; color: var(--slate); }
.quote img { width: 44px; height: 44px; border-radius: 50%; }   /* optional portrait */
```
Use `<figure>`, `<blockquote>` and `<figcaption>`. No italics and no ember. The main client quote is full width (blockquote at 26px on desktop); participant quotes are a `repeat(3, 1fr)` grid at 18px/500. Quotes need permission and are shown in their original language, with the translation as a smaller line below if needed.

---

### 7.23 Accordion (FAQ) · extrapolated

```css
.faq { max-width: 800px; margin: 0 auto; border-top: 1px solid var(--line); }
.faq-item { border-bottom: 1px solid var(--line); }
.faq-q { width: 100%; display: flex; justify-content: space-between; align-items: center; gap: 24px; padding: 24px 0;
         text-align: left; font-size: 18px; font-weight: 700; letter-spacing: -.015em; color: var(--ink); }
.faq-q .ic { flex: 0 0 32px; height: 32px; border-radius: 50%; display: grid; place-items: center;
             background: var(--cloud); color: var(--slate); transition: background .15s, color .15s, transform .2s; }
.faq-q[aria-expanded="true"] .ic { background: var(--ink); color: #fff; transform: rotate(45deg); }   /* Plus → × */
.faq-a { padding: 0 56px 24px 0; font-size: 16px; color: var(--slate); max-width: 68ch; }
```
- The question row reuses the tab's 32px number circle, holding a 16px `Plus` icon. Open: the circle turns ink and the icon rotates to ×.
- Several items can be open at once. All are closed by default. The answer animates its height over .25s (`--ease-out`); instantly with reduced motion.
- Use shadcn/Radix `Accordion` (`type="multiple"`). Answers stay in the HTML when closed (for search and `FAQPage` structured data).
- Placed under a centered section header, on White.

---

### 7.24 Data table · extrapolated

For pricing, the games list and the use-case × module matrix.

```css
.table-wrap { border: 1px solid var(--line); border-radius: 24px; overflow: hidden; background: #fff; }
table { width: 100%; border-collapse: collapse; font-size: 15px; }
th { background: var(--cloud); text-align: left; font-size: 14px; font-weight: 700; color: var(--ink); padding: 16px 20px; }
td { padding: 16px 20px; border-top: 1px solid var(--line); color: var(--slate); vertical-align: top; }
td:first-child, th[scope="row"] { color: var(--ink); font-weight: 600; }
td.num { text-align: right; font-variant-numeric: tabular-nums; color: var(--ink); }
caption { caption-side: top; text-align: left; font-size: 14px; color: var(--slate); padding: 0 0 12px; }
```
- **Matrix cells:** a 18px azure `Check` with visually hidden "Yes", or an en dash in slate-2 with hidden "No". Never ember.
- **Highlighted column** (a recommended option, if ever needed): a sky-1 column fill. Not ember.
- **Mobile, two patterns:**
  - Wide matrices scroll sideways inside `.table-wrap` (`overflow-x: auto`) with the first column sticky (`position: sticky; left: 0; background: #fff`) and a right-edge fade showing there's more.
  - Lists (pricing tiers, games) become stacked cards: each row is a white card (radius 16, `--line` border, padding 20) with label and value pairs, labels in 13px slate.
- Always use `<th scope>` and a `<caption>` (visually hidden if a heading already names it).

---

### 7.25 Scroll-synced product screen · extrapolated

Spec: `ENHANCE-PAGE-SPEC.md` §4. The web version of the deck's "scroll to reveal each step". **Not on the Enhance page since R16b** (F74: visitors didn't see that the cards scroll; the section uses the §7.10 showcase now). `ScrollSyncedScreen` stays in the styleguide.

- **Desktop:** the showcase grid (`420px 1fr`, gap 40) on Cloud. Left: the five steps, each a tab-style item (number circle + 20/700 title + 16px slate copy), spaced so each step is about 60vh tall. Right: a **sticky stage** (`position: sticky; top: calc(84px + 48px)`; white-to-sky-1 stage tile, radius 36, height `min(600px, 100vh - 180px)`) holding the current step's screenshot.
- **The active step** is the one crossing the middle of the viewport (`IntersectionObserver`, `rootMargin: "-50% 0px -50% 0px"`). It gets the active tab look (white card, ink circle) and the **ember progress bar**, which fills with scroll progress through that step. The screen crossfades over .4s.
- **"Turn results into decisions"** closes the sequence as a full-width card below it, not as step 6.
- **Mobile:** no sticky stage. Each step shows its screenshot inline under the text, on a sky tile (radius 24).
- **Reduced motion:** screens swap instantly; the bar shows full on the active step.
- Steps are numbered `1`–`5` in circles, not `▸ 01`.

---

### 7.26 Floating WhatsApp button · extrapolated

- A 56px ink circle, fixed at `right: 24px; bottom: 24px` (16px on mobile), `z-index: 40`, with `--shadow-btn` plus `--shadow-lg`.
- A 26px white WhatsApp glyph (inline SVG; Lucide has no WhatsApp mark). Ink, not WhatsApp green: Daylight adds no hues.
- `aria-label="Chat with us on WhatsApp"`, with a tooltip on hover and focus (ink pill, white 13/600 text, 8px to the left).
- Opens `wa.me` with the page's prefilled message and fires `whatsapp_click`.
- Fades out (.2s) while the closing panel's contact bar is on screen, and isn't shown on the Contact page.

---

### 7.27 404 and error pages · extrapolated

- A centered panel with the closing-panel gradient, in a `max-width: 960px` frame, radius 36, padding `96px 48px` (mobile `64px 24px`), with 64px of White above and below it. Header and footer as normal.
- Section label "Error 404" → H1 at the closing scale: "This page has drifted out of orbit." → lede (slate, top 60% of the panel) → primary "Go to the homepage" + secondary "See our solutions".
- The 500 page uses the same panel: "That wasn't supposed to happen." with "Refresh" and "Go to the homepage".
- No illustration, no orbit rings and no ember.

---

### 7.28 Open Graph image template · extrapolated

Generated per page with `next/og` (`ImageResponse`), 1200×630.

| Part | Spec |
|---|---|
| Background | The sky-window gradient, `180deg`, full bleed, with the two white highlights |
| Logo | Logo tile 64×64 (radius 18) + "DEUS" 32/700, −0.02em, ink, at 72px from the top and left |
| Title | The page H1, 64/600, −0.04em, line-height 1.05, ink, left-aligned, max width 960px, max three lines; long titles drop to 56px |
| Footer line | "deushcs.com" 24/500 ink-2, 72px from the bottom left |
| Optional | One floating card (white, radius 22, `--shadow-lg`) on the right for product pages |

Load Manrope 600 and 700 as TTF data for `ImageResponse`; it doesn't use `next/font`. Keep text ink (it's read small in chat previews). No ember.

### 7.29 Favicon and app icon · extrapolated

From the logo tile: `favicon.ico` (32 and 16), `icon.png` (512), `apple-icon.png` (180, no rounding, the OS rounds it). Needs a vector or high-resolution logo: the current `deus-logo.png` is 157×157 (§14).

### 7.30 Use-case page · extrapolated (no mockup)

One shared layout for every use-case page (`SEO/geo-implementation-plan.md` §S8), `/solutions/<slug>`, so each new page is a content file. Provisional: built from existing pieces and tokens only, until the owner sees it. Sections run White → Cloud → White → Cloud → White, then the closing panel.

1. **Hero** (White, with the hero glow, as the product pages' §7.12): two columns. Left, left-aligned: the product name as the large azure line ("Use case · Game-Based Assessment"), the H1 as the search phrase at the H2 scale, the answer passage as the lede (it runs to six lines, so it is never centred, §4.5), one navy button. Right, a sky panel with two play cards (§7.13) of product screens that the pages already use, each with a one-line caption and no meta text. On a phone the panel follows the button, cards stacked.
2. **The problem** (Cloud): centred header over a 2×2 grid of white cards with a hairline border (the GBA problem cards).
3. **How DEUS does it** (White): centred header over cloud cards (two or three across, radius 24, padding 32), each a 22/700 title, a 16px slate body and a standalone link (§7.6) to its part of the product page.
4. **How it runs** (Cloud): centred header over the numbered steps (§12, circles).
5. **Proof** (White): Home's proof row (§7.20): "Trusted by 40+ brands" over the logo wall. While client stories show, the story link card (§7.21) sits under it where the page has one, otherwise the "Read client stories" link. The download offer (`DownloadOffer`, GBA pages only, while it's on) follows it, 56px below.
6. **FAQ** (White, tight 96px top because the proof above it is also White): the accordion (§7.23).
7. **Closing panel** (§7.18) with the page's own label, heading and button, ending on White.

---

## 8. Product imagery

**Rule:** screens float over the sky; they never sit in a laptop, monitor or browser frame. A phone frame is allowed only for Potentia's mobile game.

### 8.1 Three compositions from the mockup

| Composition | How | Where in the mockup |
|---|---|---|
| **Bleed crop** | A screenshot larger than its tile, positioned at a fixed inset (40px from top and left), cropped by the tile's `overflow: hidden` so it runs off the bottom right | Lead product tile (680px image in a ~560px tile) |
| **Stack** | A large screenshot on a stage tile, plus a floating UI card overlapping one corner with real-looking data | Tab showcase stage (620px screenshot + result card) |
| **Inset** | The top of a screenshot, `object-fit: cover; object-position: top`, inset 32px from each side, in a short sky thumbnail | Side product tiles |
| **Journey** (the hero) | UI cards built in code, floating directly on the sky, connected by the timeline | Hero window |

### 8.2 Recipe

1. **Tile:** a sky gradient (thumbnail tile or stage tile), `position: relative; overflow: hidden`, radius 24 or 36.
2. **Screen:** `position: absolute`, a fixed inset (24–56px), radius 12–16, `--shadow-lg` (or `--shadow` for small inset images). Let it bleed off one or two edges; never center it with even margins.
3. **Data card** (optional): a floating card (§7.13) overlapping the screen's corner by about a third of its width, with the one number the section is about.
4. **One screen per tile.** Two overlapping screens only in hero windows.

### 8.3 Building UI cards in code

- Prefer code over screenshots for anything that carries the message: profile bars, appraisal scores, percentiles, event logs, calibration counts. They're sharp at every size, translatable, accessible and easy to update.
- Use the site's own tokens (Manrope, ink, slate, sky bars), not the product's UI styles, so they read as illustrations of the product.
- Keep them small: one key, one title, three to five data rows.
- Sample data is illustrative and must be approved before launch (see the note at the top).

### 8.4 Screenshots

- Export at 2× the display width (a 620px stage screenshot needs a 1240px image). Serve through `next/image` (AVIF or WebP) with `sizes` set.
- Crop out browser chrome, OS bars and personal data. Demo data only.
- `alt`: describe what the screen shows when it supports the text ("Next Chapter numerical reasoning game"); `alt=""` when a floating card next to it already says it.
- **Enhance hero:** the screens crossfade every 5s (`ENHANCE-PAGE-SPEC.md`), pausing off screen and when reduced motion is on.
- **Tall reports** (GBA Reports tab): a slow auto-scroll inside the stage (20s ease-in-out, holding at top and bottom), paused on hover and with reduced motion. A wide screenshot (under 1.3 times as tall as it is wide) doesn't scroll: the stage fits its height, so no white space shows under it.
- **Potentia:** the phone-framed game image and the report, with `--shadow-warm`, only on the warm band.

---

## 9. Motion

Motion is quiet. Two orchestrated moments tell the story; everything else is a short, plain transition.

### 9.1 Tokens

| Token | Value | Source | Use |
|---|---|---|---|
| `--dur-fast` | .15s | mockup `.btn` | Buttons, links, chips, fields |
| `--dur-base` | .2s | mockup `.p` | Tile lift, header background, menus |
| `--dur-reveal` | .6s | extrapolated | Section entrances |
| `--dur-draw` | 1.2s | extrapolated | Hero track drawing |
| `--tab-dwell` | 3.5s | extrapolated | Time per showcase tab |
| `--dur-fill` | .35s | extrapolated | Each process-timeline dot filling in (§7.12) |
| `--ease-out` | `cubic-bezier(.2,.7,.3,1)` | extrapolated (carried from the reference guide) | Entrances, menus, lifts |
| `--ease-in-out` | `cubic-bezier(.65,0,.35,1)` | extrapolated | Crossfades, the track draw |

### 9.2 The two orchestrated moments

**1. The hero journey draws left to right** (once, on load).

| Time | What happens |
|---|---|
| 0 | Headline, lede and buttons are already visible (never delay the LCP text) |
| .2s | The window caption fades in (.4s) |
| .4s | The track draws from left to right (`scaleX(0 → 1)`, origin left, 1.2s `--ease-in-out`) |
| .4s / .8s / 1.2s | Each node appears as the line reaches it (scale .6 → 1, .3s); each card rises 16px and fades in (.6s `--ease-out`) |
| 1.6s | The final node turns ember, and its halo grows from 0 to 6px once (.5s) |

Implementation: CSS keyframes with `animation-delay`; no JavaScript needed. It plays once per page load, not on scroll back.

**2. The tab progress bar** (§7.10): the ember bar fills over 3.5s, then the next tab takes over and the stage crossfades (.4s). This shows the hire → develop → reward sequence without the visitor doing anything, and stops as soon as they do.

### 9.3 Everything else

- **Section reveal:** section headers and grid items fade up 24px over .6s `--ease-out`, staggered 80ms, triggered once by an `IntersectionObserver` at 20% visibility. Don't reverse on scroll out. Don't animate the hero text.
- **Tile hover:** lift 4px over .2s, shadow to `--shadow-lg`.
- **Recording dot:** the halo may pulse (4px → 7px → 4px, 2.4s, infinite) only while on screen.
- **Rotating industries** (§7.15) and **Enhance's review-to-pay loop** (§7.12): the only other loops; both pause on hover and focus.
- **Process timeline** (§7.12): the dots fill in one after another, once, as the timeline comes into view.
- **Menus and sheets:** fade plus 8–12px movement over .2s.
- No parallax, no scroll-jacking, no animated gradients, no number count-ups.

```css
.reveal { opacity: 0; translate: 0 24px; }
.in-view .reveal { opacity: 1; translate: 0 0; transition: opacity .6s var(--ease-out), translate .6s var(--ease-out);
                   transition-delay: calc(var(--i, 0) * 80ms); }
```

### 9.4 Reduced motion

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { transition: none !important; animation: none !important; }
  .reveal { opacity: 1; translate: none; }
}
```
With reduced motion: the hero shows its final state (track drawn, ember node lit), tabs don't autoplay (the active bar shows full), screens swap instantly, the recording dot is still, the industries are one still row, Enhance's hero loop holds its bonus step, every process-timeline dot is filled, and tiles change shadow without lifting. Without JavaScript, `.reveal` content must still be visible (add the `.reveal` class from script, not in the HTML).

---

## 10. Responsive rules

One breakpoint: **900px**. At 900px and below is mobile. Mobile-first in Tailwind: `desk:` = 901px and up (§13.2).

### 10.1 What changes at 900px (from the mockup)

| Element | Desktop | ≤900px |
|---|---|---|
| Gutter | 48px | 22px |
| Section padding | 144px | 88px |
| Display / H2 / closing H2 | 80 / 52 / 60 | 46 / 34 / 34 |
| Hero lede | 20px | 17px |
| Header | nav pill, language, Contact, CTA | logo + CTA (+ menu button, extrapolated) |
| Hero and closing buttons | side by side | stacked, centered |
| Sky window | 580px tall, positioned cards on a timeline | auto height, cards stacked; track, nodes and dates hidden |
| Tab showcase | `420px 1fr` | one column; stage 340px min height |
| Product tiles | lead + stacked side tiles + full-width Potentia | one column; Potentia stacks |
| Game tiles | mirrored 2×2 (`1fr 0.6fr 1fr`, §7.16) | one column |
| Event log | floats over the first game | hidden |
| Why DEUS | 2×2 panels, icon beside the text | one column, icon above, padding 28 |
| GBA note | copy + stats side by side | stacked |
| Proof industries | one row, 19px, gap 48 | wrapping, 16px, gap `12px 24px` |
| Closing panel | padding `120px 48px` | padding `64px 24px`; contact bar stacks |
| Footer | four columns | two columns |

### 10.2 Extrapolated rules

- **900–1100px:** hide the header's Contact link; the showcase uses `minmax(320px, 420px) 1fr`.
- **Below 480px:** header 68px; the window and closing-panel inset drops to 12px; hide the "DEUS" wordmark below 360px if the CTA doesn't fit.
- **600–900px:** grids of small items (The 6 I's, games list, quote grid) use two columns.
- **Hover-only details need a tap or focus equivalent.** Nothing is revealed only on hover.
- **Images:** set `sizes` per breakpoint; mobile screenshots load at the mobile width.
- **Test** at 390 and 1280 (Playwright), in both languages.

---

## 11. Voice in the UI

The full rules are in `content/VOICE.md`. For components:

- **Sentence case everywhere:** labels, buttons, nav, headings, table headers. Never capitals-only, except the section label, which CSS sets in capitals from sentence-case copy (§7.7).
- **Buttons say what happens:** "Request a demo", "Book a 30-minute call", "Chat on WhatsApp", "Send message". Never "Submit", "Learn more" or "Click here".
- **Section labels** use the `Eyebrow:` text from the content files exactly.
- **Errors** say what to do ("Please enter a valid work email, like name@company.com."), next to the field.
- **All visible strings come from the content files** (`content/en`, `content/id`), never hard-coded in components. Real labels for the nav, footer, forms, errors and success state are in `content/en/global.md`.
- **Numbers and dates** use the locale: "March 2025" / "Maret 2025". Prices follow each locale's number format.
- **Line breaks in two-line headlines** come from the `/` in the content, and both lines render the same (§3.3).
- **Placeholder data** (people, scores, dates) stays obviously sample-like until approved.

---

## 12. Do and don't

**Do**
- Keep every surface light: White, Cloud, Sky (two places), Warm (Potentia).
- Use 144px section spacing and a centered label → H2 → lede header, then 72px to the content.
- Let size and space carry headlines: Manrope 600, tight tracking, ink.
- Use ember only for "now": one or two marks per view at most.
- Use navy pills for actions, azure-ink for links.
- Float real screens over sky tiles with deep, soft shadows; build key data as UI cards in code.
- Use hairlines for things that sit on the page and shadows for things that float.
- Step radii up with size: 12 → 16 → 24 → 36, and pills for anything button-like.
- Test every component in Indonesian and at 390px.

**Don't**
- Don't add a dark section, a navy band or a dark mode.
- Don't use monospace or an orange dash. Capitals and letter spacing belong to the section label only (§7.7).
- Don't color, italicize or highlight a word in a headline.
- Don't use ember for buttons, links, text on white, icons, hover states or decoration.
- Don't use slate-2 for anything a visitor needs to read.
- Don't add glows, dot grids, orbit rings or gradients to ordinary sections.
- Don't put screenshots in laptop or browser frames (only Potentia's game may use a phone frame).
- Don't number items `01`, `01 / 04` or `▸ 01`; use `1`, `2`, `3` in circles, or no numbers.
- Don't add new hues (no green, purple or teal). Errors use the error reds only.
- Don't center long body copy.
- Don't use pure black or neutral grey for text.

---

## 13. Drop-in tokens

### 13.1 CSS custom properties

Copy into `src/styles/tokens.css`.

```css
:root {
  /* color: core (mockup) */
  --ink: #101B3D; --ink-2: #26315A; --slate: #5B6785; --slate-2: #8790A8;
  --line: #E6EAF2; --cloud: #F7F9FC; --white: #FFFFFF;
  --sky-1: #EAF3FF; --sky-2: #CFE2FF; --sky-3: #A9CBFF; --azure: #2563EB; --azure-ink: #1D4FC4;
  --ember: #FF6B3D;

  /* color: supporting (mockup literals) */
  --ember-ink: #B23F18; --ember-wash: #FFF3EE;
  --ember-halo: rgba(255,107,61,.22); --ember-halo-sm: rgba(255,107,61,.20);
  --error: #C42B2B; --error-ink: #B02525;
  --focus-ring: rgba(37,99,235,.14);
  --error-wash: #FDF2F2;                  /* extrapolated */
  --field-border: #8790A8;                /* extrapolated: 3:1 field boundary */

  /* color: Potentia warm band (mockup) */
  --warm-1: #FFF6EC; --warm-2: #FFE6D2; --warm-line: #FBE0C8;
  --warm-text: #6B5446; --warm-link: #B23F18; --warm-chip: #9A4A1E;

  /* gradients */
  --grad-sky-window: linear-gradient(180deg, #8DBAF7 0%, #B6D3FB 38%, #E3EEFD 74%, #F7F9FC 100%);
  --grad-sky-highlights: radial-gradient(600px 300px at 18% 30%, rgba(255,255,255,.5), transparent 70%),
                         radial-gradient(700px 320px at 84% 22%, rgba(255,255,255,.4), transparent 70%);
  --grad-closing: linear-gradient(180deg, #F7F9FC 0%, #D7E7FE 60%, #A9CBFF 100%);
  --grad-hero-glow: radial-gradient(closest-side, rgba(169,203,255,.55), rgba(207,226,255,.35) 45%, rgba(255,255,255,0) 100%);
  --grad-sky-wash: linear-gradient(180deg, #fff, var(--sky-1) 55%, #fff);
  --grad-stage: linear-gradient(160deg, var(--sky-1), #fff 70%);
  --grad-thumb: linear-gradient(180deg, var(--sky-2), var(--sky-1));
  --grad-bar: linear-gradient(90deg, var(--sky-3), var(--azure));
  --grad-ember-track: linear-gradient(90deg, rgba(255,255,255,.85), var(--ember));
  --grad-warm: linear-gradient(100deg, var(--warm-1), var(--warm-2));

  /* type */
  --font: var(--font-manrope), system-ui, sans-serif;
  --text-display: clamp(46px, 1.96rem + 3.75vw, 80px);
  --text-closing: clamp(34px, 1.43rem + 2.87vw, 60px);
  --text-h2: clamp(34px, 1.64rem + 1.99vw, 52px);
  --text-h2-article: clamp(28px, 1.59rem + 0.66vw, 34px);   /* extrapolated */
  --text-lede: clamp(17px, 0.98rem + 0.33vw, 20px);
  --text-lede-sm: clamp(17px, 1.01rem + 0.22vw, 19px);
  --track-display: -.045em; --track-h2: -.038em;

  /* shape */
  --r-xs: 10px; --r-sm: 12px; --r-field: 14px; --r-md: 16px;
  --r-float-sm: 20px; --r-float: 22px; --r-lg: 24px; --r-xl: 36px; --pill: 999px;

  /* elevation */
  --shadow: 0 1px 2px rgba(16,27,61,.05), 0 12px 32px -12px rgba(16,27,61,.16);
  --shadow-lg: 0 2px 4px rgba(16,27,61,.04), 0 40px 80px -32px rgba(16,27,61,.28);
  --shadow-btn: 0 8px 20px -8px rgba(16,27,61,.5);
  --shadow-warm: 0 30px 60px -28px rgba(120,60,20,.45);

  /* layout */
  --container: 1200px;
  --frame-wide: 1320px;
  --gutter: clamp(22px, 0.68rem + 2.87vw, 48px);
  --section-y: clamp(88px, 3.99rem + 6.18vw, 144px);
  --section-y-tight: clamp(64px, 3.14rem + 3.53vw, 96px);    /* extrapolated */
  --head-gap: clamp(48px, 2.35rem + 2.65vw, 72px);         /* extrapolated mobile end */
  --header-h: 84px;

  /* motion */
  --dur-fast: .15s; --dur-base: .2s;                       /* mockup */
  --dur-reveal: .6s; --dur-draw: 1.2s; --tab-dwell: 3.5s;    /* extrapolated */
  --ease-out: cubic-bezier(.2,.7,.3,1);
  --ease-in-out: cubic-bezier(.65,0,.35,1);
}

html { font-family: var(--font); color: var(--ink); background: #fff; -webkit-font-smoothing: antialiased; }
body { font-size: 17px; line-height: 1.65; }
h1, h2 { font-weight: 600; text-wrap: balance; }
:focus-visible { outline: 2px solid var(--azure); outline-offset: 3px; }
::selection { background: var(--sky-2); color: var(--ink); }   /* extrapolated */
```

### 13.2 Tailwind v4 (`@theme`)

In `src/app/globals.css`. `--color-*: initial` removes Tailwind's default palette so off-palette colors can't creep in.

```css
@import "tailwindcss";

@theme {
  --color-*: initial;
  --color-ink: #101B3D;  --color-ink-2: #26315A;
  --color-slate: #5B6785; --color-slate-2: #8790A8;
  --color-line: #E6EAF2; --color-cloud: #F7F9FC; --color-white: #FFFFFF; --color-transparent: transparent;
  --color-sky-1: #EAF3FF; --color-sky-2: #CFE2FF; --color-sky-3: #A9CBFF;
  --color-azure: #2563EB; --color-azure-ink: #1D4FC4;
  --color-ember: #FF6B3D; --color-ember-ink: #B23F18; --color-ember-wash: #FFF3EE;
  --color-error: #C42B2B; --color-error-ink: #B02525; --color-error-wash: #FDF2F2;
  --color-field-border: #8790A8;
  --color-warm-1: #FFF6EC; --color-warm-2: #FFE6D2; --color-warm-line: #FBE0C8;
  --color-warm-text: #6B5446; --color-warm-link: #B23F18; --color-warm-chip: #9A4A1E;

  --text-display: clamp(46px, 1.96rem + 3.75vw, 80px);
  --text-display--line-height: 1.02; --text-display--letter-spacing: -0.045em; --text-display--font-weight: 600;
  --text-closing: clamp(34px, 1.43rem + 2.87vw, 60px);
  --text-closing--line-height: 1.08; --text-closing--letter-spacing: -0.038em; --text-closing--font-weight: 600;
  --text-h2: clamp(34px, 1.64rem + 1.99vw, 52px);
  --text-h2--line-height: 1.08; --text-h2--letter-spacing: -0.038em; --text-h2--font-weight: 600;
  --text-h2-article: clamp(28px, 1.59rem + 0.66vw, 34px);
  --text-h2-article--line-height: 1.15; --text-h2-article--letter-spacing: -0.03em; --text-h2-article--font-weight: 600;
  --text-stat: 52px;  --text-stat--line-height: 1;    --text-stat--letter-spacing: -0.04em;  --text-stat--font-weight: 600;
  --text-h3-lead: clamp(28px, 1.59rem + 0.66vw, 34px);
  --text-h3-lead--line-height: 1.2; --text-h3-lead--letter-spacing: -0.035em; --text-h3-lead--font-weight: 700;
  --text-h3: 24px;    --text-h3--line-height: 1.25;   --text-h3--letter-spacing: -0.025em;   --text-h3--font-weight: 700;
  --text-h3-panel: 22px; --text-h3-panel--line-height: 1.25; --text-h3-panel--letter-spacing: -0.022em; --text-h3-panel--font-weight: 700;
  --text-title: 20px; --text-title--line-height: 1.3; --text-title--letter-spacing: -0.02em;  --text-title--font-weight: 700;
  --text-title-sm: 17px; --text-title-sm--line-height: 1.35; --text-title-sm--letter-spacing: -0.015em; --text-title-sm--font-weight: 700;
  --text-lede: clamp(17px, 0.98rem + 0.33vw, 20px); --text-lede--line-height: 1.65;
  --text-lede-sm: clamp(17px, 1.01rem + 0.22vw, 19px); --text-lede-sm--line-height: 1.65;
  --text-body: 17px;  --text-body--line-height: 1.65;
  --text-body-sm: 16px; --text-body-sm--line-height: 1.65;
  --text-card: 15.5px; --text-card--line-height: 1.65;
  --text-ui: 15px;    --text-ui--line-height: 1.65;
  --text-label: 14px; --text-label--line-height: 1.65;
  --text-meta: 13px;  --text-meta--line-height: 1.65;

  --radius-xs: 10px; --radius-sm: 12px; --radius-field: 14px; --radius-md: 16px;
  --radius-float-sm: 20px; --radius-float: 22px; --radius-lg: 24px; --radius-xl: 36px; --radius-pill: 999px;

  --shadow-soft: 0 1px 2px rgb(16 27 61 / .05), 0 12px 32px -12px rgb(16 27 61 / .16);
  --shadow-float: 0 2px 4px rgb(16 27 61 / .04), 0 40px 80px -32px rgb(16 27 61 / .28);
  --shadow-btn: 0 8px 20px -8px rgb(16 27 61 / .5);
  --shadow-warm: 0 30px 60px -28px rgb(120 60 20 / .45);

  --container-content: 1200px;
  --container-wide: 1320px;
  --container-head: 780px;
  --container-article: 720px;

  --breakpoint-desk: 56.3125rem;   /* 901px: the mockup's mobile CSS is max-width 900px */

  --ease-out: cubic-bezier(.2,.7,.3,1);
  --ease-in-out: cubic-bezier(.65,0,.35,1);
}

@theme inline {
  --font-sans: var(--font-manrope), system-ui, sans-serif;
}
```

Example classes: section `py-[var(--section-y)]`; header `text-center max-w-head mx-auto mb-[var(--head-gap)]`; H2 `text-h2 text-ink`; section label `<SectionLabel>` (`section-label inline-block text-eyebrow uppercase text-azure-ink mb-5`, lines from `.section-label` in globals.css); primary button `inline-flex h-13 items-center gap-2.5 rounded-pill bg-ink px-6.5 text-base font-semibold text-white shadow-btn hover:bg-ink-2`; floating card `rounded-float bg-white/90 backdrop-blur-lg border border-white/95 shadow-float p-5`.

Gradients stay in `tokens.css` as custom properties (`bg-[image:var(--grad-sky-window)]`).

---

## 14. Assets and placeholders

### 14.1 What exists (`design-directions/assets/`)

| File | Size (px) | Use | Notes |
|---|---|---|---|
| `deus-logo.png` | 157×157 | Header, footer | **Too small** for the OG image, app icon and 2× retina beyond 78px. Need a vector (SVG) or 1024px+ PNG |
| `enhance-1.png` | 811×620 | Lead product tile | Lead tile renders it at 680px; 1360px needed for 2× |
| `enhance-2.png`, `enhance-3.png` | 2431×1857 | Enhance page screens | Fine |
| `gba-1-crop.png` | 830×496 | Hero play card, Discover tile, Personality game tile | Fine for 340px cards; soft at the wide (about 700px) game tile at 2× |
| `gba-2-crop.png` | 1404×785 | Showcase stage (Next Chapter numerical reasoning) | Fine |
| `gba-3-crop.png`, `gba-4-crop.png` | 1558×872, 1698×842 | Game tiles, Next Chapter tile | Fine |
| `discover-report-crop.png` | 526×1017 | Discover reports | Low resolution for a large stage |
| `potentia-phone-crop.png` | 386×762 | Potentia band (phone frame allowed) | Fine at 150px |
| `potentia-report-crop.png` | 540×1016 | Potentia band | Fine at 300px |

### 14.2 Still needed

| Asset | For | Owner |
|---|---|---|
| Logo as SVG (tile and wordmark) | Header, footer, OG, favicon, app icon | Brand owner |
| Enhance screens from `assets_enhance/` (product overview, calibration matrix, salary increase, bonus cycle setup, reward grouping) | Enhance hero, scroll-synced steps, rating-to-reward | Product team (folder missing, see `ENHANCE-PAGE-SPEC.md`) |
| Report screenshots (individual, batch, interactive), at 2× | GBA Reports tabs | Product team |
| Game screenshots for all 13 Next Chapter games | Games list | Product team |
| **Approved sample data** for the journey cards, showcase result card, event log and Enhance cards | Every data moment | DEUS team |
| Client logos (approved, preferably SVG) | Logo wall (Q8) | DEUS team |
| Telkom group photo, permission | Telkom story (Q7) | DEUS team |
| Leadership photos and bios | About (Q10) | DEUS team |
| Manrope TTF files (600, 700) | OG image generation | From Google Fonts (OFL licence) |
| WhatsApp glyph (SVG) | Floating button, contact chips | Use WhatsApp's brand resources |

### 14.3 Placeholder rules

- Placeholder images are sky tiles (the thumbnail gradient) with a 15px slate caption naming what goes there, e.g. "TODO: Calibration matrix screenshot". Never a grey box or a stock photo.
- Sample people and numbers stay illustrative (see the top of this guide) and are listed in the launch checklist.

---

## 15. Leftovers from the old design

Places in the repo that still assumed the deck design, and what was done about them (2026-10-14).

### 15.1 Fixed

| Where | What it assumed | Change made |
|---|---|---|
| `Creating DEUS HCS Website.md` §8 | Inter, mono uppercase eyebrows, orange accent, a dark mood for the GBA pages, orbit circles, laptop mockups | A "superseded by `DESIGN-GUIDE.md`" note at the top of §8 |
| Same file, §10 and §11 | Tokens "see §8"; "orange on white is fine for large text"; "Enhance dashboard laptop mockup" | §10 points to this guide's §13 and states ember is never text; §11 asks for the screen without the laptop frame |
| `content/en/enhance.md`, `game-based-assessment.md`, `science.md` (now in `content/not-used/`); `ENHANCE-PAGE-SPEC.md` §4 | Step markers `▸ **01 · Title**` | Now `**1. Title**` (the spec's table column reads `1`–`5`). Rendered as number circles (§7.10) |
| `content/en/next-chapter.md` | "Module 01 · Cognitive" | "Module 1 · Cognitive" (and 2, 3) |
| `content/en/home.md`, `about.md`, `discover.md`, `game-based-assessment.md`, `enhance.md` | Zero-padded card numbers (`**01 · Hire**`, `**01 · Innovative**`) | Now `**1. Hire**` etc. Whether a number is shown is up to the component (product tiles and Why DEUS panels show none) |
| `content/en/enhance.md`, `ENHANCE-PAGE-SPEC.md`, `WEBSITE-PLAN.md` §5.1 | Title Case headings and step titles from the deck ("From Scattered Data to Better Decisions") | Sentence case, same words. A note at the top of `enhance.md` records it |
| All headings in `content/en/` and `content/id/`; `WEBSITE-PLAN.md` §5.1 | Bold second lines on closers ("Ready to transform / **with DEUS?**") and bold words inside headlines ("Make performance **visible.**", "**40+**", "Start Where It **Matters Most** to You") | Bold removed from every heading. Wording unchanged |
| `content/en/global.md` | Language switch "ID / EN" | "EN / ID" |
| `content/en/home.md` | Hero label "Human Capital Services" | Removed, matching the mockup (a note explains why) |
| `WEBSITE-PLAN.md` §5.1 and §7.2 | Potentia band in deuspotentia.com's colours (royal blue, orange star) | Points to the warm band in §2.3. The status line now says this guide is written |
| `content/VOICE.md` | No rules for heading case, bold in headings or numbering | Formatting notes added: sentence case, no bold or italics in headings, ` / ` as the line break, numbered items as `**1. Title**` |

### 15.2 Still open

- **Accessibility changes to the mockup** are now the guide's defaults: slate instead of slate-2 for the inactive language, industry row, log timestamps and footer bottom row, and a 3:1 field border. Check them in `/styleguide`.
- **Display size:** the mockup's guide sheet says 84px and its CSS says 80px. This guide uses 80; the mockup file is left as it was.
- `Reference Design Guide.md` and `content/not-used/` keep the old patterns on purpose and aren't used for the build.
