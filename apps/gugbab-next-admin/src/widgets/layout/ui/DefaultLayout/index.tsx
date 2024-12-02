import { classNamesWithRoot } from '@gugbab-integrated-admin-poc/utils';
import { Flex } from '@gugbab-integrated-admin-poc/ui-sass';
import { ReactNode } from 'react';
import DefaultHeader, { DefaultHeaderProps } from '../DefaultHeader';
import DefaultFooter, { DefaultFooterProps } from '../DefaultFooter';
import styles from './index.module.scss';

export interface DefaultLayoutProps extends DefaultHeaderProps, DefaultFooterProps {
  children: ReactNode;
}

function DefaultLayout({ breadcrumb, children, title }: DefaultLayoutProps) {
  const cx = classNamesWithRoot(styles, 'default-layout');

  return (
    <div className={cx()}>
      <Flex flex={1} gap={20} style={{ minWidth: '960px' }} vertical>
        <DefaultHeader breadcrumb={breadcrumb} title={title} />
        <Flex align="center" flex={1} justify="center" vertical>
          {children}
        </Flex>
        <DefaultFooter />
      </Flex>
    </div>
  );
}

export default DefaultLayout;
