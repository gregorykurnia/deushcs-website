# Global copy: header, footer, forms, shared blocks

Used on every page. Status: Draft v1 (2026-10-14).

---

## Header

- Menu: Solutions · Clients · Science · About
- Right side: EN / ID · Contact · [Request a demo]
- Page-specific button: assessment pages [Request a free trial] · Enhance [Book a 30-minute call]

### Solutions menu

Two columns, 680px panel, no group headings (F1, F10). The modules link to their sections on the Game-Based Assessment page.

**Column 1**
- **Game-Based Assessment**: Assess candidates and employees through games
  - **Personality · DEUS Discover**: Personality and competencies, through a story-driven game (`#personality`)
  - **Cognitive**: Seven fast games on speed, memory and reasoning (`#cognitive`)
  - **Neuroscience**: Six short games on motivation, risk and emotional intelligence (`#neuro`)
  - **Simulation**: Two business scenarios, customized to your industry (`#simulation`)
- Own card below: **Potentia by DEUS** ↗: Cognitive assessment for children aged 7–15. *Opens deuspotentia.com (in Indonesian) in a new tab.*

**Column 2**
- **DEUS Enhance**: Run fair appraisals and pay for real performance

### Mobile menu

Same shape (products, the GBA modules under it with a thin left rule, Potentia as a card), then the language switch, then: [Chat on WhatsApp] [Email us]

---

## Footer

**Column 1**
DEUS Human Capital Services
Game-based assessment and performance management for Indonesian companies.
[WhatsApp] [Email]

**Column 2: Solutions**
Game-Based Assessment · DEUS Enhance · Potentia ↗

**Column: Use cases** (only while `showUseCases` is on)
Management Trainee assessment · Campus recruitment assessment · Talent mapping and internal promotions · Linking performance appraisal to pay

> Note: each link is the use-case page's breadcrumb name (`content/en/use-cases/`). The same "Use cases" label leads the row of use-case links under the Solutions page's product tiles, Enhance's next step and the Telkom story.

**Column 3: Company**
About · Clients · Science · Contact

**Column 4: Legal**
Privacy policy
PT Investama Persada Kurnia
[Address: VERIFY, hidden until confirmed]

**Bottom bar:** © 2026 DEUS Human Capital Services · English / Bahasa Indonesia

---

## Floating WhatsApp button

Label (screen readers and tooltip): Chat with us on WhatsApp

---

## Closing section (default, used unless a page has its own)

Eyebrow: Let's talk
# Where could / DEUS help you?
Tell us what you're working on: an MT intake, a talent review, next year's appraisal cycle. We'll show you where DEUS fits, and where it doesn't.
[Request a demo] [Chat on WhatsApp]

Contact bar: Contact us · admin@deushcs.com *(R13a, F59: the WhatsApp number is gone from the bar; the "Chat on WhatsApp" button above it opens the chat, so the number isn't shown twice)*

---

## Contact form

**Labels**
- Full name
- Work email
- Company
- Your role
- WhatsApp number *(optional)*
- What are you interested in? · Game-Based Assessment · DEUS Enhance · Not sure yet *(R2: Discover and Next Chapter came off; leads already stored with them stay valid)*
- Company size · Under 100 · 100–499 · 500–1,999 · 2,000+
- How many candidates or employees would this cover? *(optional)*
- How can we help?
- Consent: I agree that DEUS may contact me about this request. [Privacy policy]

**Button:** Send message

**Hints**
- WhatsApp: We'll only use this to follow up on your request.
- How can we help: A sentence or two is plenty. For example: "We're hiring 300 Management Trainees in March."

**Errors**
- Please enter your name.
- Please enter a valid work email, like name@company.com.
- Please tell us your company's name.
- Please choose what you're interested in.
- Please tick the box so we can contact you.
- Something went wrong on our side and your message wasn't sent. Please try again, or reach us on WhatsApp at +62 823-1212-1660.

**While sending:** Sending…

**Success**
### Thank you. We've got your message.
Someone from our team will get back to you soon. [VERIFY: commit to a reply time, e.g. "within one working day"?]
In a hurry? [Chat with us on WhatsApp]

---

## Download offer (sample report)

> Note: SEO/geo-implementation-plan.md §S11. A card with a short form for visitors who aren't ready to ask for a trial. Hidden everywhere while `showSampleReport` is off, which it stays until the owner's sample PDF is in `public/downloads/`. The report's contents are the Individual report tab's (game-based-assessment.md §6). Fields, consent, errors and "Sending…" are the Contact form's.

### See what a candidate report looks like.
A sample individual report, with sample data, not a real candidate: the executive summary, overall score and percentile, each competency, strengths, development areas and the hiring recommendation.

**Fields:** Full name · Work email · Company · Consent

**Button:** Get the sample report

**Success**
### Your sample report is ready.
[Open the sample report (PDF)] → `/downloads/gba-sample-report.pdf`, in a new tab
See it on your own candidates: [Request a free trial] → `/contact?product=gba`
In a hurry? [Chat with us on WhatsApp]

---

## WhatsApp prefilled messages

- Default: Halo DEUS, saya ingin bertanya tentang layanan DEUS.
- Assessment pages: Halo DEUS, saya tertarik dengan asesmen berbasis game untuk perusahaan saya.
- Enhance: Halo DEUS, saya ingin tahu lebih lanjut tentang DEUS Enhance.

---

## Client story link card (used on product pages)

Eyebrow: Client story
**[Client name or description]: [one-line result]**
[Read the story →]

---

## 404 page

Eyebrow: Error 404
# This page has drifted out of orbit.
The link may be old, or the page may have moved.
[Go to the homepage] [See our solutions]

## Error page (500)

Eyebrow: Something went wrong
# That wasn't supposed to happen.
Please refresh the page or try again in a minute. If it keeps happening, let us know on WhatsApp.
[Refresh] [Go to the homepage]
