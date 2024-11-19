import type { ForwardedRef } from 'react';
import { forwardRef, memo, useId } from 'react';
import { bem } from '@utils';
import { CheckboxProps } from '@types';
import Typography from '../Typography';
import Icon from '../Icon';

const cn = bem('checkbox');

const Checkbox = forwardRef(
  (
    {
      borderType = 'default',
      disabled = false,
      hiddenElement,
      isExcludeSelectAll = false,
      label,
      reverse = false,
      selectAll = false,
      style,
      typographyProps,
      ...props
    }: CheckboxProps,
    ref: ForwardedRef<HTMLInputElement>,
  ) => {
    const uniqueId = useId();
    return (
      <div
        style={style}
        className={cn(undefined, {
          reverse: reverse,
          disabled: !!disabled,
          [`hidden-${hiddenElement}`]: !!hiddenElement,
          [`border-${borderType}`]: !!borderType,
        })}
      >
        <input
          {...props}
          className={cn('input')}
          disabled={disabled}
          id={`checkbox-${uniqueId}`}
          ref={ref}
          type="checkbox"
        />
        <label className={cn('label')} htmlFor={`checkbox-${uniqueId}`}>
          {typeof label === 'string' ? (
            <Typography variant="B2" {...{ color: 'grayscale-gray900', ...typographyProps }}>
              {label}
            </Typography>
          ) : (
            label
          )}
        </label>
        <span className={cn('icon')}>
          <Icon color="secondary-navy" name="check" size={20} aria-hidden />
        </span>
      </div>
    );
  },
);

Checkbox.displayName = 'Checkbox';
export default memo(Checkbox);
