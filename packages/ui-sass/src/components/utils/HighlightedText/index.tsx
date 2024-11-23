import { memo } from 'react';
import { quoteRegexSpecialCharacters, validateHtmlKeyword } from '@gugbab-integrated-admin-poc/utils';
import { HighlightedTextProps } from '@types';
import Typography from '../../display/Typography';

function HighlightedText({
  color,
  highlightedColor = 'secondary-navy-blue',
  highlightedTag = 'mark',
  highlightedText,
  highlightedWeight,
  isHtml = false,
  text,
  variant,
  weight,
}: HighlightedTextProps) {
  const parts = text.split(new RegExp(`(${quoteRegexSpecialCharacters(highlightedText)})`, 'gi'));

  /**
   * TODO : 먼 미래에 최적화 및 리팩토링, 의미있는 작업을 진행해야 할 것
   * NOTE : 검색 결과가 태그 문자열을 포함하고 있어, 해당 부분을 하이라이팅 하지는 않으나 검색 결과는 나오는 현상이 있음
   */
  const parseHtml = () => {
    // html 을 제거한 뒤 일치하는 문자가 있는지 선별한다.
    const contents = text.replace(/<[^>]*>?/gi, '');
    const checkContent = contents
      .split(new RegExp(`(${quoteRegexSpecialCharacters(highlightedText)})`, 'gi'))
      .some(part => highlightedText.length > 0 && part.toLowerCase() === highlightedText.toLowerCase());
    return checkContent
      ? parts
          .map((part, index) =>
            highlightedText.length > 0 &&
            part.toLowerCase() === highlightedText.toLowerCase() &&
            !validateHtmlKeyword(part)
              ? `<Typography tag={highlightedTag} color={highlightedColor} variant={variant} weight={highlightedWeight} key="${index}">${part}</Typography>`
              : part,
          )
          .join('')
      : parts.join('');
  };

  return !isHtml ? (
    <Typography color={color} variant={variant} weight={weight} isEllipsisOneLine>
      {parts.map((part, index) =>
        part.toLowerCase() === highlightedText.toLowerCase() ? (
          <Typography
            color={highlightedColor}
            component={highlightedTag}
            key={index}
            variant={variant}
            weight={highlightedWeight}
          >
            {part}
          </Typography>
        ) : (
          part
        ),
      )}
    </Typography>
  ) : (
    <Typography color={color} variant={variant} weight={weight} isEllipsisOneLine>
      <div
        dangerouslySetInnerHTML={{
          __html: parseHtml(),
        }}
      />
    </Typography>
  );
}

export default memo(HighlightedText);
