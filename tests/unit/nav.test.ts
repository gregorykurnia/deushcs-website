import { describe, expect, it } from "vitest";
import { activeSection, primaryLinks, solutionGroups } from "@/components/site/nav";

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

  it("groups solutions as in content/en/global.md, Potentia external with UTM tags", () => {
    expect(solutionGroups.map((g) => g.key)).toEqual(["assess", "perform", "families"]);
    const potentia = solutionGroups[2].items[0];
    expect(potentia.external).toBe(true);
    expect(potentia.href).toBe(
      "https://deuspotentia.com/?utm_source=deushcs.com&utm_medium=referral",
    );
  });
});
