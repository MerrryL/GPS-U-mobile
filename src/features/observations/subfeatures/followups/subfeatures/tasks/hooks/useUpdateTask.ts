//TODO: is it needed

// import { useMutation } from "react-query";

// import { useNotificationStore } from "@/hooks/useNotificationStore";
// import { MutationConfig, queryClient } from "@/lib/react-query";

// import { updateTask } from "../api";

// import { Constatation, Task } from "@/types";

// type UseUpdateTaskOptions = {
//   constatationId: number;
//   config?: MutationConfig<typeof updateTask>;
// };

// export const useUpdateTask = ({
//   constatationId,
//   config,
// }: UseUpdateTaskOptions) => {
//   const { addNotification } = useNotificationStore();
//   return useMutation({
//       onSuccess: async (data) => {
//         console.log("new Task", data);

//         await queryClient.cancelQueries(["Tasks"]);

//         const previousTasks =
//           queryClient.getQueryData<Task[]>(["Tasks"]);

//         queryClient.setQueryData(["Tasks"], [
//           ...(previousTasks || []),
//           data,
//         ]);

//         const previousConstatations =
//           queryClient.getQueryData<Constatation[]>(["constatations"]);

//         //console.log(queryClient.getQueryData<Constatation[]>(["constatations", 100]));
//         let index = previousConstatations.findIndex((obj => obj.id.toString() == constatationId))

//         previousConstatations[index].Task = data;

//         queryClient.setQueryData(["constatations"], [
//           ...previousConstatations,
//         ]);

//         addNotification({
//           type: "success",
//           title: "Task Updated",
//         });
//     },
//     ...config,
//     mutationFn: updateTask,
//   });
// };
