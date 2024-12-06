import DefaultLayout from '@app/widgets/layout/ui/DefaultLayout';
import LoginClient from './client';

export default function LoginPage() {
  return (
    <DefaultLayout title="로그인">
      <LoginClient />
    </DefaultLayout>
  );
}
