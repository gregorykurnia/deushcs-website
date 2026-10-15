import { siteFlags } from "@/content/flags";
import type { AboutContent } from "@/content/types";

// Copy from content/en/about.md, word for word. `> Note:` lines are dropped. The founder's note
// in §2 is still a placeholder in the Markdown, so the story stands without it. The 6 I's icons
// are picked by meaning, since the mockup doesn't show About. The newest timeline entry is "now".

export const aboutEn: AboutContent = {
  meta: {
    title: "About DEUS Human Capital Services",
    description:
      "DEUS is an Indonesian HR technology company building game-based assessments and performance management software, built on the belief that people are a company's most important asset.",
  },
  hero: {
    eyebrow: "About DEUS",
    title: "We believe people are a company's most important asset.",
    lede: "So we build tools that help organizations understand them properly: who to hire, where their potential lies, and how to reward the work they do. DEUS is an Indonesian HR technology company, working with businesses across the country to make people decisions on better evidence.",
  },
  story: {
    eyebrow: "Our story",
    title: "It started with a game.",
    paragraphs: [
      "In 2022 we launched DEUS Discover, one of the first gamified assessments in Indonesia. The idea was simple: if candidates could play their way through an assessment instead of filling in a questionnaire, we'd see how they really think and behave, and they'd actually enjoy it.",
      "It worked. In 2023 we were selected as one of 17 startups in Startup Studio Indonesia, the national accelerator run by Kominfo, now Komdigi. The same year, we launched DEUS Enhance, because understanding people at the point of hiring is only half the job. Companies also needed a fair way to measure and reward performance once those people were on board.",
      "Since then, we've represented Komdigi at Innovfest by NUS x AsiaTech in Singapore, launched Potentia to bring the same science to children, and expanded our assessments into cognitive, neuroscience and business simulation games.",
    ],
  },
  mission: {
    eyebrow: "Our mission",
    title:
      "Delivering evidence-based solutions that help organizations understand, develop, and optimize the best potential of every individual.",
  },
  visionMission: {
    eyebrow: "Vision and mission",
    items: [
      {
        title: "Vision",
        body: "Empowering organizations to achieve sustainable growth through human capital development.",
      },
      {
        title: "Mission",
        body: "Delivering evidence-based solutions that help organizations understand, develop, and optimize the best potential of every individual.",
      },
    ],
  },
  values: {
    eyebrow: "The 6 I's",
    title: "Six values, one letter.",
    items: [
      {
        icon: "lightbulb",
        title: "Innovative",
        body: "We keep looking for new, creative ways to deliver HR solutions that stay relevant.",
      },
      {
        icon: "sparkles",
        title: "Inspiring",
        body: "We encourage everyone to keep growing and give their best.",
      },
      {
        icon: "handshake",
        title: "Invested in our clients",
        body: "We take time to understand what our clients need, and we stay with them until they get there.",
      },
      {
        icon: "users",
        title: "Inclusive",
        body: "We value every difference and make room for everyone to grow.",
      },
      {
        icon: "target",
        title: "Insightful",
        body: "We look for the right answer through data and a deep understanding of the problem.",
      },
      {
        icon: "refresh",
        title: "Improvement oriented",
        body: "We stay open to learning, and try to get a little better every day.",
      },
    ],
  },
  timeline: {
    eyebrow: "Our journey",
    title: "2022 to today.",
    entries: [
      {
        year: "2022",
        title: "The beginning",
        body: "DEUS Discover launches, one of the first gamified assessments in Indonesia.",
      },
      {
        year: "2023",
        title: "National recognition",
        body: "Selected for Startup Studio Indonesia Batch 6 by Kominfo (now Komdigi). DEUS Enhance launches.",
      },
      {
        year: "2024",
        title: "On the international stage",
        body: "We represent Komdigi at Innovfest by NUS x AsiaTech in Singapore, and take part in Tech in Asia.",
      },
      {
        year: "2025",
        title: "Potentia",
        body: "Potentia launches at Komdigi's headquarters in Jakarta.",
      },
      {
        year: "2026",
        title: "Wider coverage",
        body: "Our assessments expand to cognitive, neuroscience and business simulation games.",
        current: true,
      },
    ],
  },
  recognition: {
    eyebrow: "Recognition and partners",
    // UGM's name follows its flag (confirmed 2026-10-15). Agate is not named, by the owner's decision.
    items: [
      "**Startup Studio Indonesia, Batch 6** · Kominfo / Komdigi",
      "**Innovfest by NUS x AsiaTech** · Singapore",
      "**Tech in Asia**",
      ...(siteFlags.showUgmPartnership ? ["**Universitas Gadjah Mada** · scientific partner for Potentia"] : []),
    ],
  },
  leadership: {
    // Q10: hidden until photos and short bios are supplied.
    flag: "showLeadership",
    eyebrow: "Leadership",
    people: [{ name: "Gregory Amadeus Kurnia", role: "Chief Executive Officer" }],
  },
  companyDetails: {
    // VERIFY Q9: the office address isn't supplied, so none is stored. When it is, add it behind
    // siteFlags.showAddress (the footer and Contact read the same flag).
    line: "DEUS Human Capital Services is a brand of **PT Investama Persada Kurnia**.",
  },
};
