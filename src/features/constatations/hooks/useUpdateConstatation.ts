import { useNotificationStore } from "@/hooks/useNotificationStore";
import { MutationConfig, queryClient } from "@/lib/react-query";
import { Constatation } from "@/types";
import { useMutation } from "react-query";
import { updateConstatation } from "../api";



export interface UseUpdateConstatationOptions {
  config?: MutationConfig<typeof updateConstatation>;
};

export const useUpdateConstatation = ({ config }: UseUpdateConstatationOptions = {}) => {
  const { addNotification } = useNotificationStore();

  return useMutation({
    onMutate: async (updatingConstatation: any) => {
      await queryClient.cancelQueries(["constatations", updatingConstatation?.constatationId]);

      const previousConstatation = queryClient.getQueryData<Constatation>(["constatations", updatingConstatation?.constatationId]);

      queryClient.setQueryData(["constatations", updatingConstatation?.constatationId], {
        ...previousConstatation,
        ...updatingConstatation.data,
        id: updatingConstatation.constatationId,
      });

      return { previousConstatation };
    },
    onError: (_, __, context: any) => {
      if (context?.previousConstatation) {
        queryClient.setQueryData(["constatations", context.previousConstatation.id], context.previousConstatation);
      }
    },
    onSuccess: (data) => {
      queryClient.refetchQueries(["constatations"]);
      queryClient.refetchQueries(["constatations", data.id]);
      addNotification({
        type: "success",
        title: "Constatation Mise-à-jour",
      });
    },
    ...config,
    mutationFn: updateConstatation,
  });
};
