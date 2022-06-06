import { useNotificationStore } from "@/hooks/useNotificationStore";
import { MutationConfig, queryClient } from "@/lib/react-query";
import { Constatation } from "@/types";
import { useMutation } from "react-query";
import { defineAsThumbConstatationImage } from "../api";




type UseDefineAsThumbConstatationImageOptions = {
  constatationId: number;
  imageId: number;
  config?: MutationConfig<typeof defineAsThumbConstatationImage>;
};

export const useDefineAsThumbConstatationImage = ({ constatationId, imageId, config }: UseDefineAsThumbConstatationImageOptions) => {
  console.log("g,", {
    constatationId,
    imageId,
    config,
  });
  const { addNotification } = useNotificationStore();
  return useMutation({
    onSuccess: async (updatingConstatation: Constatation) => {
      await queryClient.cancelQueries(["constatations"]);

      const previousConstatations = queryClient.getQueryData<Constatation[]>(["constatations"]);

      const index = previousConstatations.findIndex((obj) => obj.id == constatationId);

      previousConstatations[index].media = updatingConstatation.media;

      queryClient.setQueryData(["constatations"], [...previousConstatations]);

      addNotification({
        type: "success",
        title: "L'image a été définie comme vignette",
      });
    },
    ...config,
    mutationFn: defineAsThumbConstatationImage,
  });
};
