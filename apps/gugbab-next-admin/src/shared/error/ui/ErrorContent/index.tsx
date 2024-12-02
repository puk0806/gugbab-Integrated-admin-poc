'use client';

import React, { memo, useCallback, useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import { Button, Typography, Flex } from '@gugbab-integrated-admin-poc/ui-sass';
import { classNamesWithRoot } from '@gugbab-integrated-admin-poc/utils';
import styles from './index.module.scss';

export interface ErrorContentProps {
  title: string;
  message?: string[];
  type?: 404 | 403 | 500;
}

const cx = classNamesWithRoot(styles, 'error-content');

function ErrorContent({ message, title, type }: ErrorContentProps) {
  const router = useRouter();
  const [href, setHref] = useState<string>();

  const handleFirstPage = useCallback(() => {
    if (href) {
      location.href = href;
    }
  }, [href]);

  useEffect(() => {
    const href = localStorage.getItem('firstHref');
    href && setHref(href);
  }, []);

  return (
    <div className={cx()}>
      <Flex gap={15} vertical>
        <Typography component="p" variant="H3">
          {title}
        </Typography>
        <Typography color="secondary-navy" component="p" variant="H1" weight="bold">
          이 페이지를 표시할 수 없습니다.
        </Typography>
        <Flex vertical>
          {type !== 404 && (
            <>
              <Typography color="grayscale-gray700" component="p">
                요청하신 페이지에 문제가 있어서 페이지를 표시할 수 없습니다.
              </Typography>
              <Typography color="grayscale-gray700" component="p">
                <Typography color="secondary-navy" weight="bold">
                  새로고침
                </Typography>
                을 하시거나{' '}
                <Typography color="secondary-navy" weight="bold">
                  잠시 후에 다시 시도
                </Typography>
                해 주시기 바랍니다.
              </Typography>
            </>
          )}
          {type === 404 && (
            <>
              <Typography color="grayscale-gray700" component="p">
                찾으시려는 웹 페이지의 이름이 바뀌었거나, 현재 사용할 수 없거나, 삭제되었습니다. <br /> 입력하신 페이지
                주소가 정확한지 다시 한 번 확인해 보시기 바랍니다.
              </Typography>
            </>
          )}
        </Flex>
        <Flex gap={30} vertical>
          {message && type !== 404 && (
            <Flex vertical>
              {message.map((msg, index) => (
                <Typography color="grayscale-gray400" component="p" key={`error-${index}`}>
                  {msg}
                </Typography>
              ))}
            </Flex>
          )}
          <Flex gap={10} justify="center">
            {type !== 404 && type !== 500 && (
              <Button color="secondary" size="large" onClick={() => router.refresh()}>
                새로고침
              </Button>
            )}
            {href && (
              <Button color="secondary" size="large" onClick={handleFirstPage}>
                첫 페이지로 이동
              </Button>
            )}
          </Flex>
        </Flex>
      </Flex>
    </div>
  );
}

export default memo(ErrorContent);
