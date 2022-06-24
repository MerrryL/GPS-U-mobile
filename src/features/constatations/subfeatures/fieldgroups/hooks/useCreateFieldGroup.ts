import { useNotificationStore } from "@/hooks/useNotificationStore";
import { MutationConfig, queryClient } from "@/lib/react-query";
import { Constatation, FieldGroup } from "@/types";
import { useMutation } from "react-query";
import { createFieldGroup } from "../api";




interface UseCreateFieldGroupOptions {
  constatationId: number;
  name: string;
  type: string;
  logical_operator: string;
  config?: MutationConfig<typeof createFieldGroup>;
};

export const useCreateFieldGroup = ({ constatationId, config }: UseCreateFieldGroupOptions) => {
  const { addNotification } = useNotificationStore();
  return useMutation({
    onSuccess: async (data) => {
      await queryClient.cancelQueries(["field_groups"]);

      const previousFieldGroups = queryClient.getQueryData<FieldGroup[]>(["field_groups"]);

      queryClient.setQueryData(["field_groups"], [...(previousFieldGroups || []), data]);

      const previousConstatations = queryClient.getQueryData<Constatation[]>(["constatations"]);

      const index = previousConstatations?.findIndex((obj: Constatation) => obj.id === constatationId);
      previousConstatations && index && previousConstatations[index].field_groups.push(data);
      queryClient.setQueryData(["constatations"], previousConstatations);

      addNotification({
        type: "success",
        title: "FieldGroup Created",
      });
    },
    ...config,
    mutationFn: createFieldGroup,
  });
};
