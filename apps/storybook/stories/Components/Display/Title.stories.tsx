import type { Meta, StoryObj } from '@storybook/react';
import { Icon, Title } from '@components';

const meta: Meta<typeof Title> = {
  title: 'Components/Title',
  component: Title,
  tags: ['autodocs'],
  argTypes: {
    aside: { control: {} },
    children: { control: {} },
  },
};

export default meta;
type Story = StoryObj<typeof Title>;
Title.displayName = 'Title';

export const Default: Story = {
  args: {
    title: '타이틀 제목',
  },
  render: args => <Title {...args}></Title>,
};

export const asideUnit: Story = {
  args: {
    title: '타이틀 제목',
    highlightedTextProps: {
      highlightedText: '제목',
    },
    aside: <Icon color="grayscale-gray300" name="arrow_up" size={28} />,
  },
  render: args => <Title {...args}></Title>,
};
