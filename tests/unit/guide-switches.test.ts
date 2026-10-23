import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import sitemap from "@/app/sitemap";
import { gbaVsPsychometricEn } from "@/content/en/guides/game-based-assessment-vs-psychometric-tests";
import { whatIsGbaEn } from "@/content/en/guides/what-is-game-based-assessment";
import { unknownGuideRewrite } from "@/content/guides/paths";
import { llmsTxt } from "@/lib/llms";
import { ogName, ogTitles } from "@/lib/og";
import type { GuideContent } from "@/content/types";

// Task G3.2: what lists guides (the sitemap, llms.txt, the Open Graph images, the proxy's 404 rule) follows
// the guide registry, so a guide that is unpublished, or every guide while showGuides is off, leaves all of
// them at once. The registry itself is swapped for one built from `state`, as modulesForFlags would build it.

const state = vi.hoisted(() => ({ guides: [] as GuideContent[] }));
vi.mock("@/content/guides", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/content/guides")>();
  const registry = () => actual.createGuideRegistry({ en: state.guides });
  return {
    ...actual,
    listGuides: (locale: "en" | "id") => registry().inLocale(locale),
    listGuideSlugs: () => registry().listGuideSlugs(),
    // the languages follow the swapped registry too, so the Indonesian guides (G4.4) don't reach llms.txt from the real one
    localesOfGuide: (slug: string) => registry().localesOfGuide(slug),
    localesWithGuides: () => registry().localesWithGuides(),
    getGuide: (slug: string, locale: "en" | "id") => registry().getGuide(slug, locale),
  };
});

const site = "https://deushcs.com";
const draft: GuideContent = { ...whatIsGbaEn, slug: "draft-guide", published: false };

beforeEach(() => vi.stubEnv("NEXT_PUBLIC_SITE_URL", site));
afterEach(() => {
  vi.unstubAllEnvs();
  state.guides = [];
});

const urls = () => sitemap().map((entry) => entry.url);
const llmsLines = () => llmsTxt().split("\n");

describe("with guides 1 and 2 published and a draft beside them", () => {
  beforeEach(() => {
    state.guides = [whatIsGbaEn, gbaVsPsychometricEn, draft];
  });

  it("lists the index and the two guides in the sitemap, and not the draft", () => {
    expect(urls()).toContain(`${site}/en/guides`);
    expect(urls()).toContain(`${site}/en/guides/${whatIsGbaEn.slug}`);
    expect(urls()).toContain(`${site}/en/guides/${gbaVsPsychometricEn.slug}`);
    expect(urls().some((url) => url.includes("draft-guide"))).toBe(false);
  });

  it("lists them in llms.txt under Guides, with the SEO title and description, and not the draft", () => {
    const lines = llmsLines();
    const line = (guide: GuideContent) => `- [${guide.meta.title}](${site}/en/guides/${guide.slug}): ${guide.meta.description}`;
    expect(lines).toContain(line(whatIsGbaEn));
    expect(lines).toContain(line(gbaVsPsychometricEn));
    expect(lines.some((l) => l.includes("draft-guide"))).toBe(false);
    expect(lines.filter((l) => l.startsWith("- [Guides for HR teams in Indonesia]")).length).toBe(1);
    const heading = lines.slice(0, lines.indexOf(line(whatIsGbaEn))).filter((l) => l.startsWith("## ")).at(-1);
    expect(heading).toBe("## Guides");
  });

  it("draws an Open Graph image for the index and each guide, saying its H1, and none for the draft", () => {
    const titles = ogTitles();
    expect(titles[ogName("/guides")]).toBe("Guides for HR teams in Indonesia");
    expect(titles[ogName(`/guides/${whatIsGbaEn.slug}`)]).toBe(whatIsGbaEn.header.title);
    expect(titles[ogName(`/guides/${gbaVsPsychometricEn.slug}`)]).toBe(gbaVsPsychometricEn.header.title);
    expect(Object.keys(titles).some((name) => name.includes("draft-guide"))).toBe(false);
  });

  it("makes the draft's URL a 404 for the proxy, and lets the others through", () => {
    expect(unknownGuideRewrite("/en/guides/draft-guide")).toBe("/en/guides/draft-guide/not-found");
    expect(unknownGuideRewrite(`/en/guides/${whatIsGbaEn.slug}`)).toBeNull();
    expect(unknownGuideRewrite("/en/guides")).toBeNull();
  });
});

describe("with no guide published, or showGuides off", () => {
  beforeEach(() => {
    state.guides = [draft];
  });

  it("leaves the index and every guide out of the sitemap", () => {
    expect(urls().some((url) => url.includes("/guides"))).toBe(false);
  });

  it("leaves the Guides section out of llms.txt, and every guide link", () => {
    expect(llmsLines().some((l) => l.startsWith("## Guides"))).toBe(false);
    expect(llmsTxt()).not.toContain("/guides");
  });

  it("draws no Open Graph image for a guide or the index", () => {
    expect(Object.keys(ogTitles()).some((name) => name.startsWith("guides"))).toBe(false);
  });

  it("makes the index a 404 for the proxy, through a path no route matches", () => {
    expect(unknownGuideRewrite("/en/guides")).toBe("/en/guides/index/not-found");
    expect(unknownGuideRewrite("/id/guides")).toBe("/id/guides/index/not-found");
  });
});
