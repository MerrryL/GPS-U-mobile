import { useMutation } from "react-query";

import { useNotificationStore } from "@/hooks/useNotificationStore";
import { MutationConfig, queryClient } from "@/lib/react-query";

import { updateLocalization } from "../api";

import { Constatation, Localization } from "@/types";

type UseUpdateLocalizationOptions = {
  config?: MutationConfig<typeof updateLocalization>;
};

export const useUpdateLocalization = ({
  config,
}: UseUpdateLocalizationOptions = {}) => {
  const { addNotification } = useNotificationStore();
  return useMutation({
    onSuccess: async (data) => {
      queryClient.refetchQueries(["constatations"]);
      queryClient.refetchQueries(["constatations", data.constatation_id]);
      queryClient.refetchQueries(["localizations", data.constatation_id]);

      addNotification({
        type: "success",
        title: "Localisation mise-à-jour",
      });
    },
    ...config,
    mutationFn: updateLocalization,
  });
};
