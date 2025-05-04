export type CookieOptions = {
  Secure?: boolean;
  Path?: string;
  SameSite?: 'Strict' | 'Lax' | 'None';
  HttpOnly?: boolean;
  'Max-Age'?: number;
  Expires?: string;
  Domain?: string;
};

export const defaultCookieOptions: CookieOptions = {
  Secure: true,
  Path: '/',
  SameSite: 'None',
  Domain: '.gugbab.co.kr',
};

export const setCookies = (cookies: { key: string; value: string; options?: CookieOptions }[]) =>
  cookies
    .map(
      ({ key, options, value }) =>
        `${key}=${value}; ${Object.entries({
          ...defaultCookieOptions,
          ...options,
        })
          .map(([key, value]) => `${key}=${value}`)
          .join('; ')}`,
    )
    .join(', ');
