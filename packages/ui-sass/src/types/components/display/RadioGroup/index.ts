import { RegisterOptions } from 'react-hook-form';
import { InputHTMLAttributes, ReactNode } from 'react';
import { TypographyProps } from '../Typography';

export interface RadioGroupProps extends InputHTMLAttributes<HTMLInputElement> {
  /** radio group type */
  variant?: 'default' | 'tab' | 'tab-full-width' | 'chip';
  /** radio name */
  name: string;
  /** gutter */
  gutter?: number;
  /** typographyProps */
  typographyProps?: Omit<TypographyProps, 'children'>;
  /** react-hook-form validation rule */
  rules?: RegisterOptions;
  /** react-hook-form control */
  control?: any;
  /** Radio component */
  children: ReactNode;
}
