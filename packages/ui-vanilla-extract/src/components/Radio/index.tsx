import { ForwardedRef, forwardRef, memo, useId } from 'react';
import { RadioProps } from '@types';
import Typography from '../Typography';
import * as styles from './index.css';

const Radio = forwardRef(
  ({ label, typographyProps, ...otherProps }: RadioProps, ref: ForwardedRef<HTMLInputElement>) => {
    const uniqueId = useId();

    return (
      <div className={styles.container}>
        <input {...otherProps} className={styles.input} id={uniqueId} ref={ref} type="radio" />
        <label className={styles.label} htmlFor={uniqueId}>
          <span className={styles.typo}>
            {typeof label === 'string' ? (
              <Typography color="onSurface" variant="B2" {...typographyProps}>
                {label}
              </Typography>
            ) : (
              label
            )}
          </span>
        </label>
      </div>
    );
  },
);

export default memo(Radio);
