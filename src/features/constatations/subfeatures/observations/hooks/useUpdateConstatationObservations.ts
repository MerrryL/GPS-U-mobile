import { useMutation } from "react-query";

import { useNotificationStore } from "@/hooks/useNotificationStore";
import { MutationConfig, queryClient } from "@/lib/react-query";

import { updateConstatationObservations } from "../api";

type ObservationToSend = {
  id: string | number;
  item: string;
};

type UseUpdateObservationOptions = {
  constatationId: string;
  Observations: ObservationToSend[];
  config?: MutationConfig<typeof updateConstatationObservations>;
};

export const useUpdateConstatationObservations = ({
  constatationId,
  Observations,
  config,
}: UseUpdateObservationOptions) => {
  const { addNotification } = useNotificationStore();
  return useMutation({
    onSuccess: async (data) => {
      console.log("data", data);

      queryClient.refetchQueries(["constatations"]);
      queryClient.refetchQueries(["constatationObservations"]);
      queryClient.refetchQueries(["constatations", constatationId]);

      addNotification({
        type: "success",
        title: "Les observateurs de la constatation ont été mis-à-jour",
      });
    },
    ...config,
    mutationFn: updateConstatationObservations,
  });
};
