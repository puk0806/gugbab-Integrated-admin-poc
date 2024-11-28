'use client';

import React from 'react';
import { ErrorContent } from '@app/shared/error';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const errorObject = JSON.parse(JSON.stringify(error));
  const errorResponse = errorObject.response?.errors[0];

  return (
    <ErrorContent
      message={[errorResponse?.message]}
      title="서비스 이용에 불편을 드려 죄송합니다."
      type={errorResponse?.statusCode}
    />
  );
}
