import { axios } from "@/lib/axios";
import { LocationActivityType } from "expo-location";

import { Constatation } from "@/types";


//Constatations part
export const getConstatations = (): Promise<Constatation[]> => {
  return axios.get("constatations");
};

type GetConstatationOptions = {
  constatationId: string;
};

export const getConstatation = ({
  constatationId,
}: GetConstatationOptions): Promise<Constatation> => {
  return axios.get(`/constatations/${constatationId}`);
};

type CreateConstatationOptions = {
  //localization: Localization;
  data: {
    description: string;
  },
};

export const createConstatation = ({
  // localization,
  data,
}: CreateConstatationOptions): Promise<Constatation> => {
  return axios.post("constatations", { data });
};

type UpdateConstatationOptions = {
  constatationId: string;
  data: Constatation;
};

export const updateConstatation = ({
  data,
  constatationId,
}: UpdateConstatationOptions): Promise<Constatation> => {
  return axios.patch(`constatations/${constatationId}`, data);
};

type RequireValidationOptions = {
  constatationId: string;
}

export const requireValidation = ({
  constatationId,
}: RequireValidationOptions): Promise<Constatation> => {
  return axios.post(`constatations/${constatationId}/require_validation`);
};

type RefuseValidationOptions = {
  constatationId: string;
}

export const refuseValidation = ({
  constatationId,
}: RefuseValidationOptions): Promise<Constatation> => {
  return axios.post(`constatations/${constatationId}/refuse_validation`);
};

type ValidateConstatationOptions = {
  constatationId: string;
}

export const validateConstatation = ({
  constatationId,
}: ValidateConstatationOptions): Promise<Constatation> => {
  return axios.post(`constatations/${constatationId}/validate_constatation`);
};

type DeleteConstatationOptions = {
  constatationId: string;
};

export const deleteConstatation = ({
  constatationId,
}: DeleteConstatationOptions) => {
  return axios.delete(`constatations/${constatationId}`);
};

export const importModels = (): Promise<Constatation[]> => {
  return axios.get("models");
};

export const importCopies = (): Promise<Constatation[]> => {
  return axios.get("copies");
};