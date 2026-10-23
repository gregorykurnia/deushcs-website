import { enhanceEn } from "../enhance";
import type { UseCaseContent } from "../../types";

// Use case: Linking performance appraisal to pay, from content/en/use-cases/performance-appraisal-and-pay.md
// (SEO/geo-implementation-plan.md §S8). Wording is kept as written; the `> Note:` lines and the Sources list
// are dropped. The product is DEUS Enhance, so the call to action is Enhance's own booking form
// (`#book-a-call`), not the free trial, and there's no download offer (§S8: the three GBA pages only).
//
// No story is about Enhance yet, so the proof has no story card: while stories show, the shared "Read client
// stories" link stands in. The closing headline is the Enhance page's approved one; the label is left out, so
// the global one shows, as the Enhance page's own closing does.

export const performanceAppraisalEn: UseCaseContent = {
  meta: {
    title: "Linking Performance Appraisal to Pay: KPI Appraisal Platform",
    description:
      "Performance management software for Indonesian companies: KPIs, appraisal and calibration that feed bonus, incentive and salary decisions. Works alongside your HRIS and payroll.",
  },
  slug: "performance-appraisal-and-pay",
  product: { name: "DEUS Enhance", path: "/solutions/enhance" },
  whatsapp: "enhance",
  breadcrumb: "Linking performance appraisal to pay",
  hero: {
    eyebrow: "Use case · DEUS Enhance",
    title: "Linking performance appraisal to pay",
    passage:
      "DEUS Enhance links performance appraisal to pay for companies in Indonesia. HR, management and finance teams set their own KPIs and competencies, run one structured appraisal for everyone, and calibrate results across managers and units. The calibrated results then feed bonus, incentive and salary increase decisions, so rewards rest on measured performance. Enhance works alongside the HRIS, ERP and payroll a company already has.",
    cta: { label: "Book a 30-minute call", href: "/solutions/enhance#book-a-call" },
    // The calibration matrix and the bonus dashboard, the two screens the Enhance page shows for these steps.
    screens: [
      {
        image: "enhanceCalibrationMatrix",
        title: "Calibrates across managers",
        alt: enhanceEn.screens.calibrationMatrix,
      },
      {
        image: "enhanceBonusDashboard",
        title: "Runs each bonus cycle",
        alt: enhanceEn.screens.bonusDashboard,
      },
    ],
  },
  problem: {
    eyebrow: "The problem",
    title: "Ratings in one spreadsheet, bonuses in another.",
    lede: "When appraisal results and rewards are worked out in different places, nobody can show how one led to the other.",
    items: [
      {
        title: "Scattered data",
        body: "KPIs and appraisal results sit across Excel and disconnected systems. It's the week before calibration, and HR is still pulling scores together.",
      },
      {
        title: "Inconsistent standards",
        body: "Two managers rate the same performance differently. Nobody notices until calibration, if at all.",
      },
      {
        title: "Disconnected rewards",
        body: "The bonus gets finalized from a spreadsheet that was never checked against the actual performance ratings.",
      },
      {
        title: 'No answer to "why?"',
        body: "An employee asks why a colleague got a bigger bonus. No one can explain it with objective evidence.",
      },
    ],
  },
  how: {
    eyebrow: "How DEUS does it",
    title: "How Enhance connects the rating to the reward.",
    items: [
      {
        title: "Set the framework",
        body: "Customize KPIs, competencies, weights, formulas, periods and measures by role and level.",
      },
      {
        title: "Review performance",
        body: "One structured self-review and appraisal process for everyone, tracked from company level down to teams and individuals.",
      },
      {
        title: "Calibrate results",
        body: "Review evaluations across managers, departments or plants for consistency. The calibration matrix shows everyone's evaluations together, so ratings that don't follow the same standard stand out.",
      },
      {
        title: "Map talent",
        body: "A nine-box grid plots KPI results against competency results, so you can spot high performers, performance gaps and development potential.",
      },
      {
        title: "Turn results into pay decisions",
        body: "Connect the calibrated results to incentives, bonuses, salary increases and development. Set up each bonus cycle and who takes part, group similar performance into similar rewards, and plan raises beside the performance behind them.",
      },
    ],
    note: {
      text: "Enhance can complement your existing HRIS, ERP, payroll and operational systems, without necessarily replacing them. How data flows between them is confirmed during scoping.",
      link: { label: "See DEUS Enhance", href: "/solutions/enhance" },
    },
  },
  runs: {
    eyebrow: "How it runs",
    title: "Start with a 30-minute look at your appraisal process.",
    steps: [
      {
        title: "Review",
        body: "A short, low-commitment look at how performance is tracked and evaluated today, to know what to keep and where the gaps are.",
      },
      {
        title: "Recommend",
        body: "We recommend whether a KPI-mapping workshop, a pilot or a tailored trial is the best next step for you.",
      },
      {
        title: "Set up",
        body: "We set Enhance up around your structure, your review periods and the way you already work, and help design the KPI framework if you don't have one yet. HR, managers and employees learn to use it before the first cycle starts.",
      },
      {
        title: "Run the cycle",
        body: "Appraise, calibrate and decide rewards in one platform. After each cycle, we look back with you at what worked and what to change next time.",
      },
    ],
  },
  // The line is about DEUS as a whole: no copy here says these brands use Enhance.
  proof: {
    line: "Trusted by **40+ brands** across Indonesia.",
  },
  offer: false,
  faq: {
    eyebrow: "FAQ",
    title: "Questions about linking appraisal to pay.",
    items: [
      {
        question: "How does Enhance link performance appraisal to pay?",
        answer:
          "It feeds calibrated appraisal results straight into bonus, incentive and salary increase decisions. KPIs, appraisals, calibration and talent mapping sit in one platform, and the results flow into bonus cycles, reward grouping and raise planning. So when an employee asks why a colleague got a bigger bonus, there's measured performance behind the answer.",
      },
      {
        question: "Why calibrate before deciding bonuses?",
        answer:
          "Because managers, departments or plants may rate the same performance differently. Calibration reviews evaluations across them for consistency before the results reach rewards. In Enhance, the calibration matrix shows everyone's evaluations together, so ratings that don't follow the same standard stand out. Only then do the results feed bonus, incentive and salary decisions.",
      },
      {
        question: "Do we have to replace our HRIS or payroll system?",
        answer:
          "No. Enhance works alongside your existing HRIS, ERP, payroll and operational systems, and doesn't necessarily require replacing any of them. Integration, data flow and configuration are adapted to your organization's processes, and we agree how data moves between the systems during scoping.",
      },
      {
        question: "Can we use our own KPIs and competencies?",
        answer:
          "Yes. You set the KPIs, competencies, weights, formulas, periods and measures, and they can differ by role and level. Performance is then tracked from company level down to each team and individual, and every employee goes through the same structured self-review and appraisal process.",
      },
      {
        question: "We don't have a KPI framework yet. Can we still start?",
        answer:
          "Yes. Plenty of companies start there. We can help you design KPIs and competencies that fit each role and level, often beginning with a KPI-mapping workshop. The first step is a short review of how your appraisals work today, and from there we recommend a workshop, a pilot or a tailored trial.",
      },
    ],
  },
  // The Enhance page's approved closing headline (enhance.md §13), word for word, and the line under it
  // restating §11's first step. The label falls back to the global one.
  closing: {
    title: ["Make performance visible.", "Make decisions clearer."],
    lede: "Book a 30-minute call and we'll start with a short review of how your appraisals work today.",
    cta: { label: "Book a 30-minute call", href: "/solutions/enhance#book-a-call" },
  },
};
