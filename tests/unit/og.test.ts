import { describe, expect, it } from "vitest";
import { pagePaths } from "@/content/registry";
import { siteFlags } from "@/content/flags";
import { storiesIn } from "@/content/stories";
import { listUseCases } from "@/content/use-cases";
import { pageMetadata } from "@/lib/metadata";
import { clampTitle, ogImagePath, ogName, ogTitleSize, ogTitles } from "@/lib/og";

describe("ogName and ogImagePath", () => {
  it("names Home 'home' and joins nested paths with a dash", () => {
    expect(ogName("")).toBe("home");
    expect(ogName("/")).toBe("home");
    expect(ogName("/solutions/enhance")).toBe("solutions-enhance");
    expect(ogImagePath("/solutions/enhance")).toBe("/og/solutions-enhance.png");
  });
});

describe("ogTitles", () => {
  const titles = ogTitles();

  it("has an image for every public English page and story", () => {
    for (const path of Object.values(pagePaths)) expect(titles[ogName(path)], path).toBeTruthy();
    for (const story of storiesIn("en")) expect(titles[ogName(`/clients/${story.slug}`)], story.slug).toBeTruthy();
  });

  it("says the H1, with display headings on one line", () => {
    expect(titles.home).toBe("Every person has potential. We help you see it.");
    expect(titles["solutions-enhance"]).toBe("From scattered data to better decisions");
    expect(titles.privacy).toBe("Privacy policy");
  });

  it("has an image for each use-case page, saying its H1, and none while showUseCases is off", () => {
    for (const useCase of listUseCases("en")) {
      expect(titles[ogName(`/solutions/${useCase.slug}`)], useCase.slug).toBe(useCase.hero.title);
    }
    expect(Object.keys(titles).some((name) => name.startsWith("solutions-management-trainee"))).toBe(siteFlags.showUseCases);
  });

  it("lists no held story", () => {
    const slugs = storiesIn("en").map((story) => ogName(`/clients/${story.slug}`));
    const storyNames = Object.keys(titles).filter((name) => name.startsWith("clients-"));
    expect(storyNames.sort()).toEqual(slugs.sort());
  });
});

describe("title size and length", () => {
  it("drops long titles from 64px to 56px", () => {
    expect(ogTitleSize("Let's talk about your people.")).toBe(64);
    expect(ogTitleSize("Better evidence at every stage of the employee lifecycle.")).toBe(64);
    expect(ogTitleSize("Trusted by 40+ brands across Indonesia and the whole of South East Asia, since 2016")).toBe(56);
  });

  it("cuts a very long title at a word", () => {
    const long = "word ".repeat(60);
    const out = clampTitle(long);
    expect(out.length).toBeLessThanOrEqual(121);
    expect(out.endsWith("word…")).toBe(true);
    expect(clampTitle("  Short   title ")).toBe("Short title");
  });
});

describe("pageMetadata", () => {
  it("points Open Graph and Twitter at the page's image", () => {
    const meta = pageMetadata({ title: "Enhance", description: "d", locale: "en", path: "/solutions/enhance" });
    expect(meta.openGraph?.images).toEqual([
      { url: "/og/solutions-enhance.png", width: 1200, height: 630, alt: "Enhance | DEUS Human Capital Services" },
    ]);
    expect(meta.twitter).toMatchObject({ card: "summary_large_image", images: ["/og/solutions-enhance.png"] });
  });

  it("uses Home's image when there's no path", () => {
    expect(pageMetadata({ title: null, description: "d", locale: "en" }).twitter).toMatchObject({
      images: ["/og/home.png"],
    });
  });
});
