import { siteFlags } from "./flags";
import type { LogoEntry, LogoGroup } from "./types";

// Client logos for the logo wall (Q8), one home for both Home and the Clients hub. The files in
// public/assets/clients/ come from revisions3.0team/client-logos/ (sources in its sources-*.md):
// trimmed, on a transparent background, at most 480x200. Nothing here shows until the owner turns
// on `showLogoWall`; before that, drop any client who hasn't agreed to be shown. A client whose story
// is still anonymised or held stays off the wall too, or its logo would give the story away: the
// Telkom group follows `telkomNamed` (Q7) and Calvin follows `publishCalvin` (Q11).

const logo = (name: string, file: string, width: number, height: number): LogoEntry => ({
  name,
  image: { src: `/assets/clients/${file}.png`, width, height },
});

export const clientLogos = {
  telkomIndonesia: logo("Telkom Indonesia", "telkom-indonesia", 480, 117),
  telkomMetra: logo("TelkomMetra", "telkommetra", 480, 118),
  finnet: logo("Finnet", "finnet", 447, 200),
  telkomAkses: logo("Telkom Akses", "telkom-akses", 480, 160),
  telin: logo("Telin", "telin", 451, 200),
  neutraDc: logo("NeutraDC", "neutradc", 480, 174),
  telkomProperty: logo("TelkomProperty", "telkomproperty", 480, 180),
  bogaGroup: logo("Boga Group", "boga-group", 165, 200),
  paradiseDynasty: logo("Paradise Dynasty", "paradise-dynasty", 480, 130),
  ocean8: logo("Ocean8", "ocean8", 480, 171),
  loafBun: logo("Loaf Bun", "loaf-bun", 176, 200),
  kimukatsu: logo("Kimukatsu", "kimukatsu", 349, 200),
  kintanBuffet: logo("Kintan Buffet", "kintan-buffet", 480, 99),
  shaburi: logo("Shaburi", "shaburi", 453, 200),
  pepperLunch: logo("Pepper Lunch", "pepper-lunch", 240, 200),
  delamibrands: logo("Delamibrands", "delamibrands", 480, 38),
  executive: logo("Executive", "executive", 417, 49),
  colorbox: logo("Colorbox", "colorbox", 480, 53),
  etCetera: logo("Et Cetera", "et-cetera", 400, 74),
  wood: logo("Wood", "wood", 311, 200),
  wrangler: logo("Wrangler", "wrangler", 480, 141),
  tirajeans: logo("Tirajeans", "tirajeans", 480, 100),
  jenahara: logo("Jenahara", "jenahara", 427, 40),
  binacitra: logo("Binacitra Kharisma Lestari", "binacitra-kharisma-lestari", 226, 200),
  watchout: logo("Watchout", "watchout", 359, 27),
  triset: logo("Triset", "triset", 480, 52),
  oxa: logo("Oxa", "oxa", 243, 80),
  sph: logo("Sekolah Pelita Harapan", "sekolah-pelita-harapan", 480, 126),
  jvcKenwood: logo("JVC Kenwood", "jvckenwood", 480, 50),
  calvin: logo("Sekolah Kristen Calvin", "sekolah-kristen-calvin", 480, 177),
  matahariSakti: logo("Matahari Sakti", "matahari-sakti", 392, 200),
  heliosCapital: logo("Helios Capital", "helios-capital", 384, 200),
  hanania: logo("Hanania Kidz Clinic", "hanania-kidz-clinic", 360, 200),
  eliteAir: logo("EliteAir", "eliteair", 480, 147),
  healthyChoice: logo("Healthy Choice", "healthy-choice", 381, 200),
} satisfies Record<string, LogoEntry>;

const l = clientLogos;

const telkomGroup: readonly LogoEntry[] = [l.telkomIndonesia, l.telkomMetra, l.finnet, l.telkomAkses, l.telin, l.neutraDc, l.telkomProperty];
const held = new Set<LogoEntry>([...(siteFlags.telkomNamed ? [] : telkomGroup), ...(siteFlags.publishCalvin ? [] : [l.calvin])]);
const shown = (logos: readonly LogoEntry[]) => logos.filter((logo) => !held.has(logo));

/** Home: the eleven biggest names that can be shown, then a "See all 40+" link in the twelfth spot
 *  (owner, 2026-10-23). The names after the eleventh fill in for any that are held. */
export const homeLogos: readonly LogoEntry[] = shown([
  l.telkomIndonesia, l.bogaGroup, l.jvcKenwood, l.delamibrands, l.sph, l.pepperLunch,
  l.wrangler, l.paradiseDynasty, l.telin, l.colorbox, l.calvin,
  l.kimukatsu, l.executive, l.matahariSakti,
]).slice(0, 11);

/** The Clients hub: every logo, grouped by company so "40+ brands" reads as groups and their brands. */
export const clientLogoGroups: readonly LogoGroup[] = ([
  { name: "Telkom Indonesia", logos: telkomGroup },
  { name: "Boga Group", logos: [l.bogaGroup, l.paradiseDynasty, l.ocean8, l.loafBun, l.kimukatsu, l.kintanBuffet, l.shaburi, l.pepperLunch] },
  { name: "Delamibrands", logos: [l.delamibrands, l.executive, l.colorbox, l.etCetera, l.wood, l.wrangler, l.tirajeans, l.jenahara] },
  { name: "Binacitra Kharisma Lestari", logos: [l.binacitra, l.watchout, l.triset, l.oxa] },
  { name: "More clients", logos: [l.sph, l.jvcKenwood, l.calvin, l.matahariSakti, l.heliosCapital, l.hanania, l.eliteAir, l.healthyChoice] },
] satisfies LogoGroup[])
  .map((group) => ({ ...group, logos: shown(group.logos) }))
  .filter((group) => group.logos.length > 0);
