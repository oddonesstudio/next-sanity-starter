import { sanityFetch } from "./live";
import { HOME_PAGE_QUERY, SITE_SETTINGS_QUERY } from "./queries";

export async function getHomePage() {
  const { data } = await sanityFetch({ query: HOME_PAGE_QUERY });
  return data;
}

export async function getSiteSettings() {
  const { data } = await sanityFetch({ query: SITE_SETTINGS_QUERY });
  return data;
}
