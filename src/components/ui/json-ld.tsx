import { serializeJsonLd } from "@/lib/structured-data";

/** Structured data for search engines, as a JSON-LD script. Renders nothing visible. */
export function JsonLd({ data }: { data: unknown }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }} />;
}
