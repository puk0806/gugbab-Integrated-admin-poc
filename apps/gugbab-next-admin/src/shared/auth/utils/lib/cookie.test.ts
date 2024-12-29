import { setCookie, setCookies, getCookie, deleteCookie, hasCookie, sanitizeCookieString } from './cookie';

describe('Cookie Utilities', () => {
  beforeEach(() => {
    Object.defineProperty(document, 'cookie', {
      writable: true,
      value: '',
    });
  });

  test('setCookie: should set a cookie with default options', () => {
    setCookie('token', 'abc123');
    expect(document.cookie).toContain('token=abc123');
    expect(document.cookie).toContain('Secure=true');
    expect(document.cookie).toContain('SameSite=None');
  });

  test('setCookie: should set a cookie with custom Max-Age', () => {
    setCookie('session', 'xyz789', { 'Max-Age': 3600 });
    expect(document.cookie).toContain('session=xyz789');
    expect(document.cookie).toContain('Max-Age=3600');
  });

  test('setCookies: should set multiple cookies', () => {
    setCookies([
      { key: 'token', value: 'abc123' },
      { key: 'user', value: 'JohnDoe', options: { 'Max-Age': 3600 } },
    ]);
    expect(document.cookie).toContain('token=abc123');
    expect(document.cookie).toContain('user=JohnDoe');
    expect(document.cookie).toContain('Max-Age=3600');
  });

  test('getCookie: should retrieve the correct cookie value', () => {
    document.cookie = 'token=abc123; user=JohnDoe';
    expect(getCookie('token')).toBe('abc123');
    expect(getCookie('user')).toBe('JohnDoe');
  });

  test('deleteCookie: should delete a specific cookie', () => {
    document.cookie = 'token=abc123';
    deleteCookie('token');
    expect(document.cookie).not.toContain('token=abc123');
  });

  test('hasCookie: should return true if the cookie exists', () => {
    document.cookie = 'token=abc123; user=JohnDoe';

    // Test existing cookie
    expect(hasCookie('token')).toBe(true);
    expect(hasCookie('user')).toBe(true);

    // Test non-existing cookie
    expect(hasCookie('session')).toBe(false);
  });

  test('sanitizeCookieString: should sanitize malformed cookies', () => {
    const malformed = 'token=%E0%A4%A;user=JohnDoe;';
    const sanitized = sanitizeCookieString(malformed);
    expect(sanitized).not.toContain('%E0%A4%A');
    expect(sanitized).toContain('user=JohnDoe');
  });
});
