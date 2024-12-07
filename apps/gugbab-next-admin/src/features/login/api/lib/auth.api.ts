import { apiFetch } from '@app/shared/fetch/utils/lib/fetch';
import { LoginRequest } from '../../types';

export const memberLogin = (data: LoginRequest, headers?: () => Headers) =>
  apiFetch.post<{ accessToken: string; refreshToken: string; tokenType: string }>(
    '',
    '/api/auth/login',
    {
      data: {
        ...data,
      },
    },
    headers,
  );
