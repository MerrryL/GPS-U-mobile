import { useNotificationStore } from "@/hooks/useNotificationStore";
import { MutationConfig, queryClient } from "@/lib/react-query";
import { Constatation } from "@/types";
import { axios } from "@/lib/axios";
import { useMutation } from "react-query";
import { QueryKeys } from "@/lib/query-keys";


interface DefineAsThumbOptions {
  constatationId: number;
  imageId: number;
};

export const defineAsThumbConstatationImage = ({ constatationId, imageId }: DefineAsThumbOptions): Promise<Constatation> => {
  return axios.get(`/constatations/${constatationId}/images/${imageId}/defineAsThumb`);
};


interface UseDefineAsThumbConstatationImageOptions {
  config?: MutationConfig<typeof defineAsThumbConstatationImage>;
};

export const useDefineAsThumbConstatationImage = ({ config }: UseDefineAsThumbConstatationImageOptions = {}) => {
  const { addNotification } = useNotificationStore();
  return useMutation({
    onMutate: async ({ constatationId, imageId }: DefineAsThumbOptions) => {
      await queryClient.cancelQueries([QueryKeys.Constatations, constatationId]);

      const previousConstatation: Constatation | undefined = queryClient.getQueryData<Constatation>([QueryKeys.Constatations, constatationId]);
      queryClient.setQueryData([QueryKeys.Constatations, constatationId], {
        ...previousConstatation,
        media: [previousConstatation?.images.find(image => image.id === imageId)],
      });
      
      await queryClient.cancelQueries([QueryKeys.Constatations]);
      
      const previousConstatations: Constatation[] | undefined = queryClient.getQueryData<Constatation[]>([QueryKeys.Constatations]);
      queryClient.setQueryData([QueryKeys.Constatations], [...(previousConstatations?.filter((constatation: Constatation) => constatation.id !== constatationId) || []), {
        ...previousConstatation,
        media: [previousConstatation?.images.find(image => image.id === imageId)],
      }]);

      return { previousConstatation: previousConstatation, previousConstatations: previousConstatations };
    },
    onError: (_, __: DefineAsThumbOptions, context) => {
      if (context?.previousConstatation) {
        queryClient.setQueryData([QueryKeys.Constatations, context.previousConstatation.id], context.previousConstatation);
      }
      if (context?.previousConstatations) {
        queryClient.setQueryData([QueryKeys.Constatations], context.previousConstatations);
      }
    },
    onSuccess: async (constatation: Constatation) => {
      queryClient.invalidateQueries([QueryKeys.Constatations]);
      queryClient.invalidateQueries([QueryKeys.Constatations, constatation.id]);

      // const previousConstatations = queryClient.getQueryData<Constatation[]>(["constatations"]);

      // const index = previousConstatations?.findIndex((obj) => obj.id == constatationId);

      // previousConstatations[index].media = updatingConstatation.media;

      // queryClient.setQueryData(["constatations"], [...previousConstatations]);

      addNotification({
        type: "success",
        title: "L'image a été définie comme vignette",
      });
    },
    mutationFn: defineAsThumbConstatationImage,
  });
};
