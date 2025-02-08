import { Environments } from '../../types';
import { getEnv } from './environment';

const originalProcessEnv = { ...process.env };

describe('getEnv Utility - Actual Environment Variables', () => {
  beforeEach(() => {
    process.env = { ...originalProcessEnv };

    Object.defineProperty(global, 'window', {
      value: undefined,
      configurable: true,
      writable: true,
    });
  });

  afterEach(() => {
    process.env = originalProcessEnv;

    Object.defineProperty(global, 'window', {
      value: global.window,
      configurable: true,
      writable: true,
    });
  });

  test('returns actual value for SECRET_KEY_USER', () => {
    expect(getEnv('SECRET_KEY_USER')).toBe('gugbab');
  });

  test('returns actual value for FRONT_URL in browser environment', () => {
    Object.defineProperty(global, 'window', {
      value: {} as Window & typeof globalThis,
      configurable: true,
    });
    process.env['NEXT_PUBLIC_FRONT_URL'] = 'http://local.gugbab.co.kr:4100';
    expect(getEnv('FRONT_URL')).toBe('http://local.gugbab.co.kr:4100');
  });

  test('returns actual value for FRONT_URL in server environment', () => {
    expect(getEnv('FRONT_URL')).toBe('http://localhost:4100');
  });

  test('returns actual value for SHORT_ENV', () => {
    expect(getEnv('SHORT_ENV')).toBe('LOC');
  });

  test('returns actual value for AUTH_URL in browser environment', () => {
    Object.defineProperty(global, 'window', {
      value: {} as Window & typeof globalThis,
      configurable: true,
    });
    process.env['NEXT_PUBLIC_AUTH_URL'] = 'http://local.gugbab.co.kr:4100';
    expect(getEnv('AUTH_URL')).toBe('http://local.gugbab.co.kr:4100');
  });

  test('returns actual value for AUTH_URL in server environment', () => {
    expect(getEnv('AUTH_URL')).toBe('http://localhost:4100');
  });

  test('returns actual value for API_URL in browser environment', () => {
    Object.defineProperty(global, 'window', {
      value: {} as Window & typeof globalThis,
      configurable: true,
    });
    process.env['NEXT_PUBLIC_API_URL'] = 'http://local.gugbab.co.kr:4100';
    expect(getEnv('AUTH_URL')).toBe('http://local.gugbab.co.kr:4100');
  });

  test('returns actual value for API_URL in server environment', () => {
    expect(getEnv('AUTH_URL')).toBe('http://localhost:4100');
  });

  test('throws error when invalid key is used', () => {
    expect(() => getEnv('INVALID_KEY' as Environments)).toThrow();
  });
});
