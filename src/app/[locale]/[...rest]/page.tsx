import { notFound } from "next/navigation";

// Any path under a locale that no route matches shows the localized 404 (not-found.tsx).
export default function CatchAllPage() {
  notFound();
}
