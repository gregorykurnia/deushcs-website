import { describe, expect, it } from "vitest";
import { emailHref, potentiaHref, whatsappHref } from "@/lib/links";

describe("whatsappHref", () => {
  it("prefills the Enhance message", () => {
    expect(whatsappHref("enhance")).toBe(
      "https://wa.me/6282312121660?text=" +
        encodeURIComponent("Halo DEUS, saya ingin tahu lebih lanjut tentang DEUS Enhance."),
    );
  });

  it("prefills the default and assessment messages", () => {
    expect(whatsappHref("default")).toBe(
      "https://wa.me/6282312121660?text=" +
        encodeURIComponent("Halo DEUS, saya ingin bertanya tentang layanan DEUS."),
    );
    expect(whatsappHref("assessment")).toContain(
      encodeURIComponent("asesmen berbasis game"),
    );
  });
});

describe("potentiaHref", () => {
  it("adds the referral UTM tags to a path", () => {
    expect(potentiaHref("/daftar/institusi")).toBe(
      "https://deuspotentia.com/daftar/institusi?utm_source=deushcs.com&utm_medium=referral",
    );
  });

  it("links the home page by default", () => {
    expect(potentiaHref()).toBe(
      "https://deuspotentia.com/?utm_source=deushcs.com&utm_medium=referral",
    );
  });
});

describe("emailHref", () => {
  it("mails admin@deushcs.com", () => {
    expect(emailHref()).toBe("mailto:admin@deushcs.com");
  });
});
