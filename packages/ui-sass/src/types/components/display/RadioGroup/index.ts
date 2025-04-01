import { RegisterOptions } from 'react-hook-form';
import { InputHTMLAttributes, ReactElement } from 'react';
import { TypographyProps } from '../Typography';
import { RadioProps } from '../Radio';

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
  children: ReactElement<RadioProps> | ReactElement<RadioProps>[];
}
