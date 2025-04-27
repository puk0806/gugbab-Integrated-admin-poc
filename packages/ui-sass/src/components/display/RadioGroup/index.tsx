'use client';

import type { InputHTMLAttributes, ReactElement } from 'react';
import React, { Fragment } from 'react';
import { Controller, RegisterOptions } from 'react-hook-form';
import { bem } from '@gugbab-integrated-admin-poc/utils';
import { RadioProps } from '../Radio';
import { TypographyProps } from '../Typography';

const cn = bem('radio-group');

export interface RadioGroupProps extends InputHTMLAttributes<HTMLInputElement> {
  /** radio group type */
  variant?: 'default' | 'tab' | 'tab-full-width' | 'chip';
  /** radio name */
  name: string;
  /** gutter */
  gutter?: number;
  /** typographyProps */
  typographyProps?: Omit<TypographyProps, 'children'>;
  /** react-hook-form validation rule */
  rules?: RegisterOptions;
  /** react-hook-form control */
  control?: any;
  /** Radio component */
  children: ReactElement<RadioProps> | ReactElement<RadioProps>[];
}

const RadioGroup = ({
  children,
  control,
  gutter,
  name,
  onChange,
  rules,
  typographyProps,
  value,
  variant = 'default',
}: RadioGroupProps) => {
  const isDesign = variant !== 'default';

  return (
    <div className={cn(undefined, { [variant]: true })}>
      {React.Children.map(children, (child, index) => {
        if (!React.isValidElement(child)) {
          return null;
        }

        const validChild = child as ReactElement<RadioProps>;
        const isLast = index === React.Children.count(children) - 1;
        const spacingStyle = gutter && !isLast ? { marginRight: `${gutter}px` } : undefined;

        const commonProps = {
          ...validChild.props,
          name,
          value: validChild.props.value,
          hidden: isDesign,
          style: spacingStyle,
          typographyProps: {
            ...typographyProps,
            ...validChild.props.typographyProps,
          },
        };

        return control ? (
          <Fragment key={`${name}-${index}`}>
            <Controller
              control={control}
              name={name}
              rules={rules}
              render={({ field }) =>
                React.cloneElement(validChild, {
                  ...commonProps,
                  ...field,
                  checked: validChild.props.value === field.value,
                })
              }
            />
          </Fragment>
        ) : (
          <Fragment key={`${name}-${index}`}>
            {React.cloneElement(validChild, {
              ...commonProps,
              defaultChecked: validChild.props.value === value,
              onChange,
            })}
          </Fragment>
        );
      })}
    </div>
  );
};

export default RadioGroup;
