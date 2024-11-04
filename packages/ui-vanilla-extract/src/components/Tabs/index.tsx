import { KeyboardEventHandler, createContext, useCallback, useContext, useMemo, useRef } from 'react';
import { classnames } from '@utils';
import { TabListProps, TabPanelProps, TabsProps } from '@types';
import Typography from '../Typography';
import * as styles from './index.css';

interface ContextValue {
  selectedTabId: string;
  onClick(tabId: string): void;
}

const Context = createContext<ContextValue | null>(null);

const Tabs = ({ children, onClick, selectedTabId }: TabsProps) => {
  const handleClick = (tabId: string) => {
    onClick(tabId);
  };

  return <Context.Provider value={{ selectedTabId, onClick: handleClick }}>{children}</Context.Provider>;
};

const TabList = ({ tabItemList }: TabListProps) => {
  const context = useContext(Context);

  if (!context) {
    throw new Error('MyConsumer must be used within a MyProvider');
  }

  const tabsRef = useRef<HTMLDivElement>(null);
  const selectedTabIndex = useMemo(
    () => tabItemList.findIndex(tab => tab.tabId === context.selectedTabId),
    [context.selectedTabId, tabItemList],
  );
  const currentFocusIndex = useRef(selectedTabIndex);

  const handleClick = (tabId: string) => {
    context.onClick(tabId);
  };

  const handleKeyDown = useCallback<KeyboardEventHandler<HTMLButtonElement>>(
    e => {
      const tabItemListEl = tabsRef.current?.querySelectorAll('a, button, input, textarea, [tabIndex="0"]');
      if (!tabItemListEl?.length) {
        return;
      }
      const tabItemLength = tabItemList.length;
      const focusDom = document.activeElement;
      let _cuurentFocusIndex = currentFocusIndex.current;

      for (let index = 0; index < tabItemLength; index++) {
        const element = tabItemListEl[index].children[0];
        if (element === focusDom) {
          _cuurentFocusIndex = index;
        }
      }

      function tabChange(focusIndex: number) {
        (tabItemListEl?.[focusIndex] as HTMLButtonElement).focus();
        currentFocusIndex.current = focusIndex;
      }

      switch (e.key) {
        case 'ArrowRight':
          e.preventDefault();
          const nextFocusIndex = (_cuurentFocusIndex + 1) % tabItemLength;
          tabChange(nextFocusIndex);
          return;
        case 'ArrowLeft':
          e.preventDefault();
          const prevFocusIndex = (_cuurentFocusIndex - 1 + tabItemLength) % tabItemLength;
          tabChange(prevFocusIndex);
          return;
        case 'Home':
          e.preventDefault();
          const firstFocusIndex = 0;
          tabChange(firstFocusIndex);
          return;
        case 'End':
          e.preventDefault();
          const lastFocusIndex = tabItemLength - 1;
          tabChange(lastFocusIndex);
          return;
        default:
          return;
      }
    },
    [tabItemList.length],
  );
  return (
    <div
      aria-labelledby={tabItemList?.[selectedTabIndex]?.label ?? ''}
      className={styles.container}
      ref={tabsRef}
      role="tablist"
    >
      {tabItemList.map((tabItem, index) => (
        <button
          aria-controls={`panel-${tabItem.tabId}`}
          aria-selected={index === selectedTabIndex}
          key={tabItem.tabId}
          role="tab"
          tabIndex={index === selectedTabIndex ? 0 : -1}
          type="button"
          className={classnames(styles.tabItem.base, {
            [styles.tabItem.select]: index === selectedTabIndex,
          })}
          onClick={() => handleClick(tabItem.tabId)}
          onKeyDown={handleKeyDown}
        >
          <Typography
            color={index === selectedTabIndex ? 'primary' : 'onSurfaceVariant'}
            variant="B2"
            {...tabItem.typographyProps}
          >
            {tabItem.label}
          </Typography>
        </button>
      ))}
    </div>
  );
};

const TabPanel = ({ children, className, label, tabId }: TabPanelProps) => {
  const context = useContext(Context);

  if (!context) {
    throw new Error('MyConsumer must be used within a MyProvider');
  }

  return context.selectedTabId === tabId ? (
    <div aria-labelledby={label} className={className} id={`panel-${tabId}`} role="tabpanel" tabIndex={0}>
      {children}
    </div>
  ) : null;
};

Tabs.TabList = TabList;
Tabs.TabPanel = TabPanel;

export default Tabs;
