import type { Meta, StoryObj } from '@storybook/react';
import { SelectBox, SelectBoxProps, SelectValue } from '@components';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';

const meta: Meta<typeof SelectBox> = {
  title: 'Components/SelectBox',
  component: SelectBox,
  tags: ['autodocs'],
  parameters: {
    docs: {},
  },

  argTypes: {},
};

export default meta;

const options = [
  { value: 'test1', text: 'test1' },
  { value: 'test2', text: 'test2' },
  { value: 'test3', text: 'test3' },
  { value: 'test4', text: 'test4' },
  { value: 'test5', text: 'test5' },
  { value: 'test6', text: 'test6' },
];

const DefaultTemplate = (args: SelectBoxProps) => {
  const [value, setValue] = useState<string>();
  const handleChange = useCallback(({ name, value }: SelectValue) => {
    setValue(value);
  }, []);
  return <SelectBox {...args} value={value} onChange={handleChange} />;
};

const HookTemplate = (args: SelectBoxProps) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm<FromValue>({});

  const onSubmit = (data: FromValue) => console.log(data);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <SelectBox {...args} control={control} setValue={setValue} useLabel={true} />
      <button type="submit">submit</button>
    </form>
  );
};

type Story = StoryObj<typeof SelectBox>;
DefaultTemplate.displayName = 'SelectBox';
HookTemplate.displayName = 'SelectBox';
export const Default: Story = {
  args: {
    name: 'default-select-box',
    title: '테스트 선택',
    options,
  },
  render: args => <DefaultTemplate {...args} />,
};

export const useSystemOption: Story = {
  args: {
    name: 'default-select-box',
    title: '테스트 선택',
    useSystemOption: true,
    options,
  },
  parameters: {
    docs: {
      description: {},
    },
  },
  render: args => <DefaultTemplate {...args} />,
};

export const Variant: Story = {
  render: args => <DefaultTemplate {...args} />,
  args: {
    name: 'variant-select-box',
    variant: 'box-small',
    options,
  },
};

type FromValue = {
  [key in string]: string;
};

export const ReactHookFrom: Story = {
  render: args => <HookTemplate {...args} />,
  args: {
    name: 'hook-form-select-box',
    title: '테스트 선택',
    options,
  },
};

export const useLabel: Story = {
  render: args => <DefaultTemplate {...args} />,
  args: {
    name: 'variant-select-box',
    title: '테스트 선택',
    useLabel: true,
    options,
  },
};
