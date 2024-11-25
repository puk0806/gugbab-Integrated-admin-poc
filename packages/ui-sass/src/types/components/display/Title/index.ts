import { ReactNode } from 'react';
import { IconProps } from '../Icon';
import { HighlightedTextProps } from '../../utils/HighlightedText';

export interface TitleProps {
  /** title string */
  title: ReactNode;
  /** Icon props */
  icon: IconProps;
  /** title 우측 ReactNode */
  aside?: ReactNode;
  /** title 강조 props HighlightedText 사용 */
  highlightedTextProps?: Omit<HighlightedTextProps, 'text' | 'weight'>;
  /** 우측 ReactNode */
  children?: ReactNode;
}
