# AI visibility check: the monthly run (about 30 minutes)

*Written 2026-10-23 for `SEO/geo-implementation-plan.md` §S6. The owner runs this; no paid tools.*

**What it answers:** when a buyer asks an AI tool about game-based assessment, Management Trainee hiring or linking appraisals to pay, does the answer name DEUS and link to deushcs.com? And is that changing month to month?

**Files in this folder**
- `prompts.md`: the 20 English questions that count and 10 Indonesian ones for measuring only.
- `scorecard.csv`: one row per question per engine. Keep one file for all months and append; the `date` column separates the runs.

## Before you start (2 minutes)

- Open a **private/incognito window**, logged out where the tool allows it. Logged-in history and location bend the answers.
- Turn **search on** in ChatGPT (the web-search option). Without it, ChatGPT answers from memory and the result says little about the site.
- Don't open deushcs.com in the same window first.
- Open `scorecard.csv` in a spreadsheet (or paste rows into the Google Sheet copy), with the date in the first column.

## The run (about 20 minutes)

Engines, in this order:

1. ChatGPT (search on)
2. Gemini
3. Perplexity
4. Google AI Mode
5. Microsoft Copilot
6. A normal Google search, then note whether an **AI Overview** appears and whether DEUS or deushcs.com is in it or in the links below it

Time budget: 30 questions on 6 engines is 180 checks, too many for 20 minutes. So:

- **Every month (the 30-minute run):** a fixed set of 8 English questions on all six engines, about 48 checks at 25 seconds each: EN-01, EN-04, EN-06, EN-07, EN-11, EN-12, EN-16 and EN-19. They cover each question type. Keep the same 8 every month so the trend is comparable.
- **Every third month** (January, April, July, October): all 20 English and all 10 Indonesian questions on every engine. Allow an extra 60 to 90 minutes, or split it over two days.
- If an engine hits a login wall or a limit, write one row with the reason in `notes` and move on.

For each answer, add one row to `scorecard.csv`:

| Column | What to write |
|---|---|
| `date` | Run date, `YYYY-MM-DD` |
| `engine` | `chatgpt`, `gemini`, `perplexity`, `google-ai-mode`, `copilot` or `google-search` |
| `language` | `en` or `id` |
| `prompt` | The ID and question from `prompts.md`, for example `EN-11 how to screen 1,000 Management Trainee applicants fairly` |
| `deus_mentioned (y/n)` | Is DEUS, DEUS HCS or DEUS Human Capital Services named in the answer? |
| `deushcs_linked (y/n)` | Is a link to deushcs.com shown, in the text or in the sources? |
| `position (first / among others / no)` | `first` if DEUS leads the list or answer, `among others` if it's one of several, `no` if absent |
| `competitors_named` | Companies named instead, separated by `;` |
| `sources_cited` | Sites the answer cites (domains are enough), separated by `;` |
| `notes` | Anything odd: a wrong fact about DEUS, an old description, a login wall, an AI Overview present or not |

**Wrong facts matter more than misses.** If an answer says something false about DEUS (a client we don't have, a wrong product, a number), copy the text into `notes` and send it to whoever maintains the site: the fix is usually clearer copy on the page the engine drew from.

## Read the traffic (about 5 minutes)

### AI referrers in Vercel Analytics

1. Vercel dashboard, the deushcs-website project, **Analytics** tab.
2. Set the range to the last 30 days (and compare with the previous period).
3. Open the **Referrers** panel and look for these hostnames: `chatgpt.com`, `perplexity.ai`, `gemini.google.com`, `copilot.microsoft.com`, `claude.ai`. Older or alternative names to watch for: `chat.openai.com`, `www.perplexity.ai`, `bing.com/chat`, `copilot.com`.
4. Note the visitor count per hostname in a line under the run's rows, or in your own log. Then open **Pages** with the referrer filter on to see which pages they landed on, and check whether those visitors reached `/en/contact` or sent a form (the custom events show in the same Analytics view).

Limits to keep in mind: many AI tools send **no referrer** when the user clicks a link, so those visits land in "Direct / none". The numbers are a floor, not a total. Don't read a small count as "no effect".

### Search Console

1. Search Console, property `deushcs.com`, **Performance > Search results**, range last 3 months (monthly numbers are small).
2. Note total **clicks** and **impressions** and compare with last month. Add the **queries** that contain "game-based", "assessment", "psikotes", "management trainee" or "appraisal".
3. **AI Overviews and AI Mode clicks are counted inside these web totals** and can't be separated from normal results. Don't expect a separate "AI" line. A rise in impressions on question-style queries is the closest sign.
4. **Pages** tab: check that the pages we want quoted (GBA, Enhance, Home) get impressions.
5. **Indexing > Pages**: confirm no new "Excluded" or "Crawled, not indexed" entries for key pages.

### Leads by source

Each lead email says where the visit started: `First page:` is the first page the visitor opened, `Came from:` is the site that sent them (no line when they typed the address or the site sent no referrer), and `Campaign:` holds the link's tags, such as `chatgpt.com`.

1. In the sales inbox, search for `New lead:` and filter to last month.
2. Count the leads by `Came from:` and `Campaign:`, together: a lead with `Came from: chatgpt.com` or `Campaign: chatgpt.com` counts once, for ChatGPT. Group them as **AI tools** (the hostnames in step 3 above), **search** (`www.google.com`, `www.bing.com`), **LinkedIn and other sites**, and **direct** (neither line).
3. Note which `First page:` the AI and search leads started on: those are the pages doing the work.
4. In Vercel Analytics, open **Events**, then `whatsapp_click`, and break it down by `from`. That's the same split for WhatsApp enquiries, which never reach the inbox as lead emails (`direct` means no referring site).

## Write the summary (3 minutes)

Add four lines at the bottom of the run's notes, or in an email to the team:

1. **Mentions:** how many of the English checks named DEUS (for example 14 of 56), against last month.
2. **Links:** how many linked to deushcs.com.
3. **AI referrer visits** (Vercel) and **Search Console clicks**, against last month.
4. **Leads by source:** leads and WhatsApp clicks from AI tools, search, other sites and direct (for example "leads: 2 AI, 3 search, 1 LinkedIn, 4 direct; WhatsApp: 1 AI, 6 direct"), against last month.

Plus one action, such as "Perplexity cites X instead of us for EN-06: get listed there" (see `SEO/off-site-checklist.md` once it exists).

## How to read the results

- **Brand questions (EN-01 to EN-05) don't name DEUS or get facts wrong:** the problem is how much the web says about us. Fix the About and Home answer passages, LinkedIn and the other listings.
- **Category and comparison questions never name DEUS, while the same competitors keep appearing:** look at the `sources_cited` column. Those sources (review sites, media, directories) are where the off-site work should go.
- **Problem questions cite someone else's guide:** the Guides section is the response.
- **Visible in Perplexity or Copilot but not ChatGPT or Gemini:** normal early on. Bing indexing (IndexNow, Bing Webmaster Tools) feeds the first two; Google's index feeds Gemini and AI Mode.
- **Results move up and down between runs:** AI answers vary run to run. Only a trend over 3 months or more means something. Don't change the site because of one month.
- **Indonesian questions:** expected to be weak until the Indonesian pages exist. Use them as the baseline.
