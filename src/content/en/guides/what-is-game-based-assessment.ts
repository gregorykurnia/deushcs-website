import { GBA_FROM_PRICE } from "@/content/prices";
import type { GuideContent } from "../../types";
import { formatIDR } from "@/lib/format";

// Guide 1: What is game-based assessment?, from content/en/guides/what-is-game-based-assessment.md
// (SEO/geo-implementation-plan.md §S9). Wording is kept as written; the `> Note:` lines, the "Fact sources"
// and the italics (the design sets none) are dropped, the download offer is the shared block (`nextStep.offer`),
// and the closing is the default one. The SEO title loses its " | DEUS" tail: the page title adds the site name.
//
// Telkom stays "a national telecom group": the copy never names the client, so `telkomNamed` (Q7) needs no
// branch. The price is the shared GBA "starting from" amount (src/content/prices.ts), written by `formatIDR` ("IDR 69,000" in
// English, "Rp69.000" in the Markdown), and there is no minimum order while `showMinimumOrder` is off.

const gba = "/solutions/game-based-assessment";
const price = formatIDR(GBA_FROM_PRICE, "en");

export const whatIsGbaEn: GuideContent = {
  meta: {
    title: "What Is Game-Based Assessment? A Guide for HR Teams in Indonesia",
    description:
      "What game-based assessment is, how a game measures personality and thinking, what the research says so far, and when HR teams in Indonesia should use it.",
  },
  slug: "what-is-game-based-assessment",
  published: true,
  product: { name: "Game-Based Assessment", path: gba },
  whatsapp: "assessment",
  breadcrumb: "What is game-based assessment?",
  contactHref: "/contact?product=gba",
  dates: { published: "2026-10-23", updated: "2026-10-23" },
  author: "DEUS Human Capital Services",
  header: {
    eyebrow: "Guide · Game-based assessment",
    title: "What is game-based assessment? A guide for HR teams in Indonesia",
    answer:
      "Game-based assessment measures how a candidate thinks and behaves by watching them play short games, instead of asking them to describe themselves in a questionnaire. Every choice, every hesitation and every reaction under time pressure is scored against the trait or ability the game was built to measure. For HR teams, that means data candidates can't easily rehearse, scored automatically, for an intake of any size.",
    keyPoints: [
      "A game-based assessment infers traits from how someone plays. It isn't a questionnaire with points and badges added on top.",
      "A good one is built like any psychometric test: theory first, then game design, validation and norms for a clearly defined population.",
      "Research so far finds that candidates tend to react a little better to game-based and gamified assessments than to traditional ones. The evidence on prediction and faking is still young, so ask any vendor for its own validation.",
      "It fits best where volume is high and time is short: Management Trainee intakes, campus drives and internal talent mapping.",
    ],
  },
  nextStep: {
    text: "Running a Management Trainee intake?",
    link: { label: "See how DEUS assesses one", href: "/solutions/management-trainee-assessment" },
    offer: true,
    useCase: "management-trainee-assessment",
  },
  sections: [
    {
      id: "what-counts",
      title: "What counts as a game-based assessment?",
      blocks: [
        {
          type: "paragraph",
          text: "Three terms get mixed up, and the difference matters when you compare vendors. A 2022 systematic review of 34 studies on game-related assessments for hiring separates them like this:",
        },
        {
          type: "list",
          items: [
            "**Game-based assessment** is an assessment method in its own right. It measures job-related traits and abilities through games.",
            "**Gamification** takes an existing test and adds game elements to it, such as points, a story or a progress bar. The test underneath stays largely the same.",
            "**Gameful design** uses game elements to build a new assessment from the start.",
          ],
        },
        {
          type: "paragraph",
          text: "So a personality questionnaire with a progress bar and a cartoon guide is still a questionnaire. Candidates still rate themselves, and they can still work out what the employer wants to hear. In a true game-based assessment there is no statement to agree or disagree with. The game records what the candidate does.",
        },
        { type: "paragraph", text: "When a vendor says \"gamified\", ask which of the three it means." },
      ],
    },
    {
      id: "how-it-measures",
      title: "How does a game measure a trait?",
      blocks: [
        {
          type: "paragraph",
          text: "Each game starts from a trait or ability that research has already defined, and from what that trait looks like in behavior. The game is designed to draw out that behavior, then it records far more than right or wrong answers: how fast someone responds, how consistent they are and how they react when the clock runs down.",
        },
        {
          type: "paragraph",
          text: "A well-known research example is the Balloon Analogue Risk Task. Participants earn money for each pump of a virtual balloon, and lose that balloon's money if it pops. In the original study of 86 participants, how far people pushed their luck was related to sensation seeking, impulsivity and self-reported risky behavior in real life, beyond what demographics and questionnaires explained.",
        },
        { type: "paragraph", text: "The DEUS suite works on the same principle across four modules:" },
        {
          type: "table",
          caption: "The four DEUS game-based assessment modules",
          columns: ["Module", "Format", "What it shows"],
          rows: [
            [
              "Personality (DEUS Discover)",
              "An RPG-style story where candidates make decisions as it unfolds",
              "32 personality subtraits and 24 competency traits, plus competencies from your own framework",
            ],
            [
              "Cognitive",
              "Seven short, timed games",
              "Processing speed, working memory, pattern recognition, arithmetic, spatial and logical reasoning, cognitive agility",
            ],
            [
              "Neuroscience",
              "Six games adapted from neuroscience research, including a Balloon Game",
              "Risk-taking, planning, motivation, effort allocation, attention to detail and emotion recognition",
            ],
            [
              "Simulation",
              "Two business scenarios, set in your industry",
              "Analytical thinking, business acumen, information gathering and written synthesis, under a live timer",
            ],
          ],
        },
      ],
    },
    {
      id: "science",
      title: "What's the science behind it?",
      blocks: [
        {
          type: "paragraph",
          text: "Game-based assessment collects evidence for established theories of personality and intelligence in a new way. Three research traditions sit behind it.",
        },
        {
          type: "paragraph",
          text: "**Personality.** Most personality measures rest on the Big Five model: openness, conscientiousness, extraversion, agreeableness and neuroticism, whose reverse is emotional stability. A 2019 review of 92 meta-analyses found conscientiousness to be the strongest non-cognitive predictor of performance at work. DEUS Discover is built on the Big Five and a Universal Competency Framework.",
        },
        {
          type: "paragraph",
          text: "**Thinking.** Cognitive ability tests remain among the better single predictors of job performance. A 2022 re-analysis of the selection research put their validity at .31. It also put structured interviews first, at .42, and found that earlier studies had overstated the validity of most selection methods. The DEUS cognitive games are grounded in classical frameworks for processing speed, memory, reasoning and attention.",
        },
        {
          type: "paragraph",
          text: "**Behavior.** Neuroscience research has a long list of behavioral tasks, like the balloon task above, that reveal risk-taking, motivation, effort and emotion recognition through what people do rather than what they say. The DEUS Neuroscience module adapts tasks of this kind.",
        },
        {
          type: "paragraph",
          text: "**Validity and norms.** The Standards for Educational and Psychological Testing treat validity as evidence that scores support the use you put them to, and say norms should come from the population you want to compare your candidates with. For candidates in Indonesia, that means Indonesian norms. Western norms compare your candidate with people of different schooling, language and culture. Every DEUS assessment goes through four phases (theory, item development, validation and norming), guided by psychometricians and industrial and organizational psychology researchers, and is normed on the Indonesian population. Our cognitive games have been validated against traditional cognitive tests.",
        },
      ],
    },
    {
      id: "research",
      title: "What does the research say so far?",
      blocks: [
        {
          type: "paragraph",
          text: "Be wary of anyone who says the question is settled. The 2022 systematic review is the most complete summary so far, and it's frank:",
        },
        {
          type: "list",
          items: [
            "**Candidate reactions** are the best-researched area, and the most positive. Candidates tend to value game-related assessments more than conventional ones, though the gap is small, and the clearest gain is in how attractive they find the employer. Where reactions are negative, the cause is usually a technical problem, not the assessment itself.",
            "**Prediction:** game-related assessments can predict performance, but the review found no evidence yet that they predict better than other methods.",
            "**Faking:** the claim that games reduce faking still lacks strong support. Only one study had tested it directly, and it was positive.",
            "**Fairness:** so far they show no more adverse impact than a conventional test, though that depends on what's being measured.",
          ],
        },
        {
          type: "paragraph",
          text: "A separate experiment with a gamified situational judgment test found that applicants reported more satisfaction with the process, saw it as fairer and found the company more attractive than with the text version of the same test.",
        },
        {
          type: "paragraph",
          text: "What this means in practice: game-based assessment is a strong first stage for large intakes, because it is fast, scored automatically and well received. Treat it as one part of a selection process, not all of it, and ask every vendor for validation evidence for your use.",
        },
      ],
    },
    {
      id: "when-to-use",
      title: "When should you use game-based assessment?",
      blocks: [
        {
          type: "paragraph",
          text: "It earns its place when you have many candidates, little time and a decision you need to defend. Here is where DEUS clients use it:",
        },
        {
          type: "list",
          items: [
            "**Management Trainee recruitment:** Cognitive and Neuroscience to shortlist the intake, Simulation for the final round. A national telecom group used DEUS to assess more than 1,000 Management Trainee candidates across 30+ provinces at once, with results within a day.",
            "**Campus and graduate recruitment:** Personality and Cognitive give a clear ranking across large applicant pools.",
            "**Competency and talent mapping:** match each person's profile to your competency framework and see the gaps.",
            "**Leadership identification:** the Neuroscience module's data on risk, motivation and emotion recognition is especially useful for finding future supervisors and managers.",
            "**Promotions, rotations and transfers (mutasi):** check fit for the new role with the same evidence you'd use for an outside candidate.",
          ],
        },
        {
          type: "paragraph",
          text: "For a single senior hire, a well-run structured interview may tell you most of what you need.",
        },
      ],
    },
    {
      id: "choose-a-provider",
      title: "What should you check before you choose a provider?",
      blocks: [
        {
          type: "paragraph",
          text: "The ITC and ATP Guidelines for Technology-Based Assessment (2022) cover gamified assessments alongside every other digital test. Their main concerns are validity, fairness, accessibility, security and privacy. Turned into questions for a vendor:",
        },
        {
          type: "list",
          ordered: true,
          items: [
            "**What does each game measure, and how was it validated?** You should get a clear answer for every score in the report.",
            "**Who are the norms based on?** For Indonesian candidates, ask for Indonesian norms.",
            "**How is cheating handled?** Ask about device checks and anti-cheat logic.",
            "**What does the candidate need?** Ask whether it needs an app or a particular device. DEUS runs in any phone or laptop browser with nothing to install.",
            "**How fast are results, and can you try it first?** At DEUS, scores and reports are ready the moment each candidate finishes. You can start with a free trial or a pilot in one division, with no long-term contract.",
          ],
        },
      ],
    },
  ],
  faq: {
    eyebrow: "FAQ",
    title: "Questions about game-based assessment.",
    items: [
      {
        question: "Is game-based assessment the same as a gamified test?",
        answer:
          "Not always. A gamified test adds game elements to an existing questionnaire, so candidates still rate themselves. A game-based assessment measures traits from how candidates play. Ask any vendor which of the two they offer.",
      },
      {
        question: "Can candidates prepare for a game-based assessment?",
        answer:
          "Not easily. The games measure behavior, not answers, so there's very little to look up or memorize. Every DEUS session also starts with device checks and anti-cheat logic. Independent research on faking in games is still limited, so ask any provider what it has tested.",
      },
      {
        question: "Does it replace interviews?",
        answer:
          "No. It's best as the first stage, where it shortlists a large intake quickly and fairly. Selection research ranks structured interviews among the strongest predictors of job performance, so keep one for your finalists.",
      },
      {
        question: "How much does it cost?",
        answer: `DEUS pricing starts from ${price} per candidate and gets lower as your volume grows. You pay only for the modules you choose.`,
      },
    ],
  },
  sources: [
    {
      label:
        "Ramos-Villagrasa, Fernández-del-Río and Castro (2022), \"Game-related assessments for personnel selection: A systematic review,\" Frontiers in Psychology",
      href: "https://doi.org/10.3389/fpsyg.2022.952002",
    },
    {
      label:
        "Lejuez et al. (2002), \"Evaluation of a behavioral measure of risk taking: The Balloon Analogue Risk Task (BART),\" Journal of Experimental Psychology: Applied",
      href: "https://researchconnect.stonybrook.edu/en/publications/evaluation-of-a-behavioral-measure-of-risk-taking-the-balloon-ana/",
    },
    { label: "The Big Five personality traits", href: "https://en.wikipedia.org/wiki/Big_Five_personality_traits" },
    {
      label:
        "Wilmot and Ones (2019), \"A century of research on conscientiousness at work,\" PNAS, as reported by the University of Toronto",
      href: "https://utoronto.ca/news/being-conscientious-one-strongest-predictors-success-workplace-u-t-study-finds",
    },
    {
      label:
        "O'Shea and Fox Luscombe, \"Is cognitive ability the best predictor of job performance?\", on Sackett, Zhang, Berry and Lievens (2022), TIP, SIOP",
      href: "https://www.siop.org/tip-article/is-cognitive-ability-the-best-predictor-of-job-performance",
    },
    {
      label: "AERA, APA and NCME (2014), Standards for Educational and Psychological Testing (open access)",
      href: "https://www.testingstandards.net/open-access-files.html",
    },
    {
      label:
        "Georgiou and Nikolaou (2020), \"Are applicants in favor of traditional or gamified assessment methods?\", Computers in Human Behavior",
      href: "https://doi.org/10.1016/j.chb.2020.106356",
    },
    {
      label: "International Test Commission and Association of Test Publishers (2022), Guidelines for Technology-Based Assessment",
      href: "https://www.intestcom.org/upload/media-library/guidelines-for-technology-based-assessment-v20221108-16684036687NAG8.pdf",
    },
  ],
  cta: {
    text: "See what each of the four modules measures, and how the reports read.",
    link: { label: "See the four modules", href: gba },
  },
  related: [
    "game-based-assessment-vs-psychometric-tests",
    "management-trainee-recruitment",
    "campus-recruitment-screening",
  ],
  // the default closing section and contact bar (content/en/global.md)
  closing: {},
};
