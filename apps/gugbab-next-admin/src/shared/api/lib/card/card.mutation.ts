import { DataGuideSampleCardXmlPutRequest } from '@gugbab-integrated-admin-poc/gugbab-types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from '../queryKeys';
import { putCard } from './card.api';

export const usePutCard = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (requestBody: DataGuideSampleCardXmlPutRequest) => putCard(requestBody),

    async onSuccess() {
      await queryClient.invalidateQueries({ queryKey: [QUERY_KEY.CARD] });
    },
  });
};
