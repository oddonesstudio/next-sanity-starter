import type { Meta, StoryObj } from "@storybook/react";

import { Hero } from "./Hero";

const meta = {
  title: "Sections/Hero",
  component: Hero,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof Hero>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    headline: "Build something worth sharing",
    headlineHighlight: "together",
    supportingText: "A reusable Next.js foundation with a flexible Sanity content layer.",
    primaryCTA: {
      label: "Start a project",
      href: "/contact",
    },
    image: {
      src: "/hero-image.jpg",
      alt: "A colourful abstract composition",
    },
  },
};

export const Minimal: Story = {
  args: {
    headline: "A focused headline",
  },
};
