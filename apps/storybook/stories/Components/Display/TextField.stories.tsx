import type { Meta, StoryObj } from '@storybook/react';
import { StoryFn } from '@storybook/react';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { Button, Icon, TextField, TextFieldProps, Typography } from '@components';

const meta: Meta<typeof TextField> = {
  title: 'Components/TextField',
  component: TextField,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: '개발자도구 console.log 를 확인하세요.',
      },
    },
  },
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof TextField>;
TextField.displayName = 'TextField';

const DefaultTemplate = (args: TextFieldProps) => {
  const [value, setValue] = useState('');
  return <TextField {...args} value={value} onChange={(e, val) => setValue(val)} />;
};
DefaultTemplate.displayName = 'TextField';

export const Default: StoryFn<typeof TextField> = args => {
  const [value, setValue] = useState('');
  return <TextField {...args} title="title" value={value} onChange={(e, val) => setValue(val)} />;
};

export const withButton: Story = {
  args: {
    title: 'Label',
    button: (
      <Button color="black" size="small">
        버튼명
      </Button>
    ),
  },
  render: args => <DefaultTemplate {...args} />,
};

export const Error: Story = {
  args: {
    title: 'title',
    placeholder: '텍스트 입력',
    error: '에러 메세지',
  },
  render: args => <DefaultTemplate {...args} />,
};

export const Success: Story = {
  args: {
    title: 'title',
    placeholder: '텍스트 입력',
    success: '성공 메세지',
  },
  render: args => <DefaultTemplate {...args} />,
};

/*export const Clearable: StoryFn<typeof TextField> = args => {
  const [value, setValue] = useState('');
  return <TextField {...args} name="test" value={value} onChange={(e, val) => setValue(val)} title="title" />;
};*/

export const Clearable: Story = {
  args: {
    name: 'test-clear',
    clearable: 'focus',
  },
  render: args => <DefaultTemplate {...args} />,
};

export const utils: Story = {
  args: {
    title: 'title',
    placeholder: '텍스트 입력',
    clearable: 'focus',
    utils: <Typography variant="D2">원</Typography>,
  },
  render: args => <DefaultTemplate {...args} />,
};

export const reverse: Story = {
  args: {
    title: 'title',
    placeholder: '텍스트 입력',
    reverse: true,
    clearable: 'focus',
    numberType: 'phone',
    utils: <Icon color="grayscale-gray400" name="system_search" size={14} />,
  },
  render: args => <DefaultTemplate {...args} />,
};

export const textAlignRight: Story = {
  args: {
    title: 'title',
    placeholder: '텍스트 입력',
    rightAlign: true,
  },
  render: args => <DefaultTemplate {...args} />,
};

export const UtilIcon: Story = {
  args: {
    title: 'title',
    placeholder: '텍스트 입력',
    clearable: 'focus',
    utils: <Icon color="grayscale-gray400" name="system_search" size={14} />,
  },
  render: args => <DefaultTemplate {...args} />,
};

export const Search: Story = {
  args: {
    title: 'title',
    placeholder: '텍스트 입력',
    clearable: 'focus',
    utils: <Icon color="grayscale-gray400" name="system_search" size={14} />,
  },
  render: args => <DefaultTemplate {...args} />,
};

type FromValue = {
  [key in string]: string;
};

export const ReactHookFrom: StoryFn<typeof TextField> = args => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
  } = useForm<FromValue>({
    mode: 'onBlur',
  });

  const onSubmit = (data: FromValue) => console.log(data);
  //console.log('errors', errors);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        {...args}
        control={control}
        error={errors && errors.hookForm?.message}
        label="test"
        name="hookForm"
        setValue={setValue}
        rules={{
          required: '필수값',
        }}
      />
      <button type="submit">submit</button>
    </form>
  );
};

export const useLabel: Story = {
  render: args => {
    const [value, setValue] = useState('');
    return <TextField {...args} value={value} onChange={(e, val) => setValue(val)} />;
  },
  args: {
    label: 'label title',
    placeholder: '텍스트 입력',
    clearable: 'keep',
    utils: (
      <button type="button">
        <Typography variant="D2">선택하기</Typography>
      </button>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'label 사용시에는 height가 32으로 고정됩니다.',
      },
    },
  },
};
