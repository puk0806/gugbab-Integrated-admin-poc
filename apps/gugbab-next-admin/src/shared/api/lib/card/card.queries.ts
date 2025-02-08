import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import {
  DataGuideSampleCardIdGetParameters,
  DataGuideSampleCardIdGetResponse,
  DataGuideSampleCardsTop10GetResponse,
} from '@gugbab-integrated-admin-poc/gugbab-types';
import { ErrorResponse } from '@app/shared/error';
import { QUERY_KEY_FACTORY } from '../queryKeys';
import { getCardId, getCardsTop10 } from './card.api';

export const useGetCardId = (
  params: DataGuideSampleCardIdGetParameters,
  options?: UseQueryOptions<DataGuideSampleCardIdGetResponse, ErrorResponse>,
) =>
  useQuery({
    queryKey: QUERY_KEY_FACTORY('CARD_ID', params),
    queryFn: () => getCardId(params),
    ...options,
  });

export const useGetCardsTop10 = (options?: UseQueryOptions<DataGuideSampleCardsTop10GetResponse, ErrorResponse>) =>
  useQuery({
    queryKey: QUERY_KEY_FACTORY('CARDS_TOP10'),
    queryFn: () => getCardsTop10(),
    ...options,
  });
