import { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react';
import { TypographyProps } from '../Typography';

type ButtonSize = 'xlarge' | 'large' | 'medium' | 'small';

type ButtonVariant = 'contained' | 'outline';

type ButtonColor = 'primary' | 'error';

interface ButtonOwnProps {
  children: ReactNode;
  color?: ButtonColor;
  variant?: ButtonVariant;
  size?: ButtonSize;
  isFullWidth?: boolean;
  typographyProps?: Omit<TypographyProps, 'children'>;
}

export type ButtonProps<E extends ElementType = 'button'> = ButtonOwnProps &
  Omit<ComponentPropsWithoutRef<E>, keyof ButtonOwnProps> & { component?: E };
