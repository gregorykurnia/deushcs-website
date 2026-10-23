import { afterEach, describe, expect, it, vi } from "vitest";
import { contactEn } from "@/content/en/contact";
import { whatIsGbaEn } from "@/content/en/guides/what-is-game-based-assessment";
import { managementTraineeEn } from "@/content/en/use-cases/management-trainee-assessment";
import { createGuideRegistry, modulesForFlags as guideModulesForFlags } from "@/content/guides";
import { contactId } from "@/content/id/contact";
import { createRegistry, pagePaths } from "@/content/registry";
import type { PageKey } from "@/content/types";
import { createUseCaseRegistry, modulesForFlags as useCaseModulesForFlags } from "@/content/use-cases";
import { languageAlternates, pageMetadata } from "@/lib/metadata";
import { sitemapEntries } from "@/lib/sitemap";

// Task G4.2 (Task 6.4 without the browser redirect): hreflang alternates with x-default in the page metadata,
// the sitemap and the Indonesian lines of /llms.txt, only for pages with an Indonesian version, and only while
// `showIndonesianLeadPages` is on (SEO plan §S12). The registries decide which pages have one, so each test
// builds them with the switch both ways.

afterEach(() => {
  vi.unstubAllEnvs();
  vi.doUnmock("@/content/flags");
  vi.resetModules();
});

const source = { contact: { en: contactEn, id: contactId } };
const registry = (on: boolean) => createRegistry(source, () => on);

describe("languageAlternates", () => {
  it("lists every language and x-default for English once a page has two", () => {
    expect(languageAlternates("/contact", ["en", "id"])).toEqual({ en: "/en/contact", id: "/id/contact", "x-default": "/en/contact" });
    expect(languageAlternates("/", ["en", "id"])).toEqual({ en: "/en", id: "/id", "x-default": "/en" });
  });

  it("is nothing for a page in one language", () => {
    expect(languageAlternates("/contact", ["en"])).toBeUndefined();
    expect(languageAlternates("/clients/calvin", ["id"])).toBeUndefined();
    expect(languageAlternates("/contact", [])).toBeUndefined();
  });
});

describe("page metadata", () => {
  const meta = (on: boolean, locale: "en" | "id") =>
    pageMetadata({ title: null, description: "d", locale, path: "/contact", locales: registry(on).localesFor("contact") });

  it("gives Contact its hreflang alternates in both languages while the switch is on, each with its own canonical", () => {
    for (const locale of ["en", "id"] as const) {
      expect(meta(true, locale).alternates).toEqual({
        canonical: `/${locale}/contact`,
        languages: { en: "/en/contact", id: "/id/contact", "x-default": "/en/contact" },
      });
    }
  });

  it("has only the canonical while the switch is off", () => {
    expect(meta(false, "en").alternates).toEqual({ canonical: "/en/contact" });
  });

  it("has only the canonical on a page with no Indonesian version, and when no locales are passed", () => {
    const about = createRegistry({ ...source, about: { en: contactEn } } as never, () => true).localesFor("about");
    expect(about).toEqual(["en"]);
    expect(pageMetadata({ title: "t", description: "d", locale: "en", path: "/about", locales: about }).alternates).toEqual({ canonical: "/en/about" });
    expect(pageMetadata({ title: "t", description: "d", locale: "en", path: "/about" }).alternates).toEqual({ canonical: "/en/about" });
  });
});

describe("use-case and guide registries", () => {
  // stand-ins for the Indonesian modules G4.3 and G4.4 add
  const useCaseId = { ...managementTraineeEn };
  const guideId = { ...whatIsGbaEn };

  it("register an Indonesian page only while showIndonesianLeadPages is on", () => {
    const useCases = (on: boolean) =>
      createUseCaseRegistry(useCaseModulesForFlags({ showUseCases: true, showIndonesianLeadPages: on }, [useCaseId]));
    expect(useCases(true).localesOfUseCase(managementTraineeEn.slug)).toEqual(["en", "id"]);
    expect(useCases(false).localesOfUseCase(managementTraineeEn.slug)).toEqual(["en"]);

    const guides = (on: boolean) =>
      createGuideRegistry(guideModulesForFlags({ showGuides: true, showIndonesianLeadPages: on }, [whatIsGbaEn], [guideId]));
    expect(guides(true).localesOfGuide(whatIsGbaEn.slug)).toEqual(["en", "id"]);
    expect(guides(true).localesWithGuides()).toEqual(["en", "id"]);
    expect(guides(false).localesOfGuide(whatIsGbaEn.slug)).toEqual(["en"]);
    expect(guides(false).localesWithGuides()).toEqual(["en"]);
  });

  it("register no Indonesian page while their own section is off", () => {
    const useCases = createUseCaseRegistry(useCaseModulesForFlags({ showUseCases: false, showIndonesianLeadPages: true }, [useCaseId]));
    expect(useCases.localesOfUseCase(managementTraineeEn.slug)).toEqual([]);
  });
});

