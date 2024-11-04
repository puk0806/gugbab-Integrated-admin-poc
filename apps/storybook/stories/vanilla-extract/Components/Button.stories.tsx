import { Button, ButtonProps } from '@gugbab-integrated-admin-poc/ui-vanilla-extract';
import { Meta, StoryObj } from '@storybook/react';

const story: Meta<ButtonProps> = {
  component: Button,
  tags: ['autodocs'],
  parameters: {},
};

export default story;

export const Default: StoryObj<ButtonProps> = {
  args: {
    children: 'Button',
  },
};
