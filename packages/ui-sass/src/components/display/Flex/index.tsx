import type { ElementType, CSSProperties } from 'react';
import type { FlexComponent } from '@types';
import { forwardRef } from 'react';
import { bem } from '@gugbab-integrated-admin-poc/utils';

const cn = bem('flex');

const Flex: FlexComponent = forwardRef(
  ({ align = 'center', children, component, flex, gap, justify, style, vertical, wrap }, ref) => {
    const Component: ElementType = component || 'div';

    const mergedStyle: CSSProperties = {
      ...style,
      gap,
      alignItems: align,
      justifyContent: justify,
      flexDirection: vertical ? 'column' : 'row',
      flexWrap: wrap,
      flex: flex,
    };

    return (
      <Component className={cn()} ref={ref} style={mergedStyle}>
        {children}
      </Component>
    );
  },
);

export default Flex as FlexComponent;
