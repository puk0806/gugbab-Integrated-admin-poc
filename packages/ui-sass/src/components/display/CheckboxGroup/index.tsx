import React, { ChangeEventHandler, ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import { Controller, useController } from 'react-hook-form';
import { CheckboxGroupProps } from '@types';
import { bem } from '@utils';

const cn = bem('checkbox-group');

function CheckboxGroup({
  children,
  control,
  defaultDirection = 'row',
  gutter,
  name,
  onChange,
  rules,
  setValue,
  value,
  variant = 'default',
}: CheckboxGroupProps) {
  // 전체선택여부
  const [isAll, setIsAll] = useState(false);
  // 전체선택 checkbox를 제외한 value
  const componentArray: Array<string | number> = [];
  // react hook form controller
  const controller = control ? useController({ control, name, rules }) : null;
  const [values, setValues] = useState<Array<string | number>>(value ?? []);
  let itemCount = 0;

  /** 전체선택 체크박스 handler */
  const handleSelectAll: ChangeEventHandler<HTMLInputElement> = useCallback(
    e => {
      const { checked } = e.currentTarget;
      const newValues = checked ? componentArray : [];
      setIsAll(checked);
      setValues(newValues);
      control && setValue && setValue(name, newValues);
      controller && controller.field.onChange(newValues);
      !control && onChange && onChange?.(e, { [`${name}`]: newValues });
    },
    [componentArray, control, controller, name, onChange, setValue],
  );

  /** check 여부 판단 */
  const checkValue = useCallback(
    (val: string | number, checked: boolean) => {
      let prevValue = [...values];
      if (checked) {
        if (!values.includes(val)) {
          prevValue.push(val);
        }
      } else {
        prevValue = prevValue.filter(prev => prev !== val);
      }
      return prevValue;
    },
    [values],
  );

  /** onChange handler */
  const handleChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    e => {
      const { checked, value } = e.currentTarget;
      const newValues = checkValue(value, checked);

      setIsAll(componentArray.every(val => newValues.includes(val)));
      setValues(newValues);
      control && controller && controller.field.onChange(newValues);
      !control && onChange && onChange?.(e, { [`${name}`]: newValues });
    },
    [checkValue, componentArray, control, controller, name, onChange],
  );

  const isDesign = useMemo(() => variant !== 'default', [variant]);

  /** dom 여부 파악해서 컴포넌트로 props 전달 */
  const propsOverride = useCallback(
    (children: ReactNode, getPropsCallback: any) => {
      const _children = React.Children.toArray(children);
      let output: any[] = [];
      for (const [i, child] of _children.entries() as any) {
        if (child.props?.children) {
          // dom node
          const _child = React.cloneElement(child, {
            ...getPropsCallback(child, i),
            children: propsOverride(child.props.children, getPropsCallback),
          });
          output = [...output, _child];
        } else if (child.props) {
          let _child = null;
          if (!child.props.selectAll || !control) {
            if (!child.props.disabled && !child.props.selectAll && !child.props.isExcludeSelectAll) {
              componentArray.push(child.props.value);
            }
            _child = React.cloneElement(child, {
              name: name,
              value: child.props.value,
              ...child.props,
              ...getPropsCallback(child, i),
            });
          } else {
            _child = (
              <Controller
                control={control}
                key={`${name}-${itemCount}`}
                name={name}
                rules={rules}
                render={({ field }) => {
                  return React.cloneElement(child, {
                    ...child.props,
                    ...field,
                    ...getPropsCallback(child, i),
                  });
                }}
              />
            );
          }
          output = [...output, _child];
        } else {
          // other
          output = [...output, child];
        }
      }
      return output;
    },
    [componentArray, control, itemCount, name, rules],
  );

  /** 컴포넌트 props 처리 */
  const group = propsOverride(children, (child: any, index: number) => {
    if (child.props.isExcludeSelectAll) {
      return { key: `${name}-checkbox-${itemCount++}` };
    }

    if (!child.props.value) {
      return { key: child.props.name || `tempKey_${itemCount++}` };
    }
    return {
      value: child.props.value,
      onChange: child.props.selectAll ? handleSelectAll : handleChange,
      checked: child.props.selectAll ? isAll : values.includes(child.props.value) || false,
      hiddenElement: isDesign ? 'checkbox' : undefined,
    };
  });

  useEffect(() => {
    const controlValue = controller ? (controller.field.value ?? value) : value;
    if (controlValue) {
      setValues(controlValue);
      setIsAll(componentArray.every(val => controlValue.includes(val)));
    }
  }, [componentArray, controller, name, setValue, value]);

  return (
    <div
      style={{ gap: gutter ? `${gutter}px` : undefined }}
      className={cn(undefined, {
        [`${variant}`]: !!variant,
        [`${defaultDirection}`]: !!defaultDirection,
      })}
    >
      {group}
    </div>
  );
}

export default CheckboxGroup;
