import { ProductGrid, ProductTile } from "@/components/blocks/ProductTile";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { isExternalHref } from "@/components/ui/text-link";
import { images } from "@/content/images";
import type { HomeContent } from "@/content/types";

// Home section 5, "Our solutions" (DESIGN-GUIDE.md §7.11): three product tiles on Cloud (F10).
// Game-Based Assessment and DEUS Enhance sit side by side as lead tiles (large screenshots), and
// Potentia spans the width in the warm skin and opens deuspotentia.com in a new tab. The anchor
// `id="solutions"` is where the hero's "Explore our solutions" button lands.
// Home's copy has no tile subtitles, feature tags or language chip, so none are shown; the
// screenshots are Home's own (F38, F39; the Solutions page keeps the mockup's), and their alt is
// empty because each tile's title names them.
// Tiles are keyed by their link, which stays the same when the copy is edited or translated; the
// one external link is Potentia's warm tile. An internal link missing here fails the build.
const tileScreens: Partial<Record<string, { variant: "lead" | "side"; image: keyof typeof images }>> = {
  "/solutions/game-based-assessment": { variant: "lead", image: "gbaNextChapter" },
  "/solutions/enhance": { variant: "lead", image: "enhancePaDashboard" },
};

export function HomeSolutions({ section }: { section: HomeContent["solutions"] }) {
  // Lead tiles first; the content keeps home.md's order for everything else.
  const isLead = (href: string) => tileScreens[href]?.variant === "lead";
  const ordered = [...section.products].sort((a, b) => Number(isLead(b.cta.href)) - Number(isLead(a.cta.href)));

  return (
    <Section id="solutions" surface="cloud" aria-labelledby="solutions-title" className="scroll-mt-24">
      <SectionHeader id="solutions-title" label={section.eyebrow} title={section.title} />
      <ProductGrid equal>
        {ordered.map((product) => {
          const screen = tileScreens[product.cta.href];
          if (!screen && !isExternalHref(product.cta.href)) {
            throw new Error(`HomeSolutions: no tile for ${product.cta.href}`);
          }
          return screen ? (
            <ProductTile
              key={product.name}
              variant={screen.variant}
              title={product.name}
              body={product.body}
              linkLabel={product.cta.label}
              href={product.cta.href}
              image={{ ...images[screen.image], alt: "" }}
            />
          ) : (
            <ProductTile
              key={product.name}
              variant="potentia"
              title={product.name}
              body={product.body}
              linkLabel={product.cta.label}
              href={product.cta.href}
              art={{
                phone: { ...images.potentiaPhone, alt: "" },
                report: { ...images.potentiaReport, alt: "" },
              }}
            />
          );
        })}
      </ProductGrid>
    </Section>
  );
}
