import { InputHTMLAttributes, ReactNode } from 'react';
import { TypographyProps } from '../Typography';

export interface RadioProps extends InputHTMLAttributes<HTMLInputElement> {
  /** radio label */
  label: string | ReactNode;
  /** reverse */
  reverse?: boolean;
  /** radio hidden */
  hidden?: boolean;
  /** disabled */
  disabled?: boolean;
  /** typographyProps */
  typographyProps?: Omit<TypographyProps, 'children'>;
}
