import { useMutation } from "react-query";

import { useNotificationStore } from "@/hooks/useNotificationStore";
import { MutationConfig, queryClient } from "@/lib/react-query";

import { deleteField } from "../api";

import { Constatation, Field } from "../types";

type UseDeleteFieldOptions = {
  fieldGroupId: string;
  constatationId: string;
  config?: MutationConfig<typeof deleteField>;
};

export const useDeleteField = ({
  fieldGroupId,
  constatationId,
  config,
}: UseDeleteFieldOptions) => {
  const { addNotification } = useNotificationStore();
  return useMutation({
    onSuccess: async (data) => {
      await queryClient.cancelQueries(["field_groups"]);

      const previousfieldGroups = queryClient.getQueryData<Field[]>(["field_groups"]);

      let fieldGroupIndex = previousfieldGroups.findIndex((obj) => obj.id == fieldGroupId);

      previousfieldGroups.splice(fieldGroupIndex, 1);

      queryClient.setQueryData(["field_groups"], [...previousfieldGroups]);

      const previousConstatations = queryClient.getQueryData<Constatation[]>([
        "constatations",
      ]);

      //console.log(queryClient.getQueryData<Constatation[]>(["constatations", 100]));
      let index = previousConstatations.findIndex(
        (obj) => obj.id == constatationId
      );

      console.log(previousConstatations, previousConstatations[index], index);

      let index2 = previousConstatations[index].field_groups.findIndex((obj => obj.id == fieldGroupId));

      previousConstatations[index].field_groups.splice(index2, 1);

      queryClient.setQueryData(["constatations"], [...previousConstatations]);

      addNotification({
        type: "success",
        title: "fieldGroup Deleted",
      });
    },
    ...config,
    mutationFn: deleteField,
  });
};
