import { ReactNode } from 'react';
import { TypographyProps } from '../Typography';

export interface TabsProps {
  selectedTabId: string;
  onClick(tabId: string): void;
  children: ReactNode;
}

export interface TabListProps {
  variant?: 'default';
  tabItemList: {
    tabId: string;
    label: string;
    typographyProps?: Omit<TypographyProps, 'children' | 'color'>;
  }[];
}

export interface TabPanelProps {
  tabId: string;
  label: string;
  className?: string;
  children: ReactNode;
}
