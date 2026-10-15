import { describe, expect, it } from "vitest";
import { clientsEn } from "@/content/en/clients";
import { gbaEn } from "@/content/en/game-based-assessment";
import { homeEn } from "@/content/en/home";
import { buildTelkomStory, telkomCardLink, telkomStoryEn } from "@/content/en/stories/telkom-group";
import { calvinStoryId } from "@/content/id/stories/calvin-christian-school";
import { siteFlags } from "@/content/flags";
import { localesFor } from "@/content/registry";
import { potentiaHref } from "@/lib/links";
import type { StoryContent } from "@/content/types";

// Phase 4 content: the Clients hub and the two stories. The anonymised Telkom variant is a
// permission risk (Q7), so the tests read every string it holds, and its URL, for anything that
// would identify the client.

function strings(value: unknown): string[] {
  if (typeof value === "string") return [value];
  if (Array.isArray(value)) return value.flatMap(strings);
  if (value && typeof value === "object") return Object.values(value).flatMap(strings);
  return [];
}

const allText = (content: unknown) => strings(content).join("\n");

const anonymised = buildTelkomStory(false);
const named = buildTelkomStory(true);

const identifying = /telkom|\bLina\b|graha|merah putih|bandung|six (of its )?subsidiaries|6 subsidiaries/i;

describe("Telkom story, anonymised (Q7 not confirmed)", () => {
  it("names no one: not the client, the quoted person, the building or the city", () => {
    expect(allText(anonymised)).not.toMatch(identifying);
  });

  it("has a URL that doesn't name the client", () => {
    expect(anonymised.slug).toBe("national-telecom-group");
    expect(anonymised.slug).not.toMatch(identifying);
  });

  it("calls the client 'A national telecom group', in the page and in the SEO title", () => {
    expect(anonymised.client).toBe("A national telecom group");
    expect(anonymised.meta.title).toMatch(/^A National Telecom Group/);
  });

  it("shows no photo and no client quote, and no one is named in the quotes left", () => {
    expect(anonymised.photo).toBeUndefined();
    expect(anonymised.words.featured).toEqual([]);
    for (const quote of anonymised.words.participants?.quotes ?? []) {
      expect(quote.name).toBeUndefined();
      expect(quote.role).toBeUndefined();
    }
  });

  it("keeps the figures the story is about", () => {
    expect(anonymised.glance.stats.map((s) => s.value)).toEqual(["1,000+", "30+", "1 day", "2"]);
    expect(anonymised.header.title).toBe("1,000+ Management Trainee candidates. 30+ provinces. Results in one day.");
  });
});

describe("Telkom story, named (Q7 confirmed)", () => {
  it("names Telkom Group, with Ibu Lina's quote and the photo", () => {
    expect(named.slug).toBe("telkom-group");
    expect(named.client).toBe("Telkom Group");
    expect(named.words.featured).toHaveLength(1);
    expect(named.words.featured[0]).toMatchObject({ name: "Ibu Lina", role: "Telkom Group Selection", lang: "id" });
    expect(named.photo?.caption).toContain("Graha Merah Putih");
  });

  it("keeps each original Indonesian quote with its English translation", () => {
    const quotes = [...named.words.featured, ...(named.words.participants?.quotes ?? [])];
    expect(quotes).toHaveLength(4);
    for (const quote of quotes) {
      expect(quote.lang).toBe("id");
      expect(quote.translation).toBeTruthy();
    }
  });
});

describe("Telkom story as shipped", () => {
  it("follows telkomNamed", () => {
    expect(telkomStoryEn).toEqual(buildTelkomStory(siteFlags.telkomNamed));
  });
});

describe("Calvin Christian School story", () => {
  it("is in Indonesian, with its own locale and slug", () => {
    expect(calvinStoryId.slug).toBe("calvin-christian-school");
    expect(calvinStoryId.header.eyebrow).toBe("Cerita klien · Potentia");
    expect(calvinStoryId.words.participants).toBeUndefined();
  });

  it("has both teacher and parent quotes, and the closing sends visitors to Potentia", () => {
    expect(calvinStoryId.words.featured.map((q) => q.role)).toEqual(["Guru", "Orang tua"]);
    expect(calvinStoryId.closing.cta?.href).toBe(potentiaHref("/daftar/institusi"));
    expect(calvinStoryId.closing.secondary?.href).toBe(potentiaHref());
  });
});

