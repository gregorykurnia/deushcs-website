import type { HomeContent } from "@/content/types";
import { potentiaHref } from "@/lib/links";

// Copy from content/en/home.md, word for word. Labels leave out the arrows the Markdown writes
// (→ ↗ ↓): TextLink and ProductTile draw them. `> Note:` lines are dropped. The hero heading is
// split in two lines, as in the mockup. Section numbers are dropped, since WhyPanel shows none.
// The closing panel is the global one, so this module has no closing field.

export const homeEn: HomeContent = {
  meta: {
    title: "DEUS Human Capital Services | Game-Based Assessment and Performance Management",
    description:
      "DEUS measures how people think, behave and grow, with game-based assessments, performance management and child cognitive assessment for Indonesian companies and schools.",
  },
  hero: {
    title: ["Every person has potential.", "We help you see it."],
    lede: "DEUS measures how people think, behave and grow, then turns it into evidence you can act on.",
    ctas: [
      { label: "Request a demo", href: "/contact" },
      // In-page jump: the Solutions section carries id="solutions" (Task 2.3).
      { label: "Explore our solutions", href: "#solutions" },
    ],
    // The sky window. home.md has no words for it, so they come from the mockup
    // (design-directions/c-daylight-v2.html) and DESIGN-GUIDE.md §7.12. Rina, her scores, the
    // dates and "Bonus band B" are the mockup's sample data: replace them with approved sample
    // data before launch (Task 7.4).
    journey: {
      caption: "One employee's journey, from assessment to appraisal",
      label: "Example: one candidate from assessment to first bonus",
      play: { when: "**March 2025**, assessed", title: "Plays an assessment game", meta: "22 minutes" },
      profile: {
        when: "**April 2025**, hired",
        label: "Candidate profile",
        name: "Rina Wulandari",
        traits: [
          { label: "Rational", value: 94 },
          { label: "Empathy", value: 75 },
          { label: "Diplomatic", value: 60 },
        ],
        footer: "Recommended for the 2025 MT intake",
      },
      appraisal: {
        when: "**March 2026**, appraised",
        label: "Q1 2026 appraisal",
        score: "3.05",
        rating: "Above expectations",
        split: [
          { label: "KPI", value: "2.96" },
          { label: "Competency", value: "3.40" },
        ],
        bonus: { label: "Bonus band B", status: "Approved" },
      },
    },
  },
  logos: {
    lede: "Trusted by **40+ brands** across Indonesia.",
    industries: ["Retail", "Telecommunications", "Education", "FMCG", "F&B", "Electronics"],
    wall: [],
    link: { label: "Read client stories", href: "/clients" },
    // VERIFY Q8: approved logos only. While the flag is off, the line above stands alone.
    logoWallFlag: "showLogoWall",
  },
  why: {
    eyebrow: "Why DEUS exists",
    title: "Most people decisions still run on thin, scattered evidence.",
    paragraphs: [
      "A CV, an hour-long interview, and a psychotest the candidate practiced online the night before. A year later, an appraisal pieced together from five spreadsheets, and a bonus nobody can quite explain.",
      "Companies say people are their most important asset. Then they make decisions about them with the weakest data they have.",
      "**We started DEUS in 2022 to give those decisions better evidence.**",
    ],
  },
  hireToReward: {
    eyebrow: "Where we help",
    title: "One partner, from assessment to bonus.",
    stages: [
      {
        stage: "Hire",
        title: "Choose the right people",
        body: "Game-based assessments measure personality, cognitive ability, behavior under pressure and business judgment, so you're not relying on a CV and a gut feeling.",
        // F35: the story scene the hero card showed before F34. Its alt is the GBA page's; the
        // numerical result card went with the number game (Q1, option a).
        screen: {
          image: "gbaStory",
          alt: "A DEUS Discover story scene: a colleague asks what you would do, with two answers to choose from.",
        },
      },
      {
        stage: "Develop",
        title: "Find the potential you already have",
        body: "The same assessments map competencies across your teams, surface future leaders and show where training will make the biggest difference.",
        screen: {
          image: "gbaBatchReport",
          alt: "A Game-Based Assessment batch report: a cohort overview with scores for each domain.",
        },
      },
      {
        stage: "Perform and reward",
        title: "Pay for performance you can prove",
        body: "One framework for KPIs, appraisals and calibration, connected to the bonus, incentive and salary decisions that follow.",
        screen: {
          image: "enhanceBonusDashboard",
          alt: "DEUS Enhance bonus dashboard: employee status breakdown and budget allocation for a bonus cycle.",
        },
      },
    ],
  },
  // F10: three tiles; F50 (R14a): three equal cards in one row. F51: the GBA text in plain words.
  solutions: {
    eyebrow: "Our solutions",
    title: "Three solutions, one idea: better evidence.",
    products: [
      {
        name: "Game-Based Assessment",
        body: "Short online games that show how a candidate thinks, works and makes decisions. Results are scored for you, ready the moment they finish.",
        cta: { label: "Explore Game-Based Assessment", href: "/solutions/game-based-assessment" },
      },
      {
        name: "DEUS Enhance",
        body: "KPIs, appraisals and calibration in one place, connected to bonus, incentive and salary decisions. It works alongside the HR systems you already have.",
        cta: { label: "Explore DEUS Enhance", href: "/solutions/enhance" },
      },
      {
        name: "Potentia",
        body: "A gamified cognitive assessment that helps parents and schools understand how children aged 7–15 learn best.",
        cta: { label: "Visit Potentia (in Indonesian)", href: potentiaHref() },
      },
    ],
  },
  whyDeus: {
    eyebrow: "Why DEUS",
    title: "What you can expect from us.",
    // Icons: the mockup's four, in order (DESIGN-GUIDE.md §7.17).
    items: [
      {
        icon: "flask",
        title: "Evidence over gut feel",
        body: "Our assessments are built on the Big Five, neuroscience research and established cognitive frameworks, developed with psychometricians and I/O psychology researchers. Enhance does the same for appraisals: ratings you can compare, not just remember.",
      },
      {
        icon: "map-pin",
        title: "Built for Indonesia",
        body: "Our assessments are normed on the Indonesian population, so your candidates are compared with people like them, not with Western benchmarks. Everything runs in a browser, on a phone or a laptop. Nothing to install.",
      },
      {
        icon: "users",
        title: "Ready for volume",
        body: "Upload thousands of participants from a spreadsheet, send invitations automatically and see who has finished in real time. MT and campus intakes grow without your HR workload growing with them.",
      },
      {
        icon: "refresh",
        title: "A partner, not just a vendor",
        body: "Start with a free trial or a pilot in one division, with no long-term contract. For Enhance, we help design the KPI framework itself, train your team and review each cycle with you.",
      },
    ],
  },
};
