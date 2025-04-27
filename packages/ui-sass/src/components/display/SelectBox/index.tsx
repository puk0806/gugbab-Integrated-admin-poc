import React, {
  ChangeEventHandler,
  ForwardedRef,
  forwardRef,
  KeyboardEvent,
  KeyboardEventHandler,
  MouseEventHandler,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useController } from 'react-hook-form';
import { flushSync } from 'react-dom';
import { bem, onNextRender } from '@gugbab-integrated-admin-poc/utils';
import Typography, { TypographyProps } from '../Typography';
import Icon, { IconProps } from '../Icon';

const cn = bem('select-box');

export type SelectValue = {
  [key: string]: string;
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

const SelectBox = forwardRef(
  (
    {
      control,
      disabled,
      error,
      itemTextLine = 'ellipsis',
      name,
      onChange,
      options,
      panelHeight,
      panelWidth = 'calc(100% + 2px)',
      panelX = 'left',
      rules,
      setValue,
      success,
      title,
      useLabel = false,
      useSystemOption = false,
      value,
      variant = 'box-small',
      width = 'auto',
    }: SelectBoxProps,
    ref: ForwardedRef<HTMLSelectElement>,
  ) => {
    const selectBoxRef = useRef<HTMLDivElement>(null);
    const panelRef = useRef<HTMLDivElement>(null);
    const [open, setOpen] = useState(false);
    const controller = control ? useController({ control, name, rules }) : null;
    const fieldValue = control && controller ? controller.field.value : value;
    const uniqueId = useId();

    const typographyProps: Pick<TypographyProps, 'variant'> = useMemo(() => {
      return variant === 'box-small' || variant === 'text' ? { variant: 'D2' } : { variant: 'B2' };
    }, [variant]);

    const iconProps: Pick<IconProps, 'name' | 'size'> = useMemo(() => {
      return variant === 'text' ? { name: 'system_down', size: 20 } : { name: 'system_down' };
    }, [variant]);

    const selectedLabel = useMemo(() => {
      return options.find(c => c.value === fieldValue)?.text;
    }, [fieldValue, options]);

    const isMobileDevice = useMemo(() => {
      if (typeof navigator === 'undefined') {
        return false;
      }
      if (
        navigator?.userAgent.match(/Android/i) ||
        navigator?.userAgent.match(/webOS/i) ||
        navigator?.userAgent.match(/iPhone/i) ||
        navigator?.userAgent.match(/iPad/i) ||
        navigator?.userAgent.match(/iPod/i) ||
        navigator?.userAgent.match(/BlackBerry/i) ||
        navigator?.userAgent.match(/Windows Phone/i)
      ) {
        return true;
      }
      return false;
    }, []);

    const isSystemSelectbox = useMemo(() => {
      return useSystemOption || isMobileDevice;
    }, [isMobileDevice, useSystemOption]);

    /** panel reset */
    const resetPanel = useCallback(() => {
      const panel = panelRef.current as HTMLDivElement;
      panel.style.removeProperty('bottom');
      panel.style.removeProperty('top');
    }, []);

    /** focus 처리 */
    const selectedFocus = () => {
      const panel = panelRef.current as HTMLDivElement;
      const buttons = panel.querySelectorAll('button');
      if (!value) {
        buttons[0].focus();
        return;
      }
      const selected = panel.querySelector(`[value="${value}"]`) as HTMLButtonElement;
      if (selected) {
        panel.scrollTo(0, selected.offsetTop);
        selected.focus();
      }
    };

    /** panel 열릴때 위치조정 / focus 처리 */
    const setPanelPosition = () => {
      const selectbox = selectBoxRef.current;
      const panel = panelRef.current;
      if (!selectbox || !panel) {
        return;
      }
      const selectBoxRect = selectbox.getBoundingClientRect();
      panel.classList.add('is-open-transparent');
      const panelHeight = panel.clientHeight;
      const screenHeight = Math.max(document.documentElement.clientHeight || window.innerHeight);
      if (value) {
        selectedFocus();
      }
      if (panelHeight + selectBoxRect.y + selectBoxRect.height > screenHeight) {
        panel.style.bottom = 'calc(100% + 1px)';
        panel.style.top = 'auto';
      }
    };

    /** button click handler */
    const handleButtonClick = () => {
      const state = open;
      if (state) {
        resetPanel();
      }
      setPanelPosition();
      setOpen(!state);
    };

    /** button keydown */
    const handleButtonKeyDown: KeyboardEventHandler<HTMLButtonElement> = e => {
      const selectbox = selectBoxRef.current;
      if (!selectbox) {
        return;
      }
      const key = e.key;
      if (key === 'Escape') {
        setOpen(false);
        (selectbox.querySelector('[role="combobox"]') as HTMLButtonElement)?.focus();
        resetPanel();
      }
      if (key === 'ArrowDown') {
        flushSync(() => setOpen(true));
        e.preventDefault();
        selectedFocus();
      }
    };

    /** option click handler */
    const handleOptionClick: MouseEventHandler<HTMLButtonElement> = e => {
      const { value } = e.currentTarget;
      const selectbox = selectBoxRef.current;
      onChange?.({ name, value });
      setValue?.(name, value);
      setOpen(false);
      resetPanel();
      (selectbox?.querySelector('[role="combobox"]') as HTMLButtonElement)?.focus();
    };

    /** option keyDown handler */
    const handleOptionKeyDown = (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
      e.preventDefault();
      const selectbox = selectBoxRef.current;
      const panel = panelRef.current;
      if (!selectbox || !panel) {
        return;
      }
      const buttons = panel.querySelectorAll('button');
      const target = e.currentTarget;
      const key = e.key;
      let thisIndex = index;

      switch (key) {
        case 'Escape': {
          flushSync(() => setOpen(false));
          resetPanel();
          (selectbox.querySelector('[role="combobox"]') as HTMLButtonElement)?.focus();
          break;
        }
        case 'Enter': {
          onChange?.({ name, value: target.value });
          setValue?.(name, target.value);
          resetPanel();
          flushSync(() => setOpen(false));
          (selectbox.querySelector('[role="combobox"]') as HTMLButtonElement)?.focus();
          return;
        }
        case 'Tab': {
          thisIndex = e.shiftKey ? (thisIndex - 1 + buttons.length) % buttons.length : (thisIndex + 1) % buttons.length;
          break;
        }
        case 'ArrowUp': {
          thisIndex = (thisIndex - 1 + buttons.length) % buttons.length;
          break;
        }
        case 'ArrowDown': {
          thisIndex = (thisIndex + 1) % buttons.length;
          break;
        }
      }

      buttons[thisIndex].focus();
    };

    /** selectbox onChange */
    const handleChange: ChangeEventHandler<HTMLSelectElement> = e => {
      const { value } = e.currentTarget;
      e.preventDefault();
      onChange?.({ name, value });
      setValue?.(name, value);
      onNextRender(() => selectBoxRef.current?.getElementsByTagName('select')[0]?.focus());
    };

    /** 외부 클릭시 닫힘 처리 */
    const handleOutsideClose: EventListener = useCallback(
      e => {
        if (!open || !selectBoxRef.current || !e.target) {
          return;
        }
        if (!selectBoxRef.current.contains(e.target as Node)) {
          setOpen(false);
          resetPanel();
        }
      },
      [open, resetPanel],
    );

    useEffect(() => {
      if (value && control) {
        setValue(name, value);
      }
    }, [control, name, setValue, value]);

    useEffect(() => {
      if (!isSystemSelectbox) {
        document.addEventListener('click', handleOutsideClose);
      }
      return () => {
        if (!isSystemSelectbox) {
          document.removeEventListener('click', handleOutsideClose);
        }
      };
    }, [handleOutsideClose, isSystemSelectbox]);

    return (
      <>
        <div
          ref={selectBoxRef}
          style={{ width }}
          className={cn(undefined, {
            'has-width': !!width,
            placeholder: !!useLabel,
            selected: !!selectedLabel,
            'is-device': isSystemSelectbox,
            [`${variant}`]: !!variant,
            error: !!error,
            success: !!success,
            disabled: !!disabled,
          })}
        >
          <div className={cn('screen', { 'is-mobile': false })}>
            <button
              aria-activedescendant={fieldValue ? `select-box-item-${uniqueId}-${fieldValue}` : undefined}
              aria-controls={`select-box-panel-${uniqueId}`}
              aria-disabled={disabled}
              aria-expanded={open}
              aria-haspopup="listbox"
              aria-hidden={isSystemSelectbox}
              aria-label={selectedLabel ?? title}
              className={cn('button', { disabled: !!disabled })}
              disabled={disabled}
              role="combobox"
              tabIndex={isSystemSelectbox ? -1 : 0}
              type="button"
              onClick={isSystemSelectbox ? undefined : handleButtonClick}
              onKeyDown={isSystemSelectbox ? undefined : handleButtonKeyDown}
            >
              <span className={cn('label', { selected: !!fieldValue })}>
                {useLabel ? (
                  <>
                    <span>
                      <Typography isEllipsisOneLine {...typographyProps}>
                        <span className={cn('placeholder', { selected: !!selectedLabel })}>{title}</span>
                      </Typography>
                      {selectedLabel && (
                        <Typography isEllipsisOneLine {...typographyProps}>
                          {selectedLabel ?? title}
                        </Typography>
                      )}
                    </span>
                  </>
                ) : (
                  <Typography isEllipsisOneLine {...typographyProps}>
                    {selectedLabel || title || options[0].text}
                  </Typography>
                )}
                <Icon size={24} {...iconProps} />
              </span>
            </button>
            {!isSystemSelectbox && (
              <div
                id={`select-box-panel-${uniqueId}`}
                ref={panelRef}
                style={{ width: panelWidth, maxHeight: panelHeight }}
                className={cn('panel', {
                  open: open,
                  [`${itemTextLine}`]: itemTextLine,
                  [`${panelX}`]: !!panelX,
                })}
              >
                <ul role="listbox">
                  {options.map(({ text, value: itemValue }, index) => (
                    <li
                      aria-selected={value === itemValue}
                      id={`select-box-item-${uniqueId}-${itemValue}`}
                      key={`select-box-item-${uniqueId}-${itemValue}`}
                      role="option"
                    >
                      <button
                        className={cn('item', { selected: value === itemValue })}
                        type="button"
                        value={itemValue}
                        onClick={handleOptionClick}
                        onKeyDown={e => handleOptionKeyDown(e, index)}
                      >
                        <Typography variant="D2">{text}</Typography>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <select
            className={cn('select')}
            defaultValue={fieldValue}
            disabled={disabled}
            id={`select-box-${uniqueId}`}
            key={!isSystemSelectbox ? fieldValue : uniqueId}
            name={name}
            ref={ref}
            tabIndex={isSystemSelectbox ? 0 : -1}
            title={title}
            onChange={isSystemSelectbox ? handleChange : undefined}
          >
            <option hidden={!!title || useSystemOption} value="">
              {title}
            </option>
            {options.map(({ text, value: itemValue }) => (
              <option key={`select-options-${uniqueId}-${itemValue}`} value={itemValue}>
                {text}
              </option>
            ))}
          </select>
        </div>
        <>
          {error && (
            <Typography color="accent-negative-red" component="p" variant="D2">
              {error}
            </Typography>
          )}
          {success && (
            <Typography color="secondary-navy" component="p" variant="D2">
              {success}
            </Typography>
          )}
        </>
      </>
    );
  },
);

SelectBox.displayName = 'SelectBox';
export default SelectBox;
