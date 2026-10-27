import { homeLogos } from "@/content/client-logos";
import type { HomeContent } from "@/content/types";
import { potentiaHref } from "@/lib/links";

// Copy from content/en/home.md, word for word. Labels leave out the arrows the Markdown writes
// (→ ↗ ↓): TextLink and ProductTile draw them. `> Note:` lines are dropped. The hero heading is
// split in two lines, as in the mockup. Section numbers are dropped, since WhyPanel shows none.
// The closing panel is the global one, so this module has no closing field.

// G1.8 (GEO §S5): /llms.txt quotes this passage as its summary. The "Why DEUS exists" section also ends with it.
export const homeAnswerPassage =
  "DEUS Human Capital Services is an HR technology company in Indonesia, founded in 2022. It builds game-based assessments for hiring and developing people, DEUS Enhance for linking performance to pay, and Potentia, a gamified cognitive assessment that helps parents and schools understand how children learn. More than 40 brands use DEUS, across retail, telecommunications, education, FMCG, F&B, electronics, fashion, healthcare, manufacturing and finance.";

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
      { label: "See our products", href: "#solutions" },
    ],
    // The sky window. home.md has no words for it, so they come from the mockup
    // (design-directions/c-daylight-v2.html) and DESIGN-GUIDE.md §7.12. Rina, her scores, the
    // dates and "Bonus band B" are the mockup's sample data: replace them with approved sample
    // data before launch (Task 7.4).
    journey: {
      caption: "One employee, from assessment to appraisal",
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
    industries: [
      "Retail", "Telecommunications", "Education", "FMCG", "F&B", "Electronics",
      "Fashion", "Healthcare", "Manufacturing", "Finance",
    ],
    wall: homeLogos,
    more: { label: "See all 40+", href: "/clients" },
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
      // G1.7 (GEO §S2): the answer passage, closing the section as the plain summary after the bold line
      homeAnswerPassage,
    ],
  },
  hireToReward: {
    eyebrow: "Where we help",
    title: "One partner to hire, develop and pay.",
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
        body: "The same assessments map competencies across your teams and show who could lead next and where training will help most.",
        screen: {
          image: "gbaBatchReport",
          alt: "A Game-Based Assessment batch report: a cohort overview with scores for each domain.",
        },
      },
      {
        stage: "Perform and reward",
        title: "Pay for performance you can prove",
        body: "KPIs, appraisals and calibration use one framework, which feeds the bonus, incentive and salary decisions that follow.",
        screen: {
          image: "enhanceBonusDashboard",
          alt: "DEUS Enhance bonus dashboard: employee status breakdown and budget allocation for a bonus cycle.",
        },
      },
    ],
  },
  // F10: three tiles; F50 (R14a): three equal cards in one row. F51: the GBA text in plain words.
  solutions: {
    eyebrow: "Our products",
    title: "Three products, all built on evidence.",
    products: [
      {
        name: "Game-Based Assessment",
        body: "Short online games that show how a candidate thinks, works and makes decisions. The system scores each candidate as soon as they finish.",
        cta: { label: "Explore Game-Based Assessment", href: "/solutions/game-based-assessment" },
      },
      {
        name: "DEUS Enhance",
        body: "Run KPIs, appraisals and calibration together, linked to bonus, incentive and salary decisions. It works alongside the HR systems you already have.",
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
    // R14b (F54–F57): each point holds for every product (GBA, Enhance, Potentia); sources in
    // content/en/home.md §9. Icons: the mockup's, except "puzzle" for the second point.
    items: [
      {
        icon: "flask",
        title: "Evidence over gut feel",
        body: "A candidate's games, an employee's KPIs and a child's minigames are all scored in one structured way, the same for everyone, so you can put people side by side and decide on results instead of memory or a first impression.",
      },
      {
        icon: "puzzle",
        title: "Fits what you already use",
        body: "Candidates and children play in a browser, on a phone or a laptop, with no app to download. Enhance can work alongside the HRIS, ERP and payroll systems you already have.",
      },
      {
        icon: "users",
        title: "Ready for volume",
        body: "Invite a whole intake from one spreadsheet, follow every plant and branch in one place, or see a whole class on one dashboard. Results are calculated by the system, so a bigger group doesn't add manual work for your team.",
      },
      {
        icon: "refresh",
        title: "We stay involved",
        body: "Start small, with a free trial, a pilot or a short review of how you work today. After that, we help design your KPIs, train your team, review each cycle with you, and talk parents through their child's results one on one.",
      },
    ],
  },
};
