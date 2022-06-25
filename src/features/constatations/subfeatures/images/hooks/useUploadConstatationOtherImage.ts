import { useNotificationStore } from "@/hooks/useNotificationStore";
import { MutationConfig, queryClient } from "@/lib/react-query";
import { Constatation, Image, ImageToSend } from "@/types";
import { useMutation } from "react-query";
import { axios } from "@/lib/axios";
import { QueryKeys } from "@/lib/query-keys";
interface UploadConstatationOtherImageOptions {
  constatationId: number;
  image: ImageToSend;
};

export const uploadConstatationOtherImage = ({ image, constatationId }: UploadConstatationOtherImageOptions): Promise<Image | Constatation> => {
  return axios.post(`/constatations/${constatationId}/images/upload`, {
    image,
  });
};
interface UseUploadConstatationImageOptions {
  config?: MutationConfig<typeof uploadConstatationOtherImage>;
};

function isImage(data: Image | Constatation): data is Image {
  return (data as Image).constatation_id !== undefined;
}

export const useUploadConstatationOtherImage = ({ config }: UseUploadConstatationImageOptions= {}) => {
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
    mutationFn: uploadConstatationOtherImage,
  });
};
