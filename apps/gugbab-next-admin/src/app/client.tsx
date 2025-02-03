'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Icon, TextField, Typography } from '@gugbab-integrated-admin-poc/ui-sass';

interface RootClientProps {
  environment: string;
  isLogin: boolean;
}

function RootClient({ environment }: RootClientProps) {
  const router = useRouter();

  return (
    <>
      <Typography color="secondary-navy-blue" variant="B1" weight="bold">
        Root Client
      </Typography>
      <Icon name="close" />
      <TextField name="test" />
    </>
  );
}

export default RootClient;
