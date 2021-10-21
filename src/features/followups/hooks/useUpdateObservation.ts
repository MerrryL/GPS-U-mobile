import { useMutation } from "react-query";

import { useNotificationStore } from "@/hooks/useNotificationStore";
import { MutationConfig, queryClient } from "@/lib/react-query";

import { updateObservation } from "../api";
import { Observation } from "@/types";

type UseUpdateObservationOptions = {
  config?: MutationConfig<typeof updateObservation>;
};

export const useUpdateObservation = ({
  config,
}: UseUpdateObservationOptions = {}) => {
  const { addNotification } = useNotificationStore();

  return useMutation({
    onMutate: async (updatingObservation: any) => {
      await queryClient.cancelQueries([
        "constatations",
        updatingObservation?.constatationId,
      ]);

      const previousObservation = queryClient.getQueryData<Observation>([
        "constatations",
        updatingObservation?.constatationId,
      ]);

      queryClient.setQueryData(
        ["constatations", updatingObservation?.constatationId],
        {
          ...previousObservation,
          ...updatingObservation.data,
          id: updatingObservation.constatationId,
        }
      );

      return { previousObservation };
    },
    onError: (_, __, context: any) => {
      if (context?.previousObservation) {
        queryClient.setQueryData(
          ["constatations", context.previousObservation.id],
          context.previousObservation
        );
      }
    },
    onSuccess: (data) => {
      queryClient.refetchQueries(["constatations", data.id]);
      addNotification({
        type: "success",
        title: "Observation Updated",
      });
    },
    ...config,
    mutationFn: updateObservation,
  });
};
