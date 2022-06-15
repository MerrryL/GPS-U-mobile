import { useNotificationStore } from "@/hooks/useNotificationStore";
import { MutationConfig, queryClient } from "@/lib/react-query";
import { useMutation } from "react-query";
import { deletePictureConstatationImage } from "../api/index";



type UseDeletePictureConstatationImageOptions = {
  constatationId: number;
  imageId: number;
  config?: MutationConfig<typeof deletePictureConstatationImage>;
};

export const useDeletePictureConstatationImage = ({ constatationId, imageId, config }: UseDeletePictureConstatationImageOptions) => {
  const { addNotification } = useNotificationStore();
  return useMutation({
    onSuccess: async (data) => {
      queryClient.refetchQueries(["constatations"]);
      queryClient.refetchQueries(["images"]);

      addNotification({
        type: "success",
        title: "L'image a été retirée, vous pouvez en télécharger une autre",
      });
    },
    ...config,
    mutationFn: deletePictureConstatationImage,
  });
};
