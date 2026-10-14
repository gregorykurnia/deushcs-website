import { describe, expect, it } from "vitest";
import { cn } from "@/lib/utils";

describe("cn knows the Daylight tokens", () => {
  it("keeps a custom font size next to a text colour", () => {
    expect(cn("text-h2", "text-ink")).toBe("text-h2 text-ink");
    expect(cn("text-ui text-slate", "text-label")).toBe("text-slate text-label");
  });

  it("merges custom shadows, radii and containers", () => {
    expect(cn("shadow-soft", "shadow-float")).toBe("shadow-float");
    expect(cn("rounded-pill", "rounded-lg")).toBe("rounded-lg");
    expect(cn("max-w-content", "max-w-wide")).toBe("max-w-wide");
  });

  it("still lets a later colour win", () => {
    expect(cn("bg-ink text-white", "bg-white text-ink")).toBe("bg-white text-ink");
  });
});
