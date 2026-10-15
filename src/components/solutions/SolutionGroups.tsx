import type { ReactNode } from "react";
import { ProductGrid, ProductTile } from "@/components/blocks/ProductTile";
import { Reveal } from "@/components/ui/reveal";
import { Section, type Surface } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { images, type ImageAsset } from "@/content/images";
import type { SectionIntro, SolutionsContent } from "@/content/types";

// Solutions sections 2 to 4 (WEBSITE-PLAN.md §5.2, DESIGN-GUIDE.md §7.11): the three groups from the
// mega menu, each a section with its own header and product tiles. Assess is Home's grid: the first
// product (the suite) leads, the others sit beside it. Perform has one product, so its lead tile takes
// the full width. Education is Potentia's warm tile, the only external one. Surfaces alternate
// (DESIGN-GUIDE.md §6.1): Cloud, White, Cloud.

// The screenshot on each product tile, by the product's name in content/en/solutions.ts.
const screens: Partial<Record<string, ImageAsset>> = {
  "Game-Based Assessment": images.gbaNumerical,
  "DEUS Discover": images.discoverReport,
  "Next Chapter": images.gbaSpeed,
  "DEUS Enhance": images.enhanceDashboard,
};

/** A tile's picture: its screenshot, or a TODO placeholder naming the product (DESIGN-GUIDE.md §14.3),
 *  so a product without a screenshot shows up in review. Alt is empty: the tile's title says what it is. */
function screenFor(name: string) {
  const screen = screens[name];
  return screen ? { image: { ...screen, alt: "" } } : { placeholder: `TODO: ${name} screenshot` };
}

/** One group: its centred header, then its tiles. */
function Group({
  titleId,
  intro,
  surface,
  children,
}: {
  titleId: string;
  intro: SectionIntro;
  surface: Surface;
  children: ReactNode;
}) {
  return (
    <Section surface={surface} aria-labelledby={titleId}>
      <Reveal>
        <SectionHeader id={titleId} label={intro.eyebrow} title={intro.title} />
      </Reveal>
      <Reveal>{children}</Reveal>
    </Section>
  );
}

export function SolutionGroups({
  assess,
  perform,
  education,
}: Pick<SolutionsContent, "assess" | "perform" | "education">) {
  return (
    <>
      <Group titleId="assess-title" intro={assess} surface="cloud">
        <ProductGrid>
          {assess.products.map((product, i) => (
            <ProductTile
              key={product.name}
              variant={i === 0 ? "lead" : "side"}
              title={product.name}
              body={product.body}
              linkLabel={product.cta.label}
              href={product.cta.href}
              {...screenFor(product.name)}
            />
          ))}
        </ProductGrid>
      </Group>

      <Group titleId="perform-title" intro={perform} surface="white">
        {/* One product: a single column, so the lead tile takes the full width and spans no second row. */}
        <ProductGrid className="desk:grid-cols-1">
          <ProductTile
            variant="lead"
            className="desk:row-span-1"
            title={perform.product.name}
            body={perform.product.body}
            linkLabel={perform.product.cta.label}
            href={perform.product.cta.href}
            {...screenFor(perform.product.name)}
          />
        </ProductGrid>
      </Group>

      <Group titleId="education-title" intro={education} surface="cloud">
        <ProductGrid>
          <ProductTile
            variant="potentia"
            title={education.product.name}
            body={education.product.body}
            linkLabel={education.product.cta.label}
            href={education.product.cta.href}
            art={{
              phone: { ...images.potentiaPhone, alt: "" },
              report: { ...images.potentiaReport, alt: "" },
            }}
          />
        </ProductGrid>
      </Group>
    </>
  );
}
