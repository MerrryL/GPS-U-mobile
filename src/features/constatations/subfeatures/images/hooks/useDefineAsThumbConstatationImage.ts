import { useMutation } from "react-query";

import { useNotificationStore } from "@/hooks/useNotificationStore";
import { MutationConfig, queryClient } from "@/lib/react-query";

import { defineAsThumbConstatationImage } from "../api";

import { Constatation, Image } from "@/types";

type UseDefineAsThumbConstatationImageOptions = {
  constatationId: string;
  imageId: string;
  config?: MutationConfig<typeof defineAsThumbConstatationImage>;
};

export const useDefineAsThumbConstatationImage = ({
  constatationId,
  imageId,
  config,
}: UseDefineAsThumbConstatationImageOptions) => {
  console.log("g,", {
    constatationId,
    imageId,
    config,
  });
  const { addNotification } = useNotificationStore();
  return useMutation({
    onSuccess: async (updatingConstatation: Constatation) => {
      await queryClient.cancelQueries(["constatations"]);

      const previousConstatations = queryClient.getQueryData<Constatation[]>([
        "constatations",
      ]);

      let index = previousConstatations.findIndex(
        (obj) => obj.id == constatationId
      );

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
