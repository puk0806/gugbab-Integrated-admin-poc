import { mergeConfig } from "vite";
import { resolve } from "path";
const UI_SASS_PATH = resolve("../../packages/ui-sass");
const ICONS_PATH = resolve("../../packages/icons");
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
  typescript: {
    check: true,
    // react-docgen-typescript not working atm
    reactDocgen: "react-docgen-typescript",
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      shouldRemoveUndefinedFromOptional: true,
      propFilter: (prop) =>
        prop.parent ? !/node_modules/.test(prop.parent.fileName) : true,
    },
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
          {
            find: "@hooks",
            replacement: `${UI_SASS_PATH}/src/hooks`,
          },
          {
            find: "@icons",
            replacement: `${ICONS_PATH}/dist`,
          },
        ],
      },
      define: {
        "process.env": {},
      },
      css: {
        postcss: null,
        preprocessorOptions: {
          scss: {
            includePaths: [resolve(UI_SASS_PATH)],
          },
        },
      },
    });
  },
};

export default config;
