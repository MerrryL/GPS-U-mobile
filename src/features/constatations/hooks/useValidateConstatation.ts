import { useMutation } from "react-query";
import { useNotificationStore } from "@/hooks/useNotificationStore";
import { MutationConfig, queryClient } from "@/lib/react-query";
import { Constatation } from "@/types";
import { QueryKeys } from "@/lib/query-keys";
import { axios } from "@/lib/axios";

interface ValidateConstatationOptions {
  constatationId: number;
};

export const validateConstatation: (data: ValidateConstatationOptions) => Promise<Constatation> = ({ constatationId }: ValidateConstatationOptions): Promise<Constatation> => {
  return axios.post(`constatations/${constatationId}/validate_constatation`);
};

interface UseValidateConstatationOptions {
  config?: MutationConfig<typeof validateConstatation>;
};

export const useValidateConstatation = ({ config }: UseValidateConstatationOptions = {}) => {
  const { addNotification } = useNotificationStore();

  return useMutation({
    onMutate: async ({ constatationId }: ValidateConstatationOptions) => {
      await queryClient.cancelQueries([QueryKeys.Constatations, constatationId]);

      const previousConstatation: Constatation | undefined = queryClient.getQueryData<Constatation>([QueryKeys.Constatations, constatationId]);
      queryClient.setQueryData([QueryKeys.Constatations, constatationId], {
        ...previousConstatation,
        requires_validation: false,
        is_validated: true
      });

      await queryClient.cancelQueries([QueryKeys.Constatations]);

      const previousConstatations: Constatation[] | undefined = queryClient.getQueryData<Constatation[]>([QueryKeys.Constatations]);
      queryClient.setQueryData([QueryKeys.Constatations], [...(previousConstatations?.filter((constatation: Constatation) => constatation.id !== constatationId) || []), {
        ...previousConstatation,
        requires_validation: false,
        is_validated: true
      }]);

      return { previousConstatation: previousConstatation, previousConstatations: previousConstatations };
    },
    onError: (_, __: ValidateConstatationOptions, context) => {
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
        title: "Constatation validée",
      });
    },
    mutationFn: validateConstatation,
  });
};
