import React from "react";
import { Preview } from "@storybook/react";

import './markdown.css';
import "../../../packages/ui-sass/public/styles/components.scss";

const preview: Preview = {
  decorators: [
    (Story) => {
      return <Story />;
    },
  ],
};

export default preview;
