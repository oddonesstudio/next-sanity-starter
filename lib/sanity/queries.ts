import { defineQuery } from "next-sanity";

export const HOME_PAGE_QUERY = defineQuery(`
  *[_type == "homePage"][0]{
    _id,
    _type,
    title,
    sections[]->{
      _id,
      _type,
      _type == "hero" => {
        headline,
        headlineHighlight,
        supportingText,
        image {
          alt,
          asset,
          crop,
          hotspot,
        },
        primaryCTA {
          label,
          href,
        }
      },
    }
  }
`);

export const SITE_SETTINGS_QUERY = defineQuery(`
  *[_type == "siteSettings"][0]{
    siteTitle,
    tagline,
    copyright,
    "headerNavigation": headerNavigation[]{
      _type == "navigationGroup" => {
        label,
        "children": links[]{
          label,
          href,
          description,
        },
      },
      _type == "navigationLink" => {
        label,
        href,
        description,
      },
    },
    "footerNavigation": footerNavigation[]{
      label,
      "children": links[]{
        label,
        href,
        description,
      },
    },
  }
`);
