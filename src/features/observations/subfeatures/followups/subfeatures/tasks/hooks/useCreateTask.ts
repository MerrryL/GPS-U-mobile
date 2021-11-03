import { useMutation } from "react-query";

import { useNotificationStore } from "@/hooks/useNotificationStore";
import { MutationConfig, queryClient } from "@/lib/react-query";

import { createTask } from "../api";

import { Constatation, Task, Followup } from "@/types";

type UseCreateTaskOptions = {
  followupId: string;
  observationId: string;
  name: string;
  description: string;
  realisation_date: string;
  report_date: string;
  report_periodicity: string;
  task_status_id: string;
  config?: MutationConfig<typeof createTask>;
};

export const useCreateTask = ({
  observationId,
  followupId,
  config,
}: UseCreateTaskOptions) => {
  const { addNotification } = useNotificationStore();
  return useMutation({
    onSuccess: async (data) => {
    queryClient.refetchQueries(["observations"]);
    queryClient.refetchQueries(["followups"]);
    queryClient.refetchQueries(["fields"]);
    addNotification({
      type: "success",
      title: "Champ créé",
    });
    },
    ...config,
    mutationFn: createTask,
  });
};
