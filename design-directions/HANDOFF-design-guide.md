# Handoff: write the DEUS website design guide (Daylight v2)

> Paste everything below the line into a new Claude Code session opened in
> `~/projects/deushcs-website`. Suggested model: **Opus 5.5, High effort** (precise
> documentation of a visual system; see the model table in `~/.claude/CLAUDE.md`).

---

You're writing the visual design guide for the new DEUS Human Capital Services website. The owner has already chosen a direction, **Daylight v2**, from three mockups. Your job is to turn that mockup into a complete, buildable design guide: the visual source of truth that `WEBSITE-PLAN.md` refers to as `DESIGN-GUIDE.md`.

## Read these first

1. `design-directions/c-daylight-v2.html`: **the source of truth for every value.** Read the CSS in full. Tokens, sizes, radii, shadows and spacing come from here, not from memory. The guide sheet at the bottom of the file (`#guide`) summarizes the color, type and principle decisions.
2. `design-directions/screenshots/c-daylight-v2-*.png`: what it looks like (hero, full-hero, homepage, guide sheet, mobile). Look at them before writing.
3. `Reference Design Guide.md`: the **previous** guide, taken from the sales decks. Use it as the model for **depth and structure** (it's thorough: tokens, type scale table, spacing, radius, elevation, components with CSS, motion, responsive rules, do/don't, drop-in tokens, Tailwind `@theme`). Don't carry over its visual decisions; Daylight replaces them (see "What changed" below).
4. `WEBSITE-PLAN.md` §5 (page blueprints), §7 (design application and the gap list in §7.2) and §9 (tech stack: Next.js, Tailwind v4, `next/font`, `lucide-react`). The guide must cover every gap in §7.2.
5. `content/VOICE.md` and `content/en/global.md`, for copy rules and the real labels used in components (nav, footer, form labels, errors, success state).

## What to produce

