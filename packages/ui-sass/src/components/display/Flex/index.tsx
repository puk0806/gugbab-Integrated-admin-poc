'use client';

import type { ElementType, CSSProperties, HTMLAttributes, ReactNode } from 'react';
import type { PolymorphicComponentProps } from '@types';
import { forwardRef } from 'react';
import { bem } from '@gugbab-integrated-admin-poc/utils';

const cn = bem('flex');

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
  /** children */
  children: ReactNode;
}

export type FlexComponent = <T extends ElementType = 'div'>(
  props: PolymorphicComponentProps<T, FlexProps>,
) => ReactNode;

const Flex: FlexComponent = forwardRef(
  ({ align = 'center', children, component, flex, gap, justify, style, vertical, wrap, ...rest }, ref) => {
    const Component: ElementType = component || 'div';

    const styles: CSSProperties = {
      gap,
      alignItems: align,
      justifyContent: justify,
      flexDirection: vertical ? 'column' : 'row',
      flexWrap: wrap,
      flex,
      ...style,
    };

    return (
      <Component className={cn()} ref={ref} style={styles} {...rest}>
        {children}
      </Component>
    );
  },
);

export default Flex;
