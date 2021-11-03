//TODO: is it needed?

// import { useMutation } from "react-query";

// import { useNotificationStore } from "@/hooks/useNotificationStore";
// import { MutationConfig, queryClient } from "@/lib/react-query";

// import { updateFollowup } from "../api";

// import { Constatation, Followup } from "@/types";

// type UseUpdateFollowupOptions = {
//   constatationId: string;
//   config?: MutationConfig<typeof updateFollowup>;
// };

// export const useUpdateFollowup = ({
//   constatationId,
//   config,
// }: UseUpdateFollowupOptions) => {
//   const { addNotification } = useNotificationStore();
//   return useMutation({
//       onSuccess: async (data) => {
//   queryClient.refetchQueries(["observations"]);
//   queryClient.refetchQueries(["followups"]);
//   addNotification({
//     type: "success",
//     title: "Suivi mis-à-jour",
//   });
// },
//     ...config,
//     mutationFn: updateFollowup,
//   });
// };
