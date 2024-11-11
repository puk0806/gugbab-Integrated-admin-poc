import { ComponentPropsWithRef, ComponentPropsWithoutRef, ElementType } from 'react';

/**
 * 다형성 컴포넌트를 만들기위한 타입
 * ex) Button 컴포넌트에서 button element or anchor element 를 동시에 사용해야할때
 */
export type PolymorphicComponentProps<T extends ElementType, PropsType = Record<string, unknown>> = {
  component?: T;
} & PropsType &
  ComponentPropsWithoutRef<T> & {
    ref?: ComponentPropsWithRef<T>['ref'];
  };
