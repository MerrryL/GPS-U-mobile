import { useMutation } from "react-query";

import { useNotificationStore } from "@/hooks/useNotificationStore";
import { MutationConfig, queryClient } from "@/lib/react-query";

import { createImage } from "../../../api";

import { Constatation, Image } from "../../../types";

type UseCreateImageOptions = {
  constatationId: string;
  config?: MutationConfig<typeof createImage>;
};

export const useCreateImage = ({
  constatationId,
  config,
}: UseCreateImageOptions) => {
  const { addNotification } = useNotificationStore();
  return useMutation({
      onSuccess: async (data) => {
        await queryClient.cancelQueries(["constatations"]);

        const previousConstatations =
          queryClient.getQueryData<Constatation[]>(["constatations"]);
          
        //console.log(queryClient.getQueryData<Constatation[]>(["constatations", 100]));
        let index = previousConstatations.findIndex((obj => obj.id == constatationId))

        previousConstatations[index].images.push(data);

        queryClient.setQueryData(["constatations"], [
          ...previousConstatations,
        ]);

        addNotification({
          type: "success",
          title: "Image Created",
        });
    },
    ...config,
    mutationFn: createImage,
  });
};
