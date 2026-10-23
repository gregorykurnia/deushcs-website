import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { ProblemGrid, RoleCards, SystemsDiagram } from "@/components/enhance/EnhanceBlocks";
import { ReviewToPay } from "@/components/enhance/ReviewToPay";
import { enhanceEn } from "@/content/en/enhance";
import { images, missingScreens } from "@/content/images";
import { emailHref } from "@/lib/links";
import { softwareApplicationJsonLd } from "@/lib/structured-data";

// Task 1.6: what the Enhance page adds to the blocks it reuses: alt text for its screens, the
// systems diagram, the email link's prefill, the SoftwareApplication data and the page-only
// blocks. The page's behaviour (sections, anchors, form, no-JS, the redirect) is in
// tests/e2e/enhance.spec.ts.

describe("Enhance content for the page", () => {
  it("gives each screen on disk alt text, and the missing ones a TODO", () => {
    for (const alt of Object.values(enhanceEn.screens)) expect(alt).toMatch(/^DEUS Enhance /);
    expect(images.enhanceCalibrationMatrix.src).toBe("/assets/enhance-3.png");
    expect(images.enhanceRewardGrouping.src).toBe("/assets/enhance-2.png");
    expect(missingScreens.enhanceProductOverview.en).toBe("TODO: Enhance product overview screenshot");
  });

  it("has six solution steps, ending with the old closing card as step 6 (F75, D11)", () => {
    expect(enhanceEn.solution.steps.map((step) => step.title)).toEqual([
      "Set the framework",
      "Track across levels",
      "Review performance",
      "Calibrate results",
      "Talent mapping",
      "Turn results into decisions",
    ]);
    // the deck's line first, then the gist of the cut "From rating to reward" (F76), in two sentences
    const last = enhanceEn.solution.steps[5]!.body;
    expect(last).toMatch(/^Connect outcomes to incentives, bonuses, salary, and development\. /);
    expect(last.match(/\. /g)).toHaveLength(1);
  });

  it("points every booking link at the form in the closing panel (F79)", () => {
    expect(enhanceEn.hero.primary.href).toBe("#book-a-call");
    expect(JSON.stringify(enhanceEn)).not.toContain("#next-step");
  });

  it("names the four systems the copy lists, flowing into Enhance", () => {
    expect(enhanceEn.systems.diagram).toEqual({
      sources: ["HRIS", "ERP", "Payroll", "Operational systems"],
      hub: "DEUS Enhance",
    });
  });

  it("keeps the deck's email subject and body", () => {
    expect(enhanceEn.nextStep.email.subject).toBe("Inquiry about DEUS Enhance");
    expect(enhanceEn.nextStep.email.body).toMatch(/^Dear DEUS Admin,\n\nI'm \[Name\] from \[Company Name\]\./);
  });
});

describe("emailHref", () => {
  it("is the bare address without a prefill", () => {
    expect(emailHref()).toBe("mailto:admin@deushcs.com");
  });

  it("encodes the subject and body, with %20 for spaces", () => {
    const href = emailHref({ subject: "Inquiry about DEUS Enhance", body: "Dear DEUS Admin,\n\nHi" });
    expect(href).toBe(
      "mailto:admin@deushcs.com?subject=Inquiry%20about%20DEUS%20Enhance&body=Dear%20DEUS%20Admin%2C%0A%0AHi",
    );
  });
});

describe("softwareApplicationJsonLd", () => {
  it("describes the product as a business application published by the legal entity", () => {
    expect(
      softwareApplicationJsonLd({
        name: "DEUS Enhance",
        description: "Connect KPIs.",
        url: "https://example.com/en/solutions/enhance",
        publisher: "PT Investama Persada Kurnia",
      }),
    ).toMatchObject({
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "DEUS Enhance",
      applicationCategory: "BusinessApplication",
      url: "https://example.com/en/solutions/enhance",
      publisher: { "@type": "Organization", name: "PT Investama Persada Kurnia" },
    });
  });
});

/** The text of every `<tag>` in the markup (tests run in node, without a DOM). */
function texts(html: string, tag: string, attrs = "[^>]*") {
  const pattern = new RegExp(`<${tag}${attrs}>([\\s\\S]*?)</${tag}>`, "g");
  return [...html.matchAll(pattern)].map((m) => (m[1] ?? "").replace(/<[^>]+>/g, ""));
}

describe("Enhance blocks", () => {
  it("ProblemGrid numbers the five problems and ends with the teaser link", () => {
    const html = renderToStaticMarkup(
      <ProblemGrid items={enhanceEn.problem.items} teaser={enhanceEn.problem.teaser} teaserHref="#urgency" />,
    );
    expect(texts(html, "h3")).toEqual(enhanceEn.problem.items.map((item) => item.title));
    // plain numbers in circles, never "01" (guide §12)
    expect(texts(html, "span", ' aria-hidden="true"[^>]*')).toEqual(["1", "2", "3", "4", "5"]);
    expect(html).toContain('<a href="#urgency"');
    expect(texts(html, "b")).toEqual(["Up next →"]);
  });

  it("RoleCards shows the five roles in order, the same for the urgency and the outcome", () => {
    const urgency = texts(renderToStaticMarkup(<RoleCards roles={enhanceEn.urgency.roles} surface="white" />), "h3");
    const outcome = texts(renderToStaticMarkup(<RoleCards roles={enhanceEn.outcome.roles} surface="sky-wash" />), "h3");
    expect(urgency).toHaveLength(5);
    expect(outcome).toEqual(urgency);
  });

  it("SystemsDiagram lists each system and the hub", () => {
    const html = renderToStaticMarkup(<SystemsDiagram {...enhanceEn.systems.diagram} />);
    expect(texts(html, "li")).toEqual(enhanceEn.systems.diagram.sources);
    expect(texts(html, "p")).toEqual(["DEUS Enhance"]);
  });
});

describe("ReviewToPay (the hero's review-to-pay loop, F72)", () => {
  const [kpi, appraisal, calibration, bonus] = enhanceEn.hero.sequence.steps;
  const html = renderToStaticMarkup(
    <ReviewToPay
      caption={enhanceEn.hero.sequence.caption}
      frames={[
        { label: kpi.label, image: { ...images.enhancePaCycle, alt: kpi.alt } },
        { label: appraisal.label, image: { ...images.enhancePaDashboard, alt: appraisal.alt } },
        { label: calibration.label, image: { ...images.enhanceCalibrationMatrix, alt: calibration.alt } },
        { label: bonus.label, image: { ...images.enhanceBonusDashboard, alt: bonus.alt } },
      ]}
    />,
  );

  it("names the four steps in order, KPI to bonus, under its caption", () => {
    expect(texts(html, "figcaption")).toEqual(["From review to pay decision"]);
    expect(texts(html, "span", ' class="rtp-label[^"]*"')).toEqual(["KPIs", "Appraisal", "Calibration", "Bonus"]);
  });

  it("shows each step's screen", () => {
    for (const step of [kpi, appraisal, calibration, bonus]) expect(html).toContain(`alt="${step.alt.replace(/'/g, "&#x27;")}"`);
    expect(html.match(/class="rtp-frame /g)).toHaveLength(4);
  });

  it("rests paused until script sees it on screen, and takes focus so it can be paused", () => {
    expect(html).not.toContain("data-playing");
    expect(html).toMatch(/<figure[^>]*tabindex="0"/i);
  });
});
