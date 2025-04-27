'use client';

import type { ElementType, ReactNode } from 'react';
import { forwardRef, useMemo } from 'react';
import { bem } from '@gugbab-integrated-admin-poc/utils';
import { PolymorphicComponentProps } from '@types';
import { Icon, IconProps, Typography, TypographyProps } from '../..';

const cn = bem('button');

export interface ButtonProps {
  /**
   * disabled 유무
   * */
  disabled?: boolean;
  /**
   * height size
   * */
  size?: 'xlarge' | 'large' | 'medium' | 'small';
  /**
   *  ColorType
   * */
  color?: 'primary' | 'secondary' | 'black';
  /**
   * icon props
   */
  iconProps?: IconProps;
  /**
   * icon 위치
   */
  iconPosition?: 'left' | 'right';
  /**
   * typographyProps
   * */
  typographyProps?: Omit<TypographyProps, 'component' | 'children'>;
  /**
   * 고정 height
   * ex) 48px
   * */
  height?: string;
  /**
   * 최소 넓이
   * ex) min-width: 100px
   */
  minWidth?: string;
  /**
   * width 100%
   */
  isFullWidth?: boolean;
  /**
   * children
   */
  children: ReactNode;
}

export type ButtonComponent = <T extends ElementType = 'button'>(
  props: PolymorphicComponentProps<T, ButtonProps>,
) => ReactNode;

const Button: ButtonComponent = forwardRef(
  (
    {
      children,
      color = 'primary',
      component,
      disabled,
      height,
      iconPosition = 'left',
      iconProps,
      isFullWidth,
      minWidth,
      size = 'small',
      typographyProps,
      ...rest
    },
    ref,
  ) => {
    const Component: ElementType = component || 'button';

    if (component && !(typeof rest.href === 'string' || typeof rest.to === 'string')) {
      throw new Error('component props는 anchor 컴포넌트만 사용할 수 있습니다.');
    }

    const defaultTypographyProps = useMemo<ButtonProps['typographyProps']>(() => {
      switch (size) {
        case 'xlarge':
          return { weight: 'regular', variant: 'B1' };
        case 'large':
        case 'medium':
          return { weight: 'regular', variant: 'B2' };
        case 'small':
          return { weight: 'regular', variant: 'D2' };
        default:
          return {};
      }
    }, [size]);

    const classNames = cn(undefined, {
      [size]: !height && !!size,
      disabled: !!disabled,
      [color]: !!color,
      'is-full-width': !!isFullWidth,
      'has-left-icon': iconPosition === 'left' && !!iconProps,
      'has-right-icon': iconPosition === 'right' && !!iconProps,
    });

    const styles = {
      ...(height && { height }),
      ...(minWidth && { minWidth }),
    };

    return (
      <Component
        {...(Component === 'button' && { type: 'button' })}
        {...rest}
        className={classNames}
        disabled={disabled}
        ref={ref}
        style={styles}
      >
        {iconPosition === 'left' && iconProps && <Icon {...iconProps} />}
        {typeof children === 'string' ? (
          <Typography {...defaultTypographyProps} {...typographyProps}>
            {children}
          </Typography>
        ) : (
          children
        )}
        {iconPosition === 'right' && iconProps && <Icon {...iconProps} />}
      </Component>
    );
  },
);

export default Button;
