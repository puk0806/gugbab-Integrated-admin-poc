import type { Meta, StoryFn, StoryObj } from '@storybook/react';
import { Chip } from '@components';

const meta: Meta<typeof Chip> = {
  title: 'Components/Chip',
  component: Chip,
  tags: ['autodocs'],
  argTypes: {
    children: { control: 'text' },
  },
};

export default meta;

// Chip.displayName = 'Chip';
export const Default: Story = {
  args: {
    children: '텍스트',
  },
};

type Story = StoryObj<typeof Chip>;

export const Filled: StoryFn<typeof Chip> = ({ children = '텍스트입력' }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      <Chip>{children}</Chip>
      <Chip color="accent-red">{children}</Chip>
      <Chip color="green">{children}</Chip>
      <Chip color="navi">{children}</Chip>
    </div>
  );
};

export const LightOutlined: StoryFn<typeof Chip> = ({ children = '텍스트입력' }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      <Chip color="red" variant="light-outlined">
        {children}
      </Chip>
      <Chip color="accent-red" variant="light-outlined">
        {children}
      </Chip>
      <Chip color="green" variant="light-outlined">
        {children}
      </Chip>
      <Chip color="navi" variant="light-outlined">
        {children}
      </Chip>
      <Chip color="gray700" variant="light-outlined">
        {children}
      </Chip>
    </div>
  );
};

export const Outlined: StoryFn<typeof Chip> = ({ children = '텍스트입력' }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      <Chip color="red" variant="outlined">
        {children}
      </Chip>
      <Chip color="accent-red" variant="outlined">
        {children}
      </Chip>
      <Chip color="green" variant="outlined">
        {children}
      </Chip>
      <Chip color="navi" variant="outlined">
        {children}
      </Chip>
      <Chip color="negative-red" variant="outlined">
        {children}
      </Chip>
      <Chip color="orange" variant="outlined">
        {children}
      </Chip>
      <Chip color="gray900" variant="outlined">
        {children}
      </Chip>
    </div>
  );
};
