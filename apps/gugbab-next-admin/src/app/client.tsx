'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { TextField, Typography } from '@gugbab-integrated-admin-poc/ui-sass';

interface RootClientProps {
  environment: string;
}

function RootClient({ environment }: RootClientProps) {
  const router = useRouter();

  return (
    <>
      <Typography color="secondary-navy-blue" variant="B1" weight="bold">
        Root Client
      </Typography>
      <TextField name="test" />
    </>
  );
}

export default RootClient;
