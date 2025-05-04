import { apiFetch } from '@app/shared/fetch/utils/fetch';
import { LoginRequest } from '../types/api';

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
