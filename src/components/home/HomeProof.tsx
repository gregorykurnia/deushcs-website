import { LogoWall } from "@/components/blocks/LogoWall";
import { ProofRow } from "@/components/blocks/StatReadout";
import { Container } from "@/components/ui/container";
import { TextLink } from "@/components/ui/text-link";
import type { HomeContent } from "@/content/types";
import { siteFlags } from "@/content/flags";

// Home section 2, the proof row under the hero (DESIGN-GUIDE.md §7.15, §7.20): "Trusted by 40+
// brands" and the six industries as text. The logo wall replaces the industries only when the
// owner has approved it (Q8, `showLogoWall`) and there are approved logos to show; until then
// no client logo appears. The link to client stories stays either way (home.md's note).
export function HomeProof({ logos }: { logos: HomeContent["logos"] }) {
  const showWall = siteFlags[logos.logoWallFlag] && logos.wall.length > 0;

  return (
    <Container className="pt-14">
      {/* ProofRow shows `industries` only when it has no children: pass children (not `false`) */}
      {showWall ? (
        <ProofRow line={logos.lede}>
          <LogoWall logos={logos.wall} className="mt-8" />
        </ProofRow>
      ) : (
        <ProofRow line={logos.lede} industries={logos.industries} />
      )}
      <p className="mt-6 text-center">
        <TextLink href={logos.link.href} className="text-ui">
          {logos.link.label}
        </TextLink>
      </p>
    </Container>
  );
}
