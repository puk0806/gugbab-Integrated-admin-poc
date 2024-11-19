import { InputHTMLAttributes, ReactNode } from 'react';
import { FieldValues, UseFormRegister } from 'react-hook-form';
import { TypographyProps } from '../Typography';

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
