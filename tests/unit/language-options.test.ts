import { describe, expect, it } from "vitest";
import { languageOptions } from "@/components/site/language-options";

describe("languageOptions", () => {
  it("lists EN then ID on both locales, marking the current one", () => {
    expect(languageOptions("id", ["en", "id"])).toEqual([
      { locale: "en", current: false, available: true },
      { locale: "id", current: true, available: true },
    ]);
  });

  it("disables a language the page doesn't exist in", () => {
    expect(languageOptions("en", ["en"])).toEqual([
      { locale: "en", current: true, available: true },
      { locale: "id", current: false, available: false },
    ]);
  });

  it("never disables the language being viewed", () => {
    expect(languageOptions("id", ["en"])[1]).toEqual({ locale: "id", current: true, available: true });
  });
});
