import type { RefObject } from 'react';
import { bem, calculateRatio, stringifyQuery } from '@gugbab-integrated-admin-poc/utils';
import { memo, useCallback, useEffect, useId, useMemo, useRef, useState } from 'react';
import { ImageProps } from '@types';
import useIntersection from '@hooks/useIntersection';
import errorDefaultImg from './img/error-default.svg';

const cn = bem('custom-image');

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
  const imgRef = useRef<HTMLImageElement>(null);
  const [isError, setIsError] = useState(false);

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

  const handleError = useCallback(() => {
    if (!(imgRef.current instanceof HTMLImageElement)) return;
    imgRef.current.src = errorSrc;
    setIsError(true);
    console.warn(`${formattedSource} has been replaced to ${errorSrc}`);
  }, [errorSrc, formattedSource]);

  useEffect(() => {
    imgRef.current?.addEventListener('error', handleError);
  }, [handleError]);

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
      className={cn(undefined, { [layout]: !!layout, ['has-ratio']: !!props.width && !!props.height, error: isError })}
      style={{
        aspectRatio: calculateRatio(props.width, props.height),
      }}
    >
      <img alt={alt} ref={imgRef} src={formattedSource || errorSrc} style={{ objectFit }} {...props} />
    </span>
  );
};

export default memo(Image);
