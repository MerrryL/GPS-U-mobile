// import { useMutation } from "react-query";

// import { useNotificationStore } from "@/hooks/useNotificationStore";
// import { MutationConfig, queryClient } from "@/lib/react-query";

// import { updateField } from "../api";

// import { Constatation, Field } from "../types";

// type UseUpdateFieldOptions = {
//   constatationId: string;
//   config?: MutationConfig<typeof updateField>;
// };

// export const useUpdateField = ({
//   constatationId,
//   config,
// }: UseUpdateFieldOptions) => {
//   const { addNotification } = useNotificationStore();
//   return useMutation({
//       onSuccess: async (data) => {
//         console.log("new Field", data);

//         await queryClient.cancelQueries(["Fields"]);

//         const previousFields =
//           queryClient.getQueryData<Field[]>(["Fields"]);

//         queryClient.setQueryData(["Fields"], [
//           ...(previousFields || []),
//           data,
//         ]);

//         const previousConstatations =
//           queryClient.getQueryData<Constatation[]>(["constatations"]);
          
//         //console.log(queryClient.getQueryData<Constatation[]>(["constatations", 100]));
//         let index = previousConstatations.findIndex((obj => obj.id.toString() == constatationId))

//         previousConstatations[index].Field = data;


//         queryClient.setQueryData(["constatations"], [
//           ...previousConstatations,
//         ]);
        

//         addNotification({
//           type: "success",
//           title: "Field Updated",
//         });
//     },
//     ...config,
//     mutationFn: updateField,
//   });
// };
