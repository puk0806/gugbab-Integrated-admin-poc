import { FocusEventHandler, ForwardedRef, forwardRef, useCallback, useEffect, useId, useState } from 'react';
import { TextFieldProps } from '@types';
import { classnames } from '@utils';
import Typography from '../Typography';
import * as styles from './index.css';

const TextField = forwardRef(
  (
    { onBlur, onFocus, placeholder, status, statusMessage, ...otherProps }: TextFieldProps,
    ref: ForwardedRef<HTMLInputElement>,
  ) => {
    const uniqueId = useId();
    const [isFocus, setIsFocus] = useState(false);
    const [isValue, setIsValue] = useState(false);

    const handleFocus = useCallback<FocusEventHandler<HTMLInputElement>>(
      e => {
        setIsFocus(true);
        onFocus?.(e);
      },
      [onFocus],
    );

    const handleBlur = useCallback<FocusEventHandler<HTMLInputElement>>(
      e => {
        setIsFocus(false);
        setIsValue(e.currentTarget.value ? true : false);
        onBlur?.(e);
      },
      [onBlur],
    );

    useEffect(() => {
      const input = document.getElementById(uniqueId);
      if ((input as HTMLInputElement).value) {
        setIsValue(true);
      }
    }, [uniqueId]);
    return (
      <div className={styles.container}>
        {placeholder && (
          <div
            className={classnames(styles.placeholder['base'], {
              [styles.placeholder['focus']]: isFocus,
              [styles.placeholder['value']]: !isFocus && isValue,
            })}
          >
            <Typography
              color={status === 'error' ? 'error' : status === 'success' || isFocus ? 'primary' : 'outline'}
              component="label"
              htmlFor={uniqueId}
              variant={isFocus || isValue ? 'C2' : 'B3'}
            >
              {placeholder}
            </Typography>
          </div>
        )}
        <input
          id={uniqueId}
          {...otherProps}
          ref={ref}
          className={classnames(styles.input, {
            [styles.error]: status === 'error',
            [styles.success]: status === 'success',
          })}
          onBlur={handleBlur}
          onFocus={handleFocus}
        />
        {status && statusMessage && (
          <div className={styles.message}>
            <Typography color={status === 'error' ? 'error' : 'primary'} variant="C2">
              {statusMessage}
            </Typography>
          </div>
        )}
      </div>
    );
  },
);

export default TextField;
