import { useMutation } from "react-query";

import { useNotificationStore } from "@/hooks/useNotificationStore";
import { MutationConfig, queryClient } from "@/lib/react-query";

import { deleteFollowup } from "../api";

import { Constatation, Followup } from "@/types";

type UseDeleteFollowupOptions = {
  followupId: string;
  observationId: string;
  config?: MutationConfig<typeof deleteFollowup>;
};

//Todo: error after deletion : it looks like it fetches ["followups", $id] and errors on it
export const useDeleteFollowup = ({ followupId, observationId, config }: UseDeleteFollowupOptions) => {
  const { addNotification } = useNotificationStore();
  return useMutation({
    onSuccess: async (data) => {
      queryClient.refetchQueries(["observations"]);
      queryClient.refetchQueries(["observations", observationId]);
      queryClient.refetchQueries(["followups"]);

      addNotification({
        type: "success",
        title: "Suivi supprimé",
      });
    },
    ...config,
    mutationFn: deleteFollowup,
  });
};
