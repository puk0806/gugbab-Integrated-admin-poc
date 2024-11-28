import type { ElementType, CSSProperties, HTMLAttributes, ReactNode } from 'react';
import { PolymorphicComponentProps } from '../../common/helper';

export interface FlexProps extends HTMLAttributes<HTMLElement> {
  /** flex-direction: 'column' 활성화 */
  vertical?: boolean;
  /** flex-wrap properties */
  wrap?: CSSProperties['flexWrap'];
  /** justify-content properties */
  justify?: CSSProperties['justifyContent'];
  /** align-items properties */
  align?: CSSProperties['alignItems'];
  /** flex properties */
  flex?: CSSProperties['flex'];
  /** gap properties */
  gap?: CSSProperties['gap'];
  children: ReactNode;
}

export type FlexComponent = <T extends ElementType = 'div'>(
  props: PolymorphicComponentProps<T, FlexProps>,
) => ReactNode;
