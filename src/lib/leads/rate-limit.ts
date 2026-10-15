import { createHash, randomBytes } from "node:crypto";
import { and, count, eq, gt, sql } from "drizzle-orm";
import { getDb } from "@/db/client";
import { leads } from "@/db/schema";

/** At most 5 leads per IP in any 10 minutes (plan §5). */
export const RATE_LIMIT = { max: 5, windowMinutes: 10 } as const;

let fallbackSalt: string | undefined;

function salt(): string {
  const configured = process.env.LEAD_IP_SALT;
  if (configured) return configured;
  // Without the env var, a per-instance random salt still keeps the raw IP out
  // of the database. The rate limit then only holds within one instance.
  if (!fallbackSalt) {
    console.error("[leads] LEAD_IP_SALT is not set; using a temporary salt");
    fallbackSalt = randomBytes(32).toString("hex");
  }
  return fallbackSalt;
}

/** sha256(ip + LEAD_IP_SALT). The raw IP is never stored. */
export function hashIp(ip: string): string {
  return createHash("sha256").update(ip + salt()).digest("hex");
}

/** The visitor's IP from the proxy headers. On Vercel, `x-forwarded-for` is set by the platform. */
export function clientIpFrom(headers: Headers): string {
  const forwarded = headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return forwarded || headers.get("x-real-ip")?.trim() || "unknown";
}

/** True once this IP has saved `RATE_LIMIT.max` leads within the window. */
export async function isRateLimited(ipHash: string): Promise<boolean> {
  const [{ n }] = await getDb()
    .select({ n: count() })
    .from(leads)
    .where(
      and(
        eq(leads.ipHash, ipHash),
        gt(leads.createdAt, sql`now() - make_interval(mins => ${RATE_LIMIT.windowMinutes})`),
      ),
    );
  return n >= RATE_LIMIT.max;
}
