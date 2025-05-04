'use client';

import { classNamesWithRoot } from '@gugbab-integrated-admin-poc/utils';
import LoginForm from 'src/features/login/ui/LoginForm';
import styles from './index.module.scss';

export default function LoginClient() {
  const cx = classNamesWithRoot(styles, 'login');
  return (
    <div className={cx()}>
      <LoginForm />
    </div>
  );
}
