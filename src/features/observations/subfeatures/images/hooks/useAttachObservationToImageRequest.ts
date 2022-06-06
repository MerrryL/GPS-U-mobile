import { useNotificationStore } from "@/hooks/useNotificationStore";
import { MutationConfig, queryClient } from "@/lib/react-query";
import { useMutation } from "react-query";
import { attachObservationToImageRequest } from "../api";

export interface  UseAttachObservationToImageRequestOptions {
  observationId?: number;
  config?: MutationConfig<typeof attachObservationToImageRequest>;
};

export const useAttachObservationToImageRequest = ({config,observationId }: UseAttachObservationToImageRequestOptions = {}) => {
  const { addNotification } = useNotificationStore();
  return useMutation({
    onSuccess: async (data) => {
      queryClient.refetchQueries(["observations"]);
      queryClient.refetchQueries(["observations", observationId]);
      queryClient.refetchQueries(["image_requests"]);
      queryClient.refetchQueries(["observations",observationId, "image_requests"])

      addNotification({
        type: "success",
        title: "Image et Observation liées",
      });
    },
    ...config,
    mutationFn: attachObservationToImageRequest,
  });
};
