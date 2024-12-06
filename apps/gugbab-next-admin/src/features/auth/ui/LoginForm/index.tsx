import { classNamesWithRoot } from '@gugbab-integrated-admin-poc/utils';
import { Button, Flex, TextField } from '@gugbab-integrated-admin-poc/ui-sass';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import styles from './index.module.scss';

interface LoginFormProps {}

const loginSchema = z.object({
  id: z
    .string({ required_error: '이메일을 입력해 주세요' })
    .min(5, { message: '이메일을 입력해 주세요' })
    .email({ message: '올바른 이메일을 입력해 주세요' }),
  password: z.string({ required_error: '비밀번호를 입력해 주세요' }).min(1, { message: '비밀번호를 입력해 주세요' }),
});

export type LoginSchema = z.infer<typeof loginSchema>;

function LoginForm(props: LoginFormProps) {
  const cx = classNamesWithRoot(styles, 'login-form');

  const {
    control,
    formState: { errors },
    getValues,
    handleSubmit,
    reset,
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    mode: 'onBlur',
  });

  return (
    <div className={cx()}>
      <form>
        <div className={cx('__container')}>
          <Flex gap={20} vertical>
            <TextField
              control={control}
              error={errors.id?.message && errors.id?.message.toString()}
              maxLength={16}
              name="id"
              placeholder="아이디"
              title="아아디"
            />
            <TextField
              control={control}
              error={errors.password?.message && errors.password?.message.toString()}
              maxLength={16}
              name="password"
              placeholder="비밀번호"
              title="비밀번호"
              type="password"
            />
          </Flex>
          <Button isFullWidth>로그인</Button>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
