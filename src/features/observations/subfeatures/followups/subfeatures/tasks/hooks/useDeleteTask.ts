import { useNotificationStore } from "@/hooks/useNotificationStore";
import { MutationConfig, queryClient } from "@/lib/react-query";
import { useMutation } from "react-query";
import { deleteTask } from "../api";




type UseDeleteTaskOptions = {
  fieldId: string;
  followupId: string;
  constatationId: number;
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
