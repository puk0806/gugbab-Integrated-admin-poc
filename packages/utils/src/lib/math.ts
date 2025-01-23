import { getGcd } from './format';

export const calculateRatio = (width?: number | string, height?: number | string) => {
  if (!width || !height) {
    return;
  }

  if (typeof width === 'number' && typeof height === 'number') {
    const gcd = getGcd(width, height);

    return `${width / gcd} / ${height / gcd}`;
  }

  const intWidth = parseInt(`${width}`);
  const intHeight = parseInt(`${height}`);
  const gcd = getGcd(intWidth, intHeight);

  return `${intWidth / gcd} / ${intHeight / gcd}`;
};
