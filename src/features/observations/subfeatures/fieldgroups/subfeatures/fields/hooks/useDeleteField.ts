import { useMutation } from "react-query";

import { useNotificationStore } from "@/hooks/useNotificationStore";
import { MutationConfig, queryClient } from "@/lib/react-query";

import { deleteField } from "../api";

import { Constatation, FieldGroup, Field } from "@/types";

type UseDeleteFieldOptions = {
  fieldId:string;
  fieldGroupId: string;
  constatationId: string;
  config?: MutationConfig<typeof deleteField>;
};

export const useDeleteField = ({
  fieldId,
  fieldGroupId,
  constatationId,
  config,
}: UseDeleteFieldOptions) => {
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
