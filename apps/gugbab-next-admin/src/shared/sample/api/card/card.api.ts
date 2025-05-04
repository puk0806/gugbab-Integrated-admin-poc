import {
  DataGuideSampleCardIdGetParameters,
  DataGuideSampleCardIdGetResponse,
  DataGuideSampleCardXmlPutRequest,
  DataGuideSampleCardXmlPutResponse,
  DataGuideSampleCardsTop10GetResponse,
} from '@gugbab-integrated-admin-poc/gugbab-types';
import { getEnv } from '@app/shared/common/utils/environment';
import { apiFetch } from '@app/shared/fetch/utils/fetch';

export function putCard(requestBody: DataGuideSampleCardXmlPutRequest, headers?: () => Headers) {
  return apiFetch.put<DataGuideSampleCardXmlPutResponse>(
    getEnv('API_URL'),
    '/data/guide/sample/card',
    { data: { ...requestBody } },
    headers,
  );
}

export function getCardId(params: DataGuideSampleCardIdGetParameters, headers?: () => Headers) {
  return apiFetch.get<DataGuideSampleCardIdGetResponse>(
    getEnv('API_URL'),
    `/data/guide/sample/card/${params.id}`,
    {},
    headers,
  );
}

export function getCardsTop10(headers?: () => Headers) {
  return apiFetch.get<DataGuideSampleCardsTop10GetResponse>(
    getEnv('API_URL'),
    '/data/guide/sample/cards/top10',
    {},
    headers,
  );
}
