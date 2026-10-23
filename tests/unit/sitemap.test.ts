import { afterEach, describe, expect, it, vi } from "vitest";
import robots from "@/app/robots";
import sitemap from "@/app/sitemap";
import { buildTelkomStory } from "@/content/en/stories/telkom-group";
import { siteFlags } from "@/content/flags";
import { createStoryRegistry } from "@/content/stories";
import { sitemapEntries, sitemapPaths } from "@/lib/sitemap";
import type { StoryContent } from "@/content/types";

// Task 7.1b: the sitemap lists every public English page and every published English story, and
// robots.txt names it only once the site is indexable.

afterEach(() => vi.unstubAllEnvs());

const pages = [
  { path: "/", locales: ["en"] },
  { path: "/solutions/enhance", locales: ["en", "id"] },
  { path: "/about", locales: ["id"] },
] as const;

// A second English story that stands for one held behind a flag (Calvin, Q11).
const held: StoryContent = { ...buildTelkomStory(false), slug: "held-story" };
const registry = (published: boolean) =>
  createStoryRegistry({ en: [buildTelkomStory(false), ...(published ? [held] : [])] });

describe("sitemapPaths", () => {
  it("lists English pages only, Home at the locale root", () => {
    expect(sitemapPaths({ pages, storySlugs: [] })).toEqual(["/en", "/en/solutions/enhance"]);
  });

  it("doesn't list a held story, and lists it once its flag is on", () => {
    const off = sitemapPaths({ pages, storySlugs: registry(false).inLocale("en").map((s) => s.slug) });
    expect(off.some((path) => path.endsWith("/held-story"))).toBe(false);
    expect(off).toContain("/en/clients/national-telecom-group");
    const on = sitemapPaths({ pages, storySlugs: registry(true).inLocale("en").map((s) => s.slug) });
    expect(on).toContain("/en/clients/held-story");
  });

  it("lists the named Telkom slug, never the old one that redirects to it", () => {
    const named = createStoryRegistry(
      { en: [buildTelkomStory(true)] },
      { "national-telecom-group": buildTelkomStory(true).slug },
    );
    const paths = sitemapPaths({ pages, storySlugs: named.inLocale("en").map((s) => s.slug) });
    expect(paths).toContain(`/en/clients/${buildTelkomStory(true).slug}`);
    expect(paths).not.toContain("/en/clients/national-telecom-group");
  });
});

describe("sitemap.xml, as the site has it", () => {
  it("lists absolute URLs from the site origin, with no styleguide, Indonesian or redirect-only routes", () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://deushcs.com");
    const urls = sitemap().map((entry) => entry.url);
    expect(urls).toContain("https://deushcs.com/en");
    expect(urls).toContain("https://deushcs.com/en/solutions/enhance");
    expect(urls).toContain("https://deushcs.com/en/solutions/game-based-assessment");
    // the anonymised story, while stories show (showStories)
    if (siteFlags.showStories) expect(urls).toContain("https://deushcs.com/en/clients/national-telecom-group");
    else expect(urls.filter((url) => url.includes("/clients/"))).toEqual([]);
    expect(new Set(urls).size).toBe(urls.length);
    for (const url of urls) {
      expect(url).toMatch(/^https:\/\/deushcs\.com\/en(\/|$)/);
      expect(url).not.toMatch(/styleguide|\/id\/|\/science|\/solutions\/(discover|next-chapter)|calvin/);
    }
  });
});

describe("sitemapEntries", () => {
  it("builds each URL from the origin", () => {
    expect(sitemapEntries({ pages, storySlugs: [] }, new URL("https://example.com"))).toEqual([
      { url: "https://example.com/en" },
      { url: "https://example.com/en/solutions/enhance" },
    ]);
  });
});

describe("robots.txt sitemap line", () => {
  it("appears only when the site is indexable", () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://deushcs.com");
    vi.stubEnv("SITE_INDEXABLE", "false");
    expect(robots()).not.toHaveProperty("sitemap");
    vi.stubEnv("SITE_INDEXABLE", "true");
    expect(robots()).toMatchObject({ sitemap: "https://deushcs.com/sitemap.xml" });
  });
});
