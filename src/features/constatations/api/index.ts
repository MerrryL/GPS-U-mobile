import { axios } from "@/lib/axios";
import { Constatation, Observation } from "@/types";
import { PickerItem } from "@/types/utilityTypes";

export const getObservations: () => Promise<Observation[]> = (): Promise<Observation[]> => {
  return axios.get("observations");
};



export interface UpdateConstatationOptions {
  constatationId: number;
  description: string;
  observers: PickerItem[];
  observations: PickerItem[];
};

export const updateConstatation:(data:UpdateConstatationOptions)=> Promise<Constatation> = ({ description, observers, observations, constatationId }: UpdateConstatationOptions): Promise<Constatation> => {
  return axios.patch(`constatations/${constatationId}`, {
    description,
    observers,
    observations,
  });
};






type DeleteConstatationOptions = {
  constatationId: number;
};

export const deleteConstatation: (data: DeleteConstatationOptions) => Promise<void> = ({ constatationId }: DeleteConstatationOptions):Promise<void> => {
  return axios.delete(`constatations/${constatationId}`);
};

export const importModels = (): Promise<Constatation[]> => {
  return axios.get("models");
};

export const importCopies = (): Promise<Constatation[]> => {
  return axios.get("copies");
};
