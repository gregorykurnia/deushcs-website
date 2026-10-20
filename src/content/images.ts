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
  // Home only for now (R10, postpushrevisions2.0/image-replacements.md); the owner's originals are in
  // image-components/, cropped to the frame and sized for their Home slot.
  discoverTitle: { src: "/assets/discover-title.png", width: 700, height: 435 }, // Heroes of a Fallen Land title screen
  gbaBatchReport: { src: "/assets/gba-batch-report.png", width: 1240, height: 713 }, // Batch Neuro Report, cohort overview
  gbaNextChapter: { src: "/assets/gba-next-chapter.png", width: 1282, height: 718 }, // Next Chapter game select desk
  enhanceBonusDashboard: { src: "/assets/enhance-bonus-dashboard.png", width: 1101, height: 548 },
  enhancePaDashboard: { src: "/assets/enhance-pa-dashboard.png", width: 921, height: 838 },
  // Business Operations case screen (Next Chapter "Simulation" window), cropped to the window.
  // Used on Home's GBA spotlight and the GBA page's Simulation section.
  gbaSimulation: { src: "/assets/gba-simulation.png", width: 1200, height: 676 },
  // The owner's GBA set (2026-10-20, screenshots/gba-inbox/): each game cropped to its stage or device,
  // the Event Operations window to the window, as Business Operations is.
  gameObjectiveShooter: { src: "/assets/gba-game-objective-shooter.png", width: 1200, height: 675 },
  gameReverseRetention: { src: "/assets/gba-game-reverse-retention.png", width: 1200, height: 674 },
  gameOddOneOut: { src: "/assets/gba-game-odd-one-out.png", width: 1200, height: 677 },
  gameMalletMath: { src: "/assets/gba-game-mallet-math.png", width: 1200, height: 679 },
  gameObjectTurn: { src: "/assets/gba-game-object-turn.png", width: 1200, height: 676 },
  gameMatchBlast: { src: "/assets/gba-game-match-blast.png", width: 1200, height: 676 },
  gameSpeedSorting: { src: "/assets/gba-game-speed-sorting.png", width: 1200, height: 550 },
  gameBalloon: { src: "/assets/gba-game-balloon.png", width: 1200, height: 598 },
  gameTower: { src: "/assets/gba-game-tower.png", width: 1200, height: 598 }, // sent later as 46.png
  gameHardOrEasy: { src: "/assets/gba-game-hard-or-easy.png", width: 1200, height: 605 },
  gameLengths: { src: "/assets/gba-game-lengths.png", width: 1200, height: 604 },
  gameFaces: { src: "/assets/gba-game-faces.png", width: 1200, height: 598 },
  gbaEventOperations: { src: "/assets/gba-simulation-event-operations.png", width: 1200, height: 672 },
  discoverFestival: { src: "/assets/discover-festival.png", width: 1240, height: 772 }, // Discover story scene, the festival question
  gbaReportBatch: { src: "/assets/gba-report-batch.png", width: 1120, height: 1100 }, // Batch Neuro Report, whole page
  gbaReportInteractive: { src: "/assets/gba-report-interactive.png", width: 1120, height: 767 },
  gbaCms: { src: "/assets/gba-cms.png", width: 1240, height: 560 }, // admin dashboard; company names blurred by the owner
} as const satisfies Record<string, ImageAsset>;

/** Games that already have a screenshot, keyed by the game's name in the GBA page's module sections
 *  (content/en/game-based-assessment.ts).
 *  gba-4 shows the Keypress Game: its screen title reads "Penilaian Penekanan Tombol".
 *  gba-simulation shows Business Operations: a mini case analysis with a calculator. */
export const gameImages: Record<string, ImageAsset> = {
  "Objective Shooter": images.gameObjectiveShooter,
  "Reverse Retention": images.gameReverseRetention,
  "Odd One Out": images.gameOddOneOut,
  "Mallet Math": images.gameMalletMath,
  "Object Turn": images.gameObjectTurn,
  "Match Blast": images.gameMatchBlast,
  "Speed Sorting": images.gameSpeedSorting,
  "Balloon Game": images.gameBalloon,
  "Tower Game": images.gameTower,
  "Keypress Game": images.gbaSpeed,
  "Hard or Easy Task": images.gameHardOrEasy,
  "Lengths Game": images.gameLengths,
  "Faces Game": images.gameFaces,
  "Business Operations": images.gbaSimulation,
  "Event Operations": images.gbaEventOperations,
};

/** The missing screen of every other game and simulation, keyed by name like `gameImages`.
 *  Each name has exactly one of the two. Every game has its screenshot now (2026-10-20); a game added
 *  later without one goes here, with its caption in `missingScreens`. */
export const gameMissing: Record<string, keyof typeof missingScreens> = {};

/** Screens the owner hasn't sent yet, each with the caption a page shows in its place (DESIGN-GUIDE.md §14.3).
 *  Sources: the asset tables in ENHANCE-PAGE-SPEC.md and WEBSITE-PLAN.md §5.3–5.5, and §14.2.
 *  gba-2 and gba-3 (the GBA hero and styleguide) show Mallet Math and Match Blast: they match the owner's
 *  titled screenshots of those games.
 *  When a file arrives in public/assets/, move its entry into `images` (or `gameImages`) with its real size. */
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
  gbaReportIndividual: {
    en: "TODO: GBA individual report screenshot",
    id: "TODO: Tangkapan layar laporan individual GBA",
  },
  discoverProfileSuitability: {
    en: "TODO: Discover individual profile suitability screenshot",
    id: "TODO: Tangkapan layar laporan kesesuaian profil individual Discover",
  },
} as const satisfies Record<string, ScreenCaption>;
