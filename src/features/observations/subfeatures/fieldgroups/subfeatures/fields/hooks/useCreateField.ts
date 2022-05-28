import { useNotificationStore } from "@/hooks/useNotificationStore";
import { MutationConfig, queryClient } from "@/lib/react-query";
import { useMutation } from "react-query";
import { createField } from "../api";




type UseCreateFieldOptions = {
  fieldGroupId: number;
  observationId: number;
  config?: MutationConfig<typeof createField>;
};

export const useCreateField = ({ observationId, fieldGroupId, config }: UseCreateFieldOptions) => {
  const { addNotification } = useNotificationStore();
  return useMutation({
    onSuccess: async (data) => {
      queryClient.refetchQueries(["observations"]);
      queryClient.refetchQueries(["field_groups"]);
      queryClient.refetchQueries(["fields"]);
      addNotification({
        type: "success",
        title: "Champ créé",
      });
    },
    ...config,
    mutationFn: createField,
  });
};
