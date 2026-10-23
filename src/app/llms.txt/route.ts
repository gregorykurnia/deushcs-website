import { llmsTxt } from "@/lib/llms";

// `/llms.txt` (GEO §S5, Task G1.8): the site's pages with a one-line summary each, in the llmstxt.org format.
export function GET() {
  return new Response(llmsTxt(), { headers: { "content-type": "text/plain; charset=utf-8" } });
}