- **`DESIGN-GUIDE.md` at the project root.** Do not edit or delete `Reference Design Guide.md`.
- Same depth as the reference guide. Suggested sections:
  1. Brand essence and the Daylight signature (the 8 to 10 moves to remember)
  2. Color: tokens, roles, usage ratios, **measured** contrast table (compute it, don't guess), the Daylight gradient, the Potentia palette
  3. Typography: Manrope weights and roles, full type scale (desktop → mobile `clamp()` values), rules
  4. Layout and spacing: container, gutters, section rhythm, grid patterns used, alignment rules (centered section headers, left-aligned body)
  5. Radius and elevation
  6. Surfaces and atmosphere (white, cloud, sky window, closing panel, Potentia warm band). No dark surface.
  7. Components, each with anatomy, states and CSS: header with pill nav, mega menu, mobile menu, language switch, buttons, links, label pill, form controls (all states in §7.2), tabs (the "where we help" pattern), product tiles (lead / side / Potentia), journey timeline (the hero), floating UI cards, event log, stat/readout, game tiles, closing panel with contact bar, footer, accordion, data table, logo wall, case-study and quote card, 404, Open Graph template
  8. Product imagery: floating screens over the sky gradient, never laptop frames; how to compose UI cards in code
  9. Motion: tokens and the one or two orchestrated moments (for example the hero journey drawing left to right, the tab progress bar). Reduced motion.
  10. Responsive rules (900px breakpoint, what stacks, what hides)
  11. Voice in UI (short; point to `content/VOICE.md`)
  12. Do / Don't
  13. Drop-in tokens: CSS custom properties **and** a Tailwind v4 `@theme` block
  14. Assets and placeholders still needed

## Decisions already made (don't reopen these)

- **Font:** Manrope only (400 body, 500 UI, 600 headings, 700 small titles). No monospace anywhere. No all-caps labels.
- **Headlines:** SemiBold, tight tracking (display about −0.045em, H2 about −0.038em), `text-wrap: balance`. **Both lines of a two-line headline stay in ink.** Never accent a single word in color or italics.
- **Colors** (from the v2 `:root`): ink `#101B3D`, ink-2 `#26315A`, slate `#5B6785`, slate-2 `#8790A8`, line `#E6EAF2`, cloud `#F7F9FC`, white, sky-1 `#EAF3FF`, sky-2 `#CFE2FF`, sky-3 `#A9CBFF`, azure `#2563EB`, azure-ink `#1D4FC4`, ember `#FF6B3D`. Daylight gradient `#8DBAF7 → #B6D3FB → #E3EEFD → #F7F9FC`. Potentia warm band `#FFF6EC → #FFE6D2`, text `#6B5446`, link `#B23F18`.
- **Ember (the DEUS orange) has exactly one job: it marks "now".** The current step, the final timeline node, the active tab's progress bar, a live "recording" dot, an approved result. It's never a button fill and never text on white (it's 2.8:1).
- **Buttons:** pills. Primary is ink navy with white text; secondary is white with a hairline border and soft shadow. Links are azure-ink.
- **Navigation order:** **Solutions, Clients, Science, About**, then EN / ID, Contact and the "Request a demo" button. (This differs from `content/en/global.md`, which lists Science before Clients; the owner chose Clients first.) The footer Company column follows the same order: About, Clients, Science, Contact.
- **Hero:** centered headline, lede and two buttons, then the sky window telling **one person's story**: assessed with DEUS Discover → hired → appraised in DEUS Enhance, bonus approved. This is the brand's signature moment.
- **Products:** Enhance is the large lead tile; Discover and Next Chapter sit stacked beside it; Potentia is a full-width warm band, labelled as being for parents and schools, in Bahasa Indonesia.
- **Data moments:** real-looking UI built in code (profile bars, appraisal score, event log, percentile card) instead of screenshots in device frames.
- **Section rhythm:** 144px section padding, centered section header (label pill → H2 → optional lede), 72px to the content.
- **No dot grid, no glows on every section, no mono eyebrows.** The sky gradient is the only atmosphere, used in the hero window and the closing panel.

## What changed from the reference guide (state this in the new guide)

| Reference guide | Daylight |
|---|---|
| Inter ExtraBold + JetBrains Mono | Manrope only, SemiBold headlines |
| Mono uppercase orange eyebrows with a dash | Sentence-case label pill (azure-ink on sky-1) |
| Orange as the main accent and CTA | Navy CTAs; ember marks "now" only |
| Dot grid + periwinkle glows on every section | Plain cloud/white; sky gradient in two places |
| Screenshots in laptop frames | Floating screens and UI cards built in code |
| 10px+ radii, 28px cards | Pills; 16 / 24 / 36px panels |
| Light / Dark / Sky surface modes | Light only: White, Cloud, Sky panel, Warm (Potentia) |

## Answered by the owner (2026-10-14)

1. **No dark sections.** Daylight is light-only on every page, including the assessment and Enhance pages. Don't define a dark surface.
2. **No device frames.** Screenshots float over the sky gradient or a soft sky tile with a deep, soft shadow. A phone frame is allowed only for Potentia's mobile game.
3. **Placeholders.** Keep the patterns (journey timeline, profile bars, appraisal card, event log), and state in the guide that the sample people, scores and dates are illustrative and must be replaced with approved sample data before launch.

## Already aligned to Daylight (no action needed)

These files were updated to match Daylight before this handoff, so treat them as consistent with the guide you're writing:
- `WEBSITE-PLAN.md` (v0.5): surfaces per section (White, Cloud, Sky panel, Warm), §7.1 decisions, §7.2 gaps, fonts (Manrope), nav order, footer, components list.
- `ENHANCE-PAGE-SPEC.md` (v0.2): light surfaces, floating screens, sentence-case eyebrows.
- `content/en/global.md`, `content/en/home.md`, `content/en/enhance.md`, `content/VOICE.md`: nav order, footer bottom row, sentence-case contact bar, eyebrow formatting.

If you find anything else that still assumes the old deck design (mono, orange CTAs, dark nebula, laptop frames), list it at the end of the guide.

## Working rules

- Every value in the guide comes from `c-daylight-v2.html` or is a clearly labelled extrapolation for a component the mockup doesn't show (mark these "extrapolated", as the reference guide does).
- Compute contrast ratios with a script; don't estimate them.
- Write in plain, direct English (follow `content/VOICE.md`). Tables over prose where possible.
- When done, summarize what the guide covers, which components are extrapolated, and the follow-up list.
