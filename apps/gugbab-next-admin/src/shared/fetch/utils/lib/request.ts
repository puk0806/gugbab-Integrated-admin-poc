import { RequestHeaders } from '../../types';

export const formatHeader = <T extends Headers>(headers: T): RequestHeaders | undefined => {
  if (!headers) {
    return undefined;
  }

  const userAgent = headers.get('user-agent');
  const cookie = headers.get('cookie');
  const ipAddress = headers.get('x-forwarded-for');
  const referer = headers.get('referer');

  return {
    ...(cookie && { Cookie: cookie }),
    ...(ipAddress && { 'X-Forwarded-For': ipAddress }),
    ...(userAgent && { 'X-Forwarded-User-Agent': userAgent }),
    ...(referer && { 'X-Forwarded-Referer': referer }),
  };
};
