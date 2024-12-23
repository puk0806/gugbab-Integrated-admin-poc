import { formatHeader } from './request';

describe('formatHeader', () => {
  // 1. headers가 undefined로 넘어왔을 때
  test('should return undefined when headers are undefined', () => {
    const result = formatHeader(undefined as unknown as Headers);
    expect(result).toBeUndefined();
  });

  // 2. 각각의 헤더가 올바르게 세팅되는지 확인
  test('should correctly set userAgent header', () => {
    const headers = new Headers({ 'user-agent': 'Mozilla/5.0' });
    const result = formatHeader(headers);
    expect(result).toEqual({ 'X-Forwarded-User-Agent': 'Mozilla/5.0' });
  });

  test('should correctly set cookie header', () => {
    const headers = new Headers({ cookie: 'session=abcd1234' });
    const result = formatHeader(headers);
    expect(result).toEqual({ Cookie: 'session=abcd1234' });
  });

  test('should correctly set ipAddress header', () => {
    const headers = new Headers({ 'x-forwarded-for': '192.168.1.1' });
    const result = formatHeader(headers);
    expect(result).toEqual({ 'X-Forwarded-For': '192.168.1.1' });
  });

  test('should correctly set referer header', () => {
    const headers = new Headers({ referer: 'https://example.com' });
    const result = formatHeader(headers);
    expect(result).toEqual({ 'X-Forwarded-Referer': 'https://example.com' });
  });

  // 3. 모든 헤더가 동시에 설정되었을 때
  test('should correctly set all headers when provided', () => {
    const headers = new Headers({
      'user-agent': 'Mozilla/5.0',
      cookie: 'session=abcd1234',
      'x-forwarded-for': '192.168.1.1',
      referer: 'https://example.com',
    });
    const result = formatHeader(headers);
    expect(result).toEqual({
      Cookie: 'session=abcd1234',
      'X-Forwarded-For': '192.168.1.1',
      'X-Forwarded-User-Agent': 'Mozilla/5.0',
      'X-Forwarded-Referer': 'https://example.com',
    });
  });
});
