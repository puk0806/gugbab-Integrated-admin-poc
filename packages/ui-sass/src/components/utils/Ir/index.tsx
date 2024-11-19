import { memo } from 'react';
import { bem } from '@gugbab-integrated-admin-poc/utils';
import { IrProps } from '@types';

const cn = bem('ir');

function Ir({ children }: IrProps) {
  return <span className={cn()}>{children}</span>;
}

Ir.displayName = 'Ir';

export default memo(Ir);
