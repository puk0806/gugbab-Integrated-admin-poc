import { classNamesWithRoot } from '@gugbab-integrated-admin-poc/utils';
import { Flex } from '@gugbab-integrated-admin-poc/ui-sass';
import {
  DefaultFooter,
  DefaultHeader,
  DefaultFooterProps,
  DefaultHeaderProps,
  DefaultBody,
  DefaultBodyProps,
} from '../..';
import styles from './index.module.scss';

export interface DefaultLayoutProps extends DefaultHeaderProps, DefaultBodyProps, DefaultFooterProps {}

function DefaultLayout({ breadcrumb, children, title }: DefaultLayoutProps) {
  const cx = classNamesWithRoot(styles, 'default-layout');

  return (
    <div className={cx()}>
      <Flex flex={1} style={{ minWidth: '960px' }} vertical>
        <DefaultHeader breadcrumb={breadcrumb} title={title} />
        <DefaultBody>{children}</DefaultBody>
        <DefaultFooter />
      </Flex>
    </div>
  );
}

export default DefaultLayout;
