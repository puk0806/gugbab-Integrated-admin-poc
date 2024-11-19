import { memo } from 'react';
import { bem } from '@gugbab-integrated-admin-poc/utils';
import { ChipProps } from '@types';
import Typography from '../Typography';

const cn = bem('chip');

const Chip = ({ children, color = 'gray900', variant = 'filled' }: ChipProps) => {
  return (
    <span
      className={cn(undefined, {
        [variant]: !!variant,
        [color]: !!color,
      })}
    >
      {typeof children === 'string' ? (
        <Typography component="em" variant="D2" weight="regular">
          {children}
        </Typography>
      ) : (
        children
      )}
    </span>
  );
};

Chip.displayName = 'Chip';

export default memo(Chip);
