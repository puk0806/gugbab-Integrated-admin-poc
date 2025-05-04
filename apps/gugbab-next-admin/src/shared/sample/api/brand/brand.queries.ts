import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import {
  DataGuideSampleBrandsByConditionGetParameters,
  DataGuideSampleBrandsByConditionGetResponse,
  DataGuideSampleBrandsTop10GetResponse,
} from '@gugbab-integrated-admin-poc/gugbab-types';
import { ErrorResponse } from '@app/shared/error/types/error';
import { QUERY_KEY_FACTORY } from '../queryKeys';
import { getBrandsByCondition, getBrandsTop10 } from './brand.api';

export const useGetBrandsTop10 = (options?: UseQueryOptions<DataGuideSampleBrandsTop10GetResponse, ErrorResponse>) =>
  useQuery({
    queryKey: QUERY_KEY_FACTORY('BRANDS_TOP10'),
    queryFn: () => getBrandsTop10(),
    ...options,
  });

export const useGetBrandsByCondition = (
  params: DataGuideSampleBrandsByConditionGetParameters,
  options?: UseQueryOptions<DataGuideSampleBrandsByConditionGetResponse, ErrorResponse>,
) =>
  useQuery({
    queryKey: QUERY_KEY_FACTORY('BRANDS_BY_CONDITION', params),
    queryFn: () => getBrandsByCondition(params),
    ...options,
  });
