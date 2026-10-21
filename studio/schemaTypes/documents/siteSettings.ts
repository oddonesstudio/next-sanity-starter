import { defineArrayMember, defineField, defineType } from "sanity";

export const siteSettingsSchema = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  groups: [
    { name: "header", title: "Header" },
    { name: "footer", title: "Footer" },
    { name: "navigation", title: "Navigation" },
    { name: "seo", title: "Default SEO" },
  ],
  fields: [
    defineField({
      name: "siteTitle",
      title: "Site Title",
      type: "string",
    }),
    // NAVIGATION
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "headerNavigation",
      title: "Header navigation",
      type: "array",
      group: "navigation",
      of: [
        defineArrayMember({ type: "navigationGroup" }),
        defineArrayMember({ type: "navigationLink" }),
      ],
      validation: (Rule) => Rule.required().max(6),
    }),
    defineField({
      name: "footerNavigation",
      title: "Footer navigation",
      type: "array",
      group: "navigation",
      of: [defineArrayMember({ type: "navigationGroup" })],
    }),
    // FOOTER
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
      group: "footer",
    }),
    defineField({
      name: "copyright",
      title: "Copyright Text",
      type: "string",
      group: "footer",
    }),
    // SEO
    defineField({
      name: "metaTitle",
      title: "Meta Title",
      type: "string",
      group: "seo",
    }),
    defineField({
      name: "metaDescription",
      title: "Meta Description",
      type: "text",
      rows: 3,
      group: "seo",
    }),
    defineField({
      name: "ogImage",
      title: "OG Image",
      type: "image",
      group: "seo",
      options: { hotspot: true },
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Site Settings",
      };
    },
  },
});
