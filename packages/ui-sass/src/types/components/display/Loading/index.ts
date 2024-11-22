import { ReactNode } from 'react';

interface LoadingBaseProps {
  /** loading title  */
  title: string;
  /** loading description  */
  desc?: ReactNode;
  /** box 사용여부  */
  removeBox?: boolean;
  /** remove dimmed 처리 */
  removeDimmed?: boolean;
}

interface LoadingDefaultProps extends LoadingBaseProps {
  /** progressbar type  */
  variant?: 'none' | 'spinner';
  /** progressbar % */
  percent?: never;
}

interface LoadingProgressBarProps extends LoadingBaseProps {
  /** progressbar type  */
  variant?: 'progressbar';
  /** progressbar % */
  percent: number;
}

export type LoadingProps = LoadingDefaultProps | LoadingProgressBarProps;
