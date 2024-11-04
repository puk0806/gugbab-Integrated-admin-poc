import { Typography, TypographyProps } from '@gugbab-integrated-admin-poc/ui-vanilla-extract';
import { Meta, StoryObj } from '@storybook/react';

const story: Meta<TypographyProps> = {
  component: Typography,
  tags: ['autodocs'],
  parameters: {},
};

export default story;

export const Default: StoryObj<TypographyProps> = {
  args: {
    children: 'Typography',
  },
};
