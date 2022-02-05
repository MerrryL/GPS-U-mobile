import { useMutation } from "react-query";

import { useNotificationStore } from "@/hooks/useNotificationStore";
import { MutationConfig, queryClient } from "@/lib/react-query";

import { deleteTask } from "../api";

import { Constatation, Followup, Task } from "@/types";

type UseDeleteTaskOptions = {
  fieldId: string;
  followupId: string;
  constatationId: string;
  config?: MutationConfig<typeof deleteTask>;
};

export const useDeleteTask = ({ fieldId, followupId, constatationId, config }: UseDeleteTaskOptions) => {
  const { addNotification } = useNotificationStore();
  return useMutation({
    onSuccess: async (data) => {
      queryClient.refetchQueries(["observations"]);
      queryClient.refetchQueries(["followups"]);
      queryClient.refetchQueries(["followups", followupId]);
      queryClient.refetchQueries(["fields"]);
      addNotification({
        type: "success",
        title: "Champ supprimé",
      });
    },
    ...config,
    mutationFn: deleteTask,
  });
};
