import { defineField, defineType, type StringRule } from "sanity";

const hrefValidation = (Rule: StringRule) =>
  Rule.required().custom((value) => {
    if (typeof value !== "string" || value.startsWith("/") || /^https?:\/\//.test(value)) {
      return true;
    }

    return "Use a relative path beginning with /, or a full http(s) URL.";
  });

export const navigationLinkSchema = defineType({
  name: "navigationLink",
  title: "Navigation Link",
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
      validation: hrefValidation,
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "string",
      description: "Used for links in the desktop navigation dropdown.",
      validation: (Rule) => Rule.max(120),
    }),
  ],
});
