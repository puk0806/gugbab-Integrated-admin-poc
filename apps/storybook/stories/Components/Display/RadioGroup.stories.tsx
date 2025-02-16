import type { Meta, StoryFn } from '@storybook/react';
import { ChangeEventHandler, useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Radio, RadioGroup } from '@components';

const meta: Meta<typeof RadioGroup> = {
  title: 'Components/RadioGroup',
  component: RadioGroup,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          '`Radio` component를 여러개 사용할시 편의성을 위해 사용합니다. <br /> 체크시의 확인되는 값은 개발자 도구 console.log 를 확인하세요.',
      },
    },
  },

  argTypes: {},
};

export default meta;

export const Default: StoryFn<typeof RadioGroup> = args => {
  const [value, setValue] = useState('');

  const handleChange: ChangeEventHandler<HTMLInputElement> = useCallback(e => {
    const value = e.currentTarget.value;
    setValue(value);
    //setValue();
  }, []);
  console.log('value >>> ', value);

  return (
    <RadioGroup {...args} name="test-radio1" value={value} onChange={handleChange}>
      <Radio label="name1" value="1" />
      <Radio label="name2" value="2" />
    </RadioGroup>
  );
};

interface FromValue {
  'test-radio2': string;
}

export const ReactHookFrom: StoryFn<typeof RadioGroup> = () => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<FromValue>({});

  const onSubmit = (data: FromValue) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <RadioGroup control={control} name="test-radio2" rules={{ required: true }}>
        <Radio label="name1" value="1" />
        <Radio label="name2" value="2" />
      </RadioGroup>
      <button type="submit">submit</button>
    </form>
  );
};

export const Gutter: StoryFn<typeof RadioGroup> = () => {
  const [value, setValue] = useState('');

  const handleChange: ChangeEventHandler<HTMLInputElement> = useCallback(e => {
    const value = e.currentTarget.value;
    setValue(value);
  }, []);

  return (
    <RadioGroup gutter={100} name="test-radio1" value={value} onChange={handleChange}>
      <Radio label="name1" value="1" />
      <Radio label="name2" value="2" />
    </RadioGroup>
  );
};

export const DesignTab: StoryFn<typeof RadioGroup> = args => {
  const [value, setValue] = useState('');

  const handleChange: ChangeEventHandler<HTMLInputElement> = useCallback(e => {
    const value = e.currentTarget.value;
    setValue(value);
  }, []);

  return (
    <RadioGroup variant="chip" {...args} name="design-tab" value={value} onChange={handleChange}>
      <Radio label="name1" value="1" />
      <Radio label="name2" value="2" />
      <Radio label="name3" value="3" />
    </RadioGroup>
  );
};
