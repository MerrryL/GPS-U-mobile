import { useMutation } from "react-query";

import { useNotificationStore } from "@/hooks/useNotificationStore";
import { MutationConfig, queryClient } from "@/lib/react-query";

import { defineAsThumbConstatationImage } from "../api";

import { Constatation, Image } from "@/types";

type UseDefineAsThumbConstatationImageOptions = {
  constatationId: string;
  imageId: string;
  config?:  MutationConfig<typeof defineAsThumbConstatationImage>;
};

export const useDefineAsThumbConstatationImage = ({
  constatationId,
  imageId,
  config
}: UseDefineAsThumbConstatationImageOptions) => {
  const { addNotification } = useNotificationStore();
  return useMutation({
    onSuccess: async (updatingConstatation : Constatation) => {

      //TODO: come back
      // await queryClient.cancelQueries(["images"]);

      // const previousImages =
      //   queryClient.getQueryData<Image[]>(["images"]);

      // let imageIndex = previousImages.findIndex((obj => obj.id == imageId))

      // previousImages[imageIndex]= data;

      // queryClient.setQueryData(["images"], [
      //   ...previousImages
      // ]);


      console.log(updatingConstatation);
      await queryClient.cancelQueries(["constatations"]);

      const previousConstatations =
        queryClient.getQueryData<Constatation[]>(["constatations"]);
        
      //console.log(queryClient.getQueryData<Constatation[]>(["constatations", 100]));
      let index = previousConstatations.findIndex((obj => obj.id ==  constatationId))

      previousConstatations[index].media = updatingConstatation.media;

      queryClient.setQueryData(["constatations"], [
        ...previousConstatations,
      ]);

      addNotification({
        type: "success",
        title: "L'image a été définie comme vignette",
      });
    },
    ...config,
    mutationFn: defineAsThumbConstatationImage,
  });
};