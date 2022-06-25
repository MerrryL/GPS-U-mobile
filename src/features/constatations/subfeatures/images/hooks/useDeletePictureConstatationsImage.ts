import { useNotificationStore } from "@/hooks/useNotificationStore";
import { MutationConfig, queryClient } from "@/lib/react-query";
import { useMutation } from "react-query";
import { axios } from "@/lib/axios";
import { Constatation } from "@/types";
import { QueryKeys } from "@/lib/query-keys";


interface DeletePictureConstatationImageOptions {
  imageId: number;
  constatationId: number;
};

export const deletePictureConstatationImage = ({ imageId, constatationId }: DeletePictureConstatationImageOptions): Promise<Constatation> => {
  return axios.delete(`/constatations/${constatationId}/images/${imageId}/remove`);
};

interface UseDeletePictureConstatationImageOptions {
  config?: MutationConfig<typeof deletePictureConstatationImage>;
};

export const useDeletePictureConstatationImage = ({ config }: UseDeletePictureConstatationImageOptions = {}) => {
  const { addNotification } = useNotificationStore();
  return useMutation({
    onMutate: async ({ constatationId, imageId }: DeletePictureConstatationImageOptions) => {
      await queryClient.cancelQueries([QueryKeys.Constatations, constatationId]);

      const previousConstatation: Constatation | undefined = queryClient.getQueryData<Constatation>([QueryKeys.Constatations, constatationId]);
      queryClient.setQueryData([QueryKeys.Constatations, constatationId], {
        ...previousConstatation,
        images: previousConstatation?.images.filter((image) => image.id !== imageId)
      });

      await queryClient.cancelQueries([QueryKeys.Constatations]);

      const previousConstatations: Constatation[] | undefined = queryClient.getQueryData<Constatation[]>([QueryKeys.Constatations]);
      queryClient.setQueryData([QueryKeys.Constatations], [...(previousConstatations?.filter((constatation: Constatation) => constatation.id !== constatationId) || []), {
        ...previousConstatation,
        images: previousConstatation?.images.filter((image) => image.id !== imageId)
      }]);

      return { previousConstatation: previousConstatation, previousConstatations: previousConstatations };
    },
    onError: (_, __: DeletePictureConstatationImageOptions, context) => {
      if (context?.previousConstatation) {
        queryClient.setQueryData([QueryKeys.Constatations, context.previousConstatation.id], context.previousConstatation);
      }
      if (context?.previousConstatations) {
        queryClient.setQueryData([QueryKeys.Constatations], context.previousConstatations);
      }
    },
    onSuccess: async (data: Constatation) => {
      queryClient.invalidateQueries([QueryKeys.Constatations]);
      queryClient.invalidateQueries([QueryKeys.Constatations, data.id]);

      addNotification({
        type: "success",
        title: "L'image a été retirée, vous pouvez en télécharger une autre",
      });
    },
    mutationFn: deletePictureConstatationImage,
  });
};
