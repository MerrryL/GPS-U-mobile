import { useNotificationStore } from "@/hooks/useNotificationStore";
import { MutationConfig, queryClient } from "@/lib/react-query";
import { Constatation, FieldGroup } from "@/types";
import { useMutation } from "react-query";
import { deleteFieldGroup } from "../api";




type UseDeleteFieldGroupOptions = {
  fieldGroupId: string;
  constatationId: number;
  config?: MutationConfig<typeof deleteFieldGroup>;
};

export const useDeleteFieldGroup = ({ fieldGroupId, constatationId, config }: UseDeleteFieldGroupOptions) => {
  const { addNotification } = useNotificationStore();
  return useMutation({
    onSuccess: async (data) => {
      await queryClient.cancelQueries(["field_groups"]);

      const previousfieldGroups = queryClient.getQueryData<FieldGroup[]>(["field_groups"]);

      const fieldGroupIndex = previousfieldGroups.findIndex((obj) => obj.id == fieldGroupId);

      previousfieldGroups.splice(fieldGroupIndex, 1);

      queryClient.setQueryData(["field_groups"], [...previousfieldGroups]);

      const previousConstatations = queryClient.getQueryData<Constatation[]>(["constatations"]);

      //console.log(queryClient.getQueryData<Constatation[]>(["constatations", 100]));
      const index = previousConstatations.findIndex((obj) => obj.id == constatationId);

      console.log(previousConstatations, previousConstatations[index], index);

      const index2 = previousConstatations[index].field_groups.findIndex((obj) => obj.id == fieldGroupId);

      previousConstatations[index].field_groups.splice(index2, 1);

      queryClient.setQueryData(["constatations"], [...previousConstatations]);

      addNotification({
        type: "success",
        title: "fieldGroup Deleted",
      });
    },
    ...config,
    mutationFn: deleteFieldGroup,
  });
};
