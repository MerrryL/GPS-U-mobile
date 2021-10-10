import { useMutation } from "react-query";

import { useNotificationStore } from "@/hooks/useNotificationStore";
import { MutationConfig, queryClient } from "@/lib/react-query";

import { deleteLocalization } from "../api";

import { Constatation, Localization } from "@/types";

type UseDeleteLocalizationOptions = {
  localizationId: string;
  constatationId: string;
  config?: MutationConfig<typeof deleteLocalization>;
};

export const useDeleteLocalization = ({
  localizationId,
  constatationId,
  config,
}: UseDeleteLocalizationOptions) => {
  const { addNotification } = useNotificationStore();
  return useMutation({
    onSuccess: async (data) => {
      await queryClient.cancelQueries(["localizations"]);

      const previousLocalizations = queryClient.getQueryData<Localization[]>(["localizations"]);

      let localizationIndex = previousLocalizations.findIndex((obj) => obj.id == localizationId);

      previousLocalizations.splice(localizationIndex, 1);

      queryClient.setQueryData(["localizations"], [...previousLocalizations]);

      const previousConstatations = queryClient.getQueryData<Constatation[]>([
        "constatations",
      ]);

      //console.log(queryClient.getQueryData<Constatation[]>(["constatations", 100]));
      let index = previousConstatations.findIndex(
        (obj) => obj.id == constatationId
      );

      console.log(previousConstatations, previousConstatations[index], index);

      previousConstatations[index].localization= null;

      queryClient.setQueryData(["constatations"], [...previousConstatations]);

      addNotification({
        type: "success",
        title: "Localization Deleted",
      });
    },
    ...config,
    mutationFn: deleteLocalization,
  });
};