describe("Clients hub", () => {
  it("is registered in English only", () => {
    expect(localesFor("clients")).toEqual(["en"]);
  });

  it("states the company-wide 40+ brands", () => {
    expect(clientsEn.hero.title).toBe("Trusted by 40+ brands across Indonesia.");
  });

  it("holds the logo wall behind showLogoWall, with no logos until Q8", () => {
    expect(clientsEn.logoWall.flag).toBe("showLogoWall");
    expect(clientsEn.logoWall.wall).toEqual([]);
  });

  it("lists the six industries", () => {
    expect(clientsEn.industries.items).toEqual([
      "Retail",
      "Telecommunications",
      "Education",
      "FMCG",
      "F&B",
      "Electronics",
    ]);
  });

  it("links each story card to its story's slug", () => {
    const telkom = clientsEn.stories.cards.find((card) => card.slug === telkomStoryEn.slug);
    expect(telkom).toMatchObject({ client: telkomStoryEn.client, product: "Game-Based Assessment" });
  });

  it.skipIf(siteFlags.telkomNamed)("hides Telkom's name on the hub until Q7 is confirmed", () => {
    expect(allText(clientsEn)).not.toMatch(identifying);
  });

  it.skipIf(siteFlags.publishCalvin)("holds the Calvin card until Q11 is confirmed", () => {
    expect(clientsEn.stories.cards.map((card) => card.slug)).toEqual([telkomStoryEn.slug]);
    expect(allText(clientsEn)).not.toContain("Calvin");
  });

  it.skipIf(!siteFlags.publishCalvin)("shows the Calvin card, flagged as Indonesian, once Q11 is confirmed", () => {
    const calvin = clientsEn.stories.cards.find((card) => card.slug === "calvin-christian-school");
    expect(calvin?.note).toBe("Story is in Indonesian");
  });
});

describe("all Phase 4 copy", () => {
  const modules: [string, unknown][] = [
    ["clients hub", clientsEn],
    ["Telkom story (anonymised)", anonymised],
    ["Telkom story (named)", named],
    ["Calvin story", calvinStoryId],
  ];

  it.each(modules)("%s keeps editor notes and [VERIFY] markers out of the copy", (_name, content) => {
    for (const text of strings(content)) {
      expect(text).not.toMatch(/\[VERIFY|Note:|Eyebrow:|^> /);
    }
  });

  it.each(modules)("%s leaves the site name to pageMetadata", (_name, content) => {
    expect((content as { meta: { title: string } }).meta.title).not.toContain("|");
  });

  it("every story has the parts the shared layout needs", () => {
    const stories: StoryContent[] = [anonymised, named, calvinStoryId];
    for (const story of stories) {
      expect(story.glance.stats.length).toBeGreaterThanOrEqual(2);
      expect(story.glance.stats.length).toBeLessThanOrEqual(4);
      expect(story.challenge.paragraphs.length).toBeGreaterThan(0);
      expect(story.did.paragraphs.length).toBeGreaterThan(0);
    }
  });
});

describe("Telkom link cards on Home and GBA (Task 4.4)", () => {
  it("both point at the story the hub links to", () => {
    expect(telkomCardLink.href).toBe(`/clients/${telkomStoryEn.slug}`);
    expect(gbaEn.clientStory).toEqual(telkomCardLink);
    expect(homeEn.gbaSpotlight.clientStory).toEqual(telkomCardLink);
  });

  it("names the client only when Q7 is confirmed, and carries no numbers either way", () => {
    if (siteFlags.telkomNamed) {
      expect(telkomCardLink.line).toMatch(/^Telkom Group:/);
    } else {
      expect(telkomCardLink.line).toBe(
        "A national telecom group: Management Trainee recruitment, with results in one day.",
      );
      expect(telkomCardLink.line).not.toMatch(identifying);
      expect(telkomCardLink.href).not.toMatch(/telkom/);
    }
    expect(telkomCardLink.line).not.toMatch(/\d/);
  });
});
