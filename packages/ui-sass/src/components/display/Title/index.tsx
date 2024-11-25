import { memo } from 'react';
import { bem } from '@gugbab-integrated-admin-poc/utils';
import { TitleProps } from '@types';
import Typography from '../Typography';
import HighlightedText from '../../utils/HighlightedText';

const cn = bem('title');

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

export default memo(Title);
