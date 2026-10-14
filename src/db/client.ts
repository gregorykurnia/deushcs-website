import { drizzle, type NeonHttpDatabase } from "drizzle-orm/neon-http";
import * as schema from "./schema";

let instance: NeonHttpDatabase<typeof schema> | undefined;

// The app connects through the pooled URL (DATABASE_URL is for migrations).
// Created on first use, so a build without database env vars still succeeds.
export function getDb(): NeonHttpDatabase<typeof schema> {
  if (!instance) {
    const url = process.env.DATABASE_URL_POOLED;
    if (!url) throw new Error("DATABASE_URL_POOLED is not set");
    instance = drizzle(url, { schema });
  }
  return instance;
}
