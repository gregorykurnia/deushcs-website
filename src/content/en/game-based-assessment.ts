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
    title: "Game-based assessment for better hiring.",
    lede: "A modular assessment suite that measures personality, cognitive ability, behavior and business judgment through games. Candidates enjoy taking it. You get data they couldn't have rehearsed, with reports generated the moment they finish.",
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
    // Round 4 (§S3): the first section after the hero, with no label. Its lede is the answer passage
    // (G1.5, GEO §S2) that opened The problem, now without the price.
    intro: {
      title: "A smarter assessment for better hiring results.",
      lede: "Game-based assessment measures how candidates think and behave through short games instead of a questionnaire. The DEUS suite has four modules, Personality, Cognitive, Neuroscience and Simulation, normed on the Indonesian population. It runs in any phone or laptop browser with no app, and results are ready the same day or the next. Companies in Indonesia use it for high-volume hiring and talent decisions.",
    },
    items: [
      {
        icon: "gauge",
        title: "Real behavior signals",
        body: "Candidates can't fake how they play. Every choice, every hesitation and every reaction under time pressure becomes data.",
      },
      {
        icon: "flask",
        title: "Scientifically grounded",
        body: "Built on the Big Five, neuroscience research and cognitive psychology, and normed on the Indonesian population.",
      },
      {
        icon: "shield",
        title: "Enterprise-ready",
        body: "Modular, scalable and run from one platform, so a nationwide intake is as manageable as a single team's hire.",
      },
    ],
  },
  // The four modules, one section each (F10): Personality is the former DEUS Discover page, the
  // other three the former Next Chapter page, with their wording kept. The name "Next Chapter" is
  // no longer used.
  modules: {
    intro: {
      eyebrow: "The suite · 4 modules",
      title: "All your talent assessments on one platform.",
      lede: "Every module runs on the same platform, and reports are generated automatically.",
    },
    navLabel: "Game-Based Assessment modules",
    nav: [
      { id: "personality", label: "Personality" },
      { id: "cognitive", label: "Cognitive" },
      { id: "neuro", label: "Neuroscience" },
      { id: "simulation", label: "Simulation" },
    ],
    // F40: the link at the end of each module to the next tab; {module} is the next one's label
    next: "Next module: {module}",
    personality: {
      id: "personality",
      intro: {
        eyebrow: "Module 1 of 4",
        // F64 (D9): the module's name as its title; the sub-line is F23's line, from Discover's closer
        title: "DEUS Discover: Personality Test",
        subtitle: "Know your candidates before the interview.",
        lede: "Discover puts candidates inside an RPG-style story and asks them to make decisions as it unfolds. The way they handle each situation builds a detailed picture of their personality and competencies, measured against the framework your organization already uses.",
      },
      story: {
        title: "A questionnaire asks people who they are. A story shows you.",
        paragraphs: [
          "Most personality tests ask candidates to rate themselves: \"I enjoy meeting new people\", agree or disagree. It's easy to work out what the employer wants to hear.",
          "Discover takes a different route. It's a digital situational judgment test, delivered as a narrative game. Candidates face situations and dilemmas as the story moves on, and choose what to do next. There's no obvious right answer to aim for, so what you see is closer to how they really behave at work.",
        ],
        alt: "A DEUS Discover story scene at a town festival: \"What to do for fun at the festival?\", with four answers to rank.",
      },
      measures: {
        title: "What it measures",
        stats: [
          { value: "32", label: "personality subtraits" },
          { value: "24", label: "competency traits" },
          { value: "Custom", label: "competencies from your own framework" },
        ],
        lede: "Built on the **Big Five (OCEAN)** model of personality and a **Universal Competency Framework**, and written up as an in-depth qualitative analysis, not just a row of scores.",
      },
      // F64: the panels' heading ("Results that read like…") is gone; the panels stay
      customization: {
        items: [
          {
            icon: "lightbulb",
            title: "Your organization's language",
            body: "Results are framed around your own competency framework, using the terms your managers already know.",
          },
          {
            icon: "compass",
            title: "Mapped to each role",
            body: "A finance analyst and a sales lead need different strengths. Discover measures each role against the competencies that role actually requires.",
          },
          {
            icon: "map-pin",
            title: "Scenarios from your world",
            body: "The story's situations, industry context and business language can reflect your company, so candidates recognize the kind of work they're applying for.",
          },
        ],
      },
    },
    cognitive: {
      id: "cognitive",
      intro: {
        eyebrow: "Module 2 of 4",
        title: "Cognitive Assessment",
        subtitle: "Measure cognitive skills through seven interactive games.",
        lede: "Short, focused games that measure how fast and how accurately someone processes information. Because they're timed and interactive, they capture speed and consistency as well as correct answers.",
      },
      games: [
        {
          name: "Objective Shooter",
          measures: "Processing speed and precision",
          alt: "Objective Shooter: three numbered medallions hanging over a mountain landscape, to be put in order from smallest to largest.",
        },
        {
          name: "Reverse Retention",
          measures: "Working memory",
          alt: "Reverse Retention: three objects to remember, shown above a character walking along a colonnade.",
        },
        {
          name: "Odd One Out",
          measures: "Pattern recognition",
          alt: "Odd One Out: four round picture badges on a meadow, and the instruction to pick the one that differs most.",
        },
        {
          name: "Mallet Math",
          measures: "Arithmetic and problem solving",
          alt: "Mallet Math: number blocks on a horse-drawn cart, and a target to reach.",
        },
        {
          name: "Object Turn",
          measures: "Spatial reasoning",
          alt: "Object Turn: a target shape at the top, and blocks below to tap and slide until they match it.",
        },
        {
          name: "Match Blast",
          measures: "Logical reasoning",
          alt: "Match Blast: four picture cards, and the instruction to pick every card that fits the category \"plants\".",
        },
        {
          name: "Speed Sorting",
          measures: "Cognitive agility",
          alt: "Speed Sorting: a grid of tiles on an old map, with arrow buttons below it.",
        },
      ],
      missGain: {
        miss: {
          title: "What traditional tests miss",
          points: [
            "Answers can be coached or memorized.",
            "They show whether someone got it right, not how fast or how consistently.",
            "They're hard to run for large hiring volumes.",
          ],
        },
        gain: {
          title: "What you get instead",
          points: [
            "Accuracy and speed measured in real time.",
            "A benchmark for learning agility.",
            "As many candidates as you need, at once.",
          ],
        },
      },
    },
    neuro: {
      id: "neuro",
      intro: {
        eyebrow: "Module 3 of 4",
        title: "Neuroscience Assessment",
        subtitle: "See how candidates really behave, not only what they say.",
        lede: "Six games based on established neuroscience research. They capture motivation, appetite for risk, how people decide where to put their effort, and how well they read emotions, all through behavior people don't consciously control.",
      },
      games: [
        {
          name: "Balloon Game",
          measures: "Risk-taking and learning ability",
          alt: "The Balloon Game: a balloon pumped 15 times, with a button to pump it again for more money and one to bank the money and move on.",
        },
        {
          name: "Tower Game",
          measures: "Planning and problem solving",
          alt: "The Tower Game: cake layers on three pegs, to be moved onto the target peg in as few moves as possible.",
        },
        {
          name: "Keypress Game",
          measures: "Motivation and processing speed",
          alt: "The Keypress Game: a countdown timer, a count of key presses so far and a space bar to press as fast as you can.",
        },
        {
          name: "Hard or Easy Task",
          measures: "Effort allocation and decision making",
          alt: "The Hard or Easy Task: a hard task under way, with a progress ring, a space bar to press and a countdown.",
        },
        {
          name: "Lengths Game",
          measures: "Attention to detail",
          alt: "The Lengths Game: two smiling faces side by side, and the question of which one has the longer mouth.",
        },
        {
          name: "Faces Game",
          measures: "Emotional intelligence, empathy and emotion recognition",
          alt: "The Faces Game: a surprised face, and a list of emotions to choose from.",
        },
      ],
      missGain: {
        miss: {
          title: "What interviews miss",
          points: [
            "Motivation is easy to misjudge in a one-hour conversation.",
            "Someone's appetite for risk usually shows up months after they're hired.",
            "Emotional intelligence is hard to assess fairly.",
          ],
        },
        gain: {
          title: "What you get instead",
          points: [
            "Behavioral data from what people actually do.",
            "An early view of each person's risk profile.",
            "Insight into emotion recognition, especially useful for leadership and customer-facing roles.",
          ],
        },
      },
    },
    simulation: {
      id: "simulation",
      intro: {
        eyebrow: "Module 4 of 4",
        title: "Simulation Assessment",
        subtitle: "Test business problem-solving skills against the clock.",
        lede: "Two business scenarios that put candidates to work: analyzing cases, investigating information, writing reports and allocating budgets. Both can be customized to your industry through the platform.",
      },
      scenarios: [
        {
          label: "Game 1",
          name: "Business Operations",
          body: "Review the cases, dig into the information and write a business report.",
          measures: "Measures judgment, accuracy and analytical communication.",
        },
        {
          label: "Game 2",
          name: "Event Operations",
          body: "Allocate a budget under a live timer, then report on the decisions.",
          measures: "Measures prioritization, resource allocation and decision speed.",
        },
      ],
      assesses: {
        title: "What it assesses",
        points: [
          "Analytical thinking",
          "Financial and business acumen",
          "Diagnostic information gathering",
          "Written synthesis",
        ],
      },
      missGain: {
        miss: {
          title: "What case interviews miss",
          points: [
            "Candidates memorize consulting frameworks.",
            "Assessment centers are expensive and hard to scale.",
            "Generic cases have little to do with your business.",
          ],
        },
        gain: {
          title: "What you get instead",
          points: [
            "Cases set in your own industry.",
            "A clear view of prioritization, accuracy and analysis under real time pressure.",
            "The same scenario for every candidate, at any volume.",
          ],
        },
      },
    },
  },
  useCases: {
    intro: {
      eyebrow: "Where clients use it",
      title: "Talent assessment from your MT intake to your next generation of leaders.",
    },
    items: [
      {
        icon: "map-pin",
        title: "Recruitment",
        useCase: "campus-recruitment-assessment",
        body: "Large applicant pools for any role, and CVs that look alike. Personality and Cognitive give you a clear, defensible ranking.",
      },
      {
        icon: "users",
        title: "Management Trainee recruitment",
        useCase: "management-trainee-assessment",
        body: "Large applicant pools and very little time. Use Cognitive and Neuroscience to shortlist quickly and fairly, then Simulation for the final round.",
      },
      {
        icon: "target",
        title: "Competency mapping",
        useCase: "talent-mapping",
        body: "Match each person's profile to your competency framework, see the gaps and build development plans that target them.",
      },
      {
        icon: "compass",
        title: "Leadership identification",
        useCase: "talent-mapping",
        body: "Find the people inside your company who are ready for supervisor and manager roles. The Neuroscience module's data on risk, motivation and EQ is especially useful here.",
      },
      {
        icon: "lightbulb",
        title: "Promotions and rotations",
        useCase: "talent-mapping",
        body: "Before you promote, rotate or transfer someone (mutasi), check their fit for the new role with the same evidence you'd use for an outside candidate.",
      },
      {
        icon: "refresh",
        title: "Talent and development programs",
        useCase: "talent-mapping",
        body: "Decide where training budget goes, and build personal development paths for high-potentials and succession candidates.",
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
          "It measures what candidates do, not what they say about themselves. Answers to a traditional psikotes can be looked up and rehearsed. In our games, every choice, every hesitation and every reaction under time pressure becomes data, so candidates can't fake how they play. The games are faster and more engaging than a long questionnaire, and scoring is automatic instead of by hand.",
      },
      {
        question: "Is game-based assessment scientifically valid?",
        answer:
          "Yes. Our games are built like serious psychometric assessments, on the Big Five, classical cognitive frameworks and neuroscience research. Each one goes through theory, item development, validation and norming, guided by psychometricians and industrial and organizational psychology researchers. Our cognitive games have been validated against traditional cognitive tests, and every assessment is normed on the Indonesian population.",
      },
      {
        question: "What can we use it for?",
        answer:
          "Hiring and talent decisions, from your MT intake to your next generation of leaders. Use it for recruitment, Management Trainee intakes, competency mapping and leadership identification. It also checks fit before a promotion, rotation or transfer (mutasi), and shows where training budget should go for high-potentials and succession candidates.",
      },
      {
        question: "Which modules should we choose?",
        answer:
          "Choose the modules that match the decision. For recruitment, Personality and Cognitive give you a clear, defensible ranking. For a Management Trainee intake, use Cognitive and Neuroscience to shortlist, then Simulation for the final round. To find future leaders, the Neuroscience module's data on risk, motivation and EQ is especially useful. You can start with one module and add others later.",
      },
      {
        question: "Do candidates need to install anything?",
        answer:
          "No. The assessment runs in a mobile or desktop browser. Candidates just need a stable internet connection.",
      },
      {
        question: "How quickly do we get results?",
        answer:
          "Scores and reports are generated as soon as each candidate finishes. Personality profiles are ready the same day or the next.",
      },
      {
        // the Telkom numbers, anonymised while siteFlags.telkomNamed is off (Q7)
        question: "How many candidates can it handle at once?",
        answer: `As many as you need, at the same time. ${siteFlags.telkomNamed ? "Telkom Group" : "A national telecom group"} used DEUS to assess more than 1,000 Management Trainee candidates across 30+ provinces at once, with results within a day, two years in a row. The platform sends the invitations and reminders, tracks progress and generates the reports, so a nationwide intake doesn't mean adding people to your HR team.`,
      },
      {
        question: "Can candidates cheat?",
        answer:
          "Every session starts with device checks and anti-cheat logic. And because the games measure behavior, not answers, there's very little to look up or memorize.",
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
