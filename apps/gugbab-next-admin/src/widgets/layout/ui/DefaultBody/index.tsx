import { classNamesWithRoot } from '@gugbab-integrated-admin-poc/utils';
import { Flex, Typography } from '@gugbab-integrated-admin-poc/ui-sass';
import { ReactNode } from 'react';
import styles from './index.module.scss';

export interface DefaultBodyProps {
  children: ReactNode;
}

function DefaultBody({ children }: DefaultBodyProps) {
  const cx = classNamesWithRoot(styles, 'default-body');

  return (
    <div className={cx()}>
      <Flex>
        <div className={`${cx('__navigation')}`}>
          <Flex flex={1} style={{ width: '200px' }} vertical>
            <Typography>메뉴 리스트 영역</Typography>
          </Flex>
        </div>
        <div className={`${cx('__content')}`}>
          <Flex align="center" flex={1} justify="center" vertical>
            {children}
          </Flex>
        </div>
      </Flex>
    </div>
  );
}

export default DefaultBody;
