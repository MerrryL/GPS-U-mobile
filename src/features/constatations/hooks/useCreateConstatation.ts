import { useNotificationStore } from "@/hooks/useNotificationStore";
import { MutationConfig, queryClient } from "@/lib/react-query";
import { useMutation } from "react-query";
import { axios } from "@/lib/axios";
import { Constatation } from "@/types";
import { QueryKeys } from "@/lib/query-keys";
import { PickerItem } from "@/types/utilityTypes";


export interface CreateConstatationDTO {
  description: string,
  observers: PickerItem[],
  observations: PickerItem[],
};

export const createConstatation: (data: CreateConstatationDTO) => Promise<Constatation> = ( data: CreateConstatationDTO): Promise<Constatation> => {
  return axios.post("constatations", data);
};

interface UseCreateConstatationOptions {
  config?: MutationConfig<typeof createConstatation>;
};

export const useCreateConstatation = ({ config }: UseCreateConstatationOptions = {}) => {
  const { addNotification } = useNotificationStore();

  return useMutation({
    onSuccess: (constatation: Constatation) => {
      queryClient.invalidateQueries([QueryKeys.Constatations]);
      queryClient.setQueryData([QueryKeys.Constatations, constatation.id], constatation);
      addNotification({
        type: "success",
        title: "Constatation Créée",
      });
    },
    mutationFn: createConstatation,
  });
};
