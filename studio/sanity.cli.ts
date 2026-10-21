import { defineCliConfig } from "sanity/cli";

export default defineCliConfig({
  api: {
    projectId: "n64xcpva",
    dataset: "production",
  },
  deployment: {
    /**
     * Enable auto-updates for studios.
     * Learn more at https://www.sanity.io/docs/studio/latest-version-of-sanity#k47faf43faf56
     */
    autoUpdates: true,
  },
  typegen: {
    enabled: true,
    path: "../lib/sanity/**/*.{ts,tsx}",
    schema: "./schema.json",
    generates: "../lib/sanity/sanity.types.ts",
  },
});
