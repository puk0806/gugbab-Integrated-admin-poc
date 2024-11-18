import type { Meta } from '@storybook/react';
import { Icon } from '@components';
import { StoryObj } from '@storybook/react';

const meta: Meta<typeof Icon> = {
  title: 'Components/Icon',
  component: Icon,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Icon>;

export const Default: Story = {
  args: {
    name: 'edit',
    irName: 'test',
  },
};
