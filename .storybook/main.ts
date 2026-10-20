import type { StorybookConfig } from "@storybook/nextjs-vite";

const config: StorybookConfig = {
  stories: ["../ui/**/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: ["@storybook/addon-designs"],
  framework: {
    name: "@storybook/nextjs-vite",
    options: {},
  },
  staticDirs: ["../public"],
};
export default config;
