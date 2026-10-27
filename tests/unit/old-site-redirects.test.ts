import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { pagePaths } from "@/content/registry";
import { storiesIn } from "@/content/stories";
import { locales } from "@/i18n/routing";
import { oldSiteRedirectRules, oldSiteRedirects } from "@/lib/old-site-redirects";

// Task 7.3b: every old WordPress URL maps to a page of the new site, and no old path takes over a route
// the new site has. The e2e spec (tests/e2e/old-site-redirects.spec.ts) checks the answers of a build.

const oldUrls = readFileSync("docs/seo/old-urls.txt", "utf8")
  .split("\n")
  .filter((line) => line && !line.startsWith("#"));

// Every real page, with its locale: `/en`, `/id`, `/en/solutions/enhance`, `/en/clients/<story>`, ...
const routes = new Set([
  ...locales.flatMap((locale) =>
    Object.values(pagePaths).map((path) => (path === "/" ? `/${locale}` : `/${locale}${path}`)),
  ),
  ...locales.flatMap((locale) => storiesIn(locale).map((story) => `/${locale}/clients/${story.slug}`)),
]);
const withoutFragment = (path: string) => path.split("#")[0];

describe("old WordPress URLs", () => {
  it("every one in docs/seo/old-urls.txt is mapped, except the old home (the locale proxy takes it)", () => {
    const mapped = new Set(oldSiteRedirects.map((redirect) => redirect.from));
    expect(oldUrls.filter((url) => url !== "/" && !mapped.has(url.replace(/(?<=.)\/$/, "")))).toEqual([]);
  });

  it("is mapped once each, as a path with no trailing slash", () => {
    const sources = oldSiteRedirects.map((redirect) => redirect.from);
    expect(new Set(sources).size).toBe(sources.length);
    for (const source of sources) expect(source).toMatch(/^\/[^/#?]+(\/[^/#?]+)*$/);
  });

  it("go to a real page of the new site, with the /en prefix, so each is one hop", () => {
    for (const { from, to } of oldSiteRedirects) {
      expect(to, from).toMatch(/^\/en(\/|#|$)/);
      expect(routes.has(withoutFragment(to)), `${from} → ${to}`).toBe(true);
    }
  });

  it("don't shadow a route of the new site", () => {
    for (const { from } of oldSiteRedirects) {
      expect(routes.has(from), from).toBe(false);
      expect(from, from).not.toMatch(/^\/(api|_next|og)(\/|$)|^\/(en|id)$/);
      for (const path of Object.values(pagePaths)) expect(from, from).not.toBe(path);
    }
  });

  it("become permanent redirects with and without the trailing slash", () => {
    const rules = oldSiteRedirectRules({ from: "/our-science", to: "/en/solutions/game-based-assessment#principles" });
    expect(rules).toEqual([
      { source: "/our-science", destination: "/en/solutions/game-based-assessment#principles", permanent: true },
      { source: "/our-science/", destination: "/en/solutions/game-based-assessment#principles", permanent: true },
    ]);
  });
});
