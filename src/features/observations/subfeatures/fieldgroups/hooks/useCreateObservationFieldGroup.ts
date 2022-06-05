import { useNotificationStore } from "@/hooks/useNotificationStore";
import { MutationConfig, queryClient } from "@/lib/react-query";
import { useMutation } from "react-query";
import { createObservationFieldGroup } from "../api";

export interface UseCreateObservationFieldGroupOptions {
  config?: MutationConfig<typeof createObservationFieldGroup>;
};

export const useCreateObservationFieldGroup = ({ config }: UseCreateObservationFieldGroupOptions= {}) => {
  const { addNotification } = useNotificationStore();
  return useMutation({
    onSuccess: async (data) => {
      queryClient.refetchQueries(["observations"]);
      queryClient.refetchQueries(["field_groups"]);
      addNotification({
        type: "success",
        title: "Groupe de champ créé",
      });
    },
    ...config,
    mutationFn: createObservationFieldGroup,
  });
};
