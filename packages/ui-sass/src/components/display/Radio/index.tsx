'use client';

import { bem } from '@gugbab-integrated-admin-poc/utils';
import { ForwardedRef, InputHTMLAttributes, ReactNode, forwardRef, useId } from 'react';
import Typography, { TypographyProps } from '../Typography';

const cn = bem('radio');

export interface RadioProps extends InputHTMLAttributes<HTMLInputElement> {
  /** radio label */
  label: string | ReactNode;
  /** reverse */
  reverse?: boolean;
  /** radio hidden */
  hidden?: boolean;
  /** disabled */
  disabled?: boolean;
  /** typographyProps */
  typographyProps?: Omit<TypographyProps, 'children'>;
}

const Radio = forwardRef(
  (
    { disabled = false, hidden = false, label, reverse = false, style, typographyProps, ...props }: RadioProps,
    ref: ForwardedRef<HTMLInputElement>,
  ) => {
    const uniqueId = useId();

    const classNames = cn(undefined, {
      reverse: reverse,
      disabled: disabled,
      hidden: hidden,
    });

    return (
      <div className={classNames} style={style}>
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
export default Radio;
