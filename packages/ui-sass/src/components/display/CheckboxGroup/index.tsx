'use client';

import React, { ChangeEventHandler, ReactNode, useEffect, useMemo, useRef, useState } from 'react';
import { Controller, useController, RegisterOptions } from 'react-hook-form';
import { bem } from '@gugbab-integrated-admin-poc/utils';

const cn = bem('checkbox-group');

export interface CheckboxGroupProps {
  variant?: 'default' | 'tab' | 'tab-full-width' | 'chip';
  name: string;
  gutter?: number;
  rules?: RegisterOptions;
  value?: Array<string | number>;
  defaultDirection?: 'row' | 'column';
  onChange?: (e: React.ChangeEvent<HTMLInputElement>, values: { [key: string]: Array<string | number> }) => void;
  control?: any;
  setValue?: any;
  children: ReactNode[];
}

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
  const [isAll, setIsAll] = useState(false);
  const [values, setValues] = useState<Array<string | number>>(value ?? []);
  const controller = control ? useController({ control: control, name: name, rules: rules }) : null;

  const componentArrayRef = useRef<Array<string | number>>([]);
  componentArrayRef.current = [];
  let itemCount = 0;

  const classNames = cn(undefined, {
    [variant]: !!variant,
    [defaultDirection]: !!defaultDirection,
  });

  const checkValue = (val: string | number, checked: boolean) => {
    let prevValue = [...values];
    if (checked) {
      if (!values.includes(val)) {
        prevValue.push(val);
      }
    } else {
      prevValue = prevValue.filter(prev => {
        return prev !== val;
      });
    }
    return prevValue;
  };

  const handleSelectAll: ChangeEventHandler<HTMLInputElement> = e => {
    const { checked } = e.currentTarget;
    const newValues = checked ? componentArrayRef.current : [];

    setIsAll(checked);
    setValues(newValues);

    if (control && setValue) {
      setValue(name, newValues);
    }
    if (controller) {
      controller.field.onChange(newValues);
    }
    if (!control && onChange) {
      onChange(e, { [name]: newValues });
    }
  };

  const handleChange: ChangeEventHandler<HTMLInputElement> = e => {
    const { checked, value } = e.currentTarget;
    const newValues = checkValue(value, checked);

    setIsAll(componentArrayRef.current.every(val => newValues.includes(val)));
    setValues(newValues);

    if (control && controller) {
      controller.field.onChange(newValues);
    }
    if (!control && onChange) {
      onChange(e, { [name]: newValues });
    }
  };

  const isDesign = useMemo(() => variant !== 'default', [variant]);

  const propsOverride = (children: ReactNode, getPropsCallback: (child: any, index: number) => any) => {
    const _children = React.Children.toArray(children);
    const output: any[] = [];

    for (const [i, child] of _children.entries() as any) {
      if (child.props?.children) {
        const _child = React.cloneElement(child, {
          ...getPropsCallback(child, i),
          children: propsOverride(child.props.children, getPropsCallback),
        });
        output.push(_child);
      } else if (child.props) {
        let _child = null;

        if (!child.props.selectAll || !control) {
          if (!child.props.disabled && !child.props.selectAll && !child.props.isExcludeSelectAll) {
            componentArrayRef.current.push(child.props.value);
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
              key={`${name}-controller-${itemCount++}`}
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

        output.push(_child);
      } else {
        output.push(child);
      }
    }

    return output;
  };

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
      setIsAll(componentArrayRef.current.every(val => controlValue.includes(val)));
    }
  }, [controller, name, setValue, value]);

  return (
    <div className={classNames} style={{ gap: gutter ? `${gutter}px` : undefined }}>
      {group}
    </div>
  );
}

CheckboxGroup.displayName = 'CheckboxGroup';
export default CheckboxGroup;
