import { useMutation } from "react-query";

import { useNotificationStore } from "@/hooks/useNotificationStore";
import { MutationConfig, queryClient } from "@/lib/react-query";

import { deleteField } from "../api";

import { Constatation, FieldGroup, Field } from "@/types";

type UseDeleteFieldOptions = {
  fieldId: string;
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
      await queryClient.cancelQueries(["fields"]);

      const previousfields = queryClient.getQueryData<Field[]>(["fields"]);
      console.log("fieldId", fieldId, data, previousfields);
      let fieldIndex = previousfields.findIndex((obj) => obj.id == fieldId);
      previousfields.splice(fieldIndex, 1);
      queryClient.setQueryData(["fields"], [...previousfields]);

      await queryClient.cancelQueries(["field_groups"]);
      const previousFieldGroups = queryClient.getQueryData<FieldGroup[]>([
        "field_groups",
      ]);
      let fieldGroupIndex = previousFieldGroups.findIndex(
        (obj) => obj.id == fieldGroupId
      );
      let fieldGroupIndex2 = previousFieldGroups[
        fieldGroupIndex
      ].fields.findIndex((obj) => obj.id == fieldId);
      previousFieldGroups[fieldGroupIndex].fields.splice(fieldGroupIndex2, 1);
      queryClient.setQueryData(["field_groups"], [...previousFieldGroups]);

      await queryClient.cancelQueries(["constatations"]);
      const previousConstatations = queryClient.getQueryData<Constatation[]>([
        "constatations",
      ]);
      let constatationIndex = previousConstatations.findIndex(
        (obj) => obj.id == constatationId
      );
      let constatationIndex2 = previousConstatations[
        constatationIndex
      ].field_groups.findIndex((obj) => obj.id == fieldGroupId);
      let constatationIndex3 = previousConstatations[
        constatationIndex
      ].field_groups[constatationIndex2].fields.findIndex(
        (obj) => obj.id == fieldId
      );
      previousConstatations[constatationIndex].field_groups[
        constatationIndex2
      ].fields.splice(constatationIndex3, 1);
      queryClient.setQueryData(["constatations"], [...previousConstatations]);

      addNotification({
        type: "success",
        title: "field Deleted",
      });
    },
    ...config,
    mutationFn: deleteField,
  });
};
