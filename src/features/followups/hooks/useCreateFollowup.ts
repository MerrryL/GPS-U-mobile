import { useMutation } from "react-query";

import { useNotificationStore } from "@/hooks/useNotificationStore";
import { MutationConfig, queryClient } from "@/lib/react-query";

import { createFollowup } from "../api";
import { Followup } from "@/types";

type UseCreateFollowupOptions = {
  config?: MutationConfig<typeof createFollowup>;
};

export const useCreateFollowup = ({ config }: UseCreateFollowupOptions = {}) => {
  const { addNotification } = useNotificationStore();
  return useMutation({
    onMutate: async (newFollowup) => {
      await queryClient.cancelQueries(["constatations"]);

      const previousFollowups = queryClient.getQueryData<Followup[]>(["constatations"]);

      queryClient.setQueryData(["constatations"], [...(previousFollowups || []), newFollowup.data]);

      return { previousFollowups };
    },
    onError: (_, __, context: any) => {
      if (context?.previousFollowups) {
        queryClient.setQueryData(["constatations"], context.previousFollowups);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["constatations"]);
      addNotification({
        type: "success",
        title: "Followup Created",
      });
    },
    ...config,
    mutationFn: createFollowup,
  });
};
