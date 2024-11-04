import { ComponentPropsWithoutRef, ReactNode } from 'react';
import { TypographyProps } from '../Typography';

export interface RadioProps extends Omit<ComponentPropsWithoutRef<'input'>, 'type'> {
  label: ReactNode;
  typographyProps?: Omit<TypographyProps, 'children'>;
}
