import { ReactNode } from 'react';

export interface ChipProps {
  /** 외관 타입 정의 */
  variant?: 'filled' | 'outlined' | 'light-outlined';
  /** color 타입 정의 */
  color?: 'red' | 'accent-red' | 'green' | 'navi' | 'negative-red' | 'orange' | 'gray900' | 'gray700';
  children: ReactNode;
}
