//TODO: implement or delete

// import { useMutation } from "react-query";

// import { useNotificationStore } from "@/hooks/useNotificationStore";
// import { MutationConfig, queryClient } from "@/lib/react-query";

// import { updateDossier } from "../api";

// import { Constatation, Dossier } from "@/types";

// type UseUpdateDossierOptions = {
//   constatationId: string;
//   config?: MutationConfig<typeof updateDossier>;
// };

// export const useUpdateDossier = ({
//   constatationId,
//   config,
// }: UseUpdateDossierOptions) => {
//   const { addNotification } = useNotificationStore();
//   return useMutation({
//       onSuccess: async (data) => {
//         console.log("new Dossier", data);

//         await queryClient.cancelQueries(["Dossiers"]);

//         const previousDossiers =
//           queryClient.getQueryData<Dossier[]>(["Dossiers"]);

//         queryClient.setQueryData(["Dossiers"], [
//           ...(previousDossiers || []),
//           data,
//         ]);

//         const previousConstatations =
//           queryClient.getQueryData<Constatation[]>(["constatations"]);

//         //console.log(queryClient.getQueryData<Constatation[]>(["constatations", 100]));
//         let index = previousConstatations.findIndex((obj => obj.id.toString() == constatationId))

//         previousConstatations[index].Dossier = data;

//         queryClient.setQueryData(["constatations"], [
//           ...previousConstatations,
//         ]);

//         addNotification({
//           type: "success",
//           title: "Dossier Updated",
//         });
//     },
//     ...config,
//     mutationFn: updateDossier,
//   });
// };
