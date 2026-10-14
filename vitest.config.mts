import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: { tsconfigPaths: true },
  test: {
    environment: "node",
    include: ["tests/{unit,db,leads}/**/*.test.ts"],
    passWithNoTests: true,
  },
});
