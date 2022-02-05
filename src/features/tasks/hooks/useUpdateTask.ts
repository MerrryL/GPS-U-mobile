import { useMutation } from "react-query";

import { useNotificationStore } from "@/hooks/useNotificationStore";
import { MutationConfig, queryClient } from "@/lib/react-query";

import { updateTask } from "../api";
import { Task } from "@/types";

type UseUpdateTaskOptions = {
  config?: MutationConfig<typeof updateTask>;
};

export const useUpdateTask = ({ config }: UseUpdateTaskOptions = {}) => {
  const { addNotification } = useNotificationStore();

  return useMutation({
    onMutate: async (updatingTask: any) => {
      await queryClient.cancelQueries(["constatations", updatingTask?.constatationId]);

      const previousTask = queryClient.getQueryData<Task>(["constatations", updatingTask?.constatationId]);

      queryClient.setQueryData(["constatations", updatingTask?.constatationId], {
        ...previousTask,
        ...updatingTask.data,
        id: updatingTask.constatationId,
      });

      return { previousTask };
    },
    onError: (_, __, context: any) => {
      if (context?.previousTask) {
        queryClient.setQueryData(["constatations", context.previousTask.id], context.previousTask);
      }
    },
    onSuccess: (data) => {
      queryClient.refetchQueries(["constatations", data.id]);
      addNotification({
        type: "success",
        title: "Task Updated",
      });
    },
    ...config,
    mutationFn: updateTask,
  });
};
