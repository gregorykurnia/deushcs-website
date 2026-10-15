import type { ReactNode } from "react";
import { ProductGrid, ProductTile } from "@/components/blocks/ProductTile";
import { Reveal } from "@/components/ui/reveal";
import { Section, type Surface } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { images, type ImageAsset } from "@/content/images";
import type { SectionIntro, SolutionsContent } from "@/content/types";

// Solutions sections 2 to 4 (WEBSITE-PLAN.md §5.2, DESIGN-GUIDE.md §7.11): the three groups from the
// mega menu, each a section with its own header and product tiles. Assess is Home's grid: the first
// product (the suite) leads, the others sit beside it. Perform has one product, so it is a wide tile:
// copy left, screenshot right. Education is Potentia's warm tile, the only external one. Surfaces alternate
// (DESIGN-GUIDE.md §6.1): Cloud, White, Cloud.

// The screenshot on each product tile, by the product's link: it stays the same when the copy is
// edited or translated.
const screens: Partial<Record<string, ImageAsset>> = {
  "/solutions/game-based-assessment": images.gbaNumerical,
  "/solutions/discover": images.discoverReport,
  "/solutions/next-chapter": images.gbaSpeed,
  "/solutions/enhance": images.enhanceDashboard,
};

/** A tile's screenshot. Alt is empty: the tile's title says what it is. A product with no screenshot
 *  here fails the build, rather than showing an untranslated caption. */
function screenFor(href: string) {
  const screen = screens[href];
  if (!screen) throw new Error(`SolutionGroups: no screenshot for the tile linking to ${href}`);
  return { image: { ...screen, alt: "" } };
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
              {...screenFor(product.cta.href)}
            />
          ))}
        </ProductGrid>
      </Group>

      <Group titleId="perform-title" intro={perform} surface="white">
        <ProductGrid>
          <ProductTile
            variant="wide"
            title={perform.product.name}
            body={perform.product.body}
            linkLabel={perform.product.cta.label}
            href={perform.product.cta.href}
            {...screenFor(perform.product.cta.href)}
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
