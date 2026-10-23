import { describe, expect, it } from "vitest";
import { aboutEn } from "@/content/en/about";
import { clientsEn } from "@/content/en/clients";
import { homeEn } from "@/content/en/home";
import { solutionsEn } from "@/content/en/solutions";
import { siteFlags } from "@/content/flags";

// G1.7 (GEO plan §S2): one self-contained answer passage per page, 40 to 70 words, naming DEUS and
// Indonesia, for AI tools to quote. Each sits where its page's copy has room (see content/en/*.md notes).
const passages = {
  home: homeEn.why.paragraphs.at(-1),
  solutions: solutionsEn.hero.passage,
  about: aboutEn.story.paragraphs[0],
  clients: clientsEn.industries.lede,
};

describe("answer passages (G1.7)", () => {
  it.each(Object.entries(passages))("%s: 40 to 70 words, names DEUS and Indonesia", (_, passage) => {
    expect(passage).toBeDefined();
    const words = passage!.split(/\s+/).length;
    expect(words).toBeGreaterThanOrEqual(40);
    expect(words).toBeLessThanOrEqual(70);
    expect(passage).toContain("DEUS");
    expect(passage).toContain("Indonesia");
  });

  it("Clients names logo-wall brands only while the wall shows, and never Telkom while telkomNamed is off", () => {
    expect(passages.clients!.includes("Boga Group")).toBe(siteFlags.showLogoWall);
    if (!siteFlags.telkomNamed) expect(passages.clients).not.toContain("Telkom");
  });
});
