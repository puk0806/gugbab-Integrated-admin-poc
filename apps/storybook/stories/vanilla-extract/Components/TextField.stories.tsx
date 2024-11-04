import { TextField, TextFieldProps } from '@gugbab-integrated-admin-poc/ui-vanilla-extract';
import { Meta, StoryObj } from '@storybook/react';

const story: Meta<TextFieldProps> = {
  component: TextField,
  tags: ['autodocs'],
  parameters: {},
};

export default story;

export const Default: StoryObj<TextFieldProps> = {
  args: {
    placeholder: 'TextField',
  },
};
