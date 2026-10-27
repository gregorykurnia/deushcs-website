import { GBA_FROM_PRICE } from "@/content/prices";
import { gbaEn } from "../game-based-assessment";
import { telkomCardLink } from "../stories/telkom-group";
import type { UseCaseContent } from "../../types";
import { formatIDR } from "@/lib/format";

// Use case: Management Trainee assessment, from content/en/use-cases/management-trainee-assessment.md
// (SEO/geo-implementation-plan.md §S8). Wording is kept as written; the `> Note:` lines and the Sources
// list are dropped, and the "Download offer" section is the shared block (`offer`), which has no copy here.
//
// Telkom stays "a national telecom group": the copy never names the client, so `telkomNamed` (Q7) needs
// no branch. The proof section's story card is `telkomCardLink`, which follows that switch itself, and it
// shows only while client stories do (`showStories`). The price is the shared GBA "starting from"
// amount (src/content/prices.ts), written by `formatIDR` ("IDR 69,000" in English, "Rp69.000" in the Markdown).

const gba = "/solutions/game-based-assessment";

export const managementTraineeEn: UseCaseContent = {
  meta: {
    title: "Management Trainee Assessment: Game-Based MT Recruitment",
    description:
      "Management Trainee assessment for Indonesian companies: Cognitive and Neuroscience games to shortlist the intake, a business simulation for finalists, results the day they finish.",
  },
  slug: "management-trainee-assessment",
  product: { name: "Game-Based Assessment", path: gba },
  whatsapp: "assessment",
  breadcrumb: "Management Trainee assessment",
  hero: {
    eyebrow: "Use case · Game-Based Assessment",
    title: "Management Trainee assessment",
    passage:
      "DEUS runs Management Trainee assessments for companies in Indonesia through short games played in a browser. The Cognitive and Neuroscience modules shortlist a large MT intake quickly and fairly, and a business Simulation tests the finalists. Scoring is automatic and every assessment is normed on the Indonesian population. A national telecom group used DEUS to assess more than 1,000 MT candidates across 30+ provinces at once.",
    cta: { label: "Request a free trial", href: "/contact?product=gba" },
    // Two cards: the GBA hero's own cognitive game (its title and alt text), and the batch report that
    // ranks an intake (Home's screen and alt text). No meta line: a card takes half the panel's width.
    screens: [
      {
        image: "gbaNumerical",
        title: gbaEn.hero.window.cognitive.title,
        alt: gbaEn.hero.window.cognitive.alt,
      },
      {
        image: "gbaBatchReport",
        title: "Ranks the whole intake",
        alt: "A Game-Based Assessment batch report: a cohort overview with scores for each domain.",
      },
    ],
  },
  problem: {
    eyebrow: "The problem",
    title: "A big MT intake leaves very little time to choose well.",
    lede: "Management Trainee programs draw large applicant pools, and the selection team has very little time to turn them into a shortlist it can defend. The usual tools make that harder.",
    items: [
      {
        title: "Candidates study for the test",
        body: "Answers to the common personality tests are a quick search away. Results end up measuring how well someone prepared, not who they are.",
      },
      {
        title: "Paper tests can't show thinking under pressure",
        body: "Abstract questions say very little about how a future manager reasons when time is short and the stakes are real.",
      },
      {
        title: "Good candidates quit halfway",
        body: "Long, repetitive assessments lose people before they finish, and some of them are the ones you wanted.",
      },
      {
        title: "Scoring by hand holds up the intake",
        body: "Your HR team spends days scoring, compiling and formatting results while candidates wait.",
      },
    ],
  },
  how: {
    eyebrow: "How DEUS does it",
    title: "Shortlist with two modules. Choose your finalists with a third.",
    lede: "For an MT intake we recommend Cognitive and Neuroscience for the first pass, then Simulation for the final round. You can start with one module and add others later.",
    items: [
      {
        title: "First pass: Cognitive",
        body: "Seven short, timed games on processing speed, working memory, reasoning and more. They capture speed and consistency as well as correct answers, and give you a benchmark for learning agility.",
        link: { label: "Cognitive module", href: `${gba}#cognitive` },
      },
      {
        title: "First pass: Neuroscience",
        body: "Six games that show motivation, appetite for risk, effort allocation and emotion recognition through behavior people don't consciously control. All of these are easy to misjudge in a one-hour interview.",
        link: { label: "Neuroscience module", href: `${gba}#neuro` },
      },
      {
        title: "Final round: Simulation",
        body: "Two business scenarios. Finalists review cases and write a business report, then allocate a budget against a live timer. Every finalist gets the same scenario, set in your industry, without the cost of running an assessment center.",
        link: { label: "Simulation module", href: `${gba}#simulation` },
      },
    ],
  },
  runs: {
    eyebrow: "How it runs",
    title: "From applicant list to ranked shortlist, with no scoring by hand.",
    steps: [
      {
        title: "Invite",
        body: "Upload the whole intake from one CSV file. Branded invitations go out automatically, and candidates who haven't started get a reminder.",
      },
      {
        title: "Start securely",
        body: "Device checks and anti-cheat logic run before the first game. Candidates play in a phone or laptop browser, with nothing to download.",
      },
      {
        title: "Play",
        body: "The intake works through the cognitive and neuroscience games, and finalists through the simulation. You can see who has started, who has finished and who hasn't opened the invitation yet.",
      },
      {
        title: "Decide",
        body: "Reports are ready the moment candidates finish. The batch report ranks the whole intake, flags everyone below your cut-off score and summarizes each role track.",
      },
    ],
  },
  proof: {
    line: "Trusted by **40+ brands** across Indonesia.",
    story: telkomCardLink,
  },
  offer: true,
  faq: {
    eyebrow: "FAQ",
    title: "Questions about assessing a Management Trainee intake.",
    items: [
      {
        question: "How many Management Trainee candidates can you assess at once?",
        answer:
          "As many as your intake needs, at the same time. A national telecom group used DEUS to assess more than 1,000 Management Trainee candidates across 30+ provinces at once, with results within a day, two years in a row. The platform sends the invitations and reminders, tracks progress and generates the reports, so a nationwide intake doesn't mean adding people to your HR team.",
      },
      {
        question: "Which modules should we use for Management Trainee recruitment?",
        answer:
          "Cognitive and Neuroscience for the first pass, then Simulation for the final round. The first two shortlist a large applicant pool quickly and fairly. Simulation then shows how each finalist analyzes a business case, prioritizes and allocates a budget under real time pressure. You can start with one module and add others later.",
      },
      {
        question: "How quickly do we get results?",
        answer:
          "Scores and reports are generated as soon as each candidate finishes, so nobody on your team grades anything. The batch report ranks the whole intake and flags everyone below your cut-off. If you add the Personality module, its profiles are ready the same day or the next.",
      },
      {
        question: "Can candidates cheat or prepare for it?",
        answer:
          "Not easily. Every session starts with device checks and anti-cheat logic. And because the games measure behavior, not answers, there's very little to look up or memorize. Candidates can't fake how they play: every choice, every hesitation and every reaction under time pressure becomes data.",
      },
      {
        question: "How much does a Management Trainee assessment cost?",
        answer: `Pricing starts from ${formatIDR(GBA_FROM_PRICE, "en")} per candidate, and the price per candidate gets lower as your volume grows. You pay only for the modules you choose, and there's no long-term contract, so you can pay per batch. Ask for a quote and we'll price it for your intake.`,
      },
    ],
  },
  relatedGuide: "management-trainee-recruitment",
  // The Telkom story's approved closing (clients-telkom-group.md §8, R17 F86), word for word.
  closing: {
    label: "Planning an intake?",
    title: "Running an MT or campus drive?",
    lede: "We'll show you how a nationwide intake runs on DEUS, from the first upload to the final ranked list.",
    cta: { label: "Request a demo", href: "/contact?product=gba" },
  },
};
