import { formatIDR } from "@/lib/format";
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
  problem: {
    intro: { eyebrow: "The problem", title: "Why traditional psychometric tests fall short in recruitment." },
    items: [
      {
        title: "Candidates study for it",
        body: "Answers to the common personality tests are a quick search away. Results end up measuring how well someone prepared, not who they are.",
      },
      {
        title: "It can't show thinking under pressure",
        body: "Abstract questions on paper say very little about how someone reasons when time is short and the stakes are real.",
      },
      {
        title: "Good candidates quit halfway",
        body: "Long, repetitive assessments lose people before they finish.",
      },
      {
        title: "Manual scoring slows down hiring",
        body: "Your HR team spends days scoring, compiling and formatting results by hand, while candidates wait.",
      },
    ],
    teaser: { label: "Up next →", text: "See what changes when the assessment is a game." },
  },
  principles: {
    intro: { eyebrow: "What's different", title: "A smarter assessment for better hiring results." },
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
        body: "Large applicant pools for any role, and CVs that look alike. Personality and Cognitive give you a clear, defensible ranking.",
      },
      {
        icon: "users",
        title: "Management Trainee recruitment",
        body: "Large applicant pools and very little time. Use Cognitive and Neuroscience to shortlist quickly and fairly, then Simulation for the final round.",
      },
      {
        icon: "target",
        title: "Competency mapping",
        body: "Match each person's profile to your competency framework, see the gaps and build development plans that target them.",
      },
      {
        icon: "compass",
        title: "Leadership identification",
        body: "Find the people inside your company who are ready for supervisor and manager roles. The Neuroscience module's data on risk, motivation and EQ is especially useful here.",
      },
      {
        icon: "lightbulb",
        title: "Promotions and rotations",
        body: "Before you promote, rotate or transfer someone (mutasi), check their fit for the new role with the same evidence you'd use for an outside candidate.",
      },
      {
        icon: "refresh",
        title: "Talent and development programs",
        body: "Decide where training budget goes, and build personal development paths for high-potentials and succession candidates.",
      },
    ],
  },
  howItWorks: {
    intro: {
      eyebrow: "How it works",
      title: "Four steps, and none of them involve scoring by hand.",
    },
    steps: [
      {
        title: "Invite",
        body: "Upload your participant list as a CSV. Branded invitations and reminders go out automatically.",
      },
      {
        title: "Start securely",
        body: "Device checks and anti-cheat logic run before the first game. Nothing to download.",
      },
      {
        title: "Play",
        body: "Candidates work through story scenarios, cognitive games or business simulations, on a phone or a laptop.",
      },
      {
        title: "Decide",
        body: "Scores and reports are ready the moment they finish. Nobody on your team grades anything.",
      },
    ],
    // F70 (D7): what was "Getting started", folded in under the steps, with its button
    start: {
      title: "Start small. See the results. Then decide.",
      items: [
        {
          title: "Free trial",
          body: "Try it yourself, or run it with a small group of employees.",
        },
        {
          title: "Pilot first",
          body: "Prove the fit with one division, one role or one batch before rolling it out.",
        },
        {
          title: "No long-term contract",
          body: "Pay month to month or per batch.",
        },
        {
          title: "Mix and match modules",
          body: "Start with Cognitive alone, for example, and add others later.",
        },
      ],
      cta: { label: "Request a free trial", href: "/contact?product=gba" },
    },
  },
  // F70 (D7): Platform, Science and Before and after as the tabs of one section; each tab is
  // named by its part's eyebrow, and its title is the tab's heading
  behind: {
    intro: { eyebrow: "Behind the results", title: "The platform and the science behind every score." },
  },
  platform: {
    intro: {
      eyebrow: "Platform",
      title: "Running assessments for hundreds of people is a job in itself. The platform does it for you.",
    },
    items: [
      {
        title: "Bulk upload",
        body: "Add an entire MT or campus intake from one CSV file. No typing names one by one.",
      },
      {
        title: "Automatic invitations and reminders",
        body: "Emails go out on schedule, and candidates who haven't started get a nudge.",
      },
      {
        title: "Live progress",
        body: "See at a glance who has started, who has finished and who hasn't opened the invitation yet.",
      },
      {
        title: "Cut-off scores",
        body: "Set a threshold, and candidates below it are flagged automatically.",
      },
      {
        title: "One-click reports",
        body: "Generate an individual report, or the whole batch at once.",
      },
      {
        title: "Role-based access",
        body: "HR, recruiters and hiring managers each see what they need, and nothing more.",
      },
    ],
    alt: "The platform's admin dashboard: the companies, participants and games on it, and each company's usage.",
  },
  reports: {
    intro: { eyebrow: "Reports", title: "The right assessment report for every decision." },
    tabs: [
      {
        label: "Individual report",
        body: "For the hiring manager making a yes-or-no call. An executive summary, overall score and percentile, a breakdown of each competency, strengths, development areas and a clear hiring recommendation with the reasoning behind it.",
        format: "Export as PDF or share a live link.",
        alt: "A hiring overview for ten candidates: 7 of 10 recommended, with each candidate's score under Highly Recommended, Recommended, Considered or Not Recommended.",
      },
      {
        label: "Batch report",
        body: "For HR running an MT intake, a campus drive or a leadership assessment. Cohort overview, averages by domain, the full ranked list of candidates, cut-off flags and a summary for each role track.",
        format: "Download the whole batch as one PDF.",
        alt: "A batch report: the cohort overview (participants, average score, domains assessed), then statistics and score bands for each domain.",
      },
      {
        label: "Interactive dashboard",
        body: "For hiring committees and talent reviews. Filter and sort by role track, module, score band or cut-off status, and click any candidate to open their full profile.",
        format: "Share it with a link.",
        alt: "The interactive dashboard for one candidate: cognitive and neuro percentiles, a radar chart against the batch average and a band distribution.",
      },
    ],
    // The personality module's reports, from the former Discover page.
    // F40: the last tab, with the two reports side by side
    personality: {
      label: "Personality reports",
      title: "Two views: the person, and the fit.",
      items: [
        {
          title: "Personality report",
          body: "A detailed profile of the candidate's personality and competencies, with a written analysis that explains what the scores mean in practice.",
          alt: "A Discover individual report for one candidate: trait bars for each driver, then strengths and areas for improvement.",
        },
        {
          title: "Individual profile suitability",
          body: "How closely the candidate's profile matches what the role needs, so you can see the fit at a glance.",
          alt: "An individual profile suitability report for one candidate: the overall score against the role, a short summary, how far each competency sits above or below what the role expects, then strengths and shortfalls.",
        },
      ],
    },
  },
  // F28: the former Science page, folded in. Frameworks link down to their module sections; then the
  // four phases, three points and the psychologists line. The market comparison sits behind its flag;
  // no validation figures are published until the owner confirms them.
  science: {
    intro: {
      eyebrow: "Science",
      title: "Games, built like serious psychometric assessments.",
      lede: "We didn't invent new theories. We built on proven ones.",
    },
    frameworks: [
      {
        title: "Personality: the Big Five",
        body: "The Big Five (OCEAN) model and a Universal Competency Framework.",
        href: "#personality",
      },
      {
        title: "Thinking: cognitive assessment",
        body: "Classical frameworks for processing speed, memory, reasoning and attention.",
        href: "#cognitive",
      },
      {
        title: "Behavior: neuroscience paradigms",
        // D8 (R15a): takes over the line removed from the Neuroscience module
        body: "Behavioral tasks adapted from neuroscience research, revealing risk-taking, motivation, effort and emotion recognition through what people do rather than what they say.",
        href: "#neuro",
      },
    ],
    process: {
      title: "Four phases, before a single candidate plays.",
      lede: "Every assessment goes through the same development process, guided by psychometricians and industrial and organizational psychology researchers.",
      steps: [
        {
          title: "Theory",
          body: "We start from what the research says the trait or ability is, and how it shows up in behavior.",
        },
        { title: "Item development", body: "We design the game mechanics and scenarios that will draw out that behavior." },
        {
          title: "Validation",
          body: "We test whether the game measures what it's meant to, including against traditional tests.",
        },
        {
          title: "Norming",
          body: "We benchmark results against a reference population, so every score means something.",
        },
      ],
    },
    points: [
      {
        icon: "flask",
        title: "Validated",
        body: "Our cognitive games have been validated against traditional cognitive tests, showing convergent validity: people who score high on one tend to score high on the other. The difference is that ours are faster, more engaging, and much harder to coach for.",
      },
      {
        icon: "map-pin",
        title: "Normed for Indonesia",
        body: [
          ...(siteFlags.showMarketClaim
            ? [
                "Many assessments used in Indonesia are benchmarked against Western populations. That means a candidate's score is measured against people with different schooling, different language and different cultural reference points.",
              ]
            : []),
          "Our assessments are normed on the Indonesian population. When a report says a candidate is in the 80th percentile, it means compared with Indonesians, which is the comparison that matters for your hiring.",
        ].join(" "),
      },
      {
        icon: "target",
        title: "Hard to coach",
        body: "Because the games measure behavior, there are no answers to memorize and very little to look up.",
      },
    ],
    closing: {
      text: "We're happy to take your team, including your in-house psychologists, through how our assessments work and how they're validated.",
      cta: { label: "Request a demo", href: "/contact?product=gba" },
    },
  },
  impact: {
    intro: { eyebrow: "Before and after", title: "What changes for your team." },
    items: [
      {
        icon: "target",
        title: "Better hires",
        body: "Behavioral and cognitive data predicts performance better than an interview and a CV alone.",
      },
      {
        icon: "gauge",
        title: "Faster decisions",
        body: "Scoring and reports are automatic, so a decision that used to take days can happen the same day.",
      },
      {
        icon: "sparkles",
        title: "A stronger employer brand",
        body: "Candidates come away seeing your company as modern and serious about talent. Participants have told us it didn't feel like a psychotest at all.",
      },
      {
        icon: "users",
        title: "Volume without extra workload",
        body: "Run a full MT or campus intake without adding people to your HR team.",
      },
    ],
    badHireCost: siteFlags.showBadHireCost
      ? "One bad hire at manager level typically costs 5 to 10 times more than a year of a full assessment program."
      : undefined,
  },
  clientsLink: { label: "Read client stories", href: "/clients" },
  pricing: {
    intro: {
      eyebrow: "Pricing",
      title: "Pay per candidate. Combine modules any way you like.",
    },
    // Q5 default: the "starting from" price only. `formatIDR` writes it as "IDR 69,000" in English.
    from: { label: "Starting from", amount: 69000, unit: "per candidate" },
    lede: "The price gets lower as your volume grows. Choose one module, two, three or the full suite.",
    cta: { label: "Ask for a quote", href: "/contact?product=gba" },
  },
  faq: {
    intro: { eyebrow: "FAQ", title: "Questions HR teams ask about game-based assessment." },
    items: [
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
      ...(siteFlags.showMinimumOrder
        ? [
            {
              question: "Is there a minimum order?",
              answer:
                `The minimum purchase is ${formatIDR(10_000_000, "en")}. Groups of under 35 people take all four modules; larger groups can choose one to three.`,
            },
          ]
        : []),
      {
        question: "Can we try it first?",
        answer: "Yes. Ask for a free trial, or start with a pilot in one division.",
      },
    ],
  },
  closing: {
    label: "See it for yourself",
    title: ["The best way to understand it", "is to play it."],
    lede: "Request a free trial and try the assessment yourself, or run it with a small group from your team. We'll walk you through the results.",
    cta: { label: "Request a free trial", href: "/contact?product=gba" },
  },
};
