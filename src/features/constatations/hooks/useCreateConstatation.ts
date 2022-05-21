import { useNotificationStore } from "@/hooks/useNotificationStore";
import { queryClient } from "@/lib/react-query";
import { useMutation } from "react-query";
import { createConstatation } from "../api";

// type UseCreateConstatationOptions = {
//   config?: MutationConfig<typeof createConstatation>;
//   data: Constatation;
// };

export const useCreateConstatation = () => {
  const { addNotification } = useNotificationStore();
  return useMutation({
    // onMutate: async (newConstatation: UseCreateConstatationOptions) => {
    //   await queryClient.cancelQueries(["constatations"]);

    //   const previousConstatations: Constatation[] | undefined = queryClient.getQueryData<Constatation[]>(["constatations"]);

    //   queryClient.setQueryData(["constatations"], [...(previousConstatations || []), newConstatation.data]);

    //   return { previousConstatations };
    // },
    onError: (_, __, context: any) => {
      if (context?.previousConstatations) {
        queryClient.setQueryData(["constatations"], context.previousConstatations);
      }
    },
    onSuccess: () => {
      queryClient.refetchQueries(["constatations"]);
      addNotification({
        type: "success",
        title: "Constatation Créée",
      });
    },
    mutationFn: createConstatation,
  });
};
