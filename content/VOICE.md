# How DEUS sounds

The rules every page in `content/` follows. Read this before writing or editing any copy.

## Who we're talking to

An HR head at a large Indonesian company, a recruiter running a Management Trainee intake, a finance director signing off bonuses, a parent wondering why their child struggles with math. Busy, smart, skeptical of software promises. Write for one of them at a time.

## How we sound

- **Like a senior consultant talking across a table.** Calm, direct, specific. We know this field and don't need to shout.
- **Concrete before abstract.** "Your HR team is still pulling scores from five spreadsheets the week before calibration" beats "inefficient performance processes".
- **Their problem first, our product second.** Most sections open with something the reader recognizes from their own week.
- **Short sentences, with some longer ones.** Vary the rhythm. One idea per sentence.
- **Confident, never inflated.** We say what the product does and what clients saw. No "revolutionary", no "best-in-class", no promises we can't back with a fact from the brief.

## Rules

1. **Every claim traces to a source** (the brief, `ENHANCE-CONTENT.md`) or is marked **[VERIFY]**. No invented clients, numbers, awards or quotes.
2. **Use "you" and "we".** "We" is DEUS. Avoid "users", "stakeholders", "organizations like yours" when "you" works.
3. **Name real things.** Management Trainee intakes, calibration week, BUMN, IPA or IPS, 30+ provinces, the Balloon Game. Specifics make copy sound written by someone who has been there.
4. **Headlines say something.** A headline should still make sense if it's the only line someone reads. "Candidates can't fake how they play" works; "Next-generation assessment" doesn't.
5. **Buttons say what happens.** "Request a free trial", "Book a 30-minute call", "Chat on WhatsApp". Never "Submit", "Learn more" or "Click here".
6. **Go easy on dashes and lists of three.** Use a period or a comma instead of a dash. Don't force everything into threes (see "Habits that sound machine-written" below).
7. **American spelling in English** (organization, behavior, program, customize), matching the approved Enhance copy. Keep it consistent. Product and screen names stay as they are.
8. **Indonesian copy:** corporate pages use "Anda". Potentia speaks parent to parent and may use "kita". Natural spoken Indonesian, not a word-for-word translation of the English.

## Words and phrases we don't use

They're vague, overused, or sound machine-written. `scripts/check-voice.mjs` reads the lists in this section, and `npm test` runs it with `--strict`, so a new hit fails the tests. It reads them (every line whose entries are separated by middle dots), so keep the one-line-per-group format. An entry with "X", "Y" or "…" in it is a pattern for the writer to spot, not for the script. A word that is right in context goes in `scripts/check-voice-allow.txt`, not out of this list.

unlock · unleash · empower · elevate · supercharge · seamless · seamlessly · leverage · robust · cutting-edge · state-of-the-art · revolutionize · game-changer · next-generation · holistic · synergy · journey (except for a real sequence of steps) · solutions (as a filler noun; "Solutions" as a menu label is fine) · "in today's fast-paced world" · "look no further" · "whether you're X or Y" · "it's not just X, it's Y" · "take your … to the next level" · "harness the power of" · "we're passionate about"

- **Vague upgrade words (name the real thing or drop the word):** smarter · powerful · modern · tailored · comprehensive · insight · insights · actionable · data-driven · world-class · end-to-end · streamline · transform · navigate · landscape · crucial · vital · foster · delve · effortless
- **Hype setups:** "here's what" · "the result?" · "that's where" · imagine · "no more" · "say goodbye to"
- **Filler words:** simply · easily · truly · really · actually · very
- **Judgment calls, not checked by the script:** "better" as a claim; "just" as filler.

### Indonesian

Same idea, for `content/id/`, `src/content/id/` and `messages/id.json`.

