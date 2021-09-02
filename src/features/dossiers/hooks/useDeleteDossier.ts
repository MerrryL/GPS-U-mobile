import { useMutation } from "react-query";

import { useNotificationStore } from "@/hooks/useNotificationStore";
import { MutationConfig, queryClient } from "@/lib/react-query";

import { deleteDossier } from "../api";

import { Constatation, Dossier } from "../types";

type UseDeleteDossierOptions = {
  dossierId:string;
  config?: MutationConfig<typeof deleteDossier>;
};

export const useDeleteDossier = ({
  dossierId,
  config,
}: UseDeleteDossierOptions) => {
  const { addNotification } = useNotificationStore();
  return useMutation({
    onSuccess: async (data) => {
      await queryClient.cancelQueries(["dossiers"]);

      const previousdossiers = queryClient.getQueryData<Dossier[]>(["dossiers"]);
      console.log("dossierId", dossierId, data, previousdossiers);
      let dossierIndex = previousdossiers.findIndex((obj) => obj.id == dossierId);
      previousdossiers.splice(dossierIndex, 1);
      queryClient.setQueryData(["dossiers"], [...previousdossiers]);


      // await queryClient.cancelQueries(["constatations"]);
      // const previousConstatations = queryClient.getQueryData<Constatation[]>(["constatations"]);
      // let constatationIndex = previousConstatations.findIndex((obj) => obj.id == constatationId);
      // let constatationIndex2 = previousConstatations[constatationIndex].dossiers.findIndex((obj => obj.id == dossierId));
      // previousConstatations[constatationIndex].dossiers.splice(constatationIndex2, 1);
      // queryClient.setQueryData(["constatations"], [...previousConstatations]);

      addNotification({
        type: "success",
        title: "dossier Deleted",
      });
    },
    ...config,
    mutationFn: deleteDossier,
  });
};
