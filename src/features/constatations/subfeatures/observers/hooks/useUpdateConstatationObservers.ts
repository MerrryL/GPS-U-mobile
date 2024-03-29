import { useNotificationStore } from "@/hooks/useNotificationStore";
import { MutationConfig, queryClient } from "@/lib/react-query";
import { useMutation } from "react-query";
import { updateConstatationObservers } from "../api";



type ObserverToSend = {
  id: number;
  item: string;
};

type UseUpdateObserverOptions = {
  constatationId: number;
  observers: ObserverToSend[];
  config?: MutationConfig<typeof updateConstatationObservers>;
};

export const useUpdateConstatationObservers = ({ constatationId, observers, config }: UseUpdateObserverOptions) => {
  const { addNotification } = useNotificationStore();
  return useMutation({
    onSuccess: async (data) => {
      queryClient.refetchQueries(["constatations"]);
      queryClient.refetchQueries(["constatationObservers"]);
      queryClient.refetchQueries(["constatations", constatationId]);

      addNotification({
        type: "success",
        title: "Les observateurs de la constatation ont été mis-à-jour",
      });
    },
    ...config,
    mutationFn: updateConstatationObservers,
  });
};
