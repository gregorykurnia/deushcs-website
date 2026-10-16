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
    title: "Better evidence at every stage of the employee lifecycle.",
    lede: "Whether you're choosing who to hire, finding the leaders already in your company or deciding who earned this year's bonus, DEUS gives you data you can stand behind.",
  },
  assess: {
    eyebrow: "Assess · Hire and develop",
    title: "Know who you're hiring, and who's ready to grow.",
    // F10: one product, naming its four modules.
    product: {
      name: "Game-Based Assessment",
      body: "The complete suite: four modules, one platform, built for high-volume hiring and talent mapping. Personality · DEUS Discover, Cognitive, Neuroscience and Simulation.",
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
