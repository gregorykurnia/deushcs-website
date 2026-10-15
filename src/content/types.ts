import type { Trait } from "@/components/blocks/DataCards";
import type { WhyItem } from "@/components/blocks/WhyPanel";
import type { Locale } from "@/i18n/routing";
import type { SiteFlags } from "./flags";
import type { ImageAsset, images, missingScreens } from "./images";

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
  /** Alt text for its screenshot, once one is on disk. */
  alt?: string;
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

/** DEUS Discover's hero window: the story as a play card, and one stat card beside it. */
export type DiscoverWindowContent = {
  story: { title: string; meta: string; alt: string };
  result: { label: string; value: string; unit: string };
};

/** One report on Discover: its copy, and the alt text for its screenshot. */
export type ReportItem = Item & { alt: string };

/** DEUS Discover (`content/en/discover.md`). */
export type DiscoverContent = PageContentBase & {
  hero: Hero & { window: DiscoverWindowContent };
  measures: { eyebrow: string; stats: StatTile[]; lede: string };
  how: { intro: SectionIntro; paragraphs: string[] };
  why: { eyebrow: string; items: WhyItem[] };
  customization: { intro: SectionIntro; items: WhyItem[] };
  reports: { intro: SectionIntro; items: ReportItem[] };
  beyond: { intro: SectionIntro; points: string[] };
  suite: { intro: SectionIntro; cta: Cta };
  closing: ClosingContent;
};

/** Next Chapter's hero window: one game screen as a play card, beside the three modules. */
export type NextChapterWindowContent = {
  game: { title: string; meta: string; alt: string };
};

/** Next Chapter (`content/en/next-chapter.md`). */
export type NextChapterContent = PageContentBase & {
  hero: Hero & { window: NextChapterWindowContent };
  /** The three modules: the hero's chips and the sticky sub-nav. `id` is the section's anchor. */
  moduleChips: { id: string; label: string; detail: string }[];
  /** The sub-nav's accessible name. */
  moduleNavLabel: string;
  cognitive: GameModule;
  neuro: GameModule;
  simulation: SimulationModule;
  choosing: {
    intro: SectionIntro;
    /** The table's column headings and accessible name. */
    columns: { useCase: string; modules: string };
    caption: string;
    rows: { useCase: string; modules: string }[];
  };
  closing: ClosingContent;
};

/** The Science page (`content/en/science.md`). */
export type ScienceContent = PageContentBase & {
  hero: SectionIntro;
  frameworks: { intro: SectionIntro; items: Item[] };
  process: { intro: SectionIntro; steps: Item[] };
  validated: SectionIntro;
  normed: { intro: SectionIntro; marketClaim?: string; body: string };
  fair: { intro: SectionIntro; items: WhyItem[] };
  partnership?: { intro: SectionIntro; body: string };
  closing: ClosingContent;
};

/** A [VERIFY] switch from siteFlags: every flag except the contact reply time. */
export type VerifyFlag = Exclude<keyof SiteFlags, "replyTime">;

/** A person named in the copy. */
export type Person = { name: string; role: string };

/** A product, with its copy and the link that opens it. */
export type ProductContent = { name: string; body: string; cta: Cta };

/** One stage of "From hire to reward": the tab's words, the product line under them, and the
 *  screen the stage shows: a screenshot with its alt text, or a missing screen's placeholder. */
export type StageContent = {
  stage: string;
  title: string;
  body: string;
  product: string;
  screen: { image: keyof typeof images; alt: string } | { missing: keyof typeof missingScreens };
  /** The result card over the screenshot's corner. Sample data (DESIGN-GUIDE.md, top note). */
  result?: { label: string; value: string; unit?: string; bar?: number };
};

/** The Home hero's sky window: one person's story across three floating cards (DESIGN-GUIDE.md
 *  §7.12). Every name, score and date is the mockup's sample data, to be replaced with approved
 *  sample data before launch (Task 7.4). `when` marks the date with **bold**. */
export type HomeJourney = {
  caption: string;
  /** The list's accessible name. */
  label: string;
  play: { when: string; title: string; meta: string };
  profile: { when: string; label: string; name: string; traits: readonly Trait[]; footer: string };
  appraisal: {
    when: string;
    label: string;
    score: string;
    rating: string;
    split: readonly [{ label: string; value: string }, { label: string; value: string }];
    bonus: { label: string; status: string };
  };
};

/** One year on the About timeline. The newest entry is marked `current` ("now"). */
export type TimelineEntry = { year: string; title: string; body: string; current?: boolean };

/** One approved client logo (Q8). */
export type LogoEntry = { name: string; image: ImageAsset; href?: string };

