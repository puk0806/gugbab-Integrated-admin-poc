import { ElementType } from 'react';
import { bem } from '@gugbab-integrated-admin-poc/utils';
import { PolymorphicComponentProps, ColorTypes } from '@types';

const cn = bem('typography');

export type TypographyTags =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'strong'
  | 'em'
  | 'address'
  | 'span'
  | 'p'
  | 'div'
  | 'ul'
  | 'li'
  | 'label'
  | 'figcaption'
  | 'mark';

export type TypographySizeTypes = 'H1' | 'H2' | 'H3' | 'B1' | 'B2' | 'D1' | 'D2';

export type TypographyProps = {
  /** 텍스트 타입 지정(type 별 font-size, letter-spacing, line-height desgin guide 참고) */
  variant?: TypographySizeTypes;
  /** text font weight */
  weight?: 'regular' | 'medium' | 'bold';
  /** font color */
  color?: ColorTypes;
  /** underline */
  underline?: boolean;
  /** 1줄 ...표시 */
  isEllipsisOneLine?: boolean;
  /** 2줄 ...표시 */
  isEllipsisTwoLine?: boolean;
};

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
        'is-ellipsis-1': !!isEllipsisOneLine,
        'is-ellipsis-2': !!isEllipsisTwoLine,
      })}
    >
      {children}
    </Component>
  );
};

Typography.displayName = 'Typography';

export default Typography;
