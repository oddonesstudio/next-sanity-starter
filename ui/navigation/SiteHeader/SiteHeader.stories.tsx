import type { Meta, StoryObj } from "@storybook/react";

import { SiteHeader } from "./SiteHeader";

const items = [
  { label: "Work", href: "/work" },
  {
    label: "Services",
    children: [
      { label: "Strategy", href: "/services/strategy", description: "Set the right direction." },
      { label: "Design", href: "/services/design", description: "Build a distinctive experience." },
    ],
  },
  { label: "About", href: "/about" },
];

const meta = {
  title: "Navigation/Site Header",
  component: SiteHeader,
  args: { items },
  parameters: { layout: "fullscreen" },
  decorators: [
    (Story) => (
      <div className="min-h-80 bg-background pt-(--header-height)">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof SiteHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
