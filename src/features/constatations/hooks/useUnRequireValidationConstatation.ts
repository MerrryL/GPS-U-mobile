import { useMutation } from "react-query";

import { useNotificationStore } from "@/hooks/useNotificationStore";
import { MutationConfig, queryClient } from "@/lib/react-query";

import { unRequireValidation } from "../api";
import { Constatation } from "../types";

type UseUnRequireValidationConstatationOptions = {
  config?: MutationConfig<typeof unRequireValidation>;
};

export const useUnRequireValidationConstatation = ({
  config,
}: UseUnRequireValidationConstatationOptions = {}) => {
  const { addNotification } = useNotificationStore();

  return useMutation({
    onMutate: async (updatingConstatation: any) => {
      await queryClient.cancelQueries([
        "constatations",
        updatingConstatation?.constatationId,
      ]);

      const previousConstatation = queryClient.getQueryData<Constatation>([
        "constatations",
        updatingConstatation?.constatationId,
      ]);

      queryClient.setQueryData(
        ["constatations", updatingConstatation?.constatationId],
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
          ["constatations", context.previousConstatation.id],
          context.previousConstatation
        );
      }
    },
    onSuccess: (data) => {
      queryClient.refetchQueries(["constatations", data.id]);
      addNotification({
        type: "success",
        title: "Constatation Updated",
      });
    },
    ...config,
    mutationFn: unRequireValidation,
  });
};
