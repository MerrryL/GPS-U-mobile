import { axios } from "@/lib/axios";
import { Constatation, Observation } from "@/types";
import { PickerItem } from "@/types/utilityTypes";

export const getObservations: () => Promise<Observation[]> = (): Promise<Observation[]> => {
  return axios.get("observations");
};

//Constatations part
export const getConstatations: () => Promise<Constatation[]> = (): Promise<Constatation[]> => {
  return axios.get("constatations");
};

type GetConstatationOptions = {
  constatationId: number;
};

export const getConstatation: (data: GetConstatationOptions) => Promise<Constatation> = ({ constatationId }: GetConstatationOptions): Promise<Constatation> => {
  return axios.get(`/constatations/${constatationId}`);
};

// type CreateConstatationOptions = {
//   //localization: Localization;
//   data: Partial<Constatation>;
// };

export const createConstatation: () => Promise<Constatation> = (): Promise<Constatation> => {
  return axios.post("constatations");
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

type RequireValidationOptions = {
  constatationId: number;
};

export const requireValidation: (data: RequireValidationOptions) => Promise<Constatation> = ({ constatationId }: RequireValidationOptions): Promise<Constatation> => {
  return axios.post(`constatations/${constatationId}/require_validation`);
};

type RefuseValidationOptions = {
  constatationId: number;
};

export const refuseValidation: (data: RefuseValidationOptions) => Promise<Constatation> = ({ constatationId }: RefuseValidationOptions): Promise<Constatation> => {
  return axios.post(`constatations/${constatationId}/refuse_validation`);
};

type ValidateConstatationOptions = {
  constatationId: number;
};

export const validateConstatation: (data: ValidateConstatationOptions) => Promise<Constatation> = ({ constatationId }: ValidateConstatationOptions): Promise<Constatation> => {
  return axios.post(`constatations/${constatationId}/validate_constatation`);
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
