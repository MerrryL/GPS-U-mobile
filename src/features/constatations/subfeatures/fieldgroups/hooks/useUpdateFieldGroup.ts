//TODO: is it needed?

// import { useMutation } from "react-query";

// import { useNotificationStore } from "@/hooks/useNotificationStore";
// import { MutationConfig, queryClient } from "@/lib/react-query";

// import { updateFieldGroup } from "../api";

// import { Constatation, FieldGroup } from "@/types";

// type UseUpdateFieldGroupOptions = {
//   constatationId: string;
//   config?: MutationConfig<typeof updateFieldGroup>;
// };

// export const useUpdateFieldGroup = ({
//   constatationId,
//   config,
// }: UseUpdateFieldGroupOptions) => {
//   const { addNotification } = useNotificationStore();
//   return useMutation({
//       onSuccess: async (data) => {
//         console.log("new FieldGroup", data);

//         await queryClient.cancelQueries(["FieldGroups"]);

//         const previousFieldGroups =
//           queryClient.getQueryData<FieldGroup[]>(["FieldGroups"]);

//         queryClient.setQueryData(["FieldGroups"], [
//           ...(previousFieldGroups || []),
//           data,
//         ]);

//         const previousConstatations =
//           queryClient.getQueryData<Constatation[]>(["constatations"]);

//         //console.log(queryClient.getQueryData<Constatation[]>(["constatations", 100]));
//         let index = previousConstatations.findIndex((obj => obj.id.toString() == constatationId))

//         previousConstatations[index].FieldGroup = data;

//         queryClient.setQueryData(["constatations"], [
//           ...previousConstatations,
//         ]);

//         addNotification({
//           type: "success",
//           title: "FieldGroup Updated",
//         });
//     },
//     ...config,
//     mutationFn: updateFieldGroup,
//   });
// };
