'use client';

import type { CSSProperties } from 'react';
import { memo } from 'react';
import { bem } from '@gugbab-integrated-admin-poc/utils';
import icons from '@gugbab-integrated-admin-poc/icons';
import { ColorTypes } from '@types';
import { Ir } from '../../..';

const cn = bem('icon');

export interface IconProps {
  /** 아이콘 클래스명 */
  name: (typeof icons)[number];
  /** icon fontsize(px) */
  size?: number;
  /** icon color(#de2231) */
  color?: ColorTypes;
  /** 웹접근성 위한 아이콘 이름 */
  irName?: string;
}

const Icon = ({ color, irName, name, size = 24 }: IconProps) => {
  const styles: CSSProperties = {
    width: `${size}px`,
    height: `${size}px`,
    backgroundSize: `${size}px auto`,
    fontSize: `${size}px`,
  };

  const className = cn(undefined, {
    [name]: true,
    [`${color}`]: !!color,
  });

  return (
    <>
      <i className={className} style={styles} />
      {irName && <Ir>{irName}</Ir>}
    </>
  );
};

Icon.displayName = 'Icon';
export default memo(Icon);
