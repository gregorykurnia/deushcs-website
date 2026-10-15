import type { WhyItem } from "@/components/blocks/WhyPanel";
import type { Locale } from "@/i18n/routing";
import type { SiteFlags } from "./flags";

// Shapes for the typed page content modules in src/content/{en,id}/. Each module is a faithful
// copy of its reviewed Markdown file in content/, with `> Note:` lines dropped and [VERIFY]
// items wired to `siteFlags` (src/content/flags.ts).

/** SEO title and description, from the top of each content file. */
export type PageMeta = {
  title: string;
  description: string;
};

/** A heading. The content files split display headings into lines with ` / `. */
export type Heading = string | readonly string[];

/** A button or link: label plus a locale-less internal path or a full external URL. */
export type Cta = {
  label: string;
  href: string;
};

/** Eyebrow pill, heading and optional lede: the shape of `SectionHeader`. */
export type SectionIntro = {
  eyebrow: string;
  title: Heading;
  lede?: string;
};

/** A titled item in a list, grid or numbered journey. */
export type Item = {
  title: string;
  body: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

/** A page's own closing panel. Anything left out falls back to the global one in messages. */
export type ClosingContent = {
  label?: string;
  title?: Heading;
  lede?: string;
  cta?: Cta;
};

/** Every page has at least its metadata. */
export type PageContentBase = {
  meta: PageMeta;
};

/** A hero: eyebrow, display heading, lede and its buttons (the first one is the primary). */
export type Hero = SectionIntro & { ctas: Cta[] };

/** A titled bullet list, such as "What you get instead". */
export type BulletList = {
  title: string;
  points: string[];
};

/** The two columns under a module: what traditional tools miss, and what this gives instead. */
export type MissGain = {
  miss: BulletList;
  gain: BulletList;
};

/** A big number with its caption, e.g. "32" and "personality subtraits". */
export type StatTile = {
  value: string;
  label: string;
};

/** One of the four modules on the Game-Based Assessment page. */
export type ModuleCard = {
  name: string;
  tag: string;
  body: string;
  cta: Cta;
};

/** One report tab: who it is for, then the export format. */
export type ReportTab = {
  label: string;
  body: string;
  format: string;
};

/** One game and what it measures. */
export type GameRow = {
  name: string;
  measures: string;
};

/** A Next Chapter module section: `id` is its sub-nav anchor. */
export type GameModule = {
  id: string;
  intro: SectionIntro;
  games: GameRow[];
  missGain: MissGain;
};

/** One of the two Next Chapter simulation scenarios. */
export type Scenario = {
  label: string;
  name: string;
  body: string;
  measures: string;
};

/** The simulation module: two scenarios, what they assess, and the two columns. */
export type SimulationModule = {
  id: string;
  intro: SectionIntro;
  scenarios: Scenario[];
  assesses: BulletList;
  missGain: MissGain;
};

/** What the hero's sky window shows: three floating cards over game screens. All data is illustrative. */
export type HeroWindowContent = {
  /** The Discover story scene, as a play card. */
  story: { title: string; meta: string; alt: string };
  /** A cognitive game, as a play card. */
  cognitive: { title: string; meta: string; alt: string };
  /** The result card that overlaps it. */
  result: { label: string; value: string; unit: string; bar: number };
};

/** "Starting from IDR 69,000 per candidate". The amount is a number, so `formatIDR` writes it per locale. */
export type PriceFrom = { label: string; amount: number; unit: string };

/** Game-Based Assessment (`content/en/game-based-assessment.md`), section by section. */
export type GbaContent = PageContentBase & {
  hero: Hero & { window: HeroWindowContent };
  problem: { intro: SectionIntro; items: Item[]; teaser: { label: string; text: string } };
  principles: { intro: SectionIntro; items: WhyItem[] };
  modules: { intro: SectionIntro; items: ModuleCard[]; note: string };
  useCases: { intro: SectionIntro; items: WhyItem[] };
  howItWorks: { intro: SectionIntro; steps: Item[]; chips: string[] };
  platform: { intro: SectionIntro; items: Item[] };
  reports: { intro: SectionIntro; tabs: ReportTab[] };
  science: { intro: SectionIntro; pillars: Item[]; link: Cta };
  impact: { intro: SectionIntro; items: WhyItem[]; badHireCost?: string };
  clientStory: { line: string; href: string };
  pricing: { intro: SectionIntro; from: PriceFrom; lede: string; cta: Cta };
  adoption: { intro: SectionIntro; items: Item[] };
  faq: { intro: SectionIntro; items: FaqItem[] };
  closing: ClosingContent;
};

/** DEUS Discover (`content/en/discover.md`). */
export type DiscoverContent = PageContentBase & {
  hero: Hero;
  measures: { eyebrow: string; stats: StatTile[]; lede: string };
  how: { intro: SectionIntro; paragraphs: string[] };
  why: { eyebrow: string; items: Item[] };
  customization: { intro: SectionIntro; items: Item[] };
  reports: { intro: SectionIntro; items: Item[] };
  beyond: { intro: SectionIntro; points: string[] };
  suite: { intro: SectionIntro; cta: Cta };
  closing: ClosingContent;
};

/** Next Chapter (`content/en/next-chapter.md`). */
export type NextChapterContent = PageContentBase & {
  hero: Hero;
  moduleChips: { id: string; label: string; detail: string }[];
  cognitive: GameModule;
  neuro: GameModule;
  simulation: SimulationModule;
  choosing: { intro: SectionIntro; rows: { useCase: string; modules: string }[] };
  closing: ClosingContent;
};

/** The Science page (`content/en/science.md`). */
export type ScienceContent = PageContentBase & {
  hero: SectionIntro;
  frameworks: { intro: SectionIntro; items: Item[] };
  process: { intro: SectionIntro; steps: Item[] };
  validated: SectionIntro;
  normed: { intro: SectionIntro; marketClaim?: string; body: string };
  fair: { intro: SectionIntro; items: Item[] };
  partnership?: { intro: SectionIntro; body: string };
  closing: ClosingContent;
};

/** A [VERIFY] switch from siteFlags: every flag except the contact reply time. */
export type VerifyFlag = Exclude<keyof SiteFlags, "replyTime">;

/** A person named in the copy. */
export type Person = { name: string; role: string };

/** A product, with its copy and the link that opens it. */
export type ProductContent = { name: string; body: string; cta: Cta };

/** One stage of "From hire to reward": the tab's words, and the product line under them. */
export type StageContent = { stage: string; title: string; body: string; product: string };

/** One year on the About timeline. The newest entry is marked `current` ("now"). */
export type TimelineEntry = { year: string; title: string; body: string; current?: boolean };

/** Home, from `content/en/home.md`, in page order. */
export type HomeContent = PageContentBase & {
  hero: { title: Heading; lede: string; ctas: readonly Cta[] };
  logos: { lede: string; link: Cta; logoWallFlag: VerifyFlag };
  why: SectionIntro & { paragraphs: readonly string[] };
  hireToReward: SectionIntro & { stages: readonly StageContent[] };
  solutions: SectionIntro & { products: readonly ProductContent[] };
  gbaSpotlight: SectionIntro & {
    paragraphs: readonly string[];
    tags: readonly string[];
    /** The paragraph after the tags. */
    followUp: string;
    cta: Cta;
  };
  enhanceSpotlight: SectionIntro & { paragraphs: readonly string[]; cta: Cta };
  whyDeus: SectionIntro & { items: readonly WhyItem[] };
  /** Rich text: `**bold**` marks the name of each recognition. */
  recognition: SectionIntro & { items: readonly string[] };
  /** Indonesian on both locales, so the band takes `lang="id"`. */
  potentia: SectionIntro & { body: string; link: Cta; lang: "id" };
};

/** Solutions, from `content/en/solutions.md`. */
export type SolutionsContent = PageContentBase & {
  hero: SectionIntro & { lede: string };
  assess: SectionIntro & { products: readonly ProductContent[] };
  perform: SectionIntro & { product: ProductContent };
  education: SectionIntro & { product: ProductContent };
  help: SectionIntro & { ctas: readonly Cta[] };
};

/** About, from `content/en/about.md`. */
export type AboutContent = PageContentBase & {
  hero: SectionIntro & { lede: string };
  story: SectionIntro & { paragraphs: readonly string[] };
  mission: SectionIntro;
  visionMission: { eyebrow: string; items: readonly Item[] };
  values: SectionIntro & { items: readonly WhyItem[] };
  timeline: SectionIntro & { entries: readonly TimelineEntry[] };
  /** Rich text, as on Home. */
  recognition: { eyebrow: string; items: readonly string[] };
  /** Q10: hidden until photos and short bios are supplied. */
  leadership: { flag: VerifyFlag; eyebrow: string; people: readonly Person[] };
  companyDetails: { line: string };
};

/** A choice in a select: `value` is what the lead stores, `label` is what the visitor reads. */
export type Choice = {
  value: string;
  label: string;
};

/** The Enhance inquiry form. Its shared fields (name, email, company, WhatsApp, consent) come from messages `ContactForm`. */
export type EnhanceForm = {
  title: string;
  lede: string;
  fields: {
    role: string;
    employees: string;
    sites: string;
    tracking: string;
    cycle: string;
    anything: string;
  };
  /** The four Enhance-only selects. Employees uses the `ContactForm.size` choices. */
  choices: {
    role: readonly Choice[];
    sites: readonly Choice[];
    tracking: readonly Choice[];
    cycle: readonly Choice[];
  };
  submit: string;
  success: string;
};

/** DEUS Enhance (`/solutions/enhance`), from `content/en/enhance.md`, in page order. */
export type EnhanceContent = PageContentBase & {
  hero: SectionIntro & { chips: readonly string[]; primary: Cta; secondary: Cta };
  problem: SectionIntro & { items: readonly Item[]; teaser: string };
  urgency: SectionIntro & { roles: readonly Item[] };
  solution: SectionIntro & { steps: readonly Item[]; feature: Item };
  reward: SectionIntro & { steps: readonly Item[]; closing: string };
  systems: SectionIntro & { item: Item };
  support: SectionIntro & { items: readonly Item[] };
  outcome: SectionIntro & { roles: readonly Item[] };
  fit: SectionIntro & { checks: readonly string[]; prompt: string; cta: Cta };
  /** `null` until Q19 is confirmed (`siteFlags.showBetterTogether`), so the section can't show by accident. */
  betterTogether: (SectionIntro & { body: string; links: readonly Cta[] }) | null;
  nextStep: SectionIntro & {
    steps: readonly string[];
    form: EnhanceForm;
    talkFirst: { lead: string; whatsapp: string; or: string; email: string };
  };
  faq: SectionIntro & { items: readonly FaqItem[] };
  closing: ClosingContent;
};

/** Contact (`/contact`), from `content/en/contact.md`. The form itself is in messages `ContactForm`. */
export type ContactContent = PageContentBase & {
  hero: SectionIntro;
  /** The side column. The office address (Q9) and business hours stay out until confirmed. */
  ways: {
    whatsapp: { label: string; value: string; cta: string };
    email: { label: string; value: string; cta: string };
  };
  potentia: { body: string; cta: Cta };
};

/**
 * One entry per page. Each page's content task (1.1, 2.1, …) replaces `PageContentBase` with
 * that page's full type, built from the blocks above.
 */
export type PageContentMap = {
  home: HomeContent;
  solutions: SolutionsContent;
  gba: GbaContent;
  discover: DiscoverContent;
  nextChapter: NextChapterContent;
  enhance: EnhanceContent;
  science: ScienceContent;
  clients: PageContentBase;
  about: AboutContent;
  contact: ContactContent;
  privacy: PageContentBase;
};

export type PageKey = keyof PageContentMap;
export type PageContent<K extends PageKey> = PageContentMap[K];

/** The content modules that exist, per page and locale. A missing entry means "not written yet". */
export type ContentModules = {
  [K in PageKey]?: Partial<Record<Locale, PageContent<K>>>;
};
