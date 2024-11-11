import { mergeConfig } from "vite";
import { resolve } from "path";
const UI_SASS_PATH = resolve("../../packages/ui-sass");
const UI_VANILLA_EXTRACT_PATH = resolve("../../packages/ui-vanilla-extract");

/** @type { import('@storybook/react-vite').StorybookConfig } */
const config = {
  stories: ["../stories/**/*.stories.@(js|jsx|mjs|ts|tsx|mdx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  docs: {
    autodocs: true,
  },
  async viteFinal(config) {
    return mergeConfig({
      ...config,
      resolve: {
        alias: [
          {
            find: "@components",
            replacement: `${UI_SASS_PATH}/src/components`,
          },
          {
            find: "@types",
            replacement: `${UI_SASS_PATH}/src/types`,
          },
          {
            find: "@utils",
            replacement: `${UI_SASS_PATH}/src/utils`,
          },
        ],
      },
      define: {
        "process.env": {},
      },
      css: {
        postcss: null,
      },
    });
  },
};

export default config;
