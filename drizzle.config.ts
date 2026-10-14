import { defineConfig } from "drizzle-kit";

// DATABASE_URL is the direct (non-pooled) Neon connection, used for migrations only.
export default defineConfig({
  dialect: "postgresql",
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dbCredentials: { url: process.env.DATABASE_URL ?? "" },
});
