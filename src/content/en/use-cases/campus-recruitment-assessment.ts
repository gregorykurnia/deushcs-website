import { gbaEn } from "../game-based-assessment";
import type { UseCaseContent } from "../../types";

// Use case: Campus recruitment assessment, from content/en/use-cases/campus-recruitment-assessment.md
// (SEO/geo-implementation-plan.md §S8). Wording is kept as written; the `> Note:` lines and the Sources list
// are dropped, and the "Download offer" section is the shared block (`offer`), which has no copy here.
//
// No client story is about a campus drive, so the proof has no story card: while stories show, the shared
// "Read client stories" link stands in. The closing is the Telkom story's approved one, as on the Management
// Trainee page. The line under the cards links to that page, the one related use case the copy names.

const gba = "/solutions/game-based-assessment";

export const campusRecruitmentEn: UseCaseContent = {
  meta: {
    title: "Campus Recruitment Assessment: Graduate Screening at Volume",
    description:
      "Screen graduates from many universities with Personality and Cognitive games in the browser. A clear, defensible ranking, scored automatically and normed on Indonesians.",
  },
  slug: "campus-recruitment-assessment",
  product: { name: "Game-Based Assessment", path: gba },
  whatsapp: "assessment",
  breadcrumb: "Campus recruitment assessment",
  hero: {
    eyebrow: "Use case · Game-Based Assessment",
    title: "Campus recruitment assessment",
    passage:
      "DEUS runs campus recruitment assessments for companies in Indonesia that hire graduates at volume. Applicants from many universities play short Personality and Cognitive games in a phone or laptop browser, with no app to install. The results give a clear, defensible ranking of candidates whose CVs look alike. Scoring is automatic, and every score is normed on the Indonesian population.",
    cta: { label: "Request a free trial", href: "/contact?product=gba" },
    // The two modules the passage names: Personality's story scene and a cognitive game, with the GBA page's
    // own card titles and alt text.
    screens: [
      {
        image: "discoverFestival",
        title: gbaEn.hero.window.story.title,
        alt: gbaEn.modules.cards.find((card) => card.id === "personality")!.screen.alt,
      },
      {
        image: "gbaNumerical",
        title: gbaEn.hero.window.cognitive.title,
        alt: gbaEn.hero.window.cognitive.alt,
      },
    ],
  },
  problem: {
    eyebrow: "The problem",
    title: "Hundreds of graduates, and CVs that look alike.",
    lede: "A campus drive brings in large applicant pools from many universities. On paper, a lot of them look the same, and the usual screening tools don't separate them well.",
    items: [
      {
        title: "CVs don't tell them apart",
        body: "Similar degrees, similar grades, similar activities. A CV alone gives you very little to rank on.",
      },
      {
        title: "Candidates study for the psikotes",
        body: "Answers to the common personality tests are a quick search away. Results end up measuring how well someone prepared, not who they are.",
      },
      {
        title: "Good candidates quit halfway",
        body: "Long, repetitive assessments lose people before they finish.",
      },
      {
        title: "Scoring by hand slows the drive down",
        body: "Your HR team spends days scoring, compiling and formatting results while candidates wait.",
      },
    ],
  },
  how: {
    eyebrow: "How DEUS does it",
    title: "Personality and Cognitive, for a ranking you can explain.",
    lede: "For campus recruitment we pair two modules. Together they show who each graduate is and how they think, so the shortlist rests on more than a CV.",
    items: [
      {
        title: "Personality · DEUS Discover",
        body: "Candidates make decisions inside an RPG-style story. Their choices build a profile of 32 personality subtraits and 24 competency traits on the Big Five (OCEAN) model, measured against the competencies each role needs. There's no obvious right answer to aim for.",
        link: { label: "Personality module", href: `${gba}#personality` },
      },
      {
        title: "Cognitive",
        body: "Seven short, timed games on processing speed, working memory, reasoning and more. They measure accuracy and speed in real time, give you a benchmark for learning agility, and run for as many candidates as you need at once.",
        link: { label: "Cognitive module", href: `${gba}#cognitive` },
      },
    ],
    note: {
      text: "The same pairing works for any role with a large applicant pool. Selecting for a Management Trainee program?",
      link: { label: "Management Trainee assessment", href: "/solutions/management-trainee-assessment" },
    },
  },
  runs: {
    eyebrow: "How it runs",
    title: "One upload for every university on your list.",
    steps: [
      {
        title: "Invite",
        body: "Add every applicant from one CSV file, whichever campus they applied through. Branded invitations go out automatically, and candidates who haven't started get a reminder.",
      },
      {
        title: "Start securely",
        body: "Device checks and anti-cheat logic run before the first game. Candidates play on their own phone or laptop, in the browser, with nothing to download.",
      },
      {
        title: "Play",
        body: "They work through the story and the cognitive games. Candidates come away seeing your company as modern and serious about talent.",
      },
      {
        title: "Decide",
        body: "Reports are ready the moment candidates finish. The batch report ranks every applicant and flags those below your cut-off score, and the interactive dashboard lets your hiring committee filter by score band and open any candidate's full profile.",
      },
    ],
  },
  proof: {
    line: "Trusted by **40+ brands** across Indonesia.",
  },
  offer: true,
  faq: {
    eyebrow: "FAQ",
    title: "Questions about campus recruitment assessment.",
    items: [
      {
        question: "Which assessment works best for campus recruitment?",
        answer:
          "Personality and Cognitive together. Campus drives bring large applicant pools from many universities, and CVs that look alike. Personality shows how each graduate behaves and which competencies they bring, and Cognitive measures speed, accuracy and learning agility. Together they give you a clear, defensible ranking. You can start with one module and add the other later.",
      },
      {
        question: "Do graduates need to install anything?",
        answer:
          "No. The assessment runs in a mobile or desktop browser, so candidates take it on their own phone or laptop. They just need a stable internet connection. Device checks and anti-cheat logic run before the first game, and there's nothing to download.",
      },
      {
        question: "How many applicants can it handle at once?",
        answer:
          "As many as you need, at the same time. A national telecom group used DEUS to assess more than 1,000 Management Trainee candidates across 30+ provinces at once, with results within a day. The platform sends invitations and reminders, tracks who has finished and generates every report, so a large drive doesn't mean adding people to your HR team.",
      },
      {
        question: "Will candidates enjoy taking it?",
        answer:
          "That's the idea. The games are faster and more engaging than a long questionnaire, which is where many candidates give up halfway. They come away seeing your company as modern and serious about talent, and participants have told us it didn't feel like a psychotest at all.",
      },
    ],
  },
  relatedGuide: "campus-recruitment-screening",
  // The Telkom story's approved closing (clients-telkom-group.md §8, R17 F86), word for word.
  closing: {
    label: "Planning an intake?",
    title: "Running an MT or campus drive?",
    lede: "We'll show you how a nationwide intake runs on DEUS, from the first upload to the final ranked list.",
    cta: { label: "Request a demo", href: "/contact?product=gba" },
  },
};
