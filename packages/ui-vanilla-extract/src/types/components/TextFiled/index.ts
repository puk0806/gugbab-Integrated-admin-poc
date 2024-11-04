import { ComponentPropsWithRef } from 'react';

export interface TextFieldProps extends ComponentPropsWithRef<'input'> {
  status?: 'success' | 'error';
  statusMessage?: string;
}
