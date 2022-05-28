import { useNotificationStore } from "@/hooks/useNotificationStore";
import { MutationConfig, queryClient } from "@/lib/react-query";
import { useMutation } from "react-query";
import { deleteObservationFieldGroup } from "../api";



type UseDeleteObservationFieldGroupOptions = {
  fieldGroupId: number;
  observationId:number;
  config?: MutationConfig<typeof deleteObservationFieldGroup>;
};

//Todo: error after deletion : it looks like it fetches ["field_groups", $id] and errors on it
export const useDeleteObservationFieldGroup = ({ observationId, config }: UseDeleteObservationFieldGroupOptions) => {
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
