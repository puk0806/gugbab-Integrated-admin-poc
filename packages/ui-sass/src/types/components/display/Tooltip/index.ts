import { ReactElement, ReactNode } from 'react';

type PlacementType =
  | 'top-start'
  | 'top'
  | 'top-end'
  | 'bottom-start'
  | 'bottom'
  | 'bottom-end'
  | 'left-top'
  | 'left'
  | 'left-bottom'
  | 'right-top'
  | 'right'
  | 'right-bottom';

export interface TooltipProps {
  /** panel design type */
  type?: 'bubble' | 'square';
  /** tooltip anchor */
  anchor: ReactElement;
  /** 최초 랜더링시 panel 활성화 여부 */
  isFirstRenderVisible?: boolean;
  /** panel close button 활성화 여부 */
  useCloseBtn?: boolean;
  /** anchor event */
  trigger?: 'click' | 'hover';
  /** panel 정렬 */
  placement?: PlacementType;
  /** 영역 밖 클릭시 닫기 */
  useHideClick?: boolean;
  /** 스클로시 닫기 */
  useHideScroll?: boolean;
  /** tooltip panel */
  children: ReactNode;
  /** 열은 후 callback 처리 */
  onAfterShow?: () => void;
  /** 닫은 후 callback 처리 */
  onAfterHide?: () => void;
}

// nterface PanelArrowType extends PanelDefaultType {
//   /** panel design type */
//   type?: Exclude<PanelType, 'box'>;
//   /** panel arrow 활성화 여부 */
//   useArrow?: boolean;
//   /** tooltip design color type */
//   color?: 'white' | 'primary';
// }

// interface PanelNotArrowType extends PanelDefaultType {
//   /** panel design type */
//   type?: Exclude<PanelType, 'bubble' | 'square'>;
//   /** panel arrow 활성화 여부 */
//   useArrow?: never;
//   /** tooltip design color type */
//   color?: never;
// }

export interface PanelStyleType {
  width: string;
  left?: string;
  opacity?: string;
}
