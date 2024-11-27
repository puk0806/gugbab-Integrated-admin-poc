'use client';

import { PropsWithChildren, useState } from 'react';
import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ErrorResponse, useQueryError } from '@app/shared/error';

declare module '@tanstack/react-query' {
  interface Register {
    defaultError: ErrorResponse;
  }
}

const TanstackProvider = ({ children }: PropsWithChildren) => {
  const { handleError } = useQueryError();

  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: false,
            staleTime: 1000 * 10,
            refetchOnMount: false,
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
          },
          mutations: {
            onError: handleError,
          },
        },
        queryCache: new QueryCache({
          onError: handleError,
        }),
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default TanstackProvider;
