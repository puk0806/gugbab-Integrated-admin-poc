import { CSSProperties, ImgHTMLAttributes } from 'react';

type ImageLayout = 'intrinsic' | 'fixed' | 'responsive' | 'fill';

export interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  /** image url */
  src: string;
  /** image alt */
  alt: string;
  /** image width (layout props가 `responsive`, `fill` 의 경우 이미지 자체의 원본 사이즈 입력)<br />
   * `goggle page speed 정책반영` 필수 입력으로 전환
   * */
  width: number | string;
  /** image height (layout props가 `responsive`, `fill` 의 경우 이미지 자체의 원본 사이즈 입력)<br />
   * `goggle page speed 정책반영` 필수 입력으로 전환
   * */
  height: number | string;
  /** lazy loading 여부 */
  isLazy?: boolean;
  /** image object fit property */
  objectFit?: CSSProperties['objectFit'];
  /** 에러이미지 경로 */
  errorSrc?: string;
  /** 이미지 레이아웃 */
  layout?: ImageLayout;
  /** Cache busting용 쿼리 추가 */
  bustCache?: boolean;
}