describe("sitemap", () => {
  const origin = new URL("https://deushcs.com");
  const entries = (on: boolean) => {
    const r = registry(on);
    const pages = (["home", "contact"] as PageKey[]).map((key) => ({
      path: pagePaths[key],
      locales: key === "home" ? (["en"] as const) : r.localesFor(key),
    }));
    return sitemapEntries({ pages, storySlugs: [] }, origin);
  };

  it("lists /id/contact next to /en/contact, both with the alternates, while the switch is on", () => {
    const languages = {
      en: "https://deushcs.com/en/contact",
      id: "https://deushcs.com/id/contact",
      "x-default": "https://deushcs.com/en/contact",
    };
    expect(entries(true)).toEqual([
      { url: "https://deushcs.com/en" },
      { url: "https://deushcs.com/en/contact", alternates: { languages } },
      { url: "https://deushcs.com/id/contact", alternates: { languages } },
    ]);
  });

  it("lists English only, with no alternates, while the switch is off", () => {
    expect(entries(false)).toEqual([{ url: "https://deushcs.com/en" }, { url: "https://deushcs.com/en/contact" }]);
  });

  it("pairs a use case and a guide through localesOf, and leaves out a page that is only in Indonesian", () => {
    const localesOf = (path: string) => (path === "/clients/calvin" ? (["id"] as const) : (["en", "id"] as const));
    const urls = sitemapEntries(
      { pages: [], storySlugs: ["calvin"], useCaseSlugs: ["talent-mapping"], guideSlugs: ["what-is-game-based-assessment"], localesOf },
      origin,
    ).map((entry) => entry.url);
    expect(urls).toEqual([
      "https://deushcs.com/en/solutions/talent-mapping",
      "https://deushcs.com/id/solutions/talent-mapping",
      "https://deushcs.com/en/guides",
      "https://deushcs.com/id/guides",
      "https://deushcs.com/en/guides/what-is-game-based-assessment",
      "https://deushcs.com/id/guides/what-is-game-based-assessment",
    ]);
  });
});

describe("the site with the switch either way", () => {
  // the live registries read `siteFlags` when they load, so each run loads them fresh with the switch set
  async function load(on: boolean) {
    vi.resetModules();
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://deushcs.com");
    const actual = await vi.importActual<typeof import("@/content/flags")>("@/content/flags");
    vi.doMock("@/content/flags", () => ({ siteFlags: { ...actual.siteFlags, showIndonesianLeadPages: on } }));
    const [{ llmsTxt }, { default: sitemap }] = await Promise.all([import("@/lib/llms"), import("@/app/sitemap")]);
    return { llms: llmsTxt(), sitemap: sitemap() };
  }

  it("lists Indonesian Contact in llms.txt and the sitemap while on", async () => {
    const { llms, sitemap } = await load(true);
    expect(llms).toContain("## In Indonesian");
    expect(llms).toContain(`- [${contactId.meta.title}](https://deushcs.com/id/contact): `);
    const contact = sitemap.find((entry) => entry.url === "https://deushcs.com/en/contact");
    expect(contact?.alternates?.languages).toMatchObject({ id: "https://deushcs.com/id/contact", "x-default": "https://deushcs.com/en/contact" });
    // pages with no Indonesian version carry none
    expect(sitemap.find((entry) => entry.url === "https://deushcs.com/en/solutions/enhance")?.alternates).toBeUndefined();
  });

  it("leaves no Indonesian line, URL or alternate while off", async () => {
    const { llms, sitemap } = await load(false);
    expect(llms).not.toContain("## In Indonesian");
    expect(llms).not.toContain("/id/");
    expect(sitemap.filter((entry) => entry.url.includes("/id") || entry.alternates)).toEqual([]);
  });
});
