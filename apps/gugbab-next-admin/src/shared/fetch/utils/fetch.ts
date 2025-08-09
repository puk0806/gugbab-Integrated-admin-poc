import { parseCookie, stringifyQuery } from '@gugbab-integrated-admin-poc/utils';
import { ErrorResponse } from '@app/shared/error/types/error';
import { AUTH_COOKIE } from '@app/shared/auth/consts/cookie';
import { FetchPrint, MethodInit } from '../types/fetch';
import { methods } from '../consts/method';
import { formatHeader } from './request';

const throwErrorResponse = (status: number, message: string, errorCode = ''): never => {
  throw { status, errorCode, message } as ErrorResponse;
};

const getAccessToken = (): string | undefined => {
  const parsedCookie = parseCookie(document.cookie);
  return parsedCookie[AUTH_COOKIE.ACCESS_TOKEN];
};

const setBearerToken = () => {
  const accessToken = getAccessToken();
  return accessToken ? { Authorization: `Bearer ${accessToken}` } : undefined;
};

// Access Token 갱신 (Refresh Token)
const refreshAccessToken = async (): Promise<string | null> => {
  console.warn('Refresh token logic is not implemented yet.');
  // TODO 갱신 로직 필요
  return null;
};

export const apiFetch = (() => {
  const print: FetchPrint = async (method, baseUrl, path, config, headers) => {
    if (typeof globalThis !== 'undefined' && typeof window === 'undefined' && !headers) {
      throwErrorResponse(400, "Missing 'headers' property in the options object");
    }

    const { cache, data, headers: headerInit, query, ...rest } = config || {};
    const headerInstance = headers && formatHeader(headers());

    const isBrowser = typeof window !== 'undefined';
    const isMultipart = data instanceof FormData;

    const conditionHeaders = isMultipart
      ? { ...(headerInstance || {}) }
      : { 'Content-Type': 'application/json', ...(headerInit || {}), ...(headerInstance || {}) };

    const conditionData = isMultipart ? data : JSON.stringify(data);

    const options: RequestInit & { headers?: HeadersInit } = {
      method: method.toUpperCase(),
      credentials: 'include',
      headers: conditionHeaders,
      body: data ? conditionData : undefined,
      cache: cache || 'no-store',
      ...rest,
    };

    const url = `${baseUrl}${path}${stringifyQuery(query || {})}`;

    try {
      let response = await fetch(url, options);

      if (!response) {
        throwErrorResponse(500, 'The server did not return a response');
      }

      if (response.status === 204) {
        return;
      }

      const responseJson = await response.json();

      if (!response.ok) {
        if (response.status === 401 && isBrowser) {
          const newAccessToken = await refreshAccessToken();
          if (newAccessToken) {
            options.headers = {
              ...options.headers,
              Authorization: `Bearer ${newAccessToken}`,
            };
            response = await fetch(url, options);
            if (response.ok) {
              return await response.json();
            }
          }
        }
        throwErrorResponse(
          response.status,
          responseJson?.message || 'An unknown error occurred',
          responseJson?.errorCode || '',
        );
      }

      return responseJson;
    } catch (error) {
      throw (error as ErrorResponse) || { status: 500, errorCode: '', message: 'An unexpected error occurred' };
    }
  };

  return methods.reduce((acc, cur) => ({ ...acc, [cur]: print.bind(null, cur) }), {}) as MethodInit;
})();