/** Home, from `content/en/home.md`, in page order. */
export type HomeContent = PageContentBase & {
  hero: { title: Heading; lede: string; ctas: readonly Cta[]; journey: HomeJourney };
  logos: {
    lede: string;
    /** The six industries, shown as a row of text while the logo wall is off (Q8). */
    industries: readonly string[];
    /** Approved logos only (Q8). Empty until the owner sends them. */
    wall: readonly LogoEntry[];
    link: Cta;
    logoWallFlag: VerifyFlag;
  };
  why: SectionIntro & { paragraphs: readonly string[] };
  hireToReward: SectionIntro & { stages: readonly StageContent[] };
  solutions: SectionIntro & { products: readonly ProductContent[] };
  gbaSpotlight: SectionIntro & {
    paragraphs: readonly string[];
    tags: readonly string[];
    /** The paragraph after the tags. */
    followUp: string;
    cta: Cta;
    /** The three game tiles. The mockup's captions; the first carries the event log. */
    games: readonly { image: keyof typeof images; title: string; caption: string }[];
    /** Illustrative: timestamps and actions are the mockup's sample data (guide §7.14). */
    log: { title: string; rows: readonly { time: string; action: string }[] };
    /** Short facts beside the follow-up line (the mockup's two stat tiles). */
    facts: readonly { title: string; body: string }[];
  };
  enhanceSpotlight: SectionIntro & {
    paragraphs: readonly string[];
    cta: Cta;
    screen: { image: keyof typeof images; alt: string };
  };
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
  /** Alt text for the product screens on disk (`images.enhance*`), wherever the page shows them. */
  screens: { dashboard: string; calibrationMatrix: string; talentMap: string; rewardGrouping: string };
  problem: SectionIntro & { items: readonly Item[]; teaser: string };
  urgency: SectionIntro & { roles: readonly Item[] };
  solution: SectionIntro & { steps: readonly Item[]; feature: Item };
  reward: SectionIntro & { steps: readonly Item[]; closing: string };
  /** `diagram` labels the code-drawn systems illustration (ENHANCE-PAGE-SPEC.md §6). */
  systems: SectionIntro & { item: Item; diagram: { sources: readonly string[]; hub: string } };
  support: SectionIntro & { items: readonly Item[] };
  outcome: SectionIntro & { roles: readonly Item[] };
  fit: SectionIntro & { checks: readonly string[]; prompt: string; cta: Cta };
  /** `null` until Q19 is confirmed (`siteFlags.showBetterTogether`), so the section can't show by accident. */
  betterTogether: (SectionIntro & { body: string; links: readonly Cta[] }) | null;
  nextStep: SectionIntro & {
    steps: readonly string[];
    form: EnhanceForm;
    talkFirst: { lead: string; whatsapp: string; or: string; email: string };
    /** The email link's prefilled subject and body, from the deck (ENHANCE-CONTENT.md §7). */
    email: { subject: string; body: string };
  };
  faq: SectionIntro & { items: readonly FaqItem[] };
  closing: ClosingContent;
};

/** Contact (`/contact`), from `content/en/contact.md`. The form itself is in messages `ContactForm`. */
export type ContactContent = PageContentBase & {
  hero: SectionIntro;
  /** The side column. Business hours stay out until confirmed. The office address (Q9) is
   *  absent until the owner supplies it, and shows only while `siteFlags.showAddress` is on. */
  ways: {
    whatsapp: { label: string; value: string; cta: string };
    email: { label: string; value: string; cta: string };
    address?: { label: string; value: string };
  };
  potentia: { body: string; cta: Cta };
};

/** A quote, in the language it was said. Quotes keep their original wording; `translation` is the
 *  same quote in the page's language, shown smaller below it. */
export type StoryQuote = {
  quote: string;
  /** Language of `quote` when it differs from the page: "id". */
  lang?: string;
  translation?: string;
  /** Who said it. Participant quotes go without a name. */
  name?: string;
  role?: string;
};

/** A story's optional photo. `placeholder` shows in its place until the file is on disk. */
export type StoryPhoto = { alt: string; caption: string; image?: ImageAsset; placeholder?: string };

/**
 * One client story (`content/en/clients-*.md`, `content/id/clients-*.md`), in the order of the
 * shared layout (WEBSITE-PLAN §5.8). `client` is the client's name, or an anonymous description
 * while its permission question is open. A story with no permission for something simply omits
 * it (`words.featured` empty, no `photo`), so the template never has to know why.
 */
export type StoryContent = PageContentBase & {
  /** The last part of its URL, `/clients/<slug>`. An anonymised story's slug can't name the client. */
  slug: string;
  /** Product tag on the card and the header: "Game-Based Assessment", "Potentia". */
  product: string;
  client: string;
  header: { eyebrow: string; title: Heading; lede: string };
  glance: { stats: StatTile[]; footnote?: string };
  challenge: SectionIntro & { paragraphs: string[] };
  did: SectionIntro & { paragraphs: string[] };
  /** Left out when the story has no results section (Calvin's has none in the copy). */
  results?: SectionIntro & { paragraphs: string[] };
  words: {
    eyebrow: string;
    /** The client's own quotes, with names. Empty while the permission to use them is open. */
    featured: StoryQuote[];
    /** Quotes from the people who took part, with a label above them. */
    participants?: { label: string; quotes: StoryQuote[] };
  };
  photo?: StoryPhoto;
  /** The closing panel. `secondary` is a second button; without it the panel keeps the global one. */
  closing: ClosingContent & { secondary?: Cta };
};

/** One story card on the Clients hub. Its link is `/clients/<slug>`. */
export type StoryCardContent = {
  slug: string;
  product: string;
  client: string;
  /** The headline result, as the card's heading. */
  result: string;
  /** "Story is in Indonesian", when the story isn't in the hub's language. */
  note?: string;
};

/** The Clients hub (`content/en/clients.md`), in page order. The project list (Q22) comes later. */
export type ClientsContent = PageContentBase & {
  hero: SectionIntro & { lede: string };
  /** Q8: approved logos only. Empty, and off, until the owner sends them. */
  logoWall: { flag: VerifyFlag; wall: readonly LogoEntry[] };
  industries: SectionIntro & { items: readonly string[] };
  stories: SectionIntro & { cards: readonly StoryCardContent[] };
  closing: ClosingContent;
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
  clients: ClientsContent;
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
