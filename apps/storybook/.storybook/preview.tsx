import React from "react";
import { Preview } from "@storybook/react";
import '@gugbab-integrated-admin-poc/icons/dist/icons.css';

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
