import { describe, expect, it } from "vitest";
import { getPageContent, localesFor, pagePaths, resolvePage } from "@/content/registry";
import type { PageKey } from "@/content/types";
import { potentiaHref, whatsappHref } from "@/lib/links";

// Phase 2 pages, English first. Their copy comes from content/en/*.md. These tests check that
// each page is registered and that its links only go to planned pages, in-page anchors,
// Potentia or WhatsApp.

const pages: PageKey[] = ["home", "about", "solutions"];
const plannedPaths = new Set<string>(Object.values(pagePaths));

/** Every `href` string in a content module, however deeply it is nested. */
function hrefsIn(value: unknown): string[] {
  if (Array.isArray(value)) return value.flatMap(hrefsIn);
  if (value && typeof value === "object") {
    return Object.entries(value).flatMap(([key, child]) =>
      key === "href" && typeof child === "string" ? [child] : hrefsIn(child),
    );
  }
  return [];
}

describe("Home, About and Solutions content", () => {
  it.each(pages)("%s is written in English and nowhere else yet", (page) => {
    expect(localesFor(page)).toEqual(["en"]);
  });

  it("sends an Indonesian visitor to the English About page until Phase 6", () => {
    expect(resolvePage("about", "id")).toEqual({ kind: "redirect", locale: "en", path: "/about" });
  });

  it.each(pages)("%s links only to planned pages, anchors, Potentia or WhatsApp", (page) => {
    const content = getPageContent(page, "en");
    expect(content).not.toBeNull();
    for (const href of hrefsIn(content)) {
      if (href.startsWith("#") || href === potentiaHref() || href === whatsappHref()) continue;
      expect(plannedPaths.has(href), href).toBe(true);
    }
  });
});
