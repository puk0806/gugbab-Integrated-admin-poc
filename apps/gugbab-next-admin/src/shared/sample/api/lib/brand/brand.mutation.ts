import { DataGuideSampleBrandPutRequest } from '@gugbab-integrated-admin-poc/gugbab-types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from '../queryKeys';
import { putBrand } from './brand.api';

export const usePutBrand = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (requestBody: DataGuideSampleBrandPutRequest) => putBrand(requestBody),

    async onSuccess() {
      await queryClient.invalidateQueries({ queryKey: [QUERY_KEY.BRAND] });
    },
  });
};
