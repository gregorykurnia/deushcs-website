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

/** Screens the owner hasn't sent yet, each with the caption a page shows in its place (DESIGN-GUIDE.md §14.3).
 *  Sources: the asset tables in ENHANCE-PAGE-SPEC.md and WEBSITE-PLAN.md §5.3–5.5, and §14.2.
 *  When a file arrives in public/assets/, move its entry up into `images` with its real pixel size. */
export const missingScreens = {
  enhanceProductOverview: "TODO: Enhance product overview screenshot",
  enhanceSalaryIncrease: "TODO: Enhance salary increase dashboard screenshot",
  enhanceBonusCycleSetup: "TODO: Enhance bonus cycle setup screenshot",
  enhanceBonusParticipants: "TODO: Enhance bonus participants setup screenshot",
  gbaCms: "TODO: GBA CMS screenshot",
  gbaReportIndividual: "TODO: GBA individual report screenshot",
  gbaReportBatch: "TODO: GBA batch report screenshot",
  gbaReportInteractive: "TODO: GBA interactive report screenshot",
  discoverProfileSuitability: "TODO: Discover individual profile suitability screenshot",
  nextChapterObjectiveShooter: "TODO: Objective Shooter screenshot",
  nextChapterReverseRetention: "TODO: Reverse Retention screenshot",
  nextChapterOddOneOut: "TODO: Odd One Out screenshot",
  nextChapterMalletMath: "TODO: Mallet Math screenshot",
  nextChapterObjectTurn: "TODO: Object Turn screenshot",
  nextChapterMatchBlast: "TODO: Match Blast screenshot",
  nextChapterSpeedSorting: "TODO: Speed Sorting screenshot",
  nextChapterBalloonGame: "TODO: Balloon Game screenshot",
  nextChapterTowerGame: "TODO: Tower Game screenshot",
  nextChapterKeypressGame: "TODO: Keypress Game screenshot",
  nextChapterHardOrEasyTask: "TODO: Hard or Easy Task screenshot",
  nextChapterLengthsGame: "TODO: Lengths Game screenshot",
  nextChapterFacesGame: "TODO: Faces Game screenshot",
  nextChapterBusinessOperations: "TODO: Business Operations simulation screenshot",
  nextChapterEventOperations: "TODO: Event Operations simulation screenshot",
} as const satisfies Record<string, string>;
