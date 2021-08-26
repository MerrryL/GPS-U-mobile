import { useMutation } from "react-query";

import { useNotificationStore } from "@/hooks/useNotificationStore";
import { MutationConfig, queryClient } from "@/lib/react-query";

import { updateLocalization } from "../api";

import { Constatation, Localization } from "../types";

type UseUpdateLocalizationOptions = {
  constatationId: string;
  config?: MutationConfig<typeof updateLocalization>;
};

export const useUpdateLocalization = ({
  constatationId,
  config,
}: UseUpdateLocalizationOptions) => {
  const { addNotification } = useNotificationStore();
  return useMutation({
      onSuccess: async (data) => {
        console.log("new Localization", data);

        await queryClient.cancelQueries(["localizations"]);

        const previousLocalizations =
          queryClient.getQueryData<Localization[]>(["localizations"]);

        queryClient.setQueryData(["localizations"], [
          ...(previousLocalizations || []),
          data,
        ]);

        const previousConstatations =
          queryClient.getQueryData<Constatation[]>(["constatations"]);
          
        //console.log(queryClient.getQueryData<Constatation[]>(["constatations", 100]));
        let index = previousConstatations.findIndex((obj => obj.id.toString() == constatationId))

        previousConstatations[index].localization = data;


        queryClient.setQueryData(["constatations"], [
          ...previousConstatations,
        ]);
        

        addNotification({
          type: "success",
          title: "Localization Updated",
        });
    },
    ...config,
    mutationFn: updateLocalization,
  });
};
