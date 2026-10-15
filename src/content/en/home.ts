import { siteFlags } from "@/content/flags";
import type { HomeContent } from "@/content/types";
import { potentiaHref } from "@/lib/links";
import { telkomCardLink } from "./stories/telkom-group";

// Copy from content/en/home.md, word for word. Labels leave out the arrows the Markdown writes
// (→ ↗ ↓): TextLink and ProductTile draw them. `> Note:` lines are dropped. The hero heading is
// split in two lines, as in the mockup. Section numbers are dropped, since WhyPanel shows none.
// The closing panel is the global one, so this module has no closing field.

export const homeEn: HomeContent = {
  meta: {
    title: "DEUS Human Capital Services | Game-Based Assessment and Performance Management",
    description:
      "DEUS helps Indonesian companies hire on evidence and reward on evidence, with game-based assessments candidates can't rehearse and a performance platform that connects appraisals to pay.",
  },
  hero: {
    title: ["Hire on evidence.", "Reward on evidence."],
    lede: "DEUS helps Indonesian companies see their people clearly. Our game-based assessments show how candidates really think and behave, and DEUS Enhance links every appraisal to the bonus and salary decisions that follow.",
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
      caption: "One person, from first game to first bonus",
      label: "Example: one candidate from assessment to first bonus",
      play: { when: "**March 2025**, assessed", title: "Plays DEUS Discover", meta: "22 minutes" },
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
        label: "Q1 2026 appraisal, DEUS Enhance",
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
    lede: "Trusted by **40+ brands** across retail, telecommunications, education, FMCG, F&B and electronics.",
    industries: ["Retail", "Telecommunications", "Education", "FMCG", "F&B", "Electronics"],
    wall: [],
    link: { label: "Read client stories", href: "/clients" },
    // VERIFY Q8: approved logos only. While the flag is off, the line above stands alone.
    logoWallFlag: "showLogoWall",
  },
  why: {
    eyebrow: "Why DEUS exists",
    title: "Most people decisions still run on thin evidence.",
    paragraphs: [
      "A CV, an hour-long interview, and a psychotest the candidate practiced online the night before. A year later, an appraisal pieced together from five spreadsheets, and a bonus nobody can quite explain.",
      "Companies say people are their most important asset. Then they make decisions about them with the weakest data they have.",
      "**We started DEUS in 2022 to give those decisions better evidence.**",
    ],
  },
  hireToReward: {
    eyebrow: "Where we help",
    title: "One partner, from the first assessment to the last bonus decision.",
    stages: [
      {
        stage: "Hire",
        title: "Choose the right people",
        body: "Game-based assessments measure personality, cognitive ability, behavior under pressure and business judgment, so you're not relying on a CV and a gut feeling.",
        product: "DEUS Discover · Next Chapter",
        // Screen and result card as in the mockup; the 82nd percentile is sample data.
        screen: { image: "gbaNumerical", alt: "Next Chapter numerical reasoning game" },
        result: { label: "Numerical reasoning", value: "82", unit: "percentile, Indonesian norm", bar: 82 },
      },
      {
        stage: "Develop",
        title: "Find the potential you already have",
        body: "The same assessments map competencies across your teams, surface future leaders and show where training will make the biggest difference.",
        product: "Game-Based Assessment",
        // No screen of a team's competencies yet: the batch report is the closest missing one.
        screen: { missing: "gbaReportBatch" },
      },
      {
        stage: "Perform and reward",
        title: "Pay for performance you can prove",
        body: "One framework for KPIs, appraisals and calibration, connected to the bonus, incentive and salary decisions that follow.",
        product: "DEUS Enhance",
        screen: { image: "enhanceDashboard", alt: "DEUS Enhance performance appraisal dashboard" },
      },
    ],
  },
  solutions: {
    eyebrow: "Our solutions",
    title: "Four products, built on the same idea: better evidence about people.",
    products: [
      {
        name: "DEUS Discover",
        body: "A story-driven game that reveals personality and competencies. Candidates make choices as the plot unfolds, and you get a profile across 32 personality subtraits and 24 competencies.",
        cta: { label: "Explore DEUS Discover", href: "/solutions/discover" },
      },
      {
        name: "DEUS Enhance",
        body: "KPIs, appraisals and calibration in one place, connected to bonus, incentive and salary decisions. It works alongside the HR systems you already have.",
        cta: { label: "Explore DEUS Enhance", href: "/solutions/enhance" },
      },
      {
        name: "Next Chapter",
        body: "Cognitive, neuroscience and business simulation games that show how someone thinks, handles risk and makes decisions under time pressure.",
        cta: { label: "Explore Next Chapter", href: "/solutions/next-chapter" },
      },
      {
        name: "Potentia",
        body: "A gamified cognitive assessment that helps parents and schools understand how children aged 7–15 learn best.",
        cta: { label: "Visit Potentia (in Indonesian)", href: potentiaHref() },
      },
    ],
  },
  gbaSpotlight: {
    eyebrow: "Game-Based Assessment",
    title: "Candidates can't fake how they play.",
    paragraphs: [
      'People prepare for personality tests. The "right" answers are easy to find online, and candidates learn them.',
      "What they can't rehearse is how they behave inside a game: how quickly they spot a pattern, when they stop pumping up a balloon before it bursts, which choice they make when a story gets difficult. Every choice and every hesitation becomes data, and together they give a far more honest picture than a questionnaire.",
    ],
    tags: ["Personality", "Cognitive", "Neuroscience", "Business simulation"],
    followUp:
      "Use one module or all four. Reports are generated automatically, so results are ready as soon as candidates finish.",
    cta: { label: "See how game-based assessment works", href: "/solutions/game-based-assessment" },
    // Not in home.md: the tile captions, event log and two facts come from the mockup
    // (design-directions/c-daylight-v2.html). The facts restate "Built for Indonesia" below.
    games: [
      { image: "gbaStory", title: "Personality", caption: "Story choices" },
      { image: "gbaCategorization", title: "Cognitive", caption: "Categorization" },
      { image: "gbaSpeed", title: "Neuroscience", caption: "Speed and stamina" },
    ],
    log: {
      title: "Recording this scene",
      rows: [
        { time: "00:43.8", action: "Reads both options" },
        { time: "00:45.0", action: "Hovers \"follow the schedule\"" },
        { time: "00:45.4", action: "Moves to the other option" },
        { time: "00:46.1", action: "Picks \"follow the schedule\"" },
      ],
    },
    facts: [
      { title: "Browser only", body: "Phone or laptop, nothing to install" },
      { title: "Indonesian norms", body: "Compared with people like them" },
    ],
    clientStory: telkomCardLink,
  },
  enhanceSpotlight: {
    eyebrow: "DEUS Enhance",
    title: "From scattered data to better decisions.",
    paragraphs: [
      "Appraisal season shouldn't mean chasing spreadsheets, debating ratings that were never set to the same standard, and signing off bonuses nobody checked against performance.",
      "Enhance brings KPIs, reviews and calibration into one structured process across every team, department and plant. Then it carries the results through to the decisions that matter: bonuses, incentives, salary increases and development.",
    ],
    cta: { label: "Explore DEUS Enhance", href: "/solutions/enhance" },
    screen: { image: "enhanceRewardGrouping", alt: "DEUS Enhance reward grouping screen" },
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
  recognition: {
    eyebrow: "Recognition",
    title: "Backed by Indonesia's startup ecosystem.",
    items: [
      "**Startup Studio Indonesia, Batch 6 (2023):** one of 17 startups selected by Kominfo, now Komdigi",
      "**Innovfest by NUS x AsiaTech, Singapore (2024):** represented Komdigi",
      "**Tech in Asia (2024)**",
      // VERIFY UGM co-branding (about.md §7, science.md §7): hidden until the flag is on.
      ...(siteFlags.showUgmPartnership ? ["**Universitas Gadjah Mada:** scientific partner for Potentia"] : []),
    ],
  },
  potentia: {
    eyebrow: "Untuk orang tua dan sekolah",
    title: "Kita tahu nilai rapor anak. Tapi seberapa kenal kita dengan cara mereka belajar?",
    // VERIFY Q6: the 7–15 age range follows the decks. No flag covers it, so it stands as written.
    body: "Potentia mengajak anak usia 7–15 tahun memainkan 8 minigame selama sekitar 30 menit. Hasilnya, Anda mendapat gambaran jelas tentang cara anak berpikir, mengingat, dan belajar, lengkap dengan saran yang bisa langsung dipraktikkan.",
    link: { label: "Kunjungi Potentia", href: potentiaHref() },
    lang: "id",
  },
};
