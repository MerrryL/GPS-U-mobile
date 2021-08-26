import { useMutation } from "react-query";

import { useNotificationStore } from "@/hooks/useNotificationStore";
import { MutationConfig, queryClient } from "@/lib/react-query";

import { createField } from "../api";

import { Constatation, Field, FieldGroup } from "../types";

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

        const previousFields =
          queryClient.getQueryData<Field[]>(["fields"]);

        queryClient.setQueryData(["fields"], [
          ...(previousFields || []),
          data,
        ]);

        const previousFieldGroups =
          queryClient.getQueryData<FieldGroup[]>(["field_groups"]);
          
        //console.log(queryClient.getQueryData<Constatation[]>(["constatations", 100]));
        let index = previousFieldGroups.findIndex((obj => obj.id.toString() == fieldGroupId))

        previousFieldGroups[index].fields.push(data);

        queryClient.setQueryData(["constatations"], [
          ...previousFieldGroups,
        ]);

        const previousConstatations =
          queryClient.getQueryData<Constatation[]>(["constatations"]);
          
        //console.log(queryClient.getQueryData<Constatation[]>(["constatations", 100]));
        let index2 = previousConstatations.findIndex((obj => obj.id.toString() == constatationId))

        let index3 = previousConstatations[index2].field_groups.findIndex((obj => obj.id.toString() == fieldGroupId))

        previousConstatations[index2].field_groups[index3].fields.push(data);


        queryClient.setQueryData(["constatations"], [
          ...previousConstatations,
        ]);
        

        addNotification({
          type: "success",
          title: "Field Created",
        });
    },
    ...config,
    mutationFn: createField,
  });
};
