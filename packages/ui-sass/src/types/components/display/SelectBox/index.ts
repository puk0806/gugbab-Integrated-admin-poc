export type SelectValue = {
  [key in string]: string;
};

export interface SelectBoxProps {
  /** selectbox design type */
  variant?: 'box' | 'box-small' | 'text';
  /** selectbox name */
  name: string;
  /** 버튼과 셀렉트 박스 타이틀 값  */
  title: string;
  /** selectbox options */
  options: Partial<HTMLOptionElement>[];
  /** selectbox value */
  value?: string;
  /** 강제 system selectbox 사용 */
  useSystemOption?: boolean;
  /** design type selectbox width */
  width?: string;
  /** design type selectbox panel horizontal position */
  panelX?: 'left' | 'right';
  /** design type selectbox panel width */
  panelWidth?: string;
  /** design type selectbox panel maxHeight */
  panelHeight?: string;
  /** design type selectbox text ellipsis style */
  itemTextLine?: 'multi' | 'single' | 'ellipsis';
  /** react hook form control */
  control?: any;
  /** react hook form setValue */
  setValue?: any;
  /** react hook form rules */
  rules?: any;
  /** validation error message */
  useLabel?: boolean;
  /** validation error message */
  error?: string;
  /** validation success message */
  success?: string;
  /** disabled */
  disabled?: boolean;
  /** hook-form 아닐경우 onChange */
  onChange?: (value: SelectValue) => void;
}
