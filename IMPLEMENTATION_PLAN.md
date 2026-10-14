# DEUS HCS Website: Implementation Plan

**Status:** Draft v0.1 (2026-10-14). Not yet reviewed or approved.

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build deushcs.com as a bilingual-ready marketing site that generates B2B leads (assessment demos, Enhance appraisal-review calls), so sales can send page links instead of PDF decks.

**Architecture:** Next.js App Router with mostly static pages under `/[locale]/…`. Page copy lives in typed content modules per locale, converted from the reviewed Markdown in `content/`. The only dynamic part is the lead form: a Server Action validates with Zod, saves to one Neon `leads` table, then emails a notification. The visual system is Daylight, locked into code through `tokens.css` and a `/styleguide` route before any page is built.

**Tech stack:** Next.js (App Router) + TypeScript, Tailwind CSS v4, shadcn/ui primitives (fully restyled), `next-intl`, Neon Postgres + Drizzle, Zod, Resend, `next/font` (Manrope), `lucide-react`, Vitest, Playwright + `@axe-core/playwright`, GitHub → Vercel.

**Spec (read alongside this plan):**

| File | Role here |
|---|---|
| `WEBSITE-PLAN.md` | Plays the role of the playbook's `PRODUCT_PLAN.md`: what to build, page structure, phases, open questions (Q1–Q22) |
| `DESIGN-GUIDE.md` | Plays the role of `DESIGN_GUIDE.md`. Binding visual rules. Reference rendering: `design-directions/c-daylight-v2.html` (the playbook's `design-preview.html`) |
| `ENHANCE-PAGE-SPEC.md` | Enhance page structure, form fields, screen mapping |
| `content/en/*.md`, `content/id/*.md`, `content/VOICE.md` | Exact wording for every page. Wins on wording; `WEBSITE-PLAN.md` wins on structure |
| `Creating DEUS HCS Website.md` | Facts. Never invent clients, numbers or quotes beyond it |

> **How to build from this plan (for every implementer, human or model):** one task at a time, in order.
> 1. Check your model and effort against the task's pick. If they differ, say so and suggest switching (`/model`, `/effort`) before you start.
> 2. Do that one task, and only that task.
> 3. Run the checks in `CLAUDE.md`.
> 4. Tick the task here, with a one-line note if anything turned out different from the plan.
> 5. Commit and push.
> 6. Stop and report what was done, the commit, and the next task with its model. Wait for the owner.
>
> Do several tasks in one go only when the owner says so (for example "do tasks 3 to 5" or "carry on while the model stays the same"), still ticking, committing and pushing after each. Stop anyway when the next task's model is different, at the end of a phase, or at anything that needs the owner.

---

## Models at a glance

"Minimum viable model" = the cheapest row of the model table (`~/.claude/CLAUDE.md`) that is still safe for that task's risk in this app. Opus 5.5 Low and Sonnet 5.5 Medium are never used (Haiku 5.5 Max beats both). Reasons per task are on each task line in §6; the rules behind them are in §7.

| Kind of work in this project | Pick | Cost / task | Tasks |
|---|---|---|---|
| Things that can lose leads, leak personal data, or break email/production (schema, lead pipeline, domain cutover) | **Opus 5.5 High** | $1.82 | 0.3, 1.2, 7.5 |
| Visual work with no exact reference, or that sets the look for every page (primitives, header, signature components, scroll-sync, Home hero) | **Opus 5.5 High** | $1.82 | 0.5, 0.6, 0.9, 0.10, 1.5, 2.2 |
| Well-specified judgment with tests (content system, first page assembly, privacy text, hreflang logic) | **Opus 5.5 Medium** | $1.34 | 0.8, 1.6, 1.8, 6.4 |
| Following the guide and existing components; config; services; e2e tests; translation | **Sonnet 5.5 High** | $0.88 | most page and test tasks |
| Exact copy (tokens, Markdown → content modules), repeating a built page pattern, small wiring | **Haiku 5.5 Max** | $0.21 | content conversions, short pages, analytics |
| Trivial, fully specified edits and setup | **Haiku 5.5 High** | $0.08 | S0.1, 4.4 |
| Reviews: plan review / end-of-phase review | Opus 5.5 Medium / Opus 5.5 High | | after Step 0 / after each phase |

Rough build cost at the table's per-task prices: about $45–55 for all tasks, plus about $12 for the six end-of-phase reviews. Escalations (§7.6) add to this.

---

## Global constraints

Every task's requirements include these. Values are copied from the spec.

- **Light only.** No dark sections, no dark-mode toggle, no device frames (phone frame only for Potentia's game). Native scrolling, no scroll-jacking. `prefers-reduced-motion` respected.
- **Colours only from `src/styles/tokens.css` / the `@theme` block** (guide §13). Tailwind's default palette is removed (`--color-*: initial`). No raw hex in components.
- **Ember `#FF6B3D` marks "now" only.** Never a button, never text on white. Buttons are navy (`ink`) pills.
- **Manrope only, sentence case everywhere.** No monospace, no all-caps, no bold/italic/colour accents inside headlines.
- **Every visible string comes from content modules or `messages/*.json`**, never hard-coded in components.
- **Never invent** client names, numbers, quotes, certifications. **[VERIFY]** items stay hidden behind `siteFlags` (Task 0.8) until answered; the defaults are `WEBSITE-PLAN.md` §14.
- **WhatsApp:** `+62 823-1212-1660` → `https://wa.me/6282312121660`. **Email:** `admin@deushcs.com`.
- **Potentia links** go to `https://deuspotentia.com`, open in a new tab, show ↗, carry `?utm_source=deushcs.com&utm_medium=referral`; on English pages the label is "Visit Potentia (in Indonesian) ↗".
- **Locales:** `en` and `id`, every route under `/[locale]`, English slugs in both. English ships first (Q1 default).
- **`noindex` everywhere** (meta + `robots.txt`) until Task 7.5.
- **Sample people and scores in UI cards are placeholders** and go on the launch checklist (guide, top note).
- **Placeholder images** are sky tiles with a 15px slate caption "TODO: …" (guide §14.3). Never grey boxes or stock photos.
- **No children's data** is stored by this site.

## Review focus

Five failure modes the spec implies but no page task naturally tests. Each has its test in the owning task.

1. **Indonesian text is 20–30% longer** (plan §6.3): pills, buttons, the mega menu and the mobile sheet must not overflow or wrap badly. Test: Task 0.10 styleguide "long text" toggle + screenshot spec at 390px; Task 6.5 screenshots every page in `id`.
2. **The notification email fails** (Resend down, domain not verified): the lead must still be saved and the visitor must still see success. Test: Task 1.2 `keeps the lead when notification fails`.
3. **Double submit on a slow connection:** the submit button is disabled and shows "Sending…" while pending, so one click makes one row. Test: Task 1.9 `submit button disables while pending`.
4. **A page that doesn't exist in the visited locale** (e.g. `/en/clients/calvin-christian-school` before Phase 6, `/id/solutions/enhance` before Phase 6): redirect to the locale that has it, and the language switch shows that language disabled, not a broken link. Test: Task 0.8 `localesFor` unit test + Task 4.5 e2e.
5. **JavaScript off or slow to hydrate:** reveal animations and the Enhance scroll-synced section must show all content by default (no `opacity: 0` before JS). Test: Task 1.9 runs the Enhance page with `javaScriptEnabled: false` and expects all five step titles and the form visible.

---

## 1. Stack

The playbook's default stack, plus:

| Concern | Choice | Why for this site |
|---|---|---|
| Languages | `next-intl` | Locale routing, message files, `Intl` formatting (plan §6.5) |
| Page content | Typed TS modules per locale in `src/content/{en,id}/` | ~14 pages edited through Claude sessions; type errors catch missing copy. No CMS (plan §10.1) |
| Email | Resend, sending from `notify.deushcs.com` | A subdomain keeps every DNS record off the root domain, so the existing `admin@deushcs.com` mail (MX/SPF) is never touched |
| Accessibility tests | `@axe-core/playwright` | Release check (playbook Step 10) |
| Analytics | Vercel Web Analytics + custom events (Q13 default) | Check the Vercel plan for custom events in Task 7.3 |
| Spam | Honeypot + per-IP rate limit in Postgres | No extra service; Turnstile only if spam appears (plan §8.1) |

Versions pinned to the latest stable at setup and checked against current docs (Context7 or the installed package's docs), especially Next.js (`proxy.ts` vs `middleware.ts`) and `next-intl`.

## 2. Environments and secrets

| Environment | Neon branch | Env vars live in |
|---|---|---|
| Local development | `production` | `.env.local` |
| Automated tests | `test` | `.env.test` |
| Vercel Preview | `test` | Vercel, Preview |
| Vercel Production | `production` | Vercel, Production |

Env vars: `DATABASE_URL` (direct, migrations), `DATABASE_URL_POOLED` (app), `RESEND_API_KEY`, `LEAD_NOTIFY_TO` (default `admin@deushcs.com`, Q15), `LEAD_IP_SALT`, `NEXT_PUBLIC_SITE_URL`, `SITE_INDEXABLE` (`false` until launch). Names only in `.env.example`. Migrations: `npm run db:migrate:test` first; `npm run db:migrate` (production) only with the owner's approval.

## 3. Data

One table, `leads` (`src/db/schema.ts`), from plan §10.2:

| Column | Type | Notes |
|---|---|---|
| `id` | uuid pk, default random | |
| `created_at` | timestamptz, default now, not null | index (desc) |
| `locale` | text not null | `en` / `id` |
| `source_page` | text not null | path the form was on |
| `form_type` | text not null, check in (`contact`, `enhance`) | |
| `product_interest` | text null | `discover` · `next-chapter` · `gba` · `enhance` · `not-sure` |
| `name`, `company`, `email` | text not null | |
| `role`, `whatsapp`, `size`, `message` | text null | |
| `extra` | jsonb not null default `{}` | Enhance: `sites`, `trackingToday`, `nextCycle` |
| `consent_at` | timestamptz not null | |
| `utm_source`, `utm_medium`, `utm_campaign` | text null | |
| `ip_hash` | text not null | sha256(ip + `LEAD_IP_SALT`); for rate limiting only. Index (`ip_hash`, `created_at`) |
| `status` | text not null default `new`, check in (`new`, `contacted`, `closed`) | |

No deletes from the app. No seed data needed beyond what tests insert and clean up themselves.

## 4. Pages and routes

| Route | Content source | Built in | Main guide sections |
|---|---|---|---|
| `/` | redirect by browser language, else `en` | 0.2 | |
| `/[locale]` Home | `content/en/home.md` | 2.2–2.3 | §7.10–7.18, §9.2 |
| `/[locale]/solutions` | `solutions.md` | 2.5 | §7.11 |
| `/[locale]/solutions/game-based-assessment` | `game-based-assessment.md` | 3.3 | §7.10 segmented tabs, §7.16, §7.23, §7.24 |
| `/[locale]/solutions/discover` | `discover.md` | 3.4 | §7.15 |
| `/[locale]/solutions/next-chapter` | `next-chapter.md` | 3.5 | §7.16, §7.24 |
| `/[locale]/solutions/enhance` | `enhance.md` + `ENHANCE-PAGE-SPEC.md` | 1.6 | §7.25, §7.9, §7.23 |
| `/[locale]/science` | `science.md` | 3.6 | |
| `/[locale]/clients` | `clients.md` | 4.3 | §7.20, §7.21 |
| `/[locale]/clients/[slug]` | `clients-telkom-group.md`, `id/clients-calvin-christian-school.md` | 4.2 | §7.21, §7.22 |
| `/[locale]/about` | `about.md` | 2.4 | §7.12 (timeline) |
| `/[locale]/contact` | `contact.md` + `global.md` form | 1.7 | §7.9 |
| `/[locale]/privacy` | drafted in 1.8 | 1.8 | article width |
| `/[locale]/styleguide` | dev and preview only, `notFound()` in production | 0.10 | all |
| 404 / error | `global.md` | 0.10 | §7.27 |

`/clients/projects` is "later" (Q22) and not in this plan.

## 5. Key components and tricky parts

- **Content system (Task 0.8).** `getPageContent(page, locale)` returns the typed module or `null`. `localesFor(page)` drives both the redirect for missing locales and the language switch's disabled state. Markdown in `content/` stays the human-reviewed source; the TS modules are a faithful copy with `> Note:` lines dropped and `[VERIFY]` items wired to `siteFlags`.
- **Scroll-synced product screen (Task 1.5).** Sticky screen on desktop, steps scroll beside it; an `IntersectionObserver` sets the active step; the active step gets the ember marker; screens cross-fade. Below 901px the screen sits inline under each step. With reduced motion or no JS, all steps and their screens are simply visible.
- **Lead pipeline (Task 1.2).** Validate → honeypot → rate limit (5 per `ip_hash` per 10 minutes) → insert → notify. Insert happens **before** email; email failure is logged and swallowed.
- **Floating WhatsApp button (Task 0.7)** hides while the closing contact bar is on screen (`IntersectionObserver`), so there are never two.
- **Prices (Task 3.3).** `formatIDR(69000, 'id')` → `Rp69.000`; `formatIDR(69000, 'en')` → `IDR 69,000` (plan §6.5). `Intl` inserts a non-breaking space after "Rp"; strip it.

---

## 6. Phase task checklists

Every phase ends with: its checks passing, the design review (screenshots at 390 and 1280; light only, because the site has no dark mode) run against guide §12 "Do and don't" and the mockup, the end-of-phase review (**Opus 5.5 High**, because every phase changes pages), and a demo for the owner.

### Before Phase 0: project setup

- [x] **S0.1 Project setup** *(done 2026-10-14; the repo already had the 0.2 scaffold, so the first commit includes it. GitHub linked and pushed early; repo is public. Neon and Vercel still blank in `docs/build-plan.md` until 0.1)* (playbook Step 0): `git init -b main`; `.gitignore` per playbook (plus `.DS_Store`); copy the playbook to `docs/build-plan.md` with Project details and the model-table snapshot; `CLAUDE.md` from playbook Appendix A with these substitutions: `PRODUCT_PLAN.md` → `WEBSITE-PLAN.md`, `DESIGN_GUIDE.md` → `DESIGN-GUIDE.md`, `design-preview.html` → `design-directions/c-daylight-v2.html`, screenshots light only, guide checklist → `DESIGN-GUIDE.md` §12; rename `Reference Enhance Content.md` → `ENHANCE-CONTENT.md` (the name `WEBSITE-PLAN.md` and `ENHANCE-PAGE-SPEC.md` already use); first commit · **Haiku 5.5 High**: the playbook spells out every step; nothing here is judgment.
- [ ] **S0.2 Plan review** (fresh session): check this plan against `WEBSITE-PLAN.md`, `ENHANCE-PAGE-SPEC.md` and `DESIGN-GUIDE.md` per playbook Step 7 "Plan review"; owner approves · **Opus 5.5 Medium**: careful reading against a fixed spec, no visuals.

### Phase 0: Foundation

- [x] **0.1 Connect GitHub, Neon (`production` + `test`) and Vercel** *(ticked 2026-10-14 at the owner's request. Done: GitHub repo; Vercel project linked to it, live at https://deushcs-website.vercel.app/; Neon production database in `.env.local` and Vercel Production (`DATABASE_URL`, `DATABASE_URL_POOLED`). Not done: `test` is a `neondb_test` database, not a branch, and isn't created yet (see 0.3); Vercel Preview has no env vars yet (it should point at the test database).)* (playbook Step 8, steps 1–2 and 4–5 after 0.2) · **Sonnet 5.5 High**: secrets and production settings, but the playbook gives the exact procedure.
- [x] **0.2 Scaffold** *(done 2026-10-14. Differences from plan: Next 16.4 scaffold ships with `cacheComponents` and `partialPrefetching` on, kept, build passes; shadcn on Radix base (`radix-nova`), its generated `globals.css` is replaced in 0.4; `@vitejs/plugin-react`/`jsdom` not installed, unit tests are node-only; `@types/node` bumped to 24 for Vitest 5; `db:generate` fails until `src/db/schema.ts` exists in 0.3; no git repo yet, so nothing committed.)* Next.js + TS + Tailwind v4 + shadcn init + `next-intl` (`src/i18n/routing.ts`, `src/i18n/request.ts`, `src/proxy.ts` or `middleware.ts` per installed Next version), `src/app/[locale]/layout.tsx` with `<html lang={locale}>`, `/` redirect, Vitest, Playwright, npm scripts `typecheck lint build test test:e2e db:generate db:migrate:test db:migrate` · **Sonnet 5.5 High**: config with many version-specific rules; a mistake breaks the build, not data.
  - Produces: `export const locales = ['en', 'id'] as const; export type Locale = (typeof locales)[number]; export const defaultLocale: Locale = 'en'`.
- [x] **0.3 Schema and first migration** *(ticked 2026-10-14 at the owner's request, **migrations not yet run**. Done: schema, `src/db/client.ts` (`getDb()`, Neon HTTP driver, `DATABASE_URL_POOLED`, created on first use), `drizzle/0000_init.sql` (checked on a local PGlite), `tests/db/leads.test.ts` (skips without DB env vars). `.env.local` holds the production URLs (also in Vercel Production); `.env.test` points at a `neondb_test` database in the same project instead of a `test` branch (no Neon login needed); that database is not created yet. Claude Code's auto-mode check blocks Claude from touching the production Neon project, so the owner runs this once, **before Task 1.2**: `npx dotenv -e .env.local -- node -e "require('@neondatabase/serverless').neon(process.env.DATABASE_URL).query('create database neondb_test')" && npm run db:migrate:test && npm test && npm run db:migrate`.)* ((`src/db/schema.ts`, `src/db/client.ts`, `drizzle/0000_*.sql`) per §3; migrate `test`, then `production` with approval · **Opus 5.5 High**: the only table, holding personal data under UU PDP; a bad production migration loses leads.
  - Test: `tests/db/leads.test.ts` `inserts and reads back a lead on the test branch`; `rejects form_type 'other'` (check constraint).
- [x] **0.4 Tokens** *(done 2026-10-14. Differences from plan: Manrope loads 400, 500, 600 and 700, as DESIGN-GUIDE.md §3.1 specifies (this line says 600 and 700); `tokens.css` is imported from the root layout, because §13 doesn't say where it goes; Geist is removed from the layout.)*: `src/styles/tokens.css` = guide §13.1 verbatim; `src/app/globals.css` = guide §13.2 verbatim; Manrope 600/700 via `next/font` as `--font-manrope` · **Haiku 5.5 Max**: verbatim copy of two code blocks.
- [x] **0.5 Primitives** *(done 2026-10-14. Differences from plan: files are kebab-case, as shadcn names them: `button`, `text-link`, `pills` (`LabelPill`, `Tag`, `Chip`), `section-header` (plus `HeadingLines`), `section`, `container`, `floating-card` (plus `FloatingCardKey`, `FloatingCardTitle`, `DataBar`), `placeholder`, `reveal`; shadcn's default button is replaced, and `src/i18n/navigation.ts` adds the locale-aware `Link`. `cn` (`src/lib/utils.ts`) now knows the theme names, because otherwise `cn("text-h2", "text-ink")` drops the size. `Button` has `primary`/`secondary`/`text`, sizes `md`/`sm`/`icon` and `busy` (spinner, `aria-busy`, disabled). **For the styleguide sign-off:** `Container` keeps the gutters inside the max width, as the mockup's `.wrap` does, so desktop content is 1104px wide (guide §4.1's text reads as 1200px plus gutters; the mockup wins until the owner says otherwise). `Reveal` hides only elements still below the fold, and only from script; full-page screenshot specs must scroll first or use `reducedMotion: 'reduce'`, or revealed sections come out blank. 42px buttons and chips get an invisible hit area of at least 44px. Tests: `tests/unit/cn.test.ts`, `primitives.test.tsx`.)* in `src/components/ui/`: `Button` (primary/secondary/text, guide §7.5), `TextLink` (§7.6), `LabelPill`, `Chip`, `Tag` (§7.7), `SectionHeader` (§7.8), `Section` (`surface: 'white' | 'cloud' | 'sky-wash'`), `Container`, `FloatingCard` (§7.13), `Placeholder` (§14.3), `Reveal` (§9.3, content visible without JS) · **Opus 5.5 High**: every page is built from these; drift here repeats everywhere.
- [x] **0.6 Header** *(done 2026-10-14. Differences from plan: each page renders `<Header cta ctaHref available />` itself instead of the layout, because the CTA and the available locales are per page (`cta: 'demo' | 'trial' | 'call'`, default `ctaHref` `/contact`). Extra files: `Brand.tsx`, `HeaderFrame.tsx` (scroll state), `ContactLink.tsx`, `nav.ts` (keys, routes, `activeSection`), `language-options.ts`. `src/lib/links.ts` (`whatsappHref`, `potentiaHref`, `emailHref`) is built now with 0.8's tests, because the menus need it. Header strings are in `messages/en.json` (`Header`, `LanguageSwitch`, `Common`); `messages/id.json` is a copy of the English until Phase 6. Radix closes the mega menu 150ms after the pointer leaves (the guide says 200ms; Radix doesn't let you change it). Below 480px the wordmark hides when the CTA is a long page-specific one ("Book a 30-minute call" ran into it at 390px), and below 360px it always hides. Between 901 and 1100px the nav links use 14px side padding, and the pill gives up exact centring before anything overlaps. The language switch's unavailable state reads "Bahasa Indonesia (not available for this page yet)" to screen readers (new string, owner to confirm). Logo is the 157px PNG in `public/assets/` until the SVG arrives. Tests: `tests/e2e/header.spec.ts` (8), `tests/unit/{nav,language-options,links}.test.ts`, `language-switch.test.tsx`.)* (`src/components/site/Header.tsx`, `MegaMenu.tsx`, `MobileMenu.tsx`, `LanguageSwitch.tsx`), guide §7.1–7.4: transparent → white 72% + blur + hairline on scroll; active link filled navy; page-specific CTA prop; mega menu and mobile sheet keyboard and focus-trap correct; language switch takes `available: Locale[]` and renders unavailable ones disabled · **Opus 5.5 High**: mega menu and mobile sheet are extrapolated (not in the mockup) and set the first impression of every page.
- [x] **0.7 Footer, ClosingPanel + contact bar, floating WhatsApp** *(done 2026-10-14. Differences from plan: like the header, each page renders `<Footer available />`, `<ClosingPanel … />` and `<WhatsAppButton context />` itself, because the languages, closing copy and WhatsApp message are per page; the Contact and Privacy pages leave out the closing panel, and Contact leaves out the button. Footer "Company" column follows the nav order (Clients, Science, About, Contact), as guide §7.19 says, not the About-first order in `global.md`; owner to confirm. The footer's language links are a new `names` variant of `LanguageSwitch`, with its own label ("Language options in the footer", so the header's "Language" navigation stays unique). New strings in `messages/en.json` (`Footer`, `Closing`, `WhatsAppButton`; `id.json` is a copy until Phase 6). The footer links to `/privacy` before Task 1.8 creates it, and the address stays out until confirmed. `whatsapp_click` and `email_click` events are wired in Task 7.3. Extra file: `whatsapp-icon.tsx`. The button is `inert` and faded while the contact bar is on screen; its tooltip hides below 901px (no hover). The scaffold home page renders all three until Phase 2. Tests: `tests/e2e/closing-footer.spec.ts` (including `WhatsApp button hides when the contact bar is visible`, so 0.13 only needs to run it); header spec selectors scoped to `header`.)* (`Footer.tsx`, `ClosingPanel.tsx`, `WhatsAppButton.tsx`), guide §7.18, §7.19, §7.26 · **Sonnet 5.5 High**: footer and closing panel are in the mockup; the WhatsApp button is small and fully specified.
- [x] **0.8 Content system and link helpers** *(done 2026-10-14. Differences from plan: no `src/content/en/global.ts`; every `global.md` string is in `messages/en.json` (new: `ContactForm`, `ClientStoryCard`, `NotFound`, `Error`), because components read them, some on the client, and a second copy would drift. So Task 1.1 only checks the contact-form strings. `types.ts` has the shared blocks (`PageMeta`, `Heading`, `Cta`, `SectionIntro`, `Item`, `FaqItem`, `ClosingContent`) and gives every page `PageContentBase` (`meta`) for now; each page's content task (1.1, 2.1, …) adds that page's full type there and registers its module in `registry.ts`. Extra: `createRegistry()` (so the tests use fixture modules: no page module exists yet, so the real `localesFor('enhance')` is `[]` until 1.1), `resolvePage()` and `pagePaths`, and `src/content/load-page.ts` `loadPage(page, locale)`, which page routes call to get `{ content, available }`, with the `notFound()`/redirect handled. `siteFlags.replyTime` is typed `string | null`; the form uses `ContactForm.success.bodyWithReplyTime` once it is set. Form option keys match the `product_interest` values in §3. Tests: `tests/unit/{registry,format}.test.ts`. The DB tests still fail until the owner creates `neondb_test` (see 0.3).)* · **Opus 5.5 Medium**: the interface every page task depends on; well specified and unit-tested.
  - *Already done in 0.6:* `src/lib/links.ts` with `whatsappHref`, `potentiaHref` and `emailHref`, tested in `tests/unit/links.test.ts`. Header and language-switch strings are in `messages/en.json`; add the rest of `global.md` to them.
  - Files: `src/content/types.ts`, `src/content/registry.ts`, `src/content/flags.ts`, `src/content/en/global.ts`, `messages/en.json` (from `content/en/global.md`), `src/lib/links.ts`, `src/lib/format.ts`.
  - Produces:
    - `getPageContent<K extends PageKey>(page: K, locale: Locale): PageContent<K> | null`
    - `localesFor(page: PageKey): Locale[]`
    - `siteFlags = { showLogoWall: false /*Q8*/, telkomNamed: false /*Q7*/, publishCalvin: false /*Q11*/, showAddress: false /*Q9*/, showLeadership: false /*Q10*/, showBetterTogether: false /*Q19*/, replyTime: null /*contact success*/ } as const`
    - `whatsappHref(context: 'default' | 'assessment' | 'enhance'): string`
    - `potentiaHref(path?: string): string`
    - `formatIDR(amount: number, locale: Locale): string`
  - Tests (`tests/unit/links.test.ts`, `format.test.ts`, `registry.test.ts`):
    - `whatsappHref('enhance')` === `'https://wa.me/6282312121660?text=' + encodeURIComponent('Halo DEUS, saya ingin tahu lebih lanjut tentang DEUS Enhance.')`
    - `potentiaHref('/daftar/institusi')` === `'https://deuspotentia.com/daftar/institusi?utm_source=deushcs.com&utm_medium=referral'`
    - `formatIDR(69000, 'id')` === `'Rp69.000'`; `formatIDR(69000, 'en')` === `'IDR 69,000'`
    - `localesFor('enhance')` equals `['en']` until Phase 6; a page key with no module returns `[]`
  - Page routes call `notFound()` when `localesFor(page)` is empty and `redirect()` to the first available locale when the visited one is missing.
- [x] **0.9 Signature display components** *(done 2026-10-14. Differences from plan: extra `DataCards.tsx` (the four §7.13 cards: `PlayCard`, `ProfileCard`, `AppraisalCard`, `ResultCard`), which the timeline and tabs need; `JourneyTimeline.tsx` also exports `MilestoneTimeline`, the About variant (§7.12), so Task 2.4 only reuses it; `ProductTile.tsx` adds `ProductGrid`, `GameTile.tsx` adds `GameGrid` (`spotlight` / `list`), `StatReadout.tsx` exports `StatTiles`, `StatReadout` (big numbers) and `ProofRow`; `PotentiaBand.tsx` exports `PotentiaArt` and `WarmChip`, shared with the Potentia tile; `LiveDot.tsx` is the pulsing recording dot. New helpers: `src/components/ui/rich.tsx` (`**bold**` in copy → `<b>`), `src/content/images.ts` (screens and sizes; alt text comes from content). The mockup's screenshots are copied to `public/assets/`. Motion is CSS in `globals.css` (`journey-*`, `tab-progress`, `live-dot`): the journey plays once on load; the tab bar's own animation is the 7s timer, paused on hover, focus and off screen, stopped once the visitor picks a tab; with reduced motion or before script, the bar shows full and nothing moves. On phones the journey keeps a date row above each card (the guide's recommended addition). Three-column Why panels keep the icon above the text. The Potentia band is a 24px-radius warm panel in the content width and takes `lang="id"`. New strings: `Timeline.current`, `DataTable.yes/no`. Tests: `tests/unit/blocks.test.tsx`, `tests/e2e/styleguide.spec.ts`.)* in `src/components/blocks/`: `ProductTile` (§7.11), `JourneyTimeline` (§7.12), `WhereWeHelpTabs` (§7.10, 7s dwell, ember progress bar), `EventLog` (§7.14), `StatReadout` (§7.15), `GameTile` (§7.16), `WhyPanel` (§7.17), `PotentiaBand` (§2.3), with the two orchestrated motions from §9.2 · **Opus 5.5 High**: these are the Daylight signature moments; matching the mockup takes the best Presentation rank.
- [x] **0.10 Interactive and extrapolated controls, `/styleguide`, 404 and error pages** *(done 2026-10-14. Differences from plan: the FAQ `Accordion` is native `<details>`, not Radix: it works without JavaScript, answers stay in the HTML, several can be open, and find-in-page opens the right one; the height animates where the browser supports `::details-content`. Form controls are `ui/field.tsx` (`Field`, `Input`, `Textarea`, `Select`; a Field wires its label, hint and error to the control), `ui/checkbox.tsx`, `ui/choice-chips.tsx` (native radios drawn as chips) and `ui/form-status.tsx` (`FormError`, `SuccessPanel`), all native inputs so the form posts without script. `SegmentedTabs` is Radix Tabs with every panel kept in the HTML. `DataTable` `mobile: 'scroll' | 'cards'`; `cards` renders a separate phone list. `/styleguide` shows in development, on previews **and on production until launch** (it 404s on production once `SITE_INDEXABLE=true`), because Phase 0's Done-when needs the owner to open it on the Vercel URL, which is production; it is always `noindex`. The long-text toggle is `?long=1`; its strings are draft Indonesian in `src/content/styleguide.ts`, for the length test only, never page copy. 404: `[locale]/not-found.tsx` plus a `[locale]/[...rest]` catch-all; paths with a file extension (outside the proxy) still get Next's plain 404. `error.tsx` uses Next 16's `retry()`. Shared panel: `site/StatusPanel.tsx`. **For the owner's sign-off:** fields use the 3:1 border (§2.6) rather than the mockup's softer hairline; buttons never wrap at 390px in either text length. Tests: `tests/e2e/styleguide.spec.ts` (11, including an axe scan with no serious or critical issues), `tests/unit/blocks.test.tsx`.)*: form controls (§7.9: input, select, textarea, checkbox; focus, error, success, loading, disabled), `SegmentedTabs` (§7.10), `Accordion` (§7.23), `DataTable` with mobile layout (§7.24); `src/app/[locale]/styleguide/page.tsx` renders every component with a "long text" toggle that swaps in strings 30% longer; `not-found.tsx`, `error.tsx` (§7.27) · **Opus 5.5 High**: all extrapolated with no mockup reference, and the owner signs the look off here.
- [ ] **0.11 Story pieces**: `StoryCard`, `LinkCard`, `QuoteCard`, `LogoWall` (§7.20–7.22) added to the styleguide · **Sonnet 5.5 High**: extrapolated, but fully specified in the guide and composed from 0.5 primitives; the styleguide sign-off catches drift.
- [ ] **0.12 Metadata base, icons, noindex, live-app setup**: `src/lib/metadata.ts` `pageMetadata({ title, description, locale, path }): Metadata` (title pattern `<Page> | DEUS Human Capital Services`); favicon and app icon from the logo tile (§7.29; placeholder until the SVG arrives); `robots.ts` disallow-all and `noindex` meta while `SITE_INDEXABLE !== 'true'`; Vercel spend limit, Neon usage limit, observability on, one rollback tried on a preview (§10) · **Sonnet 5.5 High**: production settings with a clear checklist.
- [ ] **0.13 Smoke e2e** (`tests/e2e/smoke.spec.ts`): `/en`, `/id` shells, `/en/styleguide`, a 404 path render; header, footer, WhatsApp button present; `GET /robots.txt` disallows all; WhatsApp-hides test from 0.7 · **Sonnet 5.5 High**: e2e tests follow a pattern, little damage if wrong.
- **Done when:** the Vercel URL loads `/en` and `/id` shells and `/styleguide`; the smoke test passes locally and live; the owner signs off the styleguide against `DESIGN-GUIDE.md` and `c-daylight-v2.html`.

### Phase 1: Enhance + Contact

- [ ] **1.1 Content modules** `src/content/en/enhance.ts`, `src/content/en/contact.ts`, and the contact-form strings in `messages/en.json`, copied from `content/en/enhance.md`, `contact.md`, `global.md` (§10 hidden by `showBetterTogether`; FAQ items 8–11 omitted) · **Haiku 5.5 Max**: exact copy into types defined in 0.8.
- [ ] **1.2 Lead pipeline** · **Opus 5.5 High**: the site's one conversion path and its only personal data; a lost lead or a leaked one is the worst outcome this site can have.
  - Files: `src/lib/leads/schema.ts`, `src/lib/leads/actions.ts`, `src/lib/leads/notify.ts`, `src/lib/leads/rate-limit.ts`.
  - Produces: `contactLeadSchema`, `enhanceLeadSchema` (Zod; field lists from `global.md` "Contact form" and `ENHANCE-PAGE-SPEC.md` §11); `type LeadFormState = { status: 'idle' | 'success' | 'error'; fieldErrors?: Partial<Record<LeadField, MessageKey>>; formError?: MessageKey }`; `submitLead(prev: LeadFormState, formData: FormData): Promise<LeadFormState>`; `sendLeadNotification(lead: Lead): Promise<void>` (subject `New lead: <form_type> · <company>`).
  - Tests (`tests/leads/submit.test.ts`, against `test`):
    - `rejects an invalid email` → `fieldErrors.email === 'form.errors.email'`
    - `requires consent` → `fieldErrors.consent === 'form.errors.consent'`
    - `honeypot filled` → `status: 'success'`, no row inserted
    - `sixth submission from one ip in 10 minutes` → `formError === 'form.errors.server'`, no sixth row
    - `saves an Enhance lead` → row with `form_type: 'enhance'`, `extra.sites === '2-5'`, `consent_at` set, `utm_source` saved
    - `keeps the lead when notification fails` (notify mocked to throw) → row exists, `status: 'success'`
- [ ] **1.3 Resend on `notify.deushcs.com`**: owner adds the DNS records Resend lists **for the subdomain only**; env vars in Vercel; a real test email reaches `admin@deushcs.com` · **Sonnet 5.5 High**: touches live DNS; the subdomain rule keeps root MX/SPF safe, and the steps are fixed.
- [ ] **1.4 `LeadForm`** (`src/components/forms/LeadForm.tsx`, `variant: 'contact' | 'enhance'`, `defaultProduct?: ProductInterest`): `useActionState(submitLead)`, hidden honeypot, hidden `source_page`/`locale`/UTM fields from the URL, pending state "Sending…" with the button disabled, field errors, success panel with WhatsApp link · **Sonnet 5.5 High**: built from 0.10 controls with the spec's exact fields.
- [ ] **1.5 `ScrollSyncedScreen`** (`src/components/blocks/ScrollSyncedScreen.tsx`), guide §7.25, behaviour in §5 above · **Opus 5.5 High**: the most complex interactive piece on the site, with no mockup reference.
- [ ] **1.6 Enhance page** (`src/app/[locale]/solutions/enhance/page.tsx`): sections per `ENHANCE-PAGE-SPEC.md` "Page at a glance"; header CTA "Book a 30-minute call"; WhatsApp context `enhance`; SEO title/description from the spec; JSON-LD `SoftwareApplication` + `FAQPage`; placeholders for the missing `assets_enhance/` screens · **Opus 5.5 Medium**: the first full page sets the page-file pattern every later page copies, and it's the page sales sends first.
- [ ] **1.7 Contact page** (`src/app/[locale]/contact/page.tsx`): `?product=` preselects (unknown values ignored); side column WhatsApp, email, address hidden by `showAddress`, Potentia note · **Sonnet 5.5 High**: a short page from built pieces. **§7.5 calibration task:** also build it with Haiku 5.5 Max on a throwaway branch, compare, record the result in §7.5.
- [ ] **1.8 Privacy policy draft** (`src/content/en/privacy.ts`, `src/app/[locale]/privacy/page.tsx`): what's collected (the `leads` columns, including the hashed IP), why, how long, who sees it, deletion requests, contact; flagged for the team's counsel · **Opus 5.5 Medium**: legal text under UU PDP No. 27/2022 must match what the code actually stores; counsel approves.
- [ ] **1.9 Phase e2e** (`tests/e2e/enhance.spec.ts`, `contact.spec.ts`): Enhance form submit → row in `test` DB, success shown; `submit button disables while pending`; `/en/contact?product=enhance` preselects Enhance; Enhance with `javaScriptEnabled: false` shows all five step titles and the form; screenshots 390/1280 · **Sonnet 5.5 High**: e2e pattern from 0.13.
- **Done when:** a test inquiry from the Enhance page lands in Neon and arrives at admin@deushcs.com; sales can send the Enhance link.

### Phase 2: Home + About + Solutions overview

- [ ] **2.1 Content modules** `home.ts`, `about.ts`, `solutions.ts` from `content/en/` · **Haiku 5.5 Max**: exact copy.
- [ ] **2.2 Home: hero and "From hire to reward"** (sections 1 and 4 of `home.md`): centred H1, sky window with `JourneyTimeline` and floating cards, `WhereWeHelpTabs` swapping product screens · **Opus 5.5 High**: the mockup's two orchestrated moments; Home is judged against the mockup pixel for pixel.
- [ ] **2.3 Home: remaining sections** (logos/40+ brands with `showLogoWall`, why we exist, solutions tiles, spotlights, Why DEUS, industries and recognition, Potentia band with `potentiaHref`, closer) · **Sonnet 5.5 High**: assembles components from 0.9 and 0.11.
- [ ] **2.4 About** (`about/page.tsx`): mission, vision and mission panels, 6 I's grid, timeline 2022→2026 with ember "now" node, recognition, leadership hidden by `showLeadership`, company details · **Sonnet 5.5 High**: reuses `JourneyTimeline`; one new 3×2 grid.
- [ ] **2.5 Solutions overview** · **Haiku 5.5 Max**: a short index of cards that already exist.
- [ ] **2.6 "Coming soon" panel** for routes not built yet (GBA, Discover, Next Chapter, Science, Clients), so every Home link resolves · **Haiku 5.5 Max**: one small block reused on placeholder pages.
- [ ] **2.7 Phase e2e** (`tests/e2e/home.spec.ts`): every internal link on Home returns 200; every Potentia link has `target="_blank"` and the UTM query; screenshots · **Sonnet 5.5 High**.
- **Done when:** every Home link resolves; Home, About and Solutions pass the design review.

### Phase 3: Assessments

- [ ] **3.1 Content modules** `game-based-assessment.ts`, `discover.ts`, `next-chapter.ts`, `science.ts` · **Haiku 5.5 Max**: exact copy.
- [ ] **3.2 Assets**: export the owner's screenshots into `public/assets/` (AVIF/WebP via `next/image`), list missing ones as placeholders · **Haiku 5.5 Max**: file handling against the list in guide §14.
- [ ] **3.3 GBA page**: 15 sections per plan §5.3; Reports `SegmentedTabs` with auto-scrolling tall screenshots; pricing "Starting from" with `formatIDR` (Q5 default); FAQ with `FAQPage` JSON-LD; header CTA "Request a free trial"; WhatsApp context `assessment` · **Sonnet 5.5 High**: the longest page, but all from built components; the auto-scroll report is the only new behaviour.
- [ ] **3.4 Discover page** · **Haiku 5.5 Max**: repeats the GBA page pattern with fewer sections.
- [ ] **3.5 Next Chapter page**: sticky pill sub-nav for the three modules, game grids, miss/gain columns, use-case × module matrix with `DataTable` mobile layout · **Sonnet 5.5 High**: the sticky sub-nav is new on this page.
- [ ] **3.6 Science page** · **Haiku 5.5 Max**: text panels and a 4-step timeline already built.
- [ ] **3.7 Phase e2e + screenshots** for the four pages; Reports tabs switch by keyboard · **Sonnet 5.5 High**.
- **Done when:** all four pages pass review with real screenshots (or marked placeholders the owner accepts).

### Phase 4: Clients

- [ ] **4.1 Content modules** `clients.ts`, `stories/telkom-group.ts` (named and anonymised variants, chosen by `telkomNamed`: anonymised = "a national telecom group", no photo, no names, no "Graha Merah Putih"), `id/stories/calvin-christian-school.ts` (behind `publishCalvin`) · **Sonnet 5.5 High**: the anonymised variant must not identify Telkom; that's a permission risk, not a copy job.
- [ ] **4.2 Story template** `src/app/[locale]/clients/[slug]/page.tsx` + `src/content/stories/index.ts` registry (`getStory(slug, locale)`, `storySlugs()` for `generateStaticParams`), parts per plan §5.8 · **Sonnet 5.5 High**: one template every future story uses, from 0.11 pieces.
- [ ] **4.3 Clients hub** · **Haiku 5.5 Max**: hero, logo wall (flagged), industries, story cards.
- [ ] **4.4 Link cards** on Home and GBA pointing to the Telkom story (label per `telkomNamed`) · **Haiku 5.5 High**: two inserts of an existing component.
- [ ] **4.5 Phase e2e**: `/en/clients/calvin-christian-school` redirects to `/id/…` (when published); its EN switch is disabled; hidden stories return 404 · **Sonnet 5.5 High**.
- **Done when:** both stories are live (or held/anonymised until permission), and every link card points to them.

*(Phase 5, Potentia, was removed in plan v0.4: Potentia lives on deuspotentia.com.)*

### Phase 6: Second language

- [ ] **6.1 Indonesian: global strings + Enhance** (`messages/id.json`, `src/content/id/enhance.ts`), starting from the drafts in the brief and `ENHANCE-PAGE-SPEC.md`, using the glossary (plan §6.4) and "Anda" (VOICE) · **Sonnet 5.5 High**: many language rules; a native reviewer approves before it goes live.
- [ ] **6.2 Indonesian: one task per remaining page** (home, about, solutions, contact, privacy, gba, discover, next-chapter, science, clients, telkom) · **Sonnet 5.5 High**; after two pages, try one page (About, whose values and mission already exist in Indonesian) on **Haiku 5.5 Max** and keep it for the rest if the reviewer finds no extra issues.
- [ ] **6.3 English Calvin story** · **Sonnet 5.5 High**.
- [ ] **6.4 Locale SEO logic**: `hreflang` alternates + `x-default` from `localesFor`, `sitemap.ts` with alternates, Indonesian-browser detection to `/id` · **Opus 5.5 Medium**: small but tricky logic, unit-tested: `alternates('enhance')` lists both locales only once `id` exists.
- [ ] **6.5 Phase e2e + screenshots** of every page in both locales at 390/1280; language switch keeps the path · **Sonnet 5.5 High**.
- **Done when:** every page exists in both locales, reviewed by a native speaker, and the switch works on every page.

### Phase 7: Launch

- [ ] **7.1 SEO**: per-page, per-locale metadata via `pageMetadata`; JSON-LD `Organization` (legalName PT Investama Persada Kurnia), `SoftwareApplication` per product, `BreadcrumbList` · **Sonnet 5.5 High**.
- [ ] **7.2 Open Graph images** from the guide §7.28 template with `next/og` and Manrope TTF · **Sonnet 5.5 High**: specified template, one image per page.
- [ ] **7.3 Analytics**: `src/lib/analytics.ts` `track(event: 'cta_click' | 'whatsapp_click' | 'email_click' | 'form_submit' | 'language_switch' | 'outbound_click', props)`, wired at each call site (plan §8.4) · **Haiku 5.5 Max**: a fixed list wired at known places.
- [ ] **7.4 Release checks**: full Playwright, axe scan (no serious/critical), Lighthouse mobile ≥ 90 on Home and Enhance (LCP < 2.5s), `/security-review`, placeholder sample data replaced with approved data · **Sonnet 5.5 High** runs and triages; fixes go by tier.
- [ ] **7.5 Domain cutover** (domain and DNS at Hostinger, replacing a WordPress site there, Q16): before the switch, back up WordPress (Hostinger backup + content/media export) and list its URLs; record every existing DNS record first; edit records in Hostinger's DNS zone, never change nameservers; point web records (`@` and `www` A/CNAME) at Vercel only; MX, SPF, DKIM and DMARC untouched; send and receive a test email at admin@deushcs.com after the switch; redirects from the old WordPress URLs to the new pages; set `SITE_INDEXABLE=true`; keep the WordPress hosting for a few weeks as the rollback (restore the old A/CNAME records) · **Opus 5.5 High**: the one step that can take down the company's email.
- **Done when:** deushcs.com serves the new site, email still works, Lighthouse ≥ 90 on mobile for Home and Enhance.

---

## 7. Who builds it, and how

### 7.1 Project profile

- **What can do real damage:** the lead form and `leads` table (lost leads cost sales; names, emails and phone numbers fall under UU PDP); DNS for deushcs.com, which also carries the company's email; publishing client names, photos or quotes without permission (Telkom, Calvin Christian School).
- **What is visually demanding:** the Daylight primitives and header (every page inherits them); the Home hero journey and "From hire to reward" tabs (the two orchestrated moments); the Enhance scroll-synced screen; every component the guide marks "extrapolated".
- **What is new or unusual:** locale-aware page availability (pages ship in one language first); a scroll-synced product screen; rate limiting in Postgres without an extra service.
- **What is routine and repetitive:** copying reviewed Markdown into typed modules; product pages after the first (GBA → Discover → Science); translations after the first two pages.

### 7.2 Tier list for this app

| Kind of work | Row | Reason |
|---|---|---|
| Schema, lead pipeline, domain cutover | Opus 5.5 High | Data loss, privacy, email outage |
| Look-setting and extrapolated visuals | Opus 5.5 High | Best Presentation rank; no exact reference |
| Interfaces other tasks depend on, legal text, SEO logic | Opus 5.5 Medium | Well specified and testable; mistakes are costly but don't lose data |
| First full page | Opus 5.5 Medium | Sets the page pattern; later pages drop to Sonnet/Haiku |
| Pages from built components, config, services, e2e, translation | Sonnet 5.5 High | Many rules, low damage |
| Exact copy, repeat pages, small wiring | Haiku 5.5 Max | Cheapest reliable |
| Fully specified trivial edits | Haiku 5.5 High | Nothing to decide |

### 7.3 Per-task picks
On every task line in §6.

### 7.4 One task at a time
The rule at the top of this plan.

### 7.5 Calibration trial
Task 1.7 (Contact page): Sonnet 5.5 High vs Haiku 5.5 Max, compared with `/cost` and screenshots. Result: *(fill in)*.

### 7.6 Escalation log
A task moves up one row the first time a cheaper model gets it wrong twice; later tasks of that kind start at the higher row. *(none yet)*

---

## 8. Testing and verification

| Level | Tool | Covers |
|---|---|---|
| Unit | Vitest | link helpers, `formatIDR`, content registry, Zod schemas |
| Database | Vitest against Neon `test` | `leads` constraints, `submitLead` end to end (notify mocked) |
| End to end | Playwright | smoke; each phase's Done-when; no-JS Enhance; locale redirects |
| Visual | Playwright screenshots | every changed page at 390 and 1280 (both locales from Phase 6) |
| Accessibility | `@axe-core/playwright` | release check, plus the styleguide in Phase 0 |
| Manual | Owner | styleguide sign-off, each phase demo, a real phone before launch |

## 9. Project structure

```
src/
  app/[locale]/              one folder per route in §4, plus styleguide/
  app/robots.ts, sitemap.ts
  components/ui/             primitives (0.5, 0.10)
  components/site/           Header, Footer, ClosingPanel, WhatsAppButton
  components/blocks/         signature + story components (0.9, 0.11, 1.5)
  components/forms/          LeadForm
  content/types.ts, registry.ts, flags.ts
  content/en/, content/id/, content/stories/
  db/schema.ts, client.ts
  i18n/routing.ts, request.ts
  lib/links.ts, format.ts, metadata.ts, analytics.ts, leads/
  styles/tokens.css
messages/en.json, id.json
drizzle/                     SQL migrations
public/assets/
tests/unit, tests/db, tests/leads, tests/e2e
content/ (root)              the reviewed Markdown copy, kept as the human source
```

## 10. Running the live app

- **Backups:** Neon's restore window on the owner's plan; leads are also in admin@deushcs.com via notifications.
- **Error alerts:** Vercel logs and observability; lead-notification failures logged with the lead id. The owner checks weekly until launch.
- **Spending limits:** Vercel spend management on; Neon usage limit set; Resend free tier.
- **Rollback:** Vercel instant rollback, tried once on a preview in 0.12. Migrations stay backward compatible for one release.
- **Search engines:** `noindex` + disallow-all until Task 7.5.

## 11. Not decided yet

Full list and defaults in `WEBSITE-PLAN.md` §14. The ones that change tasks here:

| Item | Blocks | Default if unanswered |
|---|---|---|
| Q1 first language | 1.1 onward | English first |
| Q4 "Next Chapter" public name | 3.5 route | Public name, `/solutions/next-chapter` |
| Q5 public pricing | 3.3 | "Starting from Rp69.000 per candidate" |
| Q7 Telkom permission | 4.1, 4.4 | Anonymised |
| Q8 logo wall | 2.3, 4.3 | Hidden; "40+ brands" + industries |
| Q11 Calvin permission | 4.1 | Story held |
| Q15 lead recipients | 1.2 | admin@deushcs.com only |
| Q16 current site / DNS owner | 7.5 | **Answered:** WordPress on Hostinger, domain at Hostinger. Still open: where the mail is hosted |
| Q19 assessments feed Enhance? | 1.6 §10 | Hidden |

## 12. Things the owner does

| When | Action |
|---|---|
| Before S0.2 | Read this plan; answer Q1, Q2, Q4, Q5 if possible |
| Before Phase 0 | Send the empty GitHub repo URL and the Neon project; run `! neon login` and `! vercel login` |
| Phase 0 | Send the logo as SVG; approve the production migration; sign off `/styleguide` |
| Phase 1 | Add Resend's DNS records for `notify.deushcs.com`; send the `assets_enhance/` screens; get counsel to review the privacy text |
| Phase 2 | Send the Potentia logo and one character illustration |
| Phase 3 | Send GBA deck screenshots (slides 7–19, 26) at high resolution |
| Phase 4 | Confirm Telkom and Calvin Christian School permissions |
| Phase 6 | Name the native Indonesian reviewer (Q14) and review each page |
| Phase 7 | Give DNS access; approve approved sample data; check the site on a real phone |
| End of every phase | Demo and sign-off |
