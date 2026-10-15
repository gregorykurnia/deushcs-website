# DEUS HCS Website

Bilingual-ready B2B marketing site for DEUS Human Capital Services (deushcs.com), built to generate leads. GitHub repo: https://github.com/gregorykurnia/deushcs-website. Read these before doing any work:

0. `docs/build-plan.md`: how this site is being built, where the process stands, project details (repo, Vercel, Neon, live URL) and the model table snapshot.
1. `IMPLEMENTATION_PLAN.md`: stack, schema, routes, the phase checklists and the model for every task. **Build one task at a time:** check the model and effort against the task's pick (say so and suggest `/model` or `/effort` if they differ), do the task, run the checks, tick it in the plan **and in `LANES.md`**, commit and push, then stop and tell the owner the next task with its model and effort.
   - `LANES.md`: which lane (terminal) builds which task, in what order, with which model and effort. A lane takes its next task from its own list there. Do several tasks in one go only when the owner says so, and stop anyway when the model changes, at the end of a phase, or at anything that needs the owner.
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

## Branches and lanes: work goes to `staging`, releases go to `main`
- `main` is production: Vercel deploys every push to `main` (the live URL is in `docs/build-plan.md`). It only moves in a **release**, when the owner says "release", "ship it", "go live" or "push to main". Never commit on `main`.
- `staging` is where finished work collects. Vercel ignores it (`vercel.json` turns its deployments off), so nothing goes live. The main folder, `~/projects/deushcs-website`, has `staging` checked out.
- Three **lanes** let work run in parallel, each in its own terminal. A lane is a git worktree with its own branch. Vercel ignores `phase-*` branches too.

  | Folder | Branch | Lane | E2E port |
  |---|---|---|---|
  | `~/projects/deushcs-website-p1` | `phase-1-enhance` | Phase 1: Enhance + Contact | 3101 |
  | `~/projects/deushcs-website-p2` | `phase-2-home` | Phase 2: Home + About + Solutions | 3102 |
  | `~/projects/deushcs-website-p3` | `phase-3-assessments` | Phase 3: Assessments | 3103 |

  The E2E port comes from the folder name (`playwright.config.ts`), so lanes can run Playwright at the same time. Each lane's task list, with the model and effort for every task, is in `LANES.md`. Later phases are assigned there too; the branch keeps its name.
- **At the start of every session**, run `git branch --show-current` and `git fetch origin`.
  - In the main folder, the branch must be `staging` (if it isn't, `git switch staging`). Then run `git pull --ff-only origin staging`.
  - In a lane, the branch must be that lane's branch. Stay in your lane: do only the tasks in your lane's list in `LANES.md`, and never switch to `staging` or `main` there. Then bring in what other lanes have delivered: `git merge origin/staging`.
- All lanes and the main folder share the Neon `test` database, so tests must not depend on rows that another lane's tests could change.

## Commit and push after every change (always automatic)
Commit and push to your own branch on `origin` (https://github.com/gregorykurnia/deushcs-website) after every change, without asking first, and say what changed in the final message. Your own branch is `staging` in the main folder, or the lane's branch in a lane. This includes edits to this file and to the plans. So every change goes through these steps before the turn ends:

1. Run `npm run typecheck`, `npm run lint`, `npm run build` and `npm test`. Run `npx playwright test tests/e2e/smoke.spec.ts` too when the change touches pages or the database, plus the spec for each page the change touches. If a check fails because of the change, fix it first. Never commit or push a change that breaks a check.
   - The full Playwright suite is not a per-change gate. Run it before a release, or when the owner asks.
   - A failure from the environment in a flow the change doesn't touch (a dropped database connection, a timeout) is not a blocker. Name the test and the reason in the commit message and the report, then push.
   - Changes to Markdown docs only (plans, guides, content) skip the checks.
2. Check `git status`. Stage only the files you changed, with `git add <paths>`. If the tree holds changes that aren't yours, leave them unstaged and out of the commit. Never stage `.env*`, `.vercel/`, `node_modules/`, `/screenshots/`, `test-results/` or `playwright-report/`.
3. Commit to your branch. The message says what changed and why. End it with the `Co-Authored-By` line for the model that did the work.
4. Check `git log origin/<branch>..<branch>`, because a push sends every unpushed commit. Then push with `git push origin <branch>`.
5. Tell the owner what changed: the files, what each change does, the commit hash, and how many commits on `staging` aren't live yet (`git rev-list --count origin/main..origin/staging`). In a lane, also say whether the work is on `staging` yet.

- A task brief does not change this. Don't hold commits or pushes for approval, even when a brief says to commit locally or wait. Any unpushed commit on your branch gets pushed in the same turn.
- Never force-push and never rewrite published history.

## Delivering a lane's work to `staging`
When a task in a lane is finished (checks pass, ticked in both `IMPLEMENTATION_PLAN.md` and `LANES.md` in the same commit, committed and pushed to the lane branch), deliver it to `staging` in the same turn:

1. `git fetch origin`, then `git merge origin/staging`. Resolve any conflicts in the lane and keep both sides' work (the plan's ticks especially). If a conflict needs a judgment about another lane's code, stop and ask the owner.
2. If the merge brought anything in, run the checks from step 1 above again, including the smoke test.
3. `git push origin HEAD:staging`. This only fast-forwards `staging`. If it's rejected, another lane delivered first: go back to step 1. Never force.
4. `git push origin <lane branch>`, so the lane branch has the merge too.
5. Bring the main folder up to date, so the owner sees the delivery (code and ticks) there without pulling. Only when it's on `staging` with no uncommitted changes to tracked files; untracked files don't count (git itself refuses if the update would overwrite one). Otherwise skip it and say why in the report:
   ```bash
   main=~/projects/deushcs-website
   [ "$(git -C $main branch --show-current)" = staging ] && [ -z "$(git -C $main status --porcelain --untracked-files=no)" ] && git -C $main merge --ff-only origin/staging
   ```
   Never touch another lane's folder. If the delivery changed `package.json`, say the main folder needs `npm install`.
6. Tell the owner the task is on `staging`, whether the main folder was updated, and name the next row of the lane's list in `LANES.md` with its model and effort.

## Releasing to production (only when the owner asks)
Releases run in the main folder, on `staging`.

1. `git fetch origin` and `git pull --ff-only origin staging`. Show the owner what will go live: `git log --oneline origin/main..origin/staging`, summed up in plain words. Also show the work that's still only in a lane and won't ship (`git log --oneline origin/staging..origin/<lane branch>` for each lane), and anything on the **Waiting for the owner** list in `docs/build-plan.md`.
2. Run `npm run typecheck`, `npm run lint`, `npm run build`, `npm test` and the full Playwright suite (`npm run test:e2e`). Any failure caused by the code stops the release. Fix it first, on `staging` or in the lane it came from.
3. If anything being released needs a production migration, stop and ask. Run `npm run db:migrate` (production) only when the owner approves it, and release only after it has run, because the live site reads the schema. Migrations go to the `test` branch first (`npm run db:migrate:test`).
4. Fast-forward `main` to `staging` and push it: `git switch main && git pull --ff-only origin main && git merge --ff-only staging && git push origin main && git switch staging`. If the fast-forward fails, `main` has commits `staging` doesn't have. Stop and tell the owner. Never merge the other way round and never force anything.
5. Check that Vercel's production deployment succeeded (`vercel ls`, or the dashboard) and that the live URL loads. Tell the owner the URL, the commit that's now live, and what changed for visitors.
