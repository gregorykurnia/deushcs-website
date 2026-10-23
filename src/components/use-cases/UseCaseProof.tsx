import { LinkCard } from "@/components/blocks/LinkCard";
import { LogoWall } from "@/components/blocks/LogoWall";
import { ProofRow } from "@/components/blocks/StatReadout";
import { Container } from "@/components/ui/container";
import { TextLink } from "@/components/ui/text-link";
import { siteFlags } from "@/content/flags";
import type { HomeContent, UseCaseContent } from "@/content/types";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

// The proof under a use case's steps (SEO/geo-implementation-plan.md §S8, item 5). While client stories are
// off (`showStories`) it is Home's proof row: "Trusted by 40+ brands" over the logo wall (or the industries,
// until the wall is approved, Q8), and no link to a story. While they're on, the page's own story card
// takes its place where the page has one, and the "Read client stories" link where it doesn't. `children`
// is the download offer, which sits under the proof.
export function UseCaseProof({
  proof,
  logos,
  children,
  className,
}: {
  proof: UseCaseContent["proof"];
  /** Home's logo wall data: the same approved logos, in the same place in the guide. */
  logos: HomeContent["logos"];
  children?: ReactNode;
  className?: string;
}) {
  const showWall = siteFlags[logos.logoWallFlag] && logos.wall.length > 0;
  // Home has no Indonesian version yet, so its two labels are English: a page in another language brings its own
  const more = proof.moreLabel ? { ...logos.more, label: proof.moreLabel } : logos.more;
  const storiesLabel = proof.storiesLabel ?? logos.link.label;

  return (
    <Container className={cn("py-14 desk:py-16", className)}>
      {/* ProofRow shows `industries` only when it has no children: pass children (not `false`) */}
      {showWall ? (
        <ProofRow line={proof.line}>
          <LogoWall logos={logos.wall} more={more} className="mt-8" />
        </ProofRow>
      ) : (
        <ProofRow line={proof.line} industries={logos.industries} />
      )}
      {siteFlags.showStories &&
        (proof.story ? (
          <LinkCard line={proof.story.line} href={proof.story.href} className="mx-auto mt-10 max-w-[960px]" />
        ) : (
          <p className="mt-6 text-center">
            <TextLink href={logos.link.href} className="text-ui">
              {storiesLabel}
            </TextLink>
          </p>
        ))}
      {children}
    </Container>
  );
}
