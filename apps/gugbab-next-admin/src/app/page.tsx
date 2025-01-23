import { cookies } from 'next/headers';
import { DefaultLayout } from '@app/widgets/layout';
import RootClient from './client';

export default function RootPage() {
  const environment = globalThis.process?.env.NEXT_PUBLIC_SHORT_ENV || 'DEV';
  const cookieStore = cookies();

  const access = cookieStore.get('GUGBAB_AC');
  const refresh = cookieStore.get('GUGBAB_RE');

  console.log('environment', environment);

  return (
    <DefaultLayout breadcrumb={['Home']} title="Gugbab Admin POC">
      <RootClient environment={environment} isLogin={access && refresh ? true : false} />
    </DefaultLayout>
  );
}
