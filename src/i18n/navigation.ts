import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

// Locale-aware wrappers around Next's navigation APIs. Internal links use this Link,
// so `/clients` renders as `/en/clients` or `/id/clients`.
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
