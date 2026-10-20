import type { Meta, StoryObj } from "@storybook/react";

import { Section } from "./Section";

const meta = {
  title: "Layout/Section",
  component: Section,
  args: { anchorId: "example-section", children: "A vertically-spaced page section." },
  decorators: [
    (Story) => (
      <div className="bg-muted px-6">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Section>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
