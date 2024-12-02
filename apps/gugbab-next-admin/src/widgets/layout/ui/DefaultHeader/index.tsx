import { classNamesWithRoot } from '@gugbab-integrated-admin-poc/utils';
import { Flex, Typography } from '@gugbab-integrated-admin-poc/ui-sass';
import Breadcrumb from '../Breadcrumb';
import styles from './index.module.scss';

export interface DefaultHeaderProps {
  title: string;
  breadcrumb?: string[];
}

function DefaultHeader({ breadcrumb, title }: DefaultHeaderProps) {
  const cx = classNamesWithRoot(styles, 'default-header');

  return (
    <div className={cx()}>
      <Flex gap={20} justify="space-between">
        <Typography component="h1" variant="H2" weight="medium">
          {title}
        </Typography>
        {breadcrumb && <Breadcrumb menus={breadcrumb} />}
      </Flex>
    </div>
  );
}

export default DefaultHeader;
