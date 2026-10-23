import { afterEach, describe, expect, it, vi } from "vitest";
import {
  breadcrumbListJsonLd,
  organizationJsonLd,
  pageUrl,
  serializeJsonLd,
  softwareApplicationJsonLd,
  websiteJsonLd,
} from "@/lib/structured-data";

afterEach(() => vi.unstubAllEnvs());

/** Every string value in the data that is a URL, however deep. */
function urlsIn(value: unknown): string[] {
  if (typeof value === "string") return /^https?:\/\//.test(value) || value.startsWith("/") ? [value] : [];
  if (Array.isArray(value)) return value.flatMap(urlsIn);
  if (value && typeof value === "object") {
    return Object.entries(value).flatMap(([key, v]) => (key === "@context" ? [] : urlsIn(v)));
  }
  return [];
}

describe("pageUrl", () => {
  it("is absolute, built from NEXT_PUBLIC_SITE_URL", () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://deushcs.com");
    expect(pageUrl("en")).toBe("https://deushcs.com/en");
    expect(pageUrl("en", "/")).toBe("https://deushcs.com/en");
    expect(pageUrl("en", "/solutions/enhance")).toBe("https://deushcs.com/en/solutions/enhance");
  });
});

describe("websiteJsonLd", () => {
  it("names the site and points at the root", () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://deushcs.com");
    expect(websiteJsonLd()).toEqual({
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "DEUS Human Capital Services",
      alternateName: "DEUS HCS",
      url: "https://deushcs.com/",
    });
  });
});

describe("organizationJsonLd", () => {
  it("carries the fixed fields, with an absolute logo and a WhatsApp contact point", () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://deushcs.com");
    const org = organizationJsonLd();
    expect(org).toMatchObject({
      "@type": "Organization",
      name: "DEUS Human Capital Services",
      alternateName: "DEUS HCS",
      legalName: "PT Investama Persada Kurnia",
      url: "https://deushcs.com/",
      logo: "https://deushcs.com/assets/deus-logo.png",
      email: "admin@deushcs.com",
      contactPoint: { "@type": "ContactPoint", telephone: "+6282312121660" },
    });
    expect(urlsIn(org).every((u) => u.startsWith("https://deushcs.com/"))).toBe(true);
  });

  it("leaves sameAs out until the owner sends profile URLs", () => {
    expect(organizationJsonLd()).not.toHaveProperty("sameAs");
    expect(organizationJsonLd([])).not.toHaveProperty("sameAs");
    expect(organizationJsonLd(["https://www.linkedin.com/company/deus"])).toHaveProperty("sameAs", [
      "https://www.linkedin.com/company/deus",
    ]);
  });

  it("follows the site URL, so a preview never points at the live domain", () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://preview.example.vercel.app");
    expect(organizationJsonLd().logo).toBe("https://preview.example.vercel.app/assets/deus-logo.png");
  });
});

describe("softwareApplicationJsonLd", () => {
  it("describes a product page", () => {
    const data = softwareApplicationJsonLd({
      name: "DEUS Enhance",
      description: "d",
      url: pageUrl("en", "/solutions/enhance"),
      publisher: "PT Investama Persada Kurnia",
    });
    expect(data).toMatchObject({
      "@type": "SoftwareApplication",
      name: "DEUS Enhance",
      applicationCategory: "BusinessApplication",
      publisher: { name: "PT Investama Persada Kurnia" },
    });
    expect(data.url).toMatch(/^https?:\/\/.+\/en\/solutions\/enhance$/);
  });
});

describe("breadcrumbListJsonLd", () => {
  it("starts at Home, numbers each step and ends with the page", () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://deushcs.com");
    const data = breadcrumbListJsonLd({
      locale: "en",
      homeName: "Home",
      trail: [
        { name: "Solutions", path: "/solutions" },
        { name: "DEUS Enhance", path: "/solutions/enhance" },
      ],
    });
    expect(data["@type"]).toBe("BreadcrumbList");
    expect(data.itemListElement).toEqual([
      { "@type": "ListItem", position: 1, name: "Home", item: "https://deushcs.com/en" },
      { "@type": "ListItem", position: 2, name: "Solutions", item: "https://deushcs.com/en/solutions" },
      { "@type": "ListItem", position: 3, name: "DEUS Enhance", item: "https://deushcs.com/en/solutions/enhance" },
    ]);
  });
});

describe("serializeJsonLd", () => {
  it("round-trips every builder's output as JSON", () => {
    for (const data of [websiteJsonLd(), organizationJsonLd()]) {
      expect(JSON.parse(serializeJsonLd(data))).toEqual(data);
    }
  });
});
