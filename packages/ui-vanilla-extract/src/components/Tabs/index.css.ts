import { style, styleVariants } from '@vanilla-extract/css';
import { palette } from '../../styles';

export const container = style({
  display: 'flex',
  alignItems: 'center',
});

export const tabItem = styleVariants({
  base: {
    flex: 1,
    padding: 12,
    height: 48,
    boxShadow: `0 -1px 0 0 ${palette.onSurface} inset`,
  },
  select: {
    boxShadow: `0 -2px 0 0 ${palette.primary} inset`,
  },
});
