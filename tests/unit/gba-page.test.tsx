import type { ComponentProps } from "react";
import { NextIntlClientProvider } from "next-intl";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import { gbaEn } from "@/content/en/game-based-assessment";
import { images } from "@/content/images";
import { faqPageJsonLd, serializeJsonLd } from "@/lib/structured-data";
import messages from "../../messages/en.json";

// Task 3.3: the blocks the Game-Based Assessment page adds, its structured data and its content
// shape. The page's behaviour (tabs, links, JSON-LD in the document) is in tests/e2e/gba.spec.ts.

vi.mock("@/i18n/navigation", () => ({
  Link: ({ href, locale, ...props }: ComponentProps<"a"> & { locale?: string }) => (
    <a href={`/${locale ?? "en"}${href === "/" ? "" : href}`} {...props} />
  ),
}));

const { NumberedSteps } = await import("@/components/blocks/NumberedSteps");
const { ProductHero } = await import("@/components/blocks/ProductHero");
const { ProductStage } = await import("@/components/blocks/ProductStage");

function render(node: React.ReactNode) {
  return renderToStaticMarkup(
    <NextIntlClientProvider locale="en" messages={messages}>
      {node}
    </NextIntlClientProvider>,
  );
}

describe("faqPageJsonLd", () => {
  const data = faqPageJsonLd([
    { question: "Can candidates cheat?", answer: "Very **little** to look up." },
    { question: "Is it normed?", answer: "Yes." },
  ]);

  it("is a schema.org FAQPage with one Question per item", () => {
    expect(data["@context"]).toBe("https://schema.org");
    expect(data["@type"]).toBe("FAQPage");
    expect(data.mainEntity).toHaveLength(2);
    expect(data.mainEntity[0]).toMatchObject({ "@type": "Question", name: "Can candidates cheat?" });
  });

  it("strips the **bold** markers from answers", () => {
    expect(data.mainEntity[0]!.acceptedAnswer.text).toBe("Very little to look up.");
  });

  it("escapes < so copy can't close the script tag", () => {
    const json = serializeJsonLd({ text: "</script><b>" });
    expect(json).not.toContain("<");
    expect(JSON.parse(json).text).toBe("</script><b>");
  });
});

describe("GBA content", () => {
  it("opens with What's different: no label, and the answer passage as its lede, with no price (round 4)", () => {
    expect("eyebrow" in gbaEn.principles.intro).toBe(false);
    expect(gbaEn.principles.intro.title).toBe("A smarter assessment for better hiring results.");
    expect(gbaEn.principles.intro.lede).toMatch(/^Game-based assessment measures how candidates think/);
    expect(gbaEn.principles.intro.lede).not.toMatch(/IDR|Rp/);
    for (const gone of ["problem", "howItWorks", "behind", "platform", "reports", "science", "impact", "pricing"]) {
      expect(gone in gbaEn).toBe(false);
    }
  });

  it("asks no price question in the FAQ", () => {
    const text = JSON.stringify(gbaEn.faq.items);
    expect(text).not.toMatch(/IDR|Rp|cost\?|minimum order/);
  });

  it("has one icon on every pillar and use case", () => {
    for (const item of [...gbaEn.principles.items, ...gbaEn.useCases.items]) {
      expect(item.icon).toBeTruthy();
    }
  });

});

describe("NumberedSteps", () => {
  const steps = [
    { title: "Invite", body: "Upload a CSV." },
    { title: "Play", body: "On a phone." },
    { title: "Decide", body: "Reports are ready." },
  ];

  it("is an ordered list with the numbers drawn as decoration", () => {
    const html = render(<NumberedSteps steps={steps} />);
    expect(html).toContain("<ol");
    expect(html.match(/<li /g)).toHaveLength(3);
    // the list itself carries the order; the circle digits are aria-hidden
    expect(html).toMatch(/aria-hidden="true"[^>]*>1<\/span>/);
  });

  it("joins the circles with a line, except after the last one", () => {
    const html = render(<NumberedSteps steps={steps} />);
    expect(html.match(/h-px bg-line/g)).toHaveLength(2);
  });
});

describe("ProductStage", () => {
  it("shows the TODO placeholder until there is a screenshot", () => {
    const html = render(<ProductStage placeholder="TODO: GBA CMS screenshot" />);
    expect(html).toContain("data-placeholder");
    expect(html).toContain("TODO: GBA CMS screenshot");
    expect(html).not.toContain("<img");
  });

  it("floats the screenshot at a fixed inset when there is one", () => {
    const html = render(<ProductStage image={{ ...images.gbaNumerical, alt: "A cognitive game" }} />);
    expect(html).toContain('alt="A cognitive game"');
    expect(html).not.toContain("data-placeholder");
  });
});

describe("ProductHero", () => {
  const html = render(
    <ProductHero
      eyebrow="Game-Based Assessment"
      title="Reveal real potential through play."
      lede="A modular assessment suite."
      ctas={[
        { label: "Request a free trial", href: "/contact?product=gba" },
        { label: "Book a demo", href: "/contact?product=gba" },
      ]}
    >
      <p>window content</p>
    </ProductHero>,
  );

  it("has one h1, named as the section's label", () => {
    expect(html.match(/<h1/g)).toHaveLength(1);
    expect(html).toContain('aria-labelledby="hero-title"');
    expect(html).toContain('id="hero-title"');
  });

  it("renders both buttons as links, then the window content", () => {
    expect(html).toContain('href="/en/contact?product=gba"');
    expect(html).toContain("Request a free trial");
    expect(html).toContain("Book a demo");
    expect(html.indexOf("Book a demo")).toBeLessThan(html.indexOf("window content"));
  });

  it("draws the glow as decoration", () => {
    expect(html).toMatch(/aria-hidden="true"[^>]*grad-hero-glow/);
  });

  it("leads with the product name and a heading smaller than Home's (F71)", () => {
    expect(html.indexOf("Game-Based Assessment")).toBeLessThan(html.indexOf("<h1"));
    expect(html).toMatch(/<h1[^>]*class="[^"]*text-h2/);
    expect(html).not.toContain("text-display");
  });
});
