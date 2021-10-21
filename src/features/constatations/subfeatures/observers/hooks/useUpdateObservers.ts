import { useMutation } from "react-query";

import { useNotificationStore } from "@/hooks/useNotificationStore";
import { MutationConfig, queryClient } from "@/lib/react-query";

import { updateObserver } from "../api";

import { Constatation, Observer } from "@/types";

type ObserverToSend = {
  id: string;
  item: string;
}

type UseUpdateObserverOptions = {
  constatationId: string;
  observers: ObserverToSend[];
  config?: MutationConfig<typeof updateObserver>;
};

export const useUpdateObserver = ({
  constatationId,
  observers,
  config,
}: UseUpdateObserverOptions) => {
  const { addNotification } = useNotificationStore();
  return useMutation({
      onSuccess: async (data) => {

        console.log("data", data);
        await queryClient.cancelQueries(["observers"]);

        const previousObservers =
          queryClient.getQueryData<Observer[]>(["observers"]);

        queryClient.setQueryData(["observers"], [
          ...(previousObservers || []),
          data,
        ]);

        const previousConstatations =
          queryClient.getQueryData<Constatation[]>(["constatations"]);
          
        let index = previousConstatations.findIndex((obj => obj.id.toString() == constatationId))

        previousConstatations[index].observers = data;


        queryClient.setQueryData(["constatations"], [
          ...previousConstatations,
        ]);
        

        addNotification({
          type: "success",
          title: "Observers Updated",
        });
    },
    ...config,
    mutationFn: updateObserver,
  });
};
