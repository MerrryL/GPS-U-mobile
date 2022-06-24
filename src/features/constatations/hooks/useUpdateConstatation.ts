import { useNotificationStore } from "@/hooks/useNotificationStore";
import { QueryKeys } from "@/lib/query-keys";
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
      await queryClient.cancelQueries([QueryKeys.Constatations, updatingConstatation?.constatationId]);

      const previousConstatation = queryClient.getQueryData<Constatation>([QueryKeys.Constatations, updatingConstatation?.constatationId]);

      queryClient.setQueryData([QueryKeys.Constatations, updatingConstatation?.constatationId], {
        ...previousConstatation,
        ...updatingConstatation.data,
        id: updatingConstatation.constatationId,
      });

      return { previousConstatation };
    },
    onError: (_, __, context: any) => {
      if (context?.previousConstatation) {
        queryClient.setQueryData([QueryKeys.Constatations, context.previousConstatation.id], context.previousConstatation);
      }
    },
    onSuccess: (data) => {
      queryClient.refetchQueries([QueryKeys.Constatations]);
      queryClient.refetchQueries([QueryKeys.Constatations, data.id]);
      addNotification({
        type: "success",
        title: "Constatation Mise-à-jour",
      });
    },
    ...config,
    mutationFn: updateConstatation,
  });
};
