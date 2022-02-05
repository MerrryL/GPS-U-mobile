import { useMutation } from "react-query";

import { useNotificationStore } from "@/hooks/useNotificationStore";
import { MutationConfig, queryClient } from "@/lib/react-query";

import { createField } from "../api";

import { Constatation, Field, FieldGroup } from "@/types";

type UseCreateFieldOptions = {
  fieldGroupId: string;
  observationId: string;
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
