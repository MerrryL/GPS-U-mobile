import { useNotificationStore } from "@/hooks/useNotificationStore";
import { MutationConfig, queryClient } from "@/lib/react-query";
import { useMutation } from "react-query";
import { deleteObservationImageRequest } from "../api";

interface UseDeleteObservationImageOptions {
  imageRequestId: number;
  observationId: number;
  config?: MutationConfig<typeof deleteObservationImageRequest>;
};

export const useDeleteObservationImage = ({ imageRequestId, observationId, config }: UseDeleteObservationImageOptions) => {
  const { addNotification } = useNotificationStore();
  return useMutation({
    onSuccess: async (data) => {
      queryClient.refetchQueries(["observations"]);
      queryClient.refetchQueries(["images"]);

      addNotification({
        type: "success",
        title: "Image supprimée",
      });
    },
    ...config,
    mutationFn: deleteObservationImageRequest,
  });
};
