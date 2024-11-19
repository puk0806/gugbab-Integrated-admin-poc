import { ChangeEvent, ReactNode } from 'react';
import { RegisterOptions } from 'react-hook-form';

export interface CheckboxGroupProps {
  /** checkbox group type */
  variant?: 'default' | 'tab' | 'tab-full-width' | 'chip';
  /** name */
  name: string;
  /** gutter */
  gutter?: number;
  /** react-hook-form validation rule */
  rules?: RegisterOptions;
  /** value(not react-hook-form) */
  value?: Array<string | number>;
  /** variant default direction */
  defaultDirection?: 'row' | 'column';
  /** onChange handler(not  react-hook-form) */
  onChange?: (e: ChangeEvent<HTMLInputElement>, values: { [key in string]: Array<string | number> }) => void;
  /** react-hook-form control */
  control?: any;
  /** react-hook-form setValue */
  setValue?: any;
  children: ReactNode[];
}
