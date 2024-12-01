import { parseCookie, stringifyQuery } from '@gugbab-integrated-admin-poc/utils';
import { FetchPrint, MethodInit } from '../../types';
import { AUTH_COOKIE, methods } from '../../consts';
import { formatHeader } from './request';

export const apiFetch = (() => {
  const print: FetchPrint = async (method, baseUrl, path, config, headers) => {
    if (typeof globalThis !== 'undefined' && typeof window === 'undefined' && !headers) {
      throw new Error("Missing 'headers' property in the options object");
    }

    const headerInstance = headers && formatHeader(headers());

    const { cache, data, headers: headerInit, query, ...rest } = config || {};

    const getAccessToken = (): string | undefined => {
      const parsedCookie = parseCookie(document.cookie);
      return parsedCookie[AUTH_COOKIE.ACCESS_TOKEN];
    };

    const setBearerToken = () => {
      const accessToken = getAccessToken();
      if (!accessToken) return undefined;

      return {
        Authorization: `Bearer ${accessToken}`,
      };
    };

    /**
     * Bearer Token 검증 여부
     * - 브라우저 환경에서만 동작
     */
    const isBearerTokenVerify = typeof window !== 'undefined';

    const options: RequestInit & { headers?: HeadersInit } = {
      method: method.toUpperCase(),
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        ...(isBearerTokenVerify && setBearerToken()),
        ...headerInit,
        ...headerInstance,
      } as HeadersInit,
      body: data && JSON.stringify(data),
      cache: cache || 'no-store',
      ...rest,
    };

    const url = `${baseUrl}${path}${stringifyQuery(query || {})}`;

    const response = await fetch(url, options);

    /** status 204 일때 처리 **/
    if (response.status === 204) return;

    const responseJson = await response.json();

    if (!response.ok) {
      if (response.status === 401 && isBearerTokenVerify) {
        if (setBearerToken()) {
          // TODO Access Token 만료시 재발급 로직
        }
      }
      throw responseJson;
    }

    return responseJson;
  };

  return methods.reduce((acc, cur) => ({ ...acc, [cur]: print.bind(null, cur) }), {}) as MethodInit;
})();
