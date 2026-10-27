import { ProductGrid, ProductTile } from "@/components/blocks/ProductTile";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { isExternalHref } from "@/components/ui/text-link";
import { images } from "@/content/images";
import type { HomeContent } from "@/content/types";

// Home section 5, "Our products" (DESIGN-GUIDE.md §7.11): three product tiles on Cloud (F10),
// the same size in one row (F50), so all three are in view together at 1280×800 once the heading
// reaches the top: Game-Based Assessment and DEUS Enhance as side tiles (a short screenshot strip
// under the copy), then Potentia stacked in the warm skin, opening deuspotentia.com in a new tab.
// On phones they stack. The anchor `id="solutions"` is where the hero's "See our products"
// button lands.
// Home's copy has no tile subtitles, feature tags or language chip, so none are shown; the
// screenshots are Home's own (F38, F39; the Solutions page keeps the mockup's), and their alt is
// empty because each tile's title names them.
// Tiles are keyed by their link, which stays the same when the copy is edited or translated; the
// one external link is Potentia's warm tile. An internal link missing here fails the build.
const tileScreens: Partial<Record<string, keyof typeof images>> = {
  "/solutions/game-based-assessment": "gbaNextChapter",
  "/solutions/enhance": "enhancePaDashboard",
};

export function HomeSolutions({ section }: { section: HomeContent["solutions"] }) {
  return (
    <Section id="solutions" surface="cloud" aria-labelledby="solutions-title" className="scroll-mt-24">
      <SectionHeader id="solutions-title" label={section.eyebrow} title={section.title} />
      <ProductGrid thirds>
        {section.products.map((product) => {
          const screen = tileScreens[product.cta.href];
          if (!screen && !isExternalHref(product.cta.href)) {
            throw new Error(`HomeSolutions: no tile for ${product.cta.href}`);
          }
          return screen ? (
            <ProductTile
              key={product.name}
              variant="side"
              title={product.name}
              body={product.body}
              linkLabel={product.cta.label}
              href={product.cta.href}
              image={{ ...images[screen], alt: "" }}
            />
          ) : (
            <ProductTile
              key={product.name}
              variant="potentia"
              stacked
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
