import { useMutation } from "react-query";

import { useNotificationStore } from "@/hooks/useNotificationStore";
import { MutationConfig, queryClient } from "@/lib/react-query";

import { uploadImage } from "../../../api";

import { Constatation, Image, ImageToSend } from "../../../types";

type UseUploadImageOptions = {
  imageId: string;
  image: ImageToSend;
  config?: MutationConfig<typeof uploadImage>;
};

export const useUploadImage = ({
  imageId,
  image,
  config,
}: UseUploadImageOptions) => {
  const { addNotification } = useNotificationStore();
  return useMutation({
    onSuccess: async (data) => {
      await queryClient.cancelQueries(["images"]);

      const previousImages =
        queryClient.getQueryData<Image[]>(["images"]);

      let imageIndex = previousImages.findIndex((obj => obj.id == data.id))

      previousImages[imageIndex]= data;

      queryClient.setQueryData(["images"], [
        ...previousImages
      ]);

      const previousConstatations =
        queryClient.getQueryData<Constatation[]>(["constatations"]);
        
      //console.log(queryClient.getQueryData<Constatation[]>(["constatations", 100]));
      let index = previousConstatations.findIndex((obj => obj.id == data.constatation_id))

      let imageIndex2 = previousConstatations[index].images.findIndex((obj => obj.id == data.id));

      previousConstatations[index].images[imageIndex2]= data;

      queryClient.setQueryData(["constatations"], [
        ...previousConstatations,
      ]);

      addNotification({
        type: "success",
        title: "Image Uploaded",
      });
    },
    ...config,
    mutationFn: uploadImage,
  });
};
