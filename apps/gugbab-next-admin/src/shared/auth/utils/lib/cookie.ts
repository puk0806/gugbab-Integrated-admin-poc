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

export const ENCODED_URI_REGEX = /^[%.-a-zA-Z0-9]+$/;

export const decodeCookieValue = (str: string): string => {
  if (!str) return str;

  return str.replace(/(%[0-9A-Z]{2})+/g, decodeURIComponent);
};

export const checkUriEncodedSimply = (str: string) => ENCODED_URI_REGEX.test(str);

export const tryDecodeCookieValue = (str: string): [string, null] | [null, string] => {
  try {
    const decoded = decodeURIComponent(str);
    return [decoded, null];
  } catch {
    return [null, str];
  }
};

export const sanitizeCookieString = (str: string) => {
  if (!str) {
    return str;
  }

  const cookieArray = str.split(';');
  let cookieString = '';

  for (let i = 0, max = cookieArray.length; i < max; ++i) {
    const [key, value] = cookieArray[i].split('=');
    const [parsedValue, malformedValue] = tryDecodeCookieValue(value);

    if (malformedValue) {
      continue;
    }

    if (parsedValue === value && parsedValue && !checkUriEncodedSimply(parsedValue)) {
      cookieString += `${key}=${encodeURIComponent(value)};`;
      continue;
    }

    cookieString += `${key}=${value};`;
  }

  return cookieString;
};

export function setCookie(name: string, value: string, options?: CookieOptions) {
  const cookieOptions = { ...defaultCookieOptions, ...options };

  // 기본 만료일 설정 (옵션이 없는 경우 7일)
  if (!cookieOptions['Max-Age'] && !cookieOptions.Expires) {
    const defaultDate = new Date();
    defaultDate.setTime(defaultDate.getTime() + 7 * 24 * 60 * 60 * 1000); // 기본 7일
    cookieOptions.Expires = defaultDate.toUTCString();
  }

  document.cookie = `${name}=${encodeURIComponent(value)}; ${Object.entries(cookieOptions)
    .map(([key, value]) => `${key}=${value}`)
    .join('; ')}`;
}

export const setCookies = (cookies: { key: string; value: string; options?: CookieOptions }[]) => {
  cookies.forEach(({ key, options, value }) => {
    const existingCookies = document.cookie ? `${document.cookie}; ` : '';
    const cookieString = `${key}=${encodeURIComponent(value)}; ${Object.entries({
      ...defaultCookieOptions,
      ...options,
    })
      .map(([key, value]) => `${key}=${value}`)
      .join('; ')}`;
    document.cookie = `${existingCookies}${cookieString}`;
  });
};

export function getCookie(name: string) {
  const regex = new RegExp(`(^|; )${name}=([^;]*)`);
  const match = document.cookie.match(regex);
  return match ? decodeURIComponent(match[2]) : null;
}

export function deleteCookie(name: string) {
  setCookie(name, '', { 'Max-Age': -1 });
}

export function hasCookie(name: string) {
  return getCookie(name) !== null;
}
