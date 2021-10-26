import { useMutation } from "react-query";

import { useNotificationStore } from "@/hooks/useNotificationStore";
import { MutationConfig, queryClient } from "@/lib/react-query";

import { uploadConstatationImage } from "../api";

import { Constatation, Image } from "@/types";

type ImageToSend = {
  name: string;
  height: number;
  width: number;
  type: string;
  uri: string;
  base64: string;
};

type UseUploadConstatationImageOptions = {
  imageId: string;
  image: ImageToSend;
  config?: MutationConfig<typeof uploadConstatationImage>;
};

function isImage(data: Image | Constatation):data is Image {
  return (data as Image).constatation_id !== undefined;
}

export const useUploadConstatationImage = ({
  imageId,
  image,
  config,
}: UseUploadConstatationImageOptions) => {
  const { addNotification } = useNotificationStore();
  return useMutation({
    onSuccess: async (data) => {

      if(isImage(data)){
        await queryClient.cancelQueries(["images"]);

        const previousImages =
          queryClient.getQueryData<Image[]>(["images"]);

        let imageIndex = previousImages.findIndex((obj => obj.id == imageId))

        previousImages[imageIndex]= data;

        queryClient.setQueryData(["images"], [
          ...previousImages
        ]);
        
        await queryClient.cancelQueries(["constatations"]);

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
          title: "L'image a été téléchargée",
        });
      }
      else {
        queryClient.refetchQueries(["constatations", data.id]);
        addNotification({
          type: "success",
          title: "L'image a été téléchargée et définie comme vignette",
        });
      }
      

      
    },
    ...config,
    mutationFn: uploadConstatationImage,
  });
};
