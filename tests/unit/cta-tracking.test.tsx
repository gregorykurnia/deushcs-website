import type { ComponentProps } from "react";
import { NextIntlClientProvider } from "next-intl";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import messages from "../../messages/en.json";
import { images } from "@/content/images";
import { homeEn } from "@/content/en/home";
import { solutionsEn } from "@/content/en/solutions";

// next-intl's navigation needs the Next router; a plain anchor is enough for markup tests.
vi.mock("@/i18n/navigation", () => ({
  Link: ({ href, locale, ...props }: ComponentProps<"a"> & { locale?: string }) => (
    <a href={`/${locale ?? "en"}${href}`} {...props} />
  ),
  usePathname: () => "/",
}));

const { ProductTile } = await import("@/components/blocks/ProductTile");
const { ProductHero } = await import("@/components/blocks/ProductHero");
const { HomeHero } = await import("@/components/home/HomeHero");
const { ClosingPanel } = await import("@/components/site/ClosingPanel");
const { SolutionsHelp } = await import("@/components/solutions/SolutionsHelp");

function render(node: React.ReactNode) {
  return renderToStaticMarkup(
    <NextIntlClientProvider locale="en" messages={messages}>
      {node}
    </NextIntlClientProvider>,
  );
}

/** The `data-cta` names in the markup, in order: what the click listener reports (src/lib/analytics.ts). */
function ctaNames(html: string) {
  return [...html.matchAll(/data-cta="([^"]+)"/g)].map((match) => match[1]);
}

describe("calls to action carry their analytics name", () => {
  it("names a product tile by where it goes", () => {
    const html = render(
      <ProductTile variant="side" title="DEUS Enhance" body="Body." linkLabel="Explore" href="/solutions/enhance" placeholder="TODO" />,
    );
    expect(ctaNames(html)).toEqual(["/solutions/enhance"]);
  });

  it("names a Potentia tile by its host", () => {
    const html = render(
      <ProductTile
        variant="potentia"
        title="Potentia"
        body="Body."
        linkLabel="Visit"
        href="https://deuspotentia.com/?utm_source=deushcs.com&utm_medium=referral"
        art={{ phone: { ...images.potentiaPhone, alt: "" }, report: { ...images.potentiaReport, alt: "" } }}
      />,
    );
    expect(ctaNames(html)).toEqual(["deuspotentia.com"]);
  });

  it("names the two product hero buttons", () => {
    const html = render(
      <ProductHero
        eyebrow="DEUS Enhance"
        title="Heading"
        ctas={[
          { label: "Request a demo", href: "/contact" },
          { label: "See how it works", href: "#how" },
        ]}
      >
        <p>Hero window</p>
      </ProductHero>,
    );
    expect(ctaNames(html)).toEqual(["hero-primary", "hero-secondary"]);
  });

  it("names the two home hero buttons", () => {
    expect(ctaNames(render(<HomeHero hero={homeEn.hero} />))).toEqual(["hero-primary", "hero-secondary"]);
  });

  it("names the closing panel's primary button, and its second one when it has one", () => {
    expect(ctaNames(render(<ClosingPanel />))).toEqual(["closing"]);
    const html = render(<ClosingPanel secondary={{ label: "See the solutions", href: "/solutions" }} />);
    expect(ctaNames(html)).toEqual(["closing", "closing-secondary"]);
  });

  it("names the solutions help buttons", () => {
    expect(ctaNames(render(<SolutionsHelp section={solutionsEn.help} />))).toEqual(["help-primary", "help-secondary"]);
  });
});
