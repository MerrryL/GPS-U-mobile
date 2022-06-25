import { useNotificationStore } from "@/hooks/useNotificationStore";
import { MutationConfig, queryClient } from "@/lib/react-query";
import { useMutation } from "react-query";
import { axios } from "@/lib/axios";


interface DeleteConstatationImageOptions {
  imageId: number;
  constatationId: number;
};

export const deleteConstatationImage = ({ imageId, constatationId }: DeleteConstatationImageOptions) => {
  return axios.delete(`/constatations/${constatationId}/images/${imageId}`);
};
interface UseDeleteConstatationImageOptions {
  config?: MutationConfig<typeof deleteConstatationImage>;
};

export const useDeleteConstatationImage = ({config }: UseDeleteConstatationImageOptions= {}) => {
  const { addNotification } = useNotificationStore();
  return useMutation({
    onSuccess: async (data) => {
      queryClient.refetchQueries(["constatations"]);

      addNotification({
        type: "success",
        title: "Image supprimée",
      });
    },
    ...config,
    mutationFn: deleteConstatationImage,
  });
};
