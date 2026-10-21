import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./schemaTypes";
import { structure } from "./structure";

const projectId = process.env.SANITY_STUDIO_PROJECT_ID;
const dataset = process.env.SANITY_STUDIO_DATASET ?? "production";

if (!projectId) {
  throw new Error("Missing SANITY_STUDIO_PROJECT_ID");
}

export default defineConfig({
  name: "default",
  title: "next-sanity-starter",
  projectId,
  dataset,
  plugins: [structureTool({ structure })],
  schema: {
    types: schemaTypes,
  },
});
