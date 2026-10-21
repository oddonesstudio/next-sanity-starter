import { defineField, defineType } from "sanity";

export const callToActionSchema = defineType({
  name: "callToAction",
  title: "CTA",
  type: "object",
  options: {
    collapsible: true,
  },
  fields: [
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      validation: (Rule) => Rule.required().max(40),
    }),
    defineField({
      name: "href",
      title: "Link",
      type: "string",
      description: "For example /contact or https://example.com.",
      validation: (Rule) => Rule.required(),
    }),
  ],
});
