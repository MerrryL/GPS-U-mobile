import { useMutation } from "react-query";

import { useNotificationStore } from "@/hooks/useNotificationStore";
import { MutationConfig, queryClient } from "@/lib/react-query";

import { updateFollowup } from "../api";

import { Constatation, Followup } from "@/types";

type FollowupToSend = {
  id: string;
  item: string;
}

type UseUpdateFollowupOptions = {
  constatationId: string;
  followups: FollowupToSend[];
  config?: MutationConfig<typeof updateFollowup>;
};

export const useUpdateFollowup = ({
  constatationId,
  followups,
  config,
}: UseUpdateFollowupOptions) => {
  const { addNotification } = useNotificationStore();
  return useMutation({
      onSuccess: async (data) => {
        await queryClient.cancelQueries(["followups"]);

        const previousFollowups =
          queryClient.getQueryData<Followup[]>(["followups"]);

        queryClient.setQueryData(["followups"], [
          ...(previousFollowups || []),
          data,
        ]);

        const previousConstatations =
          queryClient.getQueryData<Constatation[]>(["constatations"]);
          
        //console.log(queryClient.getQueryData<Constatation[]>(["constatations", 100]));
        let index = previousConstatations.findIndex((obj => obj.id.toString() == constatationId))

        previousConstatations[index].followups = data;


        queryClient.setQueryData(["constatations"], [
          ...previousConstatations,
        ]);
        

        addNotification({
          type: "success",
          title: "Followups Updated",
        });
    },
    ...config,
    mutationFn: updateFollowup,
  });
};
