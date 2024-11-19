import type { Meta, StoryObj } from '@storybook/react';
import { ChangeEvent } from 'react';
import { Checkbox } from '@components';
import { useForm } from 'react-hook-form';

const meta: Meta<typeof Checkbox> = {
  component: Checkbox,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: '체크박스를 여러개 사용시 `CheckboxGroup` Component 하위로 구성합니다.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;
Checkbox.displayName = 'Checkbox';
export const Default: Story = {
  args: {
    label: '체크 내용',
  },
};

export const Reverse: Story = {
  args: {
    reverse: true,
    label: '체크 내용',
  },
};

export const HiddenCheckbox: Story = {
  args: {
    hiddenElement: 'checkbox',
    label: 'Checkbox',
  },
  parameters: {
    docs: {
      description: {
        story: '`CheckboxGroup` 사용시에 `design-tab` 형태를 사용할 경우 텍스만 표기하는 용도로만 사용합니다.',
      },
    },
  },
};

export const HiddenLabel: Story = {
  args: {
    hiddenElement: 'label',
    label: 'Checkbox',
  },
};

export const borderType: Story = {
  args: {
    label: '체크 내용',
    borderType: 'circle',
  },
};

type FromValue = { outcode: boolean };
export const registerHookform: Story = {
  args: {
    label: '체크 내용',
  },
  render: args => {
    const { handleSubmit, register } = useForm<FromValue>({});
    const onSubmit = (data: FromValue) => console.log(data);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      console.log(e.currentTarget.checked);
    };

    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <Checkbox {...args} {...register('outcode')} onChange={handleChange} />
        <div>
          <button type="submit">submit</button>
        </div>
      </form>
    );
  },
};
