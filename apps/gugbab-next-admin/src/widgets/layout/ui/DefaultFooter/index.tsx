import { classNamesWithRoot } from '@gugbab-integrated-admin-poc/utils';
import { Flex, Typography } from '@gugbab-integrated-admin-poc/ui-sass';
import styles from './index.module.scss';

export interface DefaultFooterProps {}

function DefaultFooter(props: DefaultFooterProps) {
  const cx = classNamesWithRoot(styles, 'default-footer');

  return (
    <div className={cx()}>
      <Flex justify="center">
        <Typography component="h1" variant="H2" weight="medium">
          gugbab footer
        </Typography>
      </Flex>
    </div>
  );
}

export default DefaultFooter;
