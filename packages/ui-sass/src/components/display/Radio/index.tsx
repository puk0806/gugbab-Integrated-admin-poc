import { bem } from '@gugbab-integrated-admin-poc/utils';
import { ForwardedRef, forwardRef, memo, useId } from 'react';
import { RadioProps } from '@types';
import Typography from '../Typography';

const cn = bem('radio');

const Radio = forwardRef(
  (
    { disabled = false, hidden = false, label, reverse = false, style, typographyProps, ...props }: RadioProps,
    ref: ForwardedRef<HTMLInputElement>,
  ) => {
    const uniqueId = useId();

    return (
      <div
        style={style}
        className={cn(undefined, {
          reverse: reverse,
          disabled: !!disabled,
          hidden: hidden,
        })}
      >
        <input {...props} className={cn('input')} disabled={disabled} id={`radio-${uniqueId}`} ref={ref} type="radio" />
        <label className={cn('label')} htmlFor={`radio-${uniqueId}`}>
          <Typography variant="B2" {...typographyProps}>
            {label}
          </Typography>
        </label>
      </div>
    );
  },
);

Radio.displayName = 'Radio';
export default memo(Radio);
