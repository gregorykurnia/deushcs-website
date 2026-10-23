# Off-site checklist: be named and linked beyond deushcs.com

*Written 2026-10-23 for `SEO/geo-implementation-plan.md` §S7 (task G1.2). Every item is the owner's to do: it needs an account, a login or a real person at DEUS. Nothing here changes the website.*

**Why this list exists:** AI tools and search engines trust what other sites say about a company more than what the company says about itself. A mention on an HR site, a listing in a software directory or a link from a partner makes it more likely DEUS is named when a buyer asks "which game-based assessment in Indonesia?". Work top to bottom; the order is by impact.

## Rules for every item

1. **Same name everywhere:** "DEUS Human Capital Services (DEUS HCS)", the one-paragraph description below, and `https://deushcs.com` as the website.
2. **Facts only from the site and its sources.** Nothing invented: no clients, numbers, awards or quotes. Telkom stays "a national telecom group" while `telkomNamed` is off. No minimum order and no "5 to 10 times" claim while their switches are off. Don't mention Recognition-style logo claims the owner cut.
3. **Reviews only from real clients**, who write them themselves. Never write one for a client, and never offer a reward for a good one.
4. **Client programs and the Potentia launch photos only with permission** from the client or school (children need a parent's or school's OK).
5. **Record each finished item** by ticking it here and adding the profile URL in the "Done" line, and send the URLs for `sameAs` (`src/lib/structured-data.ts` uses only the owner's URLs; see "Profile links" in `revisions3.0team/NEEDED-FROM-YOU.md`).

## The one-paragraph description (use this everywhere)

Built only from wording the site already shows (About's hero, the company profile in `Creating DEUS HCS Website.md`, Enhance's SEO description and the GBA/Potentia product lines):

> DEUS Human Capital Services (DEUS HCS) is an Indonesian HR technology company, built on the belief that people are a company's most important asset. It launched DEUS Discover in 2022, one of the first gamified assessments in Indonesia, and has since added game-based assessments for hiring and development, DEUS Enhance, which connects KPIs, appraisals, calibration and talent mapping to bonus, incentive and salary decisions, and Potentia, a cognitive assessment for children. https://deushcs.com

**Short version (160 characters or fewer, for fields with a limit):**
> Indonesian HR technology company: game-based assessments, DEUS Enhance for performance and pay, and Potentia for children. https://deushcs.com

When G1.7 puts an approved answer passage on About, replace the paragraph above with that passage (one home for the wording) and update the profiles.

## Link check

Every link below was opened by a script on 2026-10-23 (`curl` with a browser user agent). **200** = loaded. **403** = the site blocks scripts (bot protection) but the page appears in current search results, so open it in a browser when you do the item. Links that failed (no DNS or 404) are not in the checklist; they are listed at the end.

---

## 1. LinkedIn company page

- **Why it matters:** LinkedIn is the first place HR buyers and AI tools look to confirm a company is real. It is also the profile most often used as `sameAs` in the site's company data.
- **Link:** <https://www.linkedin.com/company/setup/new/> (200, sign-in needed). The company page URL isn't known yet: send it to `revisions3.0team/NEEDED-FROM-YOU.md` "Profile links".
- **What to write:**
  - *Name:* DEUS Human Capital Services (DEUS HCS). *Website:* `https://deushcs.com`. *Industry:* Human Resources Services. *Company size:* use the real number, picked from LinkedIn's ranges.
  - *About:* the one-paragraph description above.
  - *Specialties:* game-based assessment, talent assessment, psychometric test, cognitive assessment, personality test, performance management, KPI appraisal. (These are the product terms the site's GBA and Enhance pages already carry; no extra keywords.)
  - *Posts:* one post per published guide (G3), each with a plain sentence and the guide's link. Share it from a person's profile too (yours or a team member's): people's posts usually reach more buyers than a company page's.
- **Who:** Owner (a DEUS page admin).

## 2. Google Business Profile

- **Why it matters:** it shows DEUS on Google Maps and in the knowledge panel, and confirms the business exists.
- **Link:** none to add here: Phase 7 already covers it (`IMPLEMENTATION_PLAN.md` 7.6; it waits on the office address, Q9, in `revisions3.0team/NEEDED-FROM-YOU.md` §5b). Don't repeat it. The office address stays off the site and off this list until `showAddress` is on and the address is verified (the brief marks it [VERIFY]).
- **What to write:** the same name, short description and website as above.
- **Who:** Owner.

## 3. Bing Webmaster Tools and Bing Places

- **Why it matters:** Bing's index feeds Copilot and parts of ChatGPT search, so a site Bing knows well gets quoted more often. Task 7.6 already imported the site into Bing Webmaster Tools and submitted the sitemap; this item checks it and adds the business listing.
- **Links:** Bing Webmaster Tools <https://www.bing.com/webmasters/about> (200). Bing Places for Business <https://www.bing.com/forbusiness/> (200; the old `bingplaces.com` address redirects here).
- **What to write:**
  - Webmaster Tools: check the sitemap `https://deushcs.com/sitemap.xml` shows as processed; later, turn on IndexNow (G1.8) there.
  - Bing Places: the short description above, category "Human resources consultant" or the nearest one it offers, website `https://deushcs.com`. If it asks for a street address and DEUS hasn't confirmed one, set it up as a service business or skip the listing until the owner decides.
- **Who:** Owner.

## 4. Ecosystem listings (correct or claim each one)

Use the same name, description and URL on each. If the listing already exists, claim or correct it. Don't create a duplicate.

| Listing | Why it matters | Link | What to write | Status |
|---|---|---|---|---|
| **Startup Studio Indonesia** (alumni list, Batch 6) | The program is run with Komdigi, so it's the most trusted page that names DEUS. Today it's the strongest independent proof of the 2023 selection. | <https://startupstudio.id> (200) lists participants and alumni by batch. Contact: <https://startupstudio.id/contact> (200), halo@startupstudio.id | Email the contact address from a DEUS address. Ask them to check that the entry for Batch 6 reads "DEUS Human Capital Services" with the website `https://deushcs.com` and the short description. Don't ask for anything beyond the entry. | Owner |
| **Tech in Asia** company profile | DEUS Discover was highlighted at the Tech in Asia Products Stage (2024); a profile ties that to the company. | <https://www.techinasia.com/> (403 to scripts). Search for "DEUS" on the site, and if no profile exists, use the site's own company-submission or contact form. I couldn't confirm a current claim flow; the page is the starting point. | Name, website, short description, founded 2022, location Indonesia, product names. No funding or user numbers. | Owner |
| **Crunchbase** | The profile AI tools read most often for a company's basics. | <https://www.crunchbase.com/> (200). Claim help: <https://about.crunchbase.com/> (200). Search for "DEUS Human Capital Services": claim it if it exists, otherwise create it with "Add new". | Name, website, one-paragraph description, founded 2022, HQ Indonesia, industry "Human Resources" and "EdTech/assessment" only if the form needs one. Leave funding and employee fields empty unless true. | Owner |
| **Komdigi listings** | Komdigi (ex-Kominfo) ran Startup Studio Indonesia and hosted the Potentia launch. If it has a startup or "Indonesia digital" listing that names DEUS, it should read the same. | <https://www.komdigi.go.id/> (403 to scripts; opens in a browser). | Check only; ask for a correction by email if any listing misspells the name. Don't pursue a new listing without a clear form for it. | Owner |
| **Third-party directories that already name DEUS** | Wrong details here get quoted by AI tools. One example found: the sgpgrid.com page for DEUS (<https://sgpgrid.com/company/deus-human-capital-gamification-services-ID0000>, 403 to scripts). It lists a company size and countries the team hasn't confirmed. | Same link. | If it has an "update" or "claim" option, correct it to the one-paragraph description; if not, ignore it. | Owner |

## 5. Software listing sites

- **Why it matters:** buyers comparing HR tools use these sites, and AI tools cite them for "best … software" answers. Reviews are what move the needle, and only real clients can write them.
- **Links (all found current on 2026-10-23):**
  - **G2:** create a profile <https://sell.g2.com/create-a-profile> (200) or claim an existing one <https://sell.g2.com/profiles> (200). Add a product directly: <https://www.g2.com/products/new> (403 to scripts). Plans: <https://sell.g2.com/plans> (200).
  - **Capterra** (same family as GetApp and Software Advice, which share one vendor portal): vendor sign-up <https://digital-markets.gartner.com/capterra-vendor-signup> (this machine couldn't resolve it; open in a browser). Category to look at first: *Pre-employment testing software* <https://www.capterra.com/pre-employment-testing-software/> (403 to scripts; found in search on 2026-10-23). Related categories Capterra lists: Assessment Software, Talent Management Software. One 2026 source says Capterra's "Get your product listed" button now opens G2's form: confirm which one the live page uses.
  - **SoftwareSuggest (Indonesia HR page):** <https://www.softwaresuggest.com/hr-software/indonesia> (200). It has no vendor-submission page at `/vendor` or `/list-your-software` (both 404), so write via its site contact form.
  - **GetApp:** <https://www.getapp.com/> (403 to scripts); covered by the Capterra vendor sign-up, don't submit twice.
- **What to write:**
  - *Product name and category:* "DEUS Game-Based Assessment" under pre-employment testing / assessment; "DEUS Enhance" under performance management. List the two as separate products.
  - *Description:* the product lines on the site: for GBA, the SEO description in `content/en/game-based-assessment.md` ("Game-based assessment for hiring: personality, cognitive, neuroscience and simulation games on one talent assessment platform. Normed on Indonesians, built for volume."); for Enhance, its SEO description in `content/en/enhance.md` ("Connect KPIs, appraisals, calibration and talent mapping to bonus, incentive and salary decisions. Works alongside your existing HRIS, ERP and payroll.").
  - *Pricing:* only what the pages show. *Screenshots:* from the site.
  - *Reviews:* ask two or three real clients for a short honest review in their own words, after they've agreed. Don't write, edit or reward reviews.
- **Who:** Owner. Start with G2 and Capterra; skip the rest unless a client or buyer mentions them.

## 6. Indonesian HR media, communities and events

- **Why it matters:** the sites HR people actually read are the ones AI tools quote for local questions. A real story about DEUS on one of them counts more than any directory entry.
- **What to write (the pitch):** two or three sentences about a real milestone, in the site's own wording, plus a link. Milestones that are safe to use:
  - The **Potentia launch at Komdigi's headquarters in Jakarta** (the site's About timeline, 2025; the brief gives the date as 20 November 2025, jointly with Level Up powered by Agate).
  - **Selected as one of 17 startups in Startup Studio Indonesia** (2023, Batch 6).
  - **Represented Komdigi at Innovfest by NUS x AsiaTech** in Singapore (2024), with DEUS Discover highlighted at the Tech in Asia Products Stage.
  - Client programs (for example the Management Trainee work) **only with the client's written permission**, and as "a national telecom group" while `telkomNamed` is off.
  - A guest article (once a guide from G3 exists) beats a news pitch: offer one of the published guides, shortened.
  - **Guide 7, DEUS's own numbers** (G3.5, once it's published), is the strongest pitch of all: HR media like original Indonesian data, and every article that quotes it links back.
- **Who:** Owner (or the CEO for speaking offers).

**Media and portals (found 2026-10-23):**

| Outlet | What it is | Link | How to reach |
|---|---|---|---|
| **HRPods** | HR media and community for Indonesian HR practitioners | <https://hrpods.co.id/> (200) · About <https://hrpods.co.id/about-us> (200) | Contact details on the About page. |
| **Dunia HR Indonesia** | HR news, insight, events and practitioner community | <https://duniahr.com/> (200) · Events <https://duniahr.com/event> (200) · Contact <https://duniahr.com/kontak> (200) | Contact page; its events page also lists where to be seen. |
| **ManajemenSDM.net** | HR knowledge site on hiring, recruitment, compensation and regulation | <https://manajemensdm.net/> (200) | No contact page found (the usual `/kontak` is 404); look in the footer for an email. |
| **Human Resources Online** (regional) | Southeast Asia HR news and conferences | <https://www.humanresourcesonline.net/> (200) | Editorial contact on the site. |
| **HRM Asia** (regional) | Asia HR news | <https://hrmasia.com/> (200) | Editorial contact on the site. |

**Communities and associations:**

| Name | Why | Link |
|---|---|---|
| **PMSM Indonesia** (Perhimpunan Manajemen Sumberdaya Manusia) | Long-standing HR professional association; runs HR Meet & Talk, HR Bootcamp, workshops and certification. Membership or an event slot puts DEUS in front of HR heads. | <https://pmsm.or.id/id> (200) · Memberships <https://pmsm.or.id/id/memberships> (200) · Events <https://pmsm.or.id/id/article?category=events> (200) · Workshops <https://pmsm.or.id/id/workshop-certification> (200) · Email info@pmsm.or.id |

**Events (2026; confirm dates on each page before planning):**

| Event | Link | Note |
|---|---|---|
| People Matters TechHR Pulse Indonesia | <https://indonesia.techhrconference.com/> (200) | One snippet gave 10 September 2026, another 26 November: check the page. |
| HR & WorkTech Summit Indonesia | <https://indonesia2026.hrworkplaceshow.com/> (200) · <https://growthacademyasia.com/event/annual-hr-worktech-summit/> (200) | Listed for 19 November 2026 in Jakarta; two organizers show different venues. |
| Transform Talent Indonesia | <https://conferences.humanresourcesonline.net/transform-talent-id/> (200) | Listed for 6 August 2026 (may already be past by the time you read this). |
| HR Tech Festival Asia | <https://www.hrtechfestivalasia.com/> (200) | Regional; PMSM exhibits there. |

*Most of these are paid sponsor events. Attend or speak only if the owner decides it is worth the cost; a free guest article on a site above costs nothing.*

## 7. Partner links back to deushcs.com

- **Why it matters:** a link from a site that already names DEUS is the cheapest, most trusted link, and it tells search engines the sites belong together.
- **What to ask:** one sentence with the link `https://deushcs.com`, in the partner's own style, and the name written as "DEUS Human Capital Services (DEUS HCS)".

| Where | Link | What to write |
|---|---|---|
| **deuspotentia.com** | <https://deuspotentia.com/> (200) | A footer or "about us" line: "Potentia is by DEUS Human Capital Services" linking to `https://deushcs.com`. This site is DEUS's own, so no permission needed. |
| **Level Up powered by Agate** (Potentia launch partner) | <https://agatelevelup.com/> (200) | Ask whether the Potentia launch article or partner page can link "DEUS Human Capital Services" to `https://deushcs.com`. |
| **UGM** (Potentia partner) | <https://www.ugm.ac.id/id/> (200) | Ask only if there's already a public page naming DEUS. Don't create a claim the university hasn't made. |
| **@potentiabydeus** Instagram bio | <https://www.instagram.com/potentiabydeus/> (login wall; the account is in the brief) | Put `https://deushcs.com` or `https://deuspotentia.com` in the bio link, and "by DEUS Human Capital Services" in the bio text. |

**Who:** Owner.

## 8. Wikidata (only with independent references)

- **Why it matters:** AI tools read Wikidata for company facts, but an item without independent sources gets deleted.
- **Links:** notability rules <https://www.wikidata.org/wiki/Wikidata:Notability> (200); Wikipedia's conflict-of-interest rules <https://en.wikipedia.org/wiki/Wikipedia:Conflict_of_interest> (200).
- **Independent references to cite (found 2026-10-23):**
  - detikInet's list of the 17 Batch 6 finalists, which names "DEUS Human Capital Services (platform manajemen personalia/HR dengan gamifikasi)": <https://inet.detik.com/cyberlife/d-6797033/ini-dia-17-finalis-startup-studio-indonesia-batch-6> (200).
  - Gizmologi on the 17 Batch 6 startups: <https://gizmologi.id/news/17-startup-program-akselerator-ssi-bacth-6/> (200).
  - Bisnis.com on the close of Batch 6: <https://teknologi.bisnis.com/read/20230628/266/1670141/startup-studio-indonesia-ditutup-kemenkominfo-jaring-17-startup> (403 to scripts; found in search).
- **What to write:** an item "DEUS Human Capital Services", instance of "company", country Indonesia, official website `https://deushcs.com`, inception 2022, each statement with one of the references above. Create it only after these references are open and say what the statement says.
- **Don't** create a Wikipedia article: the company probably doesn't meet notability, and writing about your own company breaks conflict-of-interest rules.
- **Who:** Owner.

## 9. News coverage list (R8)

- **Why it matters:** each real article becomes a link on About once R8 is built, and a source for the AI tools.
- **What to do:** for each article that names DEUS, add a row: outlet, date, link, one-line summary. The three above (detikInet, Gizmologi, Bisnis.com) are the first three; the Tech in Asia and Innovfest mentions go in once the owner has the links. Only articles the outlet itself wrote count (no paid press releases). Check that each link opens before it goes on the site.
- **Who:** Owner collects; the build task for R8 adds them to About.

## 10. Same name everywhere

- **Why it matters:** if one site says "DEUS HCS", another "Deus Human Capital & Gamification Services" and a third "PT Investama Persada Kurnia", AI tools may treat them as different companies.
- **What to do:** after items 1 to 9, search "DEUS Human Capital Services" on Google and Bing and open the first page of results. For each wrong name, description or website, ask for a correction on that site. Repeat each time the scorecard in `SEO/ai-visibility/` shows a wrong name.
- **Name and description:** as above. The legal entity, PT Investama Persada Kurnia, appears only where a form needs it.
- **Who:** Owner.

---

## Links that failed the check (not used above)

| Link | Result | Why left out |
|---|---|---|
| `https://www.portalhr.com/` | no response | An old HR portal (launched 2006); search didn't confirm it still runs. |
| `https://hrpods.co.id/kontak`, `https://manajemensdm.net/kontak` | 404 | Guessed contact URLs; use the About page or footer instead. |
| `https://www.softwaresuggest.com/vendor`, `…/list-your-software` | 404 | Guessed vendor URLs. |
| `https://www.capterra.co.id/`, `https://www.hrmagazine.co.id/`, `https://asia.hrmagazine.asia/`, `https://levelupbyagate.com/` | no response | No such site; not used. |
| `https://digital-markets.gartner.com/capterra-vendor-signup` | no DNS answer on this machine | Kept in item 5 because it came from search; open it in a browser first. |

## Not covered here

- A Facebook or YouTube page: not asked for in §S7 and nothing in the sources says DEUS has one.
- Paid listings, sponsored articles and review-for-reward schemes: out of scope on purpose.
- Indonesian-language profiles: the site is English-only for now, so copy above is English. When Indonesian pages go live, translate the one-paragraph description with the same facts.
