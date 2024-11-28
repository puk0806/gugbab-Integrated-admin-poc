import { useCallback, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { ErrorResponse } from '../types';
import { getErrorMessage } from '../consts';

export default function useQueryError() {
  const timerRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const router = useRouter();
  const verifyErrorCodes = [401, 403, 404, 500];

  const handleError = useCallback(
    async (error: ErrorResponse) => {
      if (timerRef.current || !error.status) {
        return;
      }

      timerRef.current = setTimeout(() => {
        if (verifyErrorCodes.includes(error.status)) {
          error.status !== 404 && alert(getErrorMessage(`${error.status}`));

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
    [router, verifyErrorCodes],
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
