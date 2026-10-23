import { allClientLogos } from "../client-logos";
import { siteFlags } from "../flags";
import type { ClientsContent, StoryCardContent } from "../types";
import { telkomStoryEn } from "./stories/telkom-group";

// Clients hub copy, from content/en/clients.md. Wording is kept as written. The `> Note:` lines are
// dropped, and "[Read the story →]" is the card's own link text. Each story card is held or anonymised
// until its permission question is answered: Telkom's card follows `telkomNamed` (Q7) through the story, and
// Calvin's card is absent while `publishCalvin` is off (Q11). The filter chips come once there are more
// than four stories, and the project list (Q22) is not built yet, so neither is in the content.

const telkomCard: StoryCardContent = {
  slug: telkomStoryEn.slug,
  product: telkomStoryEn.product,
  client: telkomStoryEn.client,
  result: "1,000+ Management Trainee candidates across 30+ provinces, with results in one day.",
};

const calvinCard: StoryCardContent = {
  slug: "calvin-christian-school",
  product: "Potentia",
  client: "Calvin Christian School",
  result: "200+ elementary students, and a clearer picture for teachers of how each one learns.",
  note: "Story is in Indonesian",
};

export const clientsEn: ClientsContent = {
  meta: {
    title: "Clients and Client Stories",
    description:
      "How companies and schools across Indonesia use DEUS, from nationwide Management Trainee recruitment to understanding how children learn.",
  },
  hero: {
    eyebrow: "Our clients",
    title: "Trusted by 40+ brands across Indonesia.",
    lede: "From telecommunications and FMCG to retail and education, these are the organizations that use DEUS, and what happened when they did.",
  },
  // VERIFY Q8: approved logos only. Hidden until the owner turns on showLogoWall.
  logoWall: { flag: "showLogoWall", label: "Client logos", logos: allClientLogos },
  industries: {
    eyebrow: "Industries",
    title: "Where our clients work.",
    // G1.7 (GEO §S2): the answer passage, as the lede. The names come from the logo wall, so they show
    // only while it does (showLogoWall); Telkom stays out while telkomNamed is off.
    lede: `More than 40 brands across Indonesia${siteFlags.showLogoWall ? ", among them Boga Group, JVC Kenwood, Delamibrands and Sekolah Pelita Harapan," : ""} use DEUS Human Capital Services, an HR technology company. They work in retail, telecommunications, education, FMCG, F&B, electronics, fashion, healthcare, manufacturing and finance. Companies use DEUS for hiring, including nationwide Management Trainee recruitment, and schools use it to understand how their students learn.`,
    items: [
      "Retail", "Telecommunications", "Education", "FMCG", "F&B", "Electronics",
      "Fashion", "Healthcare", "Manufacturing", "Finance",
    ],
  },
  stories: {
    eyebrow: "Client stories",
    title: "Real programs, real results.",
    cards: !siteFlags.showStories ? [] : siteFlags.publishCalvin ? [telkomCard, calvinCard] : [telkomCard],
  },
  closing: {
    label: "Your turn",
    title: ["Want results", "like these?"],
    lede: "Tell us what you're planning, whether it's a recruitment drive, a talent review or an appraisal cycle, and we'll show you how other teams have approached it.",
    cta: { label: "Request a demo", href: "/contact" },
  },
};
