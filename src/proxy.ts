import createMiddleware from "next-intl/middleware";
import { NextResponse, type NextRequest } from "next/server";
import { unknownStoryRewrite } from "./content/stories/paths";
import { routing } from "./i18n/routing";

const intl = createMiddleware(routing);

export default function proxy(request: NextRequest) {
  const missing = unknownStoryRewrite(request.nextUrl.pathname);
  if (missing) return NextResponse.rewrite(new URL(missing, request.url));
  return intl(request);
}

export const config = {
  // Skip API routes, Next internals and anything with a file extension (robots.txt, icons, images).
  matcher: ["/((?!api|trpc|_next|_vercel|.*\\..*).*)"],
};
