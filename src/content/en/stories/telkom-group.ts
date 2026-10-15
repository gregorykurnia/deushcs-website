import { siteFlags } from "../../flags";
import type { StoryContent, StoryQuote } from "../../types";

// Client story: Telkom Group, from content/en/clients-telkom-group.md. Wording is kept as written;
// the `> Note:` and [VERIFY] lines are dropped.
//
// Q7 (permission to name Telkom, show the photo and use Ibu Lina's quote) is open, so the story runs
// anonymised until `siteFlags.telkomNamed` is on. The anonymised variant must not identify the client,
// so it differs from the named one in more than the name:
//   - the client is "A national telecom group", and the URL is /clients/national-telecom-group, because
//     /clients/telkom-group would give it away. (When Q7 is confirmed the slug changes: 4.2's registry
//     keeps the anonymised slug as a redirect.)
//   - no photo, and no Ibu Lina: her quote names "Telkom Group" and Q7 covers it.
//   - "Telkom Indonesia and 6 subsidiaries" becomes "the parent company and its subsidiaries": a telecom
//     group with exactly six subsidiaries is easy to look up.
// The participants' quotes name no one and stay in both variants.
//
// "Without traveling to a test center" is dropped from the "What we did" copy: the note under it says it
// follows from the browser-based delivery, but nobody has checked that Telkom ran it that way.

const participants: StoryQuote[] = [
  {
    quote:
      "Bagus sekali idenya, saya pertama kali menjalankan psikotest dengan metode seperti ini dan tidak terasa seperti psikotest. Sangat menyenangkan!",
    lang: "id",
    translation:
      "Such a great idea. It was my first psychotest like this, and it didn't feel like a psychotest at all. Really fun!",
  },
  {
    quote: "Tidak pernah disangka tes psikologi dapat dilakukan dengan cara yang sangat menyenangkan.",
    lang: "id",
    translation: "I never imagined a psychological test could be this enjoyable.",
  },
  {
    quote: "Semoga lebih banyak tes-tes gamifikasi yang luar biasa ke depan.",
    lang: "id",
    translation: "I hope there are more great gamified tests like this in the future.",
  },
];

const ibuLina: StoryQuote = {
  quote:
    "Senang sekali bisa bekerja sama dengan tim DEUS dalam penyiapan seleksi untuk karyawan Telkom Group. Kami sangat terbantu dengan profesionalitas sepanjang persiapan hingga proses akhirnya. Semoga kerja sama kami tetap berjalan dengan baik.",
  lang: "id",
  translation:
    "It was a real pleasure working with the DEUS team on the selection for Telkom Group employees. Their professionalism helped us a great deal, from preparation right through to the end of the process. We hope to keep working together.",
  name: "Ibu Lina",
  role: "Telkom Group Selection",
};

/** The story with or without Telkom's name, photo and quote. `telkomStoryEn` is the one the site uses. */
export function buildTelkomStory(named: boolean): StoryContent {
  const client = named ? "Telkom Group" : "A national telecom group";
  const group = named ? "Telkom Group" : "the group";
  return {
    meta: {
      title: `${named ? "Telkom Group" : "A National Telecom Group"}: Game-Based Assessment for Management Trainee Recruitment`,
      description: `How ${client} assessed 1,000+ Management Trainee candidates across 30+ provinces at the same time, with results in one day, two years in a row.`,
    },
    slug: named ? "telkom-group" : "national-telecom-group",
    product: "Game-Based Assessment",
    client,
    header: {
      eyebrow: "Client story · Game-Based Assessment",
      title: "1,000+ Management Trainee candidates. 30+ provinces. Results in one day.",
      lede: `How ${client} ran a nationwide Management Trainee selection with DEUS, two years in a row.`,
    },
    glance: {
      stats: [
        { value: "1,000+", label: "candidates assessed" },
        { value: "30+", label: "provinces at the same time" },
        { value: "1 day", label: "to results" },
        { value: "2", label: "consecutive years" },
      ],
      footnote: named ? "Telkom Indonesia and 6 subsidiaries" : "A national telecom group and its subsidiaries",
    },
    challenge: {
      eyebrow: "The challenge",
      title: "A national intake, on a recruitment timeline.",
      paragraphs: [
        `${named ? "Telkom Group's" : "The group's"} Management Trainee program recruits for ${named ? "Telkom Indonesia and six of its subsidiaries" : "the parent company and its subsidiaries"}, with candidates spread across the country. The selection team needed to assess more than a thousand people in over 30 provinces at once, fairly and consistently, and have results ready quickly enough to keep the process moving.`,
      ],
    },
    did: {
      eyebrow: "What we did",
      title: "One assessment, run everywhere at once.",
      paragraphs: [
        "DEUS ran its game-based assessment for every candidate simultaneously, in more than 30 provinces. Candidates took it in their browser, and results were delivered within one day.",
        `The following year, ${group} ran its Management Trainee selection with DEUS again.`,
      ],
    },
    results: {
      eyebrow: "Results",
      title: "Faster decisions, and candidates who enjoyed the process.",
      paragraphs: [
        `Results for more than 1,000 candidates were ready within a day. Both ${group} and the participants rated the experience highly, and the program came back for a second year.`,
      ],
    },
    words: {
      eyebrow: "In their words",
      featured: named ? [ibuLina] : [],
      participants: { label: "From the candidates", quotes: participants },
    },
    photo: named
      ? {
          alt: "The DEUS team with Telkom Group staff at Telkom Indonesia's Graha Merah Putih, Bandung",
          caption: "Group photo at Telkom Indonesia, Graha Merah Putih, Bandung",
          placeholder: "TODO: Group photo at Telkom Indonesia, Graha Merah Putih, Bandung",
        }
      : undefined,
    closing: {
      label: "Planning an intake?",
      title: ["Running an MT or campus drive", "this year?"],
      lede: "We'll show you how a nationwide intake runs on DEUS, from the first CSV upload to the final ranked list.",
      cta: { label: "Request a demo", href: "/contact?product=gba" },
    },
  };
}

export const telkomStoryEn: StoryContent = buildTelkomStory(siteFlags.telkomNamed);

// The one-line link card on Home and GBA (DESIGN-GUIDE.md §7.21). It names the client only when the
// story does, so the card follows `telkomNamed` (Q7) like the story, and it repeats no numbers or quotes.
export const telkomCardLink: { line: string; href: string } = {
  line: siteFlags.telkomNamed
    ? "Telkom Group: Management Trainee recruitment, with results in one day."
    : "A national telecom group: Management Trainee recruitment, with results in one day.",
  href: `/clients/${telkomStoryEn.slug}`,
};
