"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Typography } from "@gugbab-integrated-admin-poc/ui-sass";

interface RootClientProps {
  environment: string;
}

function RootClient({ environment }: RootClientProps) {
  const router = useRouter();

  return (
    <Typography weight="bold" variant="B1" color="secondary-navy-blue">
      Root Client
    </Typography>
  );
}

export default RootClient;
