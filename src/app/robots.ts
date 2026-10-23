import type { MetadataRoute } from "next";
import { isIndexable, siteUrl } from "@/lib/metadata";

// Disallow everything until SITE_INDEXABLE=true (Task 7.5). The page-level `noindex` meta is the
// second lock: robots.txt alone doesn't stop a linked URL from being listed.
export default function robots(): MetadataRoute.Robots {
  if (!isIndexable()) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return { rules: { userAgent: "*", allow: "/" }, sitemap: new URL("/sitemap.xml", siteUrl()).toString() };
}
