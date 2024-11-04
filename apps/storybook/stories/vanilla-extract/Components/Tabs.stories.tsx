import { Tabs, TabsProps } from '@gugbab-integrated-admin-poc/ui-vanilla-extract';
import { Meta, StoryFn } from '@storybook/react';
import { useState } from 'react';

const story: Meta<TabsProps> = {
  component: Tabs,
  tags: ['autodocs'],
  parameters: {},
};

export default story;

export const Default: StoryFn<TabsProps> = () => {
  const [id, setId] = useState('1');
  return (
    <>
      <Tabs selectedTabId={id} onClick={tabId => setId(tabId)}>
        <Tabs.TabList
          tabItemList={[
            { tabId: '1', label: '1' },
            { tabId: '2', label: '2' },
            { tabId: '3', label: '3' },
          ]}
        />
        <Tabs.TabPanel label="test1" tabId="1">
          test1
        </Tabs.TabPanel>
        <Tabs.TabPanel label="test2" tabId="2">
          test2
        </Tabs.TabPanel>
        <Tabs.TabPanel label="test3" tabId="3">
          test3
        </Tabs.TabPanel>
      </Tabs>
    </>
  );
};
