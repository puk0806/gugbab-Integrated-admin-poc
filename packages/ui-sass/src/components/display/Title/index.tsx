import { ReactNode } from 'react';
import { bem } from '@gugbab-integrated-admin-poc/utils';
import { HighlightedTextProps } from '@types';
import Typography from '../Typography';
import HighlightedText from '../../utils/HighlightedText';

const cn = bem('title');

export interface TitleProps {
  /** title string */
  title: ReactNode;
  /** title 우측 ReactNode */
  aside?: ReactNode;
  /** title 강조 props HighlightedText 사용 */
  highlightedTextProps?: Omit<HighlightedTextProps, 'text' | 'weight'>;
  /** 우측 ReactNode */
  children?: ReactNode;
}

function Title({ aside, children, highlightedTextProps, title }: TitleProps) {
  return (
    <div className={cn(undefined)}>
      <div className={cn('main')}>
        {typeof title === 'string' ? (
          <Typography component="p" variant="B1" weight="bold">
            {highlightedTextProps ? <HighlightedText {...highlightedTextProps} text={title} weight="bold" /> : title}
          </Typography>
        ) : (
          title
        )}
        {aside && <div className={cn('aside')}>{aside}</div>}
      </div>

      {children && <div className={cn('desc')}>{children}</div>}
    </div>
  );
}

Title.displayName = 'Title';
export default Title;
