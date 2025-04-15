'use client';

import type { ReactNode } from 'react';
import { bem } from '@gugbab-integrated-admin-poc/utils';
import { useEffect, useState } from 'react';
import Ir from '../../utils/Ir';
import Typography, { TypographyProps } from '../Typography';

const cn = bem('loading');

interface LoadingBaseProps {
  /** loading title  */
  title: string;
  /** loading description  */
  desc?: ReactNode;
  /** box 사용여부  */
  removeBox?: boolean;
  /** remove dimmed 처리 */
  removeDimmed?: boolean;
}

interface LoadingDefaultProps extends LoadingBaseProps {
  /** progressbar type  */
  variant?: 'none' | 'spinner';
  /** progressbar % */
  percent?: never;
}

interface LoadingProgressBarProps extends LoadingBaseProps {
  /** progressbar type  */
  variant?: 'progressbar';
  /** progressbar % */
  percent: number;
}

export type LoadingProps = LoadingDefaultProps | LoadingProgressBarProps;

const ProgressBar = ({ percent = 0 }: { percent?: number }) => {
  return (
    <div className={cn('progressbar')}>
      <span style={{ transform: `translateX(${percent - 100}%)` }} />
      <Ir>{`${percent}% 로딩 중`}</Ir>
    </div>
  );
};

const Spinner = () => {
  return (
    <div className={cn('spinner')}>
      <span />
      <span />
      <span />
      <Ir>로딩 중</Ir>
    </div>
  );
};

const Loading = ({
  desc,
  percent,
  removeBox = false,
  removeDimmed = false,
  title,
  variant = 'spinner',
}: LoadingProps) => {
  const [image, setImage] = useState<string>();

  const titleProps: TypographyProps = removeBox
    ? { color: 'white', variant: 'H3' }
    : { color: 'grayscale-gray900', variant: 'B1', weight: 'bold' };

  const descProps: TypographyProps = removeBox
    ? { color: 'white', variant: 'B2' }
    : { color: 'grayscale-gray900', variant: 'B2' };

  useEffect(() => {
    (async () => {
      try {
        const loading = await import('./img/loading.gif');
        setImage(loading.default);
      } catch {
        throw new Error('gif가 정상적으로 로딩되지 않았습니다.');
      }
    })();
  }, []);

  return (
    <div
      className={cn(undefined, {
        dimmed: !removeDimmed,
      })}
    >
      <div
        className={cn('content', {
          'remove-box': removeBox,
        })}
      >
        <div className={cn('loader')}>
          <div className={cn('message')}>
            <Typography component="p" {...titleProps}>
              {title}
            </Typography>
            {desc && (
              <Typography component="p" {...descProps}>
                {desc}
              </Typography>
            )}
          </div>
        </div>
        {variant !== 'spinner' && (
          <div className={cn('animation')}>
            {image && <img alt="" src={image} srcSet={`${image} 1x, ${image} 2x, ${image} 3x`} />}
          </div>
        )}
        {variant === 'progressbar' && <ProgressBar percent={percent} />}
        {variant === 'spinner' && <Spinner />}
      </div>
    </div>
  );
};

Loading.displayName = 'Loading';
export default Loading;
