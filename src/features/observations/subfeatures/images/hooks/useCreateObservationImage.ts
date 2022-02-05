import { useMutation } from "react-query";

import { useNotificationStore } from "@/hooks/useNotificationStore";
import { MutationConfig, queryClient } from "@/lib/react-query";

import { createObservationImage } from "../api";
import { Observation, Image } from "@/types";

type UseCreateObservationImageOptions = {
  observationId: string;
  config?: MutationConfig<typeof createObservationImage>;
};

export const useCreateObservationImage = ({ observationId, config }: UseCreateObservationImageOptions) => {
  const { addNotification } = useNotificationStore();
  return useMutation({
    onSuccess: async (data) => {
      queryClient.refetchQueries(["observations"]);
      queryClient.refetchQueries(["images"]);

      addNotification({
        type: "success",
        title: "Image Créée",
      });
    },
    ...config,
    mutationFn: createObservationImage,
  });
};
