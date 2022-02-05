import { useMutation } from "react-query";

import { useNotificationStore } from "@/hooks/useNotificationStore";
import { MutationConfig, queryClient } from "@/lib/react-query";

import { deleteObservationFieldGroup } from "../api";

import { Constatation, ObservationFieldGroup } from "@/types";

type UseDeleteObservationFieldGroupOptions = {
  fieldGroupId: string;
  observationId: string;
  config?: MutationConfig<typeof deleteObservationFieldGroup>;
};

//Todo: error after deletion : it looks like it fetches ["field_groups", $id] and errors on it
export const useDeleteObservationFieldGroup = ({
  fieldGroupId,
  observationId,
  config,
}: UseDeleteObservationFieldGroupOptions) => {
  const { addNotification } = useNotificationStore();
  return useMutation({
    onSuccess: async (data) => {
      queryClient.refetchQueries(["observations"]);
      queryClient.refetchQueries(["observations", observationId]);
      queryClient.refetchQueries(["field_groups"]);

      addNotification({
        type: "success",
        title: "Groupe de champs supprimé",
      });
    },
    ...config,
    mutationFn: deleteObservationFieldGroup,
  });
};
