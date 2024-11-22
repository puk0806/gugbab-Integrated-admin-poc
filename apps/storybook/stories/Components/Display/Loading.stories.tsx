import type { Meta } from '@storybook/react';
import { StoryObj } from '@storybook/react';
import { Loading } from '@components';
import { LoadingProps } from '@types';

const meta: Meta<typeof Loading> = {
  title: 'Components/Loading',
  component: Loading,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof Loading>;

// Loading.displayName = 'Loading';

const DefaultTemplate = (props: LoadingProps) => {
  return (
    <div>
      <Loading {...props} />
    </div>
  );
};

DefaultTemplate.displayName = 'Loading';

export const Default: Story = {
  args: {
    title: '잠시만 기다려 주세요',
    desc: '로딩중',
    variant: 'progressbar',
    percent: 59,
  },
  render: args => <DefaultTemplate {...args} />,
};

export const noneDimed: Story = {
  args: {
    title: '잠시만 기다려 주세요',
  },
  render: args => <DefaultTemplate {...args} removeDimmed />,
};

export const progressbar: Story = {
  args: {
    title: '잠시만 기다려 주세요',
    variant: 'progressbar',
    percent: 20,
  },
  render: args => <DefaultTemplate {...args} />,
};

export const removeBox: Story = {
  args: {
    title: '잠시만 기다려 주세요',
    variant: 'none',
    removeBox: true,
  },
  render: args => <DefaultTemplate {...args} />,
};
