import { afterEach, describe, expect, it, vi } from "vitest";
import robots from "@/app/robots";
import { isIndexable, pageMetadata, pageTitle, siteUrl } from "@/lib/metadata";

afterEach(() => vi.unstubAllEnvs());

describe("pageTitle", () => {
  it("follows '<Page> | DEUS Human Capital Services'", () => {
    expect(pageTitle("Enhance")).toBe("Enhance | DEUS Human Capital Services");
  });
  it("is the bare name for Home", () => {
    expect(pageTitle(null)).toBe("DEUS Human Capital Services");
  });
});

describe("indexing", () => {
  it("is off unless SITE_INDEXABLE is exactly 'true'", () => {
    for (const value of [undefined, "", "false", "TRUE", "1", "yes"]) {
      vi.stubEnv("SITE_INDEXABLE", value as string);
      expect(isIndexable()).toBe(false);
    }
    vi.stubEnv("SITE_INDEXABLE", "true");
    expect(isIndexable()).toBe(true);
  });

  it("sends noindex and a disallow-all robots.txt while it's off", () => {
    vi.stubEnv("SITE_INDEXABLE", "false");
    expect(pageMetadata({ title: "Enhance", description: "d", locale: "en", path: "/enhance" }).robots).toEqual({
      index: false,
      follow: false,
    });
    expect(robots()).toEqual({ rules: { userAgent: "*", disallow: "/" } });
  });

  it("drops noindex and allows crawling once it's on", () => {
    vi.stubEnv("SITE_INDEXABLE", "true");
    expect(pageMetadata({ title: "Enhance", description: "d", locale: "en", path: "/enhance" }).robots).toBeUndefined();
    expect(robots()).toEqual({ rules: { userAgent: "*", allow: "/" } });
  });
});

describe("pageMetadata", () => {
  it("builds the title, description, canonical path and Open Graph from the page and locale", () => {
    const meta = pageMetadata({ title: "Enhance", description: "Appraisal reviews.", locale: "id", path: "/enhance" });
    expect(meta.title).toEqual({ absolute: "Enhance | DEUS Human Capital Services" });
    expect(meta.description).toBe("Appraisal reviews.");
    expect(meta.alternates?.canonical).toBe("/id/enhance");
    expect(meta.openGraph).toMatchObject({ url: "/id/enhance", locale: "id_ID", title: "Enhance | DEUS Human Capital Services" });
  });

  it("uses the locale root for Home", () => {
    expect(pageMetadata({ title: null, description: "d", locale: "en" }).alternates?.canonical).toBe("/en");
    expect(pageMetadata({ title: null, description: "d", locale: "en", path: "/" }).alternates?.canonical).toBe("/en");
  });
});

describe("siteUrl", () => {
  it("reads NEXT_PUBLIC_SITE_URL and falls back to localhost when it's missing or invalid", () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://deushcs-website.vercel.app");
    expect(siteUrl().origin).toBe("https://deushcs-website.vercel.app");
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "not a url");
    expect(siteUrl().origin).toBe("http://localhost:3000");
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "");
    expect(siteUrl().origin).toBe("http://localhost:3000");
  });
});
