import path from "node:path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./"),
    },
  },
  test: {
    environment: "jsdom",
    globals: true,
    pool: "vmThreads",
    setupFiles: ["./vitest.setup.ts"],
    include: [
      "app/**/*.{test,spec}.{ts,tsx}",
      "lib/**/*.{test,spec}.{ts,tsx}",
      "ui/**/*.{test,spec}.{ts,tsx}",
    ],
    exclude: ["node_modules", ".next", "storybook-static"],
  },
});
