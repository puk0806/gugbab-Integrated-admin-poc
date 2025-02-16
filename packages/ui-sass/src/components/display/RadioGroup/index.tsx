import type { ReactNode } from 'react';
import { Controller } from 'react-hook-form';
import React, { Fragment, useMemo } from 'react';
import { bem } from '@gugbab-integrated-admin-poc/utils';
import { RadioGroupProps } from '@types';

const cn = bem('radio-group');

const RadioGroup = ({
  children,
  control,
  gutter,
  name,
  rules,
  typographyProps,
  variant = 'default',
  ...props
}: RadioGroupProps) => {
  const { onChange, value } = props;

  const isDesign = useMemo(() => variant !== 'default', [variant]);

  return (
    <div
      className={cn(undefined, {
        [`${variant}`]: !!variant,
      })}
    >
      {React.Children.map<ReactNode, ReactNode>(children, (child, index) => {
        if (!React.isValidElement(child)) return null;
        const style =
          gutter && React.Children.count(children) - 1 !== index ? { marginRight: `${gutter}px` } : undefined;
        return (
          <Fragment key={`${name}-${index}`}>
            {control ? (
              <Controller
                control={control}
                name={name}
                rules={rules}
                render={({ field }) => {
                  return React.cloneElement(child, {
                    ...child.props,
                    ...field,
                    value: child.props.value,
                    checked: child.props.value === field.value,
                    onChange: onChange,
                    hidden: isDesign,
                    typographyProps:
                      variant === 'chip'
                        ? {
                            ...typographyProps,
                            ...child.props.typographyProps,
                          }
                        : {
                            ...typographyProps,
                            ...child.props.typographyProps,
                          },
                    style,
                  });
                }}
              />
            ) : (
              React.cloneElement(child, {
                ...child.props,
                name: name,
                value: child.props.value,
                defaultChecked: child.props.value === value || false,
                onChange: onChange,
                hidden: isDesign,
                typographyProps:
                  variant === 'chip'
                    ? {
                        ...typographyProps,
                        ...child.props.typographyProps,
                      }
                    : {
                        ...typographyProps,
                        ...child.props.typographyProps,
                      },
                style,
              })
            )}
          </Fragment>
        );
      })}
    </div>
  );
};

export default RadioGroup;
