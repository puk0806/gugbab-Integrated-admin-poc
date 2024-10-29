import { style, styleVariants } from '@vanilla-extract/css';
import { FontVariantInfo, FontWeightInfo } from '@types';

const baseFont = 16;
const pxToRem = (px: `${number}px`) => {
  const [_px] = px.split('px');
  return `${Number(_px) / baseFont}rem`;
};

const ellipsisOneLine = style({
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});

const ellipsisTwoLine = style({
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
});

const underline = style({
  textDecoration: 'underline',
});

const variant = styleVariants<FontVariantInfo>({
  H1: {
    fontSize: pxToRem('32px'),
    letterSpacing: -0.5,
    lineHeight: pxToRem('44px'),
  },
  H2: {
    fontSize: pxToRem('28px'),
    letterSpacing: -0.5,
    lineHeight: pxToRem('36px'),
  },
  H3: {
    fontSize: pxToRem('24px'),
    letterSpacing: -0.5,
    lineHeight: pxToRem('32px'),
  },
  H4: {
    fontSize: pxToRem('20px'),
    letterSpacing: -0.5,
    lineHeight: pxToRem('28px'),
  },
  B1: {
    fontSize: pxToRem('18px'),
    letterSpacing: 0,
    lineHeight: pxToRem('28px'),
  },
  B2: {
    fontSize: pxToRem('16px'),
    letterSpacing: 0,
    lineHeight: pxToRem('24px'),
  },
  B3: {
    fontSize: pxToRem('14px'),
    letterSpacing: 0,
    lineHeight: pxToRem('22px'),
  },
  C1: {
    fontSize: pxToRem('13px'),
    letterSpacing: 0,
    lineHeight: pxToRem('20px'),
  },
  C2: {
    fontSize: pxToRem('12px'),
    letterSpacing: 0,
    lineHeight: pxToRem('16px'),
  },
  C3: {
    fontSize: pxToRem('10px'),
    letterSpacing: 0,
    lineHeight: pxToRem('16px'),
  },
});

const weight = styleVariants<FontWeightInfo>({
  regular: {
    fontWeight: 400,
  },
  medium: {
    fontWeight: 600,
  },
  bold: {
    fontWeight: 700,
  },
});

export default {
  ellipsisOneLine,
  ellipsisTwoLine,
  underline,
  variant,
  weight,
};
