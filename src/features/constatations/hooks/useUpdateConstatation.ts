import { useMutation } from "react-query";

import { useNotificationStore } from "@/hooks/useNotificationStore";
import { MutationConfig, queryClient } from "@/lib/react-query";

import { updateConstatation } from "../api";
import { Constatation } from "../types";

type UseUpdateConstatationOptions = {
  config?: MutationConfig<typeof updateConstatation>;
};

export const useUpdateConstatation = ({
  config,
}: UseUpdateConstatationOptions = {}) => {
  const { addNotification } = useNotificationStore();

  return useMutation({
    onMutate: async (updatingConstatation: any) => {
      await queryClient.cancelQueries([
        "constatation",
        updatingConstatation?.constatationId,
      ]);

      const previousConstatation = queryClient.getQueryData<Constatation>([
        "constatation",
        updatingConstatation?.constatationId,
      ]);

      queryClient.setQueryData(
        ["constatation", updatingConstatation?.constatationId],
        {
          ...previousConstatation,
          ...updatingConstatation.data,
          id: updatingConstatation.constatationId,
        }
      );

      return { previousConstatation };
    },
    onError: (_, __, context: any) => {
      if (context?.previousConstatation) {
        queryClient.setQueryData(
          ["constatation", context.previousConstatation.id],
          context.previousConstatation
        );
      }
    },
    onSuccess: (data) => {
      queryClient.refetchQueries(["constatation", data.id]);
      addNotification({
        type: "success",
        title: "Constatation Updated",
      });
    },
    ...config,
    mutationFn: updateConstatation,
  });
};
