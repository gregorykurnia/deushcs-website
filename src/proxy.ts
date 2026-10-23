import createMiddleware from "next-intl/middleware";
import { NextResponse, type NextRequest } from "next/server";
import { unknownGuideRewrite } from "./content/guides/paths";
import { unknownStoryRewrite } from "./content/stories/paths";
import { unknownUseCaseRewrite } from "./content/use-cases/paths";
import { routing } from "./i18n/routing";

const intl = createMiddleware(routing);

export default function proxy(request: NextRequest) {
  // `skipTrailingSlashRedirect` (next.config.ts) leaves the slash to us: `/en/about/` → `/en/about`.
  const { pathname } = request.nextUrl;
  if (pathname.length > 1 && pathname.endsWith("/")) {
    const stripped = pathname.replace(/\/+$/, "") || "/";
    return NextResponse.redirect(new URL(`${stripped}${request.nextUrl.search}`, request.url), 308);
  }
  const missing =
    unknownStoryRewrite(request.nextUrl.pathname) ??
    unknownUseCaseRewrite(request.nextUrl.pathname) ??
    unknownGuideRewrite(request.nextUrl.pathname);
  if (missing) return NextResponse.rewrite(new URL(missing, request.url));
  return intl(request);
}

export const config = {
  // Skip API routes, Next internals and anything with a file extension (robots.txt, icons, images).
  matcher: ["/((?!api|trpc|_next|_vercel|.*\\..*).*)"],
};
