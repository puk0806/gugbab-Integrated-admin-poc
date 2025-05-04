'use client';

import { PropsWithChildren } from 'react';
import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ErrorResponse } from '@app/shared/error/types/error';
import useQueryError from '@app/shared/error/hooks/useQueryError';

declare module '@tanstack/react-query' {
  interface Register {
    defaultError: ErrorResponse;
  }
}

function makeQueryClient() {
  const { handleError } = useQueryError();

  return new QueryClient({
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
    mutationCache: new MutationCache({
      onError: handleError,
    }),
    queryCache: new QueryCache({
      onError: handleError,
    }),
  });
}

let browserQueryClient: QueryClient | undefined = undefined;

function getQueryClient() {
  if (typeof window === 'undefined') {
    // Server: always make a new query client
    return makeQueryClient();
  } else {
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}

const TanstackProvider = ({ children }: PropsWithChildren) => {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default TanstackProvider;
