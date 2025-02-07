import { parseCookie, stringifyQuery } from '@gugbab-integrated-admin-poc/utils';
import { AUTH_COOKIE } from '@app/shared/auth';
import { ErrorResponse } from '@app/shared/error';
import { FetchPrint, MethodInit } from '../../types';
import { methods } from '../../consts';
import { formatHeader } from './request';

const throwErrorResponse = (status: number, message: string, errorCode = ''): never => {
  throw { status, errorCode, message } as ErrorResponse;
};

const getAccessToken = (): string | undefined => {
  const parsedCookie = parseCookie(document.cookie);
  return parsedCookie[AUTH_COOKIE.ACCESS_TOKEN];
};

const setBearerToken = (): Record<string, string> | undefined => {
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
    // 서버 환경에서 headers가 없는 경우 에러 처리
    if (typeof globalThis !== 'undefined' && typeof window === 'undefined' && !headers) {
      throwErrorResponse(400, "Missing 'headers' property in the options object");
    }

    const { cache, data, headers: headerInit, query, ...rest } = config || {};
    const headerInstance = headers && formatHeader(headers());
    const isBrowser = typeof window !== 'undefined'; // 브라우저 환경 여부

    // HTTP 요청 옵션 생성
    const options: RequestInit & { headers?: HeadersInit } = {
      method: method.toUpperCase(),
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        ...(isBrowser && setBearerToken()),
        ...headerInit,
        ...headerInstance,
      },
      body: data ? JSON.stringify(data) : undefined,
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
