import React, {
  ChangeEvent,
  FocusEvent,
  ForwardedRef,
  forwardRef,
  memo,
  MouseEventHandler,
  ReactNode,
  useCallback,
  useId,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Controller, useController } from 'react-hook-form';
import { Noop } from 'react-hook-form/dist/types';
import { flushSync } from 'react-dom';
import { bem, changePhoneNumber } from '@gugbab-integrated-admin-poc/utils';
import { TextFieldProps } from '@types';
import Typography from '../Typography';
import Icon from '../Icon';

const cn = bem('text-field');

const TextField = forwardRef(
  (
    {
      button,
      children,
      clearable = undefined,
      control,
      disabled,
      error,
      id,
      label,
      name,
      numberType,
      onChange,
      placeholder,
      readOnly,
      required,
      reverse = false,
      rightAlign,
      rules,
      setValue,
      success,
      title,
      type = 'text',
      utils,
      width,
      ...props
    }: TextFieldProps,
    ref: ForwardedRef<HTMLInputElement>,
  ) => {
    const IconSize = 14;
    const uniqueId = useId();
    const [focus, setFocus] = useState(false);
    const rootDomRef = useRef<HTMLDivElement>(null);
    const fieldValue = control ? useController({ control, name, rules }) : null;

    // input set value(maxLength 한글 방지용)
    const setInputValue = useCallback((value: string) => {
      const rootDom = rootDomRef.current as HTMLDivElement;
      const input = rootDom.querySelector('input');
      let nativeInputValueSetter: any = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value');
      nativeInputValueSetter = nativeInputValueSetter.set;
      if (input) {
        nativeInputValueSetter.call(input, value);
      }
      return input;
    }, []);

    const parseValue = useCallback(
      (val: string) => {
        if (numberType === 'phone' && val) {
          return changePhoneNumber(val);
        } else if (numberType === 'business' && val) {
          val = val.replace(/[^0-9]/g, '').replace(/-/g, '');
          val = val.substring(0, 10);
          return val.replace(/^(\d{0,3})(\d{0,2})(\d{0,5})$/g, '$1-$2-$3').replace(/-{1,2}$/g, '');
        } else if (numberType === 'number' && val) {
          return val.replace(/[^0-9]/g, '').replace(/-/g, '');
        } else if (numberType === 'comma' && val) {
          const returnValue = val.replace(/[^0-9]/g, '').replace(/-/g, '');
          return Number(returnValue).toLocaleString('ko-KR');
        }
        return val;
      },
      [numberType],
    );

    // default onChange
    const handleChange = (e: ChangeEvent<HTMLInputElement>, fieldChange?: (...event: any[]) => void) => {
      const tmpVal: string = e.target.value;
      let resultVal = '';

      // 한글 모음, 자음의 반복입력의 경우 maxLength 벗어나는 현상 방지
      if (e.target.maxLength !== -1) {
        if (tmpVal && tmpVal.length > e.target.maxLength) {
          resultVal = tmpVal.substring(0, e.target.maxLength);
        }
      }

      resultVal = parseValue(tmpVal);
      flushSync(() => setValue?.(name, resultVal));
      onChange?.(e, resultVal);

      fieldChange?.(e);
    };

    // reset handler
    const handleReset: MouseEventHandler<HTMLButtonElement> = useCallback(
      e => {
        const input = setInputValue('');
        if (input) {
          input.focus();
          input.dispatchEvent(new Event('input', { bubbles: true }));
        }
        setValue?.(name, '');
      },
      [name, setInputValue, setValue],
    );

    const handleFocus = useCallback(() => {
      if (disabled || readOnly) return;
      setFocus(true);
    }, [disabled, readOnly]);

    const handleBlur = useCallback(
      (e: FocusEvent<HTMLInputElement>, fieldBlur?: Noop) => {
        setFocus(false);
        fieldBlur && fieldBlur();
        props?.onBlur?.(e);
      },
      [props],
    );

    const hasValue = useMemo(() => {
      if (fieldValue) {
        return fieldValue?.field?.value && fieldValue?.field?.value?.length > 0;
      }
      return props.value && String(props.value)?.length > 0;
    }, [fieldValue, props.value]);

    return (
      <div className={cn()} style={{ width }}>
        <div className={cn('container', { focus: !disabled && (hasValue || focus), transform: !!label })}>
          <div
            className={cn('field', {
              ['error']: !!error,
              ['reverse']: !!reverse,
              ['disabled']: !!disabled,
              ['readonly']: !!readOnly,
            })}
          >
            <div className={cn('input')} ref={rootDomRef}>
              <div
                className={cn('control', {
                  ['right-align']: !!rightAlign,
                })}
              >
                {label && (
                  <div className={cn('label', { transform: !!label })}>
                    <Typography
                      component="label"
                      htmlFor={id || `text-field-${uniqueId}`}
                      variant={hasValue || focus ? 'D2' : 'B2'}
                    >
                      {label}
                    </Typography>
                  </div>
                )}
                {control ? (
                  <Controller
                    control={control}
                    name={name}
                    rules={rules}
                    render={({ field }) => (
                      <input
                        {...props}
                        {...field}
                        autoComplete={props.autoComplete || 'off'}
                        disabled={disabled}
                        id={id || `text-field-${uniqueId}`}
                        readOnly={readOnly}
                        ref={field.ref}
                        type={type}
                        value={parseValue(field.value) || ''}
                        placeholder={
                          typeof label === 'undefined' ? placeholder : !hasValue && focus ? placeholder : undefined
                        }
                        onBlur={e => handleBlur(e, field.onBlur)}
                        onChange={e => handleChange(e, field.onChange)}
                        onFocus={handleFocus}
                      />
                    )}
                  />
                ) : (
                  <input
                    {...props}
                    autoComplete={props.autoComplete || 'off'}
                    disabled={disabled}
                    id={id || `text-field-${uniqueId}`}
                    name={name}
                    readOnly={readOnly}
                    ref={ref}
                    required={required}
                    title={title}
                    type={type}
                    placeholder={
                      typeof label === 'undefined' ? placeholder : !hasValue && focus ? placeholder : undefined
                    }
                    onBlur={e => handleBlur(e)}
                    onChange={handleChange}
                    onFocus={handleFocus}
                  />
                )}
              </div>
              {!readOnly && ((clearable === 'keep' && hasValue) || clearable === 'focus') && (
                <button
                  type="button"
                  className={cn('clear', {
                    [`${clearable}`]: clearable,
                  })}
                  onClick={handleReset}
                >
                  <Icon irName="입력값 지우기" name="close" size={IconSize} />
                </button>
              )}
              {!readOnly && clearable === 'search' && (
                <>
                  {hasValue ? (
                    <button
                      type="button"
                      className={cn('clear', {
                        [`${clearable}`]: clearable,
                      })}
                      onClick={handleReset}
                    >
                      <Icon irName="입력값 지우기" name="close" size={IconSize} />
                    </button>
                  ) : (
                    <Icon name="system_search" size={IconSize} />
                  )}
                </>
              )}
            </div>

            {utils && <div className={cn('utils')}>{utils}</div>}
          </div>
          {button && (
            <div className={cn('button')}>
              {React.Children.map<ReactNode, ReactNode>(button, child => {
                if (!React.isValidElement(child)) return null;
                const validChild = child as React.ReactElement<any>;
                return React.cloneElement(validChild as React.ReactElement<any>, {
                  ...validChild.props,
                });
              })}
            </div>
          )}
        </div>
        {(error || success || children) && (
          <div>
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
            {children && <div>{children}</div>}
          </div>
        )}
      </div>
    );
  },
);

TextField.displayName = 'TextField';
export default memo(TextField);
