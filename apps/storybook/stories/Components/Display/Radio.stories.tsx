import type { Meta, StoryObj } from '@storybook/react';
import { Radio } from '@components';

const meta: Meta<typeof Radio> = {
  title: 'Components/Radio',
  component: Radio,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Radio>;
Radio.displayName = 'Radio';
export const Default: Story = {
  args: {
    label: 'Radio',
  },
};

export const Reverse: Story = {
  args: {
    reverse: true,
    label: 'Radio',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    checked: true,
    label: 'Radio',
  },
};

export const Hidden: Story = {
  args: {
    hidden: true,
    label: 'Radio',
  },
  parameters: {
    docs: {
      description: {
        story: '`RadioGroup` 사용시에 `design-tab` 형태를 사용할 경우 텍스만 표기하는 용도로만 사용합니다.',
      },
    },
  },
};