- **Words to avoid:** solusi (as filler) · inovatif · terdepan · canggih · memberdayakan · mengoptimalkan · "memaksimalkan potensi" · "di era digital" · "secara efektif dan efisien" · komprehensif · holistik · transformasi · revolusioner · "hadir untuk" · wujudkan · "ke level berikutnya" · "di ujung jari Anda"
- **Patterns to avoid:** "tidak hanya… tetapi juga…" and "bukan sekadar…" (the contrast pattern), plus the same patterns as in English. English calques such as "di ujung jari Anda" are the writer's job to spot.

## Habits that sound machine-written

The site still has these habits. Each one comes with an example from this site.

1. **Contrast framing:** "X, not Y", "not just X", "It's not X. It's Y.", and "A questionnaire asks… A story shows…". At most one per page, and only where the contrast is the point.
2. **Forced threes and echoes:** "every choice, every hesitation and every reaction", three adjectives in a row, three short parallel clauses. Use as many items as the facts have, in a plain sentence.
3. **Staccato fragments:** "Start small. See the results. Then decide." Write one normal sentence instead.
4. **Set phrases repeated across the site.** Say each one at most once per page, in plain words ("as soon as each candidate finishes" instead of "the moment they finish"). The script counts these (and the contrast lines from item 1) and reports every use after the first.
5. **"From X to Y" range lines:** "from your MT intake to your next generation of leaders", "from the first upload to the…". Say what's actually covered.
6. **Vague upgrade words:** the list above.
7. **Hype setups:** rhetorical questions, "Here's what…", "The result?", "That's where X comes in", "Imagine…", "No more…", "Say goodbye to…".
8. **Punchline endings:** a short moral closing a paragraph ("Nobody on your team grades anything."). End on the fact.
9. **Restating the heading** in the first line under it.
10. **Filler words:** the list above.
11. **Slide-speak in body text:** labels and noun piles where a person would write a sentence.

**Once per page:** "the moment they finish" · "in one place" · "one platform" · "at a glance" · "at scale" · ", not " · "not just" · "bukan sekadar" · "tidak hanya"

**The test:** read it out loud. Would a senior consultant say it across the table to an HR head? If it sounds like an ad or a slide, rewrite it. The script catches words and set phrases; forced threes, punchlines and slide-speak are for the writer and the phase review.

## Before and after

| Instead of | Write |
|---|---|
| Empower your HR team with seamless, data-driven assessment solutions. | Assess your whole MT intake without anyone on your HR team scoring a test by hand. |
| Our cutting-edge platform leverages neuroscience to unlock hidden potential. | Six short games show how someone handles risk, effort and emotion: things people can't easily fake in an interview. |
| Take your performance management to the next level. | Stop finalizing bonuses from a spreadsheet nobody checked against the ratings. |
| Candidates can't fake how they play. Every choice, every hesitation and every reaction under time pressure becomes data. | It's hard to fake how you play a game. The scoring uses each choice a candidate makes and how quickly they make it, including under time pressure. |
| Scores and reports are ready the moment they finish. Nobody on your team grades anything. | Scores and reports are ready as soon as each candidate finishes, so nobody on your team has to grade anything. |
| Start small. See the results. Then decide. | Try it with a small group before you decide. |

## Formatting in these files

- `Eyebrow:` the small label above a heading. It is shown in sentence case, exactly as written here (the design never sets text in capitals).
- `#` / `##` / `###` are the page's headings. Headings carry no bold or italics: the design never accents part of a headline.
- ` / ` inside a heading marks where a two-line headline breaks. Both lines look the same.
- Headings, titles, labels and buttons are in sentence case: capitalize the first word and proper names only (DEUS Enhance, Telkom Group, HR, KPI).
- Numbered items (steps, problems, values) are written `**1. Title**`, with the description on the next line. No `▸` and no leading zeros. The design decides whether a number is shown.
- `[Button text]` is a button or link. `→` points to where it goes.
- `> Note:` is for designers and developers, not shown on the page.
- **[VERIFY]** means the team must confirm before going live.
