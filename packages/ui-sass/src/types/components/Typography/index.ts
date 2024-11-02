import { ComponentPropsWithoutRef, ReactNode } from 'react';
import { Color, FontVariant, FontWeight } from '../../styles';

export type Tag =
  | 'span'
  | 'p'
  | 'div'
  | 'ul'
  | 'li'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'strong'
  | 'em'
  | 'mark'
  | 'address'
  | 'label'
  | 'figcaption';

interface TypographyOwnProps {
  variant?: FontVariant;
  weight?: FontWeight;
  color?: Color;
  children: ReactNode;
  underline?: boolean;
  isEllipsisOneLine?: boolean;
  isEllipsisTwoLine?: boolean;
}

export type TypographyProps<E extends Tag = 'span'> = TypographyOwnProps &
  Omit<ComponentPropsWithoutRef<E>, keyof TypographyOwnProps> & {
    component?: E;
  };
