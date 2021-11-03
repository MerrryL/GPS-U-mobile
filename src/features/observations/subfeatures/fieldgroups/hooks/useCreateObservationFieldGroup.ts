import { useMutation } from "react-query";

import { useNotificationStore } from "@/hooks/useNotificationStore";
import { MutationConfig, queryClient } from "@/lib/react-query";

import { createObservationFieldGroup } from "../api";

import { Observation, FieldGroup } from "@/types";

type UseCreateObservationFieldGroupOptions = {
  observationId: string;
  name: string;
  type: string;
  logical_operator: string;
  config?: MutationConfig<typeof createObservationFieldGroup>;
};

export const useCreateObservationFieldGroup = ({
  observationId,
  config,
}: UseCreateObservationFieldGroupOptions) => {
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
