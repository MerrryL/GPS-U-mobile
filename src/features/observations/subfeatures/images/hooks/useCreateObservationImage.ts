import { useNotificationStore } from "@/hooks/useNotificationStore";
import { MutationConfig, queryClient } from "@/lib/react-query";
import { useMutation } from "react-query";
import { createObservationImageRequest } from "../api";

export interface  UseCreateObservationImageOptions {
  config?: MutationConfig<typeof createObservationImageRequest>;
};

export const useCreateObservationImage = ({config }: UseCreateObservationImageOptions = {}) => {
  const { addNotification } = useNotificationStore();
  return useMutation({
    onSuccess: async (data) => {
      queryClient.refetchQueries(["observations"]);
      queryClient.refetchQueries(["image_requests"]);

      addNotification({
        type: "success",
        title: "Image Créée",
      });
    },
    ...config,
    mutationFn: createObservationImageRequest,
  });
};
