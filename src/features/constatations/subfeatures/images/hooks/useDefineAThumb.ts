import { useMutation } from "react-query";

import { useNotificationStore } from "@/hooks/useNotificationStore";
import { MutationConfig, queryClient } from "@/lib/react-query";

import { defineAThumb } from "../api";

import { Constatation, Image } from "@/types";

type UseDefineAThumbOptions = {
  constatationId?: string;
  config?:  MutationConfig<typeof defineAThumb>;
};

export const useDefineAThumb = ({
  constatationId,
  config
}: UseDefineAThumbOptions = {}) => {
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
        title: "New Thumb Defined",
      });
    },
    ...config,
    mutationFn: defineAThumb,
  });
};