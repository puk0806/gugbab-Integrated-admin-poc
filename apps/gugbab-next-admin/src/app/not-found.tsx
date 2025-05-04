'use client';
import React from 'react';
import ErrorContent from '@app/widgets/error/ui/ErrorContent';

export default async function NotFound() {
  return <ErrorContent title="서비스 이용에 불편을 드려 죄송합니다." type={404} />;
}
