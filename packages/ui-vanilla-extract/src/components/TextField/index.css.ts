import { style, styleVariants } from '@vanilla-extract/css';
import { font, palette } from '../../styles';

export const container = style({
  position: 'relative',
  width: '100%',
});

export const input = style([
  font.variant.B3,
  {
    width: '100%',
    border: `1px solid ${palette.outline}`,
    background: palette.surface,
    height: 48,
    padding: '0 13px',
    overflow: 'hidden',
    borderRadius: 8,
    lineHeight: 1,
    color: palette.onSurface,
    ':focus': {
      outline: 'none',
      border: `1px solid ${palette.primary}`,
    },
  },
]);

export const placeholder = styleVariants({
  base: {
    position: 'absolute',
    top: 14,
    left: 13,
    transition: 'all ease 0.2s',
    background: palette.surface,
  },
  focus: {
    top: -8,
    left: 13,
    zIndex: 1,
  },
  value: {
    top: -8,
    left: 13,
    zIndex: 1,
  },
});

export const success = style({
  borderColor: palette.primary,
});

export const error = style({
  borderColor: palette.error,
  ':focus': {
    outline: 'none',
    border: `1px solid ${palette.error}`,
  },
});

export const message = style({
  padding: '5px 13px',
});
