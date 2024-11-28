import type { Meta, StoryObj } from '@storybook/react';
import { Flex, Icon } from '@components';

const meta: Meta<typeof Flex> = {
  title: 'Components/Flex',
  component: Flex,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;

export const Default: StoryObj<typeof Flex> = {
  args: {
    children: 'Flex',
  },
  render: args => (
    <Flex style={{ width: '100%' }} {...args}>
      <Icon name="human" />
      <Icon name="human" />
    </Flex>
  ),
};

export const Justify: StoryObj<typeof Flex> = {
  args: {
    children: 'Flex',
  },
  render: args => (
    <Flex justify="space-between" {...args}>
      <Icon name="human" />
      <Icon name="human" />
    </Flex>
  ),
};

export const Gap: StoryObj<typeof Flex> = {
  args: {
    children: 'Flex',
  },
  render: args => (
    <Flex gap="0 10px" {...args}>
      <Icon name="human" />
      <Icon name="human" />
    </Flex>
  ),
};
