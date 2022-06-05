import { useNotificationStore } from "@/hooks/useNotificationStore";
import { MutationConfig, queryClient } from "@/lib/react-query";
import { useMutation } from "react-query";
import { deleteField } from "../api";




type UseDeleteFieldOptions = {
  fieldId: number;
  fieldGroupId: number;
  observationId: number;
  config?: MutationConfig<typeof deleteField>;
};

export const useDeleteField = ({ fieldId, fieldGroupId, observationId, config }: UseDeleteFieldOptions) => {
  const { addNotification } = useNotificationStore();
  return useMutation({
    onSuccess: async (data) => {
      queryClient.refetchQueries(["observations"]);
      queryClient.refetchQueries(["field_groups"]);
      queryClient.refetchQueries(["field_groups", fieldGroupId]);
      queryClient.refetchQueries(["fields"]);
      addNotification({
        type: "success",
        title: "Champ supprimé",
      });
    },
    ...config,
    mutationFn: deleteField,
  });
};
