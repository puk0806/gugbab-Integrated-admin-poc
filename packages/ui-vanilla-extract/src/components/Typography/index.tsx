import { ElementType } from 'react';
import { Tag, TypographyProps } from '@types';
import { font, palette } from '@styles';
import { classnames } from '@utils';
import * as styles from './index.css';

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
      style={{ ...otherProps.style, ...(color && { color: palette[color] }) }}
      className={classnames(styles.base, font.variant[variant], font.weight[weight], {
        [font.underline]: !!underline,
        [font.ellipsisOneLine]: !!isEllipsisOneLine,
        [font.ellipsisTwoLine]: !!isEllipsisTwoLine,
        [`${otherProps.className}`]: !!otherProps.className,
      })}
    >
      {children}
    </Component>
  );
};

export default Typography;
