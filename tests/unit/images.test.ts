import { existsSync, readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { images, missingScreens } from "@/content/images";

const publicDir = path.join(process.cwd(), "public");
// The logo is not a screenshot, so it has no entry in `images`.
const logo = "deus-logo.png";

// A PNG stores its width and height as big-endian 32-bit integers at bytes 16 and 20 (the IHDR chunk).
function pngSize(file: string) {
  const bytes = readFileSync(file);
  return { width: bytes.readUInt32BE(16), height: bytes.readUInt32BE(20) };
}

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

describe("missing screenshots (DESIGN-GUIDE.md §14.2, §14.3)", () => {
  it.each(Object.entries(missingScreens))("%s has a TODO caption", (_name, caption) => {
    expect(caption).toMatch(/^TODO: .+ screenshot$/);
  });

  it("gives every missing screen its own caption", () => {
    const captions = Object.values(missingScreens);
    expect(new Set(captions).size).toBe(captions.length);
  });
});
