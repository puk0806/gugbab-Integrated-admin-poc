'use client';

import type { ForwardedRef, InputHTMLAttributes, ReactNode } from 'react';
import { forwardRef, useId } from 'react';
import { bem } from '@gugbab-integrated-admin-poc/utils';
import { FieldValues, UseFormRegister } from 'react-hook-form';
import { TypographyProps } from '@types';
import Typography from '../Typography';
import Icon from '../Icon';

const cn = bem('checkbox');

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'hidden' | 'id'> {
  /** Checkbox label */
  label: string | ReactNode;
  /** Reverse */
  reverse?: boolean;
  /** Checkbox hidden */
  hiddenElement?: 'checkbox' | 'label';
  /** disabled */
  disabled?: boolean;
  /** CheckboxGroup component 사용시 all check 제외 여부 */
  isExcludeSelectAll?: boolean;
  /** CheckboxGroup component 사용시 전체선택 체크박스인지 구분 */
  selectAll?: boolean;
  /** checkbox border type  */
  borderType?: 'default' | 'circle' | 'none';
  /** typographyProps */
  typographyProps?: Omit<TypographyProps, 'children'>;
  /** 단일로 react-hook-form을 사용할 경우 resiger props를 활용 */
  register?: UseFormRegister<FieldValues>;
}

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
      ...rest
    }: CheckboxProps,
    ref: ForwardedRef<HTMLInputElement>,
  ) => {
    const uniqueId = useId();

    const classNames = cn(undefined, {
      reverse: reverse,
      disabled: !!disabled,
      [`hidden-${hiddenElement}`]: !!hiddenElement,
      [`border-${borderType}`]: !!borderType,
    });

    return (
      <div className={classNames} style={style}>
        <input
          {...rest}
          className={cn('input')}
          disabled={disabled}
          id={`checkbox-${uniqueId}`}
          ref={ref}
          type="checkbox"
        />
        <label className={cn('label')} htmlFor={`checkbox-${uniqueId}`}>
          {typeof label === 'string' ? (
            <Typography color="grayscale-gray900" variant="B2" {...typographyProps}>
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
export default Checkbox;
