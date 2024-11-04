import React, { useState } from "react";
import { Preview } from "@storybook/react";
import {
  Radio,
  ThemeProvider,
  ThemeType,
} from "@gugbab-integrated-admin-poc/ui-vanilla-extract";

const VANILLA_EXTRACT_FILE = "vanilla-extract";

const preview: Preview = {
  decorators: [
    (Story, context) => {
      const [themeMode, setThemeMode] = useState<ThemeType>("light");

      const toggleTheme = () => {
        setThemeMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      };

      const isSpecialFolder = context.id.includes(VANILLA_EXTRACT_FILE);

      if (!isSpecialFolder) {
        return <Story />;
      }

      return (
        <ThemeProvider theme={themeMode}>
          <div>
            <Radio
              label={"Light Theme"}
              onChange={toggleTheme}
              checked={themeMode === "light"}
            />
            <Radio
              label={"Dark Theme"}
              onChange={toggleTheme}
              checked={themeMode === "dark"}
            />
            <Story />
          </div>
        </ThemeProvider>
      );
    },
  ],
};

export default preview;
