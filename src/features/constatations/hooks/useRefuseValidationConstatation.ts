import { useMutation } from "react-query";
import { useNotificationStore } from "@/hooks/useNotificationStore";
import { MutationConfig, queryClient } from "@/lib/react-query";
import { Constatation } from "@/types";
import { QueryKeys } from "@/lib/query-keys";
import { axios } from "@/lib/axios";

interface RefuseValidationOptions {
  constatationId: number;
};

export const refuseValidation: ({ constatationId }: RefuseValidationOptions) => Promise<Constatation> = ({ constatationId }: RefuseValidationOptions): Promise<Constatation> => {
  return axios.post(`constatations/${constatationId}/refuse_validation`);
};

interface UseRefuseValidationConstatationOptions {
  config?: MutationConfig<typeof refuseValidation>;
};

export const useRefuseValidationConstatation = ({ config }: UseRefuseValidationConstatationOptions = {}) => {
  const { addNotification } = useNotificationStore();

  return useMutation({
    onMutate: async ({ constatationId }: RefuseValidationOptions) => {
      await queryClient.cancelQueries([QueryKeys.Constatations, constatationId]);

      const previousConstatation: Constatation | undefined = queryClient.getQueryData<Constatation>([QueryKeys.Constatations, constatationId]);
      queryClient.setQueryData([QueryKeys.Constatations, constatationId], {
        ...previousConstatation,
        requires_validation: false,
      });

      await queryClient.cancelQueries([QueryKeys.Constatations]);

      const previousConstatations: Constatation[] | undefined = queryClient.getQueryData<Constatation[]>([QueryKeys.Constatations]);
      queryClient.setQueryData([QueryKeys.Constatations], [...(previousConstatations?.filter((constatation: Constatation) => constatation.id !== constatationId) || []), {
        ...previousConstatation,
        requires_validation: false,
      }]);

      return { previousConstatation: previousConstatation, previousConstatations: previousConstatations };
    },
    onError: (_, __:RefuseValidationOptions, context) => {
      if (context?.previousConstatation) {
        queryClient.setQueryData([QueryKeys.Constatations, context.previousConstatation.id], context.previousConstatation);
      }
      if (context?.previousConstatations) {
        queryClient.setQueryData([QueryKeys.Constatations], context.previousConstatations);
      }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries([QueryKeys.Constatations]);
      queryClient.invalidateQueries([QueryKeys.Constatations, data.id]);
      addNotification({
        type: "success",
        title: "Validation de la constatation refusée",
      });
    },
    mutationFn: refuseValidation,
  });
};
