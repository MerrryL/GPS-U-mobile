import { useMutation } from "react-query";
import { useNotificationStore } from "@/hooks/useNotificationStore";
import { MutationConfig, queryClient } from "@/lib/react-query";
import { Constatation, Localization } from "@/types";
import { axios } from "@/lib/axios";
import { QueryKeys } from "@/lib/query-keys";

export interface UpdateLocalizationOptions {
  localization: Localization;
  constatationId: number;
};

export const updateLocalization = ({ localization, constatationId }: UpdateLocalizationOptions): Promise<Localization> => {
  if (localization.id === undefined) {
    return axios.post(`/constatations/${constatationId}/localization/`, localization);
  } else {
    return axios.patch(`/constatations/${constatationId}/localization/${localization.id}`, localization);
  }
};

interface UseUpdateLocalizationOptions {
  config?: MutationConfig<typeof updateLocalization>;
};

export const useUpdateLocalization = ({ config }: UseUpdateLocalizationOptions = {}) => {
  const { addNotification } = useNotificationStore();
  return useMutation({
    onMutate: async ({ localization, constatationId }: UpdateLocalizationOptions) => {
      await queryClient.cancelQueries([QueryKeys.Constatations, constatationId]);

      const previousConstatation: Constatation | undefined = queryClient.getQueryData<Constatation>([QueryKeys.Constatations, constatationId]);
      queryClient.setQueryData([QueryKeys.Constatations, constatationId], {
        ...previousConstatation,
        localization: localization,
      });

      await queryClient.cancelQueries([QueryKeys.Constatations]);

      const previousConstatations: Constatation[] | undefined = queryClient.getQueryData<Constatation[]>([QueryKeys.Constatations]);
      queryClient.setQueryData([QueryKeys.Constatations], [...(previousConstatations?.filter((constatation: Constatation) => constatation.id !== constatationId) || []), {
        ...previousConstatation,
        localization: localization,
      }]);

      return { previousConstatation: previousConstatation, previousConstatations: previousConstatations };
    },
    onSuccess: async (localization:Localization) => {
      queryClient.invalidateQueries([QueryKeys.Constatations]);
      queryClient.invalidateQueries([QueryKeys.Constatations, localization.constatation_id]);

      addNotification({
        type: "success",
        title: "Localisation mise-à-jour",
      });
    },
    mutationFn: updateLocalization,
  });
};
