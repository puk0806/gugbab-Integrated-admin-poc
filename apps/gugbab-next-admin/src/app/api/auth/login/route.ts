import { headers as nextHeaders } from 'next/headers';
import { type NextRequest } from 'next/server';
import { AUTH_COOKIE } from '@app/shared/auth/consts/cookie';
import { TokenResponse } from '@app/shared/auth/types/token';
import { setCookies } from '@app/shared/auth/utils/cookie';
import { getEnv } from '@app/shared/common/utils/environment';
import { ErrorResponse } from '@app/shared/error/types/error';
import { apiFetch } from '@app/shared/fetch/utils/fetch';

/**
 * 로그인
 * - basicToken : base64(clientId:secretKey)
 * - body: {
 *    grantType: 'password',
 *    id,
 *    password,
 *   }
 */
export async function POST(request: NextRequest) {
  try {
    const text = await request.text();
    const data = JSON.parse(text);
    const { id, password } = data;
    const secret = getEnv('SECRET_KEY_USER');
    const basicToken = btoa(`gugbab:${secret}`);

    const headers = await nextHeaders();

    const response = await apiFetch.post<TokenResponse>(
      getEnv('AUTH_URL'),
      '',
      {
        headers: {
          Authorization: `Basic ${basicToken}`,
        },
        data: {
          grant_type: 'password',
          id,
          password,
        },
      },
      () => headers,
    );
    return new Response(JSON.stringify(response), {
      status: 200,
      headers: {
        'Set-Cookie': setCookies([
          { key: AUTH_COOKIE.ACCESS_TOKEN, value: response.access_token },
          {
            key: AUTH_COOKIE.REFRESH_TOKEN,
            value: response.refresh_token,
            options: { HttpOnly: true },
          },
        ]),
      },
    });
  } catch (error: unknown) {
    const customError = error as ErrorResponse;
    return new Response(JSON.stringify(customError), {
      status: customError.status || 400,
    });
  }
}
