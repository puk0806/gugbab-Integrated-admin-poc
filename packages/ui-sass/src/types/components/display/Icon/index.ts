import icons from '@gugbab-integrated-admin-poc/icons';
import { ColorTypes } from '../../common/color';

export interface IconProps {
  /** 아이콘 클래스명 */
  name: (typeof icons)[number];
  /** icon fontsize(px) */
  size?: number;
  /** icon color(#de2231) */
  color?: ColorTypes;
  /** 웹접근성 위한 아이콘 이름 */
  irName?: string;
}
