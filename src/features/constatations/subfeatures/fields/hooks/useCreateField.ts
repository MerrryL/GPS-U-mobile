import { useMutation } from "react-query";

import { useNotificationStore } from "@/hooks/useNotificationStore";
import { MutationConfig, queryClient } from "@/lib/react-query";

import { createField } from "../api";

import { Constatation, Field } from "../types";

type UseCreateFieldOptions = {
  fieldGroupId: string;
  name: string;
  type: string;
  isDefault: boolean;
  value:string;
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
        await queryClient.cancelQueries(["field_groups"]);

        const previousFields =
          queryClient.getQueryData<Field[]>(["field_groups"]);

        queryClient.setQueryData(["field_groups"], [
          ...(previousFields || []),
          data,
        ]);

        const previousConstatations =
          queryClient.getQueryData<Constatation[]>(["constatations"]);
          
        //console.log(queryClient.getQueryData<Constatation[]>(["constatations", 100]));
        let index = previousConstatations.findIndex((obj => obj.id.toString() == constatationId))

        previousConstatations[index].field_groups.push(data);


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
