import { style, styleVariants } from '@vanilla-extract/css';
import { palette } from '@styles';

export const base = style({
  display: 'inline-flex',
  alignItems: 'center',
  textAlign: 'center',
  justifyContent: 'center',
  padding: '0 24px',
  borderRadius: 8,
  ':disabled': {
    background: palette.disabled,
    border: `1px solid ${palette.disabled}`,
    color: palette.disabled,
    pointerEvents: 'none',
  },
});

export const fullWidth = style({
  width: '100%',
});

export const size = styleVariants({
  xlarge: {
    height: 52,
  },
  large: {
    height: 48,
  },
  medium: {
    height: 40,
  },
  small: {
    height: 32,
    borderRadius: 4,
    padding: '0 12px',
  },
});

export const contained = styleVariants({
  primary: {
    backgroundColor: palette.primary,
    border: `1px solid ${palette.primary}`,
    color: palette.onPrimary,

    ':active': {
      backgroundColor: palette.primaryContainer,
      border: `1px solid ${palette.primaryContainer}`,
      color: palette.onPrimaryContainer,
    },
  },
  error: {
    backgroundColor: palette.error,
    border: `1px solid ${palette.error}`,
    color: palette.onError,

    ':active': {
      backgroundColor: palette.errorContainer,
      border: `1px solid ${palette.errorContainer}`,
      color: palette.onErrorContainer,
    },
  },
});

export const outline = styleVariants({
  primary: {
    backgroundColor: palette.surface,
    border: `1px solid ${palette.outline}`,
    color: palette.primary,

    ':active': {
      backgroundColor: palette.onPrimary,
      border: `1px solid ${palette.outline}`,
      color: palette.primary,
    },
  },
  error: {
    backgroundColor: palette.surface,
    border: `1px solid ${palette.outline}`,
    color: palette.error,

    ':active': {
      backgroundColor: palette.onError,
      border: `1px solid ${palette.outline}`,
      color: palette.error,
    },
  },
});
