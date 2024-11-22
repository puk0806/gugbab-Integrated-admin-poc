import { bem } from '@gugbab-integrated-admin-poc/utils';
import { memo, useEffect, useMemo, useState } from 'react';
import { LoadingProps, TypographyProps } from '@types';
import Ir from '../../utils/Ir';
import Typography from '../Typography';

const cn = bem('loading');

const ProgressBar = ({ percent = 0 }: { percent?: number }) => {
  return (
    <div className={cn('progressbar')}>
      <span style={{ transform: `translateX(${percent - 100}%)` }}></span>
      <Ir>{`${percent.toString()}% 로딩 중`}</Ir>
    </div>
  );
};

const Spinner = memo(() => {
  return (
    <div className={cn('spinner')}>
      <span></span>
      <span></span>
      <span></span>
      <Ir>로딩 중</Ir>
    </div>
  );
});

const Loading = ({
  desc,
  percent,
  removeBox = false,
  removeDimmed = false,
  title,
  variant = 'spinner',
}: LoadingProps) => {
  const [image, setImage] = useState<string>();

  const titleProps = useMemo<TypographyProps>(
    () =>
      removeBox
        ? {
            color: 'white',
            variant: 'H3',
          }
        : {
            color: 'grayscale-gray900',
            variant: 'B1',
            weight: 'bold',
          },
    [removeBox],
  );

  const descProps = useMemo<TypographyProps>(
    () =>
      removeBox
        ? {
            color: 'white',
            variant: 'B2',
          }
        : {
            color: 'grayscale-gray900',
            variant: 'B2',
          },
    [removeBox],
  );

  const loadingContent = useMemo(
    () => (
      <>
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

        <div className={cn('animation')}>
          {image && (
            <>
              <img alt="" src={image} srcSet={`${image} 1x, ${image} 2x, ${image} 3x`} />
            </>
          )}
        </div>
      </>
    ),
    [desc, descProps, image, title, titleProps],
  );

  useEffect(() => {
    (async function () {
      try {
        const loading = await import(`./img/loading.gif`);
        setImage(loading.default);
      } catch (error) {
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
          ['remove-box']: removeBox,
        })}
      >
        <div className={cn('loader')}>{loadingContent}</div>
        {variant === 'progressbar' && <ProgressBar percent={percent} />}
        {variant === 'spinner' && <Spinner />}
      </div>
    </div>
  );
};

Loading.displayName = 'Loading';
export default memo(Loading);
