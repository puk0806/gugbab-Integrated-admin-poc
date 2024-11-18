import { ElementType, ReactNode } from 'react';
import { TypographyProps } from '../Typography';
import { IconProps } from '../../display/Icon';
import { PolymorphicComponentProps } from '../../common/helper';

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
