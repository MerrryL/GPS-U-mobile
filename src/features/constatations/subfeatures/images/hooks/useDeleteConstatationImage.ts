import { useMutation } from "react-query";

import { useNotificationStore } from "@/hooks/useNotificationStore";
import { MutationConfig, queryClient } from "@/lib/react-query";

import { deleteConstatationImage } from "../api";

import { Constatation, Image } from "@/types";

type UseDeleteConstatationImageOptions = {
  imageId: string;
  constatationId: string;
  config?: MutationConfig<typeof deleteConstatationImage>;
};

export const useDeleteConstatationImage = ({
  imageId,
  constatationId,
  config,
}: UseDeleteConstatationImageOptions) => {
  const { addNotification } = useNotificationStore();
  return useMutation({
    onSuccess: async (data) => {
      queryClient.refetchQueries(["constatations"]);
      queryClient.refetchQueries(["images"]);

      addNotification({
        type: "success",
        title: "Image supprimée",
      });
    },
    ...config,
    mutationFn: deleteConstatationImage,
  });
};
