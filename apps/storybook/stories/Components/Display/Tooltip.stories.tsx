import type { Meta, StoryFn, StoryObj } from '@storybook/react';
import { Icon, Tooltip, Typography } from '@components';

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  argTypes: {},
  decorators: [
    Story => (
      <div style={{ margin: '3em' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

const AnchorNode = (
  <span style={{ display: 'flex', alignItems: 'center' }}>
    오픈 <Icon irName="열기" name="check" size={24} />
  </span>
);

const Template: StoryFn<typeof Tooltip> = args => {
  return (
    <Tooltip {...args} anchor={AnchorNode}>
      <Typography variant="B1">Tooltip 내용</Typography>
    </Tooltip>
  );
};

export const Default: Story = {
  args: {
    anchor: AnchorNode,
    isFirstRenderVisible: true,
  },
  render: Template,
};

export const placement: Story = {
  args: {
    anchor: AnchorNode,
    placement: 'top-start',
  },
  render: Template,
};

export const square: Story = {
  args: {
    anchor: AnchorNode,
    type: 'square',
  },
  render: Template,
};
