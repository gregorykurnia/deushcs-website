import type { GuideContent } from "../../types";

// Guide 4: Campus recruitment: screening thousands of graduates fairly and fast, from
// content/en/guides/campus-recruitment-screening.md (SEO/geo-implementation-plan.md §S9). Wording is kept as written;
// the `> Note:` lines, "Fact sources" and the italics are dropped, the download offer is the shared block
// (`nextStep.offer`), the closing is the default one, and the SEO title loses its " | DEUS" tail.
//
// No campus client is named or implied, so `telkomNamed` (Q7) needs no branch. The comparison table's empty first
// header is "Factor", so every column has a name.

const gba = "/solutions/game-based-assessment";

export const campusRecruitmentScreeningEn: GuideContent = {
  meta: {
    title: "Campus Recruitment Screening: Rank Graduates Fairly and Fast",
    description:
      "How to screen graduates from many universities fairly and quickly: what grades and CVs can and can't tell you, which assessments to use, and how to check the ranking is fair.",
  },
  slug: "campus-recruitment-screening",
  published: true,
  product: { name: "Game-Based Assessment", path: gba },
  whatsapp: "assessment",
  breadcrumb: "Campus recruitment screening",
  contactHref: "/contact?product=gba",
  dates: { published: "2026-10-23", updated: "2026-10-23" },
  author: "DEUS Human Capital Services",
  header: {
    eyebrow: "Guide · Campus recruitment",
    title: "Campus recruitment: screening thousands of graduates fairly and fast",
    answer:
      "To screen graduates from many universities fairly, give every applicant the same short online assessment, score it the same way against the same norms, and rank on what it measures rather than on the name of the university or the GPA. Personality and cognitive games played in the browser do this for thousands of applicants at once. Then check the pass rates by university before you send the shortlist on.",
    keyPoints: [
      "Grades and CVs separate graduates less well than most recruiters assume. A 2024 meta-analysis found grades predict job performance only modestly.",
      "One assessment for everyone, wherever they studied, is the simplest way to compare applicants from different campuses on equal terms.",
      "Personality shows how a graduate behaves and which competencies they bring. Cognitive shows how quickly they learn and reason.",
      "Compare pass rates across universities and other groups at every stage, and look harder at any stage with a big gap.",
    ],
  },
  nextStep: {
    text: "Running a campus drive this year?",
    link: { label: "See how DEUS screens graduates", href: "/solutions/campus-recruitment-assessment" },
    offer: true,
    useCase: "campus-recruitment-assessment",
  },
  sections: [
    {
      id: "why-hard",
      title: "Why is campus screening so hard to get right?",
      blocks: [
        {
          type: "paragraph",
          text: "A campus drive brings in large applicant pools from many universities, and on paper a lot of them look the same: similar degrees, grades and activities. Three things make the first cut harder than it looks.",
        },
        {
          type: "list",
          items: [
            "**The CV has little to rank on.** Graduates have little or no work history, so recruiters fall back on what's left, usually the university's reputation and the GPA.",
            "**Grades don't travel well.** A 3.5 at one university isn't the same as a 3.5 at another, and grading standards differ between faculties of the same university.",
            "**The usual tests are easy to prepare for.** Answers to the common psikotes are a quick search away, so the results often show how well someone prepared.",
          ],
        },
        {
          type: "paragraph",
          text: "Add a deadline, a team that scores results by hand, and candidates who give up halfway through a long test, and it's easy to end up with a shortlist that's quick but hard to defend.",
        },
      ],
    },
    {
      id: "grades",
      title: "What do grades and the university name tell you?",
      blocks: [
        {
          type: "paragraph",
          text: "Less than you'd hope: a 2024 meta-analysis in the Journal of Applied Psychology combined 114 studies of academic performance and work performance. The average link between the two was .21. Academic performance predicted training performance better, at .34, and didn't predict turnover at all.",
        },
        { type: "paragraph", text: "Two of its findings matter for campus screening:" },
        {
          type: "list",
          items: [
            "**The link varies a lot.** Grades were most useful when the courses were directly relevant to the job, such as practicum classes, where the estimates rose into the .30s and .40s.",
            "**Comparing within a university works better.** Grades predicted better in samples from the same university or major. Across many campuses, the same GPA means different things.",
          ],
        },
        {
          type: "paragraph",
          text: "The study's authors conclude that organizations should think carefully about whether and how grades are relevant to a particular job. For a drive across many universities, that's a case for using grades as an eligibility rule, if at all, and ranking on something everyone takes in the same way.",
        },
        {
          type: "paragraph",
          text: "Filtering on the name of the university has a cost too: it shrinks the pool before you've measured anyone.",
        },
      ],
    },
    {
      id: "which-assessment",
      title: "Which assessment should you use?",
      blocks: [
        {
          type: "paragraph",
          text: "For campus recruitment we pair two DEUS modules. Together they show who each graduate is and how they think.",
        },
        {
          type: "table",
          caption: "The Personality and Cognitive modules for campus recruitment",
          columns: ["Factor", "Personality (DEUS Discover)", "Cognitive"],
          rows: [
            [
              "Format",
              "An RPG-style story where candidates make decisions as it unfolds",
              "Seven short, timed games",
            ],
            [
              "What it shows",
              "32 personality subtraits and 24 competency traits, on the Big Five model, matched to the competencies each role needs",
              "Processing speed, working memory, pattern recognition, arithmetic, spatial and logical reasoning, cognitive agility",
            ],
            [
              "Why it helps on campus",
              "There's no obvious right answer to aim for, so it's hard to rehearse",
              "Measures accuracy and speed in real time, and gives you a benchmark for learning agility",
            ],
            [
              "Results",
              "Profiles the same day or the next",
              "When each candidate finishes",
            ],
          ],
        },
        {
          type: "paragraph",
          text: "The same pairing works for any role with a large applicant pool. For a Management Trainee program, where the final round needs a business simulation, see the guide on Management Trainee recruitment.",
        },
        {
          type: "paragraph",
          text: "Keep the online assessment for the first cut and save the time-consuming methods for the shortlist. Structured interviews are worth that time: a 2022 re-analysis of selection research put them first among common methods for predicting job performance, at .42. They take too long per candidate to run on the whole pool.",
        },
      ],
    },
    {
      id: "run-it",
      title: "How do you run it for many universities at once?",
      blocks: [
        {
          type: "paragraph",
          text: "The logistics are where campus drives lose the most time. A setup that runs like this works for one campus or fifty:",
        },
        {
          type: "list",
          ordered: true,
          items: [
            "**One list.** Add every applicant from one CSV file, whichever campus they applied through. Branded invitations go out automatically, and candidates who haven't started get a reminder.",
            "**Their own device.** Candidates play in a phone or laptop browser, with nothing to download. They need a stable internet connection. Device checks and anti-cheat logic run before the first game.",
            "**Live progress.** You see who has started, who has finished and who hasn't opened the invitation.",
            "**A ranked list.** Each candidate's report is ready when they finish. The batch report ranks every applicant and flags those below your cut-off score, and the interactive dashboard lets your hiring committee filter by score band and open any candidate's full profile.",
          ],
        },
      ],
    },
    {
      id: "fair-ranking",
      title: "How do you check the ranking is fair?",
      blocks: [
        {
          type: "paragraph",
          text: "A process can look fair and still screen out one group far more than another, and counting is the only way to know.",
        },
        {
          type: "list",
          items: [
            "**Compare pass rates.** For each stage, divide the number who passed by the number who took it, separately for each university and region, and for men and women. US hiring rules treat a group's pass rate below four-fifths of the highest group's as a first sign of adverse impact, a simple yardstick you can borrow anywhere.",
            "**Look at each stage.** If one university's graduates pass the assessment at the usual rate but drop out at the interview, the interview is where to look.",
            "**Use the right norms.** Scores should be compared with the population your candidates come from. DEUS assessments are normed on the Indonesian population, not on Western samples.",
            "**Keep the conditions equal.** Everyone takes the same assessment, with the same time limits, on their own device. Nobody gets an advantage because their campus was visited first.",
          ],
        },
        {
          type: "paragraph",
          text: "Early research finds game-related assessments have no greater adverse impact than conventional tests, but the studies are still few and results vary with what's being measured, so check your own numbers.",
        },
      ],
    },
  ],
  faq: {
    eyebrow: "FAQ",
    title: "Questions about campus recruitment screening.",
    items: [
      {
        question: "Should we filter campus applicants by GPA?",
        answer:
          "Use it as an eligibility rule if the role needs one, and rank on something else. A 2024 meta-analysis found grades predict job performance only modestly on average, and the same GPA means different things at different universities. An assessment everyone takes in the same way is easier to compare and to defend.",
      },
      {
        question: "Which assessment works best for campus recruitment?",
        answer:
          "Personality and Cognitive together. Personality shows how each graduate behaves and which competencies they bring, and Cognitive measures speed, accuracy and learning agility. Together they give you a clear, defensible ranking of candidates whose CVs look alike. You can start with one module and add the other later.",
      },
      {
        question: "Do graduates need to install anything?",
        answer:
          "No. The assessment runs in a mobile or desktop browser, so candidates take it on their own phone or laptop with a stable internet connection.",
      },
      {
        question: "How do we know our screening is fair across universities?",
        answer:
          "Compare the pass rate of each university, region and gender at every stage. A group whose pass rate is well below the highest group's, under four-fifths of it as a common rule of thumb, is a reason to look harder at that stage.",
      },
    ],
  },
  sources: [
    {
      label:
        "Van Iddekinge, Arnold, Krivacek, Frieder and Roth (2024), \"Making the grade? A meta-analysis of academic performance as a predictor of work performance and turnover,\" Journal of Applied Psychology",
      href: "https://iro.uiowa.edu/esploro/outputs/journalArticle/Making-the-grade-A-meta-analysis-of/9984699045402771",
    },
    {
      label:
        "O'Shea and Fox Luscombe, \"Is cognitive ability the best predictor of job performance?\", on Sackett, Zhang, Berry and Lievens (2022), TIP, SIOP",
      href: "https://www.siop.org/tip-article/is-cognitive-ability-the-best-predictor-of-job-performance",
    },
    {
      label: "Uniform Guidelines on Employee Selection Procedures, 29 CFR § 1607.4(D), the four-fifths rule",
      href: "https://www.law.cornell.edu/cfr/text/29/1607.4",
    },
    {
      label: "AERA, APA and NCME (2014), Standards for Educational and Psychological Testing (open access)",
      href: "https://www.testingstandards.net/open-access-files.html",
    },
    {
      label:
        "Ramos-Villagrasa, Fernández-del-Río and Castro (2022), \"Game-related assessments for personnel selection: A systematic review,\" Frontiers in Psychology",
      href: "https://doi.org/10.3389/fpsyg.2022.952002",
    },
  ],
  cta: {
    text: "See how DEUS turns one upload of applicants into a ranked list.",
    link: { label: "See the campus recruitment assessment", href: "/solutions/campus-recruitment-assessment" },
  },
  related: [
    "management-trainee-recruitment",
    "game-based-assessment-vs-psychometric-tests",
    "what-is-game-based-assessment",
  ],
  // the default closing section and contact bar (content/en/global.md)
  closing: {},
};
