import type { ElementType } from 'react';
import type { ButtonComponent, ButtonProps } from '@types';
import { forwardRef, useMemo } from 'react';
import { bem } from '@gugbab-integrated-admin-poc/utils';
import { Icon, Typography } from '../../index';

const cn = bem('button');

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
    if (component && !(typeof rest.href === 'string' || typeof rest.to === 'string')) {
      throw new Error('component props는 anchor 컴포넌트만 사용할수 있습니다');
    }

    const Component: ElementType = component || 'button';

    const defaultTypographyProps = useMemo<ButtonProps['typographyProps']>(() => {
      switch (size) {
        case 'xlarge':
          return {
            weight: 'regular',
            variant: 'B1',
          };
        case 'large':
          return {
            weight: 'regular',
            variant: 'B2',
          };
        case 'medium':
          return {
            weight: 'regular',
            variant: 'B2',
          };
        case 'small':
          return {
            weight: 'regular',
            variant: 'D2',
          };
        default:
          return {};
      }
    }, [size]);

    const classNames = useMemo(
      () =>
        cn(undefined, {
          [size]: !height && !!size,
          disabled: !!disabled,
          [color]: !!color,
          'is-full-width': !!isFullWidth,
          'has-start-icon': iconPosition === 'left' && !!iconProps,
          'has-end-icon': iconPosition === 'right' && !!iconProps,
        }),
      [color, disabled, height, iconPosition, iconProps, isFullWidth, size],
    );

    const styles = useMemo(
      () => ({ ...(rest.styles ?? {}), ...(height && { height }), ...(minWidth && { minWidth }) }),
      [height, minWidth, rest.styles],
    );

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

export default Button as ButtonComponent;
