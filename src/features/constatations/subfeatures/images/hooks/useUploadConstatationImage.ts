import { useNotificationStore } from "@/hooks/useNotificationStore";
import { QueryKeys } from "@/lib/query-keys";
import { MutationConfig, queryClient } from "@/lib/react-query";
import { Constatation, Image, ImageToSend } from "@/types";
import { useMutation } from "react-query";
import { axios } from "@/lib/axios";

interface UploadConstatationImageOptions {
  imageId?: number;
  constatationId: number;
  image: ImageToSend;
};

export const uploadConstatationImage = ({ image, constatationId, imageId }: UploadConstatationImageOptions): Promise<Image  |Constatation> => {
  return axios.post(`/constatations/${constatationId}/images/${imageId}/upload`, { image });
};
interface UseUploadConstatationImageOptions {
  config?: MutationConfig<typeof uploadConstatationImage>;
};

function isImage(data: Image | Constatation): data is Image {
  return (data as Image).constatation_id !== undefined;
}

export const useUploadConstatationImage = ({ config }: UseUploadConstatationImageOptions = {}) => {
  const { addNotification } = useNotificationStore();
  return useMutation({
    onSuccess: async (data) => {
      if (isImage(data)) {
        queryClient.invalidateQueries([QueryKeys.Constatations]);
        queryClient.invalidateQueries([QueryKeys.Constatations, data.constatation_id]);
        addNotification({
          type: "success",
          title: "L'image a été téléchargée",
        });
      } else {
        queryClient.invalidateQueries([QueryKeys.Constatations]);
        queryClient.invalidateQueries([QueryKeys.Constatations, data.id]);

        addNotification({
          type: "success",
          title: "L'image a été téléchargée et définie comme vignette",
        });
      }
    },
    mutationFn: uploadConstatationImage,
  });
};