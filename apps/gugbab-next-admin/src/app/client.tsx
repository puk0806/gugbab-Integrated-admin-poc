'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Icon, TextField, Tooltip, Typography } from '@gugbab-integrated-admin-poc/ui-sass';

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
      <Tooltip anchor={<Icon irName="툴팁오픈" name="system_search" size={24}></Icon>} placement="top-start">
        툴팁 내용
      </Tooltip>
      <TextField name="test" />
    </>
  );
}

export default RootClient;
