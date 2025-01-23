import { stringify } from './string';

interface QueryObject {
  [key: string]: unknown;
}

export function stringifyQuery(queryObject: QueryObject, encode = true, initialString = '?'): string {
  let str = initialString;

  for (const key in queryObject) {
    const target = queryObject[key];
    const stringified = Array.isArray(target) ? target.join(',') : stringify(queryObject[key]);

    str += `${key}=${encode ? encodeURIComponent(stringified) : stringified}&`;
  }

  return str.slice(0, -1);
}
