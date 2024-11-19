import type { CSSProperties } from 'react';
import { memo } from 'react';
import { bem } from '@gugbab-integrated-admin-poc/utils';
import { IconProps } from '@types';
import { Ir } from '../../../index';

const Icon = ({ color, irName, name, size = 24 }: IconProps) => {
  const cn = bem('icon');
  const style: CSSProperties = {};

  if (size) {
    style.width = `${size}px`;
    style.height = `${size}px`;
    style.backgroundSize = `${size}px auto`;
    style.fontSize = `${size}px`;
  }

  return (
    <>
      <i className={cn(undefined, { [name]: name, [`${color}`]: !!color })} style={{ ...style }} />
      {irName && <Ir>{irName}</Ir>}
    </>
  );
};

Icon.displayName = 'Icon';

export default memo(Icon);
