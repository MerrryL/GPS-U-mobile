import { useMutation } from "react-query";

import { useNotificationStore } from "@/hooks/useNotificationStore";
import { MutationConfig, queryClient } from "@/lib/react-query";

import { deleteObservationImage } from "../api";

import { Observation, Image} from "@/types";

type UseDeleteObservationImageOptions = {
  imageId: string;
  observationId: string;
  config?: MutationConfig<typeof deleteObservationImage>;
};

export const useDeleteObservationImage = ({
  imageId,
  observationId,
  config,
}: UseDeleteObservationImageOptions) => {
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
    mutationFn: deleteObservationImage,
  });
};
