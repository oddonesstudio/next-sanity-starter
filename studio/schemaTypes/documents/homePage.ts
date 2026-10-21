import { defineArrayMember, defineField, defineType } from "sanity";

export const homePageSchema = defineType({
  name: "homePage",
  title: "Home Page",
  type: "document",
  fields: [
    defineField({
      name: "sections",
      title: "Sections",
      type: "array",
      of: [
        defineArrayMember({
          name: "section",
          type: "reference",
          to: [{ type: "hero" }],
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Home Page",
      };
    },
  },
});
