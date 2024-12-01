import { useCallback, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { ErrorResponse, ErrorStatusCode } from '../../types';
import { getErrorMessage } from '../../consts';

const verifyErrorStatusCodes: ErrorStatusCode[] = [401, 403, 404, 500];

export default function useQueryError() {
  const timerRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const router = useRouter();

  const handleError = useCallback(
    async (error: ErrorResponse) => {
      if (timerRef.current || !error.status) {
        return;
      }

      timerRef.current = setTimeout(() => {
        if (verifyErrorStatusCodes.some(errorStatusCode => errorStatusCode === error.status)) {
          error.status !== 404 && alert(getErrorMessage(error.status as ErrorStatusCode));

          if (error.status === 401) {
            router.replace('/login');
          } else if (error.status === 403) {
            router.replace('/');
          } else if (error.status === 500) {
            router.replace('/');
          }
        }

        timerRef.current = undefined;
      }, 50);
    },
    [router],
  );

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = undefined;
      }
    };
  }, []);

  return { handleError };
}
