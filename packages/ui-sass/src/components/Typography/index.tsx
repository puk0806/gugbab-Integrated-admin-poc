import { ElementType, memo } from 'react';
import { Tag, TypographyProps } from '@types';
import { bem } from '@utils';

const cn = bem('typography');

const Typography = <E extends Tag = 'span'>({
  children,
  color,
  component,
  isEllipsisOneLine,
  isEllipsisTwoLine,
  underline,
  variant = 'B2',
  weight = 'medium',
  ...otherProps
}: TypographyProps<E>) => {
  const Component = (component || 'span') as ElementType;

  return (
    <Component
      {...otherProps}
      className={cn(undefined, {
        [`${variant}`]: variant,
        regular: weight === 'regular',
        medium: weight === 'medium',
        bold: weight === 'bold',
        [`${color}`]: color ?? false,
        underline: !!underline,
        ['is-ellipsis-1']: !!isEllipsisOneLine,
        ['is-ellipsis-2']: !!isEllipsisTwoLine,
      })}
    >
      {children}
    </Component>
  );
};

Typography.displayName = 'Typography';

export default memo(Typography);
