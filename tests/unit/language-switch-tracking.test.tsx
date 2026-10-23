import { isValidElement, type ReactElement, type ReactNode } from "react";
import { describe, expect, it, vi } from "vitest";

const track = vi.hoisted(() => vi.fn());
vi.mock("@/lib/analytics", () => ({ track }));
// The component is called directly, not rendered, so its next-intl and router reads are plain functions.
vi.mock("next-intl", () => ({
  useLocale: () => "en",
  useTranslations: () => (key: string) => key,
}));
vi.mock("@/i18n/navigation", () => ({
  Link: () => null,
  usePathname: () => "/contact",
}));

const { Link } = await import("@/i18n/navigation");
const { LanguageSwitch } = await import("@/components/site/LanguageSwitch");

type LinkElement = ReactElement<{ locale?: string; onClick?: () => void; children?: ReactNode }>;

/** Every Link in the element tree the component returns. */
function links(node: ReactNode): LinkElement[] {
  if (Array.isArray(node)) return node.flatMap(links);
  if (!isValidElement<{ children?: ReactNode }>(node)) return [];
  const own = node.type === Link ? [node as LinkElement] : [];
  return [...own, ...links(node.props.children)];
}

describe("LanguageSwitch tracking", () => {
  it("reports a switch to another language, then lets the link navigate", () => {
    const onNavigate = vi.fn();
    const toIndonesian = links(LanguageSwitch({ available: ["en", "id"], onNavigate })).find(
      (link) => link.props.locale === "id",
    );

    expect(toIndonesian).toBeDefined();
    toIndonesian?.props.onClick?.();

    expect(track).toHaveBeenCalledWith("language_switch", { from: "en", to: "id" });
    expect(onNavigate).toHaveBeenCalledOnce();
  });
});
