import { useNotificationStore } from "@/hooks/useNotificationStore";
import { MutationConfig, queryClient } from "@/lib/react-query";
import { Constatation, Image } from "@/types";
import { useMutation } from "react-query";
import { uploadConstatationImage } from "../api";




type ImageToSend = {
  name: string;
  height: number;
  width: number;
  type: string;
  uri: string;
  base64: string;
};

type UseUploadConstatationImageOptions = {
  imageId: number;
  constatationId: number;
  image: ImageToSend;
  config?: MutationConfig<typeof uploadConstatationImage>;
};

function isImage(data: Image | Constatation): data is Image {
  return (data as Image).constatation_id !== undefined;
}

export const useUploadConstatationImage = ({ constatationId, imageId, image, config }: UseUploadConstatationImageOptions) => {
  const { addNotification } = useNotificationStore();
  return useMutation({
    onSuccess: async (data) => {
      if (isImage(data)) {
        queryClient.refetchQueries(["constatations"]);
        queryClient.refetchQueries(["constatations", data.constatation_id]);
        queryClient.refetchQueries(["images"]);
        addNotification({
          type: "success",
          title: "L'image a été téléchargée",
        });
      } else {
        queryClient.refetchQueries(["constatations"]);
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
