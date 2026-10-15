import { describe, expect, it } from "vitest";
import { buildTelkomStory, telkomStoryEn } from "@/content/en/stories/telkom-group";
import { calvinStoryId } from "@/content/id/stories/calvin-christian-school";
import { siteFlags } from "@/content/flags";
import * as site from "@/content/stories";
import { unknownStoryRewrite } from "@/content/stories/paths";
import { createStoryRegistry } from "@/content/stories";

// Task 4.2: the story registry. The site's own registry follows the flags; the variants the flags
// would switch to (Telkom named, Calvin published) are built here with createStoryRegistry, so they
// stay tested whichever way the flags are set.

const anonymised = buildTelkomStory(false);
const named = buildTelkomStory(true);
const aliasesFor = (story: { slug: string }) => ({ "national-telecom-group": story.slug });

describe("story registry, as the site has it", () => {
  it("serves the Telkom story in English under the slug the content gives it", () => {
    expect(site.getStory(telkomStoryEn.slug, "en")).toBe(telkomStoryEn);
    expect(site.storyLocales(telkomStoryEn.slug)).toEqual(["en"]);
  });

  it("holds Calvin's story back while publishCalvin is off, and serves it in Indonesian only once it's on", () => {
    expect(site.getStory("calvin-christian-school", "id") !== null).toBe(siteFlags.publishCalvin);
    expect(site.getStory("calvin-christian-school", "en")).toBeNull();
    expect(site.storySlugs().includes("calvin-christian-school")).toBe(siteFlags.publishCalvin);
  });

  it("lists every slug the route should prerender, aliases apart", () => {
    expect(site.storySlugs()).toContain(telkomStoryEn.slug);
  });
});

describe("a story held back", () => {
  const registry = createStoryRegistry({ en: [anonymised], id: [] }, aliasesFor(anonymised));

  it("is a 404 in every language, not a redirect", () => {
    expect(registry.resolveStory("calvin-christian-school", "id")).toEqual({ kind: "notFound" });
    expect(registry.resolveStory("calvin-christian-school", "en")).toEqual({ kind: "notFound" });
  });

  it("never lets the named slug reach the anonymised story", () => {
    // redirecting /clients/telkom-group to the anonymised story would say who the client is
    expect(registry.resolveStory("telkom-group", "en")).toEqual({ kind: "notFound" });
    expect(registry.aliasSlugs()).toEqual([]);
  });
});

describe("a story that exists in one language", () => {
  const registry = createStoryRegistry({ en: [anonymised], id: [calvinStoryId] });

  it("serves it in its own language", () => {
    expect(registry.resolveStory("calvin-christian-school", "id")).toEqual({ kind: "ok", locale: "id" });
    expect(registry.resolveStory(anonymised.slug, "en")).toEqual({ kind: "ok", locale: "en" });
  });

  it("redirects the other language to it, with the same slug", () => {
    expect(registry.resolveStory("calvin-christian-school", "en")).toEqual({
      kind: "redirect",
      locale: "id",
      slug: "calvin-christian-school",
    });
    expect(registry.resolveStory(anonymised.slug, "id")).toEqual({ kind: "redirect", locale: "en", slug: anonymised.slug });
  });

  it("lists the languages a story has, for the language switch", () => {
    expect(registry.storyLocales("calvin-christian-school")).toEqual(["id"]);
    expect(registry.storyLocales(anonymised.slug)).toEqual(["en"]);
    expect(registry.storyLocales("nope")).toEqual([]);
  });

  it("lists each slug once, across languages", () => {
    const both = createStoryRegistry({ en: [anonymised], id: [anonymised, calvinStoryId] });
    expect(both.storySlugs()).toEqual([anonymised.slug, "calvin-christian-school"]);
  });
});

describe("once Telkom is named (Q7 confirmed)", () => {
  const registry = createStoryRegistry({ en: [named] }, aliasesFor(named));

  it("moves the story to the named slug", () => {
    expect(named.slug).toBe("telkom-group");
    expect(registry.resolveStory("telkom-group", "en")).toEqual({ kind: "ok", locale: "en" });
  });

  it("redirects the old anonymised slug to it, in the visitor's language", () => {
    expect(registry.resolveStory("national-telecom-group", "en")).toEqual({
      kind: "redirect",
      locale: "en",
      slug: "telkom-group",
    });
    expect(registry.resolveStory("national-telecom-group", "id")).toEqual({
      kind: "redirect",
      locale: "en",
      slug: "telkom-group",
    });
    expect(registry.aliasSlugs()).toEqual(["national-telecom-group"]);
  });
});

describe("every registered story", () => {
  for (const story of [telkomStoryEn, anonymised, named, calvinStoryId]) {
    it(`${story.slug}: has a URL-safe slug, a WhatsApp context and an h1`, () => {
      expect(story.slug).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
      expect(["default", "assessment", "enhance"]).toContain(story.whatsapp);
      expect(story.header.title.length).toBeGreaterThan(0);
    });
  }
});

describe("the proxy's check for unknown story URLs", () => {
  it("lets a registered story and every other path through", () => {
    expect(unknownStoryRewrite(`/en/clients/${telkomStoryEn.slug}`)).toBeNull();
    expect(unknownStoryRewrite(`/en/clients/${telkomStoryEn.slug}/`)).toBeNull();
    expect(unknownStoryRewrite("/en/clients")).toBeNull();
    expect(unknownStoryRewrite("/en/about")).toBeNull();
    expect(unknownStoryRewrite("/clients/whatever")).toBeNull(); // no locale yet: the locale redirect comes first
  });

  it("rewrites a slug nobody registered to a path no route matches, so the catch-all answers 404", () => {
    expect(unknownStoryRewrite("/en/clients/no-such-client")).toBe("/en/clients/no-such-client/not-found");
    expect(unknownStoryRewrite("/id/clients/no-such-client")).toBe("/id/clients/no-such-client/not-found");
  });

  it("answers a malformed escape in the slug with the 404, not a crash in the proxy", () => {
    expect(unknownStoryRewrite("/en/clients/%E0%A4%A")).toBe("/en/clients/%E0%A4%A/not-found");
  });

  it("treats a held story like any unknown one", () => {
    if (!siteFlags.publishCalvin) {
      expect(unknownStoryRewrite("/id/clients/calvin-christian-school")).toBe(
        "/id/clients/calvin-christian-school/not-found",
      );
    }
    if (!siteFlags.telkomNamed) {
      expect(unknownStoryRewrite("/en/clients/telkom-group")).toBe("/en/clients/telkom-group/not-found");
    }
  });
});
