import { setCookies, defaultCookieOptions } from './cookie';

describe('setCookies 함수 테스트', () => {
  test('빈 배열을 넣었을 때 빈 문자열을 반환해야 한다.', () => {
    const cookies: { key: string; value: string; options?: any }[] = [];

    const result = setCookies(cookies);

    expect(result).toBe('');
  });

  test('하나의 쿠키만 세팅했을 때 기본 옵션이 포함되어야 한다.', () => {
    const cookies = [
      {
        key: 'SINGLE_COOKIE',
        value: 'TEST_VALUE',
      },
    ];

    const result = setCookies(cookies);

    expect(result).toContain('SINGLE_COOKIE=TEST_VALUE');
    expect(result).toContain(`Secure=${defaultCookieOptions.Secure}`);
    expect(result).toContain(`Path=${defaultCookieOptions.Path}`);
    expect(result).toContain(`SameSite=${defaultCookieOptions.SameSite}`);
    expect(result).toContain(`Domain=${defaultCookieOptions.Domain}`);
  });

  test('여러 개의 쿠키를 세팅했을 때, 각각 올바른 문자열로 반환되어야 한다.', () => {
    const cookies = [
      {
        key: 'COOKIE_ONE',
        value: 'VALUE_ONE',
        options: { HttpOnly: true },
      },
      {
        key: 'COOKIE_TWO',
        value: 'VALUE_TWO',
        options: { 'Max-Age': 3600 },
      },
    ];

    const result = setCookies(cookies);

    expect(result).toMatch(/COOKIE_ONE=VALUE_ONE.*COOKIE_TWO=VALUE_TWO/);
    expect(result).toContain('HttpOnly=true');
    expect(result).toContain('Max-Age=3600');
    expect(result).toContain(`Secure=${defaultCookieOptions.Secure}`);
    expect(result).toContain(`Path=${defaultCookieOptions.Path}`);
  });

  test('전달된 옵션이 기본 옵션을 덮어쓰는지 확인한다.', () => {
    const cookies = [
      {
        key: 'OVERRIDE_TEST',
        value: 'OVERRIDE_VALUE',
        options: {
          Domain: 'override.domain.com',
          SameSite: 'Strict' as const,
        },
      },
    ];

    const result = setCookies(cookies);

    expect(result).toContain('Domain=override.domain.com');
    expect(result).toContain('SameSite=Strict');

    expect(result).toContain(`Secure=${defaultCookieOptions.Secure}`);
    expect(result).toContain(`Path=${defaultCookieOptions.Path}`);
  });
});
