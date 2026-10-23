import type { GuideContent } from "../../types";

// Guide 5: How to link performance appraisals to pay and bonuses, from
// content/en/guides/link-performance-appraisal-to-pay.md (SEO/geo-implementation-plan.md §S9). Wording is kept as
// written; the `> Note:` lines, "Fact sources" and the italics are dropped, the SEO title loses its " | DEUS" tail,
// and the closing is the default one. There is no download offer: §S9 gives guides 5 and 6 one line to Enhance's
// call to action instead.
//
// No Telkom mention, and no price, minimum order or bad-hire multiple, so the switches in src/content/flags.ts need no branch.

const enhance = "/solutions/enhance";

export const linkPerformanceAppraisalToPayEn: GuideContent = {
  meta: {
    title: "How to Link Performance Appraisals to Pay and Bonuses",
    description:
      "How Indonesian companies connect appraisal results to bonuses and salary increases: what to link and what not to, calibration first, simple pay bands, and the mistakes that break trust.",
  },
  slug: "link-performance-appraisal-to-pay",
  published: true,
  product: { name: "DEUS Enhance", path: enhance },
  whatsapp: "enhance",
  breadcrumb: "Linking appraisals to pay",
  contactHref: "/solutions/enhance#book-a-call",
  dates: { published: "2026-10-23", updated: "2026-10-23" },
  author: "DEUS Human Capital Services",
  header: {
    eyebrow: "Guide · Performance and pay",
    title: "How to link performance appraisals to pay and bonuses",
    answer:
      "To link appraisals to pay, decide which parts of pay should move with performance, calibrate the ratings across managers before anyone sees a number, then turn the calibrated ratings into pay with a simple rule everyone can read: bonus bands for the year's results, and a raise grid that also looks at where each person sits in their salary range. Keep it in one place, so every bonus can be traced back to the rating behind it.",
    keyPoints: [
      "Not all pay should depend on performance. In Indonesia the religious holiday allowance (THR) doesn't, and base pay follows the company's wage structure and scale.",
      "Calibrate before you calculate. Research finds that much of the difference between ratings comes from the person giving them, not the person being rated.",
      "Use bands, not decimals. A rule like \"rating band B earns this bonus range\" is easier to explain than a formula on a score of 3.27.",
      "The test of the whole system is simple: when an employee asks why a colleague got a bigger bonus, can someone answer with evidence?",
    ],
  },
  nextStep: {
    text: "If you'd like us to look at how your appraisals connect to pay today,",
    link: { label: "Book a 30-minute appraisal review", href: "/solutions/enhance#book-a-call" },
  },
  sections: [
    {
      id: "why-drift",
      title: "Why do appraisals and pay drift apart?",
      blocks: [
        {
          type: "paragraph",
          text: "Managers finish the appraisal and hand in a score. Weeks later, someone else works out the bonuses in another spreadsheet, often without the ratings beside them. That's where trust breaks.",
        },
        {
          type: "list",
          items: [
            "**Scattered data.** KPIs and appraisal results sit across Excel files and systems that don't talk to each other. It's the week before calibration, and HR is still pulling scores together.",
            "**Inconsistent standards.** Two managers rate the same performance differently. Nobody notices until calibration, if at all.",
            "**Disconnected rewards.** The bonus gets finalized from a spreadsheet that was never checked against the actual ratings.",
            "**No answer to \"why?\"** An employee asks why a colleague got a bigger bonus, and no one can explain it with objective evidence.",
          ],
        },
        {
          type: "paragraph",
          text: "Fixing this is less about a clever formula than about doing the steps in the right order, with the data in one place.",
        },
      ],
    },
    {
      id: "which-pay",
      title: "Which parts of pay should depend on performance?",
      blocks: [
        {
          type: "paragraph",
          text: "Start by sorting pay into what moves with performance and what doesn't. For an Indonesian company it can look like this:",
        },
        {
          type: "table",
          caption: "Which parts of pay follow performance",
          columns: ["Pay element", "What it rests on", "Link to the appraisal"],
          rows: [
            [
              "Base salary",
              "The company's wage structure and scale (struktur dan skala upah), by job grade",
              "Indirect. The appraisal decides the size of the yearly raise and readiness for promotion, within the scale",
            ],
            [
              "Yearly salary increase",
              "A budget for the year, split by performance and position in the salary range",
              "Direct, through a raise grid (section 5)",
            ],
            [
              "Annual or performance bonus",
              "The year's results for the company, the unit and the person",
              "Direct, through bonus bands (section 5)",
            ],
            [
              "Short-term incentives (sales, production)",
              "Results against a specific target in the period",
              "Direct, but on the measured result, not the appraisal rating",
            ],
            [
              "Religious holiday allowance (THR)",
              "Length of service and one month's wage, set by regulation",
              "None. It isn't a performance reward",
            ],
            [
              "Fixed allowances",
              "The job or the person's circumstances",
              "None",
            ],
          ],
        },
        {
          type: "paragraph",
          text: "Two rules are worth knowing before you design anything. Under Government Regulation 36 of 2021 on wages, employers must draw up and apply a wage structure and scale that takes the company's ability to pay and its productivity into account, and tell each worker about it individually. And under Minister of Manpower Regulation 6 of 2016, workers with 12 months' continuous service or more receive one month's wage as THR (those with at least one month receive a proportional share), paid no later than seven days before the religious holiday. Check the current text of both with your legal team: this guide isn't legal advice.",
        },
        {
          type: "paragraph",
          text: "The practical point: performance pay sits on top of a base that already follows a structure. If the structure is missing, fix that first.",
        },
      ],
    },
    {
      id: "calibration",
      title: "Why must calibration come before the pay decision?",
      blocks: [
        {
          type: "paragraph",
          text: "Because the rating isn't only about the person rated. A study of more than 4,000 managers, each rated for development by seven people (two bosses, two peers, two direct reports and themselves), found that each rater's own rating tendencies accounted for over half of the variation in ratings: 62% in one sample and 53% in the other. The managers' actual performance accounted for less than half as much.",
        },
        {
          type: "paragraph",
          text: "So if you pay straight from raw ratings, part of each bonus depends on who the employee's manager happens to be. Calibration is where you take that out:",
        },
        {
          type: "list",
          ordered: true,
          items: [
            "**Put everyone's ratings side by side**, by department, plant or level, before anything is decided.",
            "**Look for patterns before individuals.** A manager whose whole team is rated top, or a plant that rates two bands below the others, is the first thing to discuss.",
            "**Ask for evidence.** Any rating that moves in calibration should move because of KPI results or examples of behavior, not because of who argues hardest.",
            "**Freeze the ratings.** Only calibrated ratings go into the pay calculation.",
          ],
        },
        {
          type: "paragraph",
          text: "In DEUS Enhance, the calibration matrix shows everyone's evaluations together, so ratings that don't follow the same standard stand out.",
        },
      ],
    },
    {
      id: "pay-rules",
      title: "How do you turn calibrated ratings into pay?",
      blocks: [
        { type: "paragraph", text: "Two simple tools do most of the work." },
        {
          type: "paragraph",
          text: "**Bonus bands.** Group the final ratings into a few bands and give each band a bonus range, for example as a multiple of monthly base pay or a percentage of a target bonus. Similar performance gets a similar reward, and the band is easy to explain. If the company or the unit had a weak year, shrink the pool, not the link between band and range.",
        },
        {
          type: "paragraph",
          text: "**A raise grid.** A merit matrix sets each person's salary increase from two things: their performance rating and their position in the salary range for their grade, often measured as a compa-ratio (salary divided by the midpoint of the range). A strong performer paid below the midpoint gets a bigger percentage raise than an equally strong performer already paid above it. That moves pay toward the midpoint over time instead of further above it.",
        },
        { type: "paragraph", text: "An example, in words rather than percentages, to show the shape only:" },
        {
          type: "table",
          caption: "An example raise grid, with words instead of percentages",
          columns: ["Rating band", "Below midpoint", "Around midpoint", "Above midpoint"],
          rows: [
            ["A", "Largest raise", "Large raise", "Moderate raise"],
            ["B", "Large raise", "Moderate raise", "Small raise"],
            ["C", "Small raise", "Small raise", "No raise, or a one-off payment"],
            ["D", "No raise, and a development plan", "No raise", "No raise"],
          ],
        },
        {
          type: "paragraph",
          text: "Decide the bands, the ranges and the grid before the ratings come in, and share the rules with managers. Changing them after you've seen the names is how a fair system stops looking fair.",
        },
        {
          type: "paragraph",
          text: "In Enhance you set up each bonus cycle and who takes part, group similar performance into similar rewards, and plan raises beside the performance behind them.",
        },
      ],
    },
    {
      id: "mistakes",
      title: "What are the most common mistakes?",
      blocks: [
        {
          type: "list",
          items: [
            "**Paying on a score nobody calibrated.** Part of each bonus then depends on the rater (section 4).",
            "**Too many decimals.** A formula on a 3.27 rating looks precise, but the rating isn't that precise. Bands are more honest.",
            "**Changing the rules after the ratings.** Agree the bands and the grid first.",
            "**Mixing up rewards and allowances.** THR and fixed allowances aren't levers for performance, and treating them as one confuses everyone.",
            "**Measuring only results.** If the appraisal ignores how people work (the competencies), the bonus can reward results reached in ways you don't want. See the guide on setting KPIs and competencies.",
            "**No explanation for the employee.** Each person should see their KPI results, their competency results, the calibrated rating and the band it put them in.",
          ],
        },
      ],
    },
  ],
  faq: {
    eyebrow: "FAQ",
    title: "Questions about linking appraisals to pay.",
    items: [
      {
        question: "Should the bonus come straight from the appraisal score?",
        answer:
          "From the calibrated score, grouped into bands. A raw score carries each rater's habits, and research finds those habits explain over half of the variation in ratings. Calibrate first, then map each band to a bonus range.",
      },
      {
        question: "Is THR part of performance pay?",
        answer:
          "No. THR is a religious holiday allowance set by Minister of Manpower Regulation 6 of 2016: one month's wage for workers with 12 months' continuous service or more, and a proportional share for those with at least one month, paid at least seven days before the holiday. It doesn't depend on the appraisal.",
      },
      {
        question: "What is a merit matrix?",
        answer:
          "A grid that sets each person's salary increase from their performance rating and their position in the salary range for their grade. Strong performers paid below the midpoint get bigger raises, so pay moves toward the midpoint over time.",
      },
      {
        question: "Can DEUS Enhance link appraisals to pay?",
        answer:
          "Yes. KPIs, appraisals, calibration and talent mapping sit in one platform, and the calibrated results feed bonus cycles, reward grouping and raise planning. Enhance works alongside your existing HRIS, ERP and payroll, and we agree how data moves between them during scoping.",
      },
    ],
  },
  sources: [
    {
      label:
        "Hukumonline (2021), \"4 ketentuan penting dalam PP Pengupahan yang patut dicermati,\" on Government Regulation (PP) 36/2021 on wages",
      href: "https://www.hukumonline.com/berita/a/4-ketentuan-penting-dalam-pp-pengupahan-yang-patut-dicermati-lt607549f6d1bd0",
    },
    {
      label:
        "Hukumonline (2016), \"Info penting: 5 pedoman pemberian THR tahun 2016,\" on Minister of Manpower Regulation (Permenaker) 6/2016",
      href: "https://www.hukumonline.com/berita/a/info-penting-5-pedoman-pemberian-thr-tahun-2016-lt575e38c5f2e1f/",
    },
    {
      label:
        "Scullen, Mount and Goff (2000), \"Understanding the latent structure of job performance ratings,\" Journal of Applied Psychology",
      href: "https://doi.org/10.1037/0021-9010.85.6.956",
    },
    {
      label: "Deel, \"Merit matrix\" (glossary)",
      href: "https://www.deel.com/glossary/merit-matrix/",
    },
  ],
  cta: {
    text: "See how Enhance connects the rating to the reward, from KPI setup to the bonus cycle.",
    link: { label: "See linking appraisal to pay", href: "/solutions/performance-appraisal-and-pay" },
  },
  related: [
    "kpis-and-competencies-for-appraisal",
    "management-trainee-recruitment",
    "what-is-game-based-assessment",
  ],
  // the default closing section and contact bar (content/en/global.md)
  closing: {},
};
