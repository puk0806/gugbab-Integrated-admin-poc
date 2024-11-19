import type { Meta, StoryFn } from '@storybook/react';
import { ChangeEvent, useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Checkbox, CheckboxGroup, Typography } from '@components';

const meta: Meta<typeof CheckboxGroup> = {
  component: CheckboxGroup,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: '`Checkbox` component를 여러개 사용할시 편의성을 위해 사용합니다.',
      },
    },
  },

  argTypes: {
    children: { control: false },
    setValue: { control: false },
    control: { control: false },
    rules: { control: false },
  },
};

export default meta;

type FromValue = Array<string | number>;

export const Default: StoryFn<typeof CheckboxGroup> = () => {
  const [value, setValue] = useState<FromValue>();

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>, values: { [key in string]: FromValue }) => {
      const { name } = e.currentTarget;
      setValue(values[name]);
    },
    [setValue],
  );

  return (
    <CheckboxGroup name="default" value={value} onChange={handleChange}>
      <Checkbox label="checkbox1" value="1" />
      <div>
        <Checkbox label="checkbox2" value="2" />
      </div>
    </CheckboxGroup>
  );
};

export const ReactHookFrom: StoryFn<typeof CheckboxGroup> = () => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<FromValue>({});

  const onSubmit = (data: FromValue) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <CheckboxGroup control={control} name="hook-form">
        <Checkbox label="checkbox1" value="1" />
        <div>
          <Checkbox label="checkbox2" value="2" />
        </div>
      </CheckboxGroup>
      <button type="submit">submit</button>
    </form>
  );
};

export const Gutter: StoryFn<typeof CheckboxGroup> = () => {
  const [value, setValue] = useState<FromValue>();

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>, values: { [key in string]: FromValue }) => {
      const { name } = e.currentTarget;
      setValue(values[name]);
    },
    [setValue],
  );
  console.log('value >>> ', value);

  return (
    <CheckboxGroup gutter={24} name="gutter" value={value} onChange={handleChange}>
      <Checkbox label="checkbox1" value="1" />
      <Checkbox label="checkbox2" value="2" />
    </CheckboxGroup>
  );
};

export const DefaultAllCheck: StoryFn<typeof CheckboxGroup> = () => {
  const [value, setValue] = useState<FromValue>(['2']);

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>, values: { [key in string]: FromValue }) => {
      const { name } = e.currentTarget;
      setValue(values[name]);
    },
    [setValue],
  );
  console.log('value >>> ', value);

  return (
    <CheckboxGroup name="gutter" value={value} onChange={handleChange}>
      <Checkbox label="All Check" value="all" selectAll />
      <div>
        <Checkbox label="checkbox2" value="2" />
      </div>
      <Checkbox label="checkbox3" value="3" />
      <Checkbox label="checkbox4" value="4" disabled />
    </CheckboxGroup>
  );
};

export const ReactHookFromAllCheck: StoryFn<typeof CheckboxGroup> = () => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm({
    defaultValues: {
      'hook-form-all': ['1', '2'],
    },
  });

  const onSubmit = (data: any) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <CheckboxGroup control={control} name="hook-form-all" setValue={setValue}>
        <Checkbox label="All Check" value="all" selectAll />
        <div>
          <Checkbox label="checkbox1" value="1" />
        </div>
        <div>
          <Checkbox label="checkbox2" value="2" />
        </div>
        <Checkbox label="checkbox3" value="3" isExcludeSelectAll />
        <Checkbox label="checkbox4" value="4" disabled />
      </CheckboxGroup>
      <button type="submit">submit</button>
    </form>
  );
};

interface ValidType {
  validation: (string | number)[];
}

export const ReactHookFromValidationExample: StoryFn<typeof CheckboxGroup> = () => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    setError,
    setValue,
    watch,
  } = useForm<ValidType>({});

  const onSubmit = (data: any) => {
    if (!data.validation.includes('3')) {
      setError('validation', { type: 'custom', message: 'custom message' });
      return;
    }
  };

  const watchVaild = watch('validation');

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <CheckboxGroup control={control} name="validation" rules={{ required: '필수선택요소' }} setValue={setValue}>
        <Checkbox label="All Check" value="all" selectAll />
        <div>
          <Checkbox label="checkbox1" value="1" />
        </div>
        <div>
          <Checkbox label="checkbox2" value="email" />
        </div>
        <Checkbox label="checkbox3" value="3" />
        <Checkbox label="checkbox4" value="4" disabled />
      </CheckboxGroup>
      {watchVaild?.includes('3') && (
        <Typography color="accent-negative-red" component="p" variant="D2">
          checkbox2 선택
        </Typography>
      )}
      {errors['validation'] && (
        <Typography color="accent-negative-red" component="p" variant="D2">
          {errors['validation'].message}
        </Typography>
      )}
      <button type="submit">submit</button>
    </form>
  );
};

export const DesignTab: StoryFn<typeof CheckboxGroup> = args => {
  const [value, setValue] = useState<FromValue>();

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>, values: { [key in string]: FromValue }) => {
      const { name } = e.currentTarget;
      setValue(values[name]);
    },
    [setValue],
  );
  console.log('value >>> ', value);

  return (
    <CheckboxGroup {...args} name="design-tab" value={value} onChange={handleChange}>
      {/*<Checkbox label={<Typography variant="B2">checkbox1</Typography>} value="all" selectAll />*/}
      <Checkbox label={<Typography variant="B2">checkbox1</Typography>} value="1" />
      <Checkbox label="checkbox2" value="2" />
    </CheckboxGroup>
  );
};

DesignTab.args = {
  variant: 'tab',
};
