import { useMutation } from "react-query";

import { useNotificationStore } from "@/hooks/useNotificationStore";
import { MutationConfig, queryClient } from "@/lib/react-query";

import { createConstatationImage } from "../api";
import { Constatation, Image } from "@/types";

type UseCreateConstatationImageOptions = {
  constatationId: string;
  config?: MutationConfig<typeof createConstatationImage>;
};

export const useCreateConstatationImage = ({ constatationId, config }: UseCreateConstatationImageOptions) => {
  const { addNotification } = useNotificationStore();
  return useMutation({
    onSuccess: async (data) => {
      queryClient.refetchQueries(["constatations"]);
      queryClient.refetchQueries(["images"]);

      addNotification({
        type: "success",
        title: "Image Créée",
      });
    },
    ...config,
    mutationFn: createConstatationImage,
  });
};
