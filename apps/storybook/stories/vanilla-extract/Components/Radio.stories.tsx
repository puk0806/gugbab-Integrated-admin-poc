import { Radio, RadioProps } from '@gugbab-integrated-admin-poc/ui-vanilla-extract';
import { Meta, StoryObj } from '@storybook/react';

const story: Meta<RadioProps> = {
  component: Radio,
  tags: ['autodocs'],
  parameters: {},
};

export default story;

export const Default: StoryObj<RadioProps> = {
  args: {
    label: 'Radio',
  },
};
