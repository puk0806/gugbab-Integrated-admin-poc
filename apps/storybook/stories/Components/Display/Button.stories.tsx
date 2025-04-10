import type { Meta, StoryObj, StoryFn } from '@storybook/react';
import { Button, ButtonProps } from '@components';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: { type: 'text' },
    },
    component: {
      control: false,
    },
    typographyProps: {
      control: false,
    },
    iconProps: {
      control: false,
    },
    ref: {
      control: false,
    },
  },
};

export default meta;

export const Default: StoryObj<typeof Button> = {
  args: {
    children: '버튼명',
  },
};

const iconProps: ButtonProps['iconProps'] = {
  name: 'circle_close',
  size: 20,
};
export const Primary: StoryFn<typeof Button> = ({ size }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      <Button size={size}>Primary</Button>
      <Button size={size} disabled>
        disabled
      </Button>
      <Button iconProps={iconProps} size={size}>
        LeftIcon
      </Button>
      <Button iconPosition="right" iconProps={iconProps} size={size}>
        RightIcon
      </Button>
    </div>
  );
};

export const Secondary: StoryFn<typeof Button> = ({ size }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      <Button color="secondary" size={size}>
        Primary
      </Button>
      <Button color="secondary" size={size} disabled>
        disabled
      </Button>
      <Button color="secondary" iconProps={iconProps} size={size}>
        LeftIcon
      </Button>
      <Button color="secondary" iconPosition="right" iconProps={iconProps} size={size}>
        RightIcon
      </Button>
    </div>
  );
};

export const FullButton: StoryFn<typeof Button> = arg => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      <Button color="secondary" isFullWidth {...arg}>
        버튼명
      </Button>
      <Button isFullWidth {...arg}>
        버튼명
      </Button>
    </div>
  );
};

export const CustomWidthButton: StoryObj<typeof Button> = {
  args: {
    children: '버튼명',
    size: 'small',
    minWidth: '100px',
  },
};

export const HeightFixedButton: StoryObj<typeof Button> = {
  args: {
    children: '버튼명',
    height: '48px',
  },
};

export const CustomTypo: StoryObj<typeof Button> = {
  args: {
    children: '버튼명',
    typographyProps: {
      color: 'accent-negative-red',
    },
  },
};

export const Link: StoryObj<typeof Button> = {
  args: {
    children: '국밥 블로그 링크테스트',
    component: 'a',
    href: 'https://puk0806.tistory.com/',
  },
};
