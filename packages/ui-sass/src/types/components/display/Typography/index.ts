import { ColorTypes } from '../../common/color';

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
