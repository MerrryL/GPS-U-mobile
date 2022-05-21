import { axios } from "@/lib/axios";
import { Constatation, Observation } from "@/types";

export const getObservations: () => Promise<Observation[]> = (): Promise<Observation[]> => {
  return axios.get("observations");
};

//Constatations part
export const getConstatations: () => Promise<Constatation[]> = (): Promise<Constatation[]> => {
  return axios.get("constatations");
};

type GetConstatationOptions = {
  constatationId: string;
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
  constatationId: string;
  description: string;
  observers: any;
  observations: any;
};

export const updateConstatation:(data:UpdateConstatationOptions)=> Promise<Constatation> = ({ description, observers, observations, constatationId }: UpdateConstatationOptions): Promise<Constatation> => {
  console.log(description, observers, observations);
  return axios.patch(`constatations/${constatationId}`, {
    description,
    observers,
    observations,
  });
};

type RequireValidationOptions = {
  constatationId: string;
};

export const requireValidation: (data: RequireValidationOptions) => Promise<Constatation> = ({ constatationId }: RequireValidationOptions): Promise<Constatation> => {
  return axios.post(`constatations/${constatationId}/require_validation`);
};

type RefuseValidationOptions = {
  constatationId: string;
};

export const refuseValidation: (data: RefuseValidationOptions) => Promise<Constatation> = ({ constatationId }: RefuseValidationOptions): Promise<Constatation> => {
  return axios.post(`constatations/${constatationId}/refuse_validation`);
};

type ValidateConstatationOptions = {
  constatationId: string;
};

export const validateConstatation: (data: ValidateConstatationOptions) => Promise<Constatation> = ({ constatationId }: ValidateConstatationOptions): Promise<Constatation> => {
  return axios.post(`constatations/${constatationId}/validate_constatation`);
};

type DeleteConstatationOptions = {
  constatationId: string;
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
