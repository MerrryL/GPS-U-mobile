import { useNotificationStore } from "@/hooks/useNotificationStore";
import { MutationConfig, queryClient } from "@/lib/react-query";
import { Constatation, Image, ImageToSend } from "@/types";
import { useMutation } from "react-query";
import { uploadConstatationOtherImage } from "../api";

interface UseUploadConstatationImageOptions {
  constatationId?: number;
  image?: ImageToSend;
  config?: MutationConfig<typeof uploadConstatationOtherImage>;
};

function isImage(data: Image | Constatation): data is Image {
  return (data as Image).constatation_id !== undefined;
}

export const useUploadConstatationOtherImage = ({ constatationId, image, config }: UseUploadConstatationImageOptions) => {
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
    mutationFn: uploadConstatationOtherImage,
  });
};
