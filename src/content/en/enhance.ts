import { siteFlags } from "../flags";
import type { EnhanceContent } from "../types";

// English copy for /solutions/enhance (Task 1.1), from content/en/enhance.md, which wins on wording.
// The form's fields and choices come from ENHANCE-PAGE-SPEC.md §11, which the Markdown defers to.
// Not copied: `> Note:` lines, the ✓ marks and bullets (the components draw them), and the SEO
// title's "| DEUS" (pageMetadata adds the site name). `#solution` is the section id the page sets
// (Task 1.6); `#book-a-call` is the booking form in the closing panel (R16b, F79).

export const enhanceEn: EnhanceContent = {
  meta: {
    title: "DEUS Enhance: Performance Appraisal and KPI Platform",
    description:
      "Connect KPIs, appraisals, calibration and talent mapping to bonus, incentive and salary decisions. Works alongside your existing HRIS, ERP and payroll.",
  },
  hero: {
    eyebrow: "DEUS Enhance",
    title: "From scattered data to better decisions",
    lede: "**DEUS Enhance** connects your performance data to every KPI, review, and pay decision.",
    chips: ["KPIs", "Appraisal", "Calibration", "Talent mapping", "Rewards"],
    primary: { label: "Book a 30-minute call", href: "#book-a-call" },
    secondary: { label: "See how it works ↓", href: "#solution" },
    // The hero picture (F72, D10): four steps from review to pay decision, one screen each.
    sequence: {
      caption: "From review to pay decision",
      steps: [
        { label: "KPIs", alt: "DEUS Enhance appraisal cycle with each employee's role and review status" },
        { label: "Appraisal", alt: "DEUS Enhance appraisal dashboard with an employee's final, KPI and competency scores" },
        { label: "Calibration", alt: "DEUS Enhance calibration matrix" },
        { label: "Bonus", alt: "DEUS Enhance bonus dashboard for a bonus cycle" },
      ],
    },
  },
  screens: {
    kpiLibrary: "DEUS Enhance KPI and competency library",
    teamMembers: "DEUS Enhance dashboard listing each team member's division, department and review status",
    dashboard: "DEUS Enhance performance appraisal dashboard",
    calibrationMatrix: "DEUS Enhance calibration matrix",
    talentMap: "DEUS Enhance talent map: a nine-box grid of KPI against competency, beside each person's scores",
    bonusDashboard: "DEUS Enhance bonus dashboard for a bonus cycle",
  },
  problem: {
    eyebrow: "The problem",
    title: "We understand your challenges",
    items: [
      {
        title: "Scattered data",
        body: "KPIs and appraisal results sit across Excel and disconnected systems, slowing consolidation.",
      },
      {
        title: "Inconsistent standards",
        body: "Managers, departments, or plants may evaluate performance differently.",
      },
      {
        title: "Fragmented review",
        body: "Teams review performance on different schedules, so there are no consistent, org-wide rhythms.",
      },
      {
        title: "Limited visibility",
        body: "Hard to identify high performers, performance gaps, and development potential.",
      },
      {
        title: "Disconnected rewards",
        body: "Performance results don't consistently inform bonus, incentive, salary, or development decisions.",
      },
    ],
    teaser: "**Up next →** What the gap looks like, daily",
  },
  urgency: {
    eyebrow: "The urgency",
    title: "What the gap looks like, daily",
    lede: "The cost doesn't show up in your report. It shows up in how the week actually goes.",
    roles: [
      {
        title: "HR",
        body: "It's the week before calibration, and HR is still pulling scores from different spreadsheets.",
      },
      {
        title: "Plant & operations leaders",
        body: "A plant director asks how their site compares. No one can answer without a week of emails.",
      },
      {
        title: "Managers & supervisors",
        body: "Two managers rate the same performance differently. Nobody notices until calibration, if at all.",
      },
      {
        title: "Employees",
        body: "An employee asks why a colleague got a bigger bonus. No one can explain it with objective evidence.",
      },
      {
        title: "Senior management & finance",
        body: "Bonus gets finalized from a spreadsheet never checked against actual performance ratings.",
      },
    ],
  },
  solution: {
    eyebrow: "The solution",
    title: "How Enhance closes each gap",
    steps: [
      {
        title: "Set the framework",
        body: "Customize KPIs, competencies, weights, formulas, periods, and measures by role and level.",
      },
      {
        title: "Track across levels",
        body: "Monitor performance from company down to teams and individuals.",
      },
      {
        title: "Review performance",
        body: "One structured self-review and appraisal process for everyone.",
      },
      {
        title: "Calibrate results",
        body: "Review evaluations across managers or units for consistency.",
      },
      {
        title: "Talent mapping",
        body: "Visualize where everyone sits by performance and potential.",
      },
      // F75/F76 (D11): the old closing card is step 6, and the gist of the cut "From rating to
      // reward" section is its second sentence.
      {
        title: "Turn results into decisions",
        body: "Connect outcomes to incentives, bonuses, salary, and development. Set up each bonus cycle and who takes part, group similar performance into similar rewards, and plan raises beside the performance behind them.",
      },
    ],
  },
  systems: {
    eyebrow: "Usability",
    title: "We can start from where you are",
    item: {
      title: "Works with what you have",
      body: "DEUS Enhance can complement your existing HRIS, ERP, payroll, and operational systems. It does not necessarily require replacing them. Integration, data flow, and configuration are adapted to your organization's processes and confirmed during scoping.",
    },
    // The systems the copy names, drawn flowing into Enhance (ENHANCE-PAGE-SPEC.md §6, "Visual").
    diagram: { sources: ["HRIS", "ERP", "Payroll", "Operational systems"], hub: "DEUS Enhance" },
  },
  support: {
    eyebrow: "Supported beyond the platform",
    title: "DEUS provides more than software.",
    lede: "Our consultative approach can support KPI framework design, implementation, user training, post-cycle review, and ongoing hands-on customer assistance.",
    items: [
      {
        title: "KPI framework design",
        body: "We help shape KPIs and competencies that fit each role and level, if you don't have them yet or want to rethink them.",
      },
      {
        title: "Implementation",
        body: "We set Enhance up around your structure, your review periods and the way you already work.",
      },
      {
        title: "User training",
        body: "HR, managers and employees learn how to use it before the first cycle starts.",
      },
      {
        title: "Post-cycle review",
        body: "After each cycle, we look back with you at what worked and what to change next time.",
      },
      {
        title: "Ongoing assistance",
        body: "Hands-on help whenever your team needs it.",
      },
    ],
  },
  outcome: {
    eyebrow: "The business outcome",
    title: "An investment that moves you forward",
    roles: [
      {
        title: "HR",
        body: "Move from scattered spreadsheets to one standardized, company-wide framework for tracking and calibrating performance.",
      },
      {
        title: "Plant & operations leaders",
        body: "See how every team or plant is tracking in real time, without chasing separate reports.",
      },
      {
        title: "Managers & supervisors",
        body: "Evaluate more consistently and decide with mapping instead of memory or gut feel.",
      },
      {
        title: "Employees",
        body: "Gain clarity on expectations, evaluations, and development areas without subjective standards.",
      },
      {
        title: "Senior management & finance",
        body: "Connect results to incentive, bonus, and salary decisions that used to be disconnected.",
      },
    ],
  },
  // Left out of the content (not just hidden on the page) until Q19 is confirmed.
  betterTogether: siteFlags.showBetterTogether
    ? {
        eyebrow: "Better together",
        title:
          "Performance shows what people have done. Assessment shows what they could do.",
        body: "Enhance maps your people by performance and potential. DEUS's game-based assessments measure personality, cognitive ability and business judgment, giving the potential side of that map real evidence.",
        links: [
          { label: "DEUS Discover →", href: "/solutions/game-based-assessment#personality" },
          { label: "Game-Based Assessment →", href: "/solutions/game-based-assessment" },
        ],
      }
    : null,
  // The section shows the heading and the two steps; the form and the email prefill are used by the
  // booking block in the closing panel (R16b, F79).
  nextStep: {
    eyebrow: "Next step",
    title: "Start where it matters most to you",
    lede: "Most organizations start with a current appraisal process review. Here's what it looks like:",
    steps: [
      "A short, low-commitment look at how your performance is tracked and evaluated today, to know what to keep and where the gaps are.",
      "We recommend whether a KPI-mapping workshop, a pilot, or a tailored trial is the best next step for you.",
    ],
    form: {
      title: "Book your 30-minute appraisal review",
      lede: "Tell us a little about your company and we'll set up a time.",
      // The shared fields (name, work email, company, WhatsApp, consent) use messages `ContactForm`.
      fields: {
        role: "Your role",
        employees: "Number of employees",
        sites: "Number of sites or plants",
        tracking: "How do you track performance today?",
        cycle: "When does your next appraisal cycle start?",
        anything: "Anything else?",
      },
      choices: {
        role: [
          { value: "hr", label: "HR" },
          { value: "finance", label: "Finance" },
          { value: "operations", label: "Operations / Plant" },
          { value: "leadership", label: "Management / Leadership" },
          { value: "other", label: "Other" },
        ],
        sites: [
          { value: "1", label: "1" },
          { value: "2-5", label: "2–5" },
          { value: "6-plus", label: "6+" },
        ],
        tracking: [
          { value: "spreadsheets", label: "Spreadsheets" },
          { value: "hris-module", label: "An HRIS module" },
          { value: "other-software", label: "Other software" },
          { value: "not-formally", label: "Not formally yet" },
        ],
        cycle: [
          { value: "within-3-months", label: "Within 3 months" },
          { value: "3-6-months", label: "3–6 months" },
          { value: "later", label: "Later / not sure" },
        ],
      },
      submit: "Request my review",
      success: "Thank you. We'll be in touch shortly to set up your 30-minute call.",
    },
    email: {
      subject: "Inquiry about DEUS Enhance",
      body: "Dear DEUS Admin,\n\nI'm [Name] from [Company Name]. I'd like to know more about DEUS Enhance. Can you set up a quick call with the team for me?",
    },
  },
  faq: {
    eyebrow: "FAQ",
    title: "Questions we hear before every first call.",
    // Items 8–11 wait for answers from the team (Markdown: VERIFY), so they are not copied.
    items: [
      {
        question: "Do we have to replace our HRIS or payroll system?",
        answer:
          "No. Enhance works alongside your existing HRIS, ERP, payroll and operational systems. We agree how data flows between them during scoping.",
      },
      {
        question: "Can we use our own KPIs and competencies?",
        answer:
          "Yes. You set the KPIs, competencies, weights, formulas, periods and measures, and they can differ by role and level.",
      },
      {
        question: "We don't have a proper KPI framework yet. Is that a problem?",
        answer:
          "Not at all. Plenty of companies start there. We can help you design it, often beginning with a KPI-mapping workshop.",
      },
      {
        question: "Does it work if we have several plants or branches?",
        answer:
          "Yes. Performance is tracked from company level down to each team and individual, so plant and operations leaders can see how every site is doing.",
      },
      {
        question: "How does Enhance connect performance to pay?",
        answer:
          "Appraisal and calibration results feed straight into bonus cycles, reward grouping and salary increase decisions, so rewards rest on measured performance.",
      },
      {
        question: "How do we get started?",
        answer:
          "With a short review of how your appraisals work today. From there we recommend the right next step: a KPI-mapping workshop, a pilot or a tailored trial.",
      },
      {
        question: "What support do we get after go-live?",
        answer: "User training, a review after each cycle, and hands-on help whenever you need it.",
      },
    ],
  },
  // The closing panel keeps the global "Let's talk" label and WhatsApp button; the booking form
  // takes the place of its main button (F79).
  closing: {
    title: ["Make performance visible.", "Make decisions clearer."],
    lede: "DEUS Human Capital Services",
  },
};
