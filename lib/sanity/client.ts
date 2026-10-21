import { createClient } from "next-sanity";

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-10-21",
  useCdn: true,
  perspective: "published",
  stega: {
    studioUrl: process.env.NEXT_PUBLIC_SANITY_STUDIO_URL || "http://localhost:3333",
  },
});
