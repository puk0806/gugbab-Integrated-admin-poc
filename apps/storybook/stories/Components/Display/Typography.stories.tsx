import { Typography } from '@components';
import { Meta, StoryObj } from '@storybook/react';

const story: Meta<typeof Typography> = {
  title: 'Components/Typography',
  component: Typography,
  tags: ['autodocs'],
  parameters: {},
};

export default story;

export const Default: StoryObj<typeof Typography> = {
  args: {
    children: 'Typography',
    variant: 'D1',
    weight: 'medium',
  },
};
