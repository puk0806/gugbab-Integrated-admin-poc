'use client';

import type { CSSProperties, ImgHTMLAttributes, RefObject } from 'react';
import { useEffect, useId, useRef, useState, useMemo } from 'react';
import { bem, calculateRatio, stringifyQuery } from '@gugbab-integrated-admin-poc/utils';
import useIntersection from '@hooks/useIntersection';
import errorDefaultImg from './img/error-default.svg';

const cn = bem('custom-image');

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

const Image = ({
  alt,
  bustCache,
  children,
  errorSrc = errorDefaultImg.src,
  isLazy = true,
  layout = 'intrinsic',
  objectFit,
  src = '',
  ...props
}: ImageProps) => {
  const uniqueId = useId();
  const [isInView, setIsInView] = useState(false);
  const [isError, setIsError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useIntersection(imgRef as RefObject<HTMLImageElement>, () => setIsInView(true));

  const formattedSource = useMemo(() => {
    if (isLazy && !isInView) {
      return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+ip1sAAAAASUVORK5CYII=';
    }
    if (!bustCache) {
      return src;
    }
    return `${src}${stringifyQuery({ v: uniqueId }, true, src?.includes('?') ? '&' : '?')}`;
  }, [bustCache, isInView, isLazy, src, uniqueId]);

  useEffect(() => {
    if (!imgRef.current) {
      return;
    }

    const handleError = () => {
      if (!(imgRef.current instanceof HTMLImageElement)) return;
      imgRef.current.src = errorSrc;
      setIsError(true);
      console.warn(`${formattedSource} has been replaced to ${errorSrc}`);
    };

    imgRef.current.addEventListener('error', handleError);
    return () => {
      if (imgRef.current) {
        imgRef.current.removeEventListener('error', handleError);
      }
    };
  }, [errorSrc, formattedSource]);

  if (layout === 'fixed') {
    return (
      <img
        alt={alt}
        className={cn(undefined, { [layout]: !!layout, error: isError })}
        ref={imgRef}
        src={formattedSource || errorSrc}
        style={{ objectFit }}
        {...props}
      />
    );
  }

  return (
    <span
      className={cn(undefined, {
        [layout]: !!layout,
        'has-ratio': !!props.width && !!props.height,
        error: isError,
      })}
      style={{
        aspectRatio: calculateRatio(props.width, props.height),
      }}
    >
      <img alt={alt} ref={imgRef} src={formattedSource || errorSrc} style={{ objectFit }} {...props} />
    </span>
  );
};

export default Image;
