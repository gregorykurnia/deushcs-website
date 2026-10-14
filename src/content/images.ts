// Product screenshots in public/assets/, with their pixel sizes so next/image can reserve space.
// Alt text is copy, so it comes from the content module that uses the image (guide §8.4).
// Sources: design-directions/assets/ (DESIGN-GUIDE.md §14.1). Missing screens use <Placeholder>.

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
  enhanceDashboard: { src: "/assets/enhance-1.png", width: 811, height: 620 },
  enhanceScreen2: { src: "/assets/enhance-2.png", width: 2431, height: 1857 },
  enhanceScreen3: { src: "/assets/enhance-3.png", width: 2431, height: 1857 },
  gbaStory: { src: "/assets/gba-1-crop.png", width: 830, height: 496 },
  gbaNumerical: { src: "/assets/gba-2-crop.png", width: 1404, height: 785 },
  gbaCategorization: { src: "/assets/gba-3-crop.png", width: 1558, height: 872 },
  gbaSpeed: { src: "/assets/gba-4-crop.png", width: 1698, height: 842 },
  potentiaPhone: { src: "/assets/potentia-phone-crop.png", width: 386, height: 762 },
  potentiaReport: { src: "/assets/potentia-report-crop.png", width: 540, height: 1016 },
} as const satisfies Record<string, ImageAsset>;
