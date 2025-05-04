import { methods } from '../consts/method';

interface QueryObject {
  [key: string]: unknown;
}

interface AdditionalProperties {
  data?: QueryObject | FormData;
  query?: QueryObject;
}

type Methods = (typeof methods)[number];

type CommonParams = [
  baseUrl: string | URL,
  path: string,
  config?: RequestInit & AdditionalProperties,
  headers?: () => Headers,
];

export type FetchPrint = <T = unknown>(method: Methods, ...args: CommonParams) => Promise<T>;

type PrintWithoutMethod = <T = unknown>(...args: CommonParams) => Promise<T>;

export type MethodInit = {
  [K in Methods]: PrintWithoutMethod;
};
