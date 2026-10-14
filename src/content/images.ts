// Product screenshots in public/assets/, with their pixel sizes so next/image can reserve space.
// Alt text is copy, so it comes from the content module that uses the image (guide §8.4).
// Sources: design-directions/assets/ (DESIGN-GUIDE.md §14.1). Screens not supplied yet are listed
// in missingScreens and shown with <Placeholder>.

export type ImageAsset = {
  src: string;
  width: number;
  height: number;
};

/** An image as a content module hands it to a component: the asset plus its alt text.
 *  Use `alt: ""` when a floating card or caption beside it already says what it shows. */
export type ContentImage = ImageAsset & { alt: string };

/** The placeholder text for a screen that isn't supplied yet, in each locale. */
export type ScreenCaption = { en: string; id: string };

export const images = {
  discoverReport: { src: "/assets/discover-report-crop.png", width: 526, height: 1017 },
  enhanceDashboard: { src: "/assets/enhance-1.png", width: 811, height: 620 }, // performance appraisal dashboard
  enhanceRewardGrouping: { src: "/assets/enhance-2.png", width: 2431, height: 1857 },
  enhanceCalibrationMatrix: { src: "/assets/enhance-3.png", width: 2431, height: 1857 },
  gbaStory: { src: "/assets/gba-1-crop.png", width: 830, height: 496 },
  gbaNumerical: { src: "/assets/gba-2-crop.png", width: 1404, height: 785 },
  gbaCategorization: { src: "/assets/gba-3-crop.png", width: 1558, height: 872 },
  gbaSpeed: { src: "/assets/gba-4-crop.png", width: 1698, height: 842 },
  potentiaPhone: { src: "/assets/potentia-phone-crop.png", width: 386, height: 762 },
  potentiaReport: { src: "/assets/potentia-report-crop.png", width: 540, height: 1016 },
} as const satisfies Record<string, ImageAsset>;

/** Next Chapter games that already have a screenshot, keyed by the game's name in content/en/next-chapter.ts.
 *  gba-4 shows the Keypress Game: its screen title reads "Penilaian Penekanan Tombol". */
export const nextChapterImages: Record<string, ImageAsset> = {
  "Keypress Game": images.gbaSpeed,
};

/** Screens the owner hasn't sent yet, each with the caption a page shows in its place (DESIGN-GUIDE.md §14.3).
 *  Sources: the asset tables in ENHANCE-PAGE-SPEC.md and WEBSITE-PLAN.md §5.3–5.5, and §14.2.
 *  gba-2 and gba-3 are neither listed nor mapped: they look like Mallet Math and Speed Sorting, but neither
 *  screen carries a game title, so the owner confirms them first.
 *  When a file arrives in public/assets/, move its entry into `images` (or `nextChapterImages`) with its real size. */
export const missingScreens = {
  enhanceProductOverview: {
    en: "TODO: Enhance product overview screenshot",
    id: "TODO: Tangkapan layar ikhtisar produk Enhance",
  },
  enhanceSalaryIncrease: {
    en: "TODO: Enhance salary increase dashboard screenshot",
    id: "TODO: Tangkapan layar dasbor kenaikan gaji Enhance",
  },
  enhanceBonusCycleSetup: {
    en: "TODO: Enhance bonus cycle setup screenshot",
    id: "TODO: Tangkapan layar pengaturan siklus bonus Enhance",
  },
  enhanceBonusParticipants: {
    en: "TODO: Enhance bonus participants setup screenshot",
    id: "TODO: Tangkapan layar pengaturan peserta bonus Enhance",
  },
  gbaCms: { en: "TODO: GBA CMS screenshot", id: "TODO: Tangkapan layar CMS GBA" },
  gbaReportIndividual: {
    en: "TODO: GBA individual report screenshot",
    id: "TODO: Tangkapan layar laporan individual GBA",
  },
  gbaReportBatch: { en: "TODO: GBA batch report screenshot", id: "TODO: Tangkapan layar laporan batch GBA" },
  gbaReportInteractive: {
    en: "TODO: GBA interactive report screenshot",
    id: "TODO: Tangkapan layar laporan interaktif GBA",
  },
  discoverProfileSuitability: {
    en: "TODO: Discover individual profile suitability screenshot",
    id: "TODO: Tangkapan layar laporan kesesuaian profil individual Discover",
  },
  nextChapterObjectiveShooter: {
    en: "TODO: Objective Shooter screenshot",
    id: "TODO: Tangkapan layar game Objective Shooter",
  },
  nextChapterReverseRetention: {
    en: "TODO: Reverse Retention screenshot",
    id: "TODO: Tangkapan layar game Reverse Retention",
  },
  nextChapterOddOneOut: { en: "TODO: Odd One Out screenshot", id: "TODO: Tangkapan layar game Odd One Out" },
  nextChapterMalletMath: { en: "TODO: Mallet Math screenshot", id: "TODO: Tangkapan layar game Mallet Math" },
  nextChapterObjectTurn: { en: "TODO: Object Turn screenshot", id: "TODO: Tangkapan layar game Object Turn" },
  nextChapterMatchBlast: { en: "TODO: Match Blast screenshot", id: "TODO: Tangkapan layar game Match Blast" },
  nextChapterSpeedSorting: {
    en: "TODO: Speed Sorting screenshot",
    id: "TODO: Tangkapan layar game Speed Sorting",
  },
  nextChapterBalloonGame: { en: "TODO: Balloon Game screenshot", id: "TODO: Tangkapan layar game Balloon Game" },
  nextChapterTowerGame: { en: "TODO: Tower Game screenshot", id: "TODO: Tangkapan layar game Tower Game" },
  nextChapterHardOrEasyTask: {
    en: "TODO: Hard or Easy Task screenshot",
    id: "TODO: Tangkapan layar game Hard or Easy Task",
  },
  nextChapterLengthsGame: { en: "TODO: Lengths Game screenshot", id: "TODO: Tangkapan layar game Lengths Game" },
  nextChapterFacesGame: { en: "TODO: Faces Game screenshot", id: "TODO: Tangkapan layar game Faces Game" },
  nextChapterBusinessOperations: {
    en: "TODO: Business Operations simulation screenshot",
    id: "TODO: Tangkapan layar simulasi Business Operations",
  },
  nextChapterEventOperations: {
    en: "TODO: Event Operations simulation screenshot",
    id: "TODO: Tangkapan layar simulasi Event Operations",
  },
} as const satisfies Record<string, ScreenCaption>;
