import type { GuideContent } from "../../types";

// Guide 3: How to run Management Trainee recruitment at scale, from content/en/guides/management-trainee-recruitment.md
// (SEO/geo-implementation-plan.md §S9). Wording is kept as written; the `> Note:` lines, "Fact sources" and the italics
// are dropped, the download offer is the shared block (`nextStep.offer`), the closing is the default one, and the SEO
// title loses its " | DEUS" tail: the page title adds the site name.
//
// Telkom stays "a national telecom group" while `telkomNamed` is off. There is no minimum order (`showMinimumOrder` is off).

const gba = "/solutions/game-based-assessment";

export const managementTraineeRecruitmentEn: GuideContent = {
  meta: {
    title: "How to Run Management Trainee Recruitment at Scale",
    description:
      "The stages of a large Management Trainee intake, which assessment belongs at each one, how to keep the timeline short, and what to check before you pick a provider.",
  },
  slug: "management-trainee-recruitment",
  published: true,
  product: { name: "Game-Based Assessment", path: gba },
  whatsapp: "assessment",
  breadcrumb: "Management Trainee recruitment at scale",
  contactHref: "/contact?product=gba",
  dates: { published: "2026-10-23", updated: "2026-10-23" },
  author: "DEUS Human Capital Services",
  header: {
    eyebrow: "Guide · Management Trainee recruitment",
    title: "How to run Management Trainee recruitment at scale",
    answer:
      "A large Management Trainee intake works best as a funnel with a clear job for each stage: a quick check of who is eligible, an online assessment everyone takes at the same time, a business simulation for the shortlist, then structured interviews for the finalists. Put the cheapest, fastest measure at the widest point and the most expensive at the narrowest. Score automatically wherever you can, so the timeline is set by your decisions, not by how fast your team can score tests.",
    keyPoints: [
      "Decide what each stage is for before you choose tools. A stage that doesn't remove anyone, or doesn't add new evidence, only adds time.",
      "Use an online assessment that everyone takes at once for the first cut. It's the only stage that has to handle the whole applicant pool.",
      "Save the costly methods, a business simulation and structured interviews, for the people who are left.",
      "Agree your cut-off scores and your interview scorecard before the first invitation goes out.",
    ],
  },
  nextStep: {
    text: "Planning this year's intake?",
    link: { label: "See how DEUS assesses a Management Trainee intake", href: "/solutions/management-trainee-assessment" },
    offer: true,
    useCase: "management-trainee-assessment",
  },
  sections: [
    {
      id: "why-hard",
      title: "Why is a Management Trainee intake hard to run?",
      blocks: [
        {
          type: "paragraph",
          text: "Management Trainee programs promise a fast track to leadership, so they attract far more applicants than they have places. Indonesia's joint state-owned enterprise recruitment shows the scale at the top end. Fortune Indonesia reported more than 2 million applicants across its 2022 and 2023 rounds, and the 2024 round offered 1,830 positions at more than 100 state-owned companies.",
        },
        { type: "paragraph", text: "Most private intakes are smaller, but the shape of the problem is the same:" },
        {
          type: "list",
          items: [
            "**Many applicants, few places.** Every extra stage you run on the whole pool costs time and money.",
            "**Applicants who look alike on paper.** Recent graduates have similar degrees and little work history to tell them apart.",
            "**A fixed calendar.** Graduation dates, the start of the program and the business's own planning set the deadline, and strong candidates accept other offers while you deliberate.",
            "**Spread across the country.** Bringing everyone to a test center is slow and expensive, and it filters out good people who can't travel.",
            "**Decisions you have to defend.** Rejected applicants, line managers and sometimes the board will ask why one person got in and another didn't.",
          ],
        },
      ],
    },
    {
      id: "stages",
      title: "What are the stages, and which assessment belongs where?",
      blocks: [
        {
          type: "paragraph",
          text: "Each stage should answer one question with the best evidence you can afford for that many people. This is the structure we recommend for an MT intake:",
        },
        {
          type: "table",
          caption: "The stages of a Management Trainee intake",
          columns: ["Stage", "The question it answers", "Method", "Who takes it"],
          rows: [
            [
              "1. Eligibility",
              "Does the applicant meet the basic requirements?",
              "Automatic check on the application form: degree, graduation year, field of study, location",
              "Everyone who applies",
            ],
            [
              "2. Online assessment",
              "Who thinks and behaves the way the program needs?",
              "Cognitive and Neuroscience games, played in the browser at the same time",
              "Everyone who is eligible",
            ],
            [
              "3. Business simulation",
              "How does the candidate handle a real business problem?",
              "A scenario set in your industry, with a written report and a timed budget decision",
              "The shortlist from stage 2",
            ],
            [
              "4. Structured interviews",
              "Does what we've seen hold up in conversation, and is this person right for the program?",
              "Panel interviews with the same questions and scorecard for everyone",
              "Finalists",
            ],
            [
              "5. Offer",
              "Who joins?",
              "Reference checks, medical check if required, offer",
              "Successful finalists",
            ],
          ],
        },
        {
          type: "paragraph",
          text: "Indonesia's state-owned enterprise recruitment follows the same logic. Its 2024 round set every applicant the same tests: basic ability, character and English, as in earlier years, plus new tests of national insight and learning ability. Each company then ran its own field test as the final stage.",
        },
        {
          type: "paragraph",
          text: "**Why games for stage 2?** It's the only stage everyone eligible takes, so it needs to be quick to run, automatically scored and hard to prepare for. Answers to the common personality tests are a quick search away. Games measure behavior instead: the DEUS Cognitive module is seven short, timed games on processing speed, working memory and reasoning that also give a benchmark for learning agility, and the Neuroscience module's six games show motivation, appetite for risk, effort allocation and emotion recognition.",
        },
        {
          type: "paragraph",
          text: "**Why a simulation for stage 3?** A classic assessment center gives every candidate the same business exercise, but it's costly and hard to scale. A digital simulation keeps the exercise and drops the logistics. The DEUS Simulation module has two scenarios: finalists review cases and write a business report, then allocate a budget against a live timer.",
        },
        {
          type: "paragraph",
          text: "**Why structured interviews at the end?** A 2022 re-analysis of decades of selection research put structured interviews first among common selection methods for predicting job performance, at a validity of .42. Work sample tests came in at .33 and cognitive ability at .31. The catch is that interviews take the most time per candidate, so they belong where the numbers are smallest.",
        },
      ],
    },
    {
      id: "how-long",
      title: "How long should it take?",
      blocks: [
        {
          type: "paragraph",
          text: "Your calendar is set mostly by two things: how long candidates have to complete each stage, and how long your team needs to turn results into a decision. You control the first. Technology can remove most of the second.",
        },
        {
          type: "paragraph",
          text: "For the joint state-owned enterprise recruitment, registration was set to open on 23 March 2024 and final results were planned for July 2024, across six kinds of test and more than 100 companies.",
        },
        { type: "paragraph", text: "Where the time usually goes, and how to win it back:" },
        {
          type: "list",
          items: [
            "**Scoring and compiling results.** Done by hand, it can take your HR team days per stage. With automatic scoring, reports are ready the moment candidates finish. A national telecom group used DEUS to assess more than 1,000 Management Trainee candidates across 30+ provinces at once, with results within a day.",
            "**Chasing candidates who haven't started.** Automatic reminders do this for you, and a live view shows who has started, who has finished and who hasn't opened the invitation.",
            "**Waiting for a test-center slot.** An assessment that runs in a phone or laptop browser, with nothing to install, lets candidates take it from wherever they are.",
            "**Arguing about the cut-off.** Agree it before results arrive, not after. A batch report that ranks the whole intake and flags everyone below your cut-off leaves little to argue about.",
          ],
        },
      ],
    },
    {
      id: "fair",
      title: "How do you keep it fair across a national intake?",
      blocks: [
        { type: "paragraph", text: "Fairness at scale mostly comes down to consistency." },
        {
          type: "list",
          items: [
            "**Same assessment, same conditions.** Everyone in a stage takes the same games or the same scenario, scored the same way. That's easier to defend than a mix of test centers and assessors.",
            "**The right comparison group.** Norms should come from the population you're comparing candidates with. DEUS assessments are normed on the Indonesian population.",
            "**Security.** Ask how cheating is handled. Every DEUS session starts with device checks and anti-cheat logic.",
            "**Check who passes each stage.** Compare pass rates across groups you care about: universities, provinces, men and women. A large gap is a reason to look harder at that stage. In the United States, a pass rate below four-fifths of the highest group's is the usual first warning sign, and it's a useful yardstick anywhere.",
            "**Structured interviews.** Same questions, same scorecard, more than one interviewer, and scores written down before the panel discusses them.",
          ],
        },
      ],
    },
    {
      id: "candidate-experience",
      title: "What does a good candidate experience look like?",
      blocks: [
        {
          type: "paragraph",
          text: "Your MT program is competing for the same graduates as every other big employer, and the selection process is the first thing they see of you. Research on game-related assessments so far finds that candidates tend to rate them a little better than traditional tests, and the clearest gain is in how attractive they find the employer.",
        },
        {
          type: "paragraph",
          text: "Keep it simple: one invitation with a clear deadline, a short assessment they can take on their own phone, and quick news either way. A long, repetitive test loses people before they finish, and some of them are the ones you wanted.",
        },
      ],
    },
  ],
  faq: {
    eyebrow: "FAQ",
    title: "Questions about Management Trainee recruitment.",
    items: [
      {
        question: "How many stages should a Management Trainee selection have?",
        answer:
          "Usually four or five: an eligibility check, an online assessment, a business simulation or case exercise, structured interviews and the offer. Fewer stages put too much weight on a single measure. More stages add time without new evidence.",
      },
      {
        question: "Which assessments should we use for a Management Trainee intake?",
        answer:
          "We recommend Cognitive and Neuroscience for the first pass, then Simulation for the final round. The first two shortlist a large pool quickly and fairly, and Simulation shows how each finalist analyzes a business case and allocates a budget under real time pressure. You can start with one module and add others later.",
      },
      {
        question: "Can we assess candidates in every province at the same time?",
        answer:
          "Yes, if the assessment runs online. DEUS runs in a phone or laptop browser with nothing to install, so every candidate can take it at the same time from wherever they are. A national telecom group assessed more than 1,000 candidates across 30+ provinces at once.",
      },
      {
        question: "Should we still interview Management Trainee candidates?",
        answer:
          "Yes, but only the finalists. Structured interviews rank among the strongest predictors of job performance, and they take the most time per candidate, so they belong at the narrow end of the funnel.",
      },
    ],
  },
  sources: [
    {
      label:
        "Hendra Friana (2024), \"Rekrutmen Bersama BUMN dibuka 23 Maret, ada 1.830 posisi,\" Fortune Indonesia",
      href: "https://www.fortuneidn.com/news/friana/rekrutmen-bersama-bumn-dibuka-24-maret-ada-1-830-posisi",
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
      label: "Uniform Guidelines on Employee Selection Procedures, 29 CFR § 1607.4(D), the four-fifths rule",
      href: "https://www.law.cornell.edu/cfr/text/29/1607.4",
    },
    {
      label:
        "Ramos-Villagrasa, Fernández-del-Río and Castro (2022), \"Game-related assessments for personnel selection: A systematic review,\" Frontiers in Psychology",
      href: "https://doi.org/10.3389/fpsyg.2022.952002",
    },
  ],
  cta: {
    text: "See how a Management Trainee intake runs on DEUS, from the first upload to the ranked shortlist.",
    link: { label: "See the Management Trainee assessment", href: "/solutions/management-trainee-assessment" },
  },
  related: [
    "what-is-game-based-assessment",
    "campus-recruitment-screening",
    "game-based-assessment-vs-psychometric-tests",
  ],
  // the default closing section and contact bar (content/en/global.md)
  closing: {},
};
