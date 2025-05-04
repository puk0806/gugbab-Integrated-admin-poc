import { cookies } from 'next/headers';
import DefaultLayout from '@app/widgets/layout/ui/DefaultLayout';
import RootClient from './client';

export default async function RootPage() {
  const environment = globalThis.process?.env.NEXT_PUBLIC_SHORT_ENV || 'DEV';
  const cookieStore = await cookies();

  const access = cookieStore.get('GUGBAB_AC');
  const refresh = cookieStore.get('GUGBAB_RE');

  console.log('environment', environment);

  return (
    <DefaultLayout breadcrumb={['Home']} title="Gugbab Admin POC">
      <RootClient environment={environment} isLogin={access && refresh ? true : false} />
    </DefaultLayout>
  );
}
