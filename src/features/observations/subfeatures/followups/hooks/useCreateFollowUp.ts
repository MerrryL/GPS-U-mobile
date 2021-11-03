import { useMutation } from "react-query";

import { useNotificationStore } from "@/hooks/useNotificationStore";
import { MutationConfig, queryClient } from "@/lib/react-query";

import { createFollowup } from "../api";

import { Observation, Followup } from "@/types";

type UseCreateFollowupOptions = {
  observationId: string;
  name: string;
  description: string;
  config?: MutationConfig<typeof createFollowup>;
};

export const useCreateFollowup = ({
  observationId,
  config,
}: UseCreateFollowupOptions) => {
  const { addNotification } = useNotificationStore();
  return useMutation({
    onSuccess: async (data) => {
      queryClient.refetchQueries(["observations"]);
      queryClient.refetchQueries(["followups"]);
      addNotification({
        type: "success",
        title: "Suivi créé",
      });
    },
    ...config,
    mutationFn: createFollowup,
  });
};
