import { useMutation } from "react-query";

import { useNotificationStore } from "@/hooks/useNotificationStore";
import { MutationConfig, queryClient } from "@/lib/react-query";

import { createTask } from "../api";
import { Task } from "@/types";

type UseCreateTaskOptions = {
  config?: MutationConfig<typeof createTask>;
};

export const useCreateTask = ({
  config,
}: UseCreateTaskOptions = {}) => {
  const { addNotification } = useNotificationStore();
  return useMutation({
    onMutate: async (newTask) => {
      await queryClient.cancelQueries(["constatations"]);

      const previousTasks =
        queryClient.getQueryData<Task[]>(["constatations"]);

      queryClient.setQueryData(["constatations"], [
        ...(previousTasks || []),
        newTask.data,
      ]);

      return { previousTasks };
    },
    onError: (_, __, context: any) => {
      if (context?.previousTasks) {
        queryClient.setQueryData(
          ["constatations"],
          context.previousTasks
        );
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["constatations"]);
      addNotification({
        type: "success",
        title: "Task Created",
      });
    },
    ...config,
    mutationFn: createTask,
  });
};
