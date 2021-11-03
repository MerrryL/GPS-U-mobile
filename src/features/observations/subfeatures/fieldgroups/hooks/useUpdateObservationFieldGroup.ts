//TODO: is it needed?

// import { useMutation } from "react-query";

// import { useNotificationStore } from "@/hooks/useNotificationStore";
// import { MutationConfig, queryClient } from "@/lib/react-query";

// import { updateObservationFieldGroup } from "../api";

// import { Constatation, ObservationFieldGroup } from "@/types";

// type UseUpdateObservationFieldGroupOptions = {
//   constatationId: string;
//   config?: MutationConfig<typeof updateObservationFieldGroup>;
// };

// export const useUpdateObservationFieldGroup = ({
//   constatationId,
//   config,
// }: UseUpdateObservationFieldGroupOptions) => {
//   const { addNotification } = useNotificationStore();
//   return useMutation({
//       onSuccess: async (data) => {
//   queryClient.refetchQueries(["observations"]);
//   queryClient.refetchQueries(["field_groups"]);
//   addNotification({
//     type: "success",
//     title: "Groupe de champs mis-à-jour",
//   });
// },
//     ...config,
//     mutationFn: updateObservationFieldGroup,
//   });
// };
