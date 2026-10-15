import type { NextChapterContent } from "../types";

// Next Chapter page copy, from content/en/next-chapter.md. Wording is kept as written. The public
// name is confirmed by default (Q4), so the `[VERIFY Q4]` line and the `> Note:` lines are dropped.

export const nextChapterEn: NextChapterContent = {
  meta: {
    title: "Next Chapter: Cognitive, Neuroscience and Business Simulation Assessment",
    description:
      "Fifteen games that show how candidates think, take risks and make business decisions under pressure. Cognitive, neuroscience and simulation modules, normed on Indonesians.",
  },
  hero: {
    eyebrow: "Next Chapter",
    title: "See how people think, not what they've memorized.",
    lede: "Next Chapter brings together three assessment modules: cognitive games, neuroscience-based games and business simulations. Each one measures something an interview or a paper test struggles to capture, and each one can be used on its own.",
    ctas: [
      { label: "Request a free trial", href: "/contact?product=next-chapter" },
      { label: "Book a demo", href: "/contact?product=next-chapter" },
    ],
    // The one game screen on disk: the title and meta are the game and what it measures.
    window: {
      game: {
        title: "Keypress Game",
        meta: "Motivation and processing speed",
        alt: "The Keypress Game: a countdown timer, a count of key presses so far and a space bar to press as fast as you can.",
      },
    },
  },
  moduleNavLabel: "Next Chapter modules",
  moduleChips: [
    { id: "cognitive", label: "Cognitive", detail: "7 games" },
    { id: "neuro", label: "Neuroscience", detail: "6 games" },
    { id: "simulation", label: "Simulation", detail: "2 scenarios" },
  ],
  cognitive: {
    id: "cognitive",
    intro: {
      eyebrow: "Module 1 · Cognitive",
      title: "Seven games. Seven ways of thinking.",
      lede: "Short, focused games that measure how fast and how accurately someone processes information. Because they're timed and interactive, they capture speed and consistency as well as correct answers.",
    },
    games: [
      { name: "Objective Shooter", measures: "Processing speed and precision" },
      { name: "Reverse Retention", measures: "Working memory" },
      { name: "Odd One Out", measures: "Pattern recognition" },
      { name: "Mallet Math", measures: "Arithmetic and problem solving" },
      { name: "Object Turn", measures: "Spatial reasoning" },
      { name: "Match Blast", measures: "Logical reasoning" },
      { name: "Speed Sorting", measures: "Cognitive agility" },
    ],
    missGain: {
      miss: {
        title: "What traditional tests miss",
        points: [
          "Answers can be coached or memorized.",
          "They show whether someone got it right, not how fast or how consistently.",
          "They're hard to run for large hiring volumes.",
        ],
      },
      gain: {
        title: "What you get instead",
        points: [
          "Accuracy and speed measured in real time.",
          "A benchmark for learning agility.",
          "As many candidates as you need, at once.",
        ],
      },
    },
  },
  neuro: {
    id: "neuro",
    intro: {
      eyebrow: "Module 2 · Neuroscience",
      title: "The things people can't easily fake in an interview.",
      lede: "Six games based on established neuroscience research. They capture motivation, appetite for risk, how people decide where to put their effort, and how well they read emotions, all through behavior people don't consciously control.",
    },
    games: [
      { name: "Balloon Game", measures: "Risk-taking and learning ability" },
      { name: "Tower Game", measures: "Planning and problem solving" },
      {
        name: "Keypress Game",
        measures: "Motivation and processing speed",
        alt: "The Keypress Game: a countdown timer, a count of key presses so far and a space bar to press as fast as you can.",
      },
      { name: "Hard or Easy Task", measures: "Effort allocation and decision making" },
      { name: "Lengths Game", measures: "Attention to detail" },
      { name: "Faces Game", measures: "Emotional intelligence, empathy and emotion recognition" },
    ],
    missGain: {
      miss: {
        title: "What interviews miss",
        points: [
          "Motivation is easy to misjudge in a one-hour conversation.",
          "Someone's appetite for risk usually shows up months after they're hired.",
          "Emotional intelligence is hard to assess fairly.",
        ],
      },
      gain: {
        title: "What you get instead",
        points: [
          "Behavioral data from what people actually do.",
          "An early view of each person's risk profile.",
          "Insight into emotion recognition, especially useful for leadership and customer-facing roles.",
        ],
      },
    },
  },
  simulation: {
    id: "simulation",
    intro: {
      eyebrow: "Module 3 · Simulation",
      title: "A real business problem, against the clock.",
      lede: "Two business scenarios that put candidates to work: analyzing cases, investigating information, writing reports and allocating budgets. Both can be customized to your industry through the platform.",
    },
    scenarios: [
      {
        label: "Game 1",
        name: "Business Operations",
        body: "Review the cases, dig into the information and write a business report.",
        measures: "Measures judgment, accuracy and analytical communication.",
      },
      {
        label: "Game 2",
        name: "Event Operations",
        body: "Allocate a budget under a live timer, then report on the decisions.",
        measures: "Measures prioritization, resource allocation and decision speed.",
      },
    ],
    assesses: {
      title: "What it assesses",
      points: [
        "Analytical thinking",
        "Financial and business acumen",
        "Diagnostic information gathering",
        "Written synthesis",
      ],
    },
    missGain: {
      miss: {
        title: "What case interviews miss",
        points: [
          "Candidates memorize consulting frameworks.",
          "Assessment centers are expensive and hard to scale.",
          "Generic cases have little to do with your business.",
        ],
      },
      gain: {
        title: "What you get instead",
        points: [
          "Cases set in your own industry.",
          "A clear view of prioritization, accuracy and analysis under real time pressure.",
          "The same scenario for every candidate, at any volume.",
        ],
      },
    },
  },
  choosing: {
    intro: {
      eyebrow: "Choosing modules",
      title: "Not sure where to start? Here's what clients usually pick.",
    },
    columns: { useCase: "Use case", modules: "Recommended modules" },
    caption: "Which modules clients usually pick for each use case",
    rows: [
      {
        useCase: "Management Trainee recruitment",
        modules: "Cognitive + Neuro to shortlist, Simulation for the final round",
      },
      { useCase: "Campus recruitment", modules: "Personality + Cognitive" },
      {
        useCase: "Leadership identification",
        modules: "Neuro (risk, motivation, EQ), with Personality",
      },
      { useCase: "Internal talent mapping", modules: "Cognitive + Personality" },
      { useCase: "Competency mapping", modules: "Personality, mapped to your framework" },
    ],
  },
  closing: {
    label: "Try it",
    title: ["Play it once,", "and you'll see why it works."],
    lede: "Request a free trial and go through the games yourself, or run a pilot with your next batch of candidates.",
    cta: { label: "Request a free trial", href: "/contact?product=next-chapter" },
  },
};
