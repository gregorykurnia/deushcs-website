import { ogTitles } from "@/lib/og";
import { renderOgImage } from "@/lib/og-image";

// `/og/<name>.png`: the Open Graph image of one public page or story (Task 7.2). Built at deploy time;
// a name that isn't a page is a 404, so the route never prints text a visitor chose.

export function generateStaticParams() {
  return Object.keys(ogTitles()).map((name) => ({ name: `${name}.png` }));
}

export async function GET(_request: Request, { params }: { params: Promise<{ name: string }> }) {
  const { name } = await params;
  const title = ogTitles()[name.replace(/\.png$/, "")];
  if (!title) return new Response("Not found", { status: 404 });
  return renderOgImage(title);
}
