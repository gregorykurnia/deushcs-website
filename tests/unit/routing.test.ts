import { describe, expect, it } from "vitest";
import { defaultLocale, locales, routing } from "@/i18n/routing";

describe("routing", () => {
  it("supports en and id, English first", () => {
    expect(locales).toEqual(["en", "id"]);
    expect(defaultLocale).toBe("en");
    expect(routing.locales).toEqual(locales);
    expect(routing.defaultLocale).toBe("en");
  });

  it("doesn't send Indonesian browsers to /id while Phase 6 is on hold (one hop from / to /en)", () => {
    expect(routing.localeDetection).toBe(false);
  });
});
