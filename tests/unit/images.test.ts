import { existsSync, readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { nextChapterEn } from "@/content/en/next-chapter";
import { images, missingScreens, nextChapterImages } from "@/content/images";

const publicDir = path.join(process.cwd(), "public");
// The logo is not a screenshot, so it has no entry in `images`.
const logo = "deus-logo.png";

// A PNG stores its width and height as big-endian 32-bit integers at bytes 16 and 20 (the IHDR chunk).
function pngSize(file: string) {
  const bytes = readFileSync(file);
  return { width: bytes.readUInt32BE(16), height: bytes.readUInt32BE(20) };
}

const englishCaptions = Object.values(missingScreens).map((caption) => caption.en);

// Every game and simulation that the Next Chapter page names (content/en/next-chapter.ts).
const nextChapterNames = [
  ...nextChapterEn.cognitive.games.map((game) => game.name),
  ...nextChapterEn.neuro.games.map((game) => game.name),
  ...nextChapterEn.simulation.scenarios.map((scenario) => scenario.name),
];

describe("product screenshots (DESIGN-GUIDE.md §14.1)", () => {
  it.each(Object.entries(images))("%s points at a file with its real pixel size", (_name, image) => {
    const file = path.join(publicDir, image.src);
    expect(existsSync(file), image.src).toBe(true);
    expect(pngSize(file)).toEqual({ width: image.width, height: image.height });
  });

  it("lists every screenshot in public/assets/", () => {
    const listed = new Set(Object.values(images).map((image) => path.basename(image.src)));
    const unlisted = readdirSync(path.join(publicDir, "assets")).filter(
      (file) => file.endsWith(".png") && file !== logo && !listed.has(file),
    );
    expect(unlisted).toEqual([]);
  });
});

describe("Next Chapter screens (DESIGN-GUIDE.md §14.1, §14.2)", () => {
  it("does not list a game whose screenshot is already on disk", () => {
    expect(JSON.stringify(missingScreens)).not.toContain("Keypress Game");
  });

  it("shows the Keypress Game with gba-4, whose screen title reads 'Penilaian Penekanan Tombol'", () => {
    expect(nextChapterImages["Keypress Game"]).toEqual(images.gbaSpeed);
  });

  it("shows every game and simulation exactly once: a screen on disk, or a missing caption", () => {
    for (const name of nextChapterNames) {
      const listed = englishCaptions.filter((caption) => caption.includes(name)).length;
      const mapped = name in nextChapterImages ? 1 : 0;
      expect(listed + mapped, name).toBe(1);
    }
  });
});

describe("missing screenshots (DESIGN-GUIDE.md §14.2, §14.3)", () => {
  it.each(Object.entries(missingScreens))("%s has a TODO caption in English and Indonesian", (_name, caption) => {
    expect(caption.en).toMatch(/^TODO: .+ screenshot$/);
    expect(caption.id).toMatch(/^TODO: Tangkapan layar .+$/);
  });

  it("gives every missing screen its own English caption", () => {
    expect(new Set(englishCaptions).size).toBe(englishCaptions.length);
  });
});
