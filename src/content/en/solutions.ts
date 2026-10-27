import type { SolutionsContent } from "@/content/types";
import { potentiaHref, whatsappHref } from "@/lib/links";

// Copy from content/en/solutions.md, word for word. Labels leave out the arrows the Markdown
// writes (→ ↗): TextLink draws them. `> Note:` lines are dropped. The closing panel is the global
// one, so this module has no closing field.

export const solutionsEn: SolutionsContent = {
  meta: {
    title: "Solutions | DEUS Human Capital Services",
    description:
      "Game-based assessment for hiring and talent mapping, performance management connected to pay, and cognitive assessment for children.",
  },
  hero: {
    eyebrow: "Solutions",
    title: "Evidence for hiring, promotion and pay decisions.",
    lede: "DEUS gives you data you can stand behind when you choose who to hire, look for the leaders already in your company or decide who earned this year's bonus.",
    // G1.7 (GEO §S2): the answer passage, under the approved lede
    passage:
      "DEUS Human Capital Services, an HR technology company in Indonesia, builds three products. Game-Based Assessment, four modules of short online games on one platform, is for high-volume hiring and talent mapping. DEUS Enhance is for HR, management and finance teams, connecting KPIs, appraisals and calibration to bonus, incentive and salary decisions. Potentia, a gamified cognitive assessment, helps parents and schools understand how children aged 7–15 learn best.",
  },
  assess: {
    eyebrow: "Assess · Hire and develop",
    title: "Know who you're hiring, and who's ready to grow.",
    // F10: one product, naming its four modules.
    product: {
      name: "Game-Based Assessment",
      body: "Four modules built for high-volume hiring and talent mapping: Personality · DEUS Discover, Cognitive, Neuroscience and Simulation.",
      cta: { label: "Explore the suite", href: "/solutions/game-based-assessment" },
    },
  },
  perform: {
    eyebrow: "Perform and reward",
    title: "Run fair appraisals, and pay for real performance.",
    product: {
      name: "DEUS Enhance",
      body: "KPIs, appraisals, calibration and talent mapping in one place, connected to bonus, incentive and salary decisions.",
      cta: { label: "Explore Enhance", href: "/solutions/enhance" },
    },
  },
  education: {
    eyebrow: "Education",
    title: "Help every child learn the way they learn best.",
    product: {
      name: "Potentia by DEUS",
      body: "A gamified cognitive assessment for children aged 7–15, with clear, practical guidance for parents and teachers.",
      cta: { label: "Visit Potentia (in Indonesian)", href: potentiaHref() },
    },
  },
  help: {
    eyebrow: "Need a hand?",
    title: "Tell us the problem. We'll point you to the right tool.",
    lede: 'Most conversations start with a challenge, not a product: "our MT intake is too big to screen properly", or "nobody trusts our bonus decisions". Tell us yours.',
    ctas: [
      { label: "Talk to us", href: "/contact" },
      { label: "Chat on WhatsApp", href: whatsappHref("default") },
    ],
  },
};
