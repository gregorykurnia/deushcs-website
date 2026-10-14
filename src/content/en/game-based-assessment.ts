import { siteFlags } from "../flags";
import type { GbaContent } from "../types";

// Game-Based Assessment page copy, from content/en/game-based-assessment.md. Wording is kept as
// written. The `> Note:` and [VERIFY] lines are dropped; the [VERIFY] claims sit behind siteFlags.

// Until Q7 is confirmed, the Telkom card runs anonymised and carries no numbers (WEBSITE-PLAN §5.3).
const telkomLine = siteFlags.telkomNamed
  ? "Telkom Group: Management Trainee recruitment, with results in one day."
  : "A national telecom group: Management Trainee recruitment, with results in one day.";

export const gbaEn: GbaContent = {
  meta: {
    title: "Game-Based Assessment for Hiring and Talent Mapping",
    description:
      "Personality, cognitive, neuroscience and business simulation games that measure what candidates can't rehearse. Normed on Indonesians, built for high-volume MT and campus hiring.",
  },
  hero: {
    eyebrow: "Game-Based Assessment",
    title: "Reveal real potential through play.",
    lede: "A modular assessment suite that measures personality, cognitive ability, behavior and business judgment through games. Candidates enjoy taking it. You get data they couldn't have rehearsed, with reports generated the moment they finish.",
    ctas: [
      { label: "Request a free trial", href: "/contact?product=gba" },
      { label: "Book a demo", href: "/contact?product=gba" },
    ],
  },
  problem: {
    intro: { eyebrow: "The problem", title: "The usual psychotest has stopped telling you much." },
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
        title: "Scoring eats your week",
        body: "Your HR team spends days scoring, compiling and formatting results by hand, while candidates wait.",
      },
    ],
    teaser: { label: "Up next →", text: "See what changes when the assessment is a game." },
  },
  principles: {
    intro: { eyebrow: "What's different", title: "Built so the results are worth trusting." },
    items: [
      {
        title: "Real behavior signals",
        body: "Candidates can't fake how they play. Every choice, every hesitation and every reaction under time pressure becomes data.",
      },
      {
        title: "Scientifically grounded",
        body: "Built on the Big Five, neuroscience research and cognitive psychology, and normed on the Indonesian population.",
      },
      {
        title: "Enterprise-ready",
        body: "Modular, scalable and run from one platform, so a nationwide intake is as manageable as a single team's hire.",
      },
    ],
  },
  modules: {
    intro: { eyebrow: "The suite · 04 modules", title: "Four modules. Use one, or use them all." },
    items: [
      {
        name: "Personality",
        tag: "DEUS Discover",
        body: "An RPG-style story where candidates make decisions as the plot unfolds. Measures 32 personality subtraits and 24 competencies, plus any your organization defines.",
        cta: { label: "Explore DEUS Discover →", href: "/solutions/discover" },
      },
      {
        name: "Cognitive",
        tag: "7 games",
        body: "Fast, focused games covering processing speed, working memory, pattern recognition, arithmetic, spatial and logical reasoning, and how quickly someone switches between tasks.",
        cta: { label: "See the cognitive games →", href: "/solutions/next-chapter#cognitive" },
      },
      {
        name: "Neuroscience",
        tag: "6 games",
        body: "Short games that capture motivation, risk-taking, effort and emotional intelligence through behavior people don't consciously control.",
        cta: { label: "See the neuroscience games →", href: "/solutions/next-chapter#neuro" },
      },
      {
        name: "Simulation",
        tag: "2 business scenarios",
        body: "Realistic business cases: investigate and write the report, or allocate a budget against the clock. Customized to your industry.",
        cta: { label: "See the simulations →", href: "/solutions/next-chapter#simulation" },
      },
    ],
    note: "Start with the module you need most. Add the others when you've seen the results.",
  },
  useCases: {
    intro: {
      eyebrow: "Where clients use it",
      title: "From your MT intake to your next generation of leaders.",
    },
    items: [
      {
        title: "Management Trainee recruitment",
        body: "Large applicant pools and very little time. Use Cognitive and Neuro to shortlist quickly and fairly, then Simulation for the final round.",
      },
      {
        title: "Campus recruitment",
        body: "Large applicant pools from many universities, and CVs that look alike. Personality and Cognitive give you a clear, defensible ranking.",
      },
      {
        title: "Competency mapping",
        body: "Match each person's profile to your competency framework, see the gaps and build development plans that target them.",
      },
      {
        title: "Leadership identification",
        body: "Find the people inside your company who are ready for supervisor and manager roles. The Neuro module's data on risk, motivation and EQ is especially useful here.",
      },
      {
        title: "Internal talent mapping",
        body: "See how capability is spread across teams and divisions, including high-potentials nobody has noticed yet.",
      },
      {
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
    chips: [
      "Anti-cheat proctoring",
      "Works on mobile and desktop browsers",
      "No manual scoring",
      "Flexible deployment",
    ],
  },
  platform: {
    intro: {
      eyebrow: "The platform behind it",
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
  },
  reports: {
    intro: { eyebrow: "Reports", title: "The right report for every decision." },
    tabs: [
      {
        label: "Individual report",
        body: "For the hiring manager making a yes-or-no call. An executive summary, overall score and percentile, a breakdown of each competency, strengths, development areas and a clear hiring recommendation with the reasoning behind it.",
        format: "Export as PDF or share a live link.",
      },
      {
        label: "Batch report",
        body: "For HR running an MT intake, a campus drive or a leadership assessment. Cohort overview, averages by domain, the full ranked list of candidates, cut-off flags and a summary for each role track.",
        format: "Download the whole batch as one PDF.",
      },
      {
        label: "Interactive dashboard",
        body: "For hiring committees and talent reviews. Filter and sort by role track, module, score band or cut-off status, and click any candidate to open their full profile.",
        format: "Share it with a link.",
      },
    ],
  },
  science: {
    intro: { eyebrow: "The science", title: "Games, built like serious assessments." },
    pillars: [
      {
        title: "Established frameworks",
        body: "Big Five, neuroscience behavioral paradigms, classical cognitive assessment.",
      },
      {
        title: "Expert development",
        body: "Theory, item development, validation and norming, guided by psychometricians and I/O psychology researchers.",
      },
      { title: "Validated", body: "Checked against traditional cognitive tests." },
      { title: "Indonesian norms", body: "Benchmarked on the Indonesian population." },
    ],
    link: { label: "Read about our science →", href: "/science" },
  },
  impact: {
    intro: { eyebrow: "What changes", title: "What changes for your team." },
    items: [
      {
        title: "Better hires",
        body: "Behavioral and cognitive data predicts performance better than an interview and a CV alone.",
      },
      {
        title: "Faster decisions",
        body: "Scoring and reports are automatic, so a decision that used to take days can happen the same day.",
      },
      {
        title: "A stronger employer brand",
        body: "Candidates come away seeing your company as modern and serious about talent. Participants have told us it didn't feel like a psychotest at all.",
      },
      {
        title: "Volume without extra workload",
        body: "Run a full MT or campus intake without adding people to your HR team.",
      },
    ],
    badHireCost: siteFlags.showBadHireCost
      ? "One bad hire at manager level typically costs 5 to 10 times more than a year of a full assessment program."
      : undefined,
  },
  clientStory: { line: telkomLine, href: "/clients/telkom-group" },
  pricing: {
    intro: {
      eyebrow: "Pricing",
      title: "Pay per candidate. Combine modules any way you like.",
      lede: "Pricing starts from **Rp69.000 per candidate** and gets lower as your volume grows. Choose one module, two, three or the full suite.",
    },
    cta: { label: "Ask for a quote", href: "/contact?product=gba" },
  },
  adoption: {
    intro: { eyebrow: "Getting started", title: "Start small. See the results. Then decide." },
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
  },
  faq: {
    intro: { eyebrow: "FAQ", title: "Questions HR teams usually ask." },
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
                "The minimum purchase is Rp10.000.000. Groups of under 35 people take all four modules; larger groups can choose one to three.",
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
