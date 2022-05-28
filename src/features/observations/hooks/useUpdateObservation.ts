import { useNotificationStore } from "@/hooks/useNotificationStore";
import { MutationConfig, queryClient } from "@/lib/react-query";
import { Observation } from "@/types";
import { useMutation } from "react-query";
import { updateObservation } from "../api";


export type UseUpdateObservationOptions = {
  config?: MutationConfig<typeof updateObservation>;
};

export const useUpdateObservation = ({ config }: UseUpdateObservationOptions = {}) => {
  const { addNotification } = useNotificationStore();

  return useMutation({
    onMutate: async (updatingObservation: any) => {
      await queryClient.cancelQueries(["observations", updatingObservation?.observationId]);

      const previousObservation = queryClient.getQueryData<Observation>(["observations", updatingObservation?.observationId]);

      queryClient.setQueryData(["observations", updatingObservation?.observationId], {
        ...previousObservation,
        ...updatingObservation.data,
        id: updatingObservation.observationId,
      });

      return { previousObservation };
    },
    onError: (_, __, context: any) => {
      if (context?.previousObservation) {
        queryClient.setQueryData(["observations", context.previousObservation.id], context.previousObservation);
      }
    },
    onSuccess: (data) => {
      queryClient.refetchQueries(["observations", data.id]);
      addNotification({
        type: "success",
        title: "Observation mise-à-jour",
      });
    },
    ...config,
    mutationFn: updateObservation,
  });
};
