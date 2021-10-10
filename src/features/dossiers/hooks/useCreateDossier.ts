import { useMutation } from "react-query";

import { useNotificationStore } from "@/hooks/useNotificationStore";
import { MutationConfig, queryClient } from "@/lib/react-query";

import { createDossier } from "../api";

import { Constatation, Dossier } from "@/types";

type UseCreateDossierOptions = {
  constatationId: string;
  config?: MutationConfig<typeof createDossier>;
};

export const useCreateDossier = ({
  constatationId,
  config,
}: UseCreateDossierOptions) => {
  const { addNotification } = useNotificationStore();
  return useMutation({
      onSuccess: async (data) => {
        await queryClient.cancelQueries(["dossiers"]);
        const previousDossiers = queryClient.getQueryData<Dossier[]>(["dossiers"]);
        queryClient.setQueryData(["dossiers"], [ ...(previousDossiers || []), data, ]);


        await queryClient.cancelQueries(["constatations"]);
        const previousConstatations = queryClient.getQueryData<Constatation[]>(["constatations"]);
        let constatIndex = previousConstatations.findIndex((obj => obj.id.toString() == constatationId));
        previousConstatations[constatIndex].dossiers.push(data);
        queryClient.setQueryData(["constatations"], [ ...previousConstatations,]);

        addNotification({
          type: "success",
          title: "Dossier Created",
        });
    },
    ...config,
    mutationFn: createDossier,
  });
};
