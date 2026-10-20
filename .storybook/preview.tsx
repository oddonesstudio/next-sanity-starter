import type { Preview } from "@storybook/react";

import "../app/styles/globals.css";
import { ThemeProvider } from "../components/ThemeProvider";

const preview: Preview = {
  decorators: [
    (Story) => (
      <ThemeProvider>
        <div className="font-sans bg-background text-foreground min-h-screen">
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
  parameters: {
    backgrounds: {
      options: { page: { name: "Page", value: "var(--page-background)" } },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
      exclude: ["className", "onClick", "iconLeft", "iconRight"],
    },
  },
  initialGlobals: {
    backgrounds: { value: "page" },
  },
  tags: ["autodocs"],
};

export default preview;
