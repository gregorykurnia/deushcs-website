import type { DiscoverContent } from "../types";

// DEUS Discover page copy, from content/en/discover.md. Wording is kept as written. The
// `> Note:` line (screenshot source) is dropped.

export const discoverEn: DiscoverContent = {
  meta: {
    title: "DEUS Discover: Gamified Personality and Competency Assessment",
    description:
      "An RPG-style assessment built on the Big Five. Measures 32 personality subtraits and 24 competencies, mapped to your own competency framework, with results the same or next day.",
  },
  hero: {
    eyebrow: "DEUS Discover · Personality module",
    title: "Personality, revealed through a story.",
    lede: "Discover puts candidates inside an RPG-style story and asks them to make decisions as it unfolds. The way they handle each situation builds a detailed picture of their personality and competencies, measured against the framework your organization already uses.",
    ctas: [
      { label: "Request a demo", href: "/contact?product=discover" },
      { label: "Request a free trial", href: "/contact?product=discover" },
    ],
    // The story is the Game-Based Assessment's story screen (same image, same card). "22 minutes" is
    // illustrative, as on the GBA page, and goes on the launch checklist with the other sample data.
    window: {
      story: {
        title: "Plays DEUS Discover",
        meta: "22 minutes",
        alt: "A DEUS Discover story scene: a colleague asks what you would do, with two answers to choose from.",
      },
      result: { label: "Big Five (OCEAN)", value: "5", unit: "factors" },
    },
  },
  measures: {
    eyebrow: "What it measures",
    stats: [
      { value: "32", label: "personality subtraits" },
      { value: "24", label: "competency traits" },
      { value: "+ your own", label: "custom competencies" },
    ],
    lede: "Built on the **Big Five (OCEAN)** model of personality and a **Universal Competency Framework**, and written up as an in-depth qualitative analysis, not just a row of scores.",
  },
  how: {
    intro: {
      eyebrow: "How it works",
      title: "A questionnaire asks people who they are. A story shows you.",
    },
    paragraphs: [
      "Most personality tests ask candidates to rate themselves: \"I enjoy meeting new people\", agree or disagree. It's easy to work out what the employer wants to hear.",
      "Discover takes a different route. It's a digital situational judgment test, delivered as a narrative game. Candidates face situations and dilemmas as the story moves on, and choose what to do next. There's no obvious right answer to aim for, so what you see is closer to how they really behave at work.",
    ],
  },
  why: {
    eyebrow: "Why Discover",
    items: [
      { icon: "gauge", title: "Fast results", body: "Comprehensive profiles are ready the same day or the next." },
      {
        icon: "target",
        title: "Your competencies",
        body: "Measure what matters to your organization, not a generic list.",
      },
      {
        icon: "users",
        title: "Built for big groups",
        body: "Structured dashboards let you review, compare and track results across a whole cohort.",
      },
      {
        icon: "refresh",
        title: "Useful long after hiring",
        body: "Use it for development, promotion readiness, training needs analysis and leadership mapping too.",
      },
    ],
  },
  customization: {
    intro: {
      eyebrow: "Customization",
      title: "Results that read like they were written for your company, because they are.",
    },
    items: [
      {
        icon: "lightbulb",
        title: "Your organization's language",
        body: "Results are framed around your own competency framework, using the terms your managers already know.",
      },
      {
        icon: "compass",
        title: "Mapped to each role",
        body: "A finance analyst and a sales lead need different strengths. Discover measures each role against the competencies that role actually requires.",
      },
      {
        icon: "map-pin",
        title: "Scenarios from your world",
        body: "The story's situations, industry context and business language can reflect your company, so candidates recognize the kind of work they're applying for.",
      },
    ],
  },
  reports: {
    intro: { eyebrow: "Reports", title: "Two views: the person, and the fit." },
    items: [
      {
        title: "Personality report",
        body: "A detailed profile of the candidate's personality and competencies, with a written analysis that explains what the scores mean in practice.",
        alt: "A Discover individual report for one candidate: trait bars for each driver, then strengths and areas for improvement.",
      },
      {
        title: "Individual profile suitability",
        body: "How closely the candidate's profile matches what the role needs, so you can see the fit at a glance.",
        // written from the copy until the screenshot arrives; check it against the screen then
        alt: "An individual profile suitability report: how closely one candidate's profile matches the role.",
      },
    ],
  },
  beyond: {
    intro: {
      eyebrow: "Beyond hiring",
      title: "The same profile keeps working after day one.",
      lede: "Discover isn't only for choosing candidates. Clients also use it to:",
    },
    points: [
      "plan employee development",
      "check readiness for promotion",
      "find out where training is really needed",
      "map leadership potential across the company",
    ],
  },
  suite: {
    intro: {
      eyebrow: "Better together",
      title: "Personality is one piece of the picture.",
      lede: "Add Cognitive, Neuroscience or Simulation modules to see how someone thinks, takes risks and handles real business problems.",
    },
    cta: {
      label: "See the full Game-Based Assessment suite →",
      href: "/solutions/game-based-assessment",
    },
  },
  closing: {
    label: "Try Discover",
    title: ["Meet your candidates", "before you meet them."],
    lede: "Request a demo and we'll walk you through the story, the profile and the reports, or try it yourself with a free trial.",
    cta: { label: "Request a demo", href: "/contact?product=discover" },
  },
};
