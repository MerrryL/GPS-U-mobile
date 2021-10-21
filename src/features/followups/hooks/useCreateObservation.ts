import { useMutation } from "react-query";

import { useNotificationStore } from "@/hooks/useNotificationStore";
import { MutationConfig, queryClient } from "@/lib/react-query";

import { createObservation } from "../api";
import { Observation } from "@/types";

type UseCreateObservationOptions = {
  config?: MutationConfig<typeof createObservation>;
};

export const useCreateObservation = ({
  config,
}: UseCreateObservationOptions = {}) => {
  const { addNotification } = useNotificationStore();
  return useMutation({
    onMutate: async (newObservation) => {
      await queryClient.cancelQueries(["constatations"]);

      const previousObservations =
        queryClient.getQueryData<Observation[]>(["constatations"]);

      queryClient.setQueryData(["constatations"], [
        ...(previousObservations || []),
        newObservation.data,
      ]);

      return { previousObservations };
    },
    onError: (_, __, context: any) => {
      if (context?.previousObservations) {
        queryClient.setQueryData(
          ["constatations"],
          context.previousObservations
        );
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["constatations"]);
      addNotification({
        type: "success",
        title: "Observation Created",
      });
    },
    ...config,
    mutationFn: createObservation,
  });
};
