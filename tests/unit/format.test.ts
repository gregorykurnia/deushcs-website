import { describe, expect, it } from "vitest";
import { formatIDR } from "@/lib/format";

describe("formatIDR", () => {
  it("writes Rupiah the Indonesian way, with no space after Rp", () => {
    expect(formatIDR(69000, "id")).toBe("Rp69.000");
  });

  it("writes IDR with an ordinary space in English", () => {
    expect(formatIDR(69000, "en")).toBe("IDR 69,000");
  });

  it("drops decimals", () => {
    expect(formatIDR(1250000.4, "id")).toBe("Rp1.250.000");
    expect(formatIDR(1250000.4, "en")).toBe("IDR 1,250,000");
  });
});
