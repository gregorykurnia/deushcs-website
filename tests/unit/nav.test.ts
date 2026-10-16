import { describe, expect, it } from "vitest";
import { activeSection, primaryLinks, solutionColumns } from "@/components/site/nav";

describe("activeSection", () => {
  it("marks Solutions on the overview and every product page", () => {
    expect(activeSection("/solutions")).toBe("solutions");
    expect(activeSection("/solutions/enhance")).toBe("solutions");
    expect(activeSection("/solutions/game-based-assessment")).toBe("solutions");
  });

  it("marks top-level sections, including story pages under Clients", () => {
    expect(activeSection("/clients")).toBe("clients");
    expect(activeSection("/clients/telkom-group")).toBe("clients");
    expect(activeSection("/science")).toBe("science");
    expect(activeSection("/about")).toBe("about");
    expect(activeSection("/contact")).toBe("contact");
  });

  it("marks nothing on Home or unrelated paths", () => {
    expect(activeSection("/")).toBeNull();
    expect(activeSection("/privacy")).toBeNull();
    expect(activeSection("/solutionsx")).toBeNull();
  });
});

describe("menu structure", () => {
  it("keeps the owner's nav order", () => {
    expect(primaryLinks.map((l) => l.key)).toEqual(["clients", "science", "about"]);
  });

  it("leads with products, no group headings: GBA with its four modules and Potentia, then Enhance", () => {
    expect(solutionColumns.map((c) => c.lead.key)).toEqual(["gba", "enhance"]);
    expect(solutionColumns[0].parts?.map((p) => p.key)).toEqual([
      "personality",
      "cognitive",
      "neuroscience",
      "simulation",
    ]);
    expect(solutionColumns[0].parts?.map((p) => p.href.split("#")[1])).toEqual([
      "personality",
      "cognitive",
      "neuro",
      "simulation",
    ]);
  });

  it("keeps Potentia external with UTM tags, as its own card", () => {
    const potentia = solutionColumns[0].card;
    expect(potentia?.key).toBe("potentia");
    expect(potentia?.external).toBe(true);
    expect(potentia?.href).toBe("https://deuspotentia.com/?utm_source=deushcs.com&utm_medium=referral");
  });
});
