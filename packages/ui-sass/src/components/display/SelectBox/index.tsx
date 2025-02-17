import React, {
  ChangeEventHandler,
  ForwardedRef,
  forwardRef,
  KeyboardEvent,
  KeyboardEventHandler,
  memo,
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
import { IconProps, SelectBoxProps, TypographyProps } from '@types';
import Typography from '../Typography';
import Icon from '../Icon';

const cn = bem('select-box');

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
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const controller = control ? useController({ control, name, rules }) : null;
    const fieldValue = control && controller ? controller.field.value : value;
    const uniqueId = useId();

    const typographyProps = useMemo<Pick<TypographyProps, 'variant' | 'color'>>(() => {
      if (variant === 'box-small' || variant === 'text') {
        return {
          variant: 'D2',
        };
      }

      return {
        variant: 'B2',
      };
    }, [variant]);

    const iconProps = useMemo<Pick<IconProps, 'name' | 'color'>>(() => {
      if (variant === 'text') {
        return {
          name: 'system_down',
          size: 20,
        };
      }
      return {
        name: 'system_down',
      };
    }, [variant]);

    const selectedLabel = useMemo(() => options.find(c => c.value === fieldValue)?.text, [fieldValue, options]);

    const isMobileDevice = useMemo(() => {
      // 모바일 장치인지 확인하기 -> 리다이렉트
      if (typeof navigator === 'undefined') return false;
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

    const isSystemSelectbox = useMemo(() => useSystemOption || isMobileDevice, [isMobileDevice, useSystemOption]);

    /** panel reset */
    const resetPanel = useCallback(() => {
      const panel = panelRef.current as HTMLDivElement;
      panel.style.removeProperty('bottom');
      panel.style.removeProperty('top');
    }, []);

    /** focus 처리 */
    const selectedFocus = useCallback(() => {
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
    }, [value]);

    /** panel 열릴때 위치조정 / focus 처리 */
    const setPanelPosition = useCallback(() => {
      const selectbox = selectBoxRef.current;
      const panel = panelRef.current;
      if (!selectbox || !panel) {
        return;
      }

      const selectBoxRect = selectbox.getBoundingClientRect();
      // 임시로 opacity:0, display:block 처리
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
    }, [selectedFocus, value]);

    /** button click handler */
    const handleButtonClick = useCallback(() => {
      const state = open;
      if (state) {
        resetPanel();
      }
      setPanelPosition();
      setOpen(!state);
    }, [open, resetPanel, setPanelPosition]);

    /** button keydown */
    const handleButtonKeyDown = useCallback<KeyboardEventHandler<HTMLButtonElement>>(
      e => {
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
      },
      [resetPanel, selectedFocus],
    );

    /** option click handler */
    const handleOptionClick = useCallback<MouseEventHandler<HTMLButtonElement>>(
      e => {
        const { value } = e.currentTarget;
        const selectbox = selectBoxRef.current;

        onChange?.({ name, value });
        setValue?.(name, value);
        setOpen(false);
        resetPanel();
        (selectbox?.querySelector('[role="combobox"]') as HTMLButtonElement)?.focus();
      },
      [name, onChange, resetPanel, setValue],
    );

    /** option keyDown handler */
    const handleOptionKeyDown = useCallback(
      (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
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
          case 'Escape':
            flushSync(() => setOpen(false));
            resetPanel();
            (selectbox.querySelector('[role="combobox"]') as HTMLButtonElement)?.focus();
            break;
          case 'Enter':
            onChange?.({ name, value: target.value });
            setValue?.(name, target.value);
            resetPanel();
            flushSync(() => setOpen(false));
            (selectbox.querySelector('[role="combobox"]') as HTMLButtonElement)?.focus();
            return;
          case 'Tab':
            if (e.shiftKey) {
              thisIndex = (thisIndex - 1 + buttons.length) % buttons.length;
            } else {
              thisIndex = (thisIndex + 1) % buttons.length;
            }
            break;
          case 'ArrowUp':
            thisIndex = (thisIndex - 1 + buttons.length) % buttons.length;
            break;
          case 'ArrowDown':
            thisIndex = (thisIndex + 1) % buttons.length;
            break;
        }

        buttons[thisIndex].focus();
      },
      [name, onChange, resetPanel, setValue],
    );

    /** selectbox onChange */
    const handleChange = useCallback<ChangeEventHandler<HTMLSelectElement>>(
      e => {
        const { value } = e.currentTarget;
        e.preventDefault();
        onChange?.({ name, value });
        setValue?.(name, value);
        onNextRender(() => selectBoxRef.current?.getElementsByTagName('select')[0]?.focus());
      },
      [name, onChange, setValue],
    );

    /** 외부 클릭시 닫힘 처리 */
    const handleOutsideClose = useCallback<EventListener>(
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
      // console.log(name, value);
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
            ['has-width']: !!width,
            placeholder: !!useLabel,
            selected: !!selectedLabel,
            ['is-device']: isSystemSelectbox,
            [`${variant}`]: !!variant,
            error: !!error,
            success: !!success,
            disabled: !!disabled,
          })}
        >
          <div
            className={cn('screen', {
              ['is-mobile']: false,
            })}
          >
            <button
              aria-activedescendant={fieldValue ? `select-box-item-${uniqueId}-${fieldValue}` : undefined}
              aria-controls={`select-box-panel-${uniqueId}`}
              aria-disabled={disabled}
              aria-expanded={open}
              aria-haspopup="listbox"
              aria-hidden={isSystemSelectbox}
              aria-label={selectedLabel ?? title}
              className={cn('button', { disabled: disabled ? disabled : false })}
              disabled={disabled}
              role="combobox"
              tabIndex={isSystemSelectbox ? -1 : 0}
              type="button"
              onClick={isSystemSelectbox ? undefined : handleButtonClick}
              onKeyDown={isSystemSelectbox ? undefined : handleButtonKeyDown}
            >
              <span
                className={cn('label', {
                  selected: !!fieldValue,
                })}
              >
                {useLabel ? (
                  <>
                    <span>
                      <Typography isEllipsisOneLine {...typographyProps}>
                        <span className={cn('placeholder', { selected: selectedLabel || false })}>{title}</span>
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
                        type="button"
                        value={itemValue}
                        className={cn('item', {
                          selected: value === itemValue,
                        })}
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

export default memo(SelectBox);
