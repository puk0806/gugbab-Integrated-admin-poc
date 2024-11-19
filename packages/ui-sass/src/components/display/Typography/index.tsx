import { ElementType, memo } from 'react';
import { bem } from '@gugbab-integrated-admin-poc/utils';
import { TypographyTags, TypographyProps, PolymorphicComponentProps } from '@types';

const cn = bem('typography');

const Typography = <T extends TypographyTags = 'span'>({
  children,
  color,
  component,
  isEllipsisOneLine,
  isEllipsisTwoLine,
  underline,
  variant = 'B1',
  weight = 'regular',
  ...props
}: PolymorphicComponentProps<T, TypographyProps>) => {
  const Component = (component || 'span') as ElementType;

  return (
    <Component
      {...props}
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
