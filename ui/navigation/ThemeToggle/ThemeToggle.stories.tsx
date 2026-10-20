import type { Meta, StoryObj } from "@storybook/react";

import { ThemeToggle } from "./ThemeToggle";

const meta = {
  title: "Navigation/Theme Toggle",
  component: ThemeToggle,
  decorators: [
    (Story) => (
      <div className="flex min-h-32 items-center justify-end p-6">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ThemeToggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
