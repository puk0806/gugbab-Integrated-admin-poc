import { cookies } from 'next/headers';
import RootClient from './client';

export default function RootPage() {
  const environment = globalThis.process?.env.NEXT_PUBLIC_SHORT_ENV || 'DEV';
  const cookieStore = cookies();

  console.log('environment', environment);

  return <RootClient environment={environment} />;
}
