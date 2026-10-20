import type { Meta, StoryObj } from "@storybook/react";

import { Container } from "./Container";

const meta = {
  title: "Layout/Container",
  component: Container,
  args: { children: "Content stays centred and respects the site gutter." },
  decorators: [
    (Story) => (
      <div className="bg-muted py-8">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Container>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
