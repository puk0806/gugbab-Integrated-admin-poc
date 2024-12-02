'use client';

import { Typography } from '@gugbab-integrated-admin-poc/ui-sass';
import { memo } from 'react';

export interface BreadcrumbProps {
  /** 메뉴명 배열 */
  menus: string[];
}

function Breadcrumb({ menus }: BreadcrumbProps) {
  const str = menus.join(' > ');
  return (
    <Typography color="primary" variant="D2">
      {str}
    </Typography>
  );
}

export default memo(Breadcrumb);
