import { useMutation } from "react-query";

import { useNotificationStore } from "@/hooks/useNotificationStore";
import { MutationConfig, queryClient } from "@/lib/react-query";

import { deleteImage } from "../api";

import { Constatation, Image, ImageToSend } from "../../../types";

type UseDeleteImageOptions = {
  imageId: string;
  constatationId: string;
  config?: MutationConfig<typeof deleteImage>;
};

export const useDeleteImage = ({
  imageId,
  constatationId,
  config,
}: UseDeleteImageOptions) => {
  const { addNotification } = useNotificationStore();
  return useMutation({
    onSuccess: async (data) => {
      await queryClient.cancelQueries(["images"]);

      const previousImages =
        queryClient.getQueryData<Image[]>(["images"]);

      let imageIndex = previousImages.findIndex((obj => obj.id == imageId))

      previousImages.splice(imageIndex, 1);

      queryClient.setQueryData(["images"], [
        ...previousImages
      ]);

      const previousConstatations =
        queryClient.getQueryData<Constatation[]>(["constatations"]);
        
      //console.log(queryClient.getQueryData<Constatation[]>(["constatations", 100]));
      let index = previousConstatations.findIndex((obj => obj.id == constatationId))

      console.log(previousConstatations, previousConstatations[index], index);
      let imageIndex2 = previousConstatations[index].images.findIndex((obj => obj.id == imageId));

      previousConstatations[index].images.splice(imageIndex2, 1);

      queryClient.setQueryData(["constatations"], [
        ...previousConstatations,
      ]);

      addNotification({
        type: "success",
        title: "Image Deleteed",
      });
    },
    ...config,
    mutationFn: deleteImage,
  });
};
