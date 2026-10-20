import type { Meta, StoryObj } from "@storybook/react";

import { SiteFooter } from "./SiteFooter";

const items = [
  {
    label: "Company",
    children: [
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    label: "Social",
    children: [
      { label: "Instagram", href: "/instagram" },
      { label: "LinkedIn", href: "/linkedin" },
    ],
  },
];

const meta = {
  title: "Navigation/Site Footer",
  component: SiteFooter,
  args: { items },
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof SiteFooter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
