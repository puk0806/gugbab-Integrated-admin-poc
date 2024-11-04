import { ElementType, useMemo } from 'react';
import { ButtonProps } from '@types';
import { classnames } from '@utils';
import Typography from '../Typography';
import * as styles from './index.css';

const Button = <E extends ElementType = 'button'>({
  children,
  color = 'primary',
  component,
  isFullWidth,
  size = 'medium',
  typographyProps,
  variant = 'contained',
  ...otherProps
}: ButtonProps<E>) => {
  const Component = component || 'button';

  if (component && !(otherProps.href || otherProps.to)) {
    throw new Error('anchor tag 또는 button tag 만 올수있습니다');
  }

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
      case 'small':
        return {
          weight: 'regular',
          variant: 'C2',
        };
      default:
        return {
          weight: 'regular',
          variant: 'B2',
        };
    }
  }, [size]);

  return (
    <Component
      {...(Component === 'button' && { type: 'button' })}
      {...otherProps}
      className={classnames(styles.base, styles.size[size], {
        [styles.fullWidth]: !!isFullWidth,
        [styles.contained[color]]: variant === 'contained',
        [styles.outline[color]]: variant === 'outline',
      })}
    >
      {typeof children === 'string' ? (
        <Typography {...defaultTypographyProps} {...typographyProps}>
          {children}
        </Typography>
      ) : (
        children
      )}
    </Component>
  );
};

export default Button;
