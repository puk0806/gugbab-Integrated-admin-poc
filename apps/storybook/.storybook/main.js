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
            find: "@ui-sass/styles",
            replacement: `${UI_SASS_PATH}/src/styles`,
          },
          {
            find: "@ui-sass/components",
            replacement: `${UI_SASS_PATH}/src/components`,
          },
          {
            find: "@ui-sass/types",
            replacement: `${UI_SASS_PATH}/src/types`,
          },
          {
            find: "@ui-sass/utils",
            replacement: `${UI_SASS_PATH}/src/types`,
          },

          {
            find: "@ui-vanilla-extract/styles",
            replacement: `${UI_VANILLA_EXTRACT_PATH}/src/styles`,
          },
          {
            find: "@ui-vanilla-extract/components",
            replacement: `${UI_VANILLA_EXTRACT_PATH}/src/components`,
          },
          {
            find: "@ui-vanilla-extract/types",
            replacement: `${UI_VANILLA_EXTRACT_PATH}/src/types`,
          },
          {
            find: "@ui-vanilla-extract/utils",
            replacement: `${UI_VANILLA_EXTRACT_PATH}/src/types`,
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
