# DEUS HCS Website

Bilingual-ready B2B marketing site for DEUS Human Capital Services (deushcs.com), built to generate leads. GitHub repo: https://github.com/gregorykurnia/deushcs-website. Read these before doing any work:

0. `docs/build-plan.md`: how this site is being built, where the process stands, project details (repo, Vercel, Neon, live URL) and the model table snapshot.
1. `IMPLEMENTATION_PLAN.md`: stack, schema, routes, the phase checklists and the model for every task. **Build one task at a time:** check the model and effort against the task's pick (say so and suggest `/model` or `/effort` if they differ), do the task, run the checks, tick it in the plan, commit and push, then stop and tell the owner the next task and its model. Do several tasks in one go only when the owner says so, and stop anyway when the model changes, at the end of a phase, or at anything that needs the owner.
2. `WEBSITE-PLAN.md`: what the site does and why. Source of truth for structure, page content and the open questions (Q1–Q22).
3. `DESIGN-GUIDE.md`: **binding visual rules for every page**. `design-directions/c-daylight-v2.html` is the visual reference. Open it in a browser and match it.
4. `ENHANCE-PAGE-SPEC.md` for the Enhance page; `content/en/*.md`, `content/id/*.md` and `content/VOICE.md` for exact wording. Never invent clients, numbers or quotes beyond `Creating DEUS HCS Website.md`. `ENHANCE-CONTENT.md` is the approved Enhance deck copy and stays untouched.

## Non-negotiables
- Colours only from `src/styles/tokens.css` / the `@theme` block. No raw hex in components. Don't leave shadcn's default styling.
- Every visible string comes from content modules or `messages/*.json`, never hard-coded in components.
- Light only; `noindex` everywhere until Task 7.5.
- Tests run against the Neon `test` branch, never `production`.
- Secrets live in `.env.local` / `.env.test` (gitignored). Never print, commit or copy connection strings into docs.
- Don't add features beyond the plans without asking. Ideas go to the owner first.

## Commit and push after every change (always automatic)
Commit and push to `main` of `origin` (https://github.com/gregorykurnia/deushcs-website) after every change, without asking first, and say what changed in the final message. This includes edits to this file and to the plans. Once Vercel is connected (Task 0.1), a push to `main` deploys to production. So every change goes through these steps before the turn ends:

1. Run `npm run typecheck`, `npm run lint`, `npm run build` and `npm test`. Run `npx playwright test tests/e2e/smoke.spec.ts` too when the change touches pages or the database, plus the spec for each page the change touches. If a check fails because of the change, fix it first. Never commit or push a change that breaks a check.
   - The full Playwright suite is not a per-change gate. Run it before a release, or when the owner asks.
   - A failure from the environment in a flow the change doesn't touch (a dropped database connection, a timeout) is not a blocker. Name the test and the reason in the commit message and the report, then push.
   - Changes to Markdown docs only (plans, guides, content) skip the checks.
2. Check `git status`. Stage only the files you changed, with `git add <paths>`. If the tree holds changes that aren't yours, leave them unstaged and out of the commit. Never stage `.env*`, `.vercel/`, `node_modules/`, `/screenshots/`, `test-results/` or `playwright-report/`.
3. Commit to `main`. The message says what changed and why. End it with the `Co-Authored-By` line for the model that did the work.
4. Check `git log origin/main..main`, because a push sends every unpushed commit. Then push with `git push origin main`.
5. Tell the owner what changed: the files, what each change does, the commit hash, and the Vercel deployment status (once connected).

- A task brief does not change this. Don't hold commits or pushes for approval, even when a brief says to commit locally or wait. Any unpushed commit on `main` gets pushed in the same turn.
- Stop and ask before pushing when a change needs a production migration. Run `npm run db:migrate` (production) only when the owner approves it, and hold the push until it has run, because the live site reads the schema. Migrations go to the `test` branch first (`npm run db:migrate:test`).
- Never force-push and never rewrite published history.
