import { ChangeEvent, InputHTMLAttributes, ReactNode } from 'react';

export interface TextFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  /** input inline width */
  width?: string;
  /** input title string */
  title?: string;
  /** label string */
  label?: string;
  /** text field text align right */
  rightAlign?: boolean;
  /** text field name */
  name: string;
  /** validation error message */
  error?: string;
  /** validation success message */
  success?: string;
  /** clear button 활성화 ( `keep : value가 있을경우 유지`, `focus : focus시에만 노출`, `search : search icon 과 clear btn change` ) */
  clearable?: 'keep' | 'focus' | 'search';
  /** Reverse */
  reverse?: boolean;
  /** number Type */
  numberType?: 'phone' | 'business' | 'number' | 'comma';
  /** text field utils */
  utils?: ReactNode;
  /** react hook form control */
  control?: any;
  /** react hook form setValue */
  setValue?: any;
  /** react hook form rules */
  rules?: any;
  /** text field 우측 추가 button */
  button?: ReactNode;
  /** text field 우측 추가 button */
  onChange?: (e: ChangeEvent<HTMLInputElement>, value: string) => void;
  /** text field 하단 추가 children */
  children?: ReactNode;
}
