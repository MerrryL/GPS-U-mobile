import { useMutation } from "react-query";

import { useNotificationStore } from "@/hooks/useNotificationStore";
import { MutationConfig, queryClient } from "@/lib/react-query";

import { updateFollowup } from "../api";
import { Followup } from "@/types";

type UseUpdateFollowupOptions = {
  config?: MutationConfig<typeof updateFollowup>;
};

export const useUpdateFollowup = ({ config }: UseUpdateFollowupOptions = {}) => {
  const { addNotification } = useNotificationStore();

  return useMutation({
    onMutate: async (updatingFollowup: any) => {
      await queryClient.cancelQueries(["constatations", updatingFollowup?.constatationId]);

      const previousFollowup = queryClient.getQueryData<Followup>(["constatations", updatingFollowup?.constatationId]);

      queryClient.setQueryData(["constatations", updatingFollowup?.constatationId], {
        ...previousFollowup,
        ...updatingFollowup.data,
        id: updatingFollowup.constatationId,
      });

      return { previousFollowup };
    },
    onError: (_, __, context: any) => {
      if (context?.previousFollowup) {
        queryClient.setQueryData(["constatations", context.previousFollowup.id], context.previousFollowup);
      }
    },
    onSuccess: (data) => {
      queryClient.refetchQueries(["constatations", data.id]);
      addNotification({
        type: "success",
        title: "Followup Updated",
      });
    },
    ...config,
    mutationFn: updateFollowup,
  });
};
