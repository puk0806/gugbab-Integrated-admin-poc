import { globalStyle, layer } from '@vanilla-extract/css';

const reset = layer('reset');

globalStyle('html, body', {
  '@layer': {
    [reset]: {
      margin: 0,
      padding: 0,
      border: 0,
      boxSizing: 'border-box',
      fontFamily: `"Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif`,
    },
  },
});
globalStyle('html, body, #root', {
  '@layer': {
    [reset]: {
      width: '100%',
      height: '100%',
    },
  },
});
globalStyle('body', {
  '@layer': {
    [reset]: {
      lineHeight: 1,
    },
  },
});
globalStyle(
  'div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, button, input, select, textarea, blockquote, pre, a, abbr, acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong, sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table, caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure, figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio, video',
  {
    '@layer': {
      [reset]: {
        margin: 0,
        padding: 0,
        border: 0,
        fontSize: '100%',
        font: 'inherit',
        verticalAlign: 'baseline',
        background: 'none',
        boxSizing: 'border-box',
      },
    },
  },
);
/* HTML5 display-role reset for older browsers */
globalStyle('article, aside, details, figcaption, figure, footer, header, hgroup, menu, nav, section', {
  '@layer': {
    [reset]: {
      display: 'block',
    },
  },
});

globalStyle('ol, ul, li', {
  '@layer': {
    [reset]: {
      listStyle: 'none',
    },
  },
});
globalStyle('table', {
  '@layer': {
    [reset]: {
      borderCollapse: 'collapse',
      borderSpacing: 0,
    },
  },
});
globalStyle('button', {
  '@layer': {
    [reset]: {
      cursor: 'pointer',
    },
  },
});
globalStyle('a', {
  '@layer': {
    [reset]: {
      textDecoration: 'none',
    },
  },
});

export default reset;
