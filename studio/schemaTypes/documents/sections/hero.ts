import { defineField, defineType } from "sanity";
import { requireAltTextIfImagePresent } from "../../utils/imageAltValidation";

export const heroSchema = defineType({
  name: "hero",
  title: "Hero",
  type: "document",
  fields: [
    defineField({
      name: "headline",
      title: "Headline",
      type: "string",
      validation: (Rule) => Rule.required().max(120),
    }),
    defineField({
      name: "headlineHighlight",
      title: "Headline Highlight",
      type: "string",
      description: "The word or phrase in the headline that receives the gradient highlight.",
    }),
    defineField({
      name: "supportingText",
      title: "Supporting text",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.max(240),
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt text",
          type: "string",
          hidden: ({ parent }) => !parent?.asset,
        }),
      ],
      validation: (Rule) => Rule.custom(requireAltTextIfImagePresent),
    }),
    defineField({
      name: "primaryCTA",
      title: "Primary CTA",
      type: "callToAction",
    }),
  ],
  preview: {
    select: {
      title: "headline",
      media: "image",
    },
    prepare(value) {
      const { title, media } = value;

      return {
        title,
        media,
      };
    },
  },
});
