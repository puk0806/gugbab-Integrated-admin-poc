import { TypographyProps, TypographyTags } from '../../display/Typography';

export interface HighlightedTextProps extends Pick<TypographyProps, 'color' | 'weight' | 'variant'> {
  /** 텍스트 */
  text: string;
  /** highlight 할 텍스트 */
  highlightedText: string;
  /** highlight 할 텍스트 tag */
  highlightedTag?: Extract<TypographyTags, 'span' | 'mark' | 'strong' | 'em'>;
  /** highlight 할 색상 */
  highlightedColor?: TypographyProps['color'];
  /** highlight 할 text wegiht */
  highlightedWeight?: TypographyProps['weight'];
  /** html text */
  isHtml?: boolean;
}
