import { useMutation } from "react-query";

import { useNotificationStore } from "@/hooks/useNotificationStore";
import { MutationConfig, queryClient } from "@/lib/react-query";

import { createConstatation } from "../api";
import { Constatation } from "@/types";

type UseCreateConstatationOptions = {
  config?: MutationConfig<typeof createConstatation>;
};

export const useCreateConstatation = ({ config }: UseCreateConstatationOptions = {}) => {
  const { addNotification } = useNotificationStore();
  return useMutation({
    onMutate: async (newConstatation) => {
      await queryClient.cancelQueries(["constatations"]);

      const previousConstatations = queryClient.getQueryData<Constatation[]>(["constatations"]);

      queryClient.setQueryData(["constatations"], [...(previousConstatations || []), newConstatation.data]);

      return { previousConstatations };
    },
    onError: (_, __, context: any) => {
      if (context?.previousConstatations) {
        queryClient.setQueryData(["constatations"], context.previousConstatations);
      }
    },
    onSuccess: () => {
      queryClient.refetchQueries(["constatations"]);
      addNotification({
        type: "success",
        title: "Constatation Créée",
      });
    },
    ...config,
    mutationFn: createConstatation,
  });
};
