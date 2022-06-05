import { useNotificationStore } from "@/hooks/useNotificationStore";
import { MutationConfig, queryClient } from "@/lib/react-query";
import { useMutation } from "react-query";
import { updateObservationImageRequest } from "../api";



type UseUpdateObservationImageOptions = {
  observationId: string;
  imageId: string;
  config?: MutationConfig<typeof updateObservationImageRequest>;
};

export const useUpdateObservationImage = ({ observationId, imageId, config }: UseUpdateObservationImageOptions) => {
  const { addNotification } = useNotificationStore();
  return useMutation({
    onSuccess: async (data) => {
      queryClient.refetchQueries(["observations"]);
      queryClient.refetchQueries(["images"]);

      addNotification({
        type: "success",
        title: "Image Modifiée",
      });
    },
    ...config,
    mutationFn: updateObservationImageRequest,
  });
};
