import { existsSync, readFileSync } from "node:fs";
import { parseEnv } from "node:util";
import { defineConfig, devices } from "@playwright/test";

// The built site the tests run against writes leads (Task 1.9), so it must never see
// production: `.env.test` (the Neon `test` branch) goes to the server and to the test workers,
// and the email key is blanked, so no run sends mail. Its values win over anything already in
// the shell, and the run stops if the database is the one `.env.local` (production) names.
const readEnv = (file: string) => (existsSync(file) ? parseEnv(readFileSync(file, "utf8")) : {});
const fileEnv = readEnv(".env.test");
Object.assign(process.env, fileEnv);
const productionDb = readEnv(".env.local").DATABASE_URL_POOLED;
if (productionDb && process.env.DATABASE_URL_POOLED === productionDb) {
  throw new Error("e2e would write to the production database: check .env.test");
}
const testEnv = {
  DATABASE_URL_POOLED: process.env.DATABASE_URL_POOLED ?? "",
  LEAD_IP_SALT: process.env.LEAD_IP_SALT ?? "e2e-salt",
  RESEND_API_KEY: "",
};

// Override with E2E_PORT when 3100 is taken (another project's dev server, say).
// Lane worktrees (deushcs-website-p1…p3) get 3101…3103, so lanes can run e2e at the same
// time without reusing another lane's server.
const lane = /-p(\d)$/.exec(process.cwd())?.[1];
const PORT = Number(process.env.E2E_PORT ?? 3100 + Number(lane ?? 0));

export default defineConfig({
  testDir: "tests/e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: [["list"]],
  use: {
    baseURL: `http://localhost:${PORT}`,
    trace: "on-first-retry",
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: {
    command: `npm run build && npx next start -p ${PORT}`,
    url: `http://localhost:${PORT}/en`,
    // A server someone started by hand (`next dev`, `next start`) reads `.env.local`, which is
    // production, so a busy port fails the run instead of being reused. E2E_REUSE=1 opts in, for
    // a server known to run with `.env.test`.
    reuseExistingServer: process.env.E2E_REUSE === "1",
    env: testEnv,
    timeout: 240_000,
  },
});
