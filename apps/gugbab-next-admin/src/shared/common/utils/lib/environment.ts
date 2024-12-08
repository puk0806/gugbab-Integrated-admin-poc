import { Environments, ShortEnvironments } from '../../types';

const envList: { [K in Environments]: () => string } = {
  SECRET_KEY_USER() {
    return globalThis.process?.env['SECRET_KEY_USER'] || '';
  },
  FRONT_URL() {
    if (typeof window !== 'undefined') {
      return globalThis.process?.env['NEXT_PUBLIC_FRONT_URL'] || '';
    }
    return globalThis.process?.env['PUBLIC_FRONT_URL'] || '';
  },
  SHORT_ENV() {
    return (globalThis.process?.env['NEXT_PUBLIC_SHORT_ENV'] || 'ANY') as ShortEnvironments;
  },
  AUTH_URL() {
    if (typeof window !== 'undefined') {
      return globalThis.process?.env['NEXT_PUBLIC_AUTH_URL'] || '';
    }
    return globalThis.process?.env['PUBLIC_AUTH_URL'] || '';
  },
};

export const getEnv = (key: Environments) => envList[key]();
