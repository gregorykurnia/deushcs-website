import { siteFlags } from "../flags";
import type { GbaContent } from "../types";

// Game-Based Assessment page copy, from content/en/game-based-assessment.md. Wording is kept as
// written. The `> Note:` and [VERIFY] lines are dropped; the [VERIFY] claims sit behind siteFlags.

export const gbaEn: GbaContent = {
  meta: {
    // R15a (F60, F69): carries "game-based assessment" and "talent assessment" for search
    title: "Game-Based Assessment: Talent Assessment for Hiring",
    description:
      "Game-based assessment for hiring: personality, cognitive, neuroscience and simulation games on one talent assessment platform. Normed on Indonesians, built for volume.",
  },
  hero: {
    // F60 (D9, provisional): the headline repeats the product's name; the line above it stays the
    // name the menu, footer and contact form use (round 3 review)
    eyebrow: "Game-Based Assessment",
    title: "Game-based assessment for hiring.",
    lede: "Four modules of short games that measure personality, cognitive ability, behavior and business judgment. Candidates enjoy taking them, and you get data they couldn't have rehearsed, with reports ready as soon as each candidate finishes.",
    ctas: [
      { label: "Request a free trial", href: "/contact?product=gba" },
      { label: "Book a demo", href: "/contact?product=gba" },
    ],
    // Illustrative sample data (DESIGN-GUIDE.md §8.3); it goes on the launch checklist.
    window: {
      story: {
        title: "Plays DEUS Discover",
        meta: "22 minutes",
        alt: "The DEUS Discover title screen, Heroes of a Fallen Land, with a Begin Adventure button.",
      },
      cognitive: {
        title: "Plays a cognitive game",
        meta: "Scored as it ends",
        alt: "A cognitive game screen: number blocks on a cart, and a target to reach.",
      },
      suitability: {
        title: "Suitability for a role",
        alt: "A suitability report for a Service Crew candidate: 90 out of 100, Highly Recommended, 99th percentile, with a short summary and their top competencies.",
      },
    },
  },
  principles: {
    // Round 4 (§S3): the first section after the hero, with no label. Its lede was the answer passage
    // (G1.5, GEO §S2) until the owner asked for a much shorter one (2026-10-27).
    intro: {
      title: "What makes our assessments different.",
      lede: "Candidates play short games instead of filling in a questionnaire. The games are normed on Indonesians, run in any browser, and give you results the same day or the next.",
    },
    items: [
      {
        icon: "gauge",
        title: "Real behavior signals",
        body: "Candidates can't fake how they play. Scoring looks at each choice and how quickly it's made, even under time pressure.",
      },
      {
        icon: "flask",
        title: "Scientifically grounded",
        body: "Built on the Big Five, neuroscience research and cognitive psychology, and normed on the Indonesian population.",
      },
      {
        icon: "shield",
        title: "Enterprise-ready",
        body: "Use one module or all four. A nationwide intake is as manageable as a single team's hire.",
      },
    ],
  },
  // The four modules as one 2 × 2 grid of cards (round 4 §S2), in page order. Personality is the
  // former DEUS Discover page, the other three the former Next Chapter page; the name "Next
  // Chapter" is no longer used. Each card keeps its anchor (menu, use-case pages, redirects).
  modules: {
    intro: {
      eyebrow: "The suite · 4 modules",
      title: "All your talent assessments on one platform.",
      lede: "Use any module on its own or combine them. Their reports are produced automatically.",
    },
    cards: [
      {
        id: "personality",
        title: "DEUS Discover: Personality Test",
        body: "Candidates play through an RPG-style story and decide what to do at each turn. Their choices show how they tend to behave at work.",
        measures:
          "**32** personality subtraits and **24** competency traits, based on the Big Five (OCEAN) model. You can add competencies from your own framework.",
        screen: {
          image: "discoverFestival",
          alt: "A DEUS Discover story scene at a town festival: \"What to do for fun at the festival?\", with four answers to rank.",
        },
      },
      {
        id: "cognitive",
        title: "Cognitive Assessment",
        body: "Seven short, timed games that measure how quickly and accurately someone processes information.",
        measures:
          "**7 games:** processing speed, working memory, pattern recognition, arithmetic, spatial reasoning, logical reasoning and cognitive agility.",
        screen: {
          image: "gameObjectiveShooter",
          alt: "Objective Shooter: three numbered medallions hanging over mountains, to be put in order from smallest to largest.",
        },
      },
      {
        id: "neuro",
        title: "Neuroscience Assessment",
        body: "Six games adapted from tasks used in neuroscience research. They pick up behavior people don't consciously control.",
        measures:
          "**6 games:** risk-taking, planning, motivation, effort allocation, attention to detail and emotion recognition.",
        screen: {
          image: "gameBalloon",
          alt: "The Balloon Game: a balloon pumped 15 times, with a button to pump it again for more money and one to bank the money and move on.",
        },
      },
      {
        id: "simulation",
        title: "Simulation Assessment",
        body: "Two timed business cases. In one, candidates review information and write a business report; in the other, they split a budget while a timer runs. Both can be set in your industry.",
        measures:
          "**2 scenarios:** analytical thinking, financial and business acumen, diagnostic information gathering and written synthesis.",
        screen: {
          image: "gbaSimulation",
          alt: "Business Operations: a mini case analysis with a calculator.",
        },
      },
    ],
  },
  useCases: {
    intro: {
      eyebrow: "Where clients use it",
      title: "Talent assessment for each stage of the employee lifecycle.",
    },
    items: [
      {
        icon: "map-pin",
        title: "Recruitment",
        useCase: "campus-recruitment-assessment",
        body: "Applicant pools are large for any role, and the CVs look alike. Personality and Cognitive give you a clear, defensible ranking.",
      },
      {
        icon: "refresh",
        title: "Internal development and training",
        body: "Decide where training budget goes, and build personal development paths for high-potentials and succession candidates.",
      },
      {
        icon: "target",
        title: "Talent mapping and promotions",
        useCase: "talent-mapping",
        body: "See how your people compare with your competency framework and who is ready for a supervisor or manager role. Use the same evidence before a promotion or rotation (mutasi).",
      },
    ],
  },
  clientsLink: { label: "Read client stories", href: "/clients" },
  faq: {
    intro: { eyebrow: "FAQ", title: "Questions HR teams ask about game-based assessment." },
    // G1.5 (GEO §S3): the buyer questions (psikotes, validity, uses, modules, volume) are new; round 4 dropped the cost and minimum-order items
    items: [
      {
        question: "How is it different from a traditional psychometric test (psikotes)?",
        answer:
          "It measures what candidates do, not what they say about themselves. Answers to a traditional psikotes can be looked up and rehearsed. Our games score each choice and how quickly it's made, even under time pressure, so candidates can't fake how they play. The games are faster and more engaging than a long questionnaire, and scoring is automatic instead of by hand.",
      },
      {
        question: "Is game-based assessment scientifically valid?",
        answer:
          "Yes. Our games are built like serious psychometric assessments, on the Big Five, classical cognitive frameworks and neuroscience research. Each one goes through theory, item development, validation and norming, guided by psychometricians and industrial and organizational psychology researchers. Our cognitive games have been validated against traditional cognitive tests, and every assessment is normed on the Indonesian population.",
      },
      {
        question: "What can we use it for?",
        answer:
          "Use it for hiring and talent decisions, such as recruitment, Management Trainee intakes, competency mapping and leadership identification. It also checks fit before a promotion, rotation or transfer (mutasi), and shows where training budget should go for high-potentials and succession candidates.",
      },
      {
        question: "Which modules should we choose?",
        answer:
          "Choose the modules that match the decision. For recruitment, Personality and Cognitive give you a clear, defensible ranking. For a Management Trainee intake, use Cognitive and Neuroscience to shortlist, then Simulation for the final round. To find future leaders, the Neuroscience module's data on risk, motivation and EQ is especially useful. You can start with one module and add others later.",
      },
      {
        question: "Do candidates need to install anything?",
        answer:
          "No. The assessment runs in a mobile or desktop browser. Candidates only need a stable internet connection.",
      },
      {
        question: "How quickly do we get results?",
        answer:
          "Scores and reports are generated as soon as each candidate finishes. Personality profiles are ready the same day or the next.",
      },
      {
        question: "What reports do we get?",
        answer:
          "You get an individual report for each candidate, a batch report for the whole intake, and an interactive dashboard your hiring committee can filter and sort. They're produced automatically when each candidate finishes. The individual report shows an overall score and percentile, each competency, strengths, development areas and a hiring recommendation, as a PDF or a live link. Personality also comes with a written profile and how closely the candidate matches the role.",
      },
      {
        // the Telkom numbers, anonymised while siteFlags.telkomNamed is off (Q7)
        question: "How many candidates can it handle at once?",
        answer: `As many as you need, at the same time. ${siteFlags.telkomNamed ? "Telkom Group" : "A national telecom group"} used DEUS to assess more than 1,000 Management Trainee candidates across 30+ provinces at once, with results within a day, two years in a row. The platform sends the invitations and reminders, tracks progress and generates the reports, so a nationwide intake doesn't mean adding people to your HR team.`,
      },
      {
        question: "Can candidates cheat?",
        answer:
          "Every session starts with device checks and anti-cheat logic. Because the games measure how candidates behave, there's little to look up or memorize.",
      },
      {
        question: "Can we assess against our own competency framework?",
        answer:
          "Yes. Results can be expressed in your organization's language, mapped to the competencies each role needs, and set in scenarios from your industry.",
      },
      {
        question: "Is it designed for Indonesian candidates?",
        answer:
          "Yes. Our assessments are normed on the Indonesian population, so scores are compared against relevant local benchmarks.",
      },
      {
        question: "Can we try it first?",
        answer: "Yes. Ask for a free trial, or start with a pilot in one division.",
      },
    ],
  },
  relatedGuide: "what-is-game-based-assessment",
  closing: {
    label: "See it for yourself",
    title: ["The best way to understand it", "is to play it."],
    lede: "Request a free trial and try the assessment yourself, or run it with a small group from your team. We'll walk you through the results.",
    cta: { label: "Request a free trial", href: "/contact?product=gba" },
  },
};
