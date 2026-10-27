import { gbaEn } from "../game-based-assessment";
import type { UseCaseContent } from "../../types";

// Use case: Talent mapping and internal promotions, from content/en/use-cases/talent-mapping.md
// (SEO/geo-implementation-plan.md §S8). Wording is kept as written; the `> Note:` lines and the Sources list
// are dropped, and the "Download offer" section is the shared block (`offer`), which has no copy here.
//
// The page stays on game-based assessment. No client story is about talent mapping, so the proof has no story
// card: while stories show, the shared "Read client stories" link stands in. The closing is the GBA page's
// approved one, word for word. The Enhance "Better together" section (Q19) is not on this page.

const gba = "/solutions/game-based-assessment";

export const talentMappingEn: UseCaseContent = {
  meta: {
    title: "Talent Mapping and Competency Mapping with Game-Based Assessment",
    description:
      "Map the talent you already have: competency mapping, leadership identification, promotions and rotations (mutasi), with game-based assessments normed on Indonesians.",
  },
  slug: "talent-mapping",
  product: { name: "Game-Based Assessment", path: gba },
  whatsapp: "assessment",
  breadcrumb: "Talent mapping and internal promotions",
  hero: {
    eyebrow: "Use case · Game-Based Assessment",
    title: "Talent mapping and internal promotions",
    passage:
      "DEUS helps companies in Indonesia map the talent they already have with game-based assessments. Personality and Cognitive data show strengths, gaps and hidden high-potentials across teams and divisions. The Neuroscience module adds risk, motivation and emotional intelligence for leadership decisions. Companies use the results for competency mapping, promotions, rotations and transfers (mutasi), and for deciding where the development budget goes.",
    cta: { label: "Request a free trial", href: "/contact?product=gba" },
    // The suitability report the GBA hero shows (the individual profile view the copy names) and the
    // interactive dashboard that was on the GBA page before round 4, with the same alt text.
    screens: [
      {
        image: "gbaSuitabilityReport",
        title: gbaEn.hero.window.suitability.title,
        alt: gbaEn.hero.window.suitability.alt,
      },
      {
        image: "gbaReportInteractive",
        title: "Filters by module or score band",
        alt: "The interactive dashboard for one candidate: cognitive and neuro percentiles, a radar chart against the batch average and a band distribution.",
      },
    ],
  },
  problem: {
    eyebrow: "The problem",
    title: "An internal move deserves the same evidence as an outside hire.",
    lede: "You know your people's track record. What's harder to see is who is ready for more, and where each person would do best next.",
    items: [
      {
        title: "Potential is hard to see from the org chart",
        body: "Who is ready for a supervisor or manager role rarely shows in their current job title or last appraisal.",
      },
      {
        title: "Motivation and risk show up late",
        body: "Motivation is easy to misjudge in a conversation. Someone's appetite for risk usually shows up months after the decision.",
      },
      {
        title: "Training budget needs a reason",
        body: "Without data on each person's gaps, it's hard to decide who gets which program, and which high-potentials to invest in first.",
      },
      {
        title: "A new role needs a fit check",
        body: "Before you promote, rotate or transfer someone (mutasi), their fit for the new role matters as much as their record in the old one.",
      },
    ],
  },
  how: {
    eyebrow: "How DEUS does it",
    title: "The right module for each talent decision.",
    items: [
      {
        title: "Competency mapping: Personality · DEUS Discover",
        body: "Match each person's profile to your own competency framework, in the terms your managers already use and mapped to what each role requires. See the gaps and build development plans that target them.",
        link: { label: "Personality module", href: `${gba}#personality` },
      },
      {
        title: "Strengths across teams: Personality and Cognitive",
        body: "Together they map strengths, gaps and hidden high-potentials across teams and divisions. Cognitive adds a benchmark for learning agility.",
        link: { label: "Cognitive module", href: `${gba}#cognitive` },
      },
      {
        title: "Leadership identification: Neuroscience",
        body: "Find the people inside your company who are ready for supervisor and manager roles. The module's data on risk, motivation and emotional intelligence comes from what people do, not what they say.",
        link: { label: "Neuroscience module", href: `${gba}#neuro` },
      },
      {
        title: "Promotions and rotations",
        body: "Check fit for the new role with the same evidence you'd use for an outside candidate. The individual profile suitability view shows how closely each person's profile matches what the role needs.",
      },
    ],
  },
  runs: {
    eyebrow: "How it runs",
    title: "A talent review without weeks of interviews.",
    steps: [
      {
        title: "Invite",
        body: "Upload the employees in the review from one CSV file. Invitations and reminders go out automatically.",
      },
      {
        title: "Start securely",
        body: "Device checks and anti-cheat logic run before the first game. Employees play on a phone or a laptop, in the browser, with nothing to download.",
      },
      {
        title: "Play",
        body: "They work through story scenarios and short games. You see at a glance who has started and who has finished.",
      },
      {
        title: "Decide",
        body: "Reports are ready the moment each person finishes, with strengths, development areas and a written analysis of what the scores mean. The interactive dashboard lets your talent review filter by module or score band and open any full profile. HR and managers each see what they need, and nothing more.",
      },
    ],
  },
  proof: {
    line: "Trusted by **40+ brands** across Indonesia.",
  },
  offer: true,
  faq: {
    eyebrow: "FAQ",
    title: "Questions about talent mapping with DEUS.",
    items: [
      {
        question: "Can we use game-based assessment for existing employees, not only candidates?",
        answer:
          "Yes. The same assessments work for hiring and for the people you already have: employee development, promotion readiness, training needs analysis and leadership mapping. Personality and Cognitive data show strengths, gaps and hidden high-potentials across teams and divisions, so you can plan development and internal moves on evidence.",
      },
      {
        question: "Can we map employees against our own competency framework?",
        answer:
          "Yes. Results are framed around your own competency framework, using the terms your managers already know, and each role is measured against the competencies it actually requires. The scenarios can also reflect your industry. You see where each person matches the framework, where the gaps are, and which development plans would close them.",
      },
      {
        question: "Which module helps identify future leaders?",
        answer:
          "The Neuroscience module. Its six games capture risk-taking, motivation, effort allocation and emotion recognition through behavior people don't consciously control. That data is especially useful for finding the people ready for supervisor and manager roles, and for leadership and customer-facing roles where reading emotions matters.",
      },
      {
        question: "How does it help with promotions, rotations and transfers (mutasi)?",
        answer:
          "It checks fit for the new role before you decide. Each person is assessed with the same evidence you'd use for an outside candidate, and the individual profile suitability view shows how closely their profile matches what the role needs. Use it before a promotion, a rotation or a transfer.",
      },
    ],
  },
  relatedGuide: "what-is-game-based-assessment",
  // The GBA page's approved closing (game-based-assessment.md §7), word for word.
  closing: {
    label: "See it for yourself",
    title: ["The best way to understand it", "is to play it."],
    lede: "Request a free trial and try the assessment yourself, or run it with a small group from your team. We'll walk you through the results.",
    cta: { label: "Request a free trial", href: "/contact?product=gba" },
  },
};
