'use client';

import { ForwardedRef, ReactNode, forwardRef } from 'react';
import { bem } from '@gugbab-integrated-admin-poc/utils';
import Typography, { TypographyProps } from '../Typography';

const cn = bem('chip');

export interface ChipProps {
  /** 외관 타입 정의 */
  variant?: 'filled' | 'outlined' | 'light-outlined';
  /** color 타입 정의 */
  color?: 'red' | 'accent-red' | 'green' | 'navi' | 'negative-red' | 'orange' | 'gray900' | 'gray700';
  /** Typography 속성 override */
  typographyProps?: Omit<TypographyProps, 'children' | 'component'>;
  /** 콘텐츠 */
  children: ReactNode;
}

const Chip = forwardRef(
  (
    { children, color = 'gray900', typographyProps, variant = 'filled' }: ChipProps,
    ref: ForwardedRef<HTMLSpanElement>,
  ) => {
    const classNames = cn(undefined, {
      [variant]: !!variant,
      [color]: !!color,
    });

    return (
      <span className={classNames} ref={ref}>
        {typeof children === 'string' ? (
          <Typography component="em" variant="D2" weight="regular" {...typographyProps}>
            {children}
          </Typography>
        ) : (
          children
        )}
      </span>
    );
  },
);

Chip.displayName = 'Chip';
export default Chip;
