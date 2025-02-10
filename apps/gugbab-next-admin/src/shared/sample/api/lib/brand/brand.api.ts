import {
  DataGuideSampleBrandPutRequest,
  DataGuideSampleBrandPutResponse,
  DataGuideSampleBrandsByConditionGetParameters,
  DataGuideSampleBrandsByConditionGetResponse,
  DataGuideSampleBrandsTop10GetResponse,
} from '@gugbab-integrated-admin-poc/gugbab-types';
import { removeFalsy, stringifyQuery } from '@gugbab-integrated-admin-poc/utils';
import { getEnv } from '@app/shared/common/utils';
import { apiFetch } from '@app/shared/fetch';

export function putBrand(requestBody: DataGuideSampleBrandPutRequest, headers?: () => Headers) {
  return apiFetch.put<DataGuideSampleBrandPutResponse>(
    getEnv('API_URL'),
    '/data/guide/sample/brand',
    { data: { ...requestBody } },
    headers,
  );
}

export function getBrandsTop10(headers?: () => Headers) {
  return apiFetch.get<DataGuideSampleBrandsTop10GetResponse>(
    getEnv('API_URL'),
    '/data/guide/sample/brands/top10',
    {},
    headers,
  );
}

export function getBrandsByCondition(params: DataGuideSampleBrandsByConditionGetParameters, headers?: () => Headers) {
  return apiFetch.get<DataGuideSampleBrandsByConditionGetResponse>(
    getEnv('API_URL'),
    `/data/guide/sample/brands/by-condition${stringifyQuery(
      removeFalsy({
        ...params,
      }),
    )}`,
    {},
    headers,
  );
}
