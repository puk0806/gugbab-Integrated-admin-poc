import { style } from '@vanilla-extract/css';
import { palette } from '../../styles';

const defaultSize = 20;
export const container = style({
  position: 'relative',
  display: 'inline-flex',
});

export const input = style({
  position: 'absolute',
  width: 1,
  height: 1,
  border: 0,
  clip: 'rect(1px, 1px, 1px, 1px)',
});

export const label = style({
  zIndex: 1,
  position: 'relative',
  display: 'inline-flex',
  alignItems: 'center',
  cursor: 'pointer',

  ':before': {
    flex: 'none',
    display: 'inline-block',
    content: '',
    width: defaultSize,
    height: defaultSize,
    border: `2px solid ${palette.outline}`,
    borderRadius: '50%',
  },
  selectors: {
    [`${input}:checked + &:before`]: {
      borderColor: palette.primary,
    },
    [`${input}:checked + &:after`]: {
      content: '',
      position: 'absolute',
      width: defaultSize - 8,
      height: defaultSize - 8,
      borderRadius: '50%',
      left: 6,
      background: palette.primary,
      top: '50%',
      transform: 'translateY(-50%)',
    },
  },
});

export const typo = style({
  paddingLeft: 12,
  lineHeight: `${defaultSize}px !important`,
  display: 'inline-flex',
  alignItems: 'center',
  flexWrap: 'wrap',
  wordBreak: 'break-word',
  userSelect: 'none',
});
