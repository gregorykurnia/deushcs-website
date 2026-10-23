import type { GuideContent } from "../../types";

// Guide 6: Setting KPIs and competencies for a fair performance appraisal, from
// content/en/guides/kpis-and-competencies-for-appraisal.md (SEO/geo-implementation-plan.md §S9). Wording is kept as
// written; the `> Note:` lines, "Fact sources" and the italics are dropped, the SEO title loses its " | DEUS" tail,
// and the closing is the default one. There is no download offer: §S9 gives guides 5 and 6 one line to Enhance's
// call to action instead. The table's empty first header is "Factor", so every column has a name.
//
// The percentages in the weights table are labeled as an example in the copy: none is a recommendation from a source.

const enhance = "/solutions/enhance";

export const kpisAndCompetenciesForAppraisalEn: GuideContent = {
  meta: {
    title: "Setting KPIs and Competencies for a Fair Performance Appraisal",
    description:
      "How to build a performance framework when you don't have one yet: KPIs for results, competencies for behavior, weights by role and level, and how to keep the ratings fair.",
  },
  slug: "kpis-and-competencies-for-appraisal",
  published: true,
  product: { name: "DEUS Enhance", path: enhance },
  whatsapp: "enhance",
  breadcrumb: "KPIs and competencies for appraisal",
  contactHref: "/solutions/enhance#book-a-call",
  dates: { published: "2026-10-23", updated: "2026-10-23" },
  author: "DEUS Human Capital Services",
  header: {
    eyebrow: "Guide · Performance appraisal",
    title: "Setting KPIs and competencies for a fair performance appraisal",
    answer:
      "A fair appraisal measures two things: what each person delivered, through a few KPIs tied to the company's goals, and how they did it, through a short list of competencies described as behavior a manager can observe. Weight the two differently by role and level, agree the targets and descriptions before the period starts, and review progress during it. If you don't have a framework yet, start with one level of the company, not all of it.",
    keyPoints: [
      "KPIs measure results. Competencies measure behavior. An appraisal with only one of them rewards the wrong things.",
      "Specific, challenging targets lead to better performance than \"do your best\". That's one of the most consistent findings in workplace research.",
      "Describe each competency level as behavior, so two managers reading the same description would rate the same person the same way.",
      "Fewer is better: a handful of KPIs and competencies per role that people remember, rather than twenty that nobody tracks.",
    ],
  },
  nextStep: {
    text: "If you'd like help designing the framework itself,",
    link: { label: "Book a 30-minute appraisal review", href: "/solutions/enhance#book-a-call" },
  },
  sections: [
    {
      id: "kpi-vs-competency",
      title: "What's the difference between a KPI and a competency?",
      blocks: [
        { type: "paragraph", text: "Both belong in the appraisal, and they answer different questions." },
        {
          type: "table",
          caption: "KPIs and competencies compared",
          columns: ["Factor", "KPI", "Competency"],
          rows: [
            ["The question", "What did this person deliver?", "How did they work?"],
            [
              "Example",
              "Sales against target, defect rate, on-time delivery, budget spent against plan",
              "Problem solving, working with others, developing the team, integrity",
            ],
            [
              "How it's measured",
              "A number from a system or report, against a target set at the start of the period",
              "A rating against written descriptions of behavior at each level",
            ],
            [
              "Who can check it",
              "Anyone with the data",
              "The manager, and peers or the employee in a self-review",
            ],
            [
              "The risk if used alone",
              "People hit the number in ways the company doesn't want",
              "Ratings rest on impressions, and results don't count",
            ],
          ],
        },
        {
          type: "paragraph",
          text: "The two work together. A branch manager who hits every sales target while losing half the team is a different case from one who hits the same targets and develops two successors. An appraisal that only looks at KPIs can't tell them apart.",
        },
      ],
    },
    {
      id: "write-kpis",
      title: "How do you write KPIs that work?",
      blocks: [
        {
          type: "paragraph",
          text: "**Start from the company's goals, then go down a level at a time.** Company targets become division targets, then team targets, then individual ones. Each person should be able to see how their KPIs add up to their team's.",
        },
        {
          type: "paragraph",
          text: "**Make each one specific and measurable.** The SMART checklist, first published by George Doran in 1981, is still a useful test. In his version a good objective is Specific, Measurable, Assignable (it's clear who is responsible), Realistic and Time-related. Doran himself noted that not every objective can be put into numbers, especially for middle managers, which is one reason competencies belong in the appraisal too.",
        },
        {
          type: "paragraph",
          text: "**Set challenging targets, not vague ones.** Edwin Locke and Gary Latham's review of 35 years of goal-setting research found that specific, difficult goals consistently led to higher performance than telling people to do their best. The harder the goal, the higher the performance, until people reached the limits of their ability or stopped being committed to the goal.",
        },
        {
          type: "paragraph",
          text: "**Explain the reason for each target.** In the same research, a target assigned with its purpose explained worked as well as one people set together. A target handed down with no explanation led to lower performance.",
        },
        {
          type: "paragraph",
          text: "**Give people feedback during the period.** Goals work better with regular feedback on progress than without it. A KPI that's only looked at once a year is a scorecard, not a goal.",
        },
        {
          type: "paragraph",
          text: "**For new, complex work, set learning goals.** When people are still learning a task, a goal to master specific skills or try a number of strategies can work better than a results target.",
        },
      ],
    },
    {
      id: "build-competencies",
      title: "How do you build a competency framework from scratch?",
      blocks: [
        {
          type: "list",
          ordered: true,
          items: [
            "**Pick a small set that applies to everyone.** For example, four or five core competencies that describe how the company wants people to work. Many Indonesian companies already have a set of company values that can be the starting point.",
            "**Add a few for each job family or level.** Leadership competencies for supervisors and managers, technical ones for specialist roles.",
            "**Describe each level as behavior.** \"Solves problems\" is a label. \"Finds the cause of a recurring production fault and puts a fix in place without being asked\" is something a manager can observe and rate. Write three to five levels, from developing to role model.",
            "**Test the descriptions.** Ask two managers to rate the same employee with them. If their ratings differ a lot, the descriptions are too vague.",
            "**Keep it flexible.** The UK's Chartered Institute of Personnel and Development notes that well-designed frameworks can make performance expectations clearer, but that designers need to balance detail with flexibility, to avoid an approach that's overly prescriptive.",
          ],
        },
      ],
    },
    {
      id: "weights",
      title: "How should KPIs and competencies be weighted?",
      blocks: [
        {
          type: "paragraph",
          text: "There's no single right split, but the weights should follow the role. The more a role's results can be counted and depend on the person, the more weight KPIs can carry. The more a role is about leading, coordinating or building capability, the more competencies matter.",
        },
        { type: "paragraph", text: "An example, with weights chosen only to show the idea:" },
        {
          type: "table",
          caption: "An example split of KPI and competency weights by role",
          columns: ["Role", "KPIs", "Competencies"],
          rows: [
            ["Sales executive", "70%", "30%"],
            ["Production supervisor", "60%", "40%"],
            ["HR business partner", "50%", "50%"],
            ["Department head", "40%", "60%"],
          ],
        },
        {
          type: "paragraph",
          text: "Whatever you choose, write it down, apply it to everyone in the same role, and keep it for the whole period. In DEUS Enhance you customize KPIs, competencies, weights, formulas, periods and measures by role and level, so different parts of the company can use different splits in the same system.",
        },
      ],
    },
    {
      id: "fair-ratings",
      title: "How do you keep the ratings fair?",
      blocks: [
        {
          type: "paragraph",
          text: "A good framework is only half of it. Fairness also depends on how the ratings are given.",
        },
        {
          type: "list",
          items: [
            "**Agree before, not after.** KPI targets and the competency descriptions are agreed at the start of the period, and both employee and manager can see them.",
            "**One process for everyone.** The same self-review and appraisal steps, on the same schedule, across teams and units.",
            "**Evidence for every rating.** A rating should point to KPI results or examples of behavior.",
            "**Calibrate.** Review evaluations across managers, departments or plants before results reach rewards. Two managers can rate the same performance differently, and calibration is where that gets caught.",
            "**Look at the whole picture.** Enhance's talent map, a nine-box grid that plots KPI results against competency results, shows high performers, performance gaps and development potential at a glance.",
          ],
        },
        {
          type: "paragraph",
          text: "For what happens next, turning calibrated ratings into bonuses and raises, see the guide on linking performance appraisals to pay.",
        },
      ],
    },
    {
      id: "no-framework",
      title: "What if we're starting with no framework at all?",
      blocks: [
        { type: "paragraph", text: "Plenty of companies start there. Three ways to make it manageable:" },
        {
          type: "list",
          items: [
            "**Start with one level or one unit.** A pilot in one division shows what works before the whole company changes.",
            "**Begin with a workshop.** Map the KPIs for each role together with the people who'll be measured and the managers who'll do the rating. At DEUS this is often how it starts: a KPI-mapping workshop.",
            "**Review after the first cycle.** Some targets will be too easy and some descriptions too vague. Fix them before the next period, not in the middle of it.",
          ],
        },
      ],
    },
  ],
  faq: {
    eyebrow: "FAQ",
    title: "Questions about KPIs and competencies.",
    items: [
      {
        question: "How many KPIs should each person have?",
        answer:
          "Few enough to remember and track, usually a handful per role. Each KPI should be specific and measurable, tied to a team or company goal, and agreed before the period starts. If a KPI never changes anyone's behavior, drop it.",
      },
      {
        question: "Should competencies count toward the appraisal score?",
        answer:
          "Yes. KPIs show what someone delivered, and competencies show how. Weight the two by role: more on KPIs where results are easy to count and depend on the person, more on competencies for leadership and coordinating roles.",
      },
      {
        question: "We don't have a KPI framework yet. Can we still start?",
        answer:
          "Yes. Plenty of companies start there. DEUS can help you design KPIs and competencies that fit each role and level, often beginning with a KPI-mapping workshop. The first step is a short review of how your appraisals work today.",
      },
      {
        question: "Can we use our own KPIs and competencies in DEUS Enhance?",
        answer:
          "Yes. You set the KPIs, competencies, weights, formulas, periods and measures, and they can differ by role and level. Performance is then tracked from company level down to each team and individual.",
      },
    ],
  },
  sources: [
    {
      label:
        "Doran (1981), \"There's a S.M.A.R.T. way to write management's goals and objectives,\" Management Review, as summarized on Wikipedia",
      href: "https://en.wikipedia.org/wiki/SMART_criteria",
    },
    {
      label:
        "Locke and Latham (2002), \"Building a practically useful theory of goal setting and task motivation: A 35-year odyssey,\" American Psychologist",
      href: "https://goal-lab.psych.umn.edu/orgpsych/2020/readings/5.%20Motivation/Locke%20&%20Latham%20(2002).pdf",
    },
    {
      label: "CIPD, \"Competence and competency frameworks\" (factsheet)",
      href: "https://cipd.org/en/knowledge/factsheets/competency-factsheet",
    },
  ],
  cta: {
    text: "See how Enhance holds your KPIs, appraisals, calibration and talent mapping in one place.",
    link: { label: "See DEUS Enhance", href: enhance },
  },
  related: [
    "link-performance-appraisal-to-pay",
    "what-is-game-based-assessment",
    "campus-recruitment-screening",
  ],
  // the default closing section and contact bar (content/en/global.md)
  closing: {},
};
