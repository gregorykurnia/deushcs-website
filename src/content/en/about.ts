import type { AboutContent } from "@/content/types";

// Copy from content/en/about.md, word for word. `> Note:` lines are dropped. The founder's note
// in §2 is still a placeholder in the Markdown, so the story stands without it. The newest timeline
// entry is "now".

export const aboutEn: AboutContent = {
  meta: {
    title: "About DEUS Human Capital Services",
    description:
      "DEUS is an Indonesian HR technology company building game-based assessments and performance management software, built on the belief that people are a company's most important asset.",
  },
  hero: {
    eyebrow: "About DEUS",
    title: "We believe people are a company's most important asset.",
    lede: "So we build tools that help organizations understand them properly: who to hire, where their potential lies, and how to reward the work they do. DEUS is an Indonesian HR technology company, working with businesses across the country so that decisions about people rest on real evidence.",
  },
  story: {
    eyebrow: "Our story",
    title: "It started with a game.",
    paragraphs: [
      // G1.7 (GEO §S2): the answer passage, opening the story as its summary
      "DEUS Human Capital Services is an HR technology company in Indonesia, started in 2022 with DEUS Discover, one of the first gamified assessments in the country. It now builds game-based assessments that companies use to hire and develop people, DEUS Enhance for performance management connected to pay, and Potentia, a cognitive assessment that helps parents and schools understand how children aged 7–15 learn.",
      "In 2022 we launched DEUS Discover, one of the first gamified assessments in Indonesia. The idea was simple: if candidates could play their way through an assessment instead of filling in a questionnaire, we'd see how they think and behave, and they'd enjoy it too.",
      "It worked. In 2023 we were selected as one of 17 startups in Startup Studio Indonesia, the national accelerator run by Kominfo, now Komdigi. The same year, we launched DEUS Enhance, because understanding people at the point of hiring is only half the job. Companies also needed a fair way to measure and reward performance once those people were on board.",
      "Since then, we've represented Komdigi at Innovfest by NUS x AsiaTech in Singapore, launched Potentia to bring the same science to children, and added cognitive, neuroscience and simulation games. It all comes back to one belief: every person has potential, and our job is to help you see it.",
    ],
  },
  // D14: one section. The mission is the statement; the vision sits under it. Both are the official
  // wording from the company profile, so they keep it, "Empowering" included.
  mission: {
    eyebrow: "Our mission",
    title:
      "Delivering evidence-based solutions that help organizations understand, develop, and optimize the best potential of every individual.",
    vision: {
      eyebrow: "Our vision",
      body: "Empowering organizations to achieve sustainable growth through human capital development.",
    },
  },
  values: {
    eyebrow: "The 6 I's",
    title: "Six values, one letter.",
    items: [
      {
        title: "Innovative",
        body: "We keep looking for new ways to solve HR problems, so our work stays relevant.",
      },
      {
        title: "Inspiring",
        body: "We encourage everyone to keep growing and give their best.",
      },
      {
        title: "Invested in our clients",
        body: "We take time to understand what our clients need, and we stay with them until they get there.",
      },
      {
        title: "Inclusive",
        body: "We value every difference and make room for everyone to grow.",
      },
      {
        title: "Insightful",
        body: "We look for the right answer through data and a deep understanding of the problem.",
      },
      {
        title: "Improvement oriented",
        body: "We stay open to learning, and try to get a little better every day.",
      },
    ],
  },
  timeline: {
    eyebrow: "Our history",
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
        body: "We represented Komdigi at Innovfest by NUS x AsiaTech in Singapore, and DEUS Discover was highlighted at the Tech in Asia Products Stage.",
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
  leadership: {
    // Q10: hidden until photos and short bios are supplied.
    flag: "showLeadership",
    eyebrow: "Leadership",
    people: [{ name: "Gregory Amadeus Kurnia", role: "Chief Executive Officer" }],
  },
};
