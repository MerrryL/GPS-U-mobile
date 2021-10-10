import { useMutation } from "react-query";

import { useNotificationStore } from "@/hooks/useNotificationStore";
import { MutationConfig, queryClient } from "@/lib/react-query";

import { createField } from "../api";

import { Constatation, Field, FieldGroup } from "@/types";

type UseCreateFieldOptions = {
  fieldGroupId: string;
  constatationId: string;
  config?: MutationConfig<typeof createField>;
};

export const useCreateField = ({
  constatationId,
  fieldGroupId,
  config,
}: UseCreateFieldOptions) => {
  const { addNotification } = useNotificationStore();
  return useMutation({
      onSuccess: async (data) => {
        await queryClient.cancelQueries(["fields"]);
        const previousFields = queryClient.getQueryData<Field[]>(["fields"]);
        queryClient.setQueryData(["fields"], [ ...(previousFields || []), data, ]);

        await queryClient.cancelQueries(["field_groups"]);
        const previousFieldGroups = queryClient.getQueryData<FieldGroup[]>(["field_groups"]);
        let index = previousFieldGroups.findIndex((obj => obj.id.toString() == fieldGroupId))
        previousFieldGroups[index].fields.push(data);
        queryClient.setQueryData(["field_groups"], [...previousFieldGroups, ]);

        await queryClient.cancelQueries(["constatations"]);
        const previousConstatations = queryClient.getQueryData<Constatation[]>(["constatations"]);
        let constatIndex = previousConstatations.findIndex((obj => obj.id.toString() == constatationId));
        let constatIndex2 = previousConstatations[constatIndex].field_groups.findIndex((obj => obj.id.toString() == fieldGroupId))
        previousConstatations[constatIndex].field_groups[constatIndex2].fields.push(data);
        queryClient.setQueryData(["constatations"], [ ...previousConstatations,]);

        addNotification({
          type: "success",
          title: "Field Created",
        });
    },
    ...config,
    mutationFn: createField,
  });
};
