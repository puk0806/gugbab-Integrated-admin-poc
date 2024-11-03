import React, { useState } from "react";
import { Preview } from "@storybook/react";

const preview: Preview = {
  decorators: [
    (Story) => {
      return <Story />;
    },
  ],
};

export default preview;
