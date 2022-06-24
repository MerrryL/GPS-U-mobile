import { useMutation } from "react-query";
import { useNotificationStore } from "@/hooks/useNotificationStore";
import { MutationConfig, queryClient } from "@/lib/react-query";
import { Constatation } from "@/types";
import { QueryKeys } from "@/lib/query-keys";
import { axios } from "@/lib/axios";

interface RequireValidationOptions {
  constatationId: number;
};

export const requireValidation: (data: RequireValidationOptions) => Promise<Constatation> = ({ constatationId }: RequireValidationOptions): Promise<Constatation> => {
  return axios.post(`constatations/${constatationId}/require_validation`);
};
interface UseRequireValidationConstatationOptions {
  config?: MutationConfig<typeof requireValidation>;
};

export const useRequireValidationConstatation = ({ config }: UseRequireValidationConstatationOptions = {}) => {
  const { addNotification } = useNotificationStore();

  return useMutation({
    onMutate: async ({ constatationId }: RequireValidationOptions) => {
      await queryClient.cancelQueries([QueryKeys.Constatations, constatationId]);

      const previousConstatation: Constatation | undefined = queryClient.getQueryData<Constatation>([QueryKeys.Constatations, constatationId]);
      queryClient.setQueryData([QueryKeys.Constatations, constatationId], {
        ...previousConstatation,
        requires_validation: true,
      });

      await queryClient.cancelQueries([QueryKeys.Constatations]);

      const previousConstatations: Constatation[] | undefined = queryClient.getQueryData<Constatation[]>([QueryKeys.Constatations]);
      queryClient.setQueryData([QueryKeys.Constatations], [...(previousConstatations?.filter((constatation: Constatation) => constatation.id !== constatationId) || []), {
        ...previousConstatation,
        requires_validation: true,
      }]);

      return { previousConstatation: previousConstatation, previousConstatations: previousConstatations };
    },
    onError: (_, __: RequireValidationOptions, context) => {
      if (context?.previousConstatation) {
        queryClient.setQueryData([QueryKeys.Constatations, context.previousConstatation.id], context.previousConstatation);
      }
      if (context?.previousConstatations) {
        queryClient.setQueryData([QueryKeys.Constatations], context.previousConstatations);
      }
    },
    onSuccess: (data) => {
      queryClient.refetchQueries([QueryKeys.Constatations]);
      queryClient.refetchQueries([QueryKeys.Constatations, data.id]);
      addNotification({
        type: "success",
        title: "Validation de la constatation demandée",
      });
    },
    mutationFn: requireValidation,
  });
};
