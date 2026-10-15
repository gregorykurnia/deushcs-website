import { siteFlags } from "../flags";
import type { ScienceContent } from "../types";

// Science page copy, from content/en/science.md. Wording is kept as written. The `> Note:` and
// [VERIFY] lines are dropped. The two claims they guard sit behind siteFlags until the owner
// answers them. No validation figures are published: the copy has none to publish. The icons on
// the fairness points are page design, not copy.

export const scienceEn: ScienceContent = {
  meta: {
    title: "The Science Behind DEUS Assessments",
    description:
      "How DEUS builds and validates game-based assessments: established psychological frameworks, a four-phase development process, validation against traditional tests and norms from the Indonesian population.",
  },
  hero: {
    eyebrow: "Our science",
    title: "Games on the surface. Serious assessment underneath.",
    lede: "A game is only useful as an assessment if what it measures is real. This page explains how we make sure it is: the research our assessments are built on, how each one is developed, and who it's benchmarked against.",
  },
  frameworks: {
    intro: {
      eyebrow: "Built on established science",
      title: "We didn't invent new theories. We built on proven ones.",
    },
    items: [
      {
        title: "Personality: the Big Five",
        body: "DEUS Discover is based on the Big Five (OCEAN) model of personality, the most widely researched personality framework in psychology, together with a Universal Competency Framework that links personality to workplace competencies.",
      },
      {
        title: "Behavior: neuroscience paradigms",
        body: "The neuroscience module adapts behavioral tasks from neuroscience research, designed to reveal risk-taking, motivation, effort and emotion recognition through what people do rather than what they say.",
      },
      {
        title: "Thinking: cognitive assessment",
        body: "The cognitive games are grounded in classical frameworks for measuring processing speed, memory, reasoning and attention.",
      },
      {
        title: "Children: CHC theory",
        body: "Potentia is built on the Cattell–Horn–Carroll (CHC) theory of cognitive abilities, a widely used model for understanding how children think and learn.",
      },
    ],
  },
  process: {
    intro: {
      eyebrow: "Our process",
      title: "Four phases, before a single candidate plays.",
      lede: "Every assessment goes through the same development process, guided by psychometricians and industrial and organizational psychology researchers.",
    },
    steps: [
      {
        title: "Theory",
        body: "We start from what the research says the trait or ability is, and how it shows up in behavior.",
      },
      {
        title: "Item development",
        body: "We design the game mechanics and scenarios that will draw out that behavior.",
      },
      {
        title: "Validation",
        body: "We test whether the game measures what it's meant to, including against traditional tests.",
      },
      {
        title: "Norming",
        body: "We benchmark results against a reference population, so every score means something.",
      },
    ],
  },
  validated: {
    eyebrow: "Validation",
    title: "Checked against the tests you already trust.",
    lede: "Our cognitive games have been validated against traditional cognitive tests, showing convergent validity: people who score high on one tend to score high on the other. The difference is that ours are faster, more engaging, and much harder to coach for.",
  },
  normed: {
    intro: { eyebrow: "Local norms", title: "Your candidates are compared with people like them." },
    marketClaim: siteFlags.showMarketClaim
      ? "Many assessments used in Indonesia are benchmarked against Western populations. That means a candidate's score is measured against people with different schooling, different language and different cultural reference points."
      : undefined,
    body: "Our assessments are normed on the Indonesian population. When a report says a candidate is in the 80th percentile, it means compared with Indonesians, which is the comparison that matters for your hiring.",
  },
  fair: {
    intro: {
      eyebrow: "Fairness and security",
      title: "Built so results reflect the candidate, not the circumstances.",
    },
    items: [
      {
        icon: "target",
        title: "Hard to coach",
        body: "Because the games measure behavior, there are no answers to memorize and very little to look up.",
      },
      {
        icon: "shield",
        title: "Anti-cheat checks",
        body: "Every session begins with device checks and anti-cheat logic.",
      },
      {
        icon: "map-pin",
        title: "The same experience for everyone",
        body: "Every candidate plays the same games under the same rules, wherever they are in the country.",
      },
    ],
  },
  partnership: siteFlags.showUgmPartnership
    ? {
        intro: { eyebrow: "Partners", title: "Developed with Universitas Gadjah Mada." },
        body: "Potentia, our cognitive assessment for children, was developed together with Universitas Gadjah Mada, with input from psychology and education practitioners.",
      }
    : undefined,
  closing: {
    label: "See the evidence",
    title: ["Want to see the science", "in action?"],
    lede: "We're happy to take your team, including your in-house psychologists, through how our assessments work and how they're validated.",
    cta: { label: "Request a demo", href: "/contact" },
  },
};
