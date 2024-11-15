"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Typography } from "@gugbab-integrated-admin-poc/ui-sass";
import styles from './index.module.scss';

interface RootClientProps {
  environment: string;
}

function RootClient({ environment }: RootClientProps) {
  const router = useRouter();

  return (
    <Typography weight="bold" variant="B1" color="accent-red"> 
      Root Client
    </Typography>
  );
}

export default RootClient;
