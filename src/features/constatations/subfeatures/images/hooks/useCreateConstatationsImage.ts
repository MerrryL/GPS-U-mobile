import { useMutation } from "react-query";

import { useNotificationStore } from "@/hooks/useNotificationStore";
import { MutationConfig, queryClient } from "@/lib/react-query";

import { createConstatationImage } from "../api";
import { Constatation, Image } from "@/types";

type UseCreateConstatationImageOptions = {
  constatationId: string;
  config?: MutationConfig<typeof createConstatationImage>;
};

export const useCreateConstatationImage = ({
  constatationId,
  config,
}: UseCreateConstatationImageOptions) => {
  const { addNotification } = useNotificationStore();
  return useMutation({
    onSuccess: async (data) => {
      // await queryClient.cancelQueries(["images"]);

      // const previousImages =
      //   queryClient.getQueryData<Image[]>(["images"]);

      // queryClient.setQueryData(["images"], [
      //   ...(previousImages || []),
      //   data,
      // ]);

      // const previousConstatations = queryClient.getQueryData<Constatation[]>(["constatations"]);
        
      // let index = previousConstatations.findIndex((obj => obj.id.toString() == constatationId))

      // previousConstatations[index].images.push(data);


      // queryClient.setQueryData(["constatations"], [
      //   ...previousConstatations,
      // ]);
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
