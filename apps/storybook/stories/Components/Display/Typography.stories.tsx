import { TypographyProps } from '@types';
import { Typography } from '@components';
import { Meta, StoryObj } from '@storybook/react';

const story: Meta<TypographyProps> = {
  title: 'Components/Typography',
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
