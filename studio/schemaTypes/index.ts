import { heroSchema, homePageSchema, siteSettingsSchema } from "./documents";
import { navigationGroupSchema, navigationLinkSchema } from "./objects";
import { callToActionSchema } from "./objects/callToAction";

export const schemaTypes = [
  homePageSchema,
  heroSchema,
  siteSettingsSchema,
  navigationGroupSchema,
  navigationLinkSchema,
  callToActionSchema,
];

export const singletonTypes = ["homePage", "siteSettings"] as const;
