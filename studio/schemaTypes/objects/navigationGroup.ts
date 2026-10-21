import { defineArrayMember, defineField, defineType } from "sanity";

export const navigationGroupSchema = defineType({
  name: "navigationGroup",
  title: "Navigation Group",
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
      name: "links",
      title: "Links",
      type: "array",
      of: [defineArrayMember({ type: "navigationLink" })],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
});
