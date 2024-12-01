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
          switch (error.status) {
            case 401:
              alert(getErrorMessage(error.status as ErrorStatusCode));
              router.replace('/login');
              break;
            case 403:
            case 500:
              alert(getErrorMessage(error.status as ErrorStatusCode));
              router.replace('/');
              break;
            case 404:
            default:
              break;
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
